$(function(){
//	addLoading();
//	hideLoading();
	$('#otherDataDg').datagrid("loadData", otherData);
	loadBasicData();
})

var landlordContract = [];
function loadBasicData(){
	$.post("../getSandboxieBasicData.action", function(data) {
		if(data!= -1 && data != null && data.isCompanyBasicData != undefined){
			var basicData = [eval('('+ data.isCompanyBasicData +')')];
			$('#basicDataDg').datagrid("loadData", basicData);
			landlordContract = eval('('+ data.isLandlordContract +')');
		}else{
			var noData = [];
			$('#basicDataDg').datagrid({
				data : noData,
				view : myview,
				emptyMsg : '没有公司基础数据！'
			});
		}
	})
	var noData = [];
	$('#resultDataDg').datagrid({
		data : noData,
		view : myview,
		emptyMsg : '暂无数据！'
	});
}

var editIndexBD = undefined;
function endBDEditing(){
	if (editIndexBD == undefined){return true}
	if ($('#basicDataDg').datagrid('validateRow', editIndexBD)){
		$('#basicDataDg').datagrid('endEdit', editIndexBD);
		editIndexBD = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickBDCell(index, field){
	if (endBDEditing()){
		$('#basicDataDg').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		editIndexBD = index;
	}
}

var editIndexOther = undefined;
function endOtherEditing(){
	if (editIndexOther == undefined){return true}
	if ($('#otherDataDg').datagrid('validateRow', editIndexOther)){
		$('#otherDataDg').datagrid('endEdit', editIndexOther);
		editIndexOther = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickOtherCell(index, field){
	if (endOtherEditing()){
		$('#otherDataDg').datagrid('selectRow', index).datagrid('editCell', {index:index,field:field});
		editIndexOther = index;
	}

}

function deduction(){
	$('#basicDataDg').datagrid('endEdit', 0);
	$('#otherDataDg').datagrid('endEdit', 0);
	if(landlordContract.length == 0){
		$('#tip').text('公司没有录入房源数据无法推算！');
		return;
	}
	var BDRow = $('#basicDataDg').datagrid('getData').rows[0];
	var OtherRow = $('#otherDataDg').datagrid('getData').rows[0];
	for(var key in BDRow){
		if(BDRow[key]==null || BDRow[key]==undefined || BDRow[key]==''){
			$('#tip').text('有参数未填,请填写完整参数！');
			return;
		}
		if(BDRow[key] < 0){
			$('#tip').text('参数不能小于0！');
			return;
		}
	}
	for(var key in OtherRow){
		if(OtherRow[key] == null || OtherRow[key] == undefined || OtherRow[key] == ''){
			$('#tip').text('有参数未填,请填写完整参数！');
			return;
		}
		if(OtherRow.landlordContractPeriod <= 0 || OtherRow.renterContractPeriod <= 0){
			$('#tip').text('合约周期不能小于1！');
			return;
		}
		if(OtherRow[key] < 0){
			$('#tip').text('参数不能小于0！');
			return;
		}
	}
	if((parseFloat(OtherRow.landlordNoDepositProportion) + parseFloat(OtherRow.landlordDepositProportion) + parseFloat(OtherRow.landlordRenew)) != 100||(parseFloat(OtherRow.renterNoDepositProportion) + parseFloat(OtherRow.renterDepositProportion) + parseFloat(OtherRow.renterRenew)) != 100){
		$('#tip').text('退房续签事件比例之和需为100%！');
		return;
	}
	$('#tip').text('')
	showLoading();
	$.post("../deduction.action",{
		storeHouseCount 			: BDRow.storeHouseCount,
		rentHouseCount 				: BDRow.rentHouseCount,
		averageLandlordMoney 		: BDRow.averageLandlordMoney,
		middleLandlordMoney 		: BDRow.middleLandlordMoney,
		averageRenterMoney 			: BDRow.averageRenterMoney,
		middleRenterMoney 			: BDRow.middleRenterMoney,
		balance 					: BDRow.balance,
		landlordDepositCount 		: OtherRow.landlordDepositCount,
		renterDepositCount 			: OtherRow.renterDepositCount,
		landlordNoDepositProportion : OtherRow.landlordNoDepositProportion,
		landlordDepositProportion 	: OtherRow.landlordDepositProportion,
		landlordRenew				: OtherRow.landlordRenew,
		renterNoDepositProportion 	: OtherRow.renterNoDepositProportion,
		renterDepositProportion 	: OtherRow.renterDepositProportion,
		renterRenew 				: OtherRow.renterRenew,
		landlordContractPeriod 		: OtherRow.landlordContractPeriod,
		renterContractPeriod 		: OtherRow.renterContractPeriod,
		landlordSignCount 			: OtherRow.landlordSignCount,
		renterSignCount 			: OtherRow.renterSignCount
	},function(data){
		hideLoading();
		$('#resultDataDg').datagrid("loadData", data);
		loadhighcharts(getSeries(data));
	})
}

function loadhighcharts(data){
	 $('#chart').highcharts({
		 	chart: {
		 		type: 'spline',
		 	},
	        title: {
	            text: '公寓公司经营状况-沙盘推演',
	        },
	        subtitle: {
	            text: '技术支持：房至尊',
	        },
	        yAxis: {
	            title: {
	                text: '金额(元)'
	            },
	        },
	        tooltip: {
	            valueSuffix: '元'
	        },
	        series: [{
	        	name : '手上现金数J(按租金均值算)',
	        	data : data[0],
	        	color : '#FFA07A'
	        },{
	        	name : '手上现金数Z(按租金中位算)',
	        	data : data[1]
	        }]
	    });
}

function getSeries(data){
	var average = [];
	var middle = [];
	for(var i = 0; i < data.length; i++){
		average.push([data[i].month,data[i].averageBalance]);
		middle.push([data[i].month,data[i].middleBalance]);
	}
	return [average,middle];
}
var otherData = [{
	landlordDepositCount : 1,
	renterDepositCount : 1,
	renterNoDepositProportion : 25,
	renterDepositProportion : 25,
	renterRenew : 50,
	renterContractPeriod : 6,
	landlordNoDepositProportion : 25,
	landlordDepositProportion : 25,
	landlordRenew : 50,
	landlordContractPeriod : 12,
	landlordSignCount : 10,
	renterSignCount : 15
}]
