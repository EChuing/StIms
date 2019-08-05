$(function(){
	for (var i in _loginCompanyRentDistrict) {
		$("#choseDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	$('#houseDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updatePushHouseDlg();
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
});

//分页统计总条数
function gethousePageCount(page){
	var pageSize = 15;
	var searchCommunity = $('#searchCommunity').val();
	var searchBuilding = $('#searchBuilding').val();
	var searchDoorplateno = $('#searchDoorplateno').val();
	$.post("../query58House.action", {
		hsAddCommunity:searchCommunity,
		hsAddBuilding:searchBuilding,
		hsAddDoorplateno:searchDoorplateno
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"house",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"house",0);
		}
	});
}

//查询发布房源
function queryPushHouse(page, type){
	var onePageNums = 15;
	var startPage = (parseInt(page) - 1) * onePageNums;
	var searchCommunity = $('#searchCommunity').val();
	var searchBuilding = $('#searchBuilding').val();
	var searchDoorplateno = $('#searchDoorplateno').val();
	showLoading();
	$.post("../query58House.action", {
		startNum: startPage,
		endNum: onePageNums,
		hsAddCommunity:searchCommunity,
		hsAddBuilding:searchBuilding,
		hsAddDoorplateno:searchDoorplateno
	}, function(data) {
		if (data.code < 0) {
			hideLoading();
			// sourcePage(0,onePageNums,2);
			if(page==1){
				notCountPage(0, 0 ,"queryPushHouse","house");
			}else{
				notCountPage(page, 0 ,"queryPushHouse","house");
			}
			$('#houseDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			// if(page==1 && type ==0){
			// 	sourcePage(data[0].totalNum,onePageNums,2);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryPushHouse","house");
			}else{
				notCountPage(page, 1 , "queryPushHouse","house");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
			}
			//查状态
			var appId = $('#appId').val();
//			appId = "58app";
			var houseIds = [];
			for (var i in data) {
				houseIds.push(data[i].p5hHouseId);
			}
			var p5hDetail = {
				appId : appId,
				houseId : houseIds,
			}
			p5hDetail = JSON.stringify(p5hDetail);
			$.post('../query58HouseStatus.action', {
				p5hDetail : p5hDetail,
			}, function(data2){
				hideLoading();
				if (data2.code < 0) {
					myTips(data2.msg, 'error');
				}
				data2 = data2.body;
				var houseStatusArray = JSON.parse(data2[0].p5hDetail.getRealJsonStr());
				for(var i in houseStatusArray){
					for(var j in data){
						if(houseStatusArray[i].id == data[j].p5hHouseId){
							data[j].houseStatus = houseStatusArray[i].houseStatus;
							data[j].houseStatusDesc = houseStatusArray[i].houseStatusDesc;
						}
					}
				}
				$("#houseDg").datagrid("loadData", data);
			});
		}
	});
}

//发布房源
function pushHouseDlg() {
	$('#pushHouseDlg').dialog({
		title : '发布房源',
		top : getTop(580),
		left : getLeft(940),
		width : 940,
		height : 580,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#pushHouseDlg [clear="clear"]').val('');
			$('#pushHouseDlg [clear="clear"]').html('');
			$('#pushHouseDlg [choose="choose"]').val('');
			$('#pushHouseDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#bedRoomType').attr('disabled', 'disabled');
			$("#featureTag .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#detailPoint .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
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
	$('#pushHouseDlg').dialog('open');
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
				$("#outHouseId").val(row.hsId);//未租id
				$('#bindAddress').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
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
//		hsPrimitiveMother:4,
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
//分页操作
function sourcePage(totalNum,onePageNums,type){
	var pageCount = Math.ceil(totalNum / onePageNums);
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
		$("#housePage").remove();
		$("#housePageDiv").append("<div class='tcdPageCode' id='housePage' style='text-align:center;'></div>");
		$("#housePage").createPage({
			onePageNums:onePageNums,
			totalNum:totalNum,
			pageCount:pageCount,
			current:1,
			backFn:function(p){
				if(p<=pageCount){
					queryPushHouse(p,1);
				}
			}
		});
	}
}
//选择单间出租类别
function changeRentType(){
	var rentType = $('#rentType').val();
	if (rentType == 2) {
		$('#bedRoomType').removeAttr('disabled');
	} else {
		$('#bedRoomType').val('');
		$('#bedRoomType').attr('disabled', 'disabled');
	}
	rentType = $('#rentType2').val();
	if (rentType == 2) {
		$('#bedRoomType2').removeAttr('disabled');
	} else {
		$('#bedRoomType2').val('');
		$('#bedRoomType2').attr('disabled', 'disabled');
	}
}
//暂存
function doSaveHouse(){
	
}
//发布房源
function doPushHouse(){
	var checkFlag = 0;
	$('#pushHouseDlg [require="require"]').each(function(){
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
	var appId = $('#appId').val();
//	appId = "58app";
	var outHouseId = $('#outHouseId').val();
	var rentType = $('#rentType').val();
	var bedRoomNum = $('#bedRoomNum').val();
	var livingRoomNum = $('#livingRoomNum').val();
	var toiletNum = $('#toiletNum').val();
	var rentRoomArea = $('#rentRoomArea').val();
	var bedRoomType = $('#bedRoomType').val();
	var faceToType = $('#faceToType').val();
	var totalFloor = $('#totalFloor').val();
	var houseFloor = $('#houseFloor').val();
	var monthRent = $('#monthRent').val();
	var rentStartDate = $('#rentStartDate').val();
	var shortRent = $('#shortRent').val();
	var cityName = $('#cityName').val();
	var countyName = $('#countyName').val();
	var areaName = $('#areaName').val();
	var districtName = $('#districtName').val();
	var street = $('#street').val();
	var address = $('#address').val();
	var houseDesc = $('#houseDesc').val();
	var xCoord = $('#xCoord').val();
	var yCoord = $('#yCoord').val();
	var agentName = $('#agentName').val();
	var agentPhone = $('#agentPhone').val();
	var hasLift = $('#hasLift').val();
	var paymentMode = $('#paymentMode').val();
	var paymentModeObj = {};
	paymentModeObj[paymentMode] = monthRent;
	paymentMode = paymentModeObj;
	if (rentType == 2 && bedRoomType == '') {
		myTips('请选择单间出租类别', 'error');
		return;
	}
	//房间标签
	var featureTag = [];
	$("#featureTag .btn").each(function(){
		if($(this).hasClass('btn-success')){
			featureTag.push(Number($(this).val()));
		}
	});
	featureTag = JSON.stringify(featureTag).getRealJsonStr();
	//房屋配置
	var detailPoint = [];
	$("#detailPoint .btn").each(function(){
		if($(this).hasClass('btn-success')){
			detailPoint.push(Number($(this).val()));
		}
	});
	detailPoint = JSON.stringify(detailPoint).getRealJsonStr();
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
		if (picUrlList.length < 5 || picUrlList.length > 24) {
			myTips("图片5张-24张","error");
			return;
		}
		var p5hDetail = {
			appId : appId,
			outHouseId : outHouseId,
			rentType : rentType,
			bedRoomNum : bedRoomNum,
			livingRoomNum : livingRoomNum,
			toiletNum : toiletNum,
			rentRoomArea : rentRoomArea,
			bedRoomType : bedRoomType,
			faceToType : faceToType,
			totalFloor : totalFloor,
			houseFloor : houseFloor,
			monthRent : monthRent,
			rentStartDate : rentStartDate,
			shortRent : shortRent,
			cityName : cityName,
			countyName : countyName,
			areaName : areaName,
			districtName : districtName,
			street : street,
			address : address,
			houseDesc : houseDesc,
			xCoord : xCoord,
			yCoord : yCoord,
			agentName : agentName,
			agentPhone : agentPhone,
			paymentMode : paymentMode,
			featureTag : featureTag,
			detailPoint : detailPoint,
			servicePoint : servicePoint,
			rentRequire : rentRequire,
			hasLift	: hasLift,
			picUrlList : picUrlList,
		}
		p5hDetail = JSON.stringify(p5hDetail);
		console.log(p5hDetail);
		$.post('../push58House.action', {
			p5hDetail : p5hDetail,
		}, function(data){
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			}
			isSave = true;
			myTips('发布成功', 'success');
			queryPushHouse(1, 0);
			$('#pushHouseDlg').dialog('close');
		});
	})
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
					picDesc:"",
					picUrl:img[i].path
				}
				picUrlList.push(picObj);
			}
			resolve(picUrlList);
		});
	});
	return p;
}
function updateHouseStatus(){
	var row = $('#houseDg').datagrid('getSelected');
	if(!row){
		myTips('请选择房源', 'error');
		return;
	}
	$('#updateHouseStatusDlg').dialog({
		title : '上架/下架',
		top : getTop(150),
		left : getLeft(250),
		width : 250,
		height : 150,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$('#houseStatus').val(row.houseStatus);
	$('#updateHouseStatusDlg').dialog('open');
}
function doUpdateHouseStatus(){
	var row = $('#houseDg').datagrid('getSelected');
	var appId = $('#appId').val();
//	appId = "58app";
	var houseStatus = $('#houseStatus').val();
	if (houseStatus == '') {
		myTips('请选择发布状态', 'error');
		return;
	}
	var p5hDetail = {
		appId : appId,
		houseId : row.p5hHouseId,
		status : houseStatus,
	}
	p5hDetail = JSON.stringify(p5hDetail);
	$.post('../update58HouseStatus.action', {
		p5hDetail : p5hDetail,
	}, function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		myTips(data.msg, 'success');
		queryPushHouse(1, 0);
		$('#updateHouseStatusDlg').dialog('close');
	});
}
//修改房源重新发布
function updatePushHouseDlg(){
	var row = $('#houseDg').datagrid('getSelected');
	if(!row){
		myTips('请选择房源', 'error');
		return;
	}
	$('#updatePushHouseDlg').dialog({
		title : '修改并重新发布',
		top : getTop(580),
		left : getLeft(940),
		width : 940,
		height : 580,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updatePushHouseDlg [clear="clear"]').val('');
			$('#updatePushHouseDlg [clear="clear"]').html('');
			$('#updatePushHouseDlg [choose="choose"]').val('');
			$('#updatePushHouseDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#bedRoomType').attr('disabled', 'disabled');
			$("#featureTag2 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#detailPoint2 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
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
	$('#updatePushHouseDlg').dialog('open');
	var p5h = JSON.parse(row.p5hDetail.getRealJsonStr());
	$('#bindAddress2').val(row.detailedAddress);
	$('#appId2').val(p5h.appId);
	$('#outHouseId2').val(p5h.outHouseId);
	$('#rentType2').val(p5h.rentType);
	$('#bedRoomNum2').val(p5h.bedRoomNum);
	$('#livingRoomNum2').val(p5h.livingRoomNum);
	$('#toiletNum2').val(p5h.toiletNum);
	$('#rentRoomArea2').val(p5h.rentRoomArea);
	$('#bedRoomType2').val(p5h.bedRoomType);
	$('#faceToType2').val(p5h.faceToType);
	$('#totalFloor2').val(p5h.totalFloor);
	$('#houseFloor2').val(p5h.houseFloor);
	$('#monthRent2').val(p5h.monthRent);
	$('#rentStartDate2').val(p5h.rentStartDate);
	$('#shortRent2').val(p5h.shortRent);
	$('#cityName2').val(p5h.cityName);
	$('#countyName2').val(p5h.countyName);
	$('#areaName2').val(p5h.areaName);
	$('#districtName2').val(p5h.districtName);
	$('#street2').val(p5h.street);
	$('#address2').val(p5h.address);
	$('#houseDesc2').val(p5h.houseDesc);
	$('#xCoord2').val(p5h.xCoord);
	$('#yCoord2').val(p5h.yCoord);
	$('#agentName2').val(p5h.agentName);
	$('#agentPhone2').val(p5h.agentPhone);
	$('#hasLift2').val(p5h.hasLift);
	var paymentMode = '';
	for(var i in p5h.paymentMode){
		paymentMode = i;
	}
	$('#paymentMode2').val(paymentMode);
	changeRentType();
	//房间标签
	var featureTag = p5h.featureTag.split(',');
	$("#featureTag2 .btn").each(function(){
		for (var i in featureTag) {
			if($(this).val() == featureTag[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//房屋配置
	var detailPoint = p5h.detailPoint.split(',');
	$("#detailPoint2 .btn").each(function(){
		for (var i in detailPoint) {
			if($(this).val() == detailPoint[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//公寓配套服务
	var servicePoint = p5h.servicePoint.split(',');
	$("#servicePoint2 .btn").each(function(){
		for (var i in servicePoint) {
			if($(this).val() == servicePoint[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//入驻要求
	var rentRequire = p5h.rentRequire.split(',');
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

//执行修改房源并重新发布
function doUpdatePushHouse(){
	var checkFlag = 0;
	$('#updatePushHouseDlg [require="require"]').each(function(){
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
	var row = $('#houseDg').datagrid('getSelected');
	var p5h = JSON.parse(row.p5hDetail.getRealJsonStr());
	var appId = $('#appId2').val();
//	appId = "58app";
	var houseId = row.p5hHouseId;
	var outHouseId = $('#outHouseId2').val();
	var rentType = $('#rentType2').val();
	var bedRoomNum = $('#bedRoomNum2').val();
	var livingRoomNum = $('#livingRoomNum2').val();
	var toiletNum = $('#toiletNum2').val();
	var rentRoomArea = $('#rentRoomArea2').val();
	var bedRoomType = $('#bedRoomType2').val();
	var faceToType = $('#faceToType2').val();
	var totalFloor = $('#totalFloor2').val();
	var houseFloor = $('#houseFloor2').val();
	var monthRent = $('#monthRent2').val();
	var rentStartDate = $('#rentStartDate2').val();
	var shortRent = $('#shortRent2').val();
	var cityName = $('#cityName2').val();
	var countyName = $('#countyName2').val();
	var areaName = $('#areaName2').val();
	var districtName = $('#districtName2').val();
	var street = $('#street2').val();
	var address = $('#address2').val();
	var houseDesc = $('#houseDesc2').val();
	var xCoord = $('#xCoord2').val();
	var yCoord = $('#yCoord2').val();
	var agentName = $('#agentName2').val();
	var agentPhone = $('#agentPhone2').val();
	var hasLift = $('#hasLift2').val();
	var paymentMode = $('#paymentMode2').val();
	var paymentModeObj = {};
	paymentModeObj[paymentMode] = monthRent;
	paymentMode = paymentModeObj;
	if (rentType == 2 && bedRoomType == '') {
		myTips('请选择单间出租类别', 'error');
		return;
	}
	//房间标签
	var featureTag = [];
	$("#featureTag2 .btn").each(function(){
		if($(this).hasClass('btn-success')){
			featureTag.push(Number($(this).val()));
		}
	});
	featureTag = JSON.stringify(featureTag).getRealJsonStr();
	//房屋配置
	var detailPoint = [];
	$("#detailPoint2 .btn").each(function(){
		if($(this).hasClass('btn-success')){
			detailPoint.push(Number($(this).val()));
		}
	});
	detailPoint = JSON.stringify(detailPoint).getRealJsonStr();
	//公寓配套服务
	var servicePoint = [];
	$("#servicePoint2 .btn").each(function(){
		if($(this).hasClass('btn-success')){
			servicePoint.push(Number($(this).val()));
		}
	});
	servicePoint = JSON.stringify(servicePoint).getRealJsonStr();
	//入驻要求
	var rentRequire = [];
	$("#rentRequire2 .btn").each(function(){
		if($(this).hasClass('btn-success')){
			rentRequire.push(Number($(this).val()));
		}
	});
	rentRequire = JSON.stringify(rentRequire).getRealJsonStr();
	//图片
	var picUrlList = p5h.picUrlList;
	var p5hDetail = {
		appId : appId,
		houseId : houseId,
		outHouseId : outHouseId,
		rentType : rentType,
		bedRoomNum : bedRoomNum,
		livingRoomNum : livingRoomNum,
		toiletNum : toiletNum,
		rentRoomArea : rentRoomArea,
		bedRoomType : bedRoomType,
		faceToType : faceToType,
		totalFloor : totalFloor,
		houseFloor : houseFloor,
		monthRent : monthRent,
		rentStartDate : rentStartDate,
		shortRent : shortRent,
		cityName : cityName,
		countyName : countyName,
		areaName : areaName,
		districtName : districtName,
		street : street,
		address : address,
		houseDesc : houseDesc,
		xCoord : xCoord,
		yCoord : yCoord,
		agentName : agentName,
		agentPhone : agentPhone,
		paymentMode : paymentMode,
		featureTag : featureTag,
		detailPoint : detailPoint,
		servicePoint : servicePoint,
		rentRequire : rentRequire,
		hasLift	: hasLift,
		picUrlList : picUrlList,
	}
	p5hDetail = JSON.stringify(p5hDetail);
	console.log(p5hDetail);
	$.post('../update58House.action', {
		p5hId : row.p5hId,
		p5hDetail : p5hDetail,
	}, function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		myTips('发布成功', 'success');
		queryPushHouse(1, 0);
		$('#updatePushHouseDlg').dialog('close');
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
		queryPushHouse(1, 0);
	});
}