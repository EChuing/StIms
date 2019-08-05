$(function() {
	var s = $("sence[field='ck']");
	s.each(function(i) {
		$(this).click(function(){
			if(this.checked==true){
				alert(this.value);
			}
		});
	});

	$('#choseRoomsTable').css('overflow',"hidden");
	$('#noRentTable').datagrid({//情景指令初始化
		onDblClickRow: function(rowIndex,rowData){
			getSence(rowIndex,rowData);
		}
	});

	$('#addSettingTypeTable').datagrid({//情景类型初始化
		onClickRow:function(rowIndex, rowData) {
			onClickRow(rowIndex,"addSettingTypeTable");
		}
	})

	loadSelectList();/**加载下拉列表*/
	sceneMode();//查询情景模式名称信息
	querySituationalPatterns(1);
});

//分页统计总条数
function getnoRentTablePageCount(page){
	var pageSize = 20;
	var address = $('#address').val();
	var hsLeaseType = $('#hsLeaseType').val();
	$.post("../querySituationalPatterns.action", {
		address:address,
		leaseType:hsLeaseType,
		splitFlag:0
	},function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"noRentTable",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"noRentTable",0);
		}
	});
}

//查询情景模式以及设备安装地址
function querySituationalPatterns(page){
	var pageSize = 20;
	var startPage = (parseInt(page) - 1) * pageSize;

	var address = $('#address').val();
	var hsLeaseType = $('#hsLeaseType').val();
	$.post("../querySituationalPatterns.action", {
		startNum: startPage,
		endNum: pageSize,
		address:address,
		leaseType:hsLeaseType,
		// hsState:"正常",
		splitFlag:1
	},function(data) {
		console.log(data)
		if (data.code < 0){
			$('#noRentTable').datagrid({//情景设置第一页表格初始化
				data: [],
				view: myview,
				emptyMsg: '没有查询到符合记录的条件'
			});
			if(page==1){
				notCountPage(0, 0 ,"querySituationalPatterns","noRentTable");
			}else{
				notCountPage(page, 0 ,"querySituationalPatterns","noRentTable");
			}

		}else{
			data = data.body;
			// if(page==1){
			// 	_indexNum[0] = 0;
			// 	sourcePage(data[0].totalNum, page );
			// }
			if(data.length<pageSize){
				notCountPage(page, 2 , "querySituationalPatterns","noRentTable");
			}else{
				notCountPage(page, 1 , "querySituationalPatterns","noRentTable");
			}
			for(var i in data){
				var hsAddCommunity = data[i].hsAddCommunity==null?"":data[i].hsAddCommunity;
				var hsAddBuilding = data[i].hsAddBuilding==null?"":data[i].hsAddBuilding;
				var hsAddDoorplateno = data[i].hsAddDoorplateno==null?"":data[i].hsAddDoorplateno;
				data[i].address = hsAddCommunity+" "+hsAddBuilding+" "+hsAddDoorplateno;
			}
			$('#noRentTable').datagrid('loadData',data);
		}
	});
}
//单击情景模式显示详细情景指令
function getSence(rowIndex,rowData){
	sceneMode();//查询情景模式名称信息
	var deSwitch=[{value:'开'},{value:'关'}];
	$('#sence').datagrid({//初始化表格
		columns : [ [
			{
				field : 'ck',
				checkbox : true,
				width : 9,
			},
			{
				field : 'devNickname',
				title : '设备名称',
				width : 30,
				align : 'center',
			},
			{
				field : 'deSwitch',
				title : '设置状态',
				width : 25,
				align : 'center',
				formatter:function(value){
					for(var i=0; i<deSwitch.length; i++){
						if (deSwitch[i].value == value) return deSwitch[i].value;
					}
					return value;
				},
				editor:{
					type:'combobox',
					options:{
						valueField:'value',
						textField:'value',
						data:deSwitch,
						editable:false,
						required:true,
					}
				}
			},
			{
				field : 'devActivation',
				title : '启用状态',
				width : 25,
				align : 'center',
			},
		]],
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		selectOnCheck : false,
		checkOnSelect : false,
//		idField : 'id',翻页勾选存在
		onDblClickRow: function(rowIndex,rowData){
			updateDeviceInfo(rowIndex,rowData,2);
		},
		onCheck:function(rowIndex, rowData) {
			$('#sence').datagrid('updateRow', {
				index: rowIndex,
				row: {
					'devActivation': '启用'
				}
			});
		},
		onCheckAll :function(rows) {
			for (var i in rows){
				rows[i].devActivation='启用';
			}
			$('#sence').datagrid('loadData',rows);
			$.each(rows, function(index, item){
				if(item.devActivation=="启用"){
					$('#sence').datagrid('checkRow', index);
				}
			});
		},
		onUncheck:function(rowIndex, rowData) {
			$('#sence').datagrid('updateRow', {
				index: rowIndex,
				row: {
					'devActivation': '不启用'
				}
			});
		},
		onUncheckAll :function(rows) {
			for (var i in rows){
				rows[i].devActivation='不启用';
			}
			$('#sence').datagrid('loadData',rows);
		},
		onClickRow  : function(rowIndex, rowData) {
			onClickRow(rowIndex,"sence");
		},
	});
	$('#noRentDlg').dialog({
		title : '模式详情',
		top : getTop(280),
		left : getLeft(740),
		width : 800,
		height : 600,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			editIndex = undefined;
		}
	});
	$('#noRentDlg').dialog('open');
	querySituationalDirectives();
}

//查询设置情景模式详情
function querySituationalDirectives() {
	showLoading();
	var jsroPatternId=$("#selectSituationalType3").val();//情景模式名称ID
	var rowData=$('#noRentTable').datagrid("getSelected");
	$.post("../querySituationalDetails.action", {
		jsroHsId:rowData.jsroHsId,
		jsroPatternId:jsroPatternId
	},function(data) {
		hideLoading();
		if (data.code < 0){
			$('#sence').datagrid({
				data: [],
				view: myview,
				emptyMsg: '没有查询到符合记录的条件'
			});
		}
		else{
			data=data.body;
			$('#sence').datagrid('loadData',data);
			$.each(data, function(index, item){
				if(item.devActivation=="启用"){
					$('#sence').datagrid('checkRow', index);
				}
			});
		}
	})
}
//单次保存情景指令
function singleSaveInstruction() {
	var rowDevice=$('#sence').datagrid('getChecked');
	var rowHs=$('#noRentTable').datagrid('getSelected');
	var jsroHsId=rowHs.jsroHsId;
	var jsroPatternId=$('#selectSituationalType3').val();
	var co=_loginCompany;
	var jsroInstruction=[];
	if (rowDevice.length==0){
		myTips("请选择设备","error");
		return;
	}
	for (var i in rowDevice){
		var obj={
			devId:rowDevice[i].devId,
			devBrandId:rowDevice[i].devBrandId,
			devFirstType:rowDevice[i].devFirstType,
			devSecondType:rowDevice[i].devSecondType,
			status:rowDevice[i].deSwitch,
			sn:rowDevice[i].devAuthId,
			mac:rowDevice[i].devAuthSecret,
			brightness:rowDevice[i].brightness,
			colorTemperature:rowDevice[i].colorTemperature,
			temperature:rowDevice[i].temperature,
			pattern:rowDevice[i].pattern,
			windSpeed:rowDevice[i].windSpeed,
		}
		jsroInstruction.push(obj);
	}
	// $.post("http://tzrsnv.natappfree.cc/jiekou/campus/add/SituationalDirectives", {
	$.post("http://www.fangzhizun.com/jiekou/campus/add/SituationalDirectives", {
		co:co,
		jsroHsId:jsroHsId,
		jsroPatternId:jsroPatternId,
		jsroInstruction:JSON.stringify(jsroInstruction)
	}, function (data) {
		if (data.code ==0){
			$('#noRentDlg').dialog('close');
			querySituationalPatterns(1);
			myTips(data.msg,"success");
		}else{
			myTips(data.msg,"error");
		}
	})
}
//查询设备一级二级菜单
function queryDeviceMenu(rows,type) {
	var hsIdList = [];
	for(var i in rows){
		hsIdList.push(rows[i].hsId)
	}
	hsIdList = JSON.stringify(hsIdList);

	$.post("../queryDeviceType.action", {
		hsIdList : hsIdList,
		type	 : type
	},function(result) {
		if (result.code < 0){
			if(result.code == -2){
				$.messager.confirm("操作提示", result.msg+",点击确定前往设备列表", function(data) {
					if(data){
						$('#addScenWindowDlg').dialog('close');
						window.parent.addTab("设备列表","fg_intelligence.jsp","icon icon-shebeiguanli");
					}
				});
			}
			$('#choseDeviceTable').datagrid({//情景设置第一页表格初始化
				data: [],
				view: myview,
				emptyMsg: result.msg
			});
		}else {
			var resultData = result.body;
			if(result.code == 2){ //存在未设置安装位置的设备
				$.messager.defaults = { ok: "是", cancel: "否" };
				$.messager.confirm("操作提示", "存在设备没设置安装位置,是否前往设备列表设置安装位置？", function(data) {
					if(data){
						$('#addScenWindowDlg').dialog('close');
						window.parent.addTab("设备列表","fg_intelligence.jsp","icon icon-shebeiguanli");
					}else{
						loadData(resultData,type)
					}
				});
			}else{
				loadData(resultData,type)
			}
		}
	});
}

function loadData(data,type){
	var result = [];
	var panelMenu = [];
	for (var i in data){
		//情景设置一级、二级菜单
		if (type == 1 && data[i].devIdftId != null){
			var scen={
				idftId:data[i].idftId,
				idftName:data[i].idftName,
				idstId:data[i].idstId,
				idstName:data[i].idstName,
				devFirstType:data[i].devFirstType,
				devSecondType:data[i].devSecondType,
				switchingState:'关'
			}
			result.push(scen);
		}
		//面板设置一二级菜单
		if(type == 2 && data[i].devIdftId != null){
			var two={
				idftId:data[i].idftId,
				idftName:data[i].idftName,
				idstId:data[i].idstId,
				idstName:data[i].idstName,
				keyNumBer:""
			}
			if(data[i].idftId==22){
				two.keyNumBer="1号按键";
			}
			if(data[i].idftId==23){
				two.keyNumBer="1号按键";
			}
			if(data[i].idftId==28){
				two.keyNumBer="此面板不用做选择";
			}
			if(data[i].idftId==29){
				two.keyNumBer="此面板不用做选择";
			}
			panelMenu.push(two);//面板设置一级二级菜单
		}
	}
	if(type == 1){
		$("#choseDeviceTable").datagrid("loadData",result);//情景设置情景信息
	}else{
		$("#choseDeviceTable2").datagrid("loadData",panelMenu);
	}
}

//分页统计数据
function sourcePage(totalNum, page) {
	var pageNum = Math.ceil(totalNum / 20);
	$("#noRentTablePage").remove();
	$("#noRentTablePageDiv")
		.append(
			"<div class='tcdPageCode' id='noRentTablePage' style='text-align:center;'></div>");
	$("#noRentTablePage").createPage({
		onePageNums:17,
		totalNum:totalNum,
		pageCount : pageNum,
		current : 1,
		backFn : function(p) {
			if (p <= pageNum) {
				_pageNum[0] = p;
				_indexNum[0]=0;
				querySituationalPatterns(p);
			}
		}
	});
}

//弹出批量设置情景指令窗口
function openSceneWindow() {
	gotoStep('addScenWindow', 1);	//显示第一步的界面
	$("#addScenWindowDlg").dialog({
		title : '情景设置',
		top : getTop(460),
		left : getLeft(900),
		width : 900,
		height : 630,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			editIndex = undefined;
		}
	});
	$('#choseRoomsTable').datagrid({//未租设备信息
	});
	$("#addScenWindowDlg").dialog('open');
	sceneMode();			//查询情景模式名称信息
	queryRoom(1);	//查询未租房间信息
}

//查询情景模式名称信息
function sceneMode() {
	$.post("../querySceneMode.action", {
	}, function(data) {
		if (data.code < 0){
		} else {
			data=data.body;
			var html ="";
			for(var i in data){
				html +='<option id="'+data[i].spdId+'" value="'+data[i].spdId+'" data-id="'+data[i].spdNumber+'">'+data[i].spdDescribe+'</option>';
			}
			$('#selectSituationalType1').html(html);//情景设置:情景类型
			$('#selectSituationalType2').html(html);//面板设置：情景类型
			$('#selectSituationalType3').html(html);//情景指令详情：情景类型

		}
	});
}
//查询未租房间信息
function queryRoom(page) {
	var startNum = (parseInt(page) - 1) * 15;
	var onePageNums = 15;
	var qhAddCity = $('#searchAddCity').find('option:selected').text();
	var qhAddDistrict = $('#searchAddDistrict').find('option:selected').text();
	var qhAddZone = $('#searchAddZone').find('option:selected').text();
	var qhAddCommunity = $('#searchAddCommunity').val();
	var qhAddBuilding = $('#searchAddBuilding').val();
	var qhAddDoorplateno = $('#searchAddDoorplateno').val();
	var leaseType = $('#addPanelWindowDlg').is(':hidden')?$('#leaseType').val():$('#addPanelLeaseType').val();
	var devAddress = $('#addPanelWindowDlg').is(':hidden')?$('#devAddress').val():$('#addPanelDevAddress').val();
	$.post("../queryRooms.action", {
		startNum : startNum,
		endNum : onePageNums,
		splitFlag : 1,
		hsLeaseState:"已租",
		hsAddCity : qhAddCity,
		hsAddDistrict : qhAddDistrict,
		hsAddZone : qhAddZone,
		hsAddCommunity : qhAddCommunity,
		hsAddBuilding : qhAddBuilding,
		hsAddDoorplateno : qhAddDoorplateno,
		hsState : leaseType,
		address:devAddress
	}, function(data) {
		if (data.code < 0){
			$('#choseRoomsTable').datagrid({
				data: [],
				view: myview,
				emptyMsg: '没有查询到符合记录的条件'
			});
		}
		else {
			data=data.body;
			if(data.length<onePageNums){
				notCountPage(page, 2 , "queryRoom","choseRoomsTable");
			}else{
				notCountPage(page, 1 , "queryRoom","choseRoomsTable");
			}
			for(var i in data){
				data[i].hsLeaseType = data[i].hsLeaseType == 4?"注销":"正常"
				var hsAddCommunity = data[i].hsAddCommunity==null?"":data[i].hsAddCommunity;
				var hsAddBuilding = data[i].hsAddBuilding==null?"":data[i].hsAddBuilding;
				var hsAddDoorplateno = data[i].hsAddDoorplateno==null?"":data[i].hsAddDoorplateno;
				data[i].address = hsAddCommunity+" "+hsAddBuilding+" "+hsAddDoorplateno;
			}
			$("#choseRoomsTable").datagrid("loadData",data);
		}
	});
}

//批量设置情景指令下一步
function nextStep(){
	var rows = $('#choseRoomsTable').datagrid('getChecked');
	if(rows.length == 0){
		myTips('请选择需要设置的地址');
		return;
	}
	var switchingState = [{value:'关'},{value:'开'}];
	gotoStep('addScenWindow', 2);
	$('#choseDeviceTable').datagrid({
		columns : [ [
			{
				field : 'ck',
				checkbox : true,
				width : '4%',
			},
			{
				field : 'idftName',
				title : '一级名称',
				width : '273',
				align : 'center',
			},
			{
				field : 'idstName',
				title : '二级名称',
				width : '32%',
				align : 'center',
			},
			{
				field : 'switchingState',
				title : '开关状态',
				width : '32%',
				align : 'center',
				formatter:function(value){
					for(var i=0; i<switchingState.length; i++){
						if (switchingState[i].planId == value) return switchingState[i].value;
					}
					return value;
				},
				editor:{
					type:'combobox',
					options:{
						valueField:'value',
						textField:'value',
						data:switchingState,
						editable:false,
					}
				}
			},
		]],
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		selectOnCheck : false,
		checkOnSelect : false,
		onClickRow  : function(rowIndex, rowData) {
			onClickRow(rowIndex,"choseDeviceTable");
		},
		onDblClickRow : function(rowIndex, rowData) {
			updateDeviceInfo(rowIndex,rowData,1);
		}
	});
	queryDeviceMenu(rows,1);
}
//批量设置情景指令编辑一行触发
function onClickRow(index,id) {
	if (editIndex != index){
		if (endEditing(id)) {
			$('#'+id).datagrid('selectRow', index).datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#'+id).datagrid('selectRow', editIndex);
		}
	}
}
var editIndex = undefined;
function endEditing(id) {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#'+id).datagrid('validateRow', editIndex)) {
		$('#'+id).datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
//设置空调、调节灯、冷暖灯具体参数
function updateDeviceInfo(index,data,type){
	var htmls = "";
	var width = 0,height = 0;
	console.log(data)
	console.log(data.devFirstType +"   "+ data.devSecondType)
	if(data.devFirstType == 4 && data.devSecondType == 4){	//空调
		htmls = '<div style="margin-left:10px;float:left"> 温度 : <input id="temperature" onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(0)\')" placeholder="请输入16-32的整数" clear="clear"/> </div> <div style="margin-left:10px;float:left"> 模式 :' +
			' <select id="pattern"> <option value="00">自动</option> <option value="01">制冷</option> <option value="03">制热</option> <option value="04">除湿</option> <option value="05">送风</option> </select> </div> <div style="margin:10px 0 0 10px;float:left"> 风速 : <select id="windSpeed"<> <option value="00">自动</option> ' +
			' <option value="03">高</option> <option value="02">中</option> <option value="01">低</option> </select> </div> '/*<div style="margin:10px 0 0 10px;float:left"> 扫风 : <select clear="clear"> <option>自动</option> <option>手动</option> </select> </div>*/
		width = 318; height = 140;
	}else if(data.devFirstType == 23 && data.devSecondType == 31){//冷暖灯
		htmls = '<div style="margin-left:25%;float:left"> 亮度 : <input id="brightness" type="number" style="width:110px" onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(1)\')" placeholder="请输入1-100的整数" clear="clear"/> </div> ' +
			'<div style="margin:10px 0 0 25%;float:left"> 色温 : <input id="colorTemperature" type="number" style="width:110px" onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(2)\')" placeholder="请输入1-100的整数" clear="clear"/> ' +
			'</div>'
		width = 318; height = 140;
	}else if(data.devFirstType == 23 && data.devSecondType == 36){	//调节灯
		htmls = '<div style="margin-left:25%;float:left"> 亮度 : <input id="brightness1" type="number" style="width:110px" ' +
			'onkeyup="searchOnkeyup(this.id, \'_indexNum[0] = 0;checkNumber(3)\')" placeholder="请输入1-100的整数" clear="clear"/> </div>'
		width = 318; height = 140;
	}
	$('#DeviceDetailedInfoDiv').html(htmls);

	if (type==1){
		if (data.instructions!=undefined){
			if(data.devFirstType == 4 && data.devSecondType == 4){	//空调
				console.log(data.instructions.windSpeed)
				$("#windSpeed").val(data.instructions.windSpeed);
				$("#temperature").val(data.instructions.temperature);
				$("#pattern").val(data.instructions.pattern);
			}else if(data.devFirstType == 23 && data.devSecondType == 36){	//调节灯
				$("#brightness1").val(data.instructions.brightness);
			}else if(data.devFirstType == 23 && data.devSecondType == 31){//冷暖灯
				$("#brightness").val(data.instructions.brightness);
				$("#colorTemperature").val(data.instructions.colorTemperature);
			}
		}
	}
	if (type==2) {
		if(data.devFirstType == 23 && data.devSecondType == 36){	//调节灯
			$("#brightness1").val(data.brightness);
		}else if(data.devFirstType == 23 && data.devSecondType == 31){//冷暖灯
			$("#brightness").val(data.brightness);
			$("#colorTemperature").val(data.colorTemperature);
		}
		else if(data.devFirstType == 4 && data.devSecondType == 4){	//空调
			$("#windSpeed").val(data.windSpeed);
			$("#temperature").val(data.temperature);
			$("#pattern").val(data.pattern);
		}
		data.idstName=data.devNickname;
	}
	$('#saveButton').attr('onclick','saveDetailedInfo('+index+','+type+')');
	$("#updateDeviceDlg").dialog({
		title : data.idstName+'指令设置',
		top : getTop(height),
		left : getLeft(width),
		width : width,
		height : height,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});

	if((data.devFirstType == 4 && data.devSecondType == 4) || (data.devFirstType == 23 && data.devSecondType == 31)
		|| (data.devFirstType == 23 && data.devSecondType == 36)){
		$('#updateDeviceDlg').dialog('open');
	}else{
		myTips("该设备无需详细设置");
		return;
	}
}

function saveDetailedInfo(index,type){
	if (type==1){
		var rows = $('#choseDeviceTable').datagrid("getRows");
		console.log(rows)
		var row = rows[index];
		var obj = {
			temperature:"",
			pattern:"",
			windSpeed:"",
			brightness:"",
			colorTemperature:"",
		};

		if (row.devFirstType==4 && row.devSecondType==4){
			obj.temperature =($('#temperature').val());
			obj.pattern=($('#pattern').val());
			obj.windSpeed=($('#windSpeed').val());
		}
		if (row.devFirstType==23){
			var brightness="";
			if (row.devSecondType==31){
				brightness=$('#brightness').val();
				var colorTemperature = $("#colorTemperature").val();//调节色温
				obj.brightness =(brightness);
				obj.colorTemperature=(colorTemperature);
			}
			if (row.devSecondType==36){
				brightness=$('#brightness1').val();
				obj.brightness =(brightness);
			}
		}

		$('#choseDeviceTable').datagrid('updateRow', {
			index: index,
			row: {
				'instructions': obj
			}
		});
		console.log($('#choseDeviceTable').datagrid("getSelected"))
	}
	else if (type==2){
		var rows = $('#sence').datagrid("getSelected");
		if (rows.devFirstType==4 && rows.devSecondType==4){
			rows.temperature =($('#temperature').val());
			rows.pattern=($('#pattern').val());
			rows.windSpeed=($('#windSpeed').val());
		}
		if (rows.devFirstType==23){
			var brightness="";
			if (rows.devSecondType==31){
			brightness=$('#brightness').val();
			rows.brightness=brightness;
			var colorTemperature = $("#colorTemperature").val();//调节色温
			rows.colorTemperature=colorTemperature;
			}
			if (rows.devSecondType==36){
				brightness=$('#brightness1').val();
				rows.brightness=brightness;
			}
		}
	}
	$('#updateDeviceDlg').dialog('close');
}

//检查input框是否符合范围要求
function checkNumber(type){
	var number = '';
	var text = '';
	var minNumber = 0,maxNumber = 0;
	if(type == 0){ //空调温度
		number = $("#temperature").val();
		minNumber = 16;	maxNumber = 32;
		text = '请输入大于16 ，小于32的整数';
	}else{
		minNumber = 1;	maxNumber = 100;
		text = '请输入大于1 ，小于100的整数';
	}
	if(type == 1){ //冷暖灯亮度
		number = $("#brightness").val();
	}
	if(type == 2){ //冷暖灯色温
		number = $("#colorTemperature").val();
	}
	if(type == 3){ //调节灯亮度
		number = $("#brightness1").val();
	}

	var regexp = /^\d*$/
	if(regexp.test(number)){
		if(number > maxNumber || number < minNumber){
			myTips(text);
			$('#updateDeviceDlg [clear="clear"]').val('');
			return;
		}
	}else{
		myTips(text);
		$('#updateDeviceDlg [clear="clear"]').val('');
		return;
	}
}

//设备全开、全关 type 0=关 1=开
function equipmentSwitch(type) {
	var rows = $('#choseDeviceTable').datagrid('getRows')
	var switchingState = type==1?'开':'关';
	for (i = 0; i < rows.length; i++) {
		var index = $('#choseDeviceTable').datagrid('getRowIndex', rows[i]);
		console.log(index);
		$('#choseDeviceTable').datagrid('updateRow', {
			index: index,
			row: {
				'switchingState': switchingState
			}
		});
	}
}
//保存情景指令信息
function addScene() {
	$('#choseDeviceTable').datagrid('endEdit', editIndex);//结束下拉编辑状态
	var rowHouser = $("#choseRoomsTable").datagrid("getChecked");//房源信息
	var rowDevice = $("#choseDeviceTable").datagrid("getChecked");//设备信息
	var jsroPatternId=$("#selectSituationalType1").val();//情景模式名称ID
	var deviceList=[];
	var hsList=[];

	if (rowDevice.length==0){//判断是否选择设备，无选择，返回提示
		myTips("请选择需要设置的设备","error");
		return;
	}
	for (var i in rowHouser){//获取未租房间ID,并且放进一个数组
		var hsId=rowHouser[i].hsId;
		hsList.push(hsId);
	}

	for (var j in rowDevice){
		var instructions="";
		if (rowDevice[j].instructions!=undefined){
			instructions=rowDevice[j].instructions;
		}
		var devObj={
			idftId:rowDevice[j].idftId,
			idstId:rowDevice[j].idstId,
			state:rowDevice[j].switchingState,//设备开关状态
			instructions:instructions
		}
		deviceList.push(devObj);
	}
	showLoading();
	$.post("../insertScene.action", {
		hsIdList:JSON.stringify(hsList),
		jsroImsState:JSON.stringify(deviceList),
		jsroPatternId:jsroPatternId
	}, function(data) {
		hideLoading();
		if (data.code ==1){
			$('#addScenWindowDlg').dialog('close');
			querySituationalPatterns(1);
			myTips(data.msg,"success");
		}else{
			myTips(data.msg,"error");
		}
	});
}

//弹出批量设置面板设置窗口
function openPanelWindow() {
	//显示第一步的界面
	gotoStep('addPanelWindow', 1);
	$("#addPanelWindowDlg").dialog({
		title : '批量设置面板',
		top : getTop(460),
		left : getLeft(900),
		width : 900,
		height : 630,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addPanelWindowDlg input").val('');
			editIndex = undefined;
		}
	});
	$('#choseRoomsTable2').datagrid({});			//表格初始化
	$("#addPanelWindowDlg").dialog('open');
	queryRooms(1);
}

function queryRooms(page) {
	var startNum = (parseInt(page) - 1) * 15;
	var onePageNums = 15;
	console.log('page:   '+startNum);
	var leaseType = $('#addPanelWindowDlg').is(':hidden')?$('#leaseType').val():$('#addPanelLeaseType').val();
	var devAddress = $('#addPanelWindowDlg').is(':hidden')?$('#devAddress').val():$('#addPanelDevAddress').val();
	$.post("../queryRooms.action", {
		startNum : startNum,
		endNum : onePageNums,
		splitFlag : 1,
		hsLeaseState:"已租",
		hsState:leaseType,
		address:devAddress
	}, function(data) {
		if (data.code < 0){
			$('#choseRoomsTable2').datagrid({
				data: [],
				view: myview,
				emptyMsg: '请选择设备类型'
			});
		}
		else {
			data=data.body;
			if(data.length<onePageNums){
				notCountPage(page, 2 , "queryRooms","choseRoomsTable2");
			}else{
				notCountPage(page, 1 , "queryRooms","choseRoomsTable2");
			}
			for(var i in data){
				data[i].hsLeaseType = data[i].hsLeaseType == 4?"注销":"正常"
				var hsAddCommunity = data[i].hsAddCommunity==null?"":data[i].hsAddCommunity;
				var hsAddBuilding = data[i].hsAddBuilding==null?"":data[i].hsAddBuilding;
				var hsAddDoorplateno = data[i].hsAddDoorplateno==null?"":data[i].hsAddDoorplateno;
				data[i].address = hsAddCommunity+" "+hsAddBuilding+" "+hsAddDoorplateno;
			}
			$("#choseRoomsTable2").datagrid("loadData",data);
		}
	});
}

//分页统计数据
function getchoseRoomsTable2PageCount(page){
	var startNum = (parseInt(page) - 1) * 15;
	var pageSize = 15;
	console.log('page:   '+startNum);
	var leaseType = $('#addPanelWindowDlg').is(':hidden')?$('#leaseType').val():$('#addPanelLeaseType').val();
	var devAddress = $('#addPanelWindowDlg').is(':hidden')?$('#devAddress').val():$('#addPanelDevAddress').val();
	$.post("../queryRooms.action", {
		startNum : startNum,
		endNum : onePageNums,
		splitFlag : 0,
		hsLeaseState:"已租",
		leaseType:leaseType,
		address:devAddress
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"choseRoomsTable2",0);
		}
		else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"choseRoomsTable2",0);
		}
	});
}

//面板设置下一页
function nextStep2(type) {
	var rows = $('#choseRoomsTable2').datagrid('getChecked');
	if(rows.length == 0){
		myTips('请选择需要设置的地址');
		return;
	}
	if(type==2){
		var keyNumber= [{value:'1号按键'},{value:'2号按键'},{value:'3号按键'},{value:'4号按键'}];
		sceneMode();
		gotoStep('addPanelWindow', 2);
		$('#choseDeviceTable2').datagrid({//初始化表格
			columns : [ [
				{
					field : 'ck',
					checkbox : true,
				},
				{
					field : 'idftName',
					title : '一级面板',
					width : '32%',
					align : 'center',
				},
				{
					field : 'idstName',
					title : '二级面板',
					width : '32%',
					align : 'center',
				},
				{
					field : 'keyNumBer',
					title : '按键值',
					width : '32%',
					align : 'center',
					formatter:function(value){
						for(var i=0; i<keyNumber.length; i++){
							if (keyNumber[i].planId == value) return keyNumber[i].value;
						}
						return value;
					},
					editor:{
						type:'combobox',
						options:{
							valueField:'value',
							textField:'value',
							data:keyNumber,
							editable:false,
						}
					}
				},
			]],
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			selectOnCheck : true,
			checkOnSelect : false,
			onClickRow  : function(rowIndex, rowData) {
				onClickRow(rowIndex,"choseDeviceTable2");
			},
		});
		queryDeviceMenu(rows,2);
	}
}

//保存面板设置信息
function addPanelScenario() {
	$('#choseDeviceTable2').datagrid('endEdit', editIndex);			//结束下拉编辑状态
	var hsIdList=[];
	var row1 = $("#choseRoomsTable2").datagrid("getChecked");  		//房源信息
	var row2 = $("#choseDeviceTable2").datagrid("getChecked");		//面板信息
	var sceneId=$("#selectSituationalType2").val();//情景模式名称ID

	var sdpNumber=$("#" + sceneId).attr("data-id");

	if (idstId==null || idstId==""){
		idstId=0
	}
	if (row1.length==0){
		myTips("请选择房源","error");
		return;
	}
	if (row2.length==0){
		myTips("请选择面板","error");
		return;
	}
	for(var i in row1){
		var hsId=row1[i].hsId;
		hsIdList.push(hsId);
	}
	//二级面板ID
	var idftId=row2[0].idftId;
	var idstId=row2[0].idstId;
	if (idstId=="" || idstId==null){
		idstId=0;
	}
	var keyNumber=0;
	console.log(idftId+"   "+idstId)
	if(idftId==22){
		//按键值
		keyNumber=row2[0].keyNumBer;
		//针对情景面板
		if(keyNumber=="1号按键"){
			keyNumber=0;
		}else if(keyNumber=="2号按键"){
			keyNumber=1;
		}
		else if(keyNumber=="3号按键"){
			keyNumber=2;
		}
		else if(keyNumber=="4号按键"){
			keyNumber=3;
		}
	}
	if(idftId==23){//插卡面板
		//按键值
		keyNumber=row2[0].keyNumBer;
		//针对情景面板
		if(keyNumber=="1号按键"){
			keyNumber=0;
		}else if(keyNumber=="2号按键"){
			keyNumber=1;
		}
	}
	if(idftId==28){
		//只针对伊利莎白
		//1回家模式、2离家模式、4睡眠模式、6休闲模式、7就餐模式
		if (sdpNumber==1 ||sdpNumber==2 || sdpNumber==4 ||sdpNumber==6 ||sdpNumber==7){
			if (sdpNumber==1){
				keyNumber="0";
			}
			else if (sdpNumber==2){
				keyNumber="1";
			}
			else if (sdpNumber==7){
				keyNumber="2";
			}
			else if (sdpNumber==6){
				keyNumber="3";
			}
			else if (sdpNumber==4){
				keyNumber="4";
			}
		}else{
			myTips("只支持回家模式、离家模式、就餐模式、休闲模式、睡眠模式","error");
			return;
		}
	}
	if(idftId==29){
		//只针对小海
		//1回家模式、2离家模式、4睡眠模式 、7就餐模式、8影音模式、9会客模式、10起床模式、11阅读模式
		if(sdpNumber==1 ||sdpNumber==2 || sdpNumber==4|| sdpNumber==7
			||sdpNumber==8 || sdpNumber==9 ||sdpNumber==10 || sdpNumber==11){
			if (sdpNumber==1){
				keyNumber="0";
			}
			else if (sdpNumber==2){
				keyNumber="1";
			}
			else if (sdpNumber==7){
				keyNumber="2";
			}
			else if (sdpNumber==8){
				keyNumber="3";
			}
			else if (sdpNumber==9){
				keyNumber="4";
			}
			else if (sdpNumber==4){
				keyNumber="5";
			}
			else if (sdpNumber==10){
				keyNumber="6";
			}
			else if (sdpNumber==11){
				keyNumber="7";
			}
		}else {
			myTips("不支持娱乐模式、休闲模式","error");
			return;
		}
	}
	showLoading();
	$.post("../addPanel.action", {
		hsIdList:JSON.stringify(hsIdList),
		jsroPatternId:sceneId,
		idstId:idstId,
		idftId:idftId,
		cpKeyValue:keyNumber
	}, function(data) {
		hideLoading();
		if (data.code ==1){
			$('#addPanelWindowDlg').dialog('close');
			myTips(data.msg,"success");
		} else {
			myTips(data.msg,"error");
		}
	});
}

/**
 * 加载下拉列表
 */
function loadSelectList() {
	for ( var i in _loginCompanyRentDistrict) {
		$('#searchDistrict').append(
			'<option value="' + _loginCompanyRentDistrict[i] + '">'
			+ _loginCompanyRentDistrict[i] + '</option>');
		$('#searchAddDistrict').append(
			'<option value="' + _loginCompanyRentDistrict[i] + '">'
			+ _loginCompanyRentDistrict[i] + '</option>');
	}
	for ( var i in _saType) {
		$('#searchSaType').append(
			'<option value="' + _saType[i] + '">' + _saType[i]
			+ '</option>');
		$('#add_asset_type').append(
			'<option value="' + _saType[i] + '">' + _saType[i]
			+ '</option>');
		$('#update_asset_type').append(
			'<option value="' + _saType[i] + '">' + _saType[i]
			+ '</option>');
	}
	for ( var i in _assetsType) {
		$('#searchSaClassify').append(
			'<option value="' + _assetsType[i].type + '">'
			+ _assetsType[i].type + '</option>');
		$('#add_asset_classify').append(
			'<option value="' + _assetsType[i].type + '">'
			+ _assetsType[i].type + '</option>');
		$('#update_asset_classify').append(
			'<option value="' + _assetsType[i].type + '">'
			+ _assetsType[i].type + '</option>');
	}
	for ( var i in _saUse) {
		$('#searchSaUse').append(
			'<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
		$('#add_asset_use').append(
			'<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
		$('#update_asset_use').append(
			'<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
	}
	for ( var i in _saStatus) {
		$('#searchSaState').append(
			'<option value="' + _saStatus[i] + '">' + _saStatus[i]
			+ '</option>');
		$('#add_asset_status').append(
			'<option value="' + _saStatus[i] + '">' + _saStatus[i]
			+ '</option>');
		$('#update_asset_status').append(
			'<option value="' + _saStatus[i] + '">' + _saStatus[i]
			+ '</option>');
	}
}
//新增情景模式类型
function openSettingTypeWindow(){
	var visible=[{value:'可见'},{value:'不可见'}];
	$('#addSettingTypeTable').datagrid({//初始化表格
		columns : [ [
			{
				field : 'spdDescribe',
				title : '情景模式',
				width : '60%',
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
				field : 'spdPatternsAreVisible',
				title : '微信端首页可见性',
				width : '40%',
				align : 'center',
				formatter:function(value){
					for(var i=0; i<visible.length; i++){
						if (visible[i].value == value) return visible[i].value;
					}
					return value;
				},
				editor:{
					type:'combobox',
					options:{
						valueField:'value',
						textField:'value',
						data:visible,
						editable:false,
						required:true,
					}
				}
			},
		]],
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		selectOnCheck : true,
		checkOnSelect : false,
		onClickRow  : function(rowIndex, rowData) {
			onClickRow(rowIndex,"addSettingTypeTable");
		},
	});

	$("#situationalTypesDlg").dialog({
		title : '情景模式类型窗口',
		top : getTop(430),
		left : getLeft(600),
		width : 600,
		height : 430,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			editIndex = undefined;
		}
	});
	$("#situationalTypesDlg").dialog('open');
	querySceneMode();
}

function querySceneMode(){
	$.post("../querySceneMode.action", {
	}, function(data) {
		if (data.code < 0){
		} else {
			data=data.body;
			for (var i in data){
				console.log(data[i].spdPatternsAreVisible)
				data[i].spdPatternsAreVisible = data[i].spdPatternsAreVisible=="1"?"可见":"不可见";
			}
			$("#addSettingTypeTable").datagrid("loadData",data);//情景模式类型
		}
	});
}

// //点击一行触发
// function onClickRow2(index) {
// 	if (editIndex2 != index){
// 		if (endEditing2()) {
// 			$('#addSettingTypeTable').datagrid('selectRow', index).datagrid('beginEdit', index);
// 			editIndex2 = index;
// 		} else {
// 			$('#addSettingTypeTable').datagrid('selectRow', editIndex2);
// 		}
// 	}
// }
//
// //结束编辑
// var editIndex2 = undefined;
// function endEditing2() {
// 	if (editIndex2 == undefined) {
// 		return true;
// 	}
// 	if ($('#addSettingTypeTable').datagrid('validateRow', editIndex2)) {
// 		$('#addSettingTypeTable').datagrid('endEdit', editIndex2);
// 		editIndex2 = undefined;
// 		return true;
// 	} else {
// 		return false;
// 	}
// }
// // 添加情景类型点击一行触发
// function onClickRow3(index) {
// 	console.log(index)
// 	if (editIndex3 != index){
// 		if (endEditing3()) {
// 			$('#addSettingTypeTable').datagrid('selectRow', index).datagrid('beginEdit', index);
// 			editIndex3 = index;
// 		} else {
// 			$('#addSettingTypeTable').datagrid('selectRow', editIndex3);
// 		}
// 	}
// }
// var editIndex3 = undefined;
// function endEditing3() {
// 	if (editIndex3 == undefined) {
// 		return true;
// 	}
// 	if ($('#addSettingTypeTable').datagrid('validateRow', editIndex3)) {
// 		$('#addSettingTypeTable').datagrid('endEdit', editIndex3);
// 		editIndex3 = undefined;
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// //添加
// function append2(){
// 	if (endEditing()){
// 		$('#addSettingTypeTable').datagrid('appendRow', {});
// 		editIndex = $('#addSettingTypeTable').datagrid('getRows').length-1;
// 		$('#addSettingTypeTable').datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
// 	} else {
// 		myTips('数据不完整', 'error');
// 	}
// }

//保存
function accept2(){
	if (endEditing("addSettingTypeTable")){
		$('#addSettingTypeTable').datagrid('acceptChanges');
		return 'success';
	} else {
		myTips('数据不完整', 'error');
		return 'error';
	}
}

//取消编辑
function cancelEditing(){
	if (editIndex == undefined){
		myTips('请选择一条记录', 'error');
		return
	}
	$('#addSettingTypeTable').datagrid('cancelEdit', editIndex);
	var rows = $('#addSettingTypeTable').datagrid('getRows')
	if(rows[rows.length-1].spdId == undefined){
		$('#addSettingTypeTable').datagrid('deleteRow', editIndex)
	}
	editIndex = undefined;
}

function doUpdateSituationalTypes(){
	var rows = $('#addSettingTypeTable').datagrid('getRows');
	accept2();
	if (rows.length == 0) {
		myTips('无情景类型可修改', 'error');
		return;
	}

	var jsonArray = [];
	for(var i in rows){
		var obj = {};
		obj.spdPatternsAreVisible = rows[i].spdPatternsAreVisible=="可见"?1:2;
		obj.spdDescribe =  rows[i].spdDescribe;
		obj.spdId = rows[i].spdId;
		jsonArray.push(obj);
	}
	showLoading();
	$.post("../updateSituationalTypes.action",{
		situationalPatternsList : JSON.stringify(jsonArray)
	}, function (data) {
		hideLoading();
		if(data.code < 0){
			myTips(data.msg,"error");
			return;
		}else {
			myTips(data.msg,"success");
			$("#situationalTypesDlg").dialog('close');
			return;
		}
	});
}

//添加情景类型窗口
function openAddSettingType(){
	$("#addSituationalTypesDlg").dialog({
		title : '添加情景类型窗口',
		top : getTop(115),
		left : getLeft(410),
		width : 410,
		height : 115,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addSituationalTypeDiv').html('');
		}
	});

	addSettingType();
	$('#addSituationalTypesDlg').dialog('open');
}

//添加情景类型按钮
function addSettingType(){
	var htmls = '<div class="situationalTypeDiv" style="margin-top:5px;float:left"> 情景类型 : <input class="spdDescribe" style="margin-right:10px"/> 微信端首页可见性 : <select class="spdPatternsAreVisible" style="width:80px;margin-right:3px"> ' +
		'<option value="1">可见</option> <option value="2">不可见</option> </select><img src="img/minus.png" class="cleanItem" style="height:20px;width:20px;margin: 0px 0 -7px 0" /></div>'

	var num = $('.situationalTypeDiv').length;
	var height = 115+(num+1)*25

	console.log(height)
	$('#addSituationalTypesDlg').dialog({
		height:height
	}).dialog("open");

	$('#addSituationalTypeDiv').append(htmls);
}

//删除情景类型
$("#addSituationalTypesDlg").delegate(".cleanItem","click",function(){
	$(this).parent().remove();

	var num = $('.situationalTypeDiv').length;
	var height = 115+num*25

	console.log(height)
	$('#addSituationalTypesDlg').dialog({
		height:height
	}).dialog("open");
})

//执行添加情景类型
function doAddSituationalTypes(){
	var jsonArray = [];
	$('.situationalTypeDiv').each(function(){
		var spdDescribe = $(this).children('.spdDescribe').val();
		var spdPatternsAreVisible = $(this).children('.spdPatternsAreVisible').val();

		if(spdDescribe != ''){
			var item = {};
			item["spdDescribe"] = spdDescribe;
			item["spdPatternsAreVisible"] = spdPatternsAreVisible;
			jsonArray.push(item);
		}
	});

	if(jsonArray.length == 0){
		myTips("请添加情景类型","error");
		return;
	}

	showLoading();
	$.post("../insertSituationalTypes.action",{
		situationalPatternsList : JSON.stringify(jsonArray)
	}, function (data) {
		hideLoading();
		if(data.code < 0){
			myTips(data.msg,"error");
			return;
		}else {
			myTips(data.msg,"success");
			$('#addSituationalTypesDlg').dialog('close');
			querySceneMode();
			return;
		}
	});
}