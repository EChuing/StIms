$(function() {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	$('#calendar').fullCalendar(
			{
				header : {
					left: '',
					center: 'title',
					right: 'prev,next'
				},
				monthNames : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月",
						"九月", "十月", "十一月", "十二月" ],
				monthNamesShort : [ "一月", "二月", "三月", "四月", "五月", "六月", "七月",
						"八月", "九月", "十月", "十一月", "十二月" ],
				dayNames : [ "日", "一", "二", "三", "四", "五", "六" ],
				dayNamesShort : [ "日", "一", "二", "三", "四", "五", "六" ],
				firstDay : 0,
				defaultView : 'month',
				events : function(start, end,  timezone, callback) {
					$.ajax({
						type : "post",
						url : "../selectCalendar.action",
						dataType : "json",
						data : {
							startDate : start.toISOString(),
							endDate : end.toISOString()
						},
						success : function(data) {
							var eventArr = dataFactory(data)
							callback(eventArr)
						}
					});
				},
//				eventClick : function(event, jsEvent, view) {
//					alert(event.title);
//				}
			});

});

function dataFactory(data) {
	var eventArr = [];
	var today = formatDate(getNowFormatDate());
	for (var i = 0; i < data.length; i++) {
		if(data[i].dbDate != undefined){
			var vacantColor = ''
			if(data[i].dbVacantRate <= 0.1){
				vacantColor = 'green'
			}else if(data[i].dbVacantRate > 0.1 && data[i].dbVacantRate<=0.15){
				vacantColor = 'blue'
			}else if(data[i].dbVacantRate > 0.15 && data[i].dbVacantRate<=0.2){
				vacantColor = 'orange'
			}else if(data[i].dbVacantRate > 0.2){
				vacantColor = 'red'
			}
			eventArr.push({
				title : '01.现金总额: ' + data[i].dbAccountBalance.toFixed(0) + '元',
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '02.租客金: ' + data[i].dbReceivedRenterRentMoney.toFixed(0) + '元 / ' + (data[i].dbNotReceivedRenterRentMoney + data[i].dbReceivedRenterRentMoney).toFixed(0) + '元',
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '03.房东金: ' + data[i].dbPaidLandlordRentMoney.toFixed(0) + '元 / ' + (data[i].dbPaidLandlordRentMoney + data[i].dbNotPaidLandlordRentMoney).toFixed(0) + '元',
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '04.租客准时率: ' + (data[i].dbRenterRentOnTimeRate*100).toFixed(2)+'%',
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '05.房空率: ' + (data[i].dbVacantRate*100).toFixed(2)+'%',
				start : data[i].dbDate,
				color : '#FFF',
				textColor:vacantColor
			})
			eventArr.push({
				title : '06.金损率: ' + (data[i].dbRentMoneyLossRate*100).toFixed(2)+'%',
				start : data[i].dbDate,
				color : '#FFF',
				textColor:vacantColor
			})
			eventArr.push({
				title : '07.空房数: ' + data[i].dbVacantHouse,
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '08.空损费: ' + data[i].dbVacantCost.toFixed(0) + '元',
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '09.新签租客: ' + data[i].dbNewRenterContract,
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '10.新签业主: ' + data[i].dbNewLandlordContract,
				start : data[i].dbDate,
				color : '#FFF'
			})
			eventArr.push({
				title : '11.意向人数: ' + data[i].dbIntendedPerson,
				start : data[i].dbDate,
				color : '#fff'
			})
		}
		if(data[i].dfDate != undefined && data[i].dfDate != today){
			eventArr.push({
				title : '01.退房业主: ' + data[i].dfLandlordCheckout,
				start : data[i].dfDate,
				color : '#D1E8FF',
			})
			eventArr.push({
				title : '02.退房租客: ' + data[i].dfRenterCheckout,
				start : data[i].dfDate,
				color : '#D1E8FF',
			})
			eventArr.push({
				title : '03.应付租金: ' + data[i].dfWillPay.toFixed(0) + '元',
				start : data[i].dfDate,
				color : '#D1E8FF'
			})
			eventArr.push({
				title : '04.应收租金: ' + data[i].dfWillIncome.toFixed(0) + '元',
				start : data[i].dfDate,
				color : '#D1E8FF'
			})
		}
		if(data[i].dfDate == today){
			var vacantColor = ''
			if(data[i].weilaikongzhilv <= 0.1){
				vacantColor = 'green'
			}else if(data[i].weilaikongzhilv > 0.1 && data[i].weilaikongzhilv<=0.15){
				vacantColor = 'blue'
			}else if(data[i].weilaikongzhilv > 0.15 && data[i].weilaikongzhilv<=0.2){
				vacantColor = 'orange'
			}else if(data[i].weilaikongzhilv > 0.2){
				vacantColor = 'red'
			}
			eventArr.push({
				title : '01.退房业主: ' + data[i].dfLandlordCheckout,
				start : data[i].dfDate,
				color : '#fcf8e3',
			})
			eventArr.push({
				title : '02.退房租客: ' + data[i].dfRenterCheckout,
				start : data[i].dfDate,
				color : '#fcf8e3',
			})
			eventArr.push({
				title : '03.应付租金: ' + data[i].dfWillPay.toFixed(0) + '元',
				start : data[i].dfDate,
				color : '#fcf8e3'
			})
			eventArr.push({
				title : '04.应收租金: ' + data[i].dfWillIncome.toFixed(0) + '元',
				start : data[i].dfDate,
				color : '#fcf8e3'
			})
			eventArr.push({
				title : '05.空置未租: ' + data[i].kongzhiweizu,
				start : data[i].dfDate,
				color : '#fcf8e3',
			})
			eventArr.push({
				title : '06.正在转租: ' + data[i].zhengzaizhuanzu,
				start : data[i].dfDate,
				color : '#fcf8e3',
			})
			eventArr.push({
				title : '07.到期不续: ' + data[i].daoqibuxu,
				start : data[i].dfDate,
				color : '#fcf8e3',
			})
			eventArr.push({
				title : '08.毁约待租: ' + data[i].huiyuedaizu,
				start : data[i].dfDate,
				color : '#fcf8e3',
			})
			eventArr.push({
				title : '09.即将空置数: ' + data[i].jijiangkongzhishu,
				start : data[i].dfDate,
				color : '#fcf8e3',
			})
			eventArr.push({
				title : '10.未来空置率: ' + (data[i].weilaikongzhilv*100).toFixed(2)+'%',
				start : data[i].dfDate,
				color : '#fcf8e3',
				textColor : vacantColor,
			})
		}
	}
	return eventArr;
}

function loadEvent(events){
	$("#calendar").fullCalendar('renderEvent',events,true);
}