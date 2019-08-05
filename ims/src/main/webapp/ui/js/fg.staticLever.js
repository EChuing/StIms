$(function(){
	loadData();
})

function loadData(){
	$.post("../getStaticLever.action",{
		startNum: 0,
		endNum: 24
	}, function(data){
		if(data != '-1'){
			var highchartArr = dataFactory(data);
			loadhighcharts(highchartArr);
		}else{
			$('#container').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>暂无数据！</div>");
		}
		
	}, "json");	
}

function loadhighcharts(data){
	 $('#container').highcharts({
	        title: {
	            text: '动态杠杆预测',
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
					text : '金额(元)'
				},
			}, {
				title : {
					text : '资产负债比'
				},
				opposite : true
			} ],
			tooltip : {
				shared : true
			},
			series : [ {
				name : '可收租金资产',
				type : 'column',
				data : data[1],
				yAxis : 0,
				tooltip : {
					valueSuffix : ' 元'
				},
			},{
				name : '应付租金负债',
				type : 'column',
				data : data[2],
				yAxis : 0,
				tooltip : {
					valueSuffix : ' 元'
				},
				color : '#f45b5b'
			}, {
				name : '资产负债比',
				type : 'spline',
				data : data[3],
				yAxis : 1,
				tooltip : {
					valueSuffix : ' ：1'
				},
				color : '#FFA07A'
			} ]
	    });
}

function dataFactory(data){
	var categorieArr = [];
	var incomeArr = [];
	var expendArr = [];
	var scaleArr = [];
	for(var i = (data.length-1); i >= 0; i--){
		var isl = data[i];
		categorieArr.push(isl.islMonth);
		incomeArr.push(isl.islIncome);
		expendArr.push(isl.islExpend);
		scaleArr.push(isl.islScale);
	}
	return [categorieArr, incomeArr, expendArr, scaleArr];
}