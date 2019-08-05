<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>公众号发布</title>
	
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/webuploader.css" rel="stylesheet">
	<link href="css/upload.css" rel="stylesheet">
	
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	
	<script src="http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div>
		<div style="padding:5px 0 5px 5px">
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" id="housingReleaseSettings" onclick="pushHouseDlg()">编辑并发布</a>
			<a class="easyui-linkbutton" plain="true" iconCls="icon-edit" onclick="updateHouseStatus()">上架/下架</a>
			
		</div>
		<div style="margin:0 0 0 5px">
			<div style="margin:0 0 5px 5px;float:left;">
				楼盘名称：<input id="searchCommunity" onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 29px;float:left;">
				楼栋：<input id="searchBuilding" onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 17px;float:left;">
				门牌号：<input id="searchDoorplateno" onkeyup="searchOnkeyup(this.id, 'queryTrusteeship(1, 0)')" style="width:100px">
			</div>
			<div style="margin:0 0 5px 5px;float:left;">
				发布状态：<select id="hsMicronetIdentification" onchange="queryTrusteeship(1, 0)">
					<option value="2">已上架</option>
					<option value="1">已下架</option>
					<option value="">全部</option>
			</select>
			</div>
		</div>
	</div>
	<div>
		<table id="trusteeshipDg" style="width:100%;height:527px;table-layout:fixed;overflow:hidden;" class="easyui-datagrid"
			data-options="singleSelect:true, autoRowHeight:false, fitColumns:true, scrollbarSize:0,checkOnSelect: false, selectOnCheck: false">
			<thead>
				<tr>
					<th data-options="field:'ck',checkbox:true"></th>
					<th field="detailedAddress" width="30" align="center">房屋地址</th>
					<th field="NumberOfAttachments" width="10" align="center">图片数量</th>
					<th field="hsMicronetIdentification" width="10" align="center" formatter="formatterHsMicronetIdentification">发布状态</th>
					<th field="hsDownDeposit" width="10" align="center" formatter="depositStateFormatter">下定状态</th>
				</tr>
			</thead>
		</table>
		<div id="trusteeshipPageDiv" style="width:100%;text-align:center;"></div>
	</div>
	<!-- 房源发布设置 -->
	<div id="pushHouseDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<form id="releaseSettingsForm">
			<div style='margin:5px 0 0 20px;float: left;'>
				房间照片:
				<a class="easyui-linkbutton" iconCls="icon-chakantupian" plain="true" 
					onclick="open_common_img_dialog('public', 'hs', 'trusteeshipDg', 'hsId', 'hsOtherImg', 'queryHouseForStoreById', 'deleteHsPic')">上传及查看图片</a>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 20px;float: left;'>
				房屋标题：<input id="house_title" require="require" style="width:280px;">
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 44px;float: left;'>
				户型：<select id="apartment_layout" require="require" choose="choose" style="width:100px">
						<option></option>
					</select>
			</div>
			<div style='margin:5px 0 0 44px;float: left;'>
				朝向：<select id="orientation" require="require" choose="choose" style="width:100px">
						<option></option>
					</select>
			</div>
			<div style='margin:5px 0 0 44px;float: left;'>
				面积：<input id="the_measure_of_area" require="require" style="width:140px">m²
			</div>
			<div style='margin:5px 0 0 44px;float: left;'>
				装修：<select id="renovation" require="require" choose="choose" style="width:100px">
						<option></option>
					</select>
			</div>
			<div style='margin:5px 0 0 44px;float: left;'>
				押付：<select id="charges_paid" require="require" choose="choose" style="width:100px">
						<option></option>
					</select>
			</div>
			<div style="margin:5px 0 0 20px;float:left;position:relative;">
				<div style='float: left;'>联系电话：</div>
				<select id="telephone" style="width:140px; float: left;" hideInfo="1"
					onChange="document.getElementById('telephoneInput').value=document.getElementById('telephone').options[document.getElementById('telephone').selectedIndex].value;"
						onclick="document.getElementById('telephoneInput').value=document.getElementById('telephone').options[document.getElementById('telephone').selectedIndex].value;">
				</select><%--<input type="text" id="telephoneInput"  require="require"--%>
					<%--style="position:absolute;left:36px;width:120px;border:1px solid #A9A9A9;border-right:0px solid #A9A9A9;padding:2px 0 2px 1px;--%>
					<%--margin:0 0 0 24px; float: left;">--%>
			</div>
			<div style="clear:both"></div>
			<div style='margin:5px 0 0 20px;float: left;'>
				<div style='float: left;'>看房标签：</div>
				<select id="house_tag" require="require" choose="choose" style="width:100px" >
					<option></option>
					<option value="随时看房" >随时看房</option>
					<option value="预约看房" >预约看房</option>
				</select>
			</div>
			<div style='margin:5px 0 0 20px;float: left;'>
				<div style='float: left;'>发布标签：</div>
				<select id="publish_tag" require="require" choose="choose" style="width:100px" >
					<option></option>
					<option value="新上线" >新上线</option>
				</select>
			</div>
			<div style='margin:5px 0 0 20px;float: left;'>
				<div style='float: left;'>楼道标签：</div>
				<select id="corridor" require="require" choose="choose" style="width:140px" >
					<option></option>
					<option value="电梯" >电梯</option>
					<option value="楼梯" >楼梯</option>
				</select>
			</div>
			<div style='margin:5px 0 0 20px;float: left;'>
				<div style='float: left;'>家私标签：</div>
				<select id="furniture" require="require" choose="choose" style="width:100px" >
					<option></option>
					<option value="家电齐全" >家电齐全</option>
					<option value="部分家电" >部分家电</option>
					<option value="基本家电" >基本家电</option>
					<option value="空房" >空房</option>
				</select>
			</div>
			<div style='margin:5px 0 0 20px;float: left;'>
				<div style='float: left;'>发布状态：</div>
					<select id="hsMicronetIdentification3">
						<option></option>
						<option value="2">已上架</option>
						<option value="1">已下架</option>
					</select>
			</div>
			<div style='margin:5px 0 0 20px;float: left;'>
				<div style='float: left;'>车位情况：</div>
				<select id="arkingSpace" require="require" choose="choose" style="width:140px" >
					<option></option>
					<option value="免费停车">免费停车</option>
					<option value="收费停车">收费停车</option>
					<option value="暂无停车">暂无停车</option>
				</select>
			</div>
		<div style="clear:both"></div>
			<div style='margin:5px 0 0 20px;float: left; '>
			详细介绍：<textarea id="hsHousingIntroduction" rows="2" cols="80" style=""></textarea>			
		</div>
			<div style="clear:both"></div>
			<div id="fgsource_furnitureConfig">
				<div style="margin:5px 0 5px 20px;">房屋配置：</div>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="冰箱">冰箱</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="空调">空调</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电视机">电视机</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="洗衣机">洗衣机</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="油烟机">油烟机</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="燃气灶">燃气灶</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电磁炉">电磁炉</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="碗柜">碗柜</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="热水器">热水器</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="机顶盒">机顶盒</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="1.5床">1.5床</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="1.2床">1.2床</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="床头柜">床头柜</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="衣柜">衣柜</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="沙发">沙发</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="茶几">茶几</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="电视柜">电视柜</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="餐桌">餐桌</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="餐椅">餐椅</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="鞋柜">鞋柜</button>
				<button type="button" class="btn btn-default btn-xs" style="margin:0 0 5px 5px;width:80px;" value="窗帘">窗帘</button>
			</div>
			<div  style="margin:10px 0 0 0;text-align: center;">
				<a class="easyui-linkbutton" iconcls="icon-save" id="" onclick="doPushHouse()" >保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#pushHouseDlg').dialog('close')">取消</a>
			</div>
		</form>
	</div>
	<div id="updateHouseStatusDlg" style="padding:6px;" class="easyui-dialog" data-options="closed:true">
		<div style="margin:5px 0 0 5px;text-align: center;">
			发布状态：<select id="hsMicronetIdentification2">
				<option></option>
				<option value="2">已上架</option>
				<option value="1">已下架</option>
			</select>
		</div>
		<div style="margin:20px 0 0 0;text-align: center;">
			<a class="easyui-linkbutton" iconcls="icon-ok" id="" onclick="doUpdateHouseStatus()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateHouseStatusDlg').dialog('close')">关闭</a>
		</div>
	</div>
	<jsp:include page="/ui/public/uploadDlg.jsp"></jsp:include>
	<script src="js/upload.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.wxgzhPushHouse.js"></script>
</body>
</html>