<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- 普通未租房设置集散房 -->
<div id="centralizedApartmentDlg" style="padding:6px;display:none;">
	<div class="process-bar" style="padding:0 10px">
		<span class="process arrow-in arrow-out step1" data-step="1" id="gotoNav1"><span class="process-require">*</span>1.生成集中房</span>
		<span class="process arrow-in arrow-out step2" data-step="2" id="gotoNav2"><span class="process-require">*</span>2.参数设置</span>
		<span class="process arrow-in arrow-out step3" data-step="3" id="gotoNav3"><span class="process-require">*</span>3.预览房间</span>
	</div>
	<hr color=#95b8e7 size=1 style="margin:3px">
	<div class="centralizedApartmentSteps">
		<div class="step centralizedApartmentStep1">
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
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="centralizedNextStep(1)">下一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#centralizedApartmentDlg').dialog('close');">取消</a>
			</div>
		</div>
	</div>
	<div class="centralizedApartmentSteps">
		<div class="step centralizedApartmentStep2">
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
			<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('centralizedApartment', 1);$('#centralizedApartmentParameterDg2').datagrid('loadData',[]);">上一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="centralizedNextStep(2)">下一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#centralizedApartmentDlg').dialog('close');">取消</a>
			</div>
		</div>
	</div>
	<div class="centralizedApartmentSteps">
		<div class="step centralizedApartmentStep3">
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
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="gotoStep('centralizedApartment', 2);">上一步</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="centralizedNextStep(3)">保存</a>
				<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#centralizedApartmentDlg').dialog('close');">取消</a>
			</div>
		</div>
	</div>
</div>
<!-- 集散房（已经拆分过了的，旗下已有拆分房）设置集散房 -->
<div id="updateCentralizedApartmentDlg" style="padding:6px;display:none;">
	<div>
		<a class="easyui-linkbutton" iconCls="icon-huanyuan" plain="true" onclick="centralizedReduction()">还原整租房</a>
	</div>
	<div style="min-height:320px;">
		<div style="padding:5px 0 0 5px;width:98%;">
			<table id="centralizedApartmentRoomDg3"></table>
			<div id="centralizedApartmentRoomTB3">
				<a class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="append6()">新增房间</a>
				<a class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="removeit6()">删除房间</a>
				<a class="easyui-linkbutton" iconCls="icon-save" plain="true" onclick="accept6()">保存房间</a>
			</div>
		</div>
		<div style="clear:both"></div>
	</div>
	<div class="btn-bar" style="margin:5px 0 0 0;text-align:center;">
		<a class="easyui-linkbutton" style="margin:0 5px;" onclick="doUpdateCentralizedApartment()">保存</a>
		<a class="easyui-linkbutton" style="margin:0 5px;" onclick="$('#updateCentralizedApartmentDlg').dialog('close');">取消</a>
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