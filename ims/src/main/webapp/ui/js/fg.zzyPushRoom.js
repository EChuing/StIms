$(function(){
	for (var i in _loginCompanyRentDistrict) {
		$("#choseDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	$('#apartmentDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			queryLayout(1, 0);
		},
		onDblClickRow : function(rowIndex, rowData) {
			updateApartmentDlg();
		}
	});
	$('#layoutDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			queryRoom(1, 0);
		},
		onDblClickRow : function(rowIndex, rowData) {
			updateLayoutDlg();
		}
	});
	$('#roomDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updateRoomDlg();
		}
	});
	$('button').click(function(){
		if ($(this).hasClass('btn-default')) {
			$(this).removeClass('btn-default');
			$(this).addClass('btn-success');
		} else {
			$(this).removeClass('btn-success');
			$(this).addClass('btn-default');
		}
	});
	queryAppId();
	queryApartment(1, 0);
});

//查询门店
function queryApartment(page, type){
	var onePageNums = 15;
	var startPage = (parseInt(page) - 1) * onePageNums;
	showLoading();
	$.post("../query58Apartment.action", {
//		startNum: startPage,
//		endNum: onePageNums,
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
//			sourcePage(0,onePageNums,1);
			$('#apartmentDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if(page==1 && type ==0){
				_indexNum[0] = 0;
//				sourcePage(data[0].totalNum,onePageNums,1);
			}
			$("#apartmentDg").datagrid("loadData", data);
			$('#apartmentDg').datagrid("selectRow", _indexNum[0]);
			queryLayout(1, 0);
		}
	});
}

//添加门店
function addApartmentDlg() {
	$('#addApartmentDlg').dialog({
		title : '添加门店',
		top : getTop(430),
		left : getLeft(960),
		width : 960,
		height : 430,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addApartmentDlg [clear="clear"]').val('');
			$('#addApartmentDlg [clear="clear"]').html('');
			$('#addApartmentDlg [choose="choose"]').val('');
			$('#addApartmentDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#servicePoint .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#rentRequire .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			clearAttachment();
		}
	});
	$("#att").val('');
	$('.attachmentNum').text("（图片：0张 文件：0个）");
	$('#addApartmentDlg').dialog('open');
}

//执行添加门店
function doAddApartment(){
	var appId = $('#appId').val();
//	appId = "58app";
	var apartmentName = $('#apartmentName').val();
	var apartmentPhone = $('#apartmentPhone').val();
	var cityName = $('#cityCode :selected').text();
	var cityCode = $('#cityCode').val();
	var countyName = $('#countyCode :selected').text();
	var countyCode = $('#countyCode').val();
	var areaName = $('#areaCode :selected').text();
	var areaCode = $('#areaCode').val();
	var street = $('#street').val();
	var totalFloor = $('#totalFloor').val();
	var roomNum = $('#roomNum').val();
	var hasLift = $('#hasLift').val();
	var xCoord = $('#xCoord').val();
	var yCoord = $('#yCoord').val();
	var unrent = $('#unrent').val();
	var sublet = $('#sublet').val();
	var checkFlag = 0;
	$('#addApartmentDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	//公寓配套服务
	var servicePoint = [];
	$("#servicePoint .btn").each(function(){
		if($(this).hasClass('btn-success')){
			servicePoint.push(Number($(this).val()));
		}
	});
	servicePoint = JSON.stringify(servicePoint).getRealJsonStr();
	//入驻要求
	var rentRequire = [];
	$("#rentRequire .btn").each(function(){
		if($(this).hasClass('btn-success')){
			rentRequire.push(Number($(this).val()));
		}
	});
	rentRequire = JSON.stringify(rentRequire).getRealJsonStr();
	//图片
	var att = $("#att").val();
	if (att == '') {
		myTips("请上传图片", "error");
		return;
	}
	var picUrlList = [];
	getPicUrl().then(function(val){
		picUrlList = val;
		if (picUrlList.length < 3 || picUrlList.length > 12) {
			myTips("图片5张-24张","error");
			return;
		}
		var p5aDetail = {
			appId : appId,
			outApartmentId : randomNumber(),
			apartmentName : apartmentName,
			apartmentPhone : apartmentPhone,
			cityName : cityName,
			cityCode : cityCode,
			countyName : countyName,
			countyCode : countyCode,
			areaName : areaName,
			areaCode : areaCode,
			street : street,
			totalFloor : totalFloor,
			roomNum : roomNum,
			hasLift : hasLift,
			xCoord : xCoord,
			yCoord : yCoord,
			unrent : unrent,
			sublet : sublet,
			servicePoint : servicePoint,
			rentRequire : rentRequire,
			picUrlList : picUrlList,
		}
		p5aDetail = JSON.stringify(p5aDetail);
//		console.log(p5aDetail);
		$.post('../add58Apartment.action', {
			p5aApartmentName : apartmentName,
			p5aDetail : p5aDetail,
		}, function(data){
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			}
			isSave = true;
			myTips('发布成功', 'success');
			queryApartment(1, 0);
			$('#addApartmentDlg').dialog('close');
		});
	});
}

//修改门店
function updateApartmentDlg(){
	var row = $('#apartmentDg').datagrid('getSelected');
	if(!row){
		myTips('请选择房源', 'error');
		return;
	}
	$('#updateApartmentDlg').dialog({
		title : '修改门店',
		top : getTop(430),
		left : getLeft(960),
		width : 960,
		height : 430,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateApartmentDlg [clear="clear"]').val('');
			$('#updateApartmentDlg [clear="clear"]').html('');
			$('#updateApartmentDlg [choose="choose"]').val('');
			$('#updateApartmentDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#servicePoint2 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#rentRequire2 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		}
	});
	$('#updateApartmentDlg').dialog('open');
	var p5a = JSON.parse(row.p5aDetail.getRealJsonStr());
	$('#appId2').val(p5a.appId);
	$('#outApartmentId2').val(p5a.outApartmentId);
	$('#apartmentName2').val(p5a.apartmentName);
	$('#cityName2').val(p5a.cityName);
	$('#countyName2').val(p5a.countyName);
	$('#areaName2').val(p5a.areaName);
	$('#street2').val(p5a.street);
	$('#apartmentPhone2').val(p5a.apartmentPhone);
	$('#totalFloor2').val(p5a.totalFloor);
	$('#roomNum2').val(p5a.roomNum);
	$('#hasLift2').val(p5a.hasLift);
	$('#xCoord2').val(p5a.xCoord);
	$('#yCoord2').val(p5a.yCoord);
	$('#unrent2').val(p5a.unrent);
	$('#sublet2').val(p5a.sublet);
	//公寓配套服务
	var servicePoint = p5a.servicePoint.split(',');
	$("#servicePoint2 .btn").each(function(){
		for (var i in servicePoint) {
			if($(this).val() == servicePoint[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//入驻要求
	var rentRequire = p5a.rentRequire.split(',');
	$("#rentRequire2 .btn").each(function(){
		for (var i in rentRequire) {
			if($(this).val() == rentRequire[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//图片
//	var att = $("#att").val();
}

//查询房型
function queryLayout(page, type){
	var row = $('#apartmentDg').datagrid('getSelected');
	var onePageNums = 15;
	var startPage = (parseInt(page) - 1) * onePageNums;
	var p5lApartmentId = row.p5aApartmentId;
	$.post("../query58Layout.action", {
//		startNum: startPage,
//		endNum: onePageNums,
		p5lApartmentId: p5lApartmentId
	}, function(data) {
		if (data.code < 0) {
//			sourcePage(0,onePageNums,2);
			$('#layoutDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if(page==1 && type ==0){
				_indexNum[1];
//				sourcePage(data[0].totalNum,onePageNums,2);
			}
			$("#layoutDg").datagrid("loadData", data);
			$('#layoutDg').datagrid("selectRow", _indexNum[1]);
			queryRoom(1, 0);
		}
	});
}

//添加房型
function addLayoutDlg() {
	$('#addLayoutDlg').dialog({
		title : '添加房型',
		top : getTop(410),
		left : getLeft(750),
		width : 750,
		height : 410,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addLayoutDlg [clear="clear"]').val('');
			$('#addLayoutDlg [clear="clear"]').html('');
			$('#addLayoutDlg [choose="choose"]').val('');
			$('#addLayoutDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#featureTag .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#detailPoint .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			clearAttachment();
		}
	});
	$("#att").val('');
	$('.attachmentNum').text("（图片：0张 文件：0个）");
	var rows = $('#apartmentDg').datagrid('getRows');
	$("#apartmentId").html('<option></option');
	for (var i in rows) {
		$("#apartmentId").append("<option value = '" + rows[i].p5aApartmentId + "'>" + rows[i].p5aApartmentName + "</option>");
	}
	$('#addLayoutDlg').dialog('open');
}

//执行添加房型
function doAddLayout(){
	var appId = $('#appId').val();
//	appId = "58app";
	var apartmentId = $('#apartmentId').val();
	var styleName = $('#styleName').val();
	var monthRent = $('#monthRent').val();
	var maxMonthRent = $('#maxMonthRent').val();
	var rentPayType = $('#rentPayType').val();
	var bedRoomNum = $('#bedRoomNum').val();
	var livingRoomNum = $('#livingRoomNum').val();
	var toiletNum = $('#toiletNum').val();
	var rentRoomArea = $('#rentRoomArea').val();
	var faceToType = $('#faceToType').val();
	var houseDesc = $('#houseDesc').val();
	var agentName = $('#agentName').val();
	var agentPhone = $('#agentPhone').val();
	var checkFlag = 0;
	$('#addLayoutDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	//房型特色
	var featureTag = [];
	$("#featureTag .btn").each(function(){
		if($(this).hasClass('btn-success')){
			featureTag.push(Number($(this).val()));
		}
	});
	featureTag = JSON.stringify(featureTag).getRealJsonStr();
	//房型常规配置
	var detailPoint = [];
	$("#detailPoint .btn").each(function(){
		if($(this).hasClass('btn-success')){
			detailPoint.push(Number($(this).val()));
		}
	});
	detailPoint = JSON.stringify(detailPoint).getRealJsonStr();
	//图片
	var att = $("#att").val();
	if (att == '') {
		myTips("请上传图片", "error");
		return;
	}
	showLoading();
	var picUrlList = [];
	getPicUrl().then(function(val){
		picUrlList = val;
		if (picUrlList.length < 3 || picUrlList.length > 12) {
			myTips("图片5张-24张","error");
			return;
		}
		var p5lDetail = {
			appId : appId,
			apartmentId : apartmentId,
			outHouseId : randomNumber(),
			styleName : styleName,
			monthRent : monthRent,
			maxMonthRent : maxMonthRent,
			rentPayType : rentPayType,
			bedRoomNum : bedRoomNum,
			livingRoomNum : livingRoomNum,
			toiletNum : toiletNum,
			rentRoomArea : rentRoomArea,
			faceToType : faceToType,
			houseDesc : houseDesc,
			agentName : agentName,
			agentPhone : agentPhone,
			featureTag : featureTag,
			detailPoint : detailPoint,
			picUrlList : picUrlList,
		}
		p5lDetail = JSON.stringify(p5lDetail);
//		console.log(p5aDetail);
		$.post('../add58Layout.action', {
			p5lApartmentId : apartmentId,
			p5lLayoutName : styleName,
			p5lDetail : p5lDetail,
		}, function(data){
			hideLoading();
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			}
			isSave = true;
			myTips('发布成功', 'success');
			queryApartment(1, 0);
			$('#addLayoutDlg').dialog('close');
		});
	});
}

//修改房型
function updateLayoutDlg(){
	var row = $('#layoutDg').datagrid('getSelected');
	if(!row){
		myTips('请选择房源', 'error');
		return;
	}
	$('#updateLayoutDlg').dialog({
		title : '修改房型',
		top : getTop(410),
		left : getLeft(750),
		width : 750,
		height : 410,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateLayoutDlg [clear="clear"]').val('');
			$('#updateLayoutDlg [clear="clear"]').html('');
			$('#updateLayoutDlg [choose="choose"]').val('');
			$('#updateLayoutDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#featureTag2 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#detailPoint2 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		}
	});
	$('#updateLayoutDlg').dialog('open');
	var rows = $('#apartmentDg').datagrid('getRows');
	$("#apartmentId2").html('<option></option');
	for (var i in rows) {
		$("#apartmentId2").append("<option value = '" + rows[i].p5aApartmentId + "'>" + rows[i].p5aApartmentName + "</option>");
	}
	var p5l = JSON.parse(row.p5lDetail.getRealJsonStr());
	$('#appId2').val(p5l.appId);
	$('#apartmentId2').val(p5l.apartmentId);
	$('#styleName2').val(p5l.styleName);
	$('#agentName2').val(p5l.agentName);
	$('#agentPhone2').val(p5l.agentPhone);
	$('#bedRoomNum2').val(p5l.bedRoomNum);
	$('#livingRoomNum2').val(p5l.livingRoomNum);
	$('#toiletNum2').val(p5l.toiletNum);
	$('#rentPayType2').val(p5l.rentPayType);
	$('#monthRent2').val(p5l.monthRent);
	$('#maxMonthRent2').val(p5l.maxMonthRent);
	$('#rentRoomArea2').val(p5l.rentRoomArea);
	$('#faceToType2').val(p5l.faceToType);
	$('#houseDesc2').val(p5l.houseDesc);
	//公寓配套服务
	var featureTag = p5l.featureTag.split(',');
	$("#featureTag2 .btn").each(function(){
		for (var i in featureTag) {
			if($(this).val() == featureTag[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//入驻要求
	var detailPoint = p5l.detailPoint.split(',');
	$("#detailPoint2 .btn").each(function(){
		for (var i in detailPoint) {
			if($(this).val() == detailPoint[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//图片
//	var att = $("#att").val();
}

//查询房间
function queryRoom(page, type){
	var row = $('#layoutDg').datagrid('getSelected');
	if (!row) {
		$('#roomDg').datagrid({
			data : [],
			view : myview,
			emptyMsg : data.msg
		});
		return;
	}
	var onePageNums = 15;
	var startPage = (parseInt(page) - 1) * onePageNums;
	var p5rApartmentId = row.p5lApartmentId;
	var p5rLayoutId = row.p5lLayoutId;
	$.post("../query58Room.action", {
		startNum: startPage,
		endNum: onePageNums,
		p5rApartmentId: p5rApartmentId,
		p5rLayoutId: p5rLayoutId
	}, function(data) {
		if (data.code < 0) {
			sourcePage(0,onePageNums,3);
			$('#roomDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if(page==1 && type ==0){
				sourcePage(data[0].totalNum,onePageNums,3);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
				var p5rDetail = JSON.parse(data[i].p5rDetail.getRealJsonStr());
				switch (p5rDetail.roomStatus) {
					case '3000': data[i].roomStatus = '未出租'; break;
					case '5000': data[i].roomStatus = '已出租'; break;
				}
			}
			$("#roomDg").datagrid("loadData", data);
		}
	});
}

//添加房间
function addRoomDlg() {
	$('#addRoomDlg').dialog({
		title : '添加房间',
		top : getTop(180),
		left : getLeft(370),
		width : 370,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addRoomDlg [clear="clear"]').val('');
			$('#addRoomDlg [clear="clear"]').html('');
			$('#addRoomDlg [choose="choose"]').val('');
			$('#addRoomDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	$('#addRoomDlg').dialog('open');
	var row1 = $('#apartmentDg').datagrid('getSelected');
	var row2 = $('#layoutDg').datagrid('getSelected');
	$('#addRoomApartmentName').val(row1.p5aApartmentName);
	$('#addRoomApartmentId').val(row1.p5aApartmentId);
	$('#addRoomHouseName').val(row2.p5lLayoutName);
	$('#addRoomHouseId').val(row2.p5lLayoutId);
}

//执行添加房间
function doAddRoom(){
	var appId = $('#appId').val();
//	appId = "58app";
	var outHouseId = $('#addRoomOutHouseId').val();
	var apartmentId = $('#addRoomApartmentId').val();
	var houseId = $('#addRoomHouseId').val();
	var floorNum = $('#addRoomFloorNum').val();
	var roomNum = $('#addRoomRoomNum').val();
	var roomStatus = $('#addRoomRoomStatus').val();
	var checkFlag = 0;
	$('#addRoomDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	var p5rDetail = {
		appId : appId,
		outHouseId : outHouseId,
		apartmentId : apartmentId,
		houseId : houseId,
		floorNum : floorNum,
		roomNum : roomNum,
		roomStatus : roomStatus,
	}
	p5rDetail = JSON.stringify(p5rDetail);
	showLoading();
	$.post('../add58Room.action', {
		p5rApartmentId : apartmentId,
		p5rLayoutId : houseId,
		p5rDetail : p5rDetail
	}, function(data){
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		myTips('发布成功', 'success');
		queryApartment(1, 0);
		$('#addRoomDlg').dialog('close');
	});
}

//修改房间
function updateRoomDlg(){
	var row = $('#roomDg').datagrid('getSelected');
	if(!row){
		myTips('请选择房源', 'error');
		return;
	}
	$('#updateRoomDlg').dialog({
		title : '修改房间',
		top : getTop(180),
		left : getLeft(370),
		width : 370,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updateRoomDlg [clear="clear"]').val('');
			$('#updateRoomDlg [clear="clear"]').html('');
			$('#updateRoomDlg [choose="choose"]').val('');
			$('#updateRoomDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	$('#updateRoomDlg').dialog('open');
	var p5r = JSON.parse(row.p5rDetail.getRealJsonStr());
	$('#updateRoomFloorNum').val(p5r.floorNum);
	$('#updateRoomRoomNum').val(p5r.roomNum);
	$('#updateRoomRoomStatus').val(p5r.roomStatus);
}

//执行修改房间
function doUpdateRoom(){
	var row = $('#roomDg').datagrid('getSelected');
	var p5rDetail = JSON.parse(row.p5rDetail.getRealJsonStr());
	p5rDetail.roomId = row.p5rRoomId;
	p5rDetail.floorNum = $('#updateRoomFloorNum').val();
	p5rDetail.roomNum = $('#updateRoomRoomNum').val();
	p5rDetail.roomStatus = $('#updateRoomRoomStatus').val();
	p5rDetail = JSON.stringify(p5rDetail);
	$.post('../update58Room.action', {
		p5rId : row.p5rId,
		p5rDetail : p5rDetail,
	}, function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		myTips(data.msg, 'success');
		queryApartment(1, 0);
		$('#updateRoomDlg').dialog('close');
	});
}
//选择城市查城区
function changeCity(){
	var pid = $('#cityCode').val();
	$.get('../query58Dict.action', {
		pid: pid,
	}, function(data){
		if(data.code > 0 && data.body[0].status == 'ok'){
			data = data.body[0].locallist;
			$('#countyCode').html('<option></option>');
			$('#areaCode').html('<option></option>');
			for (var i in data) {
				$('#countyCode').append("<option value = '" + data[i].localid + "'>" + data[i].localname + "</option>");
			}
		}else{
			$('#countyCode').html('<option></option>');
			$('#areaCode').html('<option></option>');
		}
	});
}

//选择城区查商圈
function changeCounty(){
	var pid = $('#countyCode').val();
	$.get('../query58Dict.action', {
		pid: pid,
	}, function(data){
		if(data.code > 0 && data.body[0].status == 'ok'){
			data = data.body[0].locallist;
			$('#areaCode').html('<option></option>');
			for (var i in data) {
				$('#areaCode').append("<option value = '" + data[i].localid + "'>" + data[i].localname + "</option>");
			}
		}else{
			$('#areaCode').html('<option></option>');
		}
	});
}

//打开地图
function openMap(type){
	$('#mapDlg').dialog({
		title : '地图选址',
		top : getTop(400),
		left : getLeft(600),
		width : 600,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$('#mapDlg').dialog('open');
	console.log('type='+type);
	if(type==1){//新发布选址
		var x = $('#xCoord').val();
		var y = $('#yCoord').val();
	}else if(type==2){//修改重新发布选址
		var x = $('#xCoord2').val();
		var y = $('#yCoord2').val();
	}
	console.log('x='+x);
	console.log('y='+y);
	if(x != '' && y != ''){
		var map = new BMap.Map("allmap");  //创建Map实例
		var point = new BMap.Point(x, y); //创建点坐标
		map.centerAndZoom(new BMap.Point(x, y), 15);
		map.clearOverlays();	//清除覆盖物
		var marker = new BMap.Marker(point);	//创建点
	    map.addOverlay(marker);	//添加点
	}else{
		console.log('_loginCompanyRentCity='+_loginCompanyRentCity);
		var map = new BMap.Map("allmap");  //创建Map实例
		map.centerAndZoom(_loginCompanyRentCity, 11);      //初始化地图,用城市名设置地图中心点
		
	}
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
	map.addEventListener("click", addMarker);//点击鼠标创建标注
	
	function addMarker(e){
		var x = e.point.lng;
		var y = e.point.lat;
		var point = new BMap.Point(x, y); //创建点坐标
		var marker = new BMap.Marker(point);	//创建点
		map.clearOverlays();	//清除覆盖物
	    map.addOverlay(marker);	//添加点
	    if(type==1){
	    	$('#xCoord').val(x);
			$('#yCoord').val(y);
	    }else if(type==2){
	    	$('#xCoord2').val(x);
			$('#yCoord2').val(y);
	    }
	}
}

//查图片路径
function getPicUrl(){
	var p = new Promise(function (resolve, reject){
		var picUrlList = [];
		var att = $("#att").val();
		$.post("../getAttachment.action",{
			att : att
		}, function(data) {
			if (data.code < 0) {
				resolve(picUrlList);
				return;
			}
			data = data.body;
			var path = data[0].path.getRealJsonStr();
			var img = eval('([' + path + '])');
			for(var i in img){
				var picObj = {
						detailNum:"",
						picDesc:" ",
						attachmentId:img[i].path
					};
				picUrlList.push(picObj);
			}
			resolve(picUrlList);
		});
	});
	return p;
}

//分页操作
function sourcePage(totalNum,onePageNums,type){
	var pageCount = Math.ceil(totalNum / onePageNums);
	/*if(type==1){
		$("#apartmentPage").remove();
		$("#apartmentPageDiv").append("<div class='tcdPageCode' id='apartmentPage' style='text-align:center;'></div>");
		$("#apartmentPage").createPage({
			onePageNums:onePageNums,
			totalNum:totalNum,
			pageCount:pageCount,
			current:1,
			backFn:function(p){
				if(p<=pageCount){
					_indexNum[0]=0;
					queryApartment(p,1);
				}
			}
		});
	}*/
	if(type==1){
		$("#choseHousePage").remove();
		$("#choseHousePageDiv").append("<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
		$("#choseHousePage").createPage({
			onePageNums:onePageNums,
			totalNum:totalNum,
			pageCount:pageCount,
			current:1,
			backFn:function(p){
				if(p<=pageCount){
					query4StoreInfo(p,1);
				}
			}
		});
	}
	if(type==2){
		$("#layoutPage").remove();
		$("#layoutPageDiv").append("<div class='tcdPageCode' id='layoutPage' style='text-align:center;'></div>");
		$("#layoutPage").createPage({
			onePageNums:onePageNums,
			totalNum:totalNum,
			pageCount:pageCount,
			current:1,
			backFn:function(p){
				if(p<=pageCount){
					_indexNum[1]=0;
					queryLayout(p,1);
				}
			}
		});
	}
	if(type==3){
		$("#roomPage").remove();
		$("#roomPageDiv").append("<div class='tcdPageCode' id='roomPage' style='text-align:center;'></div>");
		$("#roomPage").createPage({
			onePageNums:onePageNums,
			totalNum:totalNum,
			pageCount:pageCount,
			current:1,
			backFn:function(p){
				if(p<=pageCount){
					queryRoom(p,1);
				}
			}
		});
	}
}

//发布房源-选择房源
function chooseHouseForStore() {
	$('#choseHouse').dialog({
		title : '选择房源',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true
	});
	if ($('#choseHouseTable').hasClass('datagrid-f')) {

	} else {
		$('#choseHouseTable').datagrid({
			columns : [ [ {
				field : 'hsAddDistrict',
				title : '城区',
				width : 20,
				align : 'center'
			}, {
				field : 'hsAddCommunity',
				title : '楼盘名称',
				width : 26,
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
			}, {
				field : 'hsSectionType',
				title : '房型',
				width : 15,
				align : 'center'
			}, {
				field : 'hsRegisterTime',
				title : '登记时间',
				width : 19,
				align : 'center'
			} ] ],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = rowData;
				$("#addRoomOutHouseId").val(row.hsId);//未租id
				$('#addRoomBindAddress').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
				$('#choseHouse').dialog('close');
			}
		});
	}
	query4StoreInfo(1, 0);
	$('#choseHouse').dialog('open');
}
//选择托管房源表导入数据
function query4StoreInfo(page,type){
	var onePageNums = 10;
	var startNum = (parseInt(page)-1)*onePageNums;
	var qDistrict = $("#choseDistrict").find("option:selected").text();
	var qCommunity = $("#choseCommunity").val();
	var qBuilding = $("#choseBuilding").val();
	var qDoorplateno = $("#choseDoorplateno").val();
	$.post("../queryHouseStoreCommon.action", {
		startNum : startNum,
		endNum : onePageNums,
		hsAddDistrict:qDistrict,
		hsAddCommunity:qCommunity,
		hsAddBuilding:qBuilding,
		hsAddDoorplateno:qDoorplateno,
//		hsLeaseState:'所有未租',
		hsPrimitiveMother:4,
	},function(data) {
		if(data.code<0){
			sourcePage(0,onePageNums,1); 
			$('#choseHouseTable').datagrid({
	             data: [],
	             view: myview,
	             emptyMsg: '没有查询到符合条件的记录！'
	        });
		}else{
			data=data.body;
			if(page==1 && type ==0){
				sourcePage(data[0].totalNum,onePageNums,1);
			}
			$("#choseHouseTable").datagrid("loadData", data);
		}
	}, "json");
}
function bindDlg(){
	$('#bindDlg').dialog({
		title : '账号绑定',
		top : getTop(300),
		left : getLeft(200),
		width : 300,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#bindDlg [clear="clear"]').val('');
		}
	});
	$('#bindDlg').dialog('open');
}
function queryAppId(){
	$.post('../querySystemSetting.action', {
		
	}, function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		$('#appId').val(data.body[0].ssit58HouseAppid);
	});
}