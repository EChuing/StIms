<%--<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>民宿设置</title>
    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
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
    <script src="js/config.js"></script>

    <link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
    <link href="css/upload.css" rel="stylesheet">
    <link href="css/contextMenu.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
</head>
<style>
    .roomTypePhoto{
        background-color: #4CAF50;
        border: none;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        -webkit-transition-duration: 0.4s;
        transition-duration: 0.4s;
        cursor: pointer;
        background-color: white;
        color: black;
        border: 2px solid #e7e7e7;
    }
</style>
<body>
<div class="bodyLoadingOver" ></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<div id="mssetUpDlg" style="padding:6px;">
    <input type="hidden" id="msjsrsuAdImgs">
    <input type="hidden" id="msjsrsuId">
    <input type="hidden" id="msjsrsu_room_type">
    <div style="float:left;margin:10px 0 0 16px">
        入住时间：<input type="time"  id="msjsrsuCheckInTime" style="width:100px;text-align:center"/>
    </div>
    <div style="float:left;margin:10px 0 0 12px">
        退房时间：<input type="time"  id="msjsrsuCheckOutTime" style="width:100px;text-align:center"/>
    </div>
    <div style="float:left;margin:10px 0 0 12px">
        对外简称：<input type="text"  id="msjsrsuWxgzhTitle" style="width:100px;text-align:center"/>
    </div>
    <div style="float:left;margin:10px 0 0 12px">
        客服电话：<input type="text"  id="msjsrsuTelphone" style="width:100px;text-align:center"/>
    </div>
    <div style="float:left;margin:10px 0 0 46px">
        最长订房时间：<input type="text"  id="msjsrsuLongestBookingDays" style="width:100px;text-align:center"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 15px">
        线上下单：<select id="msjsrsuState">
        <option value="1">是</option>
        <option value="0">否</option>
    </select>
    </div>
    <div style="float:left;margin:10px 0 0 12px">
        提前搬离退房费：<select id="msjsrsuRefundRoomCharge">
        <option value="1">允许</option>
        <option value="0">不允许</option>
    </select>
    </div>
    <div style="float:left;margin:10px 0 0 16px">
        提前搬离，超过<input type="time"  id="msjsrsuRefundRoomChargeTime" style="width:100px;text-align:center"/>时刻，收取整天房费
    </div>
    <div style="float:left;margin:10px 0 0 12px">
        未来多少天可以预定：<input type="text"  id="msjsrsuFutureBookingDays" style="width:100px;text-align:center"/>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 15px">
        民宿介绍：<textarea type="text"  id="msjsrsuGrogshopIntroduce" style="width:850px;text-align:center"></textarea>
    </div>
    <!-- 公众号的交易 -->
    <div style="clear:both"></div>
    <div style="float:left;margin:0 0 0 16px;width:90%;">
        <h3 style="font-size: 15px;color:black;">交易规则</h3>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:0 0 0 16px">
        预定方式：<textarea type="text"  id="msjsrsuPredeterminedMode" style="height:25px;width:200px;text-align:center"/></textarea>
    </div>
    <div style="float:left;margin:0 0 0 12px">
        入住天数：<textarea type="text"  id="msjsrsuCheckInMode" style="height:25px;width:200px;text-align:center"/></textarea>
    </div>

    <div style="float:left;margin:0 0 0 20px">
        其他费用：<textarea type="text"  id="msjsrsuOtherExpenses" style="height:25px;width:200px;text-align:center"/></textarea>
    </div>
    <div style="float:left;margin:0 0 0 12px">
        在线订金比: <textarea type="text"  id="msjsrsuOnlineDepositRatio" style="height:25px;width:200px;text-align:center"/></textarea>
    </div>
    <div style="clear:both"></div>
    <div style="float:left;margin:10px 0 0 39px">
        押金：<textarea type="text"  id="msjsrsuTradingDeposit" style="height:25px;width:200px;text-align:center"/></textarea>
    </div>
    <div style="float:left;margin:10px 0 0 37px">
        加客：<textarea type="text"  id="msjsrsuAddGuest" style="height:25px;width:200px;text-align:center"/></textarea>
    </div>
    <div style="float:left;margin:10px 0 0 20px">
        入住须知：<textarea type="text"  id="msjsrsuInstructionsForAdmission" style="height:25px;width:200px;text-align:center"/></textarea>
    </div>
    <div style="float:left;margin:10px 0 0 20px">
        公众号首页顶部广告: <a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="false" onclick="checkPic(0)">上传及查看图片</a>
    </div>
    <div style="clear:both"></div>
    <div></div>
    <!-- 钟点房规则 -->
    <div style="float:left;">
        <div style="height:20px;padding:0;width:150px;margin: 0">
            <h4 style="margin-left:20px;height:20px;width: 100px">钟点房使用规则</h4>
        </div>
        <div style="float:left;margin:10px 0 0 16px;clear:both">
            使用时间：<input type="time"  id="mshourRoomStartTime" style="width:100px;text-align:center"/>--
            --<input type="time"  id="mshourRoomEndTime" style="width:100px;text-align:center"/>
        </div>
        <!-- <div style="float:left;margin:10px 0 0 12px">
            退房时间：<input type="time"  id="msJsrsuCheckOutTime" style="width:100px;text-align:center"/>
        </div> -->
        <div style="float:left;margin:10px 0 0 12px">
            钟点房：<select id="mshourRoom">
            <option value="1">1小时</option>
            <option value="2">2小时</option>
            <option value="3">3小时</option>
            <option value="4">4小时</option>
            <option value="5">5小时</option>
            <option value="6">6小时</option>
        </select>
        </div>
    </div>

    <div style="float:left;margin:0 0 0 20px">
        <div style="height:20px;width:150px;margin:0 0 0 12px">
            <h4 style="height:20px;width: 100px">押金支付规则</h4>
        </div>
        <div style='margin:0 0 0 12px' id="msjsrsuDepositRules">
            <label>支付方式:</label>
            <input type="checkbox" class="depositRules" name="depositPay" onclick="depositPayType(0)" id="msdepositPayOnline" value="0">线上支付
            <input type="checkbox" class="depositRules" name="depositPay" onclick="depositPayType(1)" id="msdepositPayScene" value="1">现场支付
        </div>
        <div style="float:left;margin:10px 0 0 12px">
            在线订金比: <input type="number"  id="msonlineDepositPrcent" style="height:20px;width:30px;text-align:center"/>% 房费
        </div>
        <div style="clear:both"></div>
        <div style='margin:5px 0 0 12px' id="msjsrsuDepositRules">
            <label>押金设置:</label>
            <input type="checkbox" onclick="depositSetType()" id="msdepositSetType">手动设置押金
            押金金额: <input type="number"  id="msdepositMoney" style="height:20px;width:80px;text-align:center;"/>
        </div>
    </div>
    <div style="clear:both"></div>
    <div style="margin:10px 0 0 20px;float:left;">
        <div style="font-size:15px;margin:0 0 0 0">房型字段<img src="img/add.png" onclick="addInput('jsrsuRoomType')" style="height:20px;width:20px;margin: 0px 0 -4px 10px" /></div>
        <div id="msjsrsuRoomType" style="margin:0px 0 0 0 "></div>
    </div>
    <div style="float:left;margin-left:20px;">
        <fieldset class="clearfix" style="width:350px;float:left;margin:10px 0 0 20px;">
            <legend>
                <font style='font-size: 18px;font-family: 微软雅黑 ; color:#50B4D2'>电子门牌设置</font>
            </legend>
            <div class="clearfix" style="margin:0 0 5px 5px;color:black;font-size:13px;">
                <div class="electronicDoorplateno" style="margin:5px 10px 0 5px;float:left">
                    按键0名称：<select id="mskey0" class="key" style="width:150px;" onchange="checkKeyName(0)">
                    <option></option>
                    <option>请莫打扰</option>
                    <option>保洁服务</option>
                    <option>已入住</option>
                </select>
                </div>
                <div style="margin:5px 0 0 0;float:left;display:none"  class="scenarioModeDiv">
                    设为情景模式：<input type="checkbox" class="scenarioMode">
                </div>
                <div style="clear:both"></div>
                <div class="electronicDoorplateno" style="margin:5px 10px 0 5px;float:left;">
                    按键1名称：<select id="mskey1" class="key" style="width:150px" onchange="checkKeyName(1)">
                    <option></option>
                    <option>请莫打扰</option>
                    <option>保洁服务</option>
                    <option>已入住</option>
                </select>
                </div>
                <div style="margin:5px 0 0 0;float:left;display:none"  class="scenarioModeDiv">
                    设为情景模式：<input type="checkbox" class="scenarioMode">
                </div>
                <div style="clear:both"></div>
                <div class="electronicDoorplateno" style="margin:5px 10px 0 5px;float:left;">
                    按键2名称：<select id="mskey2" class="key" style="width:150px" onchange="checkKeyName(2)">
                    <option></option>
                    <option>请莫打扰</option>
                    <option>保洁服务</option>
                    <option>已入住</option>
                </select>
                </div>
                <div style="margin:5px 0 0 0;float:left;display:none"  class="scenarioModeDiv">
                    设为情景模式：<input type="checkbox" class="scenarioMode">
                </div>
            </div>
        </fieldset>
    </div>

</div>



<div style="clear:both"></div>
<div>
    <fieldset class="clearfix" id="msjsrsuShopAccount" style="width:30%;float:left;margin:10px 0 0 20px;">
        <legend>
            <font style='font-size: 18px;font-family: 微软雅黑 ;color:#50B4D2'>民宿平台结算账户</font>
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
            <center style="margin:15px 0 0 0;">
                <a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
            </center>
        </div>
    </fieldset>
    <fieldset class="clearfix" id="msjsrsuCashAccount" style="width:30%;float:left;margin:10px 0 0 100px;">
        <legend>
            <font style='font-size: 18px;font-family: 微软雅黑 ; color:#50B4D2'>民宿现金结算账户</font>
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
            <center style="margin:15px 0 0 0;">
                <a class="easyui-linkbutton" iconcls="icon-save" onclick="updateShopSetUp()">保存</a>
            </center>
        </div>
    </fieldset>
</div>
<div style="clear:both"></div>
<div style="float:left;width:99%;height:300px;margin:0 0 0 10px">
    <div style="float:left">
        <h4 style="font-size: 14px;color:black;margin:13px 0 0 6px;">服务消费</h4>
    </div>
    <div style="float:left;margin:0 0 0 10px">
        <a style="float:left;margin:10px 10px 10px 10px" class="easyui-linkbutton" iconcls="icon-add" onclick="addService()">添加</a>
    </div>
    <div style="clear:both"></div>
    <table id="msserviceCharge"></table>
    <div style="clear:both"></div>
    <center style="margin:25px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doSetUp()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#setUpDlg').dialog('close')">关闭</a>
    </center>
</div>
<!-- 上传及查看图片窗口 -->
<div id="msadImgDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
    <div style="padding:5px 0 0 10px;">
        <a class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="uploadPic()">上传</a>
        <a class="easyui-linkbutton" iconCls="icon-shanchutupian" plain="true" onclick="removePic()">选择删除</a>
        <a class="easyui-linkbutton" iconCls="icon-shuaxin" plain="true" onclick="refresh()">刷新</a>
    </div>
    <div id="msremovePicture" style="margin:10px 0 0 10px;font-size:16px;color:#F00;display:none;"></div>
    <div style="clear:both"></div>
    <left>
        <div id='doRemovePic' style='margin:10px 0 0 10px;display:none;'>
            <a class="easyui-linkbutton" iconcls="icon-remove" onclick="doRemovePic()">删除</a>
            <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="doCancel()">取消</a>
        </div>
    </left>
    <div id="msimgWrapper" style="margin:10px 0 0 10px;"></div>

</div>

<div id="msaddServiceDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div  style="width:250px;margin:10px 0 0 10px;">
        服务：<input style="width: 200px;"id="msservice">
    </div>
    <div  style="width:250px;margin:10px 0 0 10px;">
        金额：<input style="width: 200px;" id="mscharge" type="number">
    </div>
    <div style="clear:both"></div>
    <center style="margin:25px 0 0 0;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doservice()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addServiceDlg').dialog('close')">关闭</a>
    </center>
</div>

<!-- 房型配置窗口 -->
<div id="msroomConfiguration" class="easyui-dialog" data-options="closed:true" >
    <div style="float:left;margin:10px 0 10px 20px">客房配置：</div>
    <div style="clear:both"></div>
    <div class="configuration" style="float:left;">
        <button type="button" class="btn btn-default btn-xs" style="margin:0 0 10px 5px;width:80px;" value="热水淋浴">热水淋浴</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="无线网络">无线网络</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="空调">空调</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="电视">电视</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="门禁系统">门禁系统</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="停车位">停车位</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="热水壶">热水壶</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="有线网络">有线网络</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="电脑">电脑</button>
        <div style="clear:both"></div>
        <button type="button" class="btn btn-default btn-xs" style="margin:0 0 10px 5px;width:80px;" value="拖鞋">拖鞋</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="纸巾">纸巾</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="牙具">牙具</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="毛巾">毛巾</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="浴液">浴液</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="洗发水">洗发水</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="香皂">香皂</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="浴巾">浴巾</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:10px;width:80px;" value="剃须刀">剃须刀</button>
        <div style="clear:both"></div>
        <button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="吹风筒">吹风筒</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="适宜儿童">适宜儿童</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="适宜老人">适宜老人</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="适宜残疾人">适宜残疾人</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="电梯">电梯</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="洗衣机">洗衣机</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="冰箱">冰箱</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="浴缸">浴缸</button>
        <button type="button" class="btn btn-default btn-xs" style="margin-bottom:5px;width:80px;" value="暖气">暖气</button>
    </div>
    <div style="clear:both"></div>
    <center style="margin:15px 0 0 0;">
        <a id="msdoSetConfiguration" class="easyui-linkbutton" iconcls="icon-save">确定</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#roomConfiguration').dialog('close')">关闭</a>
    </center>
</div>

<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
<script src="js/upload.js"></script>
<script src="js/contextMenu.js"></script>
<script src="js/fg.public.js"></script>
<script src="js/fg_guestHouseSetUp.js"></script>
</body>
</html>--%>