var on1;
var off1;
var on2;
var off2;
var on3;
var off3;
var on4;
var off4;
var status1;
var status2;
var status3;
var status4;
$(function() {
	workRule();
	//attendanceTable 页面初始化表格
	$('#attendanceTable').datagrid({
			columns : [ [
				{
					field : 'jarStoreName',
					title : '门店',
					width : 10,
					align : 'center'
				},
				{
					field : 'jarDepartmentName',
					title : '部门',
					width : 10,
					align : 'center',
					editor : 'textbox'
				},
				{
					field : 'jarName',
					title : '姓名',
					width : 10,
					align : 'center',
					editor : 'textbox'
				},
				{
					field : 'jarWorkTime',
					title : '日期',
					width : 20,
					align : 'center',
					sortable:true,
					editor : 'textbox'
				},
				{
					field : 'jarWork1',
					title : '上班1',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteron1(value, row, index){
						if(status1==1){
							if(row.jarWork1==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
							}else{
								
								if(row.jarWork1<on1){
									return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
								}else if(row.jarWork1>on1){
									var time = (parseInt(row.jarWork1.substr(0,2))*60+parseInt(row.jarWork1.substr(3,2)))-(parseInt(on1.substr(0,2))*60+parseInt(on1.substr(3,2)))
									return "<a style='text-decoration:none;color:red;'>" + '迟到' +time+ '分钟'+ "</a>";
								}
							}
						}else{
							return "-";
						}
								
					}
				},
				{
					field : 'jarOffwork1',
					title : '下班1',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteroff1(value, row, index){
						if(status1==1){
							if(row.jarOffwork1==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
								}else{
									if(row.jarOffwork1<off1){
										
										var time = parseInt(off1.substr(0,2))*60+parseInt(off1.substr(3,2))-(parseInt(row.jarOffwork1.substr(0,2))*60+parseInt(row.jarOffwork1.substr(3,2)))
										return "<a style='text-decoration:none;color:red;'>" + '早退' +time+ '分钟'+"</a>";
									}else if(row.jarOffwork1>off1){
										return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
									}
								}
						}else{
							return "-";
						}
									
					}
				},
				{
					field : 'jarWork2',
					title : '上班2',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteron2(value, row, index){
						if(status2==1){
							if(row.jarWork2==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
								}else{
									if(row.jarWork2<on2){
										return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
									}else if(row.jarWork2>on2){
										var time = (parseInt(row.jarWork2.substr(0,2))*60+parseInt(row.jarWork2.substr(3,2)))-(parseInt(on2.substr(0,2))*60+parseInt(on2.substr(3,2)))
										return "<a style='text-decoration:none;color:red;'>" + '迟到' +time+ '分钟'+ "</a>";
									}
								}
						}else{
							return "-";
						}
								
					}
				},
				{
					field : 'jarOffwork2',
					title : '下班2',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteroff2(value, row, index){
						if(status2==1){
							if(row.jarOffwork2==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
							}else{
								if(row.jarOffwork2<off2){
									var time = parseInt(off2.substr(0,2))*60+parseInt(off2.substr(3,2))-(parseInt(row.jarOffwork2.substr(0,2))*60+parseInt(row.jarOffwork2.substr(3,2)))
									return "<a style='text-decoration:none;color:red;'>" + '早退' +time+ '分钟'+"</a>";
								}else if(row.jarOffwork2>off2){
									return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
								}
							}
						}else{
							return "-";
						}
							
					}
				},
				{
					field : 'jarWork3',
					title : '上班3',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteron3(value, row, index){
						if(status3==1){
							if(row.jarWork3==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
							}else{
								if(row.jarWork3<on3){
									return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
								}else if(row.jarWork3>on3){
									var time = (parseInt(row.jarWork3.substr(0,2))*60+parseInt(row.jarWork3.substr(3,2)))-(parseInt(on3.substr(0,2))*60+parseInt(on3.substr(3,2)))
									return "<a style='text-decoration:none;color:red;'>" + '迟到' +time+ '分钟'+ "</a>";
								}
							}
						}else{
							return "-";
						}
								
					}
				},
				{
					field : 'jarOffwork3',
					title : '下班3',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteroff3(value, row, index){
						if(status3==1){
							if(row.jarOffwork3==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
							}else {
								if(row.jarOffwork3<off3){
									var time = parseInt(off3.substr(0,2))*60+parseInt(off3.substr(3,2))-(parseInt(row.jarOffwork3.substr(0,2))*60+parseInt(row.jarOffwork3.substr(3,2)))
									return "<a style='text-decoration:none;color:red;'>" + '早退' +time+ '分钟'+"</a>";
								}else if(row.jarOffwork3>off3){
									return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
								}
							}
						}else{
							return "-";
						}
								
					}

				},
				{
					field : 'jarWork4',
					title : '上班4',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteron4(value, row, index){
						if(status4==1){
							if(row.jarWork4==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
							}else{
								if(row.jarWork4<on4){
									return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
								}else if(row.jarWork4>on4){
									var time = (parseInt(row.jarWork4.substr(0,2))*60+parseInt(row.jarWork4.substr(3,2)))-(parseInt(on4.substr(0,2))*60+parseInt(on4.substr(3,2)));
									return "<a style='text-decoration:none;color:red;'>" + '迟到' +time+ '分钟'+ "</a>";
								}
							}
						}else{
							return "-";
						}
								
					}
				},
				{
					field : 'jarOffwork4',
					title : '下班4',
					width : 10,
					align : 'center',
					editor : 'textbox',
					formatter : function formatteroff4(value, row, index){
						if(status4==1){
							if(row.jarOffwork4==''){
								return "<a style='text-decoration:none;color:gray;'>" + '未打卡' + "</a>";
							}else{
								if(row.jarOffwork4<off4){
									var time = parseInt(off4.substr(0,2))*60+parseInt(off4.substr(3,2))-(parseInt(row.jarOffwork4.substr(0,2))*60+parseInt(row.jarOffwork4.substr(3,2)))
									return "<a style='text-decoration:none;color:red;'>" + '早退' +time+ '分钟'+"</a>";
								}else if(row.jarOffwork4>off4){
									return "<a style='text-decoration:none;color:blue;'>" + '正常' + "</a>";
								}
							}
						}else{
							return "-";
						}
								
					}
				},
				{
					field : 'jarSpare',
					title : '备注',
					width : 20,
					align : 'center',
					editor : 'textbox'
				}
			] ],
			width : '100%',
			height : '402px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			rownumbers:true,
			remoteSort:false,
			//onClickCell : onClickCell,
			enableCellEdit : true,// 表示是否开启单元格编辑功能
			rowStyler : function(index, row) {
				return 'color:#000;';
			},
			onDblClickRow: function (rowIndex, rowData) {
				$('#modifyAttendanceData').dialog({
					top 	: getTop(380),
					left 	: getLeft(850),
					title 	: 	'查看详情',
					closed	:	true,
					width	:	850,
					height	:	380,
					cache 	: 	false,
					modal 	: 	true,
					onClose : 	function() {
					}
				});
				$('#modifyAttendanceData').dialog('open');
				//鼠标双击事件
				modifyAttendanceDataWindow(rowData);
			}
		})
	$("#personInfomationDivTable").datagrid({
		onDblClickRow: function (rowIndex, rowData) {
			var photo = rowData.jftiPhotoUrl;
			console.log(photo);
			$("#personPhotoDiv").dialog({
				title: '照片 ',
				top: getTop(280),
				left: getLeft(650),
				width: 400,
				height: 533,
				closed: true,
				cache: false,
				modal: true,
				onClose: function () {
					$("#img").val('');
				}
			});
			if (photo.length > 0) {
				$("#img").attr({src: photo});
				$("#al").attr({href: photo});
				$("#personPhotoDiv").dialog("open");
			}else {
				myTips("照片不存在！", "error");
			}
		}
	})
	checkAttendance(1, 0);

})

function queryShift() {
	//查询班次
	var rule = [];
	var rule1 = [];
	$.post("../selectJourShiftSchedule.action", {
	}, function(data) {
		if (data.code != 1) {
			myTips("获取班次失败!", "error");
		} else {
			var workStatus1 = data.body[0].jssStatus1;
			var workon1 = data.body[0].jssWork1;
			var workoff1 = data.body[0].jssOffwork1;
			
			var workStatus2 = data.body[0].jssStatus2;
			var workon2 = data.body[0].jssWork2;
			var workoff2 = data.body[0].jssOffwork2;
			
			var workStatus3 = data.body[0].jssStatus3;
			var workon3 = data.body[0].jssWork3;
			var workoff3 = data.body[0].jssOffwork3;
			
			var workStatus4 = data.body[0].jssStatus4;
			var workon4 = data.body[0].jssWork4;
			var workoff4 = data.body[0].jssOffwork4;
			
			$("#on1").textbox('setValue',workon1);
			$('#on2').textbox('setValue',workon2);
			$('#on3').textbox('setValue',workon3);
			$('#on4').textbox('setValue',workon4);
			
			$('#off1').textbox('setValue',workoff1);
			$('#off2').textbox('setValue',workoff2);
			$('#off3').textbox('setValue',workoff3);
			$('#off4').textbox('setValue',workoff4);
			
			if(workStatus1=='1'){
				$("#status1").prop('checked', true);
			}else{
				$("#status1").prop('checked', false);
			}
			if(workStatus2=='1'){
				$("#status2").prop('checked', true);
			}else{
				$("#status2").prop('checked', false);
			}
			if(workStatus3=='1'){
				$("#status3").prop('checked', true);
			}else{
				$("#status3").prop('checked', false);
			}
			if(workStatus4=='1'){
				$("#status4").prop('checked', true);
			}else{
				$("#status4").prop('checked', false);
			}
		}
	});
	
	$('#jarName').val();
    $('#jarWorkTime').val();
}

//分页统计总条数
function getattendanceTablePageCount(page){
	var pageSize = 15;
	var jarUserId ='';
	var workTime = '';
	var jarUserId = $('#doRepairGetUserId').val();
	var jarStartTime = $('#jarStartTime').val();
	var jarEndTime = $('#jarEndTime').val();
	var jarDepartmentId = $('#doRepairGetUserDetId').val();
	var doRepairGetUserStoreId = $('#doRepairGetUserStoreId').val();
	console.log(jarDepartmentId+'   '+doRepairGetUserStoreId);
	if(jarUserId!=''){
		jarDepartmentId='';
		doRepairGetUserStoreId='';
	}
	//console.log(workTime);
	//查询考勤记录
	$.post("../checkAttendance.action", {
		jarSpare 	 : 123 ,
		jarUserId  	 : jarUserId,
		jarStartTime : jarStartTime,
		jarEndTime	 : jarEndTime,
		jarDepartmentId : jarDepartmentId,
		jarStoreId : doRepairGetUserStoreId,
	}, function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"attendanceTable",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"attendanceTable",0);
		}
	});
}

function checkAttendance(page, type) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var jarUserId ='';
	var workTime = '';
	var jarUserId = $('#doRepairGetUserId').val();
	var jarStartTime = $('#jarStartTime').val();
	var jarEndTime = $('#jarEndTime').val();
	var jarDepartmentId = $('#doRepairGetUserDetId').val();
	var doRepairGetUserStoreId = $('#doRepairGetUserStoreId').val();
	console.log(jarDepartmentId+'   '+doRepairGetUserStoreId);
	if(jarUserId!=''){
		jarDepartmentId='';
		doRepairGetUserStoreId='';
	}
	//console.log(workTime);
	//查询考勤记录
	$.post("../checkAttendance.action", {
		startNum 	 : startNum,
		endNum 		 : endNum,
		jarSpare 	 : 123 ,
		jarUserId  	 : jarUserId,
		jarStartTime : jarStartTime,
		jarEndTime	 : jarEndTime,
		jarDepartmentId : jarDepartmentId,
		jarStoreId : doRepairGetUserStoreId,
	}, function(data) {
		if (data.code != 1){
			//没有相应数据
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"checkAttendance","attendanceTable");
			}else{
				notCountPage(page, 0 ,"checkAttendance","attendanceTable");
			}
			$('#attendanceTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg,
			});
		} else {
			//有相应数据
			// if (page == 1) {
			// 	sourcePage(data.body[0].totalNum, 0, 0);
			// }
			if(data.body.length<endNum){
				notCountPage(page, 2 , "checkAttendance","attendanceTable");
			}else{
				notCountPage(page, 1 , "checkAttendance","attendanceTable");
			}
			var json = data.body;
			$('#attendanceTable').datagrid('loadData', json);
		}
	});
}

function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#attendanceTablePage").remove();
		$("#attendanceTablePageDiv").append("<div class='tcdPageCode' id='attendanceTablePage' style='text-align:center;'></div>");
		$("#attendanceTablePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					checkAttendance(p, 1);
				}
			}
		});
	}if (type == 3) {
		pageNum = Math.ceil(totalNum / 15);
		$("#queryDeviceRecordPage").remove();
		$("#personInfomationFenYe")
			.append(
				"<div class='tcdPageCode' id='queryDeviceRecordPage' style='text-align:center;'></div>");
		$("#queryDeviceRecordPage").createPage({
			onePageNums: 15,
			totalNum: totalNum,
			pageCount: pageNum,
			current: 1,
			backFn: function (p) {
				if (p <= pageNum) {
					selectIonInformation(p, 1);
				}
			}
		});
	}
}
function attendanceShiftSetting(){
	var on1 = $("#on1").val();
	var off1 =  $("#off1").val();
	if($('#status1').is(':checked')) {
		var status1 = '1';
	}else{
		var status1 = '0';
	}
	var on2 = $("#on2").val();
	var off2 =  $("#off2").val();
	if($('#status2').is(':checked')) {
		var status2 = '1';
	}else{
		var status2 = '0';
	}
	var on3 = $("#on3").val();
	var off3 =  $("#off3").val();
	if($('#status3').is(':checked')) {
		var status3 = '1';
	}else{
		var status3 = '0';
	}
	var on4 = $("#on4").val();
	var off4 =  $("#off4").val();
	if($('#status4').is(':checked')) {
		var status4 = '1';
	}else{
		var status4 = '0';
	}
	$.post("../modifyTheShift.action", {
		jssWork1		:	on1,
		jssOffwork1		:	off1,
		jssStatus1		:	status1,
		jssWork2		:	on2,
		jssOffwork2		:	off2,
		jssStatus2		:	status2,
		jssWork3		:	on3,
		jssOffwork3		:	off3,
		jssStatus3		:	status3,
		jssWork4		:	on4,
		jssOffwork4		:	off4,
		jssStatus4		:	status4,		
		
	}, function(data) {
		if (data.code != 1) {
			myTips("更新失败!","error");
		}else{
			myTips("更新成功!","success");
			
			workRule().then(function(){
				checkAttendance(1, 0);
			});
			$('#updateAttendanceSetting').dialog('close');
		}
	});
}

function openAttendanceSetting(){
	$('#updateAttendanceSetting').dialog({
		top 	: getTop(300),
		left 	: getLeft(650),
		title 	: 	'考勤设置',
		closed	:	true,
		width	:	650,
		height	:	300,
		cache 	: 	false,
		modal 	: 	true,
		onClose : 	function() {
		}
	});
	$('#updateAttendanceSetting').dialog('open');
	queryShift();
}
function modifyAttendanceDataWindow(rowData){
	if(status1==1){
		$('.cOn1').show();
		$('.cOff1').show();
		$('#attendanceTable').datagrid('showColumn', 'jarWork1');
		$('#attendanceTable').datagrid('showColumn', 'jarOffwork1');
	}else{
		
		$('.cOn1').hide();
		$('.cOff1').hide();
		$('#attendanceTable').datagrid('hideColumn', 'jarWork1');
		$('#attendanceTable').datagrid('hideColumn', 'jarOffwork1');
	}
	if(status2==1){
		$('.cOn2').show();
		$('.cOff2').show();
		$('#attendanceTable').datagrid('showColumn', 'jarWork2');
		$('#attendanceTable').datagrid('showColumn', 'jarOffwork2');
	}else{
		$('.cOn2').hide();
		$('.cOff2').hide();
		$('#attendanceTable').datagrid('hideColumn', 'jarWork2');
		$('#attendanceTable').datagrid('hideColumn', 'jarOffwork2');
	}
	if(status3==1){
		$('.cOn3').show();
		$('.cOff3').show();
		$('#attendanceTable').datagrid('showColumn', 'jarWork3');
		$('#attendanceTable').datagrid('showColumn', 'jarOffwork3');
	}else{
		$('.cOn3').hide();
		$('.cOff3').hide();
		$('#attendanceTable').datagrid('hideColumn', 'jarWork3');
		$('#attendanceTable').datagrid('hideColumn', 'jarOffwork3');
	}
	if(status4==1){
		$('.cOn4').show();
		$('.cOff4').show();
		$('#attendanceTable').datagrid('showColumn', 'jarWork4');
		$('#attendanceTable').datagrid('showColumn', 'jarOffwork4');
	}else{
		$('.cOn4').hide();
		$('.cOff4').hide();
		$('#attendanceTable').datagrid('hideColumn', 'jarWork4');
		$('#attendanceTable').datagrid('hideColumn', 'jarOffwork4');
	}
	$('#storefront').val(rowData.jarStoreName);
	$('#department').val(rowData.jarDepartmentName);
	$('#workName').val(rowData.jarName);
	$('#workTime').val(rowData.jarWorkTime);
	$('#workRemarks').val(rowData.jarSpare);
	$('#hOn1').html(rowData.jarWork1);
	$('#hOff1').html(rowData.jarOffwork1);
	$('#hOn2').html(rowData.jarWork2);
	$('#hOff2').html(rowData.jarOffwork2);
	$('#hOn3').html(rowData.jarWork3);
	$('#hOff3').html(rowData.jarOffwork3);
	$('#hOn4').html(rowData.jarWork4);
	$('#hOff4').html(rowData.jarOffwork4);
}
function modifyAttendanceDataSave(){
	var row = $('#attendanceTable').datagrid('getSelected');
	var workRemarks = $('#workRemarks').val();
	
	$.post("../addAttendanceNote.action",{
		jarId : row.jarId,
		jarSpare : workRemarks,
	}, function(data) {
		if (data.code != 1) {
			 myTips("备注失败!","error");
		} else {
			 myTips("备注成功!","success");
			 checkAttendance(1, 0);
			 $('#modifyAttendanceData').dialog('close');
		}
	});
}

function workRule(){
	var p = new Promise(function (resolve, reject){
		$.post("../selectJourShiftSchedule.action", {
		}, function(data) {
			if (data.code != 1) {
				myTips("获取班次失败!", "error");
			}else{
				 on1 = data.body[0].jssWork1;
				 off1 = data.body[0].jssOffwork1;
				 status1 = data.body[0].jssStatus1;
				 on2 = data.body[0].jssWork2;
				 off2 = data.body[0].jssOffwork2;
				 status2 = data.body[0].jssStatus2;
				 on3 = data.body[0].jssWork3;
				 off3 = data.body[0].jssOffwork3;
				 status3 = data.body[0].jssStatus3
				 on4 = data.body[0].jssWork4;
				 off4 = data.body[0].jssOffwork4;
				 status4 = data.body[0].jssStatus4;
				 if(status1==1){
						$('.cOn1').show();
						$('.cOff1').show();
						$('#attendanceTable').datagrid('showColumn', 'jarWork1');
						$('#attendanceTable').datagrid('showColumn', 'jarOffwork1');
					}else{
						
						$('.cOn1').hide();
						$('.cOff1').hide();
						$('#attendanceTable').datagrid('hideColumn', 'jarWork1');
						$('#attendanceTable').datagrid('hideColumn', 'jarOffwork1');
					}
					if(status2==1){
						$('.cOn2').show();
						$('.cOff2').show();
						$('#attendanceTable').datagrid('showColumn', 'jarWork2');
						$('#attendanceTable').datagrid('showColumn', 'jarOffwork2');
					}else{
						$('.cOn2').hide();
						$('.cOff2').hide();
						$('#attendanceTable').datagrid('hideColumn', 'jarWork2');
						$('#attendanceTable').datagrid('hideColumn', 'jarOffwork2');
					}
					if(status3==1){
						$('.cOn3').show();
						$('.cOff3').show();
						$('#attendanceTable').datagrid('showColumn', 'jarWork3');
						$('#attendanceTable').datagrid('showColumn', 'jarOffwork3');
					}else{
						$('.cOn3').hide();
						$('.cOff3').hide();
						$('#attendanceTable').datagrid('hideColumn', 'jarWork3');
						$('#attendanceTable').datagrid('hideColumn', 'jarOffwork3');
					}
					if(status4==1){
						$('.cOn4').show();
						$('.cOff4').show();
						$('#attendanceTable').datagrid('showColumn', 'jarWork4');
						$('#attendanceTable').datagrid('showColumn', 'jarOffwork4');
					}else{
						$('.cOn4').hide();
						$('.cOff4').hide();
						$('#attendanceTable').datagrid('hideColumn', 'jarWork4');
						$('#attendanceTable').datagrid('hideColumn', 'jarOffwork4');
					}
			}
			resolve();
		});
	});
	return p;
	
}
//打卡人脸识别记录

function openPersonInfomationDiv(){
	$('#personInfomationDiv').dialog({
		title : '识别记录',
		top: 30,
		left: 200,
		width: 750,
		height: 510,
		closed: true,
		cache: false,
		modal: true,
		onClose: function () {
			$('#userName').val("");
			$('#searchFaceStart').val("");
			$('#searchFaceEnd').val('');
		}

	});
	$("#searchFaceStart").val($("#workTime").val());
	selectIonInformation(1,3);
	$('#personInfomationDiv').dialog("open");
}
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}
function selectIonInformation(page,type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var userName = $("#workName").val();
	var startTime=$("#searchFaceStart").val();
	var endTime=$("#searchFaceEnd").val();
	var row = $("#attendanceTable").datagrid('getSelected');
	$("#userName").val(row.jarName);

	if(endTime==""){
		var endTime= new Date().format("yyyy-MM-dd").toString();
		var dataTime = new Date(endTime);
		dataTime = dataTime.setDate(dataTime.getDate()+1);
		endTime = new Date(dataTime);
		endTime = endTime.format("yyyy-MM-dd");
	}else{
		var dataTime = new Date(endTime);
		dataTime = dataTime.setDate(dataTime.getDate()+1);
		endTime = new Date(dataTime);
		endTime = endTime.format("yyyy-MM-dd");
	}
	if(startTime==""){
		startTime = "1996-11-11";
	}
	$.post("../selectJourFaceRecognitionInformation.action", {
		startNum		: startNum,
		endNum			: endNum,
		startTime		: startTime,
		endTime			: endTime,
		jftiUserId		: row.jarUserId,
	}, function (data) {
		data = data.body;
		if (data != null) {
			if (page == 1 && type == 3) {
				sourcePage(data[0].totalNum, page, 3);
			}
			for (var i in data) {
				data[i].detailedAddress = data[i].hsAddCommunity + data[i].hsAddBuilding + data[i].hsAddDoorplateno;
				if(data[i].jftiPersonName==""||data[i].jftiPersonName==null){
					var name ="陌生人" ;
					data[i].jftiPersonName=name;
				}
				if(data[i].jfriAliveType==1){
					var live="活体认证";
					data[i].jfriAliveType=live;
				}else{
					var die="非活体认证";
					data[i].jfriAliveType=die;
				}
				if(data[i].jftiRecMode==1){
					data[i].jftiRecMode='刷脸';
				}else if(data[i].jftiRecMode==2){
					data[i].jftiRecMode='刷卡';
				}else if(data[i].jftiRecMode==3){
					data[i].jftiRecMode='脸&卡双重认证';
				}else if(data[i].jftiRecMode==4){
					data[i].jftiRecMode='人证比对';
				}else if(data[i].jftiRecMode==5){
					data[i].jftiRecMode='一键开锁';
				}
				if(data[i].jftiPasernType==''){
					data[i].jftiPasernType='用户'
				}
				if(data[i].jftiType== 1){
					data[i].jftiType ='成功'
				}else{
					data[i].jftiType ='失败'
				}
			}
			$("#personInfomationDivTable").datagrid("loadData", data);
		} else {
			sourcePage(0, 0, 3);
			$("#personInfomationDivTable").datagrid("loadData", []);
		}
	});
}
