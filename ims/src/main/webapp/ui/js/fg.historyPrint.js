$(function() {
	queryHistoryPrintDg(1,0);
	$("#historyPrintDg").datagrid({
		onDblClickRow : function(rowIndex, rowData) {
			var row = $('#historyPrintDg').datagrid('getSelected');
			if (row) {
				$("#print_index").val(rowIndex);
				printPreview(row);
			}
		}
	});
	//票据类型查询
	for(var k in _billType){
		$('#searchType').append("<option value = '"+_billType[k]+"'>"+_billType[k]+"</option>")
	}
	$('#addCommunity').val('');
	$('#addBuilding').val('');
	$('#addDoorplateno').val('');
	$('#searchTitle').val('');
	//$('.special').show();
	$('.search').hide();
	if($("#searchType").val() != '业主应付款申请单'){
		$('#searchType').val("");
		$('#jhpSpecialNumber').val('');
		$('.special').hide();
		$('.search').show();
	}
});
//onkeyup搜索延时器
var timer = null;
function queryOnkeyup(id,nums){
	var setTime = nums*100;
	if($("#"+id).val()=="" && id != 'jhpSpecialNumber'){
		console.log($("#"+id).val()=="");
		search(2);
		queryHistoryPrintDg(1, 0, 2);
	}else{
		var num = 0;
		if($("#"+id).val() == '业主应付款申请单' || id == 'jhpSpecialNumber'){
			search(1);
			num = 1;
		}else{
			search(2);
			num = 2;
		}
		clearTimeout(timer);
		timer = setTimeout(function(){
			queryHistoryPrintDg(1, 0, num);
		}, setTime);
	}
}

//搜索框隐藏
function search(num){
	if(num == 1){
		$('#addCommunity').val('');
		$('#addBuilding').val('');
		$('#addDoorplateno').val('');
		$('#searchTitle').val('');
		$('.special').show();
		$('.search').hide();
	}else if(num == 2){
		$('#jhpSpecialNumber').val('');
		$('.special').hide();
		$('.search').show();
	}else{
		
	}
}

function queryHistoryPrintDg(page, type, num) {
	var pageNum = 15;
	var startNum = (parseInt(page) - 1) * pageNum;
	var endNum = pageNum;
	var addCommunity = $('#addCommunity').val();
	var addBuilding = $('#addBuilding').val();
	var addDoorplateno = $('#addDoorplateno').val();
	var searchType = $('#searchType').val();
	var searchTitle = $('#searchTitle').val();
	var jhpSpecialNumber = $('#jhpSpecialNumber').val();
	var jhpPrintAddress = addCommunity+addBuilding+addDoorplateno;
	    
	$.post("../selectHistoryPrint.action",{
		startNum 		: startNum,
		endNum 			: endNum,
		addCommunity	: addCommunity,
		addBuilding		: addBuilding,
		addDoorplateno	: addDoorplateno,
		jhpType			: searchType,
		jhpTitle		: searchTitle,
		splitFlag		: 1,
		jhpPrintAddress : jhpPrintAddress,
		jhpSpecialNumber: jhpSpecialNumber,
	}, function(data) {
		console.log(data.body)
		// var obj=JSON.parse(data.body[0].jhpJson.getRealJsonStr());
		// console.log(obj)
		if (data.code<0) {
			$('#historyPrintDg').datagrid({
				data : [],
				view : myview,
				emptyMsg : data.msg
			});

			search(num);
			if(page==1){
				notCountPage(0, 0 ,"queryHistoryPrintDg","historyPrint");
			}else{
				notCountPage(page, 0 ,"queryHistoryPrintDg","historyPrint");
			}
		} else {
			data = data.body;
			if(data.length<pageNum){
				notCountPage(page, 2 , "queryHistoryPrintDg","historyPrint");
			}else{
				notCountPage(page, 1 , "queryHistoryPrintDg","historyPrint");
			}
			for (var i in data) {
				for(var j in data[i]){
					if(data[i][j]==null){
						data[i][j]='';
					}
				}
				data[i].totalPage = data[i].addCommunity + " " + data[i].addBuilding + " " + data[i].addDoorplateno;
				// if("客户下定打印"==data[i].jhpType) {
				// 	data[i].totalPage = eval(data[i].jhpJson).address;
				// }

				if( data[i].totalPage == '  '){
					data[i].totalPage = data[i].jhpSpecialNumber;
				}
				if(data[i].jhpCocId != '' && data[i].jhpCocId != undefined){
					data[i].totalPage = data[i].cocContacts;
				}
			}
			search(num);
			$("#historyPrintDg").datagrid("loadData", data);
		}
	}, "json");
}

function gethistoryPrintPageCount(page, type) {
	var pageNum = 15;
	
	var addCommunity = $('#addCommunity').val();
	var addBuilding = $('#addBuilding').val();
	var addDoorplateno = $('#addDoorplateno').val();
	var searchType = $('#searchType').val();
	var searchTitle = $('#searchTitle').val();
	    
	$.post("../selectHistoryPrint.action",{
		addCommunity	: addCommunity,
		addBuilding		: addBuilding,
		addDoorplateno	: addDoorplateno,
		jhpType			: searchType,
		jhpTitle		: searchTitle,
		splitFlag		: 0,
	}, function(data) {
		if (data.code < 0) {
			var countJson = {
					totalNum:0,
			};
			getCountData(0,countJson,pageNum,page,"historyPrint",0);
		} else {
			data = data.body;
			var countJson = {
					totalNum	: data[0].totalNum,
			};
			getCountData(1,countJson,pageNum,page,"historyPrint",0);
		}
	}, "json");
}

function sourcePage(totalNum, page, type) {
	var pageNum = 1;
	if (type == 0) {
		pageNum = Math.ceil(totalNum / 15);
		$("#historyPrintPage").remove();
		$("#historyPrintPageDiv").append("<div class='tcdPageCode' id='historyPrintPage' style='text-align:center;'></div>");
		$("#historyPrintPage").createPage({
			onePageNums : 15,
			totalNum : totalNum,
			pageCount : pageNum,
			current : 1,
			backFn : function(p) {
				if (p <= pageNum) {
					queryHistoryPrintDg(p, 1);
				}
			}
		});
	}
}
function doHistoryPrint(){
	var row = $('#historyPrintDg').datagrid('getSelected');
	if(!row){
		myTips('请选择一条票据打印!', 'error');
		return;
	}
	$("#print_index").val($('#historyPrintDg').datagrid('getRowIndex', $("#historyPrintDg").datagrid('getSelected')));
	printPreview(row);
}
//打开预览对话框
function printPreview(row){


	var top,left,width,height;
	if(row.jhpType=="租客入住账单" || row.jhpType=="租客退房账单" || row.jhpType=="零售-线上订单票据" || row.jhpType =="零售-现场支付票据"){
		top=580;height=580;
		left=370;width=370;
	}else{
		top=550;height=550;
		left=900;width=900;
	}
	$('#printDlg').dialog({
		top 	: getTop(top),
		left 	: getLeft(left),
		title 	: 	'打印预览',
		closed	:	true,
		width	:	width,
		height	:	height,
		cache 	: 	false,
		modal 	: 	true,
		onClose : 	function() {
			
		}
	});
	$('#printFrame').empty();
	var	iframes ='';
	if(row.jhpType=="租客签约账单收支"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><style>			table td {				border: 1px solid #888;				border-left: none;				border-top: none;				white-space: nowrap;				padding: 2px;				font-size: 13px;			}						table {				/*border: 1px solid #888;*/				table-layout: fixed;				border-left: 1px solid #888;				width: 768px;				font-size: 13px;				margin: 0 10px;			}						#body {				border: 1px solid black;				width: 790px;				height: 450px			}						#title {				font-size: 22px;				text-align: center;				font-weight: bold			}						#header {				font-size: 16px;				text-align: center;				margin: 10px;				font-weight: bold			}						#footer {				margin: 20px 20px			}						#footer div {				float: left;				width: 20%;				font-weight: bold			}		</style>		<script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head>	<body>		<center>			<div id="body" style=""><div style="padding:2px;;z-index:1;position:absolute;font-size:13px;font-weight:bold">补打</div>				<div id="title" style="">{{body.gongsimingcheng}}签约账单</div>				<div id="header" style="">					<div style="float:left;margin-left:42% ;"><span id="year">{{body.year}}</span>年<span id="month">{{body.month}}</span>月<span id="date">{{body.day}}</span>日</div>					<div style="float:right;font-size:13px;margin-right:3% ;font-weight:bold">编号：<span id="piaojubianhao">{{body.piaojubianhao}}</span></div>				</div>				<table align="center" cellspacing="0" style="margin-top:5px;border-top: 1px solid #888;">					<tr align="center">						<td>楼盘名称</td>						<td>姓名</td>						<td>收款方式</td>					</tr>					<tr align="center">						<td>{{body.wuyedizhi}}</td>						<td>{{body.name}}</td>						<td>{{body.shoukuanfangshi}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none" v-if="body.energy_arr">					<tr align="center">						<td>能源项目</td>						<td>本期读数</td>						<td>上期读数</td>						<td>实用量</td>						<td>金额</td>						<td>备注</td>					</tr>					<tr v-for="item in body.energy_arr" align="center">						<td>{{item.shoufeixiangmu}}</td>						<td>{{item.benqidushu}}</td>						<td>{{item.shangqidushu}}</td>						<td>{{item.shiyongliang}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none">					<tr v-for="item in body.journal_arr" align="center">						<td>{{item.feiyong}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none">					<tr align="center">						<td>本期应收金额：{{body.hejijine}}</td>												<td><b>本期实收金额：{{body.shishoujine}}</b></td>					<td>本期<span v-if="body.benqiqianjie >= 0">欠结金额：{{body.benqiqianjie}}</span><span v-else>结余金额：{{-body.benqiqianjie}}</span></td></tr>				</table>				<table align="center" cellspacing="0" style="border-top: none" v-if="body.beizhu">					<tr>						<td><span style="padding-left: 20px;">备注：</span>{{body.beizhu}}</td>					</tr>				</table>				<div id="footer" style="margin: 3px 20px">					<div style="margin-left:30px">记账人：<span id="jizhangren">{{body.jizhangren}}</span></div>					<div style="margin-left:80px">收款人：<span id="shenheren">{{body.shoukuanren}}</span></div>					<div style="margin-left:80px">复核人：<span id="fuheren">{{body.fuheren}}</span></div>				</div>			</div>			<script>				var body2 = '+printArray+';			</script>			<script>				var vm;				vm = new Vue({					el: "#body",					data: {						body: {}					}				});				vm.body = body2;								function print() {					document.execCommand("print")				}			</script>		</center>	</body></html>';
	}
	if(row.jhpType=="租客每期收支"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><style>			table td {				border: 1px solid #888;				border-left: none;				border-top: none;				white-space: nowrap;				padding: 2px;				font-size: 13px;			}						table {				/*border: 1px solid #888;*/				table-layout: fixed;				border-left: 1px solid #888;				width: 768px;				font-size: 13px;				margin: 0 10px;			}						#body {				border: 1px solid black;				width: 790px;				height: 450px			}						#title {				font-size: 22px;				text-align: center;				font-weight: bold			}						#header {				font-size: 16px;				text-align: center;				margin: 10px;				font-weight: bold			}						#footer {				margin: 20px 20px			}						#footer div {				float: left;				width: 20%;				font-weight: bold			}		</style>		<script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head>	<body>		<center>			<div id="body" style=""><div style="padding:2px;;z-index:1;position:absolute;font-size:13px;font-weight:bold">补打</div>				<div id="title" style="">{{body.gongsimingcheng}}月结账单</div>				<div id="header" style="">					<div style="float:left;margin-left:42% ;"><span id="year">{{body.year}}</span>年<span id="month">{{body.month}}</span>月<span id="date">{{body.date}}</span>日</div>					<div style="float:right;font-size:13px;margin-right:3% ;font-weight:bold">编号：<span id="piaojubianhao">{{body.piaojubianhao}}</span></div>				</div>				<table align="center" cellspacing="0" style="margin-top:5px;border-top: 1px solid #888;">					<tr align="center">						<td>楼盘名称</td>						<td>姓名</td>						<td>收款方式</td>					</tr>					<tr align="center">						<td>{{body.wuyedizhi}}</td>						<td>{{body.name}}</td>						<td>{{body.shoukuanfangshi}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none" v-if="body.energy_arr">					<tr align="center">						<td>能源项目</td>						<td>本期读数</td>						<td>上期读数</td>						<td>实用量</td>						<td>金额</td>						<td>备注</td>					</tr>					<tr v-for="item in body.energy_arr" align="center">						<td>{{item.shoufeixiangmu}}</td>						<td>{{item.benqidushu}}</td>						<td>{{item.shangqidushu}}</td>						<td>{{item.shiyongliang}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none">					<tr v-for="item in body.journal_arr" align="center">						<td>{{item.feiyong}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none">					<tr align="center">						<td>本期应收金额：{{body.hejijine}}</td>												<td><b>本期实收金额：{{body.shishoujine}}</b></td>					<td>本期<span v-if="body.benqiqianjie >= 0">欠结金额：{{body.benqiqianjie}}</span><span v-else>结余金额：{{-body.benqiqianjie}}</span></td></tr>				</table>				<table align="center" cellspacing="0" style="border-top: none" v-if="body.beizhu">					<tr>						<td><span style="padding-left: 20px;">备注：</span>{{body.beizhu}}</td>					</tr>				</table>				<div id="footer" style="margin: 3px 20px">					<div style="margin-left:30px">记账人：<span id="jizhangren">{{body.jizhangren}}</span></div>					<div style="margin-left:80px">收款人：<span id="shenheren">{{body.shoukuanren}}</span></div>					<div style="margin-left:80px">复核人：<span id="fuheren">{{body.fuheren}}</span></div>				</div>			</div>			<script>				var body2 = '+printArray+';			</script>			<script>				var vm;				vm = new Vue({					el: "#body",					data: {						body: {}					}				});				vm.body = body2;								function print() {					document.execCommand("print")				}			</script>		</center>	</body></html>';
	}
	if(row.jhpType=="租客临时账单收支"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><style>			table td {				border: 1px solid #888;				border-left: none;				border-top: none;				white-space: nowrap;				padding: 2px;				font-size: 13px;			}						table {				/*border: 1px solid #888;*/				table-layout: fixed;				border-left: 1px solid #888;				width: 768px;				font-size: 13px;				margin: 0 10px;			}						#body {				border: 1px solid black;				width: 790px;				height: 450px			}						#title {				font-size: 22px;				text-align: center;				font-weight: bold			}						#header {				font-size: 16px;				text-align: center;				margin: 10px;				font-weight: bold			}						#footer {				margin: 20px 20px			}						#footer div {				float: left;				width: 20%;				font-weight: bold			}		</style>		<script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head>	<body>		<center>			<div id="body" style=""><div style="padding:2px;;z-index:1;position:absolute;font-size:13px;font-weight:bold">补打</div>				<div id="title" style="">{{body.gongsimingcheng}}收款收据</div>				<div id="header" style="">					<div style="float:left;margin-left:42% ;"><span id="year">{{body.year}}</span>年<span id="month">{{body.month}}</span>月<span id="date">{{body.day}}</span>日</div>					<div style="float:right;font-size:13px;margin-right:3% ;font-weight:bold">编号：<span id="piaojubianhao">{{body.piaojubianhao}}</span></div>				</div>				<table align="center" cellspacing="0" style="margin-top:5px;border-top: 1px solid #888;">					<tr align="center">						<td>楼盘名称</td>						<td>姓名</td>						<td>收款方式</td>					</tr>					<tr align="center">						<td>{{body.wuyedizhi}}</td>						<td>{{body.name}}</td>						<td>{{body.shoukuanfangshi}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none" v-if="body.energy_arr">					<tr align="center">						<td>能源项目</td>						<td>本期读数</td>						<td>上期读数</td>						<td>实用量</td>						<td>金额</td>						<td>备注</td>					</tr>					<tr v-for="item in body.energy_arr" align="center">						<td>{{item.shoufeixiangmu}}</td>						<td>{{item.benqidushu}}</td>						<td>{{item.shangqidushu}}</td>						<td>{{item.shiyongliang}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none">					<tr v-for="item in body.journal_arr" align="center">						<td>{{item.feiyong}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align="center" cellspacing="0" style="border-top: none">					<tr align="center">						<td>本期应收金额：{{body.hejijine}}</td>												<td><b>本期实收金额：{{body.shishoujine}}</b></td>					<td>本期<span v-if="body.benqiqianjie >= 0">欠结金额：{{body.benqiqianjie}}</span><span v-else>结余金额：{{-body.benqiqianjie}}</span></td></tr>				</table>				<table align="center" cellspacing="0" style="border-top: none" v-if="body.beizhu">					<tr>						<td><span style="padding-left: 20px;">备注：</span>{{body.beizhu}}</td>					</tr>				</table>				<div id="footer" style="margin: 3px 20px">					<div style="margin-left:30px">记账人：<span id="jizhangren">{{body.jizhangren}}</span></div>					<div style="margin-left:80px">收款人：<span id="shenheren">{{body.shoukuanren}}</span></div>					<div style="margin-left:80px">复核人：<span id="fuheren">{{body.fuheren}}</span></div>				</div>			</div>			<script>				var body2 = '+printArray+';			</script>			<script>				var vm;				vm = new Vue({					el: "#body",					data: {						body: {}					}				});				vm.body = body2;								function print() {					document.execCommand("print")				}			</script>		</center>	</body></html>';
	}
	if(row.jhpType=="租客退房出账"){//旧版退房申请单
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><style>        table td {            border: 1px solid #888;            border-top:none;            white-space: nowrap;            padding: 1px 0 0 0;			font-size: 12px;        }                table {            /*border: 1px solid #888;*/            table-layout: fixed;            width: 770px;            font-size: 12px;            margin: 0 10px        }                #body {            border: 1px solid black;            width: 790px;            height: 450px        }                #title {            font-size: 18px;            text-align: center;            font-weight: bold        }                #header {            font-size: 16px;            text-align: center;            margin: 10px;            font-weight: bold        }                #footer {            margin: 20px 20px        }                #footer div {            float: left;            width: 20%;            font-weight: bold        }    </style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body>    <div id="body" style="">        <div style="padding:2px;;z-index:1;position:absolute;font-size:13px;font-weight:bold">补打</div><div id="title" style="">租客退房出账申请单</div>		<table align="center"  cellspacing="0" style="margin-top:2px;border-top: 1px solid #888;">            <tr align="center">                <td>楼盘名称</td>                <td>姓名</td>                <td>手机号</td>                <td>身份证号</td>                <td>房管员</td>            </tr>            <tr align="center">                <td>{{body.wuyedizhi}}</td>                <td>{{body.name}}</td>                <td>{{body.tel}}</td>                <td>{{body.idcard}}</td>                <td>{{body.fangguanyuan}}</td>            </tr>        </table>        <table align="center"  cellspacing="0" style="border-top: none">            <tr align="center">                <td>签约日</td>                <td>合约起租日</td>                <td>合约结束日</td>                <td>合约期限</td>                <td>付款周期</td>                <td>提前交租</td>                <td>合约类型</td>            </tr>            <tr align="center">                <td>{{body.qianyueri}}</td>                <td>{{body.qizuri}}</td>                <td>{{body.jiesuri}}</td>                <td>{{body.heyueqixian}}</td>                <td>{{body.fukuanzhouqi}}</td>                <td>{{body.tiqianjiaozu}}</td>                <td>{{body.heyueleixing}}</td>            </tr>        </table>        <table align="center"  cellspacing="0" style="border-top: none">            <tr align="center">                <td>租金：{{body.zujin}}</td>                <td>房屋押金：{{body.fangwuyajin}}</td>                <td>水电押金：{{body.shuidianyajin}}</td>                <td>门卡押金：{{body.menkayajin}}</td>                <td>其他押金：{{body.qitayajin}}</td>                <td>预存费用：{{body.yucunfeiyong}}</td>                <td>押金总计：{{body.yajinzongji}}</td>            </tr>        </table>        <table align="center"  cellspacing="0" style="border-top: none">            <tr align="center">                <td width="20%">退房原因和描述</td>                <td width="80%">{{body.tuifangyuanyin}}</td>            </tr>        </table>        <table align="center"  cellspacing="0" style="border-top: none">            <tr align="center">                <td>预约退房时间：{{body.yuyuetuifangshijian}}</td>                <td>实际退房时间：{{body.shijituifangshijian}}</td>                <td>退房性质：{{body.tuifangxingzhi}}</td>            </tr>            <tr align="center">                <td>银行名称：{{body.yinhangmingcheng}}</td>                <td>收款人：{{body.shoukuanren}}</td>                <td>账户号码：{{body.zhanghuhaoma}}</td>            </tr>        </table>        <table align="center"  cellspacing="0" style="border-top: none">            <tr align="center">                <td></td>                <td>退房读数</td>                <td>上期结清读数</td>                <td>差值</td>                <td>计费方案</td>                <td>产生费用</td>            </tr>            <tr align="center">                <td>水费</td>                <td>{{body.shuituifang}}</td>                <td>{{body.shuijieqing}}</td>                <td>{{body.shuichazhi}}</td>                <td>{{body.shuijifeifangan}}</td>                <td>{{body.sysshuifei}}</td>            </tr>            <tr align="center">                <td>电费</td>                <td>{{body.diantuifang}}</td>                <td>{{body.dianjieqing}}</td>                <td>{{body.dianchazhi}}</td>                <td>{{body.dianjifeifangan}}</td>                <td>{{body.sysdianfei}}</td>            </tr>            <tr align="center">                <td>燃气费</td>                <td>{{body.qituifang}}</td>                <td>{{body.qijieqing}}</td>                <td>{{body.qichazhi}}</td>                <td>{{body.qijifeifangan}}</td>                <td>{{body.sysqifei}}</td>            </tr>        </table>        <table align="center"  cellspacing="0" style="border-top: none">            <tr align="center">                <td width="13%">                    能源类总费用</br>{{body.nengyuanzongfeiyong}}                </td>                <td style="overflow: visible; word-wrap:break-word; white-space:normal">                    <div>水费：{{body.shuifei}}，电费：{{body.dianfei}}：燃气费：{{body.qifei}}，电视费：{{body.dianshifei}}，网络费：{{body.wangfei}}，物业管理费：{{body.wuguanfei}}，租赁服务费：{{body.zulinfuwufei}}</div>                </td>            </tr>            <tr align="center">                <td width="13%">                    其他扣款费用</br>{{body.qitakoukuan}}                </td>                <td style="overflow: visible; word-wrap:break-word; white-space:normal">                    <div>维修补偿费：{{body.weixiupeichang}}，累计欠款：{{body.leijiqiankuan}}</div>                </td>            </tr>            <tr align="center">                <td width="13%">                    租金结算</br>{{body.zujinjiesuan}}                </td>                <td style="overflow: visible; word-wrap:break-word; white-space:normal">                    <div>未交租金：{{body.weijiaozujin}}，超期退房：{{body.chaoqitianshu}}天，超期房租费：{{body.chaoqifangzu}}</div>                </td>            </tr>            <tr align="center">                <td width="13%">                    违约金和滞纳金</br>{{body.weiyuejinhezhinajin}}                </td>                <td style="overflow: visible; word-wrap:break-word; white-space:normal">                    <div>违约金：{{body.weiyuejin}}（描述：{{body.weiyuejinmiaoshu}}），滞纳金：{{body.zhinajin}}（描述：{{body.zhinajinmiaoshu}}）</div>                </td>            </tr>            <tr align="center">                <td width="13%">                    合计应退还款</br><span style="font-size:14px;font-weight: bold ">{{body.hejiyingtuihuan}}</span>                </td>                <td style="overflow: visible; word-wrap:break-word; white-space:normal">                    <div>合计应退还款 = 押金总额 - 能源扣费 - 其他扣款 - 租金结算 - （违约金+滞纳金） </div>                </td>            </tr>        </table>        <div style="margin: 3px 20px">            <span style="font-size: 14px">退房处理人：</span>            <span style="font-size: 14px; margin-left: 100px">审核人：</span>            <span style="font-size: 14px; margin-left: 100px">复核人：</span>            <span style="font-size: 14px; margin-left: 100px">同意出账人：</span>        </div>    </div>		<script>		var body2='+printArray+'	</script>	<script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;			 function print() { document.execCommand("print") }</script></body></html>';
	}
	if(row.jhpType=="业主退房出账"){//旧版退房申请单
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><title>业主退房出账申请单</title>  <style>    table td {		border: 1px solid #888;		border-top: none;		white-space: nowrap;		padding: 2px;		font-size: 13px;	}	table {		table-layout: fixed;		width: 770px;		font-size: 12px;		margin: 0 10px	}	#body {		border: 1px solid black;		width: 790px;		height: 450px	}	#title {		font-size: 18px;		text-align: center;		font-weight: bold	}	#header {		font-size: 16px;		text-align: center;		margin: 10px;		font-weight: bold	}	#footer {		margin: 20px 20px	}	#footer div {		float: left;		width: 20%;		font-weight: bold	}      </style>  <script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head> <body>   <div id="body">  <div style="padding:2px;;z-index:1;position:absolute;font-size:13px;font-weight:bold">补打</div>  <div id="title">    业主退房出账申请单   </div>    <table align="center" cellspacing="0" style="margin-top:2px;border-top: 1px solid #888;">     <tbody>     <tr align="center">       <td>房屋地址</td>       <td>姓名</td>       <td>手机号</td>       <td>身份证号</td>      </tr>      <tr align="center">       <td>{{body.fangwudizhi}}</td>       <td>{{body.name}}</td>       <td>{{body.tel}}</td>       <td>{{body.idcard}}</td>      </tr>     </tbody>   </table>    <table align="center" cellspacing="0" style="border-top: none">     <tbody>     <tr align="center">       <td>签约日期</td>       <td>托管开始</td>       <td>托管结束</td>       <td>合约期限</td>      </tr>      <tr align="center">       <td>{{body.qianyueriqi}}</td>       <td>{{body.tuoguankaishi}}</td>       <td>{{body.tuoguanjiesu}}</td>       <td>{{body.heyueqixian}}</td>      </tr>     </tbody>   </table>    <table align="center" cellspacing="0" style="border-top: none">     <tbody>     <tr align="center">       <td>预约退房时间：{{body.yuyuetuifangshijian}}</td>       <td>实际退房时间：{{body.shijituifangshijian}}</td>       <td>退房性质：{{body.tuifangxingzhi}}</td>      </tr>      <tr align="center">       <td>银行名称：{{body.yinhangmingcheng}}</td>       <td>收款人：{{body.shoukuanren}}</td>       <td>账户号码：{{body.zhanghuhaoma}}</td>      </tr>     </tbody>   </table>    <table align="center" cellspacing="0" style="border-top: none">     <tbody>     <tr align="center">       <td width="20%">退房原因和描述</td>       <td width="80%">{{body.tuifangyuanyin}}</td>      </tr>     </tbody>   </table>    <table align="center" cellspacing="0" style="border-top: none">     <tbody>     <tr align="center">       <td></td>       <td>退房读数</td>       <td>结清读数</td>       <td>差值</td> 	  <td>费用</td>     </tr>      <tr align="center">       <td>水费</td>       <td>{{body.shuituifang}}</td>       <td>{{body.shuijieqing}}</td>       <td>{{body.shuichazhi}}</td>       <td>{{body.shuifei}}</td>      </tr>      <tr align="center">       <td>电费</td>       <td>{{body.diantuifang}}</td>       <td>{{body.dianjieqing}}</td>       <td>{{body.dianchazhi}}</td>       <td>{{body.dianfei}}</td>      </tr>      <tr align="center">       <td>燃气费</td>       <td>{{body.qituifang}}</td>       <td>{{body.qijieqing}}</td>       <td>{{body.qichazhi}}</td>       <td>{{body.qifei}}</td>      </tr>     </tbody>   </table>    <table align="center" cellspacing="0" style="border-top: none">     <tbody>     <tr align="center">       <td width="13%"> 能源总费用<br />{{body.nengyuanzongfeiyong}} </td>       <td style="overflow: visible; word-wrap:break-word; white-space:normal">        <div>        水费：{{body.shuifei}}，电费：{{body.dianfei}}：燃气费：{{body.qifei}}       </div> </td>      </tr>      <tr align="center">       <td width="13%"> 其他总费用<br />{{body.qitazongfeiyong}} </td>       <td style="overflow: visible; word-wrap:break-word; white-space:normal">        <div>        未付租金：{{body.weifuzujin}}，物业管理费：{{body.wuguanfei}}，维修补偿费：{{body.weixiupeichang}}，收回押金：{{body.shouhuiyajin}}，违约金：{{body.weiyuejin}}（描述：{{body.weiyuejinmiaoshu}}）       </div> </td>      </tr>      <tr align="center">       <td width="13%"> 合计应退还款<br /><span style="font-size:14px;font-weight: bold ">{{body.hejiyingtuihuan}}</span> </td>       <td style="overflow: visible; word-wrap:break-word; white-space:normal">        <div>        合计应退还款 = 能源总费用  + 其他总费用       </div> </td>      </tr>     </tbody>   </table>    <div style="margin: 3px 20px">     <span style="font-size: 14px">退房处理人：</span>     <span style="font-size: 14px; margin-left: 100px">审核人：</span>     <span style="font-size: 14px; margin-left: 100px">复核人：</span>     <span style="font-size: 14px; margin-left: 100px">同意出账人：</span>    </div>   </div>   <script>	var body2='+printArray+'  </script>   <script>    var vm;	vm = new Vue({		el: "#body",		data: {			body: {}		}	});	vm.body = body2;		function print() {		document.execCommand("print")	}  </script> </body></html>';
	}
	if(row.jhpType=="租客退房审批"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><style>        table td {            border: 1px solid #888;            border-top:none;            white-space: nowrap;            padding: 1px 0 0 0;			font-size: 12px;        }                table {                        table-layout: fixed;            width: 770px;            font-size: 12px;            margin: 0 10px        }                #body {            border: 1px solid black;            width: 790px;            height: 450px        }                #title {            font-size: 18px;            text-align: center;            font-weight: bold        }                #header {            font-size: 16px;            text-align: center;            margin: 10px;            font-weight: bold        }                #footer {            margin: 20px 20px        }                #footer div {            float: left;            width: 20%;            font-weight: bold        }</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body><div id="body" style=""><div id="title" style="">    {{body.yezhuzuke}}退房出账审批单</div><div style="text-align:right;font-size: 14px;margin:0 20px 0 0;">    退房编号：{{body.tuifangbianhao}}</div><table align="center" cellspacing="0" style="margin-top:2px;border-top: 1px solid #888;"><tbody><tr align="center"><td>房屋地址</td><td>姓名</td><td>经办人</td></tr><tr align="center"><td>{{body.wuyedizhi}}</td><td>{{body.name}}</td><td>{{body.jingbanren}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>退房性质</td><td>退房手续</td><td>退房时间</td></tr><tr align="center"><td>{{body.tuifangxingzhi}}</td><td>{{body.tuifangshouxu}}</td><td>{{body.tuifangshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>合约开始日</td><td>合约结束日</td><td>退款时间</td></tr><tr align="center"><td>{{body.qizuri}}</td><td>{{body.jiesuri}}</td><td>{{body.tuikuanshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>应缴费用</td><td>应退费用</td></tr><tr align="center"><td style="white-space: normal;">{{body.yingjiaofeiyong}}</td><td style="white-space: normal;">{{body.yingtuifeiyong}}</td></tr> 	</tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td style="width:33%">{{body.yezhuzuke}}结算账户</td><td style="width:66%">{{body.yinhangmingcheng}} - {{body.shoukuanren}} - {{body.zhanghuhaoma}}</td></tr><tr align="center"><td style="width:33%">{{body.shijijiesuan}}</td><td style="width:66%;font-weight: bold">{{body.shijiyingtuikuan}}(大写 :{{body.shijiyingtuikuandaxie}})</td></tr> 	</tbody></table><div style="margin: 3px 20px"><span style="font-size: 14px">退房处理人：</span><span style="font-size: 14px; margin-left: 100px">审核人：</span><span style="font-size: 14px; margin-left: 100px">复核人：</span><span style="font-size: 14px; margin-left: 100px">同意出账人：</span></div></div><script>		var body2='+printArray+'	</script><script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;			 function print() { document.execCommand("print") }</script></body></html>';
	}
	if(row.jhpType=="业主退房审批"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><style>        table td {            border: 1px solid #888;            border-top:none;            white-space: nowrap;            padding: 1px 0 0 0;			font-size: 12px;        }                table {                        table-layout: fixed;            width: 770px;            font-size: 12px;            margin: 0 10px        }                #body {            border: 1px solid black;            width: 790px;            height: 450px        }                #title {            font-size: 18px;            text-align: center;            font-weight: bold        }                #header {            font-size: 16px;            text-align: center;            margin: 10px;            font-weight: bold        }                #footer {            margin: 20px 20px        }                #footer div {            float: left;            width: 20%;            font-weight: bold        }</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body><div id="body" style=""><div id="title" style="">    {{body.yezhuzuke}}退房出账审批单</div><div style="text-align:right;font-size: 14px;margin:0 20px 0 0;">    退房编号：{{body.tuifangbianhao}}</div><table align="center" cellspacing="0" style="margin-top:2px;border-top: 1px solid #888;"><tbody><tr align="center"><td>房屋地址</td><td>姓名</td><td>经办人</td></tr><tr align="center"><td>{{body.wuyedizhi}}</td><td>{{body.name}}</td><td>{{body.jingbanren}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>退房性质</td><td>退房手续</td><td>退房时间</td></tr><tr align="center"><td>{{body.tuifangxingzhi}}</td><td>{{body.tuifangshouxu}}</td><td>{{body.tuifangshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>合约开始日</td><td>合约结束日</td><td>退款时间</td></tr><tr align="center"><td>{{body.qizuri}}</td><td>{{body.jiesuri}}</td><td>{{body.tuikuanshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>应缴费用</td><td>应退费用</td></tr><tr align="center"><td style="white-space: normal;">{{body.yingjiaofeiyong}}</td><td style="white-space: normal;">{{body.yingtuifeiyong}}</td></tr> 	</tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td style="width:33%">{{body.yezhuzuke}}结算账户</td><td style="width:66%">{{body.yinhangmingcheng}} - {{body.shoukuanren}} - {{body.zhanghuhaoma}}</td></tr><tr align="center"><td style="width:33%">{{body.shijijiesuan}}</td><td style="width:66%;font-weight: bold">{{body.shijiyingtuikuan}}(大写 :{{body.shijiyingtuikuandaxie}})</td></tr> 	</tbody></table><div style="margin: 3px 20px"><span style="font-size: 14px">退房处理人：</span><span style="font-size: 14px; margin-left: 100px">审核人：</span><span style="font-size: 14px; margin-left: 100px">复核人：</span><span style="font-size: 14px; margin-left: 100px">同意出账人：</span></div></div><script>		var body2='+printArray+'	</script><script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;			 function print() { document.execCommand("print") }</script></body></html>';
	}
	if(row.jhpType=="租客转租协议"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><HTML><HEAD><meta charset="utf-8"><TITLE>转租协议</TITLE></HEAD><style>		span{			text-decoration: underline;		}			</style>	<script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>	<BODY>		<div id=\"body\" style=\"margin:auto;width: 595px;height: 842px;padding: 0 40px 0 40px;\">			<center>				<div style=\"width: 100%;font-size: 26px;font-family: simsun;font-weight:bold;margin-top:60px;\">					转租协议书</div>			</center>			<div id=\"\" style=\"margin-top:10px;width: 100%;font-size: 16px;font-family: simsun;line-height:34px\">&nbsp;&nbsp;甲方<span>&nbsp;{{body.renterName}}&nbsp;</span>（身份证：<span>&nbsp;{{body.idcard}}&nbsp;</span> ）承租乙方《{{body.companyName}}》之物业<span>&nbsp;{{body.houseAddress}}&nbsp;</span>，合同有效期为：<span> {{body.beginYear}} </span>年<span> {{body.beginMonth}} </span>月<span> {{body.beginDay}} </span>日— <span> {{body.endYear}} </span>年<span> {{body.endMonth}} </span>月 <span> {{body.endDay}} </span>日，合同编号：<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>；现因甲方自身原因，需在合同期内将本物业的承租权转给第三方。<br />&nbsp;&nbsp;经双方协商达成以下共识：<div style=\"margin-left: 28px;width: 100%;\">1.甲方于<span>&nbsp;&nbsp;&nbsp;</span>年<span>&nbsp;&nbsp;</span>月<span>&nbsp;&nbsp;</span>日前搬离本物业，以便第三方随时入住；如第三方已向乙方签署合同或缴纳定金，本日期不得变更；</div><div style=\"margin-left: 28px;width: 100%;\">2.在第三方承租之前租金由甲方承担，《物业出租合同》（编号：<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>）双方继续履行相关合同条例；</div><div style=\"margin-left: 28px;width: 100%;\">3.在进行第三方招租时所产生的费用（中介费、空置期、免租期）由甲方承担。</div><div style=\"margin-left: 28px;width: 100%;\">4.乙方统一并落实、安排第三方的招租工作，如第三方成交租金低于现合同租金，在甲方合同有效期内由甲方一次性补足差额。</div><div style=\"margin-left: 28px;width: 100%;\">5.在成功进行第三方招租后，甲方需向乙方支付租赁保证金的50%作为服务费；甲方在结清相关费用后，根据《退房规定》退还甲方租赁保证金。</div><div style=\"margin-left: 28px;width: 100%;\">6.第三方的合同期限、价格等由乙方进行具体安排，甲方不进行任何干涉。</div><div style=\"margin-left: 28px;width: 100%;\">7.在甲方所签署的《物业出租合同》（编号：<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>）转让承租权之前，义务配合乙方进行招租工作，为乙方提供招租便利。如因甲方原因，导致乙方无法开展招租实质性工作，相关损失费用将与乙方无关！</div><div style=\"margin-left: 28px;width: 100%;\">以上条款均由双方确认并认可，共计 7 项；</div><div style=\"margin-left: 70px;font-weight:bold;\">签名（甲方）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签名（乙方）： </div><div style=\"margin-left: 70px;font-weight:bold;\">代理人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp; 月&nbsp; 日</div><div style=\"margin-left: 70px;font-weight:bold;\">年&nbsp; 月&nbsp; 日</div></div>		</div>	<script>		var body2='+printArray+'	</script><script>		var vm;				vm = new Vue({		  el: \"#body\",		  data: {			body:{							}		  }		});		vm.body = body2;	 function print() { document.execCommand(\"print\") }</script></BODY></HTML>';
	}
	if(row.jhpType=="业主应付款申请单"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="utf-8"><style>	table td {border:1px solid #888;overflow: hidden;  				white-space: nowrap;  				text-overflow: clip;  				padding:1px 0;			}			table{				border:1px solid #888;				table-layout:fixed;				width:770px;				font-size:12px; margin:10px			}			#body {				border:1px solid black; width:790px; height:450px			}			#title {				font-size:26px; text-align:center; margin:10px; font-weight:bold			}			#header {				font-size:16px; text-align:center; margin:10px; font-weight:bold			}			#footer {				margin:20px 20px			}			#footer div {				float:left; width: 20%; font-weight:bold			}		</style>		<script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head>	<body>	<center>	<div id="body" style="">	<div style="padding:2px;;z-index:1;position:absolute;font-size:13px;font-weight:bold">补打</div> 		<div id="title" style="">付款申请单</div>			<div id="header" style="">				<div>					<span id="year">{{body.year}}</span>年					<span id="month">{{body.month}}</span>月					<span id="date">{{body.date}}</span>日				</div>				<div style="float:right">									</div>			</div>			<table align="center" border="0" cellspacing="0" style="">				<tr align="center">					<td width="20%" style="font-size:16px;font-weight:bold">关联房屋</td>					<td width="10%" style="font-size:16px;font-weight:bold">付款日</td>					<td width="19%" style="font-size:16px;font-weight:bold">账目周期</td>					<td width="8%" style="font-size:16px;font-weight:bold">收款人</td>					<td width="20%" style="font-size:16px;font-weight:bold">收款账号</td>					<td width="13%" style="font-size:16px;font-weight:bold">收款银行</td>					<td width="10%" style="font-size:16px;font-weight:bold">付款金额</td>				</tr>				<tr v-for="item in body.journal_arr" align="center">					<td>{{item.fangwu}}</td>					<td>{{item.fukuanri}}</td>					<td>{{item.zhouqi}}</td>					<td>{{item.shoukuanren}}</td>					<td>{{item.zhanghao}}</td>					<td>{{item.yinhang}}</td>					<td>{{item.money}}</td>				</tr>								<tr align="center">					<td colspan="5" style="font-size:16px;font-weight:bold">合计</td>					<td colspan="2" style="font-size:16px;font-weight:bold">￥{{body.sum}}元</td>				</tr>			</table>						<div id="footer" style="">				<div style="margin-left:60px">审核人：<span id="jizhangren">{{body.jizhangren}}</span></div>				<div style="margin-left:100px">复核人：<span id="shenheren">{{body.shenheren}}</span></div>				<div style="margin-left:120px">付款确认人：<span id="fuheren">{{body.fuheren}}</span></div>			</div>		</div>		<script>			var body2='+printArray+'		</script>		<script>			var vm;			vm = new Vue({			  el: "#body",			  data: {				body:{									}			  }			});			vm.body = body2;			</script>	</center></body></html>';
	}
	if(row.jhpType=="租客退房账单"){
		var printArray = row.jhpJson.getRealJsonStr();console.log(printArray)
		iframes ='<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>	table{ width:290px; table-layout:fixed;}	  img{height:150px;width:150px}table td {border-top: none; word-wrap:break-word;	}h1{font-size: 30px;text-align:center}h2{font-size: 20px;text-align:center}#body{}#body .other_fee{border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head><body style="background-color:#fff;width:290px"><div id="body" style="width:290px;margin-left:10px"><div class="other_fee"> <div class="title">  <h1>房智尊智慧主题酒店退房单</h1>  <table>   <tbody>    <tr>     <td>时间/Time : {{body.time}}</td>    </tr>    <tr>     <td>订单号/SaleNo : {{body.saleNo}}</td>    </tr>    <tr>     <td>客人/Customer : {{body.customer}}</td>    </tr>    <tr>     <td>房号/RoomNo : {{body.roomNo}}</td>    </tr>    <tr>     <td>入住/Arrival : {{body.arrival}}</td>    </tr>    <tr>     <td>预离/Leave : {{body.leave}}</td>    </tr>    <tr>     <td>收银员{{body.userName}}</td>    </tr>   </tbody>  </table> </div></div><div class="other_fee"> <div class="paymentVoucher">  <h2>收费信息/paymentVoucher</h2>  <table style="width: 100%;">   <tbody>    <tr>     <td>消费/Consumption : RMB {{body.additionalSum}}</td>    </tr>    <tr>     <td>欠费/Arrears : RMB {{body.arrears}}</td>    </tr>    <tr>     <td>收费金额/Price : RMB {{body.price}}</td>    </tr>   </tbody>  </table> </div></div><div class="other_fee"> <div class="RefundVoucher">  <h2>应退信息/RefundVoucher</h2>  <table style="width: 100%;">   <tbody>    <tr>     <td>房费/HouseRent : RMB {{body.houseRent}}</td>    </tr>    <tr>     <td>押金/Deposit : RMB {{body.deposit}}</td>    </tr>    <tr>     <td>退款金额/Refund : RMB {{body.refund}}</td>    </tr>   </tbody>  </table> </div></div><div class="other_fee"> <div class="actualVoucher">  <h2 id="getOrRefundMoney"></h2>  <table id="table1"></table> </div></div><div> <div class="guestInstructions">  <h2>宾客须知/GuestInstructions</h2> </div> <div>  1. 每日最后退房时间为中午{{body.setUpCheckOutTime}},如超过{{body.setUpCheckOutTime}} 时，须加收超钟房费。  </div> <div style="margin-top:10px">  2. 服务电话 : {{body.telphone}} </div> <div style="text-align:center;font-size:20px;margin:20px">  <div>   欢迎下次光临  </div>  <div id="wxgzhImgPath"></div> </div> <div>  <h2>扫码关注微信公众号支持在线定房，让您行程无忧。WeChat scan QR code，Support online booking Let your journey be free from worry。</h2> </div> </div></div><script> var body2='+printArray+';document.getElementById("wxgzhImgPath").innerHTML="<img src="+body2.wxgzhImgPath+" />";if(body2.paymentMthod == "现金退款" || body2.paymentMthod == "微信退款"){document.getElementById("getOrRefundMoney").innerHTML="退款总额/TotalRefund";document.getElementById("table1").innerHTML="<tbody><tr><td>总金额/TotalSum : RMB "+body2.totalSum+"</td></tr><tr><td>支付方式/PaymentMthod : "+body2.paymentMthod+"</td></tr></tbody>";}else{var giveChange = parseFloat(body2.moneyInput) - parseFloat(body2.totalSum);document.getElementById("getOrRefundMoney").innerHTML="缴费总额/PaymentAmount";document.getElementById("table1").innerHTML="<tbody><tr><td>应收金额/Receivables : RMB "+body2.totalSum+"</td></tr>		  	  <tr><td>实收金额/ActualReceipts : RMB "+body2.moneyInput+"</td></tr><tr><td>找零/GiveChange : RMB "+giveChange.toFixed(2)+"</td></tr><tr><td>支付方式/PaymentMthod : "+body2.paymentMthod+"</td>      </tr></tbody>";}</script><script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;			 function print() { document.execCommand("print") }</script></body></html>';
	}
	if(row.jhpType=="租客入住账单"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes ='<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>	table{ width:290px; table-layout:fixed;}	  img{height:150px;width:150px}'+
		'table td {border-top: none; word-wrap:break-word;	}h1{font-size: 30px;text-align:center}h2{font-size: 20px;text-align:center}'+
		'#body{}#body .other_fee{border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js">'+
		'</script> </head><body style="background-color:#fff;width:290px;margin-left:10px"><div id="body" style="width:290px;"><div class="other_fee"><div class="title">'+
		'<h1>房智尊智慧主题酒店入住单</h1><table><tbody><tr><td>时间/Time : {{body.time}}</td></tr><tr><td>订单号/SaleNo : {{body.saleNo}}</td></tr><tr><td>客人/Customer : '+
		'{{body.customer}}</td></tr><tr><td>房号/RoomNo : {{body.roomNo}}</td></tr><tr><td>入住/Arrival : {{body.arrival}}</td></tr><tr><td>预离/Leave : {{body.leave}}</td>'+
		'</tr><tr><td>收银员{{body.userName}}</td></tr></tbody></table></div></div><div class="other_fee"><div class="paymentVoucher"><h2>付款信息/PaymentVoucher</h2>'+
		'<table style="width: 100%;"><tbody><tr><td>总金额/TotalSum : RMB {{body.totalSum}}</td></tr><tr><td>付款方式/PaymentMthod : {{body.paymentMthod}}</td></tr></tbody>'+
		'</table></div></div><div class="other_fee"><div class="paymentLncluding"><h2>付款包含/PaymentLncluding</h2><table style="width: 100%;">'+
		'<tbody><tr><td>房价/Price : RMB {{body.price}}</td></tr><tr><td>押金/Deposit : RMB {{body.deposit}}</td></tr></tbody></table></div></div><div>'+
		'<div class="guestInstructions"><h2>宾客须知/GuestInstructions</h2></div><div>每日最后退房时间为中午14:00,如超过14:00 时，须加收超钟房费；</div><div style="margin-top:10px">2.服务电话 : {{body.telphone}}</div>'+
		'<div style="text-align:center;font-size:20px;margin:20px"><div>欢迎下次光临</div><div id="wxgzhImgPath"></div></div><div><h2>扫码关注微信公众号支持在线定房，让您行程无忧。WeChat scan QR code，Support online booking Let your journey be free from worry。</h2></div>    </div></div>'+
		'<script> var body2='+printArray+';console.log(body2.wxgzhImgPath);document.getElementById("wxgzhImgPath").innerHTML="<img src="+body2.wxgzhImgPath+" />";</script><script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;			 function print() { document.execCommand("print") }</script></body></html>';
	}
	if(row.jhpType=="客户下定打印"){
		var printArray = row.jhpJson.getRealJsonStr();console.log("=-="+printArray);
		iframes='<!DOCTYPE html> <html>  <head> <meta charset="UTF-8"> <title>租客下定</title> <style> table td { border: 1px solid #888; border-left: none; border-top: none; white-space: nowrap; padding: 2px; font-size: 13px; text-align: center; }  table { /*border: 1px solid #888;*/ table-layout: fixed; border-left: 1px solid #888; width: 768px; border-bottom: none; border-right: none; font-size: 16px; margin: 0 10px; }  #body { border: 1px solid black; width: 790px; height: 450px }  #title { font-size: 22px; text-align: center; font-weight: bold }  #header { font-size: 14px; text-align: center; margin: 10px; font-weight: bold } </style> <script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head>  <body> <center> <div id="body"><div style="padding:2px;;z-index:1;position:absolute;font-size:13px;font-weight:bold">补打</div> <div style="text-align: center"> <div id="title" style="">{{body.gongsimingcheng}}定金收据</div> </br> </div> <div id="header" style=""> <div style="float:left;margin-left:42% ;"><span id="year">{{body.year}}</span> 年 <span id="month">{{body.month}}</span> 月 <span id="date">{{body.date}}</span> 日 </div> <div style="float:right;margin-right:1% ;font-size: 12px">票据编号：{{body.depositBillNumber}}<span id="piaojubianhao"></span></div> </div> <table border="1" style="" cellspacing="0"> <tr> <td>地址</td> <td colspan="3">{{body.address}}</td> <td>收款方式</td> <td>{{body.depositPayType}}</td> </tr> <tr> <td>客户姓名</td> <td>{{body.depositRenterName}}</td> <td>联系电话</td> <td colspan="3">{{body.depositRenterPhone}}</td> </tr> <tr> <td>经手人</td> <td>{{body.depositFollowShowUserInfo}}</td> <td>定金有效时间</td> <td>{{body.contractBegin}}</td> <td>结束时间</td> <td>{{body.depositDateEnd}}</td> </tr> <tr> <td>下定类型</td> <td>{{body.depositType}}</td> <td>合同开始</td> <td>{{body.depositDateEnd}}</td> <td>合同结束</td> <td>{{body.contractEnd}}</td> </tr> <tr> <td>定金(元)</td> <td>{{body.depositGet}}</td> <td>实收金额(元)</td> <td colspan="3">{{body.depositGet}}</td> </tr> <tr> <td>双方约定 </td> <td colspan="5" style="white-space: normal;word-break:break-all;text-align: left"> 客户 {{body.depositRenterName}} 需于 {{body.depositDateEnd}} 前，由 {{body.depositRenterName}} 本人携带身份证原件，在工作时间与我司签署 {{body.address}} 我司提供的《房屋租赁合同》，该合同条款双方已共同认可，并约定 <span v-if="body.rent!=undefined && body.rent!=\'\' && body.rent!=0">租金：{{body.rent}}元/月</span> <span v-if="body.serverFee!=undefined && body.serverFee!=\'\' && body.serverFee!=0">、服务费:{{body.serverFee}}元/月</span> <span v-if="body.propertyFee!=undefined && body.propertyFee!=\'\' && body.propertyFee!=0">、物管费：{{body.propertyFee}}元/月</span> <span v-if="body.netFee!=undefined && body.netFee!=\'\' && body.netFee!=0">、网络费：{{body.netFee}}元/月</span> <span v-if="body.tvFee!=undefined && body.tvFee!=\'\' && body.tvFee!=0">、电视费:{{body.tvFee}}元/月</span> <span v-if="body.housingDeposit!=undefined && body.housingDeposit!=\'\' && body.housingDeposit!=0">、房屋押金：{{body.housingDeposit}}元/月</span> <span v-if="body.netFee!=doorcardDeposit && body.doorcardDeposit!=\'\' && body.doorcardDeposit!=0">、门卡押金：{{body.doorcardDeposit}}元/月</span> <span v-if="body.hydropowerDeposit!=undefined && body.hydropowerDeposit!=\'\' && body.hydropowerDeposit!=0">、水电押金：{{body.hydropowerDeposit}}元/月</span> <span v-if="body.otherDeposit!=undefined && body.otherDeposit!=\'\' && body.otherDeposit!=0">、其它押金：{{body.otherDeposit}}元/月</span> ；如客户 {{body.depositRenterName}} 逾期未与我司签署合同，本定金收据自动失效，我司不退还本定金。 </td> </tr> </table> </div> </center> <script> var body2 = ' + printArray + ' </script> <script> var vm; vm = new Vue({ el: "#body", data: { body: {} } }); vm.body = body2; console.log(vm.body);  function print() { document.execCommand("print") } </script> </body>  </html>';
	}
	if(row.jhpType=="销售开单-自取"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>销售开单票据</title><style> table td {	border: 1px solid #888;	border-top: none;	white-space: nowrap;	padding: 2px;	font-size: 13px;}	table {	table-layout: fixed;	width: 770px;	font-size: 12px;	margin: 0 10px	}	#body {border: 1px solid black;	width: 790px;	height: 450px	}	#title {	font-size: 18px;	text-align: center;	font-weight: bold	}	#header {	font-size: 16px;	text-align: center;	margin: 10px;	font-weight: bold	}	#footer {	margin: 20px 20px	}	#footer div {float: left;	width: 20%;	font-weight: bold	}	</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head><body><div id="body"><div><div id="title" style="margin: 10px 0 0 0;"> {{body.gongsi}}<hr style="width: 20%;" />销 售 单 </div><div style="float: left;margin-left: 1%;"> 客户名称：{{body.kehumingcheng}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：{{body.riqi}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">订&nbsp;&nbsp;单&nbsp;号：{{body.dingdanhao}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">联系号码：{{body.lianxihaoma}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">运输方式：{{body.yunshufangshi}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">付款方式：{{body.fukuanfangshi}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">定金比率：{{body.dingjinbilu}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">预付定金：{{body.yufudingjin}} </div></div> </div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="14%">商品编码</td><td width="30%">商品名称</td><td width="14%">原价</td><td width="14%">现价</td><td width="14%">数量</td><td width="14%">小计</td></tr><tr v-for="item in body.goods" align="center"><td width="14%">{{item.shangpinbianma}}</td><td width="30%">{{item.shangpinmingcheng}}</td><td width="14%">{{item.yuanjia}}</td><td width="14%">{{item.xianjia}}</td><td width="14%">{{item.shuliang}}</td><td width="14%">{{item.xiaoji}}</td></tr><tr align="center"><td rowspan="2">备注</td><td rowspan="2" colspan="2">{{body.beizhu}}</td><td rowspan="2">总金额</td><td rowspan="2" colspan="2">{{body.zongjine}}</td></tr></tbody></table><div style="float: left;margin-left: 1%;"> 业务人员：{{body.yewurenyuan}} </div></div><script>	var body2 = '+printArray+'	</script>	<script>	var vm;	vm = new Vue({	el: "#body",	data: {	body: {}	}	});	vm.body = body2;function print() {	document.execCommand("print")	}	</script></body></html>';
	}
	if(row.jhpType=="销售开单-快递"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>销售开单票据</title><style> table td {	border: 1px solid #888;	border-top: none;	white-space: nowrap;	padding: 2px;	font-size: 13px;}	table {	table-layout: fixed;	width: 770px;	font-size: 12px;	margin: 0 10px	}	#body {border: 1px solid black;	width: 790px;	height: 450px	}	#title {	font-size: 18px;	text-align: center;	font-weight: bold	}	#header {	font-size: 16px;	text-align: center;	margin: 10px;	font-weight: bold	}	#footer {	margin: 20px 20px	}	#footer div {float: left;	width: 20%;	font-weight: bold	}	</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head><body><div id="body"><div><div id="title" style="margin: 10px 0 0 0;"> {{body.gongsi}}<hr style="width: 20%;" />销 售 单 </div><div style="float: left;margin-left: 1%;"> 客户名称：{{body.kehumingcheng}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：{{body.riqi}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">订&nbsp;&nbsp;单&nbsp;号：{{body.dingdanhao}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">联系号码：{{body.lianxihaoma}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">运输方式：{{body.yunshufangshi}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">付款方式：{{body.fukuanfangshi}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">定金比率：{{body.dingjinbilu}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">预付定金：{{body.yufudingjin}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">收货地址：{{body.shouhuodizhi}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">发货日期：{{body.fahuoriqi}}</div></div> </div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="14%">商品编码</td><td width="30%">商品名称</td><td width="14%">原价</td><td width="14%">现价</td><td width="14%">数量</td><td width="14%">小计</td></tr><tr v-for="item in body.goods" align="center"><td width="14%">{{item.shangpinbianma}}</td><td width="30%">{{item.shangpinmingcheng}}</td><td width="14%">{{item.yuanjia}}</td><td width="14%">{{item.xianjia}}</td><td width="14%">{{item.shuliang}}</td><td width="14%">{{item.xiaoji}}</td></tr><tr align="center"><td rowspan="2">备注</td><td rowspan="2" colspan="2">{{body.beizhu}}</td><td rowspan="2">总金额</td><td rowspan="2" colspan="2">{{body.zongjine}}</td></tr></tbody></table><div style="float: left;margin-left: 1%;"> 业务人员：{{body.yewurenyuan}} </div></div><script>	var body2 = '+printArray+'	</script>	<script>	var vm;	vm = new Vue({	el: "#body",	data: {	body: {}	}	});	vm.body = body2;function print() {	document.execCommand("print")	}	</script></body></html>';
	}
	if(row.jhpType=="线上订单票据"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>线上订单票据</title><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script><style>table td {border: 1px solid #888;border-top: none;white-space: nowrap;padding: 2px;font-size: 13px;}table {table-layout: fixed;width: 770px;font-size: 12px;margin: 0 10px}#body {border: 1px solid black;width: 790px;height: 450px}#title {font-size: 18px;text-align: center;font-weight: bold}</style></head><body><div id="body"><div><div id="title" style="margin: 10px 0 0 0;"> {{body.gongsi}}<hr style="width: 20%;" />线上订单 </div><div style="float: left;margin-left: 1%;"> 客户名称：{{body.kehumingcheng}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">订单类型：{{body.dingdanleixing}}</div></div><div style="clear: both;"></div>	<div style="float: left;margin-left: 1%;">订&nbsp;&nbsp;单&nbsp;&nbsp;号：{{body.dingdanhao}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">联系号码：{{body.lianxihaoma}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">下单时间：{{body.xiadanshijian}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">支付方式：{{body.zhifufangshi}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">收货地址：{{body.shouhuodizhi}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">实付金额：{{body.shifujine}}</div></div></div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="25%">商品名称</td><td width="15%">原价</td><td width="15%">现价</td><td width="15%">数量</td><td width="15%">优惠标签</td><td width="15%">热销标签</td></tr><tr v-for="item in body.goods" align="center"><td width="25%">{{item.shangpinmingcheng}}</td><td width="15%">{{item.yuanjia}}</td><td width="15%">{{item.xianjia}}</td><td width="15%">{{item.shuliang}}</td><td width="15%">{{item.youhuibiaoqian}}</td><td width="15%">{{item.rexiaobiaoqian}}</td></tr><tr align="center"><td rowspan="2">减免原因</td><td rowspan="2" colspan="3">{{body.jianmianyuanyin}}</td><td>商品减免</td><td>{{body.shangpinjianmian}}</td></tr><tr align="center"> <td>配送费用</td><td>{{body.peisongfeiyong}}</td></tr><tr align="center"><td>备注</td><td colspan="3">{{body.beizhu}}</td><td rowspan="2">总金额</td><td rowspan="2">{{body.zongjine}}</td></tr><tr align="center"><td>接单人员</td><td colspan="3">{{body.jiedanrenyuan}}</td></tr></tbody></table></div><script>	var body2 = '+printArray+'</script><script> var vm;	vm = new Vue({	el: "#body",	data: {	body: {}	}	});	vm.body = body2;	function print() {	document.execCommand("print")	}	</script></body></html>';
	}
	if(row.jhpType=="零售-线上订单票据") {
		var printArray = row.jhpJson.getRealJsonStr();
		iframes = '<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>tab}h1 {font-size: 16px;text-align: center}h2 {font-size: 14px;text-align: center}#body {font-size: 13px;margin-left: 10px;padding: 0px;}#body .other_fee {border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body style="background-color:#fff;width:48mm;"><div id="body" style="width:48mm;"><div class="other_fee"><div class="title"><h1>{{body.gongsi}}</h1><h2>在线支付订单</h2><hr size=2 style="border-style:dashed ;width:100%"><table><tbody><tr><td style="font-size: 26px;">备注：{{body.note}}</td></tr><tr><td>下单时间：{{body.time}}</td></tr><tr><td>单号：{{body.saleNo}}</td></tr><tr><td>客人：{{body.customer}}</td></tr><tr><td>电话：{{body.phone}}</td></tr><tr><td>收货地址：{{body.adderss}}</td></tr></tbody></table></div></div><div class="other_fee"><div class="paymentVoucher"><br /><table style="width: 100%;"><tbody><tr align="center" style="font-weight: 800;"><td>商品</td><td>数量</td><td>售价</td></tr><tr v-for="item in body.goods" align="center">	<td width="25%">{{item.commodity}}</td><td width="15%">{{item.num}}</td><td width="15%">{{item.price}}</td></tr></tbody></table></div></div><div>商品总额：{{body.totalSpending}}</div><div><hr size=2 style="width:100%"><div class="guestInstructions" style="text-align: center;"><h4>其它</h4></div><div>配送费用：{{body.shippingFee}}</div><div>商品减免：{{body.reduceFee}}</div><div>减免原因：{{body.reduceReason}}</div><div>实收金额：{{body.actualSpending}}</div><div><hr size=2 style="border-style:dashed ;width:100%"><h2>请妥善保管好购物凭证</h2><h2>多谢惠顾</h2></div></div></div><script>var body2 = '+printArray+';</script><script>var vm;	vm = new Vue({	el: "#body",	data: {body: {}	}});	vm.body = body2;	function print() {	document.execCommand("print")	}	</script></body></html>';
	}
	if(row.jhpType=="零售-现场支付票据") {
		var printArray = row.jhpJson.getRealJsonStr();
		iframes = '<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>table {width: 48mm;table-layout: fixed;} table td {	border-top: none;word-wrap: break-word;}	h1 {	font-size: 16px;	text-align: center	} h2 {	font-size: 14px;	text-align: center}	#body {font-size: 13px;margin-left: 10px;padding: 0px;}#body .other_fee {	border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body style="background-color:#fff;width:48mm;"><div id="body" style="width:48mm;"><div class="other_fee"><div class="title"><h1>{{body.gongsi}}</h1><h2>现场支付订单</h2></div></div><div class="other_fee"><div class="paymentVoucher"><br /><table style="width: 100%;"><tbody>	<tr align="center" style="font-weight: 800;"><td>商品</td><td>数量</td><td>售价</td></tr><tr v-for="item in body.goods" align="center"><td width="25%">{{item.commodity}}</td><td width="15%">{{item.num}}</td><td width="15%">{{item.price}}</td></tr></tbody></table></div></div><br /><div>数量：{{body.num}}</div><div>商品总额：{{body.totalSpending}}</div><div>单号：{{body.saleNo}}</div><div style="text-align: right;font-weight: 800;">{{body.time}}</div><div><hr size=2 style="width:100%"><div>实收金额：{{body.actualSpending}}</div>	<div>找零：{{body.giveChange}}</div>	<div><hr size=2 style="border-style:dashed ;width:100%"><h2>请妥善保管好购物凭证</h2><h2>多谢惠顾</h2></div></div></div><script>var body2 = '+printArray+';	</script>	<script>	var vm;vm = new Vue({	el: "#body",	data: {	body: {}	}});	vm.body = body2;function print() {	document.execCommand("print")}</script></body></html>';
	}
	if(row.jhpType=="租客换房账单"){
		var printArray = row.jhpJson.getRealJsonStr();
		iframes = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>换房出账申请单</title><style>        	table td {            	border: 1px solid #888;            border-top:none;            white-space: nowrap;            padding: 1px 0 0 0;			font-size: 12px;        }                table {                        table-layout: fixed;            width: 770px;            font-size: 12px;            margin: 0 10px        }                #body {            border: 1px solid black;            width: 790px;            height: 450px        }                #title {            font-size: 18px;            text-align: center;            font-weight: bold        }                #header {            font-size: 16px;            text-align: center;            margin: 10px;            font-weight: bold        }                #footer {            margin: 20px 20px        }                #footer div {            float: left;            width: 20%;            font-weight: bold        }</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body><div id="body" style=""><div id="title" style="">    {{body.yezhuzuke}}换房出账审批单</div><div style="text-align:right;font-size: 14px;margin:0 20px 0 0;">    换房编号：{{body.tuifangbianhao}}</div><table align="center" cellspacing="0" style="margin-top:2px;border-top: 1px solid #888;"><tbody><tr align="center"><td>房屋地址</td><td>姓名</td><td>经办人</td></tr><tr align="center"><td>{{body.wuyedizhi}}</td><td>{{body.name}}</td><td>{{body.jingbanren}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>换房性质</td><td>换房手续</td><td>换房时间</td></tr><tr align="center"><td>{{body.tuifangxingzhi}}</td><td>{{body.tuifangshouxu}}</td><td>{{body.tuifangshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>合约开始日</td><td>合约结束日</td><td>退款时间</td></tr><tr align="center"><td>{{body.qizuri}}</td><td>{{body.jiesuri}}</td><td>{{body.tuikuanshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td>应缴费用(元)</td><td>应退费用(元)</td></tr><tr align="center"><td style="white-space: normal;">{{body.yingjiaofeiyong}}</td><td style="white-space: normal;">{{body.yingtuifeiyong}}</td></tr> 	</tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td style="width:33%">{{body.yezhuzuke}}结算账户</td><td style="width:66%">{{body.yinhangmingcheng}} - {{body.shoukuanren}} - {{body.zhanghuhaoma}}</td></tr><tr align="center"><td style="width:33%">实际结算(元)</td><td style="width:66%;font-weight: bold">{{body.shijiyingtuikuan}}(大写 :{{body.shijiyingtuikuandaxie}})</td></tr> 	</tbody></table><div style="margin: 3px 20px"><span style="font-size: 14px">换房处理人：</span><span style="font-size: 14px; margin-left: 100px">审核人：</span><span style="font-size: 14px; margin-left: 100px">复核人：</span><span style="font-size: 14px; margin-left: 100px">同意出账人：</span></div></div><script>		var body2='+printArray+'	</script><script>		var vm;				vm = new Vue({		  el: "#body",		  data: {			body:{							}		  }		});		vm.body = body2;		Vue.nextTick(print);		function print() { document.execCommand("print") }</script></body></html>'
	}

	var iframesObj = document.getElementById('printFrame').contentDocument;
	iframesObj.open();
	iframesObj.write(iframes);
	$('#printDlg').dialog("open");
}
//上一条下一条
function laterOrNext(type) {
	var dataIndex = $("#print_index").val();
	var changeData = {};
	if (type == 0) {
		if (dataIndex != 0) {
			var num = parseInt(dataIndex) - 1;
			$("#print_index").val(num);
			changeData = $('#historyPrintDg').datagrid('getData').rows[num];
			$('#historyPrintDg').datagrid('selectRow',num);
		} else {
			$.messager.alert('操作提示', '这是本页的第一条!');
			return false;
		}
	} else {
		var size = $("#historyPrintDg").datagrid("getData").total;
		if (dataIndex != parseInt(size) - 1) {
			var num = parseInt(dataIndex) + 1;
			$("#print_index").val(num);
			changeData = $('#historyPrintDg').datagrid('getData').rows[num];
			$('#historyPrintDg').datagrid('selectRow',num);
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
		printPreview(changeData);
	}
}
