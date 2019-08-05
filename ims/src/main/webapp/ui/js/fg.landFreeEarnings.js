$(function() {
	loadData();
})

function loadData() {
	$.get("../getLandFreeEarnings.action", function(data) {
		if (data.code < 0) {
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
	$('#thisYear').highcharts(
			{
				title : {
					text : '今年免租收益',
				},
				subtitle : {
					text : 'Source: www.fangzhizun.com',
				},
				xAxis : {
					categories : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月',
							'8月', '9月', '10月', '11月', '12月' ],
					crosshair : true

				},
				yAxis : [ {

					title : {
						text : '当月免租天数(天)'
					},
				}, {
					title : {
						text : '当月免租收益(元)'
					},
					opposite : true
				} ],
				tooltip : {
					shared : true
				},
				series : [ {
					name : '当月免租天数',
					type : 'column',
					data : data[0],
					yAxis : 0,
					tooltip : {
						valueSuffix : ' 天'
					},
				}, {
					name : '当月免租收益',
					type : 'spline',
					data : data[1],
					yAxis : 1,
					tooltip : {
						valueSuffix : ' 元'
					},
					color : '#FFA07A'
				} ]
			});
	$('#nextYear').highcharts(
			{
				title : {
					text : '明年免租收益',
				},
				subtitle : {
					text : 'Source: www.fangzhizun.com',
				},
				xAxis : {
					categories : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月',
							'8月', '9月', '10月', '11月', '12月' ],
					crosshair : true
				},
				yAxis : [ {
					title : {
						text : '当月免租天数(天)'
					},
				}, {
					title : {
						text : '当月免租收益(元)'
					},
					opposite : true
				} ],
				tooltip : {
					shared : true
				},
				series : [ {
					name : '当月免租天数',
					type : 'column',
					data : data[2],
					yAxis : 0,
					tooltip : {
						valueSuffix : ' 天'
					},
				}, {
					name : '当月免租收益',
					type : 'spline',
					data : data[3],
					yAxis : 1,
					tooltip : {
						valueSuffix : ' 元'
					},
					color : '#FFA07A'
				} ]
			});
}

function getSeries(data) {
	var thisYearFreeDaysArr = data.dlfeThisYearFreeDays.split(',');
	var thisYearEarningsArr = data.dlfeThisYearEarnings.split(',');
	var nextYearFreeDaysArr = data.dlfeNextYearFreeDays.split(',');
	var nextYearEarningsArr = data.dlfeNextYearEarnings.split(',');
	for (var i = 0; i < 12; i++) {
		thisYearFreeDaysArr[i] = parseInt(thisYearFreeDaysArr[i]);
		thisYearEarningsArr[i] = parseInt(thisYearEarningsArr[i]);
		nextYearFreeDaysArr[i] = parseInt(nextYearFreeDaysArr[i]);
		nextYearEarningsArr[i] = parseInt(nextYearEarningsArr[i]);
	}
	return [ thisYearFreeDaysArr, thisYearEarningsArr, nextYearFreeDaysArr,
			nextYearEarningsArr ];
}
