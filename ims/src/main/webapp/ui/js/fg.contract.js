var contractType='';
$(function() {
	//初始化列表
		//租客
		$('#tenantDg').datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#tenantDg').datagrid('getSelected');
				selectImg(row.jrrId);
				if (row) {
					$(".detailsOfTenantContract_index").val(rowIndex);
				//	tenantImgDg();
				//	open_common_img_dialog('private', 'tenant', 'tenantDg', 'jrrId', 'jrrImgPath', 'queryTenant', 'deleteRentContPic');
			}
			},
		});
		//业主
		$('#ownerDg').datagrid({
			onDblClickRow : function(rowIndex, rowData) {
				var row = $('#ownerDg').datagrid('getSelected');
				console.log(row);
				if (row) {
					//$(".detailsOfTenantContract_index").val(rowIndex);
					open_common_img_dialog('private', 'owner', 'ownerDg', 'jrlId', 'jrlImgPath', 'queryOwner', 'deleteLandContPic');
				}
			},
		});
		queryTenant(_pageNum[0], 0); 
		selectqueryOwner(_pageNum[0], 0);
		$('#managementOwner').hide();
		contractTo('tenant');

});
//单条查询电子签约合同照片
function selectImg(jrrId){
	$.post("../queryTenant.action",{
		jrrId:jrrId,
	},function(data) {
		console.log(data);
		if (data.code<0){
			tenantPage(0, 0, 0);
			$('#tenantDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			data=data.body;
			
				// 判断是否为电子签
				if(data[0].jrrTypeOfContract == 2){
					$.ajax({
						type: "POST",
						url: "../getContractImg.action",
						async:false,
						data: {
							no : data[0].jrrElectronicContractNo
						},
						iiindex:0,
						dataType: "json",
						success: function(result){
							console.log(result)
							if(result.code == 0){
								console.log(this.iiindex)
								console.log( data[this.iiindex])
								data[this.iiindex].contractImgPaths = result.body;
								var imgNum = parseInt(data[this.iiindex].jrrImgNum.split("/")[0]);
								imgNum += result.body.length;
								var jrrImgNum = imgNum + "/" + data[this.iiindex].jrrImgNum.split("/")[1];
								data[this.iiindex].jrrImgNum = jrrImgNum;
								tenantImgDg(data);
							}else{
								myTips(result.msg,"error");
							}
						}
					});
				}
			}
	}, "json");
}

//弹出排序方式窗口
function showTheSortDlg(){
	$("#theSortDlg").show();
}

//业主合约--排序点击事件 
$(document).click(function(e) {
	var clickId = $(e.target).attr('id');
	if(!clickId){
		$("#theSortDlg").fadeOut();
		return;
	}
	if(clickId=="showTheSortButton" || clickId=="showTheSortjia"){
		
	}else if(clickId.indexOf("theSortTerm")>-1){
		var alltheSortTerm = $('.theSortTerm');
		$('.theSortTerm').each(function(){
			$(this).removeClass("theSortTermSelect");
		});
		$("#"+clickId).addClass("theSortTermSelect");
		$('#theSortTermInput').val($("#"+clickId).attr("searchVal"));
		selectqueryOwner(1, 0);
	}else if(clickId.indexOf("theSortContrary")>-1){
		var alltheSortContrary = $('.theSortContrary');
		$('.theSortContrary').each(function(){
			$(this).removeClass("theSortContrarySelect");
		});
		$("#"+clickId).addClass("theSortContrarySelect");
		$('#theSortContraryInput').val($("#"+clickId).attr("searchVal"));
		selectqueryOwner(1, 0);
	}else{
		$("#theSortDlg").fadeOut();
	}
});

//分页统计总条数
function gettenantPageCount(page){
	var pageSize = 20;
	var contractType = $("#contractType").val();	//合约类型
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	console.log(contractType);
	$.post("../queryTenant.action",{
		jrrTypeOfContract: contractType,
		theSortTerm: theSortTerm,
		theSortContrary: theSortContrary
	},function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"tenant",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"tenant",0);
		}
	});
}

//查询所有租客合约信息,有条件则条件查询 1为纸质合同 2为电子签约
function queryTenant(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	
	var contractType = $("#contractType").val();	//合约类型
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	console.log(contractType);
	$.post("../queryTenant.action",{
		jrrTypeOfContract: contractType,
		startNum: startNum,
		endNum: endNum,
		theSortTerm: theSortTerm,
		theSortContrary: theSortContrary
	},function(data) {
		console.log(data);
		if (data.code<0){
			//tenantPage(0, 0, 0);
			$('#tenantDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"queryTenant","tenant");
			}else{
				notCountPage(page, 0 ,"queryTenant","tenant");
			}
		}else{
			data=data.body;
//			for(var i = 0 ; i < data.length;i++){
//				// 判断是否为电子签
//				if(data[i].jrrTypeOfContract == 2){
//					$.ajax({
//			             type: "POST",
//			             url: "../getContractImg.action",
//			             async:false,
//			             data: {
//			            	 no : data[i].jrrElectronicContractNo
//			             },
//			             iiindex:i,
//			             dataType: "json",
//			             success: function(result){
//			            	 console.log(result)
//			            	 if(result.code == 0){
//			            		 console.log(this.iiindex)
//			            		 console.log( data[this.iiindex])
//			            		 data[this.iiindex].contractImgPaths = result.body;
//			            		 var imgNum = parseInt(data[this.iiindex].jrrImgNum.split("/")[0]);
//			            		 imgNum += result.body.length;
//			            		 var jrrImgNum = imgNum + "/" + data[this.iiindex].jrrImgNum.split("/")[1];
//			            		 data[this.iiindex].jrrImgNum = jrrImgNum;
//			            	 }else{
//			            		 myTips(result.msg,"error");
//			            	 }
//		                 }
//			         });
//				}
//			}
// 			if (page == 1 && type == 0) {
// 				_indexNum[0] = 0;
// 				tenantPage(data[0].totalNum, page, 0);
// 			}
			if(data.length<endNum){
				notCountPage(page, 2 , "queryTenant","tenant");
			}else{
				notCountPage(page, 1 , "queryTenant","tenant");
			}
			for (var j in data) {
				console.log(data[j].jrrTypeOfContract);
				data[j].jrrTypeOfContract=data[j].jrrTypeOfContract==1 ? "纸质合同":"电子签约"
				data[j].houseAddress=data[j].hsAddCommunity+" "+data[j].hsAddBuilding+" "+data[j].hsAddDoorplateno;
			}
			$("#tenantDg").datagrid("loadData", data);
		}
	}, "json");
}

//租客合约分页操作
function tenantPage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#tenantPage").remove();
		$("#tenantPageDiv").append("<div class='tcdPageCode' id='tenantPage' style='text-align:center;'></div>");
		$("#tenantPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					queryTenant(p, 1);
				}
			}
		});
	}
}

//分页统计总条数
function getownerPageCount(page){
	var pageSize = 20;
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	$.post("../queryOwner.action",{
		theSortTerm: theSortTerm,
		theSortContrary: theSortContrary,
	},function(data) {
		if (data.code < 0 || data.body[0].totalNum == 0){
			var countJson = {
				totalNum:0,
			};
			getCountData(0,countJson,pageSize,page,"owner",0);
		} else {
			data=data.body;
			var countJson = {
				totalNum: data[0].totalNum,
			};
			getCountData(1,countJson,pageSize,page,"owner",0);
		}
	});
}

//查询所有业主合约信息
function selectqueryOwner(page, type) {
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	var theSortTerm = $('#theSortTermInput').val();
	var theSortContrary = $('#theSortContraryInput').val();
	$.post("../queryOwner.action",{
		startNum: startNum,
		endNum: endNum,
		theSortTerm: theSortTerm,
		theSortContrary: theSortContrary,
	},function(data) {
		if (data.code<0){
			//ownerPage(0, 0, 0);
			$('#ownerDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
			if(page==1){
				notCountPage(0, 0 ,"selectqueryOwner","owner");
			}else{
				notCountPage(page, 0 ,"selectqueryOwner","owner");
			}
		}else{
			data=data.body;
			console.log(data);
			// if (page == 1 && type == 0) {
			// 	_indexNum[0] = 0;
			// 	ownerPage(data[0].totalNum, page, 0);
			// }
			if(data.length<endNum){
				notCountPage(page, 2 , "selectqueryOwner","owner");
			}else{
				notCountPage(page, 1 , "selectqueryOwner","owner");
			}
			for (var i in data) {
				data[i].houseAddress=data[i].hsAddCommunity+" "+data[i].hsAddBuilding+" "+data[i].hsAddDoorplateno;
			}
			$("#ownerDg").datagrid("loadData", data);
		}
	}, "json");
}

//业主合约分页操作
function ownerPage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#ownerPage").remove();
		$("#ownerPageDiv").append("<div class='tcdPageCode' id='ownerPage' style='text-align:center;'></div>");
		$("#ownerPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					selectqueryOwner(p, 0);
				}
			}
		});
	}
}


//切换到业主合约、租客合约
function contractTo(type){
	if(type=="tenant"){
		$('#tenantContract').hide();
		$('#ownersContract').show();
		$('#contractTypeDiv').show();
		$('#managementOwner').hide();
		$('#managementTenant').show();
		$('#contractSortDiv').hide();
		$('#tenantSortDiv').show();
		$('.owners').hide();
		$('.tenant').show();
		queryTenant(_pageNum[0], 0);
	}else if(type=="owners"){
		
		$('#tenantContract').show();
		$('#ownersContract').hide();
		$('#contractTypeDiv').hide();
		$('#managementOwner').show();
		$('#managementTenant').hide();
		$('#contractSortDiv').show();
		$('#tenantSortDiv').hide();
		$('.owners').show();
		$('.tenant').hide();
		selectqueryOwner(_pageNum[0], 0);
	}
}


//弹出排序方式窗口
function tenantTheSortDlg(){
	$("#tenantSortDlg").show();
}

//租客合约--排序点击事件 
$(document).click(function(e) {
	var clickId = $(e.target).attr('id');
	if(!clickId){
		$("#tenantSortDlg").fadeOut();
		return;
	}
	if(clickId=="showTenantSortButton2" || clickId=="showTenantSortjia2"){
		
	}else if(clickId.indexOf("theSortTerm")>-1){
		var alltheSortTerm = $('.theSortTerm');
		$('.theSortTerm').each(function(){
			$(this).removeClass("theSortTermSelect");
		});
		$("#"+clickId).addClass("theSortTermSelect");
		$('#theSortTermInput2').val($("#"+clickId).attr("searchVal"));
		queryTenant(1, 0);
	}else if(clickId.indexOf("theSortContrary")>-1){
		var alltheSortContrary = $('.theSortContrary');
		$('.theSortContrary').each(function(){
			$(this).removeClass("theSortContrarySelect");
		});
		$("#"+clickId).addClass("theSortContrarySelect");
		$('#theSortContraryInput2').val($("#"+clickId).attr("searchVal"));
		queryTenant(1, 0);
	}
});
