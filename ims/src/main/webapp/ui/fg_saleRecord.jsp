<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>销售记录</title>
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
<div id="salesGoodsRecords" style="text-align:center">
    <div style="display:flex;padding:15px 0 5px 5px;">
        <div style="margin:0 0 0 5px">
            商品名称：<input id="searchSalesGoodsName" onblur="listGoodsSell(1,0)" style="width:100px"/>
        </div>
        <div style="color:black;font-size:13px;float:left;margin:0 0 0 5px">
            出货时间： <input id="searchSalesGoodsStartTime" style="width:80px" type="text"
                         onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchSalesGoodsEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listGoodsSell(1,0)})">
            到 <input id="searchSalesGoodsEndTime" style="width:80px" type="text"
                     onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchSalesGoodsStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listGoodsSell(1,0)})">
        </div>
        <div style="margin:0 0 0 5px">
            利润：<input id="profit" style="width:100px" readonly="readonly"/>
        </div>
    </div>
     <div id="goodsSellGrid" style="width:100%;height:40%;margin:10px 0 0 0">
        <table id="goodsSellDg" style="width:100%;height:327px;table-layout:fixed;overflow:hidden;"
               class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="cgsGoodsName" width="15" align="center">名称</th>
                <th field="cgsCurrentPrice" width="10" align="center">现价</th>
                <th field="cgsOriginalPrice" width="10" align="center">原价</th>
                <th field="cgsCostPrice" width="10" align="center">成本价</th>
                <th field="cgsSellNum" width="10" align="center">出货数量</th>
                <th field="cgsRemainingNum" width="10" align="center">剩余数量</th>
                <th field="preferential" width="10" align="center">优惠标签</th>
                <th field="sellWell" width="10" align="center">热销标签</th>
                <th field="cgSnType" width="10" align="center">SN类商品</th>
                <th field="suStaffName" width="15" align="center">登记人</th>
                <th field="cgsRegistrationTime" width="15" align="center">登记时间</th>
            </tr>
            </thead>
        </table>
        <div id="goodsSellPageDiv" style="width:100%;text-align:center;"></div>
    </div>
</div>
<script src="js/fg.public.js"></script>
<script src="js/fg_saleRecord.js"></script>
</body>
</html>