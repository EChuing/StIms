$(function(){
	getAllShortRentOrder(1,0);
	$("#orderDetail_index").val(0);
})

function getAllShortRentOrder(page, type){
	_pageNum[0] = page;
	var pageNum = 20;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	
	var jsrcState = $("#searchOrderState option:selected").val();
	var renterName = $("#searchRenterName").val();
	var hsAddCommunity = $("#searchHsAddCommunity").val();
	var hsAddDoorplateno = $("#searchHsAddDoorplateno").val();
	
	var jsrcBeginTime = $("#searchOrderStartTime").val();
	var jsrcEndTime = $("#searchOrderEndTime").val();
	var jsrcTypeOccupancy = $("#searchHouseType").val();
	var jsrcSaleNo = $("#searchSaleNo").val();
	
	$.ajax({
		url:"../selectJourShortRentContract.action",
		type:"post",
		data:{
			startNum : startNum,
			endNum : endNum,
			jsrcState:jsrcState,
			renterName:renterName,
			hsAddCommunity:hsAddCommunity,
			hsAddDoorplateno:hsAddDoorplateno,
			jsrcBeginTime:jsrcBeginTime,
			jsrcEndTime:jsrcEndTime,
			jsrcTypeOccupancy:jsrcTypeOccupancy,
			jsrcSaleNo:jsrcSaleNo,
			
		},
		success:function(result){
			if (result.code<0) {
				srOrderSourcePage(0, 0, 0);
				$('#shortRentOrderDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : result.msg
				});
			} else {
				var data=result.body;
				if (page == 1 && type == 0) {
					_indexNum[0] = 0;
					srOrderSourcePage(data[0].totalNum, page, 0);
				}
				for(var i in data){
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]=='';
						}
					}
					data[i].jsrcRegistrationTime = data[i].jsrcRegistrationTime.substring(0,data[i].jsrcRegistrationTime.length-2);
					data[i].address = data[i].hsAddCommunity + " " + data[i].hsAddDoorplateno;
					data[i].jsrcBeginTime = new Date(data[i].jsrcBeginTime).format('yyyy-MM-dd hh:mm:ss');
					data[i].jsrcEndTime = new Date(data[i].jsrcEndTime).format('yyyy-MM-dd hh:mm:ss');
				}
				console.log(data)
				$("#shortRentOrderDg").datagrid("loadData", data);
				$("#shortRentOrderDg").datagrid("selectRow", $("#orderDetail_index").val());
			}
		}
	})
}
//分页操作
function srOrderSourcePage(totalNum, page, type) {
	var pageNum = Math.ceil(totalNum / 10);
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 20);
		$("#shortRentOrderPage").remove();
		$("#shortRentOrderPageDiv")
				.append(
						"<div class='tcdPageCode' id='shortRentOrderPage' style='text-align:center;'></div>");
		$("#shortRentOrderPage").createPage({
			onePageNums:20,
			totalNum:totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					_pageNum[0] = p;
					_indexNum[0]=0;
					getAllShortRentOrder(p, 1);
				}
			}
		});
	}
}

