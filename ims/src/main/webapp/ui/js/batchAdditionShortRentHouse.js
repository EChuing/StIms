$(function(){
	//加载下拉列表
	loadSelectList();
	//点击导航栏跳转
	$('#batchAdditionSRHDlg .process-bar .process').on('click', function(){
		if ($(this).hasClass('active')) {
			var step = $(this).attr('data-step');
			gotoStep('batchAdditionSRH', step);
		}
	});
	$(document).click(function(e) {
		choseSelectHide('buildingNameDiv',2);
		if($(e.target).attr('id')=="buildingName"){
			choseSelectHide('buildingNameDiv',1);
		}
		
	});
	$('#province').val(_loginCompanyRentProvince);
	_contractNumsArry = [];
	//城市
	console.log(_loginCompanyRentCity);
	$("#addNoTrusteeshipCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#addNoTrusteeshipCity").val(0);
	
	//显示第一步的界面
	gotoStep('batchAdditionSRH', 1);
	getSetUpInfo();
});

var shortRentRoomType=[];
//查询短租房型
function getSetUpInfo(){
	$.ajax({
		url:"../getSetUpInfo.action",
		type:"post",
		data:{
			jsrsuId : 1,
		},
		success:function(result){
			if(result.code == 1){
				var data = JSON.parse(result.body);
				data = data[0];
				var html="";
				var html1="";
				setUp = data;
				//将对象里面字符串转化为对象
				var newdata=JSON.parse(data.jsrsuRoomType);
				shortRentRoomType = newdata;
			}else{
				myTips(result.msg,"error")
			}
			
		}
	})
}

function nextStep(step){
	if (step == 2) {
		if (validateStep('batchAdditionSRH', 2)) {
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
						title : '小区名称',
						width : '20%',
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
						title : '单栋',
						width : '8%',
						align : 'center',
						editor: {
							type:'textbox',
							options:{
								precision:0,
							}
						}
					},
					{
						field : 'beginFloor',
						title : '开始层数',
						width : '8%',
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
						width : '8%',
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
						width : '8%',
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
						width : '8%',
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
						width : '20%',
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
						width : '10%',
						align : 'center',
						editor: {
							type:'textbox'
						}
					}, {
						field : 'roomNumPrefix',
						title : '房号前缀',
						width : '85',
						align : 'center',
						editor: {
							type:'textbox'
						}
					} ] ],
					width : '100%',
					height : '406px',
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
		var house = newCentralizedApartment();
		if (house == undefined || house == []) {
			return;
		}
		if(!validateStep('batchAdditionSRH', 3)){
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
		if ($('#centralizedApartmentParameterDg2').hasClass('datagrid-f')) {

		}else{
			$('#centralizedApartmentParameterDg2').datagrid({
				columns : [ [
					{
						field : 'sectionType',
						title : '户型',
						width : '20%',
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
						field : 'maxPeople',
						title : '可居住人数',
						width : '10%',
						align : 'center',
						editor: {
							type:'numberbox',
							options:{
								precision:0,
								//required:true,
							}
						}
					},
				{
					field : 'dailyRent',
					title : '日租价格',
					width : '10%',
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
						field : 'hotDailyRent',
						title : '高峰价格',
						width : '10%',
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
						field : 'roomType',
						title : '房间房型',
						width : '10%',
						align : 'center',
						formatter:function(value){
							for(var i=0; i<shortRentRoomType.length; i++){
								if (shortRentRoomType[i].roomType == value) return shortRentRoomType[i].roomType;
							}
							return value;
						},
						editor:{
							type:'combobox',
							options:{
								valueField:'roomType',
								textField:'roomType',
								data:shortRentRoomType,
								//required:true,
								editable:false,
							}
						}
					}, 
					{
						field : 'relation',
						title : '关联',
						width : '20%',
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
					},
					{
						field : 'roomConfiguration',
						title : '房间配置',
						width : '170',
						align : 'center',
						formatter:function(value,row,index){
							return '<div style="width:100%;cursor: pointer;" onclick="addRoomConfiguration('+index+')">'+
							''+value+''+
							'</div>';
						},
					} 
					] ],
					width : '100%',
					height : '406px',
					singleSelect : true,
					autoRowHeight : false,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					toolbar : '#centralizedApartmentParameterTB2',
					onClickRow : onClickRowParameter,
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
		if(!validateStep('batchAdditionSRH', 4)){
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
					title : '门店名',
					width : '15%',
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
					width : '10%',
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
					field : 'doorplateno',
					title : '门牌号',
					width : '10%',
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
					field : 'maxPeople',
					title : '可居住人数',
					width : '10%',
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
					width : '15%',
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
					field : 'dailyRent',
					title : '日租价格',
					width : '10%',
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
					field : 'hotDailyRent',
					title : '高峰价格',
					width : '10%',
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
					field : 'roomType',
					title : '房间房型',
					width : '127',
					align : 'center',
					/*formatter:function(value,row,index){
						var s = '<a href="javascript:void(0)" onclick="abc()">'+value+'</a>';
						return s;
					},*/
					formatter:function(value){
						for(var i=0; i<shortRentRoomType.length; i++){
							if (shortRentRoomType[i].roomType == value) return shortRentRoomType[i].roomType;
						}
						return value;
					},
					editor:{
						type:'combobox',
						options:{
							valueField:'roomType',
							textField:'roomType',
							data:shortRentRoomType,
							required:true,
							editable:false
						},
						onSelect: function (record) {
							acceptParameter();
							var rowIndex = $('#centralizedApartmentRoomDg2').datagrid('getRowIndex', $('#centralizedApartmentRoomDg2').datagrid('getSelected'));
							console.log(rowIndex)
							console.log(record)
							for(var i in shortRentRoomType){
								if (shortRentRoomType[i].roomType == record.roomType){
									$('#centralizedApartmentRoomDg2').datagrid('updateRow',{
										index: rowIndex,
										row:{
//											dailyRent:shortRentRoomType[i].dailyPrice,
//											hotDailyRent:shortRentRoomType[i].hotDailyPrice,
											roomType:record.roomType
										}
									});
									break;
								}
							}
				        }
					}
				}, 
				
				] ],
				width : '100%',
				height : '406px',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				selectOnCheck : false,
				checkOnSelect : false,
				toolbar : '#centralizedApartmentRoomTB2',
				onClickRow : onClickRow4
			});
		}
	}
}

//集中式公寓预生成
var identifying;//标识
function newCentralizedApartment(){
	var result = accept4();
	if (result == 'error') {
		return;
	}
	var rows = $('#centralizedApartmentRuleDg2').datagrid('getRows');
	if (rows.length == 0) {
		myTips('请添加规则', 'error');
		return;
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
		var roomConfiguration = '房间配置';
		$('#centralizedApartmentParameterDg2').datagrid('appendRow',{relation:relation,roomConfiguration:roomConfiguration});
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
					maxPeople		:	rows[i].maxPeople,
//					dailyRent		:	rows[i].dailyRent,
//					hotDailyRent	:	rows[i].hotDailyRent,
					roomType		:	rows[i].roomType,
					roomConfiguration:	rows[i].roomConfigurationStr,
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
		
		for(var i in data){
			data[i].direction = data[i].houseDirection;
			data[i].square = data[i].houseSquare;
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

//执行批量添加客房
function doSetCentralized() {
	var shortRentProvince = $('#province').val();
	var shortRentCity = $("#addNoTrusteeshipCity").find("option:selected").text();//城市
	var addShortRentDistrict = $('#addNoTrusteeshipDistrict').find("option:selected").text();
	var rows = $('#centralizedApartmentRoomDg2').datagrid('getRows');
	if (rows.length == 0) {
		myTips('请添加房间', 'error');
		return;
	}
	if (JSON.stringify(rows[rows.length-1]) == "{}") {
		myTips('有房间未保存，请保存编辑', 'error');
		return;
	}
	var jsonArray = [];
	for(var i = 0;i < rows.length; i++){
		$("#houseDicPinyin").val('');
		$("#houseDicCommunity").val('');
		$("#houseDicCommunity").val(rows[i].community);
		toPinyin('houseDicCommunity','houseDicPinyin');
		jsonArray.push({
			hsUserId 			: _loginUserId,
			hsDepartment 		: _loginDepartment,
			hsStorefront 		: _loginStore,
			hsAddProvince		: shortRentProvince,
			hsAddCity			: shortRentCity,
			hsAddDistrict		: addShortRentDistrict,
			hsFurnitureConfig	: rows[i].roomConfiguration,
			hsAddCommunity		: rows[i].community,
			hsAddBuilding		: rows[i].building,
			hsAddDoorplateno	: rows[i].doorplateno,
			hsSectionType		: rows[i].sectionType,
//			hsDailyRent			: rows[i].dailyRent,
//			hsHotDailyRent		: rows[i].hotDailyRent,
			hsRoomType			: rows[i].roomType,
			hsResidentiality	: rows[i].maxPeople,
			hsLeaseType			: 3,
			hdPinyin			: $("#houseDicPinyin").val(),//楼盘拼音
		});
	}
	showLoading();
	$.post("../batchAddition.action", {
			jsonArray	: JSON.stringify(jsonArray),
			jsrsuId		: setUp.jsrsuId,
	},function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		parent.queryTrusteeship(_pageNum[0], 0);
		myTips('添加成功', 'success');
		setTimeout(function(){
			parent.$('#batchAdditionShortRentHouseDlg').dialog('close');
		}, 1000);
	});

}

function loadSelectList(){
	
	for (var i in _loginCompanyRentDistrict) {
		$('#addNoTrusteeshipDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
}

//房间配置
$('.configuration button').click(function(){
	if ($(this).hasClass('btn-default')) {
		$(this).removeClass('btn-default');
		$(this).addClass('btn-success');
	} else {
		$(this).removeClass('btn-success');
		$(this).addClass('btn-default');
	}
});

function addRoomConfiguration(index){
	$("#index").val(index);
	$("#addRoomConfigurationDlg").dialog({
		title : '添加房间配置',
		top : getTop(200),
		left : getLeft(820),
		width : 820,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#add_room_configuration .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		}
	});
	var row = $('#centralizedApartmentParameterDg2').datagrid('getRows');
	var roomConfigurationStr;
	if(row[index].roomConfigurationStr){
		console.log(row[index].roomConfigurationStr);
		var data = row[index].roomConfigurationStr.substring(0,row[index].roomConfigurationStr.length-1).split(' ');
		console.log(data);
		//房间配置
		$("#add_room_configuration .btn").each(function(){
			if(data.indexOf($(this).val()) > -1){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		});
	}
	$("#addRoomConfigurationDlg").dialog("open");
}

function doAddRoomConfiguration(){
	var index = $("#index").val();
	//获取房间配置
	var roomConfigurationStr= '';
	$("#add_room_configuration .btn").each(function(){
		if($(this).hasClass('btn-success')){
			roomConfigurationStr += $(this).val();
			roomConfigurationStr += ' ';
		}
	});
	var row = $("#centralizedApartmentParameterDg2").datagrid("getRows");
	
	row[index].roomConfigurationStr = roomConfigurationStr;
	$('#centralizedApartmentParameterDg2').datagrid('loadData', row);
	$('#addRoomConfigurationDlg').dialog('close');
}