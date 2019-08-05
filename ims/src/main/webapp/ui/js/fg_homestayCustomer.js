hsIdList = [];

//【短租房屋列表】
house_list_arr = []
//短租订单事件
event_list = []

$(function() {
	$("#orderDetail_index").val(0);
	$('#populationDg').datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			$('#population_index').val(rowIndex);
			populationDetailedDlg(rowData);
			
		}
	});
	$('#shortRentOrderDg').datagrid({
		onDblClickRow : function(rowIndex, data){
			$("#orderDetail_index").val(rowIndex);
			openOrderDetail(data);
			
		}
	});
	$('#customerInformation').datagrid({
		onDblClickRow : function(rowIndex, rowData){
			populationDetailedDlg(rowData)
			
		}
	});
	getListContract(_pageNum[0]);
});

function getListContract(page){
	var pageNum = 15;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var customerState = $('#customerState').val()
	var popName = $("#searchPopulationName").val();
	var popTelephone = $("#searchPopulationPhone").val();
	var popIdcard = $("#searchPopulationIdCard").val();
	var popUser = $("#searchRegisterGetUserId").val();
	var jsrrCustomerType = $('#customerType').val();
	
	var searchHouseStart = $('#searchHouseStart').val();
	var startTime ="",endTime="";
	var searchHouseEnd = $('#searchHouseEnd').val()
	if(searchHouseStart !='' && searchHouseEnd!=''){
		startTime = new Date(searchHouseStart).format('yyyy-MM-dd 00:00:00');
		endTime = new Date(searchHouseEnd).format('yyyy-MM-dd 23:59:59');
	}
	$.ajax({
		  type:"post",
		  url:"../customerOrder.action",
		  data:{
			  startNum 			: startNum,
			  endNum 			: endNum,
			  startTime 		: startTime,
			  endTime 			: endTime,
			  jsrcState			: customerState,
			  jsrrCustomerType	: jsrrCustomerType,
			  popName 			: popName,
			  popTelephone 		: popTelephone,
			  popIdcard 		: popIdcard,
			  popUser 			: popUser,
			  splitFlag 		: 1
		  },
		  dataType:"json",
		  success:function(data){
			  if (data.code<0) {
					$('#populationDg').datagrid({
						data : [],
						view : myview,
						emptyMsg : data.msg
					});
					if(page==1){
						notCountPage(0, 0 ,"getListContract","population");
					}else{
						notCountPage(page, 0 ,"getListContract","population");
					}
				} else {
					data=data.body;
					if(data.length<pageNum){
						notCountPage(page, 2 , "getListContract","population");
					}else{
						notCountPage(page, 1 , "getListContract","population");
					}
					var a=[];console.log("11"+data)
					for (var i in data) {
						for ( var j in data[i]) {
							if (data[i][j] == null) {
								data[i][j] = '';
							}
						}
						if(data[i].infoPopulation != undefined){
							var infoPopulation = data[i].infoPopulation;
							var recentTime = data[i].jsrcActualOccupancyTime;
							if(recentTime != ''){
								recentTime = new Date(recentTime).format('yyyy-MM-dd hh:mm:ss');
							}else{
								recentTime = '';
							}
							infoPopulation.jsrrCustomerType = data[i].jsrrCustomerType;
							infoPopulation.jsrrCheckInNum = data[i].jsrrCheckInNum;
							infoPopulation.userName = data[i].userName;
							infoPopulation.jsrrId = data[i].jsrrId;
							infoPopulation.jsrcState = data[i].jsrcState;
							infoPopulation.recentTime = recentTime;
							a.push(data[i].infoPopulation);
						}
					}
					$("#populationDg").datagrid("loadData", a);
				}
		  }
	})
}

//分页统计数据
function getpopulationPageCount(page) {
	var pageNum = 15;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var customerState = $('#customerState').val()
	var popName = $("#searchPopulationName").val();
	var popTelephone = $("#searchPopulationPhone").val();
	var popIdcard = $("#searchPopulationIdCard").val();
	var popUser = $("#searchRegisterGetUserId").val();
	var jsrrCustomerType = $('#customerType').val();
	
	var searchHouseStart = $('#searchHouseStart').val();
	var startTime ="",endTime="";
	var searchHouseEnd = $('#searchHouseEnd').val()
	if(searchHouseStart !='' && searchHouseEnd!=''){
		startTime = new Date(searchHouseStart).format('yyyy-MM-dd 00:00:00');
		endTime = new Date(searchHouseEnd).format('yyyy-MM-dd 23:59:59');
	}
	$.post("../customerOrder.action", {
		  jsrcState			: customerState,
		  jsrrCustomerType	: jsrrCustomerType,
		  popName 			: popName,
		  popTelephone 		: popTelephone,
		  popIdcard 		: popIdcard,
		  popUser 			: popUser,
		  splitFlag 		: 0
	}, function(data) {
		if (data.code<0) {
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"population",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(0,countJson,pageNum,page,"population",0);
		}
	}, "json");
}

//客人管理详细信息
function populationDetailedDlg(row){
	$('#pop_telephone').val(row.popTelephone);
	$('#pop_marriage_state').val(row.popMarriageState);
	$('#pop_occupation').val(row.popOccupation);
	$('#pop_degree_education').val(row.popDegreeEducation);
	$('#pop_inner_credit_level').val(row.popInnerCreditLevel);
	$('#pop_outer_credit_level').val(row.popOuterCreditLevel);
	$('#pop_name_remark').val(row.popNameRemark);
	
	if(row.popIdcardJson !='' && row.popIdcardJson != null){
		var identityInformation = row.popIdcardJson;
		identityInformation=JSON.parse(identityInformation)
		identityInformation=identityInformation.Certificate;
		console.log(identityInformation)
		var imgData =identityInformation.Base64Photo;
		$("#id_img_pers_open").attr("src","data:image/png;base64,"+imgData);
		$("#pop_idcard_type").val("身份证/临时身份证/户口本");
		$('#pop_idcard').val(identityInformation.IDNumber);
		$('#pop_name').val(identityInformation.Name);
		$("#pop_sex").val(identityInformation.Sex);
		$("#pop_nation").val(identityInformation.Nation);
		$("#pop_idcard_address").val(identityInformation.IDIssued);
		$("#pop_birth").val(identityInformation.Birthday.replace(/\./g,"-").substr(0,10));
	}else{
		$('#pop_name').val(row.popName);
		$('#pop_idcard_type').val(row.popIdcardType);
		$('#pop_sex').val(row.popSex);
		$('#pop_nation').val(row.popNation);
		$('#pop_idcard_address').val(row.popIdcardAddress);
		$('#pop_birth').val(row.popBirth);
		$('#pop_idcard').val(row.popIdcard);
	}
	$('#populationDetailedDlg input').attr('disabled', 'disabled');
	$('#populationDetailedDlg select').attr('disabled', 'disabled');
	$('#updateButton').show();
	$('#doUpdateButton').hide();
	if(row.popResident==1){
		$('#updateLivingMenButton').show();
	}else{
		$('#updateLivingMenButton').hide();
	}
	$('#populationDetailedDlg').dialog({
		title : '会员信息',
		top : getTop(500),
		left : getLeft(1040),
		width : 1100,
		height : 560,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#populationDetailedDlg [clear="clear"]').val('');
			$("#houseDg").datagrid("loadData", []);
			$("#id_img_pers_open").attr("src","images/userImage.png");
			$("#pop_idcard_type").val();
			$("#pop_sex").val();
			$("#pop_nation").val();
			$("#pop_idcard_address").val();
			$("#pop_birth").val();
			$("#openUpdateID").hide();
		},
	});
	//合约查找同住人
	$.post("../selectJourShortRentContract.action", {
		jsrrId: row.jsrrId,
	}, function(data) {
		if(data.code > 0){
			data = data.body;
			
			var popAry=[];
			for(var i in data){
				data[i].address=data[i].hsAddCommunity+data[i].hsAddBuilding+data[i].hsAddDoorplateno
				var pops = JSON.parse(data[i].popJson);
				for(var j in pops){
					var flag = true;
					for(var k in popAry){
						//遍历不重复的身份证Id
						if(popAry[k].popIdcard == pops[j].popIdcard){
							flag = false;
						}
					}
					if(flag && row.popIdcard != pops[j].popIdcard){
						popAry.push(pops[j])
					}
				}
			}
			$('#shortRentOrderDg').datagrid("loadData", data);
			$('#customerInformation').datagrid('loadData', popAry);
		}
	});
	$('#shortRentType').html('<option>'+row.jsrrCustomerType+'</option>').val(row.jsrrCustomerType);
	$('#checkInNum').val(row.jsrrCheckInNum);
	$('#populationDetailedDlg').dialog("open");
}
	