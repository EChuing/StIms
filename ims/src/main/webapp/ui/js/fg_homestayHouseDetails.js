$(function() {
		$("#lockInfoDg").datagrid({
			onDblClickRow : function(rowIndex, rowData) {
			},
		});
});
//短租房间详细信息
function openHouseInfo(resObj){
	queryFollow(resObj, 1, 0);
	$('#hsStoreId').val(resObj.hsId);
	_title_address = resObj.hsAddCommunity +" " + resObj.hsAddBuilding +" " + resObj.hsAddDoorplateno;
	var state = resObj.hsDirtyHouse == 1 ? "未清洁" : "干净";
	//房间配置
	var hsFurnitureConfigArray = resObj.hsFurnitureConfig.split(" ");
	$("#room_configuration .btn").each(function(){
		for (var i in hsFurnitureConfigArray) {
			if($(this).val() == hsFurnitureConfigArray[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	$('#houseState').val(state);//房间状态
	if(resObj.hsDirtyHouse == 1){
		$('#cleanState').show();
	}
	//房间类型
	var houseList = JSON.parse(JSON.stringify(house_list_arr));
	var hsType=JSON.parse(setUp.jsrsuRoomType);
	var html =" ";
	for(var j in hsType){
		html += '<option>'+hsType[j].roomType+'</option>';
	}
	$("#shortHouseType").html(html).val();
	//房屋户型
	html =" ";
	for(var i in _sectionType){
		html += '<option value='+_sectionType[i]+'>'+_sectionType[i];+'</option>';
	}
	$("#hsSectionType").html(html).val();

	for(var i in resObj){
		$('#'+i).val(resObj[i]);
	}
	//房屋地址
	$('#houseAddress').val(resObj.hsAddCity +" " + resObj.hsAddDistrict +" " + resObj.hsAddZone +" " + resObj.hsAddCommunity +" " + resObj.hsAddBuilding +" " + resObj.hsAddDoorplateno)
	//房间户型
	$('#shortHouseType').val(resObj.hsRoomType)
	$('#cleanState').hide();
	$('#repairState').hide();
	$('#renovateState').hide();
	if(resObj.hsDirtyHouse == 1){
		$('#cleanState').show();//显示保洁完成按钮
	}
	if(resObj.hsDirtyHouse == 2){
		$('#repairState').show();//显示维修完成按钮
		$('#houseState').val("维修中");
	}
	if(resObj.hsDirtyHouse == 3){
		$('#renovateState').show();//显示装修完成按钮
		$('#houseState').val("装修中");
	}
	
	$('#houseInfoDlg').dialog({
		title : _title_address+" 房间详情",
		top : getTop(580),
		left : getLeft(950),
		width : 830,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#cleanState').hide();
			$("#doorCardAuthorize").html("门卡授权");
			$(".doorCardHide").hide();
			$("#hsStoreId").val("");
			$(".doorCardHide [clear='clear']").val("");
			$("#houseInfoDlg [cleartwo = 'cleartwo']").val("");
			$("#modifyButton").show();//显示修改按钮
			$("#addButton").hide();//隐藏保存按钮
			$("#room_configuration .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		}
	});
				
	//禁止input元素
	$('#houseInfoDlg [cleartwo="cleartwo"]').attr("disabled","disabled");
	$('#room_configuration .btn').attr("disabled","disabled");
	$('#houseInfoDlg').dialog('open');
	
	$('#followInfoTable').datagrid({
		columns : [ [ {
			field : 'jhfFollowTime',
			title : '跟进时间',
			width : '20%',
			align : 'center'
		}, {
			field : 'jhfUserName',
			title : '跟进人',
			width : '15%',
			align : 'center'
		}, {
			field : 'jhfPaymentWay',
			title : '跟进类型',
			width : '10%',
			align : 'center'
		},  {
			field : 'jhfFollowBelong',
			title : '跟进归属',
			width : '10%',
			align : 'center'
		}, {
			field : 'jhfFollowRemark',
			title : '跟进内容',
			width : '45%',
			align : 'center'
		}] ],
		width : '100%',
		height : '157px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		onDblClickRow : function(rowIndex, data){
			downFollowInfo(data);
		}
	});
}
//列表下方跟进的详细界面
function downFollowInfo(data){
	$('#downFollowInfo').css('display','block');
	$('#pathStr').text('查看跟进图片');
	$('#downFollowInfo').dialog({
		title : _title_address + ' 跟进详细信息',
		top : getTop(250),
		left : getLeft(450),
		width : 450,
		height : 220,
		closed : true,
		cache : false,
		modal : true,
		onClose : function(){
			$('#downFollowInfo [clano=clano]').html('');
		},
	});
	for(var i in data){
		if(i=='jhfFollowRemark'){
			$('#readDownFollow'+i).html("&nbsp;&nbsp;&nbsp;&nbsp;"+data[i].replace(/\n/g, "<br>&nbsp;&nbsp;&nbsp;&nbsp;"));
		}else{
			$('#readDownFollow'+i).html(data[i]);
		}
	}
	$('#downFollowInfo').dialog('open');
}
//短租详情列表下的跟进记录导入数据
function queryFollow(data, page, type) {
	var startNum = (parseInt(page) - 1) * 5;
	var endNum = 5;
	// 跟进记录表取数据
	$.post("../queryAllHousingFollow.action", {
		jhfHouse4storeId : data.hsId,
		startNum : startNum,
		endNum : endNum
	}, function(row) {
		if (row.code<0) {
			sourcePageOne(0, 0, 0);
			$('#followInfoTable').datagrid({
				row : [],
				view : myview,
				emptyMsg : row.msg
			});
		} else {
			row=row.body;
			if (page == 1 && type == 0) {
				_indexNum[0]=0;
				sourcePageOne(row[0].totalNum, page, 0);
			}
			$("#followInfoTable").datagrid("loadData", row);
		}
	}, "json");
}
var oldhsMicronetIdentification1 ="";
var oldHsSectionType1="";
var oldHsHouseTitle1="";
var oldHsTimePrice1="";
//房间详情修改
function modifyButton(){
	//移除id 属性，元素变为操作状态
	$('#hsMicronetIdentification').removeAttr("disabled","disabled");
	$('#hsDailyRent').removeAttr("disabled","disabled");
	$('#hsHotDailyRent').removeAttr("disabled","disabled");
	$('#shortHouseType').removeAttr("disabled","disabled");
	$('#room_configuration .btn').removeAttr("disabled","disabled");
	$('#hsSectionType').removeAttr("disabled","disabled");
	$('#hsTimePrice').removeAttr("disabled","disabled");
	$('#hsHouseTitle').removeAttr("disabled","disabled");
	$('#hsHousingIntroduction').removeAttr("disabled","disabled");
	$("#modifyButton").hide();//隐藏修改按钮
	$("#addButton").show();//显示保存按钮
	//获取旧的数据
	$("#oldHsDailyRent").val($("#hsDailyRent").val());
	$("#oldHsHotDailyRent").val($("#hsHotDailyRent").val());
	$("#oldhsHousingIntroduction").val($("#hsHousingIntroduction").val());
	$("#oldHsRoomType").val($("#shortHouseType").find("option:selected").val());
	oldHsTimePrice1=$("#hsTimePrice").val();
	oldhsMicronetIdentification1=$("#hsMicronetIdentification").find("option:selected").val();
	oldHsSectionType1=$("#hsSectionType").find("option:selected").val();
	oldHsHouseTitle1=$("#hsHouseTitle").val();
	oldhsHousingIntroduction1=$("#hsHousingIntroduction").val();
	var oldRoomConfiguration="";
	$("#room_configuration .btn").each(function(){
		if($(this).hasClass('btn-success')){
			console.log($(this).val())
			oldRoomConfiguration += $(this).val();
			oldRoomConfiguration += ' ';
		}
	});
	$("#oldHsFurnitureConfig").val(oldRoomConfiguration);
}
//房间详情保存
function addButton(){
	var hsDailyRent=$("#hsDailyRent").val();
	var hsHotDailyRent=$("#hsHotDailyRent").val();
	var hsRoomType=$("#shortHouseType").find("option:selected").val();
	var hsMicronetIdentification = $('#hsMicronetIdentification').find("option:selected").val();
	var hsSectionType=$('#hsSectionType').find("option:selected").val();
	var hsHouseTitle=$("#hsHouseTitle").val();
	var hsTimePrice=$("#hsTimePrice").val();
	var hsId=$("#hsStoreId").val();
	var hsHousingIntroduction=$("#hsHousingIntroduction").val();
	var roomConfiguration= '';
	$("#room_configuration .btn").each(function(){
		if($(this).hasClass('btn-success')){
			roomConfiguration += $(this).val();
			roomConfiguration += ' ';
		}
	});
	var insertDate = {};
	
	insertDate={
		hsMicronetIdentification : hsMicronetIdentification,
		hsId:hsId,
		hsDailyRent:hsDailyRent,
		hsHotDailyRent:hsHotDailyRent,
		hsRoomType:hsRoomType,
		hsFurnitureConfig: roomConfiguration, //短租房间配置
		hsSectionType:hsSectionType,
		hsHouseTitle:hsHouseTitle,
		hsTimePrice:hsTimePrice,
		hsHousingIntroduction:hsHousingIntroduction,
	}
	$.ajax({
		type:"post",
		url:"../updateHouseForStore.action",
		data:insertDate,
		dataType:"json",
		success: function(result){
			if(result.code == 1){
				myTips("保存成功","success");
				$("#modifyButton").show();//显示修改按钮
				$("#addButton").hide();//隐藏保存按钮
				//禁止input元素 cleartwo="cleartwo"
				$('#houseInfoDlg [cleartwo="cleartwo"]').attr("disabled","disabled");
				$('#room_configuration .btn').attr("disabled","disabled");
				insertFollowUp();
				refash();//刷新方法
			}else{
				myTips(result.msg,"error");
			}
		}
	});
}
//插入跟进记录
function insertFollowUp(){
	//获取修改前 的房价、高峰价格、房间设备、房间类型数据
	var oldHsDailyRent=$("#oldHsDailyRent").val();
	var oldHsHotDailyRent=$("#oldHsHotDailyRent").val();
	var oldHsRoomType=$("#oldHsRoomType").val();
	var oldHsFurnitureConfig=$("#oldHsFurnitureConfig").val();
	var oldHsTimePrice=oldHsTimePrice1;
	var oldhsMicronetIdentification = oldhsMicronetIdentification1;
    var oldHsSectionType=oldHsSectionType1;
    var oldHsHouseTitle=oldHsHouseTitle1;
    var oldHsHousingIntroduction=oldhsHousingIntroduction1;
	//获取修改后的房价、高峰价格、房间设备、房间类型数据
	var newHsDailyRent=$("#hsDailyRent").val();
	var newHsHotDailyRent=$("#hsHotDailyRent").val();
	var newShortHouseType=$("#shortHouseType").find("option:selected").val();
	var newhsMicronetIdentification = $("#hsMicronetIdentification").find("option:selected").val();
	var newHsSectionType=$("#hsSectionType").find("option:selected").val();
	var newHsHouseTitle=$("#hsHouseTitle").val();
	var newHsTimePrice=$("#hsTimePrice").val();
	var newHsHousingIntroduction=$("#hsHousingIntroduction").val();
	var roomConfiguration= '';
	$("#room_configuration .btn").each(function(){
		if($(this).hasClass('btn-success')){
			roomConfiguration += $(this).val();
			roomConfiguration += ' ';
		}
	});
	var followText = "";
	if(oldHsTimePrice!=newHsTimePrice){
		followText+="原钟点房价格:"+oldHsTimePrice+"修改为钟点房价格:"+newHsTimePrice+",";
	}
	if(oldHsDailyRent!=newHsDailyRent){
		followText+="原日常价格:"+oldHsDailyRent+"修改为日常价格:"+newHsDailyRent+",";
	}

	if(oldHsHotDailyRent!=newHsHotDailyRent){
		followText+="原高峰价格:"+oldHsHotDailyRent+"修改为高峰价格:"+newHsHotDailyRent+",";
	}
	
	if(oldHsRoomType!=newShortHouseType){
		followText+="原房间房型:"+oldHsRoomType+"修改为房型:"+newShortHouseType+",";
	}
	
	if(oldhsMicronetIdentification != newhsMicronetIdentification){
		var oldState = oldhsMicronetIdentification == 2 ? "已发布" : "未发布";
		var newState = newhsMicronetIdentification == 2 ? "已发布" : "未发布";
		followText+="原发布状态:"+oldState+" 修改为"+newState+",";
	}
	if(oldHsSectionType==undefined && oldHsSectionType!=newHsSectionType){
		followText+="原房间户型:空, "+" 修改为户型:"+newHsSectionType+",";
	}
	if(oldHsSectionType!=undefined && oldHsSectionType!=newHsSectionType){
		followText+="原房间户型:"+oldHsSectionType+"修改为户型:"+newHsSectionType+",";
	}
	if(oldHsHouseTitle=="" && oldHsHouseTitle!=newHsHouseTitle){
		followText+="原房间标题:空,"+" 修改为房间标题:"+newHsHouseTitle+",";
	}
	if(oldHsHouseTitle!= "" && oldHsHouseTitle!=newHsHouseTitle){
		followText+="原房间标题:"+oldHsHouseTitle+"修改为房间标题:"+newHsHouseTitle+",";
	}
	
	if(oldHsFurnitureConfig!=roomConfiguration){
		followText+="原房间配置:"+oldHsFurnitureConfig+"修改为房间配置:"+roomConfiguration;
	}
	
	if(oldHsHousingIntroduction!=newHsHousingIntroduction){
		followText+="原客房详情:"+oldHsHousingIntroduction+"修改为客房详情:"+newHsHousingIntroduction;
	}

	if(followText != ""){
		var date = new Date();
		var jhfFollowTime = date.format("yyyy-MM-dd hh:mm:ss");
		var jhfHouse4storeId=$("#hsStoreId").val();//未租房id
		var jhfFollowRemark=followText;//跟进内容
		var jhfPaymentWay='系统跟进';//跟进方式
		var jhfFollowResult='修改成功';//跟进结果
		var jhfFollowBelong='其他';//跟进归属
		
		$.post("../insertHousingFollow.action", {
			jhfFollowTime :jhfFollowTime,
			jhfFollowResult : jhfFollowResult,
			jhfFollowBelong : jhfFollowBelong,
			jhfPaymentWay 	: jhfPaymentWay,
			jhfHouse4storeId: jhfHouse4storeId,
			jhfFollowRemark : jhfFollowRemark,
			jhfUserId 		: _loginUserId,//跟进id
			jhfDepartment 	: _loginDepartment,//部门id
			jhfStorefront 	: _loginStore,//区域id
		}, function(data) {
			if (data.code<0) {
				myTips("跟进失败！","error");
				return;
			}
			var data1={};
			data1.hsId=jhfHouse4storeId;
			queryFollow(data1, 1, 0);
		});	
	}
}
//分页操作
function sourcePageOne(totalNum, page, type) {
	if (type ==0) {
		var pageNum = Math.ceil(totalNum / 5);
		$("#followPage").remove();
		$("#followPageDiv")
				.append(
						"<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
		$("#followPage").createPage({
			onePageNums:5,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0]=p
					_indexNum[0]=0;
					var hsId=$("#hsStoreId").val();
					var row =getHouseData(hsId);//house_list_arr
					console.log(hsId);
					if(row){
						queryFollow(row,p,1);
					}
				}
			}
		});
	}
}
//门卡管理
function doorCardManagement(){
	getLockInfo();
	$('#doorCardManagement').dialog({
		title : _title_address + " 门卡详情",
		top : getTop(350),
		left : getLeft(700),
		width : 595,
		height : 350,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#cleanState').hide();
			$("#doorCardAuthorize").html("门卡授权");
			$(".doorCardHide").hide();
			$(".doorCardHide [clear='clear']").val("");
		}
	});
	$('#doorCardManagement').dialog('open');
}

function doorCardAuthorize(){
	var text = $("#doorCardAuthorize").text();
	if(text == "门卡授权"){
		var hsId = $("#hsId").val();
		var jsrcState=$("#jsrcState").val()
		if(hsId==""){
			var hsId = $("#jsrcHsId").val();
		}
		
		$.ajax({
				url:"../selectThisHouseDeviceID.action",
				type:"post",
				data : {
					jhdHsId:hsId
				},
				dataType:"json",
				success : function(result){
					$("#lockList").empty();
					if(result.code < 0){
						myTips(result.msg,"error");
					}else{
						var data =	result.body;
						var htmls = "";
						for(var i in data){
							let isYunHaiLock = (data[i].devBrandId == 20 && (data[i].devId == 25||data[i].devId == 49));
							if(isYunHaiLock){
								let html = '<div class="lock">'+data[i].devNickname+'<input type="checkbox" checked="checked" data-name="'+data[i].devNickname+'" value="'+data[i].id+'"/></div>';
								htmls += html;
								break;
							}
						}
						$("#lockList").html(htmls);
						
						$.ajax({
							url:"../selectJourShortRentContract.action",
							type:"post",
							data : {
								jsrcHsId:hsId,
								jsrcState:"在住"
							},
							dataType:"json",
							success : function(result){
								if(result.code < 0){
									myTips(result.msg,"error");
								}else{
									var data =	result.body;
									console.log(data)
									var peopleList;
									if(data[0].popJson!=null && data[0].popJson!=""){
										peopleList = JSON.parse(data[0].popJson);
									}
									var delineTime = data.jsrcEndTime;
									htmls = "";
									for(var j in peopleList){
										let html = '<option value="'+peopleList[j].popId+'" data-delineTime="'+delineTime+'">'+peopleList[j].popName+'</option>'
										htmls += html;
									}
									$("#selectPeople").html(htmls);
								}
							}
						})
					}
				}
		})
			
		$("#doorCardAuthorize").html("取消授权");
		$(".doorCardHide").toggle();
	}else if(text == "取消授权"){
		$("#doorCardAuthorize").html("门卡授权");
		$(".doorCardHide").toggle();
	}
	
}

function doSaveAuthDoorCard(){
	var lockName = " ";
	var lockIdArray = [];
	$(".lock input").each(function(){
		if(this.checked){
			lockIdArray.push(this.value)
      	lockName += $(this).attr("data-name");
      	lockName += " "
      }
	})
	
	if(lockIdArray.length < 1){
		myTips("请选择锁","error");
		return ;
	}
	
	var hsId = $("#hsStoreId").val();
	if(hsId == '' || hsId == null){
		hsId =  $("#jsrcHsId").val();
	}
	var house = getHouseData(hsId);
	var jdcHsId = house.hsId;
	
	var popId = $("#selectPeople ").val();
	if(popId==null || popId==""){
		popId=$("#selectPeople option:selected").val();
	}
	if(popId == null || popId == ""){
		myTips("目前没有在住客户无法发卡","error");
		return ;
	}
	var landlordId = house.hsLandlordId;
	var cardId = $('#cardId').val();
	var jdcDeadlineTime = $("#hopeTime").val();
	if(jdcDeadlineTime==null || jdcDeadlineTime==""){
		jdcDeadlineTime = $("#hopeTime option:selected").attr("data-delineTime");
	}
	var doorCardNum = $('#cardNum').val();
	
	if(cardId == ""){
		myTips("授权码不能为空","error");
		return ;
	}
	if(doorCardNum == ""){
		myTips("卡号不能为空","error");
		return ;
	}
	
	var popName = $("#selectPeople").val();
	var operatingRecording = {
			text : "门卡授权：为客户 "+popName+" 发放"+lockName+"的门卡，卡号"+doorCardNum+"，有效期至"+jdcDeadlineTime+".",
			time : new Date().format("yyyy-MM-dd hh:mm:ss"),
			type:"系统跟进",
			registrantName : _loginUserName
	}
	
	var jdcOperatingRecording = "["+JSON.stringify(operatingRecording)+"]";
	
	var inseratData = {
			jdcHsId : jdcHsId,
			departmentId : _loginDepartment,
			storefrontId : _loginStore,
			registerPeopleId : _loginUserId,
			landlordId : landlordId,
			jdcState:'使用中',
			jdcPopId:popId,
			jdcCardId:cardId,
			jdcDeadlineTime : jdcDeadlineTime,
			jdcCardNum:doorCardNum,
			doorCardFeeDeposit :  0,
			doorCardMaterialFee :  0,
			jdcOperatingRecording : jdcOperatingRecording,
	}
	
	var doorCardJson = "";
	for(var i in lockIdArray){
		inseratData.jdcDeviceId = lockIdArray[i];
		if(i == 0){
			doorCardJson += JSON.stringify(inseratData);
		}else{
			doorCardJson += "," + JSON.stringify(inseratData);
		}
	}
	
	doorCardJson = "[" + doorCardJson + "]";
	showLoading();
	$.ajax({
		type:"post",
		url:"../inseartDoorCard.action",
		data:{
			doorCardJson:doorCardJson
		},
		dataType:"json",
		success: function(result){
			hideLoading();
			if(result.code == 1){
				myTips("成功","success");
				$("#doorCardAuthorize").html("门卡授权");
				$(".doorCardHide").hide();
				$(".doorCardHide [clear='clear']").val("");
				getLockInfo();
			}else{
				myTips(result.msg,"error");
				
			}
			
		}
	});
}
//门锁
function getLockInfo(){
	var hsId;
	var houseInfoDlgOpenState = $('#houseInfoDlg').parent().is(":hidden");
	if(houseInfoDlgOpenState){
		hsId = $("#jsrcHsId").val();
	}else {
		hsId =  $("#hsStoreId").val();
	}
	console.log(hsId+"        111111")
	$.ajax({
		url:"../listDoorCard.action",
		type:"post",
		data:{
			jdcHsId:hsId,
			stateFlag:1
		},
		success:function(result){
			if(result.code == 1){
				var data = result.body;
				$("#lockInfoDg").datagrid("loadData",data);
			}
		}
	});
}

/**
* 注销/退卡
*/
function logoutDoorCart(type){
	var row = $('#lockInfoDg').datagrid('getSelected');
	if(row == null){
		myTips("请选中一条门卡记录","error");
	}else{
		var jdcState = "";
		if(type == 1){
			jdcState = "注销"
		}else if(type == 2){
			jdcState = "退卡"
		}else if(type == 3){
			jdcState = "续期"
		}
		var id = row.id;
		if(row.jdcState == "使用中"){
			$.messager.confirm('注意', '确定要'+jdcState + '?', function(r){
				if (r){
					if(type == 1 || type == 2){
						doDealWithDoorLock(jdcState,type);
					}else if(type == 3){
						renewDoorCart(jdcState,type);
					}
				}
			});
		}else{
			myTips("不能修改，该卡的状态为" + row.jdcState,"error");
		}
	}
}

/**
* 执行 注销/退卡
*/
function doDealWithDoorLock(jdcState,type){
	var row = $('#lockInfoDg').datagrid('getSelected');
	
	var id = row.id;
	
	var jdcCardId = row.jdcCardId;
	
	var jdcOperatingRecording = JSON.parse(row.jdcOperatingRecording.getRealJsonStr());
	
	var operatingRecording = {
			text : "门卡"+jdcState+"：为客户 "+row.popName+jdcState+","+row.devNickname+"的门卡.卡号为"+row.jdcCardNum+".",
			time : new Date().format("yyyy-MM-dd hh:mm:ss"),
			type:"系统跟进",
			registrantName : _loginUserName
	}
	jdcOperatingRecording.push(operatingRecording);
	jdcOperatingRecording = JSON.stringify(jdcOperatingRecording);
	$.ajax({
		type:"post",
		url:"../updateDoorCard.action",
		data:{
			id : id,
			jdcState:jdcState,
			jdcOperatingRecording:jdcOperatingRecording,
			jdcCardId:jdcCardId,
			jdcDeviceId:row.jdcDeviceId,
			type:type
		},
		dataType:"json",
		success: function(result){
			if(result.code == 1){
				myTips("成功","success");
				getLockInfo();
			}else{
				myTips(result.msg,"error");
			}
		}
	});
}
/***********************************************************房间详情图片上传及查看start****************************************************************/

//电脑上传
function uploadPic(){
	$('#uploadDlg input[clear=true]').val('');
	var att = randomn(9);
	$("#hsId").val($("#hsStoreId").val());
	
	/*$.ajax({
		url:"../insertAttachment.action",
		type:"post",
		data:{
			att:att
		},
		success:function(result){
			if(result.code != 1){
				myTips(result.msg,"error");
			}
		}
	})*/
			
	$('#uploadDlg').dialog({
		title : '上传',
		top : getTop(464),
		left : getLeft(600),
		width : 600,
		height : 464,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			closeUploader();
			$('#qrcode').empty();
			refresh();
		}
	});
	creatQr();
	$.post("../pubupload/getUpTokenCallback.action",function(data){
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$("#token").val(token);
		$("#co").val(co);
		initUploader();
		doCancel();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creatQr(){
	$.post("../pubupload/getMobUploadUrl.action",{
		att : $("#att").val()
	},function(data){
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel();
	});
}

//查看图片
function checkPic() {
	doCancel();
	showPic();
}
//删除图片
function removePic(){
	var photos = $('.contFile');
	if(photos.length == 0){
		$.messager.alert('消息','没有图片可以删除',"error");
	}else{
		$('#removePicture').html('请选择要删除的图片').show();
		$('.picturecheck').show();
		$('#doRemovePic').show();
	}
}
//执行删除图片
function doRemovePic(){
	var arr = 0;
	var path = '';
	var chk = $('.picturecheck');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0,path.length-1);//去掉最后一个逗号
		$.post("../deleteHsPic.action",{
			hsId :$("#hsStoreId").val(),
			hsOtherImg : path
		}, function(data) {
			if (data.code < 0) {
				myTips(data.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				showPic();
			}
		});
		doCancel();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
//取消删除图片
function doCancel(){
	$('#removePicture').hide();
	$('.picturecheck').hide().removeAttr('checked');
	$('#doRemovePic').hide();
}
function showPic(){
	$('#adImgDlg').dialog({
		title : '查看图片',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapper").empty();
		},
	});
	
	$("#imgWrapper").empty();
	$.post("../queryHouseForStoreById.action",{
		hsId:$("#hsStoreId").val()
	}, function(data) {
		if(data.code < 0){
			$("#imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		data=data.body;
		var path = data[0].hsOtherImg.getRealJsonStr();//getRealJsonStr()截取字符串前后两个双引号
		$('#adImgDlg').dialog('open');
		if (path == null) {
			return;
		}
		var img = eval('([' + path + '])');
		var imgNum = 0;
		var fileNum = 0;
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
				if(fileNum == 0){
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
				}
				$('#imgWrapper .fileList').append('<li>' +
						'<input name="other" class="picturecheck" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+img[i].path+'" class="contFile" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
						'</li>');
				fileNum++;
				
			}
		}
		for(var i in img){
			var strs = img[i].path.split(".");
			var ext = strs[strs.length-1];
			var j = parseInt(i) + parseInt(img.length);
			if(ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png"){
				if(imgNum == 0){
					$('#imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
				}
				$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img title="'+img[i].name+'" class="adImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
					'<input name="image" class="picturecheck" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
					'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
					'</li>');
				imgNum++;
			}
		}
		$(".adImg").colorbox({
			rel:'adImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//刷新
function refresh(){
	doCancel();
	showPic();
}
/***********************************************************房间详情图片上传及查看end****************************************************************/
