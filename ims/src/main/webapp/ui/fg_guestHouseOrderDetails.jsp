<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" pageEncoding="UTF-8"%>

<!-- 订单详情 -->
<div id="orderDetailDlg"  class="easyui-dialog" data-options="closed:true">
    <input type="hidden" id="orderDetail_index" />
    <input id="djsrcId" type="hidden" clear="clear"/>
    <input id="djsrcAdditionalDescription" type="hidden" />
    <input id="djsrcAdditionalCost" type="hidden" />
    <input id="djsrcFollow" type="hidden" />
    <input id="djsrcFirstPay" type="hidden" clear="clear"/>
    <input id="jhpSpecialNumber" type="hidden" clear="clear"/>
    <div id=""  style='margin:5px 0 0 15px;float: left;'>
        入住客房：<input id="daddress" readonly="readonly" style="width:130px"  clear="clear" >
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        客房类型：<input id="dhsRoomType" readonly="readonly" style="width:130px"  clear="clear" >
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        客户姓名：<input id="drenterName" readonly="readonly" style="width:130px" clear="clear">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;'>
        日均单价：<input id="djsrcDailyPrice" readonly="readonly"  style="width:130px"  >
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        总住天数：<input id="djsrcTotalDays"  readonly="readonly" style="width:130px" clear="clear" >
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        总住金额：<input id="djsrcTotalPrice" readonly="readonly" style="width:130px" clear="clear">
    </div>
    <div style="clear:both"></div>
    <div id="popInfo" style='float: left;'>
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;' >
        客房押金：<input id="djsrcDeposit" readonly="readonly"  style="width:130px" clear="clear" >
    </div>
    <div style='margin:5px 0 0 12px;float: left;' >
        入住时间：<input id="djsrcBeginTime" readonly="readonly"  style="width:130px" clear="clear" >
    </div>
    <div style='margin:5px 0 0 12px;float: left;' >
        退房时间：<input id="djsrcEndTime" readonly="readonly" style="width:130px" clear="clear">
    </div>
    <div style='margin:5px 0 0 15px;float: left;' >
        订单状态：<input id="djsrcState" readonly="readonly" style="width:130px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;' >
        入住类型：<input id="djsrcTypeOccupancy" readonly="readonly" style="width:130px" clear="clear">
    </div>
    <div>
        <a id="purchaseHistory" style="margin:0 0 0 5px;" class="easyui-linkbutton" iconCls="icon-shangdianshezhi" plain="true"   onclick="openPurchaseHistory()">消费记录</a>
    </div>
    <div style="clear:both"></div>
    <div style="margin:5px 0 0 0;">
        <table id="orderFllowDg" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="registrantName" width="15" align="center">操作人</th>
                <th field="type" width="15"align="center">类型</th>
                <th field="text" width="60" align="center">操作记录</th>
                <th field="time" width="30" align="center">操作时间</th>
            </tr>
            </thead>
        </table>
    </div>
    <center style="margin:5px 0 0 0;">
        <a class="easyui-linkbutton updateNone" iconcls="icon-up" onclick="lastOrNext(0, 'orderDetail_index', 'shortRentOrderDg', 'orderDetailDlg', 'openOrderDetail(row)')">上一条</a>
        <a id="refundOrder" class="easyui-linkbutton" iconcls="icon-tuikuan" onclick="refundOrder()">退单</a>
        <a id="print" class="easyui-linkbutton" iconCls="icon-print">打印票据</a>
        <a class="easyui-linkbutton updateNone" iconcls="icon-cancel" onclick="$('#orderDetailDlg').dialog('close')">关闭</a>
        <a class="easyui-linkbutton updateNone" iconcls="icon-down" onclick="lastOrNext(1, 'orderDetail_index', 'shortRentOrderDg', 'orderDetailDlg', 'openOrderDetail(row)')">下一条</a>
    </center>
</div>

<div id="purchaseHistoryDlg" class="easyui-dialog" data-options="closed:true">
    <div style="margin:10px 0 0 5px">
        总金额：<input readonly="readonly" id="totalMoney" style="width:130px;text-align:center" clear="clear"/> 元
    </div>
    <div  style="margin:10px 0 0 0">
        <table id="purchaseHistoryTable" style="width:100%;height:250px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
            <thead>
            <tr>
                <th field="popservice" width="15" align="center">服务类型</th>
                <th field="popcharge" width="10" align="center">服务金额</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

<!-- 退定中审批窗口 -->
<div id="unsubscribeDlg" class="easyui-dialog" data-options="closed:true">
    <center>
        <a id="allowUnsubscribe" class="easyui-linkbutton" style="margin:18px 10px 0 0; iconcls="icon-ok" onclick="unsubscribe(0)">允许退定</a>
        <a id="notAllowUnsubscribe" class="easyui-linkbutton" style="margin:18px 10px 0 0; iconcls="icon-no" onclick="unsubscribe(1)">退定取消</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" style="margin:18px 0 0 0; onclick="$('#unsubscribeDlg').dialog('close')">取消</a>
    </center>
</div>

<!-- 账单打印窗口 -->
<div id="printDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div id="dlg-toolbar">
        <input type="hidden" id="print_index">
        <table cellpadding="0" cellspacing="0" style="width:100%">
            <tr>
                <td>
                    <a href="#" class="easyui-linkbutton" iconCls="icon-print" plain="true" onclick="window.printFrame.print()">打印票据</a>
                    <a href="#" class="easyui-linkbutton" iconCls="icon-up" plain="true" onclick="laterOrNext(0)">上一条</a>
                    <a href="#" class="easyui-linkbutton" iconCls="icon-down" plain="true" onclick="laterOrNext(1)">下一条</a>
                </td>
            </tr>
        </table>
        <iframe id="printFrame" name="printFrame" style="width:100%;height:570px">

        </iframe>
    </div>
</div>
<script src="js/fg_guestHouseOrderDetails.js"></script>
<!-- <script src="js/fg_shortRentOrder.js"></script> -->
