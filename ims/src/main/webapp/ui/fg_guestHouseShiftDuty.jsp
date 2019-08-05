<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>民宿交班</title>
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
    <style>

        .fieldset{
            border:1px solid 	#A9A9A9;
            line-height: 30px;
            list-style: none;
            padding: 5px 10px;
            margin-bottom: 2px;
        }

    </style>
</head>
<body>

<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<input id="loginUserId" type="hidden" value='<%=user.getUserId()%>'>
<div style="padding: 10px 0 0px 5px">
    <div style="float: left">
        <a  class="easyui-linkbutton"  plain="true" onclick="showShiftDlg()"><img  style="width: 20px;height: 20px" src="img/shift.png">交班管理</a>
    </div>

    <div style="float: left;margin-left: 10px">
        <a  class="easyui-linkbutton"  plain="true" onclick="showShiftRecordDlg(1,1,0)" ><img  style="width: 20px;height: 20px" src="img/shiftRecord.png">交班记录</a>
    </div>
</div>
<!--交接班管理工具-->
<%--<div style="clear: both">
    <div  style="padding:10px 0 10px 5px;display:flex;">

        <div style="margin:0 0 0 10px">
            时间:<input id="searchWorkStartTime" style="width:120px" type="text"
                        onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchWorkEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true,dchanging:getAllShortRentShiftDuty(1,0)})">
            到 <input id="searchWorkEndTime" style="width:120px" type="text"
                     onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchWorkStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true,dchanging:getAllShortRentShiftDuty(1,0)})">
        </div>

    </div>
</div>--%>


<!--交接班的首页显示-->
<div style="padding:30px 10px 5px 10px;height:80%">
    <table id="shiftWorkDg" style="width:99%;height:527px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
           data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10,fitColumns:true,scrollbarSize:0">
        <thead>
        <tr>
            <th width="10" align="center" field="jsrTime">日期</th>
            <th width="10" align="center" field="jsrEndWorker">用户姓名</th>
            <th width="10" align="center" field="jsrStartTime">当班时间</th>
            <th width="10" align="center" field="jsrEndTime">交班时间</th>
        </tr>
        </thead>
    </table>
    <div id="shiftWorkDiv" style="width:100%;height:30px;text-align:center;"></div>
</div>

<!--交接管理详情页-->
<div id="shiftDutyDetailDlg" class="easyui-dialog" data-options="closed:true,buttons:'#bb',modal:true">

    <div id="bb">
        <%--<a href="#" class="easyui-linkbutton" iconCls="icon-export" >导出</a>--%>
        <a href="#" class="easyui-linkbutton" iconCls="icon-print" onclick="ShiftprintPreview()">打印</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="submitShift()">交班</a>
        <a href="#" class="easyui-linkbutton" iconcls="icon-no" onclick="$('#shiftDutyDetailDlg').dialog('close')">取消</a>
    </div>

    <div class="easyui-tabs" id="shiftWork" style="height: 585px">

        <div title="交接班"  data-options="" style="width: 100%;height: 500px">

            <div style="float: left;width: 460px;height: 480px">
                <fieldset class="fieldset" style="width: 460px;height: 450px">
                    <legend>
                        <font style="font-size: 12px;font-family: ' 微软雅黑 ';" >交班信息</font>
                    </legend>
                    <div style='margin:5px 0 0 20px;float: left;'>
                        起始时间 ：<input id="shiftStartTime" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 35px;float: left;'>
                        结束时间 ：<input id="shiftEndTime" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>

                    <div style='margin:5px 0 0 32px;float: left;'>
                        <a href="#" style="color: blueviolet;text-decoration:underline" onclick="showCheckInNumDetail()">开房数 ：</a><input id="checkInNum" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>

                    <div style='margin:5px 0 0 47px;float: left;'>
                        <a href="#" style="color: blueviolet;text-decoration:underline" onclick="showCheckOutDetail()">退房数 ：</a><input id="checkOutNum" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>

                    <div style='margin:5px 0 0 8px;float: left;'>
                        入住总押金 ：<input id="totalDepositAccount" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>

                    <div style='margin:5px 0 0 51px;float: left;'>
                        总收入：<input id="totalIncome" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>

                    <div style='margin:5px 0 0 24px;float: left;'>
                        实际收入：<input id="realIncome" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 35px;float: left;'>
                        挂账金额 ：<input id="onAccount" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 12px;float: left;'>
                        会员卡支付：<input id="membersCardPay" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 35px;float: left;'>
                        商品消费 ：<input id="commodityConsumption" readonly="readonly" style="width:115px"  clear="clear" >
                    </div>
                    <div style="clear: both"></div>
                    <div style="float: left;width: 200px;height: 450px">
                        <fieldset class="fieldset">
                            <legend>
                                <font style="font-size: 12px;font-family: ' 微软雅黑 ';">接班信息</font>
                            </legend>
                            <div style='margin:5px 0 0 20px;'>
                                交班人 ：<input id="endWorker" readonly="readonly" style="width:100px"  clear="clear" >
                            </div>
                            <div style="margin:5px 0 0 20px;">
                                接班人 ：<select id="startWorker"  style="width:100px"  clear="clear" >
                            </select>
                            </div>
                            <div style="margin:5px 0 0 32px">
                                密码 ：<input id="shiftPassword" type="password" style="width:100px"  clear="clear" >
                            </div>
                            <div style='margin:5px 0 0 32px;'>
                                备注 ：<textarea id="shiftRemark" style="width:100px;height: 80px"  clear="clear" ></textarea>
                            </div>
                        </fieldset>
                    </div>
                    <div style="float: left;margin: 0 0 0 10px;width: 200px;height: 450px">
                        <fieldset class="fieldset">
                            <legend>
                                <font style="font-size: 12px;font-family: ' 微软雅黑 ';" >在住押金构成</font>
                            </legend>
                            <div style="margin: 10px 5px 5px 5px">
                                <table id="residentDepositTable" style="width:180px;height:175px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                                       data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
                                    <thead>
                                    <tr>
                                        <th  align="center" field="jsrcDepositPayType">款项类型</th>
                                        <th  align="center" field="jsrcDeposit">金额</th>
                                    </tr>

                                    </thead>

                                </table>

                            </div>

                        </fieldset>
                    </div>

                </fieldset>
            </div>

            <div style="float: left;margin: 0 0 0 20px;width: 430px;height: 450px">
                <fieldset class="fieldset" style="margin: 0 0 0 20px;width: 430px;height: 450px">

                    <legend>
                        <font style="font-size: 12px;font-family: ' 微软雅黑 ';" >交班金额</font>
                    </legend>

                    <div style='margin:5px 0 0 20px;float: left;'>
                        本班备用 ：<input id="pettyCash"  style="width:100px"  clear="clear" onblur="showBalance()" >
                    </div>
                    <div style='margin:5px 0 0 35px;float: left;'>
                        上班结余 ：<input id="workBalance" readonly="readonly" style="width:100px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 8px;float: left;'>
                        入账押金额 ：<input id="recordedDepositAmount" readonly="readonly" style="width:100px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 35px;float: left;'>
                        其他收入 ：<input id="otherIncome" readonly="readonly" style="width:100px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 8px;float: left;'>
                        退还押金额 ：<input id="returnDepositAmount" readonly="readonly" style="width:100px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 35px;float: left;'>
                        其他支出 ：<input id="otherPay" readonly="readonly" style="width:100px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 20px;float: left;'>
                        上交金额 ：<input id="handInAmount"  style="width:100px"  clear="clear" onblur="showTransferAmount()">
                    </div>
                    <div style='margin:5px 0 0 35px;float: left;'>
                        交接金额 ：<input id="transferAmount" readonly="readonly" style="width:100px"  clear="clear" >
                    </div>
                    <%--<div style='margin:5px 0 0 12px;float: left;'>
                        附加备用金：<input id="additionPettyCash" readonly="readonly" style="width:100px"  clear="clear" >
                    </div>
                    <div style='margin:5px 0 0 56px;float: left;'>
                        AR账 ：<input id="accountReceivable" readonly="readonly" style="width:100px"  clear="clear" ><!--应收款账-->
                    </div>--%>
                    <div style="clear: both"></div>
                    <div style="margin: 20px 0 20px 0">
                        <div style="border:1px solid 	#A9A9A9; float: left;width: 140px;margin: 13px 0 0 3px"></div>
                        <span style="float: left;font-size: 16px;margin: 0 3px 0 3px">交接金额构成</span>
                        <div style="border:1px solid 	#A9A9A9; float: left;width: 140px;margin: 13px 0 0 0"></div>
                    </div>

                    <div style="margin: 25px 5px 5px 5px">
                        <table id="onlineDespoitTable" style="width:380px;height:215px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
                            <thead>
                            <tr>
                                <th width="20" align="center" field="AccountType">类型</th>
                                <th  width="6" align="center" field="money">上班结余</th>
                                <th  width="6" align="center" field="money">本班收入</th>
                                <th  width="6" align="center" field="money">上交</th>
                                <th  width="6" align="center" field="money">结余</th>
                            </tr>

                            </thead>

                        </table>

                    </div>

                </fieldset>
            </div>

            <div style="clear: both;" >
                <div >
                    <div style="float: left;margin:-10px 0 0 10px">
                        <img src="img/remind.png" style="width: 80px;height: 80px">
                    </div>
                    <div style="float: left;margin:0 0 0 40px;font-size: 18px">
                        <div>
                            <span>1、结余金额=上班结余+入账押金额+本班备用金+其他收入-退还押金额-其它支出</span>
                        </div>
                        <div style="margin:10px 0 0 0px">
                            <span>2、交接金额=结余金额-上交金额</span>
                        </div>
                        <div style="margin:10px 0 0 0px">
                            <span>3、本班备用金是指本班次中附加的备用金总金额</span>
                        </div>

                    </div>

                </div>


            </div>

        </div>

        <div title="营业状况表">

            <div>
                <div style='margin:5px 0 0 15px;float: left;font-weight: bold'>
                    入住房数 <input id="operatingCheckInRooms" readonly="readonly" style="width:180px;height: 30px"  clear="clear" >
                </div>
                <div style='margin:5px 0 0 5px;float: left;font-weight: bold'>
                    退房数 <input id="operatingReturnRooms" readonly="readonly" style="width:180px;height: 30px"  clear="clear" >
                </div>
                <div style='margin:5px 0 0 5px;float: left;font-weight: bold'>
                    平均房价 <input id="operatingAveragePrice" readonly="readonly" style="width:180px;height: 30px"  clear="clear" >
                </div>
                <div style='margin:5px 0 0 5px;float: left;font-weight: bold'>
                    在住押金 <input id="operatingDepositInResidence" readonly="readonly" style="width:180px;height: 30px"  clear="clear" >
                </div>
            </div>
            <div style="clear: both"></div>

            <div style="margin: 5px 1px 1px 1px">
                <table id="operatingConditionsTable" style="width:970px;height:510px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                       data-options="rownumbers:true, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:30">
                    <thead>
                    <th width="5" align="center" field="jsrcSaleNo">单号</th>
                    <th width="5" align="center" field="renterName">姓名</th>
                    <th width="5" align="center" field="hsAddDoorplateno">房号</th>
                    <th width="5" align="center" field="jsrcActualDepartureTime">入住日期</th>
                    <th width="5" align="center" field="jsrcActualOccupancyTime">退房日期</th>
                    <th width="5" align="center" field="hsRoomType">类型</th>
                    <th width="5" align="center" field="jsrcTotalDays">入住天数</th>
                    <th width="5" align="center" field="jsrcTotalPrice">房费</th>
                    <th width="5" align="center" field="jsrcAdditionalCost">商品消费</th>
                    </thead>


                </table>


            </div>


        </div>
        <div title="收银明细">

            <div style="margin-left:2px">

                <table id="cashRegisterDetailsTable" style="width:965px;height:545px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                       data-options="rownumbers:true, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:30">
                    <thead>
                    <th width="5" align="center" field="jsrcBeginTime">时间</th>
                    <%--<th width="10" align="center" field="AccountType">款项类型</th>--%>
                    <th width="5" align="center" field="jsrcPaymentMethod">支付方式</th>
                    <th width="5" align="center" field="jsrcTotalPrice">金额</th>
                    <th width="5" align="center" field="jsrcSaleNo">单号</th>
                    <th width="5" align="center" field="suStaffName">操作员</th>
                    <th width="5" align="center" field="jsrRemark">备注</th>
                    </thead>

                </table>


            </div>


        </div>

        <div title="收支明细">

            <div style="margin-left: 2px">

                <table id="spendingDetailTable" style="width:965px;height:545px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                       data-options="rownumbers:true, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:30">
                    <thead>
                    <th width="5" align="center" field="jsrcBeginTime">时间</th>
                    <%--	<th width="5" align="center" field="AccountType">项目名称</th>
                        <th width="5" align="center" field="AccountType">款项类型</th>--%>
                    <th width="5" align="center" field="jsrcPaymentMethod">支付方式</th>
                    <th width="5" align="center" field="jsrcTotalPrice">收入</th>
                    <th width="5" align="center" field="spending">支出</th>
                    <%--<th width="5" align="center" field="AccountType">款类结余</th>
                    <th width="5" align="center" field="AccountType">班次结余</th>--%>
                    <th width="5" align="center" field="jsrcSaleNo">单号</th>
                    <th width="5" align="center" field="suStaffName">操作员</th>
                    </thead>

                </table>


            </div>


        </div>

        <div title="押金记录">

            <div style="margin-left: 2px">

                <table id="depositRecordTable" style="width:965px;height:545px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                       data-options="rownumbers:true, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:30">
                    <thead>
                    <th width="5" align="center" field="jsrcBeginTime">支付日期</th>
                    <th width="5" align="center" field="jsrcSaleNo">单号</th>
                    <th width="5" align="center" field="renterName">客人姓名</th>
                    <th width="5" align="center" field="hsAddDoorplateno">房号</th>
                    <th width="5" align="center" field="jsrcDepositPayType">支付方式</th>
                    <th width="5" align="center" field="jsrcDeposit">支付金额</th>
                    <th width="5" align="center" field="suStaffName">入账人</th>
                    </thead>

                </table>

            </div>

        </div>

        <%--<div title="商品消费记录">

            <div style="margin-left: 2px">

                <table id="commodityConsumptionRecordTable" style="width:965px;height:545px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                       data-options="rownumbers:true, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:30">
                    <thead>
                    <th width="5" align="center" field="hsAddDoorplateno">房号</th>
                    <th width="5" align="center" field="jsrcBeginTime">时间</th>
                    <th width="5" align="center" field="jsrcSaleNo">名称</th>
                    <th width="5" align="center" field="renterName">价格</th>
                    <th width="5" align="center" field="jsrcDepositPayType">单位</th>
                    <th width="5" align="center" field="jsrcDeposit">数量</th>
                    <th width="5" align="center" field="jsrcAdditionalCost">金额</th>
                    <th width="5" align="center" field="suStaffName">操作者</th>
                    </thead>

                </table>

            </div>

        </div>--%>
        <%--<div title="附加费记录">

        </div>--%>
        <%--	<div title="跑单记录">

            </div>--%>
        <%--<div title="会员充值记录">

        </div>--%>

    </div>


</div>

<!--开房详情页面-->
<div id="roomsNumDetailDlg" class="easyui-dialog" data-options="closed:true">

    <div style="margin: 5px 5px 5px 5px">
        <table id="roomsNumTable" style="width:770px;height:530px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th width="6" align="center" field="jsrcBeginTime">时间</th>
                <th width="4" align="center" field="jsrcSaleNo">单号</th>
                <th width="4" align="center" field="hsAddDoorplateno">房号</th>
                <th width="4" align="center" field="renterName">客人姓名</th>
                <th width="4" align="center" field="hsRoomType">项目</th>
                <th width="4" align="center" field="jsrcTotalPrice">金额</th>
                <th width="4" align="center" field="suStaffName">操作者</th>
                <th width="4" align="center" field="jsrRemark">备注</th>
            </tr>

            </thead>

        </table>

    </div>

</div>


<!--交班记录详情-->

<div class="easyui-dialog" id="shiftRecordDetialDlg" data-options="closed:true">

    <%--<div>
        <div style="float: left;margin: 5px 5px 5px 5px">
            <a class="easyui-linkbutton" plain="true" iconCls="icon-search">查找</a>
        </div>
        <div style="border-left: 2px solid #A9A9A9;float: left;height: 21px;margin-top: 6px" ></div>
        <div style="float: left;margin: 5px 5px 5px 5px">
            <a class="easyui-linkbutton" plain="true" iconCls="icon-export">记录导出</a>
        </div>
        <div style="border-left: 2px solid #A9A9A9;float: left;height: 21px;margin-top: 6px" ></div>
        <div style="float: left;margin: 5px 5px 5px 5px">
            <a class="easyui-linkbutton" plain="true" iconCls="icon-print">记录打印</a>
        </div>
        <div style="border-left: 2px solid #A9A9A9;float: left;height: 21px;margin-top: 6px" ></div>
        <div style="float: left;margin: 5px 5px 5px 5px">
            <a class="easyui-linkbutton" plain="true" iconCls="icon-print">打印交接班</a>
        </div>

    </div>--%>

    <div style="clear: both"></div>

    <div id="searchInfo">

        <%--<fieldset class="fieldset" style="margin: 0 0 0 13px;width: 930px;height: 140px">

            <legend>
                <font style="font-size: 12px;font-family: ' 微软雅黑 ';" >搜索</font>
            </legend>--%>

        <%--<div>

            <div style='margin:5px 0 0 44px;float: left;font-weight: bold'>
                单号  <input id=""  style="width:150px;height:28px"  clear="clear" >
            </div>

            <div style='margin:5px 0 0 20px;float: left;font-weight: bold'>
                客人姓名  <input   style="width:150px;height:28px"  clear="clear" >
            </div>


        </div>--%>

        <div style="margin-top: 20px">
            <div id="shiftSerachBeginTime" style='margin:5px 0 10px 20px;float: left;overflow: hidden;font-weight: bold'>
                开始时间  <input  id="sTime" style="width:120px;height:30px;border-radius: 8px 8px 8px 8px;" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'shiftSerachEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" clear="clear" >
            </div>

            <div id="shiftSerachEndTime" style='margin:5px 10px 0 20px;float: left;overflow: hidden;font-weight: bold'>
                结束时间  <input  id="eTime" style="width:120px;height:30px;border-radius: 8px 8px 8px 8px;" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'shiftSerachBeginTime\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})" clear="clear" >
            </div>

            <div style='margin:10px 0 0 10px;float: left;'>
                <input id="nowTime" type="radio" name="time"   clear="clear" onclick="localTime()" >  当日
            </div>

            <div style='margin:10px 0 0 10px;float: left;'>
                <input id="monthTime" type="radio" name="time"  clear="clear" onclick="localMonthTime()" > 当月
            </div>

            <div style='margin:8px 0 0 10px;float: left;font-weight: bold'>
                <input type="button"  value="查找" height:35px onclick="srSerachShiftWork(0,1,0)" >
            </div>
            <div style='margin:8px 0 0 5px;float: left;font-weight: bold' >
                <input   value="清空" type="button" onclick="clearInfo()" height:35px />
            </div>

        </div>

        <%--</fieldset>--%>

    </div>

    <div style="margin-top:30px ">

        <%--<fieldset class="fieldset" style="margin: 0 0 0 13px;width: 930px;height: 400px">

            <legend>
                <font style="font-size: 12px;font-family: ' 微软雅黑 ';" >交班记录</font>
            </legend>--%>

        <div style="margin:50px 5px 0 5px">
            <table  id="shiftRecordTable" style="width:930px;height:538px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
                    data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">

                <thead>
                <tr>
                    <th width="10" align="center" field="jsrEndTime">交班时间</th>
                    <th width="8" align="center" field="jsrEndWorker">交班者</th>
                    <th width="8" align="center" field="jsrStartWorker">接班者</th>
                    <th width="8" align="center" field="jsrRecordedDepositAmount">入账押金额</th>
                    <th width="10" align="center" field="jsrReturnDepositAmount">出账押金额</th>
                    <th width="10" align="center" field="jsrWorkBalance">上班结余</th>
                    <th width="10" align="center" field="jsrPettyCash">备用金</th>
                    <th width="10" align="center" field="jsrTransferAmount">交接金额</th>
                    <th width="10" align="center" field="jsrOtherIncome">其他收入</th>
                    <th width="10" align="center" field="jsrOtherPay">其他支出</th>
                    <th width="10" align="center" field="jsrCheckInNums">开房数</th>
                    <th width="10" align="center" field="jsrCheckOutNums">退房数</th>
                    <%--<th width="4" align="center" field="jsrRemark">备注</th>--%>
                </tr>
                </thead>
            </table>
            <div id="shiftRecordDiv" style="width:100%;height:30px;text-align:center;"></div>
        </div>
        <%--</fieldset>--%>

    </div>

</div>





<!-- 交班报表-->
<div id="shiftPrintDlg" class="easyui-dialog" style="padding: 6px" data-options="closed:true">
    <div id="dlg-toolbar">
        <a href="#" class="easyui-linkbutton" iconCls="icon-print" plain="true" onclick="window.printFrame.print()">打印报表</a>
    </div>
    <div id="onAccountDeposit" type="hidden"></div>
    <div id="outAccountDeposit" type="hidden"></div>
    <iframe id="printFrame" name="printFrame" style="width:100%;height:570px">

    </iframe>

</div>



<script src="js/fg_guestHouseShiftDuty.js"></script>
<script src="js/fg.public.js"></script>
<script src="js/config.js"></script>
</body>
</html>