<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div id="OfficeAssociateHrDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
	<input id="relationIndex" hidden="hidden">
	<div class="search">
		<div style="margin:5px 0 5px 5px;float:left;">
			小区：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryUnrelated()')" style="width:120px">
			</input>
		</div>
		<div style="margin:5px 0 5px 10px;float:left;">
			楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryUnrelated()')" style="width:120px">
			</input>
		</div>
		<div style="margin:5px 0 5px 10px;float:left;">
			房间号：<input id="searchDoorplateno" placeholder="请输入房间号" onkeyup="queryUnrelated(this.id, 'queryUnrelatedHr()')"
				style="width:120px">
		</div>
	</div>
	<div style="clear:both;"></div>
	<div style="padding:2px 0 0 0;">
		<div style="padding:5px 0 0 5px;width:20%;float: left;">
			<table id="unRelatedDeviceDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
	           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
	           <thead>
		        <tr>
		        	<th data-options="field:'ck',checkbox:true"></th>
		            <th field="id" width="2" align="center" hidden="true">id</th>
		            <th field="devType" width="19" align="center">设备类型</th>
		            <th field="devNickname" width="24" align="center">设备名称</th>
		            <!-- <th field="hsAddDoorplateno" width="19" align="center">房间号</th> -->
		        </tr>
		        </thead>
			</table>
		</div>
		<div style="margin:165px 5px 5px 5px;float: left;">
			<a class="easyui-linkbutton"  iconCls="icon-add" plain="true" onclick="updateDeviceRelation(0)">添加</a>
			<br>
			<a class="easyui-linkbutton"  iconCls="icon-remove" plain="true" onclick="updateDeviceRelation(1)">移除</a>
		</div>
		<div style="padding:5px 0 0 5px;width:20%;float: left;">
			<table id="existingRelationDeviceDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
	           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
	           <thead>
		        <tr>
		        	<th data-options="field:'ck',checkbox:true"></th>
		        	<th field="id" width="2" align="center" hidden="true">id</th>
		            <th field="devType" width="19" align="center">设备类型</th>
		            <th field="devNickname" width="24" align="center">设备名称</th>
		    <!--         <th field="hsAddDoorplateno" width="19" align="center">房间号</th> -->
		        </tr>
		        </thead>
			</table>
		</div>
	</div>
		<div style="padding:2px 0 0 0;">
		<div style="padding:5px 0 0 5px;width:20%;float: left;">
			<table id="unRelatedRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
	           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
	           <thead>
		        <tr>
		        	<th data-options="field:'ck',checkbox:true"></th>
		            <th field="hsAddCommunity" width="19" align="center">小区</th>
		            <th field="hsAddBuilding" width="24" align="center">栋/单元</th>
		            <th field="hsAddDoorplateno" width="19" align="center">房间号</th>
		        </tr>
		        </thead>
			</table>
		</div>
		<div style="margin:165px 5px 5px 5px;float: left;">
			<a class="easyui-linkbutton"  iconCls="icon-add" plain="true" onclick="updateHsRelation(0)">添加</a>
			<br>
			<a class="easyui-linkbutton"  iconCls="icon-remove" plain="true" onclick="updateHsRelation(1)">移除</a>
		</div>
		<div style="padding:5px 0 0 5px;width:20%;float: left;">
			<table id="existingRelationRoomDg" style="width:100%;height:370px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
	           data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: true, selectOnCheck: false,">
	           <thead>
		        <tr>
		        	<th data-options="field:'ck',checkbox:true"></th>
		            <th field="hsAddCommunity" width="19" align="center">小区</th>
		            <th field="hsAddBuilding" width="24" align="center">栋/单元</th>
		            <th field="hsAddDoorplateno" width="19" align="center">房间号</th>
		        </tr>
		        </thead>
			</table>
		</div>
	</div>
	<div style="clear:both;"></div>
	<div style="margin:10px 0 0 0;text-align: center;">
		<a class="easyui-linkbutton" iconcls="icon-save" onclick="updateRelations()">保存</a>
		<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#OfficeAssociateHrDlg').dialog('close')">取消</a>
	</div>
</div>
