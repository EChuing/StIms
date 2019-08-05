$(function () {
	for(var i =0; i < authType.length;i++){
		var type =authType[i];
		$("#authType").append("<option value='" + type + "'>"+type+"</option>");
	}

	for (var i = 0; i < _sectionType.length; i++) {//户型
		$(".sectionType").append("<option value = '" + _sectionType[i] + "'>" + _sectionType[i] + "</option>");
	}

	//设置日历的宽度
	set_cal_size($(window).width(), $(window).height());
	setTimeout(function () {
		initDlgAndSelect();
		initFinancialAccount();
		querySourceInfo();
		queryNewOrder();
	}, 1000);
	listPopCustomer();
	initInfo();
	//实时刷新时间单位为毫秒
	setInterval('queryNewOrder()', 12000);

	$.post("../selectAllDiscountAuth.action", {}, function (data) {
		var body = data.body;
		var suName = [];
		var authPsd = {};
		var suId ={};
		for (var index in body) {
			var dataObj = body[index];
			var suStaffName = dataObj.suStaffName;
			var suPsd = dataObj.suDiscountAuthPassword;
			var userId =dataObj.user
			suName.push(suStaffName);
			authPsd[suStaffName] =suPsd;
			suId[suStaffName] =dataObj.userId;
		}
		_allDiscountAuthInfo.push(suName);
		_allDiscountAuthInfo.push(authPsd);
		_allDiscountAuthInfo.push(suId);
		for(var i =0; i < _allDiscountAuthInfo[0].length;i++){
			var suName =_allDiscountAuthInfo[0][i];
			$("#application").append("<option value='" + suName + "'>"+suName+"</option>");
		}
	});

	$.post("../queryUserById.action", {
		userId : _loginUserId,
	}, function(data) {
		suDiscountAuthPassword =data.body[0].suDiscountAuthPassword;
	}, "json");
	//初始化折扣订单
	getAuthOrder();
});

/* ********************************************日历插件的代码开始***********************************************/

//设置控件的宽度
function set_cal_size(width,height){
	$("#cal_ims").width(width)
	$("#cal_right").width(width-310)
	$("#cal_ims").height(height-174)
//    $("#cal_right").height(height-500)
}

//对左侧房子列表进行绘图的方法
function draw_left_col(house_list) {
	var cal_left_html =  '<div  style="width:350px;background-color:white;position:absolute;z-index:2999;left:10px;"> '+
		'           <div style="height:35px;border-left: 1px #ddd solid;border-bottom:1px #ddd solid;border-right:1px #ddd solid;float:left;width:30px;background-color:white;">'+
		'           <div style="margin: 8px 0 0 0"><input type="checkbox" class="allCheckBox" style="margin-top:6px;" /></div></div>'+
		'	        <div  class="cal_left_col" style="height:35px;width:135px"><div style="margin: 8px 0 0 0">小区名称</div></div>'+
		'			<div  class="cal_left_col" style="height:35px;"><div style="margin: 8px 0 0 0">楼栋</div></div>'+
		'	        <div  class="cal_left_col" style="height:35px;"><div style="margin: 8px 0 0 0">房号</div></div>'+
		'            <br style="clear:both">'+'</div><div style="width=100%;height:35px"></div><div id="houseDiv" style="z-index:1999;position:relative;height:100%;width:350px" >';
	for (var i in house_list) {
		var img = " ";
		if(house_list[i].hsDirtyHouse == 1){
			img = '<img src="images/broom.png" style="height:16px;width:16px;" />'
		}else if(house_list[i].hsDirtyHouse == 2){
			img = '<img src="images/repair.png" style="height:16px;width:16px;" />'
		}else if(house_list[i].hsDirtyHouse == 3){
			img = '<img src="images/zhuangxiu.png" style="height:16px;width:16px;" />'
		}
		cal_left_html += '<div class="cal_left_col" style="width:30px;"><input type="checkbox" class="oneCheckBox" jsrcHsId="' + house_list[i].hsId + '" style="margin-top:6px" /></div>';
		cal_left_html += '<div class="cal_left_col" style="width:135px;">' + house_list[i].hsAddCommunity + '</div>';
		cal_left_html += '<div class="cal_left_col">' + house_list[i].hsAddBuilding + '</div>';
		cal_left_html += '<div class="cal_left_col" id="'+house_list[i].hsId+'" jsrcHsId="' + house_list[i].hsId + '">' + img +
			house_list[i].roomName + '</div>'
		cal_left_html += '<br style="clear:both">'
	}
	cal_left_html += '</div>'
	$("#cal_left").html(cal_left_html)
}

//对右侧格子列表进行绘图的方法(开始时间是今天算起的前10天，然后往后数30天为结束时间，一共30天30个格子)
function draw_right_col(houseList) {
	var today_timestamp = new Date().getTime()
	var today_day_v = new Date().getDate()
	today_day_v = today_day_v < 10 ? "0" + today_day_v : today_day_v
	var tenday_ago_timestamp = new Date().getTime() - 3600 * 24 * 10 * 1000;
	var temp_timestamp = tenday_ago_timestamp

	var cal_right_col_days = []
	for (var i = 0; i < 30; i++) {
		var date = new Date();
		date.setTime(temp_timestamp);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;

		var date_str = y + "-" + m + "-" + d;
		var w = date.getDay()
		var w_str = ""

		switch (date.getDay()) {
			case 1:
				w_str = '星期一';
				break;
			case 2:
				w_str = '星期二';
				break;
			case 3:
				w_str = '星期三';
				break;
			case 4:
				w_str = '星期四';
				break;
			case 5:
				w_str = '星期五';
				break;
			case 6:
				w_str = '星期六';
				break;
			case 0:
				w_str = '星期日';
				break;

		}

		var date_obj = {
			date_str: date_str,
			d_str: d,
			week_str: w_str,
			week_val: w,
			show_str: m + "-" + d
		}

		cal_right_col_days.push(date_obj)

		temp_timestamp += 3600 * 24 * 1000;
	}
	var cal_right_col_html = '<div style="position:absolute;top:170px;left:319px;z-index:1000" class="cal_right_row" style="font-weight: bold">'

	for (var i in cal_right_col_days) {
		cal_right_col_html += '<div class="cal_right_day" style="height:35px;"><div style="margin:3px 0 0 0;">'+cal_right_col_days[i].show_str+'</div><div style="font-weight: lighter">'+cal_right_col_days[i].week_str+'</div></div>'
	}
	cal_right_col_html += '</div>'
	cal_right_col_html += '<div style="height:35px;width:99%" class="cal_right_row" ></div>';

	/*$.post("../selectAllTemporaryOrder.action",{
        jtoTakingStatus:1
    },function (result) {*/



	for (var i in houseList) {
		cal_right_col_html += '<div class="cal_right_row row_for_select" jsrcHsId="' + houseList[i].hsId + '">'
		for (var j in cal_right_col_days) {
			cal_right_col_html += '<div class="cal_right_day day_for_select ' +
				(cal_right_col_days[j].week_val >= 5 ? " weekend_day" : "") +
				(cal_right_col_days[j].d_str == today_day_v ? " today_day" : "") +
				'" date="' + cal_right_col_days[j].date_str +
				'" week_val="' + cal_right_col_days[j].week_val +
				'" jsrcHsId="' + houseList[i].hsId + '"id="'+houseList[i].hsId+
				''+cal_right_col_days[j].date_str+'"></div>'
		}
		cal_right_col_html += '</div>'
	}
	$("#cal_right").html(cal_right_col_html);

}

function CurentTime()
{
	var now = new Date();

	var year = now.getFullYear();       //年
	var month = now.getMonth() + 1;     //月
	var day = now.getDate();            //日

	var hh = now.getHours();            //时
	var mm = now.getMinutes();          //分
	var ss = now.getSeconds();           //秒

	var clock = year + "-";

	if(month < 10)
		clock += "0";

	clock += month + "-";

	if(day < 10)
		clock += "0";

	clock += day + " ";

	if(hh < 10)
		clock += "0";

	clock += hh + ":";
	if (mm < 10) clock += '0';
	clock += mm + ":";

	if (ss < 10) clock += '0';
	clock += ss;
	return(clock);
}

//加载短租订单到日历中显示的方法
function load_events(events) {
	for (var i in events) {
		var arrears =events[i].jsrcArrears;

		if(events[i].total_days == 0){
			var width = 0.5 * 43
		}else{
			var width = (events[i].total_days) * 43
		}
		var event_type = ""
		if (events[i].status == "保留" || events[i].status == "预定") {
			var date = CurentTime();
			if(events[i].jsrcOrderState == 0){
				event_type = 'cal_right_event_new_booked'
			}else if(events[i].jsrcBeginTime<date&&date<events[i].jsrcEndTime){
				event_type = 'cal_right_event_gray'
			}else if(events[i].jsrcEndTime<date){
				event_type = 'cal_right_event_red'
			}else{
				event_type = 'cal_right_event_booked'
			}
		} else if (events[i].status == "已住") {
			if(events[i].jsrcArrears==0){
				event_type = ''
			}else{
				event_type = 'cal_right_event_arrears'
			}

		} else if (events[i].status == "退定中") {
			event_type = 'cal_right_event_olded'
		}

		var event_html = '<div class="cal_right_event ' + event_type + '" ' +
			'begin_time="' + events[i].begin_time +
			'" end_time="' + events[i].end_time +
			'" event_id="' + events[i].event_id +
			'" jsrcHsId="' + events[i].jsrcHsId +
			'" status="' + events[i].status +
			'" total_money="' + events[i].total_money +
			'" total_days="' + events[i].total_days +
			'" total_people="' + events[i].total_people +
			'" style="width:' + width + 'px">' + events[i].jsrcState + " " +
			events[i].total_people + '人' + events[i].total_days + '天' + events[i].total_money + '元</div>';

		$("[date=" + events[i].begin_time.substr(0, 10) + "][jsrcHsId=" + events[i].jsrcHsId + "]").html(event_html);
	}

	for(var to in  authOrder){
		var toObj =authOrder[to];
		var data =toObj.jtoShortInfo;
		data =data.getRealJsonStr();
		var shortInfo =JSON.parse(data);
		var width = (shortInfo.totalDay)* 43;
		var event_type = "";
		event_type = 'cal_right_event_auth'
		var event_html = '<div class="cal_right_event ' + event_type + '" ' +'onclick="openTakeOrderDlg'+'('+toObj.jtoOrderId+','+toObj.jtoId+')'+
			'" style="width:' + width + 'px">' +'授权单</div>';
		$("[date=" + toObj.jtoTime.substr(0, 10) + "][jsrcHsId=" + toObj.jtoOrderId + "]").html(event_html);
	}

}

function diagramCheckOutDlg(id){
	var data = {}
	for(var i in event_list){
		if(event_list[i].jsrcId == id){
			data = event_list[i];
		}
	}
	var jsrcHsId = data.jsrcHsId;
	for(var i in house_list_arr){
		if(jsrcHsId == house_list_arr[i].hsId){
			data.hsRoomType = house_list_arr[i].hsRoomType
		}
	}
	var resObj = getHouseData(jsrcHsId);
	if(resObj != "" && resObj != undefined){
		_title_address = resObj.hsAddCommunity + " " + resObj.hsRoomType + " " + resObj.hsAddBuilding + resObj.hsAddDoorplateno;
	}
	openCheckOut(data);
}

//订单事件被点击的事件
$("#cal_ims").delegate(".cal_right_event", "click", function () {
	var event_id = $(this).attr("event_id");
	var data = {}
	if(event_id == undefined && event_id ==null){
		return;
	}
	for(var i in event_list){
		if(event_list[i].event_id == event_id){
			data = event_list[i];
		}
	}
	var jsrcHsId = data.jsrcHsId;
	for(var i in house_list_arr){
		if(jsrcHsId == house_list_arr[i].hsId){
			data.hsRoomType = house_list_arr[i].hsRoomType
		}
	}
	var resObj = {};
	resObj = getHouseData(jsrcHsId);
	console.log(resObj);
	_title_address = resObj.hsAddCommunity + " " + resObj.hsRoomType + " " + resObj.hsAddBuilding + resObj.hsAddDoorplateno;
	openCheckOut(data);
})

//房子被点击的事件
$("#cal_ims").delegate(".cal_left_col[jsrcHsId]", "click", function () {
	var hsId = $(this).attr("jsrcHsId");
	var data = {}
	data = getHouseData(hsId);
	_title_address = data.hsAddCommunity + " " + data.hsRoomType + " " + data.hsAddBuilding + data.hsAddDoorplateno;
	openHouseInfo(data)
	queryFollow(data, 1, 0);

})


//拖拽选好日子后，下单的事件
function date_selected_for_rent(begin_time, end_time, jsrcHsId) {
	//如果只选了一天，那么 begin_time 和 end_time 会相等
	var nowTime = new Date().format("yyyy-MM-dd hh:mm:ss");
	var beginTime = new Date(begin_time).getTime();

	var endTime = new Date(end_time).getTime();
	endTime = getNextDate(endTime,1);

	var lastOneDay = getNextDate(nowTime, -1);
	if(new Date(end_time).getTime() < new Date(lastOneDay).getTime()){
		myTips("不能在以前创建订单","error")
		return;
	}
	if(checkTime(jsrcHsId,beginTime,endTime,0)){
		var resObj = {};
		resObj = getHouseData(jsrcHsId);
		_title_address = resObj.hsAddCommunity + " " + resObj.hsRoomType + " " + resObj.hsAddBuilding + resObj.hsAddDoorplateno;
		openAddShortRent(resObj,begin_time,endTime);
	}else{
		myTips("所选时间段已有订单","error")
	}
}
//////////////////////////
//下面都是拖拽选日子的代码方法
//////////////////////////
$("#cal_ims").delegate(".cal_right_row .day_for_select", "mousedown", function (e) {
	if($(e.target).hasClass('cal_right_event')){
		return;
	}
	$(this).addClass("day_selected")
	$(this).parent().addClass("row_on_select")

	$(this).attr("start_select", 1)
})
//总checkbok点击事件
$("#cal_ims").delegate(".allCheckBox", "click", function () {
	if($(".allCheckBox").is(':checked')){
		$(".oneCheckBox").prop("checked",true);
	}else{
		$(".oneCheckBox").prop("checked",false);
	}
})

//ele.hover(function(){
//	layer.tips(evt.title, ele, {
//	  tips: [3, '#3595CC'],
//	  time: 2000
//	});
//},function(){});

$("#cal_ims").delegate(".cal_right_event", "mouseover", function (e) {
	layer.tips($(this).text(), this, {
		tips: [3, '#3595CC'],
		time: 2000
	});
})

$("#cal_ims").delegate(".cal_right_row .day_for_select", "mouseup", function (e) {
	if($(e.target).hasClass('cal_right_event')){
		return;
	}
	var day_selected_arr = $(".day_selected")
	var first_date = $(day_selected_arr[0]).attr("date")
	var last_date = $(day_selected_arr[day_selected_arr.length - 1]).attr("date")
	var jsrcHsId = $(this).attr("jsrcHsId")


	first_date = new Date(first_date).format('yyyy-MM-dd ' + setUp.jsrsuCheckInTime +':00')
	last_date = new Date(last_date).format('yyyy-MM-dd ' + setUp.jsrsuCheckOutTime +':00')
	date_selected_for_rent(first_date, last_date, jsrcHsId)

	$(".row_on_select").removeClass("row_on_select")
	$(".day_selected").removeClass("day_selected")
	$("[start_select=1]").removeAttr("start_select")
})

$("#cal_ims").delegate(".row_on_select .day_for_select", "mouseover", function () {
	$(this).addClass("day_selected")

	var $first_day_selected = $("[start_select=1]")
	var $last_day_selected = $(this)

	if ($last_day_selected.nextAll("[start_select=1]").length) {
		var ttmmpp;
		ttmmpp = $first_day_selected
		$first_day_selected = $last_day_selected
		$last_day_selected = ttmmpp
	}

	var anti_err = 0
	while ($first_day_selected.attr("date") != $last_day_selected.attr("date") && anti_err < 40) {
		$first_day_selected.next().addClass("day_selected")
		$first_day_selected = $first_day_selected.next()
		anti_err++
	}
})

$("#cal_ims").delegate(".row_on_select .day_for_select", "mouseout", function () {
	if ($(this).attr("start_select") == 1) {
		return
	}
	$(this).removeClass("day_selected")
})
//////////////////////////
//上面都是拖拽选日子的代码方法
//////////////////////////

$('#cal_ims').scroll(function (){
	var scrollLeft = $(this).scrollLeft();
	var left = (-scrollLeft+319)
	var left2 = (scrollLeft)
	$('.cal_right_row').css("left",left+"px")
	$('#houseDiv').css("left",left2+"px")

})

/* ********************************************日历插件的代码结束***********************************************/