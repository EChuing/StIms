<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.zz.po.sys.SysUserExpand" %>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title></title>
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
<div class="bodyLoadingOver"></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<!-- 抄表工具栏 -->
<div style="height:auto">
    <div style="padding:5px 0 0 0">
        <a class="easyui-linkbutton" iconCls="icon-add-chaobiao" plain="true" id="addWegButton" onclick="addWegDlg(1)">普通抄表</a>
        <a class="easyui-linkbutton" iconCls="icon-add-chaobiao" plain="true" id="longRangeButton"
           onclick="addWegDlg(2)">远程抄表</a>
    </div>
    <div style="padding:0 0 5px 5px;color:black;font-size:13px;float:left">
        楼盘名称：<input id="searcAddCommunity" style="width:80px;" onkeyup="queryWegReading(1,0)">
    </div>
    <div style="padding:0 0 5px 5px;color:black;font-size:13px;float:left">
        楼栋：<input id="searcAddBuilding" style="width:80px;" onkeyup="queryWegReading(1,0)">
    </div>
    <div style="padding:0 0 5px 5px;color:black;font-size:13px;float:left">
        门牌号：<input id="searcAddDoorplateno" style="width:80px;" onkeyup="queryWegReading(1,0)">
    </div>
    <div style="padding:0 0 5px 5px;color:black;font-size:13px;float:left">
        抄表类型：<select class="add_weg_type" id="searchWegType" style="width:80px;" onchange="queryWegReading(1,0)">
        <option></option>
    </select>
    </div>
    <div style="padding:0 0 5px 5px;color:black;font-size:13px;float:left">
        抄表性质：<select class="add_weg_nature" id="searchWegNature" style="width:80px;" onchange="queryWegReading(1,0); ">
        <option></option>
    </select>
    </div>
    <div style="padding:0 0 5px 5px;color:black;font-size:13px;float:left">
        抄表日期：<input id="searchWegTime" style="width:80px"
                    onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchange:queryWegReading(1,0)});">
    </div>
    <div style="clear:both"></div>
    <div class="meterReadingState" style="margin:5px 0 5px 0;color:black;font-size:13px;float:left;">
        <input id="searchButtonState" type="hidden" value="">
        <button type="button" class="btn btn-success meterReading" style="margin:0 0 5px 5px;width:160px;"
                value="本月未抄表">本月未抄表<span class="totalNum0"></span></button>
        <button type="button" class="btn btn-success meterReading" style="margin:0 0 5px 5px;width:160px;"
                value="本月已抄表">本月已抄表<span class="totalNum1"/></button>
        <button type="button" class="btn btn-success meterReading" style="margin:0 0 5px 5px;width:160px;" value="智能仪表">
            智能仪表<span class="totalNum2"/></button>
    </div>
    <div style="margin:9px 0 5px 5px;color:black;font-size:13px;float:left;">
        <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="reflashList()"></a>
    </div>
    <div style="clear:both"></div>
</div>
<!--抄表列表-->
<div id="DataGridWeg" style="width:100%;height:85%;">
    <table id="wegDg" class="easyui-datagrid" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="totalPage" width="40" align="center">楼盘名称</th>
            <th field="wegrdType" width="10" align="center">抄表类型</th>
            <th field="wegrdNums" width="20" align="center">抄表读数</th>
            <th field="wegrdMonth" width="20" align="center">抄表日期</th>
            <th field="wegrdNature" width="10" align="center">抄表性质</th>
            <th field="dealPeople" width="10" align="center">抄表人</th>
            <th field="registerPeople" width="10" align="center">登记人</th>
            <th field="wegrdRegisterTime" width="20" align="center">登记时间</th>
        </tr>
        </thead>
    </table>
    <%--分页使用--%>
    <input type="text" hidden="hidden" id="arrInputText">
    <div id="wegDgPageDiv" style="width:100%;text-align:center;"></div>
</div>
<!-- 添加抄表对话框 -->
<div id="addWegDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="clear:both"></div>
    <div id="relationSelect">
        <div style='margin:0 0 10px 0;'>
            <fieldset>
                <legend>筛选条件</legend>
                <div style="margin:0 0 5px 29px;color:black;float:left;display:none">
                    城市：<select id="searchAddCity" clear="clear" onchange="queryAddCity()" style="width:80px">
                </select>
                </div>
                <div style="margin:0 0 0 29px;color:black;float:left;">
                    城区：<select id="searchAddDistrict" clear="clear" onchange="relationDate(1,0)" style="width:100px">
                    <option></option>
                </select>
                </div>
                <div style="margin:0 0 0 5px;color:black;float:left;display:none">
                    片区：<select id="searchAddZone" clear="clear" onchange="relationDate(1,0)" style="width:100px">
                    <option></option>
                </select>
                </div>
                <div style="margin:0 0 0 5px;color:black;float:left;">
                    楼盘名称：<input id="searchAddCommunity" clear="clear" onkeyup="relationDate(1,0)" style="width:80px">
                </div>
                <div style="margin:0 0 0 5px;color:black;float:left;">
                    楼栋：<input id="searchAddBuilding" clear="clear" onkeyup="relationDate(1,0)" style="width:60px">
                </div>
                <div style="margin:0 0 0 5px;color:black;float:left;">
                    门牌号：<input id="searchAddDoorplateno" clear="clear" onkeyup="relationDate(1,0)" style="width:60px">
                </div>
                <div style="margin:0 0 5px 10px;color:black;float:left;">
                    <div id="showTheSortButton" class="showTheSortButton" onclick="showTheSortDlg()">排序方式<span
                            id="showTheSortjia" class="showTheSortjia">+</span></div>
                    <div class="theSortDlg" id="theSortDlg" style="height:100px;">
                        <div class="theSortContrary" id="theSortContraryPositive" searchVal="1">正序</div>
                        <div class="theSortContrary theSortContrarySelect" id="theSortContraryReverse" searchVal="2">
                            倒序
                        </div>
                        <input type="hidden" id="theSortContraryInput" value="2">
                        <div class="theSortTerm" id="theSortTermhrAddCommunity" searchVal="1">楼盘名称</div>
                        <div class="theSortTerm" id="theSortTermhrAddBuilding" searchVal="2">楼栋</div>
                        <div class="theSortTerm theSortTermSelect" id="theSortTermhrAddDoorplateno" searchVal="3">门牌号
                        </div>
                        <input type="hidden" id="theSortTermInput" value="3">
                    </div>
                </div>
            </fieldset>
            <div style="clear:both"></div>
            <fieldset>
                <div id="meterReadingDiv">
                    <legend>必填项</legend>
                    <div style='margin:0 0 0 5px;float: left;'>
                        抄表日期：<input id="wegrdMonth" style="width:100px"
                                    onfocus="WdatePicker({maxDate: new Date(),dateFmt:'yyyy-MM-dd',autoPickDate:true});"
                                    require="require">
                    </div>
                    <div style='margin:0 0 0 5px;float: left;'>
                        抄表人员：<input id="meteraddShowUserInfo" clear="clear" style="width:200px;cursor: pointer;"
                                    require="require"
                                    readonly="readonly" class="choose_user_button" doFlag="meteradd" doFun="" value="">
                        <input id="meteraddGetUserStoreId" type="hidden">
                        <input id="meteraddGetUserDetId" type="hidden">
                        <input id="meteraddGetUserId" type="hidden">
                        <div id="meteraddShowUserInfoDiv" style="display:none;"></div>
                    </div>
                    <div style="margin:0 0 0 5px;float: left" id="getWegNumButton">
                        <a class="easyui-linkbutton" iconCls="icon-add-chaobiao" plain="true" onclick="getWegNum()">获取设备读数</a>
                    </div>
                </div>
            </fieldset>
        </div>
    </div>
    <div id="relationDataGrid">
        <div id="choseSource" style="width:100%;height:277px;">
            <table id="choseSourceTable"style="overflow:auto;"></table>
            <div id="choseSourcePageDiv" style="width:99%;text-align:center;"></div>
        </div>
    </div>
    <div style="clear:both"></div>
    </br>
    <center>
        <div style="height:30px;">
            <span id="addTips" style="height:30px;color:red"></span>
        </div>
        <a class="easyui-linkbutton" iconCls="icon-save"
           onclick="if(validateRequire('addWegDlg')){doAddReading()}">保存</a>
        <a class="easyui-linkbutton" iconCls="icon-cancel" onclick="addWegDlgClose()">关闭</a>
    </center>
</div>

<!-- 修改抄表对话框 -->
<div id="updateWegDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <input style="display:none" class='update_weg_id'>
    <div style="clear:both"></div>
    <div style='margin:10px 0 0 10px;float: left;'>
        抄表类型：<select class="add_weg_type" id="update_weg_type" style="width:80px">
        <option></option>
    </select>
    </div>
    <div style='margin:10px 0 0 10px;float: left;'>
        抄表读数：<input id="update_weg_nums" style="width:80px">
    </div>
    <div style="clear:both"></div>
    <div style='margin:10px 0 0 10px;float: left;'>
        抄表性质：<input class="update_weg_nature" style="width:80px" readonly='readonly'>
    </div>
    <div style='margin:10px 0 0 10px;float: left;'>
        抄表日期：<input class="update_weg_date" style="width:80px"
                    onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true})">
    </div>
    <div style="clear:both"></div>
    <div style='margin:10px 0 0 10px;float: left;'>
        计算状态：<select class="update_weg_state" style="width:80px">
        <option></option>
    </select>
    </div>
    <div style='margin:10px 0 0 10px;float: left;'>
        使用状态：<select class="update_weg_use" style="width:80px">
        <option></option>
    </select>
    </div>
    <div style="clear:both"></div>
    <div style='margin:10px 0 0 10px;float: left;'>
        抄表人员：<select class="add_weg_dep" id="update_weg_dep"
                     onchange="deptStaffChose('update_weg_dep','update_weg_user',0)" style="width:80px">
        <option></option>
    </select>
        <select id="update_weg_user" style="width:80px">
            <option></option>
        </select>
    </div>
    <div style="clear:both"></div>
    </br>
    <center>
        <a class="easyui-linkbutton" iconCls="icon-save" id="updateWegButton" onclick="doUpdateWegReading()">保存</a>
        <a class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#updateWegDlg').dialog('close')">关闭</a>
    </center>
</div>
<script src="js/fg.public.js"></script>
<script src="js/fg.meter.js"></script>
</body>
</html>