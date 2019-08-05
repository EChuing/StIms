<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>房间列表</title>
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
    <%--城区、片区、楼盘名称、楼栋、门牌号、户型、面积、朝向--%>
    <div style="margin:10px 0 0 10px;float:left">
        <a class="easyui-linkbutton" plain="true" iconCls="icon-add" id="batchAddHouseRoom" onclick="batchAddHouseRoom()">批量添加房间</a>
    </div>
    <div style="clear:both"></div>
    <div style="margin:10px 0 0 10px;float:left">
        <div style="float:left;">
            城区 : <select id="searchAddDistrict" onchange="queryHouseRoom(1)">
                <option></option>
            </select>
        </div>
        <div style="float:left;margin-left:10px">
            房间名称 : <input id="hsAddCommunity" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHouseRoom(1)')"/>
        </div>
        <div style="float:left;margin-left:10px">
            楼栋 : <input id="hsAddBuilding" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHouseRoom(1)')"/>
        </div>
        <div style="float:left;margin-left:10px">
            门牌号 : <input id="hsAddDoorplateno" onkeyup="searchOnkeyup(this.id, '_indexNum[0] = 0;queryHouseRoom(1)')"/>
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="margin-top:10px;float:left;width:100%">
        <table id="virtualDataGrid"  style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
               data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false,">
            <thead>
                <tr>
                    <th field="hsAddDistrict" width="10" align="center">城区</th>
                    <th field="hsAddZone" width="15" align="center">片区</th>
                    <th field="address" width="20" align="center">楼盘名称</th>
                    <th field="hsSectionType" width="15" align="center">户型</th>
                    <th field="hsHouseSquare" width="10" align="center">面积</th>
                    <th field="hsHouseDirection" width="10" align="center">朝向</th>
                </tr>
            </thead>
        </table>
        <div id="houseRoomPageDiv" style="width:100%;text-align:center;"></div>
    </div>

    <!-- 批量添加客房窗口 -->
    <div id="batchAddHouseRoomDlg" class="easyui-dialog" data-options="closed:true">
        <iframe id="batchAddHouseRoomBill" style="width:100%;height:99%;boder:0px;" frameborder="0" scrolling="auto">
        </iframe>
    </div>

    <!-- 办公区详细信息窗口 -->
    <div id="intelligentEquipment" style="padding:6px" class="easyui-dialog" data-options="closed:true">
        <div id="operationWindow" class="easyui-tabs">
            <!-- 智能设备 -->
            <div title="智能设备" id="detailDeviceInfo" tabindex="0" style="padding:5px 0 0 12px;">
                <div class="clearfix">
                    <a class="easyui-linkbutton" plain="true" iconCls="icon-add" onclick="bindDevice_office()">绑定设备</a>
                    <a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="deviceControl" onclick="chooseOperateDlg()">操作设备</a>
                </div>
                <div style="padding:5px 0 0 0;">
                    <table id="deviceInfoTable" style="width:98%;height:402px;table-layout:fixed;overflow:hidden;"
                           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
                        <thead>
                            <tr>
                                <th field="brandName" width="20" align="center" hidden="hidden">设备品牌</th>
                                <th field="brandType" width="10" align="center">设备类型</th>
                                <th field="brandModel" width="20" align="center">设备型号</th>
                                <th field="devNickname" width="30" align="center">设备名称</th>
                                <th field="devState" width="30" align="center" >在线状态</th>
                                <th field="devStatus" width="30" align="center" >设备状态</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <jsp:include page="/ui/device_office.jsp"></jsp:include>
    <script src="js/device_office.js"></script>
    <script src="js/fg.public.js"></script>
    <script src="js/fg_houseRoomList.js"></script>
</body>
</html>