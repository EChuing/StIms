var wegType = 1;
$(function() {
	$('#form-submit-overlay').append('<div id="form-submit-weg-loading"></div>');
	queryWegReading(1,0);
	for (var i in _loginCompanyRentDistrict) {
		$('#searchAddDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
	//排序点击事件
	$(document).click(function(e) {
		var clickId = $(e.target).attr('id');
		if(!clickId){
			$("#theSortDlg").fadeOut();
			return;
		}
		if(clickId=="showTheSortButton" || clickId=="showTheSortjia"){

		}else if(clickId.indexOf("theSortTerm")>-1){
			var alltheSortTerm = $('.theSortTerm');
			$('.theSortTerm').each(function(){
				$(this).removeClass("theSortTermSelect");
			});
			$("#"+clickId).addClass("theSortTermSelect");
			$('#theSortTermInput').val($("#"+clickId).attr("searchVal"));
			if(wegType == 1){
				relationDate(1, 0);
			}else if(wegType == 2){
				longRangeDate(1, 0);
			}
		}else if(clickId.indexOf("theSortContrary")>-1){
			var alltheSortContrary = $('.theSortContrary');
			$('.theSortContrary').each(function(){
				$(this).removeClass("theSortContrarySelect");
			});
			$("#"+clickId).addClass("theSortContrarySelect");
			$('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
			if(wegType == 1){
				relationDate(1, 0);
			}else if(wegType == 2){
				longRangeDate(1, 0);
			}
		}else{
			$("#theSortDlg").fadeOut();
		}
	});
	for (var i in _wegType) {
		$('.add_weg_type').append("<option value='" + i + "'>" + _wegType[i] + "</option>");
	}
	for (var i in _wegNature) {
		$('.add_weg_nature').append("<option value='" + i + "'>" + _wegNature[i] + "</option>");
	}
	for (var i in _wegState) {
		$('.add_weg_state').append("<option value='" + i + "'>" + _wegState[i] + "</option>");
		$('.update_weg_state').append("<option value='" + i + "'>" + _wegState[i] + "</option>");
	}
	for (var i in _wegUseState) {
		$('.update_weg_use').append("<option value='" + i + "'>" + _wegUseState[i] + "</option>");
		$('#searchWegUse').append("<option value='" + i + "'>" + _wegUseState[i] + "</option>");
	}
	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for (var i in data.body) {
			$(".add_weg_dep").append(
				"<option value = '" + data.body[i].departmentId + "'>"
				+ data.body[i].departmentName + "</option>");
			_depadepartment[i] = data.body[i].departmentId;
		}
	}, "json");

	$('.meterReadingState .meterReading').click(function(){
		$('#searchButtonState').val($(this).val());
		$(this).removeClass('btn-success');
		$(this).addClass('btn-info');
		$(this).siblings().removeClass('btn-info').addClass('btn-success');
		if($(this).val() == "本月已抄表"){
			conditionalQueryReading(1,0,0)
		}
		if($(this).val() == "本月未抄表"){
			conditionalQueryReading(1,0,1)
		}
	});
});
//条件筛选查询
function conditionalQueryReading(page, type, num) {
	var pageNum = 10;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var wegrdNature = $("#searchWegNature").find("option:selected").text();
	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();

	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);
	$.post("../conditionSelectWegReading.action", {
		startNum			: startNum,
		endNum 				: endNum,
		wegrdNature			: wegrdNature,
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		conditionalType		: num,
	}, function(data) {
		console.log(data+"********************************")
		if (data.code<0) {
			$('#wegDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryWegReading","wegDg");
			}else{
				notCountPage(page, 0 ,"queryWegReading","wegDg");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryWegReading","wegDg");
			}else{
				notCountPage(page, 1 , "queryWegReading","wegDg");
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]=='';
					}
				}
				data[i].totalPage = data[i].addCommunity+ " " + data[i].addBuilding+ " " +data[i].addDoorplateno ;
				data[i].wegrdRegisterTime = formatTime(data[i].wegrdRegisterTime,2);
				if(data[i].wegrdMonth != null && data[i].wegrdMonth != ""){
					data[i].wegrdMonth = formatTime(data[i].wegrdMonth.split('T')[0],2);
				}
			}
			$("#wegDg").datagrid("loadData", data);
		}
	}, "json");
}
//刷新筛选操作
function reflashList(){
	$('.meterReadingState .meterReading').removeClass('btn-info').addClass('btn-success');
	queryWegReading(1, 0);
}

// 初始页面查询抄表记录
function queryWegReading(page, type) {
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var wegrdType = $("#searchWegType").find("option:selected").text();
	var wegrdMonth = $("#searchWegTime").val();
	var wegrdNature = $("#searchWegNature").find("option:selected").text();
	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();

	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	var firstDay = new Date(y, m, 1);
	var wegrdMonth = $("#searchWegTime").val();
	var arr = new Array();

	//查询变量设置
	$.post("../selectSysVariables.action", {
		variablesId:1
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for(var i in data){
			var obj = JSON.parse(data[i].chargingPlan.getRealJsonStr());
			arr[0] = (obj.water.state == true) ? 1 : 0;
			arr[1] = (obj.elect.state == true) ? 2 : 0;
			arr[2] = (obj.gas.state == true) ? 3 : 0;
			arr[3] = (obj.hotwater.state == true) ? 4 : 0;
			arr[4] = (obj.hotair.state == true) ? 5 : 0;
			arr =JSON.stringify(arr);
		}
		$("#arrInputText").val(arr);

		$.post("../selectAllWegReading.action", {
			startNum			: startNum,
			endNum 				: endNum,
			wegrdType			: wegrdType,
			wegrdMonth			: wegrdMonth,
			wegrdNature			: wegrdNature,
			addCommunity		: addCommunity,
			addBuilding			: addBuilding,
			addDoorplateno		: addDoorplateno,
			splitFlag			: 1,
			arrStr				: arr
		}, function(data) {
			if (data.code<0) {
				$('#wegDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
				if(page==1){
					notCountPage(0, 0 ,"queryWegReading","wegDg");
				}else{
					notCountPage(page, 0 ,"queryWegReading","wegDg");
				}
			} else {
				data=data.body;
				if(data.length<pageNum){
					notCountPage(page, 2 , "queryWegReading","wegDg");
				}else{
					notCountPage(page, 1 , "queryWegReading","wegDg");
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					data[i].totalPage = data[i].addCommunity+ " " + data[i].addBuilding+ " " +data[i].addDoorplateno ;
					data[i].wegrdRegisterTime = formatTime(data[i].wegrdRegisterTime,2);
					if(data[i].wegrdMonth != null && data[i].wegrdMonth != ""){
						data[i].wegrdMonth = formatTime(data[i].wegrdMonth.split('T')[0],2);
					}
				}
				$("#wegDg").datagrid("loadData", data);
			}
		}, "json");
	})

}
//分页统计数据
function getwegDgPageCount(page, type) {
	var pageNum = 10;

	var wegrdType = $("#searchWegType").find("option:selected").text();
	var wegrdMonth = $("#searchWegTime").val();
	var wegrdNature = $("#searchWegNature").find("option:selected").text();
	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();
	var arr =  $("#arrInputText").val();

	$.post("../selectAllWegReading.action", {
		wegrdType			: wegrdType,
		wegrdMonth			: wegrdMonth,
		wegrdNature			: wegrdNature,
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		splitFlag			: 0,
		arrStr				: arr,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"wegDg",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"wegDg",0);
		}
	}, "json");
}
function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 10);
		$("#wegDgPage").remove();
		$("#wegDgPageDiv")
			.append(
				"<div class='tcdPageCode' id='wegDgPage' style='text-align:center;'></div>");
		$("#wegDgPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryWegReading(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseSourcePage").remove();
		$("#choseSourcePageDiv")
			.append(
				"<div class='tcdPageCode' id='choseSourcePage' style='text-align:center;'></div>");
		$("#choseSourcePage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					if(wegType == 1){
						relationDate(p,1);
					}else if(wegType == 2){
						longRangeDate(p,1);
					}
				}
			}
		});
	}
}
//打开共用弹框
function addWegDlg(type) {
	$('#addWegDlg').dialog({
		title : '添加抄表',
		top : getTop(560),
		left : getLeft(1200),
		width : 1200,
		height : 560,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addWegDlg [clear="clear"]').val('');
			$('#addWegDlg [clean="clean"]').html('');
			$('#addWegDlg [require]').css('border', '1px solid #a9a9a9');
			location.reload(true)
		}
	});
	if(type == 1){
		relationDataGrid();
		$("#getWegNumButton").hide();
		$("#searchAddDistrict").attr('onchange','relationDate(1,0)');
		$("#searchAddZone").attr('onchange','relationDate(1,0)');
		$("#searchAddCommunity").attr('onkeyup','relationDate(1,0)');
		$("#searchAddBuilding").attr('onkeyup','relationDate(1,0)');
		$("#searchAddDoorplateno").attr('onkeyup','relationDate(1,0)');
	}else if(type == 2){
		longRangeDataGrid();
		$("#getWegNumButton").show();
		$("#searchAddDistrict").attr('onchange','longRangeDate(1,0)');
		$("#searchAddZone").attr('onchange','longRangeDate(1,0)');
		$("#searchAddCommunity").attr('onkeyup','longRangeDate(1,0)');
		$("#searchAddBuilding").attr('onkeyup','longRangeDate(1,0)');
		$("#searchAddDoorplateno").attr('onkeyup','longRangeDate(1,0)');
	}
	wegType = type;
	$('#wegrdMonth').val(parent.formatDate(parent.getNowFormatDate()));
	$("#meteraddGetUserId").val(_loginUserId);
	$("#meteraddShowUserInfo").val(_loginUserName);
	$('#addWegDlg').dialog('open');
}
// 普通抄表归属关联选择列表
function relationDataGrid() {
	$('#choseSourceTable').datagrid(
		{
			columns : [ [  {
				field : 'checkbox',
				width : 5,
				align : 'center',
				checkbox:true,
			}, {
				field : 'hsAddDistrict',
				title : '城区',
				width : 15,
				align : 'center'
			}, {
				field : 'hsAddCommunity',
				title : '楼盘名称',
				width : 15,
				align : 'center'
			}, {
				field : 'hsAddBuilding',
				title : '楼栋',
				width : 10,
				align : 'center'
			},{
				field : 'hsAddDoorplateno',
				title : '门牌号',
				width : 10,
				align : 'center'
			}, {
				field : 'lastWater',
				title : '上次水读数',
				width : 10,
				align : 'center'
			}, {
				field : 'thisWater',
				title : '本次水读数',
				width : 10,
				align : 'center',
				editor : {
					type : "numberbox",
					options : {
						precision : 2
					}
				},
			}, {
				field : 'lastEle',
				title : '上次电读数',
				width : 10,
				align : 'center'
			}, {
				field : 'thisEle',
				title : '本次电读数',
				width : 10,
				align : 'center',
				editor : {
					type : "numberbox",
					options : {
						precision : 2
					}
				},
			}, {
				field : 'lastGas',
				title : '上次气读数',
				width : 10,
				align : 'center'
			}, {
				field : 'thisGas',
				title : '本次气读数',
				width : 10,
				align : 'center',
				editor : {
					type : "numberbox",
					options : {
						precision : 2
					}
				},
			},{
				field : 'lastHotwater',
				title : '上次热水读数',
				width : 12,
				align : 'center'
			},{
				field : 'thisHotwater',
				title : '本次热水读数',
				width : 12,
				align : 'center',
				editor : {
					type : "numberbox",
					options : {
						precision : 2
					}
				},
			},{
				field : 'lastHotair',
				title : '上次暖气读数',
				width : 12,
				align : 'center'
			},{
				field : 'thisHotair',
				title : '本次暖气读数',
				width : 12,
				align : 'center',
				editor : {
					type : "numberbox",
					options : {
						precision : 2
					}
				},
			}] ],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			enableCellEdit : true,// 表示是否开启单元格编辑功能
			checkOnSelect: false,
			selectOnCheck: false,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#choseSourceTable').datagrid('getSelected');
				if (row) {
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					$(".add_weg_houseCoding").val('点击更换关联');
					$(".add_weg_address").val(
						row.hrAddDistrict + row.hrAddZone
						+ row.hrAddStreet + row.hrAddCommunity
						+ row.hrAddBuilding
						+ row.hrAddDoorplateno);
					$(".add_weg_houseCodingType").val(row.hrId);
					$(".add_weg_house4store_id").val(row.hrHouse4storeId);
					$(".add_weg_waterPlan").val(row.hrWaterPlan);
					$(".add_weg_electritPlan").val(row.hrElectritPlan);
					$(".add_weg_gasPlan").val(row.hrGasPlan);
					$('#relationDlg').dialog('close')
				}
			}
		});
	console.log(_chargingPlan)
	if(!_chargingPlan.water.state){
		$('#choseSourceTable').datagrid('hideColumn','lastWater');
		$('#choseSourceTable').datagrid('hideColumn','thisWater');
	}
	if(!_chargingPlan.elect.state){
		$('#choseSourceTable').datagrid('hideColumn','lastEle');
		$('#choseSourceTable').datagrid('hideColumn','thisEle');
	}
	if(!_chargingPlan.gas.state){
		$('#choseSourceTable').datagrid('hideColumn','lastGas');
		$('#choseSourceTable').datagrid('hideColumn','thisGas');
	}
	if(!_chargingPlan.hotwater.state){
		$('#choseSourceTable').datagrid('hideColumn','lastHotwater');
		$('#choseSourceTable').datagrid('hideColumn','thisHotwater');
	}
	if(!_chargingPlan.hotair.state){
		$('#choseSourceTable').datagrid('hideColumn','lastHotair');
		$('#choseSourceTable').datagrid('hideColumn','thisHotair');
	}
	relationDate(1,0);
}
var saveRow = [];
// 普通查表查询关联
function relationDate(page, type) {
	if(page==1){
		_pageNum[0]=1;
	}
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();

	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	$.post("../huosestoreWeg.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		hsAddCity 			: qhAddCity,
		hsAddDistrict 		: qhAddDistrict,
		hsAddZone 			: qhAddZone,
		hsAddCommunity 		: qhAddCommunity,
		hsAddBuilding 		: qhAddBuilding,
		hsAddDoorplateno 	: qhAddDoorplateno,
		theSortTerm			: theSortTerm,
		theSortContrary		: theSortContrary,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 1);
			$('#choseSourceTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 1);
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]="";
					}
				}
				data[i].hsMeterReadingRecord = data[i].hsMeterReadingRecord.getRealJsonStr();
				var hsMeterReadingRecord = eval('(' + data[i].hsMeterReadingRecord + ')');
				data[i].thisWater = "";
				data[i].thisEle = "";
				data[i].thisGas = "";
				if(hsMeterReadingRecord.water.thisReading.length==0){
					data[i].lastWater = hsMeterReadingRecord.water.lastReading;
				}else{
					data[i].lastWater = hsMeterReadingRecord.water.thisReading[parseInt(hsMeterReadingRecord.water.thisReading.length)-1];
				}

				if(hsMeterReadingRecord.electrit.thisReading.length==0){
					data[i].lastEle = hsMeterReadingRecord.electrit.lastReading;
				}else{
					data[i].lastEle = hsMeterReadingRecord.electrit.thisReading[parseInt(hsMeterReadingRecord.electrit.thisReading.length)-1];
				}

				if(hsMeterReadingRecord.gas.thisReading.length==0){
					data[i].lastGas = hsMeterReadingRecord.gas.lastReading;
				}else{
					data[i].lastGas = hsMeterReadingRecord.gas.thisReading[parseInt(hsMeterReadingRecord.gas.thisReading.length)-1];
				}
				if(hsMeterReadingRecord.hasOwnProperty("hotwater")){
					if(hsMeterReadingRecord.hotwater.thisReading.length==0){
						data[i].lastHotwater = hsMeterReadingRecord.hotwater.lastReading;
					}else{
						data[i].lastHotwater = hsMeterReadingRecord.hotwater.thisReading[parseInt(hsMeterReadingRecord.hotwater.thisReading.length)-1];
					}
				}else{
					data[i].lastHotwater=0;
				}

				if(hsMeterReadingRecord.hasOwnProperty("hotair")){
					if(hsMeterReadingRecord.hotair.thisReading.length==0){
						data[i].lastHotair = hsMeterReadingRecord.hotair.lastReading;
					}else{
						data[i].lastHotair = hsMeterReadingRecord.hotair.thisReading[parseInt(hsMeterReadingRecord.hotair.thisReading.length)-1];
					}
				}else{
					data[i].lastHotair = 0;
				}

			}

			$("#choseSourceTable").datagrid("loadData", data);
			for(var i in data){
				$('#choseSourceTable').datagrid('beginEdit', i);
			}
			for(var i in saveRow){
				$('#choseSourceTable').datagrid("checkRow",parseInt(saveRow[i]));
			}
			saveRow = [];
		}
	}, "json");
}
//普通抄表执行添加抄表
function doAddReading(){
	var row = $('#choseSourceTable').datagrid('getRows');
	var wegrdDoUserId=$("#meteraddGetUserId").val();
	var wegrdMonth = $("#wegrdMonth").val();
	if ($('.validatebox-invalid').length != 0) {
		$("#addTips").html("有读数输入格式有误,只能输入大于0的数字或不填！");
		return;
	}

	for(var i in row){
		$('#choseSourceTable').datagrid("endEdit", i);
	}
	var zeroFlag = 0;
	var wegJson = [];
	for(var i in row){
		wegJson.push({});//追加数组
		wegJson[i].wegrdHouseId = row[i].hsHouseId;
		wegJson[i].wegrdHouse4storeId = row[i].hsId;
		wegJson[i].thisWater = row[i].thisWater;
		wegJson[i].lastWater = row[i].lastWater;

		wegJson[i].thisEle = row[i].thisEle;
		wegJson[i].lastEle = row[i].lastEle;

		wegJson[i].thisGas = row[i].thisGas;
		wegJson[i].lastGas = row[i].lastGas;

		wegJson[i].thisHotwater = row[i].thisHotwater;
		wegJson[i].lastHotwater = row[i].lastHotwater;

		wegJson[i].thisHotair = row[i].thisHotair;
		wegJson[i].lastHotair = row[i].lastHotair;

		wegJson[i].waterReading = row[i].thisWater=="" ? 0 : row[i].thisWater;
		wegJson[i].electricReading = row[i].thisEle=="" ? 0 : row[i].thisEle;
		wegJson[i].gasReading = row[i].thisGas=="" ? 0 : row[i].thisGas;
		wegJson[i].hotwaterReading = row[i].thisHotwater=="" ? 0 : row[i].thisHotwater;
		wegJson[i].hotairReading = row[i].thisHotair=="" ? 0 : row[i].thisHotair;

		wegJson[i].wegrdUserId = _loginUserId;
		wegJson[i].wegrdDoUserId = wegrdDoUserId;
		wegJson[i].wegrdDepartment = _loginDepartment;
		wegJson[i].wegrdStorefront = _loginStore;
		wegJson[i].wegrdMonth = wegrdMonth;
	}
	for(var i in wegJson){
		if(wegJson[i].thisWater!=""){
			zeroFlag++;
			if(accSub(wegJson[i].thisWater,wegJson[i].lastWater) < 0){
				$("#datagrid-row-r2-2-"+i+" [field='thisWater']").css("border","1px solid red");
				$("#addTips").html("第"+(parseInt(i)+1)+"行本次水读数输入有误，本次读数不能低于上次读数。");
				for(var i in row){
					$('#choseSourceTable').datagrid('beginEdit', i);
				}
				return;
			}
		}
		if(wegJson[i].thisEle!=""){
			zeroFlag++;
			if(accSub(wegJson[i].thisEle,wegJson[i].lastEle) < 0){
				$("#addTips").html("第"+(parseInt(i)+1)+"行本次电读数输入有误，本次读数不能低于上次读数。");
				$("#datagrid-row-r2-2-"+i+" [field='thisEle']").css("border","1px solid red");
				for(var i in row){
					$('#choseSourceTable').datagrid('beginEdit', i);

				}
				return;
			}
		}
		if(wegJson[i].thisGas!=""){
			zeroFlag++;
			if(accSub(wegJson[i].thisGas,wegJson[i].lastGas) < 0){
				$("#addTips").html("第"+(parseInt(i)+1)+"行本次气读数输入有误，本次读数不能低于上次读数。");
				$("#datagrid-row-r2-2-"+i+" [field='thisGas']").css("border","1px solid red");
				for(var i in row){
					$('#choseSourceTable').datagrid('beginEdit', i);
				}
				return;
			}
		}
		if(wegJson[i].thisHotwater!=""){
			zeroFlag++;
			if(accSub(wegJson[i].thisHotwater,wegJson[i].lastHotwater) < 0){
				$("#addTips").html("第"+(parseInt(i)+1)+"行本次热水读数输入有误，本次读数不能低于上次读数。");
				$("#datagrid-row-r2-2-"+i+" [field='thisHotwater']").css("border","1px solid red");
				for(var i in row){
					$('#choseSourceTable').datagrid('beginEdit', i);
				}
				return;
			}
		}
		if(wegJson[i].thisHotair!=""){
			zeroFlag++;
			if(accSub(wegJson[i].thisHotair,wegJson[i].lastHotair) < 0){
				$("#addTips").html("第"+(parseInt(i)+1)+"行本次暖气读数输入有误，本次读数不能低于上次读数。");
				$("#datagrid-row-r2-2-"+i+" [field='thisHotair']").css("border","1px solid red");

				for(var i in row){
					$('#choseSourceTable').datagrid('beginEdit', i);
				}
				return;
			}
		}
	}
	if(zeroFlag==0){
		$("#addTips").html("没有进行任何数据填写！");
		for(var i in row){
			$('#choseSourceTable').datagrid('beginEdit', i);
		}
		return;
	}
	saveRow = [];
	for(var i in wegJson){
		if(!(wegJson[i].thisWater =="" && wegJson[i].thisEle=="" && wegJson[i].thisGas==""
			&& wegJson[i].thisHotwater=="" && wegJson[i].thisHotair=="")){
			saveRow.push(i);
		}
	}
	$("#addTips").html("");
	//console.log(wegJson);
	wegJson = JSON.stringify(wegJson);
	showLoading();
	$.post("../insertWegReadingBatch.action", {
		wegJson:wegJson
	},function(data){
		hideLoading();
		if(data.code<0){
			myTips('添加失败','error');
			return;
		}
		$("#add_weg_nums").val("");
		if(wegType == 1){
			relationDate(_pageNum[0],0);
		}else if(wegType == 2){
			longRangeDate(_pageNum[0],0);
		}
		queryWegReading(1,0);
		myTips('添加成功','success');
	});
}
var _getWegNum = 0;
var _getWegIndex = 0;
var _newRow;
//获取设备读数
/*function getWegNum(){
	var ifHaveFlag = 0;
	var checkFlag = 0;
	$('#meterReadingDiv [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var row = $('#choseSourceTable').datagrid('getRows');

	var num = new Array();
	//在这里处理批量抄表并且将数据自动插入表格
	//如何批量post,使用异步
	for(var i in row){
		$.ajaxSettings.async = false;
		//通过未租id查询智能设备
		$.post("../queryDevice.action", {
			hsId:row[i].hsId
		},function(data){
			hideLoading();
			if(data.code>0){
				ifHaveFlag++;
				data=data.body;
				$.each(data,function(index,date){

					console.log('brandid:'+date.brandId)
					//判断是否为超仪水电表
					if(date.brandId==21){
						//通过表号查询设备表读数
						$.post("http://localhost:8080/device/joy/ReadoutServlet", {
							meterNo:date.devAuthId
						},function(record){
							hideLoading();
							record=record.body;
							for(var j in record){
								//将数据自动插入表格
								$("#datagrid-row-r2-2-"+i+" [field='thisEle']").html("<p>"+record[j].this_read+"</p>");
							}

						});
					}
				})
			}
		});
	}
	$.ajaxSettings.async = true;

//	$("#datagrid-row-r2-2-"+num+" [field='thisEle']").html("<p>"+record[j].this_read+"</p>");

	console.log("ifHaveFlag"+ifHaveFlag);

	if(ifHaveFlag==0){
		myTips("列表中无设备可进行读数获取。","error")
		return;
	}

	/!*_newRow = row;
	_getWegNum = row.length;
	showLoading();
	doGetWegNum();*!/
}*/
//回调函数获取设备读数
function doGetWegNum(){
	$('#form-submit-weg-loading').html("抄表进度："+_getWegIndex+"/"+_getWegNum+"...");

	if(_getWegNum==_getWegIndex){
		hideLoading();
		_getWegIndex=0;
		$('#choseSourceTable').datagrid('loadData',_newRow);
		console.log("_getWegIndex:"+_getWegIndex);
		console.log("_newRow"+_newRow);

		for(var i in _newRow){
			$('#choseSourceTable').datagrid('beginEdit', i);
		}
		_newRow=[];
		return;
	}
	var row = $('#choseSourceTable').datagrid('getRows');
	var idArrayStr = row[_getWegIndex].hsDeviceJson;
	if(idArrayStr != null && idArrayStr != ""){
		$.post("../doDevicWeg.action", {
			idArrayStr:idArrayStr
		},function(data){
			if(data.code==1){
				_newRow[_getWegIndex].thisWater	  = data.body[0].water;
				_newRow[_getWegIndex].thisEle	  = data.body[0].elect;
				_newRow[_getWegIndex].thisGas	  = data.body[0].gas;
				_getWegIndex++;
				doGetWegNum();
			}else{
				_newRow[_getWegIndex].thisWater	  = "";
				_newRow[_getWegIndex].thisEle	  = "";
				_newRow[_getWegIndex].thisGas	  = "";
				_getWegIndex++;
				doGetWegNum();
			}
		});
	}else{
		_getWegIndex++;
		doGetWegNum();
	}
}
//远程抄表初始化表格数据
function longRangeDataGrid() {
	$('#choseSourceTable').datagrid(
		{
			columns : [ [ {
				field : 'hsAddDistrict',
				title : '城区',
				width : 15,
				align : 'center'
			}, {
				field : 'hsAddCommunity',
				title : '楼盘名称',
				width : 15,
				align : 'center'
			}, {
				field : 'hsAddBuilding',
				title : '楼栋',
				width : 10,
				align : 'center'
			},{
				field : 'hsAddDoorplateno',
				title : '门牌号',
				width : 10,
				align : 'center'
			}, {
				field : 'lastWater',
				title : '上次水读数',
				width : 10,
				align : 'center'
			}, {
				field : 'thisWater',
				title : '本次水读数',
				width : 10,
				align : 'center',
			}, {
				field : 'lastEle',
				title : '上次电读数',
				width : 10,
				align : 'center'
			}, {
				field : 'thisEle',
				title : '本次电读数',
				width : 10,
				align : 'center',
			}, {
				field : 'lastGas',
				title : '上次气读数',
				width : 10,
				align : 'center'
			}, {
				field : 'thisGas',
				title : '本次气读数',
				width : 10,
				align : 'center',
			},{
				field : 'lastHotwater',
				title : '上次热水读数',
				width : 12,
				align : 'center'
			},{
				field : 'thisHotwater',
				title : '本次热水读数',
				width : 12,
				align : 'center',
			},{
				field : 'lastHotair',
				title : '上次暖气读数',
				width : 12,
				align : 'center'
			},{
				field : 'thisHotair',
				title : '本次暖气读数',
				width : 12,
				align : 'center',
			}] ],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			checkOnSelect: false,
			selectOnCheck: false,

			onDblClickRow : function(rowIndex, rowData) {

			}
		});
	console.log(_chargingPlan)
	if(!_chargingPlan.water.state){
		$('#choseSourceTable').datagrid('hideColumn','lastWater');
		$('#choseSourceTable').datagrid('hideColumn','thisWater');
	}
	if(!_chargingPlan.elect.state){
		$('#choseSourceTable').datagrid('hideColumn','lastEle');
		$('#choseSourceTable').datagrid('hideColumn','thisEle');
	}
	if(!_chargingPlan.gas.state){
		$('#choseSourceTable').datagrid('hideColumn','lastGas');
		$('#choseSourceTable').datagrid('hideColumn','thisGas');
	}
	if(!_chargingPlan.hotwater.state){
		$('#choseSourceTable').datagrid('hideColumn','lastHotwater');
		$('#choseSourceTable').datagrid('hideColumn','thisHotwater');
	}
	if(!_chargingPlan.hotair.state){
		$('#choseSourceTable').datagrid('hideColumn','lastHotair');
		$('#choseSourceTable').datagrid('hideColumn','thisHotair');
	}
	longRangeDate(1,0);
}

//获取设备读数
function getWegNum(){
	var checkFlag = 0;
	$('#meterReadingDiv [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var row = $('#choseSourceTable').datagrid('getRows');
	console.log(row)
	for (var i = 0; i < row.length; i++) {
		$.post("../queryWegNum.action",{
			hsId	: row[i].hsId
		},function (data) {
			if(data.code < 0){
				myTips(data.msg,"error");
				return;
			}
			data = data.body[0];
			console.log(data)
			for (var j = 0; j < row.length; j++) {
				if(row[j].hsId == data.hsId){
					row[j].thisWater = data.WaterBase == undefined ? "" : data.WaterBase;
					row[j].thisEle = data.ElectricityBase == undefined ? "" : data.ElectricityBase;
					row[j].thisGas = "";
					row[j].thisHotwater = "";
					row[j].thisHotair = "";
					/*var index = $("#choseSourceTable").datagrid("getRowIndex", row[j]);
					var rowData = {
						index: index,
						row: row[j]
					}
					$("#choseSourceTable").datagrid("updateRow", rowData);*/
				}
			}
			$("#choseSourceTable").datagrid("loadData", row);
		});
	}
}



// 远程抄表查询关联数据
function longRangeDate(page, type) {
	if(page==1){
		_pageNum[0]=1;
	}
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();

	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	$.post("../remoteMeterReading.action", {
		// startNum 			: startNum,
		// endNum 				: endNum,
		hsAddCity 			: qhAddCity,
		hsAddDistrict 		: qhAddDistrict,
		hsAddZone 			: qhAddZone,
		hsAddCommunity 		: qhAddCommunity,
		hsAddBuilding 		: qhAddBuilding,
		hsAddDoorplateno 	: qhAddDoorplateno,
		theSortTerm			: theSortTerm,
		theSortContrary		: theSortContrary,
	}, function(data) {
        console.log(data)
		if (data.code<0) {
			// sourcePage(0, 0, 1);
			$('#choseSourceTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data = data.body;

			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 1);
			// }
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]="";
					}
				}
				data[i].hsMeterReadingRecord = data[i].hsMeterReadingRecord.getRealJsonStr();
				var hsMeterReadingRecord = eval('(' + data[i].hsMeterReadingRecord + ')');
				data[i].thisWater = "";
				data[i].thisEle = "";
				data[i].thisGas = "";
				if(hsMeterReadingRecord.water.thisReading.length==0){
					data[i].lastWater = hsMeterReadingRecord.water.lastReading;
				}else{
					data[i].lastWater = hsMeterReadingRecord.water.thisReading[parseInt(hsMeterReadingRecord.water.thisReading.length)-1];
				}

				if(hsMeterReadingRecord.electrit.thisReading.length==0){
					data[i].lastEle = hsMeterReadingRecord.electrit.lastReading;
				}else{
					data[i].lastEle = hsMeterReadingRecord.electrit.thisReading[parseInt(hsMeterReadingRecord.electrit.thisReading.length)-1];
				}

				if(hsMeterReadingRecord.gas.thisReading.length==0){
					data[i].lastGas = hsMeterReadingRecord.gas.lastReading;
				}else{
					data[i].lastGas = hsMeterReadingRecord.gas.thisReading[parseInt(hsMeterReadingRecord.gas.thisReading.length)-1];
				}
				if(hsMeterReadingRecord.hasOwnProperty("hotwater")){
					if(hsMeterReadingRecord.hotwater.thisReading.length==0){
						data[i].lastHotwater = hsMeterReadingRecord.hotwater.lastReading;
					}else{
						data[i].lastHotwater = hsMeterReadingRecord.hotwater.thisReading[parseInt(hsMeterReadingRecord.hotwater.thisReading.length)-1];
					}
				}else{
					data[i].lastHotwater=0;
				}

				if(hsMeterReadingRecord.hasOwnProperty("hotair")){
					if(hsMeterReadingRecord.hotair.thisReading.length==0){
						data[i].lastHotair = hsMeterReadingRecord.hotair.lastReading;
					}else{
						data[i].lastHotair = hsMeterReadingRecord.hotair.thisReading[parseInt(hsMeterReadingRecord.hotair.thisReading.length)-1];
					}
				}else{
					data[i].lastHotair = 0;
				}

			}

			$("#choseSourceTable").datagrid("loadData", data);
			for(var i in saveRow){
				$('#choseSourceTable').datagrid("checkRow",parseInt(saveRow[i]));
			}
			saveRow = [];
		}
	}, "json");
}
function addWegDlgClose(){
	$('#addWegDlg').dialog('close')
}