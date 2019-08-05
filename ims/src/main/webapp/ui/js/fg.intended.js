$(function() {
	advancedScreening(0);
	$("#searchTimeEnd").val(formatTime(getNowFormatDate(), 2));
	queryIntended(1, 0);
	$('#intendedDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$('#intended_index').val(rowIndex);
			updateIntended(rowData);
		}
	});
	for (var i in _sectionType) {
		$("#addipDoorModel").append("<option value = '" + i + "'>" + _sectionType[i] + "</option>");
		$("#addipDoorModel1").append("<option value = '" + i + "'>" + _sectionType[i] + "</option>");
	}
	for (var i in _checkinCype) {
		$("#addipInNature").append("<option value = '" + i + "'>" + _checkinCype[i] + "</option>");
		$("#addipInNature1").append("<option value = '" + i + "'>" + _checkinCype[i] + "</option>");
	}
	for (var i in _furnitureConfig) {
		$("#addfurnitureConfig").append("<option value='"+_furnitureConfig[i]+"'>"+_furnitureConfig[i]+"</option>");
		$("#addfurnitureConfig1").append("<option value='"+_furnitureConfig[i]+"'>"+_furnitureConfig[i]+"</option>");
	}
	for (var i in _intendedSource) {
		$("#from").append("<option value='"+_intendedSource[i]+"'>"+_intendedSource[i]+"</option>");
		$("#from1").append("<option value='"+_intendedSource[i]+"'>"+_intendedSource[i]+"</option>");
	}

/*	$.post("../queryDepartment.action", {
		departmentStorefrontId : _loginStore,
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		for (var i in data.body) {
			$(".add_source_theStore").append(
					"<option value = '" + data.body[i].departmentId + "'>"
							+ data.body[i].departmentName + "</option>");
			_depadepartment[i] = data.body[i].departmentId;
		}
	}, "json");*/
	
	
	$('#selfHelp').click(function(){
		if($(this).prop('checked')){
			$("#roomUserNameDiv").hide();
			$("#goto1Div").hide();
			$("#goto2Div").hide();
		}else{
			$("#roomUserNameDiv").show();
			$("#goto1Div").show();
			$("#goto2Div").show();
		}
	}
	);
}
);

//高级筛选
function advancedScreening(num){
	if(num == 0){
		$('.advancedScreening').css({
			"height" : "25px",
			"width"  : '500px',
			'overflow' : 'hidden',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('#screening').attr('onclick','advancedScreening(1)');
	}else if(num == 1){
		$('.advancedScreening').css({
			"height" : "25px",
			"width"  : '100%',
		})
		$('.advanced1').css({
			"height" : "25px",
		})
		$('#screening').attr('onclick','advancedScreening(0)');
	}
}

//分页统计总条数
function getintendedPageCount(page){
	var pageSize = 20;
	var ipName = $("#searchIntendedName").val();
	var ipTel = $("#searchIntendedPhone").val();
	var ipUserId = $("#searchRegisterGetUserId").val();
	var ipState = $("#searchIpState").val();
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	if(endTime!=''){
		endTime = new Date(endTime);
		endTime.setDate(endTime.getDate() + 1);
		endTime =  formatDate(endTime);
	}
	// 意向人信息表导入数据
	$.post("../selectIntendedPerson.action", {
		ipName : ipName,
		ipTel : ipTel,
		ipUserId : ipUserId,
		ipState:ipState,
		startTime:startTime,
		endTime:endTime,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"intended",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"intended",0);
		}
	});
}

// 查询意向人信息
function queryIntended(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var ipName = $("#searchIntendedName").val();
	var ipTel = $("#searchIntendedPhone").val();
	var ipUserId = $("#searchRegisterGetUserId").val();
	var ipState = $("#searchIpState").val();
	var startTime =  $('#searchTimeStart').val();
	var endTime =  $('#searchTimeEnd').val();
	if(endTime!=''){
		endTime = new Date(endTime);
		endTime.setDate(endTime.getDate() + 1);
		endTime =  formatDate(endTime);
	}
	// 意向人信息表导入数据
	$.post("../selectIntendedPerson.action", {
		startNum : startNum,
		endNum : endNum,
		ipName : ipName,
		ipTel : ipTel,
		ipUserId : ipUserId,
		ipState:ipState,
		startTime:startTime,
		endTime:endTime,
	}, function(data) {
		if (data.code<0) {
			//sourcePage(0, 0, 0);
			$('#intendedDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryIntended","intended");
			}else{
				notCountPage(page, 0 ,"queryIntended","intended");
			}
			return;
		}
		data=data.body;
		for (var i in data) {
			for ( var j in data[i]) {
				if (data[i][j] == null) {
					data[i][j] = '';
				}
			}
		}
		// if (page == 1 && type == 0) {
		// 	sourcePage(data[0].totalNum, page, 0);
		// }
		if(data.length<endNum){
			notCountPage(page, 2 , "queryIntended","intended");
		}else{
			notCountPage(page, 1 , "queryIntended","intended");
		}
		$("#intendedDg").datagrid("loadData", data);
		var indexNum = $('#intended_index').val();
		if(indexNum == '' || indexNum == null){
			indexNum = 0;
		}
		$('#intendedDg').datagrid('selectRow',indexNum);
	});
}
function sourcePage(totalNum, page, type) {
	var pageNum = 10;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#intendedPage").remove();
		$("#intendedPageDiv").append("<div class='tcdPageCode' id='intendedPage' style='text-align:center;'></div>");
		$("#intendedPage").createPage({
			onePageNums : 20,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				_pageNum[0] = p;
				if (p <= pageNum) {
					$('#intended_index').val(0);
					queryIntended(p, 1);
				}
			}
		});
	}
	if(type==1){
		pageNum = Math.ceil(totalNum /4);
		$("#followPage").remove();
		$("#followPageDiv").append("<div class='tcdPageCode' id='followPage' style='text-align:center;'></div>");
		$("#followPage").createPage({
			onePageNums:4,
			totalNum:totalNum,
			pageCount:pageNum,
			current:1,
			backFn:function(p){
				if(p<=pageNum){
					var row = $('#intendedDg').datagrid('getSelected');
					if(row){
						followInfo(row,p,1);
					}else{
						row = $('#intendedDg').datagrid('getData').rows[0];
						followInfo(row,p,1);
					}
				}
			}
		});
	}
	if (type == 2) {
		pageNum = Math.ceil(totalNum / 10);
		$("#choseTrusteeshipPage").remove();
		$("#choseTrusteeshipPageDiv").append("<div class='tcdPageCode' id='choseTrusteeshipPage' style='text-align:center;'></div>");
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
function followInfo(row,page,type){
	if(row.ipNote != null && row.ipNote != '' ){
		var folowStr = row.ipNote.getRealJsonStr();
		var folowData = eval('(' + "[" +folowStr.replace(/\n/g, "&nbsp;&nbsp;&nbsp;&nbsp;") + "]" + ')');
		if (page == 1 && type == 0) {
			sourcePage(folowData.length, page, 1);
		}
		var startNum = (parseInt(page) - 1) * 4;
		var inData = '';
		if(folowData.length==1){
			$('#followInfoTable').datagrid({
				data : folowData,
			});
		}else{
			for(var i = (folowData.length-startNum-1); i>parseInt((folowData.length-startNum))-5	 ;i--){
				if(folowData[i]!=undefined){
					if(i == (folowData.length-startNum-1)){
						inData += JSON.stringify(folowData[i]);
					}else{
						inData += ","+JSON.stringify(folowData[i]);
					}
				}
			}
			inData = eval('(' + "[" + inData + "]" + ')');
			$('#followInfoTable').datagrid({
				data : inData,
			});
		}
	}else{
		sourcePage(0, 0, 1);
		var noData = [];
		$('#followInfoTable').datagrid({
			data : noData,
			view : myview,
			emptyMsg : '没有查询到符合条件的记录！'
		});
	}
}

//打开添加意向人对话框
function addIntended() {
	$("#addIntendedDlg").dialog({
		title : '添加意向人',
		top : getTop(258),
		left : getLeft(700),
		width : 700,
		height : 258,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addIntendedDlg input").val('');
			$("#addIntendedDlg textarea").val('');
			$("#addIntendedDlg select").val('');
			$("#addIntendedDlg input[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
		}
	});
	$('#addRegistrationTime').val(formatDate(getNowFormatDate()));
	$("#addipUserName").val(_loginUserName);
	$("#addipUserId").val(_loginUserId);

	$("#addIntendedDlg").dialog('open');
}
//添加意向人
function doAddIntended() {
	var ipName = $("#addpopName").val();
	var ipTel = $("#addpopPhone").val();
	var ipFrom = $("#addipFrom").val();
	var ipInNature = $("#addipInNature").find("option:selected").text();
	var ipDoorModel = $("#addipDoorModel").find("option:selected").text();
	var ipArea = $("#addipArea1").val()+"~"+$("#addipArea2").val();
	var ipLocation = $("#addipLocation").val();
	var ipState = $("#addipState").val();
	var ipOther = $("#addipOther").val();
	
	var addfurnitureConfig = $("#addfurnitureConfig").val();
	var addFloorDemand = $("#addFloorDemand").val();
	var addPriceRange = $("#addPriceRange1").val()+"~"+$("#addPriceRange2").val();
	if(ipArea == '~'){
		ipArea = '';
	}	
	if(addPriceRange == '~'){
		addPriceRange = '';
	}
	var checkFlag = 0;
	$("#addIntendedDlg input[needs=1]").each(function(){
		if($(this).val()==''||$(this).val()==null){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		$("#intendedTips").html("有必填项未填写!");
		return;
	}
	showLoading();
	$.post("../insertIntendedPerson.action", {
		ipName 			 : ipName,
		ipTel 			 : ipTel,
		ipFrom			 : ipFrom,
		ipInNature 		 : ipInNature,
		ipDoorModel 	 : ipDoorModel,
		ipArea 			 : ipArea,
		ipLocation 		 : ipLocation,
		ipOther 		 : ipOther,
		ipUserId 		 : _loginUserId,
		ipDepartmentId	 : _loginDepartment,
		ipStorefrontId	 : _loginStore,
		ipState			 : ipState,
		ipFurnitureConfig : addfurnitureConfig,
		ipFloorDemand     : addFloorDemand,
		ipPriceRange      : addPriceRange,
	}, function(data) {
		if (data.code<0) {
			myTips(data.msg, "error");
			hideLoading();
			return;
		}
		myTips("添加成功！", "success");
		hideLoading();
		queryIntended(1, 0);
		$("#intendedTips").html("");
		$("#addIntendedDlg").dialog('close');
	});
}

// 修改人口
function doUpdateIntended() {
	var row = $("#intendedDg").datagrid("getSelected");
	var ipName = $("#addpopName1").val();
	var ipTel = $("#addpopPhone1").val();
	var ipFrom = $("#addipFrom1").val();
	var ipInNature = $("#addipInNature1").find("option:selected").text();
	var ipDoorModel = $("#addipDoorModel1").find("option:selected").text();
	var ipArea = $("#addipArea11").val()+"~"+$("#addipArea21").val();
	var ipLocation = $("#addipLocation1").val();
	var ipState = $("#addipState1").val();
	var ipOther = $("#addipOther1").val();
	
	var addfurnitureConfig = $("#addfurnitureConfig1").val();
	var addFloorDemand = $("#addFloorDemand1").val();
	var addPriceRange = $("#addPriceRange11").val()+"~"+$("#addPriceRange21").val();
	if(ipArea == '~'){
		ipArea = '';
	}	
	if(addPriceRange == '~'){
		addPriceRange = '';
	}
	var checkFlag = 0;
	$("#lookAtTheIntentionerDlg input[needs=1]").each(function(){
		if($(this).val()==''||$(this).val()==null){
			$(this).css("border","1px solid red");
			checkFlag++;
		}else{
			$(this).css("border","1px solid #A9A9A9");
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!", "error");
		return;
	}
	showLoading();
	$.post("../updateIntendedPerson.action", {
		ipId 			: row.ipId,
		ipName 			: ipName,
		ipTel 			: ipTel,
		ipFrom			: ipFrom,
		ipInNature 		: ipInNature,
		ipDoorModel 	: ipDoorModel,
		ipArea 			: ipArea,
		ipLocation 		: ipLocation,
		ipOther 		: ipOther,
		ipState			: ipState,
		ipFurnitureConfig : addfurnitureConfig,
		ipFloorDemand     : addFloorDemand,
		ipPriceRange      : addPriceRange,
		registrantName	: _loginUserName,
	}, function(data) {
		if (data.code<0) {
			myTips(data.msg, "error");
			hideLoading();
		} else {
			myTips("修改成功！", "success");
			hideLoading();
			queryIntended(_pageNum[0], 0);
			$("#intendedTips").html("");
			$("#lookAtTheIntentionerDlg").dialog('close');
		}
	});
}
// 查看 、修改人口对话框
function updateIntended(row) {
	$("#lookAtTheIntentionerDlg").dialog({
		title : '意向客户详细',
		top : getTop(535),
		left : getLeft(660),
		width : 660,
		height : 535,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#lookAtTheIntentionerDlg input").val('');
			$("#lookAtTheIntentionerDlg textarea").val('');
			$("#lookAtTheIntentionerDlg select").val('');
			$("#lookAtTheIntentionerDlg input[needs=1]").each(function(){
				$(this).css("border","1px solid #A9A9A9");
			});
		}
	});

	$('#addpopName1').val(row.ipName);
	$('#addpopPhone1').val(row.ipTel);
	$("#addipState1").val(row.ipState);
	$("#addipId1").val(row.ipId);
	$("#addipFrom1").val(row.ipFrom);
	$("#addipOther1").val(row.ipOther);
	$("#addRegistrationTime1").val(formatDate(row.ipDate));
	for (var i in _sectionType) {
		if (_sectionType[i] == row.ipDoorModel) {
			$("#addipDoorModel1").val(i);
		}
	}
	for (var i in _checkinCype) {
		if (_checkinCype[i] == row.ipInNature) {
			$("#addipInNature1").val(i);
		}
	}
	if(row.ipArea.indexOf("~")>-1){
		$("#addipArea11").val(row.ipArea.split("~")[0]);
		$("#addipArea21").val(row.ipArea.split("~")[1]);
	}else{
		$("#addipArea11").val(row.ipArea);
	}
	
	if(row.ipPriceRange.indexOf("~")>-1){
		$("#addPriceRange11").val(row.ipPriceRange.split("~")[0]);
		$("#addPriceRange21").val(row.ipPriceRange.split("~")[1]);
	}else{
		$("#addPriceRange11").val(row.ipPriceRange);
	}
	
	$("#addfurnitureConfig1").val(row.ipFurnitureConfig);
	$("#addFloorDemand1").val(row.ipFloorDemand);
	$('#addipFrom1').val(row.ipFrom);
	$("#addipLocation1").val(row.ipLocation);
	$('#addipUserName1').val(row.username);
	//最后隐藏电话
	$("#addpopPhoneDiv1").css('display','none');
	
	$("#lookAtTheIntentionerDlg").dialog('open');
	$('#takeAGuestHouseTable').datagrid({
		columns : [ [ {
			field : 'gotoOutOfTime',
			title : '带看时间',
			width : '20%',
			align : 'center'
		},{
			field : 'addStreet',
			title : '带看房源',
			width : '40%',
			align : 'center'
		},{
			field : 'username',
			title : '带看人',
			width : '10%',
			align : 'center'
		},{
			field : 'gotoPassword',
			title : '带看密码',
			width : '15%',
			align : 'center'
		},{
			field : 'totalPage',
			title : '跟进/签到',
			width : '15%',
			align : 'center'
		}] ],
		width : '100%',
		height : '127px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			
		}
	});
	
	$('#followInfoTable').datagrid({
		columns : [ [ {
			field : 'note',
			title : '跟进内容',
			width : '74%',
			align : 'center'
		},{
			field : 'time',
			title : '跟进时间',
			width : '16%',
			align : 'center'
		},{
			field : 'name',
			title : '跟进人',
			width : '10%',
			align : 'center'
		}] ],
		width : '100%',
		height : '127px',
		singleSelect : true,
		autoRowHeight : false,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			downFollowInfo(rowData);
		}
	});
	followInfo(row,1,0);
	selecttakeAGuestHouse(row);
}
//查询带看房记录
function selecttakeAGuestHouse(row){
	var ipGotoJosn = row.ipGotoJosn;
	$.post("../selectRoomWindow.action", {
		ipGotoJosn : ipGotoJosn,
	}, function(data) {
		if(data.code<0){
			$('#takeAGuestHouseTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
			return;
		}
		data = data.body;
		if(data == null){
			data = [];
		}
		for(var i in data){
			data[i].addStreet = ''+data[i].addCommunity+data[i].addBuilding+data[i].addDoorplateno;
			data[i].gotoPassword = '<sp style="color:#8A8ABE;">'+data[i].gotoPassword+'</sp>';
			if(data[i].gotoComeBackTime == '' || data[i].gotoComeBackTime == null){
				data[i].totalPage = '<a class="easyui-linkbutton" onclick="myselectFollowRows('+data[i].gotoId+',\'gotoId\',\'takeAGuestHouseTable\',0)" style="color:red;" >写跟进</a>';
			}else{
				data[i].totalPage = data[i].gotoComeBackTime;
			}
		}
		$('#takeAGuestHouseTable').datagrid("loadData", data.reverse());
	});
}
//自写datagrid 选择行方法
function myselectFollowRows(id,field,tableId,showNumber){
	//id，field：列的唯一id 一般是主键  可以用其他唯一字段代替
	//tableId：datagr的ID
	//showNumber：某些需要显示datagrid当前行数的显示DIV的id,不需要显示的可以传0
	var rows = $('#'+tableId).datagrid('getRows');
	var index =0;
	for(var i =0;i< rows.length;i++){
		for(var j in rows[i]){
			if(j==field){
				if(rows[i][j]==id){
					index = i;
				}
			}
		}
	}
	$('#'+tableId).datagrid('selectRow',index);
	writeFollow(1);
}
/*------------lookPhone看电话写跟进--------------*/
function lookPhone(){
	//检查是否冻结
	$.post("../checkSuFrozenUser.action",function(data){
		data=data.body;
		console.log(data);
		if(data==0){
			myTips("抱歉，您已被系统冻结相关权限，请联系上级解冻。","error");
			return;
		}else{
			//1.查询变量表的forced_followup_ switch看需不需要跟进
			$.post('../selectSysVariables.action',{variablesId : 1},function(data){
				data=data.body;
				var ffs = data[0].forcedFollowupSwitch;//1开，2关 强跟进
				//打开跟进窗口
				if(ffs==1){
					//发送请求suFollowupValue修改-1
					$.post("../updateSuFollowupValueUser.action",{suFollowupValue : -1},function(data){
						if(data.code == 1){
							console.log(data.code);
							//hideLoading();
						}else {
							myTips(data.msg,"error");
							return;
						}
					});
					$("#writeFollowDlg2").dialog({
						title : '意向人跟进',
						top : getTop(370),
						left : getLeft(300),
						width : 300,
						height : 190,
						closed : true,
						cache : false,
						modal : true,
						onClose:function(){
							$("#writeFollowDlg2 input").val('');
							$("#writeFollowDlg2 textarea").val('');
						}
					});
					$("#writeFollowDlg2").dialog('open');
				}
				else{
					//最后显示电话
					$("#addpopPhoneDiv1").css('display','block');
				}
			});
		}

	});

}

//添加写跟进
function doWriteFollow2(){
	if($("#followNote2").val()==''){
		myTips('请填写跟进！', "error");
		return;
	}
	var addFollowNum = $('#addFollowNum2').val();
	var row = $("#intendedDg").datagrid("getSelected");
	var ipNote = '';
	var remarks = $("#followNote2").val().replace(/"/g,"`");
	if(row.ipNote!=''&&row.ipNote!=null){
		ipNote = row.ipNote.getRealJsonStr();
		ipNote += ',{"name":"' +_loginUserName + '",'
			+ '"note":"' + remarks + '",'
			+ '"time":"'+ getNowFormatDate() + '"}';
	}else{
		ipNote += '{"name":"' +_loginUserName + '",'
			+ '"note":"' + remarks + '",'
			+ '"time":"'+getNowFormatDate() + '"}';
	}
	ipNote = ipNote.replace(/\\/g,"\\\\");
	showLoading();


	$.post("../intendedFollow.action",{
		ipId	:row.ipId,
		ipNote	:ipNote,
	},function(data){
		hideLoading();
		if (data.code<0) {
			myTips(data.msg, "error");
			hideLoading();
			return;
		}
		queryIntended(_pageNum[0],1);
		$.post("../selectIntendedPerson.action", {
			ipId : row.ipId,
		}, function(data) {
			data = data.body;
			if(data == null){
				data = [];
			}
			followInfo(data[0],1,0);
			if(addFollowNum == 1){
				$.post("../comeBackSignIn.action",{

				},function(data1){
					if(data1.code<0){
						myTips(data1.msg, "error");
					}else{
						selecttakeAGuestHouse(data[0])
					}
				});
			}
		});
		myTips("跟进成功！","success");
		$("#writeFollowDlg2").dialog('close');
	});
	//发送请求suFollowupValue修改 +1
	$.post("../updateSuFollowupValueUser.action",{suFollowupValue : 1},function(data){
		if(data.code == 1){
			console.log(data.code);
			//hideLoading();
		}else {
			myTips(data.msg,"error");
			return;
		}
	});
	//最后显示电话
	$("#addpopPhoneDiv1").css('display','block');

}
/*--------------------end----------------------*/

//写跟进窗口
function writeFollow(num){
	if(num == 0){
		$('#addFollowNum').val(0);
	}else{
		$('#addFollowNum').val(1);
		var row = $("#takeAGuestHouseTable").datagrid("getSelected");
		if(row.gotoUserId != _loginUserId){
			myTips('只能写自己的 跟进/签到！', "error");
			return;
		}
	}
	$("#writeFollowDlg").dialog({
		title : '意向人跟进',
		top : getTop(370),
		left : getLeft(300),
		width : 300,
		height : 190,
		closed : true,
		cache : false,
		modal : true,
		onClose:function(){
			$("#writeFollowDlg input").val('');
			$("#writeFollowDlg textarea").val('');
		}
	});
	$("#writeFollowDlg").dialog('open');
}
//添加写跟进
function doWriteFollow(){
	if($("#followNote").val()==''){
		myTips('请填写跟进！', "error");
		return;
	}
	var addFollowNum = $('#addFollowNum').val();
	var row = $("#intendedDg").datagrid("getSelected");
	var ipNote = '';
	var remarks = $("#followNote").val().replace(/"/g,"`");
	if(row.ipNote!=''&&row.ipNote!=null){
		ipNote = row.ipNote.getRealJsonStr();
		ipNote += ',{"name":"' +_loginUserName + '",'
		+ '"note":"' + remarks + '",'
		+ '"time":"'+ getNowFormatDate() + '"}';
	}else{
		ipNote += '{"name":"' +_loginUserName + '",'
		+ '"note":"' + remarks + '",'
		+ '"time":"'+getNowFormatDate() + '"}';
	}
	ipNote = ipNote.replace(/\\/g,"\\\\");
	showLoading();
	$.post("../intendedFollow.action",{
		ipId	:row.ipId,
		ipNote	:ipNote,
	},function(data){
		hideLoading();	
		if (data.code<0) {
			myTips(data.msg, "error");
			hideLoading();
			return;
		}
		queryIntended(_pageNum[0],1);
		$.post("../selectIntendedPerson.action", {
			ipId : row.ipId,
		}, function(data) {
			data = data.body;
			if(data == null){
				data = [];
			}
			followInfo(data[0],1,0);
			if(addFollowNum == 1){
				$.post("../comeBackSignIn.action",{
					
				},function(data1){
					if(data1.code<0){
						myTips(data1.msg, "error");
					}else{
						selecttakeAGuestHouse(data[0])
					}
				});
			}
		});
		myTips("跟进成功！","success");
		$("#writeFollowDlg").dialog('close');
	});
}
//列表下方跟进的详细界面
function downFollowInfo(row){
	$('#downFollowInfo').dialog({
		title : '跟进详细信息',
		top : getTop(250),
		left : getLeft(450),
		width : 450,
		height : 180,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#downFollowInfo span').text('');
		},
	});
	for(var i in row){
		$('#readDownFollow'+i).html(row[i].replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br>"));
	}
	
	$('#downFollowInfo').dialog('open');
}

function ipStateFormatter(value, row, index){
	if (row.ipState == "已租") {
		return "<a style='text-decoration:none;color:red;'>已租<a>";
	}else if (row.ipState == "我租") {
		return "<a style='text-decoration:none;color:green;'>我租<a>";
	}else if (row.ipState == "待定") {
		return "<a style='text-decoration:none;color:blue;'>待定<a>";
	}else if (row.ipState == "已定") {
		return "<a style='text-decoration:none;color:red;'>已定<a>";
	}else if (row.ipState == "无效") {
		return "<a style='text-decoration:none;'>无效<a>";
	}else if (row.ipState == "暂缓") {
		return "<a style='text-decoration:none;color:blue;'>暂缓<a>";
	}
}

//带看房窗口
function roomWindow(){
	$('#selfHelp').attr("checked", false);
	$("#roomUserNameDiv").show();
	$("#goto1Div").show();
	$("#goto2Div").show();
	
	var row = $("#intendedDg").datagrid("getSelected");
	$('#roomWindowDlg').dialog({
		title : '添加看房记录',
		top : getTop(250),
		left : getLeft(400),
		width : 500,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#roomWindowDlg input').val('');
		},
	});
	$('#roomWindowDlg').dialog('open');
	urseName(_loginUserId, 1);
	
}

function urseName(urseId , num){
	$.post("../queryUserByDepartmentID.action", {
		userId : urseId
	}, function(data) {
		if (data.code < 0) {
			return;
		}
		data = data.body;
		if(data == null){
			data = [];
		}
		if(num == 1 ){
			$('#roomUserName').val(data[0].storefrontName +' '+data[0].departmentName+' '+data[0].suStaffName);
			$('#gotoUrseId').val(data[0].userId);
		}
		
	});
}
//添加外出记录，生成门锁临时密码
function addroomWindow(){
	
	var row = $("#intendedDg").datagrid("getSelected");
	var goto1GetUserId = $('#goto1GetUserId').val(); //同行人一
	var goto1StoreId = $('#goto1GetUserStoreId').val(); //区域一
	var goto1DetId = $('#goto1GetUserDetId').val(); //部门一
	var goto2GetUserId = $('#goto2GetUserId').val(); //同行人二
	var goto2StoreId = $('#goto2GetUserStoreId').val(); //区域二
	var goto2DetId = $('#goto2GetUserDetId').val(); //部门二
	
	var choseHouseType = '未租房';
	var choseHouseId = $('#choseHouseId').val();	
	var address = $('#choseHouse').val();	
	var gotoItemType = '带客看房';
	console.log(row);
	
	if(choseHouseId == '' || choseHouseId == null){
		myTips('请选择一套房！！', "error");
		return;
	}
	/*if(goto1GetUserId != '' || goto2GetUserId != ''){
		if (_loginUserId == goto1GetUserId ||
			_loginUserId == goto2GetUserId ||
			goto1GetUserId == goto2GetUserId) {
			myTips('同行人重复!', "error");
			return;
		}
	}*/
	
	if($('#selfHelp').prop('checked')){
		//租客自主看房
		showLoading();
		
		
		$.post("../selfServiceRoom.action",{
			gotoStoreId			: choseHouseId,
			gotoUserId			: _loginUserId,
			gotoDepartmentId	: _loginDepartment,
			gotoStorefrontId	: _loginStore,
			ipId                : row.ipId,
			houseAddress		: address,
			gotoNote            : row.ipNote,
			ipGotoJosn			: row.ipGotoJosn,
			ipName				: row.ipName,
			ipTel				: row.ipTel,
		},function(data){
			hideLoading();
			if (data.code<0) {
				myTips(data.msg, "error");
				return;
			}if(data.code==9){
				myTips(data.msg, "error");
			}else{
				myTips("添加成功！", "success");
			}
			$('#roomWindowDlg').dialog('close');
		});
	}else{
		
	showLoading();
	$.post("../insertaddroomWindow.action",{
		gotoStoreId			: choseHouseId,
		gotoUserId			: _loginUserId,
		gotoDepartmentId	: _loginDepartment,
		gotoStorefrontId	: _loginStore,
		gotoItemType		: gotoItemType,
		gotoAddressType		: choseHouseType,
		goto1GetUserId      : goto1GetUserId,
		goto1StoreId        : goto1StoreId,
		goto1DetId          : goto1DetId,
		goto2GetUserId      : goto2GetUserId,
		goto2StoreId        : goto2StoreId,
		goto2DetId          : goto2DetId,
		ipId                : row.ipId,
		addCommunity		: address,
	},function(data){
		hideLoading();
		if (data.code<0) {
			myTips(data.msg, "error");
			return;
		}
		myTips("添加成功！", "success");
		queryIntended(_pageNum[0],1);
		$.post("../selectIntendedPerson.action", {
			ipId : row.ipId,
		}, function(data) {
			data = data.body;
			if(data == null){
				data = [];
			}
			selecttakeAGuestHouse(data[0])
		});
		$('#roomWindowDlg').dialog('close');
	});
	}
}

//选择外出房窗口
function relationDlg() {
	$('#relationDlg').dialog({
		title : '选择外出地点',
		top : getTop(385),
		left : getLeft(750),
		width : 750,
		height : 385,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$('#choseTrusteeshipTable').datagrid({
		columns : [ [ {
			field : 'hsAddDistrict',
			title : '城区',
			width : 10,
			align : 'center'
		}, {
			field : 'hsAddZone',
			title : '片区',
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
		}, {
			field : 'landlordName',
			title : '业主',
			width : 10,
			align : 'center'
		} ] ],
		width : '98%',
		height : '277',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		onDblClickRow : function(rowIndex, rowData) {
			//console.log(rowData);
			$("#choseHouseId").val(rowData.hsId);
			$("#choseHouseType").val('未租房');
			$("#choseHouse").val(
							rowData.hsAddCommunity
							+ rowData.hsAddBuilding
							+ rowData.hsAddDoorplateno);
			$('#relationDlg').dialog('close');
			if(rowData.hsLeaseState=='正在转租' || rowData.hsLeaseState=='到期不续'){
				$.messager.alert('抱歉','<div style="text-align: center; margin:20px 25px 0 0;">该房处于'+rowData.hsLeaseState+'暂时无法看房！</div>','info');
				//myTips("抱歉！"+"该房处于"+rowData.hsLeaseState+"暂时无法看房！", "error");
				$('#relationDlg').dialog('close');
				$('#roomWindowDlg').dialog('close');
			}
			
		}
	});
	
	$('#relationDlg').dialog('open');
	relationDataGrid();
}
function relationDataGrid() {
	cityLink();
	relationDate(1, 0);
}
function relationDate(page, type) {
	var hsLeaseState='所有未租';
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	var qhAddCity = $("#searchAddCity").find("option:selected").text();
	var qhAddDistrict = $("#searchAddDistrict").find("option:selected").text();
	var qhAddZone = $("#searchAddZone").find("option:selected").text();
	var qhAddCommunity = $("#searchAddCommunity").val();
	var qhAddBuilding = $("#searchAddBuilding").val();
	var qhAddDoorplateno = $("#searchAddDoorplateno").val();
	$.post("../queryHouseStoreCommon.action", {
		startNum : startNum,
		endNum : endNum,
		hsAddCity : qhAddCity,
		hsAddDistrict : qhAddDistrict,
		hsAddZone : qhAddZone,
		hsAddCommunity : qhAddCommunity,
		hsAddBuilding : qhAddBuilding,
		hsAddDoorplateno : qhAddDoorplateno,
		hsLeaseState : hsLeaseState,
	}, function(data) {
		if (data.code<0) {
			sourcePage(0, 0, 2);
			$('#choseTrusteeshipTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data=data.body;
		if (page == 1 && type == 0) {
			sourcePage(data[0].totalNum, page, 2);
		}
		$("#choseTrusteeshipTable").datagrid("loadData", data);
		
	});
}

//城市联动
function cityLink() {
	$("#searchAddCity").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	queryAddCity();
}
//条件查找联动
function queryAddCity() {
	$("#searchAddDistrict").empty();
	$("#searchAddZone").empty();
	$("#searchAddDistrict").append("<option></option>");
	var cityText = $("#searchAddCity").find("option:selected").text();
	if (cityText == '') {
		relationDate(1, 0);
		return;
	}
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$("#searchAddDistrict").append(
					"<option value = '" + i + "'>" + data[i] + "</option>");
		}
		relationDate(1, 0);
	});
}
