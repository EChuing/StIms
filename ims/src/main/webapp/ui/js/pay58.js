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
	
	showPay58();
});

function showPay58(){

	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	
	var date=new Array();
	var nameText=new Array();
	var text=new Array();
	var x = 0;
	var datalength = 0;
	
	
	$.post("../queryPay58.action", {
		startTime : startTime,
		endTime : endTime
	}, function(data){
		if(data != '-1'){
			for( var i in data){
				datalength = data.length;
				var d = new Date(data[i].date);
				date[i] = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
				text[i] = data[i].text;
			}
			var newdata=new Array();
			var jsonobj = eval('(' + text + ')');
			
			for( var key in jsonobj){
				nameText[x] = key;
				x++;
			}
			var tArray = new Array();  //先声明一维
			for(var k=0;k<nameText.length;k++){     
				var name = nameText[k];
				
				tArray[k]=new Array();  
				for(var j=0;j<datalength;j++){   
					var jsonText = eval('(' + text[j] + ')');
					tArray[k][j] = jsonText[name];			//再声明二维
				}
			}
		
			highcharts(date,nameText,tArray);
		}else{
			 $('#container').html("<div style='text-align:center;margin:30px 0 50px 0'>没有数据！</div>");
		}
		
	}, "json");	
}


function highcharts(date,nameText,tArray){
	 $('#container').highcharts({
	        title: {
	            text: '58付费发帖量日均统计',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Source: www.fangzhizun.com',
	            x: -20
	        },
	        xAxis: {
	            categories: date
	        },
	        yAxis: {
	            title: {
	                text: '信息量(条)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '条'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: create(nameText,tArray)

	    });
}
function create(namestr,datastr){
	
    var series = new Array();
    var name = new Array();
    var data = new Array();
    name = namestr;
    data = datastr;
    for(var i=0;i<name.length;i++){      
    	series.push({"name": name[i], "data": data[i]});
    }
    return series;
}