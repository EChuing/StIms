var allUpload = true;
var imgList = [];
$(function(){
	for (var i in _loginCompanyRentDistrict) {
		$("#choseDistrict").append("<option value = '" + _loginCompanyRentDistrict[i] + "'>" + _loginCompanyRentDistrict[i] + "</option>");
	}
	$('#transformState').change(function(){
		if($('#transformState').val() == 0){
			$('#transformationDiv').hide();
		}else{
			$('#transformationDiv').show();
		}
	});
	$('#transformState2').change(function(){
		if($('#transformState2').val() == 0){
			$('#transformationDiv2').hide();
		}else{
			$('#transformationDiv2').show();
		}
	});
	$('button').click(function(){
		if ($(this).hasClass('btn-default')) {
			$(this).removeClass('btn-default');
			$(this).addClass('btn-success');
		} else {
			$(this).removeClass('btn-success');
			$(this).addClass('btn-default');
		}
	});
	$('#houseDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			queryRentUnit(1, 0);
		},
		onDblClickRow : function(rowIndex, rowData) {
			updatePushHouseDlg();
		}
	})

	
	$('#rentUnitDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			selectBkHouseStatus();
		},
		onDblClickRow : function(rowIndex, rowData) {
			updatePushRentUnitDlg();
		}
	})
	$('#houseStatusDg').datagrid({
		onClickRow : function(rowIndex, rowData) {
			
		},
		onDblClickRow : function(rowIndex, rowData) {
			
		}
	})
	getBrandCode();
	queryPushHouse(1, 0);
});
function checkOnoff(){
	if ($('#onoff').val() == 0) {
		$('#onoffReasonDiv').show();
	} else {
		$('#onoffReasonDiv').hide();
	}
}
//获取品牌
function getBrandCode(){
	$.post('../bkapi.action',{
		pbhApi:"getBrandList",
	},function(data) {
		if (data.code < 0) {
			myTips(data.msg, 'error');
		}else{
			$('#brandCode').val(data.body[0].code);
			console.log('商户品牌Code：'+data.body[0].code);
		}
	});
}
function queryCityCode(){
	var cityName = $('#cityName').val();
	if (cityName == '') {
		return;
	}
	for(var i in _cityCode){
		if (cityName == _cityCode[i].area) {
			$('#cityCode').val(_cityCode[i].code);
			break;
		} else {
			$('#cityCode').val('');
		}
	}
	if($('#cityCode').val() == ''){
		myTips("城市名不完整或暂不支持该城市房源发布","error");
		return;
	}
}

function filterCombo(q,row){
    var tmpText = row.text;
    var opts = $(this).combobox('options');
    if(row[opts.textField].indexOf(q) != -1){
    	return true;
    }else{
    	row.text = pinyin.getCamelChars(tmpText);
        if(row[opts.textField].indexOf(q) != -1){
            row.text = tmpText;
            return true;
        }else{
        	row.text = pinyin.getFullChars(tmpText);
        	if(row[opts.textField].indexOf(q) != -1){
        		row.text = tmpText;
                return true;
        	}else{
                row.text = tmpText;
                return false
        	}
        }
    }
}
//贝壳图片上传
function uploadBk(){
	var att = $("#att").val();
	$.post("../getAttachment.action",{
		att : att
	}, function(data) {
		if (data.code < 0) {
			return;
		}
		data = data.body;
		var path = data[0].path.getRealJsonStr();
		var img = eval('([' + path + '])');
		var kk = 0;
		for (var i in img) {
			if (img[i].bk == undefined) {
				allUpload = false;
				var pbhDetail = {
					id: att+'',
					imageUrl: img[i].path,
					callBackUrl: 'http://www.fangzhizun.com/beike/upload/?coId='+_loginCoId+'&att='+att
				};
				pbhDetail = JSON.stringify(pbhDetail);
				$.post('../bkapi.action',{
					pbhApi:'uploadImage',
					pbhDetail:pbhDetail
				});
			} else {
				kk++;
			}
		}
		if (kk == img.length) {
			allUpload = true;
		}
		if (!allUpload) {
			setTimeout(function(){
				uploadBk();
			},10 * 1000);
		}
		console.log('allUpload:'+allUpload);
	});
}
function updateBkType(){
	var arr = [];
	$('#imgWrapperAttachment .attachmentLi').each(function(){
		var item = {};
		var path = $(this).find('.attachmentImg').attr('src');
		var type = $(this).find('.picType').val();
		var cover = 0;
		console.log();
		if ($(this).find('.cover').css('display') != undefined && $(this).find('.cover').css('display') != 'none') {
			cover = 1;
		}
		item.path = path;
		item.type = type;
		item.cover = cover;
		arr.push(item);
	});
	//console.log(JSON.stringify(arr));
	
	$.post('../updateBkType.action', {
		att: $('#att').val(),
		bk: JSON.stringify(arr)
	}, function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
		}
	});
}

//城市代码
var _cityCode=[{"code":"110000","area":"北京市"},{"code":"120000","area":"天津市"},{"code":"210200","area":"大连市"},{"code":"320100","area":"南京市"},{"code":"370200","area":"青岛市"},{"code":"510100","area":"成都市"},{"code":"330100","area":"杭州市"},{"code":"131000","area":"廊坊市"},{"code":"440100","area":"广州市"},{"code":"320500","area":"苏州市"},{"code":"440300","area":"深圳市"},{"code":"210100","area":"沈阳市"},{"code":"130100","area":"石家庄"},{"code":"410100","area":"郑州市"},{"code":"350100","area":"福州市"},{"code":"430100","area":"长沙市"},{"code":"500000","area":"重庆市"},{"code":"420100","area":"武汉市"},{"code":"610100","area":"西安市"},{"code":"350200","area":"厦门市"},{"code":"320200","area":"无锡市"},{"code":"230100","area":"哈尔滨市"},{"code":"530100","area":"昆明市"},{"code":"330200","area":"宁波市"},{"code":"370101","area":"济南市"},{"code":"310000","area":"上海市"},{"code":"340100","area":"合肥市"},{"code":"370600","area":"烟台市"},{"code":"441300","area":"惠州市"},{"code":"441900","area":"东莞市"},{"code":"130600","area":"保定市"},{"code":"610500","area":"渭南市"},{"code":"888888","area":"测试城市"},{"code":"440600","area":"佛山市"},{"code":"440400","area":"珠海市"},{"code":"442000","area":"中山市"},{"code":"460100","area":"海口市"},{"code":"460200","area":"三亚市"},{"code":"130700","area":"张家口市"},{"code":"469005","area":"文昌市"},{"code":"469002","area":"琼海市"},{"code":"469006","area":"万宁市"},{"code":"469028","area":"陵水黎族自治县"},{"code":"130800","area":"承德市"},{"code":"130300","area":"秦皇岛市"},{"code":"441200","area":"肇庆市"},{"code":"441800","area":"清远市"},{"code":"469023","area":"澄迈县"},{"code":"350500","area":"泉州市"},{"code":"350600","area":"漳州市"},{"code":"469024","area":"临高县"},{"code":"321100","area":"镇江市"},{"code":"330400","area":"嘉兴市"},{"code":"130900","area":"沧州,市"},{"code":"131100","area":"衡水市"},{"code":"130500","area":"邢台市"},{"code":"130400","area":"邯郸市"},{"code":"511100","area":"乐山市"},{"code":"511400","area":"眉山市"},{"code":"513400","area":"凉山彝族自治州"},{"code":"421100","area":"黄冈市"},{"code":"140100","area":"太原市"},{"code":"330500","area":"湖州市"},{"code":"330600","area":"绍兴市"},{"code":"341000","area":"黄山市"},{"code":"430300","area":"湘潭市"},{"code":"532900","area":"大理白族自治州,"},{"code":"530700","area":"丽江市"},{"code":"530300","area":"曲靖市"},{"code":"341100","area":"滁州市"},{"code":"532800","area":"西双版纳傣族自治州"},{"code":"530500","area":"保山市"},{"code":"210300","area":"鞍山市"},{"code":"469003","area":"儋州市"},{"code":"469030","area":"琼中黎族苗族自治县"},{"code":"469027","area":"乐东黎族自治县"},{"code":"469001","area":"五指山市"},{"code":"469029","area":"保亭黎族苗族自治县"},{"code":"530800","area":"普洱市"},{"code":"469021","area":"定安县"},{"code":"320400","area":"常州市"},{"code":"532300","area":"楚雄彝族自治州"},{"code":"533100","area":"德宏傣族景颇族自治州"},{"code":"533400","area":"迪庆藏族自治州"},{"code":"532500","area":"红河哈尼族彝族自治州"},{"code":"330700","area":"金华市"},{"code":"530900","area":"临沧市"},{"code":"360100","area":"南昌市"},{"code":"450100","area":"南宁市"},{"code":"331000","area":"台州市"},{"code":"330300","area":"温州市"},{"code":"320300","area":"徐州市"},{"code":"320900","area":"盐城市"},{"code":"321000","area":"扬州市"},{"code":"220100","area":"长春市"},{"code":"340500","area":"马鞍山市"},{"code":"510600","area":"德阳市"},{"code":"140700","area":"晋中市"},{"code":"530400","area":"玉溪市"},{"code":"320600","area":"南通市"},{"code":"320800","area":"淮安市"},{"code":"350800","area":"龙岩市"},{"code":"620100","area":"兰州市"},{"code":"520100","area":"贵阳市"},{"code":"130200","area":"唐山市"},{"code":"420500","area":"宜昌市"},{"code":"420600","area":"襄阳市"},{"code":"220200","area":"吉林市"},{"code":"321200","area":"泰州市"},{"code":"210800","area":"营口市"},{"code":"150100","area":"呼和浩特市"},{"code":"150200","area":"包头市"},{"code":"150600","area":"鄂尔多斯市"},{"code":"640100","area":"银川市"},{"code":"630100","area":"西宁市"},{"code":"370700","area":"潍坊市"},{"code":"371000","area":"威海市"},{"code":"371300","area":"临沂市"},{"code":"370800","area":"济宁市"},{"code":"371500","area":"聊城市"},{"code":"650100","area":"乌鲁木齐市"},{"code":"421200","area":"咸宁市"},{"code":"469022","area":"屯昌县"}];

//查询发布房源
function queryPushHouse(){
	$.post('../selectBkHouse.action', {
		
	}, function(data){
		if(data.code < 0){
			$('#houseDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}else{
			var dataJson=data.body;
			$('#houseDg').datagrid("loadData", dataJson);
			//console.log(dataJson);
			$('#houseDg').datagrid("selectRow", _indexNum[0]);
			queryRentUnit(1, 0);
		}
	})
	
}
//查询出租单元
function queryRentUnit(){
	var row = $('#houseDg').datagrid('getSelected');
	//console.log(row);
	$.post('../selectBkRentUnit.action', {
		pbruHouseId:row.pbhHouseId,
	}, function(data){
		if(data.code==1){
			var dataJson=data.body;
			$('#rentUnitDg').datagrid("loadData", dataJson);
			//console.log(dataJson);
			$('#rentUnitDg').datagrid("selectRow", _indexNum[0]);
			selectBkHouseStatus();
		}else{
			$('#rentUnitDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}
	})
}
//查询状态
function selectBkHouseStatus(){
	var row = $('#rentUnitDg').datagrid('getSelected');
	$.post('../selectBkHouseStatus.action', {
		pbhsHouseId:row.pbruUnitId,
	}, function(data){
		if(data.code < 0){
			$('#houseStatusDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});
		}
		var dataJson=data.body;
		$('#houseStatusDg').datagrid("loadData", dataJson);
	})
}

function approvalStatus(val,row){
	if(val==3){
		return '<span>审核通过</span>';
	}else if(val==2){
		return '<span>未通过</span>';
	}else if(val==1){
		return '<span>审核中</span>';
	}else if(val==0){
		return '<span>无</span>';
	}
	
} 
function upperAndLowerShelfStatus(val,row){
	if(val==3){
		return '<span>下架中</span>';
	}else if(val==2){
		return '<span>已上架</span>';
	}else if(val==1){
		return '<span>上架中</span>';
	}else if(val==0){
		return '<span>未上架</span>';
	}
}
function problemListing(val,row){
	if(val==1){
		return '<span>是</span>';
	}else if(val==0){
		return '<span>否</span>';
	}
}

function pushHouseDlg() {
	$('#pushHouseDlg').dialog({
		title : '发布房源',
		top : getTop(260),
		left : getLeft(940),
		width : 940,
		height : 260,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#pushHouseDlg [clear="clear"]').val('');
			$('#pushHouseDlg [clean="clean"]').html('');
			$('#pushHouseDlg [choose="choose"]').val('0');
			$('#pushHouseDlg [require="require"]').css('border', '1px solid #a9a9a9');
			clearAttachment();
			$('#transformationDiv').hide();
		}
	});
	$("#att").val('');
//	$('#att').val('89186570');
	$('.attachmentNum').text("（图片：0张 文件：0个）");
	$('#pushHouseDlg').dialog('open');
}

function pushRentUnitDlg(){
	var row = $('#houseDg').datagrid('getSelected');
	if (!row) {
		myTips('请先发布房屋', 'error');
	}
	$('#pushRentUnitDlg').dialog({
		title : '发布出租单元',
		top : getTop(560),
		left : getLeft(940),
		width : 940,
		height : 560,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#pushRentUnitDlg [clear="clear"]').val('');
			$('#pushRentUnitDlg [clean="clean"]').html('');
			$('#pushRentUnitDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#serviceContent .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#tenantRequest .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#facilities .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			clearAttachment();
		}
	});
	$("#att").val('');
//	$('#att').val('89186570');
	$('.attachmentNum').text("（图片：0张 文件：0个）");
	if (row.pbhRentType == '1') {
		$('#houseCode').val(row.pbhHouseId);
		$('#thirdRentUnitCode').val(row.pbhHsId);
		$('#roomName').val(row.pbhHouseAddress);
		$('#bindAddress2Div').hide();
	} else {
		$('#bindAddress2Div').show();
	}
	$('#roomType').val(0);
	$('#face').val(0);
	$('#lookTime').val(0);
	$('#isFirstRent').val(0);
	$('#independentToilet').val(9);
	$('#independentBalcony').val(9);
	$('#window').val(0);
	$('#roomPartition').val(9);
	$('#manageStatus').val(1);
	$('#payType').val(0);
	$('#depositType').val(-1);
	$('#feeUnit').val(4);
	$('#pushRentUnitDlg').dialog('open');
}

//发布房源-选择房源
function chooseHouseForStore(type) {
	$('#choseHouse').dialog({
		title : '选择房源',
		top : getTop(420),
		left : getLeft(750),
		width : 750,
		height : 420,
		closed : true,
		cache : false,
		modal : true
	});
	if ($('#choseHouseTable').hasClass('datagrid-f')) {

	} else {
		$('#choseHouseTable').datagrid({
			columns : [ [ {
				field : 'hsAddDistrict',
				title : '城区',
				width : 20,
				align : 'center'
			}, {
				field : 'hsAddCommunity',
				title : '楼盘名称',
				width : 26,
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
			}, {
				field : 'hsSectionType',
				title : '房型',
				width : 15,
				align : 'center'
			}, {
				field : 'hsRegisterTime',
				title : '登记时间',
				width : 19,
				align : 'center'
			} ] ],
			width : '100%',
			height : '277px',
			singleSelect : true,
			autoRowHeight : false,
			scrollbarSize : 0,
			showPageList : false,
			fitColumns : true,
			onDblClickRow : function(rowIndex, rowData) {
				var row = rowData;
				if (type == 1) {//发布房屋
					$("#thirdResblockId").val(row.hsHouseDictId);//接入方系统中的小区 ID
					$("#thirdHouseCode").val(row.hsId);//接入方系统中委托编号
					$('#bindAddress').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
					$('#cityName').val(row.hsAddCity);
					$('#thirdDistrictName').val(row.hsAddDistrict);
					$('#thirdBizcircleName').val(row.hsAddZone);
					$('#thirdResblockName').val(row.hsAddCommunity);
					$('#resblockAddress').val(row.hsAddStreet);
					$('#houseBuildingName').val(row.hsAddBuilding);
					$('#houseUnitName').val(1);
					$('#houseNo').val(row.hsAddDoorplateno);
					//贝壳城市代码
					for(var i in _cityCode){
						if(row.hsAddCity==_cityCode[i].area){
							$('#cityCode').val(_cityCode[i].code);
							break;
						} else {
							$('#cityCode').val('');
						}
					}
					if($('#cityCode').val() == ''){
						myTips("该城市暂时不支持贝壳发布!","error");
						return;
					}
					//小区对齐接口
					var pbhDetail={};
					pbhDetail.cityCode = $('#cityCode').val();
					pbhDetail.thirdResblockName= row.hsAddCommunity;
					$.post('../bkapi.action',{
						pbhApi:'match',
						pbhDetail:JSON.stringify(pbhDetail),
					},function(data){
						if(data.code < 0){
							myTips(data.msg, "error");
							return;
						}else{
							$('#resblockId').val(data.body[0].id);
							console.log('贝壳小区ID：'+data.body[0].id);
						}
					});
				} else if (type == 2) {//发布出租单元
					$('#thirdRentUnitCode').val(row.hsId);
					$('#roomName').val(row.hsAddCommunity + ' ' + row.hsAddBuilding + ' ' + row.hsAddDoorplateno);
				}
				$('#choseHouse').dialog('close');
			}
		});
	}
	if (type == 1) {//发布房屋
		$('#search4Store').show();
		query4StoreInfo(1, 0);
	} else if (type == 2) {//发布出租单元
		$('#search4Store').hide();
		query4StoreInfo2();
	}
	$('#choseHouse').dialog('open');
}

//发布房屋-选择未租
function query4StoreInfo(page,type){
	var onePageNums = 10;
	var startNum = (parseInt(page)-1)*onePageNums;
	var qDistrict = $("#choseDistrict").find("option:selected").text();
	var qCommunity = $("#choseCommunity").val();
	var qBuilding = $("#choseBuilding").val();
	var qDoorplateno = $("#choseDoorplateno").val();
	$.post("../queryHouseStoreCommon.action", {
		startNum : startNum,
		endNum : onePageNums,
		hsAddDistrict:qDistrict,
		hsAddCommunity:qCommunity,
		hsAddBuilding:qBuilding,
		hsAddDoorplateno:qDoorplateno,
//		hsLeaseState:'所有未租',
//		hsPrimitiveMother:4,
	},function(data) {
		if(data.code<0){
			sourcePage(0,onePageNums,1); 
			$('#choseHouseTable').datagrid({
	             data: [],
	             view: myview,
	             emptyMsg: data.msg
	        });
		}else{
			data=data.body;
			if(page==1 && type ==0){
				sourcePage(data[0].totalNum,onePageNums,1);
			}
			$("#choseHouseTable").datagrid("loadData", data);
		}
	}, "json");
}

//发布出租单元-合租-选择未租
function query4StoreInfo2(){
	var row = $('#houseDg').datagrid('getSelected');
	$.post("../flatShareRealQuery.action", {
		hsId:row.pbhHsId
	},function(data) {
		$('#choseHousePageDiv').empty();
		if(data.code<0){
			$('#choseHouseTable').datagrid({
	             data: [],
	             view: myview,
	             emptyMsg: data.msg
	        });
		}else{
			data=data.body;
			$("#choseHouseTable").datagrid("loadData", data);
		}
	}, "json");
}
//分页操作
function sourcePage(totalNum,onePageNums,type){
	var pageCount = Math.ceil(totalNum / onePageNums);
	if(type==1){
		$("#choseHousePage").remove();
		$("#choseHousePageDiv").append("<div class='tcdPageCode' id='choseHousePage' style='text-align:center;'></div>");
		$("#choseHousePage").createPage({
			onePageNums:onePageNums,
			totalNum:totalNum,
			pageCount:pageCount,
			current:1,
			backFn:function(p){
				if(p<=pageCount){
					query4StoreInfo(p,1);
				}
			}
		});
	}
	if(type==2){
		$("#housePage").remove();
		$("#housePageDiv").append("<div class='tcdPageCode' id='housePage' style='text-align:center;'></div>");
		$("#housePage").createPage({
			onePageNums:onePageNums,
			totalNum:totalNum,
			pageCount:pageCount,
			current:1,
			backFn:function(p){
				if(p<=pageCount){
					queryPushHouse(p,1);
				}
			}
		});
	}
}
//查图片
function getImgList(){
	var p = new Promise(function (resolve, reject){
		var att = $("#att").val(); 
		$.post("../getAttachment.action",{
			att : att
		}, function(data) {
			if (data.code < 0) {
				imgList = [];
				resolve();
				return;
			}
			data = data.body;
			var path = data[0].path.getRealJsonStr();
			imgList = eval('([' + path + '])');
			resolve();
		});
	});
	return p;
}

//发布房屋
function doPushHouse(){
	if (!allUpload) {
		$.messager.alert('提示', '图片上传中，请稍后再提交', 'info');
		return;
	}
	var checkFlag = 0;
	$('#pushHouseDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	getImgList().then(function(){
		//贝壳城市编号
		var cityCode = $('#cityCode').val();
		//出租类型
		var rentType = $('#rentType').val();
		//贝壳小区ID
		var resblockId = $('#resblockId').val();
		//接入方系统中的小区 ID
		var thirdResblockId = $('#thirdResblockId').val();
		//接入方系统中委托编号
		var thirdHouseCode = $('#thirdHouseCode').val();
		//第三方城区名
		var thirdDistrictName = $('#thirdDistrictName').val();
		//第三方商圈名
		var thirdBizcircleName = $('#thirdBizcircleName').val();
		//第三方小区名字
		var thirdResblockName = $('#thirdResblockName').val();
		//小区地址
		var resblockAddress = $('#resblockAddress').val();
		//楼栋名
		var houseBuildingName = $('#houseBuildingName').val();
		//单元名
		var houseUnitName = $('#houseUnitName').val();
		//楼层
		var floor = $('#floor').val();
		//总楼层
		var totalFloor = $('#totalFloor').val();
		//门牌号
		var houseNo = $('#houseNo').val();
		//原始户型-居室数
		var roomNum = $("#roomNum").val();
		//原始户型-厅数
		var hallNum = $("#hallNum").val();
		//原始户型-厨房数
		var kitchenNum = $("#kitchenNum").val();
		//原始户型-卫生间数
		var toiletNum = $("#toiletNum").val();
		//面积
		var houseArea = $("#houseArea").val();
		//车位
		var parking = $("#parking").val();
		//朝向
		var face = $("#face").val();
		//装修
		var decoration = $("#decoration").val();
		//供暖
		var heating = $("#heating").val();
		//户型结构
		var houseStructure = $("#houseStructure").val();
		//户型是否改造过	
		var transformState = $("#transformState").val();
		//改造后居室数量
		var transformRoomNum = $("#transformRoomNum").val();
		//改造后厅数量
		var transformHallNum = $("#transformHallNum").val();
		//改造后厨房数量	
		var transformKitchenNum = $("#transformKitchenNum").val();
		//改造后卫生间数量
		var transformToiletNum = $("#transformToiletNum").val();
		//公共区域照片
		var publicImagesList=[];
		for (var i in imgList) {
			var item = {};
			item.url = imgList[i].bk;
			item.picType = imgList[i].type;
			publicImagesList.push(item);
		}
		publicImagesList = JSON.stringify(publicImagesList);
		//品牌Code
		var brandCode = $("#brandCode").val();
		//房屋地址
		var pbhHouseAddress = $("#bindAddress").val();
		//汇总参数
		var pbhDetail = {};
		pbhDetail.cityCode = cityCode;
		pbhDetail.rentType = rentType;
		pbhDetail.resblockId = resblockId;
		pbhDetail.thirdResblockId = thirdResblockId;
		pbhDetail.thirdHouseCode = thirdHouseCode;
		pbhDetail.thirdDistrictName = thirdDistrictName;
		pbhDetail.thirdBizcircleName =  thirdBizcircleName;
		pbhDetail.thirdResblockName =  thirdResblockName;
		pbhDetail.resblockAddress =  resblockAddress;
		pbhDetail.houseBuildingName =  houseBuildingName;
		pbhDetail.houseUnitName = houseUnitName;
		pbhDetail.floor = floor;
		pbhDetail.totalFloor = totalFloor;
		pbhDetail.houseNo = houseNo;
		pbhDetail.roomNum = roomNum;
		pbhDetail.hallNum = hallNum;
		pbhDetail.kitchenNum = kitchenNum;
		pbhDetail.toiletNum = toiletNum;
		pbhDetail.houseArea = houseArea;
		pbhDetail.parking = parking;
		pbhDetail.face = face;
		pbhDetail.decoration = decoration;
		pbhDetail.heating = heating;
		pbhDetail.houseStructure = houseStructure;
		pbhDetail.transformState = transformState;
		pbhDetail.transformRoomNum = transformRoomNum;
		pbhDetail.transformHallNum = transformHallNum;
		pbhDetail.transformKitchenNum = transformKitchenNum;
		pbhDetail.transformToiletNum = transformToiletNum;
		pbhDetail.publicImagesList = publicImagesList;
		pbhDetail.brandCode = brandCode;
		console.log(JSON.stringify(pbhDetail));
		showLoading();
		$.post("../publishBkHouse.action",{
			pbhDetail:JSON.stringify(pbhDetail),
			pbhHouseAddress:pbhHouseAddress,
			pbhHsId:thirdHouseCode,
			pbhRentType:rentType,
			att: $('#att').val()
		},function(data){
			hideLoading();
			if(data.code < 0){
				$.messager.alert('提示',data.msg, "error");
				return;
			}
			isSave = true;
			imgList = [];
			myTips("发布成功!","success");
			queryPushHouse(1, 0);
			$('#pushHouseDlg').dialog('close');
		});
	});
}

//发布出租单元
function doPushRentUnit(){
	if (!allUpload) {
		$.messager.alert('提示', '图片上传中，请稍后再提交', 'info');
		return;
	}
	var checkFlag = 0;
	$('#pushRentUnitDlg [require="require"]').each(function(){
		if($(this).val()==''){
			$(this).css('border', '1px solid red');
			checkFlag++;
		}else{
			$(this).css('border', '1px solid #a9a9a9');
		}
	});
	if(checkFlag!=0){
		myTips("有必填项未填写!","error");
		return;
	}
	getImgList().then(function(){
		//房屋Code
		var houseCode = $('#houseCode').val();
		//第三方出租单元编号
		var thirdRentUnitCode = $('#thirdRentUnitCode').val();
		//房间名称
		var roomName = $("#roomName").val();
		//房间类型
		var roomType = $("#roomType").val();
		//房间朝向
		var face = $("#face").val();
		//可入住时间
		var liveTime = $("#liveTime").val();
		//可看房时间
		var lookTime = $("#lookTime").val();
		//最短租期
		var minLease = $("#minLease").val();
		//最长租期
		var maxLease = $("#maxLease").val();
		//是否首次出租
		var isFirstRent = $("#isFirstRent").val();
		//是否有独立卫生间
		var independentToilet = $("#independentToilet").val();
		//是否有独立阳台
		var independentBalcony = $("#independentBalcony").val();
		//窗类型
		var window = $("#window").val();
		//隔断类型
		var roomPartition = $("#roomPartition").val();
		//出租面积	
		var area = $("#area").val();
		//房间描述
		var description = $("#description").val();
		//联系电话
		var phone = $("#phone").val();
		//联系人
		var contacts = $("#contacts").val();
		//其他服务内容
		var otherContent = $("#otherContent").val();
		//经营状态	
		var manageStatus = $("#manageStatus").val();
		//付款方式
		var payType = $("#payType").val();
		//押金类型
		var depositType = $("#depositType").val();
		//押金
		var depositCash = $("#depositCash").val();
		//租金
		var rentCash = $("#rentCash").val();
		//中介费
		var agencyFee = $("#agencyFee").val();
		//服务费
		var fee = $("#fee").val();
		//服务费单位
		var feeUnit = $("#feeUnit").val();
		//租客要求
		var tenantRequest = [];
		$("#tenantRequest .btn").each(function(){
			if($(this).hasClass('btn-success')){
				tenantRequest.push($(this).val());
			}
		});
		//房屋设施
		var facilities = [];
		$("#facilities .btn").each(function(){
			if($(this).hasClass('btn-success')){
				facilities.push($(this).val());
			}
		});
		//服务内容
		var serviceContent = [];
		$("#serviceContent .btn").each(function(){
			if($(this).hasClass('btn-success')){
				serviceContent.push($(this).val());
			}
		});
		//付款方式	
		var	payment = [];
		var	paymentJson = {};
		paymentJson.payType=payType;
		paymentJson.depositType=depositType;
		paymentJson.depositCash=depositCash;
		paymentJson.rentCash=rentCash;
		paymentJson.agencyFee=agencyFee;
		paymentJson.fee=fee;
		paymentJson.feeUnit=feeUnit;
		payment.push(paymentJson);
		payment = JSON.stringify(payment)
		//卧室照片
		var roomImagesList=[];
		for (var i in imgList) {
			var item = {};
			item.url = imgList[i].bk;
			item.picType = imgList[i].type;
			roomImagesList.push(item);
			if (imgList[i].cover == 1) {
				//封面图
				var coverImage = imgList[i].bk;
			}
		}
		roomImagesList = JSON.stringify(roomImagesList);
				
		var pbruDetail={};
		pbruDetail.houseCode = houseCode;	
		pbruDetail.thirdRentUnitCode = thirdRentUnitCode;	//第三方出租单元编号
		pbruDetail.roomName = roomName;	                    //房间名称
		pbruDetail.roomType = roomType;	                    //房间类型
		pbruDetail.face = face;			                    //房间朝向
		pbruDetail.liveTime = liveTime.replace(/-/g, '');	                    //可入住时间
		pbruDetail.lookTime = lookTime;	                    //可看房时间
		pbruDetail.minLease = minLease;	                    //最短租期
		pbruDetail.maxLease = maxLease;	                    //最长租期
		pbruDetail.isFirstRent = isFirstRent;				//是否首次出租
		pbruDetail.independentToilet = independentToilet;	//是否有独立卫生间
		pbruDetail.independentBalcony = independentBalcony;	//是否有独立阳台
		pbruDetail.window = window;							//窗类型
		pbruDetail.roomPartition = roomPartition;			//隔断类型
		pbruDetail.area = area;								//出租面积
		pbruDetail.description = description;				//房间描述
		pbruDetail.phone = phone;							//联系电话
		pbruDetail.contacts = contacts;						//联系人姓名
		pbruDetail.coverImage=coverImage;					//封面
		pbruDetail.otherContent = otherContent;				//服务内容其他
		pbruDetail.manageStatus = manageStatus;				//经营状态
		pbruDetail.payType = payType;						//付款方式
		pbruDetail.depositType = depositType;				//押金类型
		pbruDetail.depositCash = depositCash;				//押金
		pbruDetail.rentCash = rentCash;						//租金
		pbruDetail.agencyFee = agencyFee;					//中介费
		pbruDetail.tenantRequest = JSON.stringify(tenantRequest);			//租客要求
		pbruDetail.facilities = JSON.stringify(facilities);					//房屋设施
		pbruDetail.serviceContent = JSON.stringify(serviceContent); 		//服务内容
		pbruDetail.payment = payment;						//付款方式
		pbruDetail.roomImagesList = roomImagesList;			//卧室照片
		showLoading();
		$.post("../publishBkRentUnit.action",{
			pbruDetail:JSON.stringify(pbruDetail),
			pbruUnitName:roomName,
			pbruPayment:payment,
			att: $('#att').val()
		},function(data){
			hideLoading();
			if(data.code < 0){
				$.messager.alert('提示',data.msg, "error");
				return;
			}
			isSave = true;
			imgList = [];
			myTips("发布成功!","success");
			queryRentUnit(1, 0);
			$('#pushRentUnitDlg').dialog('close');
		})
	});
}

//更新房屋
function updatePushHouseDlg(){
	var row = $('#houseDg').datagrid('getSelected');
	if(!row){
		myTips('请选择房源', 'error');
		return;
	}
	$('#updatePushHouseDlg').dialog({
		title : '修改并重新发布',
		top : getTop(260),
		left : getLeft(940),
		width : 940,
		height : 260,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updatePushHouseDlg [clear="clear"]').val('');
			$('#updatePushHouseDlg [clean="clean"]').html('');
			$('#updatePushHouseDlg [choose="choose"]').val('');
			$('#updatePushHouseDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$('#transformationDiv2').hide();
		}
	});
	$('#updatePushHouseDlg').dialog('open');
	var pbh = JSON.parse(row.pbhDetail.getRealJsonStr());
	$('#rentType2').val(pbh.rentType);
	$('#cityCode2').val(pbh.cityCode);
	for(var i in _cityCode){
		if (pbh.cityCode == _cityCode[i].code) {
			$('#cityName2').val(_cityCode[i].area);
			break;
		}
	}
	$('#bindAddress2').val(row.pbhHouseAddress);
	$('#thirdHouseCode2').val(pbh.thirdHouseCode);
	$('#houseCode2').val(row.pbhHouseId);
	$('#thirdResblockId2').val(pbh.thirdResblockId);
	$('#thirdDistrictName2').val(pbh.thirdDistrictName);
	$('#thirdBizcircleName2').val(pbh.thirdBizcircleName);
	$('#thirdResblockName2').val(pbh.thirdResblockName);
	$('#resblockAddress2').val(pbh.resblockAddress);
	$('#houseBuildingName2').val(pbh.houseBuildingName);
	$('#houseUnitName2').val(pbh.houseUnitName);
	$('#floor2').val(pbh.floor);
	$('#totalFloor2').val(pbh.totalFloor);
	$('#houseNo2').val(pbh.houseNo);
	$('#roomNum2').val(pbh.roomNum);
	$('#hallNum2').val(pbh.hallNum);
	$('#kitchenNum2').val(pbh.kitchenNum);
	$('#toiletNum2').val(pbh.toiletNum);
	$('#houseArea2').val(pbh.houseArea);
	$('#parking2').val(pbh.parking);
	$('#face2').val(pbh.face);
	$('#decoration2').val(pbh.decoration);
	$('#heating2').val(pbh.heating);
	$('#houseStructure2').val(pbh.houseStructure);
	$('#transformState2').val(pbh.transformState);
	if (pbh.transformState == 1) {
		$('#transformationDiv2').show();
	}
	$('#transformRoomNum2').val(pbh.transformRoomNum);
	$('#transformHallNum2').val(pbh.transformHallNum);
	$('#transformKitchenNum2').val(pbh.transformKitchenNum);
	$('#transformToiletNum2').val(pbh.transformToiletNum);
}

//执行更新房屋
function doUpdatePushHouse(){
	var row = $('#houseDg').datagrid('getSelected');
	var pbhId = row.pbhId;
	var rentType = $('#rentType2').val();
	var cityCode = $('#cityCode2').val();
	var thirdHouseCode = $('#thirdHouseCode2').val();
	var houseCode = $('#houseCode2').val();
	var thirdResblockId = $('#thirdResblockId2').val();
	var thirdDistrictName = $('#thirdDistrictName2').val();
	var thirdBizcircleName = $('#thirdBizcircleName2').val();
	var thirdResblockName = $('#thirdResblockName2').val();
	var resblockAddress = $('#resblockAddress2').val();
	var houseBuildingName = $('#houseBuildingName2').val();
	var houseUnitName = $('#houseUnitName2').val();
	var floor = $('#floor2').val();
	var totalFloor = $('#totalFloor2').val();
	var houseNo = $('#houseNo2').val();
	var roomNum = $('#roomNum2').val();
	var hallNum = $('#hallNum2').val();
	var kitchenNum = $('#kitchenNum2').val();
	var toiletNum = $('#toiletNum2').val();
	var houseArea = $('#houseArea2').val();
	var parking = $('#parking2').val();
	var face = $('#face2').val();
	var decoration = $('#decoration2').val();
	var heating = $('#heating2').val();
	var houseStructure = $('#houseStructure2').val();
	var transformState = $('#transformState2').val();
	var transformRoomNum = $('#transformRoomNum2').val();
	var transformHallNum = $('#transformHallNum2').val();
	var transformKitchenNum = $('#transformKitchenNum2').val();
	var transformToiletNum = $('#transformToiletNum2').val();
//	var publicImagesList;
	var pbhDetail={};
	pbhDetail.rentType = rentType;
	pbhDetail.cityCode = cityCode;
	pbhDetail.thirdHouseCode = thirdHouseCode;
	pbhDetail.houseCode = houseCode;
	pbhDetail.thirdResblockId = thirdResblockId;
	pbhDetail.thirdDistrictName = thirdDistrictName;
	pbhDetail.thirdBizcircleName = thirdBizcircleName;
	pbhDetail.thirdResblockName = thirdResblockName;
	pbhDetail.resblockAddress = resblockAddress;
	pbhDetail.houseBuildingName = houseBuildingName;
	pbhDetail.houseUnitName = houseUnitName;
	pbhDetail.floor = floor;
	pbhDetail.totalFloor = totalFloor;
	pbhDetail.houseNo = houseNo;
	pbhDetail.roomNum = roomNum;
	pbhDetail.hallNum = hallNum;
	pbhDetail.kitchenNum = kitchenNum;
	pbhDetail.toiletNum = toiletNum;
	pbhDetail.houseArea = houseArea;
	pbhDetail.parking = parking;
	pbhDetail.face = face;
	pbhDetail.decoration = decoration;
	pbhDetail.heating = heating;
	pbhDetail.houseStructure = houseStructure;
	pbhDetail.transformState = transformState;
	pbhDetail.transformRoomNum = transformRoomNum;
	pbhDetail.transformHallNum = transformHallNum;
	pbhDetail.transformKitchenNum = transformKitchenNum;
	pbhDetail.transformToiletNum = transformToiletNum;
//	pbhDetail.publicImagesList = publicImagesList;
	pbhDetail = JSON.stringify(pbhDetail);
	showLoading();
	$.post("../editBkHouse.action",{
		pbhId:pbhId,
		pbhDetail:pbhDetail,
	},function(data){
		hideLoading();
		if(data.code < 0){
			myTips(data.msg,"error");
			return;
		}
		myTips(data.msg,"success");
		queryPushHouse(1, 0);
		$('#updatePushHouseDlg').dialog('close');
	})
}
//更新出租单元
function updatePushRentUnitDlg(){
	var row = $('#rentUnitDg').datagrid('getSelected');
	if(!row){
		myTips('请选择出租单元', 'error');
		return;
	}
	$('#updatePushRentUnitDlg').dialog({
		title : '修改并重新发布',
		top : getTop(450),
		left : getLeft(940),
		width : 940,
		height : 450,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updatePushRentUnitDlg [clear="clear"]').val('');
			$('#updatePushRentUnitDlg [clean="clean"]').html('');
			$('#updatePushRentUnitDlg [require="require"]').css('border', '1px solid #a9a9a9');
			$("#serviceContent3 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#tenantRequest3 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
			$("#facilities3 .btn").each(function(){
				$(this).removeClass('btn-success');
				$(this).addClass('btn-default');
			});
		}
	});
	$('#updatePushRentUnitDlg').dialog('open');
	var pbru = JSON.parse(row.pbruDetail.getRealJsonStr());
	$('#rentUnitCode3').val(row.pbruUnitId);
	$('#thirdRentUnitCode3').val(row.pbuHsId);
	$('#roomName3').val(row.pbruUnitName);
	$('#roomType3').val(pbru.roomType);
	$('#face3').val(pbru.face);
	$('#liveTime3').val(pbru.liveTime);
	$('#lookTime3').val(pbru.lookTime);
	$('#minLease3').val(pbru.minLease);
	$('#maxLease3').val(pbru.maxLease);
	$('#isFirstRent3').val(pbru.isFirstRent);
	$('#independentToilet3').val(pbru.independentToilet);
	$('#independentBalcony3').val(pbru.independentBalcony);
	$('#window3').val(pbru.window);
	$('#roomPartition3').val(pbru.roomPartition);
	$('#area3').val(pbru.area);
	$('#description3').val(pbru.description);
	$('#phone3').val(pbru.phone);
	$('#contacts3').val(pbru.contacts);
	$('#facilities3').val(pbru.facilities);
	$('#manageStatus3').val(pbru.manageStatus);
	$('#coverImage3').val(pbru.coverImage);
	$('#otherContent3').val(pbru.otherContent);
	//服务内容
	var serviceContent = JSON.parse(pbru.serviceContent);
	$("#serviceContent3 .btn").each(function(){
		for (var i in serviceContent) {
			if($(this).val() == serviceContent[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//租客要求
	var tenantRequest = JSON.parse(pbru.tenantRequest);
	$("#tenantRequest3 .btn").each(function(){
		for (var i in tenantRequest) {
			if($(this).val() == tenantRequest[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
	//房屋设施
	var facilities = JSON.parse(pbru.facilities);
	$("#facilities3 .btn").each(function(){
		for (var i in facilities) {
			if($(this).val() == facilities[i]){
				$(this).removeClass('btn-default');
				$(this).addClass('btn-success');
			}
		}
	});
}
//执行更新出租单元
function doUpdatePushRentUnit(){
	var row = $('#rentUnitDg').datagrid('getSelected');
	var pbruId = row.pbruId;
	var rentUnitCode = $("#rentUnitCode3").val();
	var thirdRentUnitCode = $("#thirdRentUnitCode3").val();
	var roomName = $("#roomName3").val();
	var roomType = $("#roomType3").val();
	var face = $("#face3").val();
	var liveTime = $("#liveTime3").val();
	var lookTime = $("#lookTime3").val();
	var minLease = $("#minLease3").val();
	var maxLease = $("#maxLease3").val();
	var isFirstRent = $("#isFirstRent3").val();
	var independentToilet = $("#independentToilet3").val();
	var independentBalcony = $("#independentBalcony3").val();
	var window = $("#window3").val();
	var roomPartition = $("#roomPartition3").val();
	var area = $("#area3").val();
	var	description = $("#description3").val();
	var phone = $("#phone3").val();
	var contacts = $("#contacts3").val();
	var manageStatus = $("#manageStatus3").val();
	var coverImage = $("#coverImage3").val();
	var otherContent = $("#otherContent3").val();
	//租客要求
	var tenantRequest = [];
	$("#tenantRequest3 .btn").each(function(){
		if($(this).hasClass('btn-success')){
			tenantRequest.push($(this).val());
		}
	});
	//房屋设施
	var facilities = [];
	$("#facilities3 .btn").each(function(){
		if($(this).hasClass('btn-success')){
			facilities.push($(this).val());
		}
	});
	//服务内容
	var serviceContent = [];
	$("#serviceContent3 .btn").each(function(){
		if($(this).hasClass('btn-success')){
			serviceContent.push($(this).val());
		}
	});
	
	var pbruDetail = {};
	pbruDetail.rentUnitCode = rentUnitCode;
	pbruDetail.thirdRentUnitCode = thirdRentUnitCode;
	pbruDetail.roomName = roomName;
	pbruDetail.roomType = roomType;
	pbruDetail.face = face;
	pbruDetail.liveTime = liveTime;
	pbruDetail.lookTime = lookTime;
	pbruDetail.minLease = minLease;
	pbruDetail.maxLease = maxLease;
	pbruDetail.isFirstRent = isFirstRent;
	pbruDetail.tenantRequest = JSON.stringify(tenantRequest);
	pbruDetail.independentToilet = independentToilet;
	pbruDetail.independentBalcony = independentBalcony;	
	pbruDetail.window = window;
	pbruDetail.roomPartition = roomPartition;
	pbruDetail.area = area;
	pbruDetail.description = description;
	pbruDetail.phone = phone;
	pbruDetail.contacts = contacts;
	pbruDetail.facilities = JSON.stringify(facilities);
	pbruDetail.manageStatus = manageStatus;
	pbruDetail.coverImage = coverImage;
	pbruDetail.serviceContent = JSON.stringify(serviceContent);
	pbruDetail.otherContent = otherContent;
	pbruDetail = JSON.stringify(pbruDetail);
	showLoading();
	$.post("../editBkRentUnit.action",{
		pbruId : pbruId,
		pbruDetail : pbruDetail,
	},function(data){
		hideLoading();
		if(data.code < 0){
			myTips(data.msg,"error");
			return;
		}
		myTips(data.msg, 'success');
		queryRentUnit(1, 0);
		$('#updatePushRentUnitDlg').dialog('close');
	})
}
//更新价格
function updatePaymentDlg(){
	var row = $('#rentUnitDg').datagrid('getSelected');
	if(!row){
		myTips('请选择出租单元', 'error');
		return;
	}
	$('#updatePaymentDlg').dialog({
		title : '更新价格',
		top : getTop(200),
		left : getLeft(400),
		width : 400,
		height : 200,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			$('#updatePaymentDlg [clear="clear"]').val('');
			$('#updatePaymentDlg [clean="clean"]').html('');
			$('#updatePaymentDlg [require="require"]').css('border', '1px solid #a9a9a9');
		}
	});
	$('#updatePaymentDlg').dialog('open');
	console.log(row.pbruPayment)
	var pbru = JSON.parse(row.pbruPayment.getRealJsonStr());
	$('#payType3').val(pbru[0].payType);
	$('#depositType3').val(pbru[0].depositType);
	$('#depositCash3').val(pbru[0].depositCash);
	$('#rentCash3').val(pbru[0].rentCash);
	$('#agencyFee3').val(pbru[0].agencyFee);
	$('#fee3').val(pbru[0].fee);
	$('#feeUnit3').val(pbru[0].feeUnit);
}
//执行更新价格
function doUpdatePayment(){
	var row = $('#rentUnitDg').datagrid('getSelected');
	var pbruId = row.pbruId;
	var payType = $('#payType3').val();
	var depositType = $('#depositType3').val();
	var depositCash = $('#depositCash3').val();
	var rentCash = $('#rentCash3').val();
	var agencyFee = $('#agencyFee3').val();
	var fee = $('#fee3').val();
	var feeUnit = $('#feeUnit3').val();
	//付款方式	
	var	payment = [];
	var	paymentJson = {};
	paymentJson.payType=payType;
	paymentJson.depositType=depositType;
	paymentJson.depositCash=depositCash;
	paymentJson.rentCash=rentCash;
	paymentJson.agencyFee=agencyFee;
	paymentJson.fee=fee;
	paymentJson.feeUnit=feeUnit;
	payment.push(paymentJson);
	payment = JSON.stringify(payment);
	var pbruDetail = {
		houseUnitCode:row.pbruUnitId,
		payment:payment
	}
	showLoading();
	$.post("../editBkRentUnitPayment.action",{
		pbruId : pbruId,
		pbruDetail : JSON.stringify(pbruDetail),
		pbruPayment : payment
	},function(data){
		hideLoading();
		if(data.code < 0){
			myTips(data.msg,"error");
			return;
		}
		myTips(data.msg, 'success');
		queryRentUnit(1, 0);
		$('#updatePaymentDlg').dialog('close');
	})
}
//上下架
function updateRentUnitStatus(){
	var row = $('#rentUnitDg').datagrid('getSelected');
	if(!row){
		myTips('请选择出租单元', 'error');
		return;
	}
	$('#updateRentUnitStatusDlg').dialog({
		title : '上架/下架',
		top : getTop(150),
		left : getLeft(250),
		width : 250,
		height : 150,
		closed : true,
		cache : false,
		modal : true,
		onClose : function() {
			
		}
	});
	$('#onoff').val('0');
	$('#onoffReasonDiv').show();
	$('#updateRentUnitStatusDlg').dialog('open');
}
//执行上下架
function doUpdateRentUnitStatus(){
	var row = $('#rentUnitDg').datagrid('getSelected');
	var onoff = $('#onoff').val();
	var onoffReason = $('#onoffReason').val();
	if (onoff == 1) {
		onoffReason = undefined;
	}
	var pbhDetail = {
		rentUnitCode : row.pbruUnitId,
		onoff : onoff,
		onoffReason : onoffReason,
	}
	$.post('../bkapi.action',{
		pbhApi:'onoffHouse',
		pbhDetail:JSON.stringify(pbhDetail),
	},function(data){
		if (data.code < 0) {
			myTips(data.msg, 'error');
			return;
		}
		myTips(data.msg, 'success');
		queryRentUnit(1, 0);
		$('#updateRentUnitStatusDlg').dialog('close');
	});
}