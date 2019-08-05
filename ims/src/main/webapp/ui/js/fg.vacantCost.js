$(function(){
	loadData();
})

function loadData(){
	$.post("../vacantCost.action",{
		startNum: 0,
		endNum: 30
	}, function(data){
		if(data.code<0){
			$('#container').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
		}else{
			data=data.body;
			var highchartArr = dataFactory(data);
			loadhighcharts(highchartArr);
		}
	}, "json");	
}

function loadhighcharts(data){
	 $('#container').highcharts({
        title: {
            text: '空置成本表',
        },
		subtitle : {
			text : 'Source: www.fangzhizun.com',
		},
		xAxis : {
			categories : data[0],
			crosshair : true
		},
		yAxis : [ {
			title : {
				text : '空置房数(套)'
			},
		}, {
			title : {
				text : '空置率'
			},
			opposite : true
		}, {
			title : {
				text : '未来空置率'
			},
			opposite : true
		}, {
			title : {
				text : '空置成本(元)'
			},
			opposite : true
		} ],
		tooltip : {
			shared : true
		},
		series : [ {
			name : '空置房数',
			type : 'spline',
			data : data[1],
			yAxis : 0,
			tooltip : {
				valueSuffix : ' 套'
			},
		},{
			name : '空置率',
			dashStyle: 'dash',
			type : 'spline',
			data : data[2],
			yAxis : 1,
			color : '#f45b5b'
		},{
			name : '未来空置率',
			dashStyle: 'dash',
			type : 'spline',
			data : data[4],
			yAxis : 2,
			color : '#90ed7d'
		}, {
			name : '空损成本',
			type : 'spline',
			data : data[3],
			yAxis : 3,
			tooltip : {
				valueSuffix : ' 元'
			},
			color : '#FFA07A'
		} ]
    });
}

function dataFactory(data){
	var categorieArr = [];
	var vacantCountArr = [];
	var vacancyRateArr = [];
	var lossCostArr = [];
	var vacancyFutureRateArr = [];
	for(var i = 0; i <data.length; i++){
		var db = data[i];
		categorieArr.push(db.dbDate);
		vacantCountArr.push(db.dbVacantHouse);
		vacancyRateArr.push(db.dbVacantRate);
		lossCostArr.push(db.dbVacantCost);
		vacancyFutureRateArr.push(db.dbVacantFutureRate);
	}
	return [categorieArr, vacantCountArr, vacancyRateArr, lossCostArr, vacancyFutureRateArr];
}