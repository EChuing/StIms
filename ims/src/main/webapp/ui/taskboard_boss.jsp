<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="utf-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>工作台</title>
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.css">
	
    <style>
    	::-webkit-scrollbar{width:6px;height:6px}
		::-webkit-scrollbar-thumb{border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#c3c3c3}
		::-webkit-scrollbar-track{background-color:transparent}
		#app {
			padding-top: 10px;
			
		}
		.taskboard {
			margin-top: 20px;
		}
		.gonggao .label {
			cursor: pointer;
			filter: alpha(opacity=20); opacity: 0.2;
			-webkit-transition: all 500ms ease;
			-moz-transition: all 500ms ease;
			-ms-transition: all 500ms ease;
			-o-transition: all 500ms ease;
			transition: all 500ms ease;
		}
		.gonggao:hover .label {
			filter: alpha(opacity=100); opacity: 1;
		}
		.gonggao-boss,
		.gonggao-biz,
		.gonggao-overall {
			max-height: 139px;
			overflow: auto;
			white-space: pre-wrap;
		}
		.gonggao-biz {
			max-height: 139px;
		}
		.gonggao-overall {
			max-height: 137px;
		}
		.top-alert {
			font-size: 16px;
			font-weight: bold;
		}
		.text-center th {
			text-align: center;
		}
		.statistics .col-xs-3 {
			padding-left: 0px;
			padding-right: 0px; 
		}
		.statistics .col-xs-4,
		.statistics .col-xs-6 {
			padding-left: 5px;
			padding-right: 5px; 
		}
		textarea {
			resize: vertical;
		}
		.skipToChild:hover {
			text-decoration: underline;
			cursor: pointer;
		}
		body, html{
			width: 100%;
			height: auto;
		}
	</style>
</head>
<body  >
	<div class="bodyLoadingOver" ></div>
	<input id="loginPurview" type="hidden" value='<%=user.getSpNewPurview()%>'>
	<div class="container-fluid" id="app" style="height:100%">
		<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist" id="firstNav">
			<li id="tab1" role="presentation"><a href="#taskboard-boss" aria-controls="taskboard-boss" role="tab" data-toggle="tab">老板工作台</a></li>
			<li id="tab2" role="presentation"><a href="#taskboard-business" aria-controls="taskboard-business" role="tab" data-toggle="tab">业务任务板</a></li>
			<li id="tab3" role="presentation"><a href="#taskboard-overall" aria-controls="taskboard-overall" role="tab" data-toggle="tab">综合任务板</a></li>
			<li id="tab20" role="presentation"><a href="#taskboard-shop" aria-controls="taskboard-shop" role="tab" data-toggle="tab">商超工作台</a></li>
		</ul>
		<!-- Tab panes -->
		<div class="tab-content taskboard" style="height:90%">
			<div role="tabpanel" class="tab-pane fade" id="taskboard-boss">
				<div class="row clearfix">
					<div class="col-xs-12 col-sm-12 col-md-4">
						<div class="col-xs-12">
							<div class="panel panel-primary gonggao">
							  	<div class="panel-heading clearfix">
							  		<span class="pull-left">公告栏</span>
							  		<span class="pull-right">
										<a href="#addNotice" data-toggle="modal" class="label label-success">新增</a>
										<a href="#editNotice" data-toggle="modal" class="label label-info">编辑</a>
							  		</span>
							  	</div>
							  	<div class="panel-body">
									<!-- Nav tabs -->
									<ul class="nav nav-tabs" role="tablist" id="secondNav-boss">
										<li id="tab4" role="presentation" class="active"><a href="#gongsigonggao-boss" aria-controls="gongsigonggao" role="tab" data-toggle="tab">公司</a></li>
										<li id="tab5" role="presentation"><a href="#yewugonggao-boss" aria-controls="yewugonggao" role="tab" data-toggle="tab">业务部</a></li>
										<li id="tab6" role="presentation"><a href="#xingzhenggonggao-boss" aria-controls="xingzhenggonggao" role="tab" data-toggle="tab">行政部</a></li>
										<li id="tab7" role="presentation"><a href="#caiwugonggao-boss" aria-controls="caiwugonggao" role="tab" data-toggle="tab">财务部</a></li>
									</ul>
									<!-- Tab panes -->
									<div class="tab-content">
										<div role="tabpanel" class="tab-pane fade in active" id="gongsigonggao-boss">
											
											<h4 v-html="gonggao.gongsi.dnTitle" class="text-center" id="gongsidnTitle" ></h4>
											<p v-html="gonggao.gongsi.dnContent" class="gonggao-boss" id="gongsidnContent"></p>
											<p class="text-right" id="gongsisuStaffName">{{ gonggao.gongsi.suStaffName }}&emsp;</p>
											<p class="text-right" id="gongsidnTime">{{ gonggao.gongsi.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
										<div role="tabpanel" class="tab-pane fade" id="yewugonggao-boss">
								
											<h4 v-html="gonggao.yewu.dnTitle" class="text-center" id="yewudnTitle"></h4>
											<p v-html="gonggao.yewu.dnContent" class="gonggao-boss" id="yewudnContent"></p>
											<p class="text-right" id="yewusuStaffName">{{ gonggao.yewu.suStaffName }}&emsp;</p>
											<p class="text-right" id="yewudnTime">{{ gonggao.yewu.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
										<div role="tabpanel" class="tab-pane fade" id="xingzhenggonggao-boss">
											<h4 v-html="gonggao.xingzheng.dnTitle" class="text-center" id="xingzhengdnTitle"></h4>
											<p v-html="gonggao.xingzheng.dnContent" class="gonggao-boss"  id="xingzhengdnContent"></p>
											<p class="text-right" id ="xingzhengsuStaffName">{{ gonggao.xingzheng.suStaffName }}&emsp;</p>
											<p class="text-right" id= "xingzheng.dnTime">{{ gonggao.xingzheng.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
										<div role="tabpanel" class="tab-pane fade" id="caiwugonggao-boss">
											<h4 v-html="gonggao.caiwu.dnTitle" class="text-center" id="caiwudnTitle"></h4>
											<p v-html="gonggao.caiwu.dnContent" class="gonggao-boss" id="caiwudnContent"></p>
											<p class="text-right" id="caiwusuStaffName">{{ gonggao.caiwu.suStaffName }}&emsp;</p>
											<p class="text-right" id="caiwudnTime">{{ gonggao.caiwu.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button></div>
									</div>
							  	</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">新签合约统计</div>
								<div class="panel-body">
									<table class="table table-condensed table-striped text-center">
										<thead>
											<tr>
												<th>
													
												</th>
												<th>
													租客合约数
												</th>
												<th>
													业主合约数
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													本月
												</td>
												<td>
													{{ newContractStatistics.countNum1 }}
												</td>
												<td>
													{{ newContractStatistics.countNum4 }}
												</td>
											</tr>
											<tr>
												<td>
													本季
												</td>
												<td>
													{{ newContractStatistics.countNum2 }}
												</td>
												<td>
													{{ newContractStatistics.countNum5 }}
												</td>
											</tr>
											<tr>
												<td>
													本年
												</td>
												<td>
													{{ newContractStatistics.countNum3 }}
												</td>
												<td>
													{{ newContractStatistics.countNum6 }}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">即将到期合约</div>
								<div class="panel-body">
									<table class="table table-condensed table-striped text-center">
										<thead>
											<tr>
												<th>
													
												</th>
												<th>
													租客合约数
												</th>
												<th>
													业主合约数
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													30天内
												</td>
												<td>
													{{ contractDueExpire.countNum1 }}/{{ contractDueExpire.countNum4 }}
												</td>
												<td>
													{{ contractDueExpire.countNum5 }}/{{ contractDueExpire.countNum8 }}
												</td>
											</tr>
											<tr>
												<td>
													半年内
												</td>
												<td>
													{{ contractDueExpire.countNum2 }}/{{ contractDueExpire.countNum4 }}
												</td>
												<td>
													{{ contractDueExpire.countNum6 }}/{{ contractDueExpire.countNum8 }}
												</td>
											</tr>
											<tr>
												<td>
													一年内
												</td>
												<td>
													{{ contractDueExpire.countNum3 }}/{{ contractDueExpire.countNum4 }}
												</td>
												<td>
													{{ contractDueExpire.countNum7 }}/{{ contractDueExpire.countNum8 }}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">房源统计</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-4">
											<h3>已租</h3>
										</div>
										<div class="col-xs-4">
											<h3>已定</h3>
										</div>
										<div class="col-xs-4">
											<h3>未租</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-4">
											<h2>{{ houseStatistics.alreadyRented }}</h2>
										</div>
										<div class="col-xs-4">
											<h2>{{ houseStatistics.downPayment }}</h2>
										</div>
										<div class="col-xs-4">
											<h2>{{ houseStatistics.noRent }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">审批</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-6">
											<h3>发起</h3>
										</div>
										<div class="col-xs-6">
											<h3>待办</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="审批;fg_eventApproval;shenqingshenpi;
												,v1;
												,;
												,;">{{ eventNums.countNum1 }}</h2>
										</div>
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="审批;fg_eventApproval;shenqingshenpi;
												,v2;
												,;
												,;">{{ eventNums.countNum2 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="panel panel-primary">
							<div class="panel-heading">主营租金-收支统计（此数据统计至今日凌晨）</div>
							<div class="panel-body">
								<div class="row clearfix">
									<div class="col-md-4">
										<h4 class="text-center">本月</h4>
										<h5 class="clearfix"><span class="pull-left">收入</span><span class="pull-right">{{ financialStatistics.fsMonthlyAlreadyIncome }}元/{{ financialStatistics.fsMonthlyShouldIncome }}元</span></h5>
										<div class="progress">
										  <div id="fsMonthlyIncomePercent" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsMonthlyIncomePercent }}</span>
										  </div>
										</div>
										<h5 class="clearfix"><span class="pull-left">支出</span><span class="pull-right">{{ financialStatistics.fsMonthlyAlreadyExpenses }}元/{{ financialStatistics.fsMonthlyShouldExpenses }}元</span></h5>
										<div class="progress">
										  <div id="fsMonthlyExpensesPercent" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsMonthlyExpensesPercent }}</span>
										  </div>
										</div>
										<h5 class="clearfix"><span class="pull-left">盈亏</span><span class="pull-right">{{ financialStatistics.fsMonthlyAlreadyProfit }}元/{{ financialStatistics.fsMonthlyShouldProfit }}元</span></h5>
										<div class="progress">
										  <div id="fsMonthlyProfitPercent" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsMonthlyProfitPercent }}</span>
										  </div>
										</div>
									</div>
									<div class="col-md-4">
										<h4 class="text-center">本季</h4>
										<h5 class="clearfix"><span class="pull-left">收入</span><span class="pull-right">{{ financialStatistics.fsQuarterlyAlreadyIncome }}元/{{ financialStatistics.fsQuarterlyShouldIncome }}元</span></h5>
										<div class="progress">
										  <div id="fsQuarterlyIncomePercent" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsQuarterlyIncomePercent }}</span>
										  </div>
										</div>
										<h5 class="clearfix"><span class="pull-left">支出</span><span class="pull-right">{{ financialStatistics.fsQuarterlyAlreadyExpenses }}元/{{ financialStatistics.fsQuarterlyShouldExpenses }}元</span></h5>
										<div class="progress">
										  <div id="fsQuarterlyExpensesPercent" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsQuarterlyExpensesPercent }}</span>
										  </div>
										</div>
										<h5 class="clearfix"><span class="pull-left">盈亏</span><span class="pull-right">{{ financialStatistics.fsQuarterlyAlreadyProfit }}元/{{ financialStatistics.fsQuarterlyShouldProfit }}元</span></h5>
										<div class="progress">
										  <div id="fsQuarterlyProfitPercent" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsQuarterlyProfitPercent }}</span>
										  </div>
										</div>
									</div>
									<div class="col-md-4">
										<h4 class="text-center">本年</h4>
										<h5 class="clearfix"><span class="pull-left">收入</span><span class="pull-right">{{ financialStatistics.fsYearlyAlreadyIncome }}元/{{ financialStatistics.fsYearlyShouldIncome }}元</span></h5>
										<div class="progress">
										  <div id="fsYearlyIncomePercent" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsYearlyIncomePercent }}</span>
										  </div>
										</div>
										<h5 class="clearfix"><span class="pull-left">支出</span><span class="pull-right">{{ financialStatistics.fsYearlyAlreadyExpenses }}元/{{ financialStatistics.fsYearlyShouldExpenses }}元</span></h5>
										<div class="progress">
										  <div id="fsYearlyExpensesPercent" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsYearlyExpensesPercent }}</span>
										  </div>
										</div>
										<h5 class="clearfix"><span class="pull-left">盈亏</span><span class="pull-right">{{ financialStatistics.fsYearlyAlreadyProfit }}元/{{ financialStatistics.fsYearlyShouldProfit }}元</span></h5>
										<div class="progress">
										  <div id="fsYearlyProfitPercent" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
											<span class="sr-only">{{ fsYearlyProfitPercent }}</span>
										  </div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="panel panel-primary">
							<div class="panel-heading">跟进提醒</div>
							<div class="panel-body">
								<div class="table-responsive">
									<div id="form-followUp-boss" class="form-inline">
										<div class="form-group">
											<label for="followUpTimePeriod-boss">时间段</label>
											<select @change="initFollowUpTable_boss" id="followUpTimePeriod-boss" class="form-control">
												<option value="1">7天内</option>
												<option value="2">15天内</option>
												<option value="3">30天内</option>
											</select>
										</div>
										<div class="form-group">
											<label for="followUpType-boss">跟进类别</label>
											<select @change="initFollowUpTable_boss" id="followUpType-boss" class="form-control">
												<option value="">全部</option>
												<option value="行政跟进">行政跟进</option>
												<option value="业务跟进">业务跟进</option>
												<option value="财务跟进">财务跟进</option>
											</select>
										</div>
										<div class="form-group">
											<label for="followUpBelong-boss">跟进归属</label>
											<select @change="initFollowUpTable_boss" id="followUpBelong-boss" class="form-control">
												<option value="">全部</option>
												<option value="租客">租客</option>
												<option value="业主">业主</option>
												<option value="住户">住户</option>
												<option value="其他">其他</option>
											</select>
										</div>
									</div>
									<table id="followUpTable-boss" class="table-condensed">
										<thead>
									        <tr>
									            <th data-field="addCommunity" data-width="14%" data-halign="center">房源地址</th>
									            <th data-field="jhfFollowBelong" data-width="8%" data-halign="center">跟进归属</th>
									            <th data-field="jhfFollowRemark" data-width="50%" data-halign="center">提醒内容</th>
									            <th data-field="jhfPaymentWay" data-width="8%" data-halign="center">跟进类别</th>
									            <th data-field="jhfUserName" data-width="7%" data-halign="center">跟进人</th>
									            <th data-field="jhfFollowTime" data-width="13%" data-halign="center">跟进时间</th>
									        </tr>
									    </thead>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="panel panel-primary">
							<div class="panel-heading">业绩统计</div>
							<div class="panel-body">
								<div class="table-responsive">
									<div id="form-performance" class="form-inline">
										<div class="form-group">
											<label for="performanceTimePeriod">时间段</label>
											<select @change="initPerformanceTable" id="performanceTimePeriod" class="form-control">
											  	<option value="近7天">近7天</option>
											  	<option value="本月">本月</option>
											  	<option value="上月">上月</option>
											</select>
										</div>
										<div class="form-group">
											<label for="performanceDept">部门</label>
											<select @change="initPerformanceTable" id="performanceDept" class="form-control">
											  	<option v-for="item in dept" :value="item.departmentId">{{ item.departmentName }}</option>
											</select>
										</div>
									</div>
									<table id="performanceTable" class="table-condensed text-center">
										<thead>
									        <tr>
									            <th data-field="staffName">业务员</th>
									            <th data-field="mpsIntentionalNumber">意向人数</th>
									            <th data-field="mpsFollowUpNumber">跟进数</th>
									            <th data-field="mpsWithGuestHouseNumber">带客看房数</th>
									            <th data-field="mpsLookNumberRoom">看业主房数</th>
									            <th data-field="mpsHouseNumber">出房数</th>
									            <th data-field="mpsRoomNumber">收房数</th>
									            <th data-field="mpsChooseRoomNumber">洗房数</th>
									        </tr>
									    </thead>
									</table>
									<div id="bossContainer" style="height:290px"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane fade" id="taskboard-business">
				<div class="row clearfix">
					<!-- 业务公告栏 -->
					<div class="col-xs-12 col-sm-12 col-md-4">
						<div class="col-xs-12">
							<div class="panel panel-primary gonggao">
							  	<div class="panel-heading clearfix">
							  		<span class="pull-left">公告栏</span>
							  		<span class="pull-right">
										<a href="#addNotice" data-toggle="modal" class="label label-success">新增</a>
										<a href="#editNotice" data-toggle="modal" class="label label-info">编辑</a>
							  		</span>
								</div>
							  	<div class="panel-body">
									<!-- Nav tabs -->
									<ul class="nav nav-tabs" role="tablist" id="secondNav-biz">
										<li id="tab8" role="presentation" class="active"><a href="#gongsigonggao-biz" aria-controls="gongsigonggao" role="tab" data-toggle="tab">公司</a></li>
										<li id="tab9" role="presentation"><a href="#yewugonggao-biz" aria-controls="yewugonggao" role="tab" data-toggle="tab">业务部</a></li>
									</ul>
									<!-- Tab panes -->
									<div class="tab-content">
										<div role="tabpanel" class="tab-pane fade in active" id="gongsigonggao-biz">
											<h4 v-html="gonggao.gongsi.dnTitle" class="text-center" id="yewugongsidnTitle"></h4>
											<p v-html="gonggao.gongsi.dnContent" class="gonggao-biz" id="yewugongsidnContent"></p>
											<p class="text-right" id="yewugongsisuStaffName">{{ gonggao.gongsi.suStaffName }}&emsp;</p>
											<p class="text-right" id="yewugongsidnTime">{{ gonggao.gongsi.dnTime }}&emsp;</p>
											
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
										<div role="tabpanel" class="tab-pane fade" id="yewugonggao-biz">
											<h4 v-html="gonggao.yewu.dnTitle" class="text-center" id="yewuyewudnTitle"></h4>
											<p v-html="gonggao.yewu.dnContent" class="gonggao-biz" id="yewuyewudnContent"></p>
											<p class="text-right" id ="yewuyewusuStaffName">{{ gonggao.yewu.suStaffName }}&emsp;</p>
											<p class="text-right" id ="yewuyewudnTime">{{ gonggao.yewu.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
									</div>
							  	</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">收房</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-4">
											<h3>关注</h3>
										</div>
										<div class="col-xs-4">
											<h3>私盘</h3>
										</div>
										<div class="col-xs-4">
											<h3>公盘</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="房源资料;fg_dataHouse;panyuanguanli;
												,s,s;
												,searchHouseState,searchStateOwned;
												,,公盘;">{{ bizNums[0].countNum1 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="房源资料;fg_dataHouse;panyuanguanli;
												,s,s;
												,searchHouseState,searchStateOwned;
												,,私盘;">{{ bizNums[0].countNum2 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="房源资料;fg_dataHouse;panyuanguanli;
												,s,s;
												,searchHouseState,searchStateOwned;
												,,公盘;">{{ bizNums[0].countNum3 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">出房</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-4">
											<h3>已定</h3>
										</div>
										<div class="col-xs-4">
											<h3>未租</h3>
										</div>
										<div class="col-xs-4">
											<h3>意向人</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="未租房间;fg_trusteeship;weizuguanli;
												,s;
												,searchHsDownDeposit;
												,是;">{{ bizNums[1].countNum1 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="未租房间;fg_trusteeship;weizuguanli;
												,s;
												,searchLeaseState;
												,所有未租;">{{ bizNums[1].countNum2 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="租客意向人管理;fg_intended;yixiangrenguanli;
												,i;
												,searchIntendedName;
												,;">{{ bizNums[1].countNum3 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">管房</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-4">
											<h3>跟进维保</h3>
										</div>
										<div class="col-xs-4">
											<h3>未领维保</h3>
										</div>
										<div class="col-xs-4">
											<h3>已租房数</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="已租房间;fg_sourceInfo;yizuguanli;
												,i;
												,sourceCommunity;
												,;">{{ bizNums[2].countNum1 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="已租房间;fg_sourceInfo;yizuguanli;
												,i;
												,sourceCommunity;
												,;">{{ bizNums[2].countNum2 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="已租房间;fg_sourceInfo;yizuguanli;
												,i;
												,sourceCommunity;
												,;">{{ bizNums[2].countNum3 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6 col-md-12">
							<div class="panel panel-primary">
								<div class="panel-heading">审批</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-6">
											<h3>发起</h3>
										</div>
										<div class="col-xs-6">
											<h3>待办</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="审批;fg_eventApproval;shenqingshenpi;
												,v1;
												,;
												,;">{{ bizNums[3].countNum1 }}</h2>
										</div>
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="审批;fg_eventApproval;shenqingshenpi;
												,v2;
												,;
												,;">{{ bizNums[3].countNum2 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 业务曲线图 -->
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="panel panel-primary">
						  	<div class="panel-heading">个人业绩</div>
						  	<div class="panel-body">
						  		<div id="employeesContainer" style="height:290px"></div>
						  	</div>
					  	</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="panel panel-primary">
							<div class="panel-heading">跟进提醒</div>
							<div class="panel-body">
								<div class="table-responsive">
									<div id="form-followUp-biz" class="form-inline">
										<div class="form-group">
											<label for="followUpTimePeriod-biz">时间段</label>
											<select @change="initFollowUpTable_biz" id="followUpTimePeriod-biz" class="form-control">
												<option value="1">7天内</option>
												<option value="2">15天内</option>
												<option value="3">30天内</option>
											</select>
										</div>
										<div class="form-group">
											<label for="followUpType-biz">跟进类别</label>
											<select @change="initFollowUpTable_biz" id="followUpType-biz" class="form-control">
												<option value="">全部</option>
												<option value="行政跟进">行政跟进</option>
												<option value="业务跟进">业务跟进</option>
												<option value="财务跟进">财务跟进</option>
											</select>
										</div>
										<div class="form-group">
											<label for="followUpBelong-biz">跟进归属</label>
											<select @change="initFollowUpTable_biz" id="followUpBelong-biz" class="form-control">
												<option value="">全部</option>
												<option value="租客">租客</option>
												<option value="业主">业主</option>
												<option value="住户">住户</option>
												<option value="其他">其他</option>
											</select>
										</div>
									</div>
									<table id="followUpTable-biz" class="table-condensed">
										<thead>
									        <tr>
									        	<th data-field="addCommunity" data-width="14%" data-halign="center">房源地址</th>
									            <th data-field="jhfFollowBelong" data-width="8%" data-halign="center">跟进归属</th>
									            <th data-field="jhfFollowRemark" data-width="50%" data-halign="center">提醒内容</th>
									            <th data-field="jhfPaymentWay" data-width="8%" data-halign="center">跟进类别</th>
									            <th data-field="jhfUserName" data-width="7%" data-halign="center">跟进人</th>
									            <th data-field="jhfFollowTime" data-width="13%" data-halign="center">跟进时间</th>
									        </tr>
									    </thead>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div role="tabpanel" class="tab-pane fade" id="taskboard-overall">
				<div class="row clearfix">
					<!-- 综合公告栏 -->
					<div class="col-xs-12 col-sm-12 col-md-4">
						<div class="col-xs-12">
							<div class="panel panel-primary gonggao">
								<div class="panel-heading clearfix">
									<span class="pull-left">公告栏</span>
							  		<span class="pull-right">
										<a href="#addNotice" data-toggle="modal" class="label label-success">新增</a>
										<a href="#editNotice" data-toggle="modal" class="label label-info">编辑</a>
							  		</span>
								</div>
							  	<div class="panel-body">
									<!-- Nav tabs -->
									<ul class="nav nav-tabs" role="tablist" id="secondNav-overall">
										<li id="tab10" role="presentation" class="active"><a href="#gongsigonggao-overall" aria-controls="gongsigonggao" role="tab" data-toggle="tab">公司</a></li>
										<li id="tab11" role="presentation"><a href="#yewugonggao-overall" aria-controls="yewugonggao" role="tab" data-toggle="tab">业务部</a></li>
										<li id="tab12" role="presentation"><a href="#xingzhenggonggao-overall" aria-controls="xingzhenggonggao" role="tab" data-toggle="tab">行政部</a></li>
										<li id="tab13" role="presentation"><a href="#caiwugonggao-overall" aria-controls="caiwugonggao" role="tab" data-toggle="tab">财务部</a></li>
									</ul>
									<!-- Tab panes -->
									<div class="tab-content">
										<div role="tabpanel" class="tab-pane fade in active" id="gongsigonggao-overall">
											<h4 v-html="gonggao.gongsi.dnTitle" class="text-center" id = "zonghegongsidnTitle"></h4>
											<p v-html="gonggao.gongsi.dnContent" class="gonggao-overall" id="zonghegongsidnContent"></p>
											<p class="text-right" id="zonghegongsisuStaffName">{{ gonggao.gongsi.suStaffName }}&emsp;</p>
											<p class="text-right" id = "zonghegongsi.dnTime">{{ gonggao.gongsi.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
										<div role="tabpanel" class="tab-pane fade" id="yewugonggao-overall">
											<h4 v-html="gonggao.yewu.dnTitle" class="text-center" id="zongheyewudnTitle"></h4>
											<p v-html="gonggao.yewu.dnContent" class="gonggao-overall" id ="zongheyewudnContent"></p>
											<p class="text-right" id="zongheyewusuStaffName">{{ gonggao.yewu.suStaffName }}&emsp;</p>
											<p class="text-right" id="zongheyewudnTime">{{ gonggao.yewu.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
										<div role="tabpanel" class="tab-pane fade" id="xingzhenggonggao-overall">
											<h4 v-html="gonggao.xingzheng.dnTitle" class="text-center" id="zonghexingzhengdnTitle"></h4>
											<p v-html="gonggao.xingzheng.dnContent" class="gonggao-overall" id="zonghexingzhengdnContent"></p>
											<p class="text-right" id="zonghexingzhengsuStaffName">{{ gonggao.xingzheng.suStaffName }}&emsp;</p>
											<p class="text-right" id="zonghexingzhengdnTime">{{ gonggao.xingzheng.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
										<div role="tabpanel" class="tab-pane fade" id="caiwugonggao-overall">
											<h4 v-html="gonggao.caiwu.dnTitle" class="text-center" id="zonghecaiwudnTitle"></h4>
											<p v-html="gonggao.caiwu.dnContent" class="gonggao-overall" id="zonghecaiwudnContent"></p>
											<p class="text-right" id="zonghecaiwusuStaffName">{{ gonggao.caiwu.suStaffName }}&emsp;</p>
											<p class="text-right" id="zonghecaiwudnTime">{{ gonggao.caiwu.dnTime }}&emsp;</p>
											<button  type="button" @click="console.log('ona');ona();"   class="btn btn-default" >
													<span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
											</button> 
											<button type="button" @click="console.log('nextcement');nextcement();" style="float: right;"   class="btn btn-default" >
												<span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
											</button>
										</div>
									</div>
							  	</div>
							</div>
						</div>
						<div class="col-xs-12">
							<div class="panel panel-primary">
								<div class="panel-heading">审批</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-6">
											<h3>发起</h3>
										</div>
										<div class="col-xs-6">
											<h3>待办</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="审批;fg_eventApproval;shenqingshenpi;
												,v1;
												,;
												,;">{{ overallNums[6].countNum1 }}</h2>
										</div>
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="审批;fg_eventApproval;shenqingshenpi;
												,v2;
												,;
												,;">{{ overallNums[6].countNum2 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-8">
						<div class="panel panel-primary">
							<div class="panel-heading">跟进提醒</div>
							<div class="panel-body">
								<div class="table-responsive">
									<div id="form-followUp-overall" class="form-inline">
										<div class="form-group">
											<label for="followUpTimePeriod-overall">时间段</label>
											<select @change="initFollowUpTable_overall" id="followUpTimePeriod-overall" class="form-control">
												<option value="1">7天内</option>
												<option value="2">15天内</option>
												<option value="3">30天内</option>
											</select>
										</div>
										<div class="form-group">
											<label for="followUpType-overall">跟进类别</label>
											<select @change="initFollowUpTable_overall" id="followUpType-overall" class="form-control">
												<option value="">全部</option>
												<option value="行政跟进">行政跟进</option>
												<option value="业务跟进">业务跟进</option>
												<option value="财务跟进">财务跟进</option>
											</select>
										</div>
										<div class="form-group">
											<label for="followUpBelong-overall">跟进归属</label>
											<select @change="initFollowUpTable_overall" id="followUpBelong-overall" class="form-control">
												<option value="">全部</option>
												<option value="租客">租客</option>
												<option value="业主">业主</option>
												<option value="住户">住户</option>
												<option value="其他">其他</option>
											</select>
										</div>
									</div>
									<table id="followUpTable-overall" class="table-condensed">
										<thead>
									        <tr>
									        	<th data-field="addCommunity" data-width="14%" data-halign="center">房源地址</th>
									            <th data-field="jhfFollowBelong" data-width="8%" data-halign="center">跟进归属</th>
									            <th data-field="jhfFollowRemark" data-width="50%" data-halign="center">提醒内容</th>
									            <th data-field="jhfPaymentWay" data-width="8%" data-halign="center">跟进类别</th>
									            <th data-field="jhfUserName" data-width="7%" data-halign="center">跟进人</th>
									            <th data-field="jhfFollowTime" data-width="13%" data-halign="center">跟进时间</th>
									        </tr>
									    </thead>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-xs-12">
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">收租</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-3">
											<h3>逾期</h3>
										</div>
										<div class="col-xs-3">
											<h3>未付</h3>
										</div>
										<div class="col-xs-3">
											<h3>未通知</h3>
										</div>
										<div class="col-xs-3">
											<h3>账单</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="租客账单;fg_monthlyBills;yizufangyuedu;
												,i,addDay;
												,searchPayRentDayStart,searchPayRentDayEnd;
												,,0;">{{ overallNums[0].countNum1 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="租客账单;fg_monthlyBills;yizufangyuedu;
												,subDay,addDay;
												,searchPayRentDayStart,searchPayRentDayEnd;
												,0,3;">{{ overallNums[0].countNum2 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="租客账单;fg_monthlyBills;yizufangyuedu;
												,subDay,addDay,s;
												,searchPayRentDayStart,searchPayRentDayEnd,searchMsgState;
												,0,7,未通知;">{{ overallNums[0].countNum3 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="租客账单;fg_monthlyBills;yizufangyuedu;
												,;
												,;
												,;">{{ overallNums[0].countNum4 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">付租</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-3">
											<h3>逾期</h3>
										</div>
										<div class="col-xs-3">
											<h3>未付</h3>
										</div>
										<div class="col-xs-3">
											<h3>3天内付</h3>
										</div>
										<div class="col-xs-3">
											<h3>15天内付</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="房东账单;fg_payableToLandlord;fangdongyingfukuan;
												,s,s,s,s,s,i,addDay;
												,searchYear,searchMonth,searchYear2,searchMonth2,searchPtlAuditStatus,searchPtlPaymentDateStart,searchPtlPaymentDateEnd;
												,,,,,未审核,,0;">{{ overallNums[1].countNum1 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="房东账单;fg_payableToLandlord;fangdongyingfukuan;
												,s,addDay,addDay;
												,searchPtlAuditStatus,searchPtlPaymentDateStart,searchPtlPaymentDateEnd;
												,未审核,0,0;">{{ overallNums[1].countNum2 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="房东账单;fg_payableToLandlord;fangdongyingfukuan;
												,subDay,addDay;
												,searchPtlPaymentDateStart,searchPtlPaymentDateEnd;
												,0,3;">{{ overallNums[1].countNum3 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="房东账单;fg_payableToLandlord;fangdongyingfukuan;
												,subDay,addDay;
												,searchPtlPaymentDateStart,searchPtlPaymentDateEnd;
												,0,15;">{{ overallNums[1].countNum4 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">收支记录</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-6">
											<h3>未审核</h3>
										</div>
										<div class="col-xs-6">
											<h3>未复核</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="收支管理;fg_financial;shouzhiluru;
												,s;
												,searchJfAuditState;
												,未审核;">{{ overallNums[2].countNum1 }}</h2>
										</div>
										<div class="col-xs-6">
											<h2 class="skipToChild" skipToChild="收支管理;fg_financial;shouzhiluru;
												,s;
												,searchJfAuditState;
												,已审核;">{{ overallNums[2].countNum2 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-xs-12">
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">租客到期</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-4">
											<h3>15天通知</h3>
										</div>
										<div class="col-xs-4">
											<h3>30天内</h3>
										</div>
										<div class="col-xs-4">
											<h3>60天内</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,;
												,;
												,;">{{ overallNums[3].countNum1 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,;
												,;
												,;">{{ overallNums[3].countNum2 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,;
												,;
												,;">{{ overallNums[3].countNum3 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">业主到期</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-4">
											<h3>15天通知</h3>
										</div>
										<div class="col-xs-4">
											<h3>30天内</h3>
										</div>
										<div class="col-xs-4">
											<h3>60天内</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,;
												,;
												,;">{{ overallNums[4].countNum1 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,;
												,;
												,;">{{ overallNums[4].countNum2 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,;
												,;
												,;">{{ overallNums[4].countNum3 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">维保</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-4">
											<h3>待回访</h3>
										</div>
										<div class="col-xs-4">
											<h3>跟进中</h3>
										</div>
										<div class="col-xs-4">
											<h3>未领取</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="维保;fg_repair;weixiuguanli;
												,s;
												,searchState;
												,事件完成;">{{ overallNums[5].countNum1 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="维保;fg_repair;weixiuguanli;
												,s;
												,searchState;
												,跟进中;">{{ overallNums[5].countNum2 }}</h2>
										</div>
										<div class="col-xs-4">
											<h2 class="skipToChild" skipToChild="维保;fg_repair;weixiuguanli;
												,s;
												,searchState;
												,未领取;">{{ overallNums[5].countNum3 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-xs-12">
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">租客退房</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-3">
											<h3>待出账</h3>
										</div>
										<div class="col-xs-3">
											<h3>待复核</h3>
										</div>
										<div class="col-xs-3">
											<h3>待审核</h3>
										</div>
										<div class="col-xs-3">
											<h3>正办理</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s,s;
												,searchDoState,searchState;
												,正常,退房待出账;">{{ overallNums[7].countNum1 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s,s;
												,searchDoState,searchState;
												,正常,退房待复核;">{{ overallNums[7].countNum2 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s,s;
												,searchDoState,searchState;
												,正常,退房待审核;">{{ overallNums[7].countNum3 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s,s;
												,searchDoState,searchState;
												,正常,正办理退房;">{{ overallNums[7].countNum4 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">业主退房</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-3">
											<h3>待出账</h3>
										</div>
										<div class="col-xs-3">
											<h3>待复核</h3>
										</div>
										<div class="col-xs-3">
											<h3>待审核</h3>
										</div>
										<div class="col-xs-3">
											<h3>正办理</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s;
												,searchState1;
												,退房待出账;">{{ overallNums[8].countNum1 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s;
												,searchState1;
												,退房待复核;">{{ overallNums[8].countNum2 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s;
												,searchState1;
												,退房待审核;">{{ overallNums[8].countNum3 }}</h2>
										</div>
										<div class="col-xs-3">
											<h2 class="skipToChild" skipToChild="退房办理;fg_checkOut;yixiangrenguanli;
												,s;
												,searchState1;
												,正办理退房;">{{ overallNums[8].countNum4 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-md-4">
							<div class="panel panel-primary">
								<div class="panel-heading">资料补齐</div>
								<div class="panel-body text-center statistics">
									<div class="row clearfix">
										<div class="col-xs-6">
											<h3>租客合同</h3>
										</div>
										<div class="col-xs-6">
											<h3>业主合同</h3>
										</div>
									</div>
									<div class="row clearfix">
										<div class="col-xs-6">
											<h2>{{ overallNums[9].countNum1 }}</h2>
										</div>
										<div class="col-xs-6">
											<h2>{{ overallNums[9].countNum2 }}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div role="tabpanel"  class="tab-pane fade" id="taskboard-shop" style="height:100%"> 
				<div class="row" style="height:100%">
					<div class="col-md-4" style="background-color:#cecece;height:100%;" >
						<div v-for="(item,index) in shopJumpData" style="margin:10% 0 0 0px;text-align:center;height:16%" class="col-md-6">
							<div @click="addTab(item)" style="height:100%;width:100%;background-color:#ffffff;border-radius:10px;text-align:center;padding:8% 0 0% 0">
								<div><img style="height:50px;width:50px;" :src="item.imgPath" /></div>
								<div style="font-size:20px ;">{{item.name}}</div>
							</div>
						</div>
						
						<div class="col-md-12" style="background-color:#cecece;margin:10% 0 0 0;height:16%">
							<div @click="addTab(shopJumpBig)" style="height:100%;width:100%;background-color:#ffffff;border-radius:10px;text-align:center;padding:5% 0 0% 0;margin-bottom: 5%">
								<div><img style="height:50px;width:50px;" :src="shopJumpBig.imgPath" /></div>
								<div style="font-size:20px ;">{{shopJumpBig.name}}</div>
							</div>
						</div>
					</div>
					<div class="col-md-8" style="height:100%;">
						<div class="col-md-12" style="height:10%">
							<!-- 时间 -->
						</div>
						<div class="row" style="height:16%">
							<div class="col-md-3" style="height:100%;">
								<div style="border:1px solid #cecece;border-radius:11px;height:100%;text-align:center">
									<div style="height:35%;width:100%;background-color:#5f9e00;text-align:center;border-top-left-radius:10px;border-top-right-radius:10px;"><span style="color:#ffffff;font-size:20px;">现场销售</span></div>
									<div style="height:65%;width:100%;text-align:center;">
										<span style="font-size:50px;font-weight:600;margin:2% 0 0 0;">{{shopOperateDate.unOnlineOrder}}</span>
										<span style="margin:13% 0 0 0;font-size:20px;font-weight:600;">单</span>
									</div>
								</div>
							</div>
							<div class="col-md-3" style="height:100%;">
								<div style="border:1px solid #cecece;border-radius:11px;height:100%;text-align:center">
									<div style="height:35%;width:100%;background-color:#5f9e00;text-align:center;border-top-left-radius:10px;border-top-right-radius:10px;"><span style="color:#ffffff;font-size:20px;">线上销售</span></div>
									<div style="height:65%;width:100%;text-align:center;">
										<span style="font-size:50px;font-weight:600;margin:2% 0 0 0;">{{shopOperateDate.onlineOrder}}</span>
										<span style="margin:13% 0 0 0;font-size:20px;font-weight:600;">单</span>
									</div>
								</div>
							</div>
							<div class="col-md-3" style="height:100%;">
								<div style="border:1px solid #cecece;border-radius:11px;height:100%;text-align:center">
									<div style="height:35%;width:100%;background-color:#5f9e00;text-align:center;border-top-left-radius:10px;border-top-right-radius:10px;"><span style="color:#ffffff;font-size:20px;">销售单品</span></div>
									<div style="height:65%;width:100%;text-align:center;">
										<span style="font-size:50px;font-weight:600;margin:2% 0 0 0;">{{shopOperateDate.saleGoodsTotal}}</span>
										<span style="margin:13% 0 0 0;font-size:20px;font-weight:600;">件</span>
									</div>
								</div>
							</div>
							<div class="col-md-3" style="height:100%;">
								<div style="border:1px solid #cecece;border-radius:11px;height:100%;text-align:center">
									<div style="height:35%;width:100%;background-color:#5f9e00;text-align:center;border-top-left-radius:10px;border-top-right-radius:10px;"><span style="color:#ffffff;font-size:20px;">客户退单</span></div>
									<div style="height:65%;width:100%;text-align:center;">
										<span style="font-size:50px;font-weight:600;margin:2% 0 0 0;">{{shopOperateDate.cancelOrder}}</span>
										<span style="margin:13% 0 0 0;font-size:20px;font-weight:600;">单</span>
									</div>
								</div>
							</div>
							<div class="col-md-6" style="height:100%;margin:2% 0 0 0;z-index:999;">
								<div style="border-radius:11px;height:100%;text-align:center">
									<div style="height:80%;width:100%;text-align:center;">
										<div style="font-size:30px;font-weight:600;margin:2% 0 0 0;">总销售额</div>
										<div style="margin:2% 0 0 0;font-size:50px;font-weight:600;">{{shopOperateDate.saleTotalMoney}}元</div>
									</div>
								</div>
							</div>
							<div class="col-md-6" style="height:100%;margin:2% 0 0 0;z-index:999;">
								<div style="border-radius:11px;height:100%;text-align:center">
									<div style="height:80%;width:100%;text-align:center;">
										<div style="font-size:30px;font-weight:600;margin:2% 0 0 0;">预估利润</div>
										<div style="margin:2% 0 0 0;font-size:50px;font-weight:600;">{{shopOperateDate.totalProfit}}元</div>
									</div>
								</div>
							</div>
							<div class="col-md-4 " style="height:100%;text-align:center;margin:10% 0 0 0 ">
								<div style="margin:2% 0 0 0%">
									<button type="button" @click="getPieNum()" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">单品销量</button>
								</div>
								<div style="margin:2% 0 0 0%">
									<button type="button" @click="getCategoryNum()" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">分类销量</button>
								</div>
								<div style="margin:2% 0 0 0%">
									<button type="button" @click="getGoodsProfitNum()" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">单品利润</button>
								</div>
								<div style="margin:2% 0 0 0%">
									<button type="button" class="btn btn-success" style="margin:0 0 5px 5px;width:140px;">人员单数</button>
								</div>
							</div>
							<div class="col-md-8 " style="height:100%;margin:2% 0 0 0">
								 <div id="container" style="min-width:300px;height:300px;"></div>
							</div>
						</div>
					</div>
				</div>
			</div><!-- /#taskboard-shop -->
		</div><!-- /.taskboard -->
		<!-- 
			tabIndex：设置键盘中的TAB键在控件中的移动顺序
			aria-labelledby：描述信息 
			v-model: vue.js 语法
			@click: vue.js 语法
		-->
		<div class="modal fade" id="addNotice" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title">新增公告</h4>
		            </div>
		            <div class="modal-body">
		            	<div class="alert alert-warning alert-dismissible fade in noticeAlert" role="alert">
					      	<span class="alert-content">请把公告信息完善后再进行提交！</span>
					    </div>
						<div class="form-group">
							<label for="addNoticeDept">部门</label>
							<select id="addNoticeDept" class="form-control">
								<option value="0"></option>
								<option value="公司">公司</option>
								<option value="业务部">业务部</option>
								<option value="行政部">行政部</option>
								<option value="财务部">财务部</option>
							</select>
						</div>
						<div class="form-group">
							<label for="addNoticeTitle">公告标题</label>
							<input v-model="gonggao.addTitle" type="text" class="form-control" id="addNoticeTitle" placeholder="标题">
						</div>
						<div class="form-group">
						  	<label for="addNoticeContent">公告内容</label>
						  	<textarea v-model="gonggao.addContent" class="form-control" rows="10" id="addNoticeContent" placeholder="内容"></textarea>
						</div>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button @click="addNotice" type="button" class="btn btn-primary">提交</button>
		            </div>
		        </div>
		    </div>
		</div>
		<div class="modal fade" id="editNotice" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <div class="modal-header">
		                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		                <h4 class="modal-title">编辑公告</h4>
		            </div>
		            <div class="modal-body">
		            	<div class="alert alert-warning alert-dismissible fade in noticeAlert" role="alert">
					      	<span class="alert-content">请把公告信息完善后再进行提交！</span>
					    </div>
						<div class="form-group">
							<label for="editNoticeDept">部门</label>
							<select @change="checkNotice" id="editNoticeDept" class="form-control" disabled="disabled">
								<option value="0"></option>
								<option value="公司">公司</option>
								<option value="业务部">业务部</option>
								<option value="行政部">行政部</option>
								<option value="财务部">财务部</option>
							</select>
						</div>
						<div class="form-group">
							<label for="editNoticeTitle">公告标题</label>
							<input v-model="gonggao.editTitle" type="text" class="form-control" id="editNoticeTitle" placeholder="标题">
						</div>
						<div class="form-group">
						  	<label for="editNoticeContent">公告内容</label>
						  	<textarea v-model="gonggao.editContent" class="form-control" rows="10" id="editNoticeContent" placeholder="内容"></textarea>
						</div>
		            </div>
		            <div class="modal-footer">
		                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
		                <button @click="editNotice" type="button" class="btn btn-primary">提交</button>
		            </div>
		        </div>
		    </div>
		</div>
	</div><!-- /#app -->
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/highcharts/7.0.1/highcharts.js"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/bootstrap-table/1.11.1/bootstrap-table-zh-CN.js"></script>
	<script src="http://pic-static.fangzhizun.com/vue/2.2.6/vue.min.js"></script>
	<!-- <script src="js/highcharts.js"></script> -->
	<script src="js/config.js"></script>
	<script src="js/fg.public.js"></script>
	<script src="js/taskboard_boss.js"></script>
	
 

</body>
</html>