$(function() {
	queryTable(1, 0);
	$('#customerSourceStatisticsDg').datagrid({
		onClickRow : function(index, data) {
			var row = $('#customerSourceStatisticsDg').datagrid('getSelected');
			var dataArr = dataFactory(row.cssData);
			loadHis(dataArr[0][0], dataArr[1], dataArr[2]);
		}
	})
})

//分页统计总条数
function getcustomerSourceStatisticsPageCount(page){
	var pageSize = 20;
	$.post("../getCustomerSourceStatistics.action", {
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"customerSourceStatistics",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"customerSourceStatistics",0);
		}
	});
}

var tableArr = [];
// 列表导入信息
function queryTable(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	$.post("../getCustomerSourceStatistics.action", {
		startNum : startNum,
		endNum : endNum
	}, function(data) {
		if (data.code < 0) {
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryTable","customerSourceStatistics");
			}else{
				notCountPage(page, 0 ,"queryTable","customerSourceStatistics");
			}
			$('#customerSourceStatisticsDg').datagrid({
				data : [],
				view : myview,
				width : '100%',
				emptyMsg : data.msg
			});
			$('#containerAll').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
			$('#containerSort').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
		} else {
			data = data.body;
			tableArr = [];
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryTable","customerSourceStatistics");
			}else{
				notCountPage(page, 1 , "queryTable","customerSourceStatistics");
			}
			for (var i = 0; i < data.length; i++) {
				var kehulaiyuan = {
					cssTime : dateFormat(data[i].icssTime),
					cssName : tableHead(data[i].icssTime, data[i].icssType) + '客户来源表',
					cssType : data[i].icssType,
					cssData : data[i],
				}
				tableArr.push(kehulaiyuan);
			}
			$('#customerSourceStatisticsDg').datagrid({
				"onLoadSuccess" : function(data) {
					$(this).datagrid('selectRow', 0);
				}
			}).datagrid("loadData", tableArr);
			var row = $('#customerSourceStatisticsDg').datagrid('getSelected');
			var dataArr = dataFactory(row.cssData);
			loadHis(dataArr[0][0], dataArr[1], dataArr[2]);
		}
	}, "json");
}

function loadHis(data, dataArr, allSort) {// 创建饼图
	$('#containerAll')
	.highcharts(
			{
				chart : {
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false
				},
				title : {
					text : ''
				},
				plotOptions : {
					pie : {
						allowPointSelect : true,
						cursor : 'pointer',
						dataLabels : {
							enabled : false,
							format : '<b>{point.name}</b>: {point.percentage:.1f} %',
							style : {
								color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
										|| 'black'
							}
						},
						showInLegend: true
					}
				},
				legend: {//控制图例显示位置
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            borderWidth: 0,
		            width:200,
		            floating : true
		        },
				tooltip : {
					formatter : function() {
						var len = this.series.points.length;
						var str = '';
						for(var i = 0; i < len ; i++){
							var item = '<b style="font-weight:bold;color:'
								+ this.series.points[i].color
								+'">'
								+ this.series.points[i].name
								+ '</b><b>: '
								+ Highcharts.numberFormat(
										this.series.points[i].percentage, 1)
								+ '% ('
								+ Highcharts.numberFormat(this.series.points[i].y, 0,
										',') + '人)</b><br>';
							str += item;
						}
						return str;
					}
				},
				series :  [ {
					type : 'pie',
					name : '所有来源',
					data : allSort
				} ]
			});
	$('#container1')
			.highcharts(
					{
						chart : {
							plotBackgroundColor : null,
							plotBorderWidth : null,
							plotShadow : false
						},
						title : {
							text : '所有来源',
							style : {
								fontWeight : 'bold'
							}
						},
						plotOptions : {
							pie : {
								allowPointSelect : true,
								cursor : 'pointer',
								dataLabels : {
									enabled : false,
									format : '<b>{point.name}</b>: {point.percentage:.1f} %',
									style : {
										color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
												|| 'black'
									}
								},
								showInLegend: true
							}
						},
						tooltip : {
							formatter : function() {
								return '<b style="font-weight:bold;color:'
										+ this.series.points[0].color
										+'">'
										+ this.series.points[0].name
										+ '</b><b>: '
										+ Highcharts.numberFormat(
												this.series.points[0].percentage, 1)
										+ '% ('
										+ Highcharts.numberFormat(this.series.points[0].y, 0,
												',') + '人)</b><br>'
										+ '<b style="font-weight:bold;color:'
										+ this.series.points[1].color
										+'">'
										+ this.series.points[1].name
										+ '</b><b>: '
										+ Highcharts.numberFormat(
												this.series.points[1].percentage, 1)
										+ '% ('
										+ Highcharts.numberFormat(this.series.points[1].y, 0,
												',') + '人)</b>';
							}
						},
						series : [ {
							type : 'pie',
							name : '所有来源',
							data : [ {
								name : '我租',
								y : data['我租'],
								sliced : true,
								selected : true,
								color:'#90ed7d'
							},
							['其他', data['其他']], ]
						} ]
					});
	
	$('#container2').empty();
	for(var i = 0; i < dataArr.length; i++){

		$('#container2').append('<div id="sort_'+i+'" style="float:left;width:33%;height:240px;margin-top:10px"></div>');
		$('#sort_'+i)
		.highcharts(
				{
					chart : {
						plotBackgroundColor : null,
						plotBorderWidth : null,
						plotShadow : false,
					},
					title : {
						text : dataArr[i]['来源'],
						style : {
							fontWeight : 'bold'
						}
					},
					plotOptions : {
						pie : {
							allowPointSelect : true,
							cursor : 'pointer',
							dataLabels : {
								enabled : false,
								format : '<b>{point.name}</b>: {point.percentage:.1f} %',
								style : {
									color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
											|| 'black'
								}
							},
							showInLegend: true
						}
					},
					tooltip : {
						formatter : function() {
							return '<b style="font-weight:bold;color:'
							+ this.series.points[0].color
							+'">'
							+ this.series.points[0].name
							+ '</b><b>: '
							+ Highcharts.numberFormat(
									this.series.points[0].percentage, 1)
							+ '% ('
							+ Highcharts.numberFormat(this.series.points[0].y, 0,
									',') + '人)</b><br>'
							+ '<b style="font-weight:bold;color:'
							+ this.series.points[1].color
							+'">'
							+ this.series.points[1].name
							+ '</b><b>: '
							+ Highcharts.numberFormat(
									this.series.points[1].percentage, 1)
							+ '% ('
							+ Highcharts.numberFormat(this.series.points[1].y, 0,
									',') + '人)</b>';
						}
					},
					series : [ {
						type : 'pie',
						name : dataArr[i]['来源'],
						data : [ {
							name : '我租',
							y : dataArr[i]['我租'],
							sliced : true,
							selected : true,
							color:'#90ed7d'
						},
						['其他', dataArr[i]['其他']], ]
					} ]
				});
	}
}

function dataFactory(data) {
	var all = eval('(' + data.icssAllJson.getRealJsonStr() + ')');
	var sortArr = eval('(' + data.icssSortJson.getRealJsonStr() + ')');
	var allsort = [];
	for(var i in sortArr){
		var item = [sortArr[i]['来源'], sortArr[i]['我租']+sortArr[i]['其他']];
		allsort.push(item);
	}
	//console.log(allsort)
	return [ [ all ], sortArr, allsort];
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

// 日期格式yyyy-MM-dd
function dateFormat(date) {
	return date.split(' ')[0];
}

// 分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("customerSourceStatisticsPage").remove();
		$("#customerSourceStatisticsDiv")
				.append(
						"<div class='tcdPageCode' id='customerSourceStatisticsPage' style='text-align:center;'></div>");
		$("#customerSourceStatisticsPage").createPage({
			onePageNums : 20,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryTable(p, 1);
				}
			}
		});
	}
}