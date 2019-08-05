$(function(){
    $("#searchPayRentDayEnd").val(AddDecDate(getNowFormatDate(),1,7));
	if($("#searchPayRentDayStart").val()==''&&$("#searchPayRentDayEnd").val()==''){
		var startDay = new Date();
		startDay.setDate(startDay.getDate() - 7);
		startDay =  formatDate(startDay);
		
		var endDay = new Date();
		endDay.setDate(endDay.getDate() + 7);
		endDay =  formatDate(endDay);
		
		$("#searchPayRentDayStart").val(startDay); 
		$("#searchPayRentDayEnd").val(endDay);
	}
	if($("#searchJciState").val()==''){
		$("#searchJciState").val('待收');
	}
	reflashList();
	$("#monthlyBillsDg").datagrid({
		onDblClickRow : function(rowIndex, rowData){
			$(".monthlyBillsAddress_index").val(rowIndex);
			console.log(rowData.jciBillJson);
			readonlyMonthlyBills(0);
		}, rowStyler:function(index,row){   //筛选用的
	        if (row.pageNumber==1){   
	            return {'class':'datagrid-row-firstFollow'};   
	        }   
	    }
	});
	$('#paymentInfoDg').datagrid({
		//微信窗口表格行双击事件
		onDblClickRow : function(rowIndex, rowData) {
			var row = $("#paymentInfoDg").datagrid("getSelected");
			if(row){
				$(".wxPayment_index").val(rowIndex);
				readonlyWxPament(row);
			}
		}
	});
	$('.timeOutDiv .timeOutBtn').click(function(){
		$('#timeOut').val($(this).val());
		$(this).removeClass('btn-success');
		$(this).addClass('btn-info');
		$(this).siblings().removeClass('btn-info').addClass('btn-success');
		if($(this).val()==1){//逾期账单
			$("#searchAddCommunity").val('');
			$("#searchAddBuilding").val('');
			$("#searchAddDoorplateno").val('');
			$("#searchPayRentDayStart").val('');
			$("#searchPayRentDayEnd").val('');
			$("#searchJciState").val('待收');
			$("#searchMsgState").val('');
			$("#searchHouseState").val('管理中');
		}else if($(this).val()==2){//今日账单
			var date = new Date();
			var RenterDateStart = formatDate(date);
			date.setDate(date.getDate());
			var RenterDateEnd = formatDate(date);
			$("#searchPayRentDayStart").val(RenterDateStart);
			$("#searchPayRentDayEnd").val(RenterDateEnd);
			$("#searchAddCommunity").val('');
			$("#searchAddBuilding").val('');
			$("#searchAddDoorplateno").val('');
			$("#searchJciState").val('待收');
			$("#searchMsgState").val('');
			$("#searchHouseState").val('');
		}else if($(this).val()==3){//七日账单
			var date = new Date();
			var RenterWeekDateStart = formatDate(date);
			date.setDate(date.getDate()+6);
			var RenterWeekDateEnd = formatDate(date);
			$("#searchPayRentDayStart").val(RenterWeekDateStart);
			$("#searchPayRentDayEnd").val(RenterWeekDateEnd);
			$("#searchAddCommunity").val('');
			$("#searchAddBuilding").val('');
			$("#searchAddDoorplateno").val('');
			$("#searchJciState").val('待收');
			$("#searchMsgState").val('');
			$("#searchHouseState").val('');
		}
		console.log($("#searchPayRentDayEnd").val());
		queryMonthlyBills(1,0,1)
	});
});
function reflashList(){
	$("#searchAddCommunity").val('');
	$("#searchAddBuilding").val('');
	$("#searchAddDoorplateno").val('');
	// $("#searchPayRentDayStart").val('');
	// $("#searchPayRentDayEnd").val('');
	$("#searchJciState").val('待收');
	$("#searchMsgState").val('');
	$("#searchHouseState").val('');
	$('#timeOut').val('');
	$('.timeOutDiv .timeOutBtn').removeClass('btn-info').addClass('btn-success');
	queryMonthlyBills(1,0,1);
}
function monthlyBills(){
	$('.timeOutDiv .timeOutBtn').removeClass('btn-info');
	$('.timeOutDiv .timeOutBtn').addClass('btn-success');
	$("#searchPayRentDayStart").val('');
	$("#searchPayRentDayEnd").val('');
	$("#timeOut").val('');
	queryMonthlyBills(1,0,1);
}

//分页统计总条数
function getmonthlyBillsPageCount(page){
	var pageSize = 15;
	var addCommunity = $("#searchAddCommunity").val();
	var AddBuilding = $("#searchAddBuilding").val();
	var AddDoorplateno = $("#searchAddDoorplateno").val();
	var startTime = $("#searchPayRentDayStart").val();
	var endTime = $("#searchPayRentDayEnd").val();
	var jciState = $("#searchJciState").val();
	var jciMessageTime = $("#searchMsgState").val();
	var hrState = $("#searchHouseState").val();
	var timeOut = $('#timeOut').val();
	var hsAutoSendMsg = $('hsAutoSendMsg').val();

	$.post("../queryRenterBill.action", {
		hrAddCommunity 		: addCommunity,
		hrAddBuilding 		: AddBuilding,
		hrAddDoorplateno 	: AddDoorplateno,
		startTime			: startTime,
		endTime				: endTime,
		jciState			: jciState,
		jciMessageTime		: jciMessageTime,
		hrState				: hrState,
		timeOut				: timeOut,
		hsAutoSendMsg       : hsAutoSendMsg
	},function(data){
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"monthlyBills",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"monthlyBills",0);
		}
	});
}

function queryMonthlyBills(page,type,total){
	var startNum = (parseInt(page) - 1) * 15;
	var endNum = 15;
	
	var addCommunity = $("#searchAddCommunity").val();
	var AddBuilding = $("#searchAddBuilding").val();
	var AddDoorplateno = $("#searchAddDoorplateno").val();
	var startTime = $("#searchPayRentDayStart").val(); 
	var endTime = $("#searchPayRentDayEnd").val();
	var jciState = $("#searchJciState").val();
	var jciMessageTime = $("#searchMsgState").val();
	var hrState = $("#searchHouseState").val();
	var timeOut = $('#timeOut').val();
	var hsAutoSendMsg = $('hsAutoSendMsg').val();
	
	if(total && total==1){
		$.post("../getMonthTotalMoney.action", {
			hrAddCommunity 		: addCommunity,
			hrAddBuilding 		: AddBuilding,
			hrAddDoorplateno 	: AddDoorplateno,
			startTime			: startTime,
			endTime				: endTime,
			jciState			: jciState,
			jciMessageTime		: jciMessageTime,
			hrState				: hrState,
			timeOut				: timeOut
		},function(data){
			if(data.code<0){
				$('#allTotalMoney').html(0.00);
			}else{
				var totalMoney = data.body[0].jciMoney
				$('#allTotalMoney').html(accSub(totalMoney,0));
			}
		}, "json");
	}
	$.post("../queryRenterBill.action", {
		startNum 			: startNum,
		endNum 				: endNum,
		hrAddCommunity 		: addCommunity,
		hrAddBuilding 		: AddBuilding,
		hrAddDoorplateno 	: AddDoorplateno,
		startTime			: startTime,
		endTime				: endTime,
		jciState			: jciState,
		jciMessageTime		: jciMessageTime,
		hrState				: hrState,
		timeOut				: timeOut,
		hsAutoSendMsg       : hsAutoSendMsg
	},function(data){
		if (data.code<0) {
			// sourcePage(0, 0, 0);
			if(page==1){
				notCountPage(0, 0 ,"queryMonthlyBills","monthlyBills");
			}else{
				notCountPage(page, 0 ,"queryMonthlyBills","monthlyBills");
			}
			$('#monthlyBillsDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			$('#totalMoney').html(0);
		} else {
			data=data.body;
			// if (page == 1 && type == 0) {
			// 	sourcePage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "queryMonthlyBills","monthlyBills");
			}else{
				notCountPage(page, 1 , "queryMonthlyBills","monthlyBills");
			}
			for(var i in data){
			    console.log(data[i]);
            }
			//计算超期天数
			var today = new Date(formatTime(getNowFormatDate(), 2));
			for (var i in data) {
				data[i].detailedAddress = data[i].hrAddCommunity + " " + data[i].hrAddBuilding + " " + data[i].hrAddDoorplateno;
				var fukuanri = new Date(data[i].jciFukuanri);
				if(data[i].jciState=='待收'){
					if(today<=fukuanri){
						data[i].overdueDays = 0;
				    }else{
				    	data[i].overdueDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
				    }
				}else{
					data[i].overdueDays = data[i].jciOverdueDays;
				}
			}		
			$("#monthlyBillsDg").datagrid("loadData",data);
			$('#totalMoney').html(data[0].totalMoney);
			queryMoney();
		}
	}, "json");
	$.post("../getRenterBillNum.action", {}, function(data) {
		if(data.code > 0){
			data = data.body;
			$('.timeOutDiv .totalNum1').html('（' + data[0].totalNum + '）');
			$('.timeOutDiv .totalNum2').html('（' + data[0].totalNum2 + '）');
			$('.timeOutDiv .totalNum3').html('（' + data[0].totalNum3 + '）');
		}
	});
}
//租客账单详情
//type 0：查短信内容 1：重新计算金额
function readonlyMonthlyBills(type){
	var row = $('#monthlyBillsDg').datagrid('getSelected');
	console.log(row);
	var jciLabelType = row.jciLabelType;
	if(jciLabelType != '' && jciLabelType != null && jciLabelType !=3){//临时账单、金融账单
		// $('#sendMessageDivTwo').html('');
		$('#sendMessageRentManageTd').hide();
		$("#timeSpanName").html("收款日："); 
		$("#rentNameSpan").html("金额："); 
		$("#temporaryBillingForm").show();
		$('#readonlyMonthlyBillsDlg input').val("");
		$('#sendMessageNote').val("");//短信备注清空
		$("#sendMessageName").hide();//租客隐藏
		$('#meterReadingCost').hide();//抄表读数隐藏
		$('#detailsOfEnergyCharges').hide();//计算能源收费全隐藏
		$('.hiddenLabel').hide();//水费，电费等暖气费全隐藏
		// $('#sendMessageRentMoney').attr({moneyType:'金额'});
		$('#sendTable').empty();
		// $("#costTable2").hide();//计算能源的其他到总金额全隐藏
		$(".costTable").hide();//计算能源和短信的水费到暖气费全隐藏
		$('#addTemporaryOBill').datagrid({
				columns : 
					[ [
						{
							field : 'nature',
							title : '性质',
							width : 20,
							align : 'center'
						},
						{
							field : 'species',
							title : '种类',
							width : 20,
							align : 'center'
						},
						{
							field : 'jciMoney',
							title : '金额',
							width : 20,
							align : 'center',
							editor : {
								type : "numberbox",
								options : {
									precision : 2
								}
							},
						},
						{
							field : 'jciRemark',
							title : '备注',
							width : 20,
							align : 'center',
							editor : 'textbox'
						} 
					] ],
				width : '100%',
				height : '100%',
				singleSelect : true,
				autoRowHeight : false,
				scrollbarSize : 0,
				showPageList : false,
				fitColumns : true,
				enableCellEdit : true,// 表示是否开启单元格编辑功能
				rowStyler : function(index, row) {
					return 'color:#000;';
				},
			}
		);
		var jciBillJson = JSON.parse(row.jciBillJson.getRealJsonStr());
		$('.hideTd').hide();// 短信的租金到总金额全隐藏
		var sendHtmls = '';
		var totalMoney = 0;
		for(var i in jciBillJson){
			sendHtmls += '<div style="margin:5px 10px 0 0;float: left;">'+jciBillJson[i].species+' : ' +
				'<input style="width:80px" onkeyup="changeSendPrice(this)" onBlur="moneyBlurFomat(this)"' +
				'moneyType="'+jciBillJson[i].species+' : " name="flag" value="'+jciBillJson[i].jciMoney+'" readonly="readonly"></div>'
			if(i == 4){
				sendHtmls += '<div style="clear: both;"></div>'
			}
				totalMoney += parseFloat(jciBillJson[i].jciMoney);
		}
		sendHtmls += '<div style="margin:5px 10px 0 0;float: left;">滞纳金 : <input id="lateFee" style="width:80px;margin-right:10px" ' +
			'onkeyup="changeSendTotalMoney()" value="0.00" name="flag">' +
			'总金额 : <input id="totalAmount" style="width:80px" value="'+totalMoney.toFixed(2)+'"></div>'
		$('#oldTotalAmout').val(totalMoney.toFixed(2));
		$('#sendTable').html(sendHtmls);
		$("#addTemporaryOBill").datagrid("loadData",jciBillJson);
		$('#readonlyMonthlyBillsDlg').dialog({
			title : '已租房临时账单详细信息',
			top : getTop(550),
			left : getLeft(860),
			width : 860,
			height : 550,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$("#sendMessageTips").html("");
			},
		});
		$.post("../selectResidentTable.action", {
			rtHrId : row.hrId,
			rtType:'在住',
		},function(data) {
			if(data.code<0){
				$("#sendMessageManType").empty("");
				$("#sendMessageManType").append("<option value='"+row.popId+"'>租客</option>");
			}else{
				data=data.body;
				$("#sendMessageManType").empty("");
				$("#sendMessageManType").append("<option value='"+row.popId+"#"+row.renterPopTelephone+"#"+row.popNameRemark+"'>租客</option><option value='住户'>住户</option>");
				$("#sendMessageName").empty("");
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j] = '';
						}
					}
					$("#sendMessageName").append("<option value='"+data[i].rtPlId+"#"+data[i].popTelephone+"#"+data[i].rPopNameRemark+"'>"+data[i].popName+"</option>");
				}
			}
		});
		$('.monthlyBillsAddress').val(row.hrAddCommunity + " " + row.hrAddBuilding + " " + row.hrAddDoorplateno);
		$('.monthlyBillsDate').val(row.jciFukuanri);
		$("#addHrRenterNameRemark").val(row.popNameRemark);
		$("#sendMessagePopId").val(row.popId);
		$("#sendMessageRenterId").val(row.hrRenterId);
		$('.monthlyBillsRenter').val(row.renterPopName);
		$('.monthlyBillsPhone').val(row.renterPopTelephone);
	    // $("#sendMessageRentMoney").val(row.jciMoney);
		var jsonObject = JSON.parse(row.jciMessageNote.getRealJsonStr());
		$('#sendMessageNote').val(jsonObject.note);
	    //正常费用计算
		var sysPower = 0.00;
		$("#sendMessageDivOne input").each(function(){
			if($(this).attr("id")!='sysPirce' && $(this).attr("id")!='sysPower' && $(this).attr("id")!='sysRentDamages' ){
				sysPower = accAdd(sysPower,$(this).val());
			}
		});
		//计算滞纳金与总金额
		var today = new Date(formatTime(getNowFormatDate(), 2));
	    var fukuanri = new Date(row.jciRegisterTime.split(" ")[0]);
	    var notDays = 0;
	    if(row.jciState == '待收'){
	    	if(today<=fukuanri){
	    		notDays = 0;
		    }else{
			    notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
		    }
	    }else{
	    	notDays = row.jciOverdueDays;
	    }
	    $('#notDays').val(notDays);
	    $('#sendMessageRentDamages').val(accAdd(totalMoney*notDays*_lateFeeRate*0.01,0));
	    $("#lateFee").val(accAdd(totalMoney*notDays*_lateFeeRate*0.01,0));
	    // if(row.jciMoney != 0){
		// 	changeSendPrice(sendMessageRentMoney);
		// }
	    $("#sendMessageHouseRentId").val(row.hrId);
		$("#sendMessageHouseStoreId").val(row.hrHouse4storeId);
// ===========================================================================================================
//签约账单生成短信账单
    }else if(jciLabelType == 3){
		$(".costTable").hide();//短信：水电气 隐藏
		$('#sendTable').empty();//清空自适应金额框
		$('#meterReadingCost').hide();//抄表情况 全隐藏
		$('#detailsOfEnergyCharges').hide();//计算能源收费 全隐藏

		var jciBillJson = JSON.parse(row.jciBillJson.getRealJsonStr());
		$("#rentNameSpan").html("租金：");
		$("#timeSpanName").html("收款日：");//换成收款日
		$('.hideTd').hide();// 短信：租金-总金额 隐藏
        $("#temporaryBillingForm").show();
        $('#readonlyMonthlyBillsDlg input').val("");
        $('#sendMessageNote').val("");//短信备注清空
        $("#sendMessageName").hide();
        $('#addTemporaryOBill').datagrid({
                columns :
                    [ [
                        {
                            field : 'nature',
                            title : '性质',
                            width : 20,
                            align : 'center'
                        },
                        {
                            field : 'species',
                            title : '种类',
                            width : 20,
                            align : 'center'
                        },
                        {
                            field : 'jciMoney',
                            title : '金额',
                            width : 20,
                            align : 'center',
                            editor : {
                                type : "numberbox",
                                options : {
                                    precision : 2
                                }
                            },
                        }
                    ] ],
                width : '100%',
                height : '100%',
                singleSelect : true,
                autoRowHeight : false,
                scrollbarSize : 0,
                showPageList : false,
                fitColumns : true,
                enableCellEdit : true,// 表示是否开启单元格编辑功能
                rowStyler : function(index, row) {
                    return 'color:#000;';
                },
            }
        );
		var sendHtmls = '';
		var totalMoney = 0;
		var powerFee = 0;
		for(var i in jciBillJson){
			sendHtmls += '<div style="margin:5px 10px 0 0;float: left;">'+jciBillJson[i].species+' : ' +
				'<input style="width:80px" onkeyup="" onchange="countTotalMoney();" class="otherFee" onBlur="moneyBlurFomat(this)"' +
				'id="'+jciBillJson[i].random+'"moneyType="'+jciBillJson[i].species+':" name="flag" value="'+jciBillJson[i].jciMoney+'"></div>'
			if(i == 4){
				sendHtmls += '<div style="clear: both;"></div>'
			}
			if(jciBillJson[i].nature == "支出"){
				totalMoney -= parseFloat(jciBillJson[i].jciMoney);
			}else {
				totalMoney += parseFloat(jciBillJson[i].jciMoney);
				powerFee = accAdd(powerFee,parseFloat(jciBillJson[i].jciMoney));
			}
		}
		sendHtmls += '<div style="margin:5px 10px 0 0;float: left;">滞纳金 : <input id="lateFee" style="width:80px;margin-right:10px" ' +
			'onkeyup="changeSendTotalMoney()" value="0.00" name="flag" disabled>' +
			'总金额 : <input id="totalAmount" style="width:80px" value="'+totalMoney.toFixed(2)+'" disabled></div>'
		$('#oldTotalAmout').val(totalMoney.toFixed(2));
		$('#sendTable').html(sendHtmls);
        $("#addTemporaryOBill").datagrid("loadData",jciBillJson);
        $('#readonlyMonthlyBillsDlg').dialog({
            title : '签约账单详细信息',
            top : getTop(550),
            left : getLeft(860),
            width : 860,
            height : 550,
            closed : true,
            cache : false,
            modal : true,
            onClose : function() {
                $("#sendMessageTips").html("");
            },
        });
        $("input[moneyType='退还定金:']").prop('disabled','disabled');
        var total = 0.00;
        var note ="";
        var messageNoteArray = $("#sendTable input");
        var oneDiv = $(".costTableClass input");
        var twoDiv = $(".messageTable input");
		$("#waterDate").val(0.00);
		$("#electDate").val(0.00);
		$("#gasDate").val(0.00);
		$("#hotWaterDate").val(0.00);
		$("#hotAirDate").val(0.00);
        for(var i=0;i<oneDiv.length;i++){
        	$("#"+oneDiv[i].id).val(0.00);
		}
        for(var j=0;j<twoDiv.length;j++){
			$("#"+twoDiv[j].id).val(0.00);
		}
        for(var i=0;i<messageNoteArray.length;i++){
        	$("#"+messageNoteArray[i].id)
			switch ($("#"+messageNoteArray[i].id).attr('moneyType')) {
				case "租金:":
					console.log($("#"+messageNoteArray[i].id).val());
					if($("#"+messageNoteArray[i].id).val()==""){
						$("#sysRentMoney").val(0.00);
						$("#sendMessageRentMoney").val(0.00);
					}else {
						$("#sysRentMoney").val($("#" + messageNoteArray[i].id).val());
						$("#sendMessageRentMoney").val($("#" + messageNoteArray[i].id).val());
					}
					break;
				case "物管费:":
					if($("#"+messageNoteArray[i].id).val()==""){
						$("#sysRentManage").val(0.00);
						$("#sendMessageRentManage").val(0.00);
					}else {
						$("#sysRentManage").val($("#" + messageNoteArray[i].id).val());
						$("#sendMessageRentManage").val($("#" + messageNoteArray[i].id).val());
					}
					break;
				case "服务费:":
					if($("#"+messageNoteArray[i].id).val()==""){
						$("#sysServer").val(0.00);
						$("#monthlyBillsServer").val(0.00);
					}else {
						$("#sysServer").val($("#" + messageNoteArray[i].id).val());
						$("#monthlyBillsServer").val($("#" + messageNoteArray[i].id).val());
					}
					break;
				case "网络费:":
					if($("#"+messageNoteArray[i].id).val()==""){
						$("#sysRentWifi").val(0.00);
						$("#sendMessageRentWifi").val(0.00);
					}else {
						$("#sysRentWifi").val($("#" + messageNoteArray[i].id).val());
						$("#sendMessageRentWifi").val($("#" + messageNoteArray[i].id).val());
					}
					break;
				case "电视费:":
					console.log($("#"+messageNoteArray[i].id).val());
					if($("#"+messageNoteArray[i].id).val()==""){
						$("#sysRentTV").val(0.00);
						$("#sendMessageRentTV").val(0.00);
					}else {
						$("#sysRentTV").val($("#" + messageNoteArray[i].id).val());
						$("#sendMessageRentTV").val($("#" + messageNoteArray[i].id).val());
					}
					break;
				case "其他费":
					if($("#"+messageNoteArray[i].id).val()==""){
						$("#sysOther").val(0.00);
						$("#sendMessageRentOther").val(0.00);
					}else {
						$("#sysOther").val($("#" + messageNoteArray[i].id).val());
						$("#sendMessageRentOther").val($("#" + messageNoteArray[i].id).val());
					}
					break;
			}
		}
        console.log($("#sysServer").val());
        console.log($("#sysRentManage").val());
        console.log($("#sysRentTV").val());
        console.log($("#sysOther").val())
        console.log($("#hotAirDate").val())
        for(var i = 0;i < jciBillJson.length;i++){
                note += jciBillJson[i].species + "、";
            if(jciBillJson[i].nature == "支出"){
                total = mySub(total,parseFloat(jciBillJson[i].jciMoney));
            }else {
                total = mySum(total, parseFloat(jciBillJson[i].jciMoney));
            }
        }
        note = note.substring(0,note.length-1);
        $("#sysRentOwe").val(row.hrBase);       //欠结费
        $("#sendMessageRentOwe").val(row.hrBase);
        $("#sysPirce").val(total);              //总金额
        $('#sendMessagePirce').val(total);
        $('#sendMessageNote').val(note);
        //正常费用计算
        var sysPower = 0.00;
        $("#sendMessageDivTwo input").each(function(){
            if($(this).attr("id")!='sendMessagePirce' && $(this).attr("id")!='sendMessagePower' && $(this).attr("id")!='sendMessageRentDamages' ){
                sysPower = accAdd(sysPower,$(this).val());
            }
        });
		var totalcost;
		//判断是否有预存金额
		if(row.hrBase < 0){
			totalcost = mySum(sysPower,-row.hrBase);
		}else{
			totalcost = sysPower;
		}
		sysPower = totalcost;
		$("#sysPower").val(total);       //正常费用
        $("#sendMessagePower").val(total);
		//计算滞纳金与总金额
		var today = new Date(formatTime(getNowFormatDate(), 2));
		var fukuanri = new Date(row.jciRegisterTime.split(" ")[0]);
		var notDays = 0;
		if(row.jciState == '待收'){
			if(today<=fukuanri){
				notDays = 0;
			}else{
				notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
			}
		}else{
			notDays = row.jciOverdueDays;
		}
		$("#notDays").val(notDays);
		$("#sysRentDamages").val(accAdd(powerFee*notDays*_lateFeeRate*0.01,0));
		$("#sendMessageRentDamages").val(accAdd(powerFee*notDays*_lateFeeRate*0.01,0));
		$("#lateFee").val(accAdd(powerFee*notDays*_lateFeeRate*0.01,0));
        // var normalFeeArray = $("#sendTable input");
        // var normalFee = 0.00;
        // for(var i =0;i < normalFeeArray.length;i++){
		// 	console.log(normalFeeArray[i].id);
		// 	if(normalFeeArray[i].id != "lateFee" && normalFeeArray[i].id != "totalAmount"&& $("#"+normalFeeArray[i].id).attr("moneyType") == "退还定金"){
        // 		console.log($("#"+normalFeeArray[i].id).val());
        // 		normalFee =accAdd(normalFee,parseFloat($("#"+normalFeeArray[i].id).val()));
		// 	}
		// }
        if(accAdd(powerFee * notDays * _lateFeeRate * 0.01, 0) > 0) {
            $('#addTemporaryOBill').datagrid('appendRow', {
                nature: '收入',
                species: '违约类',
                jciMoney: accAdd(powerFee * notDays * _lateFeeRate * 0.01, 0)
            });
        }
        $("#totalAmount").val(accAdd(totalMoney,accAdd(powerFee*notDays*_lateFeeRate*0.01,0)));

		$("#sysPirce").val($("#totalAmount").val());
		$('#sendMessagePirce').val($("#totalAmount").val());

        $('.monthlyBillsAddress').val(row.hrAddCommunity + " " + row.hrAddBuilding + " " + row.hrAddDoorplateno);//拼接地址
        $('.monthlyBillsDate').val(row.jciRegisterTime.split(" ")[0]);//获取付款日
        $('.monthlyBillsRenter').val(row.renterPopName);//租客名字
        $('.monthlyBillsPhone').val(row.renterPopTelephone);//电话

        $("#sendMessagePopId").val(row.popId);
        $("#sendMessageRenterId").val(row.hrRenterId);
        $("#sendMessageHouseRentId").val(row.hrId);
        $("#sendMessageHouseStoreId").val(row.hrHouse4storeId);
// ===========================================================================================================
    } else{//月结账单
		$('.hideTd').show();// 短信：租金-总金额 显示
		$('#sendTable').empty();
		$('#meterReadingCost').show();

		//打开窗口元素
		$("#costTable2").show();
		$(".costTable").show();
		$("#timeSpanName").html("交租日：");
		$("#rentNameSpan").html("租金：");
		$("#temporaryBillingForm").hide();
		$('#readonlyMonthlyBillsDlg input').val("");
		$('#sendMessageNote').val("");
		$("#sendMessageName").hide();
		$('#detailsOfEnergyCharges').show();
		$('.hiddenLabel').show();
		$("#monthlyBillsRenter").show();
		$("#reloadMoneyButton").show();
		$('#sendMessageRentMoney').attr({moneyType:'租金'});
		$('#readonlyMonthlyBillsDlg').dialog({
			title : '已租房月度账单详细信息',
			top : getTop(550),
			left : getLeft(860),
			width : 860,
			height : 550,
			closed : true,
			cache : false,
			modal : true,
			onClose : function() {
				$("#sendMessageTips").html("");
			}
		});
		if(row.jciState=="已收"){
			$("#reloadMoneyButton").hide();
		}
		//查住户
		$.post("../selectResidentTable.action", {
			rtHrId : row.hrId,
			rtType:'在住',
		},function(data) {
			if(data.code<0){
				$("#sendMessageManType").empty("");
				$("#sendMessageManType").append("<option value='"+row.popId+"'>租客</option>");
			}else{
				data=data.body;
				$("#sendMessageManType").empty("");
				$("#sendMessageManType").append("<option value='"+row.popId+"#"+row.renterPopTelephone+"#"+row.popNameRemark+"'>租客</option><option value='住户'>住户</option>");
				$("#sendMessageName").empty("");
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j] = '';
						}
					}
					$("#sendMessageName").append("<option value='"+data[i].rtPlId+"#"+data[i].popTelephone+"#"+data[i].rPopNameRemark+"'>"+data[i].popName+"</option>");
				}
			}
		});
		$('.monthlyBillsAddress').val(row.hrAddCommunity + " " + row.hrAddBuilding + " " + row.hrAddDoorplateno);
		$('.monthlyBillsDate').val(row.jciFukuanri);
		$("#addHrRenterNameRemark").val(row.popNameRemark);
		$("#sendMessagePopId").val(row.popId);
		$("#sendMessageRenterId").val(row.hrRenterId);
		$('.monthlyBillsRenter').val(row.renterPopName);
		$('.monthlyBillsPhone').val(row.renterPopTelephone);

		$('#sendMessageRentTV').val(row.hrTvCharge);
		$('#sendMessageRentWifi').val(row.hrWifiCharge);
		$("#sendMessageRentOwe").val(row.hrBase);
		$("#sendMessageRentOther").val(row.hrOtherPay);

		$('#sendMessageRentManage').val((row.jciManageCost!=null && row.jciManageCost !="")?row.jciManageCost:0.00);
		$('#monthlyBillsServer').val((row.jciServerCost!=null && row.jciServerCost !="")?row.jciServerCost:0.00);

		$("#sysRentMoney").val(row.jciMoney);
		$('#sysRentTV').val(row.hrTvCharge);
		$('#sysRentWifi').val(row.hrWifiCharge);
		$('#sysOther').val(row.hrOtherPay);
		$("#sysRentOwe").val(row.hrBase);
		$('#sysRentManage').val((row.jciManageCost!=null && row.jciManageCost !="")?row.jciManageCost:0.00);
		$('#sysServer').val((row.jciServerCost!=null && row.jciServerCost !="")?row.jciServerCost:0.00);

		$("#sendMessageRentMoney").val(row.jciMoney);
		$("#sendMessageHouseRentId").val(row.hrId);
		$("#sendMessageHouseStoreId").val(row.hrHouse4storeId);

		var waterMoney = 0;//水费
		var electritMoney = 0;//电费
		var gasMoney = 0;//气费
		var hotwaterMoney = 0;//热水费
		var hotairMoney = 0;//暖气费

		var sysPirce = 0.00;

		var hrId = row.hrId;
		var hrHouse4storeId = row.hrHouse4storeId;
		//查水电气
		$.post("../selectMeterReadingScheme.action", {
			hrId : row.hrId,
			hrHouse4storeId : row.hrHouse4storeId
		},function(data){
			data=data.body;
			if(data[0].hsMeterReadingRecord != null && data[0].hsMeterReadingRecord != '' ){
				var meterReadingRecord = eval('(' + data[0].hsMeterReadingRecord.getRealJsonStr() + ')');
				var waterLast = meterReadingRecord.water.lastReading;//上次水读数
				var waterThis = waterLast;//本次水读数
				if(meterReadingRecord.water.thisReading.length != 0){
					waterThis = meterReadingRecord.water.thisReading[meterReadingRecord.water.thisReading.length-1];
				}

				var electritLast = meterReadingRecord.electrit.lastReading;//上次电读数
				var electritThis = electritLast;//本次电读数
				if(meterReadingRecord.electrit.thisReading.length != 0){
					electritThis = meterReadingRecord.electrit.thisReading[meterReadingRecord.electrit.thisReading.length-1];
				}

				var gasLast = meterReadingRecord.gas.lastReading;//上次气读数
				var gasThis = gasLast;//本次气读数
				if(meterReadingRecord.gas.thisReading.length != 0){
					gasThis = meterReadingRecord.gas.thisReading[meterReadingRecord.gas.thisReading.length-1];
				}

				var hotwaterLast = 0;//上次热水读数
				var hotwaterThis = 0;//本次热水读数
				if(meterReadingRecord.hotwater != undefined){
					hotwaterLast = meterReadingRecord.hotwater.lastReading;//上次热水读数
					hotwaterThis = hotwaterLast;//本次热水读数
					if(meterReadingRecord.hotwater.thisReading.length != 0){
						hotwaterThis = meterReadingRecord.hotwater.thisReading[meterReadingRecord.hotwater.thisReading.length-1];
					}
				}

				var hotairLast = 0;//上次暖气读数
				var hotairThis = 0;//本次暖气读数
				if(meterReadingRecord.hotair != undefined){
					hotairLast = meterReadingRecord.hotair.lastReading;//上次暖气读数
					hotairThis = hotairLast;//本次暖气读数
					if(meterReadingRecord.hotair.thisReading.length != 0){
						hotairThis = meterReadingRecord.hotair.thisReading[meterReadingRecord.hotair.thisReading.length-1];
					}
				}

				var waterNum = accSub(waterThis,waterLast);//水差额
				var electritNum = accSub(electritThis,electritLast);//电差额
				var gasNum = accSub(gasThis,gasLast);//气差额
				var hotwaterNum = accSub(hotwaterThis,hotwaterLast);//热水差额
				var hotairNum = accSub(hotairThis,hotairLast);//暖气差额

				waterMoney = powerCalculate(data[0].waterPlan!=''?data[0].waterPlan.getRealJsonStr():'',waterNum);//水费
				electritMoney = powerCalculate(data[0].electritPlan!=''?data[0].electritPlan.getRealJsonStr():'',electritNum);//电费
				gasMoney = powerCalculate(data[0].gasPlan!=''?data[0].gasPlan.getRealJsonStr():'',gasNum);//气费
				hotwaterMoney = powerCalculate(data[0].hotWaterPlan!=''?data[0].hotWaterPlan.getRealJsonStr():'',hotwaterNum);//热水费
				hotairMoney = powerCalculate(data[0].hotAirPlan!=''?data[0].hotAirPlan.getRealJsonStr():'',hotairNum);//暖气费
				$('.monthlyBillsThisWater').val(waterThis);
				$('.monthlyBillsLastWater').val(waterLast);
				$('.monthlyBillsWaterDiff').val(waterNum);
				$(".monthlyBillsfWaterPlan").val(data[0].water);
				$("#sendMessageRentWater").val(waterMoney);
				$("#sysRentWater").val(waterMoney);

				$('.monthlyBillsThisElectrit').val(electritThis);
				$('.monthlyBillsLastElectrit').val(electritLast);
				$('.monthlyBillsElectritDiff').val(electritNum);
				$(".monthlyBillsfElectritPlan").val(data[0].electrit);
				$("#sendMessageRentEcl").val(electritMoney);
				$("#sysRentEcl").val(electritMoney);

				$('.monthlyBillsThisGas').val(gasThis);
				$('.monthlyBillsLastGas').val(gasLast);
				$('.monthlyBillsDiffGas').val(gasNum);
				$(".monthlyBillsfGasPlan").val(data[0].gas);
				$("#sendMessageRentGas").val(gasMoney);
				$("#sysRentGas").val(gasMoney);

				$('.monthlyBillsThisHotwater').val(hotwaterThis);
				$('.monthlyBillsLastHotwater').val(hotwaterLast);
				$('.monthlyBillsDiffHotwater').val(hotwaterNum);
				$('.monthlyBillsfHotwaterPlan').val(data[0].hotWater);
				$("#sendMessageRentHotWater").val(hotwaterMoney);
				$("#sysRentHotWater").val(hotwaterMoney);

				$('.monthlyBillsThisHotAir').val(hotairThis);
				$('.monthlyBillsLastHotAir').val(hotairLast);
				$('.monthlyBillsDiffHotAir').val(hotairNum);
				$('.monthlyBillsfHotAirPlan').val(data[0].hotAir);
				$("#sendMessageRentHotAir").val(hotairMoney);
				$("#sysRentHotAir").val(hotairMoney);
			}else{
				$('.monthlyBillsThisWater').val(0);
				$('.monthlyBillsLastWater').val(0);
				$('.monthlyBillsWaterDiff').val(0);
				$(".monthlyBillsfWaterPlan").val(data[0].water);
				$("#sendMessageRentWater").val(0);
				$("#sysRentWater").val(0);

				$('.monthlyBillsThisElectrit').val(0);
				$('.monthlyBillsLastElectrit').val(0);
				$('.monthlyBillsElectritDiff').val(0);
				$(".monthlyBillsfElectritPlan").val(data[0].electrit);
				$("#sendMessageRentEcl").val(0);
				$("#sysRentEcl").val(0);

				$('.monthlyBillsThisGas').val(0);
				$('.monthlyBillsLastGas').val(0);
				$('.monthlyBillsDiffGas').val(0);
				$(".monthlyBillsfGasPlan").val(data[0].gas);
				$("#sendMessageRentGas").val(0);
				$("#sysRentGas").val(0);

				$('.monthlyBillsThisHotwater').val(0);
				$('.monthlyBillsLastHotwater').val(0);
				$('.monthlyBillsDiffHotwater').val(0);
				$(".monthlyBillsfHotwaterPlan").val(data[0].hotWater);
				$("#sendMessageRentHotWater").val(0);
				$("#sysRentHotWater").val(0);

				$('.monthlyBillsThisHotAir').val(0);
				$('.monthlyBillsLastHotAir').val(0);
				$('.monthlyBillsDiffHotAir').val(0);
				$(".monthlyBillsfHotAirPlan").val(data[0].hotAir);
				$("#sendMessageRentHotAir").val(0);
				$("#sysRentHotAir").val(0);


			}
			//正常费用计算
			var sysPower = 0.00;
			$("#sendMessageDivOne input").each(function(){
				if($(this).attr("id")!='sysPirce' && $(this).attr("id")!='sysPower' && $(this).attr("id")!='sysRentDamages' ){//不等于总金额，滞纳金，正常费用
					sysPower = accAdd(sysPower,$(this).val());
				}
			});
			var totalcost;
			//判断是否有预存金额
		    if(row.hrBase < 0){
		    	totalcost = mySum(sysPower,-row.hrBase);
		    }else{
		    	totalcost = sysPower;
		    }
		    sysPower = totalcost;
			$("#sysPower").val(sysPower);//正常费用
			//计算滞纳金与总金额
			var today = new Date(formatTime(getNowFormatDate(), 2));
		    var fukuanri = new Date(row.jciFukuanri);
		    var notDays = 0;//超期天数
		    if(row.jciState == '待收'){
		    	if(today<=fukuanri){
		    		notDays = 0;
			    }else{
				    notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
			    }
		    }else{
		    	notDays = row.jciOverdueDays;
		    }
		    $('#notDays').val(notDays);//超期天数
		    $('#sysRentDamages').val(accAdd(sysPower*notDays*_lateFeeRate*0.01,0));//滞纳金
		    $('#sendMessageRentDamages').val(accAdd(sysPower*notDays*_lateFeeRate*0.01,0));
		    sysPower = accAdd(sysPower,sysPower*notDays*_lateFeeRate*0.01);
		    if(row.hrBase < 0){
		    	sysPower = mySum(sysPower,row.hrBase);
		    }
		    $("#sysPirce").val(sysPower);
		    if($("#sendMessageRentMoney").val()!= 0 && $("#sendMessageRentMoney").val() != 0.0 && $("#sendMessageRentMoney").val() != 0.00){
				changeSendPrice(sendMessageRentMoney);
			}
			if(waterMoney != 0 && waterMoney != 0.0 && waterMoney != 0.00){
				changeSendPrice(sendMessageRentWater);
			}
			if(electritMoney != 0 && electritMoney != 0.0  && electritMoney != 0.00){
				changeSendPrice(sendMessageRentEcl);
			}
			if(gasMoney != 0 && gasMoney != 0.0 && gasMoney != 0.00){
				changeSendPrice(sendMessageRentGas);
			}

			if(hotwaterMoney != 0 && gasMoney != 0.0 && hotwaterMoney!= 0.00){
				changeSendPrice(sendMessageRentHotWater);
			}
			if(hotairMoney!= 0 && hotairMoney!= 0.0 && hotairMoney!= 0.00){
				changeSendPrice(sendMessageRentHotAir);
			}


			if(data[0].hrTvCharge != 0 && data[0].hrTvCharge != 0.0 && data[0].hrTvCharge != 0.00){
				changeSendPrice(sendMessageRentTV);
			}
			if(data[0].hrWifiCharge != 0 && data[0].hrWifiCharge != 0.0 && data[0].hrWifiCharge != 0.00 ){
				changeSendPrice(sendMessageRentWifi);
			}
			if(data[0].hrManageCost != 0 && data[0].hrManageCost != 0.0 && data[0].hrManageCost != 0.00){
				changeSendPrice(sendMessageRentManage);
			}
			changeSendPrice(sendMessageRentMoney);
			if(data[0].hrServerCost != 0 && data[0].hrServerCost != 0.0 && data[0].hrServerCost != 0.00){
				changeSendPrice(monthlyBillsServer);
			}

			//短信发送的账单
			if(row.jciMessageNote!=null && row.jciMessageNote!='' && type==0){
				var jciMessageNote  = eval("("+row.jciMessageNote.getRealJsonStr()+")");
				$("#sysRentWater").val(jciMessageNote.sys.water);
				$("#sysRentEcl").val(jciMessageNote.sys.elect);
				$("#sysRentGas").val(jciMessageNote.sys.gas);

				$("#sysRentHotWater").val(jciMessageNote.sys.hotWater);
				$("#sysRentHotAir").val(jciMessageNote.sys.hotAir);

				$("#sysRentTV").val(jciMessageNote.sys.tv);
				$("#sysRentWifi").val(jciMessageNote.sys.wifi);
				$("#sysRentManage").val(jciMessageNote.sys.manager);
				$("#sysServer").val(jciMessageNote.sys.server);
				$('#sysRentOwe').val(jciMessageNote.sys.owe);
				$('#sysOther').val(jciMessageNote.sys.other);
				$("#sysPower").val(jciMessageNote.sys.power);
				$('#sysRentDamages').val(jciMessageNote.sys.damages);
				$("#sysPirce").val(jciMessageNote.sys.total);
				$("#sendMessageRentMoney").val(jciMessageNote.msg.rent);
				$("#sendMessageRentWater").val(jciMessageNote.msg.water);
				$("#sendMessageRentEcl").val(jciMessageNote.msg.elect);
				$("#sendMessageRentGas").val(jciMessageNote.msg.gas);
				$("#sendMessageRentHotWater").val(jciMessageNote.msg.hotWater);
				$("#sendMessageRentHotAir").val(jciMessageNote.msg.hotAir);

				$('#sendMessageRentOwe').val(jciMessageNote.msg.owe);
				$("#sendMessageRentTV").val(jciMessageNote.msg.tv);
				$("#sendMessageRentWifi").val(jciMessageNote.msg.wifi);
				$("#sendMessageRentManage").val(jciMessageNote.msg.manager);
				$("#monthlyBillsServer").val(jciMessageNote.msg.server);
				$("#sendMessageRentOther").val(jciMessageNote.msg.other);
				$("#sendMessagePower").val(jciMessageNote.msg.power);
				$('#sendMessageRentDamages').val(jciMessageNote.msg.damages);
				$("#sendMessagePirce").val(jciMessageNote.msg.total);

				$(".monthlyBillsThisWater").val(jciMessageNote.waterThis);
				$(".monthlyBillsLastWater").val(jciMessageNote.waterLast);
				$(".monthlyBillsWaterDiff").val(accSub(jciMessageNote.waterThis,jciMessageNote.waterLast));

				$(".monthlyBillsThisElectrit").val(jciMessageNote.electThis);
				$(".monthlyBillsLastElectrit").val(jciMessageNote.electLast);
				$(".monthlyBillsElectritDiff").val(accSub(jciMessageNote.electThis,jciMessageNote.electLast));

				$(".monthlyBillsThisGas").val(jciMessageNote.gasThis);
				$(".monthlyBillsLastGas").val(jciMessageNote.gasLast);
				$(".monthlyBillsDiffGas").val(accSub(jciMessageNote.gasThis,jciMessageNote.gasLast));

				$(".monthlyBillsThisHotwater").val(jciMessageNote.hotWaterThis);
				$(".monthlyBillsLastHotwater").val(jciMessageNote.hotWaterLast);
				$(".monthlyBillsDiffHotwater").val(accSub(jciMessageNote.hotWaterThis,jciMessageNote.hotWaterLast));

				$(".monthlyBillsThisHotAir").val(jciMessageNote.hotAirThis);
				$(".monthlyBillsLastHotAir").val(jciMessageNote.hotAirLast);
				$(".monthlyBillsDiffHotAir").val(accSub(jciMessageNote.hotAirThis,jciMessageNote.hotAirLast));

				$("#sendMessageNote").val(jciMessageNote.note);
			}
			$("#sendMessageDivOne input").each(function(){
				if($(this).val()==0||$(this).val()==''){
					$(this).val('0.00');
				}
			});
			$("#sendMessageDivTwo input").each(function(){
				if($(this).val()==0||$(this).val()==''){
					$(this).val('0.00');
				}
			});

			//查本次读数的抄表日期
			$.post('../selectWegDate.action',{
				wegrdHouse4storeId: row.hrHouse4storeId,
				wegrdType: '水表',
				wegrdNums: $(".monthlyBillsThisWater").val(),
			}, function(data){
				if (data.code > 0) {
					$("#waterDate").val(data.body[data.body.length-1].wegrdMonth);
				}
			});
			$.post('../selectWegDate.action',{
				wegrdHouse4storeId: row.hrHouse4storeId,
				wegrdType: '电表',
				wegrdNums: $(".monthlyBillsThisElectrit").val(),
			}, function(data){
				if (data.code > 0) {
					$("#electDate").val(data.body[data.body.length-1].wegrdMonth);
				}
			});
			$.post('../selectWegDate.action',{
				wegrdHouse4storeId: row.hrHouse4storeId,
				wegrdType: '燃气表',
				wegrdNums: $(".monthlyBillsThisGas").val(),
			}, function(data){
				if (data.code > 0) {
					$("#gasDate").val(data.body[data.body.length-1].wegrdMonth);
				}
			});
			$.post('../selectWegDate.action',{
				wegrdHouse4storeId: row.hrHouse4storeId,
				wegrdType: '热水',
				wegrdNums: $(".monthlyBillsThisHotwater").val(),
			}, function(data){
				//console.log("热水"+data.body[data.body.length-1].wegrdMonth);
				if (data.code > 0) {
					$("#hotWaterDate").val(data.body[data.body.length-1].wegrdMonth);
				}
			});
			$.post('../selectWegDate.action',{
				wegrdHouse4storeId: row.hrHouse4storeId,
				wegrdType: '暖气',
				wegrdNums: $(".monthlyBillsThisHotAir").val(),
			}, function(data){
				//console.log("暖气"+data.body[data.body.length-1].wegrdMonth);
				if (data.code > 0) {
					$("#hotAirDate").val(data.body[data.body.length-1].wegrdMonth);
				}
			});
			energy2();//控制非选中能源项隐藏
		});
	}

	$('#readonlyMonthlyBillsDlg').dialog('open');

}
function energy2(){
	//控制非选中能源项隐藏
	var chargingPlan=parent._chargingPlan;
	$(".costTable").width("800px");
	for(var i in chargingPlan){
		if(!chargingPlan[i]["state"]){
			$(".costTable").width($(".costTable").width()-160+"px");
			$("."+i+" input").val("0.00");
			$("."+i).hide();
			
		}
	}
	moneyBlurFomat($("#sendMessageRentMoney"));
	console.log($("#sendMessageRentMoney").val());
	var obj=$("#sendMessageRentMoney");
	changeSendPrice(obj[0]);

}
//发送短信验证
function doCheckSendMessage(){
	var smMoney = $("#sendMessagePirce").val();

	if(smMoney==''||smMoney=='0.00'||smMoney=='0.0'||smMoney=='0'){
			$("#sendMessageTips").html("至少有一项缴费金额不为0！");
			return 0;
	}
	$("#sendMessageTips").html("");
	return 1;
}


//短信预览
function previewSendMessage(){
	if(doCheckSendMessage()==0){
		return;
	}
	var row = $('#monthlyBillsDg').datagrid('getSelected');	
	$("#previewSendMessageDlg").dialog({
		title : '发送短信',
		top : getTop(150),
		left : getLeft(420),
		width : 420,
		height : 240,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$("#previewSendMessageDlg textarea").val('');
		}
	});	

	var totalMoney = $('#sendMessagePirce').val();
	var sendNote = $('#sendMessageNote').val();
	
	var note = "【房至尊】尊敬的" + row.renterPopName +"租户，您好。您的租房" + row.hrAddCommunity +"，本期租金等费用为"+totalMoney+"（备注："
	+ sendNote + "），交租日为" + row.jciBeginPeriods + "，请您按时交租，过了期将产生滞纳金，感谢支持。";
	var note2 = "【房至尊】尊敬的" + row.renterPopName +"租户，您好。您的租房" + row.hrAddCommunity +"，有新的费用账单为"+totalMoney+"（备注："
	+ sendNote + "），收款日为" + row.jciFukuanri + "，请您按时结清费用，过了期将产生滞纳金，感谢支持。";
	
//	【房至尊】尊敬的 #company# 租户，您好。您的租房#add#，本期租金等费用为#money#（备注：#note#），交租日为#date#，请您按时交租，过了期将产生滞纳金，感谢支持。
	if(row.jciLabelType == 1 && row.jciLabelType != null){
		$("#previewSendMessageNote").val(note2);
	}else{
		$("#previewSendMessageNote").val(note);
	}
			
	$("#previewSendMessageDlg").dialog("open");
}
//发送短信金额
function changeSendPrice(obj){
	var row = $('#monthlyBillsDg').datagrid('getSelected');
	var regStrs =  [
	                ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
	                ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
	                ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
	                ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
	            ];
	for (i = 0; i < regStrs.length; i++) {
		var reg = new RegExp(regStrs[i][0]);
		obj.value = obj.value.replace(reg, regStrs[i][1]);
	}
	var oneInput = $("#sendMessageDivTwo input");
	var money = 0;
	var note = '';
	for(var i in oneInput){
		if(oneInput[i].id!='sendMessagePower' && oneInput[i].id!='sendMessageRentDamages' && oneInput[i].id!='sendMessagePirce'){
			if($("#"+oneInput[i].id).val()==''){
				money+=0;
			}else{
				money=accAdd(money,$("#"+oneInput[i].id).val());	
			}	
			if($("#"+oneInput[i].id).val()!='' && $("#"+oneInput[i].id).val()!=0 &&$("#"+oneInput[i].id).val()!='.'&&$("#"+oneInput[i].id).attr('moneyType')){
				if($("#"+oneInput[i].id).attr('moneyType')=="历史欠结"){
					if(parseInt($("#"+oneInput[i].id).val())>0){
						note += "历史欠结、";
					}else{
						note += "历史结余、";
					}
				}else{
					note += $("#"+oneInput[i].id).attr('moneyType')+"、";
				}
			}	
		}
	}
	if(note=='金额、'){
		var rows = $('#addTemporaryOBill').datagrid('getRows');
		var note = '';
		for(var i in rows){
			note += rows[i].species+"、";
		}
	}
	var messageRentOwe = $('#sendMessageRentOwe').val();
	if(messageRentOwe < 0){
		money = mySum(money,-messageRentOwe);
	}
	$("#sendMessagePower").val(money);
	//修改违约金以外的金额时重新计算违约金
	if(obj.id!='sendMessageRentDamages'){
		var today = new Date(formatTime(getNowFormatDate(), 2));
	    var fukuanri = new Date(row.jciFukuanri);
	    if(today<=fukuanri){
		    $('#sendMessageRentDamages').val(0);
	    }else{
		    var notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
		    $('#sendMessageRentDamages').val(accAdd(0,money*notDays*_lateFeeRate*0.01));
	    }
	}
    
	if($("#sendMessageRentDamages").val()!=0 && $("#sendMessageRentDamages").val()!=''&&$("#sendMessageRentDamages").val()!=null){
		note += $("#sendMessageRentDamages").attr('moneyType')+"、";
		money=accAdd(money,$("#sendMessageRentDamages").val());
	}
	if(messageRentOwe < 0){
		money = mySum(money,messageRentOwe);
	}
	$("#sendMessagePirce").val(money);
	note = note.substring(0,note.length-1);
	if(note==""){
		note = "无";
	}
	$("#sendMessageNote").val(note);
	
}

//执行发送短信
//num 1：保存账单     undefined：保存并通知租客
function doSendMessage(num){
	var row = $('#monthlyBillsDg').datagrid('getSelected');
	console.log(row);
	if(doCheckSendMessage()==0){
		return;
	}
	var smPopId = $("#sendMessagePopId").val();
	var smrentId = $("#sendMessageRenterId").val();
	var smMoney = $("#sendMessagePirce").val();
	var smNote = $("#sendMessageNote").val();
	var smRentId = $("#sendMessageHouseRentId").val();
	var smNotRentId = $("#sendMessageHouseStoreId").val();
	var jciMessageNote = getJciMessageNote(row.jciLabelType);
	console.log('生成的是真么样：'+jciMessageNote.toString());
	if(smPopId==''||smPopId==null){
		$("#sendMessageTips").html("请选择一个租客或者住户执行发送短信！");
		return;
	}
	if($('.monthlyBillsPhone').val()==''||$('.monthlyBillsPhone').val()==null){
		$("#sendMessageTips").html("请选择有电话号码的住户！");
		return;
	}
	var jciMessageTime = ''
	if(num == 1){
		jciMessageTime = '只保存';
	}
	if(row.jciLabelType==3){
		var jciBillJson = JSON.parse(row.jciBillJson.getRealJsonStr());
		console.log(jciBillJson);
		var inputArray = $('#sendTable input');
		var length = inputArray.length - 2;
		var j = 0;
		for(var i = 0;i < length;i++){
			if($("#"+inputArray[i].id).val() == 0){
				jciBillJson.splice(j,1);
				j--;
			}else{
				jciBillJson[j].jciMoney = $("#"+inputArray[i].id).val();
			}
			j++;
		}
		console.log(jciBillJson);
		$.post("../updateContractInstallment.action",{
			jciId		: row.jciId,
			jciBillJson	: JSON.stringify(jciBillJson)
		},function(data){
			if(data.code < 1){
				myTips(data.msg,"error");
				return
			}
		});
	}
	showLoading();
	$.post("../sendMessageAndUpdate.action",{
		jciId			: row.jciId,
		jciMessageNote	: jciMessageNote,
		jciMessageTime  : jciMessageTime,
		jciOverdueDays  : $('#notDays').val()
	} ,function(isData) {
		if(isData<0||isData==''){
			myTips(isData.msg,"error");
			hideLoading();
			return;
		}
		if(num == 2){//发送短信
			var rowIndex = $('#monthlyBillsDg').datagrid('getRowIndex', $('#monthlyBillsDg').datagrid('getSelected'));
			$('#monthlyBillsDg').datagrid('updateRow', {
				index : rowIndex,
				row : {
					jciMessageTime : formatTime(getNowFormatDate(),2),
				}
			});
			hideLoading();
			var variableParameter 
			if(row.jciLabelType == ''|| row.jciLabelType == null){
				variableParameter = 0;//月结账单短信
			}else{
				variableParameter = 1;//临时账单短信
			}
			//租客催租短信JSON
			var renterRentJson= {
				smPopId 	: smPopId,
				smrentId	: smrentId,
				smMoney		: smMoney,
				smNote		: smNote,
				smRentId	: smRentId,
				smNotRentId	: smNotRentId,
				JciFukuanri : row.jciFukuanri,
				flag 		: '租客应收款',
				messageType	: 7,
				smUserId    : _loginUserId,
				variableParameter : variableParameter,
			};
			$.post("../massage/sendOutsideMessage.action",renterRentJson ,function(data) {
				hideLoading();
				if(data.code<0){
					myTips(data.msg,"error");
					hideLoading();
					return;
				}
				myTips("发送成功!","success");
                $('#readonlyMonthlyBillsDlg').dialog('close');
			});
		}else{
			hideLoading();
			myTips("账单保存成功!","success");
			$('#readonlyMonthlyBillsDlg').dialog('close');
			var current=$(".current").html();
			queryMonthlyBills(current,0,1);
		}
	});
	//发短信的同时生成一条财务跟进
    createFollow(num);
}
//微信公众号通知
function doSendTemplateMessage(){
    var row = $('#monthlyBillsDg').datagrid('getSelected');
    var rent=$("#sendMessageRentMoney").val();
    var otherCost=$("#sendMessagePirce").val()-$("#sendMessageRentMoney").val();
    var totalCost=$('#sendMessagePirce').val();
    var customer=$("#monthlyBillsRenter").val();
    var payDate=$("#monthlyBillsDate").text();
    $.post("../sendTemplateMessage.action",{
        toUserId:row.popId,
        toUserType:"bill",
        wxOpenid:row.wxOpenid,
        // templateId : "7v6Zjx9Wmw4xpN57RFz-G6hOV3q7TAa3dH7QZqsC89s",
		scene:2,
        firstValue:"尊敬的客户，您本期账单已生成，请及时缴纳。",
        keyValue1:row.detailedAddress,
        keyValue2:customer,
        keyValue3:row.jciPeriods,
        keyValue4:otherCost+"元",
        keyValue5:row.jciFukuanri,
        remarkValue:"点击消息全文，微信在线交房租."
    }, function(data) {
        if(data.code<0){
            myTips(data.msg,"error");
            hideLoading();
            return;
        }
        myTips("发送成功!","success");
    });
    //发送通知的同时生成一条财务跟进
    var num=1;
    createFollow(num);

}

//生成跟进
function createFollow(num){
    var row = $('#monthlyBillsDg').datagrid('getSelected');
    var sendMessageRentMoney = '';
    if(row.jciLabelType == ''|| row.jciLabelType == null){
        sendMessageRentMoney = $('#sendMessageRentMoney').val()!=0 ? '租金：'+$('#sendMessageRentMoney').val()+',' : '';
    }else{
        sendMessageRentMoney = $('#sendMessageRentMoney').val()!=0 ? '金额：'+$('#sendMessageRentMoney').val()+',' : '';
    }

    var sendMessageRentWater = $('#sendMessageRentWater').val()!=0 ? '水费：'+$('#sendMessageRentWater').val()+',' : '';
    var sendMessageRentEcl = $('#sendMessageRentEcl').val()!=0 ? '电费：'+$('#sendMessageRentEcl').val()+',' : '';
    var sendMessageRentGas = $('#sendMessageRentGas').val()!=0 ? '燃气费：'+$('#sendMessageRentGas').val()+',' : '';

    var sendMessageRentHotWater = $("#sendMessageRentHotWater").val()!=0 ? '热水费：' + $("#sendMessageRentHotWater").val()+"," : '';
    var sendMessageRentHotAir = $("#sendMessageRentHotAir").val()!=0 ? '暖气费：' + $("#sendMessageRentHotAir").val()+"," : '';

    var sendMessageRentOwe = $('#sendMessageRentOwe').val()!=0 ? ($('#sendMessageRentOwe').val() > 0 ? '历史欠结：'+$('#sendMessageRentOwe').val()+',':'历史结余：'+$('#sendMessageRentOwe').val()+',') : '';
    var sendMessageRentTV = $('#sendMessageRentTV').val()!=0 ? '电视费：'+$('#sendMessageRentTV').val()+',' : '';
    var sendMessageRentWifi = $('#sendMessageRentWifi').val()!=0 ? '网费：'+$('#sendMessageRentWifi').val()+',' : '';
    var sendMessageRentManage = $('#sendMessageRentManage').val()!=0 ? '物管费：'+$('#sendMessageRentManage').val()+',' : '';
    var monthlyBillsServer = $('#monthlyBillsServer').val()!=0 ? '租赁服务费：'+$('#monthlyBillsServer').val()+',' : '';
    var sendMessageRentOther = $('#sendMessageRentOther').val()!=0 ? '其他费用：'+$('#sendMessageRentOther').val()+',' : '';
    var sendMessageRentDamages = $('#sendMessageRentDamages').val()!=0 ? '违约金：'+$('#sendMessageRentDamages').val()+',' : '';
    var sendMessagePirce = '总金额：'+$('#sendMessagePirce').val();
    var markStr = '';
    if(num == 1){
        markStr = '保存账单：';
    }else{
        markStr = '已发送催收短信：';
    }
    var follow_mark = markStr+sendMessageRentMoney+sendMessageRentWater+sendMessageRentEcl+sendMessageRentHotWater+sendMessageRentHotAir
        +sendMessageRentGas+sendMessageRentHotWater+sendMessageRentHotAir
        +sendMessageRentOwe+sendMessageRentTV+sendMessageRentWifi+sendMessageRentManage
        +monthlyBillsServer+sendMessageRentOther+sendMessageRentDamages+sendMessagePirce;
    console.log("====="+follow_mark);
    $.post("../insertHousingFollow.action", {
        jhfHouseId			: row.hrHouseId,
        jhfHouse4rentId 	: row.hrId,
        jhfHouse4storeId 	: row.hrHouse4storeId,
        jhfFollowRemark 	: follow_mark,
        jhfRemind			: '否',
        jhfFollowResult 	: '跟进成功',
        jhfFollowBelong		: '租客',
        jhfPaymentWay 		: '财务跟进',
        jhfUserId			: _loginUserId,
        jhfDepartment 		: _loginDepartment,
        jhfStorefront 		: _loginStore,
    }, function(data) {});
}

//处理并拼接短信内容JSON
function getJciMessageNote(type){
	var jciMessageNote = '';
	var sysRentMoney,sysRentWater,sysRentEcl,sysRentGas,sysRentOwe,sysRentTV,sysRentWifi,sysRentManage,sysServer,sysOther,sysPower,sysRentDamages,
		sysPirce,sendMessageRentMoney,sendMessageRentWater,sendMessageRentEcl,sendMessageRentGas,sendMessageRentOwe,sendMessageRentTV,sendMessageRentWifi
		,sendMessageRentManage,sendMessageServer,sendMessageRentOther,sendMessagePower,sendMessageRentDamages,sendMessagePirce,monthlyBillsThisWater
		,monthlyBillsLastWater,monthlyBillsThisElectrit,monthlyBillsLastElectrit,monthlyBillsThisGas,monthlyBillsLastGas,
		monthlyBillsThisHotwater,monthlyBillsLastHotwater,monthlyBillsThisHotAir,monthlyBillsLastHotAir,//tzl
		sysRentHotWater,sysRentHotAir,sendMessageRentHotWater,sendMessageRentHotAir
		;
	console.log(type);
	console.log(typeof type);
	if(type == 1){
		
		sysRentHotWater = 0.0;
		sysRentHotAir = 0.0;
		
		sysRentMoney = $("#sendMessagePirce").val();
		sysRentWater = 0.0;
		sysRentEcl = 0.0;
		sysRentGas = 0.0;
		sysRentOwe = 0.0;
		sysRentTV = 0.0;
		sysRentWifi = 0.0;
		sysRentManage = 0.0;
		sysServer = 0.0;
		sysOther = 0.0;
		sysPower = $("#sendMessagePower").val();
		sysRentDamages = $('#sendMessageRentDamages').val();
		sysPirce = $("#sendMessagePirce").val();	
		sendMessageRentMoney = 0.0;
		sendMessageRentWater = 0.0;
		sendMessageRentEcl = 0.0;
		sendMessageRentGas = 0.0;
		
		sendMessageRentHotWater = 0.0;
		sendMessageRentHotAir = 0.0;
		
		sendMessageRentOwe = 0.0;
		sendMessageRentTV = 0.0;
		sendMessageRentWifi = 0.0;
		sendMessageRentManage = 0.0;
		sendMessageServer = 0.0;
		sendMessageRentOther = 0.0;
		sendMessagePower = $("#sendMessagePower").val();
		sendMessageRentDamages = $('#sendMessageRentDamages').val();
		sendMessagePirce = $("#sendMessagePirce").val();
		monthlyBillsThisWater = 0;
		monthlyBillsLastWater = 0;
		monthlyBillsThisElectrit = 0;
		monthlyBillsLastElectrit = 0;
		monthlyBillsThisGas = 0;
		monthlyBillsLastGas = 0;
		//tzl
		monthlyBillsThisHotwater = 0;
		monthlyBillsLastHotwater = 0;
		monthlyBillsThisHotAir = 0;
		monthlyBillsLastHotAir = 0;
		
	}else if(type == 3){
		console.log("33333333333333333333333333333333333333333");
		sysRentMoney = $("#sysRentMoney").val();
		sysRentWater = 0.0;
		sysRentEcl = 0.0;
		sysRentGas = 0.0;
		sysRentHotWater = 0.0;
		sysRentHotAir = 0.0;
		sysRentOwe = $("#sysRentOwe").val();
		sysRentTV = $("#sysRentTV").val();
		sysRentWifi = $("#sysRentWifi").val();
		sysRentManage = $("#sysRentManage").val();
		sysServer = $("#sysServer").val();
		sysOther = $("#sysOther").val();
		sysPower = $("#sysPower").val();
		sysRentDamages = $('#sysRentDamages').val();
		sysPirce = $("#sysPirce").val();

		sendMessageRentMoney = $("#sendMessageRentMoney").val();
		sendMessageRentWater = 0.0;
		sendMessageRentEcl = 0.0;
		sendMessageRentGas = 0.0;
		sendMessageRentHotWater = 0.0;
		sendMessageRentHotAir = 0.0;
		sendMessageRentOwe = $("#sendMessageRentOwe").val();
		sendMessageRentTV = $("#sendMessageRentTV").val();
		sendMessageRentWifi = $("#sendMessageRentWifi").val();
		sendMessageRentManage = $("#sendMessageRentManage").val();
		sendMessageServer = $("#monthlyBillsServer").val();
		sendMessageRentOther = $("#sendMessageRentOther").val();
		sendMessagePower = $("#sendMessagePower").val();
		sendMessageRentDamages = $('#sendMessageRentDamages').val();
		sendMessagePirce = $("#sendMessagePirce").val();

		monthlyBillsThisWater = 0.0;
		monthlyBillsLastWater = 0.0;
		monthlyBillsThisElectrit = 0.0;
		monthlyBillsLastElectrit = 0.0;
		monthlyBillsThisGas = 0.0;
		monthlyBillsLastGas = 0.0;
		//tzl
		monthlyBillsThisHotwater = 0.0;
		monthlyBillsLastHotwater = 0.0;
		monthlyBillsThisHotAir = 0.0;
		monthlyBillsLastHotAir = 0.0;
	}else{

		sysRentMoney = $("#sysRentMoney").val();
		sysRentWater = $("#sysRentWater").val();
		sysRentEcl = $("#sysRentEcl").val();
		sysRentGas = $("#sysRentGas").val();

		sysRentHotWater = $("#sysRentHotWater").val();
		sysRentHotAir = $("#sysRentHotAir").val();

		sysRentOwe = $("#sysRentOwe").val();
		sysRentTV = $("#sysRentTV").val();
		sysRentWifi = $("#sysRentWifi").val();
		sysRentManage = $("#sysRentManage").val();
		sysServer = $("#sysServer").val();
		sysOther = $("#sysOther").val();
		sysPower = $("#sysPower").val();
		sysRentDamages = $('#sysRentDamages').val();
		sysPirce = $("#sysPirce").val();
		sendMessageRentMoney = $("#sendMessageRentMoney").val();
		sendMessageRentWater = $("#sendMessageRentWater").val();
		sendMessageRentEcl = $("#sendMessageRentEcl").val();
		sendMessageRentGas = $("#sendMessageRentGas").val();

		sendMessageRentHotWater = $("#sendMessageRentHotWater").val();
		sendMessageRentHotAir = $("#sendMessageRentHotAir").val();

		sendMessageRentOwe = $("#sendMessageRentOwe").val();
		sendMessageRentTV = $("#sendMessageRentTV").val();
		sendMessageRentWifi = $("#sendMessageRentWifi").val();
		sendMessageRentManage = $("#sendMessageRentManage").val();
		sendMessageServer = $("#monthlyBillsServer").val();
		sendMessageRentOther = $("#sendMessageRentOther").val();
		sendMessagePower = $("#sendMessagePower").val();
		sendMessageRentDamages = $('#sendMessageRentDamages').val();
		sendMessagePirce = $("#sendMessagePirce").val();
		monthlyBillsThisWater = $(".monthlyBillsThisWater").val();
		monthlyBillsLastWater = $(".monthlyBillsLastWater").val();
		monthlyBillsThisElectrit = $(".monthlyBillsThisElectrit").val();
		monthlyBillsLastElectrit = $(".monthlyBillsLastElectrit").val();
		monthlyBillsThisGas = $(".monthlyBillsThisGas").val();
		monthlyBillsLastGas = $(".monthlyBillsLastGas").val();
		//tzl
		monthlyBillsThisHotwater = $(".monthlyBillsThisHotwater").val();
		monthlyBillsLastHotwater = $(".monthlyBillsLastHotwater").val();
		monthlyBillsThisHotAir = $(".monthlyBillsThisHotAir").val();
		monthlyBillsLastHotAir = $(".monthlyBillsLastHotAir").val();
	}
	//抄表日期
	var waterDate = $("#waterDate").val();
	var electDate = $("#electDate").val();
	var gasDate = $("#gasDate").val();
	
	var hotWaterDate = $("#hotWaterDate").val();
	var hotAirDate = $("#hotAirDate").val();
	
	//开始生成短信json
	var sendMessageNote = $("#sendMessageNote").val();
	var jciMessageNote = {
		sys : {
				
				
				rent	: sysRentMoney,
				water 	: sysRentWater,
				elect 	: sysRentEcl,
				gas 	: sysRentGas,
				
				hotWater : sysRentHotWater,
				hotAir : sysRentHotAir,
				
				owe		: sysRentOwe,
				tv 		: sysRentTV,
				wifi 	: sysRentWifi,
				manager : sysRentManage,
				server 	: sysServer,
				other	: sysOther,			
				power	: sysPower,
				damages	: sysRentDamages,
				total 	: sysPirce,	
		},
		msg : {
			
				rent	: sendMessageRentMoney,
				water 	: sendMessageRentWater,
				elect 	: sendMessageRentEcl,
				gas 	: sendMessageRentGas,
				
				hotWater : sendMessageRentHotWater,
				hotAir : sendMessageRentHotAir,
				
				owe		: sendMessageRentOwe,
				tv 		: sendMessageRentTV,
				wifi 	: sendMessageRentWifi,
				manager : sendMessageRentManage,
				server 	: sendMessageServer,
				power	: sendMessagePower,
				damages	: sendMessageRentDamages,
				total 	: sendMessagePirce,	
				other	: sendMessageRentOther,
		},
		note:sendMessageNote,
		waterThis : monthlyBillsThisWater,
		electThis : monthlyBillsThisElectrit,
		gasThis : monthlyBillsThisGas,
		
		hotWaterThis : monthlyBillsThisHotwater,
		hotAirThis : monthlyBillsThisHotAir,
		
		waterLast : monthlyBillsLastWater,
		electLast : monthlyBillsLastElectrit,
		gasLast : monthlyBillsLastGas,
		
		hotWaterLast : monthlyBillsLastHotwater,
		hotAirLast : monthlyBillsLastHotAir,
		
		waterDate : waterDate,
		electDate : electDate,
		gasDate : gasDate,
		
		hotWaterDate : hotWaterDate,
		hotAirDate : hotAirDate,
	};
	console.log(jciMessageNote);
	jciMessageNote = JSON.stringify(jciMessageNote);
	return jciMessageNote;
}
//分页操作
function sourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#monthlyBillsPage").remove();
		$("#monthlyBillsPageDiv")
				.append(
						"<div class='tcdPageCode' id='monthlyBillsPage' style='text-align:center;'></div>");
		$("#monthlyBillsPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryMonthlyBills(p, 1);
				}
			}
		});
	}
	if (type == 5) {
		pageNum = Math.ceil(totalNum / 8);
		$("#renterInstallmentPage").remove();
		$("#renterInstallmentPageDiv")
				.append(
						"<div class='tcdPageCode' id='renterInstallmentPage' style='text-align:center;'></div>");
		$("#renterInstallmentPage").createPage({
			onePageNums:15,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			addbr:true,
			backFn : function(p) {
				if (p <= pageNum) {
					queryRenterInstallment(p, 1);
				}
			}
		});
	}
}

//状态列抄表格式
function formatterMeterReadingRecord(value, row, index) {
	var meterReadingRecordStr = row.hsMeterReadingRecord.getRealJsonStr();
	var jsonData = eval('(' + meterReadingRecordStr + ')');
	
	if((jsonData.water.thisReading.length == 0)
		&&(jsonData.electrit.thisReading.length == 0)
		&&(jsonData.gas.thisReading.length == 0)
		&&((jsonData.hotwater == undefined)||(jsonData.hotwater != undefined && jsonData.hotwater.thisReading.length == 0))
		&&((jsonData.hotair == undefined)||(jsonData.hotair != undefined && jsonData.hotair.thisReading.length == 0))
	){
		row.meterReadingRecordRemark = '未抄表';
		return "<a style='text-decoration:none;color:blue;'>" + row.meterReadingRecordRemark + "</a>";
		
	}else{
		row.meterReadingRecordRemark = '已抄表';
		return "<a style='text-decoration:none;color:green;'>" + row.meterReadingRecordRemark + "</a>";
	}
	
}

//上一条下一条
function laterOrNextTenant(type) {
	$('#monthlyBillsDg').datagrid('clearChecked');
	var dataIndex = $(".monthlyBillsAddress_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".monthlyBillsAddress_index").val(num);
			changeData = $('#monthlyBillsDg').datagrid('getData').rows[num];
			$('#monthlyBillsDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#monthlyBillsDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".monthlyBillsAddress_index").val(num);
			changeData = $('#monthlyBillsDg').datagrid('getData').rows[num];
			$('#monthlyBillsDg').datagrid('selectRow',num);
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
		readonlyMonthlyBills(0);
	}
}

//状态列格式
function formatState(value, row, index) {
	if (row.jciState == '待收') {
		return "<a style='text-decoration:none;color:blue;'>" + row.jciState + "<a>";
	} else if (row.jciState == '已收'){
		return "<a style='text-decoration:none;color:green;'>" + row.jciState + "<a>";
	} else {
		return row.jciState;
	}
}
//切换租客和住户
function changeSendMan(){
	var sendType = $("#sendMessageManType").find("option:selected").text();
	var sendRenterPopId = $("#sendMessageManType").val();
	if(sendType=="住户"){
		$("#sendMessageName").show();
		$("#monthlyBillsRenter").hide();
		getResidentInfo();
	}else{
		$("#sendMessageName").hide();
		$("#monthlyBillsRenter").show();
		$('#sendMessagePopId').val($('#sendMessageManType').val().split('#')[0]);
		$('.monthlyBillsPhone').val($('#sendMessageManType').val().split('#')[1]);
		$('#addHrRenterNameRemark').val($('#sendMessageManType').val().split('#')[2])
	}
}
function getResidentInfo(){
	$('#sendMessagePopId').val($('#sendMessageName').val().split('#')[0]);
	$('.monthlyBillsPhone').val($('#sendMessageName').val().split('#')[1]);
	$('#addHrRenterNameRemark').val($('#sendMessageName').val().split('#')[2])
}
//租客分期账单付款凭证列格式
function formatPaymentVoucher(value, row, index) {
	if (row.jciPaymentVoucher != null && row.jciPaymentVoucher != '') {
		return '<a style="text-decoration:none;color:green;">有<a>';
	} else {
		return '<a style="text-decoration:none;color:blue;">无<a>';
	}
}
//租客分期账单租金列格式
function formatJciMoney(value, row, index) {
	if (row.jciMessageNote != null && row.jciMessageNote != '') {
		var jciMessageNote  = eval("("+row.jciMessageNote.getRealJsonStr()+")");
		
		
		return jciMessageNote.msg.total+'<a style="text-decoration:none;color:blue;">(总金额)<a>';
	} else {
		return row.jciMoney+'<a style="text-decoration:none;color:red;">(仅租金)<a>';
	}
}
//租客分期账单通知时间列格式
function formatJciMessageTime(value, row, index) {
	if (row.jciMessageTime != null && row.jciMessageTime != '') {
		return '<a style="text-decoration:none;color:blue;">'+row.jciMessageTime+'</a>';
	} else {
		return '<a style="text-decoration:none;color:red;">未发送</a>';
	}
}
//租客分期账单操作列格式
function formatConsole(value, row, index) {
	var jciLabelType = (row.jciLabelType == null || row.jciLabelType == '') ? 0 : row.jciLabelType;
	return '<a href="#" style="color:blue;" onclick="choseConstractInstallment('+index+','+jciLabelType+')">生成收支<a>';
}

function AutoSendMsgMatter(value, row, index){
	if (row.hsAutoSendMsg == "1") {
		return "<span style='text-decoration:none;color:green;'>自动发送<span>";
	}else{
		return "<span style='text-decoration:none;color:blue;'>手动发送<span>";
	}
}

//账单类型判断
function formatjciLabelType(value, row, index){
	var jciLabelType = '';
	if(row.jciLabelType == '' || row.jciLabelType == null){
		jciLabelType = '月结账单'
	}else if(row.jciLabelType == 1){
		jciLabelType = '临时账单'
	}else if(row.jciLabelType == 2){
		jciLabelType = '金融账单'
	}else if(row.jciLabelType == 3){
	    jciLabelType = '签约账单'
    }
	return jciLabelType;
}
/*
//跳转生成每期收支
function doFinancial(index){
	var rows = $('#monthlyBillsDg').datagrid('getRows');
    var row = rows[index];
	var skipJspName = '';
	var skipJspUrl = '';
	var skipJspIcon = '';
	var skipInputId = ['','',''];
	var skipInputVal = ['','',''];
	
	skipJspName = '收支管理';
	skipJspUrl = 'fg_financial';
	skipJspIcon = 'shouzhiluru';
	skipInputId[0] = 'searchAddCommunity';
	skipInputId[1] = 'searchAddBuilding';
	skipInputId[2] = 'searchAddDoorplateno';
	skipInputVal[0] = row.hrAddCommunity;
	skipInputVal[1] = row.hrAddBuilding;
	skipInputVal[2] = row.hrAddDoorplateno;
	
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[0],
		jsonVal:skipInputVal[0],
	});
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[1],
		jsonVal:skipInputVal[1],
	});
	parent._skipToChildJson.push({
		target:"i",
		id:skipInputId[2],
		jsonVal:skipInputVal[2],
	});
	parent._skipFunction.push("setRenterEveryFinancial()");
	parent._skipFunction.push("relationDlg(1,0)");
	window.parent.addTab(skipJspName,skipJspUrl+".jsp","icon icon-"+skipJspIcon);
	
}*/
function showPaymentVoucher(){
	var row = $("#monthlyBillsDg").datagrid("getSelected");
	var paymentVoucher = row.jciPaymentVoucher;
	if(paymentVoucher == "" || paymentVoucher == null){
		$.messager.alert('查看付款凭证', '没有查询到付款凭证！', 'info');
		return;
	}
	paymentVoucher = JSON.parse('[' + paymentVoucher.getRealJsonStr() +']');
	$("#paymentVoucherDlg").dialog({
		title : '查看付款凭证',
		top : getTop(270),
		left : getLeft(550),
		width : 550,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
	
		}
	});
	$("#paymentVoucherDlg").dialog('open');
	$("#imgWrapper").empty();
	$('#describe').empty();
	var path = '';
	for(var i in paymentVoucher){
		if(paymentVoucher[i] != null){
			if(paymentVoucher[i].type=='img'){
				path += paymentVoucher[i].data + ',';
			}else if(paymentVoucher[i].type=='txt'){
				$('#describe').append('<p>' + paymentVoucher[i].data + '</p>');
			}
		}
	}
	if(path == ""){
		$("#imgWrapper").append("<p>没有查询到付款凭证</p>");
		return;
	}
	path = path.substring(0, path.length-1);
	var img = path.split(',');
	$.post("../upload/getDownloadUrl.action",{
		baseUrls : path
	},function(data){
		var newUrls = data.split(",");
		$('#imgWrapper').append('<ul class="imageList"></ul>');
		for(var i in img){
			var j = parseInt(i) + parseInt(img.length);
			$('#imgWrapper .imageList').append('<li style="float:left;position:relative;">' +
					'<img class="installmentImg contFile" style="display:inline-block;width:150px;height:200px;margin:5px;border:1px solid #f0f0f0;position:relative;z-index:2;cursor:pointer;" href="'+newUrls[i]+'" src="'+newUrls[j]+'">' +
					'</li>');
		}
		$(".installmentImg").colorbox({
			rel:'installmentImg', 
			transition:"none", 
			width:"60%", 
			height:"90%"
		});
	});
}
//计算筛选最大金额
function countMoneyMax(){
	var searchMoneyMin = $('#searchMoneyMin').val(); 
	if(searchMoneyMin!==""){
		searchMoneyMax = accAdd(searchMoneyMin,200);
		$('#searchMoneyMax').val(searchMoneyMax);
	}
	if (event.keyCode == 13) {
		queryMoney();
	}
}
	
//筛选,当pageNumber==1时，突出显示
function queryMoney(){
	var row = $('#monthlyBillsDg').datagrid('getRows');
	var searchMoneyMin = $('#searchMoneyMin').val(); 
	var searchMoneyMax = $('#searchMoneyMax').val(); 
	for(var i in row){
		row[i].pageNumber =0;
		if(row[i].jciMessageNote!="" && row[i].jciMessageNote!=null){
			var jciMessageNote  = eval("("+row[i].jciMessageNote.getRealJsonStr()+")");
			if(searchMoneyMin=="" && searchMoneyMax!=""){
				if(accSub(jciMessageNote.msg.total,searchMoneyMax)<0||accSub(jciMessageNote.msg.total,searchMoneyMax)==0){
					row[i].pageNumber =1;
				}
			}
			if(searchMoneyMin!="" && searchMoneyMax==""){
				if(accSub(jciMessageNote.msg.total,searchMoneyMin)>0||accSub(jciMessageNote.msg.total,searchMoneyMin)==0){
					row[i].pageNumber =1;
				}
			}
			if(searchMoneyMin!="" && searchMoneyMax!=""){
				if((accSub(jciMessageNote.msg.total,searchMoneyMin)>0||accSub(jciMessageNote.msg.total,searchMoneyMin)==0) 
						&& (accSub(jciMessageNote.msg.total,searchMoneyMax)<0||accSub(jciMessageNote.msg.total,searchMoneyMax)==0) ){
					row[i].pageNumber =1;
				}
			}
		}else{
			if(searchMoneyMin=="" && searchMoneyMax!=""){
				if(accSub(row[i].jciMoney,searchMoneyMax)<0||accSub(row[i].jciMoney,searchMoneyMax)==0){
					row[i].pageNumber =1;
				}
			}
			if(searchMoneyMin!="" && searchMoneyMax==""){
				if(accSub(row[i].jciMoney,searchMoneyMin)>0||accSub(row[i].jciMoney,searchMoneyMin)==0){
					row[i].pageNumber =1;
				}
			}
			if(searchMoneyMin!="" && searchMoneyMax!=""){
				if((accSub(row[i].jciMoney,searchMoneyMin)>0||accSub(row[i].jciMoney,searchMoneyMin)==0) 
						&& (accSub(row[i].jciMoney,searchMoneyMax)<0||accSub(row[i].jciMoney,searchMoneyMax)==0) ){
					row[i].pageNumber =1;
				}
			}
		}
	}
	$("#monthlyBillsDg").datagrid("loadData",row);
}

/********************************** 微信相关的处理 ***********************************/
//查看微信支付账单信息窗口
function showPaymentInfoTable(){
	$("#paymentInfoTableDlg").dialog({
		title : '查看微信支付账单信息',
		top : getTop(270),
		left : getLeft(1000),
		width : 1000,
		height : 400,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
	
		}
	});
	var row = $('#monthlyBillsDg').datagrid('getSelected');
	$.post("../selectWxPayment.action", {
		wxpJciId			: row.jciId,
		splitFlag			: 1,
	}, function(data) {
		if(data.code==1){
			data=data.body;
			for (var i in data) {
				data[i].detailedAddress = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
			}	
			$("#paymentInfoDg").datagrid("loadData",data);
		}else{
			$("#paymentInfoDg").datagrid("loadData",[]);
			$('#paymentInfoDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}
	});
	$("#toolbarDiv").hide();
	$("#wxPaymenPageDiv").hide();
	$("#paymentInfoTableDlg").dialog('open');
}
function formatwxpTotalFee(value, row, index){
	if (row.wxpState =="已支付") {
		return "<a style='text-decoration:none;color:blue;'>" + accDiv(row.wxpTotalFee,100) + "<a>";
	} else if (row.wxpState ="未支付") {
		return "<a style='text-decoration:none;color:red;'>" + accDiv(row.wxpTotalFee,100)+ "<a>";
	}
}
function formatwxpState(value, row, index){
	if (row.wxpState =="已支付") {
		return "<a style='text-decoration:none;color:blue;'>" + row.wxpState + "<a>";
	} else if (row.wxpState ="未支付") {
		return "<a style='text-decoration:none;color:red;'>" + row.wxpState + "<a>";
	}
}
//微信支付账单窗口
function weChatPayBillInquiry(){
	$("#paymentInfoTableDlg").dialog({
		title : '微信支付账单',
		top : getTop(270),
		left : getLeft(1000),
		width : 1000,
		height : 500,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
	
		}
	});
	queryWxPayment(1,0);
	$("#toolbarDiv").show();
	$("#wxPaymenPageDiv").show();
	$("#paymentInfoTableDlg").dialog('open');
}
//微信窗口分页统计数据
function getwxPaymenPageCount(page, type) {
	var pageNum = 20;
	
	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();
	
	$.post("../queryLivingfeeRecordsCommon.action", {
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		splitFlag			: 0,
	}, function(data) {
		if (data.code<0 ||data.body[0].totalNum==0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"wxPaymen",0);
		} else {
			data=data.body;
			var countJson = {
					totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"wxPaymen",0);
		}
	}, "json");
}
//查询微信账单记录
function queryWxPayment(page, type) {
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var addCommunity = $("#searcAddCommunity").val();
	var addBuilding = $("#searcAddBuilding").val();
	var addDoorplateno = $("#searcAddDoorplateno").val();
	
	$.post("../selectWxPayment.action", {
		startNum			: startNum,
		endNum 				: endNum,
		addCommunity		: addCommunity,
		addBuilding			: addBuilding,
		addDoorplateno		: addDoorplateno,
		splitFlag			: 1,
	}, function(data) {
		if (data.code<0) {
			$('#paymentInfoDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryWxPayment","wxPaymen");
			}else{
				notCountPage(page, 0 ,"queryWxPayment","wxPaymen");
			}
		} else {
			data=data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryWxPayment","wxPaymen");
			}else{
				notCountPage(page, 1 , "queryWxPayment","wxPaymen");
			}
			for(var i in data){
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]=='';
					}
				}
				data[i].detailedAddress = data[i].addCommunity+ " " + data[i].addBuilding+ " " +data[i].addDoorplateno ;
			}
			$("#paymentInfoDg").datagrid("loadData", data);
		}
	}, "json");
}

function readonlyWxPament(row){
	$("#wxPaymenDlg").dialog({
		title : '微信支付详情',
		top : getTop(400),
		left : getLeft(660),
		width : 660,
		height : 420,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$(".xwtable3 span").text("");
	for(var i in row){
		$("#read"+i).text(row[i]);
		if(i=="wxpTotalFee"){
			$("#readwxpTotalFee").text(accDiv(row[i],100)+"元");
		}
		if(i=="wxpState"){
			if(row[i]=="未支付"){
				$("#readwxpState").css("color","red");
			}else if(row[i]=="已支付"){
				$("#readwxpState").css("color","blue");
			}
		}
	}
	var wxpExpenseRecord = eval("("+row.wxpExpenseRecord.getRealJsonStr()+")");
	for(var i in wxpExpenseRecord){
		$("#read"+i).text(wxpExpenseRecord[i]);
	}
	var waterSub = accSub(wxpExpenseRecord.waterNum,wxpExpenseRecord.lastwater);
	var ectricitySub = accSub(wxpExpenseRecord.electritNum,wxpExpenseRecord.lastelectrit);
	var gasSub = accSub(wxpExpenseRecord.gasNum,wxpExpenseRecord.lastgas);
	
	waterSub = waterSub<0 ? 0 : waterSub;
	ectricitySub = ectricitySub<0 ? 0 :ectricitySub;
	gasSub = gasSub<0 ? 0 :gasSub;
	
	$("#readwaterSub").text(waterSub);
	$("#readelectricitySub").text(ectricitySub);
	$("#readgasSub").text(gasSub);
	
	$("#wxPaymenDlg").dialog("open");
}
//上一条下一条
function laterOrNext(type) {
	var dataIndex = $(".wxPayment_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$(".wxPayment_index").val(num);
			changeData = $('#paymentInfoDg').datagrid('getData').rows[num];
			$('#paymentInfoDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#paymentInfoDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$(".wxPayment_index").val(num);
			changeData = $('#paymentInfoDg').datagrid('getData').rows[num];
			$('#paymentInfoDg').datagrid('selectRow',num);
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
		readonlyWxPament(changeData);
	}
}
//生成临时账单窗口
function generatingATemporaryBill(){
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
	$('#generatingATemporaryBill').attr('src','generatingATemporaryBillDlg.jsp');
	$('#generatingATemporaryBillDlg').dialog("open");
}

var totalMoney = 0;
function changeSendTotalMoney(){
	var lateFee = $('#lateFee').val()==''?'0':$('#lateFee').val();
	console.log(lateFee)
	lateFee = parseFloat(lateFee);
	var oldTotalAmount = parseFloat($('#oldTotalAmout').val());

	var totalAmount = (oldTotalAmount - lateFee).toFixed(2);

	$('#totalAmount').val(totalAmount)
}
function AddDecDate(date,type,num) {
	var begin = new Date(date);
	if(type == 1) {
		begin.setDate(begin.getDate() + num - 1);
	}else if(type == 2){
		begin.setMonth(begin.getMonth() + num);
		begin.setDate(begin.getDate() - 1);
	}else if(type == 3){
		begin.setFullYear(begin.getFullYear() + num);
		begin.setDate(begin.getDate() - 1);
	}
	return formatDate(begin);
}
function countTotalMoney() {
	var row = $('#monthlyBillsDg').datagrid('getSelected');
	var inputArray = $("#sendTable input");
	var totalMoney = 0.00;
	for(var i = 0;i < inputArray.length-2;i++){
		if($("#"+inputArray[i].id).attr("moneyType") == "退还定金:"){
			totalMoney = accSub(totalMoney,parseFloat($("#"+inputArray[i].id).val()));
		}else{
			totalMoney = accAdd(totalMoney,parseFloat($("#"+inputArray[i].id).val()));
		}
	}
	var today = new Date(formatTime(getNowFormatDate(), 2));
	var fukuanri = new Date(row.jciRegisterTime.split(" ")[0]);
	var notDays = 0;
	if(row.jciState == '待收'){
		if(today<=fukuanri){
			notDays = 0;
		}else{
			notDays = (today.getTime()-fukuanri.getTime())/(24 * 60 * 60 * 1000);
		}
	}else{
		notDays = row.jciOverdueDays;
	}
	$("#notDays").val(notDays);
	$("#sysRentDamages").val(accAdd(totalMoney*notDays*_lateFeeRate*0.01,0));
	$("#sendMessageRentDamages").val(accAdd(totalMoney*notDays*_lateFeeRate*0.01,0));
	$("#lateFee").val(accAdd(totalMoney*notDays*_lateFeeRate*0.01,0));
	$("#totalAmount").val(accAdd(totalMoney,totalMoney*notDays*_lateFeeRate*0.01))
	$("#sysPirce").val($("#totalAmount").val());
	$('#sendMessagePirce').val($("#totalAmount").val());
}
