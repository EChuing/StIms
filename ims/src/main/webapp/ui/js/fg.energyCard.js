$(function() {
	queryCard(_pageNum[0], 0);
	$('#cardDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			var row = $('#cardDg').datagrid('getSelected');
		},
		onDblClickRow : function(rowIndex, rowData) {
			updateCard();
		}
	});
	for (var i in _loginCompanyRentDistrict) {
	    $('#searchAddDistrict').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	    $('#searchAddZone').append('<option value="' + _loginCompanyRentDistrict[i] + '">' + _loginCompanyRentDistrict[i] + '</option>');
	}
});
function queryCard(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 2000;
	var addDistrict = $("#searchDistrict").val();
	var addCommunity = $("#searchCommunity").val();
	var addBuilding = $("#searchBuilding").val();
	var addDoorplateno = $("#searchDoorplateno").val();
	$.post("../selectDailyCardNumber.action", {
		startNum : startNum,
		endNum : endNum,
		addDistrict : addDistrict,
		addCommunity : addCommunity,
		addBuilding : addBuilding,
		addDoorplateno : addDoorplateno,
	}, function(data) {
		if (data < 0 || data == '' || data.length == 0) {
			sourcePage(0, 0, 0);
			$('#cardDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
		} else {
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 0);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].addCommunity = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#cardDg").datagrid("loadData", data);
		}
	}, "json");
}
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#cardPage").remove();
		$("#cardPageDiv").append("<div class='tcdPageCode' id='cardPage' style='text-align:center;'></div>");
		$("#cardPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0]=p;
					queryCard(p, 1);
				}
			}
		});
	}
	if (type == 1) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv")
				.append(
						"<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipPage").createPage({
			onePageNums:10,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					relationDate(p, 1);
				}
			}
		});
	}
}
function clear(){
	$('#addCardDlg input').val('');
	$('#addHouseCoding').val('单击选择房源');
	$('#errorMsg').html('');
}
function addCard(){
	$("#addCardDlg").dialog({
		title : '添加卡号',
		top : getTop(340),
		left : getLeft(500),
		width : 500,
		height : 380,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			clear();
		}
	});
	$("#addCardButton").show();
	$("#updateCardButton").hide();
	$("#landNameDiv").show();
	$("#landIdCardDiv").show();
	$("#landTelDiv").show();
	$("#addCardDlg").dialog('open');
}
function doAddCard(){
	var addHouseStoreId = $('#addHouseStoreId').val();
	var cardName = $('#cardName').val();
	var cardNum = $('#cardNum').val();
	var cardPeople = $('#cardPeople').val();
	var cardPeopleId = $('#cardPeopleId').val();
	var cardBankName = $('#cardBankName').val();
	var cardBank = $('#cardBank').val();
	var cardTel = $('#cardTel').val();
	var cardRemark = $('#cardRemark').val();
	var jdcnMeterNumber = $('#jdcnMeterNumber').val();
	if(addHouseStoreId == ''){
		$('#errorMsg').html('请选择房源');
		return;
	}
	/*if(cardName == ''){
		$('#errorMsg').html('请输入卡名');
		return;
	}
	if(cardNum == ''){
		$('#errorMsg').html('请输入卡号');
		return;
	}*/
	$.post("../insertDailyCardNumber.action", {
		jdcnHouse4storeId 		: addHouseStoreId,
		jdcnCardName 			: cardName,
		jdcnCardNumber 			: cardNum,
		jdcnBelongingToPeople 	: cardPeople,
		jdcnIdCard				: cardPeopleId,
		jdcnBankName			: cardBankName,
		jdcnBankCard 			: cardBank,
		jdcnTelephone 			: cardTel,
		jdcnRemarks 			: cardRemark,
		jdcnMeterNumber			: jdcnMeterNumber,
	}, function(data) {
		if (data < 0 || data == '') {
			myTips("添加失败", "error");
			return;
		}else{
			myTips("添加成功", "success");
            $('#cardName').val('');
            $('#cardNum').val('');
            $('#jdcnMeterNumber').val('');
			queryCard(1,0);
			//$("#addCardDlg").dialog('close');
		}
	});
}
function updateCard(){
	var row = $('#cardDg').datagrid('getSelected');
	if(!row){
		myTips("请选择一条记录再作修改", "error");
	}
	$('#addHouseCoding').val('单击切换房源');
	$('#addHouseStoreId').val(row.jdcnHouse4storeId);
	$('#jdcnId').val(row.jdcnId);
	
	$('#addAddress').val(row.addCommunity);
	$('#cardName').val(row.jdcnCardName);
	$('#cardNum').val(row.jdcnCardNumber);
	$('#cardPeople').val(row.jdcnBelongingToPeople);
	$('#cardPeopleId').val(row.jdcnIdCard);
	$('#cardBankName').val(row.jdcnBankName);
	$('#cardBank').val(row.jdcnBankCard);
	$('#cardTel').val(row.jdcnTelephone);
	$('#cardRemark').val(row.jdcnRemarks);
	$('#jdcnMeterNumber').val(row.jdcnMeterNumber);
	
	$("#addCardDlg").dialog({
		title : '修改卡号',
		top : getTop(340),
		left : getLeft(500),
		width : 500,
		height : 380,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			clear();
		}
	});
	$("#addCardButton").hide();
	$("#updateCardButton").show();
	$("#landNameDiv").hide();
	$("#landIdCardDiv").hide();
	$("#landTelDiv").hide();
	$("#addCardDlg").dialog('open');
}
function doUpdateCard(){
	var jdcnId = $('#jdcnId').val();
	var addHouseStoreId = $('#addHouseStoreId').val();
	var cardName = $('#cardName').val();
	var cardNum = $('#cardNum').val();
	var cardPeople = $('#cardPeople').val();
	var cardPeopleId = $('#cardPeopleId').val();
	var cardBankName = $('#cardBankName').val();
	var cardBank = $('#cardBank').val();
	var cardTel = $('#cardTel').val();
	var cardRemark = $('#cardRemark').val();
	var jdcnMeterNumber = $('#jdcnMeterNumber').val();
	if(addHouseStoreId == ''){
		$('#errorMsg').html('请选择房源');
		return;
	}
	/*if(cardName == ''){
		$('#errorMsg').html('请输入卡名');
		return;
	}
	if(cardNum == ''){
		$('#errorMsg').html('请输入卡号');
		return;
	}*/
	$.post("../updateDailyCardNumber.action", {
		jdcnId 					: jdcnId,
		jdcnHouse4storeId 		: addHouseStoreId,
		jdcnCardName 			: cardName,
		jdcnCardNumber 			: cardNum,
		jdcnBelongingToPeople 	: cardPeople,
		jdcnIdCard 				: cardPeopleId,
		jdcnBankName 			: cardBankName,
		jdcnBankCard 			: cardBank,
		jdcnTelephone 			: cardTel,
		jdcnRemarks 			: cardRemark,
		jdcnMeterNumber			: jdcnMeterNumber,
	}, function(data) {
		if (data < 0 || data == '') {
			myTips("修改失败", "error");
		}else{
			myTips("修改成功", "success");
			$("#addCardDlg").dialog('close');
			queryCard(_pageNum[0], 0);
		}
	});
}
function relationDlg() {
	$('#relationDlg').dialog({
		title : '选择房源',
		top : getTop(390),
		left : getLeft(750),
		width : 750,
		height : 390,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
		}
	});
	relationDataGrid();
	$('#relationDlg').dialog('open');
}
function relationDataGrid() {
	$('#relationSelect select').empty();
	cityLink(1);
	if ($('#choseTrusteeshipTable').hasClass('datagrid-f')) {

	} else {
		$('#choseTrusteeshipTable').datagrid(
			{
				columns : [ [  {
					field : 'hsAddDistrict',
					title : '城区',
					width : 10,
					align : 'center'
				}, {
					field : 'hsAddCommunity',
					title : '楼盘名称',
					width : 20,
					align : 'center'
				}, {
					field : 'hsAddBuilding',
					title : '楼栋',
					width : 10,
					align : 'center'
				}, {
					field : 'hsAddDoorplateno',
					title : '门牌',
					width : 10,
					align : 'center'
				} ] ],
				width : '99%',
				height : '277px',
				singleSelect : true,
				autoRowHeight : false,
				pageSize : 10,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				onDblClickRow : function(rowIndex, rowData) {
					var row = $('#choseTrusteeshipTable').datagrid('getSelected');
					for (var i in row) {
						if (row[i] == null) {
							row[i] = '';
						}
					}
					$("#landNameDiv").show();
					$("#landIdCardDiv").show();
					$("#landTelDiv").show();
					$("#addHouseCoding").val("单击切换房源");
					$("#addHouseStoreId").val(row.hsId);
					$("#addAddress").val(row.hsAddCommunity	+ row.hsAddBuilding	+ row.hsAddDoorplateno);
					$("#landName").val(row.popName);
					$("#landIdCard").val(row.popIdcard);
					$("#landTel").val(row.popTelephone);
					$('#relationDlg').dialog('close');
				}
			});
	}
	relationDate(1, 0);
}
//查询关联
function relationDate(page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	$.post("../getAllHouseForStoreInCard.action", {
		startNum : startNum,
		endNum : endNum,
		hsAddCity : qhAddCity,
		hsAddDistrict : qhAddDistrict,
		hsAddZone : qhAddZone,
		hsAddCommunity : qhAddCommunity,
		hsAddBuilding : qhAddBuilding,
		hsAddDoorplateno : qhAddDoorplateno,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 1);
			$('#choseTrusteeshipTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				sourcePage(data[0].totalNum, page, 1);
			}
			$("#choseTrusteeshipTable").datagrid("loadData", data);
		}
	}, "json");
}
function queryAddDistrict() {
	$("#searchAddZone").empty();
	$("#searchAddZone").append("<option></option>");
	var cityText = $("#searchAddCity").find("option:selected").text();
	var districtText = $("#searchAddDistrict").find("option:selected").text();
	if (districtText == '') {
		relationDate(1, 0);
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
		for (var i in data) {
			$("#searchAddZone").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
		relationDate(1, 0);
	});
}
// 城市联动
function cityLink(type) {
//	$.post("../queryForHouseDictAddress.action", function(data) {
//		_city = data;
//		if(type==0){
//			for (var i in data) {
//				$("#searchCity").append(
//						"<option value = '" + i + "'>" + data[i] + "</option>");
//			}
//		}else{
//			$("#searchAddCity").append("<option></option>");
//			for (var i in data) {
//				$("#searchAddCity").append(
//						"<option value = '" + i + "'>" + data[i] + "</option>");
//			}
//		}
//	});
	
	$("#searchAddCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$("#searchAddCity").val(0);
	queryAddCity();
}