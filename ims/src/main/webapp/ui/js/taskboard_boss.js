(function(){
	
	/** *******************************************变量定义及初始化******************************************** */
	
	
	var gongsi	  =new Array();
	var yewu      =new Array();
	var caiwu 	  =new Array();
	var xingzheng =new Array();
	
	var gonggao = {
			gongsi: {},
			yewu: {},
			caiwu: {},
			xingzheng: {},
			addTitle: '',
			addContent: '',
			editId: '',
			editTitle: '',
			editContent: ''
		},
		// 财务统计
		financialStatistics = {
			fsMonthlyAlreadyIncome: 0, 
			fsMonthlyShouldIncome: 0,
			fsMonthlyAlreadyExpenses: 0,
			fsMonthlyShouldExpenses: 0,
			fsMonthlyAlreadyProfit: 0,
			fsMonthlyShouldProfit: 0,
			fsQuarterlyAlreadyIncome: 0,
			fsQuarterlyShouldIncome: 0,
			fsQuarterlyAlreadyExpenses: 0,
			fsQuarterlyShouldExpenses: 0,
			fsQuarterlyAlreadyProfit: 0,
			fsQuarterlyShouldProfit: 0,
			fsYearlyAlreadyIncome: 0,
			fsYearlyShouldIncome: 0,
			fsYearlyAlreadyExpenses: 0,
			fsYearlyShouldExpenses: 0,
			fsYearlyAlreadyProfit: 0,
			fsYearlyShouldProfit: 0
		},
		// 新签合约统计
		newContractStatistics = {
			countNum1: '-',// 月度租客新签合约数
			countNum2: '-',// 季度租客新签合约数
			countNum3: '-',// 年度租客新签合约数
			countNum4: '-',// 月度房东新签合约数
			countNum5: '-',// 季度房东新签合约数
			countNum6: '-' // 年度房东新签合约数
		},
		// 即将到期合约
		contractDueExpire = {
			countNum1: '-',// 30天内到期的租客合约
			countNum2: '-',// 半年内到期的租客合约
			countNum3: '-',// 一年内到期的租客合约
			countNum4: '-',// 租客合约总数
			countNum5: '-',// 30天内到期的房东合约
			countNum6: '-',// 半年内到期的房东合约
			countNum7: '-',// 一年内到期的房东合约
			countNum8: '-' // 房东合约总数
		},
		// 房源统计
		houseStatistics = {
			alreadyRented: '-',
			downPayment: '-',
			noRent: '-'
		},
		// 事务
		eventNums = {
			countNum1: '-',// 发起
			countNum2: '-' // 待办
		},
		bizNums = [
		    {// 收房
		    	countNum1: '-',// 关注
		    	countNum2: '-',// 私盘
		    	countNum3: '-' // 公盘
			},
			{// 出房
				countNum1: '-',// 已定
		    	countNum2: '-',// 未租
		    	countNum3: '-' // 意向人
			},
			{// 管房
				countNum1: '-',// 跟进维修
		    	countNum2: '-',// 未领维修
		    	countNum3: '-' // 已租房数
			},
			{// 事务
				countNum1: '-',// 发起
		    	countNum2: '-' // 待办
			}
		],
		overallNums = [
			{// 收租0
				countNum1: '-',// 逾期
				countNum2: '-',// 未付
				countNum3: '-',// 未通知
				countNum4: '-' // 账单
			},
			{// 付租1
				countNum1: '-',// 逾期
				countNum2: '-',// 未付
				countNum3: '-',// 3天内付
				countNum4: '-' // 15天内付
			},
			{// 收支记录2
				countNum1: '-',// 未审核
				countNum2: '-' // 未复核
			},
			{// 租客到期3
				countNum1: '-',// 15天通知
				countNum2: '-',// 30天内
				countNum3: '-' // 60天内
			},
			{// 业主到期4
				countNum1: '-',// 15天通知
				countNum2: '-',// 30天内
				countNum3: '-' // 60天内
			},
			{// 维修5
				countNum1: '-',// 待回访
				countNum2: '-',// 跟进中
				countNum3: '-' // 未领取
			},
			{// 事务6
				countNum1: '-',// 发起
				countNum2: '-' // 待办
			},
			{// 租客退房7
				countNum1: '-',// 待出账
				countNum2: '-',// 待复核
				countNum3: '-',// 待审核
				countNum4: '-' // 正办理
			},
			{// 业主退房8
				countNum1: '-',// 待出账
				countNum2: '-',// 待复核
				countNum3: '-',// 待审核
				countNum4: '-' // 正办理
			},
			{// 资料补齐9
				countNum1: '-',// 租客合同
				countNum2: '-' // 业主合同
			}
		]
		
	
	// Vue初始化
	var vm = new Vue({
		el: '#app',
		data: {
			gongsi:	gongsi,
			yewu:yewu,
			caiwu:caiwu,
			xingzheng:xingzheng,
			gonggao: gonggao,
		    financialStatistics: financialStatistics,
		    newContractStatistics: newContractStatistics,
		    contractDueExpire: contractDueExpire,
		    houseStatistics: houseStatistics,
		    eventNums: eventNums,
		    bizNums: bizNums,
		    overallNums: overallNums,
		    dept: [],
		    shopJumpBig:{
	    		name:"开始销售",
	    		imgPath:"img/kaishixiaoshou.png",
	    		skipJspName : '销售管理',
				skipJspUrl : 'fg_shopOrder',
				skipJspIcon : 'xiaoshou',
				skipFunction : ""
		    },
		    shopJumpData:[
		    	{
		    		name:"查看库存",
		    		imgPath:"img/chakankucun.png",
		    		skipJspName : '库存管理',
					skipJspUrl : 'fg_shopGoodsManagement',
					skipJspIcon : 'cangku',
					skipFunction : ""
		    	},
		    	{
		    		name:"采购入库",
		    		imgPath:"img/caigouruku.png",
		    		skipJspName : '库存管理',
					skipJspUrl : 'fg_shopGoodsManagement',
					skipJspIcon : 'cangku',
					skipFunction : "openGoodsPurchase()"
		    	},
		    	{
		    		name:"盘点库存",
		    		imgPath:"img/pandiankucun.png",
		    		skipJspName : '库存管理',
					skipJspUrl : 'fg_shopGoodsManagement',
					skipJspIcon : 'cangku',
					skipFunction : "openInventory()"
		    	},
		    	{
		    		name:"盘点记录",
		    		imgPath:"img/pandianjilu.png",
		    		skipJspName : '库存管理',
					skipJspUrl : 'fg_shopGoodsManagement',
					skipJspIcon : 'cangku',
					skipFunction : "openCheckGoods()"
		    	},
		    	{
		    		name:"订单记录",
		    		imgPath:"img/dingdanliushui.png",
		    		skipJspName : '销售管理',
					skipJspUrl : 'fg_shopOrder',
					skipJspIcon : 'xiaoshou',
					skipFunction : "openSalesRecords()"
		    	},
		    	{
		    		name:"销售记录",
		    		imgPath:"img/xiaoshouliushui.png",
		    		skipJspName : '销售管理',
					skipJspUrl : 'fg_shopOrder',
					skipJspIcon : 'xiaoshou',
					skipFunction : "openSalesGoodsRecords()"
		    	}
		    ],
		    shopOperateDate:{}
		},
		created: function (){
			var that = this;
			$.ajax({
	    		type:"post",
	    		url:"../getOrderCount.action",
	    		data:{
	    			startTime:new Date().format("yyyy-MM-dd 00:00:00"),
	    			endTime:new Date().format("yyyy-MM-dd hh:mm:ss")
	    		},
	    		dataType:"json",
	    		success: function(result){
	    			if(result.code < 1){
// alert(result.msg);
	    			}else{
	    				var data = result.body[0];
	    				data.cancelOrder = data.cancelOrder == "" ? 0 : data.cancelOrder;
	    				data.saleGoodsTotal = data.saleGoodsTotal == "" ? 0 : data.saleGoodsTotal;
	    				data.onlineOrder = data.onlineOrder == "" ? 0 : data.onlineOrder;
	    				data.unOnlineOrder = data.unOnlineOrder == "" ? 0 : data.unOnlineOrder;
	    				data.saleTotalMoney = data.saleTotalMoney == "" ? 0 : data.saleTotalMoney;
	    				data.totalProfit = data.totalProfit == "" ? 0 : data.totalProfit;
	    				
	    				data.totalProfit = parseFloat(data.totalProfit).toFixed(2);
	    				data.saleTotalMoney = parseFloat(data.saleTotalMoney).toFixed(2);
	    				
	    				that.shopOperateDate = data;
	    			}
	    		}
	    	}),
	    	that.getPieNum();
		},
		methods: {
			initPerformanceTable: function(){
				initPerformanceTable();
			},
			initFollowUpTable_boss: function(){
				initFollowUpTable_boss();
			},
			initFollowUpTable_biz: function(){
				initFollowUpTable_biz();
			},
			initFollowUpTable_overall: function(){
				initFollowUpTable_overall();
			},
			ona: function(){
				ona();
			},
			nextcement: function(){
				nextcement();
			},
			checkNotice: function(){
				checkNotice();
			},
			addNotice: function(){
				addNotice();
			},
			editNotice: function(){
				editNotice();
			},
			addTab(item){
				skipJspName = item.skipJspName;
				skipJspUrl = item.skipJspUrl;
				skipJspIcon = item.skipJspIcon;
				parent._skipFunction.push(item.skipFunction);
				window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
			},
			getPieNum(){
				$.ajax({
		    		type:"post",
		    		url:"../getPieNum.action",
		    		data:{
		    			startTime:new Date().format("yyyy-MM-dd 00:00:00"),
		    			endTime:new Date().format("yyyy-MM-dd hh:mm:ss")
		    		},
		    		dataType:"json",
		    		success: function(result){
		    			if(result.code < 1){
// alert(result.msg);
		    			}else{
		    				var data = [];
		    				
		    				for(var i in result.body){
		    					var oneData = [];
		    					oneData.push(result.body[i].name);
		    					oneData.push(result.body[i].bili);
		    					data.push(oneData)
		    				}
		    				console.log(data)
		    				$('#container').highcharts().series[0].setData(data);
		    			}
		    		}
		    	})
		   },
		   getGoodsProfitNum(){
			   $.ajax({
		    		type:"post",
		    		url:"../getGoodsProfitNum.action",
		    		data:{
		    			startTime:new Date().format("yyyy-MM-dd 00:00:00"),
		    			endTime:new Date().format("yyyy-MM-dd hh:mm:ss")
		    		},
		    		dataType:"json",
		    		success: function(result){
		    			if(result.code < 1){
		    				alert(result.msg);
		    			}else{
		    				var data = [];
		    				
		    				for(var i in result.body){
		    					var oneData = [];
		    					oneData.push(result.body[i].name);
		    					oneData.push(result.body[i].bili);
		    					data.push(oneData)
		    				}
		    				console.log(data)
		    				$('#container').highcharts().series[0].setData(data);
		    			}
		    		}
		    	})
		   },
		   getCategoryNum(){
			   $.ajax({
		    		type:"post",
		    		url:"../getCategoryNum.action",
		    		data:{
		    			startTime:new Date().format("yyyy-MM-dd 00:00:00"),
		    			endTime:new Date().format("yyyy-MM-dd hh:mm:ss")
		    		},
		    		dataType:"json",
		    		success: function(result){
		    			if(result.code < 1){
		    				alert(result.msg);
		    			}else{
		    				var data = [];
		    				
		    				for(var i in result.body){
		    					var oneData = [];
		    					oneData.push(result.body[i].name);
		    					oneData.push(result.body[i].bili);
		    					data.push(oneData)
		    				}
		    				$('#container').highcharts().series[0].setData(data);
		    			}
		    		}
		    	})
		   },
		   
		},
		computed: {
			fsMonthlyIncomePercent: function () {
				var a = 0;
				if (this.financialStatistics.fsMonthlyShouldIncome != 0) {
					a = this.financialStatistics.fsMonthlyAlreadyIncome / this.financialStatistics.fsMonthlyShouldIncome;
				}
				$('#fsMonthlyIncomePercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsMonthlyExpensesPercent: function () {
				var a = 0;
				if (this.financialStatistics.fsMonthlyShouldExpenses != 0) {
					a = this.financialStatistics.fsMonthlyAlreadyExpenses / this.financialStatistics.fsMonthlyShouldExpenses;
				}
				$('#fsMonthlyExpensesPercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsMonthlyProfitPercent: function () {
				var a = 0;
				if (this.financialStatistics.fsMonthlyShouldProfit != 0) {
					a = this.financialStatistics.fsMonthlyAlreadyProfit / this.financialStatistics.fsMonthlyShouldProfit;
				}
				$('#fsMonthlyProfitPercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsQuarterlyIncomePercent: function () {
				var a = 0;
				if (this.financialStatistics.fsQuarterlyShouldIncome != 0) {
					a = this.financialStatistics.fsQuarterlyAlreadyIncome / this.financialStatistics.fsQuarterlyShouldIncome;
				}
				$('#fsQuarterlyIncomePercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsQuarterlyExpensesPercent: function () {
				var a = 0;
				if (this.financialStatistics.fsQuarterlyShouldExpenses != 0) {
					a = this.financialStatistics.fsQuarterlyAlreadyExpenses / this.financialStatistics.fsQuarterlyShouldExpenses;
				}
				$('#fsQuarterlyExpensesPercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsQuarterlyProfitPercent: function () {
				var a = 0;
				if (this.financialStatistics.fsQuarterlyShouldProfit != 0) {
					a = this.financialStatistics.fsQuarterlyAlreadyProfit / this.financialStatistics.fsQuarterlyShouldProfit;
				}
				$('#fsQuarterlyProfitPercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsYearlyIncomePercent: function () {
				var a = 0;
				if (this.financialStatistics.fsYearlyShouldIncome != 0) {
					a = this.financialStatistics.fsYearlyAlreadyIncome / this.financialStatistics.fsYearlyShouldIncome;
				}
				$('#fsYearlyIncomePercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsYearlyExpensesPercent: function () {
				var a = 0;
				if (this.financialStatistics.fsYearlyShouldExpenses != 0) {
					a = this.financialStatistics.fsYearlyAlreadyExpenses / this.financialStatistics.fsYearlyShouldExpenses;
				}
				$('#fsYearlyExpensesPercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    },
		    fsYearlyProfitPercent: function () {
				var a = 0;
				if (this.financialStatistics.fsYearlyShouldProfit != 0) {
					a = this.financialStatistics.fsYearlyAlreadyProfit / this.financialStatistics.fsYearlyShouldProfit;
				}
				$('#fsYearlyProfitPercent').css('width', a * 100 + '%');
		    	return a * 100 + '%';
		    }
		}
	})
	// 公告
	getNotice();
	// 异步数据加载
	loadData();
	// 初始化业绩统计表格
	initPerformanceTable();
	// 初始化跟进提醒表格
	initFollowUpTable_boss();
	initFollowUpTable_biz();
	initFollowUpTable_overall();
	// 显示当前用户业绩图表
	resizeEmpContainer();
	// 获取业务任务板数值
	empCountNums();
	// 获取综合任务板数值
	adminCountNums();
	// 查询部门
	getDept();
	// 初始化商超图表
	initShopChart();
	/** *******************************************事件******************************************** */
	
	
	// 新增公告/编辑公告
	$('#addNotice, #editNotice').on('show.bs.modal', function (event) {
		// 处理选中部门
		var firstNavId = $('#firstNav li.active').attr('id');
		if (firstNavId == 'tab1') {
			var secondNavId = $('#taskboard-boss #secondNav-boss li.active').attr('id');
		
		} else if (firstNavId == 'tab2') {
			var secondNavId = $('#taskboard-business #secondNav-biz li.active').attr('id');
		
		} else if (firstNavId == 'tab3') {
			var secondNavId = $('#taskboard-overall #secondNav-overall li.active').attr('id');
		
		}
		switch (secondNavId) {
			case 'tab4': $('#addNoticeDept').val('公司');$('#editNoticeDept').val('公司');break;
			case 'tab8':$('#addNoticeDept').val('公司');$('#editNoticeDept').val('公司');break;
			case 'tab10':$('#addNoticeDept').val('公司');$('#editNoticeDept').val('公司');break;
			case 'tab5': $('#addNoticeDept').val('业务部');$('#editNoticeDept').val('业务部');break;
			case 'tab9':$('#addNoticeDept').val('业务部');$('#editNoticeDept').val('业务部');break;
			case 'tab11':$('#addNoticeDept').val('业务部');$('#editNoticeDept').val('业务部');break;
			case 'tab6':$('#addNoticeDept').val('行政部');$('#editNoticeDept').val('行政部');break;
			case 'tab12':$('#addNoticeDept').val('行政部');$('#editNoticeDept').val('行政部');break;
			case 'tab7':$('#addNoticeDept').val('财务部');$('#editNoticeDept').val('财务部');break;
			case 'tab13':$('#addNoticeDept').val('财务部');$('#editNoticeDept').val('财务部');break;
		}
		$('.noticeAlert').hide();
		gonggao.addTitle = '';
		gonggao.addContent = '';
		gonggao.editId = '';
		gonggao.editTitle = '';
		gonggao.editContent = '';
		if ($(event.relatedTarget).attr('href') == '#editNotice') {
			checkNotice();
			if (gonggao.editId == undefined || gonggao.editId == '') {
				setTimeout(function(){
					alert('没有公告可以编辑，请新增公告')
					$('#editNotice').modal('hide');
				}, 1000);
			}
		}
	});
	// 跳转
	$(".skipToChild").click(function(){
		var skipToChildVal = $(this).attr("skipToChild");
		if(skipToChildVal){
			skipToChildVal = skipToChildVal.replace(/[\r\n]/g,"").replace("\t","").split(";");
			var jsonTarget = skipToChildVal[3].split(",");
			var jsonId = skipToChildVal[4].split(",");
			var jsonVal = skipToChildVal[5].split(",");
			for( var i = 1 ; i < jsonTarget.length; i++ ){
				parent._skipToChildJson.push({
					target:jsonTarget[i],
					id:jsonId[i],
					jsonVal:jsonVal[i],
				});
			}
			window.parent.addTab(skipToChildVal[0],skipToChildVal[1]+".jsp","icon icon-"+skipToChildVal[2]);
		}
	});
	
	/** *******************************************函数******************************************** */
	
	// 加载统计数据
	function loadData(){
		// 财务统计
		$.post('../selectDashFinancialStatistics.action', {
			
		}, function(data) {
			if (!(data < 0)) {
				for(var i in data){
					for(var j in financialStatistics){
						if (i == j) {
							financialStatistics[j] = data[i];
						}
					}
				}
				financialStatistics.fsMonthlyAlreadyProfit = parseFloat(data.fsMonthlyAlreadyIncome - data.fsMonthlyAlreadyExpenses).toFixed(2);
				financialStatistics.fsMonthlyShouldProfit = parseFloat(data.fsMonthlyShouldIncome - data.fsMonthlyShouldExpenses).toFixed(2);
				financialStatistics.fsQuarterlyAlreadyProfit = parseFloat(data.fsQuarterlyAlreadyIncome - data.fsQuarterlyAlreadyExpenses).toFixed(2);
				financialStatistics.fsQuarterlyShouldProfit = parseFloat(data.fsQuarterlyShouldIncome - data.fsQuarterlyShouldExpenses).toFixed(2);
				financialStatistics.fsYearlyAlreadyProfit = parseFloat(data.fsYearlyAlreadyIncome - data.fsYearlyAlreadyExpenses).toFixed(2);
				financialStatistics.fsYearlyShouldProfit = parseFloat(data.fsYearlyShouldIncome - data.fsYearlyShouldExpenses).toFixed(2);
			}
		});

		// 新签合约统计
		$.post('../countNewContractInConsole.action', {
			
		}, function(data) {
			if (!(data < 0)) {
				for(var i in data[0]){
					for(var j in newContractStatistics){
						if (i == j) {
							newContractStatistics[j] = data[0][i];
						}
					}
				}
			}	
		});
		
		// 即将到期合约
		$.post('../countContractDueExpired.action', {
			
		}, function(data) {
			if (!(data < 0)) {
				for(var i in data[0]){
					for(var j in contractDueExpire){
						if (i == j) {
							contractDueExpire[j] = data[0][i];
						}
					}
				}
			}
		});
		
		// 房源统计-已租
		$.post('../queryHouseRentNum.action', {
			
		}, function(data) {
			if (!(data.code<0)) {
				houseStatistics.alreadyRented = data.body;
			} else {
				houseStatistics.alreadyRented = data.msg;
			}
		});
			
		// 房源统计-已定
		$.post('../queryHouseStoreNum.action', {
			hsDownDeposit : '是'
		}, function(data) {
			if (!(data.code < 0)) {
				houseStatistics.downPayment = data.body;
			} else {
				houseStatistics.downPayment = data.msg;
			}
		});	
				
		// 房源统计-未租
		$.post('../queryHouseStoreNum.action', {
			hsDownDeposit : '否'
		}, function(data) {
			if (!(data.code < 0)) {
				houseStatistics.noRent = data.body;
			} else {
				houseStatistics.downPayment = data.msg;
			}
		});
		
		// 查询发起/待办事务数量
		$.post('../countEventNumsInConsole.action', {
			userId: _loginUserId
		}, function(data) {
			if (!(data < 0)) {
				for(var i in data[0]){
					for(var j in eventNums){
						if (i == j) {
							eventNums[j] = data[0][i];
						}
					}
				}
			}
		});
	}
	
	// 初始化跟进提醒表格-老板工作台
	function initFollowUpTable_boss(){
		var fromTime = new Date();
		var toTime = new Date();
		var tipsFollowTime = $('#followUpTimePeriod-boss').val();
		var jhfPaymentWay = $('#followUpType-boss').val();
		var jhfFollowBelong = $('#followUpBelong-boss').val();
		if(tipsFollowTime==1){
			fromTime.setDate(fromTime.getDate() - 6);
			toTime.setDate(toTime.getDate() + 1);
		}else if(tipsFollowTime==2){
			fromTime.setDate(fromTime.getDate() - 14);
			toTime.setDate(toTime.getDate() + 1);
		}else if(tipsFollowTime==3){
			fromTime.setDate(fromTime.getDate() - 29);
			toTime.setDate(toTime.getDate() + 1);
		}
		fromTime = fromTime.format('yyyy-MM-dd');
		toTime = toTime.format('yyyy-MM-dd');
		$('#followUpTable-boss').bootstrapTable('destroy');
		$('#followUpTable-boss').bootstrapTable({
		    url: '../remindFollow.action',// 修改
		    queryParamsType : 'undefined',   
		    queryParams: function queryParams(params) {   // 修改
		    	var param = {
		    		startNum: (params.pageNumber - 1) * params.pageSize,
		    		endNum: params.pageSize,
		    		jhfPaymentWay:jhfPaymentWay,
		    		jhfFollowBelong:jhfFollowBelong,
		    		jhfRemind:"是",
		    		fromTime:fromTime,
		    		toTime:toTime,
		    	};    
		    	return param;                   
		    },  
		    height: 417,// 修改
		    cache: false,
			striped: true,
			showColumns: true,
			showToggle: true,
			showRefresh: true,
			pagination: true,
			paginationPreText: '上一页',
			paginationNextText: '下一页',
			sidePagination: 'server',
			pageList: [],
			pageNumber: 1,
			pageSize: 5,// 修改
			toolbar: '#form-followUp-boss',// 修改
		});
	}
	
	// 初始化跟进提醒表格-业务任务板
	function initFollowUpTable_biz(){
		var fromTime = new Date();
		var toTime = new Date();
		var tipsFollowTime = $('#followUpTimePeriod-biz').val();
		var jhfPaymentWay = $('#followUpType-biz').val();
		var jhfFollowBelong = $('#followUpBelong-biz').val();
		if(tipsFollowTime==1){
			fromTime.setDate(fromTime.getDate() - 6);
			toTime.setDate(toTime.getDate() + 1);
		}else if(tipsFollowTime==2){
			fromTime.setDate(fromTime.getDate() - 14);
			toTime.setDate(toTime.getDate() + 1);
		}else if(tipsFollowTime==3){
			fromTime.setDate(fromTime.getDate() - 29);
			toTime.setDate(toTime.getDate() + 1);
		}
		fromTime = fromTime.format('yyyy-MM-dd');
		toTime = toTime.format('yyyy-MM-dd');
		$('#followUpTable-biz').bootstrapTable('destroy');
		$('#followUpTable-biz').bootstrapTable({
		    url: '../remindFollow.action',// 修改
		    queryParamsType : 'undefined',   
		    queryParams: function queryParams(params) {   // 修改
		    	var param = {
		    		startNum: (params.pageNumber - 1) * params.pageSize,
		    		endNum: params.pageSize,
		    		jhfPaymentWay:jhfPaymentWay,
		    		jhfFollowBelong:jhfFollowBelong,
		    		jhfRemind:"是",
		    		fromTime:fromTime,
		    		toTime:toTime,
		    	};    
		    	return param;                   
		    },  
		    height: 417,// 修改
		    cache: false,
			striped: true,
			showColumns: true,
			showToggle: true,
			showRefresh: true,
			pagination: true,
			paginationPreText: '上一页',
			paginationNextText: '下一页',
			sidePagination: 'server',
			pageList: [],
			pageNumber: 1,
			pageSize: 5,// 修改
			toolbar: '#form-followUp-biz',// 修改
		});
	}

	// 初始化跟进提醒表格-综合任务板
	function initFollowUpTable_overall(){
		var fromTime = new Date();
		var toTime = new Date();
		var tipsFollowTime = $('#followUpTimePeriod-overall').val();
		var jhfPaymentWay = $('#followUpType-overall').val();
		var jhfFollowBelong = $('#followUpBelong-overall').val();
		if(tipsFollowTime==1){
			fromTime.setDate(fromTime.getDate() - 6);
			toTime.setDate(toTime.getDate() + 1);
		}else if(tipsFollowTime==2){
			fromTime.setDate(fromTime.getDate() - 14);
			toTime.setDate(toTime.getDate() + 1);
		}else if(tipsFollowTime==3){
			fromTime.setDate(fromTime.getDate() - 29);
			toTime.setDate(toTime.getDate() + 1);
		}
		fromTime = fromTime.format('yyyy-MM-dd');
		toTime = toTime.format('yyyy-MM-dd');
		$('#followUpTable-overall').bootstrapTable('destroy');
		$('#followUpTable-overall').bootstrapTable({
		    url: '../remindFollow.action',// 修改
		    queryParamsType : 'undefined',   
		    queryParams: function queryParams(params) {   // 修改
		    	var param = {
		    		startNum: (params.pageNumber - 1) * params.pageSize,
		    		endNum: params.pageSize,
		    		jhfPaymentWay:jhfPaymentWay,
		    		jhfFollowBelong:jhfFollowBelong,
		    		jhfRemind:"是",
		    		fromTime:fromTime,
		    		toTime:toTime,
		    	};    
		    	return param;                   
		    },  
		    height: 417,// 修改
		    cache: false,
			striped: true,
			showColumns: true,
			showToggle: true,
			showRefresh: true,
			pagination: true,
			paginationPreText: '上一页',
			paginationNextText: '下一页',
			sidePagination: 'server',
			pageList: [],
			pageNumber: 1,
			pageSize: 5,// 修改
			toolbar: '#form-followUp-overall',// 修改
		});
	}

	// 初始化业绩统计表格
	function initPerformanceTable(){
		$('#performanceTable').bootstrapTable('destroy');
		$('#performanceTable').bootstrapTable({
		    url: '../performanceStatistics.action',
		    queryParamsType : 'undefined',   
		    queryParams: function queryParams(params) {   // 设置查询参数
		    	var param = {
		    		startNum: (params.pageNumber - 1) * params.pageSize,
		    		endNum: params.pageSize,
		    		mpsType: $('#performanceTimePeriod').val(),
		    		dept: $('#performanceDept option:selected').val()
		    	};    
		    	return param;                   
		    },  
		    cache: false,
			striped: true,
			showColumns: true,
			showToggle: true,
			showRefresh: true,
			pagination: true,
			paginationPreText: '上一页',
			paginationNextText: '下一页',
			sidePagination: 'server',
			pageList: [],
			pageNumber: 1,
			pageSize: 5,
			toolbar: '#form-performance',
			onClickRow: function(row, $element){
				resizeBossContainer(row.mpsStaffId,row.staffName);
			},
		    onLoadSuccess: function(){
		    	showPerformanceChart();
		    }
		});
	}
	
	// 显示当页第一条数据的图表
	function showPerformanceChart(){
		var rows = $('#performanceTable').bootstrapTable('getData');
		if (rows.length > 0) {
			resizeBossContainer(rows[0].mpsStaffId,rows[0].staffName);
		}
	}
	
	// 查询用户业绩数据
	function resizeBossContainer(userId,staffName) {
		$.post("../queryOneYearAchievement.action", {
			userId:userId
		},function(data) {
			for(var i in data){
				for(var j in data[i]){
					if(j!="mpsDate"){
						data[i][j]=parseInt(data[i][j]);
					}
				}
			}
			$('#bossContainer').empty();
			setBossContainer(data,staffName);
		});
	}
	
	// 生成用户业绩图表
	function setBossContainer(data,staffName){
		var xAxis = [];
		var intentionalNumber = [];
		var followNumber = [];
		var rentNumber = [];
		var storeNumber = [];
		var chooseRoomNumber = [];
		for(var i in data){
			for(var j in data[i]){
				if(j=="mpsDate"){
					xAxis.push(data[i][j]);
				}
				if(j=="mpsIntentionalNumber"){
					intentionalNumber.push(parseInt(data[i][j]));
				}
				if(j=="mpsFollowUpNumber"){
					followNumber.push(parseInt(data[i][j]));
				}
				if(j=="mpsHouseNumber"){
					rentNumber.push(parseInt(data[i][j]));
				}
				if(j=="mpsRoomNumber"){
					storeNumber.push(parseInt(data[i][j]));
				}
				if(j=="mpsChooseRoomNumber"){
					chooseRoomNumber.push(parseInt(data[i][j]));
				}
			}
		}
		var chart = new Highcharts.Chart('bossContainer', {
			title : {
				text : staffName+"："+'个人业绩概览',
				x : -20
			},
			xAxis : {
				categories :xAxis
			},
			yAxis : [{

				title : {
					text : ''
				},
			}, {
				title : {
					text : ''
				},
				opposite : true
			}, {
				title : {
					text : ''
				},
				opposite : true
			}],
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0
			},
			series : [ {
				name : '意向人数',
				data : intentionalNumber,
				tooltip: {
		            valueSuffix: '个'
				},
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '跟进数',
				data : followNumber,
				tooltip: {
		            valueSuffix: '条'
				},
				yAxis : 1,
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '收房数',
				data : storeNumber,
				tooltip: {
		            valueSuffix: '套'
				},
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '出房数',
				data : rentNumber,
				tooltip: {
		            valueSuffix: '套'
				},
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '洗房数',
				data : chooseRoomNumber,
				tooltip: {
		            valueSuffix: '套'
				},
				yAxis : 2,
				marker: {
					enabled: false, 
				},
				type : 'spline',
			} ]
		});
	}
	
	// 查询当前用户的业绩数据
	function resizeEmpContainer() {
		$.post("../queryOneYearAchievement.action", {
			userId:_loginUserId
		},function(oyData) {
			for(var i in oyData){
				for(var j in oyData[i]){
					if(j!="mpsDate"){
						oyData[i][j]=parseInt(oyData[i][j]);
					}
				}
			}
			$('#employeesContainer').empty();
			setEmpContainer(oyData);
		});
	}
	
	// 生成当前用户业绩图表
	function setEmpContainer(oyData){
		var xAxis = [];
		var intentionalNumber = [];
		var followNumber = [];
		var rentNumber = [];
		var storeNumber = [];
		var chooseRoomNumber = [];
		for(var i in oyData){
			for(var j in oyData[i]){
				if(j=="mpsDate"){
					xAxis.push(oyData[i][j]);
				}
				if(j=="mpsIntentionalNumber"){
					intentionalNumber.push(parseInt(oyData[i][j]));
				}
				if(j=="mpsFollowUpNumber"){
					followNumber.push(parseInt(oyData[i][j]));
				}
				if(j=="mpsHouseNumber"){
					rentNumber.push(parseInt(oyData[i][j]));
				}
				if(j=="mpsRoomNumber"){
					storeNumber.push(parseInt(oyData[i][j]));
				}
				if(j=="mpsChooseRoomNumber"){
					chooseRoomNumber.push(parseInt(oyData[i][j]));
				}
			}
		}
		if(document.getElementById('employeesContainer')==null){
			return;
		}
		var chart = new Highcharts.Chart('employeesContainer', {
			title : {
				text : '个人业绩概览',
				x : -20
			},
			xAxis : {
				categories :xAxis
			},
			yAxis : [{

				title : {
					text : ''
				},
			}, {
				title : {
					text : '跟进数(条)'
				},
				opposite : true
			}, {
				title : {
					text : '洗房数(套)'
				},
				opposite : true
			}],
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0
			},
			plotOptions : {
				
			},
			series : [ {
				name : '意向人数',
				data : intentionalNumber,
				tooltip: {
		            valueSuffix: '个'
				},
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '跟进数',
				data : followNumber,
				tooltip: {
		            valueSuffix: '条'
				},
				yAxis : 1,
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '收房数',
				data : storeNumber,
				tooltip: {
		            valueSuffix: '套'
				},
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '出房数',
				data : rentNumber,
				tooltip: {
		            valueSuffix: '套'
				},
				marker: {
					enabled: false, 
				},
				type : 'spline',
			}, {
				name : '洗房数',
				data : chooseRoomNumber,
				tooltip: {
		            valueSuffix: '套'
				},
				yAxis : 2,
				marker: {
					enabled: false, 
				},
				type : 'spline',
			} ]
		});
	}
	
	// 获取业务任务板数值
	function empCountNums(){
		$.post("../countNumsInEmpConsole.action", {
			userId:_loginUserId
		},function(data) {
			if (!(data < 0 || data == '' || data.length == 0)) {
				for(var i in data){
					for(var j in bizNums[i]){
						for(var k in data[i]){
							if (j == k) {
								bizNums[i][j] = data[i][k];
							}
						}
					}
				}
			}
		});
	}
	
	// 获取综合任务板数值
	function adminCountNums(){
		$.post("../countNumsInAdminConsole.action", {
			userId:_loginUserId
		},function(data) {
			if(!(data < 0 || data == '' || data.length == 0)){
				for(var i in data){
					for(var j in overallNums[i]){
						for(var k in data[i]){
							if (j == k) {
								overallNums[i][j] = data[i][k];
							}
						}
					}
				}
			}
		});
	}
	
	// 查询公告
	function getNotice(){
		$.post("../queryNoticeInConsole.action", {
		},function(data){
			if (data.length > 0) {
				for(var i in data){
					if(data[i].dnType=="公司"){
						gonggao.gongsi = data[i];
					}else if(data[i].dnType=="业务部"){
						gonggao.yewu = data[i];
					}else if(data[i].dnType=="财务部"){
						gonggao.caiwu = data[i];
					}else if(data[i].dnType=="行政部"){
						gonggao.xingzheng = data[i];
					}
				}
			}
		});
	}
	// 加载所有公告
	function allannouncement(){
		$.post("../noticeQueryAll.action", {		
		},function(data){
			if (data.length > 0) {
				if (data.length > 0) {
					for(var i in data){
						if(data[i].dnType=="公司"){
							gongsi.push(data[i]);
							
						}else if(data[i].dnType=="业务部"){
							yewu.push(data[i]);
							
						}else if(data[i].dnType=="财务部"){
							caiwu.push(data[i]);
							
						}else if(data[i].dnType=="行政部"){
							xingzheng.push(data[i]);
							
						}
					}
					
				}
				
			}
		});
	}
	 window.onload = allannouncement();
	 // 下一条
	var t4 = 0;
	var t5 = 0;
	var t6 = 0;
	var t7 = 0;
	var t8 = 0;
	var t9 = 0;
	var t10 = 0;
	var t11 = 0;
	var t12 = 0;
	var t13 = 0;
	function nextcement(){
		var tab1=$("#tab1").prop("className");
		var tab2=$("#tab2").prop("className");
		var tab3=$("#tab3").prop("className");
		
		var tab4=$("#tab4").prop("className");
		var tab5=$("#tab5").prop("className");
		var tab6=$("#tab6").prop("className");
		var tab7=$("#tab7").prop("className");
		if(tab1 =="active"){
			 if(tab4 == "active"){
				 if(t4==gongsi.length-1){
					
				 }else{
					 t4++;
					 $('#gongsidnTitle').html(gongsi[t4].dnTitle);$('#gongsidnContent').html(gongsi[t4].dnContent);$('#gongsisuStaffName').html(gongsi[t4].suStaffName);$('#gongsidnTime').html(gongsi[t4].dnTime);
				 } 
		}else if(tab5 == "active"){
			if(t5==yewu.length-1){
				
			 }else{		 
				t5++;$('#yewudnTitle').html(yewu[t5].dnTitle);$('#yewudnContent').html(yewu[t5].dnContent);$('#yewusuStaffName').html(yewu[t5].suStaffName);$('#yewudnTime').html(yewu[t5].dnTime);
			 }
		}else if(tab6 == "active"){
			if(t6==xingzheng.length-1){
				
			 }else	{
			t6++;$('#xingzhengdnTitle').html(xingzheng[t6].dnTitle);$('#xingzhengdnContent').html(xingzheng[t6].dnContent);$('#xingzhengsuStaffName').html(xingzheng[t6].suStaffName); $('#xingzhengdnTime').html(xingzheng[t6].dnTime);
			 }
		}else if(tab7 == "active"){
			if(t7==caiwu.length-1){
				 
			 }else{	
				 t7++;$('#caiwudnTitle').html(caiwu[t7].dnTitle);$('#caiwudnContent').html(caiwu[t7].dnContent);$('#caiwusuStaffName').html(caiwu[t7].suStaffName);$('#caiwudnTime').html(caiwu[t7].dnTime);
			 }
		}
	}
		
		if(tab2=="active"){
			var tab8=$("#tab8").prop("className");
			var tab9=$("#tab9").prop("className");
			if(tab8 == "active"){
				if(t8==gongsi.length-1){
					
				 }else{	
					 t8++;$('#yewugongsidnTitle').html(gongsi[t8].dnTitle);$('#yewugongsidnContent').html(gongsi[t8].dnContent);$('#yewugongsisuStaffName').html(gongsi[t8].suStaffName); $('#yewugongsidnTime').html(gongsi[t8].dnTime);
				 }
			
			}
			if(tab9 == "active"){
				if(t9 == yewu.length-1){
					 
				 }else{	
					 t9++;$('#yewuyewudnTitle').html(yewu[t9].dnTitle);$('#yewuyewudnContent').html(yewu[t9].dnContent);$('#yewuyewusuStaffName').html(yewu[t9].suStaffName);$('#yewuyewudnTime').html(yewu[t9].dnTime);
				 }
			
			}
		}
		if(tab3=="active"){
			var tab10=$("#tab10").prop("className");
			var tab11=$("#tab11").prop("className");
			var tab12=$("#tab12").prop("className");
			var tab13=$("#tab13").prop("className");
			 if(tab10 == "active"){
				 if(t10==gongsi.length-1){
					 
				 }else{
					 t10++;$('#zonghegongsidnTitle').html(gongsi[t10].dnTitle);$('#zonghegongsidnContent').html(gongsi[t10].dnContent);$('#zonghegongsisuStaffName').html(gongsi[t10].suStaffName); $('#zonghegongsidnTime').html(gongsi[t10].dnTime);
				 } 
		}else if(tab11 == "active"){
			if(t11==yewu.length-1){
				
			 }else{		 
				t11++;$('#zongheyewudnTitle').html(yewu[t11].dnTitle);$('#zongheyewudnContent').html(yewu[t11].dnContent);$('#zongheyewusuStaffName').html(yewu[t11].suStaffName);$('#zongheyewudnTime').html(yewu[t11].dnTime);
			 }
		}else if(tab12 == "active"){
			if(t12==xingzheng.length-1){
				
			 }else	{
			t12++;$('#zonghexingzhengdnTitle').html(xingzheng[t12].dnTitle);$('#zonghexingzhengdnContent').html(xingzheng[t12].dnContent);$('#zonghexingzhengsuStaffName').html(xingzheng[t12].suStaffName); $('#zonghexingzhengdnTime').html(xingzheng[t12].dnTime);
			 }
		}else if(tab13 == "active"){
			if(t13==caiwu.length-1){
				
			 }else{	
				 t13++;$('#zonghecaiwudnTitle').html(caiwu[t13].dnTitle);$('#zonghecaiwudnContent').html(caiwu[t13].dnContent);$('#zonghecaiwusuStaffName').html(caiwu[t13].suStaffName); $('#zonghecaiwudnTime').html(caiwu[t13].dnTime);
			 }
		}
	
		}
	}
	// 上一条
	
	function ona(){
		var tab1=$("#tab1").prop("className");
		var tab2=$("#tab2").prop("className");
		var tab3=$("#tab3").prop("className");
		
		
		var tab4=$("#tab4").prop("className");
		var tab5=$("#tab5").prop("className");
		var tab6=$("#tab6").prop("className");
		var tab7=$("#tab7").prop("className");
		if(tab1 =="active"){
			 if(tab4 == "active"){
				if(t4 == 0){
					
				 }else{
					 t4--;
					 $('#gongsidnTitle').html(gongsi[t4].dnTitle);$('#gongsidnContent').html(gongsi[t4].dnContent);$('#gongsisuStaffName').html(gongsi[t4].suStaffName);$('#gongsidnTime').html(gongsi[t4].dnTime);
				 }
		}else if(tab5 == "active"){
					 if(t5 == 0){
					 
				 }else{
					 t5--;$('#yewudnTitle').html(yewu[t5].dnTitle);$('#yewudnContent').html(yewu[t5].dnContent);$('#yewusuStaffName').html(yewu[t5].suStaffName);$('#yewudnTime').html(yewu[t5].dnTime);
				 }
		}else if(tab6 == "active"){
					 if(t6 == 0){
					
				 }else{
					 t6--;$('#xingzhengdnTitle').html(xingzheng[t6].dnTitle);$('#xingzhengdnContent').html(xingzheng[t6].dnContent);$('#xingzhengsuStaffName').html(xingzheng[t6].suStaffName); $('#xingzhengdnTime').html(xingzheng[t6].dnTime);
				 }
		}else if(tab7 == "active"){
					 if(t7 == 0){
					
				 }else{
					 t7--;$('#caiwudnTitle').html(caiwu[t7].dnTitle);$('#caiwudnContent').html(caiwu[t7].dnContent);$('#caiwusuStaffName').html(caiwu[t7].suStaffName);$('#caiwudnTime').html(caiwu[t7].dnTime);
						
				 }
			}
		}
		if(tab2 == "active"){
			var tab8=$("#tab8").prop("className");
			var tab9=$("#tab9").prop("className");
			if(tab8 == "active"){
				if(t8==0){
					 
				 }else{	
					 t8--;$('#yewugongsidnTitle').html(gongsi[t8].dnTitle);$('#yewugongsidnContent').html(gongsi[t8].dnContent);$('#yewugongsisuStaffName').html(gongsi[t8].suStaffName);$('#yewugongsidnTime').html(gongsi[t8].dnTime);
				 }
			
			}
			if(tab9 == "active"){
				if(t9 == 0 ){
					 
				 }else{	
					 t9--;$('#yewuyewudnTitle').html(yewu[t9].dnTitle);$('#yewuyewudnContent').html(yewu[t9].dnContent);$('#yewuyewusuStaffName').html(yewu[t9].suStaffName);$('#yewuyewudnTime').html(yewu[t9].dnTime);
				 }
			
			}
		}
		if(tab3=="active"){
			var tab10=$("#tab10").prop("className");
			var tab11=$("#tab11").prop("className");
			var tab12=$("#tab12").prop("className");
			var tab13=$("#tab13").prop("className");
			 if(tab10 == "active"){
				 if(t10==0){
					 
				 }else{
					 t10--;$('#zonghegongsidnTitle').html(gongsi[t10].dnTitle);$('#zonghegongsidnContent').html(gongsi[t10].dnContent);$('#zonghegongsisuStaffName').html(gongsi[t10].suStaffName);$('#zonghegongsidnTime').html(gongsi[t10].dnTime);
				 } 
		}else if(tab11 == "active"){
			if(t11==0){
				 
			 }else{		 
				t11--;$('#zongheyewudnTitle').html(yewu[t11].dnTitle);$('#zongheyewudnContent').html(yewu[t11].dnContent);$('#zongheyewusuStaffName').html(yewu[t11].suStaffName);$('#zongheyewudnTime').html(yewu[t11].dnTime);
			 }
		}else if(tab12 == "active"){
			if(t12==0){
				
			 }else	{
			t12--;$('#zonghexingzhengdnTitle').html(xingzheng[t12].dnTitle);$('#zonghexingzhengdnContent').html(xingzheng[t12].dnContent);$('#zonghexingzhengsuStaffName').html(xingzheng[t12].suStaffName); $('#zonghexingzhengdnTime').html(xingzheng[t12].dnTime);
			 }
		}else if(tab13 == "active"){
			if(t13==0){
				
			 }else{	

				 t13--;$('#zonghecaiwudnTitle').html(caiwu[t13].dnTitle);$('#zonghecaiwudnContent').html(caiwu[t13].dnContent); $('#zonghecaiwusuStaffName').html(caiwu[t13].suStaffName); $('#zonghecaiwudnTime').html(caiwu[t13].dnTime);

			 }
		}
	
		}
	
	}
	// 新增公告
	function addNotice(){
		if ($('#addNoticeDept').val() == 0 || gonggao.addTitle == '' || gonggao.addContent == '') {
			$('.noticeAlert').fadeIn('fast');
			return;
		}
		$.post("../BossInsertNotice.action",{
			dnUserId : _loginUserId,
			dnType : $('#addNoticeDept').val(),
			dnTitle : gonggao.addTitle,
			dnContent : gonggao.addContent
		}, function(data) {
			if (data < 0 || data == '') {
				alert('添加失败！');
			} else {
				$('#addNotice').modal('hide');
				getNotice();
				topAlert('提交成功');
			}
		});
	}
	
	// 选择一个部门显示待编辑的公告
	function checkNotice(){
		var dept = $('#editNoticeDept option:selected').html();
		if (dept == '公司') {
			gonggao.editId = gonggao.gongsi.dnId;
			gonggao.editTitle = gonggao.gongsi.dnTitle;
			gonggao.editContent = gonggao.gongsi.dnContent;
		} else if (dept == '业务部') {
			gonggao.editId = gonggao.yewu.dnId;
			gonggao.editTitle = gonggao.yewu.dnTitle;
			gonggao.editContent = gonggao.yewu.dnContent;
		} else if (dept == '行政部') {
			gonggao.editId = gonggao.xingzheng.dnId;
			gonggao.editTitle = gonggao.xingzheng.dnTitle;
			gonggao.editContent = gonggao.xingzheng.dnContent;
		} else if (dept == '财务部') {
			gonggao.editId = gonggao.caiwu.dnId;
			gonggao.editTitle = gonggao.caiwu.dnTitle;
			gonggao.editContent = gonggao.caiwu.dnContent;
		} else {
			gonggao.editId = '';
			gonggao.editTitle = '';
			gonggao.editContent = '';
		}
	}
	
	// 编辑公告
	function editNotice(){
		if ($('#editNoticeDept').val() == 0 || gonggao.editTitle == '' || gonggao.editContent == '') {
			$('.noticeAlert').fadeIn('fast');
			return;
		}
		$.post("../bossUpdateNotice.action",{
			dnId : gonggao.editId,
			dnTitle : gonggao.editTitle,
			dnContent : gonggao.editContent
		}, function(data) {
			if (data < 0 || data == '') {
				alert('修改失败！');
				return;
			} else {
				$('#editNotice').modal('hide');
				getNotice();
				topAlert('提交成功');
			}
		});
	}
	
	// 页面顶部提示信息
	function topAlert(msg){
		$('body').prepend('<div id="topMsg" style="position:fixed;top:0;left:0;z-index:10;width:100%;" class="alert alert-success alert-dismissible fade in text-center" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="top-alert alert-content">' + msg + '</span></div>');
		$('#topMsg').hide();
		$('#topMsg').fadeIn('2000');
		setTimeout(function() {
			$('#topMsg').fadeOut('3000');
		}, 3000);
		setTimeout(function() {
			$('#topMsg').remove();
		}, 6000);
	}
	
	
	
	// 查询部门
	function getDept(){
		$.post("../queryDepartment.action", {
			departmentStorefrontId : _loginStore,
		}, function(data) {
			if (data.code < 0) {
				// $.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
				return;
			}
			vm.dept = data.body;
		});
	}
	// 初始化商超图表
	function initShopChart(){
		var chart2 = new Highcharts.chart('container', {
		    chart: {
		        spacing : [40, 0 , 40, 0]
		    },
		    credits : {
		    	enabled:false,
		    },
		    exporting : {
		    	enabled:false,
		    },
		    title: {
		        floating:true,
		        text: ''
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: true,
		                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                style: {
		                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                }
		            },
		            point: {
		                events: {
		                   /*
							 * mouseOver: function(e) { // 鼠标滑过时动态更新标题 //
							 * 标题更新函数，API
							 * 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
							 * chart.setTitle({ text: e.target.name+ '\t'+
							 * e.target.y + ' %' }); }
							 */
		                    // ,
		                    // click: function(e) { // 同样的可以在点击事件里处理
		                    // chart.setTitle({
		                    // text: e.point.name+ '\t'+ e.point.y + ' %'
		                    // });
		                    // }
		                }
		            },
		        }
		    },
		    series: [{
		        type: 'pie',
		        innerSize: '80%',
		        name: '市场份额',
		        data: [
		            ['暂无数据',100]
		        ]
		    }]
		}, function(c) { // 图表初始化完毕后的会掉函数
		    // 环形图圆心
		     var centerY = c.series[0].center[1],
		        titleHeight = parseInt(c.title.styles.fontSize);
		    // 动态设置标题位置
		    c.setTitle({
		        y:centerY + titleHeight/2
		    });  
		});
	}
})();
