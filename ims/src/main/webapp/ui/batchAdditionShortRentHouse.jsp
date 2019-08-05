<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<%
	SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");
%>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>批量添加客房</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<link href="css/upload.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/jquery.pinyin-min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/jQuery.Hz2Py-min.js"></script>
	
</head>
<body>
	<div class="bodyLoadingOver"></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<input id="action" type="hidden" value="${param.action}">
	<div id="batchAdditionSRHDlg" style="padding: 6px;">
		<div class="process-bar" style="padding: 0 10px">
			<span class="process arrow-in arrow-out step1" data-step="1"><span class="process-require">*</span>1.房源信息</span> 
			<span class="process arrow-in arrow-out step2" data-step="2"><span class="process-require">*</span>2.生成集中房</span>
			<span class="process arrow-in arrow-out step3" data-step="3"><span class="process-require">*</span>3.参数设置</span>
			<span class="process arrow-in arrow-out step4" data-step="4"><span class="process-require">*</span>4.预览房间</span>
		</div>
		<hr color=#95b8e7 size=1 style="margin: 3px">
		<div class="batchAdditionSRHSteps">
			<div class="step batchAdditionSRHStep1" >
				<div style="min-height: 320px; padding: 5px 0 0 0;">
					<div class="hsFieldset">
						
						<div style='margin: 10px 0 0 0;'>
							<lable style="display:inline-block;width:80px;"> <span
								class="require">*</span>省份：</lable>
							<input type="text" id="province" style="width: 100px;"clear="clear" require="require" disabled="disabled">
							
							<lable style="display:inline-block;width:80px;"> <span class="require">*</span>城市：</lable>
							<select id="addNoTrusteeshipCity" style="width: 100px;" disabled="disabled"></select>
							
							<lable style="display:inline-block;width:80px;">
							 	<span class="require">*</span>城区：
							 </lable>
							<select id="addNoTrusteeshipDistrict" style="width: 100px;" require="require">
								<option></option>
							</select> 

						</div>
					</div>
						
				</div>
				<div class="btn-bar" style="margin: 10px 10px 10px 0; text-align: center;">
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="nextStep(2);">下一步</a>
					<a class="easyui-linkbutton" style="margin: 0 5px;" onclick="parent.$('#batchAdditionShortRentHouseDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="batchAdditionSRHSteps">
			<div class="step batchAdditionSRHStep2">
				<div style="min-height:320px;padding:5px 0 0 0;">
					<div style="padding:10px 0 0 5px;width:98%;">
						<table id="centralizedApartmentRuleDg2"></table>
						<div id="centralizedApartmentRuleTB2">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="append4()">新增规则</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeit4()">删除规则</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="accept4()">保存规则</a>
							<span style="margin: 0 0 0 5px;"><input type="checkbox" name="vehicle" value="ckFloor" id="ckFloor"/>楼层小于10不补0</span>
	                        <span style="margin: 0 0 0 5px;"><input type="checkbox" name="vehicle" value="ckRoom" id="ckRoom"/>房号小于10不补0</span>
						</div>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('batchAdditionSRH', 1);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep(3)">下一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#batchAdditionShortRentHouseDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="batchAdditionSRHSteps">
			<div class="step batchAdditionSRHStep3">
				<div style="padding:5px 0 0 0;">
					<div style="padding:10px 0 0 5px;width:98%;">
						<table id="centralizedApartmentParameterDg2"></table>
						<div id="centralizedApartmentParameterTB2">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="appendParameter()">新增参数</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeitParameter()">删除参数</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="acceptParameter()">保存参数</a>
						</div>
					</div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('batchAdditionSRH', 2);$('#centralizedApartmentParameterDg2').datagrid('loadData',[]);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="nextStep(4)">下一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#batchAdditionShortRentHouseDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
		<div class="batchAdditionSRHSteps">
			<div class="step batchAdditionSRHStep4">
				<div style="min-height:320px;padding:5px 0 0 0;">
					<div style="padding:10px 0 0 5px;width:98%;">
						<table id="centralizedApartmentRoomDg2"></table>
						<div id="centralizedApartmentRoomTB2">
							<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="append5()">新增房间</a>
							<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeit5()">删除房间</a>
							<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="accept5()">保存房间</a>
						</div>
					</div>
					<div style="clear:both"></div>
				</div>
				<div class="btn-bar" style="margin:10px 10px 10px 0;text-align:center;">
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('batchAdditionSRH', 3);">上一步</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doSetCentralized()">保存</a>
					<a class="easyui-linkbutton" style="margin:0 5px;" onclick="parent.$('#batchAdditionShortRentHouseDlg').dialog('close');">取消</a>
				</div>
			</div>
		</div>
	</div>
	
	<div id="addRelationRoom" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input id="relationIndex" hidden="hidden">
		<div class="search">
			<div style="margin:5px 0 5px 5px;float:left;">
				小区：<select id="searchCommunity2" onchange="queryCentralizedApartmentRoom()" style="width:100px">
				</select>
			</div>
			<div style="margin:5px 0 5px 10px;float:left;">
				楼栋：<select id="searchBuilding2" onchange="queryCentralizedApartmentRoom()" style="width:100px">
				</select>
			</div>
			<div style="margin:5px 0 5px 10px;float:left;">
				楼层：<input id="searchFloor2" onkeyup="searchOnkeyup(this.id, 'queryCentralizedApartmentRoom()')"
					style="width:100px">
			</div>
			<div style="margin:5px 0 5px 10px;float:left;">
				房间号：<input id="searchDoorplateno2" placeholder="请输入房间号" onkeyup="searchOnkeyup(this.id, 'queryCentralizedApartmentRoom()')"
					style="width:110px">
			</div>
			<div style="margin:5px 0 5px 10px;float:left;">
				楼层前缀：<select id="searchFloorNumPrefix" onchange="queryCentralizedApartmentRoom()" style="width:100px">
				</select>
			</div>
			<div style="margin:5px 0 5px 10px;float:left;">
				房号前缀：<select id="searchRoomNumPrefix" onchange="queryCentralizedApartmentRoom()" style="width:100px">
				</select>
			</div>
		</div>
		<div style="clear: none;"></div>
		<div style="padding:6px;padding:5px 0 0 0;">
			<div style="padding:10px 5px 0 5px;width:45%;float: left;">
				<table id="addRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
		           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
		           <thead>
			        <tr>
			        	<th data-options="field:'ck',checkbox:true"></th>
			            <th field="community" width="20" align="center">小区</th>
			            <th field="building" width="16" align="center">栋/单元</th>
			            <th field="floor" width="16" align="center">楼层</th>
			            <th field="roomNumber" width="16" align="center">房间号</th>
			            <th field="floorNumPrefix" width="16" align="center">楼层前缀</th>
			            <th field="roomNumPrefix" width="16" align="center">房号前缀</th>
			        </tr>
			        </thead>
				</table>
			</div>
			<div style="margin:165px 5px 5px 5px;float: left;">
				<a class="easyui-linkbutton" iconCls="icon-add1" plain="true" onclick="addRelation()">添加</a>
				<br>
				<a class="easyui-linkbutton" iconCls="icon-remove1" plain="true" onclick="removeRelation()">移除</a>
			</div>
			<div style="padding:10px 0 0 5px;width:45%;float: left;">
				<table id="existingRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
		           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
		           <thead>
			        <tr>
			        	<th data-options="field:'ck',checkbox:true"></th>
			            <th field="community" width="20" align="center">小区</th>
			            <th field="building" width="16" align="center">栋/单元</th>
			            <th field="floor" width="16" align="center">楼层</th>
			            <th field="roomNumber" width="16" align="center">房间号</th>
			            <th field="floorNumPrefix" width="16" align="center">楼层前缀</th>
			            <th field="roomNumPrefix" width="16" align="center">房号前缀</th>
			        </tr>
			        </thead>
				</table>
			</div>
		</div>
		<div style="clear:both;"></div>
		<div style="margin:10px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddRelationRoom()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addRelationRoom').dialog('close')">取消</a>
		</div>
	</div>
	
	<div id="addRoomConfigurationDlg" class="easyui-dialog" data-options="closed:true">
		<input id="index" hidden="hidden">
		<div id="add_room_configuration" class="configuration">
			<div style="float:left;margin:10px 0 10px  20px">客房配置：</div>
			<div style="clear:both"></div>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水淋浴">热水淋浴</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="无线网络">无线网络</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="空调">空调</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电视">电视</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="门禁系统">门禁系统</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="停车位">停车位</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水壶">热水壶</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="有线网络">有线网络</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电脑">电脑</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="拖鞋">拖鞋</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="纸巾">纸巾</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="牙具">牙具</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="毛巾">毛巾</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴液">浴液</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗发水">洗发水</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="香皂">香皂</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴巾">浴巾</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="剃须刀">剃须刀</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="吹风筒">吹风筒</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜儿童">适宜儿童</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜老人">适宜老人</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="适宜残疾人">适宜残疾人</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电梯">电梯</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗衣机">洗衣机</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="冰箱">冰箱</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="浴缸">浴缸</button>
			<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="暖气">暖气</button>
		</div>
		<div style="clear:both"></div>
		<center style="margin:15px 0 0 0;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doAddRoomConfiguration()">确认</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addGuestRoomsDlg').dialog('close')">取消</a>
		</center>
	</div>
	<div style="display: none;">
		<input id="houseDicCommunity" onblur="toPinyin('houseDicCommunity','houseDicPinyin')" style="width:318px">
		<input type="hidden" id="houseDicPinyin" style="width:300px;">
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/fg.public.js"></script>
	<script src="js/batchAdditionShortRentHouse.js"></script>
	<script src="js/upload.js"></script>
</body>
</html>