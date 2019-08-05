

//var hisdata=[["已租","200"],["未租","100"]];//把参数传进来
//柱状图 
function histogram(data){
	var count=[];
	var total=0;
	var divCount=[];
	var color=["#336699","#999999","#EE7600","#EE3A8C","#C6E2FF","#8DB6CD","#8B5A00","#8A2BE2","#7FFF00"];
	for(var i=0;i<data.length;i++){
		count[i]=parseFloat(data[i][1]);
		total+=count[i];
	}
	for(var i=0;i<count.length;i++){
		divCount[i]=Math.round(count[i]/total*100);
	}
	$('.histogram').append("<div class='histogram_main' style='width:70%;height:100%;float:left'></div>");
	$('.histogram_main').append("<div class='histogram_main_center' style='margin-left:auto;margin-right:auto;height:100%;text-align:center'></div>");
	$('.histogram_main_center').css("width",divCount.length*50+"px");
	for(var i=0;i<divCount.length;i++){
		$('.histogram_main_center').append("<div id='his_"+i+"' style='width:30px;height:80%;float:left;margin-left:20px;'></div");
	}
	$('.histogram_main_center').append("<div style='float:clear;'></div");
	for(var i=0;i<divCount.length;i++){
		$('.histogram_main_center').append("<div style='width:30px;height:15%;float:left;color:"+color[i]+";margin-left:20px;'>"+data[i][1]+"</div");
	}
	$('.histogram').append("<div class='histogram_right' style='width:20%;height:100%;float:left;'></div>");
	for(var i=0;i<divCount.length;i++){
		$('.histogram_right').append("<div id='histogram_r' style='widht:55%;height:20px'><div>");
		$('#histogram_r').append("<div style='widht:60%;height:20px;color:"+color[i]+"'>"+data[i][0]+"<div>");
	}
	for(var i=0;i<divCount.length;i++){
		for(var j=0;j<100;j++){
			var hid="his_"+i;
			$('#'+hid).append("<div id='"+hid+j+"' style='width:100%;height:1%'></div>");
			if(j>100-divCount[i]){
				$("#"+hid+j).css("backgroundColor",color[i]);
			}
		}
	}
}