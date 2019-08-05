$(function() {
	//跳转
	$(".skipToChild").click(function(){
		var skipToChildVal = $(this).attr("skipToChild");
		if(skipToChildVal && skipToChildVal!=""){
			skipToChildVal = skipToChildVal.replace(/[\r\n]/g,"").replace("\t","").split(";");
			parent._skipFunction.push(skipToChildVal[3]);
			window.parent.addTab(skipToChildVal[0],skipToChildVal[1]+".jsp","icon icon-"+skipToChildVal[2]);
		}
	});
	for(var i in speedDivArray){
		var topDiv = speedDivArray[i].top.split(";");
		var topPuriview = getModelPurivew( topDiv[0]+","+topDiv[1] , _loginPurview);
		var imgFlag = 0;
		if(topPuriview==0){
			$("#"+topDiv[0]+topDiv[1]+"_top").attr("skipToChild","");
		}
		
		for(var j in speedDivArray[i].mid){
			var midDiv = speedDivArray[i].mid[j].split(";");
			var midPuriview = getModelPurivew( midDiv[0]+","+midDiv[1] , _loginPurview);
			if(midPuriview==0 || midPuriview[midDiv[2]]==0){
				$("#"+midDiv[0]+midDiv[1]+midDiv[2]+"_mid").remove();
			}else{
				imgFlag++;
			}
		}
		$("#"+topDiv[0]+topDiv[1]+"_shuxian").css("height",imgFlag*32+"px")
	}
	resizeSpeed();
	window.onresize = function() {
		resizeSpeed();
	};
	function resizeSpeed(){
		var divH = $(".speed_do_div").height();
		var jspH =  parent.$(window).height()-80;
		var topPx = 0;
		if(divH<jspH){
			topPx = (jspH-divH)/2;
		}
		$(".speed_do_div").css("margin-top",topPx+"px");
	}
});