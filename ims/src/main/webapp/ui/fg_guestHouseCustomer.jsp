<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>民宿会员</title>
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
<div style="margin:10px 0 10px 10px;float: left ">
    <div style="margin:0 0 5px 5px;float:left;">
        客户姓名：<input id="searchPopulationName" onkeyup="searchOnkeyup(this.id, 'getListContract(1, 0)')" style="width:100px">
    </div>
    <div style="margin:0 0 5px 10px;float:left;">
        电话：<input id="searchPopulationPhone" onkeyup="searchOnkeyup(this.id, 'getListContract(1, 0)')" style="width:100px">
    </div>
    <div style="margin:0 0 5px 10px;float:left;">
        身份证：<input id="searchPopulationIdCard" onkeyup="searchOnkeyup(this.id, 'getListContract(1, 0)')" style="width:100px">
    </div>
    <div style="margin:-4px 0 5px 6px;color:black;float:left;">
        <a class="easyui-linkbutton" plain="true" iconCls="icon-search" onclick="advancedScreening(1)" id="screening">高级筛选</a>
    </div>
    <div style="clear:both"></div>
    <div id="hiddenScreen" style="display:none">
        <div style="padding:0 0 5px 17px;float:left;">
            登记人：<input id="searchRegisterShowUserInfo" class="choose_user_button" doFlag="searchRegister" doFun="getListContract(1,0)"
                       style="width:100px;cursor:pointer;" readonly="readonly">
            <input id="searchRegisterGetUserStoreId" type="hidden">
            <input id="searchRegisterGetUserDetId" type="hidden">
            <input id="searchRegisterGetUserId" type="hidden">
            <div id="searchRegisterShowUserInfoDiv" style="display:none;"></div>
        </div>
        <div style="margin:0 0 5px 6px;float:left;">
            客户类型：<select id="customerType" onchange="getListContract(1,0);" style="width:80px">
            <option value=""></option>
            <option value="散客">散客</option>
            <option value="团客">团客</option>
            <option value="会员">会员</option>
        </select>
        </div>
        <div style="margin:0 0 5px 22px;float:left;">
            状态：<select id="customerState" onchange="getListContract(1,0);" style="width:100px">
            <option value="">全部</option>
            <option value="已住">已住</option>
            <option value="离开">离开</option>
        </select>
        </div>
        <div style="margin:0 0 5px 10px;color:black;float:left;">
            入住时间段：<input id="searchHouseStart" style="margin:0 5px 0 0;width:100px" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchHouseEnd\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:getListContract(1,0)})">
            到 <input id="searchHouseEnd" style="margin:0 0 0 5px;width:100px" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchHouseStart\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:getListContract(1,0)})">
        </div>
    </div>
</div>
<div id="DataGridPopulation" style="width:100%;height:90%;">
    <table id="populationDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
           data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="popName" width="10" align="center">客户姓名</th>
            <th field="popNameRemark" width="10" align="center">备注</th>
            <th field="popTelephone" width="10" align="center">电话号码</th>
            <th field="popIdcard" width="15" align="center">身份证</th>
            <th field="jsrrCheckInNum" width="10" align="center">入住次数</th>
            <th field="jsrrCustomerType" width="10" align="center">客户类型</th>
            <th field="popRegistrationTime" width="20" align="center">登记日期</th>
            <th field="userName" width="10" align="center">登记人</th>
            <th field="recentTime" width="20" align="center">最近入住时间</th>
            <th field="jsrcState" width="10" align="center">状态</th>
        </tr>
        </thead>
    </table>
    <!-- 分页 -->
    <div id="populationPageDiv" style="width:100%;text-align:center;"></div>
</div>
<!-- 客户详细信息窗口 -->
<div id="populationDetailedDlg" style="width: 695px" class="easyui-dialog" data-options="closed:true">
    <input id="population_index" type="hidden">
    <%--<input id="jsrrCustomerType" type="hidden">--%>
    <input id="jsrrCheckInNum" type="hidden">
    <input type="hidden" id="orderDetail_index" />
    <div id ="populationDetailed"style="width: 750px;float: left;">
        <div style="float: left;">
            <div style='margin:10px 0 0 10px;float: left;'>
                客户类型：<select id="jsrrCustomerType" style="width:100px;" clear="clear">
                <option value=""></option>
                <option value="个人客户">个人客户</option>
                <option value="企业客户">企业客户</option>
            </select>
            </div>
            <div style='margin:10px 0 0 35px;float: left;'>
                会员类型：<select id="memberType" style="width:100px;" clear="clear">
                <option value=""></option>
                <option value="个人客户">普通客户</option>
                <option value="企业客户">黄金会员</option>
                <option value="个人客户">超级会员</option>
                <option value="企业客户">团体会员</option>
                <option value="企业客户">协议单位</option>
            </select>
            </div>
            <div style='margin:10px 0 0 30px;float: left'>
                会员卡号：<input id="pop_memberCard" style="" clear="clear">
            </div>
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 10px;float: left;'>
                客户姓名：<input id="pop_name" style="width:295px" clear="clear">
            </div>
            <div style='margin:10px 0 0 54px;float: left;'>
                备注：<input id="pop_name_remark" style="height:20px" clear="clear">
            </div>
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 10px;float: left;'>
                证件号码：<input id="pop_idcard" style="width:295px" clear="clear">
            </div>
            <div style='margin:10px 0 0 30px;float: left;'>
                证件类型：<select id="pop_idcard_type" style="height:20px" choose="choose">
                <option value=""></option>
                <option value="居民身份证">居民身份证</option>
                <option value="护照">护照</option>
                <option value="营业执照">营业执照</option>
            </select>
            </div>
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 10px;float: left;'>
                户籍地址：<input id="pop_idcard_address" style="width:295px" clear="clear">
            </div>
            <div style='margin:10px 0 0 55px;float: left;'>
                生日：<input id="pop_birth" style="width:100px" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
            </div>
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 34px;float: left;'>
                性别：<select id="pop_sex" style="width:100px" choose="choose">
                <option value=""></option>
                <option value="男">男</option>
                <option value="女">女</option>
            </select>
            </div>
            <div style='margin:10px 0 0 60px;float: left;'>
                民族：<input id="pop_nation" style="width:100px" clear="clear">
            </div>
            <div style='margin:10px 0 0 30px;float: left;'>
                联系电话：<input id="pop_telephone" style="" clear="clear">
            </div>
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 10px;float: left;'>
                入住次数：<input id="checkInNum" style="width:100px" clear="clear">
            </div>
            <div style='margin:10px 0 0 36px;float: left;'>
                内外信用：<input type="number" id="pop_inner_credit_level" style="width:48px" clear="clear">
                <input type="number" id="pop_outer_credit_level" style="width:49px" clear="clear">
            </div>
            <div style='margin:10px 0 0 29px;float: left;'>
                会员积分：<input id="pop_bonusPoints" style="" clear="clear">
            </div>
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 10px;float: left;'>
                微信绑定：<select id="pop_wxBind" style="width:100px" clear="clear">
                <option value=""></option>
                <option value="是">是</option>
                <option value="否">否</option>
            </select>
            </div>
            <div style='margin:10px 0 0 49px;float: left;'>
                黑名单：<select id="pop_blackList" style="width:100px" clear="clear">
                <option value=""></option>
                <option value="是">是</option>
                <option value="否">否</option>
            </select>
            </div>
            <div style='margin:10px 0 0 29px;float: left;'>
                初始来源：<select id="pop_InitialSource" style="width:100px" clear="clear">
                <option value=""></option>
                <option value="前台散客">前台散客</option>
                <option value="业务扩展">业务扩展</option>
                <option value="团体客户">团体客户</option>
                <option value="美团">美团</option>
                <option value="携程">携程</option>
                <option value="小猪">小猪</option>
            </select>
            </div>
        </div>
        <div style="margin:10px 0 0 20px;float:left" >
            <img width="125px" height="140px" src="images/userImage.png" style="margin-left:20px" id="id_img_pers_open">
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 0;float: left;'>
                车牌号码：<input id="pop_carNumber" style="" clear="clear">
            </div>
            <div style="clear:both"></div>
            <div style='margin:10px 0 0 0;float: left;'>
                会员余额：<input id="pop_memberBalance" style="" clear="clear">
            </div>
        </div>

        <div style="clear:both"></div>
        <div id="shortRentOrder" style="margin:20px 0 0 0;width:750px;height:200px;">
            <table id="shortRentOrderDg" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;"
                   data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
                <thead>
                <tr>
                    <th field="address" width="20" align="center">入住客房</th>
                    <th field="jsrcBeginTime" width="20" align="center">入住时间</th>
                    <th field="jsrcEndTime" width="20" align="center">退房时间</th>
                    <th field="jsrcState" width="10" align="center">入住状态</th>
                </tr>
                </thead>
            </table>

            <!-- 分页 -->
            <div id="orderPageDiv" style="width:100%;text-align:center;"></div>
        </div>
        <div style="clear:both"></div>
        <div style="margin:18px 0 0 0;text-align:center;">
            <a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'population_index', 'populationDg', 'populationDetailedDlg', 'populationDetailedDlg(row)')">上一条</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#populationDetailedDlg').dialog('close')">关闭</a>
            <a class="easyui-linkbutton" iconcls="icon-edit" onclick="updateLivingMen()" id="updateLivingMenButton">修改住户</a>
            <!-- <a class="easyui-linkbutton" iconcls="icon-edit" onclick="openUpdate()" id="updateButton">修改</a> -->
            <a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdatePopulation()" id="doUpdateButton">保存</a>
            <a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'population_index', 'populationDg', 'populationDetailedDlg', 'populationDetailedDlg(row)')">下一条</a>
        </div>
    </div>
    <div style="background-color: #E0ECFF; height:100%;width:5px;float:left;margin:0 0 0 5px;"></div>
    <div style="float:left;width:300px">
        <div style="clear:both"></div>
        <div style="margin:0 0 0 7px;">
            <table id="customerInformation" style="width:100%;height:177px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
                <thead>
                <tr>
                    <th field="popName" width="10" align="center" clear="clear">同住人姓名</th>
                    <th field="popIdcard" width="15" align="center" clear="clear">证件号码</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<div id="downFollowInfo" style="padding:6px;display:none;">
    <center>
        <table class="xwtable" style="margin-top:10px;">
            <tbody>
            <tr>
                <td>跟进时间：</td>
                <td colspan="3"><span id="readDownFollowtime" clano="clano"></span></td>
            </tr>
            <tr>
                <td>操作人：</td>
                <td><span id="readDownFollowregistrantName" clano="clano"></span></td>
                <td>跟进类型：</td>
                <td><span id="readDownFollowtype" clano="clano"></span></td>
            </tr>
            <tr>
                <td>操作记录：</td>
                <td colspan="3" style="text-align:left"><span id="readDownFollowtext" clano="clano"></span></td>
            </tr>
            </tbody>
        </table>
    </center>
</div>


<jsp:include page="/ui/fg_guestHouseOrderDetails.jsp"></jsp:include>
<script src="js/fg.public.js"></script>
<script src="js/fg_guestHouseCustomer.js"></script>
</body>
</html>