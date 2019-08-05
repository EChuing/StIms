$(function(){
	//加载下拉列表
	loadSelectList();
	//点击导航栏跳转
	$('#addBatchHsDlg .process-bar .process').on('click', function(){
		if ($(this).hasClass('active')) {
			var step = $(this).attr('data-step');
			gotoStep('addBatchHs', step);
            $('#centralizedApartmentParameterDg2').datagrid('loadData',[]);
		}
	});
	$(document).click(function(e) {
		choseSelectHide('buildingNameDiv',2);
		if($(e.target).attr('id')=="buildingName"){
			choseSelectHide('buildingNameDiv',1);
		}
		
	});
	//默认设置
	var today = new Date().format('yyyy-MM-dd');
	$('#addHsContractType').val('新签合同');
	$('#addHsInAdvancePay').val(0);//提前收租天数
	$('#addHsPaymentType').val('月付');//租金
	$('#outerFreeDaysBox').prop('checked', false);
	$('#outerFreeDays').hide();
	$('#addHsFreeDaysDecoration').val(0);
	$('#province').val(_loginCompanyRentProvince);
	_contractNumsArry = [];
	//城市
	console.log(_loginCompanyRentCity);
	$("#addNoTrusteeshipCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#addNoTrusteeshipCity").val(0);

	if(_NoOwner == 1){//无业主模式
	    $("#owner").hide();
	    $("#addHsLandlordName").removeAttr('require');
	    $("#addHsLandlordPhoneNum").removeAttr('require');
	    $("#addHsLandlordIdcard").removeAttr('require');
    }else{//有业主模式
        $("#owner").show();
    }
	//显示第一步的界面
	gotoStep('addBatchHs', 1);
});


//选城区查楼盘
function noZoneLink() {
	$("#addNoTrusteeshipZone").empty();
	$("#addNoTrusteeshipBuildingName").empty('');
	$("#addNoTrusteeshipStreet").val('');
	$("#addNoTrusteeshipZone").append("<option></option>");
	var cityText = '';
	var districtText = '';
	$("#buildingName").val('');
	$("#addNoTrusteeshipCity").val(0);
	cityText = $("#addNoTrusteeshipCity").find("option:selected").text();
	districtText = $("#addNoTrusteeshipDistrict").find("option:selected").text();
	if (districtText == '') {
		filteroption("addNoTrusteeshipBuildingName");
		return;
	}
	$.post("../queryForHouseDictAddress.action", {
	    hdCity : cityText,
		hdDistrict : districtText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$("#addNoTrusteeshipBuildingName").append("<option></option>");
		for (var i in data) {
			$("#addNoTrusteeshipBuildingName").append("<option value = '" + i + "'>" + data[i] + "</option>");
		}
		filteroption("addNoTrusteeshipBuildingName");
	});
}
//选楼盘查门牌规则
function noStreeLink() {
	$("#addNoTrusteeshipStreet").val('');
	$("#addNoTrusteeshipBuildingId").val('');
	$("#infoDoorplatenoRelus").text('');
	var cityText = '';
	var districtText = '';
	var zoneText = '';
	var buildNameText = '';
	cityText = $("#addNoTrusteeshipCity").find("option:selected").text();
	districtText = $("#addNoTrusteeshipDistrict").find("option:selected").text();
	zoneText = $("#addNoTrusteeshipZone").find("option:selected").text();
	buildNameText = $("#addNoTrusteeshipBuildingName").find("option:selected").text()
	if (buildNameText == '') {
		return;
	}
	choseSelectVal("buildingName", "addNoTrusteeshipBuildingName" ,"buildingNameDiv");
	$.post("../queryAllHouseDict.action",{
		hdCity : cityText,
		hdDistrict : districtText,
		hdZone : zoneText,
		hdCommunity : buildNameText
	},function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		$("#addNoTrusteeshipStreet").val(data[0].hdRoad);
		$("#addNoTrusteeshipBuildingId").val(data[0].hdId);
		$("#addHsHouseDictId").val(data[0].hdId);
		$("#addNoTrusteeshipZone").val(data[0].hdZone);
		$(".hd_doorplateno_relus").val(data[0].hdDoorplatenoRelus);
		var relusVal = data[0].hdDoorplatenoRelus;
		if(_doorplateno == 1){
			if (relusVal.split(',').length != 3) {//没有规则
				$("#doornoMsg").html('暂无门牌规则');
			}
		}
	});
}

//修改合同期限
function changeAddHsDate(){
	if ($('#addHsBegin').val() == '' || $('#addHsEnd').val() == '') {
		return;
	}
	var begin = new Date($('#addHsBegin').val());
	var end = new Date($('#addHsEnd').val());
	var date = new Date(begin);
	date.setDate(date.getDate() - 1);
	var term = getYearMonthDay($('#addHsBegin').val(), $('#addHsEnd').val());
	$('#addHsTerm').html('（' + term[0]+'年'+term[1]+'月'+term[2]+'日' + '）');
	var year = 0;//合同期限
	var isWholeYear = 1;//1表示整年，0表示非整年
	while(date < end){
		year++;
		date.setFullYear(date.getFullYear() + 1);
	}
	if (date.getTime() != end.getTime()) {
		isWholeYear = 0;
	}
	var beginTime = $("#addHsBegin").val();
	$('#priceLadderDiv').empty();
	for(var i=1;i<=year;i++){
		$('#priceLadderDiv').append(
			'<div style="margin:5px 0 0 0;"> ' + 
				'<lable style="display:inline-block;width:90px;"><span class="require">*</span>第'+i+'年租金：</lable> ' + 
				'<input class="updatePriceLadder" style="width:80px;" value="0" clear="clear" require="require">元/月 ' + 
				'<lable style="display:inline-block;width:104px;margin: 0 0 0 24px;"><span class="require">*</span>年内免租期：头</lable> ' + 
				'<input id="holidaySumBefor'+i+'" class="holidaySumBefor" value="0" style="width:30px;" clear="clear" type="number" onchange="changeRentFreeSegment('+i+',0)">天，尾 ' + 
				'<input id="holidaySumAfter'+i+'" class="holidaySumAfter" value="0" style="width:30px;" clear="clear" type="number" onchange="changeRentFreeSegment('+i+',1)">天 ' + 
				'<a class="easyui-linkbutton copy'+i+'" onclick="copyHolidaySum()">往下复用</a>' + 
				'<div><input style="display:none;" type="text" id="holidaySettingA'+i+'" clear="clear" class="rentFreeSegmentIndex"> ' + 
				'<input style="display:none;" type="text" id="holidaySettingB'+i+'" clear="clear"> ' + 
				'<input style="display:none;" type="text" id="holidaySettingC'+i+'" clear="clear"> ' + 
				'<input style="display:none;" type="text" id="holidaySettingD'+i+'" clear="clear"></div> ' + 
			'</div> '
		);
		$('#holidaySettingA' + i).val(renewalDate(beginTime, i, 0));
		if(isWholeYear == 1 || i < year){
			$('#holidaySettingD' + i).val(renewalDate(beginTime, i, 1));
		} else {
			$('#holidaySettingD' + i).val($('#addHsEnd').val());
		}
		if (year == 1 || i > 1) {
			$('.copy'+i).remove();
		}
		var beginTime = $("#holidaySettingA" + i).val();
		var days = $("#holidaySumBefor" + i).val();
		$("#holidaySettingB" + i).val(renewalDate(beginTime,days,3));
		var endTime = $("#holidaySettingD" + i).val();
		var days = $("#holidaySumAfter" + i).val();
		$("#holidaySettingC" + i).val(renewalDate(endTime,days,4));
	}
	$.parser.parse($('#priceLadderDiv'));
}


function nextStep(step){
	if (step == 2) {
		if (validateStep('addBatchHs', 2)) {
			var nameplan = [{
				planId: 1,
				plan: '数字楼层+数字房号'
			}, {
				planId: 2,
				plan: '数字楼层+字母房号'
			}, {
				planId: 3,
				plan: '楼层减一加A+数字房号'
			}, {
				planId: 4,
				plan: '楼层减一加A+字母房号'
			}, {
				planId: 5,
				plan: '楼层减一加A+数字房号减一加A'
			}, {
				planId: 6,
				plan: '数字楼层+数字房号减一加A'
			}];
			if ($('#centralizedApartmentRuleDg2').hasClass('datagrid-f')) {

			} else {
				$('#centralizedApartmentRuleDg2').datagrid({
					columns : [ [
					{
						field : 'community',
						title : '小区名',
						width : 20,
						align : 'center',
						editor: {
							type:'textbox',
							options:{
								precision:0,
								required:true,
							}
						}
					},
					{
						field : 'building',
						title : '栋/单元',
						width : 10,
						align : 'center',
						editor: {
							type:'textbox',
							options:{
								precision:0,
								required:true,
							}
						}
					},
					{
						field : 'beginFloor',
						title : '开始层数',
						width : 10,
						align : 'center',
						editor: {
							type:'numberbox',
							options:{
								precision:0,
								required:true,
							}
						}
					},
					{
						field : 'endFloor',
						title : '结束层数',
						width : 10,
						align : 'center',
						editor: {
							type:'numberbox',
							options:{
								precision:0,
								required:true,
							}
						}
					},
					{
						field : 'startRoomNum',
						title : '开始房间号',
						width : 10,
						align : 'center',
						editor: {
							type:'numberbox',
							options:{
								precision:0,
								required:true,
							}
						}
					},
					{
						field : 'endRoomNum',
						title : '结束房间号',
						width : 10,
						align : 'center',
						editor: {
							type:'numberbox',
							options:{
								precision:0,
								required:true,
							}
						}
					},
					{
						field : 'namePlan',
						title : '房号命名方案',
						width : 20,
						align : 'center',
						formatter:function(value){
							for(var i=0; i<nameplan.length; i++){
								if (nameplan[i].planId == value) return nameplan[i].plan;
							}
							return value;
						},
						editor:{
							type:'combobox',
							options:{
								valueField:'planId',
								textField:'plan',
								data:nameplan,
								required:true,
								editable:false
							}
						}
					} , {
						field : 'floorNumPrefix',
						title : '楼层前缀',
						width : 10,
						align : 'center',
						editor: {
							type:'textbox'
						}
					}, {
						field : 'roomNumPrefix',
						title : '房号前缀',
						width : 10,
						align : 'center',
						editor: {
							type:'textbox'
						}
					} ] ],
					width : '100%',
					height : '306px',
					singleSelect : true,
					autoRowHeight : false,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					toolbar : '#centralizedApartmentRuleTB2',
					onClickRow : onClickRow4
				});
			}
        }
	}else if(step == 3){
		var house = newCentralizedApartment('setCentralized');
		if (house == undefined || house == []) {
			return;
		}
		if(!validateStep('addBatchHs', 3)){
			return;
		}
		insertCentralized();
		var sectionType = [{value:''}];
		for (var i in _sectionType) {
			var item = {};
			item.value = _sectionType[i];
			sectionType.push(item);
		}
		var direction = [{value:''}];
		for (var i in _direction) {
			var item = {};
			item.value = _direction[i];
			direction.push(item);
		}
		var State=[{value:''}];
		for(var i in _househrState) {
			var item = {};
			item.value = _househrState[i];
			State.push(item);
		}
		if ($('#centralizedApartmentParameterDg2').hasClass('datagrid-f')) {

		}else{
			$('#centralizedApartmentParameterDg2').datagrid({
				columns : [ [
					{
						field : 'sectionType',
						title : '户型',
						width : 20,
						align : 'center',
						formatter:function(value){
							for(var i=0; i<sectionType.length; i++){
								if (sectionType[i].value == value) return sectionType[i].value;
							}
							return value;
						},
						editor:{
							type:'combobox',
							options:{
								valueField:'value',
								textField:'value',
								data:sectionType,
								editable:false
							}
						}
					},
					{
						field : 'direction',
						title : '朝向',
						width : 20,
						align : 'center',
						formatter:function(value){
							for(var i=0; i<direction.length; i++){
								if (direction[i].value == value) return direction[i].value;
							}
							return value;
						},
						editor:{
							type:'combobox',
							options:{
								valueField:'value',
								textField:'value',
								data:direction,
								editable:false
							}
						}
					},
					{
						field : 'State',
						title : '用途',
						width : 20,
						align : 'center',
						formatter:function(value){
							for(var i=0; i<State.length; i++){
								if (State[i].value == value) return State[i].value;
							}
							return value;
						},
						editor:{
							type:'combobox',
							options:{
								valueField:'value',
								textField:'value',
								data:State,
								editable:false
							}
						}
					},
					{
						field : 'square',
						title : '面积',
						width : 15,
						align : 'center',
						editor: {
							type:'numberbox',
							options:{
								precision:0,
							}
						}
					},
					{
						field : 'guidePrice',
						title : '指导价',
						width : 15,
						align : 'center',
						editor: {
							type:'numberbox',
							options:{
								precision:2,
							}
						}
					},
                    {
                        field : 'costPrice',
                        title : '成本价',
                        width : 15,
                        align : 'center',
                        editor: {
                            type:'numberbox',
                            options:{
                                precision:2,
                            }
                        }
                    },
					{
						field : 'relation',
						title : '关联',
						width : 30,
						align : 'center',
						formatter:function(value,row,index){
							if(row.relationRoom){
								var data = row.relationRoom;
								if(data.length != 0){
									return '<div style="width:100%;cursor: pointer;color: blue;" onclick="relationRoom('+index+')">'+
									''+value+''+
									'</div>';
								}
							}
							return '<div style="width:100%;cursor: pointer;color: red;" onclick="relationRoom('+index+')">'+
							''+value+''+
							'</div>';
						},
					}
					] ],
					width : '100%',
					height : '306px',
					singleSelect : true,
					autoRowHeight : false,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					toolbar : '#centralizedApartmentParameterTB2',
					onClickRow : onClickRowParameter
			});
		}
	}else if(step == 4){
		var row = $('#centralizedApartmentParameterDg2').datagrid('getRows');
		if (row == undefined || row == []) {
			$.messager.confirm('提示','您没有添加任何关联规则，确定要下一步吗?',function(r){
			    if (r){
					//alert('ok');
			    }else{
			    	return;
			    }
			});
		}
		if(!validateStep('addBatchHs', 4)){
			return;
		}
		updateCentralized();
		var sectionType = [{value:''}];
		for (var i in _sectionType) {
			var item = {};
			item.value = _sectionType[i];
			sectionType.push(item);
		}
		var direction = [{value:''}];
		for (var i in _direction) {
			var item = {};
			item.value = _direction[i];
			direction.push(item);
		}
		var State = [{value:''}];
		for (var i in _househrState) {
			var item = {};
			item.value = _househrState[i];
			State.push(item);
		}
		if ($('#centralizedApartmentRoomDg2').hasClass('datagrid-f')) {

		} else {
			$('#centralizedApartmentRoomDg2').datagrid({
				columns : [ [
					{
		                field : 'ck',
		                checkbox : true
					},
				{
					field : 'community',
					title : '小区名',
					width : 18,
					align : 'center',
					editor: {
						type:'textbox',
						options:{

							precision:0,
							required:true,
						}
					}

				},
				{
					field : 'building',
					title : '栋/单元',
					width : 11,
					align : 'center',
					editor: {
						type:'textbox',
						options:{
							precision:0,
							required:true,
						}
					}

				},
				{
					field : 'floor',
					title : '楼层',
					width : 11,
					align : 'center',
					editor: {
						type:'numberbox',
						options:{
							precision:0,
							required:true,
						}
					}

				},
				{
					field : 'doorplateno',
					title : '门牌号',
					width : 11,
					align : 'center',
					editor: {
						type:'numberbox',
						options:{
							precision:0,
							required:true,
						}
					}

				},
				{
					field : 'sectionType',
					title : '户型',
					width : 14,
					align : 'center',
					formatter:function(value){
						for(var i=0; i<sectionType.length; i++){
							if (sectionType[i].value == value) return sectionType[i].value;
						}
						return value;
					},
					editor:{
						type:'combobox',
						options:{
							valueField:'value',
							textField:'value',
							data:sectionType,
							editable:false,
							required:true,
						}
					}

				},
				{
					field : 'direction',
					title : '朝向',
					width : 11,
					align : 'center',
					formatter:function(value){
						for(var i=0; i<direction.length; i++){
							if (direction[i].value == value) return direction[i].value;
						}
						return value;
					},
					editor:{
						type:'combobox',
						options:{
							valueField:'value',
							textField:'value',
							data:direction,
							editable:false,
							required:true,
						}
					}

				},
					{
						field : 'State',
						title : '用途',
						width : 14,
						align : 'center',
						formatter:function(value){
							for(var i=0; i<State.length; i++){
								if (State[i].value == value) return State[i].value;
							}
							return value;
						},
						editor:{
							type:'combobox',
							options:{
								valueField:'value',
								textField:'value',
								data:State,
								editable:false,
								required:true,
							}
						}

					},
				{
					field : 'square',
					title : '面积',
					width : 11,
					align : 'center',
					editor: {
						type:'numberbox',
						options:{
							precision:0,
							required:true,
						}
					}
				},
				{
					field : 'guidePrice',
					title : '指导价',
					width : 11,
					align : 'center',
					editor: {
						type:'numberbox',
						options:{
							precision:0,
							required:true,
						}
					}

				},
                {
                    field : 'costPrice',
                    title : '成本价',
                    width : 11,
                    align : 'center',
                    editor: {
                        type:'numberbox',
                        options:{
                            precision:0,
                            required:true,
                        }
                    }
                },

				] ],
				width : '100%',
				height : '306px',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				selectOnCheck : false,
				checkOnSelect : false,
				toolbar : '#centralizedApartmentRoomTB2',
				onClickRow : onClickRow5
			});
		}
	}
}

//集中式公寓预生成
var identifying;//标识
function newCentralizedApartment(type){
	if(type=='addCentralized'){
		var result = accept2();
		if (result == 'error') {
			return;
		}
		var rows = $('#centralizedApartmentRuleDg').datagrid('getRows');
		if (rows.length == 0) {
			myTips('请添加规则', 'error');
			return;
		}
	}else if(type=='setCentralized'){
		var result = accept4();
		if (result == 'error') {
			return;
		}
		var rows = $('#centralizedApartmentRuleDg2').datagrid('getRows');
		if (rows.length == 0) {
			myTips('请添加规则', 'error');
			return;
		}
	}

	var house = [];
	identifying = randomNumber();
	for (var i in rows) {
		var community = rows[i].community;
		var building = rows[i].building;
		var floor = rows[i].beginFloor;
		var floorNums = rows[i].endFloor - rows[i].beginFloor + 1;
		var roomNums = rows[i].endRoomNum - rows[i].startRoomNum + 1;
		var namePlan = rows[i].namePlan;
		var floorNumPrefix = rows[i].floorNumPrefix;
		var roomNumPrefix = rows[i].roomNumPrefix;
		if(namePlan == 2 && roomNums > 26){
			myTips('字母房号每层最多26间', 'error');
			return;
		}
		if(namePlan == 4 && roomNums > 26){
			myTips('字母房号每层最多26间', 'error');
			return;
		}
		if(floorNums<1){
			myTips('楼层设置错误', 'error');
			return;
		}
		var room = rows[i].startRoomNum;
		var word = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		for(var j=1;j<parseInt(floorNums)*parseInt(roomNums)+1;j++){
			var item = {};
			item.community = community;
			item.building = building;
			item.floor = floor;
			if(room<10){
				item.room = "0" + room;
			}else{
				item.room = room;
			}
			item.floorNumPrefix = floorNumPrefix;
			item.roomNumPrefix = roomNumPrefix;
			item.identifying = identifying;
			if(namePlan==1){//数字楼层+数字房号
				var doorplateno = "";
				if(floorNumPrefix != "" && floorNumPrefix != null){
					doorplateno += floorNumPrefix;
				}
				if(floor<10){
					if($("#ckFloor").prop("checked")){//选择后楼层小于10不补0
						doorplateno += floor;
					}else{
						doorplateno += "0" + floor;
					}
				}else{
					doorplateno += floor;
				}
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(room<10){
					if($("#ckRoom").prop("checked")){//选择后房号小于10不补0
						doorplateno += room;
					}else{
						doorplateno += "0" + room;
					}
				}else{
					doorplateno += room;
				}
				item.doorplateno = doorplateno;
			}
			if(namePlan==2){//数字楼层+字母房号
				var doorplateno = "";
				if(floorNumPrefix != "" && floorNumPrefix != null){
					doorplateno += floorNumPrefix;
				}
				if(floor<10){
					if($("#ckFloor").prop("checked")){
						doorplateno += floor;
					}else{
						doorplateno += "0" + floor;
					}
				}else{
					doorplateno += floor;
				}
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				doorplateno += word[parseInt(room) - 1];
				item.doorplateno = doorplateno;
			}
			if(namePlan == 3){//楼层减一加A，数字房号
				var doorplateno = "";
				if(floorNumPrefix != "" && floorNumPrefix != null){
					doorplateno += floorNumPrefix;
				}
				var floor2 = floor - 1;
				if(floor2<10){
					if($("#ckFloor").prop("checked")){
						doorplateno += floor2 + "A";
					}else{
						doorplateno += "0" + floor2 + "A";
					}
				}else{
					doorplateno += floor2 + "A";
				}
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				if(room<10){
					if($("#ckRoom").prop("checked")){//选择后房号小于10不补0
						doorplateno += room;
					}else{
						doorplateno += "0" + room;
					}
				}else{
					doorplateno += room;
				}
				item.doorplateno = doorplateno;
			}
			if(namePlan == 4){//楼层减一加A，字母房号
				var doorplateno = "";
				if(floorNumPrefix != "" && floorNumPrefix != null){
					doorplateno += floorNumPrefix;
				}
				var floor2 = floor - 1;
				if(floor2<10){
					if($("#ckFloor").prop("checked")){
						doorplateno += floor2 + "A";
					}else{
						doorplateno += "0" + floor2 + "A";
					}
				}else{
					doorplateno += floor2 + "A";
				}
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				doorplateno += word[parseInt(room) - 1];
				item.doorplateno = doorplateno;
			}
			if(namePlan == 5){//楼层减一加A+数字房号减一加A
				var doorplateno = "";
				if(floorNumPrefix != "" && floorNumPrefix != null){
					doorplateno += floorNumPrefix;
				}
				var floor2 = floor - 1;
				if(floor2<10){
					if($("#ckFloor").prop("checked")){
						doorplateno += floor2 + "A";
					}else{
						doorplateno += "0" + floor2 + "A";
					}
				}else{
					doorplateno += floor2 + "A";
				}
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				var room2 = room - 1;
				if(room2<10){
					if($("#ckRoom").prop("checked")){//选择后房号小于10不补0
						doorplateno += room2 + "A";
					}else{
						doorplateno += "0" + room2 + "A";
					}
				}else{
					doorplateno += room2 + "A";
				}
				item.doorplateno = doorplateno;
			}
			if(namePlan == 6){//数字楼层+数字房号减一加A
				var doorplateno = "";
				if(floorNumPrefix != "" && floorNumPrefix != null){
					doorplateno += floorNumPrefix;
				}
				if(floor<10){
					if($("#ckFloor").prop("checked")){
						doorplateno += floor;
					}else{
						doorplateno += "0" + floor;
					}
				}else{
					doorplateno += floor;
				}
				if(roomNumPrefix != "" && roomNumPrefix != null){
					doorplateno += roomNumPrefix;
				}
				var room2 = room - 1;
				if(room2<10){
					if($("#ckRoom").prop("checked")){//选择后房号小于10不补0
						doorplateno += room2 + "A";
					}else{
						doorplateno += "0" + room2 + "A";
					}
				}else{
					doorplateno += room2 + "A";
				}
				item.doorplateno = doorplateno;
			}
			house.push(item);
			room++;
			if(room>rows[i].endRoomNum){
				room=rows[i].startRoomNum;
				floor++;
			}
		}
	}
	return house;
}

//设置集中房，设置门牌规则
var editIndex4 = undefined;
function endEditing4() {
	if (editIndex4 == undefined) {
		return true;
	}
	if ($('#centralizedApartmentRuleDg2').datagrid('validateRow', editIndex4)) {
		$('#centralizedApartmentRuleDg2').datagrid('endEdit', editIndex4);
		editIndex4 = undefined;
		return true;
	} else {
		return false;
	}
}
//点击一行触发
function onClickRow4(index) {
	if (editIndex4 != index){
		if (endEditing4()) {
			$('#centralizedApartmentRuleDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex4 = index;
		} else {
			$('#centralizedApartmentRuleDg2').datagrid('selectRow', editIndex4);
		}
	}
}
//添加
function append4(){
	if (endEditing4()){
		$('#centralizedApartmentRuleDg2').datagrid('appendRow', {});
		editIndex4 = $('#centralizedApartmentRuleDg2').datagrid('getRows').length-1;
		$('#centralizedApartmentRuleDg2').datagrid('selectRow', editIndex4).datagrid('beginEdit', editIndex4);
	} else {
		myTips('数据不完整', 'error');
	}
}
//删除
function removeit4(){
	if (editIndex4 == undefined){
		myTips('请选择一条记录', 'error');
		return
	}
	$('#centralizedApartmentRuleDg2').datagrid('cancelEdit', editIndex4).datagrid('deleteRow', editIndex4);
	editIndex4 = undefined;
}
//保存
function accept4(){
	if (endEditing4()){
		$('#centralizedApartmentRuleDg2').datagrid('acceptChanges');
		return 'success';
	} else {
		myTips('数据不完整', 'error');
		return 'error';
	}
}


//设置集中房，设置门牌规则
var editParameter = undefined;
function parameter() {
	if (editParameter == undefined) {
		return true;
	}
	if ($('#centralizedApartmentParameterDg2').datagrid('validateRow', editParameter)) {
		$('#centralizedApartmentParameterDg2').datagrid('endEdit', editParameter);
		editParameter = undefined;
		return true;
	} else {
		return false;
	}
}
//添加
function appendParameter(){
	if (parameter()){
		var relation = '关联';
		$('#centralizedApartmentParameterDg2').datagrid('appendRow',{relation:relation});
		editParameter = $('#centralizedApartmentParameterDg2').datagrid('getRows').length-1;
		$('#centralizedApartmentParameterDg2').datagrid('selectRow', editParameter).datagrid('beginEdit', editParameter);
	} else {
		myTips('数据不完整', 'error');
	}
}
//删除
function removeitParameter(){
	if (editParameter == undefined){
		myTips('请选择一条记录', 'error');
		return
	}
	$('#centralizedApartmentParameterDg2').datagrid('cancelEdit', editParameter).datagrid('deleteRow', editParameter);
	editParameter = undefined;
}
//保存
function acceptParameter(){
	if (parameter()){
		$('#centralizedApartmentParameterDg2').datagrid('acceptChanges');
		return 'success';
	} else {
		myTips('数据不完整', 'error');
		return 'error';
	}
}

//点击一行触发
function onClickRowParameter(index) {
	if (editParameter != index){
		if (parameter()) {
			$('#centralizedApartmentParameterDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
			editParameter = index;
		} else {
			$('#centralizedApartmentParameterDg2').datagrid('selectRow', editParameter);
		}
	}else{
		$('#centralizedApartmentParameterDg2').datagrid('acceptChanges');
		editParameter = undefined;
	}
}
//打开关联房间窗口
function relationRoom(index){
	$("#relationIndex").val(index);
	$("#addRelationRoom").dialog({
		title : '添加关联房',
		top : getTop(500),
		left : getLeft(1000),
		width : 1000,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addRelationRoom input").val('');
			$("#addRelationRoom select").empty();
			$('#addRelationRoomDg').datagrid('loadData', []);
			$('#existingRelationRoomDg').datagrid('loadData', []);
		}
	});

	var row = $('#centralizedApartmentRuleDg2').datagrid('getRows');
	$("#searchCommunity2").append("<option value = ''></option>");
	$("#searchBuilding2").append("<option value = ''></option>");
	$("#searchFloorNumPrefix").append("<option value = ''></option>");
	$("#searchRoomNumPrefix").append("<option value = ''></option>");
	for(var i in row){
		$("#searchCommunity2").append("<option value = '" + row[i].community + "'>" + row[i].community + "</option>");
		$("#searchBuilding2").append("<option value = '" + row[i].building + "'>" + row[i].building + "</option>");
		if(row[i].floorNumPrefix != null && row[i].floorNumPrefix != ''){
			$("#searchFloorNumPrefix").append("<option value = '" + row[i].floorNumPrefix + "'>" + row[i].floorNumPrefix + "</option>");
		}
		if(row[i].roomNumPrefix != null && row[i].roomNumPrefix != ''){
			$("#searchRoomNumPrefix").append("<option value = '" + row[i].roomNumPrefix + "'>" + row[i].roomNumPrefix + "</option>");
		}
	}
	queryCentralizedApartmentRoom();
	var parameter = $('#centralizedApartmentParameterDg2').datagrid('getRows');
	var data = [];
	if(parameter[index].relationRoom){
		data = parameter[index].relationRoom;
	}
	$('#existingRelationRoomDg').datagrid('loadData', data);
	$("#addRelationRoom").dialog('open');

}
//查找预生成集中房
function queryCentralizedApartmentRoom(){
	var community = $("#searchCommunity2").val();
	var building = $("#searchBuilding2").val();
	var floor = $("#searchFloor2").val();
	var doorplateno = $("#searchDoorplateno2").val();//房间号,不是门牌号
	var roomNumPrefix = $("#searchRoomNumPrefix").val();
	var floorNumPrefix = $("#searchFloorNumPrefix").val();
	$.post("../selectCentralized.action",{
		identifying	:	identifying,
		community	:	community,
		building	:	building,
		floor		:	floor,
		roomNumber	:	doorplateno,
		roomNumPrefix	:	roomNumPrefix,
		floorNumPrefix	:	floorNumPrefix,
	},function(data){
		if(data.code<0){
			$('#addRelationRoomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data = data.body;

		var rows = $('#existingRelationRoomDg').datagrid("getRows");
		for (var i in rows){
			for(var j in data){
				if(rows[i].id == data[j].id){
					data.splice(j,1);
					j--;
				}
			}
		}
		var parameter = $('#centralizedApartmentParameterDg2').datagrid('getRows');
		var data1 = [];
		for(var i in parameter){
			if(parameter[i].relationRoom){
				data1 = parameter[i].relationRoom;
				for(var j in data1){
					for(var k in data){
						if(data1[j].id == data[k].id ){
							data.splice(k,1);
							k--;
						}
					}
				}
			}
		}
		$('#addRelationRoomDg').datagrid('loadData', data);
	});

}
//执行保存关联房间
function doAddRelationRoom(){
	var index = $("#relationIndex").val();
	var rows = $("#existingRelationRoomDg").datagrid("getRows");
	var row = $("#centralizedApartmentParameterDg2").datagrid("getRows");

	row[index].relationRoom = rows;
	$('#centralizedApartmentParameterDg2').datagrid('loadData', row);
	$('#addRelationRoom').dialog('close');
}
//保存预生成房到临时数据库
function insertCentralized(){
	var rows = newCentralizedApartment('setCentralized');
	console.log(rows);
	if (rows.length == 0) {
		myTips('请添加房间', 'error');
		return;
	}
	var jsonArray = [];
	for(var i = 0;i < rows.length; i++){
		jsonArray.push({
			community		:	rows[i].community,
			building		:	rows[i].building,
			doorplateno		:	rows[i].doorplateno,
			roomNumPrefix	:	rows[i].roomNumPrefix,
			floorNumPrefix	:	rows[i].floorNumPrefix,
			floor			:	rows[i].floor,
			identifying		:	rows[i].identifying,
			roomNumber		:	rows[i].room,
		});
	}
	var splitJson = JSON.stringify(jsonArray);
	showLoading();
	$.post("../insertCentralized.action", {splitJson : splitJson}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
	});
}
//添加关联
function addRelation(){
	var row = $("#addRelationRoomDg").datagrid("getChecked");
	if(row.length == 0){
		myTips("请选择要关联的房","error");
		return;
	}
	var rows = $('#existingRelationRoomDg').datagrid("getRows");
	for (var i in rows){
		for(var j in row){
			if(rows[i].id == row[j].id){
				$.messager.alert('Warning',row[j].community+"(小区 )"+row[j].building+"(栋/单元) "+row[j].floor+"(层) "+row[j].roomNumber+"(房间号) "+"  "+"已关联，请勿重复关联！");
				return;
			}
		}
	}
	var parameter = $('#centralizedApartmentParameterDg2').datagrid('getRows');
	var data = [];
	for(var i in parameter){
		if(parameter[i].relationRoom){
			data = parameter[i].relationRoom;
			for(var j in data){
				for(var k in row){
					if(data[j].id == row[k].id ){
						$.messager.alert('Warning',row[k].community+"(小区) "+row[k].building+"(栋/单元) "+row[k].floor+"(层) "+row[k].roomNumber+"(房间号) "+"  "+"已关联其它规则，请勿重复关联！");
						return;
					}
				}
			}
		}
	}
	for(var i in row){
		$("#existingRelationRoomDg").datagrid('appendRow',row[i]);
		var index = $("#addRelationRoomDg").datagrid("getRowIndex",row[i]);
		$("#addRelationRoomDg").datagrid('deleteRow',index);
	}
	$("#addRelationRoomDg").datagrid('clearChecked');
}
//删除关联的房
function removeRelation(){
	var row = $("#existingRelationRoomDg").datagrid("getChecked");
	if(row.length == 0){
		myTips("请选择要取消关联的房","error");
		return;
	}
	for(var i in row){
		var index = $("#existingRelationRoomDg").datagrid("getRowIndex",row[i]);
		$("#existingRelationRoomDg").datagrid('deleteRow',index);
		$("#addRelationRoomDg").datagrid('appendRow',row[i]);
	}
	$("#existingRelationRoomDg").datagrid('clearChecked');
}
//保存参数规则到临时数据库
function updateCentralized(){
	var rows = $('#centralizedApartmentParameterDg2').datagrid('getRows');
	var jsonArray = [];
	var data = [];
	for(var i = 0;i < rows.length; i++){
		if(rows[i].relationRoom){
			data = rows[i].relationRoom;
			for(var j in data){
				jsonArray.push({
					sectionType		:	rows[i].sectionType,
					houseDirection	:	rows[i].direction,
					houseState		:	rows[i].State,
					houseSquare		:	rows[i].square,
					guidePrice		:	rows[i].guidePrice,
                    costPrice		:	rows[i].costPrice,
					identifying		:	data[j].identifying,
					id				:	data[j].id,
				});
			}
		}
	}
	var splitJson = JSON.stringify(jsonArray);
	showLoading();
	$.post("../updateCentralized.action",{splitJson : splitJson}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		queryCentralized();
	});
}

//查询全部预生成集中房
function queryCentralized(){
	$.post("../selectCentralized.action",{
		identifying	:	identifying,
	},function(data){
		if(data.code<0){
			$('#centralizedApartmentRoomDg2').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data = data.body;
		console.log(data);
		for(var i in data){
			data[i].direction = data[i].houseDirection;
			data[i].square = data[i].houseSquare;
			data[i].State=data[i].houseState;
		}
		$('#centralizedApartmentRoomDg2').datagrid('loadData', data);
	});
}

//添加集中房，保存集中房
var editIndex5 = undefined;
function endEditing5() {
	if (editIndex5 == undefined) {
		return true;
	}
	if ($('#centralizedApartmentRoomDg2').datagrid('validateRow', editIndex5)) {
		$('#centralizedApartmentRoomDg2').datagrid('endEdit', editIndex5);
		editIndex5 = undefined;
		return true;
	} else {
		return false;
	}
}
//点击一行触发
function onClickRow5(index) {
	if (editIndex5 != index){
		if (endEditing5()) {
			$('#centralizedApartmentRoomDg2').datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex5 = index;
		} else {
			$('#centralizedApartmentRoomDg2').datagrid('selectRow', editIndex5);
		}
	}
}
//添加
function append5(){
	if (endEditing5()){
		$('#centralizedApartmentRoomDg2').datagrid('appendRow', {});
		editIndex5 = $('#centralizedApartmentRoomDg2').datagrid('getRows').length-1;
		$('#centralizedApartmentRoomDg2').datagrid('selectRow', editIndex5).datagrid('beginEdit', editIndex5);
	} else {
		myTips('数据不完整', 'error');
	}
}
//删除
function removeit5(){
	var row = $('#centralizedApartmentRoomDg2').datagrid('getChecked');
	if (row.length == 0){
		myTips('请选择一条记录', 'error');
		return
	}
	for (var i in row){
		var index = $('#centralizedApartmentRoomDg2').datagrid('getRowIndex',row[i]);
		$('#centralizedApartmentRoomDg2').datagrid('cancelEdit', index).datagrid('deleteRow', index);
	}
}
//保存
function accept5(){
	if (endEditing5()){
		$('#centralizedApartmentRoomDg2').datagrid('acceptChanges');
		return 'success';
	} else {
		myTips('数据不完整', 'error');
		return 'error';
	}
}

/*var _pgbData = [];
/!*生成账单*!/
function preGeneratingBill(index,price){
    console.log("3");
    var addSigned = $('#addHsBegin').val();
    var addSourceBegin = $('#addHsBegin').val();
    var addEnd = $('#addHsEnd').val();
    var addContractType = '新签合同';
    var jrlPaymentMethod = '月付';
    var term = getYearMonthDay(addSourceBegin, addEnd);
    var addSourceTerm = term[0]+'年'+term[1]+'月'+term[2]+'日';
    var inAdvancePay = 0;
    //阶梯价及免租期
    var begin = new Date($('#addHsBegin').val());
    var end = new Date($('#addHsEnd').val());
    var date = new Date(begin);
    date.setDate(date.getDate() - 1);
    var year = 0;//合同期限
    var i = 0;
    var updatePriceLadderArray = new Array();
    while(date < end){
        year++;
        date.setFullYear(date.getFullYear() + 1);
        updatePriceLadderArray[i] = parseFloat(price);
        i++;
    }
    var updatePriceLadder = updatePriceLadderArray.join(",");
    var updateRentFreeSegmentArray = new Array();
    i = 0;
    $(".rentFreeSegmentIndex").each(function(){
        updateRentFreeSegmentArray[i] = $("#holidaySettingA"+(i+1)).val() + "#" + $("#holidaySettingB"+(i+1)).val() + "#" + $("#holidaySettingC"+(i+1)).val() + "#" + $("#holidaySettingD"+(i+1)).val();
        i++;
    });
    var updateRentFreeSegment = updateRentFreeSegmentArray.join(",");
    var jrlPriceLadder = updatePriceLadder;
    var jrlRentFreeSegment = updateRentFreeSegment;
    $.post("../noRentedBillInformation.action",{
        //新增未租合约部分 数据
        jrlSignedTime 			: addSigned,
        jrlBeginTime 			: addSourceBegin,
        jrlEndTime 				: addEnd,
        jrlUserId 				: _loginUserId,
        jrlDepartment			: _loginDepartment,
        jrlStorefront			: _loginStore,
        jrlContractType 		: addContractType,
        jrlTheTerm 				: addSourceTerm,
        jrlInAdvancePay 		: inAdvancePay,
//		jrlRentFreeDays 		: jrlRentFreeDays,
        jrlPaymentMethod 		: jrlPaymentMethod,
        jrlRentFreeSegment		: jrlRentFreeSegment,
        jrlPriceLadder			: jrlPriceLadder,
    },function(data){
        if (data.code<0) {
            $('#preGeneratingBillTable').datagrid({
                data : [],
                view : myview,
                emptyMsg : data.msg
            });
            return;
        }
        data = data.body;
        var list = [];
        for(var i in data){
        	var json = {};
            if(i == 0){
                data[i].jciAudit = data[0].jciAudit.getRealJsonStr();
            }else{
                data[i].jciAudit = '{'+data[0].jciAudit.getRealJsonStr()+'}';
            }
			list.push({
				jciServerCost	: data[i].jciServerCost,
				jciNature		: data[i].jciNature,
				jciType		: data[i].jciType,
				jciState		: data[i].jciState,
				jciPeriods		: data[i].jciPeriods,
				jciFukuanri		: data[i].jciFukuanri,
				jciImgNum		: data[i].jciImgNum,
				jciImgPath		: data[i].jciImgPath,
				jciIfPrint		: data[i].jciIfPrint,
				jciStorefront		: data[i].jciStorefront,
				jciMoney		: data[i].jciMoney,
				jciRead		: data[i].jciRead,
				jciEndPeriods		: data[i].jciEndPeriods,
				jciAudit		: data[i].jciAudit,
				jciBeginPeriods		: data[i].jciBeginPeriods,
				jciDepartment		: data[i].jciDepartment,
				jciRegisterPeople		: data[i].jciRegisterPeople,
				jciManageCost		: data[i].jciManageCost,
			})
        }
        _pgbData[index] = list;
        console.log(_pgbData)
    });
}*/

//执行添加未租
function doAddTrusteeship() {

	var checkFlag = 0;
	$('#addHsDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有选项未填!","error");
		return;
	}

	// 地址
	var addHouseCoding;
	var addCity;
	var addDistrict;
	var addBuildingName;
	var addAddBuilding;
	var addAddDoorplateno;

	var addHouseCoding = '';
	var addCity = $("#addNoTrusteeshipCity").find("option:selected").text();//城市
	var addDistrict = $("#addNoTrusteeshipDistrict").find("option:selected").text();//城区
	var addZone = $("#addNoTrusteeshipZone").val();//片区
	var hsAddProvince = $("#province").val();

	// 合同
	var addSourceBegin = $('#addHsBegin').val();
	var addEnd = $('#addHsEnd').val();
	var term = getYearMonthDay(addSourceBegin, addEnd);
	var addSourceTerm = term[0]+'年'+term[1]+'月'+term[2]+'日';
	var addSigned = $('#addHsBegin').val();//签约时间
	var addDeposit = 0.0;
	var addContractType = '新签合同';
	var addPaymentType = '月付';
	var jrlPaymentMethod = '月付';
	var hsDepartment =  _loginDepartment;
	var hsStorefront =  _loginStore;
	var inAdvancePay = 0;
	// 业主
	var landlordName = $("#addHsLandlordName").val();
	var landlordPhone = $("#addHsLandlordPhoneNum").val();
	var landlordIdcard = $("#addHsLandlordIdcard").val();
	var laSecondContacts= $("#addHsContacts").val();
	var laSecondPhone= $("#addHsContactsPhone").val();
	var popIdcardAddress= $("#addHsLandlordIdcardAddress").val();
	var popBirth= $("#addHsLandlordBirth").val();
	var popSex= $("#addHsLandlordSex").val();
	var popNation= $("#addHsLandlordNation").val();
	var popImgPath= $("#addHsLandlordImsphoto").val();

	var hsBankType = $("#addHsBankType").find("option:selected").text();
	var hsBankNum = $("#addHsBankNum").val();
	var hsBankName = $("#addHsBankName").val();
	var popNameRemark = $('#addHrRenterNameRemark').val();

	//阶梯价及免租期
	var i = 0;
	var updatePriceLadderArray = new Array();
	$(".updatePriceLadder").each(function(){
		updatePriceLadderArray[i] = parseFloat($(this).val());
		i++;
	});
	var updatePriceLadder = updatePriceLadderArray.join(",");
	var updateRentFreeSegmentArray = new Array();
	i = 0;
	$(".rentFreeSegmentIndex").each(function(){
		updateRentFreeSegmentArray[i] = $("#holidaySettingA"+(i+1)).val() + "#" + $("#holidaySettingB"+(i+1)).val() + "#" + $("#holidaySettingC"+(i+1)).val() + "#" + $("#holidaySettingD"+(i+1)).val();
		i++;
	});
	var updateRentFreeSegment = updateRentFreeSegmentArray.join(",");
	var jrlPriceLadder = updatePriceLadder;
	var jrlRentFreeSegment = updateRentFreeSegment;

	// 合约相关
	var jrlRenewalCoding = '';
	/*console.log(_contractNumsArry);
	if(_contractNumsArry.length>0){
		for(var i in _contractNumsArry){
			_contractNumsArry[i].jcdHouseAddress=addBuildingName+" "+addAddBuilding+" "+addAddDoorplateno;
			_contractNumsArry[i].adminUser =addFollowUserId;
		}
	}
	var jrlRenewalCoding = JSON.stringify(_contractNumsArry);
	if(_contractNums!=1){
		if(jrlRenewalCoding=="[]"){
			jrlRenewalCoding="";
		}
	}
	var jcdIdjosn = jrlRenewalCoding;*/
	var rows = $('#centralizedApartmentRoomDg2').datagrid('getRows');
	if (rows.length == 0) {
		myTips('请添加房间', 'error');
		return;
	}
	var jsonArray = [];
	for(var i = 0;i < rows.length; i++){
		$("#houseDicPinyin").val('');
		$("#houseDicCommunity").val('');
		$("#houseDicCommunity").val(rows[i].community);
		toPinyin('houseDicCommunity','houseDicPinyin');
        //阶梯价及免租期
        var begin = new Date($('#addHsBegin').val());
        var end = new Date($('#addHsEnd').val());
        var date = new Date(begin);
        date.setDate(date.getDate() - 1);
        var year = 0;//合同期限
        var j = 0;
        var updatePriceLadderArray = new Array();
        while(date < end){
            year++;
            date.setFullYear(date.getFullYear() + 1);
            updatePriceLadderArray[j] = parseFloat(rows[i].costPrice);
            j++;
        }
        var updatePriceLadder = updatePriceLadderArray.join(",");
        var jrlPriceLadder = updatePriceLadder;
		jsonArray.push({
			hsAddCommunity		:	rows[i].community,
			hsAddBuilding		:	rows[i].building,
			hsAddDoorplateno	:	rows[i].doorplateno,
			hsSectionType		:	rows[i].sectionType,//户型
			hsHouseDirection	:	rows[i].direction,//朝向
			hsHouseOwner		:	rows[i].State,//用途
			hsHouseSquare		:	rows[i].square,//面积
			hsGuidePrice		:	rows[i].guidePrice,//指导价
            hsInPrice			:	rows[i].costPrice,
			hdPinyin			:	$("#houseDicPinyin").val(),//楼盘拼音
            //notRentingJson		:	JSON.stringify(_pgbData[i]),
            jrlPriceLadder		:	jrlPriceLadder,

		});
		console.log(rows[i].State);
	}
	jsonArray = JSON.stringify(jsonArray);
	var splitJson = jsonArray;
	
	showLoading();
	$.post("../insertBatchHouseForStore.action", {
	    //业主模式
        noOwner                 : _NoOwner,
		//添加未租部分 数据
		hsHouseId 				: addHouseCoding,
		hsAddProvince 			: hsAddProvince,
		hsAddCity 				: addCity,
		hsAddDistrict 			: addDistrict,
		hsAddZone 				: addZone,

		hsBeginTime 			: addSourceBegin,
		hsTheTerm 				: addSourceTerm,
		hsEndTime 				: addEnd,
		hsHouseDeposit 			: addDeposit,
		hsPaymentType 			: addPaymentType,
		hsUserId 				: _loginUserId,
		hsStorefront			: hsStorefront,
		hsDepartment			: hsDepartment,
		hsBankType				: hsBankType,
		hsBankNum				: hsBankNum,
		hsBankName				: hsBankName,
		//新增业主部分 数据
		laPopTelephone			: landlordPhone,
		laPopName 				: landlordName,
		laPopIdcard				: landlordIdcard,
		laSecondContacts 		: laSecondContacts,
		laSecondPhone 			: laSecondPhone,
		laDepartment			: _loginDepartment,
		laStorefront			: _loginStore,
		laUserId				: _loginUserId,
		popNameRemark           : popNameRemark,
		popIdcardAddress		: popIdcardAddress,
		popBirth				: popBirth,
		popSex					: popSex,
		popNation				: popNation,
		popImgPath				: popImgPath,
		//新增未租合约部分 数据
		jrlSignedTime 			: addSigned,
		jrlBeginTime 			: addSourceBegin,
		jrlEndTime 				: addEnd,
		jrlUserId 				: _loginUserId,
		jrlDepartment			: _loginDepartment,
		jrlStorefront			: _loginStore,
		jrlContractType 		: addContractType,
		jrlTheTerm 				: addSourceTerm,
		jrlPaymentMethod 		: jrlPaymentMethod,
		jrlRentFreeSegment		: jrlRentFreeSegment,
		jrlPriceLadder			: jrlPriceLadder,
		jrlInAdvancePay 		: inAdvancePay,
		jrlRentFreeDays 		: 0,
		jrlRenewalCoding		: jrlRenewalCoding,
        //notRentingJson          : notRentingJson,
		//jcdIdjosn				: jcdIdjosn,
		
	    splitJson				: splitJson,
	},function(data) {
		hideLoading();
		isSave = true;
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		parent.queryTrusteeship(_pageNum[0], 0);
		myTips('添加成功', 'success');
		setTimeout(function(){
			parent.$('#addBatchHomeDlg').dialog('close');
		}, 1000);
	});

}

function loadSelectList(){
	
	for (var i in _loginCompanyRentDistrict) {
		$('#addNoTrusteeshipDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
}