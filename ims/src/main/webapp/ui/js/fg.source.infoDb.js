var _phoneNumber ='';
$(function() {
	$("#houseDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			housePopulationDlg();
		}
	});
	/*$('#populationDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$('#population_index').val(rowIndex);
			populationDetailedDlg(rowData);
		}
	});*/
	$("#followUpInformationTable").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			followInfoDlg(rowData);
		}
	});
});



// 打开详细信息对话框事件
function infoDlg(sourceData) {
	$('#contractInformationTable').datagrid({
		columns : [ [ {
			field : 'jrlBeginTime',
			title : '开始时间',
			width : '25%',
			align : 'center'
		}, {
			field : 'jrlEndTime',
			title : '结束时间',
			width : '25%',
			align : 'center'
		}, {
			field : 'jrlPriceLadder',
			title : '当期租金/元',
			width : '25%',
			align : 'center'
		},  {
			field : 'jrlRentFreeDays',
			title : '年免租期/天',
			width : '25%',
			align : 'center'
		}] ],
		width : '440px',
		height : '119px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		onDblClickRow : function(rowIndex, rowData) {
			
		}
	});
	//房东合约信息
	$.post("../queryAllRenewalLandlord.action",{
		jrlHouse4storeId : sourceData.hrHouse4storeId,
	},function(data) {
		data=data.body;
		if(data == null){
			data = [];	
		}
		for(var i in data[0]){
			if (data[0][i] == null) {
				data[0][i] = '';
			}
			if (data[0][i] == '不可看') {
				data[0][i] = '******';
			}
			if (data[0][i] == '123456789') {
				data[0][i] = '******';
			}
		}
		var contractInformationTable = [];
		for(var j=data.length-1;j >= 0; j--){
			var jrlBeginTime, jrlEndTime, jrlPriceLadder
			var priceLadder = data[j].jrlPriceLadder;
			var rentFreeSegment = data[j].jrlRentFreeSegment;
			var strPrice = priceLadder.split(',');
			var strRentFreeSegment = rentFreeSegment.split(',');
			for(var k in strPrice){
				var day1 = getDayDiff(strRentFreeSegment[k].split('#')[0], strRentFreeSegment[k].split('#')[1]);
				var day2 = getDayDiff(strRentFreeSegment[k].split('#')[2], strRentFreeSegment[k].split('#')[3]);
				var item = {};
				item.jrlBeginTime = strRentFreeSegment[k].split('#')[0];
				item.jrlEndTime = strRentFreeSegment[k].split('#')[3];
				item.jrlPriceLadder = strPrice[k];
				item.jrlRentFreeDays = day1 + day2;
				contractInformationTable.push(item);
			}
		}
		$('#contractInformationTable').datagrid('loadData', contractInformationTable);
	});
	
	//未租房信息表导入数据
	$.post("../queryHouseStoreCommon.action", {
		hsId : sourceData.hrHouse4storeId,
	}, function(data) {
		data=data.body;
		if(data == null){
			data = [];
		}
		for(var i in data[0]){
			if (data[0][i] == null) {
				data[0][i] = '';
			}
			if($('#read'+i)!=undefined){
				$('#read'+i).val(data[0][i]);
				//给业主收款账号姓名替换***
				if(i=='hsBankName'){
					var BankName=$('#readhsBankName').val();
					var nameLen=BankName.length;
					if(nameLen==2){
						var BankName2=BankName.substr(0,1)+'*';
					}else{
						var nameChar='';
						for(var j=0,nameLen1=BankName.length;j<nameLen1;j++){
							nameChar +='*'
						}
						var BankName2=BankName.substr(0,1)+nameChar;		
					}
					$('#readhsBankName').val(BankName2);
				}
				//给业主收款卡号替换***
				if(i=='hsBankNum'){
					var BankNum=$('#readhsBankNum').val();
					var numChar='';
					for(var i=0,numLen=BankNum.length;i<numLen;i++){
						numChar +='*'
					}
					var BankNum2=BankNum.substr(0,4)+numChar+BankNum.substr(-4,4);			
					$('#readhsBankNum').val(BankNum2);
				}
			}
		}
		$('#hsAddress').val(data[0].hsAddDistrict+" "+data[0].hsAddZone+" "+data[0].hsAddCommunity+" "+data[0].hsAddBuilding+" "+data[0].hsAddDoorplateno);
		//房东信息
		$.post("../queryHouseStoreOfLandlord.action",{
			landlordId : data[0].hsLandlordId
		},function(data2) {
			data2=data2.body;
			if(data2 == null){
				data2 = [];
			}
			for(var i in data2[0]){
				if (data2[0][i] == null) {
					data2[0][i] = '';
				}
				if (data2[0][i] == '不可看') {
					data2[0][i] = '******';
				}
				if (data2[0][i] == '123456789') {
					data2[0][i] = '******';
				}
				if('laPopName' == i){
					landName1 = data2[0][i];
				}
				if('laPopTelephone' == i){
					landTel1 = data2[0][i];
				}
				if('laPopIdcard' == i){
					landIdCard1 = data2[0][i];
				}
				if($('#read'+i)!=undefined){
					$('#read'+i).val(data2[0][i]);
				}
			}
		});
		//业务员
		if(data[0].hsAdminUserId!=null&& data[0].hsAdminUserId!=''){
			$.post("../queryUserByDepartmentID.action", {
				userId : data[0].hsAdminUserId
			}, function(data1) {
				if (data1.code < 0) {
					return;
				}
				data1 = data1.body;
				if(data1 == null){
					data1 = [];
				}
				if(data1 != '' && data1.length > 0){
					$('#readhsAdminUserName').val(data1[0].suStaffName);
				}
			});
		}
		//录入人
		if(data[0].hsUserId!=null&& data[0].hsUserId!=''){
			$.post("../queryUserByDepartmentID.action", {
				userId : data[0].hsUserId
			}, function(data3) {
				if (data3.code < 0) {
					return;
				}
				data3 = data3.body;
				if(data3 == null){
					data3 = [];
				}
				if(data3 != '' && data3.length > 0){
					$('#readhsUserName').val(data3[0].suStaffName);
				}
			});
		}
		//业绩受益人
		$.post("../queryAllTransactionAssistanceRentStore.action", {
			assistHouse4store : data[0].hsId,
			assistType : '存房'
		}, function(assdata) {
			if(assdata.code<0){
				$("#readhsAssist").val('无业绩受益人');
			}else{
				assdata = assdata.body;
				if(assdata == null){
					assdata = [];
				}
				var assInfo = '';
				for(var i in assdata){
					assInfo += assdata[i].assistPeople+"："+assdata[i].assistBonus+"%；";
				}
				$("#readhsAssist").val(assInfo);
			}
		});		
	});
	changeBaseShowFont("readhsBaseTd","readhsBase",3);//房东欠结处理
}

//业主、租客信息上一条下一条
function hslaterOrNext(type, number) {
	function clear(){
		$("#readhs input").val('');
		$("#hrInfoRead input").val('');
		$('#financialInfoDlg input').val('');
		$('#financialInfoDlg textarea').val('');
	}
	var dataIndex;
	if(number == 0){
		dataIndex = $("#hsHouseSort_index").val();
	}else if(number == 1){
		dataIndex = $("#hrHouseRent_index").val();
	}else if(number == 2){
		dataIndex = $(".financialInfo_index").val();
	}
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			clear();
			var num = parseInt(dataIndex) - 1;
			if(number == 0){
				$("#hsHouseSort_index").val(num);
			}else if(number == 1){
				$("#hrHouseRent_index").val(num);
			}
			if(number == 2){
				$(".financialInfo_index").val(num);
				changeData = $('#paymentInfoTable').datagrid('getData').rows[num];
				$('#paymentInfoTable').datagrid('selectRow',num);
			}else{
				changeData = $('#sourceInfoDg').datagrid('getData').rows[num];
				$('#sourceInfoDg').datagrid('selectRow',num);
			}
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size;
		if(number == 2){
			size = $("#paymentInfoTable").datagrid("getData").total;
		}else{
			size = $("#sourceInfoDg").datagrid("getData").total;
		}
		if (dataIndex != parseInt(size) - 1) {
			clear();
			var num = parseInt(dataIndex) + 1;
			if(number == 0){
				$("#hsHouseSort_index").val(num);
			}else if(number == 1){
				$("#hrHouseRent_index").val(num);
			}
			if(number == 2){
				$(".financialInfo_index").val(num);
				changeData = $('#paymentInfoTable').datagrid('getData').rows[num];
				$('#paymentInfoTable').datagrid('selectRow',num);
			}else{
				changeData = $('#sourceInfoDg').datagrid('getData').rows[num];
				$('#sourceInfoDg').datagrid('selectRow',num);
			}
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	if (changeData.length != 0) {
		for (var i in changeData) {
			if (changeData[i] == null) {
				changeData[i] = '';
			}
		}
		$('#detailedAddress').html(changeData.detailedAddress);
		if(number == 0){
			infoDlg(changeData);
			queryFollow(changeData,1,0);
		}else if(number == 1){
			rentedInformationWindow();
		}else if(number == 2){
			queryFinancialInfo(changeData);
		}
	}
}

var landName1 = '';
var landIdCard1 = '';
var landTel1 = '';

//详细信息表格初始化
function initTable(title) {
	var row = $('#sourceInfoDg').datagrid('getSelected');
	console.log("租客详细信息")
	console.log(row)
	_houseRentCoding = row.hrId;
	_houseCoding = row.hrHouseId;
	_houseStoreCoding = row.hrHouse4storeId;
	_houseRenterId = row.hrRenterId;
	_houseLandlordId = row.hrLandlordId;
	_hrAddDistrict = row.hrAddDistrict;
	_totalPage = row.totalPage;
	_hrAddCommunity = row.hrAddCommunity;
	_hrAddBuilding = row.hrAddBuilding;
	_hrAddDoorplateno = row.hrAddDoorplateno;
	landName1 = row.landlordPopName;
	landTel1 = row.landlordPopTelephone;
	landIdCard1 = row.renterPopIdcard;
	if(title == '已租详情'){//已租详情
		var row = $('#sourceInfoDg').datagrid('getSelected');
		$('#detailedAddress').html(row.detailedAddress);
		detailHouseInfo();
	}
	if(title == '租客信息'){//租客信息
		var row = $('#sourceInfoDg').datagrid('getSelected');
		$('#detailedAddress').html(row.detailedAddress);
		rentedInformationWindow();
	}
	if(title == '业主信息'){//业主信息
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
			},{
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
			height : '177px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			// 表格行双击事件
			onDblClickRow : function(rowIndex, rowData) {
				$('#followPicture1').hide();
				$('#followPicture').show();
				downFollowInfo(rowData);
			},
			onClose : function() {
				$("#followInfoTable input").val('');
			}
		});
		var row = $('#sourceInfoDg').datagrid('getSelected');
		infoDlg(row);
		queryFollow(row,1,0);
	}
	
	// 初始化收支记录表
	if (title == '房屋收支'){
		$('#paymentInfoTable').datagrid({
			columns : [ [ {
				field : 'jfAuditState',
				title : '审核状态',
				width : '10%',
				align : 'center'
			},{
				field : 'jfBillingDate',
				title : '记账日期',
				width : '10%',
				align : 'center'
			},{
				field : 'jfNatureOfThe',
				title : '收支性质',
				width : '10%',
				align : 'center'
			},{
				field : 'jfAccountingSpecies',
				title : '收支种类',
				width : '15%',
				align : 'center'
			},{
				field : 'jfTheOwnershipType',
				title : '归属类型',
				width : '10%',
				align : 'center'
			},{
				field : 'jfBelongingToTheName',
				title : '归属名称',
				width : '15%',
				align : 'center'
			},{
				field : 'jfSumMoney',
				title : '金额(元)',
				width : '10%',
				align : 'center'
			},{
				field : 'jfStartCycle',
				title : '周期开始',
				width : '10%',
				align : 'center'
			}, {
				field : 'jfEndCycle',
				title : '周期结束',
				width : '10%',
				align : 'center'
			},] ],
			width: '100%',
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			onDblClickRow : function(rowIndex, rowData) {
				if (rowData) {
					$(".financialInfo_index").val(rowIndex);
					queryFinancialInfo(rowData);
				}
			},
		});
		$("#searchJfCheckInTimeEnd").val(formatTime(getNowFormatDate(), 2));
		queryFinancial(1,0);
	}
	
	// 初始化合约记录表
	if (title == '合约记录') {
		$('#renewalContinueTable').datagrid({
			columns : [ [ {
				field : 'jrrSignedTime',
				title : '签约时间',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrrContractType',
				title : '合同性质',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrrBeginTime',
				title : '开始时间',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrrEndTime',
				title : '到期时间',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrrTheTerm',
				title : '合同期限',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrrMoney',
				title : '租金',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrrPaymentMethod',
				title : '缴费方式',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrrRegistrationTime',
				title : '登记时间',
				width : '15%',
				align : 'center'
			}, {
				field : 'jrrImgNum',
				title : '图片/文件',
				width : '15%',
				align : 'center'
			} ] ],
			width : '100%',
			height: '127px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				checkRenterContract();
			},
		});
		queryRenterContinue(1,0);
		
		$('#landlordContinueTable').datagrid({
			columns : [ [ {
				field : 'jrlSignedTime',
				title : '签约时间',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrlContractType',
				title : '合同性质',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrlBeginTime',
				title : '开始时间',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrlEndTime',
				title : '到期时间',
				width : '10%',
				align : 'center'
			}, {
				field : 'jrlTheTerm',
				title : '合同期限',
				width : '15%',
				align : 'center'
			}, {
				field : 'jrlPaymentMethod',
				title : '缴费方式',
				width : '15%',
				align : 'center'
			}, {
				field : 'jrlRegistrationTime',
				title : '登记时间',
				width : '15%',
				align : 'center'
			}, {
				field : 'jrlImgNum',
				title : '图片/文件',
				width : '15%',
				align : 'center'
			} ] ],
			width : '100%',
			height: '127px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				
				open_common_img_dialog('private', 'landlordContract', 'landlordContinueTable', 'jrlId', 'jrlImgPath', 'renewalLandlordInRentDb', 'deleteLandContPic');
			},
		});
		queryLandlordContinue(1,0);
	}
	// 跟进记录表
	if (title == '跟进记录') {
		$('#inFollowInfoTable').datagrid({
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
				width : '15%',
				align : 'center'
			}, {
				field : 'jhfFollowBelong',
				title : '跟进归属',
				width : '10%',
				align : 'center'
			}, {
				field : 'jhfFollowRemark',
				title : '备注',
				width : '40%',
				align : 'center'
			} ] ],
			singleSelect : true,
			autoRowHeight : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			onDblClickRow : function(rowIndex, rowData) {
				if (rowData) {
					readonlyDataToDb("readonlyInFollowInfoTable","inFollowInfoTable");
				}
			},
		});
		queryFollowDb(1,0);
	}
	// 初始化维保记录
	if (title == '维保记录') {
		$('#repairInfoTable').datagrid({
			columns : [ [ {
				field : 'repState',
				title : '维保状态',
				width : '10%',
				align : 'center'
			},{
				field : 'repTypeRp',
				title : '维保类型',
				width : '10%',
				align : 'center'
			},{
				field : 'repReportingTime',
				title : '登记时间',
				width : '10%',
				align : 'center'
			},{
				field : 'repEventRp',
				title : '维保描述',
				width : '30%',
				align : 'center'
			},{
				field : 'repTollRp',
				title : '收费',
				width : '10%',
				align : 'center'
			},{
				field : 'totalPage',
				title : '维保耗时',
				width : '10%',
				align : 'center'
			},{
				field : 'repToReceive',
				title : '受理时间',
				width : '10%',
				align : 'center'
			},{
				field : 'repReturningRp',
				title : '回访结果',
				width : '10%',
				align : 'center'
			},] ],
			width: '100%',
			height:'402px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				var imgNum = rowData.repImgNum;
				var img = imgNum.split("/")[0];
				var file = imgNum.split("/")[1];
				$("#_repair3_imgNumre").html("（图片：" + img + "张    文件：" + file + "个）");
				$("#repair_index2").val(rowIndex);
				$("#repairInfoDlghr").dialog({
					title : "维保信息",
					top : getTop(500),
					left : getLeft(750),
					width : 750,
					height : 500,
					closed : true,
					cache : false,
					modal : true,
					onClose : function(){
						$("#repairInfoDlg2 input").val('');
						$("#repairInfoDlg2 textarea").val('');
					}
				});
				$("#repairInfoDlghr").dialog('open');
				$('#showProgressTable2').datagrid({
					columns : [ [
							{
								field : 'proTime',
								title : '进展时间',
								width : 10,
								align : 'center'
							},
							{
								field : 'userName',
								title : '负责人',
								width : 10,
								align : 'center'
							},
							{
								field : 'proState',
								title : '进展状态',
								width : 10,
								align : 'center'
							},
							{
								field : 'proRemark',
								title : '进展描述',
								width : 65,
								align : 'center',
								formatter : function(value, row, index) {
									return "<span title='" + row.proRemark
											+ "'>" + row.proRemark + "</span>";
								}
							}] ],
					width : '100%',
					height : '100%',
					singleSelect : true,
					autoRowHeight : false,
					pagination : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $("#showProgressTable2").datagrid("getSelected");
						if (row) {
							for(var i in row){
								$("#readShowProgress2"+i).html(row[i]);
							}
							$('#showProgressDlg2').dialog({
								title : '进展详情',
								top : getTop(230),
								left : getLeft(420),
								width : 420,
								height : 230,
								closed : true,
								cache : false,
								modal : true,
								onClose : function() {
									$('.xwtable1 span').text('');
								}
							});
							$('#showProgressDlg2').dialog('open');
						}
					}
				});
				$('#showReturningTable2').datagrid({
					columns : [ [ {
						field : 'retTime',
						title : '回访时间',
						width : 10,
						align : 'center'
					}, {
						field : 'userName',
						title : '负责人',
						width : 10,
						align : 'center'
					}, {
						field : 'retResult',
						title : '回访结果',
						width : 10,
						align : 'center'
					},{
						field : 'retViolationRegulation',
						title : '是否违纪',
						width : 10,
						align : 'center'
					},{
						field : 'rteRemark',
						title : '备注',
						width : 55,
						align : 'center'
					} ] ],
					width : '100%',
					height : '100%',
					singleSelect : true,
					autoRowHeight : false,
					pagination : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $("#showReturningTable2").datagrid("getSelected");
						if (row) {
							for(var i in row){
								$("#readShowReturning"+i).text(row[i]);
							}
							$('#showReturningDlg').dialog({
								title : '回访详情',
								top : getTop(230),
								left : getLeft(420),
								width : 420,
								height : 230,
								closed : true,
								cache : false,
								modal : true,
								onClose : function() {
									$('.xwtable1 span').text('');
								}
							});
							$('#showReturningDlg').dialog('open');
						}
					}
				});
				queryRepairInfo(rowData);
			},
		});
		queryRepair(1,0);
	}
	
	//初始化任务记录
	if(title == '任务记录'){
		$('#virtualRepairTable').datagrid({
			columns : [[ {
					field : 'repState',
					title : '任务状态',
					width : '10%',
					align : 'center',
				},
				{
					field : 'repTypeRp',
					title : '任务类型',
					width : '10%',
					align : 'center'
				},
				{
					field : 'repReportingTime',
					title : '登记时间',
					width : '10%',
					align : 'center',
					formatter : function(value, row, index) {
						return formatTime(row.repReportingTime, 1);
					}
				},
				{
					field : 'repEventRp',
					title : '任务描述',
					width : '30%',
					align : 'center',
					formatter: function(value, row, index) {
						if (row.repEventRp != null && row.repEventRp != '') {
							var eventRp = row.repEventRp;
							if (row.repEventRp.length > 10) {
								eventRp = eventRp.substr(0, 10) + "...";
							}
							return "<span title='" + row.repEventRp + "'>" + eventRp + "</span>";
						} else {
							return '';
						}
					}
				},
				{
					field : 'repToReceive',
					title : '受理时间',
					width : '10%',
					align : 'center',
					formatter: function(value, row, index) {
						if (row.repToReceive == '未领取') {
							return row.repToReceive;
						} else {
							return formatTime(row.repToReceive, 1);
						}
					}
				},
				{
					field : 'repImgNum',
					title : '图片数量',
					width : '10%',
					align : 'center'
				},
				{
					field : 'repUseTime',
					title : '完成时间',
					width : '10%',
					align : 'center'
				}, 
				{
					field : 'endTime',
					title : '总耗时',
					width : '10%',
					align : 'center'
				}, 
			]],
			width: '100%',
			height:'402px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				if (rowData) {
					$(".repair_index").val(rowIndex);
					repairInfoDlg(rowData);
				}
			},
		});
		virtualRepair(1,0);
	}
	
	// 初始化事务审批表
	if (title == '审批记录') {
		$('#eventInfoTable').datagrid({
			columns : [ [ {
				field : 'eaEventState',
				title : '审批状态',
				width : '10%',
				align : 'center'
			},{
				field : 'eaEventType',
				title : '审批类型',
				width : '10%',
				align : 'center'
			},{
				field : 'eaReleaseTime',
				title : '申请时间',
				width : '10%',
				align : 'center'
			},{
				field : 'eaEventContent',
				title : '审批内容',
				width : '30%',
				align : 'center'
			},{
				field : 'eaAmountInvolved',
				title : '涉及金额',
				width : '10%',
				align : 'center'
			},{
				field : 'eaImgNum',
				title : '附件数量',
				width : '10%',
				align : 'center'
			},{
				field : 'eaCompletionTime',
				title : '完成时间',
				width : '10%',
				align : 'center'
			},{
				field : 'totalPage',
				title : '审批耗时',
				width : '10%',
				align : 'center'
			},] ],
			width : '100%',
			height: '402px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				$("#event_index").val(rowIndex);
				seeEvent();
			},
		});
		queryEvent(1,0);
	}
	 
	// 初始化门卡管理
	if (title == '授权管理') {
		$('#doorLockTable').datagrid({
			columns : [ [ {
				field : 'devNickname',
				title : '门锁名',
				width : '10%',
				align : 'center'
			},{
				field : 'jdcCardNum',
				title : '卡号',
				width : '15%',
				align : 'center'
			},{
				field : 'popName',
				title : '使用人',
				width : '15%',
				align : 'center'
			},{
				field : 'jdcDeadlineTime',
				title : '截止时间',
				width : '20%',
				align : 'center'
			},{
				field : 'jdcPublishTime',
				title : '发卡时间',
				width : '20%',
				align : 'center'
			},{
				field : 'jdcState',
				title : '状态',
				width : '10%',
				align : 'center'
			}, {
				field : 'jdcEquipmentType',
				title : '状态',
				width : '10%',
				align : 'center'
				},] ],
			width : '100%',
			height: '200px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				seeLockFollow();
			},
		});
		
		queryLock(1,0);
		
		$('#doorLockFollowTable').datagrid({
			columns : [ [ {
				field : 'registrantName',
				title : '跟进人',
				width : '10%',
				align : 'center'
			},{
				field : 'type',
				title : '跟进类型',
				width : '10%',
				align : 'center'
			},{
				field : 'time',
				title : '跟进时间',
				width : '15%',
				align : 'center'
			},{
				field : 'text',
				title : '跟进记录',
				width : '65%',
				align : 'center'
			}] ],
			width : '100%',
			height: '200px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
			},
		});
	}
	
	
	// 初始化业主账单
	if (title == '业主账单') {
		$('#payableInfoTable').datagrid({
			columns : [ [ {
				field : 'landlordName',
				title : '业主姓名',
				width : '10%',
				align : 'center'
			}, {
				field : 'jciFukuanri',
				title : '付款日',
				width : '9%',
				align : 'center'
			}, {
				field : 'jciPeriods',
				title : '账单期数',
				width : '6%',
				align : 'center'
			}, {
				field : 'jciBeginPeriods',
				title : '开始周期',
				width : '9%',
				align : 'center'
			}, {
				field : 'jciEndPeriods',
				title : '结束周期',
				width : '9%',
				align : 'center'
			}, {
				field : 'jciMoney',
				title : '金额',
				width : '7%',
				align : 'center'
			}, {
				field : 'jciState',
				title : '账单状态',
				width : '10%',
				align : 'center'
			}, {
				field : 'auditStatus',
				title : '审核状态',
				width : '10%',
				align : 'center',
				formatter:function(value, row, index) {
					if (row.auditStatus == '重新核验') {
						return row.auditStatus;
					} else if (row.auditStatus == '已付款'){
						return "<a style='text-decoration:none;color:gray;'>" + row.auditStatus + "<a>";
					} else if (row.auditStatus == '待付款') {
						return "<a style='text-decoration:none;color:blue;'>" + row.auditStatus + "<a>";
					} else if (row.auditStatus == '已审核') {
						return "<a style='text-decoration:none;color:green;'>" + row.auditStatus + "<a>";
					} else if (row.auditStatus == '未审核'){
						return "<a style='text-decoration:none;color:red;'>" + row.auditStatus + "<a>";
					} else {
						return row.auditStatus;
					}
				}
			}, {
				field : 'auditName',
				title : '审核人',
				width : '10%',
				align : 'center'
			}, {
				field : 'reviewName',
				title : '复核人',
				width : '10%',
				align : 'center'
			}, {
				field : 'draweeName',
				title : '付款人',
				width : '10%',
				align : 'center'
			}] ],
			width: '100%',
			fitColumns: true,
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				if (rowData){
					//readonlyDataToDb("readonlyPayableInfoTable","payableInfoTable");
					$("#payable_index").val(rowIndex);
					seePayable(rowData);
				}
			},
		});
		// 应支记录表取数据
		queryPayable(1,0);
	}
	// 初始化租客账单
	if (title == '租客账单') {
		$('#receivableInfoTable').datagrid({
			columns : [ [ {
				field : 'renterName',
				title : '租客姓名',
				width : '10%',
				align : 'center'
			},{
				field : 'jciFukuanri',
				title : '收款日',
				width : '10%',
				align : 'center'
			},{
				field : 'jciPeriods',
				title : '账单期数',
				width : '10%',
				align : 'center'
			}, {
				field : 'jciBeginPeriods',
				title : '开始周期',
				width : '10%',
				align : 'center'
			}, {
				field : 'jciEndPeriods',
				title : '结束周期',
				width : '10%',
				align : 'center'
			}, {
				field : 'jciType',
				title : '类别',
				width : '10%',
				align : 'center'
			}, {
				field : 'jciMoney',
				title : '金额',
				width : '10%',
				align : 'center'
			}, {
				field : 'jciState',
				title : '状态',
				width : '5%',
				align : 'center',
				formatter:function(value, row, index) {
					if (row.jciState == '待收') {
						return "<a style='text-decoration:none;color:red;'>" + row.jciState
								+ "<a>";
					} else if (row.jciState == '已收') {
						return "<a style='text-decoration:none;color:blue;'>" + row.jciState
								+ "<a>";
					} else {
						return row.jciState;
					}
				}
			} , {
				field : 'registerPeople',
				title : '登记人',
				width : '10%',
				align : 'center'
			}, {
				field : 'jciRegisterTime',
				title : '登记时间',
				width : '15%',
				align : 'center'
			}] ],
			width : '100%',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				$('#monthlyBills_index').val(rowIndex);
				readonlyMonthlyBills(rowData)
				_jciJhpId = rowData.jciJhpId;
			},
		});
		// 应收记录表取数据
		queryInstallment(1,0)
	}
	// 初始化客户信息表
	if (title == '客户信息') {
		$('#populationDg').datagrid({
			columns : [ [ {
				field : 'popName',
				title : '姓名',
				width : '15%',
				align : 'center'
			}, {
				field : 'popRelation',
				title : '与承租人关系',
				width : '15%',
				align : 'center'
			},{
				field : 'popTelephone',
				title : '电话号码',
				width : '15%',
				align : 'center'
			}, {
				field : 'popIdcard',
				title : '身份证',
				width : '25%',
				align : 'center'
			}, {
				field : 'contStatus',
				title : '状态',
				width : '15%',
				align : 'center'
			}, {
				field : 'popNameRemark',
				title : '姓名备注',
				width : '15%',
				align : 'center'
			}] ],
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				$('#population_index').val(rowIndex);
				populationDetailedDlg(rowData);
			}
		});
		queryPopulation(1, 0);
	}
	// 初始化家私电器
	if (title == '家私电器') {
		queryAsset(1,0);
	}
	// 月度能源历史账单
	if (title == '能源卡号') {
		//能源卡号
		$('#energyCardInfoTable').datagrid({
			columns : [ [ {
				field : 'jdcnCardName',
				title : '类型',
				width : '15%',
				align : 'center'
			}, {
				field : 'jdcnCardNumber',
				title : '用户编号',
				width : '20%',
				align : 'center'
			}, {
				field : 'jdcnMeterNumber',
				title : '表号',
				width : '20%',
				align : 'center'
			}, {
				field : 'jdcnBelongingToPeople',
				title : '归属人',
				width : '15%',
				align : 'center'
			}, {
				field : 'jdcnIdCard',
				title : '证件号码',
				width : '15%',
				align : 'center'
			}, {
				field : 'jdcnTelephone',
				title : '电话',
				width : '15%',
				align : 'center'
			} ] ],
			width : '100%',
			height: '152px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				updateCard();
			},
		});
		queryCard(1, 0);
		//能源账单
		$('#accountReceivableTable').datagrid({
			columns : [ [ {
				field : 'jciFukuanri',
				title : '账单日',
				width : '12%',
				align : 'center'
			}, {
				field : 'waterThis',
				title : '水表读数',
				width : '12%',
				align : 'center'
			}, {
				field : 'waterDate',
				title : '抄表日期',
				width : '12%',
				align : 'center'
			}, {
				field : 'electThis',
				title : '电表读数',
				width : '12%',
				align : 'center'
			}, {
				field : 'electDate',
				title : '抄表日期',
				width : '12%',
				align : 'center'
			}, {
				field : 'gasThis',
				title : '气表读数',
				width : '12%',
				align : 'center'
			}, {
				field : 'gasDate',
				title : '抄表日期',
				width : '12%',
				align : 'center'
			}, {
				field : 'jciState',
				title : '账单状态',
				width : '16%',
				align : 'center'
			} ] ],
			width: '100%',
			height: '277px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				$('#energyBill_index').val(rowIndex);
				energyBillDlg(rowData);
			}
		});
		queryAccountReceivable(1,0);
	}
	// 短信记录
	if (title == '短信记录') {
		$('#sendMessageTable').datagrid({
			columns : [ [ {
				field : 'addCommunity',
				title : '楼盘名称',
				width : '25%',
				align : 'center'
			},{
				field : 'popName',
				title : '客户姓名',
				width : '10%',
				align : 'center'
			}, {
				field : 'popTelephone',
				title : '电话',
				width : '10%',
				align : 'center'
			}, {
				field : 'smState',
				title : '发送状态',
				width : '10%',
				align : 'center',
				formatter:function(value,row, index){
					if (row.smState =='发送成功') {
						return "<a style='text-decoration:none;color:green;'>"+row.smState+"<a>";
					}else if (row.smState =='推送成功'){
						return "<a style='text-decoration:none;color:orange;'>"+row.smState+"<a>";
					}else if (row.smState =='发送失败'){
						return "<a style='text-decoration:none;color:red;'>"+row.smState+"<a>";
					}else if (row.smState =='推送失败'){
						return "<a style='text-decoration:none;color:red;'>"+row.smState+"<a>";
					}else if (row.smState =='推送中'){
						return "<a style='text-decoration:none;'>"+row.smState+"<a>";
					}else if (row.smState =='余额不足'){
						return "<a style='text-decoration:none;color:blue;'>"+row.smState+"<a>";
					}else if (row.smState =='回复信息'){
						return "<a style='text-decoration:none;color:brown;'>"+row.smState+"<a>";
					}else{
						return row.smState;
					}
				}
			}, {
				field : 'smTreatmentStatus',
				title : '处理状态',
				width : '10%',
				align : 'center'
			}, {
				field : 'smUserName',
				title : '发送人',
				width : '10%',
				align : 'center'
			},{
				field : 'smDataTime',
				title : '发送时间',
				width : '15%',
				align : 'center'
			}, {
				field : 'smCount',
				title : '短信条数',
				width : '10%',
				align : 'center'
			} ] ],
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns: true,
			onDblClickRow : function(rowIndex, rowData) {
				$(".message_index").val(rowIndex);
				readonlyMessageDlg(rowData);
			}
		});
		querySendMessage(1, 0);
	}
	//房间照片
	if (title == '房间照片') {
		check_hstab_img();
	}
	//智能设备
	if(title == '智能设备'){
		$('#deviceInfoTable').datagrid();
		$("#deviceListTable").datagrid();
		queryDeviceInfo();
	}
}


//审批查看窗口
function seeEvent(eaId){
	var row = $("#eventInfoTable").datagrid("getSelected");
	if (eaId != undefined) {
		var rows = $("#eventInfoTable").datagrid("getRows");
		for (var i in rows) {
			if (rows[i].eaId == eaId) {
				row = rows[i];
			}
		}
	}
	//将信息映射到表格中
	for (var i in row) {
		$('#seeEventDlg table.eventInfo .' + i).html(row[i]);
	}
	//按钮显示/隐藏
	if(row.eaEventState == "处理中" && row.eaEventHandler == _loginUserId){
		$("#openHandleBtn").show();
		if (row.eaAmountInvolved !=0 && row.eaWhetherGenerateRecord == '否') {
			$('#account').show();
		} else {
			$('#account').hide();
		}
	}else{
		$("#openHandleBtn").hide();
		$('#account').hide();
	}
	//付款信息表格显示/隐藏
	if (row.eaWhetherGenerateRecord == '是') {
		$('.payInfo').show();
	} else {
		$('.payInfo').hide();
	}
	//收款账户显示/隐藏
	if (row.eaBankName == '' && row.eaBankUsername == '' && row.eaBankAccountNumber == '') {
		$('.shoukuanzhanghu').hide();
	} else {
		$('.shoukuanzhanghu').show();
	}
	//赋值
	$("#eaId").val(row.eaId);
	$("#handlerId").val(_loginUserId);
	$("#handlerName").val(_loginUserName);
	if(row.eaHomeType != "其他审批"){
		$(".houseAddress").html(row.detailAddress);
	}else{
		$(".houseAddress").html(row.keyAdministrator);
	}
	$("#rentId").val(row.eaRentId);
	$("#storeId").val(row.eaStoreId);
	$("#houseId").val(row.eaHouseId);
	$('#eaApprovalNumber1').html(row.eaApprovalNumber);
	$(".eaAmountInvolved2").html(convertCurrency(row.eaAmountInvolved));
	var eaId = $("#eaId").val();
	$.post("../selectEventApprovalById.action",{
		eaId : eaId
	},function(data){
		data=data.body[0];
		var imgNum = data.eaImgNum;
		var img = imgNum.split("/")[0];
		var file = imgNum.split("/")[1];
		$(".attachmentNumHandle").html("（图片：" + img + "张    文件：" + file + "个）");
		$('#addCity').val(data.addCity);
		$('#addCommunity').val(data.addCommunity);
	});
	if (row.eaFinancialCoding != '') {
		$.post("../queryFinancialCommon.action",{
			jfFinancialCoding : row.eaFinancialCoding,
		},function(data){
			data=data.body[0];
			for (var i in data) {
				$('#seeEventDlg table.payInfo .' + i).html(data[i]);
			}
		});
	}
	$("#seeEventDlg").dialog({
		title : "查看 " + row.eaEventType +" 审批单",
		top : getTop(500),
		left : getLeft(650),
		width : 650,
		height : 530,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#seeEventDlg [notes="notes"]').val('');
		}
	});
	$("#seeEventDlg").dialog('open');
	if ($('#showProcessTable').hasClass('datagrid-f')) {

	} else {
		$('#showProcessTable').datagrid({
			columns : [ [
				{
					field : 'node',
					title : '审批节点',
					width : 15,
					align : 'center'
				},
				{
					field : 'name',
					title : '审批人',
					width : 15,
					align : 'center'
				},
				{
					field : 'advise',
					title : '审批意见',
					width : 45,
					align : 'center'
				},
				{
					field : 'time',
					title : '审批时间',
					width : 25,
					align : 'center'
				} ] ],
			width : '100%',
			height : '100%',
			singleSelect : true,
			autoRowHeight : false,
			pagination : false,
			pageSize : 10,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#showProcessTable').datagrid('getSelected');
				showHandleInfo(row);
			}
		});
	}
	queryEventProcess(row);
}

//查审批流程记录
function queryEventProcess(row) {
	$('#showProcessTable').datagrid({
		data : [],
	});
	if(row.eaTreatmentOpinion != null && row.eaTreatmentOpinion != ""){	
		var data = eval('(' + '[' +  row.eaTreatmentOpinion.getRealJsonStr().replace(/\n/g, "&nbsp;&nbsp;&nbsp;&nbsp;") + ']' + ')');
		var inData = "";
		if(data.length == 1){
			$('#showProcessTable').datagrid({
				data : data,
			});
		}else{
			for(var i=data.length-1;i>=0;i--){
				if(i==data.length-1){
					inData += JSON.stringify(data[i]);
				}else{
					inData += ","+JSON.stringify(data[i]);
				}
			}
			inData = eval('(' + "[" + inData + "]" + ')');
			$('#showProcessTable').datagrid({
				data : inData,
			});
		}
	}else{
		$('#showProcessTable').datagrid({
			data : [],
		});
	}
}

function detailHouseInfo(){
	var row = $('#sourceInfoDg').datagrid('getSelected');
	$('#followInfoTables').datagrid({
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
		}, {
			field : 'jhfFollowBelong',
			title : '跟进归属',
			width : '10%',
			align : 'center'
		}, {
			field : 'jhfFollowRemark',
			title : '跟进内容',
			width : '45%',
			align : 'center'
		} ] ],
		width : '100%',
		height : '202px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		// 表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			$('#followPicture1').show();
			$('#followPicture').hide();
			downFollowInfo(rowData);
		},
		onClose : function() {
			$("#followInfoTable1 input").val('');
		}
	});
	var page=1;
	var startNum = (parseInt(page) - 1) * 12;
	var endNum = 12;
	$.post('../assetsInRentDb.action', {
		startNum : startNum,
		endNum : endNum,
		saHouseStoreId : row.hrHouse4storeId
	}, function(data){
		$('#assetsTable').datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				$("#assetInfo_index").val(rowIndex);
				$('#assetInfoTabs').tabs({
					plain : true,
					fit : true,
					border	: false,
					onSelect : function(title, index) {
						// 获得点击选项卡的列数，调用表格初始化
						initAssetTable(index);
					}
				});
				$("#assetInfoTabs").tabs("select", 0);
				openAssetInfo();
				queryAssetFollow();
			}
		});
		if (data.code < 0) {
			dbSourcePage(0, 0, 14);
			$('#assetsTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 14);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$('#assetsTable').datagrid('loadData', data.body);
		}
	});
	$("#roomInfoTab").tabs("select", -1);
	rentedDataLoading(row)
	queryFollow1(row, 1, 0);
}

function showHandleInfo(row){
	$('#handleInfo').dialog({
		title : '详细处理信息',
		top : getTop(300),
		left : getLeft(600),
		width : 600,
		height : 300,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#handleInfo span').text('');
		},
	});
	for(var i in row){
		if(i == "advise"){
			$('#readHandle_'+i).html(row[i].replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "<br/>"));
		}else{
			$('#readHandle_'+i).html(row[i]);
		}
	}
	$('#handleInfo').dialog('open');
}
//上一条下一条
function laterOrNext2(type) {
	var dataIndex = $("#event_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;

			$("#event_index").val(num);
			changeData = $('#eventInfoTable').datagrid('getData').rows[num];
			$('#eventInfoTable').datagrid('selectRow',num); 

		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#eventInfoTable").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#event_index").val(num);
			changeData = $('#eventInfoTable').datagrid('getData').rows[num];
			$('#eventInfoTable').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的最后一条!');
			return false;
		}
	}
	if (changeData.length != 0) {
		for (var i in changeData) {
			if (changeData[i] == null) {
				changeData[i] = '';
			}
		}
		seeEvent();
	}
}

//查看能源账单
function energyBillDlg(row){
	$("#energyBillDlg").dialog({
		title : '查看能源账单',
		top : getTop(190),
		left : getLeft(660),
		width : 660,
		height : 190,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#energyBillDlg [clear="clear"]').val('');
			$('#energyBillDlg [clear="clear"]').html('');
			$('#energyBillDlg [choose="choose"]').val('');
		}
	});
	var data = {};
	data.jciState = row.jciState;
	data.jciFukuanri = row.jciFukuanri;
	if (row.jciMessageNote.getRealJsonStr() != '') {
		var jciMessageNote = JSON.parse(row.jciMessageNote.getRealJsonStr());
		data.waterThis = jciMessageNote.waterThis;
		data.waterLast = jciMessageNote.waterLast;
		data.waterNum = mySub(data.waterThis, data.waterLast);
		data.water = jciMessageNote.msg.water;
		data.waterDate = jciMessageNote.waterDate;
		
		data.electThis = jciMessageNote.electThis;
		data.electLast = jciMessageNote.electLast;
		data.electNum = mySub(data.electThis, data.electLast);
		data.elect = jciMessageNote.msg.elect;
		data.electDate = jciMessageNote.electDate;
		
		data.gasThis = jciMessageNote.gasThis;
		data.gasLast = jciMessageNote.gasLast;
		data.gasNum = mySub(data.gasThis, data.gasLast);
		data.gas = jciMessageNote.msg.gas;
		data.gasDate = jciMessageNote.gasDate;
	}
	for (var i in data) {
		$('#energyBillDlg .' + i).val(data[i]);
	}
	$("#energyBillDlg").dialog('open');
}


//收支记录表导入信息
function queryFinancial(page, type) {
	
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	
	var jfNatureOfThe= $('#financilSearchJfNatureOfThe').val();
	var jfBigType= $('#financilSearchJfBigType').val();
	var jfAccountingSpecies= $('#financilSearchJfAccountingSpecies').val();
	
	var jfTheOwnershipType= $('#searchJfTheOwnershipType').find('option:selected').text();
	
	var startTime =  $('#searchJfCheckInTimeStart').val();
	var endTime =  $('#searchJfCheckInTimeEnd').val();

	endTime = new Date(endTime);
	endTime.setDate(endTime.getDate() + 1);
	endTime =  formatDate(endTime);
	
	$.post("../financialInRentDb.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		jfNatureOfThe		: jfNatureOfThe,
		jfBigType			: jfBigType,
		jfAccountingSpecies	: jfAccountingSpecies,
		jfTheOwnershipType	: jfTheOwnershipType,
		startTime			: startTime,
		endTime				: endTime,
		jfHouse4storeId 	: _houseStoreCoding
	}, function(data) {
		if (data.code<0) {
			dbSourcePage(0, 0, 3);
			$('#paymentInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				dbSourcePage(data[0].totalNum, page, 3);
			}
			$("#paymentInfoTable").datagrid("loadData", data);
		}
	}, "json");
}
//租客合约
function queryRenterContinue(page,type){
	var startNum = (parseInt(page) - 1) * 4;
	var endNum = 4;

	$.post("../renewalRenterInRentDb.action", {
		startNum:startNum,
		endNum:endNum,
		jrrRenterId : _houseRenterId,
		jrrHouse4rentId : _houseRentCoding
	}, function(data) {
		if(data.code<0){
			dbSourcePage(0,0,16);
			$("#renewalContinueTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			console.log(data);
			for(var i = 0 ; i < data.length;i++){
				// 判断是否为电子签
				if(data[i].jrrTypeOfContract == 2){
					$.ajax({
			             type: "POST",
			             url: "../getContractImg.action",
			             async:false,
			             data: {
			            	 no : data[i].jrrElectronicContractNo
			             },
			             iiindex:i,
			             dataType: "json",
			             success: function(result){
			            	
			            	 if(result.code == 0){
			            		 data[this.iiindex].contractImgPaths = result.body;
			            		 var imgNum = parseInt(data[this.iiindex].jrrImgNum.split("/")[0]);
			            		 imgNum += result.body.length;
			            		 var jrrImgNum = imgNum + "/" + data[this.iiindex].jrrImgNum.split("/")[1];
			            		 data[this.iiindex].jrrImgNum = jrrImgNum;
			            		 console.log(data)
			            	 }else{
			            		 myTips(result.msg,"error");
			            	 }
		                 }
			         });
				}
			}
			if(page == 1 && type == 0){
				dbSourcePage(data[0].totalNum,page,16);
			}
			$("#renewalContinueTable").datagrid("loadData", data);
		}
		
	}, "json");
}

//房东合约
function queryLandlordContinue(page,type){
	var startNum = (parseInt(page) - 1) * 4;
	var endNum = 4;

	$.post("../renewalLandlordInRentDb.action", {
		startNum:startNum,
		endNum:endNum,
		jrlLandlordId : _houseLandlordId,
		jrlHouse4storeId : _houseStoreCoding,
	}, function(data) {
		if(data.code<0){
			dbSourcePage(0,0,17);
			var noData = [];
			$("#landlordContinueTable").datagrid({
				data : noData,
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if(page == 1 && type == 0){
				dbSourcePage(data[0].totalNum,page,17);
			}
			$("#landlordContinueTable").datagrid("loadData", data);
		}
		
	}, "json");
}
//跟进记录
function queryFollowDb(page,type){
	var startNum = (parseInt(page) - 1) * 14;
	var endNum = 14;
	var jhfPaymentWay = $('#mainFollowType').val();
	// 跟进记录表取数据
	$.post("../housingFollowInRentDb.action", {
		startNum:startNum,
		endNum:endNum,
		jhfPaymentWay:jhfPaymentWay,
		jhfHouse4storeId : _houseStoreCoding,
	}, function(data) {
		if(data.code<0){
			dbSourcePage(0,0,5);
			$("#inFollowInfoTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if(page == 1 && type == 0){
				dbSourcePage(data[0].totalNum,page,5);
			}
			$("#inFollowInfoTable").datagrid("loadData", data);
		}
		
	}, "json");
}

//维修数据
function queryRepair(page,type){
	var pageSize = 15;
	var startPage = (parseInt(page) - 1) * pageSize;
	//维修记录表取数据
	$.post("../selectRepairCommon.action", {
		startNum 		: startPage,
		endNum 			: pageSize,
		repHouse4rentId : _houseRentCoding,
		splitFlag		: 1,
	}, function(data) {
		if (data.code < 0) {
			$("#repairInfoTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			notCountPage(page, 0 ,"queryRepair","repairInfo");
			return;
		}
		data = data.body;
		if(data.length<pageSize){
			notCountPage(page, 2 , "queryRepair","repairInfo");
		}else{
			notCountPage(page, 1 , "queryRepair","repairInfo");
		}
		for (var i in data) {
			for(var j in data[i]){
				if(data[i][j]==null){
					data[i][j]='';
				}
			}
			data[i].totalPage = taskCostTime(data[i].repReportingTime,data[i].repUseTime);
			if ((data[i].repHouse4rentId != null && data[i].repHouse4rentId != '')||(data[i].repHouse4storeId != null && data[i].repHouse4storeId != '')||(data[i].repHouseId != null && data[i].repHouseId != '')) {
				data[i].startNum = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			} else {
				data[i].startNum = '无地址维修';
			}
		}
		$("#repairInfoTable").datagrid("loadData", data);
	});
}
//维保-统计分页总条数
function getrepairInfoPageCount(page){
	var pageSize = 15;
	$.post('../selectRepairCommon.action',{
		repHouse4rentId : _houseRentCoding,
		splitFlag	: 0
	},function(data){
		if (data.code < 0 || data.body[0].totalNum == 0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"repairInfo",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"repairInfo",0);
		}
	})
}

//任务数据
function virtualRepair(page){
	var pageSize = 5;
	var startPage = (parseInt(page) - 1) * pageSize;
	$.post('../queryTaskCommon.action',{
		startNum           : startPage,
		endNum             : pageSize,
		repHouse4rentId    : _houseRentCoding,
		splitFlag	: 1
	},function(data){
		if (data.code<0) {
			$('#virtualRepairTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			notCountPage(page, 0 ,"virtualRepair","virtualRepair");
		} else {
			data=data.body;
			if(data.length<pageSize){
				notCountPage(page, 2 , "virtualRepair","virtualRepair");
			}else{
				notCountPage(page, 1 , "virtualRepair","virtualRepair");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
			}
			for(var i in data){
				var addCity = data[i].addCity;
				if(addCity == '项目' || addCity == '库房' || addCity == '供应商' || addCity == '公区'){
					data[i].addCommunity = addCity;
				}
				if(addCity != '项目' && addCity != '库房' && addCity != '供应商' && addCity != '公区'){
					data[i].keyAdministrator = data[i].addCommunity+data[i].addBuilding+data[i].addDoorplateno;
				}
				if((data[i].repHouseId == null || data[i].repHouseId == '') && (data[i].repHouse4rentId == null || data[i].repHouse4rentId == '')
						&& (data[i].repHouse4storeId == null || data[i].repHouse4storeId == '')){
					data[i].keyAdministrator = '无归属任务';
				}
				if(data[i].repUseTime == null || data[i].repUseTime == ''){
					data[i].repUseTime = '未完成';
					if(data[i].repToReceive != '未领取'){
						data[i].endTime = getDays(getNowFormatDate() ,data[i].repToReceive);
					}else{
						data[i].endTime = '未领取';
					}
				}else{
					//领取时间repToReceive
					if(data[i].repToReceive != '未领取'){
						data[i].endTime = getDays(data[i].repUseTime, data[i].repToReceive);
					}else{
						data[i].endTime = '未领取';
					}
				} 
			}
			$("#virtualRepairTable").datagrid("loadData", data);
		}
	})
}
function getvirtualRepairPageCount(page){
	var pageSize = 5;
	$.post('../queryTaskCommon.action',{
		repHouse4rentId    : _houseRentCoding,
		splitFlag	: 0
	},function(data){
		if (data.code < 0 || data.body[0].totalNum == 0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"virtualRepair",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"virtualRepair",0);
		}
	})
}
//审批数据
function queryEvent(page,type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	$.post("../eventApprovalInRentDb.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		eaStoreId	: _houseStoreCoding,
		eaRentId    : _houseRentCoding,
	},function(data){
		if (data.code<0) {
			$("#eventInfoTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			dbSourcePage(0,0,4);
		} else {
			data=data.body;
			if (page == 1 && type == 0) {
				dbSourcePage(data[0].totalNum, page,4);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].totalPage = taskCostTime(data[i].eaReleaseTime,data[i].eaUseTime);
				
				if ((data[i].eaRentId != null && data[i].eaRentId != '')||(data[i].eaStoreId != null && data[i].eaStoreId != '')||(data[i].eaHouseId != null && data[i].eaHouseId != '')) {
					data[i].detailAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
				} else {
					data[i].detailAddress = '';
				}
				if(data[i].eaHomeType == "其他审批" || data[i].eaHomeType == "日常事务" || data[i].eaHomeType == "项目事务"){
					data[i].detailAddress = data[i].keyAdministrator;
				}
			}
			$("#eventInfoTable").datagrid("loadData", data);
		}
		
	});
}
//查询业主账单
function queryPayable(page,type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var searchLaJciState = $("#searchLaJciState").val();
	var theSortTerm, theSortContrary;
	if(searchLaJciState == '已付'){
		theSortTerm = 2;
		theSortContrary = 2;
	}else if(searchLaJciState == '待付'){
		theSortTerm = 2;
		theSortContrary = 1;
	}else{
		theSortTerm = 2;
		theSortContrary = 1;
	}
	$.post("../queryLandlordBillCommon.action", {
		startNum : startNum,
		endNum : endNum,
		jciState : searchLaJciState,
		hsId : _houseStoreCoding,
		theSortTerm : theSortTerm,
		theSortContrary : theSortContrary,
	},function(data){
		if(data.msg){
			
		}else{
			data = eval(data);
		}
		if (data.code < 0 || data.body.length == 0) {
			dbSourcePage(0,0,11);
			$("#payableInfoTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg != '' ? data.msg : '没有查询到符合条件的记录！'
			});
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum,page,11);
			}
			for (var i in data.body) {
				if (data.body[i].jciAudit != null) {
					data.body[i].jciAudit = data.body[i].jciAudit.substring(1, data.body[i].jciAudit.length - 1);
					var audit = JSON.parse(data.body[i].jciAudit);
					for (var j in audit) {
						data.body[i][j] = audit[j];
					}
				}
			}
			$("#payableInfoTable").datagrid("loadData", data.body);
		}
	});
}
//应收记录表取数据
function queryInstallment(page,type){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var jciState = $("#searchJciState").val();
	var sort = 0;
	if(jciState == '已收'){
		sort = 1
	}else if(jciState == '待收'){
		sort = 2
	}else{
		sort = 2
	}
	$.post("../payableFromRenterInRentDb.action", {
		startNum : startNum,
		endNum : endNum,
		jciState : jciState,
		contractType : "renter",
		jciHouse4rentId:_houseRentCoding,
		sort : sort//按期数倒序排列
	},function(data){
		if(data.code<0){
			dbSourcePage(0,0,12);
			$("#receivableInfoTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if(page == 1 && type == 0){
				dbSourcePage(data[0].totalNum,page,12);
			}
			$("#receivableInfoTable").datagrid("loadData",data);
		}
	}, "json");
}
//家私电器信息导入
function queryAsset(page, type) {
	var startNum = (parseInt(page) - 1) * 12;
	var endNum = 12;
	$.post('../assetsInRentDb.action', {
		startNum : startNum,
		endNum : endNum,
		saHouseStoreId : _houseStoreCoding
	}, function(data){
		$('#assetsInfoTable').datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				$("#assetInfo_index").val(rowIndex);
				$('#assetInfoTabs').tabs({
					plain : true,
					fit : true,
					border	: false,
					onSelect : function(title, index) {
						// 获得点击选项卡的列数，调用表格初始化
						initAssetTable(index);
					}
				});
				$("#assetInfoTabs").tabs("select", 0);
				openAssetInfo();
				queryAssetFollow();
			}
		});
		if (data.code < 0) {
			dbSourcePage(0, 0, 14);
			$('#assetsInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 14);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$('#assetsInfoTable').datagrid('loadData', data.body);
		}
	});
}
//添加已租，资产列表信息导入
function queryAsset2(page, type) {
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	$.post('../assetsInRentDb.action', {
		startNum : startNum,
		endNum : endNum,
		saHouseStoreId : _houseStoreCoding
	}, function(data){
		if (data.code < 0) {
			dbSourcePage(0, 0, 21);
			$('#assetsInfoTable2').datagrid('loadData', []);
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 21);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1) {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$('#assetsInfoTable2').datagrid('loadData', data.body);
		}
	});
}

function queryPopulation(page, type) {
	var startNum = (parseInt(page) - 1) * 14;
	var endNum = 14;
	var popName = $("#searchResidentName").val();
	var popTelephone = $("#searchResidentPhone").val();
	var popIdcard = $("#searchResidentIdCard").val();
	var reType = $("#searchRtType").val();
	// 查已租房所有相关人员
	$.post("../selectPopulationByHrId.action", {
		startNum : startNum,
		endNum : endNum,
		popName:popName,
		popTelephone:popTelephone,
		popIdcard:popIdcard,
		rtType:reType,
		hrId:_houseRentCoding
	}, function(data) {
		if (data.code<0) {
			$('#populationDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			data=data.body;
			for (var i in data) {
				console.log(data)
				if(data[i].popRelation == '租客'){
					_phoneNumber = data[i].popTelephone;
				}
				for ( var j in data[i]) {
					if (data[i][j] == null) {
						data[i][j] = '';
					}
				}
			}
			$("#populationDg").datagrid("loadData", data);
		}
	}, "json");
}
//月度能源历史账单
function queryAccountReceivable(page, type){
	/*var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	$.post("../selectMonthlyAccountReceivable.action", {
		startNum : startNum,
		endNum : endNum,
		jmarRentId : _houseRentCoding
	},function(data){
		if(data.code<0){
			dbSourcePage(0,0,15);
			$("#accountReceivableTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			if(page == 1 && type == 0){
				dbSourcePage(data[0].totalNum,page,15);
			}
			$("#accountReceivableTable").datagrid("loadData",data);
		}
	}, "json");*/
	var startNum = (parseInt(page) - 1) * 10;
	var endNum = 10;
	$.post("../payableFromRenterInRentDb.action", {
		startNum : startNum,
		endNum : endNum,
		jciState : '已收',
		contractType : "renter",
		jciHouse4rentId:_houseRentCoding,
		sort :1//按期数倒序排列
	},function(data){
		if(data.code<0){
			dbSourcePage(0,0,15);
			$("#accountReceivableTable").datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			console.log(data);
			if(page == 1 && type == 0){
				dbSourcePage(data[0].totalNum,page,15);
			}
			for (var i in data) {
				if (data[i].jciMessageNote != null && data[i].jciMessageNote != '') {
					var jciMessageNote = JSON.parse(data[i].jciMessageNote.getRealJsonStr());
					data[i].waterThis = jciMessageNote.waterThis;
					data[i].electThis = jciMessageNote.electThis;
					data[i].gasThis = jciMessageNote.gasThis;
					data[i].waterDate = jciMessageNote.waterDate;
					data[i].electDate = jciMessageNote.electDate;
					data[i].gasDate = jciMessageNote.gasDate;
				}
			}
			$("#accountReceivableTable").datagrid("loadData",data);
		}
	});
}
//能源卡号
function queryCard(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	$.post("../selectDailyCardNumber.action", {
		startNum : startNum,
		endNum : endNum,
		jdcnHouse4storeId:_houseStoreCoding
	}, function(data) {
		if (data < 0 || data == '' || data.length == 0) {
			$('#energyCardInfoTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
		} else {
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].addCommunity = data[i].addDistrict + " " + data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#energyCardInfoTable").datagrid("loadData", data);
		}
	});
}
//onkeyup搜索延时器
var msgtimer = null;
function queryMsgOnkeyup(id,nums,type){
	var setTime = nums*100;
	if($("#"+id).val()==''){
		querySendMessage(1, 0);
	}else{
		clearTimeout(msgtimer);
		msgtimer = setTimeout(function(){
			querySendMessage(1, 0);
		}, setTime);
	}
}
//短信记录
function querySendMessage(page, type) {
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	var smNote = $('#searchMessageNote').val();
	$.post("../massage/selectShortMessage.action", {
		startNum 		: startNum,
		endNum 			: endNum,
		smNotRentId		:_houseStoreCoding,	
		totalNum		:"1",
		smNote			: smNote,
	}, function(data) {
		if (data < 0 || data == '' || data.length == 0) {
			dbSourcePage(0, 0, 19);
			var noData = [];
			$('#sendMessageTable').datagrid({
				data : noData,
				view : myview,
				emptyMsg : '没有查询到符合条件的记录！'
			});
		} else {
			if(page == 1 && type == 0){
				dbSourcePage(data[0].totalNum,page,19);
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].addCommunity = data[i].addDistrict + " " + data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}
			$("#sendMessageTable").datagrid("loadData", data);
		}
	}, "json");
}
function dbSourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 3) {
		pageNum = Math.ceil(totalNum / 15);
		$("#financialPage").remove();
		$("#financialPageDiv").append("<div class='tcdPageCode' id='financialPage' style='text-align:center;'></div>");
		$("#financialPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryFinancial(p, 1);
				}
			}
		});
	}
	if (type == 4) {
		pageNum = Math.ceil(totalNum / 15);
		$("#eventInfoPage").remove();
		$("#eventInfoPageDiv").append("<div class='tcdPageCode' id='eventInfoPage' style='text-align:center;'></div>");
		$("#eventInfoPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryEvent(p, 1);
				}
			}
		});
	}
	if (type == 5) {
		pageNum = Math.ceil(totalNum / 14);
		$("#followDbPage").remove();
		$("#followDbPageDiv").append("<div class='tcdPageCode' id='followDbPage' style='text-align:center;'></div>");
		$("#followDbPage").createPage({
			onePageNums : 14,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryFollowDb(p, 1);
				}
			}
		});
	}
	if (type == 11) {
		pageNum = Math.ceil(totalNum / 15);
		$("#payableInfoPage").remove();
		$("#payableInfoPageDiv").append("<div class='tcdPageCode' id='payableInfoPage' style='text-align:center;'></div>");
		$("#payableInfoPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryPayable(p, 1);
				}
			}
		});
	}
	if (type == 12) {
		pageNum = Math.ceil(totalNum / 15);
		$("#receivableInfoPage").remove();
		$("#receivableInfoPageDiv").append("<div class='tcdPageCode' id='receivableInfoPage' style='text-align:center;'></div>");
		$("#receivableInfoPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					$('#monthlyBills_index').val(0);
					queryInstallment(p, 1);
				}
			}
		});
	}
	if (type == 14) {
		pageNum = Math.ceil(totalNum / 12);
		$("#assetPage").remove();
		$("#assetsPageDiv").append("<div class='tcdPageCode' id='assetPage' style='text-align:center;'></div>");
		$("#assetPage").createPage({
			onePageNums:12,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAsset(p, 1);
				}
			}
		});
	}
	if (type == 15) {
		pageNum = Math.ceil(totalNum / 10);
		$("#accountReceivablePage").remove();
		$("#accountReceivablePageDiv").append("<div class='tcdPageCode' id='accountReceivablePage' style='text-align:center;'></div>");
		$("#accountReceivablePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAccountReceivable(p, 0);
				}
			}
		});
	}
	if (type == 16) {
		pageNum = Math.ceil(totalNum / 4);
		$("#RenterContinuePage").remove();
		$("#RenterContinuePageDiv").append("<div class='tcdPageCode' id='RenterContinuePage' style='text-align:center;'></div>");
		$("#RenterContinuePage").createPage({
			onePageNums:4,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterContinue(p, 0);
				}
			}
		});
	}
	if (type == 17) {
		pageNum = Math.ceil(totalNum / 4);
		$("#landlordContinuePage").remove();
		$("#landlordContinuePageDiv").append("<div class='tcdPageCode' id='landlordContinuePage' style='text-align:center;'></div>");
		$("#landlordContinuePage").createPage({
			onePageNums:4,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryLandlordContinue(p, 0);
				}
			}
		});
	}
	if (type == 18) {
		pageNum = Math.ceil(totalNum / 4);
		$("#renterHisContinuePage").remove();
		$("#renterHisContinuePageDiv").append("<div class='tcdPageCode' id='renterHisContinuePage' style='text-align:center;'></div>");
		$("#renterHisContinuePage").createPage({
			onePageNums:4,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterHisContinue(p, 0);
				}
			}
		});
	}
	if (type == 19) {
		pageNum = Math.ceil(totalNum / 15);
		$("#sendMessagePage").remove();
		$("#sendMessagePageDiv").append( "<div class='tcdPageCode' id='sendMessagePage' style='text-align:center;'></div>");
		$("#sendMessagePage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					querySendMessage(p, 0);
				}
			}
		});
	}	
	if (type == 20) {
		pageNum = Math.ceil(totalNum / 5);
		$("#assetsListTablePage").remove();
		$("#assetsListTablePageDiv") .append( "<div class='tcdPageCode' id='assetsListTablePage' style='text-align:center;'></div>");
		$("#assetsListTablePage").createPage({
			onePageNums:5,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAssetsList(p, 0);
				}
			}
		});
	}
	if (type == 21) {
		pageNum = Math.ceil(totalNum / 10);
		$("#assetPage2").remove();
		$("#assetsPageDiv2").append("<div class='tcdPageCode' id='assetPage2' style='text-align:center;'></div>");
		$("#assetPage2").createPage({
			onePageNums:8,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryAsset2(p, 1);
				}
			}
		});
	}
	
}
function addResident(){
	// var hsId = _houseStoreCoding;
	// chaDevice1(hsId);
	openAddResident();
}

function chaDevice1(hsId){
	$.ajax({
		type:"post",
		url:"../selectThisHouseDeviceID.action",
		data:{
			jhdHsId:hsId
		},
		dataType:"json",
		success: function(result){
			if(result.code == 1){
				var data = result.body;
				var doorLock = {};
				for(var i in data){
					var brandType = data[i].brandType;
					if(brandType == "门锁"){
						doorLock =  data[i];
						break;
					}
				}
				
				if(JSON.stringify(doorLock) != "{}"){
					$('#doorLock1').val(JSON.stringify(doorLock));
					$('#sendDoorCardCheckDiv').show();
				}
				
			}else{
				myTips(result.msg,"error");
			}
		}
	});
}

function openAddResident(){
	$("#addResidentDbDlg").dialog({
		title : '添加住户',
		top : getTop(280),
		left : getLeft(690),
		width : 690,
		height : 280,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addResidentDbDlg input").val('');
			$("#addResidentDbDlg textarea").val('');
			$("#addResidentDbDlg select").val('');
			$("#addResidentDbDlg img").attr('src','images/userImage.png');
			$('#addResidentDbDlg [clear="clear"]').val('');
			$('#addResidentDbDlg [clear="clear"]').html('');
			$('#addResidentDbDlg [require="require"]').css('border', '1px solid #a9a9a9');
			clearAttachment();
		}
	});
	$("#addResidentSaveDb").show();
	$("#updateResidentSaveDb").hide();
	$("#addrtUserNameDb").val(_loginUserName);
	$("#addipUserIdDb").val(_loginUserId);
	$("#addResidentDbDlg").dialog('open');
}

//添加住户
function doAddResident() {
	showLoading();
	//var identityInformation= $("#identityInformation").val();
//	if(identityInformation!=''){
//		var popIdcardJson = identityInformation;
//	}
	
	//给读取到的信息转成字符串
	var popIdcardJson = JSON.stringify(popIdcardJson1);
	var popValidDate = $("#issuedValidDate").val();
	var popIdIssued = $("#idIssued").val();
	
	var popName = $("#popName").val();
	var popTelephone = $("#popTelephone").val();
	var popIdcardType = $("#popIdcardType").val();
	var popIdcard = $("#popIdcard").val();
	var popSex = $("#popSex").val();
	var popNation =  $("#popNation").val();
	var popMarriageState =  $("#popMarriageState").val();
	var popIdcardAddress =  $("#popIdcardAddress").val();
	var popOccupation =  $("#popOccupation").val();
	var popBirth =  $("#popBirth").val();
	var popDegreeEducation =  $("#popDegreeEducation").val();
	var rtType = $('#addrtTypeDb').val();
	var popNameRemark =  $("#popNameRemark").val();
	var rtHrId = _houseRentCoding;
	$.post("../insertResidentTable.action", {
		popName 			: popName,
		popTelephone 		: popTelephone,
		popPassword         : popTelephone,
		popIdcard			: popIdcard,
		popIdcardType   	: popIdcardType,
		popSex          	: popSex,
		popNation       	: popNation,
		popMarriageState	: popMarriageState,
		popIdcardAddress	: popIdcardAddress,
		popOccupation		: popOccupation,
		popBirth        	: popBirth,
		popDegreeEducation  : popDegreeEducation,
		popNameRemark		: popNameRemark,
		rtHrId				: rtHrId,
		rtType				: rtType,
		rtUrId				: _loginUserId,
		rtDepartmentId		: _loginDepartment,
		rtStorefrontId		: _loginStore,
		registrantName		: _loginUserName,
		popIdcardJson		: popIdcardJson,
		popIdIssued			: popIdIssued,
		popValidDate		: popValidDate,
	}, function(data) {
		if(data==''||data.code==""||data.code==null||data.code<0){
			if(data==''||data.code==""||data.code==null||data.code==-1){
				myTips("添加失败，数据有误！","error");
			}else if(data.code==-2){
				myTips("数据读写失败！","error");
			}else if(data.code==-3){
				myTips("没有此操作权限！","error");
			}else if(data.code==-4){
				myTips("住户已经存在！","error");
			}else if(data.code==-5){
				myTips("盘源已存在！","error");
			}else if(data.code==-6){
				myTips("未租房已经存在！","error");
			}else if(data.code==-21){
				myTips("身份证已存在，已存在身份证的人口姓名与本次填写的姓名不一致！","error");
			}/*else if(data.code==-22){
				myTips("身份证不能为空！","error");
			}*/
			hideLoading();
			return;
		}
		if(data.code==1){
			var row = $('#sourceInfoDg').datagrid('getSelected');

			var js = {
				hsId : row.hrHouse4storeId
			};
			var insertDataStr = JSON.stringify(js);
			var message=row.hrAddCity + row.hrAddDistrict + row.hrAddCommunity + row.hrAddDoorplateno +"新增住户："+popName;
			$.post('http://www.fangzhizun.com/jiekou/campus/sendOut/ShortMessage',{
				co	: _loginCompany,
				coId : _loginCoId,
                telephone 	: _phoneNumber,
                messageStr : message,
				js : insertDataStr,
				inOutType : "2",

			},function(data){
				console.log("短")
				console.log(data)
			});
			myTips("添加成功！", "success");
			hideLoading();
			queryPopulation(1, 0);

			$("#addResidentDbDlg").dialog('close');
		}
	});
}

//修改住户
function doUpdateResident() {
	showLoading();
	var popId = $("#residentPopIdDb").val();
	var popName = $("#residentPopNameDb").val();
	var popTelephone = $("#residentPopPhoneDb").val();
	var popIdcard = $("#residentPopIdcardDb").val();
	var rtId = $("#addrtIdDb").val();
	var rtType = $('#addrtTypeDb').val();
	$.post("../updateResidentTable.action", {
		rtId:rtId,
		rtPlId:popId,
		popName : popName,
		popTelephone : popTelephone,
		popIdcard:popIdcard,
		rtType:rtType,
	}, function(data) {
		if(data==''||data.code==""||data.code==null||data.code<0){
			if(data==''||data.code==""||data.code==null||data.code==-1){
				myTips("修改失败，数据有误！","error");
			}else if(data.code==-2){
				myTips("数据读写失败！","error");
			}else if(data.code==-3){
				myTips("没有此操作权限！","error");
			}else if(data.code==-4){
				myTips("无楼盘字典！","error");
			}else if(data.code==-5){
				myTips("盘源已存在！","error");
			}else if(data.code==-6){
				myTips("未租房已经存在！","error");
			}else if(data.code==-21){
				myTips("身份证已存在，已存在身份证的人口姓名与本次填写的姓名不一致！","error");
			}else if(data.code==-22){
				myTips("身份证不能为空！","error");
			}
			hideLoading();
			return;
		}
		if(data.code==1){
			hideLoading();
			myTips("修改成功！", "success");
			queryPopulation(1, 0);
			$("#addResidentDbDlg").dialog('close');
		}
	});
}

//人口详细窗口
function populationDetailedDlg(row){
	$('#pop_name').val(row.popName);
	$('#pop_telephone').val(row.popTelephone);
	$('#pop_idcard_type').val(row.popIdcardType);
	$('#pop_idcard').val(row.popIdcard);
	$('#pop_sex').val(row.popSex);
	$('#pop_nation').val(row.popNation);
	$('#pop_marriage_state').val(row.popMarriageState);
	$('#pop_idcard_address').val(row.popIdcardAddress);
	$('#pop_occupation').val(row.popOccupation);
	$('#pop_birth').val(row.popBirth);
	$('#pop_degree_education').val(row.popDegreeEducation);
	$('#pop_inner_credit_level').val(row.popInnerCreditLevel);
	$('#pop_outer_credit_level').val(row.popOuterCreditLevel);
	$('#pop_name_remark').val(row.popNameRemark);
	$('#populationDetailedDlg input').attr('disabled', 'disabled');
	$('#populationDetailedDlg select').attr('disabled', 'disabled');
	$('#updateButton').show();
	$('#doUpdateButton').hide();
	
	if(row.popIdcardJson !=''){
		var identityInformation = row.popIdcardJson;
		identityInformation=identityInformation.getRealJsonStr(identityInformation);
		identityInformation=JSON.parse(identityInformation);
		//console.log(identityInformation);		
		var imgData =identityInformation.Certificate.Base64Photo;
		$("#id_img_pers").attr("src","data:image/jpg;base64,"+imgData);
	}
	
	if(row.popResident==1){
		$('#updateLivingMenButton').show();
	}else{
		$('#updateLivingMenButton').hide();
	}
	queryPopulationHouse();
	if (row.popModifyTheRecord != '') {
		$('#followUpInformationTable').datagrid('loadData', JSON.parse(row.popModifyTheRecord.getRealJsonStr()).reverse());
	} else {
		$('#followUpInformationTable').datagrid('loadData', []);
	}
	$('#populationDetailedDlg').dialog({
		title : '客户信息',
		top : getTop(630),
		left : getLeft(750),
		width : 750,
		height : 630,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#populationDetailedDlg [clear="clear"]').val('');
			$("#houseDg").datagrid("loadData", []);
			$("#id_img_pers").attr("src","images/userImage.png");
			$("#pop_idcard_type").val();
			$("#pop_sex").val();
			$("#pop_nation").val();
			$("#pop_idcard_address").val();
			$("#pop_birth").val();
		},
	});
	$('#populationDetailedDlg').dialog("open");
}

//查询房屋下所有的人头
function housePopulationDlg() {
	var row = $("#houseDg").datagrid("getSelected");
	$('#housePopulationDlg').dialog({
		title : '房屋相关人员',
		top : getTop(330),
		left : getLeft(600),
		width : 600,
		height : 330,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#housePopulationDg").datagrid("loadData", []);
		},
	});
	$.post("../selectHousePopulation.action",{
		hsId  : row.hsId,
	}, function(data) {
		if (data.code<0) {
			$('#housePopulationDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data=data.body;
		$("#housePopulationDg").datagrid("loadData", data);
	});
	$('#housePopulationDlg').dialog('open');
}

//查询人头下所有的房屋
function queryPopulationHouse() {
	var row = $("#populationDg").datagrid("getSelected");
	var popId = row.popId;
//	console.log(row)
	$.post("../selectPopulationHouse.action",{
		popId  : popId,
	}, function(data) {
		if (data.code<0) {
			$('#houseDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			return;
		}
		data=data.body;
		for (var i in data) {
			data[i].detailedAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
		}
//		console.log(data);
		$("#houseDg").datagrid("loadData", data);
	});
}
//初始化并打开修改人口对话框
function updateResident(row) {
	$("#addResidentDbDlg").dialog({
		title : '修改住户',
		top : getTop(150),
		left : getLeft(630),
		width : 630,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#addResidentDbDlg input").val('');
			$("#addResidentDbDlg textarea").val('');
			$("#addResidentDbDlg select").val('');
			$("#residentPopIdcardDb").removeAttr("disabled","disabled");
		}
	});
	$("#addResidentSaveDb").hide();
	$("#updateResidentSaveDb").show();

	$('#residentPopIdDb').val(row.rtPlId);
	$('#residentPopNameDb').val(row.popName);
	$('#residentPopPhoneDb').val(row.popTelephone);
	$('#residentPopIdcardDb').val(row.popIdcard);
	$('#residentPopNameRemark').val(row.rPopNameRemark);
	$("#addrtIdDb").val(row.rtId);
	$("#addrtHrIdDb").val(row.rtHrId);
	$('#addrtUserNameDb').val(row.username);
	$('#addrtTypeDb').val(row.rtType);
	
	$("#residentPopIdcardDb").attr("disabled","disabled");
	$("#addResidentDbDlg").dialog('open');
}
//短信详细信息显示
function readonlyMessageDlg(data){
	var row = $('#sendMessageTable').datagrid('getSelected');
	$('#readonlyMessageDlg').dialog({
		title : '短信详细信息',
		top : getTop(230),
		left : getLeft(420),
		width : 420,
		height : 230,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#readonlyMessageDlg input').val('');
			$('#readonlyMessageDlg textarea').val('');
		},
	});
	if(row.smType == '接收' && row.smTreatmentStatus == '未读'){
		$('#readStatus [iconcls="icon-ok"]').css('display','');
	}else{
		$('#readStatus [iconcls="icon-ok"]').css('display','none');
	}
	$('.messageId').val(row.smId);
	$('.messageType').val(row.smType);
	$('.messageStatus').val(row.smState);
	$('.messageCount').val(row.smCount);
	$('.messageTreatmentStatus').val(row.smTreatmentStatus);
	$('.messageName').val(row.popName);
	$('.messagePhone').val(row.popTelephone);
	$('.messageTime').val(row.smDataTime);
	$('.messageContent').val(row.smNote);
	$('.messageField').val(row.smField);
	$('#readonlyMessageDlg').dialog('open');
}
//未租房，资产迁入
function moveInAssets(flag){
	$("#moveInAssetsDlg").dialog({
		title : '迁入资产',
		top : getTop(670),
		left : getLeft(900),
		width : 900,
		height : 670,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveInAssetsDlg [clear="clear"]').val('');
			$('#moveInAssetsDlg [choose="choose"]').val('');
		}
	});
	$('#assetsListTable').datagrid({
		columns : [ [
		{
			field : 'saDetailedAddress',
			title : '地址/项目',
			width : 30,
			align : 'center'
		},
		{
			field : 'saType',
			title : '所属',
			width : 10,
			align : 'center'
		},	
		{
			field : 'saClassify',
			title : '类型',
			width : 10,
			align : 'center'
		},
		{
			field : 'saName',
			title : '名称',
			width : 20,
			align : 'center'
		},
		{
			field : 'saBrand',
			title : '品牌',
			width : 10,
			align : 'center'
		},
		{
			field : 'saModel',
			title : '型号',
			width : 10,
			align : 'center'
		},
		{
			field : 'saStatus',
			title : '状态',
			width : 10,
			align : 'center'
		},
		{
			field : 'saUse',
			title : '使用情况',
			width : 10,
			align : 'center'
		},
		{
			field : 'do',
			title : '添加',
			width : 10,
			align : 'center',
			formatter : function(value, row, index) {
				return "<a href='#' style='color:blue' onclick=\"addOneToNeedTo("+ index +", "+ flag +")\" >添加</a>";
			}
		} ] ],
		width : '100%',
		height : '152px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
		rowStyler : function(index, row) {
			return 'color:#000;';
		},
	});
	
	if ($('#assetsMoveInTable').hasClass('datagrid-f')) {

	} else {
		$('#assetsMoveInTable').datagrid({
			columns : [ [
			{
				field : 'saDetailedAddress',
				title : '地址/项目',
				width : 30,
				align : 'center'
			},
			{
				field : 'saType',
				title : '所属',
				width : 10,
				align : 'center'
			},	
			{
				field : 'saClassify',
				title : '类型',
				width : 10,
				align : 'center'
			},
			{
				field : 'saName',
				title : '名称',
				width : 20,
				align : 'center'
			},
			{
				field : 'saBrand',
				title : '品牌',
				width : 10,
				align : 'center'
			},
			{
				field : 'saModel',
				title : '型号',
				width : 10,
				align : 'center'
			},
			{
				field : 'saStatus',
				title : '状态',
				width : 10,
				align : 'center'
			},
			{
				field : 'saUse',
				title : '使用情况',
				width : 10,
				align : 'center'
			},
			{
				field : 'do',
				title : '取消',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' style='color:red' onclick=\"myDeleteRows('"+row.saId+"','saId','assetsMoveInTable','0')\">删除</a>";
				}
			} ] ],
			width : '100%',
			height : '152px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			rowStyler : function(index, row) {
				return 'color:#000;';
			},
		});
	}
	$("#assetsMoveInTable").datagrid("loadData", []);
	if (flag == 1) {
		$('#doMoveInAssetsButton1').show();
		$('#doMoveInAssetsButton2').hide();
	} else {
		$('#doMoveInAssetsButton1').hide();
		$('#doMoveInAssetsButton2').show();
	}
	$("#moveInAssetsDlg").dialog('open');
	queryAssetsList(1, 0);
}
//资产导入信息
function queryAssetsList(page, type) {
	var startNum = (parseInt(page) - 1) * 5;
	var endNum = 5;
	var searchCommunity = $('#searchCommunity_asset').val();
	var searchBuilding = $('#searchBuilding_asset').val();
	var searchDoorplateno = $('#searchDoorplateno_asset').val();
	var searchVirtualType = $('#searchVirtualType_asset').val();
	var searchVirtualName = $('#searchVirtualName_asset').val();
	var saType = $('#searchSaType').val();
//	var saUse = $('#searchSaUse').val();
	var saNumber = $('#searchSaNumber').val();
	var saName = $('#searchSaName').val();
	var saBrand = $('#searchSaBrand').val();
	var saModel = $('#searchSaModel').val();

	$.post("../assetsInRentDb.action", {
		startNum: startNum,
		endNum : endNum,
		addCommunity: searchCommunity,
		addBuilding: searchBuilding,
		addDoorplateno: searchDoorplateno,
		virtualType: searchVirtualType,
		keyAdministrator: searchVirtualName,
		saType: saType,
//		saUse: saUse,
		saNumber: saNumber,
		saName: saName,
		saBrand: saBrand,
		saModel: saModel,
	}, function(data) {
		if (data.code < 0) {
			dbSourcePage(0, 0, 20);
			$('#assetsListTable').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		} else {
			if (page == 1 && type == 0) {
				dbSourcePage(data.body[0].totalNum, page, 20);
			}
			for (var i in data.body) {
				if (data.body[i].innerVirtualRoom == 1 || data.body[i].outerVirtualRoom == 1 || data.body[i].nonCostVirtualRoom == 1
					|| data.body[i].addCity == '库房' || data.body[i].addCity == '公区' || data.body[i].addCity == '供应商') {
					data.body[i].saDetailedAddress = data.body[i].keyAdministrator;
				} else {
					data.body[i].saDetailedAddress = data.body[i].addCommunity + ' ' + data.body[i].addBuilding + ' ' + data.body[i].addDoorplateno;
				}
			}
			$("#assetsListTable").datagrid("loadData", data.body);
		}
	});
}
//添加一条资产到需要迁入的资产列表里
function addOneToNeedTo(index, flag){
	var row = $('#assetsListTable').datagrid('getData').rows[index];
	var rows = $('#assetsMoveInTable').datagrid('getRows');
	var rows2 = $('#assetsInfoTable').datagrid('getRows');
	if (flag == 1) {
		rows2 = $('#assetsInfoTable').datagrid('getRows');
	} else {
		rows2 = $('#assetsInfoTable2').datagrid('getRows');
	}
	for (var i in rows) {
		if (rows[i].saId == row.saId) {
			myTips('此条资产已经添加到下方列表！','error');
			return;
		}
	}
	for (var i in rows2) {
		if (rows2[i].saId == row.saId) {
			myTips('该资产已在该房内，无需迁移！','error');
			return;
		}
	}
	$('#assetsMoveInTable').datagrid('insertRow', {
		index : 0,
		row : row
	});
}
//执行迁入资产
function doMoveInAssets(flag){
	var rows = $("#assetsMoveInTable").datagrid('getRows');	
	if (rows.length == 0) {
		myTips('请先将待迁入的资产添加到下方列表！', 'error');
		return;
	}
	var checkFlag = 0;
	$('#moveInAssetsDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	
	var agentName = $('#pickHtManagerinShowUserInfo').val().split(' ')[$('#pickHtManagerinShowUserInfo').val().split(' ').length-1];
//	var agentName = $('#move_in_asset_staff option:selected').text();
	var moveReason = $('#move_in_asset_reason').val();
	var jsonArray = [];
	for (var i in rows) {
		var jsonObject = {
			registrantName: _loginUserName,
			saRegistrant: _loginUserId,
			department: _loginDepartment,
			storefront: _loginStore,
			agentName: agentName,
			moveReason: moveReason,
			saId: rows[i].saId,
			saHouseStoreId: _houseStoreCoding,
			saHouseId: _houseCoding,
			saMoveFrom: rows[i].saDetailedAddress,
			saMoveTo: _hrAddCommunity + " " + _hrAddBuilding + " " + _hrAddDoorplateno,
			saNumber: rows[i].saNumber,
		};
		jsonArray[i] = jsonObject;
		if (flag == 2) {
			$('#assetsInfoTable2').datagrid('insertRow', {
				index : 0,
				row : rows[i]
			});
		}
	}
	if (flag == 1) {
		showLoading();
		$.post('../moveAssets.action', {
			saId: rows[0].saId,
			jsonArray: JSON.stringify(jsonArray),
		}, function(data) {
			hideLoading();
			if (data.code < 0) {
				$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
				return;
			} else {
				$('#moveInAssetsDlg').dialog('close');
				myTips('迁移成功！', 'success');
				queryAsset(1, 0);
			}
		});	
	} else {
		_moveSaId = rows[0].saId;
		_moveAsset = _moveAsset.concat(jsonArray);
		$('#moveInAssetsDlg').dialog('close');
	}
}
/**
* 迁出资产
*/
function moveOutAssets(flag){
	var row;
	if (flag == 1) {
		row = $('#assetsInfoTable').datagrid('getSelected');
	} else if (flag == 2) {
		row = $('#assetsInfoTable2').datagrid('getSelected');
	}
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	$('#move_from_assets_choseHouse').val(_hrAddCommunity + ' ' + _hrAddBuilding + ' ' + _hrAddDoorplateno);
	$('#moveOutAssetsDlg').dialog({
		title : '迁移资产',
		top : getTop(250),
		left : getLeft(540),
		width : 540,
		height : 250,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#moveOutAssetsDlg [clear="clear"]').val('');
			$('#moveOutAssetsDlg [choose="choose"]').val('');
		}
	});
	if (flag == 1) {
		$('#doMoveOutAssetsButton').show();
		$('#doMoveOutAssetsButton2').hide();
	} else {
		$('#doMoveOutAssetsButton').hide();
		$('#doMoveOutAssetsButton2').show();
	}
	$('#moveOutAssetsDlg').dialog('open');
}
/**
* 执行迁出资产
*/
function doMoveOutAssets(flag){

	var row;
	if (flag == 1) {
		row = $('#assetsInfoTable').datagrid('getSelected');
	} else if (flag == 2) {
		row = $('#assetsInfoTable2').datagrid('getSelected');
	}
	if (!row) {
		myTips('请先选择一条记录！', 'error');
		return;
	}
	var saHouseStoreId = $('#move_to_assets_houseStoreCoding').val();
	var saHouseId = $('#move_to_assets_houseCoding').val();
	var saMoveFrom = $('#move_from_assets_choseHouse').val();
	var saMoveTo = $('#move_to_assets_choseHouse').val();
	var agentName = $('#pickHtManagertShowUserInfo').val().split(' ')[$('#pickHtManagertShowUserInfo').val().split(' ').length-1];
//	var agentName = $('#move_to_asset_staff option:selected').text();
	var moveReason = $('#move_to_asset_reason').val();
	var checkFlag = 0;
	$('#moveOutAssetsDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
			return;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	if (saHouseStoreId == row.saHouseStoreId && saHouseId == row.saHouseId) {
		myTips('该资产无须迁移','error');
		return;
	}
	
	var jsonArray = [];
	var jsonObject = {
		registrantName: _loginUserName,
		saRegistrant: _loginUserId,
		department: _loginDepartment,
		storefront: _loginStore,
		agentName: agentName,
		moveReason: moveReason,
		saId: row.saId,
		saHouseStoreId: saHouseStoreId,
		saHouseId: saHouseId,
		saMoveFrom: saMoveFrom,
		saMoveTo: saMoveTo,
		saNumber: row.saNumber,
	};
	jsonArray[0] = jsonObject;
	if (flag == 1) {
		showLoading();
		$.post('../moveAssets.action', {
			saId: row.saId,
			jsonArray: JSON.stringify(jsonArray),
		}, function(data) {
			hideLoading();
			if (data.code < 0) {
				$.messager.alert('通知', '迁移失败！原因：' + data.msg, 'error');
				return;
			} else {
				$('#moveOutAssetsDlg').dialog('close');
				myTips('迁移成功！', 'success');
				queryAsset(1);
			}
		});
	} else {
		var rowIndex = $('#assetsInfoTable2').datagrid('getRowIndex', row);
		$('#assetsInfoTable2').datagrid('deleteRow', rowIndex);
		_moveSaId = row.saId;
		_moveAsset = _moveAsset.concat(jsonArray);
		$('#moveOutAssetsDlg').dialog('close');
	}
}
/**
 * 选择房源
 */
function choseHouseAsset() {
	$('#choseHouseAssetDlg').dialog({
		title : '选择房源',
		top : getTop(550),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {

		}
	});
	relationDataGridAsset();
	$('#choseHouseAssetDlg').dialog('open');
}
/**
 * 选择房源-显示列表
 */
function relationDataGridAsset() {
	var relationType = $('#searchBelongTypeAsset').find('option:selected').text();
	if (relationType == '房源列表') {
		$('#choseHouseSelectAsset').show();
		$('#virtualRelationSelectAsset').hide();
		$('#choseTrusteeshipAsset').show();
		$('#choseVirtualHouseAsset').hide();
		if ($('#choseTrusteeshipAssetTable').hasClass('datagrid-f')) {

		} else {
			$('#choseTrusteeshipAssetTable').datagrid(
				{
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
					} ] ],
					width : '100%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseTrusteeshipAssetTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#move_to_assets_houseStoreCoding').val(row.hsId);
							$('#move_to_assets_houseCoding').val(row.hsHouseId);
							$('#move_to_assets_choseHouse').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
							$('#choseHouseAssetDlg').dialog('close');
						}
					}
				});
		}
	}
	if (relationType == '项目列表') {
		$('#choseHouseSelectAsset').hide();
		$('#virtualRelationSelectAsset').show();
		$('#choseTrusteeshipAsset').hide();
		$('#choseVirtualHouseAsset').show();
		if ($('#choseVirtualHouseAssetTable').hasClass('datagrid-f')) {

		} else {
			$('#choseVirtualHouseAssetTable').datagrid(
				{
					columns : [ [ /*{
						field : 'houseCoding',
						title : '盘源编号',
						width : 10,
						align : 'center'
					}, */{
						field : 'addCommunity',
						title : '分类',
						width : 10,
						align : 'center'
					}, {
						field : 'keyAdministrator',
						title : '名称',
						width : 20,
						align : 'center'
					}, {
						field : 'addDoorplateno',
						title : '备注描述',
						width : 10,
						align : 'center'
					}, {
						field : 'keyNumber',
						title : '联系人',
						width : 10,
						align : 'center'
					}, {
						field : 'houseEntrust4rent',
						title : '联系电话',
						width : 10,
						align : 'center'
					} ] ],
					width : '100%',
					height : '84%',
					singleSelect : true,
					autoRowHeight : false,
					pageSize : 10,
					scrollbarSize : 0,
					showPageList : false,
					fitColumns : true,
					onDblClickRow : function(rowIndex, rowData) {
						var row = $('#choseVirtualHouseAssetTable').datagrid('getSelected');
						if (row) {
							for (var i in row) {
								if (row[i] == null) {
									row[i] = '';
								}
							}
							$('#move_to_assets_houseStoreCoding').val('');
							$('#move_to_assets_houseCoding').val(row.houseCoding);
							$('#move_to_assets_choseHouse').val(row.keyAdministrator);
							$('#choseHouseAssetDlg').dialog('close');
						}
					}
				});
		}
	}
	choseHouseDataAsset(1);
}
/**
 * 选择房源-显示列表-查数据
 */
function choseHouseDataAsset(page) {
	var relation = $('#searchBelongTypeAsset').val();
	var startNum = (parseInt(page) - 1) * 10;
	var onePageNums = 10;
	var qhAddCity = $('#searchAddCity').find('option:selected').text();
	var qhAddDistrict = $('#searchAddDistrictAsset').find('option:selected').text();
	var qhAddZone = $('#searchAddZone').find('option:selected').text();
	var qhAddCommunity = $('#searchAddCommunityAsset').val();
	var qhAddBuilding = $('#searchAddBuildingAsset').val();
	var qhAddDoorplateno = $('#searchAddDoorplatenoAsset').val();
	var virtualType = $('#searchVirtualType2').val();
	var searchVirtualName = $('#searchVirtualName2').val();
	var searchVirtualContact = $('#searchVirtualContact2').val();
	if (relation == 1) {
		$.post('../queryHouseStoreCommon.action', {
			startNum: startNum,
			endNum: onePageNums,
			hsAddCity: qhAddCity,
			hsAddDistrict: qhAddDistrict,
			hsAddZone: qhAddZone,
			hsAddCommunity: qhAddCommunity,
			hsAddBuilding: qhAddBuilding,
			hsAddDoorplateno: qhAddDoorplateno,
		}, function(data) {
			if (data.code<0) {
				initPage(0, onePageNums, 0);
				$('#choseTrusteeshipAssetTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1) {
					initPage(data[0].totalNum, onePageNums, 0);
				}
				$("#choseTrusteeshipAssetTable").datagrid("loadData", data);
			}
		});
	}
	if (relation == 2) {
		$.post("../virtualProperty.action", {
			startNum: startNum,
			endNum: onePageNums,
			virtualType: virtualType,
			keyAdministrator: searchVirtualName,
			keyNumber: searchVirtualContact,
		}, function(data) {
			if (data.code<0) {
				initPage(0, onePageNums, 1);
				$('#choseVirtualHouseAssetTable').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				if (page == 1) {
					initPage(data.body[0].totalNum, onePageNums, 1);
				}
				$("#choseVirtualHouseAssetTable").datagrid("loadData", data.body);
			}
		});
	}
}

/**
 * 分页初始化
 */
function initPage(totalNum, onePageNums, type) {
	var pageCount = Math.ceil(totalNum / onePageNums);
	if (type == 0) {
		$("#choseTrusteeshipAssetPage").remove();
		$("#choseTrusteeshipAssetPageDiv").append("<div class='tcdPageCode' id='choseTrusteeshipAssetPage' style='text-align:center;'></div>");
		$("#choseTrusteeshipAssetPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseDataAsset(p);
				}
			}
		});
	}
	if (type == 1) {
		$("#choseVirtualHouseAssetPage").remove();
		$("#choseVirtualHouseAssetPageDiv").append("<div class='tcdPageCode' id='choseVirtualHouseAssetPage' style='text-align:center;'></div>");
		$("#choseVirtualHouseAssetPage").createPage({
			onePageNums: onePageNums,
			totalNum: totalNum,
			pageCount: pageCount,
			current: 1,
			backFn: function(p) {
				if (p <= pageCount) {
					choseHouseDataAsset(p);
				}
			}
		});
	}
}
/**
 * 查看资产详情
 */
function openAssetInfo(){
	$('#assetInfoDlg').dialog({
		title : '资产详细信息',
		top : getTop(450),
		left : getLeft(850),
		width : 850,
		height : 450,
		closed : true,
		cache : false,
		modal : true,
		onBeforeClose : function(){
			$('#assetInfoTabs').tabs('select', 0);
		},
		onClose : function() {
			$('#assetInfoDlg [clear="clear"]').val('');
		},
	});
	seeAsset();
	$('#assetInfoDlg').dialog('open');
}
/**
 * 加载资产详情数据
 */
function seeAsset() {
	var row = $('#assetsInfoTable').datagrid('getSelected');
	if (!row) {
		return;
	}
	$('#query_asset_choseHouse').val(row.saDetailedAddress);
	$('#query_asset_type').val(row.saType);
	$('#query_asset_classify').val(row.saClassify);
	$('#query_asset_use').val(row.saUse);
	$('#query_asset_status').val(row.saStatus);
	$('#query_asset_name').val(row.saName);
	$('#query_asset_brand').val(row.saBrand);
	$('#query_asset_model').val(row.saModel);
	$('#query_asset_price').val(row.saPrice);
	$('#query_asset_remark').val(row.saRemarks);
	$('#query_asset_changeSupplier').val(row.saSupplierName);
	$('#query_asset_number').val(row.saNumber);
	$('#query_asset_depreciation_price').val(row.saDepreciationPrice);
}
/**
 * 初始化tab
 */
function initAssetTable(index){
	if(index=='0'){
		seeAsset();
	}
	if(index=='1'){
		check_asset_img();
	}
}
/**
 * 查询资产的跟进记录
 */
function queryAssetFollow() {
	$('#assetFollowTable').datagrid({
		columns : [ [ {
			field : 'time',
			title : '跟进时间',
			width : '20%',
			align : 'center'
		}, {
			field : 'registrantName',
			title : '跟进人',
			width : '10%',
			align : 'center'
		}, {
			field : 'agentName',
			title : '经手人',
			width : '10%',
			align : 'center'
		}, {
			field : 'text',
			title : '跟进内容',
			width : '60%',
			align : 'center'
		} ] ],
		width : '100%',
		height : '152px',
		singleSelect : true,
		autoRowHeight : false,
		pageSize : 10,
		scrollbarSize : 0,
		showPageList : false,
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#assetFollowTable').datagrid('getSelected');
			assetFollowInfoDlg(row);
		}
	});
	var row = $('#assetsInfoTable').datagrid('getSelected');
	var data = [];
	if (row.saFollowUp != null && row.saFollowUp != '') {
		var str = row.saFollowUp.getRealJsonStr();
		data = JSON.parse(str);
	}
	$('#assetFollowTable').datagrid('loadData', data.reverse());
}

/**
 * 列表下方跟进的详细界面
 */
function assetFollowInfoDlg(row){
	$('#assetFollowInfoDlg').dialog({
		title : '跟进详细信息',
		top : getTop(200),
		left : getLeft(450),
		width : 450,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#assetFollowInfoDlg span').text('');
		},
	});
	for(var i in row){
		$('#readDownFollow'+i).html(row[i]);
	}
	$('#assetFollowInfoDlg').dialog('open');
}

/**
 * 添加资产
 */
function addAsset() {
	$('#addAssetDlg').dialog({
		title : '添加资产',
		top : getTop(485),
		left : getLeft(850),
		width : 850,
		height : 485,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#addAssetDlg [clear="clear"]').val('');
			$('#addAssetDlg [choose="choose"]').val('');
			$("#addAssetTable").datagrid({ data: [] });
		}
	});
	$('#addAssetDlg').dialog('open');
	$('#addAssetTable').datagrid({
		columns : [ [
			{
				field : 'saClassify',
				title : '类型',
				width : 10,
				align : 'center',
			},
			{
				field : 'saName',
				title : '名称',
				width : 20,
				align : 'center',
			},
			{
				field : 'saBrand',
				title : '品牌',
				width : 20,
				align : 'center',
			},
			{
				field : 'saModel',
				title : '型号',
				width : 20,
				align : 'center',
			},
			{
				field : 'saPrice',
				title : '价值',
				width : 20,
				align : 'center',
			},
			{
				field : 'saRemarks',
				title : '备注',
				width : 20,
				align : 'center',
			},
			{
				field : 'deleteAdd',
				title : '删除',
				width : 10,
				align : 'center',
				formatter : function(value, row, index) {
					return "<a href='#' onclick=\"myDeleteRows('"+row.random+"','random','addAssetTable',0);\">删除</a>";
				}
			} ] ],
		width : '100%',
		height : '202px',
		singleSelect : true,
		autoRowHeight : false,
		scrollbarSize : 0,
		showPageList : false,
		fitColumns : true,
	});
}
/**
 * 添加资产到列表
 */
function addToDataGrid() {
	var saRegistrant =  _loginUserId;
	var department = _loginDepartment;
	var storefront = _loginStore;
//	var saHouseAddress = $('#assets_choseHouse').val();
	var saHouseStoreId = _houseStoreCoding;
	var saHouseId = _houseCoding;
	var saType = $('#add_asset_type').val();
	var saClassify = $('#add_asset_classify').val();
	var saUse = $('#add_asset_use').val();
	var saStatus = $('#add_asset_status').val();
	var assetName = $('#add_asset_name').val();
	var assetBrand = $('#add_asset_brand').val();
	var assetModel = $('#add_asset_model').val();
	var assetPrice = $('#add_asset_price').val();
	var assetNumber = $('#add_asset_number').val();
//	var saSupplierName = $('#assets_changeSupplier').val();
//	var saSupplier = $('#assets_supplier_id').val();
	var assetRemarks = $('#add_asset_remark').val();
	
	var checkFlag = 0;
	$('#addAssetDlg [must="must"]').each(function(){
		if ($(this).val() == '') {
			$(this).css('border-color','red');
			checkFlag++;
		} else {
			$(this).css('border-color','#A9A9A9');
		}
	});
	if (checkFlag != 0) {
		myTips('有必填项未填写!','error');
		return;
	}
	var dataJson = {
		saRegistrant: saRegistrant,
		department: department,
		storefront: storefront,
//		saHouseAddress: saHouseAddress,
		saHouseStoreId: saHouseStoreId,
		saHouseId: saHouseId,
		saType: saType,
		saClassify: saClassify,
		saUse: saUse,
		saStatus: saStatus,
		saName: assetName,
		saBrand: assetBrand,
		saModel: assetModel,
		saPrice: assetPrice,
//		saSupplierName: saSupplierName,
//		saSupplier: saSupplier,
		saRemarks: assetRemarks,
	};
	for (var i = 0; i < assetNumber; i++) {
		var random = parseInt((Math.random()*9+1)*10000000);
		dataJson.random = random;
		$('#addAssetTable').datagrid('insertRow', {
			index: 0,
			row: dataJson
		});
	}
}
/**
 * 清空添加资产input值
 */
function cleanDataGrid() {
	$('#addAssetDlg [clear="clear"]').val('');
	$('#addAssetDlg [choose="choose"]').val('');
}

//资产类型-名称联动
function changeAssetsType(prefix){
	var assetsType = $("#"+prefix+"classify").val();
	$("#"+prefix+"name").empty();
	if(assetsType==""){
		return;
	}
	for(var i in _assetsType){
		if(assetsType==_assetsType[i].type){
			for(var j in _assetsType[i].name){
				 $("#"+prefix+"name").append('<option value="' + _assetsType[i].name[j] + '">' + _assetsType[i].name[j] + '</option>');
			}
		}
	}
}
/**
 * 执行添加资产
 */
function doAddAsset() { 
	var rows = $('#addAssetTable').datagrid('getRows');
	if (rows.length == 0) {
		myTips('没有可用于添加的数据', 'error');
		return;
	}
	showLoading();
	$.post('../insertAssets.action',{
		jsonArray : JSON.stringify(rows)
	}, function(data) {
		hideLoading();
		if (data.code < 0) {
			$.messager.alert('通知', '添加失败！原因：' + data.msg, 'error');
			return;
		} else {
			$('#addAssetDlg').dialog('close');
			myTips('添加成功！', 'success');
			queryAsset(1,0);
		}
	});	
}
/***********************************************************资产图片上传start****************************************************************/
//电脑上传
function upload_asset_img() {
	var row = $('#assetsInfoTable').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录','info');
		return;
	}
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
			refresh_asset_img();
		}
	});
	creat_asset_qr();
	$.post('../upload/getUpTokenCallback.action', function (data) {
		var token = data.split('#####')[0];
		var co = data.split('#####')[1];
		$('#uploadDlg input[clear=true]').val('');
		$('#token').val(token);
		$('#co').val(co);
		$('#saId').val(row.saId);
		$('#userName').val(_loginUserName);
		initUploader();
		doCancel_asset_img();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creat_asset_qr() {
	var row = $('#assetsInfoTable').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录',"info");
		return;
	}
	$.post("../upload/getMobUploadUrl.action", {
		saId : row.saId,
		userName : _loginUserName,
	}, function (data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel_asset_img();
	});
}

//查看图片
function check_asset_img() {
	var row = $('#assetsInfoTable').datagrid('getSelected');
	if (row) {
		doCancel_asset_img();
		show_asset_img(row.saId);
	} else {
		$.messager.alert('消息','请选择一条记录',"info");
	}
}
//删除图片
function remove_asset_img() {
	var file = $('._asset_file');
	if (file.length == 0) {
		$.messager.alert('消息','没有图片可以删除',"error");
	} else {
		$('#_asset_title').html('请选择要删除的图片').show();
		$('._asset_checkbox').show();
		$('#_asset_btn').show();
	}
}
//取消删除图片
function doCancel_asset_img(){
	$('#_asset_title').hide();
	$('._asset_checkbox').hide().removeAttr('checked');
	$('#_asset_btn').hide();
}
//执行删除图片
function doRemove_asset_img() {
	var row = $("#assetsInfoTable").datagrid("getSelected");
	var arr = 0;
	var path = '';
	var chk = $('._asset_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#_asset_imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#_asset_imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0, path.length-1);//去掉最后一个逗号
		$.post("../deleteAssetsPic.action",{
			saId : row.saId,
			saPhotos : path,
			registrantName : _loginUserName,
		}, function(data) {
			if (data < 0 || data == '') {
				myTips('删除失败！', 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_asset_img(row.saId);
			}
		});
		doCancel_asset_img();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
function show_asset_img(saId){
	$("#_asset_imgWrapper").empty();
	$.post("../queryAssetsCommon.action",{
		saId : saId
	}, function(data) {
		if (data.code < 0) {
			$("#_asset_imgWrapper").append("<p>" + data.msg + "</p>");
			return;
		}
		var path = data.body[0].saPhotos;
		if(path == '' || path == null){
			$('#_asset_imgNum').html('');
			return;
		}
		path = path.substring(1, path.length - 1);
		var img = eval('([' + path + '])');
		var imgNum = 0;
		var fileNum = 0;
		var urls = "";
		for(var i in img){
			if(i==0){
				urls += img[i].path;
			}else{
				urls += ","+img[i].path;
			}
		}
		$.post("../upload/getDownloadUrl.action",{
			baseUrls : urls
		},function(data){
			var newUrls = data.split(",");
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
					if(fileNum == 0){
						$('#_asset_imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#_asset_imgWrapper .fileList').append('<li>' +
							'<input name="other" class="_asset_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
							'<a href="'+newUrls[i]+'" class="_asset_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
							'</li>');
					fileNum++;
					
				}
			}
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				var j = parseInt(i) + parseInt(img.length);
				if (ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png") {
					if (imgNum == 0) {
						$('#_asset_imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#_asset_imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="_asset_group _asset_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="_asset_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#_asset_imgNum').html("图片：" + imgNum + "张    文件：" + fileNum + "个");
			$("._asset_group").colorbox({
				rel:'_asset_group', 
				transition:"none", 
				width:"60%", 
				height:"90%"
			});
		});
	});
}
//刷新
function refresh_asset_img(){
	var row = $("#assetsInfoTable").datagrid("getSelected");
	if (row){
		doCancel_asset_img();
		show_asset_img(row.saId);
	}
}
/***********************************************************资产图片上传end****************************************************************/


//事务审批查看附件
function showAttachmentHandle() {
	var row = $('#eventInfoTable').datagrid('getSelected');
	if(!row){
		myTips("请选择一条记录查看附件","error");
		return;
	}
	initAttachmentDlgHandle()
}

//初始化附件窗口
function initAttachmentDlgHandle(){
	$('#attachmentDlgHandle').dialog({
		title : '附件',
		top : getTop(500),
		left : getLeft(720),
		width : 720,
		height : 550,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#imgWrapperHandle").empty();
			
		},
	});
	showPictureHandle();
}
//显示图片
function showPictureHandle() {
	$("#imgWrapperHandle").empty();
	$('#attachmentDlgHandle').dialog('open');
	var row = $('#eventInfoTable').datagrid('getSelected');
	$.post("../selectEventApprovalById.action",{
		eaId : row.eaId
	}, function(data) {
		if (data.code<0) {
			$('#imageNumHandle').html("（图片：0张    文件：0个）");
			$(".attachmentNumHandle").html("（图片：0张    文件：0个）");
			return;
		}
		data=data.body[0];
		var path = data.eaImgPath.getRealJsonStr();
		var img = eval('([' + path + '])');
		var imgNum = 0;
		var fileNum = 0;
		var urls = "";
		for(var i in img){
			if(i==0){
				urls += img[i].path;
			}else{
				urls += ","+img[i].path;
			}
		}
		$.post("../upload/getDownloadUrl.action",{
			baseUrls : urls
		},function(data){
			var newUrls = data.split(",");
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
					if(fileNum == 0){
						$('#imgWrapperHandle').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#imgWrapperHandle .fileList').append('<li>' +
						'<input name="other" class="picturecheckHandle" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
						'<a href="'+newUrls[i]+'" class="attachmentHandle" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
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
						$('#imgWrapperHandle').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#imgWrapperHandle .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="attachmentImg attachmentHandle" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
						'<input name="image" class="picturecheckHandle" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#imageNumHandle').html("（图片：" + imgNum + "张    文件：" + fileNum + "个）");
			$(".attachmentNumHandle").html("（图片：" + imgNum + "张    文件：" + fileNum + "个）");
			$(".attachmentImg").colorbox({
				rel : 'attachmentImg',
				transition : "none",
				width : "60%",
				height : "90%"
			});
		});
	});
}
//刷新
function refreshHandle(){
	showPictureHandle();
}

/***********************************************************未租房TAB图片上传start****************************************************************/
//电脑上传
function upload_hstab_img() {
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
			refresh_hstab_img();
		}
	});
	creat_hstab_qr();
	$.post("../pubupload/getUpTokenCallback.action", function (data) {
		var token = data.split("#####")[0];
		var co = data.split("#####")[1];
		$('#uploadDlg input[clear=true]').val('');
		$("#token").val(token);
		$("#co").val(co);
		$("#hsId").val(_houseStoreCoding);
		initUploader();
		doCancel_hstab_img();
		$('#uploadDlg').dialog('open');
	});
}

//手机上传
function creat_hstab_qr() {
	$.post("../pubupload/getMobUploadUrl.action", {
		hsId : _houseStoreCoding
	}, function (data) {
		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width:120,
			height:120,
			text:data
		});
		doCancel_hstab_img();
	});
}

//查看图片
function check_hstab_img() {
	doCancel_hstab_img();
	show_hstab_img(_houseStoreCoding);
}
//删除图片
function remove_hstab_img() {
	var file = $('._hstab_file');
	if (file.length == 0) {
		$.messager.alert('消息','没有图片可以删除',"error");
	} else {
		$('#_hstab_title').html('请选择要删除的图片').show();
		$('._hstab_checkbox').show();
		$('#_hstab_btn').show();
	}
}
//取消删除图片
function doCancel_hstab_img(){
	$('#_hstab_title').hide();
	$('._hstab_checkbox').hide().removeAttr('checked');
	$('#_hstab_btn').hide();
}
//执行删除图片
function doRemove_hstab_img() {
	var arr = 0;
	var path = '';
	var chk = $('._hstab_checkbox');
	for (var i = 0; i < chk.length; i++) {
		if (chk[i].checked) {
			arr++;
		}
	}
	if(arr > 0){
		$("#_hstab_imgWrapper input[name='image']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("img").attr('src').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		$("#_hstab_imgWrapper input[name='other']:checked").each(function() { // 遍历选中的checkbox
			path += $(this).parent().children("a").attr('href').split("?")[0] + ',';
			$(this).parent("div").remove();  // 删除包含当前图片的那个div
	    });
		path = path.substring(0, path.length-1);//去掉最后一个逗号
		$.post("../deleteHsPic.action",{
			hsId : _houseStoreCoding,
			hsOtherImg : path
		}, function(data) {
			if (data.code<0) {
				myTips(data.msg, 'error');
				return;
			} else {
				myTips('删除成功！', 'success');
				show_hstab_img(_houseStoreCoding);
			}
		});
		doCancel_hstab_img();
	}else{
		$.messager.alert('消息','未选中任何图片',"error");
	}
}
function show_hstab_img(hsId){
	$("#_hstab_imgWrapper").empty();
	$.post("../queryHouseForStoreById.action",{
		hsId : hsId
	}, function(data) {
		data = data.body;
		if(data.length==0){
			$("#_hstab_imgWrapper").append("<p>未查询到信息</p>");
			return;
		}
		var path = data[0].hsOtherImg == null ? null : data[0].hsOtherImg.getRealJsonStr();
		if(path == '' || path == null){
			$('#_hstab_imgNum').html('');
			return;
		}
		var img = eval('([' + path + '])');
		var imgNum = 0;
		var fileNum = 0;
//		var urls = "";
//		for(var i in img){
//			if(i==0){
//				urls += img[i].path;
//			}else{
//				urls += ","+img[i].path;
//			}
//		}
//		$.post("../upload/getDownloadUrl.action",{
//			baseUrls : urls
//		},function(data){
//			var newUrls = data.split(",");
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				if(ext.toLocaleLowerCase() != "gif" && ext.toLocaleLowerCase() != "jpg" && ext.toLocaleLowerCase() != "jpeg" && ext.toLocaleLowerCase() != "bmp" && ext.toLocaleLowerCase() != "png"){
					if(fileNum == 0){
						$('#_hstab_imgWrapper').append('<div style="clear:both"></div><ul class="fileList"><li style="font-size:20px;">文件列表：</li></ul>');
					}
					$('#_hstab_imgWrapper .fileList').append('<li>' +
							'<input name="other" class="_hstab_checkbox" type="checkbox" style="width:18px;height:18px;vertical-align:middle;display:none;">' +
							'<a href="'+img[i].path+'" class="_hstab_file" style="font-size:18px;line-height:24px;color:blue;text-decoration:underline;vertical-align:middle;" target="_blank">'+img[i].name+'</a>' +
							'</li>');
					fileNum++;
					
				}
			}
			for(var i in img){
				var strs = img[i].path.split(".");
				var ext = strs[strs.length-1];
				var j = parseInt(i) + parseInt(img.length);
				if (ext.toLocaleLowerCase() == "gif" || ext.toLocaleLowerCase() == "jpg" || ext.toLocaleLowerCase() == "jpeg" || ext.toLocaleLowerCase() == "bmp" || ext.toLocaleLowerCase() == "png") {
					if (imgNum == 0) {
						$('#_hstab_imgWrapper').append('<div style="clear:both"></div><ul class="imageList"><li style="font-size:20px;">图片列表：</li></ul>');
					}
					$('#_hstab_imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
						'<img title="'+img[i].name+'" class="_hstab_group _hstab_file" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+img[i].path+'" src="'+img[i].path+'">' +
						'<input name="image" class="_hstab_checkbox" type="checkbox" style="width:20px;height:20px;right:2px;top:2px;position:absolute;z-index:3;display:none;">' +
						'<p style="position:absolute;bottom:-4px;width:150px;height:40px;line-height:20px;background:#000;opacity:0.6;display:block;color:#fff;white-space:normal;text-overflow:ellipsis;overflow:hidden;z-index:3;margin-left:6px;">' + img[i].name + '</p>' +
						'</li>');
					imgNum++;
				}
			}
			$('#_hstab_imgNum').html("图片：" + imgNum + "张    文件：" + fileNum + "个");
			$("._hstab_group").colorbox({
				rel:'_hstab_group', 
				transition:"none", 
				width:"60%", 
				height:"90%"
			});
//		});
	});
}

//刷新
function refresh_hstab_img(){
	doCancel_hstab_img();
	show_hstab_img(_houseStoreCoding);
}
/***********************************************************未租房TAB图片上传end****************************************************************/
//能源卡号添加窗口
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
			$('#addCardDlg [clear="clear"]').val('');
			$('#addCardDlg [clean="clean"]').html('');
			$('#addCardDlg [require]').css('border', '1px solid #a9a9a9');
			clearAttachment();
			clearCard();
		}
	});
	$("#addCardButton").show();
	$("#updateCardButton").hide();
	$("#landNameDiv").show();
	$("#landIdCardDiv").show();
	$("#landTelDiv").show();
	$("#addCardDlg").dialog('open');
	$('#addAddress').val(_hrAddDistrict+_hrAddCommunity+_hrAddBuilding+_hrAddDoorplateno);
	$('#landName').val(landName1);
	$('#landIdCard').val(landIdCard1);
	$('#landTel').val(landTel1);
	$("#cardTel").val(landTel1)
	$('#cardPeopleId').val(landIdCard1)
	$('#cardPeople').val(landName1)
}
function clearCard(){
	$('#addCardDlg input').val('');
	//$('#addHouseCoding').val('单击选择房源');
	$('#errorMsg').html('');
}
//添加能源卡号
function doAddCard(){
	var addHouseStoreId = _houseStoreCoding;
	var cardName = $('#cardName').val();
	var cardNum = $('#cardNum').val();
	var cardPeople = $('#cardPeople').val();
	var cardPeopleId = $('#cardPeopleId').val();
	var cardBankName = $('#cardBankName').val();
	var cardBank = $('#cardBank').val();
	var cardTel = $('#cardTel').val();
	var cardRemark = $('#cardRemark').val();
	var jdcnMeterNumber = $('#jdcnMeterNumber').val();
	/*if(cardName == ''){
		$('#errorMsg').html('请输入卡名');
		return;
	}
	if(cardNum == ''){
		$('#errorMsg').html('请输入卡号');
		return;
	}*/


	$.post("../selectDailyCardNumber.action",{
		jdcnHouse4storeId 		: addHouseStoreId,
		jdcnCardName : cardName
	},function(data){
		console.log(data);
		if (data != -1) {
			$('#errorMsg').html("此类能源卡已存在，请勿重复添加！");
			return;
		}else{
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
				jdcnMeterNumber			: jdcnMeterNumber
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
					$('#addCardDlg').dialog('close');
				}

			});
		}
	});


}

//能源卡号修改
function updateCard(){
	var row = $('#energyCardInfoTable').datagrid('getSelected');
	if(!row){
		myTips("请选择一条记录再作修改", "error");
		return;
	}
	//$('#addHouseCoding').val('单击切换房源');
	$("#addCardDlg").dialog({
		title : '修改卡号',
		top : getTop(340),
		left : getLeft(500),
		width : 500,
		height : 380,
		closed : true,
		cache : false,
		modal : true,
		onClose : function(){
			$('#addCardDlg [clear="clear"]').val('');
			$('#addCardDlg [clean="clean"]').html('');
			$('#addCardDlg [require]').css('border', '1px solid #a9a9a9');
			clearCard();
		}
	});
	$("#addCardButton").hide();
	$("#updateCardButton").show();
	$("#landNameDiv").hide();
	$("#landIdCardDiv").hide();
	$("#landTelDiv").hide();
	$("#addCardDlg").dialog('open');
	
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
}
function doUpdateCard(){
	var row = $('#energyCardInfoTable').datagrid('getSelected');
	var jdcnId = $('#jdcnId').val();
	var addHouseStoreId = _houseStoreCoding;
	var cardName = $('#cardName').val();
	var cardNum = $('#cardNum').val();
	var cardPeople = $('#cardPeople').val();
	var cardPeopleId = $('#cardPeopleId').val();
	var cardBankName = $('#cardBankName').val();
	var cardBank = $('#cardBank').val();
	var cardTel = $('#cardTel').val();
	var cardRemark = $('#cardRemark').val();
	var jdcnMeterNumber = $('#jdcnMeterNumber').val();
//	if(addHouseStoreId == ''){
//		$('#errorMsg').html('请选择房源');
//		return;
//	}
	
	var followUpContent = '能源卡号修改，';
	if(cardName != row.jdcnCardName){
		followUpContent += '卡名:'+row.jdcnCardName+' → '+cardName+','
	}
	if(cardNum != row.jdcnCardNumber){
		followUpContent += '卡号:'+row.jdcnCardNumber+' → '+cardNum+','
	}
	if(cardPeople != row.jdcnBelongingToPeople){
		followUpContent += '卡号归属人:'+row.jdcnBelongingToPeople+' → '+cardPeople+','
	}
	if(cardPeopleId != row.jdcnIdCard){
		followUpContent += '身份证:'+row.jdcnIdCard+' → '+cardPeopleId+','
	}
	if(cardTel != row.jdcnTelephone){
		followUpContent += '联系方式:'+row.jdcnTelephone+' → '+cardTel+','
	}
	if(cardBankName != row.jdcnBankName){
		followUpContent += '银行名称:'+row.jdcnBankName+' → '+cardBankName+','
	}
	if(cardBank != row.jdcnBankCard){
		followUpContent += '银行卡号:'+row.jdcnBankCard+' → '+cardBank+','
	}
	if(cardRemark != row.jdcnRemarks){
		followUpContent += '备注:'+row.jdcnRemarks+' → '+cardRemark+','
	}
	if(jdcnMeterNumber != row.jdcnMeterNumber){
		followUpContent += '表号:'+row.jdcnMeterNumber+' → '+jdcnMeterNumber+','
	}
	
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
		followUpContent         : followUpContent,
		jhfDepartment           : _loginDepartment,
		jhfStorefront           : _loginStore,
		jhfUserId               : _loginUserId,
		jhfHouseId              : _houseCoding,
		jhfHouse4rentId         : _houseRentCoding,
	}, function(data) {
		if (data < 0 || data == '') {
			myTips("修改失败", "error");
		}else{
			myTips("修改成功", "success");
			$("#addCardDlg").dialog('close');
			queryCard(1, 0);
		}
		$('#addCardDlg').dialog('close')
	});
}

//收支详情
function queryFinancialInfo(row){
	$("#financialInfoDlg").dialog({
		title : '查看收支',
		top : getTop(520),
		left : getLeft(660),
		width : 660,
		height : 520,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#financialInfoDlg input').val('');
			$('#financialInfoDlg textarea').val('');
		},
	});
	$(".financialInfo_payType").val(row.jfPayType);
	$(".financialInfo_nowBalance").val(row.jfNowBalance);
	$(".financialInfo_cashierPeopleName").val(row.cashierPeopleName);
	$(".financialInfo_reviewOneName").val(row.reviewOneName);
	$(".financialInfo_reviewerName").val(row.reviewerName);
	$(".financialInfo_handlersName").val(row.handlersName);
	$(".financialInfo_jfStrikeAbalanceStatus").val(row.jfStrikeABalanceStatus);
	$(".financialInfo_jfAuditState").val(row.jfAuditState);
	$(".financialInfo_jfCertificateNumber").val(row.jfCertificateNumber);
	$(".financialInfo_jfBillingDate").val(row.jfBillingDate);
	$(".financialInfo_jfTheOwnershipType").val(row.jfTheOwnershipType);
	$(".financialInfo_jfBelongingToTheName").val(row.jfBelongingToTheName);
	$(".financialInfo_jfClosedWay").val(row.jfClosedWay);
	$(".financialInfo_jfNatureOfThe").val(row.jfNatureOfThe);
	$(".financialInfo_jfAccountingSpecies").val(row.jfAccountingSpecies);
	$(".financialInfo_jfSumMoney").val(row.jfSumMoney);
	$(".financialInfo_jfFinanNote").val(row.jfFinanNote);
	$(".financialInfo_jfFinancialCoding").val(row.jfFinancialCoding);
	$(".financialInfo_belongBegin").val(row.jfStartCycle);
	$(".financialInfo_belongEnd").val(row.jfEndCycle);
	$(".financialInfo_jfClosedWay").val(row.jfClosedWay);
	$(".financialInfo_bankName").val('无');
	$(".financialInfo_bankNums").val('无');
	$(".financialInfo_bankBelong").val('无');
	if(!(row.jfAccountId==null||row.jfAccountId=='')){
		$.post("../selectNamePublic.action", {
			faId:row.jfAccountId
		}, function(data) {
			$(".financialInfo_bankName").val(data.body[0].faUserName);
			$(".financialInfo_bankNums").val(data.body[0].faAccount);
			$(".financialInfo_bankBelong").val(data.body[0].faBelonging);
		});
	}
	$(".financialInfo_nums").val(row.jfTicketNumber);
	if(row.jfAccountingWhy!=null&&row.jfAccountingWhy!=""){
		$(".financialInfo_jfAccountingWhy").val(row.jfAccountingWhy);
	}else{
		$(".financialInfo_jfAccountingWhy").val(row.addCommunity+row.addBuilding+row.addDoorplateno);
	}
	
	if (row.jfHouse4rentId != null && row.jfHouse4rentId != '') {
		$(".financialInfo_houseCoding").val(row.jfHouse4rentId);
		$(".financialInfo_belongId").val(row.jfRenterId);
	}
	if ((row.jfHouse4rentId == null || row.jfHouse4rentId == '') && row.jfHouse4storeId != null && row.jfHouse4storeId != '') {
		$(".financialInfo_houseCoding").val(row.jfHouse4storeId);
		$(".financialInfo_belongId").val(row.jfLandlordId);
	}
	if ((row.jfHouse4storeId == null || row.jfHouse4storeId == '') && row.jfHouseId != null&& row.jfHouseId != '') {
		$(".financialInfo_houseCoding").val(row.jfHouseId);
	}
	$(".financialInfo_jfId").val(row.jfId);
	$(".financialInfo_jfStrikeBalanceEncoding").val(row.jfStrikeBalanceEncoding);
	$(".financialInfo_jfBelongingToTheName").val(row.jfBelongingToTheName);
	var jfOperationRecords = row.jfOperationRecords;
	var reg=new RegExp("＜br＞","g");
	if(jfOperationRecords!=null&&jfOperationRecords!=''){
		jfOperationRecords= jfOperationRecords.replace(reg,"\r\n");
	}else{
		jfOperationRecords='暂无操作记录。'
	}
	$(".financialInfo_jfOperationRecords").val(jfOperationRecords);
	$("#financialInfoDlg").dialog('open');
}

//租客账单详情
function readonlyMonthlyBills(row){
	var monthlyBillsIndex = $('#monthlyBills_index').val();
	$('#readonlyMonthlyBillsDlg').dialog({
		title : '已租房月度账单详细信息',
		top : getTop(284),
		left : getLeft(750),
		width : 750,
		height : 284,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#readonlyMonthlyBillsDlg input').val('');
			$('#readonlyMonthlyBillsDlg textarea').val('');
		},
	});
	if(row.jciState == '已收'){
		//已收账单
		if(row.jciMessageNote != '' && row.jciMessageNote != null){
			//发送过短信
			selectMessageNote(row);
		}else{
			//未发送过短信
			$('#readonlyMonthlyBillsDlg input').val(0);
			$('#monthlyBillsfWaterPlan1').val(_houseRentData.waterPlan); //水计费方案
			$('#monthlyBillsfElectritPlan1').val(_houseRentData.electritPlan); //电计费方案
			$('#monthlyBillsfGasPlan1').val(_houseRentData.gasPlan); //气计费方案
			$('#sendMessageNote1').val(' 未发送短信 或 无保存账单'); //短信备注
			$('#monthlyBills_index').val(monthlyBillsIndex);
		}
	}else{
		//待收账单
		if(row.jciMessageNote != '' && row.jciMessageNote != null){
			//已发短信
			selectMessageNote(row);
		}else{
			//未发短信
			selectNoTextMessages(row);
		}
	}
	$('#readonlyMonthlyBillsDlg').dialog('open');
}

//有短信的租客账单处理
function selectMessageNote(row){
	var jciMessageNote = eval('(' + row.jciMessageNote.getRealJsonStr() + ')');
	var msgNote = jciMessageNote.msg;
	//有发送短信的金额
	$('#sendMessageRentMoney1').val(msgNote.rent); //租金
	$('#sendMessageRentWater1').val(msgNote.water); //水费
	$('#sendMessageRentEcl1').val(msgNote.elect); //电费
	$('#sendMessageRentGas1').val(msgNote.gas); //燃气费
	$('#sendMessageRentTV1').val(msgNote.tv); //电视费
	$('#sendMessageRentWifi1').val(msgNote.wifi); //网费
	$('#sendMessageRentOwe1').val(msgNote.owe); //历史欠结		
	$('#sendMessageRentManage1').val(msgNote.manager); //物管费
	$('#monthlyBillsServer1').val(msgNote.server); //租赁服务费
	$('#sendMessageRentOther1').val(msgNote.other); //其他
	$('#sendMessagePower1').val(msgNote.power); //正常费用
	$('#sendMessageRentDamages1').val(msgNote.damages); //滞纳金
	$('#sendMessagePirce1').val(msgNote.total); //总金额
	$('#sendMessageNote1').val(jciMessageNote.note); //短信备注
	
	$('#monthlyBillsThisWater1').val(jciMessageNote.waterThis); //水表： 本次读数
	$('#monthlyBillsLastWater1').val(jciMessageNote.waterLast); //水上次读数
	$('#monthlyBillsWaterDiff1').val(jciMessageNote.waterThis - jciMessageNote.waterLast); //水差值
	
	$('#monthlyBillsThisElectrit1').val(jciMessageNote.electThis); //电表： 本次读数：
	$('#monthlyBillsLastElectrit1').val(jciMessageNote.electLast); //电上次读数
	$('#monthlyBillsElectritDiff1').val(jciMessageNote.electThis - jciMessageNote.electLast); //电差值
	
	$('#monthlyBillsThisGas1').val(jciMessageNote.gasThis); //气表： 本次读数：
	$('#monthlyBillsLastGas1').val(jciMessageNote.gasLast); //气上次读数
	$('#monthlyBillsDiffGas1').val(jciMessageNote.gasThis - jciMessageNote.gasLast); //气差值
	
	$('#monthlyBillsfWaterPlan1').val(_houseRentData.waterPlan); //水计费方案
	$('#monthlyBillsfElectritPlan1').val(_houseRentData.electritPlan); //电计费方案
	$('#monthlyBillsfGasPlan1').val(_houseRentData.gasPlan); //气计费方案
}
//meiyou没有短信的租客账单处理
function selectNoTextMessages(row){
	//meiyou没有发送短信的金额
	$('#sendMessageRentMoney1').val(row.jciMoney); //租金
	$('#sendMessageRentWater1').val(0); //水费
	$('#sendMessageRentEcl1').val(0); //电费
	$('#sendMessageRentGas1').val(0); //燃气费
	$('#sendMessageRentTV1').val(_houseRentData.hrTvCharge); //电视费
	$('#sendMessageRentWifi1').val(_houseRentData.hrWifiCharge); //网费
	$('#sendMessageRentManage1').val(row.jciManageCost); //物管费
	$('#monthlyBillsServer1').val(row.jciServerCost); //租赁服务费
	$('#sendMessageRentOther1').val(_houseRentData.hrOtherPay); //其它
	if(_houseRentData.hrBase < 0){
		$('#rentOweDiv').html('预存金额：<input id="sendMessageRentOwe1" style="width:80px" disabled="disabled">')
		$('#sendMessageRentOwe1').val(0 - _houseRentData.hrBase); //预存金额
	}else{
		$('#rentOweDiv').html('历史欠结：<input id="sendMessageRentOwe1" style="width:80px" disabled="disabled">')
		$('#sendMessageRentOwe1').val(_houseRentData.hrBase); //历史欠结
	}
	var power = row.jciMoney +_houseRentData.hrTvCharge+_houseRentData.hrWifiCharge+row.jciManageCost+row.jciServerCost+_houseRentData.hrOtherPay+_houseRentData.hrBase;
	if(row.jciPeriods == "1") {
		var jciBillJson = JSON.parse(row.jciBillJson.getRealJsonStr());
		var total = 0.00;
		for (var i = 0; i < jciBillJson.length; i++) {
			switch (jciBillJson[i].species) {
				case "租金":
					$("#sendMessageRentMoney1").val(jciBillJson[i].jciMoney);
					total = mySum(total,parseFloat(jciBillJson[i].jciMoney));
					break;
				case "物管费":
					$("#sendMessageRentManage1").val(jciBillJson[i].jciMoney);
					total = mySum(total,parseFloat(jciBillJson[i].jciMoney));
					break;
				case "服务费":
					$("#monthlyBillsServer1").val(jciBillJson[i].jciMoney);
					total = mySum(total,parseFloat(jciBillJson[i].jciMoney));
					break;
				case "网络费":
					$("#sendMessageRentWifi1").val(jciBillJson[i].jciMoney);
					total = mySum(total,parseFloat(jciBillJson[i].jciMoney));
					break;
				case "电视费":
					$("#sendMessageRentTV1").val(jciBillJson[i].jciMoney);
					total = mySum(total,parseFloat(jciBillJson[i].jciMoney));
					break;
				case "其他费":
					$("#sendMessageRentOther1").val(jciBillJson[i].jciMoney);
					total = mySum(total,parseFloat(jciBillJson[i].jciMoney));
					break;
			}
		}
		power = total +_houseRentData.hrBase;
	}
	$('#sendMessagePower1').val(power); //正常费用
	$('#sendMessageRentDamages1').val(0); //滞纳金
	$('#sendMessagePirce1').val(power); //总金额
	$('#monthlyBillsfWaterPlan1').val(_houseRentData.waterPlan); //水计费方案
	$('#monthlyBillsfElectritPlan1').val(_houseRentData.electritPlan); //电计费方案
	$('#monthlyBillsfGasPlan1').val(_houseRentData.gasPlan); //气计费方案
	$('#sendMessageNote1').val(''); //短信备注
	
	//上次结清读数
	$.post("../queryHouseForStoreById.action",{
		hsId : row.jciHouse4storeId,
	},function(data){
		if(data.code<0){
			return;
		}else{
			data= data.body;
			if(data == null){
				data = [];
			}
			var json = eval('('+data[0].hsMeterReadingRecord.getRealJsonStr()+')');
			//这里还没写完，先验证开启的计费类型
			var chargingPlan=parent._chargingPlan;

			$('#monthlyBillsThisWater1').val(0); //水表： 本次读数
			$('#monthlyBillsLastWater1').val(json.water.lastReading); //水上次读数
			$('#monthlyBillsWaterDiff1').val(0); //水差值
			
			$('#monthlyBillsThisElectrit1').val(0); //电表： 本次读数：
			$('#monthlyBillsLastElectrit1').val(json.electrit.lastReading); //电上次读数
			$('#monthlyBillsElectritDiff1').val(0); //电差值
			
			$('#monthlyBillsThisGas1').val(0); //气表： 本次读数：
			$('#monthlyBillsLastGas1').val(json.gas.lastReading); //气上次读数
			$('#monthlyBillsDiffGas1').val(0); //气差值
		}
	});
}

//打印票据处理
//打开预览对话框
function printPreview(){
	$('#printDlg').dialog({
		top 	: getTop(550),
		left 	: getLeft(900),
		title 	: 	'打印预览',
		closed	:	true,
		width	:	900,
		height	:	550,
		cache 	: 	false,
		modal 	: 	true,
		onClose : 	function() {
			
		}
	});
	console.log(_jciJhpId);
	if(_jciJhpId != '' && _jciJhpId != null){
		$.post("../selectHistoryPrintCommon.action",{
			jhpId           : _jciJhpId,
			splitFlag		: 1,
		}, function(data) {
			if(data.code < 0){
				myTips(data.msg,"error");
				return;
			}
			data = data.body;
			$('#printFrame').empty();
			var	iframes ='';
			var printArray = data[0].jhpJson;
			iframes ='<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>租客每期收支收据</title><style>			table td {				border: 1px solid #888;				border-left: none;				border-top: none;				white-space: nowrap;				padding: 2px;				font-size: 13px;			}						table {				/*border: 1px solid #888;*/				table-layout: fixed;				border-left: 1px solid #888;				width: 768px;				font-size: 13px;				margin: 0 10px;			}						#body {				border: 1px solid black;				width: 790px;				height: 450px			}						#title {				font-size: 22px;				text-align: center;				font-weight: bold			}						#header {				font-size: 16px;				text-align: center;				margin: 10px;				font-weight: bold			}						#footer {				margin: 20px 20px			}						#footer div {				float: left;				width: 20%;				font-weight: bold			}		</style>		<script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>	</head>	<body>		<center>			<div id=\"body\" style=\"\">				<div id=\"title\" style=\"\">{{body.gongsimingcheng}}收款收据</div>				<div id=\"header\" style=\"\">					<div style=\"float:left;margin-left:42% ;\"><span id=\"year\">{{body.year}}</span>年<span id=\"month\">{{body.month}}</span>月<span id=\"date\">{{body.date}}</span>日</div>					<div style=\"float:right;font-size:13px;margin-right:3% ;font-weight:bold\">编号：<span id=\"piaojubianhao\">{{body.piaojubianhao}}</span></div>				</div>				<table align=\"center\" cellspacing=\"0\" style=\"margin-top:5px;border-top: 1px solid #888;\">					<tr align=\"center\">						<td>楼盘名称</td>						<td>姓名</td>						<td>收款方式</td>					</tr>					<tr align=\"center\">						<td>{{body.wuyedizhi}}</td>						<td>{{body.name}}</td>						<td>{{body.shoukuanfangshi}}</td>					</tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\" v-if=\"body.energy_arr\">					<tr align=\"center\">						<td>能源项目</td>						<td>本期读数</td>						<td>上期读数</td>						<td>实用量</td>						<td>金额</td>						<td>备注</td>					</tr>					<tr v-for=\"item in body.energy_arr\" align=\"center\">						<td>{{item.shoufeixiangmu}}</td>						<td>{{item.benqidushu}}</td>						<td>{{item.shangqidushu}}</td>						<td>{{item.shiyongliang}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\">					<tr v-for=\"item in body.journal_arr\" align=\"center\">						<td>{{item.feiyong}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\">					<tr align=\"center\">						<td>本期应收金额：{{body.hejijine}}</td>												<td><b>本期实收金额：{{body.shishoujine}}</b></td>					<td>本期<span v-if=\"body.benqiqianjie >= 0\">欠结金额：{{body.benqiqianjie}}</span><span v-else>结余金额：{{-body.benqiqianjie}}</span></td></tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\" v-if=\"body.beizhu\">					<tr>						<td><span style=\"padding-left: 20px;\">备注：</span>{{body.beizhu}}</td>					</tr>				</table>				<div id=\"footer\" style=\"margin: 3px 20px\">					<div style=\"margin-left:30px\">记账人：<span id=\"jizhangren\">{{body.jizhangren}}</span></div>					<div style=\"margin-left:80px\">收款人：<span id=\"shenheren\">{{body.shoukuanren}}</span></div>					<div style=\"margin-left:80px\">复核人：<span id=\"fuheren\">{{body.fuheren}}</span></div>				</div>			</div>			<script>				var body2 = '+printArray+';			</script>			<script>				var vm;				vm = new Vue({					el: \"#body\",					data: {						body: {}					}				});				vm.body = body2;				Vue.nextTick(print);				function print() {					document.execCommand(\"print\")				}			</script>		</center>	</body></html>';
			var iframesObj = document.getElementById('printFrame').contentDocument;
			iframesObj.open();
			iframesObj.write(iframes);
			$('#printDlg').dialog("open");
		});
	}else{
		myTips('没有相关的租客每期收支票据！',"error");
		return;
	}
}

function readingsModification(){
	$.messager.confirm('交房抄表', '如果只是录入 合约 尚未 交房 ，则不需要填写读数！', function(r){
		if (r){
			$(".inputHide").prop({disabled:false});
			$('#aShowHide').hide();
		}
	});
}

//生成临时账单窗口
function generatingATemporaryBill(){
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录',"info");
		return;
	}
	$('#generatingATemporaryBillDlg').dialog({
		top 	: getTop(510),
		left 	: getLeft(700),
		title 	: '添加临时账单',
		closed	: true,
		width	: 700,
		height	: 510,
		cache 	: false,
		modal 	: true,
		onClose : function(){
			$('#generatingATemporaryBill').attr("src","");
		}
	});
	var hrId = row.hrId;
	var hsId = row.hrHouse4storeId;
	var houseId = row.hrHouseId;
	var renterId = row.hrRenterId;
	var landlordId= row.hrLandlordId;
	var address = row.detailedAddress; 
	var renterName = row.renterPopName;
	var renterTel = row.renterPopTelephone;
	$('#generatingATemporaryBill').attr('src','generatingATemporaryBillDlg.jsp?'+
			'hrId='+hrId+
			'&hsId='+hsId+
			'&houseId='+houseId+
			'&renterId='+renterId+
			'&landlordId='+landlordId+
			'&address='+address+
			'&renterName='+renterName+
			'&renterTel='+renterTel);
	$('#generatingATemporaryBillDlg').dialog("open");
}

//租客换房窗口
function exchangeHouses(){
	var row = $('#sourceInfoDg').datagrid('getSelected');
	if (!row) {
		$.messager.alert('消息','请选择一条记录',"info");
		return;
	}
	$('#exchangeHousesDlg').dialog({
		top 	: getTop(530),
		left 	: getLeft(900),
		title 	: '租客换房',
		closed	: true,
		width	: 1000,
		height	: 700,
		cache 	: false,
		modal 	: true,
		onClose : function(){
			$('#exchangeHouses').attr("src","");
		}
	});
	var hrId = row.hrId;
	var hsId = row.hrHouse4storeId;
	var houseId = row.hrHouseId;
	var renterId = row.hrRenterId;
	var landlordId= row.hrLandlordId;
	var address = row.detailedAddress;
	var renterName = row.renterPopName;
	var renterPopIdcard = row.renterPopIdcard;
	var renterTel = row.renterPopTelephone;
	
	$('#exchangeHouses').attr('src','exchangeHouses.jsp?'+
			'hrId='+hrId+
			'&hsId='+hsId+
			'&houseId='+houseId+
			'&renterId='+renterId+
			'&landlordId='+landlordId+
			'&address='+address+
			'&renterName='+renterName+
			'&renterTel='+renterTel+
			'&renterPopIdcard='+renterPopIdcard);
	$('#exchangeHousesDlg').dialog("open");
}