$(function(){
	queryStore(1, 0);
})

function queryStore(page, type){
	
	var startNum = (parseInt(page) - 1) * 20;
	var endNum = 20;
	
	$.ajax({
		url:"../queryHouseStore.action",
		type:"post",
		data:{
			startNum 			: startNum,
			endNum 				: endNum,
		},
		dataType:"json",
		success:function(result){
			if (data.code<0) {
				sourcePage(0, 0, 0);
				$('#trusteeshipDg').datagrid({
					data : [],
					view : myview,
					emptyMsg : data.msg
				});
			} else {
				data=data.body;
				if (page == 1 && type == 0) {
					_indexNum[0] = 0;
					sourcePage(data[0].totalNum, page, 0);
				}
				for (var i in data) {
					for(var j in data[i]){
						if(data[i][j]==null){
							data[i][j]='';
						}
					}
					data[i].detailedAddress = data[i].hsAddCommunity + " " + data[i].hsAddBuilding + " " + data[i].hsAddDoorplateno;
				}
				$("#trusteeshipDg").datagrid("loadData", data);
				$('#trusteeshipDg').datagrid("selectRow",_indexNum[0]);
			}
		}
	})
}