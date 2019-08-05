$(function() {
	loadData();
})

function loadData() {
	$.get("../getDashRentCheckout.action", function(data) {
		if (data.code<0) {
			$('#thisYear').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
			$('#nextYear').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
		} else {
			data = data.body[0];
			var seriesArr = getSeries(data);
			loadhighcharts(seriesArr);
		}
	}, "json");
}

function loadhighcharts(data) {
	var month = [];
	var d = new Date();
	d.setDate(1);
	for(var i=0;i<12;i++){
		d.setMonth(d.getMonth() + 1);
		month[i] = d.format('yyyy-MM');
	}
	$('#thisYear').highcharts(
			{
				title : {
					text : '未来12个月到期分布',
				},
				subtitle : {
					text : 'Source: www.fangzhizun.com',
				},
				xAxis : {
					categories : month,
					crosshair : true

				},
				yAxis : [ {
					title : {
						text : '当月退房数(套)'
					},
				}, {
					title : {
						text : '当月退房损失金额(元)'
					},
					opposite : true
				} ],
				tooltip : {
					shared : true
				},
				series : [ {
					name : '当月退房数',
					type : 'column',
					data : data[0],
					yAxis : 0,
					tooltip : {
						valueSuffix : ' 套'
					},
				}, {
					name : '当月退房损失金额',
					type : 'spline',
					data : data[1],
					yAxis : 1,
					tooltip : {
						valueSuffix : ' 元'
					},
					color : '#FFA07A'
				} ]
			});
}

function getSeries(data) {
	var drcMonthlyNum = data.drcMonthlyNum.split(',');
	var drcMonthlyMoney = data.drcMonthlyMoney.split(',');
	for (var i = 0; i < 12; i++) {
		drcMonthlyNum[i] = parseInt(drcMonthlyNum[i]);
		drcMonthlyMoney[i] = parseInt(drcMonthlyMoney[i]);
	}
	return [ drcMonthlyNum, drcMonthlyMoney ];
}
