$(function (){
	
	    $('#typeTime').find('option:selected').text("月");
		//昨天的时间
		var fromTime = '1980-01-01';
		var toTime = '';
		toTime = formatTime(getNowFormatDate(), 2);
		var yesterday = new Date(toTime);
		var sDay = 1;
		yesterday.setDate(yesterday.getDate()-sDay);
		fromTime = formatDate(yesterday);
		$('#date').val(fromTime);

		$.post("../queryClick58TypeDistrict.action", {
		
		}, function(cdata){		
					for (var i in cdata) {
						$('#typeDistrict').append(
						"<option value='" + i + "'>" + cdata[i].type_district + "</option>");		
					}
					load();			
		}, "json");	
		
});
function load(){
	$('#monthy').empty();
	$('#year').empty();
	$('#yearMonth').empty();
	$('#yearQuarter').empty();
	$('#quarter').empty();
	
	var typeCondition= $('#typeCondition').find('option:selected').text();
	var typeDistrict = $('#typeDistrict').find('option:selected').text();
	var type = $('#typeTime').find('option:selected').text();
	var date = $('#date').val();

	if(type == '日'){
		$('#yearDiv').css('display','none');
		$('#quarterDiv').css('display','none');
		$('#yeaQuarterDiv').css('display','none');
		$('#yeaMonthDiv').css('display','none');
		$('#monthyDiv').css('display','none');
		$('#yeaMonth').css('display','none');
		$('#dateDiv').css('display','');	
		$.post("../queryClick58Note.action", {
			type_condition : typeCondition,
			type_district : typeDistrict,
			type : type,
			date : date
		}, function(data){
			if(data == null || data == '' || data <= 0){	
				$('#main').html("<div style='margin:50px 0 0 0;width:100%;height:200px;text-align:center;'>没有查询到相关的数据！</div>");
				$('#zhexian').empty();
			}else{
				show(data);	
			}
		}, "json");
	}else if(type == '月'){
		$('#yeaMonthDiv').css('display','');
		$('#yearDiv').css('display','none');
		$('#quarterDiv').css('display','none');
		$('#yeaQuarterDiv').css('display','none');
		$('#monthyDiv').css('display','');
		$('#dateDiv').css('display','none');

		$.post("../queryClick58Year.action", {
			type : type
		}, function(Yeardata){	
			var oDate = new Date(); //实例一个时间对象
			var sysYeardata = oDate.getFullYear();
			for(var i in Yeardata) {
				var yearMonth = Yeardata[i].date.slice(0,4);		
				if(yearMonth == sysYeardata){
					$('#yearMonth').append(
							"<option value='" + oDate.getFullYear() + "' selected='selected' >" + oDate.getFullYear() + "</option>");
				}else{
					$('#yearMonth').append(
							"<option value='" + i + "'>" + yearMonth + "</option>");
				}
			}
			dateMonthy();
		}, "json");
	}else if(type == '季'){	
		$('#yeaMonthDiv').css('display','none');
		$('#yearDiv').css('display','none');
		$('#monthyDiv').css('display','none');
		$('#dateDiv').css('display','none');
		$.post("../queryClick58Year.action", {
			type : type
		}, function(Yeardata){	
			if(Yeardata != -1){
				$('#yeaQuarterDiv').css('display','');
				$('#quarterDiv').css('display','');
				var oDate = new Date(); //实例一个时间对象
				var sysYearQuarter = oDate.getFullYear();
				for (var i in Yeardata) {
					var year = Yeardata[i].date.slice(0,4);
					if(year == sysYearQuarter){
						$('#yearQuarter').append(
								"<option value='" + oDate.getFullYear() + "' selected='selected' >" + oDate.getFullYear() + "</option>");
					}else{
						$('#yearQuarter').append(
								"<option value='" + i + "'>" + year + "</option>");
					}

				}
				quarter();
			}else{
				$('#year').empty();	
				$('#main').html("<div style='margin:50px 0 0 0;width:100%;height:200px;text-align:center;'>没有查询到相关的数据！</div>");
				$('#zhexian').empty();
			}
		}, "json");
	}else if(type == '年'){
		$('#yeaQuarterDiv').css('display','none');
		$('#yeaMonthDiv').css('display','none');
		$('#quarterDiv').css('display','none');
		$('#monthyDiv').css('display','none');
		$('#dateDiv').css('display','none');	
		
		$.post("../queryClick58Year.action", {
			type : type
		}, function(Yeardata){
			if(Yeardata != '-1'){
				$('#yearDiv').css('display','');
				var oDate = new Date(); //实例一个时间对象
				var sysYear = oDate.getFullYear();
				for (var i in Yeardata) {
					var year = Yeardata[i].date.slice(0,4);
					if(year == sysYear){
						$('#year').append(
								"<option value='" + oDate.getFullYear() + "' selected='selected' >" + oDate.getFullYear() + "</option>");
					}else{
						$('#year').append(
								"<option value='" + i + "'>" + year + "</option>");
					}
				}
				dateYear();
			}else{
				$('#year').empty();	
				$('#main').html("<div style='margin:50px 0 0 0;width:100%;height:200px;text-align:center;'>没有查询到相关的数据！</div>");
				$('#zhexian').empty();
			}
		}, "json");
	}
}

function dateYear(){
	var typeCondition= $('#typeCondition').find('option:selected').text();
	var typeDistrict = $('#typeDistrict').find('option:selected').text();
	var type = $('#typeTime').find('option:selected').text();
	var year = $('#year').find('option:selected').text();
	var date = year + '-' + '01' + '-' + '01';
	$.post("../queryClick58Note.action", {
		type_condition : typeCondition,
		type_district : typeDistrict,
		type : type,
		date : date
	}, function(data){
		if(data == null || data == '' || data <= 0){	
			$('#main').html("<div style='margin:50px 0 0 0;width:100%;height:200px;text-align:center;'>没有查询到相关的数据！</div>");
			$('#zhexian').empty();

		}else{
			show(data);	
		}
	}, "json");
}

function quarter(){	
	$('#quarter').empty();	
	var typeCondition= $('#typeCondition').find('option:selected').text();
	var typeDistrict = $('#typeDistrict').find('option:selected').text();
	var type = $('#typeTime').find('option:selected').text();
	var year = $('#yearQuarter').find('option:selected').text();
	
	$.post("../queryClick58Quarter.action", {
		type : type,
		date : year
	}, function(Quarterdata){
		if(Quarterdata != '-1'){
			var oDate = new Date(); //实例一个时间对象
			var sysMonth = oDate.getMonth();
			for (var i in Quarterdata) {
				var quarterStr = Quarterdata[i].date.substring(5,7);

				if(quarterStr == '01' || quarterStr == '02' || quarterStr == '03'){		
					quarterStr = '第一季度';
				}
				if(quarterStr == '04' || quarterStr == '05' || quarterStr == '06'){		
					quarterStr = '第二季度';
				}
				if(quarterStr == '07' || quarterStr == '08' || quarterStr == '09'){		
					quarterStr = '第三季度';
				}
				if(quarterStr == '10' || quarterStr == '11' || quarterStr == '12'){		
					quarterStr = '第四季度';
				}
				
				if(sysMonth == '01' || sysMonth == '02' || sysMonth == '03'){
					$('#quarter').append(
							"<option value='" + quarterStr + "' selected ='selected'>" + quarterStr + "</option>");
				}else if(sysMonth == '01' || sysMonth == '02' || sysMonth == '03'){
					$('#quarter').append(
							"<option value='" + quarterStr + "' selected ='selected'>" + quarterStr + "</option>");
				}else if(sysMonth == '04' || sysMonth == '05' || sysMonth == '06'){
					$('#quarter').append(
							"<option value='" + quarterStr + "' selected ='selected'>" + quarterStr + "</option>");
				}else if(sysMonth == '07' || sysMonth == '08' || sysMonth == '09'){
					$('#quarter').append(
							"<option value='" + quarterStr + "' selected ='selected'>" + quarterStr + "</option>");
				}else if(sysMonth == '10' || sysMonth == '11' || sysMonth == '12'){
					$('#quarter').append(
							"<option value='" + quarterStr + "' selected ='selected'>" + quarterStr + "</option>");
				}else{
					$('#quarter').append(
							"<option value='" + i + "'>" + quarterStr + "</option>");
				}			
			}
			quarterLink();
		}else{
			$('#main').html("<div style='margin:50px 0 0 0;width:100%;height:200px;text-align:center;'>没有查询到相关的数据！</div>");
			$('#zhexian').empty();
		}
	}, "json");
}
function quarterLink(){	
	var typeCondition= $('#typeCondition').find('option:selected').text();
	var typeDistrict = $('#typeDistrict').find('option:selected').text();
	var type = $('#typeTime').find('option:selected').text();
	var year = $('#yearQuarter').find('option:selected').text();
	
	var quarter = $('#quarter').find('option:selected').text();
	var date = '';
	if(quarter == '第一季度'){
		date = year + '-01-01';
	}
	if(quarter == '第二季度'){
		date = year + '-04-01';
	}
	if(quarter == '第三季度'){
		date = year + '-07-01';
	}
	if(quarter == '第四季度'){
		date = year + '-10-01';
	}

	$.post("../queryClick58Note.action", {
		type_condition : typeCondition,
		type_district : typeDistrict,
		type : type,
		date : date
	}, function(data){
		if(data == null || data == '' || data <= 0){	
			$('#main').html("<div style='margin:50px 0 0 0;width:100%;height:200px;text-align:center;'>没有查询到相关的数据！</div>");
			$('#zhexian').empty();
		}else{
			show(data);	
		}
	}, "json");
}
function dateMonthy(){
	$('#monthy').empty();
	var type = $('#typeTime').find('option:selected').text();
	var year = $('#yearMonth').find('option:selected').text();
	
		$.post("../queryClick58Month.action", {
			type : type,
			date : year
		}, function(Monthdata){	
			if(Monthdata != "-1"){
				var oDate = new Date(); //实例一个时间对象
				var sysMonth = oDate.getMonth();
				for (var i in Monthdata) {
					var monthy = Monthdata[i].date.slice(5,7);
					if(monthy == sysMonth){
						$('#monthy').append(
								"<option value='" + sysMonth + "' selected= 'selected' >" + monthy + "</option>");
					}else{
						$('#monthy').append(
								"<option value='" + i + "'>" + monthy + "</option>");	
					}			
				}	
				monthyLink();
			}

		}, "json");
}
function monthyLink(){
	var typeDistrict = $('#typeDistrict').find('option:selected').text();
	var type = $('#typeTime').find('option:selected').text();
	
	var year = $('#yearMonth').find('option:selected').text();
	var monthy = $('#monthy').find('option:selected').text();
	
	var dateTime = year + '-' + monthy + '-' + '01';	
	$.post("../queryClick58Note.action", {
		type_district : typeDistrict,
		type : type,
		date : dateTime
	}, function(data){
		if(data == null || data == '' || data <= 0){	
			$('#main').html("<div style='margin:50px 0 0 0;width:100%;height:200px;text-align:center;'>没有查询到相关的数据！</div>");
			$('#zhexian').empty();
		}else{
			show(data);	
		}
	}, "json");
}
function show(data){
	$('#zhexian').css('display','none');
	$('#main').empty();
	var num = 0;
	var arr = new Array();
	
	for(var b=0;b<data.length;b++){	
		if(arr.indexOf(data[b].type_ff+data[b].type_condition) == -1){
			arr[num] = data[b].type_ff+data[b].type_condition;
			num +=1;
		}
	}

	var zhexian_title = '';
	var zhexian_identify = 0;
	var zhexian_note = '';
	var zhexian_textNum = 0;		
	var zhexian_xaxisArr = [];
	var zhexian_nameArr = [];
	var zhexian_textArr = [];

	for(var i=0;i<num;i++){
		var ID = '';
		var identify = 0;
		var note = '';
		var textNum = 0;		
		var xaxisArr = [];
		var nameArr = [];
		var textArr = [];		

		for(var j=0;j<data.length; j++){

			if(data[j].identify == '1'){			
				if(data[j].type_ff+data[j].type_condition == arr[i]){
					zhexian_identify = data[j].identify;
					zhexian_note =data[j].type_district + data[j].type_ff + data[j].type_condition;
					
					var xaxis=data[j].xaxis;	
					zhexian_xaxisArr = xaxis.split(",");
					
					zhexian_nameArr[zhexian_textNum] = data[j].type_ff + '发帖浏览量';
					zhexian_textArr[zhexian_textNum] = data[j].text;
					zhexian_title = data[j].note;
					zhexian_title = data[j].type_district+zhexian_title.substring(4,zhexian_title.length);
					zhexian_textNum++;
				}
			}else if(data[j].identify == '2'){
				if(data[j].type_ff+data[j].type_condition == arr[i]){
					ID = 'showSpace'+i;
					identify = data[j].identify;
					note =data[j].type_district + data[j].type_ff + data[j].type_condition;
					
					var xaxis=data[j].xaxis;	
					xaxisArr = xaxis.split(",");
					
					if(data[j].note.indexOf("平均") > 0){
						nameArr[textNum] = '平均浏览量统计';
					}else if(data[j].note.indexOf("总量") > 0){
						nameArr[textNum] = '浏览总量统计';
					}

					
					textArr[textNum] = data[j].text;
					textNum ++;
				}
			}
		}
		note  = note + '浏览量数据统计';
		var dataIntArr=[];//保存转换后的整型字符串  
		for(var k=0 ;k<textArr.length ;k++){
			var str = textArr[k].split(",");
			str.forEach(function(data,index,arr){  
			      dataIntArr.push(+data);  
			 });  
			textArr[k] = dataIntArr;
			dataIntArr=[];
		}
		if(identify == 2){	
			$('#main').append("<div id='" + ID +"' style='width:33%;height:auto;float:left;'></div>");
			zhuxingChart(xaxisArr,nameArr,textArr,note,ID);
		}
		
	}
	
	zhexian_note  = zhexian_note + '数据统计';
	var dataIntArr=[];//保存转换后的整型字符串  
	for(var k=0 ;k<zhexian_textArr.length ;k++){
		var str = zhexian_textArr[k].split(",");
		str.forEach(function(data,index,arr){  
		      dataIntArr.push(+data);  
		 });  
		zhexian_textArr[k] = dataIntArr;
		dataIntArr=[];
	}
	if(zhexian_identify == 1){	
		zhexianChart(zhexian_xaxisArr,zhexian_nameArr,zhexian_textArr,zhexian_title);
		$('#zhexian').css('display','');
	}


	
}

function zhexianChart(xaxis,name,text,note) {
	$('#zhexian').highcharts({
        title: {
            text: note,
            x: -20 //center
        },
        subtitle: {
            text: 'Source: www.fangzhizun.com',
            x: -20
        },
        xAxis: {
            categories: xaxis
        },
        yAxis: {
            title: {
                text: '浏览量(次)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '次'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: create(name,text)

    });
}

function create(nameArray,tArray){
    var series = new Array();
    for(var i=0;i<nameArray.length;i++){ 
    	series.push({"name": nameArray[i], "data": tArray[i]});
    }
    return series;
}
function zhuxingChart(xaxis,nameArr,textArr,note,ID){
	$('#'+ID).highcharts({
	        chart: {
	            zoomType: 'xy'
	        },
	        title: {
	            text: note
	        },
	        xAxis: [{
	            categories: xaxis,
	            crosshair: true
	        }],
	        yAxis: [{ // Primary yAxis
	            labels: {
	                format: '{value}次',
	                style: {
	                    color: Highcharts.getOptions().colors[1]
	                }
	            },
	            min: 0,                                //控制数轴的最小值
	            title: {
	                text: nameArr[0],
	                style: {
	                    color: Highcharts.getOptions().colors[1]
	                }
	            }
	        }, { // Secondary yAxis
	            title: {
	                text: nameArr[1],
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                }
	            },
	            min: 0,                                //控制数轴的最小值
	            labels: {
	                format: '{value} 次',
	                style: {
	                    color: Highcharts.getOptions().colors[0]
	                }
	            },
	            opposite: true
	        }],
	        tooltip: {
	            shared: true
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'left',
	            x: 80,
	            verticalAlign: 'top',
	            y: 20,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	        },
	        series: [{
	            name: nameArr[0],
	            type: 'column',
	            yAxis: 1,
	            data: textArr[0],
	            tooltip: {
	                valueSuffix: ' 次'
	            }
	        }, {
	            name: nameArr[1],
	            type: 'spline',
	            data: textArr[1],
	            tooltip: {
	                valueSuffix: '次'
	            }
	        }]
	    });
}
