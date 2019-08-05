var detailedAddress='';
var hsLeaseState='';
var deviceType='';
var devAuthId='';
var devDifference='';
var status='2';
var subDeviceNumber;
$(function() {
	$('#selectTime').hide();
	//初始化列表
	$('#EnergyDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			console.log(rowData);
                detailedAddress = rowData.detailedAddress;
                hsLeaseState = rowData.hsLeaseState;
                deviceType = rowData.deviceType;
                devAuthId = rowData.devAuthId;
                devDifference = rowData.devDifference;
                subDeviceNumber = rowData.devRoad;
                deviceDetails(detailedAddress,hsLeaseState,deviceType,devAuthId,devDifference,subDeviceNumber);
                loadData(devAuthId,deviceType,status,subDeviceNumber);
            $('#selectTime').show();
		},
		checkOnSelect:true,
	});
	
	queryWEMHouseStore(_pageNum[0], 0);
	
	$("#paixu1,#paixu2,#paixu3").click(function(){
		$(this).addClass('select');
		if($(this).siblings().hasClass('select')) {
			$(this).siblings().removeClass('select');
		}
		status = $(this).attr('data-status');
		loadData(devAuthId,deviceType,status,subDeviceNumber);
	});
})

//分页统计总条数
function getenergyPageCount(page){
	var pageSize = 16;
	var devBrandId = 20;
//	var devId = $("#deviceType").val();
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
	$.post("../queryWEDeviceHouseStore.action",{
		devFirstType :devFirstType,
		devSecondType :devSecondType,
		devBrandId: devBrandId,
		hsAddCommunity: addCommunity,
		hsAddBuilding: addBuilding,
		hsAddDoorplateno: addDoorplateno,
		hsAddCity: AddCity,
	},function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"energy",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"energy",0);
		}
	});
}

function queryWEMHouseStore(page, type){
	var startNum = (parseInt(page) - 1) * 16;
	var endNum = 16;
	
//	var devId = $("#deviceType").val();
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
	$.post("../queryWEDeviceHouseStore.action",{
		devFirstType :devFirstType,
		devSecondType :devSecondType,
		hsAddCommunity: addCommunity,
		hsAddBuilding: addBuilding,
		hsAddDoorplateno: addDoorplateno,
		hsAddCity: AddCity,
		startNum: startNum,
		endNum: endNum
	},function(data) {
		if (data.code<0){
			// sourcePage(0, 0, 0);
			$('#EnergyDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryWEMHouseStore","energy");
			}else{
				notCountPage(page, 0 ,"queryWEMHouseStore","energy");
			}
		}else{
			data=data.body;
			// if (page == 1 && type == 0) {
			// 	_indexNum[0] = 0;
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryWEMHouseStore","energy");
			}else{
				notCountPage(page, 1 , "queryWEMHouseStore","energy");
			}
			for (var i in data) {
				var hsAddCommunity = data[i].hsAddCommunity != undefined ? data[i].hsAddCommunity : "";
				var hsAddBuilding = data[i].hsAddBuilding != undefined ? data[i].hsAddBuilding : "";
				var hsAddDoorplateno = data[i].hsAddDoorplateno != undefined ? data[i].hsAddDoorplateno : "";
				data[i].detailedAddress = hsAddCommunity + " " + hsAddBuilding + " " + hsAddDoorplateno;
				if (data[i].devFirstType == 15 && data[i].devSecondType == 15){
					data[i].deviceType = "智能电表";
				}else if (data[i].devFirstType == 14 && data[i].devSecondType == 14){
					data[i].deviceType = "智能水表";
				}else if (data[i].devFirstType == 16 && data[i].devSecondType == 16){
					data[i].deviceType = "智能电箱";
				}
				if (data[i].devBrandId == 23 || data[i].devBrandId == 21){
					data[i].devAuthId = data[i].devSn;
				}
				if (data[i].devBrandId == 25){
					data[i].devAuthId = data[i].devAntDeviceId;
				}
			}
			$("#EnergyDg").datagrid("loadData", data);
		}
	}, "json");
}

//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 16);
		$("#energyPage").remove();
		$("#energyPageDiv").append("<div class='tcdPageCode' id='energyPage' style='text-align:center;'></div>");
		$("#energyPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					queryWEMHouseStore(p, 1);
				}
			}
		});
	}
	
}

function deviceDetails(detailedAddress,hsLeaseState,deviceType,devAuthId,devDifference,subDeviceNumber){
	$.post("../queryDeviceDetails.action",{
		devId: deviceType,
		devAuthId: devAuthId,
		devDifference: devDifference,
		jhdSubDeviceNumber: subDeviceNumber
	},function(data) {
		if (data.code<0){
			$('.Details').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
			return;
		}else{
			data = data.body;
			var src;
			var unit;
			$(".Details div").remove();
			for (var i in data) {
				if(deviceType == "智能电表" || deviceType == "智能电箱"){
					src = "img/electricMeter.png";
					unit = "KWh";
				}else{
					src = "img/waterMeter.png";
					unit = "m³";
				}
				var newTime = data[i].time.substr(0,data[i].time.length-5);
				$(".Details").append(
						'<div style="width:340px;height:300px;margin:10px auto">'+
						'	<div style="width: 110px;height: 110px;float: left;">'+
						'		<img src="'+src+'" alt="" style="width:90px;height:90px;margin:5px 5px 5px 10px;" />'+
						'	</div>'+
						'	<div style="width: 230px;float: left;margin:10px 0 0 0">'+
						'		<p style="margin:5px 5px 5px 5px;font-size:16px">设备类型：<span style="font-size:16px;">'+deviceType+'</span></p>'+
						'		<p style="margin:5px 5px 5px 5px;font-size:16px">设备SN：<span style="font-size:16px;">'+devAuthId+'</span></p>'+
						'		<p style="margin:5px 5px 5px 5px;font-size:16px">最后通讯：<span style="font-size:16px;">'+newTime+'</span></p>'+
						'	</div>'+
						'	<div style="clear:both;margin:10px 0 0 10px;"></div>'+
						'		<p style="margin:5px 10px 5px 10px;font-size:16px" ">详细地址：<span style="font-size:16px; ">'+detailedAddress+'</span></p>'+
						'		<p style="margin:5px 10px 5px 10px;font-size:16px; ">租赁状态：<span style="font-size:16px; ">'+hsLeaseState+'</span></p>'+
						'		<p style="margin:5px 10px 5px 10px;font-size:16px ">最新读数：<span style="font-size:16px; ">'+data[i].Num+'</span>&nbsp'+unit+'</p>'+
						'		<p style="margin:5px 10px 5px 10px;font-size:16px ">本月用量：<span style="font-size:16px; ">'+data[i].theMonthDosage+'</span>'+unit+'</p>'+
						'		<p style="margin:5px 10px 5px 10px;font-size:16px ">上月用量：<span style="font-size:16px; ">'+data[i].lastMonthDosage+'</span>'+unit+'</p>'+
						'</div>	'
				);
			}
		}
	});
	
}

function loadData(devAuthId,deviceType,status,subDeviceNumber) {
	if(status == '2'){
		/*按30天查*/
		$.get("../getDeviceChange.action", {
			devAuthId: devAuthId,
			devId: deviceType,
            jhdSubDeviceNumber: subDeviceNumber
		},function(data) {
			if (data.code<0) {
				$('#thisYear').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
			} else {
				data = data.body;
				var time = [];
				var myDate = new Date();
				for(var i = 29; i >= 0; i--){
					var preDate = new Date(myDate.getTime() - i*24*60*60*1000).format("yy-MM-dd");
					time.push(preDate);
				}
				var title = '近30天的设备用量差值';
				loadhighcharts(data,deviceType,time,title);
			}
		}, "json");
	}else if(status == '1'){
		/*按24小时查*/
		$.get("../getDeviceChangeHour.action", {
			devAuthId: devAuthId,
			devId: deviceType,
            jhdSubDeviceNumber: subDeviceNumber
		},function(data) {
			if (data.code<0) {
				$('#thisYear').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
			} else {
				data = data.body;
				var time = [];
				var myDate = new Date();
				for(var i = 23; i >= 0; i--){
					var preDate = new Date(myDate.getTime() - i*60*60*1000).format("hh")+":00";
					time.push(preDate);
				}
				var title = '近24小时的设备用量差值';
				loadhighcharts(data,deviceType,time,title);
			}
		}, "json");
	}else if(status == '3'){
		/*按12个月查*/
		$.get("../getDeviceChangeMonth.action", {
			devAuthId: devAuthId,
			devId: deviceType,
            jhdSubDeviceNumber: subDeviceNumber
		},function(data) {
			if (data.code<0) {
				$('#thisYear').html("<div style='font-size:15px;font-family:微软雅黑;color:#50b4d2;text-align:center;'>"+data.msg+"</div>");
			} else {
				data = data.body;
				var time = [];
				var myDate = new Date();
				for(var i = 10; i >= 0; i--){
					var preDate = new Date(myDate.setMonth(myDate.getMonth()-1)).format("yyyy-MM");
					//time.push(preDate);
					time[i] = preDate
				}
				var date = new Date();
				time.push(new Date(date.getTime()).format("yyyy-MM"));
				var title = '近12个月的设备用量差值';
				loadhighcharts(data,deviceType,time,title);
			}
		}, "json");
	}
}

function loadhighcharts(data,deviceType,time,title) {
	var description = "";
	var device = "";
	var unit = "";
	if(deviceType == "智能水表"){
		description = "水表用量(m³)";
		unit = "m³";
	}else{
		description = "电表用量(KWh)";
		unit = "KWh";
	}
	
	$('#thisYear').highcharts(
			{
				chart:{height:300},
				title : {
					text : title,
				},
				subtitle : {
					text : 'Source: www.fangzhizun.com',
				},
				xAxis : {
					categories : time,
					crosshair : true
				},
				yAxis : [ {
					title : {
						text : description
					},
				} ],
				tooltip : {
					shared : true
				},
				series : [ {
					name : deviceType+'用量',
					type : 'spline',
					data : data,
					yAxis : 0,
					tooltip : {
						valueSuffix : ' '+unit
					},
					color : '#90ed7d'
				}]
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