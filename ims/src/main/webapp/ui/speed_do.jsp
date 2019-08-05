<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>快捷入口</title>
    <script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
</head>
<style>
.speed_do_div{
	margin:auto auto;
	width:1200px;
	height:550px;
	/* background:#fff; */
}
.speed_do_div_out{
	width:300px;
	margin-top:20px;
	/* background:#fff; */
	float:left;
}
.arrow{
	background:url(img/箭头.jpg) 160px 30px/102px 78px no-repeat;
}
.speed_do_div_in_top{
	width:100%;
	height:40px;
}
.speed_do_div_in_top_back{
	/* z-index:1;
	position:absolute; */
}
.speed_do_div_in_top_img{
	/* z-index:2;
	position:absolute; */
	float:left;
	/* background:#fff; */
	cursor:pointer;
}
.speed_do_div_in_top_title{
	/* z-index:2;
	position:absolute; */
	margin:8px 0 0 5px;
	font-size:20px;
	float:left;
	/* background:#fff; */
	cursor:pointer;
}
.speed_do_div_in_top_arrow{
	margin-top:6px;
	float:right;
}
.speed_do_div_in_mid{
	width:100%;
}
.speed_do_div_in_mid_shuxian{
	z-index:1;
	position:absolute;
}
.speed_do_div_in_mid_title{
	height:25px;
	margin:8px 0 0 20px;
	font-size:15px;
}
</style>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class="speed_do_div">
		<div class="speed_do_div_out arrow">
			<div id="A3_top" class="speed_do_div_in_top skipToChild"  skipToChild="房源资料;fg_dataHouse;panyuanguanli;">
				<!-- <div class="speed_do_div_in_top_back">
					<img style="margin:11px 0 0 150px;height:20px;width:100px" src="img/横线1.png"></img>
				</div> -->
				<div class="speed_do_div_in_top_img">
					<img style="height:40px;width:40px" src="img/查看房源.png"></img>
				</div>
				<div class="speed_do_div_in_top_title">
					 &nbsp;资料房
				</div>
				<!-- <div class="speed_do_div_in_top_arrow">
					<img style="margin:0 30px 0 0;height:30px;width:30px;" src="img/右 箭头.png"></img>
				</div> -->
			</div>
			<div class="speed_do_div_in_mid">
				<div class="speed_do_div_in_mid_shuxian">
					<img id="A3_shuxian" style="height:90px;width:40px" src="img/竖线.png"></img>
				</div>
				<div id="A38_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="房源资料;fg_dataHouse;panyuanguanli;numsAddSaveHouse1()">
						导入
					</div>
				</div>
				<div id="A38_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="房源资料;fg_dataHouse;panyuanguanli;addSaveHouse()">
						录入资料房
					</div>
				</div>
				<div id="A3-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="房源资料;fg_dataHouse;panyuanguanli;">
						查看(洗房)
					</div>
				</div>
			</div>
		</div>
		<div class="speed_do_div_out arrow">
			<div id="A2_top" class="speed_do_div_in_top skipToChild"  skipToChild="未租房间;fg_trusteeship;weizuguanli;">
				<!-- <div class="speed_do_div_in_top_back">
					<img style="margin:11px 0 0 150px;height:20px;width:100px" src="img/横线1.png"></img>
				</div> -->
				<div class="speed_do_div_in_top_img">
					<img style="height:40px;width:40px" src="img/未租房.png"></img>
				</div>
				<div class="speed_do_div_in_top_title">
					 &nbsp;未租房
				</div>
				<!-- <div class="speed_do_div_in_top_arrow">
					<img style="margin:0 30px 0 0;height:30px;width:30px;" src="img/右 箭头.png"></img>
				</div> -->
			</div>
			<div class="speed_do_div_in_mid">
				<div class="speed_do_div_in_mid_shuxian">
					<img id="A2_shuxian" style="height:90px;width:40px" src="img/竖线.png"></img>
				</div>
				<div id="A28_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="未租房间;fg_trusteeship;weizuguanli;addTrusteeship()">
						录入房东合约
					</div>
				</div>
				<div id="A2-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="未租房间;fg_trusteeship;weizuguanli;">
						查看(管理)
					</div>
				</div>
				<div id="A4-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;">
						退房
					</div>
				</div>
			</div>
		</div>
		<div class="speed_do_div_out arrow">
			<div id="F5_top" class="speed_do_div_in_top skipToChild"  skipToChild="租客意向人管理;fg_intended;yixiangrenguanli;">
				<!-- <div class="speed_do_div_in_top_back">
					<img style="margin:11px 0 0 150px;height:20px;width:100px" src="img/横线1.png"></img>
				</div> -->
				<div class="speed_do_div_in_top_img">
					<img style="height:40px;width:40px" src="img/客户.png"></img>
				</div>
				<div class="speed_do_div_in_top_title">
					 &nbsp;租客意向人
				</div>
				<!-- <div class="speed_do_div_in_top_arrow">
					<img style="margin:0 30px 0 0;height:30px;width:30px;" src="img/右 箭头.png"></img>
				</div> -->
			</div>
			<div class="speed_do_div_in_mid">
				<div class="speed_do_div_in_mid_shuxian">
					<img id="F5_shuxian" style="height:60px;width:40px" src="img/竖线.png"></img>
				</div>
				<div id="F58_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="租客意向人管理;fg_intended;yixiangrenguanli;addIntended()">
						录入意向人
					</div>
				</div>
				<div id="F5-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="租客意向人管理;fg_intended;yixiangrenguanli;">
						查看(跟进)
					</div>
				</div>
			</div>
		</div>
		<div class="speed_do_div_out">
			<div id="A1_top" class="speed_do_div_in_top skipToChild"  skipToChild="已租房间;fg_sourceInfo;yizuguanli;">
				<div class="speed_do_div_in_top_img">
					<img style="height:40px;width:40px" src="img/租房.png"></img>
				</div>
				<div class="speed_do_div_in_top_title">
					 &nbsp;已租房
				</div>
			</div>
			<div class="speed_do_div_in_mid">
				<div class="speed_do_div_in_mid_shuxian">
					<img id="A1_shuxian" style="height:150px;width:40px" src="img/竖线.png"></img>
				</div>
				<div id="A18_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="已租房间;fg_sourceInfo;yizuguanli;addSourceInfo()">
						录入租客合约
					</div>
				</div>
				<div id="C6-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="抄表;fg_meter;chaobiaoguanli;addWegDlg()">
						抄表
					</div>
				</div>
				<div id="C2-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="维修;fg_repair;weixiushiwuguanli;addRepair()">
						维修
					</div>
				</div>
				<div id="A1-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="已租房间;fg_sourceInfo;yizuguanli;">
						查看(管理)
					</div>
				</div>
				<div id="A4-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;">
						退房
					</div>
				</div>
			</div>
		</div>
		<br>
		<div class="speed_do_div_out">
			<div id="B1_top" class="speed_do_div_in_top skipToChild"  skipToChild="收支管理;fg_financial;shouzhiluru;">
				<div class="speed_do_div_in_top_img">
					<img style="height:40px;width:40px" src="img/收支明细.png"></img>
				</div>
				<div class="speed_do_div_in_top_title">
					 &nbsp;财务
				</div>
			</div>
			<div class="speed_do_div_in_mid">
				<div class="speed_do_div_in_mid_shuxian">
					<img id="B1_shuxian" style="height:330px;width:40px" src="img/竖线.png"></img>
				</div>
				<div id="B118_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="收支管理;fg_financial;shouzhiluru;setRenterNewFinancial()">
						录入新签租客收支
					</div>
				</div>
				<div id="B116_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="收支管理;fg_financial;shouzhiluru;addFinancial(0)">
						录入收支记录
					</div>
				</div>
				<div id="B117_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="收支管理;fg_financial;shouzhiluru;setRenterEveryFinancial()">
						录入租客每期收支
					</div>
				</div>
				<div id="C11-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="票据打印;fg_historyPrint;lishipiaojudayin;">
						打印历史票据
					</div>
				</div>
				<div id="B7-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="房东账单;fg_payableToLandlord;fangdongyingfukuan;">
						查看（通知）房东账单
					</div>
				</div>
				<div id="B8-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="租客账单;fg_monthlyBills;zukeyingshoukuan;">
						查看（通知）租客账单
					</div>
				</div>
				<div id="B3-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="房东合约;fg_landlordContract;fangdongheyue;">
						查看（管理）房东合约
					</div>
				</div>
				<div id="B4-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="租客合约;fg_renterContract;zukeheyue;">
						查看（管理）租客合约
					</div>
				</div>
				<div id="B5-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="房东分期账单;fg_landlordInstallment;fangdongfenqizhangdan;">
						查看（管理）房东每期账单
					</div>
				</div>
				<div id="B6-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="租客分期账单;fg_renterInstallment;zukefenqizhangdan;">
						查看（管理）租客每期账单
					</div>
				</div>
			</div>
		</div>
		<div class="speed_do_div_out">
			<div id="H1_top" class="speed_do_div_in_top skipToChild"  skipToChild="资产管理;fg_assets;zichanguanli;">
				<div class="speed_do_div_in_top_img">
					<img style="height:40px;width:40px" src="img/资产统计.png"></img>
				</div>
				<div class="speed_do_div_in_top_title">
					 &nbsp;资产仓库
				</div>
			</div>
			<div class="speed_do_div_in_mid">
				<div class="speed_do_div_in_mid_shuxian">
					<img id="H1_shuxian" style="width:40px" src="img/竖线.png"></img>
				</div>
				<div id="H1-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="资产管理;fg_asset;zichanguanli;">
						资产管理
					</div>
				</div>
				<div id="H2-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="库房管理;fg_supplies;haocaiguanli;">
						库房管理
					</div>
				</div>
			</div>
		</div>
		<div class="speed_do_div_out">
			<div id="D1_top" class="speed_do_div_in_top skipToChild"  skipToChild="收支管理;fg_financial;shouzhiluru;">
				<div class="speed_do_div_in_top_img">
					<img style="height:40px;width:40px" src="img/用户.png"></img>
				</div>
				<div class="speed_do_div_in_top_title">
					 &nbsp;人事
				</div>
			</div>
			<div class="speed_do_div_in_mid">
				<div class="speed_do_div_in_mid_shuxian">
					<img id="D1_shuxian" style="height:60px;width:40px" src="img/竖线.png"></img>
				</div>
				<div id="D1-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="用户管理;fg_user;yuangongyonghuguanli;">
						用户账号管理
					</div>
				</div>
				<div id="D3-_mid" class="speed_do_div_in_mid_title">
					<div style="float:left;">
						<img style="height:20px;width:20px;" src="img/横线.png"></img>
					</div>
					<div class="skipToChild" style="float:left;cursor:pointer;" skipToChild="权限管理;fg_purview;yuangongquanxianguanli;">
						岗位权限管理
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="js/speed_do.js"></script>
</body>
</html>