$(function() {
	hideWithSwitch();
	queryPurview();
	location.href = "#bodyTopA";
	$("#purviewInfoDg").datagrid({
		//点击显示某个角色的权限
		onClickRow : function(rowIndex, rowData) {
			$("#getAllPurview").prop("checked", false);
			$('#purviewOverDiv').hide();
			location.href = "#bodyTopA";
			var row = $('#purviewInfoDg').datagrid('getSelected');
			if (row){
				$('#update_spName').val(row.spName);
				var purviewTowJson = row.spNewPurview.getRealJsonStr();
				purviewTowJson = JSON.parse(purviewTowJson);
				$("input[type='checkbox']").prop("checked", false);
				for (var i in purviewTowJson) {
					if (purviewTowJson[i].length > 0) {//大版块有页面权限
						$("#"+i).prop("checked", true);//例：#A
						for (var j in purviewTowJson[i]) {
							if(purviewTowJson[i][j].a == '1'){//小版块有页面权限
								if(j<10){
									$("#"+i+"0"+j).prop("checked", true);//例：#A00
									console.log(i+"0"+j)
								}else{
									$("#"+i+j).prop("checked", true);//例：#A12
								}
								for(var k in purviewTowJson[i][j].b){
									if(purviewTowJson[i][j].b[k] == '1'){//小版块有数据权限
										if (j<10 && k<10) {
											$("#"+i+"0"+j+"b"+"0"+k).prop("checked", true);//例：#A00b01
										} else if (j<10 && k>=10) {
											$("#"+i+"0"+j+"b"+k).prop("checked", true);//例：#A00b12
										} else if (j>=10 && k>=10) {
											$("#"+i+j+"b"+k).prop("checked", true);//例：#A12b12
										} else if (j>=10 && k<10) {
											$("#"+i+j+"b"+"0"+k).prop("checked", true);//例：#A12b12
										}
									}
								}
								for(var k in purviewTowJson[i][j].c){
									if(purviewTowJson[i][j].c[k] == '1'){//小版块有操作权限
										if (j<10 && k<10) {
											$("#"+i+"0"+j+"c"+"0"+k).prop("checked", true);//例：#A00c01
										} else if (j<10 && k>=10) {
											$("#"+i+"0"+j+"c"+k).prop("checked", true);//例：#A00c12
										} else if (j>=10 && k>=10) {
											$("#"+i+j+"c"+k).prop("checked", true);//例：#A12c12
										} else if (j>=10 && k<10) {
											$("#"+i+j+"c"+"0"+k).prop("checked", true);//例：#A12b12
										}
									}
								}
							}
						}
					}
				}
			}
			checkedbox();
		}
	});
	$('#getAllPurview').click(function(){
		if($(this).prop('checked')){
			$('#purviewSecond input[type="checkbox"]').prop('checked', true);
			$('#purviewTop input[type="checkbox"]').prop('checked', true);
		}else{
			$('#purviewSecond input[type="checkbox"]').prop('checked', false);
			$('#purviewTop input[type="checkbox"]').prop('checked', false);
		}
		checkedbox();
	});
});
//查询所有角色的权限
function queryPurview() {
	$.post("../selectPurvuceAll.action", {
		
	}, function(data) {
		if (data.code < 0) {
			$('#purviewInfoDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			$("#purviewInfoDg").datagrid("loadData", data.body);
		}
	}, "json");
}
// checkbox联动
function checkedbox() {
	var arrs = $("input[type='checkbox']");
	var topArrs = [];
	var midArrs = [];
	var allArrs = [];
	var floorArrs = [];
	for(var i = 0; i < arrs.length; i++){
		if(arrs[i].id.length==1){
			topArrs.push(arrs[i]);
		}else if(arrs[i].id.length==3){
			midArrs.push(arrs[i]);
		}else if(arrs[i].id.length==5){
			allArrs.push(arrs[i]);
		}else if(arrs[i].id.length==6){
			floorArrs.push(arrs[i]);
		}
	}
	for(var i = 0; i < topArrs.length; i++){
		if($('#' + topArrs[i].id).prop('checked')){//勾选大板块
			for(var j in midArrs){
				if(midArrs[j].id.indexOf(topArrs[i].id)>-1){
					$('#' + midArrs[j].id).removeAttr("disabled","disabled");
				}
			}
		}else{
			for(var j in midArrs){
				if(midArrs[j].id.indexOf(topArrs[i].id)>-1){
					$('#' + midArrs[j].id).attr("disabled","disabled");
					$('#' + midArrs[j].id).prop("checked", false);
				}
			}
		}
	}
	for(var i = 0; i < midArrs.length; i++){
		if($('#' + midArrs[i].id).prop('checked')){
			var allCheck = 0;//功能权限的总数
			var isCheck = 0;//勾选了的功能权限的数量
			for(var j in floorArrs){
				if(floorArrs[j].id.indexOf(midArrs[i].id)>-1){
					$('#' + floorArrs[j].id).removeAttr("disabled","disabled");
					allCheck++;
					if($('#' + floorArrs[j].id).prop('checked')){
						isCheck++;
					}
				}
			}
			for(var j in allArrs){
				if(allArrs[j].id.indexOf(midArrs[i].id)>-1){
					$('#' + allArrs[j].id).removeAttr("disabled","disabled");
//					console.log('allCheck:',allCheck);
//					console.log('isCheck:',isCheck);
					if(allCheck == isCheck){
						$('#' + allArrs[j].id).prop("checked", true);
					}else{
						$('#' + allArrs[j].id).prop("checked", false);
					}
				}
			}
		}else{
			for(var j in floorArrs){
				if(floorArrs[j].id.indexOf(midArrs[i].id)>-1){
					$('#' + floorArrs[j].id).attr("disabled","disabled");
					$('#' + floorArrs[j].id).prop("checked", false);
				}
			}
			for(var j in allArrs){
				if(allArrs[j].id.indexOf(midArrs[i].id)>-1){
					$('#' + allArrs[j].id).attr("disabled","disabled");
					$('#' + allArrs[j].id).prop("checked", false);
				}
			}
		}
	}
}
// 全选
function checkedAll(purviewPrefix) {
	var arrs = $("input[type='checkbox']");
	for (var i = 0; i < arrs.length; i++) {
		if (arrs[i].id.indexOf(purviewPrefix) > -1 && arrs[i].id != purviewPrefix) {
			if ($("#" + purviewPrefix + '00').prop('checked')) {
				$("#" + arrs[i].id).prop("checked", true);
			} else {
				$("#" + arrs[i].id).prop("checked", false);
			}
		}
	}
}
// 单选
function checkedOne(purviewPrefix) {
	$("#" + purviewPrefix).prop("checked", true);
}
//修改保存权限
function updatePurview() {
	$('#purviewOverDiv').show();
	var purviewJson = {};
	var section = {};
	var arrs = $("input[type='checkbox']");
	var purviewKey = '';
	var purviewValue = '';
	var topArrs = [];
	var midArrs = [];
	var floorArrs = [];
	for(var i = 0;i < arrs.length; i++){
		if(arrs[i].id.length==1){//id只有一个字符时就是大版块权限#A
			topArrs.push(arrs[i]);
		}else if(arrs[i].id.length==3){//id有三个字符时就是小版块权限#A00
			midArrs.push(arrs[i]);
		}else if(arrs[i].id.length==6){//id有六个字符时就是功能权限#A00b01
			floorArrs.push(arrs[i]);
		}
	}
	for (var i = 0; i < topArrs.length; i++) {//遍历大版块
		purviewJson[topArrs[i].id]=[];//初始无大版块权限
//		console.log(topArrs[i].id);
		if ($('#' + topArrs[i].id).prop('checked')) {//勾选了大版块
			for (var j = 0; j < midArrs.length; j++) {//遍历小版块
				if (midArrs[j].id.indexOf(topArrs[i].id) > -1) {//确认小版块属于该大版块
//					console.log(midArrs[j].id);
					if ($('#' + midArrs[j].id).prop('checked')) {//勾选了小版块
						section = {a:1};
					} else {//没勾小版块
						section = {a:0};
					}
					var sectionB = '1';
					var sectionC = '1';
					for(var k = 0; k < floorArrs.length; k++){//遍历功能版块
						if(floorArrs[k].id.indexOf(midArrs[j].id) > -1){//确认该功能版块属于该小版块
//							console.log(floorArrs[k].id);
							if(floorArrs[k].id.indexOf('b') > -1){//判断数据权限还是操作权限
								if ($('#' + floorArrs[k].id).prop('checked')) {
									sectionB += '1';
								} else {
									sectionB += '0';
								}
							}
							if(floorArrs[k].id.indexOf('c') > -1){
								if ($('#' + floorArrs[k].id).prop('checked')) {
									sectionC += '1';
								} else {
									sectionC += '0';
								}
							}
						}
					}
					section.b = sectionB;
					section.c = sectionC;
					purviewJson[topArrs[i].id].push(section);
				}
			}
		}
	}
//	console.log(JSON.stringify(purviewJson))
//	purviewJson = addFirstPull(purviewJson);
	
	purviewJson = JSON.stringify(purviewJson);
	var spName = $('#update_spName').val();
	var row = $('#purviewInfoDg').datagrid('getSelected');
	$.post("../updatePurview.action",{
		spId:row.spId,
		spName:spName,
		spNewPurview:purviewJson,
	},function(data){
		if(data.code < 0){
			myTips(data.msg, "error");
			$('#purviewOverDiv').hide();
			return;
		}
		myTips("修改成功！","success");
		queryPurview();
	});
}
function addPurview() {
	$.messager.confirm("操作提示", "确定要新增一个未定义权限吗？", function(data) {
		if (data) {
			$.post("../insertPurview.action",{
				
			},function(data){
				if(data.code < 0){
					myTips(data.msg, "error");
				}else{
					queryPurview();
					myTips("新增成功！","success");
				}
			});
		}else{
			
		}
	});
}
function deletePurview() {
	var row = $('#purviewInfoDg').datagrid('getSelected');
	if(!row){
		myTips("请选择一个权限进行删除！","error");
		return;
	}
	$.messager.confirm("操作提示", "确定要新删除\""+row.spName+"\"权限吗？", function(ifData) {
		if (ifData) {
			$.post("../deletePurview.action",{
				spId:row.spId,
			},function(data){
				if(data.code < 0){
					if(data.body==""||data.body==null||data.body.length==0){
						myTips(data.msg, "error");
					}else{
						data = data.body;
						var confirm = "";
						for(var i in data){
							confirm +=data[i].storefrontName+" "+data[i].departmentName+" "+data[i].userName+";";
						}
						$.messager.confirm("操作提示", "删除失败，此权限有用户在使用中，请先更改这些用户的权限："+confirm, function(ifData1) {
							
						});
					}
				}else{
					queryPurview();
					myTips("删除成功！","success");
				}
			});
		}else{
			
		}
	});
}
//超级权限过滤
function hideWithSwitch(){
	var purviewTowJson = JSON.parse(_loginAuthoritySwitch);
	for (var i in purviewTowJson) {
		if (purviewTowJson[i].length > 0) {//大版块有页面权限
			for (var j in purviewTowJson[i]) {
				if(purviewTowJson[i][j].a == '1'){//小版块有页面权限
					for(var k in purviewTowJson[i][j].b){
						if (purviewTowJson[i][j].b[k] == '1') {//小版块有数据权限
							
						} else {
							if (j<10 && k<10) {
								hideAuth(i+"0"+j+"b"+"0"+k);//例：A00b01
							} else if (j<10 && k>=10) {
								hideAuth(i+"0"+j+"b"+k);//例：A00b12
							} else if (j>=10 && k>=10) {
								hideAuth(i+j+"b"+k);//例：A12b12
							} else if (j>=10 && k<10) {
								hideAuth(i+j+"b"+"0"+k);//例：A12b12
							}
						}
					}
					for (var k in purviewTowJson[i][j].c) { 
						if (purviewTowJson[i][j].c[k] == '1') {//小版块有操作权限
							
						} else {
							if (j<10 && k<10) {
								hideAuth(i+"0"+j+"c"+"0"+k);//例：A00c01
							} else if (j<10 && k>=10) {
								hideAuth(i+"0"+j+"c"+k);//例：A00c12
							} else if (j>=10 && k>=10) {
								hideAuth(i+j+"c"+k);//例：A12c12
							} else if (j>=10 && k<10) {
								hideAuth(i+j+"c"+"0"+k);//例：A12b12
							}
						}
					}
				} else {
					if (j<10) {
						hideAuth(i+"0"+j);//例：A00
					} else {
						hideAuth(i+j);//例：A12
					}
				}
			}
		} else {
			hideAuth(i);
		}
	}
}
//通过超级系统控制ims内可以控制的权限范围
function hideAuth(auth){
	$('[auth="'+auth+'"]').hide();
}