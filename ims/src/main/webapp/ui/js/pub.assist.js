$(function(){
	initAssistance();
})

function initAssistance(){
	$("#addAssistDlg").dialog({
		title : "添加业绩受益人",
		top : getTop(370),
		left : getLeft(650),
		width : 650,
		height : 370,
		closed : true,
		cache : false,
		modal : true,
		onClose:function(){
			
		}
	});
	
	if ($('#addAssistanceTable').hasClass('datagrid-f')) {
		
	} else {
		
		$('#addAssistanceTable')
				.datagrid(
						{
							columns : [ [					

									{
										field : 'assistType',
										title : '类型',
										width : 20,
										align : 'center',
									},
									{
										field : 'assistPeople',
										title : '业绩受益人',
										width : 20,
										align : 'center',
									},
									{
										field : 'assistBonus',
										title : '比例',
										width : 20,
										align : 'center',
										editor : 'textbox'
									},
									{
										field : 'deleteAdd',
										title : '删除',
										width : 10,
										align : 'center',
										formatter : 
											function(value, row, index) {
												return "<a href='#' onclick=\"myDeleteRows('"+row.assistUserId+"','assistUserId','addAssistanceTable',0);\">删除</a>";
											}
									} ] ],
							width : '100%',
							height : '100%',
							singleSelect : true,
							autoRowHeight : false,
							scrollbarSize : 0,
							fitColumns : true,
//							onClickCell : onClickCell,//单击触发编辑
//							enableCellEdit : true,// 表示是否开启单元格编辑功能
						});
	}
}

function openAssist(type){
	$("#addAssistDlg").dialog('open');
	if(type==0){
		$(".addAssistType").val('出房');
	}else if(type==1){
		$(".addAssistType").val('存房');
	}
}

//添加一条业绩受益人到表格中
function addAssistToDG() {
	//业绩受益人
	var assistStorefront = _loginStore;
	var assistDepartment = $('#addAssistanceDept').val();
	var assistUserId = $('#addAssistanceStaff').val();
	var assistPeople = $('#addAssistanceStaff').find('option:selected').text();
	//类型
	var assistType = $('.addAssistType').val();
	//比例
	var assistBonus = $('.addAssistBonus').val();
	
	if (assistPeople == '') {
		$(".assistError").html("请选择业绩受益人");
		return;
	}
	if (assistType == '') {
		$(".assistError").html("请选择类型");
		return;
	}
	if (assistBonus == '') {
		$(".assistError").html("请输入比例");
		return;
	}
	var dataJson = {
			assistStorefront	: assistStorefront,
			assistDepartment	: assistDepartment,
			assistUserId 		: assistUserId,
			assistPeople 		: assistPeople,
			assistType 			: assistType,
			assistBonus 		: assistBonus
	};
	var rows = $("#addAssistanceTable").datagrid("getRows");
	if(percentValidate(rows,assistBonus,assistPeople)){
		$('#addAssistanceTable').datagrid('insertRow', {
			index : 0,
			row : dataJson
		});
	}
}

//验证比例是否合法
function percentValidate(rows,assistBonus,assistPeople){
	var a = 0;
	if(assistBonus <= 0 || assistBonus > 100){
		$(".assistError").html("比例错误");
		return false;
	}
	if(rows.length > 0){
		for(var i in rows){
			a += rows[i].assistBonus*1;
			if(rows[i].assistPeople == assistPeople){
				$(".assistError").html("业绩受益人重复");
				return false;
			}
		}
		if(a+assistBonus*1>100){
			$(".assistError").html("比例错误");
			return false;
		}
	}
	$(".assistError").html("");
	return true;
}


//单元格单击编辑
var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#addAssistanceTable').datagrid('validateRow', editIndex)) {
		$('#addAssistanceTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field) {
	if (endEditing()) {
		$('#addAssistanceTable').datagrid('selectRow', index).datagrid(
				'editCell', {
					index : index,
					field : field
				});
		editIndex = index;
	}
}

//点击保存添加业绩受益人
function doAddAssistance(){
	var rows = $("#addAssistanceTable").datagrid("getRows");
	var str = "";
	var percent = 0;
	if (rows.length == 0) {
		$(".assistError").html("没有可用于添加的数据");
		return;
	}
	for(var i in rows){
		str += rows[i].assistPeople +"：" + rows[i].assistBonus + "%；"
		percent += rows[i].assistBonus*1;
		if(rows[i].assistBonus <= 0 || rows[i].assistBonus > 100){
			$(".assistError").html("比例错误");
			return;
		}
	}
	var assType =  $(".addAssistType").val();
	if(percent==100){
		if(assType=='出房'){
			$(".add_source_assistUserName").val(str);
		}else if(assType=='存房'){
			$(".add_trusteeship_assistUserName").val(str);
		}
		$('#addAssistDlg').dialog('close');
	}else{
		$(".assistError").html("比例错误");
	}
}

//获取业绩受益人列表json数组
function getSelectiveAss(){
	var rows= $('#addAssistanceTable').datagrid("getRows");
	var assistRegisterPeople = '"assistRegisterPeople":"'+ _loginUserId + '"';
	var assistType= '"assistType":"' + $(".addAssistType").val() + '"';
	var jsonArray = '';
	for(var i in rows){
		var assistStorefront = '"assistStorefront":"' + rows[i].assistStorefront + '"';
		var assistDepartment = '"assistDepartment":"' + rows[i].assistDepartment + '"';
		var assistUserId= '"assistUserId":"' + rows[i].assistUserId + '"';
		var assistBonus = '"assistBonus":"'+rows[i].assistBonus+ '"';
		if(i==0){
			jsonArray += "{"+ assistRegisterPeople + "," + assistType + "," + assistStorefront + ","+ assistDepartment + ","+ assistUserId + "," + assistBonus+"}";
		}else{
			jsonArray += ",{"+ assistRegisterPeople + "," + assistType + "," + assistStorefront + ","+ assistDepartment + ","+ assistUserId + "," + assistBonus+"}";
		}
		
	}
	jsonArray =  "[" + jsonArray + "]";
	console.log('pub.assist.js:jsonArray=' + jsonArray);
	return jsonArray;
}