<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title><%=session.getAttribute("systemBrand") %> - 专业的<%=session.getAttribute("systemType") %></title>
	<link rel="shortcut icon" href="images/titlelogo.ico" />
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/highcharts.js"></script>
	<script src="js/config.js"></script>
	<script src="js/histogram.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/iconfont.js"></script>
</head>
<body style="width:100%;height:100%;overflow-y: hidden;">
	<div class='index-loading'>
		<img src="img/loadingImg.gif">
		<p class="text">页面加载中，请稍后...</p>
	</div>
	<div class="easyui-layout" style="width:100%;height:100%;"
		data-options="fit:true">
		<div data-options="region:'north'" style="height:50px; background-image: url('images/main-top.jpg');">
			<center>
				<div class="headerDivCss" id="returnLogin" style="width:50px;float:right;margin:0 20px 0 0;padding-top:1px;font-size:1px;" onclick="window.top.location.href = '../userLogout.action';">
					<div style="width:30px;">
						<img style="height:26px;width:26px"	 src="img/header退出.png"></img><br>退出
					</div>
				</div>
				<div style="float:right;margin:26px 5px 0 0;padding-top:1px;font-size:1px;">
					<span id="clock" style="font-size:13px;"></span> 
				</div>
				<div id="helpDoc" class="headerDivCss skipToChild"  style="width:50px;float:right;margin:0 5px 0 0;padding-top:1px;font-size:1px;position:relative;"
						skipToChild="服务;fg_help;help;
									,;
									,;
									,;">
					<div style="width:30px;">
						<img style="height:26px;width:26px" src="img/header帮助.png"></img><br>服务
					</div>
				</div>
				<div id="punchCard" onclick="workPunchButton()" class="headerDivCss"  style="width:50px;float:right;margin:0 5px 0 0;padding-top:1px;font-size:1px;position:relative;">
					<div  style="width:30px;">
						<img style="height:26px;width:26px" src="img/header考勤.png"></img><br>考勤
					</div>
				</div>
				<div id="mainRepairHeader" class="headerDivCss skipToChild" style="width:50px;float:right;margin:0 5px 0 0;padding-top:1px;font-size:1px;position:relative;"
						skipToChild="维保;fg_repair;weixiuguanli;
									,s;
									,searchState;
									,未完成;">
					<div id="mainRepairRadius" style="margin-left:37px;;height:8px;width:8px;border-radius:8px;background-color:red;z-index:1;position:absolute;"></div>
					<div style="width:30px;">
						<img style="height:26px;width:26px" src="img/header维保.png"></img><br>维保
					</div>
				</div>
				<div id="mainTaskHeader" class="headerDivCss skipToChild" style="width:50px;float:right;margin:0 5px 0 0;padding-top:1px;font-size:1px;position:relative;"
						skipToChild="任务;fg_task;xiangmushiwu;
									,s;
									,searchState;
									,未完成;">
					<div id="mainTaskRadius" style="margin-left:37px;;height:8px;width:8px;border-radius:8px;background-color:red;z-index:1;position:absolute;"></div>
					<div  style="width:30px;">
						<img style="height:26px;width:26px" src="img/header任务.png"></img><br>任务
					</div>
				</div>
				<div id="mainEventHeader" class="headerDivCss skipToChild" style="width:50px;float:right;margin:0 5px 0 0;padding-top:1px;font-size:1px;position:relative;"
						skipToChild="审批;fg_eventApproval;shiwushenpi;
									,v2;
									,;
									,;">
					<div id="mainEventRadius" style="margin-left:37px;;height:8px;width:8px;border-radius:8px;background-color:red;z-index:1;position:absolute;"></div>
					<div  style="width:30px;">
						<img style="height:26px;width:26px" src="img/header审批.png"></img><br>审批
					</div>
				</div>
			</center>
			<div style="float:right;margin:5px 20px 0 0;font-size:15px;">
				<div id="mainTimeShow" style="font-size:15px;"></div>
				<font style="font-size:16px;"><%=user.getSuStaffName()%></font>，<span style="font-size:15px;" id="mainTimeSpan"></span>好，欢迎使用<%=session.getAttribute("systemType") %>。
			</div>
		</div>
		<input id="loginUserName" type="hidden" value='<%=user.getSuStaffName()%>'> 
		<input id="loginUserId" type="hidden" value='<%=user.getUserId()%>'>
		<input id="loginPurviewLeft" type="hidden" value='<%=user.getSpSpeedLeft()%>'>
		<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
		<input id="loginDepartment" type="hidden" value='<%=user.getSuDepartmentId()%>'>
		<input id="loginStore" type="hidden" value='<%=user.getSuStoreId()%>'>
		<input id="loginType" type="hidden" value='<%=user.getSuType()%>'>
		<span id="loginBrand" type="hidden"><%=session.getAttribute("brand")%></span>
		<span id="loginDevFirst" type="hidden"><%=session.getAttribute("devTypeList")%></span>
		<span id="loginDevSecond" type="hidden"><%=session.getAttribute("devTypeList2")%></span>
<%--		<span id="loginDeviceMenu" type="hidden"><%=session.getAttribute("deviceMenu")%></span>--%>
		<input id="loginCompany" type="hidden" value='<%=session.getAttribute("company")%>'>
		<input id="loginCoId" type="hidden" value='<%=session.getAttribute("coId")%>'>
		<input id="loginCompanyName" type="hidden" value='<%=session.getAttribute("companyName")%>'>
		<input id="loginCompanyRentProvince" type="hidden" value='<%=session.getAttribute("companyRentProvince")%>'>
		<input id="loginCompanyRentCity" type="hidden" value='<%=session.getAttribute("companyRentCity")%>'>
		<input id="loginCompanyRentDistrict" type="hidden" value='<%=session.getAttribute("companyRentDistrict")%>'>
		<input id="loginAuthoritySwitch" type="hidden" value='<%=session.getAttribute("authoritySwitch")%>'>
		<input id="loginAppId" type="hidden" value='<%=session.getAttribute("appId")%>'>
		<input id="loginAntUserId" type="hidden" value='<%=session.getAttribute("antUserId")%>'>
		<div data-options="region:'west'" style="width:170px;overflow:hidden;" title="导航菜单" id="westPanle" >
			<div style="width:100%;height:25px;margin:2px 0 2px 0;padding:0px;display:table;">
				<center>
					<div class="speedAndHeigh" id="speedAndHeighS" onclick="leftMenuResize(0,90)">常用</div>
					<div class="speedAndHeigh" id="speedAndHeighH" onclick="leftMenuResize(1,170)">核心</div>
				</center>
			</div>
			<div style="width:100%;height:25px;padding-left:2px;" id="speedSearchInputDiv">
				<input id="speedSearchInput" style="width:80px;border-radius:8px;outline:none" onkeyup="speedSearchInput()">
			</div>
			<div id="accirdionLeft" class="easyui-panel" style="border-right:0px;border-top:0px;border-left:0px;">
				<div id="leftMenuList" style="width:100%;">
					<!-- 高级导航内容 -->
				</div>
				<center>
					<div id="speedNav" style="overflow-y:auto;overflow-x:hidden;">
						<!-- 快捷导航内容 -->
					</div>
				</center>
			</div>
		</div>
		<div id="mainPanle" region="center" style="background: #eee;border-left:0px">
			<div id="tabs" class="easyui-tabs" fit="true" border="false">
				<div title="欢迎使用" id="gongzuotai" iconCls="icon icon-gongzuotai" tabindex="0"  style="width:100%;height:100%;boder:0px;">
					<iframe src="../welcome.jsp" style="width:100%;height:100%;boder:0px;"frameborder="0" scrolling="auto"></iframe>
				</div>
				<!-- <div title="工作台" id="gongzuotai" iconCls="icon icon-gongzuotai" tabindex="0"  style="width:100%;height:100%;boder:0px;">
					<iframe id="framesConsole" src="../ui/taskboard_boss.jsp" style="width:100%;height:99%;boder:0px;"frameborder="0" scrolling="auto"></iframe>
				</div> -->
				<!-- <div title="快捷入口" id="kuaijierukou" iconCls="icon icon-gongzuotai" tabindex="0"  style="width:100%;height:100%;boder:0px;">
					<iframe id="framesSpeed" src="../ui/speed_do.jsp" style="width:100%;height:99%;boder:0px;"frameborder="0" scrolling="auto">
					</iframe>
				</div> -->
			</div><!-- tabs end -->
		</div><!-- mainPanle end -->
		<div id="mm" class="easyui-menu" style="width:150px;">
			<div id="mm-tabupdate">刷新</div>
			<div class="menu-sep"></div>
			<div id="mm-tabclose">关闭</div>
			<div id="mm-tabcloseall">全部关闭</div>
			<div id="mm-tabcloseother">除此之外全部关闭</div>
			<div class="menu-sep"></div>
			<div id="mm-tabcloseright">当前页右侧全部关闭</div>
			<div id="mm-tabcloseleft">当前页左侧全部关闭</div>
			<div class="menu-sep"></div>
			<div id="mm-exit">退出</div>
		</div>
		<div id="mm1" class="easyui-menu" style="width:150px;">
			<div id="mm1-tabupdate">刷新</div>
			<div class="menu-sep"></div>
			<div id="mm1-tabcloseother">除此之外全部关闭</div>
		</div>
	</div>
	<textarea id="id_card_reader_text_box" rows="10" cols="30" style="display:none;"></textarea>
	
	<script src="js/doPurview.js"></script>
	<script src="js/fg.all.js"></script>
</body>
</html>