$(function() {
	
	//初始化列表
	$('#AlarmDg').datagrid({
		checkOnSelect:true,
	});
		acsQueryAlarmRecord();
	setInterval("acsQueryAlarmRecord()",1000);
	loadData();

	setInterval("loadData()",1800000);

	queryAlarmRecord(_pageNum[0], 0);
	unprocessedAlarm();
	setInterval("unprocessedAlarm()",1000);

	searchTimer = setInterval("noticeUp('.notice ul','-300px',500)", 3000);
	
	$(".wrap").mouseover(function(){
		clearTimeout(searchTimer);
	});
	$(".wrap").mouseout(function(){
		searchTimer = setInterval("noticeUp('.notice ul','-300px',500)", 3000);
	});
	
	$("#AlarmDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$("#index").val(rowIndex);
			handleResult(rowData);
		}
	});
})

function noticeUp(obj,top,time) {
	if($("ul > li").length == 1){
		return;
	}
	 $(obj).animate({
		 marginTop: top
	 }, time, function () {
		 $(this).css({marginTop:"0"}).find(":first").appendTo(this);
	 })
}

function acsQueryAlarmRecord(){
	$.post("../acsQueryAlarmRecord.action",{
		
	},function(data){
		if(data.code<0){
			myTips(data.msg);
		}
	});
}

var data1;
function queryAlarmRecord(page, type){
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var devFirstType = $("#deviceType").val();
	var devSecondType = $("#deviceType").val();
	if ($("#publicArea").val() != null && $("#publicArea").val() != ''){
		var addCommunity = $("#publicArea").val();
		var addBuilding = null;
		var addDoorplateno = null;
		var AddCity = "公区";
	}else{
		var addCommunity = $("#addCommunity").val();
		var addBuilding = $("#addBuilding").val();
		var addDoorplateno = $("#addDoorplateno").val();
		var AddCity = "";
	}
	$.post("../queryAlarmRecord.action",{
		devFirstType: devFirstType,
		devSecondType: devSecondType,
		hsAddCommunity: addCommunity,
		hsAddBuilding: addBuilding,
		hsAddDoorplateno: addDoorplateno,
		addCity: AddCity,
		startNum: startNum,
		endNum: endNum
	},function(data) {
		if (data.code<0){
			sourcePage(0, 0, 0);
			$('#AlarmDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			
		}else{
			data=data.body;
			console.log(data);
			data1 = data;
			if (page == 1 && type == 0) {
				_indexNum[0] = 0;
				sourcePage(data[0].totalNum, page, 0);
			}
			for (var i in data) {
				
				data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
				if(data[i].jdwWarningTime == '' || data[i].jdwWarningTime == null){
					data[i].jdwWarningTime = data[i].jdwTime;
				}
			}
			$("#AlarmDg").datagrid("loadData", data);
		}
	}, "json");
}

//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 20);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#alarmPage").remove();
		$("#alarmPageDiv").append("<div class='tcdPageCode' id='alarmPage' style='text-align:center;'></div>");
		$("#alarmPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					queryAlarmRecord(p, 1);
				}
			}
		});
	}
	
}

function newestHandleResult(value, row, index){
	if(row.jdwHandleResult != null && row.jdwHandleResult != ''){
		var str = row.jdwHandleResult.getRealJsonStr();
		var handleResult = eval('(' + str + ')');
		var newestHandleResult = handleResult[handleResult.length - 1].proMark;
		return "<span title='" + newestHandleResult + "'>" + newestHandleResult + "</span>";
	}else{
		return '';
	}
}

function alarmMerge(){
	if ($('#merge').prop('checked')){
		var saDeviceSn;
		var time;
		console.log(data1);
		for (var i=0 ; i< data1.length;i++){
			if (data1[i].saDeviceSn == saDeviceSn){
				var time1 = (new Date(data1[i].saTime)).getTime()/1000;
				if (time <= time1 && time1 < (time+600)){
					data1.splice(i,1);
					i--;
				}else{
					time = (new Date(data1[i].saTime)).getTime()/1000;
				}
			}else{
				saDeviceSn = data1[i].saDeviceSn;
				time = (new Date(data1[i].saTime)).getTime()/1000;
			}
		}
		$("#AlarmDg").datagrid("loadData", data1);
	}else{
		queryAlarmRecord(_pageNum[0], 0);
	}
}

function unprocessedAlarm(){
	var audio = $("#music")[0];
	$.post("../unprocessedAlarm.action",{
	},function(data) {
		if (data.code<0){
			audio.pause();
			$('.notice ul').html("<li><div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+ data.msg+"</div></li>");
			return;
		}else{
			data = data.body;
			console.log(data);
			$('.notice ul li').remove();
			if(data.length == 0){
				audio.pause();
				$('.notice ul').html("<li><div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>暂无警情</div></li>");
			}else{
				audio.play();
			}
			for (var i in data) {
				var hsAddCommunity = data[i].hsAddCommunity != undefined ? data[i].hsAddCommunity : "";
				var hsAddBuilding = data[i].hsAddBuilding != undefined ? data[i].hsAddBuilding : "";
				var hsAddDoorplateno = data[i].hsAddDoorplateno != undefined ? data[i].hsAddDoorplateno : "";
				data[i].detailedAddress = hsAddCommunity + " " + hsAddBuilding + " " + hsAddDoorplateno;
				//data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
				var url;
				var text1;
				var text2;
				var text3;
				
				if(data[i].hsLeaseState == "空置未租" || data[i].hsLeaseState == "正在转租" || data[i].hsLeaseState == "到期不续" || data[i].hsLeaseState == "毁约待租"){
					text1 = data[i].hsLeaseState;
				}else if (data[i].hsLeaseState == "短租房"){
					if(data[i].residentCount){
						data[i].residentCount = parseInt(data[i].residentCount) + 1;
						text1 = data[i].renterPopName+'</span>&nbsp:&nbsp<span style="font-size:16px;">'+data[i].renterPopTelephone;
					}else{
						text1 = '空置短租房';
					}
				}else{
					data[i].residentCount = parseInt(data[i].residentCount) + 1;
					text1 = data[i].renterPopName+'</span>&nbsp:&nbsp<span style="font-size:16px;">'+data[i].renterPopTelephone;
				}
				if(data[i].jdwType == 0){
					if(data[i].devNickname =="红外报警器"){
						url="img/hongwai.png";
					}else if(data[i].devNickname =="水浸报警器"){
                        url="img/shuijin.png";
					}else if(data[i].devNickname =="燃气报警器"){
                        url="img/ranqi.png";
					}else if(data[i].devNickname =="门磁报警器"){
                        url = "img/menci.png";
					}else{
                        url = "img/yangan.png";
					}
					text2 = '今天报警&nbsp:&nbsp<span style="font-size:14px;">'+data[i].count+'</span>次'
				}else if(data[i].jdwType == 1){
					url = "img/waterMeter.png";
					text2 = '当日用水量高于昨日用水量<span style="font-size:14px;">'+data[i].waterDailyVariable+'</span>立方';
				}else if(data[i].jdwType == 2){
					url = "img/waterMeter.png";
					text2 = '连续用水时间超过设定时间<span style="font-size:14px;"></span>';
				}else{
					url="img/dianxiang.png";
					var waring = data[i].jdwFailureCause;
                    text2 = '故障原因：<span style="font-size:14px;">'+waring+'</span>';
				}
				
				if(!data[i].residentCount){
					data[i].residentCount = 0;
				}
				
				$(".notice ul").append(
						'	 <li>'+
						'		<div style="width:300px;height:300px;margin:5px auto">'+
						'			<span><img src='+url+' alt="" style="width:90px;height:90px;margin:0px 10px 5px 5px;"/></span> 		   '+
						'			<p style="margin:-100px 5px 5px 120px;font-size:15px">安装位置&nbsp:&nbsp<span style="font-size:14px;"></span></p>'+
						'			<p style="margin:5px 5px 5px 120px;font-size:15px">设备SN&nbsp:&nbsp<span style="font-size:14px;">'+data[i].jdwSn+'</span></p>'+
						'			<p style="margin:5px 5px 5px 120px;font-size:15px">'+text2+'</p>'+
						'			<p style="margin:20px 10px 2px 30px;"><span style="font-size:16px;">'+data[i].detailedAddress+'</span></p>'+
						'			<p style="margin:5px 10px 2px 50px;font-size:16px;">登记在住<span style="font-size:16px;">'+data[i].residentCount+'</span>人</p>'+
						'			<p style="margin:5px 10px 5px 30px;font-size:16px"><span style="font-size:16px;">'+text1+'</span></p>'+
						'			<button type="button" class="btn btn-dispose" style="margin:20px 0px 20px 40%;width:55px;background-color:#49B030;color: white;" value="'+data[i].id+'" onclick="doHandle($(this).val())">处理</button>'+
						'		</div>'+
						'	</li>'
				);
				
			}
		}
	});
	
}

function doHandle(id){
	$.post("../handleAlarm.action",{
		jdwId: id,
	},function(data){
		if(data.code<0){
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}else{
			unprocessedAlarm();
			queryAlarmRecord(_pageNum[0], 0);
		}
	})
}

function handleResult(rowData){
	$('#handleAlarmDlg').dialog({
		title : '预警跟进',
		top : getTop(240),
		left : getLeft(540),
		width : 680,
		height : 350,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#showProgressTable").datagrid("loadData", []);
		}
	});
	var jdwId = rowData.id;
	$.post("../selectProgress.action",{
		jdwId: jdwId,
	},function(data){
		if(data.code<0){
			$('#showProgressTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data = data.body;
		console.log("data"+data);
		if(data[0].jdwHandleResult != null && data[0].jdwHandleResult != ''){
			var str = data[0].jdwHandleResult.getRealJsonStr();
			var handleResult = eval('(' + str + ')');
			$("#showProgressTable").datagrid("loadData",handleResult.reverse());
		}
	});
	$('#handleAlarmDlg').dialog("open");
}

function addProgress(){
	
	$("#addProgressDlg").dialog({
		title : '添加进展',
		top : getTop(200),
		left : getLeft(350),
		height : 200,
		width : 350,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addProgressDlg input").val('');
			$("#addProgressDlg textarea").val('');
		}
	});
	$(".add_pro_time").val(getNowFormatDate());
	$("#addProgressDlg").dialog('open');
}

//执行添加进展
function doAddProgress() {
	var row = $("#AlarmDg").datagrid("getSelected");
	var proTime = $(".add_pro_time").val();
	var proUserName = _loginUserName;
	var proMark = $(".add_pro_mark").val();
	var json = {
		proTime	:	proTime,
		proUserName	:	proUserName,
		proMark	:	proMark
	};
	var jsonStr = JSON.stringify(json);
	$.post("../addProgress.action",{
		jdwId	:	row.id,
		json	:	jsonStr
	},function(data){
		if(data.code<0){
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		$('#addProgressDlg').dialog("close");
		$('#handleAlarmDlg').dialog("close");
		queryAlarmRecord(_pageNum[0], 0);
	});
}

function handleAlarm(saDeviceSn){
	var result = $("#result").val();
	var cause = $("#cause").val();
	var handleResult = "报警原因："+cause+" ; 处理结果："+result;
	$.post("../handleAlarm.action",{
		devAuthId: saDeviceSn,
		handleResult: handleResult
	},function(data){
		if(data.code<0){
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}else{
			unprocessedAlarm();
			$('#handleResult').dialog("close");
			queryAlarmRecord(_pageNum[0], 0);
		}
	})
}



function loadData() {
	$.get("../getDeviceWarning.action", function(data) {
		if (data.code<0) {
			$('#thisYear').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
			$('#nextYear').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
		} else {
			data = data.body;
			loadhighcharts(data);
		}
	}, "json");
}

function loadhighcharts(data) {
	var hours = [];
	var Offline = [];
	var Online = [];
	var Warning = [];
	for (var i=1;i<=data.length;i++){
		Online.push(parseInt(data[data.length-i].sdwOnline));//在线
		Offline.push(parseInt(data[data.length-i].sdwOffline));//离线
		Warning.push(parseInt(data[data.length-i].sdwWarning));//警报
	}
	var myDate = new Date();
	var myDate = new Date();
	for(var i = 23; i >= 0; i--){
		var preDate = new Date(myDate.getTime() - i*60*60*1000).format("hh")+":00";
		hours.push(preDate);
	}
	console.log(hours);
	$('#thisYear').highcharts(
			{
				chart:{height:300},
				title : {
					text : '24小时设备情况',
				},
				subtitle : {
					text : 'Source: www.fangzhizun.com',
				},
				xAxis : {
					categories : hours,
					crosshair : true
				},
				yAxis : [ {
					title : {
						text : '设备数量(个)'
					},
				},  {
					title : {
						text : '设备报警次数(次)'
					},
					opposite : true
				} ],
				tooltip : {
					shared : true
				},
				series : [ {
					name : '在线',
					type : 'spline',
					data : Online,
					yAxis : 0,
					tooltip : {
						valueSuffix : ' 个'
					},
					color : '#90ed7d'
				}, {
					name : '离线',
					type : 'spline',
					data : Offline,
					yAxis : 0,
					tooltip : {
						valueSuffix : ' 个'
					},
				}, {
					name : '报警',
					type : 'spline',
					data : Warning,
					yAxis : 1,
					tooltip : {
						valueSuffix : ' 次'
					},
					color : '#F45b5b'
				} ]
			});
}



//搜索公区，清空楼盘、楼栋、门牌号输入框
$("#publicArea").keyup(function(){
	if($(this).val()!=''){
		$("#addCommunity").val('');
		$("#addBuilding").val('');
		$("#addDoorplateno").val('');
	}
});
//搜索楼盘、楼栋、门牌号输入框,清空公区输入框
$("#addCommunity,#addBuilding,#addDoorplateno").keyup(function(){
	if($(this).val()!=''){
		$("#publicArea").val('');
	}
});

