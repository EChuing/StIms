var  optiondata=[];//情景模式名称
$(function() {
	selectJourTimingTasks(1);
	$("#virtualDataGrid").datagrid({
		onDblClickRow: function (rowIndex, rowData) {
			uppTiming(rowData);
			$('#operationWindow').tabs({
				plain: true,
				fit: true,
				border: false,
				onSelect: function (title, index) {
					// 获得点击选项卡的列数，调用表格初始化
				}
			});
		}
	});
	$("#classDataGrid").datagrid({
	});

	$.post("../querySceneMode.action", {
	}, function(data) {
		var data=data.body;
		for (var i in data) {
			var spdDescribe = data[i].spdDescribe
			var spdId=data[i].spdId
			optiondata.push({spdDescribe:spdDescribe,scenePatternId:spdId})
		}
		console.log(data)
	})
});

//查询定时任务信息
function selectJourTimingTasks(page) {
	var pageSize = 15;
	var startPage = (parseInt(page) - 1) * pageSize;
	$.ajax({
		url:"../queryTimingTasks.action",
		type:"post",
		data:{
			splitFlag: 1,
			startNum: startPage,
			endNum: pageSize,
		},
		success:function(result){
			if(result.code == 1){
				result=result.body;
				$("#virtualDataGrid").datagrid("loadData", result);
				if (result.length < pageSize) {
					notCountPage(page, 2, "selectJourTimingTasks", "TimingTasks");
				} else {
					notCountPage(page, 1, "selectJourTimingTasks", "TimingTasks");
				}
			}else{
				$('#virtualDataGrid').datagrid({
					data: [],
					view: myview,
					emptyMsg: result.msg
				});
				if (page == 1) {
					notCountPage(0, 0, "selectJourTimingTasks", "TimingTasks");
				} else {
					notCountPage(page, 0, "selectJourTimingTasks", "TimingTasks");
				}
			}
		}
	})
}
function closeClassRoom(){
	$('#classRoomDiv').dialog('close');
	console.log("輸出試試")
}
function addTiming() {
	$("#addTimingRepair").dialog({
		title : "添加任务",
		top : getTop(330),
		left : getLeft(810),
		width : 800,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addTimingRepair .week").removeAttr("checked");
			$("#taskName").val("");
			$("#classRoomSelection").val("");
			$("#listInfoHouse4store").val("");
			$("#startTime").val("");
			$("#endTime").val("");
		},
	});
	//执行时间情景模式
	$('#sceneDataGrid')
		.datagrid({
		});
	$("#addTimingRepair").dialog('open');
}

//修改定时
function updateTiming() {
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if (row==null){
		myTips('请选择一条信息!','error');
		return;
	}
	uppTiming(row);
}
//单元格可编辑
function onClickOtherCell(index, field){
	if (endOtherEditing2()){
		$('#sceneDataGrid2').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		editIndexOther = index;
	}
	// selectMode()
}
var editIndexOther = undefined;
function endOtherEditing2(){
	if (editIndexOther == undefined){return true}
	if ($('#sceneDataGrid2').datagrid('validateRow', editIndexOther)){
		$('#sceneDataGrid2').datagrid('endEdit', editIndexOther);
		editIndexOther = undefined;
		return true;
	} else {
		return false;
	}
}

function updatePattrtn(value, row, index) {
	$.post("../querySceneMode.action", {
	}, function(data) {
		if (data.code < 0){
		} else {
			data=data.body;
			for(var i=0; i<data.length; i++){
				console.log(data[i].spdDescribe)
				if (data[i].spdDescribe ==value) return data[i].spdDescribe;
			}
			return value;
		}
	});
}

//双击修改窗口
function uppTiming(rowData) {
	$("#uppTimingRepair").dialog({
		title : "修改任务",
		top : getTop(330),
		left : getLeft(810),
		width : 800,
		height : 605,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#uppTimingRepair .week").prop("checked",false);
		},
	});
	//初始化情景模式表格
	$('#sceneDataGrid2').datagrid({
	});
	//清空情景模式表格
	$('#sceneDataGrid2').datagrid('loadData',{total:0,rows:[]})
	console.log(rowData.jttTaskContent)
	//填充情景模式表格
	var obj=JSON.parse(rowData.jttTaskContent);
	$('#sceneDataGrid2').datagrid({
		width:'100%',
		height:400,
		showPageList : false,
		rownumbers:false,
		singleSelect:true,
		autoRowHeight:false,
		pageSize:10,
		fitColumns:true,
		scrollbarSize:0,
		onClickCell: onClickOtherCell,
		columns:[[
			{
				field:'scenePattern',
				title:'情景模式',
				width:40,
				align:"center",
				endEdit:"false",
				formatter:function(value,rowData,rowIndex){
					for(var i=0;i<optiondata.length;i++){
						if(optiondata[i].spdDescribe == value){
							rowData.scenePatternId = optiondata[i].scenePatternId;
							return optiondata[i].spdDescribe;
						}
					}
					return value;
				},
				editor: {
					type: 'combobox',
					options: {
						valueField: 'spdDescribe',
						textField: 'spdDescribe',
						data: optiondata,
						required: true
					}
				}
			},
			{
				field:'executionTime',
				title:'执行时间',
				width:40,
				align:"center",
				editor:'text',

			},
			{
				field:'deleteAdd2',
				title:'删除',
				width:20,
				align:"center",

				formatter :
					function deleteAdd2(value, row, index) {
						return "<a href='#' onclick=\"myDeleteRows('"+row.scenePattern+"','scenePattern','sceneDataGrid2',0)\">删除</a>";
					}
			},
		]]
	})

	var rows=$('#sceneDataGrid2').datagrid("getRows");
	for(var a in obj){
		rows.push(obj[a]);
	}

	var jttWeeklyChoices = JSON.parse(rowData.jttWeeklyChoices);

	$('#uppTimingRepair .week').each(function(index){
		//	index = index+1;
		if(index ==6){
			index =1;
		}else{
			index = index+2;
		}
		for(var i in jttWeeklyChoices){
			if(jttWeeklyChoices[i] == index){
				console.log(index)
				$(this).prop("checked",true);
				break;
			}
		}
	})
	$('#sceneDataGrid2').datagrid("loadData", rows);
	console.log(rows)

	//打开修改窗口
	$("#uppTimingRepair").dialog('open');
	//填充文本框内容
	$("#name").val(rowData.jttTaskName);
	$("#room").val(JSON.parse(rowData.jttClassRoom)[0].hsAddCommunity);
	$("#time1").val(rowData.jttStartTime);
	$("#time2").val(rowData.jttEndTime);
}

function classRoomOn() {
	$("#classRoomDiv").dialog({
		title : "班级列表",
		top : getTop(330),
		left : getLeft(810),
		width : 800,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		},
	});
	//初始化班级表格
	$("#classRoomDataGrid").datagrid({
	});
	//查询班级名称
	queryOffice();
	$("#classRoomDiv").dialog('open');
}

// 加载房间数据
function queryOffice() {
	var roomName = $("#roomName").val();
	var roomState = $("#roomState").val();
	$.post("../queryOffice.action", {
		keyAdministrator : roomName,//公区名称
		houseEntrust4sell: roomState,//公区状态
	}, function(data) {
		if (data.code<0) {
			$('#classRoomDataGrid').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			$("#classRoomDataGrid").datagrid("loadData", data.body);
		}
	}, "json");
}
//添加教室名称
function addClassRoom() {
	var row = $('#classRoomDataGrid').datagrid('getChecked');
	var listInfoHouse4store=[];
	var listHsAddCommunity=[];
	for (var i in row){
		var infoHouse4store={};
		infoHouse4store.hsId=row[i].hsId;
		infoHouse4store.hsAddCommunity=row[i].hsAddCommunity;
		listInfoHouse4store.push(infoHouse4store);
		listHsAddCommunity.push(row[i].hsAddCommunity);
	}
	//显示名称
	$("#classRoomSelection").val(listHsAddCommunity);
	//隐藏数据,存数据库的
	$("#listInfoHouse4store").val(JSON.stringify(listInfoHouse4store));

	//显示名称
	$("#room").val(listHsAddCommunity);
	//隐藏数据,存数据库的
	$("#listInfoHouse4store2").val(JSON.stringify(listInfoHouse4store));

	$('#classRoomDiv').dialog('close');
}
//添加情景模式执行时间
function addModeTime() {
	$("#situationalPatternsDiv").dialog({
		title : "情景模式执行时间",
		top : 170,
		left : 420,
		width : 300,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#selectime").val("");
		},
	});
	selectMode(1);
	$("#situationalPatternsDiv").dialog('open');
}
//查询情景模式
function selectMode(type) {
	$.post("../querySceneMode.action", {
	}, function(data) {
		if (data.code < 0){
		} else {
			data=data.body;
			var html ="";
			for(var i in data){
				html +='<option id="'+data[i].spdId+'" value="'+data[i].spdId+'" data-id="'+data[i].spdNumber+'">'+data[i].spdDescribe+'</option>';
			}
			if(type=1){
				$('#situationalPatterns').html(html);
			}
			$('#situationalPatterns2').html(html);
		}
	});
}
//保存情景模式执行时间
function addSceneDataGrid() {
	var spdId=$("#situationalPatterns").val();
	var spdDescribe=$("#situationalPatterns").find("option:selected").text();
	var selectime=$("#selectime").val();
	if(spdDescribe !="" && selectime !=""){
		var rows=$('#sceneDataGrid').datagrid("getRows");
	}
	if(selectime==""){
		myTips('有必填项未填写!','error');
		return;
	}
	obj={};
	obj.scenePattern=spdDescribe;
	obj.scenePatternId=spdId;
	obj.executionTime=selectime;
	rows.push(obj);
	$('#sceneDataGrid').datagrid('loadData',rows);
	$('#situationalPatternsDiv').dialog('close');
}
//删除选择情景模式执行时间
function deleteAdd(value, row, index) {
	return "<a href='#' onclick=\"myDeleteRows('"+row.scenePattern+"','scenePattern','sceneDataGrid',0)\">删除</a>";
}
//执行添加定时任务
function addExecutionOfTasks() {
	var taskName=$("#taskName").val();//任务名称
	var listInfoHouse4store=$("#listInfoHouse4store").val();//教室信息
	var startTime=$("#startTime").val();//有效时间
	var endTime=$("#endTime").val();
	var listWeek=[];//选择星期
	$('.week').each(function () {
		if($(this).is(':checked')){
			listWeek.push($(this).val());
		}
	});
	var row = $('#sceneDataGrid').datagrid('getRows');//执行任务时间
	var checkFlag = 0;
	$('#addTimingRepair [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag!=0){
		myTips('有必填项未填写!','error');
		return;
	}
	if(listWeek.length == 0){
		myTips("请勾选星期","error");
		return;
	}
	$.ajax({
		url:"../addTitionalTasks.action",
		type:"post",
		data:{
			jttTaskName:taskName,
			jttClassRoom:listInfoHouse4store,
			jttStartTime:startTime,
			jttEndTime:endTime,
			jttWeeklyChoices:JSON.stringify(listWeek),
			jttTaskContent:JSON.stringify(row),
			jttTaskStatus:"正常"
		},
		success:function(result){
			console.log(result)
			if(result.code == 1){
				myTips(result.msg,"success");
				$("#addTimingRepair").dialog('close');
			}else{
				myTips(result.msg,"error");
			}
			selectJourTimingTasks(1);
		}
	})
}

//修改情景模式执行时间
function uppModeTime() {
	$("#situationalPatternsDiv2").dialog({
		title : "情景模式执行时间",
		top : 170,
		left : 420,
		width : 300,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		},
	});
	selectMode(2);
	$("#situationalPatternsDiv2").dialog('open');
}
function uppSceneDataGrid() {
	var spdId=$("#situationalPatterns2").val();
	var spdDescribe=$("#situationalPatterns2").find("option:selected").text();
	var selectime=$("#selectime2").val();
	if(spdDescribe !="" && selectime !=""){
		var rows=$('#sceneDataGrid2').datagrid("getRows");
	}
	obj={};
	obj.scenePattern=spdDescribe;
	obj.scenePatternId=spdId;
	obj.executionTime=selectime;
	rows.push(obj);
	$('#sceneDataGrid2').datagrid('loadData',rows);
	$('#situationalPatternsDiv2').dialog('close');
}

//删除选择情景模式执行时间
function deleteAdd2(value, row, index) {
	return "<a href='#' onclick=\"myDeleteRows('"+row.scenePattern+"','scenePattern','sceneDataGrid2',0)\">删除</a>";
}
function onclic(){
	$('#sceneDataGrid2').edatagrid({});
}


// 分页统计总条数
function getTimingTasksPageCount(page) {
	var pageSize = 15;

	$.ajax({
		url:"../queryTimingTasks.action",
		type:"post",
		data:{
			splitFlag: 0
		},
		success:function(data){
			if (data.code < 0 || data.body[0].totalNum == 0) {
				var countJson = {
					totalNum: 0,
				};
				getCountData(0, countJson, pageSize, page, "TimingTasks", 0);
			} else {
				data = data.body;
				var countJson = {
					totalNum: data[0].totalNum,
				};
				getCountData(1, countJson, pageSize, page, "TimingTasks", 0);
			}
		}
	})
}

//执行修改定时任务
function doUpdate(){
	var row = $("#virtualDataGrid").datagrid("getSelected");
	for(var i in JSON.parse(row.jttTaskContent)){
		$("#sceneDataGrid2").datagrid('endEdit',i);
	}
	// 任务Id
	var jttId= row.jttId
	//任务名称
	var taskName=$("#name").val();
	//教室信息
	var listInfoHouse4store=$("#listInfoHouse4store").val();
	if(listInfoHouse4store==''){
		listInfoHouse4store=row.jttClassRoom;
	}
	//有效时间
	var startTime=$("#time1").val();
	var endTime=$("#time2").val();

	//选择星期
	var listWeek=[];
	$('.week').each(function () {
		if($(this).is(':checked')){
			listWeek.push($(this).val());
		}
	});
	if(listWeek.length == 0){
		myTips("请勾选星期","error");
		return;
	}
	//情景模式
	var rows = $('#sceneDataGrid2').datagrid('getRows');

	$.ajax({
		url:"../uppTitionalTasks.action",
		type:"post",
		data:{
			jttId:jttId,
			jttTaskName:taskName,
			jttClassRoom:listInfoHouse4store,
			jttStartTime:startTime,
			jttEndTime:endTime,
			jttWeeklyChoices:JSON.stringify(listWeek),
			jttTaskContent:JSON.stringify(rows)
		},
		success:function(result){
			if(result.code == 1){
				myTips(result.msg,"success");
				$("#uppTimingRepair").dialog('close');
			}else{
				myTips(result.msg,"error");
			}
			selectJourTimingTasks(1);
		}
	})
}

//注销任务
function writeOffTasks() {
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if (row==null){
		myTips('请选择一条信息!','error');
		return;
	}
	// 任务Id
	var jttId= row.jttId
	$.ajax({
		url:"../uppTitionalTasks.action",
		type:"post",
		data:{
			jttId:jttId,
			jttTaskStatus:"注销"
		},
		success:function(result){
			if(result.code == 1){
				myTips("注销成功","success");
			}else{
				myTips("注销失败","error");
			}
			selectJourTimingTasks(1);
		}
	})
}
//启用任务
function enableTasks() {
	var row = $('#virtualDataGrid').datagrid('getSelected');
	if (row==null){
		myTips('请选择一条信息!','error');
		return;
	}
	// 任务Id
	var jttId= row.jttId
	$.ajax({
		url:"../uppTitionalTasks.action",
		type:"post",
		data:{
			jttId:jttId,
			jttTaskStatus:"正常"
		},
		success:function(result){
			if(result.code == 1){
				myTips("启用成功","success");
			}else{
				myTips("启用失败","error");
			}
			selectJourTimingTasks(1);
		}
	})
}
