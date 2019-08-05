<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.zz.po.sys.SysUserExpand" %>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>商品管理</title>
    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
    <link href="css/upload.css" rel="stylesheet">
    <link href="css/icon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script src="https://unpkg.com/wangeditor@3.1.1/release/wangEditor.min.js"></script>
    <script src="js/config.js"></script>
</head>
<body>
<div class="bodyLoadingOver"></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<div>
    <!--商品管理工具-->
    <div>
        <div style="padding:5px 0 5px 5px;">
            <a class="easyui-linkbutton" iconCls="icon-shangpingpandian" plain="true" onclick="openInventory()">商品盘点</a>
            <a class="easyui-linkbutton" iconCls="icon-caigouruku" plain="true" onclick="openGoodsPurchase()">采购入库</a>
            <a class="easyui-linkbutton" iconCls="icon-caigoujilu" plain="true" onclick="openPurchaseOrder()">采购记录</a>
            <a class="easyui-linkbutton" iconCls="icon-pandianjilu" plain="true" onclick="openCheckGoods()">盘点记录</a>
            <a class="easyui-linkbutton" iconCls="icon-shangpingshangjia" plain="true" onclick="changeOnSale(1)">上架</a>
            <a class="easyui-linkbutton" iconCls="icon-shangpingxiajia" plain="true" onclick="changeOnSale(0)">下架</a>
            <a class="easyui-linkbutton" iconCls="icon-shangchushangping" plain="true"
               onclick="openDeleteGoods()">删除商品</a>
            <a class="easyui-linkbutton" iconCls="icon-tianjiashangping" plain="true" onclick="addGoods()">添加商品</a>
            <a class="easyui-linkbutton" iconCls="icon-shangpingpinlei" plain="true" onclick="addGoodsType()">品类管理</a>
            <!-- <a class="easyui-linkbutton" iconCls="icon-shangdianshezhi" plain="true"   onclick="openShopSetUp()">商店设置</a> -->
            <!-- <a class="easyui-linkbutton" iconCls="icon-shangdianshezhi" plain="true"   onclick="openDiscount()">优惠方案</a> -->
        </div>
        <div style="padding:0px 0 5px 5px;display:flex;">
            <div style="margin:0 0 0 10px">
                商品名称:<input id="searchGoodsName" onblur="listGoods(1,0)" style="width:100px"/>
            </div>
            <div style="margin:0 0 0 10px">
                商品类型:<select id="searchCategoryName" onChange="listGoods(1,0)" style="width:100px;">
                <option></option>
            </select>
            </div>
            <div style="margin:0 0 0 10px">
                商品状态:<select id="searchGoodsState" onChange="listGoods(1,0)" style="width:50px;">
                <option></option>
                <option value="1">上架</option>
                <option value="0">下架</option>
            </select>
            </div>
            <div style="margin:0 0 0 10px">
                优惠状态:<select id="searchGoodsPreferentail" onChange="listGoods(1,0)" style="width:50px;">
                <option></option>
                <option value="1">是</option>
                <option value="0">否</option>
            </select>
            </div>
            <div style="margin:0 0 0 10px">
                热销状态:<select id="searchGoodsSellWell" onChange="listGoods(1,0)" style="width:50px;margin:">
                <option></option>
                <option value="1">是</option>
                <option value="0">否</option>
            </select>
            </div>
        </div>
    </div>

    <div id="goodsDataGrid">
        <table id="goodsDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="cgcCategoryName" width="15" align="center" class="easyui-datagrid">类目</th>
                <th field="cgName" width="15" align="center" class="easyui-datagrid">名称</th>
                <th field="cgCurrentPrice" width="10" align="center" class="easyui-datagrid">现价</th>
                <th field="cgOriginalPrice" width="10" align="center" class="easyui-datagrid">原价</th>
                <th field="cgCostPrice" width="10" align="center" class="easyui-datagrid">成本价</th>
                <th field="cgNum" width="10" align="center" class="easyui-datagrid">数量</th>
                <th field="cgParameter" width="15" align="center" class="easyui-datagrid">型号规格</th>
                <th field="cgPreferential" width="10" align="center" class="easyui-datagrid">优惠标签</th>
                <th field="cgSellWell" width="10" align="center" class="easyui-datagrid">热销标签</th>
                <th field="cgState" width="10" align="center" class="easyui-datagrid">是否上架</th>
                <th field="hasImg" formatter="formatImgState" width="10" align="center" class="easyui-datagrid">图片</th>
            </tr>
            </thead>
        </table>
        <div id="goodsPageDiv" style="width:100%;text-align:center;"></div>
    </div>
</div>
<div id="managerGoodsDlg" class="easyui-dialog" data-options="closed:true">
    <div style="float:left">

        <a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" onclick="openUpdateGoods()">修改商品</a>

    </div>
    <div style="margin: 5px 0 0 0">
        商品名称：<input id="searchName" onblur="listGoodsName()"/>
    </div>
    <table id="goodsNameDg" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
           data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="cgcCategoryName" width="15" align="center">类目</th>
            <th field="cgName" width="15" align="center">名称</th>
        </tr>
        </thead>
    </table>
</div>

<!-- 添加商品-->
<div id="addGoodsDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div style='margin:5px 0 0 12px;float: left;'>
        商品类型：<select id="goodsType" style="width:120px;" choose="choose" require="require">
    </select>
    </div>
    <div style='margin:5px 0 0 5px;float: left;'>
        商品名称：<input id="goodsName" style="width:120px" clear="clear" require="require">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 12px;float: left;'>
        SN码类型：<select id="goodsSN" style="width:120px;" choose="choose" require="require">
        <option value="0" selected="selected">否</option>
        <option value="1">是</option>
    </select>
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 12px;float: left;'>
        商品编码：<input id="goodsCode" style="width:120px" clear="clear" require="require">
    </div>
    <div style='margin:5px 0 0 5px;float: left;'>
        优惠类型：<select id="goodsPreferentialType" style="width:120px;" choose="choose" require="require">
        <option value="0">否</option>
        <option value="1">是</option>
    </select>
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 12px;float: left;'>
        热销类型：<select id="goodsSellWellType" style="width:120px;" choose="choose" require="require">
        <option value="0">否</option>
        <option value="1">是</option>
    </select>
    </div>
    <div style='margin:5px 0 0 5px;float: left;'>
        型号规格：<input id="goodsParameter" style="width:120px" clear="clear">
    </div>
    <div style="clear:both"></div>
    <a style='margin:5px 0 0 12px;' class="easyui-linkbutton" iconCls="icon-fujian" plain="false"
       onclick="openAttachment('public')">上传</a>
    <span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
    <center style="margin:5px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddGoods()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addGoodsDlg').dialog('close')">取消</a>
    </center>
</div>

<!-- 商品详情 -->
<div id="goodsDetailDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <input type="hidden" id="did"/>
    <input type="hidden" id="dcgCategoryId"/>
    <input type="hidden" id="goodsDetail_index"/>
    <div id="showCategoryName" class="updateNone" style='margin:5px 0 0 15px;float: left;'>
        商品类型：<input id="dcgcCategoryName" disabled="disabled" style="width:100px" clear="clear">
    </div>
    <div id="updateCategoryDiv" class="update" style="margin:5px 0 0 15px;float: left;display:none">
        商品类型：<select id="updateCategory" style="width:100px" clear="clear"></select>
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        商品名称：<input id="dcgName" disabled="disabled" style="width:120px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        商品编码：<input id="dcgCode" disabled="disabled" style="width:160px" clear="clear">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;'>
        销售价格：<input id="dcgCurrentPrice" disabled="disabled" style="width:100px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        商品原价：<input id="dcgOriginalPrice" disabled="disabled" style="width:120px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        商品成本：<input id="dcgCostPrice" disabled="disabled" style="width:160px">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;' class="updateNone">
        优惠类型：<input id="dcgPreferential" disabled="disabled" style="width:100px" clear="clear">
    </div>
    <div id="updatePreferentialDiv" class="update" style="margin:5px 0 0 15px;float: left;display:none">
        优惠类型：<select id="updatePreferential" style="width:100px">
        <option value="0">否</option>
        <option value="1">是</option>
    </select>
    </div>
    <div style='margin:5px 0 0 12px;float: left;' class="updateNone">
        热销类型：<input id="dcgSellWell" disabled="disabled" style="width:120px" clear="clear">
    </div>
    <div id="updateSellWellDiv" class="update" style="margin:5px 0 0 12px;float: left;display:none">
        热销类型：<select id="updateSellWell" style="width:120px">
        <option value="0">否</option>
        <option value="1">是</option>
    </select>
    </div>
    <div style='margin:5px 0 0 12px;float: left;' class="updateNone">
        上架状态：<input id="dcgState" disabled="disabled" style="width:160px" clear="clear">
    </div>
    <div id="updateStateDiv" class="update" style="margin:5px 0 0 12px;float: left;display:none">
        上架状态：<select id="updateState" style="width:160px">
        <option value="0">否</option>
        <option value="1">是</option>
    </select>
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;'>
        型号规格：<input id="dcgParameter" disabled="disabled" style="width:100px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        当前数量：<input id="dcgNum" disabled="disabled" style="width:120px" require="require">
    </div>
    <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true"
       onclick="open_common_img_dialog('public', 'fly', 'goodsDg', 'id', 'cgImgPath', 'listGoods', 'deleteImg')">上传及查看图片</a>
    <a class="easyui-linkbutton" iconCls="icon-shengchenggongzibiao" plain="true"
       onclick="openGoodsIntroduce()">商品介绍</a>
    <div style="clear:both"></div>
    <center style="margin:5px 0 0 0;">
        <a class="easyui-linkbutton updateNone" iconcls="icon-up"
           onclick="lastOrNext(0, 'goodsDetail_index', 'goodsDg', 'goodsDetailDlg', 'openGoodsDetail(row)')">上一条</a>
        <a id="beginUpdateGoods" class="easyui-linkbutton  updateNone" iconcls="icon-save" onclick="beginUpdateGoods()">修改</a>
        <a id="doUpdateGoods" style="display:none" class="easyui-linkbutton  update" iconcls="icon-save"
           onclick="doUpdateGoods()">保存</a>
        <a class="easyui-linkbutton updateNone" iconcls="icon-cancel"
           onclick="$('#goodsDetailDlg').dialog('close')">关闭</a>
        <a class="easyui-linkbutton update" style="display:none" iconcls="icon-cancel"
           onclick="cancelUpdateGoods()">取消</a>
        <a class="easyui-linkbutton updateNone" iconcls="icon-down"
           onclick="lastOrNext(1, 'goodsDetail_index', 'goodsDg', 'goodsDetailDlg', 'openGoodsDetail(row)')">下一条</a>
    </center>
</div>


<!-- 商品盘点 -->
<div id="goodsInventoryDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">

    <input type="hidden" id="rid"/>

    <!-- <div style='margin:5px 0 0 15px;float: left;'>
        商品编码：<input id="inventorySearchGoods"  style="width:100px" clear="clear" require="require">
    </div> -->
    <div style="float:left;margin:2% 0 0 15%">
        <input id="inventorySearchGoods" list="goodsList" clear="clear"
               style="width:450px;height:35px;border-radius:5px" placeholder="请输入 商品编号/商品名称"/>
    </div>
    <div style="clear:both"></div>
    <div style='margin:2% 0 0 15px;float: left;'>
        商品类型：<input id="rcgcCategoryName" disabled="disabled" style="width:100px" clear="clear" require="require">
    </div>
    <div style='margin:2% 0 0 12px;float: left;'>
        商品名称：<input id="rcgName" disabled="disabled" style="width:120px" clear="clear" require="require">
    </div>
    <div style='margin:2% 0 0 12px;float: left;'>
        商品编码：<input id="rcgCode" disabled="disabled" style="width:160px" clear="clear" require="require">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;'>
        销售价格：<input id="rcgCurrentPrice" disabled="disabled" style="width:100px" clear="clear" require="require">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        商品原价：<input id="rcgOriginalPrice" disabled="disabled" style="width:120px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        商品成本：<input id="rcgCostPrice" disabled="disabled" style="width:160px" clear="clear">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;'>
        优惠类型：<input id="rnewcgPreferential" disabled="disabled" style="width:100px" clear="clear" require="require">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        热销类型：<input id="rnewcgSellWell" disabled="disabled" style="width:120px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        上架状态：<input id="rnewcgState" disabled="disabled" style="width:160px" clear="clear">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;'>
        型号规格：<input id="rcgParameter" disabled="disabled" style="width:100px" clear="clear">
    </div>
    <div style='margin:5px 0 0 12px;float: left;'>
        盘点备注：<input id="cgiRemark" style="width:352px" clear="clear" require="require">
    </div>
    <div style="clear:both"></div>
    <div style='margin:5px 0 0 15px;float: left;display:flex'>
        <div>当前数量：</div>
        <div id="rcgNum" style="width:100px;text-align:center;font-size:50px"></div>
    </div>
    <div style='margin:5px 15px 0 0;float: right;'>
        盘点数量：<input id="cgiUpdateNum" style="width:160px;font-size:50px;height:60px" clear="clear" require="require">
    </div>
    <div style="clear:both"></div>
    <center style="margin:5px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doInventory()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#goodsInventoryDlg').dialog('close')">关闭</a>
    </center>
</div>

<!-- 添加商品类型-->
<div id="addGoodsTypeDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:0 0 0 10%">
        <select id="allCategory" size="20" style="height: 300px;width: 150px;">
        </select>
    </div>
    <div style="float:left;margin:0 0 0 30px">
        <br><br>
        <input type="button" value="添加" onclick="showAddGoodsType()">
        <br><br>
        <input type="button" value="修改" onclick="showEditGoodsType()">
        <br><br>
        <input type="button" value="删除" onclick="openDeleteGoodsType()"><br><br>
        <select id="newFinancialNatureShow" style="display: none;width: 150px;"></select><br><br>
    </div>
    <div style="clear:both"></div>
    <div class="goodType" id="addGoodsCategory" style='margin:5px 0 0 0;text-align:center;display:none'>
        商品类型名称：<input id="goodsTypeName" style="width:120px" clear="clear" require="require">
        <input type="button" value="提交" onclick="doAddGoodsType()">
    </div>
    <div class="goodType" id="editGoodsCategory" style='margin:5px 0 0 0;text-align:center;display:none'>
        商品类型名称：<input id="editGoodsTypeName" style="width:120px" clear="clear" require="require">
        <input type="button" value="提交" onclick="updateGoodsType()">
    </div>
    <div style="clear:both"></div>
    <center style="margin:15px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addGoodsTypeDlg').dialog('close')">取消</a>
    </center>
</div>

<datalist id="goodsList">
</datalist>

<div id="goodsPurchaseDlg" class="easyui-dialog" data-options="closed:true">
    <div style="float:left;margin:2% 0 0 16%">
        <a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="addGoods()"></a>
    </div>
    <div style="float:left;margin:2% 0 0 1%">
        <input id="searchInput" list="goodsList" class="clean" style="width:450px;height:35px;border-radius:5px"
               placeholder="请输入 商品编号/商品名称"/>
    </div>
    <div style="float:left;margin:2% 0 0 2%">
        <button type="button" onclick="addGoodsPurchase()" class="btn btn-success"
                style="margin:0 0 5px 5px;width:140px;">添加
        </button>
    </div>
    <div style="clear:both"></div>
    <div id="purchaseGoodsGrid" style="width:90%;margin:1% 0 0 5%">
        <table id="purchaseGoodsDg" style="width:100%;height:300px;table-layout:fixed;overflow:hidden;"
               class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <!-- <th field="Lid" width="10" align="center">序号</th> -->
                <th field="cgCode" width="20" align="center">商品编码</th>
                <th field="cgName" width="20" align="center">商品名称</th>
                <th field="cgOriginalPrice" width="10" align="center">原价</th>
                <th field="cgCurrentPrice" width="10" align="center">现价</th>
                <th field="num" width="10" align="center">数量</th>
                <th field="totalPrice" width="10" align="center">小计</th>
            </tr>
            </thead>
        </table>
    </div>
    <div style="clear:both"></div>
    <div style="text-align:center;">
        <div style="float:left;margin:2% 0 0 8%">
            <div style="float:left;margin:3.5% 0 0 0;font-size:20px">
                供货商：
            </div>
            <div style="float:left;margin:2% 0 0 0">
                <input id="supplier" class="clean" onfocus="choseHouse()"
                       style="width:170px;height:35px;border-top: 0;border-left: 0;border-right: 0;font-size:20px"/>
            </div>
        </div>
        <div style="float:left;margin:2% 0 0 5%">
            <div style="float:left;margin:3.5% 0 0 0;font-size:20px">
                采购日期：
            </div>
            <div style="float:left;margin:2% 0 0 0">
                <input type="date" class="clean" id="purchaseDate"
                       style="width:170px;height:35px;border-top: 0;border-left: 0;border-right: 0;font-size:20px"/>
            </div>
        </div>
        <div style="float:left;margin:2% 0 0 5%">
            <div style="float:left;margin:3.5% 0 0 0;font-size:20px">
                合计：
            </div>
            <div style="float:left;margin:2% 0 0 0">
                <input class="clean" id="purchaseTotalPrice" readonly="readonly"
                       style="width:170px;height:35px;border-top: 0;border-left: 0;border-right: 0;font-size:20px"/>
            </div>
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="text-align:center;">
        <div style="float:left;margin:2% 0 0 40%">
            <button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;"
                    onclick="doPurchase()">入库
            </button>
        </div>
    </div>
</div>

<!-- 归属关联列表显示  -->
<div id="choseHouseDlg" style="padding:6px" class="easyui-dialog"
     data-options="closed:true">

    <div id="virtualRelationSelect">
        <div style='margin:0 0 10px 0;'>
            <div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
                <label for="searchVirtualName">名称</label>
                <input style="width:100px;" id="searchVirtualName" onkeyup="choseHouseData(1,0)">
            </div>
            <div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
                <label for="searchVirtualDoorplateno">编号</label>
                <input style="width:100px;" id="searchVirtualDoorplateno" onkeyup="choseHouseData(1,0)">
            </div>
            <div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
                <label for="searchVirtualContact">联系人</label>
                <input style="width:100px;" id="searchVirtualContact" onkeyup="choseHouseData(1,0)">
            </div>
        </div>
    </div>
    <div id="relationDataGrid" style="width:100%;height:89%">
        <div id="choseVirtual" style="width:100%;height:100%;">
            <!-- 选择项目列表 -->
            <table id="choseVirtualTable"></table>
            <div id="choseVirtualPageDiv" style="width:99%;text-align:center;"></div>
        </div>
    </div>
</div>

<!-- 采购流水 -->
<div id="purchaseOrderDlg" class="easyui-dialog" data-options="closed:true">
    <div style="display:flex;padding:15px 0 5px 5px;">
        <div style="margin:0 0 0 5px">
            进货单号：<input id="searchPurchaseNumber" onblur="listPurchaseOrder(1,0)" style="width:100px"/>
        </div>
        <div style="margin:0 0 0 5px">
            供货商：<input id="searchSupplier" onblur="listPurchaseOrder(1,0)" style="width:100px"/>
        </div>
        <div style="color:black;font-size:13px;float:left;margin:0 0 0 5px">
            进货时间： <input id="searchPurchaseStartTime" style="width:80px" type="text"
                         onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchPurchaseEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listPurchaseOrder(1,0)})">
            到 <input id="searchPurchaseEndTime" style="width:80px" type="text"
                     onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchPurchaseStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listPurchaseOrder(1,0)})">
        </div>
        <div style="margin:0 0 0 5px">
            费用：<input id="purchaseMoney" style="width:100px" readonly="readonly"/>
        </div>
    </div>
    <div id="purchaseOrderGrid" style="width:100%;margin:1% 0 0 0%">
        <table id="purchaseOrderDg" style="width:100%;height:300px;table-layout:fixed;overflow:hidden;"
               class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="cgpNumbers" width="15" align="center">进货单号</th>
                <th field="supplierName" width="20" align="center">供货商</th>
                <th field="cgpTotalMoney" width="10" align="center">采购费用</th>
                <th field="suStaffName" width="10" align="center">采购人</th>
                <th field="cgpRegistrationTime" width="10" align="center">采购时间</th>
            </tr>
            </thead>
        </table>
        <div id="purchaseOrderPageDiv" style="width:99%;text-align:center;"></div>
    </div>
    <center style="margin:15px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#purchaseOrderDlg').dialog('close')">关闭</a>
    </center>
</div>

<!-- 采购流水详情 -->
<div id="purchaseOrderDetailDlg" class="easyui-dialog" data-options="closed:true">
    <input type="hidden" id="purchaseOrderDetail_index"/>
    <div style="display:flex;margin:10px 0 0 20px">
        <div style="margin:10px 0 0 10px">
            供货商: <input id="qsupplierName" style="width:100px;"/>
        </div>
        <div style="margin:10px 0 0 10px">
            采购人: <input id="qsuStaffName" style="width:100px;"/>
        </div>
        <div style="margin:10px 0 0 10px">
            订单总价: <input id="qcgpTotalMoney" style="width:100px;"/>
        </div>
        <div style="margin:10px 0 0 10px">
            采购时间: <input id="qcgpRegistrationTime" style="width:120px;"/>
        </div>
    </div>
    <div id="purchaseOrderDetailGrid" style="width:100%;margin:1% 0 0 0%">
        <table id="purchaseOrderDetailDg" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;"
               class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="cgcCategoryName" width="10" align="center">商品分类</th>
                <th field="cgName" width="10" align="center">商品名称</th>
                <th field="cgParameter" width="10" align="center">商品参数</th>
                <th field="newCgCostPrice" width="10" align="center">进货价</th>
                <th field="cgNum" width="10" align="center">采购前数量</th>
                <th field="num" width="10" align="center">采购数量</th>
                <th field="totalPrice" width="10" align="center">小计</th>
            </tr>
            </thead>
        </table>
    </div>
    <center style="margin:15px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-up"
           onclick="lastOrNext(0, 'purchaseOrderDetail_index', 'purchaseOrderDg', 'purchaseOrderDetailDlg', 'openPurchaseOrderDetail(row)')">上一条</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#purchaseOrderDetailDlg').dialog('close')">关闭</a>
        <a class="easyui-linkbutton" iconcls="icon-down"
           onclick="lastOrNext(1, 'purchaseOrderDetail_index', 'purchaseOrderDg', 'purchaseOrderDetailDlg', 'openPurchaseOrderDetail(row)')">下一条</a>
    </center>
</div>

<!-- 盘点记录    -->
<div id="checkGoodsDlg" class="easyui-dialog" data-options="closed:true">
    <div style="display:flex;padding:15px 0 5px 5px;">
        <div style="margin:0 0 0 5px">
            商品名称：<input id="searchCheckGoodsName" onblur="listCheckGoods(1,0)" style="width:100px"/>
        </div>
        <div style="margin:0 0 0 5px">
            商品编码：<input id="searchCheckGoodsCode" onblur="listCheckGoods(1,0)" style="width:100px"/>
        </div>
        <div style="color:black;font-size:13px;float:left;margin:0 0 0 5px">
            盘点时间： <input id="searchCheckGoodsStartTime" style="width:80px" type="text"
                         onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'searchCheckGoodsEndTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listCheckGoods(1,0)})">
            到 <input id="searchCheckGoodsEndTime" style="width:80px" type="text"
                     onfocus="WdatePicker({minDate:'#F{$dp.$D(\'searchCheckGoodsStartTime\',{d:0});}',dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:listCheckGoods(1,0)})">
        </div>
    </div>
    <div id="checkGoodsGrid" style="width:100%;margin:1% 0 0 0%">
        <table id="checkGoodsDg" style="width:100%;height:276px;table-layout:fixed;overflow:hidden;"
               class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="cgName" width="15" align="center">商品名称</th>
                <th field="cgiBeforeNum" width="10" align="center">盘点前数量</th>
                <th field="cgiUpdateNum" width="10" align="center">盘点数量</th>
                <th field="suStaffName" width="10" align="center">盘点人</th>
                <th field="cgiRemark" width="20" align="center">盘点备注</th>
                <th field="cgiRegisterTime" width="15" align="center">盘点时间</th>
            </tr>
            </thead>
        </table>
        <div id="checkGoodsPageDiv" style="width:99%;text-align:center;"></div>
    </div>
    <center style="margin:15px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#checkGoodsDlg').dialog('close')">关闭</a>
    </center>
</div>


<div id="menu" class="easyui-menu" style="width:120px;">
    <div><a class="easyui-linkbutton" iconCls="icon-shangpingshangjia" plain="true" onclick="changeOnSale(1)">上架</a>
    </div>
    <div><a class="easyui-linkbutton" iconCls="icon-shangpingxiajia" plain="true" onclick="changeOnSale(0)">下架</a></div>
    <div><a class="easyui-linkbutton" iconCls="icon-shangchushangping" plain="true" onclick="openDeleteGoods()">删除商品</a>
    </div>
</div>

<div id="shopSetUpDlg" class="easyui-dialog" data-options="closed:true">
    <div style="margin:10px 0 0 20px;float:left">
        配送费用:<input type="number" data-type="money" id="cgsuShippingFee" style="width:100px"/>
    </div>
    <div style="margin:10px 0 0 20px;float:left">
        允许欠结:<select id="cgsuOweState">
        <option value="1">允许</option>
        <option value="0">不允许</option>
    </select>
    </div>
    <div style="margin:10px 0 0 20px;float:left">
        最大欠结:<input type="number" data-type="money" id="cgsuOweMax" style="width:100px"/>
    </div>
    <div style="margin:10px 0 0 20px;float:left">
        商店名字:<input id="cgsuShopName" style="width:100px"/>
    </div>
    <div style="clear:both"></div>
    <div style="margin:10px 0 0 20px;float:left">
        满减运费:<input type="number" data-type="money" id="cgsuFreeShippingFeeNum" style="width:100px"/>
    </div>
    <div style="margin:10px 0 0 20px;float:left">
        广告图片:<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic()">上传及查看图片</a>
    </div>
    <div style="margin:10px 0 0 20px;float:left">
        执照图片:<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic1()">上传及查看图片</a>
    </div>
    <div style="clear:both"></div>
    <div style="margin:10px 0 0 20px;float:left">
        营业时间:<input id="cgsuBeginTime" type="time" style="width:100px"/>
    </div>
    <div style="margin:10px 0 0 20px;float:left">
        到 <input id="cgsuEndTime" type="time" style="width:100px"/>
    </div>
    <div style="margin:10px 0 0 20px;float:left">
        营业状态: <select id="cgsuState">
        <option value="1">营业中</option>
        <option value="0">停业中</option>
    </select>
    </div>
    <div style="clear:both"></div>
    <fieldset class="clearfix" id="cgsuShopAccount" style="width:30%;float:left;margin:10px 0 0 40px;">
        <legend>
            <font style='font-size: 18px;font-family: ' 微软雅黑 ';' color='#50B4D2'>新零售商户平台结算账户</font>
        </legend>
        <div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
            <input style="display:none" class="accountId">
            <div style="margin:5px 0 0 5px;float:left;">
                收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
            </select>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
            </select>
            </div>
            <div style="clear:both"></div>
            <div style='margin:5px 0 0 5px;float: left;'>
                账户号码：<input style="width:150px" class="accountNum" readonly>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                账户归属：<input style="width:150px" class="accountBelong" readonly>
            </div>
        </div>
    </fieldset>
    <fieldset class="clearfix" id="cgsuCashAccount" style="width:30%;float:left;margin:10px 0 0 100px;">
        <legend>
            <font style='font-size: 18px;font-family: ' 微软雅黑 ';' color='#50B4D2'>新零售商户现金账户</font>
        </legend>
        <div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
            <input style="display:none" class="accountId">
            <div style="margin:5px 0 0 5px;float:left;">
                收款账户：<select style="width:150px;" class="accountType" onchange="changeWay(this)">
            </select>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                账户名称：<select style="width:150px" class="accountName" onchange="getAccountId(this)">
            </select>
            </div>
            <div style="clear:both"></div>
            <div style='margin:5px 0 0 5px;float: left;'>
                账户号码：<input style="width:150px" class="accountNum" readonly>
            </div>
            <div style='margin:5px 0 0 5px;float: left;'>
                账户归属：<input style="width:150px" class="accountBelong" readonly>
            </div>
        </div>
    </fieldset>
    <div style="clear:both"></div>
    <div style="margin:10px 0 0 20px;float:left;width:325px;">
        <div style="font-size:15px;margin:0 0 0 100px">文字轮播<img src="img/add.png" onclick="addInput('ad')"
                                                                style="height:20px;width:20px;margin: 0px 0 -4px 10px"/>
        </div>
        <div id="ad" style="margin:0px 0 0 0 ">
            <div style="margin:0 0 0 0px"><input class="adFontItem" value="" style="width:280px;margin:10px 0 0 0"/>
            </div>
            <div style="margin: 10px 0 0 0px"><input class="adFontItem" value="" style="width:280px;"/><img
                    src="img/minus.png" style="height:20px;width:20px;margin: 0px 0 -5px 10px"/></div>
        </div>
    </div>
    <div style="margin:10px 0 0 20px;float:left;width:325px;">
        <div style="font-size:15px;margin:0 0 0 100px">送货小区<img src="img/add.png" onclick="addInput('address')"
                                                                style="height:20px;width:20px;margin: 0px 0 -4px 10px"/>
        </div>
        <div id="address" style="margin:0px 0 0 0 ">
        </div>
    </div>
    <div style="clear:both"></div>
    <center style="margin:15px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#shopSetUpDlg').dialog('close')">取消</a>
    </center>
</div>

<div id="shopImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="padding:5px 0 0 10px;">
        <a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadPic()">上传</a>
        <a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removePic()">选择删除</a>
        <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refresh()">刷新</a>
    </div>
    <div id="removePicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
    <div style="clear:both"></div>
    <left>
        <div id='doRemovePic' style='margin:10px 0 0 10px;display:none;'>
            <a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemovePic()">删除</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel()">取消</a>
        </div>
    </left>
    <div id="imgWrapper" style="margin:10px 0 0 10px;"></div>

</div>

<div id="shopLincenseImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="padding:5px 0 0 10px;">
        <a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadPic1()">上传</a>
        <a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removePic1()">选择删除</a>
        <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refresh1()">刷新</a>
    </div>
    <div id="removePicture1" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
    <div style="clear:both"></div>
    <left>
        <div id='doRemovePic1' style='margin:10px 0 0 10px;display:none;'>
            <a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemovePic1()">删除</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel1()">取消</a>
        </div>
    </left>
    <div id="imgWrapper1" style="margin:10px 0 0 10px;"></div>

</div>

<!-- 优惠方案 -->
<div id="discountDlg" class="easyui-dialog" data-options="closed:true">
    <a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"
       onclick="openDiscountOpreation(1)">添加优惠方案</a>
    <a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"
       onclick="startAndEndPlan(1)">启用</a>
    <a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"
       onclick="startAndEndPlan(0)">停用</a>
    <a class="easyui-linkbutton" iconCls="icon-xinzengshouzhi" plain="true" style="margin:5px 0 0 10px"
       onclick="startAndEndPlan(2)">删除</a>
    <div id="discountGrid" style="width:100%;margin:0.5% 0 0 0%">
        <table id="discountDg" style="width:100%;height:276px;table-layout:fixed;overflow:hidden;"
               class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="cgdName" width="15" align="center">方案名称</th>
                <th field="categoryName" width="10" align="center">优惠品类</th>
                <th field="cgdType" width="10" align="center">方案类型</th>
                <th field="cgdDescribe" width="20" align="center">方案描述</th>
                <th field="state" width="10" align="center">方案状态</th>
                <th field="cgdRegisterTime" width="15" align="center">登记时间</th>
            </tr>
            </thead>
        </table>
        <div id="checkGoodsPageDiv" style="width:99%;text-align:center;"></div>
    </div>
    <center style="margin:15px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#discountDlg').dialog('close')">关闭</a>
    </center>
</div>

<!-- 添加 修改 优惠方案详情 -->
<div id="discountOpreationDlg" class="easyui-dialog" data-options="closed:true">
    <input type="hidden" id="cgdId"/>
    <div style="margin:20px 0 0 30px">
        名称方案：<input id="discountName" style="width:200px;border-left:0px;border-top:0px;border-right:0px;"
                    clean="clean"/>
    </div>
    <div style="margin:10px 0 0 30px">
        优惠类型：<select id="discountType" onchange="checkDiscountType()" style="width:200px;" clean="clean">
        <option></option>
        <option value="通用满减">通用满减</option>
        <option value="优惠满减">优惠满减</option>
        <option value="品类满减">品类满减</option>
    </select>
    </div>
    <div id="discountCategory" style="margin:10px 0 0 30px;display:none">
        选择品类：<select id="discountCategoryId" style="width:200px;" clean="clean"></select>
    </div>
    <div style="margin:10px 0 0 30px">
        方案阶梯：<select id="discountLadder" onchange="changLadder()" style="width:200px;" clean="clean">
        <option></option>
        <option value="1">一级</option>
        <option value="2">二级</option>
        <option value="3">三级</option>
    </select>
    </div>
    <div style="margin:10px 0 0 30px">
        方案描述：<textarea id="describe" style="width:200px;height:50px" clean="clean"></textarea>
    </div>
    <div style="margin:10px 0 0 30px">
        <div>优惠阶梯:</div>
        <div id="ladderDiv"></div>
    </div>
    <center style="margin:30px 0 0 0;">
        <a id="saveDiscountButton" style="display:none" class="easyui-linkbutton" iconcls="icon-save"
           onclick="saveDiscount()">保存</a>
        <a id="updateDiscountButton" style="display:none" class="easyui-linkbutton" iconcls="icon-save"
           onclick="beginUpdateDiscount()">修改</a>
        <a id="doUpdateDiscountButton" style="display:none" class="easyui-linkbutton" iconcls="icon-save"
           onclick="doUpdate()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#discountOpreationDlg').dialog('close')">取消</a>
    </center>
</div>

<!-- 商品介绍窗口 -->
<diV id="goodsIntroduce" class="easyui-dialog" data-options="closed:true">
    <div>
        <div id="editor">
        </div>
    </div>
    <div style="both:clean;"></div>
    <center style="margin:30px 0 0 0;">
        <a id="saveDiscountButton" class="easyui-linkbutton" iconcls="icon-save" onclick="updateEdit()">保存</a>
    </center>
</diV>

<!--添加sn码窗口-->
<div id="addSNDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">

    <input id="goodsSNIndex" type="hidden"/>

    <div style="text-align:center;">
        SN码：<input id="addSnInput"/>
        <button type="button" onclick="addSNToTable()" class="btn btn-success" style="margin:0 0 5px 5px;width:80px;">
            添加
        </button>
    </div>
    <div id="addSnDataGrid" style="width:100%;height:220px;">
        <table id="addSnTable" style="width:100%;height:200px;table-layout:fixed;overflow:hidden;"
               class="easyui-datagrid"
               data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, pageSize:10, fitColumns:true, scrollbarSize:0">
            <thead>
            <tr>
                <th field="sn" width="30" align="center">SN码</th>
                <th field="delete" width="15" align="center" formatter="deleteSn">删除</th>
            </tr>
            </thead>
        </table>
    </div>
    <div style="text-align: center;width:100%">
        本次新增<span id="snTotalNum">0</span>个商品
    </div>
    <center style="margin:20px 0 0 0;">
        <a id="saveDiscountButton" class="easyui-linkbutton" iconcls="icon-save" onclick="saveSNs()">保存</a>
    </center>
</div>

<script type="text/javascript">
    //富文本编辑器的初始化
    //如果要看文档 http://www.wangeditor.com/

    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.customConfig.uploadImgShowBase64 = true
    // 自定义菜单配置
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'undo',  // 撤销
        'redo'  // 重复
    ]
    editor.create()
</script>

<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
<script src="js/upload.js"></script>
<script src="js/fg.public.js"></script>
<script src="js/fg_shopGoodsManagement.js"></script>
</body>
</html>