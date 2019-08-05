<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>居住人口</title>
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
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
 	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
 	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
 	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
 	<script src="js/config.js"></script>
	
	<script src="js/fg.public.js"></script>
	<script src="js/baseISSObject.js"></script>
	<script src="js/baseISSOnline.js"></script>
	<script src="js/common.js"></script>
	
	
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div style="padding:10px 0 0 5px;">
		<div style="margin:0 0 5px 5px;float:left;">
			姓名：<input id="searchPopulationName" onkeyup="searchOnkeyup(this.id, 'queryPopulation(1, 0)')"
				style="width:80px">
		</div>
		<div style=" margin:0 0 5px 5px;float:left;">
			电话：<input id="searchPopulationPhone" onkeyup="searchOnkeyup(this.id, 'queryPopulation(1, 0)')"
				style="width:80px">
		</div>
		<div style="margin:0 0 5px 5px;float:left;">
			身份证：<input id="searchPopulationIdCard" onkeyup="searchOnkeyup(this.id, 'queryPopulation(1, 0)')"
				style="width:80px">
		</div>
		<div style="padding:0 0 5px 5px;float:left;">
			登记人：<input id="searchRegisterShowUserInfo" class="choose_user_button" doFlag="searchRegister" doFun="queryPopulation(1,0)"
				style="width:150px;cursor:pointer;" readonly="readonly">
			<input id="searchRegisterGetUserStoreId" type="hidden">
			<input id="searchRegisterGetUserDetId" type="hidden">
			<input id="searchRegisterGetUserId" type="hidden">
			<div id="searchRegisterShowUserInfoDiv" style="display:none;"></div>
		</div>
		<div style="margin:0 0 5px 5px;float:left;" id="populationType" onchange="queryPopulation(1,0)">
			<div id="owner" style="float:left;margin: 0 0 5px 5px">业主</div>
			<div id="ownerCheckbox" style="float:left;margin: 0 0 5px 5px">
				<input type="checkbox" fwpz="业主" />
			</div>
			<div style="float:left;margin: 0 0 5px 5px">承租人</div>
			<div style="float:left;margin: 0 0 5px 5px">
				<input type="checkbox" fwpz="承租人" />
			</div>
			<div style="float:left;margin: 0 0 5px 5px">住户</div>
			<div style="float:left;margin: 0 0 5px 5px">
				<input type="checkbox" fwpz="住户" />
			</div>
		</div>
	</div>
	<!--客户列表-->
	<div id="DataGridPopulation" style="width:100%;height:90%;">
		<table id="populationDg" style="width:100%;height:402px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false, singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="popName" width="20" align="center">姓名</th>
					<th field="popNameRemark" width="20" align="center">备注</th>
					<th field="popTelephone" width="20" align="center">电话号码</th>
					<th field="popIdcard" width="30" align="center">身份证</th>
					<th field="popLandlord" width="10" formatter="formatLandlord" align="center">业主</th>
					<th field="popRenter" width="10" formatter="formatRenter" align="center">承租人</th>
					<th field="popResident" width="10" formatter="formatResident" align="center">住户</th>
					<th field="popInnerCreditLevel" width="20" align="center">内部信用</th>
					<th field="popOuterCreditLevel" width="20" align="center">外部信用</th>
					<th field="popRegistrationTime" width="30" align="center">登记日期</th>
					<th field="userName" width="20" align="center">登记人</th>
			</thead>
		</table>
		<!-- 分页 -->
		<div id="populationPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 客户详细信息窗口 -->
	<div id="populationDetailedDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<input id="population_index" type="hidden">
		<div style="float: left;">
			<div style='margin:10px 0 0 34px;float: left;'>
				姓名：<input id="pop_name" style="width:80px" clear="clear">
			</div>
			<div style='margin:10px 0 0 30px;float: left;'>
				电话：<input id="pop_telephone" style="width:80px" clear="clear">
			</div>
			<div style='margin:10px 0 0 40px;float: left;'>
				备注：<input id="pop_name_remark" style="" clear="clear">
			</div>
			<div style="clear:both"></div>
			<div style='margin:10px 0 0 10px;float: left;'>
				证件号码：<input id="pop_idcard" style="width:226px" clear="clear">
			</div>
			<div style='margin:10px 0 0 40px;float: left;'>
				证件类型：<select id="pop_idcard_type" style="" choose="choose">
					<option value=""></option>
					<option value="身份证/临时身份证/户口本">身份证/临时身份证/户口本</option>
					<option value="回乡证/护照">回乡证/护照</option>
					<option value="其他">其他</option>
				</select>
			</div>
			<div style="clear:both"></div>
			<div style='margin:10px 0 0 34px;float: left;'>
				性别：<select id="pop_sex" style="width:80px" choose="choose">
					<option value=""></option>
					<option value="男">男</option>
					<option value="女">女</option>
				</select>
			</div>
			<div style='margin:10px 0 0 30px;float: left;'>
				民族：<input id="pop_nation" style="width:80px" clear="clear">
			</div>
			<div style='margin:10px 0 0 40px;float: left;'>
			婚姻状况：<select id="pop_marriage_state" style=" " choose="choose">
					<option value=""></option>
					<option value="已婚">已婚</option>
					<option value="未婚">未婚</option>
					<option value="离异">离异</option>
					<option value="其他">其他</option>
				</select>
				
			</div>
			<div style="clear:both"></div>
			<div style='margin:10px 0 0 10px;float: left;'>
				户籍地址：<input id="pop_idcard_address" style="width:226px" clear="clear">
			</div>
			<div style='margin:10px 0 0 40px;float: left;'>
				文化程度：<select id="pop_degree_education" style="" choose="choose">
						<option value=""></option>
						<option value="博士">博士</option>
						<option value="硕士">硕士</option>
						<option value="本科">本科</option>
						<option value="大专">大专</option>
						<option value="高中">高中</option>
						<option value="初中">初中</option>
						<option value="小学">小学</option>
						<option value="其他">其他</option>
					</select>
			</div>
			
			<div style="clear:both"></div>
			
			<div style='margin:10px 0 0 34px;float: left;'>
				职业：<select id="pop_occupation" style="width:80px" choose="choose">
					<option value=""></option>
					<option value="工人">工人</option>
					<option value="公务员">公务员</option>
					<option value="职员">职员</option>
					<option value="农民">农民</option>
					<option value="其他">其他</option>
				</select>
			</div>
			<div style='margin:10px 0 0 30px;float: left;'>
				生日：<input id="pop_birth" style="width:80px;" onclick="WdatePicker({maxDate:'%y-%M-%d'})" clear="clear">
			</div>
			<div style='margin:10px 0 0 36px;float: left;'>
				内/外信用：<input type="number" id="pop_inner_credit_level" style="width:48px;" clear="clear">
				<input type="number" id="pop_outer_credit_level" style="width:49px;" clear="clear">
			</div>
			
			<div style="clear:both"></div>
		</div>
		
		<div style="margin:10px 0 0 45px;float: left;">
			<img width="120px" height="140px" src="images/userImage.png" style="margin-left:5px" id="id_img_pers_open" clear="clear" >
		</div>
		
		<div style="clear:both"></div>
		
		<div style='margin:5px 0 5px 0px;float: left;'>
			<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" onclick="open_common_img_dialog('private', 'populations', 'populationDg', 'popId', 'popImgPath', 'selectPopulation', 'deleteAssetsPic')">查看附件</a>
			<!-- <a class="easyui-linkbutton" iconCls="icon-fujian" plain="true" onclick="openAttachment('private')">查看附件</a> -->
			<span class="attachmentNum" style="vertical-align: middle;line-height: 26px;color: #444;"></span>
			<a class="easyui-linkbutton" onclick="pushingCard(1)" iconCls="icon-add" plain="true" id="addResidentButton">发卡</a>
			<a href="" onclick="doUpdatePopulation(1)" class="easyui-linkbutton" iconCls="icon-reload" plain="true" >密码重置</a>
			<a id="openUpdateID" class="easyui-linkbutton" style="display: none;" onclick="new Device().startFun(this.id)">读取身份证</a>
		</div>
		
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 0;">
			<table id="houseDg" style="width:100%;height:147px;table-layout:fixed;overflow:hidden;" 
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="detailedAddress" width="40" align="center">关联房屋地址</th>
						<th field="popHouseRelation" width="20" align="center">关系</th>
						<th field="contStatus" width="20" align="center">合约状态</th>
						<th field="registrationTime" width="20" align="center">登记日期</th>
					</tr>
				</thead>
			</table>
		</div>
		<div style="margin:10px 0 0 0;">
			<table id="followUpInformationTable" style="width:100%;height:147px;table-layout:fixed;overflow:hidden;"
				data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
				<thead>
					<tr>
						<th field="text" width="70" align="center">内容</th>
						<th field="registrantName" width="10" align="center">操作人</th>
						<th field="time" width="20" align="center">操作时间</th>
					</tr>
				</thead>
			</table>
		</div>
		<div style="margin:10px 0 0 0;text-align:center;">	
			<a class="easyui-linkbutton" iconcls="icon-up" onclick="lastOrNext(0, 'population_index', 'populationDg', 'populationDetailedDlg', 'populationDetailedDlg(row)')">上一条</a>
			<a class="easyui-linkbutton" iconcls="icon-edit" onclick="updateLivingMen()" id="updateLivingMenButton">修改住户</a>
			<a class="easyui-linkbutton" iconcls="icon-edit" onclick="openUpdate()" id="updateButton">修改</a>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdatePopulation(0)" id="doUpdateButton">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-down" onclick="lastOrNext(1, 'population_index', 'populationDg', 'populationDetailedDlg', 'populationDetailedDlg(row)')">下一条</a>
		</div>
	</div>
	
	<!-- 房屋相关人员 -->
	<div id="housePopulationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<table id="housePopulationDg" class="easyui-datagrid" style="width:100%;height:277px;table-layout:fixed;overflow:hidden;"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0">
			<thead>
				<tr>
					<th field="popName" width="25" align="center">姓名</th>
					<th field="popRelation" width="25" align="center">承租人关系</th>
					<th field="contStatus" width="25" align="center">居住状态</th>
					<th field="popGmtModified" width="25" align="center">更新日期</th>
				</tr>
			</thead>
		</table>
	</div>
	
	<!-- 跟进详情 -->
	<div id="followInfoDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<center>
			<table class="xwtable" style="margin-top:10px;">
				<tbody>
					<tr>
						<td>操作人：</td>
						<td colspan="3"><span id="followregistrantName"></span></td>
					</tr>
					<tr>
						<td>操作时间：</td>
						<td colspan="3"><span id="followtime"></span></td>
					</tr>
					<tr>
						<td>内容：</td>
						<td colspan="3" style="text-align:left"><span id="followtext"></span></td>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
	
	<!-- 修改住户 -->
	<div id="updateLivingMenDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div style="margin:10px 0 0 12px;float:left">
			住户状态：<select id="updateLivingMenRtTypeNew" style="width:300px;" choose="choose" require="require">
				<option></option>
				<option valuse="在住">在住</option>
				<option valuse="曾住">曾住</option>
				<option valuse="搬离">搬离</option>
				<option valuse="无效">无效</option>
			</select>
		</div>
		<input id="updateLivingMenRtTypeOld" style="display:none" clear="clear"><!-- 住户状态（旧的） -->
		<div style="clear:both"></div>
		<div style="margin:10px 0 0 24px;float:left">
			入住房：<input id="updateLivingMenHrAddressNew" style="width:300px;cursor: pointer;" onclick="relationDlg();" readonly="readonly" clear="clear" require="require">
			<input id="updateLivingMenHrAddressOld" style="display:none" clear="clear"><!-- 入住房（旧的） -->
			<input id="updateLivingMenRtHrIdNew" style="display:none" clear="clear">
			<input id="updateLivingMenRtHrIdOld" style="display:none" clear="clear">
			<input id="updateLivingMenRtId" style="display:none" clear="clear">
		</div>
		<div style="clear:both"></div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateLivingMen()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateLivingMenDlg').dialog('close')">取消</a>
		</div>
	</div>
	
	<!-- 住户修改选择已租房 -->
	<div id="relationDlg" style="padding:6px" class="easyui-dialog" data-options="closed:true">
		<div id="relationSelect">
			<div style='margin:0 0 10px 0;'>
				<div style="margin:0 0 5px 26px;color:black;font-size:13px;float:left;display: none">
					城市：<select id="searchAddCity" onchange="queryAddCity()" style="width:80px">
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;">
					城区：<select id="searchAddDistrict" onchange="relationDate(1,0)" style="width:100px">
						<option></option>
					</select>
				</div>
				<div style="margin:0 0 5px 5px;color:black;font-size:13px;float:left;display: none">
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
				<div style="clear:both"></div>
			</div>
		</div>
		<div id="relationDataGrid" style="width:100%;height:89%">
			<div id="choseSource" style="width:100%;height:100%;">
				<table id="choseSourceTable"></table>
				<div id="choseSourcePageDiv" style="width:99%;text-align:center;"></div>
			</div>
		</div>
	</div>
	<script src="js/fg.population.js"></script>
	<script src="js/upload.js"></script>
 	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
</body>
</html>