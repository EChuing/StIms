$(function(){
	loadData();
})

function loadData(){
	$.get("../getHousePrice.action", function(data){
		if(data.code<0){
			$('#container').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
		}else{
			data = data.body[0];
			var seriesArr = getSeries(data);
			loadhighcharts(seriesArr);
		}
	}, "json");	
}

function loadhighcharts(data){
	 $('#container').highcharts({
		 	chart: {
		 		type: 'spline',
		 	},
	        title: {
	            text: '房源租金分布统计',
	        },
	        subtitle: {
	            text: 'Source: www.fangzhizun.com',
	        },
	        yAxis: {
	            title: {
	                text: '房源数量(套)'
	            },
	        },
	        tooltip: {
	            valueSuffix: '套'
	        },
	        series: [{
	        	name : '收房数量',
	        	data : data[0],
	        	color : '#FFA07A'
	        },{
	        	name : '出房数量',
	        	data : data[1]
	        }]
	    });
}

function getSeries(data){
	var storeJson = eval('('+data.dhpStoreJson.getRealJsonStr()+')');
	var storeKeyArr = data.dhpStorePrice.split(',');
	var rentJson = eval('('+data.dhpRentJson.getRealJsonStr()+')');
	var rentKeyArr = data.dhpRentPrice.split(',');
	var weizuArr = [];
	var yizuArr = [];
	for(var i =0;　i <　storeKeyArr.length; i++){
		weizuArr.push([parseFloat(storeKeyArr[i]),storeJson[storeKeyArr[i]]]);
	}
	for(var i =0; i < rentKeyArr.length; i++){
		yizuArr.push([parseFloat(rentKeyArr[i]),rentJson[rentKeyArr[i]]]);
	}
	return [weizuArr,yizuArr];
}