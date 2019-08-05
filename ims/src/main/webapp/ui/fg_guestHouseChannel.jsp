<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>民宿渠道</title>
    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
    <link href="css/icon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="js/config.js"></script>
</head>
<body>
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<div>
    <div style="margin:5px 0 0 5px;float:left">
        <a class="easyui-linkbutton" plain="true" iconCls="icon-add" style="margin:0 5px 0 0" onclick="openChannelDlg(0)">添加渠道</a>
        <a class="easyui-linkbutton" plain="true" iconCls="icon-add" style="margin:0 5px 0 0" onclick="openPricePlan()">方案管理</a>
        <a class="easyui-linkbutton" plain="true" iconCls="icon-add" style="margin:0 5px 0 0" onclick="openSigningPeople()">签单人管理</a>
    </div>
    <div style="clear:both;"></div>
    <div style="margin:5px 0 0 10px;float:left">
        渠道类型 : <select id="channelType" onchange="getChannelInfo(1)">
        <option value=""></option>
        <option value="会员">会员</option>
        <option value="门店">门店</option>
        <option value="协议单位">协议单位</option>
    </select>
    </div>
    <div style="margin:5px 0 0 10px;float:left">
        群体分类 : <input id="groupType" onkeyup="getChannelInfo(1)" />
    </div>
    <div style="margin:5px 0 0 10px;float:left">
        渠道状态 : <select id="channelState" onchange="getChannelInfo(1)">
        <option value=""></option>
        <option value="正常">正常</option>
        <option value="无效">无效</option>
    </select>
    </div>
    <div style="clear:both;"></div>
    <div id="channelInfo" style="width:100%;margin:10px 0 0 0" >
        <table id="channelTable" style="width:100%;height:702px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
            <thead>
            <tr>
                <th field="jcuType" width="15" align="center">类型</th>
                <th field="jcuGroupType" width="15" align="center">群体分类</th>
                <th field="jcuGroupDescribe" width="15" align="center">群体描述</th>
                <th field="jcuContactsPeople" width="10" align="center">联系人</th>
                <th field="jcuTelephone" width="15" align="center">联系电话</th>
                <th field="jcuMaxCredit" width="10" align="center">挂账额度</th>
                <th field="jcuAccountBalance" width="10" align="center">账户结余</th>
                <th field="jppPlanName" width="10" align="center">价格方案</th>
                <th field="jcuAllowCredit" width="10" align="center">是否允许挂账</th>
                <th field="jcuIsSupportPricePlan" width="10" align="center">支持假期方案</th>
                <th field="jcuState" width="10" align="center">状态</th>
            </tr>
            </thead>
        </table>
    </div>
    <div id="channelPageDiv" style="width:100%;text-align:center;"></div>
</div>

<!-- 方案管理窗口 -->
<div id="pricePlanDlg" class="easyui-dialog" data-options="closed:true">
    <div style="margin:0 0 0 5px;float:left">
        <a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="addPricePlan" onclick="openAddPricePlan(0)">添加方案</a>
        <a class="easyui-linkbutton" plain="true" iconCls="icon-ok" id="batchUsing" onclick="doUpdateState(1)">批量启用方案</a>
        <a class="easyui-linkbutton" plain="true" iconCls="icon-clear" id="batchCancellation" onclick="doUpdateState(2)">批量注销方案</a>
    </div>
    <div style="clear:both;"></div>
    <div style="margin:5px 0 0 10px;float:left">
        方案名称 : <input id="pricePlanName" onkeyup="getPricePlanInfo(1)" />
    </div>
    <div style="margin:5px 0 10px 10px;float:left">
        状态 : <select id="pricePlanState" onchange="getPricePlanInfo(1)">
        <option value=""></option>
        <option value="正常">正常</option>
        <option value="无效">无效</option>
    </select>
    </div>
    <div style="clear:both;"></div>
    <table id="pricePlanTable" style="height:252px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
        <thead>
        <tr>
            <th data-options="field:'ck',checkbox:true"></th>
            <th field="jppPlanName" width="25" align="center">方案名称</th>
            <th field="planPackage" width="70" align="center">具体信息</th>
            <th field="jppPriorityLevel" width="10" align="center">优先级</th>
            <th field="jppState" width="10" align="center" formatter="formatJppState">状态</th>
        </tr>
        </thead>
    </table>
    <div id="pricePlanPageDiv" style="width:100%;text-align:center;"></div>
</div>

<!-- 添加/修改价格方案窗口 -->
<div id="pricePlanInfoDlg" class="easyui-dialog" data-options="closed:true">
    <div style="margin:5px 0 0 5px;">
        <div style="margin:5px 0 0 5px;float:left;">
            方案名称: <input style="width:100px;" id="planName" clear="clear">
        </div>
        <div style='margin:5px 0 0 15px;float: left;width:112px'>
            优先级: <select style="padding: 0 16%;width:auto;" id="priorityLevel" clear="clear">
        </select>
        </div>
        <div style="clear:both"></div>
        <div id="planPackage" style='float: left;'></div>
        <div style="clear:both"></div>
        <center style="margin:15px 0 0 0;">
            <a id="doAddPricePlan" class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('pricePlanInfoDlg')){doSavePricePlan(0)}">保存</a>
            <a id="updatePricePlan" class="easyui-linkbutton" iconcls="icon-edit" onclick="if(validateRequire('pricePlanInfoDlg')){doSavePricePlan(1)}">修改</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#pricePlanInfoDlg').dialog('close')">取消</a>
        </center>
    </div>
    <div style="margin:10px 0 0 0;font-size:1px;color:red;text-align:center;">优先级的数字越大，该方案优先级越高</div>
</div>

<!-- 渠道添加/信息窗口 -->
<div id="channelDlg" class="easyui-dialog" data-options="closed:true">
    <input id="jcuId" type="hidden">
    <div style="margin:5px 0 0 5px;">
        <div style="margin:5px 0 0 17px;float:left;">
            类型: <select style="width:100px;" id="jcuType" onchange="selectJcuType()" clear="clear" require="require">
            <option></option>
            <option>会员</option>
            <option>门店</option>
            <option>协议单位</option>
        </select>
        </div>
        <div style='margin:5px 0 0 10px;float: left;'>
            群体分类: <input id="jcuGroupType" clear="clear" require="require">
        </div>
        <div style='margin:5px 0 0 10px;float: left;'>
            价格方案: <select id="jcuPricePlanId" clear="clear" require="require">
        </select>
        </div>
        <div style="clear:both"></div>
        <div id="vipHidden">
            <div style='margin:10px 0 0 5px;float: left;'>
                联系人: <input id="jcuContactsPeople" clear="clear" require="require">
            </div>
            <div style='margin:10px 0 0 10px;float: left;'>
                联系电话: <input id="jcuTelephone" clear="clear" require="require">
            </div>
            <div style='margin:10px 0 0 10px;float: left;'>
                挂账额度: <input id="jcuMaxCredit" data-type="money-positive" clear="clear" require="require">
            </div>
        </div>
        <div style="clear:both"></div>
        <div style='margin:10px 0 0 5px;float: left;'>
            是否允许挂账: <select id="allowCredit" style="width:64px" clear="clear">
            <option value="1">是</option>
            <option value="0">否</option>
        </select>
        </div>
        <div style='margin:10px 0 0 12px;float: left;'>
            是否支持假期方案: <select id="supportPricePlan" style="width:50px" clear="clear">
            <option value="1">是</option>
            <option value="0">否</option>
        </select>
        </div>
        <div style='margin:10px 0 0 34px;float: left;'>
            状态: <select id="jcuState" style="width:100px" clear="clear">
            <option>正常</option>
            <option>无效</option>
        </select>
        </div>
        <div style="clear:both"></div>
        <div style='margin:10px 0 0 17px;float: left;'>
            描述: <input id="jcuGroupDescribe" style="width:205px" clear="clear" require="require">
        </div>
        <div id="memberLevelDiv" style='margin:10px 0 0 10px;float: left;display:none;'>
            会员级别: <select id="jcuMemberLevel" style="width:60px" clear="clear">
        </select>
        </div>
        <div style='margin:10px 0 0 10px;float: left;'>
            微信可用渠道: <input id="userWx" type="checkbox" autocomplete="off">
        </div>
        <div style="clear:both"></div>
        <center style="margin:15px 0 0 0;">
            <a id="doAddChannel" class="easyui-linkbutton" iconcls="icon-save" onclick="if(validateRequire('channelDlg')){saveChannel(0)}">添加</a>
            <a id="doUpdateChannel" class="easyui-linkbutton" iconcls="icon-edit" onclick="if(validateRequire('channelDlg')){saveChannel(1)}">修改</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#channelDlg').dialog('close')">取消</a>
        </center>
    </div>
</div>

<!-- 签单人管理窗口 -->
<div id="signingPeopleDlg" class="easyui-dialog" data-options="closed:true">
    <a class="easyui-linkbutton" plain="true" style="margin:5px 0 0 0;" iconCls="icon-add" onclick="signingPeopleInfoDlg(0)">添加签单人</a>
    <div style="margin:5px 0 0 0;">
        <table id="signingPeopleTable" style="width:100%;height:238px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
            <thead>
            <tr>
                <th field="jcuGroupType" width="25" align="center">协议单位</th>
                <th field="jspName" width="15" align="center">签单人</th>
                <th field="jspTelephone" width="25" align="center">联系电话</th>
                <th field="jspCredit" width="20" align="center">挂账额度</th>
                <th field="jspState" width="15" align="center">状态</th>
            </tr>
            </thead>
        </table>
    </div>
</div>
<!-- 添加/修改签单人信息窗口 -->
<div id="signingPeopleInfoDlg" class="easyui-dialog" data-options="closed:true">
    <input id="jspId" type="hidden" />
    <div style="margin:5px 0 0 5px;float:left;">
        <div style="margin:5px 0 0 5px;float:left;">
            协议单位: <select style="width:100px;" id="jspAgreementUnit" clear="clear"></select>
        </div>
        <div style="margin:5px 0 0 17px;float:left;">
            签单人: <input style="width:100px;" id="jspName" clear="clear"></select>
        </div>
        <div style="clear:both"></div>
        <div style="margin:5px 0 0 5px;float:left;">
            联系电话: <input style="width:100px;" id="jspTelephone" clear="clear"></select>
        </div>
        <div style="margin:5px 0 0 5px;float:left;">
            签单密码: <input style="width:100px;" id="jspPassword" clear="clear"></select>
        </div>
        <div style="clear:both"></div>
        <div style="margin:5px 0 0 5px;float:left;">
            挂账额度: <input style="width:100px;" id="jspCredit" clear="clear"></select>
        </div>
        <div style="margin:5px 0 0 29px;float:left;">
            状态: <select style="width:100px;" id="jspState" clear="clear">
            <option>正常</option>
            <option>无效</option>
        </select>
        </div>
        <div style="clear:both"></div>
        <center style="margin:15px 0 0 0;">
            <a id="doAddSigningPeople" class="easyui-linkbutton" iconcls="icon-save" onclick="doSaveSigningPeople(0)">保存</a>
            <a id="updateSigningPeople" class="easyui-linkbutton" iconcls="icon-edit" onclick="doSaveSigningPeople(1)">修改</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#signingPeopleInfoDlg').dialog('close')">取消</a>
        </center>
    </div>
</div>
<script src="js/fg.public.js"></script>
<script src="js/fg_guestHouseChannel.js"></script>
</body>
</html>