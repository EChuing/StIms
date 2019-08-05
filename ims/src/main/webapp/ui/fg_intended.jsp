<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>意向客户</title>
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
	<div>
		<div style="padding:5px 0 5px 5px">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-yixiangren" onclick="addIntended()" id="addIntendedButton">添加意向客户</a> 
			<a class="easyui-linkbutton" iconCls="icon-search" plain="true" onclick="advancedScreening(1)" id="screening">高级筛选</a>
		</div>
	</div>
	<div class="advancedScreening">
		<div class="advanced1">
			<div style="margin:0 0 5px 5px;float:left;">
				姓名：<input id="searchIntendedName" onkeyup="searchOnkeyup(this.id, 'queryIntended(1, 0)')"
					style="width:80px">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				电话：<input id="searchIntendedPhone" onkeyup="searchOnkeyup(this.id, 'queryIntended(1, 0)')"
					style="width:80px">
			</div>
			<!-- <div style="margin:0 0 5px 10px;float:left;">
				身份证：<input id="searchIntendedIdCard"
					onkeyup="searchOnkeyup(this.id, 'queryIntended(1, 0)')" style="width:80px">
			</div> -->
			<div style="margin:0 0 5px 5px;float:left">
				租房状态：<select id="searchIpState" style="width:100px;" onchange="queryIntended(1,0)">
					<option value="">全部</option>
					<option value="待定">待定</option>
					<option value="已定">已定</option>
					<option value="暂缓">暂缓</option>
					<option value="无效">无效</option>
					<option value="我租">我租</option>
					<option value="已租">已租</option>
				</select>
			</div>
			<div style="padding:0 0 5px 5px;float:left;">
				登记人：<input id="searchRegisterShowUserInfo" class="choose_user_button" doFlag="searchRegister" doFun="queryIntended(1,0)"
					style="width:150px;cursor:pointer;" readonly="readonly" clear="clear" require="require" >
				<input id="searchRegisterGetUserStoreId" type="hidden">
				<input id="searchRegisterGetUserDetId" type="hidden">
				<input id="searchRegisterGetUserId" type="hidden">
				<div id="searchRegisterShowUserInfoDiv" style="display:none;"></div>
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				时间段：<input id="searchTimeStart"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryIntended(1,0)})"
					style="width:80px"> 至：<input id="searchTimeEnd"
					onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',autoPickDate:true,dchanging:queryIntended(1,0)})"
					style="width:80px">
			</div>
		</div>
	</div>
	<div id="intended_index" style="display:none"></div>
	<!--意向人列表-->
	<div id="DataGridIntended" style="width:100%;height:90%;">
		<table id="intendedDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="ipName" width="15" align="center">姓名</th>
					<th field="ipTel" width="20" align="center">电话号码</th>
					<th field="ipFrom" width="20" align="center">来源</th>
					<th field="ipLocation" width="30" align="center">需求位置</th>
					<th field="ipInNature" width="10" align="center">入住性质</th>
					<th field="ipDoorModel" width="15" align="center">需求户型</th>
					<th field="ipArea" width="15" align="center">需求面积</th>
					<th field="ipState" width="10" align="center" formatter="ipStateFormatter">租房状态</th>
					<th field="ipDate" width="25" align="center">登记日期</th>
					<th field="username" width="10" align="center">登记人</th>
			</thead>
		</table>
		<!-- 意向人分页 -->
		<div id="intendedPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	
	<!-- 查看详细 及 修改 窗口 -->
	<div id="lookAtTheIntentionerDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:8px 0 0 34px;float:left">
			状态：<select id="addipState1" style="width:80px;" needs="1">
				<option></option>
				<option value="待定">待定</option>
				<option value="已定">已定</option>
				<option value="暂缓">暂缓</option>
				<option value="无效">无效</option>
				<option value="我租">我租</option>
				<option value="已租">已租</option>
			</select>
		</div>
		<div style="margin:8px 0 0 34px;float:left">
			姓名：<input id="addpopName1" style="width:80px" needs="1">
		</div>
		<div style="margin:8px 0 0 34px;float:left;display:none" id="addpopPhoneDiv1">
			电话：<input id="addpopPhone1" style="width:100px" needs="1" >
		</div>
		<div style="margin:8px 0 0 24px;float:left;position:relative;">
			来源：<select id="from1" style="width:90px;" onChange="document.getElementById('addipFrom1').value=document.getElementById('from1').options[document.getElementById('from1').selectedIndex].value;">
				<option value="" style="color:#c2c2c2;">---请选择---</option>
			</select>
			<input type="text" id="addipFrom1"  needs="1" style="margin-left:-93px; left:36px;width:70px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;">
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 40px;float:left;color:red">
			注意：客户【来源】请从下拉菜单中选择，方便系统统计客户渠道！特殊情况，可以手动填入。
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			入住性质：<select id="addipInNature1" style="width:80px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			需求户型：<select id="addipDoorModel1" style="width:80px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			需求面积：<input type="number" id="addipArea11" style="width:100px;">m² ~ <input type="number" id="addipArea21" style="width:100px;">m²
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			家电需求：<select id="addfurnitureConfig1" style="width:80px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			楼层需求：<select id="addFloorDemand1" style="width:80px;">
				<option></option>
				<option value="不限">不限</option>
				<option value="低层">低层</option>
				<option value="中层">中层</option>
				<option value="高层">高层</option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			价格范围：<input type="number" id="addPriceRange11" style="width:100px;">元 ~ <input type="number" id="addPriceRange21" style="width:100px;">元
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			其它需求：<input id="addipOther1" style="width:230px;">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			需求位置：<input id="addipLocation1" style="width:250px;">
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			登记时间：<input id="addRegistrationTime1" style="width:100px;" disabled="disabled">
		</div>
		<div style="margin:8px 0 0 12px;float:left">
			登记人：<input id="addipUserName1" style="width:90px;" disabled="disabled">
			<input id="addipUserId1" style="display:none">
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 5px;width:98%;">
			<table id="takeAGuestHouseTable"></table>
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 5px;width:98%;">
			<table id="followInfoTable"></table>
			<div id="followPageDiv" style="width:100%;text-align:center;"></div>
		</div>
		<div style="clear:both"></div>
		<center>
			<div style="height:5px;"></div>
			<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'intended_index', 'intendedDg', 'lookAtTheIntentionerDlg', 'updateIntended(row)');">上一条</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateIntended()" >修改保存</a>
			<a class="easyui-linkbutton" iconCls="icon-follow-up" id="lookPhoneBotton" onclick="lookPhone();">看电话</a>
			<a class="easyui-linkbutton" iconCls="icon-follow-up" id="lookHouseBotton" onclick="roomWindow();" >带看房</a>
			<a class="easyui-linkbutton" iconCls="icon-follow-up" id="writeFollowButton" onclick="writeFollow(0)" >写跟进</a>
			<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'intended_index', 'intendedDg', 'lookAtTheIntentionerDlg', 'updateIntended(row)');">下一条</a>
		</center>
	</div>
	
	<!-- 添加意向人 -->
	<div id="addIntendedDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:8px 0 0 34px;float:left">
			状态：<select id="addipState" style="width:80px;" needs="1">
				<option></option>
				<option value="待定">待定</option>
				<option value="已定">已定</option>
				<option value="暂缓">暂缓</option>
				<option value="无效">无效</option>
				<option value="我租">我租</option>
				<option value="已租">已租</option>
			</select>
		</div>
		<div style="margin:8px 0 0 34px;float:left">
			姓名：<input id="addpopName" style="width:80px" needs="1">
		</div>
		<div style="margin:8px 0 0 34px;float:left">
			电话：<input id="addpopPhone" style="width:100px" needs="1">
		</div>
		<div style="margin:8px 0 0 24px;float:left;position:relative;">
			来源：<select id="from" style="width:90px;" onChange="document.getElementById('addipFrom').value=document.getElementById('from').options[document.getElementById('from').selectedIndex].value;">
				<option value="" style="color:#c2c2c2;">---请选择---</option>
			</select>
			<input type="text" id="addipFrom"  needs="1" style="margin-left:-93px; left:36px;width:70px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;">
		</div>
		<div style="clear:both"></div>
		<div style="margin:5px 0 0 40px;float:left;color:red">
			注意：客户【来源】请从下拉菜单中选择，方便系统统计客户渠道！特殊情况，可以手动填入。
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			入住性质：<select id="addipInNature" style="width:80px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			需求户型：<select id="addipDoorModel" style="width:80px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			需求面积：<input id="addipArea1" style="width:100px;">m² ~ <input id="addipArea2" style="width:100px;">m²
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			家电需求：<select id="addfurnitureConfig" style="width:80px;">
				<option></option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			楼层需求：<select id="addFloorDemand" style="width:80px;">
				<option></option>
				<option value="不限">不限</option>
				<option value="低层">低层</option>
				<option value="中层">中层</option>
				<option value="高层">高层</option>
			</select>
		</div>
		<div style="margin:8px 0 0 10px;float:left">
			价格范围：<input id="addPriceRange1" style="width:100px;">元  ~ <input id="addPriceRange2" style="width:100px;"> 元 
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			其它需求：<input id="addipOther" style="width:230px;">
		</div>
		<div style="margin:5px 0 0 10px;float:left">
			需求位置：<input id="addipLocation" style="width:250px;">
		</div>
		<div style="clear:both"></div>
		<div style="margin:8px 0 0 10px;float:left">
			登记时间：<input id="addRegistrationTime" style="width:100px;" disabled="disabled">
		</div>
		<div style="margin:8px 0 0 12px;float:left">
			登记人：<input id="addipUserName" style="width:90px;" disabled="disabled">
			<input id="addipUserId" style="display:none">
		</div>
		<div style="clear:both"></div>
		<center>
			<div style="height:20px;"></div>
			<a id="addSaveButton" class="easyui-linkbutton" iconcls="icon-save" onclick="doAddIntended()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#addIntendedDlg').dialog('close')">取消</a>
		</center>
	</div>
	
	<div id="writeFollowDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 0 0;">
			<textarea id="followNote" style="width:270px;height:90px;"></textarea>
		</div>
		<input id="addFollowNum" style="display:none">
		</br>
		<center>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doWriteFollow()" id="saveUpdateRenter">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollowDlg').dialog('close')">取消</a>
		</center>
	</div>


	<!--//////////// 电话跟进窗口 ///////////-->
	<div id="writeFollowDlg2" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 0 0;">
			<textarea id="followNote2" style="width:270px;height:90px;"></textarea>
		</div>
		<input id="addFollowNum2" style="display:none">
		</br>
		<center>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doWriteFollow2()" id="saveUpdateRenter2">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#writeFollowDlg2').dialog('close')">取消</a>
		</center>
	</div>

	<!-- 跟进详细信息 -->
	<div id="downFollowInfo" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td style="width:20%;">跟进时间：</td>
						<td style="width:20%;"><span id="readDownFollowtime"></span></td>
					</tr>
					<tr>
						<td style="width:20%;">跟进人：</td>
						<td style="width:20%;"><span id="readDownFollowname"></span></td>
					</tr>
					<tr>
						<td style="width:20%;">跟进内容：</td>
						<td style="text-align:left;width:80%;"><span id="readDownFollownote"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	
	<!-- 带看房增加窗口 -->
	<div id="roomWindowDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="float:left; margin:5px 0 0 20px">
			物业地址：<input id="choseHouse" style="width:250px;" onclick="relationDlg()" value="单击选择房源" 
				onfocus="if (value =='单击选择房源'){value =''}" onblur="if (value ==''){value='单击选择房源'}" >
			</input>
			<input style="display:none" id="choseHouseId">
			<input style="display:none" id="choseHouseType">
		</div>
		<div style="float:left; margin:5px 0 0 20px;">
			<input id="selfHelp" type="checkbox">自助看房
		</div>
		<div style="clear:both"></div>
		
		<div id="roomUserNameDiv" style="margin:5px 0 0 32px">
			带看人：<input id="roomUserName" style="width:250px" disabled="disabled">
			<input id="gotoStoreId" type="hidden">
			<input id="gotoDetId" type="hidden">
			<input id="gotoUrseId" style="display:none">
		</div>
		<div style="clear:both"></div>
		<div id="goto1Div" style="margin:5px 0 0 32px">
			同行人：<input id="goto1ShowUserInfo" class="choose_user_button"  doFlag="goto1" doFun=""
				style="width:250px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require"><!--  onclick="$('#doEventMenu').show();"不知道干嘛的：20190108 -->
			<input id="goto1GetUserStoreId" type="hidden">
			<input id="goto1GetUserDetId" type="hidden">
			<input id="goto1GetUserId" type="hidden">
			<div id="goto1ShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both"></div>
		<div id="goto2Div" style="margin:5px 0 5px 32px">
			同行人：<input id="goto2ShowUserInfo" class="choose_user_button"  doFlag="goto2" doFun="" 
				style="width:250px;cursor: pointer;" type="text" readonly="readonly" clear="clear" require="require"><!--  onclick="$('#doEventMenu').show();" -->
			<input id="goto2GetUserStoreId" type="hidden" clear="clear">
			<input id="goto2GetUserDetId" type="hidden" clear="clear">
			<input id="goto2GetUserId" type="hidden" clear="clear">
			<div id="goto2ShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="clear:both"></div>
		<div id="intervalDiv" style="margin:5px 0 20px 0"></div>
		
		<center>
			<a id="updateSaveButton" class="easyui-linkbutton" iconcls="icon-save" onclick="addroomWindow();" >保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#roomWindowDlg').dialog('close')">取消</a>
		</center>
	</div>
	
	<!-- 选择外出地点 -->
	<div id="relationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style='margin:5px 0 10px 0;'>
			<div style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;display:none">
				城市：<select id="searchAddCity" onchange="queryAddCity()" style="width:80px">
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				城区：<select id="searchAddDistrict" onchange="relationDate(1,0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;display:none">
				片区：<select id="searchAddZone" onchange="relationDate(1,0)" style="width:100px">
					<option></option>
				</select>
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				楼盘/小区：<input id="searchAddCommunity" onkeyup="relationDate(1,0)" style="width:80px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				楼栋：<input id="searchAddBuilding" onkeyup="relationDate(1,0)" style="width:60px">
			</div>
			<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
				门牌号：<input id="searchAddDoorplateno" onkeyup="relationDate(1,0)" style="width:60px">
			</div>
		</div>
		<div style="clear:both"></div>
		<div style="width:100%;">
			<!-- 选择未租列表 -->
			<table id="choseTrusteeshipTable">
			</table>
			<div id="choseTrusteeshipPageDiv" style="width:99%;text-align:center;"></div>
		</div>	
	</div>
	
	<script src="js/fg.public.js"></script>
	<script src="js/fg.intended.js"></script>
</body>
</html>