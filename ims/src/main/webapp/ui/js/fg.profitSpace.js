$(function() {
	queryTable(1, 0);
	$('#profitSpaceDg').datagrid({
		onClickRow : function(index, data) {
			if (!checkboxState) {
				var row = $('#profitSpaceDg').datagrid('getSelected');
				refreshTable(row.caData);// 刷新表格
				refresh(datafactory(row.caData));// 刷新柱状图
			} else {
				var chechItemList = $('#profitSpaceDg').datagrid('getChecked');
				var multdata = multitudeTable(chechItemList);
				refreshTable(multdata);// 刷新表格
				refresh(datafactory(multdata));
			}
		},
		/*onDblClickRow : function(rowIndex, rowData) {
			if (!checkboxState) {
				$('#profitSpaceDg').datagrid('showColumn', 'caCheckbox');
				$('#profitSpaceDg').datagrid({
					singleSelect : false
				});
				checkboxState = !checkboxState;
				queryTable(currentPage, 0);
			} else {
				$('#profitSpaceDg').datagrid('hideColumn', 'caCheckbox');
				$('#profitSpaceDg').datagrid({
					singleSelect : true
				});
				$("#profitSpaceDg").datagrid('reload');
				checkboxState = !checkboxState;
				queryTable(currentPage, 0);
			}
		},*/
		onCheck : function(rowIndex, rowData) {
			if (checkboxState) {
				var chechItemList = $('#profitSpaceDg').datagrid('getChecked');
				var multdata = multitudeTable(chechItemList);
				refreshTable(multdata);// 刷新表格
				refresh(datafactory(multdata));
			}
		},
		onUncheck : function(rowIndex, rowData) {
			if (checkboxState) {
				var chechItemList = $('#profitSpaceDg').datagrid('getChecked');
				var multdata = multitudeTable(chechItemList);
				refreshTable(multdata);// 刷新表格
				refresh(datafactory(multdata));
			}
		},
		onCheckAll : function(rows) {
			if (checkboxState) {
				var chechItemList = $('#profitSpaceDg').datagrid('getChecked');
				var multdata = multitudeTable(chechItemList);
				refreshTable(multdata);// 刷新表格
				refresh(datafactory(multdata));
			}
		},
		onUncheckAll : function(rows) {
			if (checkboxState) {
				var chechItemList = $('#profitSpaceDg').datagrid('getChecked');
				var multdata = multitudeTable(chechItemList);
				refreshTable(multdata);// 刷新表格
				refresh(datafactory(multdata));
			}
		},
	})
})

// 表格checkbox初始状态
var checkboxState = false;
var currentPage = 1;
var loadhisState = true;

// 绑定按钮
var vue_topBtn = new Vue({
	el : '#tbtn',
	data : {
		text : '点击进入数据并表叠加模式',
		btnState :　checkboxState
	},
	methods : {
		changeTable : function(event) {
			if (!checkboxState) {
				$('#profitSpaceDg').datagrid('showColumn', 'caCheckbox');
				$('#profitSpaceDg').datagrid({
					singleSelect : false
				});
				checkboxState = !checkboxState;
				queryTable(currentPage, 0);
				this.text = '点击退出数据并表叠加模式';
				this.btnState = checkboxState;
			} else {
				$('#profitSpaceDg').datagrid('hideColumn', 'caCheckbox');
				$('#profitSpaceDg').datagrid({
					singleSelect : true
				});
				$("#profitSpaceDg").datagrid('reload');
				checkboxState = !checkboxState;
				queryTable(currentPage, 0);
				this.text = '点击进入数据并表叠加模式';
				this.btnState = checkboxState;
			}
		}
	}
})
// 绑定表格
var vue_deposit = new Vue({
	el : '#deposit',
	data : {},
})
var vue_energy = new Vue({
	el : '#energy',
	data : {},
})
var vue_main = new Vue({
	el : '#main',
	data : {},
})
var vue_maintenance = new Vue({
	el : '#maintenance',
	data : {},
})
var vue_financial = new Vue({
	el : '#financial',
	data : {},
})
var vue_other = new Vue({
	el : '#other',
	data : {},
})
var vue_debt = new Vue({
	el : '#debt',
	data : {},
})
var vue_default = new Vue({
	el : '#default',
	data : {},
})
var vue_all = new Vue({
	el : '#all',
	data : {},
})

// 日期格式yyyy-MM-dd
function dateFormat(date) {
	return date.split(' ')[0];
}

var tableArr = [];
// 列表导入信息
function queryTable(page, type) {
	var startNum = (parseInt(page) - 1) * 18;
	var endNum = 18;

	$.post("../getProfitSpace.action", {
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data < 0 || data == '' || data.length == 0) {
			sourcePage(0, 0, 0);
			var noData = [];
			$('#profitSpaceDg').datagrid({
				data : noData,
				view : myview,
				width : '100%',
				emptyMsg : '没有查询到符合条件的记录！'
			});
			$('#lirunkongjian').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>暂无数据！</div>");
			$('#lirunkongjian').css('display', 'inline');
		} else {
			$('#lirunkongjian').css('display', 'inline');
			tableArr = [];
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 0);
			}
			for (var i = 0; i < data.length; i++) {
				var lirunkongjian = {
					caTime : dateFormat(data[i].ipsTime),
					caName : tableHead(data[i].ipsTime, data[i].ipsType)
							+ '利润空间表',
					caType : data[i].ipsType,
					caData : data[i],
				}
				tableArr.push(lirunkongjian);
			}

			var row = $('#profitSpaceDg').datagrid('getSelected');

			$('#profitSpaceDg').datagrid({
				"onLoadSuccess" : function(data) {
					$(this).datagrid('selectRow', 0);
				}
			}).datagrid("loadData", tableArr);

			var row = $('#profitSpaceDg').datagrid('getSelected');
			refreshTable(row.caData);
			if (loadhisState) {
				loadhistogram(datafactory(row.caData));
				loadhisState = !loadhisState;
			} else {
				refresh(datafactory(row.caData));
			}
		}

	}, "json");
}

// 表格名称前缀
function tableHead(time, type) {
	var date = time.split(' ')[0].split('-');
	var seasonEndMonth = {
		3 : '第一季度',
		6 : '第二季度',
		9 : '第三季度',
		12 : '第四季度'
	};
	var month = parseInt(date[1]) - 1;
	month = month == 0 ? 12 : month;
	if (type == '月度') {
		return month + '月';
	} else if (type == '季度') {
		return seasonEndMonth[month];
	} else if (type == '年度') {
		return (parseInt(date[0]) - 1) + '年';
	}
	return '';
}

// 分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 18);
		$("#profitSpacePage").remove();
		$("#profitSpacePageDiv")
				.append(
						"<div class='tcdPageCode' id='profitSpacePage' style='text-align:center;'></div>");
		$("#profitSpacePage").createPage({
			onePageNums : 18,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					currentPage = p;
					queryTable(p, 1);
				}
			}
		});
	}
}

function refreshTable(data) {
	vue_deposit.$data = data;
	vue_energy.$data = data;
	vue_main.$data = data;
	vue_maintenance.$data = data;
	vue_financial.$data = data;
	vue_other.$data = data;
	vue_debt.$data = data;
	vue_default.$data = data;
	vue_all.$data = data;
}

var yajin;
var nengyuan;
var zhuying;
var weixiu;
var caiwu;
var qita;
var zhaiwuzhaiquan;
var weiyue;
var heji;

// 初始化柱状图
function loadhistogram(data) {
	yajin = createHistogram('#yajin', data.yajin, 150);
	nengyuan = createHistogram('#nengyuan', data.nengyuan, 150);
	zhuying = createHistogram('#zhuying', data.zhuying, 150);
	weixiu = createHistogram('#weixiu', data.weixiu, 150);
	caiwu = createHistogram('#caiwu', data.caiwu, 150);
	qita = createHistogram('#qita', data.qita, 150);
	zhaiwuzhaiquan = createHistogram('#zhaiwuzhaiquan', data.zhaiwuzhaiquan,
			150);
	weiyue = createHistogram('#weiyue', data.weiyue, 150);
	heji = createHistogram('#heji', data.heji, 150);
}

// 刷新柱状图数据
function refresh(data) {
	yajin.list = data.yajin;
	nengyuan.list = data.nengyuan;
	zhuying.list = data.zhuying;
	weixiu.list = data.weixiu;
	caiwu.list = data.caiwu;
	qita.list = data.qita;
	zhaiwuzhaiquan.list = data.zhaiwuzhaiquan;
	weiyue.list = data.weiyue;
	heji.list = data.heji;
}

// 解析组合数据
function datafactory(data) {
	var newDateJson = {};
	newDateJson.yajin = [ {
		income : data.ipsIncomeDepositHouse,
		pay : data.ipsExpendDepositHouse,
		name : '房屋押金'
	}, {
		income : data.ipsIncomeDepositWaterEle,
		pay : data.ipsExpendDepositWaterEle,
		name : '水电押金'
	}, {
		income : data.ipsIncomeDepositDoorCard,
		pay : data.ipsExpendDepositDoorCard,
		name : '门卡押金'
	}, {
		income : data.ipsIncomeDepositCarCard,
		pay : data.ipsExpendDepositCarCard,
		name : '车卡押金'
	}, {
		income : data.ipsIncomeDepositLandlord,
		pay : data.ipsExpendDepositRenter,
		name : '业主/租户退房押金'
	}, {
		income : data.ipsIncomeDepositDeposit,
		pay : data.ipsExpendDepositDeposit,
		name : '订金'
	}, {
		income : data.ipsIncomeDepositDecorate,
		pay : data.ipsExpendDepositDecorate,
		name : '装修押金'
	} ];
	newDateJson.nengyuan = [ {
		income : data.ipsIncomeEnergyWater,
		pay : data.ipsExpendEnergyWater,
		name : '水费'
	}, {
		income : data.ipsIncomeEnergyElectricity,
		pay : data.ipsExpendEnergyElectricity,
		name : '电费'
	}, {
		income : data.ipsIncomeEnergyGas,
		pay : data.ipsExpendEnergyGas,
		name : '燃气费'
	}, {
		income : data.ipsIncomeEnergyNetwork,
		pay : data.ipsExpendEnergyNetwork,
		name : '网络费'
	}, {
		income : data.ipsIncomeEnergyTv,
		pay : data.ipsExpendEnergyTv,
		name : '电视'
	}, {
		income : data.ipsIncomeEnergyManagement,
		pay : data.ipsExpendEnergyManagement,
		name : '物业管理费'
	}, {
		income : data.ipsIncomeEnergyBalance,
		pay : data.ipsExpendEnergyBalance,
		name : '余款结算'
	} ];
	newDateJson.zhuying = [ {
		income : data.ipsIncomeMainRental,
		pay : data.ipsExpendMainRental,
		name : '租金'
	}, {
		income : data.ipsIncomeMainCommission,
		pay : data.ipsExpendMainCommission,
		name : '佣金服务费'
	}, {
		income : data.ipsIncomeMainCarRental,
		pay : data.ipsExpendMainCarRental,
		name : '车位租金'
	} ];
	newDateJson.weixiu = [ {
		income : data.ipsIncomeMaintenanceMaterial,
		pay : data.ipsExpendMaintenanceMaterial,
		name : '材料费'
	}, {
		income : data.ipsIncomeMaintenanceArtificial,
		pay : data.ipsExpendMaintenanceArtificial,
		name : '人工费'
	}, {
		income : data.ipsIncomeMaintenanceClean,
		pay : data.ipsExpendMaintenanceClean,
		name : '保洁费'
	}, {
		income : data.ipsIncomeMaintenanceLock,
		pay : data.ipsExpendMaintenanceLock,
		name : '换锁'
	} ];
	newDateJson.caiwu = [ {
		income : data.ipsIncomeFinancialTaxes,
		pay : data.ipsExpendFinancialTaxes,
		name : '税费'
	}, {
		income : data.ipsIncomeFinancialPos,
		pay : data.ipsExpendFinancialPos,
		name : 'POS手续费/运营费'
	}, {
		income : data.ipsIncomeFinancialFinancial,
		pay : data.ipsExpendFinancialFinancial,
		name : '财务费用'
	} ];
	newDateJson.qita = [ {
		income : data.ipsIncomeOtherBehalf,
		pay : data.ipsExpendOtherBehalf,
		name : '代缴费用'
	}, {
		income : data.ipsIncomeOtherTransfer,
		pay : data.ipsExpendOtherTransfer,
		name : '转账'
	} ];
	newDateJson.zhaiwuzhaiquan = [ {
		income : data.ipsIncomeDebtBorrowed,
		pay : data.ipsExpendCreditorLoan,
		name : '借入款/贷出款'
	}, {
		income : data.ipsIncomeCreditorInterest,
		pay : data.ipsExpendDebtInterest,
		name : '应收/应还利息款'
	}, {
		income : data.ipsIncomeCreditorLoan,
		pay : data.ipsExpendDebtReimbursement,
		name : '应收/应还贷款'
	} ];
	newDateJson.weiyue = [ {
		income : data.ipsIncomeDefaultPenalty,
		pay : data.ipsExpendDefaultPenalty,
		name : '违约金'
	}, {
		income : data.ipsIncomeDefaultOverdue,
		pay : data.ipsExpendDefaultOverdue,
		name : '滞纳金'
	} ];
	newDateJson.heji = [ {
		income : data.ipsIncomeDeposit,
		pay : data.ipsExpendDeposit,
		name : '押金类收支合计'
	}, {
		income : data.ipsIncomeEnergy,
		pay : data.ipsExpendEnergy,
		name : '能源类收支合计'
	}, {
		income : data.ipsIncomeMain,
		pay : data.ipsExpendMain,
		name : '主营类收支合计'
	}, {
		income : data.ipsIncomeMaintenance,
		pay : data.ipsExpendMaintenance,
		name : '维修类收支合计'
	}, {
		income : data.ipsIncomeFinancial,
		pay : data.ipsExpendFinancial,
		name : '财务类收支合计'
	}, {
		income : data.ipsIncomeOther,
		pay : data.ipsExpendOther,
		name : '其他类收支合计'
	}, {
		income : data.ipsIncomeDebtCreditor,
		pay : data.ipsExpendDebtCreditor,
		name : '债权债务类收支合计'
	}, {
		income : data.ipsIncomeDefault,
		pay : data.ipsExpendDefault,
		name : '违约类收支合计'
	}, {
		income : data.ipsIncome,
		pay : data.ipsExpend,
		name : '总收支合计'
	} ];
	return newDateJson;
}

// 并表数据叠加
function multitudeTable(list) {
	var ips = {
		ipsIncomeDepositHouse : 0,
		ipsExpendDepositHouse : 0,
		ipsIncomeDepositWaterEle : 0,
		ipsExpendDepositWaterEle : 0,
		ipsIncomeDepositDoorCard : 0,
		ipsExpendDepositDoorCard : 0,
		ipsIncomeDepositCarCard : 0,
		ipsExpendDepositCarCard : 0,
		ipsIncomeDepositLandlord : 0,
		ipsExpendDepositRenter : 0,
		ipsIncomeDepositDeposit : 0,
		ipsExpendDepositDeposit : 0,
		ipsIncomeDepositDecorate : 0,
		ipsExpendDepositDecorate : 0,
		ipsIncomeEnergyWater : 0,
		ipsExpendEnergyWater : 0,
		ipsIncomeEnergyElectricity : 0,
		ipsExpendEnergyElectricity : 0,
		ipsIncomeEnergyGas : 0,
		ipsExpendEnergyGas : 0,
		ipsIncomeEnergyNetwork : 0,
		ipsExpendEnergyNetwork : 0,
		ipsIncomeEnergyTv : 0,
		ipsExpendEnergyTv : 0,
		ipsIncomeEnergyManagement : 0,
		ipsExpendEnergyManagement : 0,
		ipsIncomeEnergyBalance : 0,
		ipsExpendEnergyBalance : 0,
		ipsIncomeMainRental : 0,
		ipsExpendMainRental : 0,
		ipsIncomeMainCommission : 0,
		ipsExpendMainCommission : 0,
		ipsIncomeMainCarRental : 0,
		ipsExpendMainCarRental : 0,
		ipsIncomeMaintenanceMaterial : 0,
		ipsExpendMaintenanceMaterial : 0,
		ipsIncomeMaintenanceArtificial : 0,
		ipsExpendMaintenanceArtificial : 0,
		ipsIncomeMaintenanceClean : 0,
		ipsExpendMaintenanceClean : 0,
		ipsIncomeMaintenanceLock : 0,
		ipsExpendMaintenanceLock : 0,
		ipsIncomeFinancialTaxes : 0,
		ipsExpendFinancialTaxes : 0,
		ipsIncomeFinancialPos : 0,
		ipsExpendFinancialPos : 0,
		ipsIncomeFinancialFinancial : 0,
		ipsExpendFinancialFinancial : 0,
		ipsIncomeOtherBehalf : 0,
		ipsExpendOtherBehalf : 0,
		ipsIncomeOtherTransfer : 0,
		ipsExpendOtherTransfer : 0,
		ipsIncomeDebtBorrowed : 0,
		ipsExpendCreditorLoan : 0,
		ipsIncomeCreditorInterest : 0,
		ipsExpendDebtInterest : 0,
		ipsIncomeCreditorLoan : 0,
		ipsExpendDebtReimbursement : 0,
		ipsIncomeDefaultPenalty : 0,
		ipsExpendDefaultPenalty : 0,
		ipsIncomeDefaultOverdue : 0,
		ipsExpendDefaultOverdue : 0,
		ipsIncomeDeposit : 0,
		ipsExpendDeposit : 0,
		ipsIncomeEnergy : 0,
		ipsExpendEnergy : 0,
		ipsIncomeMain : 0,
		ipsExpendMain : 0,
		ipsIncomeMaintenance : 0,
		ipsExpendMaintenance : 0,
		ipsIncomeFinancial : 0,
		ipsExpendFinancial : 0,
		ipsIncomeOther : 0,
		ipsExpendOther : 0,
		ipsIncomeDebtCreditor : 0,
		ipsExpendDebtCreditor : 0,
		ipsIncomeDefault : 0,
		ipsExpendDefault : 0,
		ipsIncome : 0,
		ipsExpend : 0
	};
	$.each(list, function(index, item) {
		for ( var key in ips) {
			ips[key] += item.caData[key];
		}
	});
	return ips;
}

function btnOver(){
	if(!checkboxState){
		$('#tbtn').css("border-color","#95B8E7");
	}
}

function btnOut(){
	if(!checkboxState){
		$('#tbtn').css("border-color","#ddd");
	}
}

// 对比柱状图
function createHistogram(id, data, height) {
	var vue_obj = new Vue({
		el : id,
		data : {
			list : data,
			bigStyle : {
				height : height + 30 + 'px',
				minWidth : 90 * data.length + 'px'
			},
			itemStyle : {
				width : 1 / data.length * 100 + '%',
				minWidth : '90px',
				height : height + 'px',
				float : 'left',
			},
			xAxisStyle : {
				width : 1 / data.length * 100 + '%',
				minWidth : '90px',
				height : '30px',
				float : 'left',
				textAlign : 'center'
			},
			hisHeight : height,
			styleIncome : {// 收入柱子样子
				backgroundColor : '#7CB5EC',
				height : height / 100 + 'px'
			},
			stylePay : {// 支出柱子样式
				backgroundColor : '#D3D3D3',
				height : height / 100 + 'px'
			},
			styleNone : {// 空柱子
				height : height / 100 + 'px'
			}
		},
		components : {// 定义子组件
			'my-component' : {// 子组件标签
				template : '#tpl',// 子组件模板id
				props : [ 'list', 'bigStyle', 'itemStyle', 'xAxisStyle',
						'hisHeight', 'styleIncome', 'stylePay', 'styleNone' ]
			// 父组件参数传入子组件
			}
		}
	})
	return vue_obj;
}