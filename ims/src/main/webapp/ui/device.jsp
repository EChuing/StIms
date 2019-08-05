<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 绑定设备对话框 -->
<div id="bindDeviceDlg" style="padding:6px;display:none;">
	<div class="clearfix">
		<div style="margin:0 0 5px 5px;">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-add"
				id="addDeviceButton" onclick="addDeviceDlg()">添加新设备</a>
		</div>
		<div style="margin:0 0 10px 5px;">
			设备品牌： <input id="searchBrandShowBrandInfo"
				class="choose_brand_button" doFlag="searchBrand"
				doFun="queryDeviceList(1)" style="width:200px;cursor: pointer;"
				type="text" readonly="readonly">
			<div id="searchBrandShowBrandInfoDiv" style="display:none;"></div>
			<input id="searchBrandGetBrandName" type="hidden"> <input
				id="searchBrandGetBrandType" type="hidden"> <input
				id="searchBrandGetBrandId" type="hidden"> 设备名称：<input
				id="searchDevNickname" onkeyup="queryDeviceList(1)"
				style="width:200px">
		</div>
	</div>
	<legend>智能设备列表</legend>
	<div>
		<table id="deviceListTable"></table>
		<div id="deviceListTablePageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<legend>待绑定到该房的设备</legend>
	<div>
		<table id="bindDeviceTable"></table>
	</div>
	<div style="margin:20px 0 0 0;text-align: center;">
		<a class="easyui-linkbutton" iconcls="icon-save"
			onclick="doBindDevice()">保存</a> <a class="easyui-linkbutton"
			iconcls="icon-cancel" onclick="$('#bindDeviceDlg').dialog('close')">取消</a>
	</div>
</div>
<!-- 添加新设备对话框 -->
<div id="addDeviceDlg" style="padding:6px;display:none;">
	<!--  class="easyui-dialog" data-options="closed:true" -->
	<div style="margin:10px 0 0 20px;">
		设备品牌：<input id="addDeviceShowBrandInfo" class="choose_brand_button"
			doFlag="addDevice" doFun="changeBrandAddDevice()"
			style="width:400px;cursor: pointer;" type="text" readonly="readonly">
		<input id="addDeviceGetBrandName" type="hidden"> <input
			id="addDeviceGetBrandType" type="hidden"> <input
			id="addDeviceGetBrandId" type="hidden">
		<div id="addDeviceShowBrandInfoDiv" style="display:none;"></div>
	</div>
	<div id="addDeviceDiv" style="display:none;">
		<div id="deviceUserNameDiv" style='margin:10px 0 0 20px;'>
			设备账号：<input id="deviceUserName" style="width:400px">
		</div>
		<div id="devicePasswardDiv" style='margin:10px 0 0 20px;'>
			设备密码：<input id="devicePassward" style="width:400px">
		</div>
		<div id="deviceAuthIdDiv" style='margin:10px 0 0 35px;'>
			APPID：<input id="deviceAuthId" style="width:400px">
		</div>
		<div id="deviceAuthSecretDiv" style='margin:10px 0 0 44px;'>
			秘钥：<input id="deviceAuthSecret" style="width:400px">
		</div>
		<div id="deviceAuthIdDivOne" style='margin:10px 0 0 13px;'>
			网关S/N码：<input id="deviceAuthId2" style="width:400px">
		</div>
		<div id="deviceAppkeyDiv" style='margin:10px 0 0 24px;'>
			app_key：<input id="deviceAppkeyId" style="width:400px">
		</div>
		<div id="deviceSecretDiv" style='margin:10px 0 0 37px;'>
			secret：<input id="deviceSecretId" style="width:400px">
		</div>
	</div>
	<div style="margin:10px 0 0 0;text-align: center;">
		<a class="easyui-linkbutton" iconcls="icon-save"
			onclick="doAddDevice()">提交</a> <a class="easyui-linkbutton"
			iconcls="icon-cancel" onclick="$('#addDeviceDlg').dialog('close')">取消</a>
	</div>
</div>
<!-- 选择设备操作对话框 -->
<div id="chooseOperateDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(6)" data-brand="10">设置随机密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(7)" data-brand="10,22">设置自定义密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(1)" data-brand="1,2">设置限时密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(2)" data-brand="1,2">获取密码列表</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(3)" data-brand="2">清空密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(4)" data-brand="1,2">获取开锁记录</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(5)"  data-brand="2,10,17,20,22"  data-devType="25,49" data-devSecondType="22,23,24,40">远程开锁</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(52)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">添加密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(53)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">清空密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(54)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">启用密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(55)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">禁用密码</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(56)" data-brand="20"  data-devType="25,49" data-devSecondType="23,40">获取开锁记录</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(10)" data-brand="3,12,13" >查看详情</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(11)" data-brand="12,13" >断开</a>
	<a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(12)" data-brand="12,13">闭合</a>
	<a id="OnValve" class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(50)" data-brand="21">开阀</a>
	<a id="OffValve" class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="operateDeviceDlg(51)" data-brand="21">关阀</a>
	<!-- 控制灯开关 -->
	<a id="OnLampRoad1" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(13)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="1">开灯（1路）</a>
	<a id="OnLampRoad2" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(14)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="2">开灯（2路）</a>
	<a id="OnLampRoad3" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(15)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="3">开灯（3路）</a>
	<a id="OnLampRoad4" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(16)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="4">开灯（4路）</a>
	<a id="OnLampRoad5" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(17)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="5">开灯（5路）</a>
	<a id="OnLampRoad6" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(18)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="6">开灯（6路）</a>
	<a id="OnLampRoad7" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(19)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="7">开灯（7路）</a>
	<a id="OnLampRoad8" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(20)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="8">开灯（8路）</a>

	<a id="OffLampRoad1" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(21)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="1">关灯（1路）</a>
	<a id="OffLampRoad2" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(22)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="2">关灯（2路）</a>
	<a id="OffLampRoad3" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(23)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="3">关灯（3路）</a>
	<a id="OffLampRoad4" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(24)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="4">关灯（4路）</a>
	<a id="OffLampRoad5" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(25)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="5">关灯（5路）</a>
	<a id="OffLampRoad6" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(26)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="6">关灯（6路）</a>
	<a id="OffLampRoad7" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(27)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="7">关灯（7路）</a>
	<a id="OffLampRoad8" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(28)" data-brand="20" data-devType="3" data-devSecondType="1" data-devRoad="8">关灯（8路）</a>

	<!-- <a class="easyui-linkbutton" style="margin:15px 0 0 10px;" plain="false" onclick="removeHsDevice()">移除设备</a> -->


	<!-- 控制插座 -->
	<a id="OnSocket" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(57)" data-brand="20" data-devType="35" data-devSecondType="25">通电</a>
	<a id="OffSocket" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(58)" data-brand="20" data-devType="35" data-devSecondType="25">断电</a>

	<!-- 2.4G灯光控制 -->
	<a id="Electrify" class="easyui-linkbutton" style="margin:15px 0 0 10px;float: left"
	   plain="false" onclick="operateDeviceDlg(59)" data-brand="20" data-devType="13" data-devSecondType="31">开灯</a>
	<div id="BrightnessDiv" style="margin:5px 0 0 35px;display: none;float: left" >
		<input id="BrightnessStatus" hidden="hidden"  value="01">
		亮度：<input id="Brightness" value="00" class="easyui-slider" data-options="showTip:false,onSlideEnd: function(value){
				operateDeviceDlg(61);}" data-options="min:10,max:90,step:1" style="width:300px;" data-brand="20" data-devType="13" data-devSecondType="31">
	</div>
	<div style="clear:both"></div>
	<a id="PowerFailure" class="easyui-linkbutton" style="margin:15px 0 0 10px;float:left;"
	   plain="false" onclick="operateDeviceDlg(60)" data-brand="20" data-devType="13" data-devSecondType="31">关灯</a>
	<div id="ColorTemperatureDiv" style="margin:5px 0 0 35px; display: none;float:left;">
		<input id="ColorTemperatureStatus" hidden="hidden"   value="00">
		色温：<input id="ColorTemperature" value="00" class="easyui-slider"data-options="showTip:false,onSlideEnd: function(value){
				operateDeviceDlg(62);}" data-options="min:10,max:90,step:1" style="width:300px" data-brand="20" data-devType="13" data-devSecondType="31">
	</div>
	<input id="LightingStatus"  hidden="hidden" value="00">
	<%--	<div class="easyui-slider" data-options="min:10,max:90,step:10" style="width:300px"></div>--%>

	<!-- 窗帘插座 -->
	<a id="OnCurtain" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(63)" data-brand="20" data-devType="16" data-devSecondType="6">开</a>
	<a id="OffCurtain" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(64)" data-brand="20" data-devType="16" data-devSecondType="6">关</a>
	<!-- 安防网关 -->
	<a id="outsideSG" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(65)" data-brand="20" data-devType="45" data-devSecondType="8">外出布防</a>
	<a id="insideSG" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(66)" data-brand="20" data-devType="45" data-devSecondType="8">在家布防</a>
	<a id="cancelSG" class="easyui-linkbutton" style="margin:15px 0 0 10px;"
	   plain="false" onclick="operateDeviceDlg(67)" data-brand="20" data-devType="45" data-devSecondType="8">撤防</a>
</div>

</div>
<!-- 执行操作设备对话框 -->
<div id="operateDeviceDlg" style="padding:6px;display:none;">
	<!--  class="easyui-dialog" data-options="closed:true" -->
	<!-- 设置限时密码-->
	<div id="operateDevice1" operate>
		<div style="margin:10px 0 20px 150px;float:left;">
			限时密码：<input id="limitTimePassword" style="width:200px" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style="margin:10px 0 20px 150px;float:left;" id="passwordTime">
			到期时间：<input id="limitTimeEnd" class="Wdate" style="width:200px"
				clear="clear"
				onfocus="WdatePicker({minDate:'%y-%M-%d-%H-%m',dateFmt:'yyyy-MM-dd HH:MM',autoPickDate:true})">
		</div>
		<div style="margin:10px 0 20px 150px;float:left;" id="passwordType">
			密码类型：<select id="limitPasswordType" style="width:120px">
				<option value="2">普通用户密码</option>
				<option value="1">管理员密码</option>
			</select>
		</div>
		<div style="clear:both"></div>
		<div style="text-align:center;">
			<a class="easyui-linkbutton" iconcls="icon-save"
				onclick="operateDevice(1)">提交</a> <a class="easyui-linkbutton"
				iconcls="icon-cancel"
				onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 获取密码列表-->
	<div id="operatedevice" operate>
		<span style="color:red">设置临时密码后,可能会因为门锁服务商方面的问题,密码列表查询会有延迟的情况。</span>
		<table id="brandAllDeviceDg"
			style="width:98%;height:300px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="keyPass" width="40" align="center">密码</th>
					<th field="timeEnd" width="20" align="center">到期时间</th>
				</tr>
			</thead>
		</table>
	</div>
	<!-- 清空密码-->
	<div id="operateDevice3" operate></div>
	<!-- 获取开锁记录-->
	<div id="operateDevice4" operate>
		<div style="margin:10px 0 10px 50px;float:left;">
			查询从 <input id="consoleTimeStart" class="Wdate" style="width:200px"
				pattern="单击选择时间" clear="clear"
				onfocus="WdatePicker({maxDate:'%y-%M-%d-%H-%m',dateFmt:'yyyy-MM-dd HH:MM',autoPickDate:true})">开始到现在的开锁记录
			<a class="easyui-linkbutton" iconcls="icon-search"
				onclick="operateDevice(4)">查询</a>
		</div>
		<table id="deviceOpenRecordDg"
			style="width:98%;height:300px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="createTime" width="40" align="center">开锁时间</th>
				</tr>
			</thead>
		</table>
	</div>
	<!-- 远程开锁-->
	<div id="operateDevice5" operate></div>
	<!-- 设置随机密码-->
	<div id="operateDevice6" operate>
		<div style="margin:10px 0 20px 150px;">
			密码类型：<select id="limitPasswordType6" style="width:200px"
				choose="choose">
				<option value="0">单次密码</option>
				<option value="1">限时密码</option>
				<!--<option value="2">永久密码</option>
				<option value="3">清空密码</option>-->
			</select>
		</div>
		<div style="margin:10px 0 20px 150px;">
			开始时间：<input id="limitTimeStart6" class="Wdate" style="width:200px"
				clear="clear"
				onfocus="WdatePicker({minDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'limitTimeEnd6\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})">
		</div>
		<div style="margin:10px 0 20px 150px;">
			到期时间：<input id="limitTimeEnd6" class="Wdate" style="width:200px"
				clear="clear"
				onfocus="WdatePicker({minDate:'#F{$dp.$D(\'limitTimeStart6\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})">
		</div>
		<div style="text-align:center;">
			<a class="easyui-linkbutton" iconcls="icon-save"
				onclick="operateDevice(6)">提交</a> <a class="easyui-linkbutton"
				iconcls="icon-cancel"
				onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
		</div>
	</div>
	<!-- 设置自定义密码-->
	<div id="operateDevice7" operate>
		<div style="margin:10px 0 20px 174px;">
			操作：<select id="limitOperateType7" style="width:200px" choose="choose">
				<!-- <option value="0">随机密码</option>
				<option value="1">限时密码</option>-->
				<option value="2">固定密码</option>
				<!-- <option value="3">清空密码</option> -->
			</select>
		</div>
		<div style="margin:10px 0 20px 138px;">
			自定义密码：<input id="limitTimePassword7" style="width:200px"
				clear="clear">
		</div>
		<div style="margin:10px 0 20px 150px;">
			开始时间：<input id="limitTimeStart7" class="Wdate" style="width:200px"
				clear="clear"
				onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'limitTimeEnd7\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})">
		</div>
		<div style="margin:10px 0 20px 150px;">
			到期时间：<input id="limitTimeEnd7" class="Wdate" style="width:200px"
				clear="clear"
				onfocus="WdatePicker({minDate:'#F{$dp.$D(\'limitTimeStart7\',{d:0});}',dateFmt:'yyyy-MM-dd HH:mm:ss',autoPickDate:true})">
		</div>
		<div style="text-align:center;">
			<a class="easyui-linkbutton" iconcls="icon-save"
				onclick="operateDevice(7)">提交</a> <a class="easyui-linkbutton"
				iconcls="icon-cancel"
				onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
		</div>

		<!-- 获取读数-->
		<div id="operateDevice10" operate></div>
	</div>
	<!-- 设置限时密码-->
	<div id="operateDevice52" operate>
		<div style="margin:10px 0 20px 150px;float:left;">
			密码：<input id="password52" style="width:200px" clear="clear" maxlength="10" data-type="number-positive">
			<span>（6-10位数字）</span>
		</div>
		<div style="clear:both"></div>
		<div style="text-align:center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="if(validate52()){operateDevice(52)}">提交</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#operateDeviceDlg').dialog('close')">取消</a>
		</div>
	</div>
</div>

<%--开锁记录窗口--%>
<div id="queryDeviceRecordDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
	<div style="width:100%;">
		<!-- 开锁记录列表 -->
		<table id="queryDeviceRecordTable" style="width:100%;height:260px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			   data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
			<thead>
			<tr>
				<th field="jglrBrand" width="15" align="center">品牌</th>
				<th field="jglrSn" width="15" align="center">设备SN</th>
				<th field="jglrRecordType" width="20" align="center">上报信息类型</th>
				<th field="popName" width="10" align="center">人口</th>
				<th field="suName" width="10" align="center">用户</th>
				<th field="jglrTime" width="20" align="center">时间</th>
			</tr>
			</thead>
		</table>
		<!-- 分页 -->
		<div id="queryDeviceRecordPageDiv" style="width:99%"></div>
	</div>
</div>
<%--绑定电箱选择子设备窗口--%>
<div id="addElectricBoxDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
	<fieldset>
		<legend>选择需要绑定电箱的子设备</legend>
		<p><input id="subDevice1" class="subDevice" name="subDevice" type="radio" value="1" /><label for="subDevice1">设备1</label></p>
		<p><input id="subdevice" class="subDevice" name="subDevice" type="radio" value="2"/><label for="subdevice">设备2</label></p>
		<p><input id="subDevice3" class="subDevice" name="subDevice" type="radio" value="3" /><label for="subDevice3">设备3</label></p>
		<p><input id="subDevice4" class="subDevice" name="subDevice" type="radio" value="4" /><label for="subDevice4">设备4</label></p>
		<p><input id="subDevice5" class="subDevice" name="subDevice" type="radio" value="5" /><label for="subDevice5">设备5</label></p>
		<p><input id="subDevice6" class="subDevice" name="subDevice" type="radio" value="6" /><label for="subDevice6">设备6</label></p>
		<p><input id="subDevice7" class="subDevice" name="subDevice" type="radio" value="7" /><label for="subDevice7">设备7</label></p>
		<p><input id="subDevice8" class="subDevice" name="subDevice" type="radio" value="8" /><label for="subDevice8">设备8</label></p>
		<p><input id="subDevice9" class="subDevice" name="subDevice" type="radio" value="9" /><label for="subDevice9">设备9</label></p>
		<div id="addElectricBox" style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="addElectricBox()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addElectricBoxDlg').dialog('close')">取消</a>
		</div>
	</fieldset>
</div>
<%--电箱操作窗口--%>
<div id="subDeviceDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
	<div style="width: 300px;height: 70px;margin: 10px 0 0 0">
		<div style="float: left">
			<div style="width: 180px;height: 30px;text-align: center;font-size: 18px"><span id="electricQuantity" style="font-size: 18px"></span></div>
		</div>
		<div style="float: left">
			<div>
				<button require="require" onclick="operateDeviceDlg(29)" id="open" type="button" class="btn btn-default" style="margin:0 0 5px 0;">通电</button>
				<button require="require" onclick="operateDeviceDlg(39)" id="off" type="button" class="btn btn-default" style="margin:0 0 5px 0;">断电</button>
			</div>
		</div>
	</div>
</div>

<%--曼顿（md）电箱操作窗口--%>
<div id="mdElectricBoxDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
	<div style="width: 550px;height: 80px;">
		<div style="margin: 5px 0 0 10px">
			<button require="require" onclick="MDElectricBoxControl(1)" id="mdOpen" type="button" class="btn btn-default" style="margin:0 0 5px 0;">通电</button>
			<button require="require" onclick="MDElectricBoxControl(2)" id="mdOff" type="button" class="btn btn-default" style="margin:0 0 5px 0;">断电</button>
			<span id="mdElectricQuantity" style="font-size: 18px;margin-left: 20px"></span>
		</div>
		<div style="float: left;margin-top: 5px">
			<a id="switchset" class="easyui-linkbutton" style="	margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(3)">功率限定和线路名称修改</a>
			<a id="SETAUTOLEAK" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(4)">漏电自检</a>
			<%--<a id="SETLOGINPWD" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(5)">密码设置</a>--%>
			<a id="SETWIRELESS" class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(6)">WiFi设置</a>
			<a class="easyui-linkbutton" style="margin:0 0 5px 10px;" plain="false" onclick="MDElectricBoxControlDlg(7)">实时数据</a>
		</div>
	</div>
</div>
<%--曼顿（md）电箱操作输入窗口--%>
<div id="MDElectricBoxControlDlg" style="padding:10px;" class="easyui-dialog" data-options="closed:true">
	<div style="width: 98%;height: 75%;margin: 10px 0 20px 20px">
		<div id="switchsetControl">
			<div style="margin: 0 0 10px 0">
				<label for="lineName" style="width: 150px;display:inline-block;">线路名称</label><input type="text" id="lineName" readonly="readonly">
			</div>
			<div style="margin: 0 0 10px 0">
				<label for="maximumPower" style="width: 150px;display:inline-block;">最大功率（单位W）</label><input type="number" id="maximumPower">
			</div>
			<div style="margin: 0 0 10px 0">
				<label for="overflowThreshold" style="width: 150px;display:inline-block;">过流门限值（单位0.01A）</label><input type="number" id="overflowThreshold">
			</div>
		</div>
		<div id="SETAUTOLEAKControl">
			<div style="margin: 0 0 10px 0">
				启用漏电自检 <input type="checkbox" id="startUsing">
			</div>
			<div style="margin: 0 0 10px 0">
				日：<input id="day" style="width:100px" type="text" onfocus="WdatePicker({dateFmt:'dd',autoPickDate:true})">
			</div>
			<div style="margin: 0 0 10px 0">
				时：<input id="hour" style="width:100px" type="text" onfocus="WdatePicker({dateFmt:'HH',autoPickDate:true})">
			</div>
			<div style="margin: 0 0 10px 0">
				分：<input id="minute" style="width:100px" type="text" onfocus="WdatePicker({dateFmt:'mm',autoPickDate:true})">
			</div>
			<div style="margin: 5px 0 5px 0">
				<span style="color: red">注：</span>该功能启用后，在执行时会导致该线路短暂停电，建议设置时间为07:00。
			</div>
			<div>
				当前<span id="enableCheck" style="color: #1E9FFF"></span>漏电自检功能，上次自检时间为：<span id="lastCheckDate" style="color: #1E9FFF"></span>。
			</div>
		</div>
		<div id="SETLOGINPWDControl">
			<div style="margin: 0 0 10px 0">
				原设备密码：<input type="number" id="usedPassword">
			</div>
			<div style="margin: 0 0 10px 0">
				新设备密码：<input type="number" id="newPassword">
			</div>
		</div>
		<div id="SETWIRELESSControl">
			<div style="margin: 0 0 10px 0">
				原来的WiFi名称：<input type="number" id="used_ssid">
			</div>
			<div style="margin: 0 0 10px 0">
				原来的WiFi密码：<input type="number" id="used_ssidPassword">
			</div>
			<div style="margin: 0 0 10px 11px">
				新的WiFi名称：<input type="number" id="new_ssid">
			</div>
			<div style="margin: 0 0 10px 11px">
				新的WiFi密码：<input type="number" id="new_ssidPassword">
			</div>
			<div style="margin: 5px 0 5px 0">
				<span style="color: red">注：</span>WiFi名称只能为英文或数字组成，不能为中文名称。
			</div>
		</div>

		<div id="ElectricBoxStatus">
			<table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;width: 100%;table-layout: fixed;font-size: 12px;">
				<tbody>
				<tr align="center">
					<td width="17%">电箱编号</td>
					<td width="17%"><span id="smac"></span></td>
					<td width="16%">线路地址</td>
					<td width="16%"><span id="saddr"></span></td>
					<td width="17%">线路名称</td>
					<td width="17%"><span id="stitle"></span></td>
				</tr>
				<tr align="center">
					<td width="17%">线路有效性</td>
					<td width="17%"><span id="svalidity"></span></td>
					<td width="16%">线路开关状态</td>
					<td width="16%"><span id="soc"></span></td>
					<td width="17%">远程控制合闸分闸</td>
					<td width="17%"><span id="senableNetCtrl"></span></td>
				</tr>
				<tr align="center">
					<td width="17%">在线状态</td>
					<td width="17%"><span id="sonline"></span></td>
					<td width="16%">当前电量</td>
					<td width="16%"><span id="spower"></span></td>
					<td width="17%">过功门限值</td>
					<td width="17%"><span id="smxgg"></span></td>
				</tr>
				<tr align="center">
					<td width="17%">过流门限值</td>
					<td width="17%"><span id="smxgl"></span></td>
					<td width="16%">类型</td>
					<td width="16%"><span id="slineType"></span></td>
					<td width="17%">告警状态</td>
					<td width="17%"><span id="salarm"></span></td>
				</tr>
				<tr align="center">
					<td width="17%">线路规格</td>
					<td width="17%"><span id="sspecification"></span></td>
					<td width="16%">控制标记</td>
					<td width="16%"><span id="scontrol"></span></td>
					<td width="17%">显示标记</td>
					<td width="17%"><span id="svisibility"></span></td>
				</tr>
				<tr align="center">
					<td width="25%">总线标记</td>
					<td width="15%"><span id="smainLine"></span></td>
					<td width="15%">漏电流</td>
					<td width="15%"><span id="saLd"></span></td>
					<td width="15%">电流</td>
					<td width="15%"><span id="saA"></span></td>
				</tr>
				<tr align="center">
					<td width="17%">温度</td>
					<td width="17%"><span id="saT"></span></td>
					<td width="16%">电压</td>
					<td width="16%"><span id="saV"></span></td>
					<td width="17%">功率</td>
					<td width="17%"><span id="saW"></span></td>
				</tr>
				<tr align="center">
					<td width="17%">功率因素</td>
					<td width="17%"><span id="saPF"></span></td>
					<td width="16%">平均电流</td>
					<td width="16%"><span id="sgA"></span></td>
					<td width="17%">壳温度</td>
					<td width="17%"><span id="sgT"></span></td>
				</tr>
				<tr align="center">
					<td width="17%">平均电压</td>
					<td width="17%"><span id="sgV"></span></td>
					<td width="16%">功率和值</td>
					<td width="16%"><span id="sgW"></span></td>
					<td width="17%">更新时间</td>
					<td width="17%"><span id="supdateTime"></span></td>
				</tr>

				</tbody>
			</table>
		</div>
	</div>
	<div style="margin:10px 0 0 0;text-align: center;" id="button">
		<a id="submit" class="easyui-linkbutton" iconcls="icon-save" onclick="MDElectricBoxControl(3)">提交</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#MDElectricBoxControlDlg').dialog('close')">取消</a>
	</div>
</div>