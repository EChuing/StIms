$(function(){
	$('#trusteeshipDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			pushHouseDlg();
		}
	});
	queryTrusteeship(_pageNum[0],0);
	for (var i = 0; i < _sectionType.length; i++) {
		$("#apartment_layout").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
	}
	for (var i in _direction) {
		$("#orientation").append("<option value = '" + _direction[i] + "'>" + _direction[i] + "</option>");
	}
	for (var i = 0; i < _houseType.length; i++) {
		$("#renovation").append("<option value = '" + _houseType[i] + "'>" + _houseType[i] + "</option>");
	}
	for (var i in _chargesPaid) {
		$("#charges_paid").append("<option value = '" + _chargesPaid[i] + "'>" + _chargesPaid[i] + "</option>");
	}
	$('button').click(function(){
		if ($(this).hasClass('btn-default')) {
			$(this).removeClass('btn-default');
			$(this).addClass('btn-success');
		} else {
			$(this).removeClass('btn-success');
			$(this).addClass('btn-default');
		}
	});
});


function formatterHsMicronetIdentification(value, row, index){
	if (row.hsMicronetIdentification == 1) {
		return "<a style='text-decoration:none;color:gray;'>已下架<a>";
	} else {
		return "<a style='text-decoration:none;color:blue;'>已上架<a>";
	}
}

//分页统计总条数
function gettrusteeshipPageCount(page){
	var pageSize = 20;
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var hsMicronetIdentification = $('#hsMicronetIdentification').val();
	var hsLeaseState='所有未租';
	//查询未租房间
	$.post("../queryHouseStoreCommon.action", {
		hsAddCommunity 		: qCommunity,
		hsAddBuilding 		: qBuilding,
		hsAddDoorplateno 	: qDoorplateno,
		hsPrimitiveMother   : 4,//可租房
		hsMicronetIdentification:hsMicronetIdentification,
		hsLeaseState:hsLeaseState
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"trusteeship",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"trusteeship",0);
		}
	});
}

//托管房源查询
function queryTrusteeship(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var qCommunity = $("#searchCommunity").val();
	var qBuilding = $("#searchBuilding").val();
	var qDoorplateno = $("#searchDoorplateno").val();
	var hsMicronetIdentification = $('#hsMicronetIdentification').val();
	var hsLeaseState='所有未租';
	//查询未租房间
	$.post("../queryHouseStoreCommon.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		hsAddCommunity 		: qCommunity,
		hsAddBuilding 		: qBuilding,
		hsAddDoorplateno 	: qDoorplateno,
		hsPrimitiveMother   : 4,//可租房
		hsMicronetIdentification:hsMicronetIdentification,
		hsLeaseState:hsLeaseState
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryTrusteeship","trusteeship");
			}else{
				notCountPage(page, 0 ,"queryTrusteeship","trusteeship");
			}
			$('#trusteeshipDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			// if (page == 1 && type == 0) {
			// 	_indexNum[0] = 0;
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryTrusteeship","trusteeship");
			}else{
				notCountPage(page, 1 , "queryTrusteeship","trusteeship");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				var hsOtherImg = data[i].hsOtherImg.getRealJsonStr();
				var attachmentsData = eval('[' + hsOtherImg + ']');
				data[i].NumberOfAttachments = attachmentsData.length;
				data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
			}
			$("#trusteeshipDg").datagrid("loadData", data);
		}
	}, "json");
}

//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#trusteeshipPage").remove();
		$("#trusteeshipPageDiv").append("<div class='tcdPageCode' id='trusteeshipPage' style='text-align:center;'></div>");
		$("#trusteeshipPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					queryTrusteeship(p, 1);
				}
			}
		});
	}
	
}

//发布房源
function pushHouseDlg(){
	var row = $('#trusteeshipDg').datagrid('getSelected');
	if(!row){
		myTips("请选择一条记录","error");
		return;
	}
	$('#pushHouseDlg').dialog({
		title : '发布房源',
		top : getTop(320),
		left : getLeft(650),
		width : 650,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#pushHouseDlg [choose="choose"]').val('');
			$('#pushHouseDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#releaseSettingsForm").form("clear");
			$("#fgsource_furnitureConfig .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		},
	});
	$('#pushHouseDlg').dialog('open');

	//查联系电话，默认填写自定义联系人
	$.post("../publishAContact.action", {
		hsId : row.hsId,
	}, function(data) {
			for (var i in data) {
				if (data[i] == null) {
					data[i] = '';
				}
			}
			var html1 ="";
			var html2 ="";
			var html3 ="";
			$("#telephone").empty();
			if(data.hsCustomContacts !="" && data.hsCustomContacts!=null){
				html1="<option value='"+data.hsCustomContacts+"'>"+data.hsCustomContacts+"</option>"
			}
			if (data.adminName !="" && data.adminName!=null) {
				html2="<option value = '" + data.adminPhone + "'>" + data.adminPhone+"（"+ data.adminName+"）" +  "</option>"
			}
			if (data.defaultName !="" && data.defaultName!=null) {
				html3="<option value = '" + data.defaultPhone + "'>" + data.defaultPhone+"（"+ data.defaultName+"）" + "</option>"
			}
			$("#telephone").append(html1+html2+html3);
			$('#telephoneInput').val(data.hsCustomContacts);
	}, "json");
	//房屋配置
	var hsFurnitureConfigArray = row.hsFurnitureConfig.split(" ");
	$("#fgsource_furnitureConfig .btn").each(function(){
		for (var i in hsFurnitureConfigArray) {
			if($(this).val() == hsFurnitureConfigArray[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	$('#house_mainImg').val()
	$('#house_title').val(row.hsHouseTitle);//标题
	$('#apartment_layout').val(row.hsSectionType);//户型
	$('#orientation').val(row.hsHouseDirection);//朝向
	$('#the_measure_of_area').val(row.hsHouseSquare);//面积
	$('#renovation').val(row.hsDecorationLabel);//装修
	$('#charges_paid').val(row.hsChargesPaid);//押付
	$('#house_tag').val(row.hsOpenHome);//看房标签
	$('#publish_tag').val(row.hsReleaseTime);//发布标签
	$('#corridor').val(row.hsCorridor);//楼道标签
	$('#furniture').val(row.hsApplianceSettings);//家私标签
	$('#hsMicronetIdentification2').val(row.hsMicronetIdentification);//发布状态
	$('#hsHousingIntroduction').val(row.hsHousingIntroduction);//详细介绍
	$('#hsOtherImg').attr("src",row.hsOtherImg);//房屋图片
	$('#hsMicronetIdentification3').val(row.hsMicronetIdentification);//发布状态
	$('#arkingSpace').val(row.hsParkingSpaces);//车位情况
}
//执行房源发布设置
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
	var row = $('#trusteeshipDg').datagrid('getSelected');
	var hsId = row.hsId;
	var houseTitle = $('#house_title').val();
	var hsSectionType = $("#apartment_layout").val();
	var hsHouseDirection = $("#orientation").val();
	var hsHouseSquare = $('#the_measure_of_area').val();
	var hsDecorationLabel = $("#renovation").val();
	var hsChargesPaid = $("#charges_paid").val();
	var hsCustomContacts = $('#telephoneInput').val();
	var hsOpenHome = $('#house_tag').val();
	var hsReleaseTime = $('#publish_tag').val();
	var corridor = $('#corridor').val();
	var furniture = $('#furniture').val();
	var hsMicronetIdentification = $('#hsMicronetIdentification3').val();
	var hsHousingIntroduction=$('#hsHousingIntroduction').val();
	var hsOtherImg=$('#hsOtherImg').val();
	var hsParkingSpaces=$("#arkingSpace").val();//车位情况
	var fgsourceFurnitureConfig = '';
	$("#fgsource_furnitureConfig .btn").each(function(){
		if($(this).hasClass('btn-success')){
			fgsourceFurnitureConfig += $(this).val();
			fgsourceFurnitureConfig += ' ';
		}
	});
	showLoading();
	$.post("../publishListingsSet.action", {
		hsId               : hsId,
		hsSectionType      : hsSectionType,
		hsHouseSquare      : hsHouseSquare,
		hsHouseDirection   : hsHouseDirection,
		hsDecorationLabel  : hsDecorationLabel,
		hsChargesPaid      : hsChargesPaid,
		hsHouseTitle       : houseTitle,
		hsOpenHome         : hsOpenHome,
		hsReleaseTime      : hsReleaseTime,
		hsCorridor         : corridor,
		hsApplianceSettings: furniture,
		hsMicronetIdentification:hsMicronetIdentification,
		hsHousingIntroduction:hsHousingIntroduction,
		hsOtherImg:hsOtherImg,
		hsFurnitureConfig  : fgsourceFurnitureConfig,
		hsCustomContacts   : hsCustomContacts,
		hsParkingSpaces:hsParkingSpaces,
	}, function(data) {
		hideLoading();
		if(data.code<0){
			myTips(data.msg,"error");
			return;
		}
		myTips(data.msg,"success");
		queryTrusteeship(_pageNum[0], 0);
		$('#pushHouseDlg').dialog('close');
	});
}
//上下架
function updateHouseStatus(){
	var row = $('#trusteeshipDg').datagrid('getChecked');
	if(row.length == 0){
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
	$('#hsMicronetIdentification3').val(row.hsMicronetIdentification);
	$('#updateHouseStatusDlg').dialog('open');
}
//执行上下架
function doUpdateHouseStatus(){
	var row = $('#trusteeshipDg').datagrid('getChecked');
	var hsMicronetIdentification = $('#hsMicronetIdentification2').val();
	if (hsMicronetIdentification == '') {
		myTips('请选择发布状态', 'error');
		return;
	}
	var jsonArray = [];
	for(var i in row){
		var json = {
			hsId:row[i].hsId,
			hsMicronetIdentification:hsMicronetIdentification
		}
		jsonArray.push(json);
	}
	showLoading();
	$.post('../updateBatchHouseForStore.action', {
		jsonArray : JSON.stringify(jsonArray)
	}, function(data){
		hideLoading();
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		myTips(data.msg, 'success');
		queryTrusteeship(_pageNum[0],0);
		$('#updateHouseStatusDlg').dialog('close');
	});
}

//下定状态颜色显示
function depositStateFormatter(value, row, index) {
	if (row.hsDownDeposit == "是") {
		return "<a style='text-decoration:none;color:red;'>已定<a>";
	} else {
		return "<a style='text-decoration:none;color:blue;'>未定<a>";
	}
}


