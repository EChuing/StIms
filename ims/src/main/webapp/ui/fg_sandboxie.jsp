<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>沙盘演算</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/chosen/chosen.min.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/colorbox.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/chosen/chosen.jquery.min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/My97DatePicker/WdatePicker.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script	src="http://pic-static.fangzhizun.com/js/webuploader.html5only.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.colorbox-min.js"></script>
	<script	src="http://pic-static.fangzhizun.com/js/jquery.colorbox-zh-CN.js"></script>
	<script type="text/javascript" src="js/highcharts.js"></script>
	<script type="text/javascript" src="js/config.js"></script>
	<script src="js/vue.min.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/fg.sandboxie.js"></script>
	<style>
		.highchartDiv {
			width:100%;
			height:400px;
			position:absolute;
			top:130px;
			left:0;
			background:white;
			transition:height 0.5s;
			-webkit-transition:height 0.5s;
			z-index:90;
			display:none
		}
		
		.show {
			display:inline
		}
		
		.hide {
			display : none
		}
	</style>
</head>
<body>
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div id="basicDataDiv" style="width:100%;height:130px;">
		<table id="basicDataDg"  class="easyui-datagrid"
			style="width:100%;height:52px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:10,
				fitColumns:true,
				scrollbarSize:0,
				onClickCell: onClickBDCell">
			<thead>
				<tr>
					<th field="storeHouseCount" width="15" align="center">初始存房总数</th>
					<th field="rentHouseCount" width="15" align="center">已出房数</th>
					<th field="averageLandlordMoney" width="15" align="center" editor="{type:'numberbox',options:{precision:2}}">每套房月均成本</th>
					<th field="middleLandlordMoney" width="15" align="center" editor="{type:'numberbox',options:{precision:2}}">每套房月中位成本</th>
					<th field="averageRenterMoney" width="15" align="center" editor="{type:'numberbox',options:{precision:2}}">每套房月均收入</th>
					<th field="middleRenterMoney" width="15" align="center" editor="{type:'numberbox',options:{precision:2}}">每套房月中位收入</th>
					<th field="balance" width="15" align="center" editor="{type:'numberbox',options:{precision:2}}">手上现金数</th>
				</tr>
			</thead>
		</table>
		<table id="otherDataDg"  class="easyui-datagrid"
			style="width:100%;height:52px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:1,
				fitColumns:true,
				scrollbarSize:0,
				onClickCell: onClickOtherCell">
			<thead>
				<tr>
					<th field="landlordDepositCount" width="13" align="center" editor="{type:'numberbox'}">存房压X付一</th>
					<th field="renterDepositCount" width="13" align="center" editor="{type:'numberbox'}">出房压X付一</th>
					<th field="landlordNoDepositProportion" width="25" align="center" editor="{type:'numberbox',options:{precision:2}}">房东退房不退押金比(%)</th>
					<th field="landlordDepositProportion" width="22" align="center" editor="{type:'numberbox',options:{precision:2}}">房东退房退押金比(%)</th>
					<th field="landlordRenew" width="15" align="center" editor="{type:'numberbox',options:{precision:2}}">房东续签比(%)</th>
					<th field="renterNoDepositProportion" width="25" align="center" editor="{type:'numberbox',options:{precision:2}}">租客退房不退押金比(%)</th>
					<th field="renterDepositProportion" width="22" align="center" editor="{type:'numberbox',options:{precision:2}}">租客退房退押金比(%)</th>
					<th field="renterRenew" width="15" align="center" editor="{type:'numberbox',options:{precision:2}}">租客续签比(%)</th>
					<th field="landlordContractPeriod" width="14" align="center" editor="{type:'numberbox'}">房东合约周期</th>
					<th field="renterContractPeriod" width="14" align="center" editor="{type:'numberbox'}">租客合约周期</th>
					<th field="landlordSignCount" width="11" align="center" editor="{type:'numberbox'}">月均收房数</th>
					<th field="renterSignCount" width="10" align="center" editor="{type:'numberbox'}">月均出房数</th>
				</tr>
			</thead>
		</table>
		<a class="easyui-linkbutton" style="float:left" onclick="deduction()" iconCls="icon-zhidaojia" plain="true">推算未来3年经营状况</a>
		<div id="hisBtn" style="float:left">
			<div class="{{btnShow ? '' :'hide'}}" style="float:left">
				<a class="easyui-linkbutton" onclick="showHighChart()" plain="true">展开图表</a>
			</div>
			<div class="{{btnShow ? 'hide' :''}}" style="float:left">
				<a class="easyui-linkbutton" onclick="showHighChart()" plain="true">收起图表</a>
			</div>
		</div>
		<div id="tip" style="float:left;margin-left:10px;height:26px;line-height:26px;color:red"></div>
	</div>
	<div>
	<table id="resultDataDg"  class="easyui-datagrid"
			style="width:100%;height:400px;table-layout:fixed;overflow:hidden;"
			data-options="rownumbers:false,
				singleSelect:true,
				autoRowHeight:false,
				pageSize:1,
				fitColumns:true,
				scrollbarSize:0">
				
			<thead>
				<tr>
					<th field="month" width="5" align="center">月数</th>
					<th field="averageBalance" width="10" align="center">手上现金数J</th>
					<th field="middleBalance" width="10" align="center">手上现金数Z</th>
					<th field="allHouseCount" width="10" align="center">存房数</th>
					<th field="rentHouseCount" width="10" align="center">已出房数</th>
					<th field="renterGiveDepositCount" width="10" align="center">客人.退房退押</th>
					<th field="renterNoDepositCount" width="10" align="center">客人.退房不退押</th>
					<th field="renterSignCount" width="10" align="center">客人.新租房</th>
					<th field="landlordGiveDepositCount" width="10" align="center">业主.退房退押</th>
					<th field="landlordNoDepositCount" width="10" align="center">业主.退房不退押</th>
					<th field="landlordSignCount" width="10" align="center"">业主.新托管</th>
				</tr>
			</thead>
		</table>
	</div>
	<div id="chart" class="highchartDiv {{show ? 'show' : ''}}"></div>
	<!-- <div style="color:black;margin-left:30px;font-size:20pt">
		<h1 style="margin-top:15px;font-size:18pt">推演结果分析</h1>
		<ul>
			<li style="font-size:12pt">建议：减少存房成本</li>
			<li style="font-size:12pt">建议：前10个月提高租金15%</li>
			<li style="font-size:12pt">建议：10个月后,减少21%</li>
			<li style="font-size:12pt">建议：9个月后,维持6个月不收房</li>
			<li style="font-size:12pt">建议：把租客签约压1付1改为压2付1</li>
		</ul>
	</div> -->
	<script type="text/javascript">
		var vueChart = new Vue({
			el :'#chart',
			data : {
				show : false
			}
		});
		var btn = new Vue({
			el :'#hisBtn',
			data : {
				btnShow : true
			}
		});
		
		function showHighChart(){
			if(vueChart.show){
				btn.btnShow = true;
			}else{
				btn.btnShow = false;
			}
			vueChart.show = !vueChart.show;
		}
	</script>
</body>
</html>