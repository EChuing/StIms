$(function() {
	loadEnergyTypes(parent._chargingPlan);//加载搜索框中的方案类型
	queryPlan(1,0);
	cityLink();//加载城区
	//点击空白处隐藏楼盘名称下拉列表
	$(document).click(function(e) {
		choseSelectHide('buildingNameDiv',2);
		if($(e.target).attr('id')=="buildingName"){
			choseSelectHide('buildingNameDiv',1);
		}
	});
	$('#planDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			updatePlan();
		}
	})
});
//加载搜索框中的方案类型
function loadEnergyTypes(chargingPlan){
	$("#planType").empty();
	$("#planType").append("<option  value=''></option>");
	for(var i in chargingPlan){
		if(chargingPlan[i]["state"]){
			$("#planType").append("<option  value='"+chargingPlan[i]["postil"]+"'>"+chargingPlan[i]["postil"]+"</option>");
		}
	}
}


//分页统计总条数
function getplanPageCount(page){
	var pageSize = 15;
	var planType = $("#planType").val();
	var planDefault = $("#planDefault").val();
	var community = $("#searchCommunity").val();
	var planName = $("#planName").val();
	if(planDefault=="通用"){
		planDefault=true;
	}
	if(planDefault=="独立"){
		planDefault=false;
	}
	// 计费方案表导入数据
	$.post("../selectPlanTable.action", {
		planType : planType,
		planDefault : planDefault,
		community : community,
		planName : planName
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"plan",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"plan",0);
		}
	});
}

//查询计费方案
function queryPlan(page,type) {
	var planType = $("#planType").val();
	var planDefault = $("#planDefault").val();
	var community = $("#searchCommunity").val();
	var planName = $("#planName").val();
	if(planDefault=="通用"){
		planDefault=true;
	}
	if(planDefault=="独立"){
		planDefault=false;
	}
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	// 计费方案表导入数据
	$.post("../selectPlanTable.action", {
		startNum : startNum,
		endNum : endNum,
		planType : planType,
		planDefault : planDefault,
		community : community,
		planName : planName
	}, function(data) {
		if (data.code<0) {
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryPlan","plan");
			}else{
				notCountPage(page, 0 ,"queryPlan","plan");
			}
			$('#planDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryPlan","plan");
			}else{
				notCountPage(page, 1 , "queryPlan","plan");
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]=='';
					}
				}
				if(data[i].planHdId!=''&&data[i].planHdId!=null){
					data[i].pageNumber = data[i].city+data[i].district+data[i].zone+data[i].community;
				}else{
					data[i].pageNumber = '通用方案，适用于所有楼盘';
				}
				if(data[i].planDefault=='false'){
					data[i].totalPage ='独立';
				}else if(data[i].planDefault=='true'){
					data[i].totalPage ='通用';
				}
			}
			$("#planDg").datagrid("loadData", data);
		}
	}, "json");
}

function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#planPage").remove();
		$("#planPageDiv")
				.append(
						"<div class='tcdPageCode' id='planPage' style='text-align:center;'></div>");
		$("#planPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPlan(p, 1);
				}
			}
		});
	}
}
//初始化并打开添加能源列表对话框
function upEnergyDlg(){
	$("#upEnergyDlg").dialog({
		title : '添加计费方案',
		top : getTop(260),
		left : getLeft(180),
		width : 180,
		height : 260,
		closed : true,
		cache : false,
		modal : true,
		onOpen:function(){
			var Energy=$("#upEnergyDlg .charging_plan");
			var json=parent._chargingPlan;
			//var json=JSON.parse(_chargingPlan.getRealJsonStr());
			for(var i in json){
				$("#upEnergyDlg .charging_plan[name="+i+"]").attr("checked", json[i]["state"]);
			}
		}
	});
	$("#upEnergyDlg").dialog("open");
}

//保存能源计费项
function saveEnergy(){
	var Energy=$("#upEnergyDlg .charging_plan");
	var json="{"
	for(var e=0 ;e<Energy.length;e++ ){
		json+='"'+Energy[e].name+'"'+":"+"{\""+"state\":"+Energy[e].checked+','+
				"\"postil\":\""+Energy[e].value+'"},';
	}
	json=json.substring(0,json.length-1)+"}";
	$.ajax({
		url:"../updateSysVariables.action",
		type:"post",
		data:{
			"chargingPlan":json
		},
		success:function(data){
			if(data.code>0){
				parent._chargingPlan=JSON.parse(json);
				loadEnergyTypes(parent._chargingPlan);
				$('#upEnergyDlg').dialog('close');
				myTips("保存成功!","success");
			}else{
				myTips("保存失败!","error");
				return false;
			}
		}
	})
}

//初始化并打开添加计费方案对话框
function addPlanDlg() {
	$("#addPlanDlg").dialog({
		title : '添加计费方案',
		top : getTop(400),
		left : getLeft(520),
		width : 520,
		height : 410,
		closed : true,
		cache : false,
		modal : true,
		onClose:function(){
			$("#addPlanDlg input").val('');
			$("#addPlanDlg textarea").val('');
			$("#addPlanDlg select").val('');
			$("#planeTableSetDiv").empty('');
			$('#addPlanDlg [clear="clear"]').val('');
			$('#addPlanDlg [clean="clean"]').html('');
			$('#addPlanDlg [require]').css('border', '1px solid #a9a9a9');
		},
		onOpen:function(){
			$("#add_planType").empty();
			$("#add_planType").append("<option></option>");
			var json=parent._chargingPlan;
			for(var i in json){
				if(json[i]["state"]){
					var html="<option id='"+i+"' class='chargingPlan' name="+json[i]["postil"]+" value='"+json[i]["postil"]+"'>"+json[i]["postil"]+"</option>";
					$("#add_planType").append(html);
				}
			}
		}
	});
	$("#setPlanTanleTips").html('');
	createPlanTable();
	$("#locationNeedsDiv").show();
	$("#addRenterSave").show();
	$("#updateRenterSave").hide();
	$("#add_planType").attr('disabled',false);
	$("#addPlanDlg").dialog('open');
}
//执行添加计费方案
function doAddPlan(){
	var planHdId = $("#add_saveHouse_buildingId").val();
	var planNum = $("#add_planNum").val(); 
	var baseMoney = $("#baseMoney").val(); 
	var planPackage = '{"baseMoney":"'+baseMoney+'",';
	planPackage += '"ladder" : ['
	for(var i =1;i<parseInt(planNum)+1;i++){
		planPackage += "{";
		planPackage += '"step":"'+$("#setPlanB"+i).val()+'",'+'"price":"'+$("#setPlanA"+i).val()+'"';
		if(i==planNum){
			planPackage += "}";
		}else{
			planPackage += "},";
		}
	}
	
	planPackage +="]}";
	var planName = $("#add_planName").val();
	var planType = $("#add_planType").val();
	var planComment = $("#add_planComment").val();
	var planDefault = $("#add_planDefault").val();
	showLoading();
	$.post("../insertPlanTable.action",{
		planHdId		:planHdId,
		planName		:planName,
		planType		:planType,
		planComment		:planComment,
		planDefault		:planDefault,
		planNum			:planNum,
		planPackage		:planPackage
	},function(data){
		if(data.code<0){
			hideLoading();
			myTips(data.msg,"error");
		}else{
			myTips("添加成功！","success");
			hideLoading();
			queryPlan(1,0);
			$("#addPlanDlg").dialog('close');
		}
	});
}
//初始化并打开修改计费方案对话框
function updatePlan() {
	var row = $("#planDg").datagrid("getSelected");
	if(!row){
		myTips("请选择一条计费方案进行修改","error");
		return;
	}
	$("#addPlanDlg").dialog({
		title : '修改计费方案',
		top : getTop(400),
		left : getLeft(520),
		width : 520,
		height : 410,
		closed : true,
		cache : false,
		modal : true,
		onClose:function(){
			$("#addPlanDlg input").val('');
			$("#addPlanDlg textarea").val('');
			$("#addPlanDlg select").val('');
			$("#planeTableSetDiv").empty('');
			$('.do_overDiv').show();
			$('#addPlanDlg [clear="clear"]').val('');
			$('#addPlanDlg [clean="clean"]').html('');
			$('#addPlanDlg [require]').css('border', '1px solid #a9a9a9');
		},
		onOpen:function(){
			$("#add_planType").empty();
			$("#add_planType").append("<option></option>");
			var json=parent._chargingPlan;
			for(var i in json){
				if(json[i].postil==row.planType){
					var html="<option selected = 'selected' id='"+i+"' class='chargingPlan' name="+json[i]["postil"]+" value='"+json[i]["postil"]+"'>"+json[i]["postil"]+"</option>";
					$("#add_planType").append(html);
				}else{
					var html="<option id='"+i+"' class='chargingPlan' name="+json[i]["postil"]+" value='"+json[i]["postil"]+"'>"+json[i]["postil"]+"</option>";
					$("#add_planType").append(html);
				}
			}
			}
	});
	$("#add_planType").attr('disabled',true);
	$("#setPlanTanleTips").html('');
	$('#updateRenterSave').show();
	$('#addRenterSave').hide();

	$("#add_planName").val(row.planName);
	$("#add_planType").val(row.planType);
	$("#add_planComment").val(row.planComment);
	$("#add_planDefault").val(row.planDefault);
	$("#add_planId").val(row.planId);
	
	$("#add_saveHouse_city").val(row.city);
	$("#add_saveHouse_district").val(row.district);
	zoneLink(0);
	$("#buildingName").val(row.community);
	$("#add_saveHouse_buildingId").val(row.planHdId);

	if(row.planPackage!=''&&row.planPackage!=null){
		var planPackage = eval("("+row.planPackage.getRealJsonStr()+")");
		$("#add_planNum").val(planPackage.ladder.length);
		$("#baseMoney").val(planPackage.baseMoney);
		createPlanTable();
		for(var i in planPackage.ladder){
			$("#setPlanA"+(parseInt(i)+1)).val(planPackage.ladder[i].price);
			$("#setPlanB"+(parseInt(i)+1)).val(planPackage.ladder[i].step);
			if(i!=0){
				$("#setPlanC"+(parseInt(i))).val(parseInt(planPackage.ladder[i].step)-1);
			}
		}
	}
	$("#addPlanDlg").dialog('open');
}
//执行修改方案
function doUpdatePlan(){
	var planHdId = $("#add_saveHouse_buildingId").val();
	
	var planNum = $("#add_planNum").val(); 
	var baseMoney = $("#baseMoney").val(); 
	var planPackage = '{"baseMoney":"'+baseMoney+'",';
	planPackage += '"ladder" : ['
	for(var i =1;i<parseInt(planNum)+1;i++){
		planPackage += "{";
		planPackage += '"step":"'+$("#setPlanB"+i).val()+'",'+'"price":"'+$("#setPlanA"+i).val()+'"';
		if(i==planNum){
			planPackage += "}";
		}else{
			planPackage += "},";
		}
	}
	
	planPackage +="]}";
	var planId = $("#add_planId").val();
	var planName = $("#add_planName").val();
	var planType = $("#add_planType").val();
	var planComment = $("#add_planComment").val();
	var planDefault = $("#add_planDefault").val();
	showLoading();
	$.post("../updatePlanTable.action",{
		planId			:planId,
		planHdId		:planHdId,
		planName		:planName,
		planType		:planType,
		planComment		:planComment,
		planDefault		:planDefault,
		planNum			:planNum,
		planPackage		:planPackage
	},function(data){
		if(data.code<0){
			hideLoading();
			myTips(data.msg,"error");
		}else{
			myTips("修改成功！","success");
			hideLoading();
			queryPlan(1,0);
			$("#addPlanDlg").dialog('close');
		}
	});
}
function formatDeleteRows(value, row, index){
	return "<a href='#' style='text-decoration:none;color:red;' onclick='doDeletePlan("+ row.planId + ")'>删除<a>";
}
function doDeletePlan(planId){
	var loginPurview = $('#loginPurview').val();
	var loginPurviewJson = JSON.parse(loginPurview);
	if (_thisPurview['a'] == 0 || _thisPurview['c'][3]==0) {//删除
		$.messager.alert('通知', '无删除权限', 'info');
		return;
	}
	$.messager.confirm("警告", "确定要删除此计费方案？删除后无法恢复。", function(data) {
		if (!data) {
			
		} else {
			$.post("../deletePlanTable.action",{
				planId			:planId,
			},function(data){
				if(data.code<0){
					myTips(data.msg,"error");
				}else{
					myTips("删除成功！","success");
					queryPlan(1,0);
				}
			});
		}
	});
}
function changePlanHouse(){
	$("#add_saveHouse_district").val('');
	$("#add_saveHouse_buildingId").val('');
	$("#buildingName").val('');
	$("#add_saveHouse_buildingName").empty('');
	
}
//城市联动
function cityLink() {
	$(".add_saveHouse_city").append("<option value = '0'>"+_loginCompanyRentCity+"</option>");
	$(".add_saveHouse_city").val(0);
	districtLink(0);
}
//城区联动
function districtLink(type) {
	$(".add_saveHouse_district").empty();
	$(".add_saveHouse_zone").empty();
	$(".add_saveHouse_buildingName").empty('');
	$(".add_saveHouse_stree").val('');
	$(".add_saveHouse_zone1").val('');
	$("#infoDoorplatenoRelus").text('');
	$(".add_saveHouse_buildingId").val('');
	$(".add_saveHouse_district").append("<option></option>");
	var cityText = '';
	if (type == 0) {
		cityText = $("#add_saveHouse_city").find("option:selected").text();
	} 
	if (cityText == '') {
		return;
	}
	$("#addCity").val(cityText);
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for (var i in data) {
			$(".add_saveHouse_district").append("<option value = '" + data[i] + "'>" + data[i] + "</option>");
		}
	});
}
// 片区联动
function zoneLink(type) {
	$(".add_saveHouse_zone").empty();
	$(".add_saveHouse_buildingName").empty('');
	$(".add_saveHouse_stree").val('');
	$("#infoDoorplatenoRelus").text('');
	$(".add_saveHouse_zone1").val('');
	$(".add_saveHouse_buildingId").val('');
	$(".add_saveHouse_zone").append("<option></option>");
	var cityText = '';
	var districtText = '';
	if (type == 0) {
		$(".add_saveHouse_city").val(0);
		cityText = $("#add_saveHouse_city").find("option:selected").text();
		districtText = $("#add_saveHouse_district").find("option:selected").text();
	}
	if (districtText == '') {
		return;
	}
	$("#addDistrict").val(districtText);
	$.post("../queryForHouseDictAddress.action", {
		hdCity : cityText,
		hdDistrict : districtText
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		if(type==0){
			$("#add_saveHouse_buildingName").append("<option></option>");
			for (var i in data) {
				$("#add_saveHouse_buildingName").append("<option value = '" + i + "'>" + data[i] + "</option>");
			}
			//带拼音搜索的下拉框
			filteroption("add_saveHouse_buildingName");
		}
	});
}
//地址联动
function streeLink(type) {
	$(".add_saveHouse_stree").val('');
	$(".add_saveHouse_buildingId").val('');
	$("#infoDoorplatenoRelus").text('');
	var cityText = '';
	var districtText = '';
	var zoneText = '';
	var buildNameText = '';
	if (type == 0) {
		cityText = $("#add_saveHouse_city").find("option:selected").text();
		districtText = $("#add_saveHouse_district").find("option:selected")
				.text();
		zoneText = $("#add_saveHouse_zone").find("option:selected").text();
		buildNameText = $("#add_saveHouse_buildingName")
				.find("option:selected").text()
	}
	if (buildNameText == '') {
		return;
	}
	if(type==0){
		choseSelectVal("buildingName", "add_saveHouse_buildingName" ,"buildingNameDiv");
	}
	$("#addCommunity").val(buildNameText);
	$
			.post(
					"../queryAllHouseDict.action",
					{
						hdCity : cityText,
						hdDistrict : districtText,
						hdZone : zoneText,
						hdCommunity : buildNameText
					},
					function(data) {
						if (data.code < 0) {
							$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
							return;
						}
						data = data.body;
						if(type==0){
							$("#add_saveHouse_stree").val(data[0].hdRoad);
							$("#add_saveHouse_buildingId").val(data[0].hdId);
							$("#add_saveHouse_zone1").val(data[0].hdZone);
							$("#addSaveHouseStree").val(data[0].hdRoad);
							$("#houseDictId").val(data[0].hdId);
							$("#addStreet").val(data[0].hdRoad);
						}
					});
}
//创建计费阶梯
function createPlanTable(){
	$("#planeTableSetDiv").empty();
	var planNum = $("#add_planNum").val(); 
	if(planNum==0){
		return;
	}
	for(var i= 1 ;i<parseInt(planNum)+1;i++){
		if(planNum==1){
			$("#planeTableSetDiv").append("<div id=setDiv"+i+" style='margin-top:5px;width:100%'>第"+i+"阶梯： 单价：<input id=setPlanA"+i+" style='width:80px' onKeyUp='moneyKeyupFomat(this);' onBlur='moneyBlurFomat(this);' onfocus='if (value ==\"0.00\"){value =\"\"}' >元/单位  阶梯：<input id=setPlanB"+i+" style='width:80px' onkeyup='setValChange("+i+",1)' > ~ 以上</div>");
		}else if(i==planNum){
			$("#planeTableSetDiv").append("<div id=setDiv"+i+" style='margin-top:5px;width:100%'>第"+i+"阶梯： 单价：<input id=setPlanA"+i+" style='width:80px' onKeyUp='moneyKeyupFomat(this);' onBlur='moneyBlurFomat(this);' onfocus='if (value ==\"0.00\"){value =\"\"}' >元/单位  阶梯：<input id=setPlanB"+i+" style='width:80px' onkeyup='setValChange("+i+",1)' > ~ 以上</div>");
		}else{
			if(i==1){
				$("#planeTableSetDiv").append("<div id=setDiv"+i+" style='margin-top:5px;width:100%'>" 
						+"第"+i+"阶梯： 单价：<input id=setPlanA"+i+" style='width:80px' onKeyUp='moneyKeyupFomat(this);' onBlur='moneyBlurFomat(this);' onfocus='if (value ==\"0.00\"){value =\"\"}'>元/单位  阶梯：<input id=setPlanB"+i+" style='width:80px' > " 
						+"~ <input id=setPlanC"+i+" style='width:80px' onkeyup='setValChange("+i+",0)' ></div>");
			}else{
				$("#planeTableSetDiv").append("<div id=setDiv"+i+" style='margin-top:5px;width:100%'>"
						+"第"+i+"阶梯： 单价：<input id=setPlanA"+i+" style='width:80px' onKeyUp='moneyKeyupFomat(this);' onBlur='moneyBlurFomat(this);' onfocus='if (value ==\"0.00\"){value =\"\"}'>元/单位  阶梯：<input id=setPlanB"+i+" style='width:80px' onkeyup='setValChange("+i+",1)' > "
						+"~ <input id=setPlanC"+i+" style='width:80px' onkeyup='setValChange("+i+",0)' ></div>");
			}
		}
		if(i==1){
			$("#setPlanB1").val(0);
		}
	}
}
function setValChange(nums,type){
	if(type==0){
		var thisB = $("#setPlanB"+nums).val();
		var thisC = $("#setPlanC"+nums).val();
		if(thisC==''){
			thisC = 0;
		}
		var nextB = parseInt(thisC)+1;
		$("#setPlanB"+(parseInt(nums)+1)).val(nextB);
	}else{
		var thisB = $("#setPlanB"+nums).val();
		var lastB = $("#setPlanB"+(parseInt(nums)-1)).val();
		if(thisB==''){
			thisB = 0;
		}
		var lastC = parseInt(thisB)-1;
		$("#setPlanC"+(parseInt(nums)-1)).val(lastC);
	}
}
//计费阶梯检测
function checkPlan(type){
	var planNum = $("#add_planNum").val(); 
	var planHdId = $("#add_saveHouse_buildingId").val();
	var planName = $("#add_planName").val();
	var planType = $("#add_planType").val();
	var planDefault = $("#add_planDefault").val();
	$("#planeTableSetDiv input").each(function(){
		if($(this).val()==''){
			$(this).val(0.00)
		}
	});
	if($("#baseMoney").val()==''){
		$("#baseMoney").val(0.00)
	}
	if(planNum!=1){
		for(var i =1;i<parseInt(planNum)+1;i++){
			if(i==1){
				var thisB =	parseInt($("#setPlanB1").val());
				var thisC = parseInt($("#setPlanC1").val());
				if(thisB>thisC || thisB==thisC || thisB<0 || thisC<0){
					$("#setPlanTanleTips").html('第1阶梯范围值有错！');
					return;
				}
			}else{
				var thisB = parseInt($("#setPlanB"+i).val());
				var thisC = parseInt($("#setPlanC"+i).val());
				
				var lastB = parseInt($("#setPlanB"+(parseInt(i)-1)).val());
				var lastC = parseInt($("#setPlanC"+(parseInt(i)-1)).val());	
				
				if(thisB>thisC || thisB==thisC || thisB<0 || thisC<0){
					$("#setPlanTanleTips").html('第'+i+'阶梯范围值有错！');
					return;
				}
				if(thisB<lastB || thisB==lastB){
					$("#setPlanTanleTips").html('第'+i+'阶梯范围值不能小于'+'第'+(parseInt(i)-1)+'阶梯范围值');
					return;
				}
			}
			
		}
	}
	
	$("#setPlanTanleTips").html('');
	if(type==0){
		doAddPlan();
	}else{
		doUpdatePlan();
	}
}
	