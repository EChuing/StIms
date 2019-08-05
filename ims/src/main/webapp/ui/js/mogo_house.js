$(function () {
	
	var fromTime = '1980-01-01';
	var toTime = '';
	fromTime = formatTime(getNowFormatDate(), 2);
	var toDay = new Date(fromTime);
	var sDay = 14;
	toDay.setDate(toDay.getDate()-sDay);
	toTime = formatDate(toDay);

	$("#startTime").val(toTime);
	$("#endTime").val(formatTime(getNowFormatDate(), 2));
	
	show();
		
});
function show(){
	
	//设置该方法的ajax同步
	$.ajaxSetup({
		  async: false
	});
	
	var startTime = $('#startTime').val();
	var endTime = $('#endTime').val();
	
	var name=new Array();
	var xaxis=new Array();
	var text=new Array();
	var datalength = 0;
	
	var typeArr = [];
	
	$.post("../queryMogoHouseCondition.action", {		
	}, function(dataType){
		if(dataType != '-1'){
			
			for(var a=0 ;a<dataType.length ; a++){
				var name = dataType[a].name;
				$.post("../queryMogoHouse.action", {
					name : name,
					startTime : startTime,
					endTime : endTime
				}, function(data){
					if(data != '-1' ){
						datalength = data.length;
						for( var i in data){
							xaxis[i] = data[i].xaxis;
							text[i] = data[i].text;
							
							namestr = data[i].name;
							name=[[namestr]];
						}

						var tArray = new Array();  //先声明一维
						var dataIntArr=[];//保存转换后的整型字符串  
						for(var i=0;i<text.length;i++){
							 tArray[i] = new Array();
							 tArray[i]=text[i].split(",");
							 dataIntArr=tArray[i].map(function(data){  
							        return +data;  
							    });  
							 tArray[i] = dataIntArr;
						}
						 
						var dArray = new Array();  //先声明一维
						for(var i=0;i<tArray[0].length;i++){
							
							 dArray[i] = new Array();
							for(var j=0;j<datalength;j++){   
								dArray[i][j] = tArray[j][i];
							}
						}

						var title = '蘑菇租房'+name+'数据统计';
						var ID = 'container_' + a;
						$('#main1').css('display','');
						$('#main2').css('display','none');
						highcharts(xaxis,name,dArray,ID,title);
					}else{
						$('#main1').css('display','none');
						$('#main2').css('display','');
					}

				}, "json");
			}
		}	
		
    }, "json");	
	
}
function highcharts(xaxis,name,dArray,ID,title){
	 $('#'+ID).highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: title
	        },
	        subtitle: {
	            text: 'Source: www.fangzhizun.com'
	        },
	        xAxis: {
	            categories: xaxis,
	            crosshair: true
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '房 (间)'
	            }
	        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	            '<td style="padding:0"><b>{point.y} 间</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        series: create(name,dArray)
	});

}

function create(namestr,dArray){
	
    var series = new Array();
    var name = new Array();
    var data = new Array();
    name = namestr;
    data = dArray;
    for(var i=0;i<name.length;i++){    
    	series.push({"name": name[i], "data": data[i]});
    }
    return series;
}