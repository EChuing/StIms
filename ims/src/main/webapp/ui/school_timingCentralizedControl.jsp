<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.zz.po.sys.SysUserExpand" %>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8">
    <title>定时集控</title>
    <link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
    <link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
    <link href="css/icon.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
    <script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
    <script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
    <script type="text/javascript" src="js/locale/datagrid-cellediting.js"></script>
    <script src="js/config.js"></script>
    <script src="js/school_timingCentralizedControl.js"></script>
</head>
<body>
<div class="bodyLoadingOver"></div>
<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
<div>
    <div style="margin:5px 0 0 0; float:left;">
        <a class="easyui-linkbutton" iconCls="icon-add-house"
           plain="true" id="addVirtualButton" onclick="addTiming()">添加定时</a>
    </div>
    <div style="margin:5px 0 0 0; float:left;">
        <a class="easyui-linkbutton" iconCls="icon-add-house"
           plain="true" id="updateVirtualButton" onclick="updateTiming()">修改定时</a>
    </div>
    <div style="margin:5px 0 0 0; float:left;">
        <a class="easyui-linkbutton" iconCls="icon-add-house"
           plain="true" id="writeOffVirtualButton" onclick="writeOffTasks()">注销任务</a>
    </div>
    <div style="margin:5px 0 0 0; float:left;">
        <a class="easyui-linkbutton" iconCls="icon-add-house"
           plain="true" id="enableVirtualButton" onclick="enableTasks()">启用任务</a>
    </div>
</div>

<!-- 任务列表 -->
<div style="width:100%;">
    <table id="virtualDataGrid" style="width:100%; height:480px; table-layout:fixed; overflow:hidden;"
           data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
        <thead>
        <tr>
            <th field="jttTaskName" width="30" align="center">任务名称</th>
            <th field="jttStartTime" width="30" align="center">有效开始时间</th>
            <th field="jttEndTime" width="30" align="center">有效结束时间</th>
            <th field="jttTaskStatus" width="10" align="center">任务状态</th>
        </tr>
        </thead>
    </table>
    <div id="TimingTasksPageDiv" style="text-align:center;"></div>
</div>

<!-- 添加任务窗口 -->
<div id="addTimingRepair" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div>
        <div style='margin:5px 0 0 16px;float: left;'>
            任务名称 : <input id="taskName" style="width:600px;cursor: pointer;" require="require" placeholder="必填"  must="must"
                          class="choose_user_button" doFlag="doTask" doFun="" value="">
        </div>
        <div style='margin:5px 0 0 16px;float: left;'>
            教室选择 : <input id="classRoomSelection" style="width:600px;cursor: pointer;" require="require" placeholder="必选" must="must"
                          readonly="readonly" class="choose_user_button" doFlag="doTask" doFun="" value=""
                          onclick="classRoomOn()">
            <input id="listInfoHouse4store" type="hidden" must="must">
        </div>
        <div style="clear:both"></div>

        <div style='margin:5px 0 0 16px;float: left;'>
            <div style="float:left;" id="effectiveTime">
                有效时间：<input id="startTime" placeholder="必填" must="must" class="Wdate" style="width:200px"
                            onfocus="WdatePicker({minDate:'%y-%M-{%d}',maxDate:'#F{$dp.$D(\'endTime\',{d:0});}',dateFmt:'yyyy-MM-dd'})">
                至：<input id="endTime" placeholder="必填" must="must" class="Wdate" style="width:200px"
                         onfocus="WdatePicker({minDate:'#F{$dp.$D(\'startTime\',{d:0});}',dateFmt:'yyyy-MM-dd'})">
            </div>
        </div>
        <div style="float:left;margin:5px 0 0 10px">
            <a style="float:left;" class="easyui-linkbutton" iconcls="icon-add" onclick="addModeTime()">添加情景</a>
        </div>

        <div style="clear:both"></div>

        <div style='margin:5px 0 0 12px;float: left;'>
            星期选择：
            <input class="week" type="checkbox" name="items" value="2"/>星期一
            <input class="week" type="checkbox" name="items" value="3"/>星期二
            <input class="week" type="checkbox" name="items" value="4"/>星期三
            <input class="week" type="checkbox" name="items" value="5"/>星期四
            <input class="week" type="checkbox" name="items" value="6"/>星期五
            <input class="week" type="checkbox" name="items" value="7"/>星期六
            <input class="week" type="checkbox" name="items" value="1"/>星期日
        </div>

        <div style="margin-top:30px;">
            <table id="sceneDataGrid" style="width:100%;height:400px;table-layout:fixed;overflow:hidden;" data-options="rownumbers:false,
				singleSelect:true,autoRowHeight:false,pageSize:10,fitColumns:true,scrollbarSize:0">
                <thead>
                <tr>
                    <th field="scenePattern" width="40" align="center">情景模式</th>
                    <th field="executionTime" width="40" align="center">执行时间</th>
                    <th field="deleteAdd" width="20" align="center" formatter="deleteAdd">删除</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
    <div style="margin:10px 0 0 0;text-align: center;">
        <div class="errMsg1" style="box-sizing:border-box;height:5px;color:red;"></div>
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="addExecutionOfTasks()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addTimingRepair').dialog('close')">取消</a>
    </div>
</div>

<!-- 修改窗口 -->
<div id="uppTimingRepair" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
    <div>
        <div style='margin:5px 0 0 16px;float: left;'>
            任务名称 : <input id="name" style="width:600px;cursor: pointer;" require="require"
                          class="choose_user_button" doFlag="doTask" doFun="" must="must">
        </div>
        <div style='margin:5px 0 0 16px;float: left;'>
            教室选择 : <input id="room" style="width:600px;cursor: pointer;" require="require"
                          readonly="readonly" class="choose_user_button" doFlag="doTask" doFun="" must="must"
                          onclick="classRoomOn()">
            <input type="hidden" id="listInfoHouse4store2" must="must">
        </div>
        <div style="clear:both"></div>

        <div style='margin:5px 0 0 16px;float: left;'>
            <div style="float:left;">
                有效时间：<input id="time1" class="Wdate" must="must" style="width:200px"
                            onfocus="WdatePicker({minDate:'%y-%M-{%d}',maxDate:'#F{$dp.$D(\'time2\',{d:0});}',dateFmt:'yyyy-MM-dd'})">
                至：<input id="time2" class="Wdate" must="must" style="width:200px"
                         onfocus="WdatePicker({minDate:'#F{$dp.$D(\'time1\',{d:0});}',dateFmt:'yyyy-MM-dd'})">
            </div>
        </div>
    </div>

    <div style="float:left;margin:5px 0 0 10px">
        <a style="float:left;" class="easyui-linkbutton" iconcls="icon-add" onclick="uppModeTime()">添加情景</a>
    </div>

    <div style="clear:both"></div>

    <div style='margin:5px 0 0 12px;float: left;'>
        星期选择：
        <input class="week" type="checkbox" name="items" value="2"/>星期一
        <input class="week" type="checkbox" name="items" value="3"/>星期二
        <input class="week" type="checkbox" name="items" value="4"/>星期三
        <input class="week" type="checkbox" name="items" value="5"/>星期四
        <input class="week" type="checkbox" name="items" value="6"/>星期五
        <input class="week" type="checkbox" name="items" value="7"/>星期六
        <input class="week" type="checkbox" name="items" value="1"/>星期日
    </div>


    <div style="margin-top:30px;">
        <table id="sceneDataGrid2" style="width:100%;height:400px;table-layout:fixed;overflow:hidden;"
               data-options="rownumbers:false,
				singleSelect:true,autoRowHeight:false,pageSize:10,fitColumns:true,scrollbarSize:0,onClickCell: onClickOtherCell">
            <thead>
            </thead>
        </table>
    </div>

    <div style="margin:10px 0 5px 0;text-align: center;">
        <div class="errMsg1" style="box-sizing:border-box;height:5px;color:red;"></div>
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdate()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#uppTimingRepair').dialog('close')">取消</a>
    </div>
</div>

<!--教室选择-->
<div id="classRoomDiv" style="padding:6px;" class="easyui-dialog" data-options="closed:true">

    <div style="margin:5px 0 10px 5px;color:black;float:left;">
        <label for="roomName">地址名称：</label>
        <input id="roomName" onkeyup="searchOnkeyup(this.id, 'queryOffice(1, 0)')">
    </div>

    <div style="margin:5px 0 10px 0px;color:black;font-size:13px;float:left;">
    &emsp;&emsp; 状态：<select id="roomState" onchange="queryOffice(1,0)" >
            <option value="正常">正常</option>
            <option value="停用">停用</option>
            <option value="注销">注销</option>
         </select>
    </div>

    <div style="clear:both;"></div>
    <hr color=#95b8e7 size=1 style="margin:0 0 10px 0">
    <table id="classRoomDataGrid" style="width:100%; height:450px; table-layout:fixed; overflow:hidden; float: left;"
           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
        <thead>
        <tr>
            <th id="checkAll" data-options="field:'ck',checkbox:true"></th>
            <th field="keyAdministrator" width="70" align="center">地址名称</th>
            <th field="houseEntrust4sell" width="30" align="center">状态</th>
        </tr>
        </thead>
    </table>
    <div style="margin:20px 0 0 0;text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="addClassRoom()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="closeClassRoom()">取消</a>
    </div>
</div>

<!--情景模式执行时间-->
<div id="situationalPatternsDiv" style="padding:30px 0 0 0;text-align: center;" class="easyui-dialog"
     data-options="closed:true">
    <div>
        情景模式:<select id="situationalPatterns" style="width:150px;margin-top:10px;vertical-align:baseline;">
        <option></option>
    </select>
    </div>
    <div>
        时间选择:<input id="selectime" class="Wdate" style="width:150px;margin-top:10px;vertical-align:baseline;"
                    onfocus="WdatePicker({dateFmt:'HH:mm:ss'})">
    </div>

    <div style="margin:30px 0 0 0;text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="addSceneDataGrid()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#situationalPatternsDiv').dialog('close')">取消</a>
    </div>
</div>

<div id="situationalPatternsDiv2" style="padding:30px 0 0 0;text-align: center;" class="easyui-dialog"
     data-options="closed:true">
    <div>
        情景模式:<select id="situationalPatterns2" style="width:150px;margin-top:10px;vertical-align:baseline;">
        <option></option>
    </select>
    </div>
    <div>
        时间选择:<input id="selectime2" class="Wdate" style="width:150px;margin-top:10px;vertical-align:baseline;"
                    onfocus="WdatePicker({dateFmt:'HH:mm:ss'})">
    </div>

    <div style="margin:30px 0 0 0;text-align: center;">
        <a class="easyui-linkbutton" iconcls="icon-save" onclick="uppSceneDataGrid()">保存</a>
        <a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#situationalPatternsDiv2').dialog('close')">取消</a>
    </div>
</div>

<script src="js/fg.public.js"></script>
<script src="js/upload.js"></script>
</body>
</html>
