/** ********************全局js********************* */

var _loginUserName = $('#loginUserName').val();
var _loginUserId = $('#loginUserId').val();
var _loginPurview = $('#loginPurview').val();
var _loginStore = $('#loginStore').val();
var _loginDepartment = $('#loginDepartment').val();
var _devFirstJson = $('#loginDevFirst').text();
var _devFirstJson2 = $('#loginDevSecond').text();
var _loginBrand = $('#loginBrand').text();
// var _loginDeviceMenu=$('#loginDeviceMenu').text();
var _loginCompany = $('#loginCompany').val();
var _loginCoId = $('#loginCoId').val();
var _loginCompanyName = $('#loginCompanyName').val();
var _loginCompanyRentProvince = $('#loginCompanyRentProvince').val();
var _loginCompanyRentCity = $('#loginCompanyRentCity').val();
var _loginCompanyRentDistrict =JSON.parse($('#loginCompanyRentDistrict').val());
var _loginAuthoritySwitch = $('#loginAuthoritySwitch').val();
var _loginType = $('#loginType').val();
var _loginAntUserId = $('#loginAntUserId').val();

//关闭"页面加载中，请稍后..."
setTimeout(function(){
	$(".index-loading").fadeOut("fast", function() {
		$(this).remove();
	});
}, 800);


$(function() {
	checkMenuNew(_loginAuthoritySwitch);//高级菜单权限判断
	checkMenuSpeed(_loginAuthoritySwitch);//快捷菜单权限判断
	checkMenuNew(_loginPurview);//高级菜单权限判断
	checkMenuSpeed(_loginPurview);//快捷菜单权限判断
	InitLeftMenu();//初始化高级菜单
	InitSpeedMenu();//初始化快捷菜单
	bindTabEvent();//绑定tab事件
	bindTabMenuRightClick();//绑定菜单右键事件
	getBrandToUse();//获取智能设备品牌
	countEventRepairInConsole();//查询是否有待办事务/未领取维修
	$("#tabs").tabs({
		onSelect:function(title,index){
			if (title == '数据日历') {
				var currTab = $('#tabs').tabs('getSelected');
				var url = $(currTab.panel('options').content).attr('src');
				$('#tabs').tabs('update', {
					tab : currTab,
					options : {
						content : createFrame(url)
					}
				})
			} else if (title == '销售管理') {
				clearInterval(logoutInterval);
			} else if (title == '线上订单'){
				clearInterval(logoutInterval);
			}
		},
		onClose:function(title,index){
			if (title == '销售管理') {
				logoutInterval = setInterval("clock()", 1000);
			}else if (title == '线上订单'){
				logoutInterval = setInterval("clock()", 1000);
			}
		},
	});
	$("#tabs").tabs("select", 0);
	for (var i in _saType) {
		$('#searchSaType').append("<option value='" + _saType[i] + "'>" + _saType[i] + "</option>");
	}
	for (var i in _saClassify) {
		$('#searchClassify').append("<option value='" + _saClassify[i] + "'>" + _saClassify[i] + "</option>");
	}
	for (var i in _saUse) {
		$('#searchSaUse').append('<option value="' + _saUse[i] + '">' + _saUse[i] + '</option>');
	}
	//跳转
	$(".skipToChild").click(function(){
		var skipToChildVal = $(this).attr("skipToChild");
		if(skipToChildVal){
			skipToChildVal = skipToChildVal.replace(/[\r\n]/g,"").replace("\t","").split(";");
			skipToChildVal = skipToChildVal;
			var jsonTarget = skipToChildVal[3].split(",");
			var jsonId = skipToChildVal[4].split(",");
			var jsonVal = skipToChildVal[5].split(",");
			for( var i = 1 ; i < jsonTarget.length; i++ ){
				_skipToChildJson.push({
					target:jsonTarget[i],
					id:jsonId[i],
					jsonVal:jsonVal[i],
				});
			}
			window.parent.addTab(skipToChildVal[0],skipToChildVal[1]+".jsp","icon icon-"+skipToChildVal[2]);
		}
	});
});

//定时退出 10分钟 无鼠标点击及键盘按下操作退出到登录页面
var sec = 600;
var logoutInterval = setInterval("clock()", 1000);
function clock() {
	$('#clock').html("退出倒计时：" + sec);
	if (sec == 0) {
		clearInterval(logoutInterval);
		window.top.location.href = "../userLogout.action";
	} else {
		sec--;
	}
}

/*******************************************考勤开始************************************************/
var _shift = '';
var _chageng = '';
var _onShift = '';
var _workOn = '';
function workPunchButton(){
	var timeJson;
	var curDate;
	var curtime; //这个是时间
	var shiftJson;
	var jssStatus1;
	var jssStatus2;
	var jssStatus3;
	var jssStatus4;
	$.post("../obtainTime.action", {
		
	}, function(data){
		if (data.code != 1) {
			myTips("获取系统时间失败!", "error");
		}else{
			curtime = data.body[0].curtime;
			//在这里获取班次信息，确认上下班
			var rule = [];
			var work = [];
			$.post("../selectJourShiftSchedule.action", {
				
			}, function(data){
				//endNum: ""jar: ""jarDepartmentId: 1jarDepartmentName: "职能部"jarEndTime: ""jarId: 15jarName: "管理员"jarOffwork1: ""jarOffwork2: ""jarOffwork3: ""jarOffwork4: ""jarSelectTime: ""
                //jarSpare: ""jarStartTime: ""jarStoreId: 1jarStoreName: "总部"jarUserId: 1jarWork1: "09:49:08"jarWork2: ""jarWork3: ""jarWork4: ""jarWorkTime: "2019-05-07"startNum: ""totalNum: "1"
				if (data.code != 1){
					myTips("获取班次失败!", "error");
				}else{
					//判断是否启用具体班次 启用就有值没有启用就没有值
					if(data.body[0].jssStatus1 == 1){
						var d1 = {};
						d1.shift = 1;
						d1.on = data.body[0].jssWork1;
						d1.off = data.body[0].jssOffwork1;
						rule.push(d1);
					}
					if(data.body[0].jssStatus2 == 1){
						var d2 = {};
						d2.shift = 2;
						d2.on = data.body[0].jssWork2;
						d2.off = data.body[0].jssOffwork2;
						rule.push(d2);
					}
					if(data.body[0].jssStatus3 == 1){
						var d3 = {};
						d3.shift = 3;
						d3.on = data.body[0].jssWork3;
						d3.off = data.body[0].jssOffwork3;
						rule.push(d3);
					}
					if(data.body[0].jssStatus4 == 1){
						var d4 = {};
						d4.shift = 4;
						d4.on = data.body[0].jssWork4;
						d4.off = data.body[0].jssOffwork4;
						rule.push(d4);
					}
					//考勤需要use_id 
					if(rule != ''){
						$.post("../checkAttendance.action", {
							jarUserId: _loginUserId,
						}, function(data){
							console.log(data);
							if (data.code == 0){//code ==0 表示当天没有符合条件的记录
								for (var t in rule){ // t ==0
									if(t>1 && curtime < rule[t].on && curtime > rule[t-1].off){
										_onShift = rule[t].shift;
										_workOn ='on';
										InsertPunchData();
										return;
									}else if(curtime>rule[t].on&&curtime < rule[t].off){
										_onShift = rule[t].shift;
										_workOn ='on';
										InsertPunchData();
										return;
									}else if(curtime < rule[0].on && curtime > '00:00:00'){
										_onShift = 1;
										_workOn ='on';
										InsertPunchData();
										return;
									}else{
										myTips("当天无打卡记录，打卡失败!","error");
										return;
									}
								}
							}else if(data.code == 1){
								var work = []; //数据拼接
								var j1 = {};
								j1.wtime = 1;
								j1.on = data.body[0].jarWork1;
								j1.off = data.body[0].jarOffwork1;
								var j2 = {};
								j2.wtime = 2;
								j2.on = data.body[0].jarWork2;
								j2.off = data.body[0].jarOffwork2;
								var j3 = {};
								j3.wtime = 3;
								j3.on = data.body[0].jarWork3;
								j3.off = data.body[0].jarOffwork3;
								var j4 = {};
								j4.wtime = 4;
								j4.on = data.body[0].jarWork4;
								j4.off = data.body[0].jarOffwork4;
								work.push(j1, j2, j3, j4);
								
								//当当天考勤有时更新数据
								for (var i in rule){
									for (var y in work){
										if(curtime < rule[i].on){
											alert(i);
											alert(y);
											if(y>0){
												if(rule[i - 1].shift == work[y - 1].wtime && work[y - 1].off == ''){
													console.log(1)
													_shift = rule[i-1].shift;
													_workOn = 'off';
													//这里是_shift班次下班卡
													UpdatePunchData();
													return;
												}else{
													if(curtime<rule[i-1].off){
														console.log(2)
														_shift = rule[i-1].shift;
														_workOn = 'off';
														//这里是_shift班次下班卡
														UpdatePunchData();
														return;
													}else{
														console.log(3)
														_shift = rule[i].shift;
														_workOn = 'on';
														UpdatePunchData();
														return;
													}
												}
												return;
											}
										}else if(curtime < rule[i].off){
											//console.log("  "+work[rule[i].shift].on+" "+y+rule[i].shift + work[y].wtime)
											if(rule[i].shift == work[y].wtime && work[y].on == ''){
												console.log(work[y].on)
												_shift = rule[i].shift;
												_workOn = 'on';
												UpdatePunchData();
												return;
											}else if(rule[i].shift == work[y].wtime && work[y].off == ''){
												console.log(5)
												_shift = rule[i].shift;
												_workOn = 'off';
												UpdatePunchData();
												return;
											}/*else{
												console.log(6)
												_shift = rule[i].shift;
												_workOn = 'off';
												UpdatePunchData();
												return;
											}*/
											if(rule[i].shift == work[y].wtime && work[y].off != ''){
												console.log(6)
												_shift = rule[i].shift;
												_workOn = 'off';
												UpdatePunchData();
												return;
											}
										}else if(curtime > rule[rule.length-1].off){
											console.log(7)
											_shift = rule[rule.length-1].shift;
											_workOn = 'off';
											UpdatePunchData();
											return;
										}
									}
								}
							}
						});
					}
				}
			});
		}
	});
}

function InsertPunchData(){
	//当当天考勤为零时插入一条新数据
	$.post("../increaseAttendance.action",{
		jarUserId 		: _loginUserId,
		jarDepartmentId : _loginDepartment,
		jarStoreId		: _loginStore,
		jar				: _onShift,
	}, function(data) {
		if(data.code==1){
			$.messager.alert('提示','<div style="text-align: center; margin:20px 25px 0 0;">上班考勤记录成功！</div>','info');
			// myTips("打卡成功!","success");
			 $.post("../insertJourAttendanceInformationRecord.action",{
				 jairUserId	: _loginUserId,
			 }, function(data){
				 if(data.code==1){
					//console.log("打卡成功!");
				 }else{
					// console.log("打卡失败!");
				 }
			 });
		}else{
			myTips("打卡失败!","error");
		}
	}
	);
}

//更新打卡数据
function UpdatePunchData(jar){
	var textPrompt;
	var jar_status;
	if(_shift==1){
		if(_workOn=='on'){
			jar = 1;
			textPrompt = '上班';
		}
		if(_workOn=='off'){
			jar = 10;
			textPrompt = '下班';
            jar_status =1;
		}
	}else if(_shift==2){
		if(_workOn=='on'){
			jar = 2;
			textPrompt = '上班';
		}
		if(_workOn=='off'){
			jar = 20;
			textPrompt = '下班';
		}
	}else if(_shift==3){
		if(_workOn=='on'){
			jar = 3;
			textPrompt = '上班';
		}
		if(_workOn=='off'){
			jar = 30;
			textPrompt = '下班';
		}
	}else if(_shift==4){
		if(_workOn=='on'){
			jar = 4;
			textPrompt = '上班';
		}
		if(_workOn=='off'){
			jar = 40;
			textPrompt = '下班';
		}
	}
	console.log(jar_status);
	//当当天考勤有时更新数据 	这里的其他参数需要判定
	$.post("../updateAttendance.action",{
		jarUserId 		: _loginUserId,
		jarDepartmentId : _loginDepartment,
		jarStoreId		: _loginStore,
		jar				: jar,
        jarStatus      :jar_status
	}, function(data) {
		if(data.code==1){
			$.messager.alert('提示','<div style="text-align: center; margin:20px 25px 0 0;">'+textPrompt+'考勤记录成功！</div>','info');
			//myTips("打卡成功!","success");
			$.post("../insertJourAttendanceInformationRecord.action",{
				jairUserId	: _loginUserId,
			 }, function(data){
				 if(data.code==1){
					//console.log("打卡成功!")
				 }else{
					// console.log("打卡失败!")
				 }
			 });
		}else{
			myTips("打卡失败!","error");
		}
	});
}
/*******************************************考勤结束************************************************/

//初始化高级菜单
var _leftMenuHeight = 0;
function InitLeftMenu() {
	var leftMenuListStr = '';
	// console.log(_menus1);
	// console.log(_menus1.menus);
	for(var i in _menus1.menus){
		leftMenuListStr +='<li class="left-menu-list-one"><div class="catalog-one clearfix"><a class="oneInactive"><svg class="menuIcon" aria-hidden="true"><use xlink:href="#'+_menus1.menus[i].icon+'"></use></svg>'+_menus1.menus[i].menuname+'<svg class="upIcon-one" aria-hidden="true"><use xlink:href="#icon-xiangshang"></use></svg><svg class="downIcon-one" aria-hidden="true"><use xlink:href="#icon-xiangxia"></use></svg></a></div>';
		leftMenuListStr +='<ul class="left-menu-list-one-ul" style="display: none"><div class="left-menu-list-one-div">';
			for(var j in _menus1.menus[i].menus){
				if(_menus1.menus[i].menus[j].type==0){
					leftMenuListStr +='<li class="left-menu-list-one-li"  iconUrl="'+_menus1.menus[i].menus[j].icon+'" jspUrl="'+_menus1.menus[i].menus[j].url+'" tabTitle="'+_menus1.menus[i].menus[j].menuname+'"><div class="catalog clearfix"><a><svg class="menuIcon" aria-hidden="true"><use xlink:href="#'+_menus1.menus[i].menus[j].icon+'"></use></svg>'+_menus1.menus[i].menus[j].menuname+'</a></div></li> ';
				}else if(_menus1.menus[i].menus[j].type==1){
					leftMenuListStr +='<li class="left-menu-list-two"><div class="catalog-two clearfix"><a class="twoInactive"><svg class="menuIcon" aria-hidden="true"><use xlink:href="#'+_menus1.menus[i].menus[j].icon+'"></use></svg>'+_menus1.menus[i].menus[j].menuname+'<svg class="upIcon-two" aria-hidden="true"><use xlink:href="#icon-xiangshang"></use></svg><svg class="downIcon-two" aria-hidden="true"><use xlink:href="#icon-xiangxia"></use></svg></a></div><ul class="left-menu-list-two-ul">';
				}else if(_menus1.menus[i].menus[j].type==2){
					leftMenuListStr +='<li class="left-menu-list-two-li"  iconUrl="'+_menus1.menus[i].menus[j].icon+'" jspUrl="'+_menus1.menus[i].menus[j].url+'" tabTitle="'+_menus1.menus[i].menus[j].menuname+'"><div class="catalog clearfix"><a><svg class="menuIcon" aria-hidden="true"><use xlink:href="#'+_menus1.menus[i].menus[j].icon+'"></use></svg>'+_menus1.menus[i].menus[j].menuname+'</a></div></li>';
				}
				if(_menus1.menus[i].menus[j].type==2 && j==(_menus1.menus[i].menus.length-1)){
					leftMenuListStr +='</ul></li>';
				}else if(_menus1.menus[i].menus[j].type==2 && j!=(_menus1.menus[i].menus.length-1) &&(_menus1.menus[i].menus[parseInt(j)+1].type==0||_menus1.menus[i].menus[parseInt(j)+1].type==1)){
					leftMenuListStr +='</ul></li>';
				}
			}
		leftMenuListStr +='</div></ul></li>';
	}
	leftMenuListStr= '<ul class="left-menu-list">'+leftMenuListStr+'</ul>';
	
	$("#leftMenuList").append(leftMenuListStr);
	
	$('.catalog-one').click(function(){//一级菜单点击事件
		$(".left-menu-list-two-ul").slideUp(300);//所有二级菜单下子菜单隐藏
		$(".upIcon-two").show();//所有二级菜单向上
		$(".downIcon-two").hide();//所有二级菜单向下
		$(".catalog-one").removeClass('catalog-selected');//一级菜单背景色还原
		$(".catalog-two").removeClass('catalog-selected');//二级菜单背景色还原
		if($(this).siblings('ul').css('display')=='none'){
			$(".upIcon-one").show();//所有一级菜单向上
			$(".downIcon-one").hide();//所有一级菜单向下
			$(this).addClass('catalog-selected');//选中背景色变黄
			$(this).children('a').children('.upIcon-one').hide();//自身变成向下
			$(this).children('a').children('.downIcon-one').show();//自身变成向下
			$(".left-menu-list-one-ul").slideUp(300);//所有一级菜单下子菜单隐藏
			$(this).siblings('ul').slideDown(300).children('li');//自身一级菜单下子菜单显示
		}else{
			$(this).children('a').children('.upIcon-one').show();//自身变成向上
			$(this).children('a').children('.downIcon-one').hide();//自身变成向上
			$(this).removeClass('catalog-selected');//取消选中背景色变蓝
			$(this).siblings('ul').slideUp(300);//自身一级菜单下子菜单隐藏
		}
	});
	$('.catalog-two').click(function(){//二级菜单点击事件
		$(".catalog-two").removeClass('catalog-selected');
		if($(this).siblings('ul').css('display')=='none'){
			$(".upIcon-two").show();//所有二级菜单向上
			$(".downIcon-two").hide();//所有二级菜单向下
			$(this).addClass('catalog-selected');//选中背景色变黄
			$(this).children('a').children('.upIcon-two').hide();//自身变成向下
			$(this).children('a').children('.downIcon-two').show();//自身变成向下
			$(".left-menu-list-two-ul").slideUp(300);//所有二级菜单下子菜单隐藏
			$(this).siblings('ul').slideDown(300).children('li');//自身二级菜单下子菜单显示
			
		}else{
			$(this).children('a').children('.upIcon-two').show();//自身变成向上
			$(this).children('a').children('.downIcon-two').hide();//自身变成向上
			$(this).removeClass('catalog-selected');//取消选中背景色变蓝
			$(this).siblings('ul').slideUp(300);//自身二级菜单下子菜单隐藏
		}
	});
	$(".left-menu-list-one-li, .left-menu-list-two-li").click(function(){
		$(".left-menu-list-one-li, .left-menu-list-two-li").removeClass("left-menu-list-li-hover");
		var iconUrl = $(this).attr("iconUrl");
		var jspUrl = $(this).attr("jspUrl");
		var tabTitle = $(this).attr("tabTitle");
		window.parent.addTab(tabTitle,jspUrl,"icon "+iconUrl);
	});
	_leftMenuHeight = $(".left-menu-list").height();
}

function createFrame(url) {
	var s = '<iframe frameborder="0" src="' + url + '" style="width:100%;height:99%;"></iframe>';
	return s;
}

//增加tab
function addTab(subtitle, url, icon, closable) {
	closable = closable == undefined ? true : false;
	var text = $('.catalog-selected a').text();
	if (!$('#tabs').tabs('exists', subtitle)) {
		$('#tabs').tabs('add', {
			title : subtitle,
			content : createFrame(url),
			closable : closable,
			icon : icon
		});
	} else {
		$('#tabs').tabs('select', subtitle);
		$('#mm-tabupdate').click();//刷新
	}
	bindTabEvent();
}
//绑定tab事件
function bindTabEvent() {
	/* 双击关闭TAB选项卡 */
	$(".tabs-inner").on('dblclick',function() {
		var subtitle = $(this).children(".tabs-closable").text();
		$('#tabs').tabs('close', subtitle);
	});
	/* 为选项卡绑定右键 */
	$(".tabs-inner").on('contextmenu', function(e) {
		var subtitle = $(this).children(".tabs-closable").text();
		var tabTitle = $(this).children(".tabs-title").text();
		if(tabTitle=="工作台"){
			$('#mm1').menu('show', {
				left : e.pageX,
				top : e.pageY
			});
			$('#mm1').data("currtab", subtitle);
			$('#tabs').tabs('select', subtitle);
		}else{
			$('#mm').menu('show', {
				left : e.pageX,
				top : e.pageY
			});
			$('#mm').data("currtab", subtitle);
			$('#tabs').tabs('select', subtitle);
		}
		return false;
	});
}
// 绑定菜单右键事件
function bindTabMenuRightClick() {
	// 刷新
	$('#mm-tabupdate').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		$('#tabs').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(url)
			}
		})
	})
	// 刷新
	$('#mm1-tabupdate').click(function() {
		var currTab = $('#tabs').tabs('getSelected');
		var url = $(currTab.panel('options').content).attr('src');
		$('#tabs').tabs('update', {
			tab : currTab,
			options : {
				content : createFrame(url)
			}
		})
	})
	// 关闭当前
	$('#mm-tabclose').click(function() {
		var currtab_title = $('#mm').data("currtab");
		$('#tabs').tabs('close', currtab_title);
	})
	// 全部关闭
	$('#mm-tabcloseall').click(function() {
		$('.tabs-inner span').each(function(i, n) {
			var t = $(n).text();
			$('#tabs').tabs('close', t);
		});
	});
	// 关闭除当前之外的TAB
	$('#mm-tabcloseother').click(function() {
		$('#mm-tabcloseright').click();
		$('#mm-tabcloseleft').click();
	});
	// 关闭除当前之外的TAB
	$('#mm1-tabcloseother').click(function() {
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前右侧的TAB
	$('#mm-tabcloseright').click(function(){
		var nextall = $('.tabs-selected').nextAll();
		if (nextall.length == 0) {
			// msgShow('系统提示','后边没有啦~~','error');
			alert('后边没有啦~~');
			return false;
		}
		nextall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});
	// 关闭当前左侧的TAB
	$('#mm-tabcloseleft').click(function() {
		var prevall = $('.tabs-selected').prevAll();
		if (prevall.length == 0) {
			alert('到头了，前边没有啦~~');
			return false;
		}
		prevall.each(function(i, n) {
			var t = $('a:eq(0) span', $(n)).text();
			$('#tabs').tabs('close', t);
		});
		return false;
	});

	// 退出
	$("#mm-exit").click(function() {
		$('#mm').menu('hide');
	})
}
/*****快捷菜单生成相关*******/
//左侧菜单resize
function leftMenuResize(t,p){
	if(t==0){
		$('#speedSearchInputDiv').show();
		$('#leftMenuList').hide();
		$('#speedNav').show();
		$('#speedAndHeighS').css({background:'#95B8E7',color:'#fff' ,margin:"0 0 0 1px"});
		$('#speedAndHeighH').css({background:'#fff' ,color:'#95B8E7'});
		$('#speedAndHeighS').html("常用");
		$('#speedAndHeighH').html("核心");
		
		$('.countNumsDivOutSide').css({ width:'29vw'});
	}else{
		$('#speedSearchInputDiv').hide();
		$('#leftMenuList').show();
		$('#speedNav').hide();
		$('#speedAndHeighH').css({background:'#95B8E7',color:'#fff'});
		$('#speedAndHeighS').css({background:'#fff',color:'#95B8E7',margin:"0 0 0 4px"});
		$('#speedAndHeighS').html("常用功能");
		$('#speedAndHeighH').html("核心功能");
		$('.countNumsDivOutSide').css({ width:'28vw'});
	}
	var w= $(window).width() - p;
	$('#westPanle').panel('resize',{    width: p});
	$('#mainPanle').panel('resize',{    width: w,left:p});
	resizeSpeed();
}
//快捷菜单调用生成tab
function speedTab(n,u,i){
	window.parent.addTab(n,u,"icon "+i);
	var titleId = "speedDivTittle"+ i.split("-")[1];
} 
//初始化快捷菜单
function InitSpeedMenu(){
	if(_speedMenus.length==0){
		leftMenuResize(1,170);
		return;
	}else{
		leftMenuResize(0,90);
		var o = _speedMenus.menus;
		for(var i in _speedMenus.menus){
			var titleId = "speedDivTittle"+ o[i].icon.split("-")[1];
			$("#speedNav").append("<div class='speedDivCss' title='"+o[i].menuname+"' onclick='speedTab(\""+o[i].tabname+"\" , \""+o[i].url+"\" , \""+o[i].icon+"\" )'>"
					+"<div style='width:48px;height:48px;margin-top:5px;' >"
					+"<center><svg class='speedIcon' aria-hidden='true'><use xlink:href='#"+o[i].imgurl+"'></use></svg></center>"
					+"</div>"
					+"<div style='margin-top:1px;' id='"+titleId+"' class='speedDivTittle' >"+ o[i].menuname +"</div>"
					+"</div>");
		}
		$('.speedDivCss').hover(function(){
	    	$(this).addClass('speedDivCssOver');  
	   	},function(){
	    	$(this).removeClass('speedDivCssOver'); 
	   	});
		$('.speedAndHeigh').hover(function(){
	    	$(this).addClass('speedAndHeighOver');  
	   	},function(){
	    	$(this).removeClass('speedAndHeighOver'); 
	   	});
	}
}
//根据浏览器高度的变化改变快捷菜单的高度
function resizeSpeed(){
	var speedTop = $("#accirdionLeft").offset().top;
	var windowsHeight = $(window).height();
	var speedHeight = windowsHeight-speedTop-3;
	$("#speedNav").css({height:speedHeight});
	var navTop = $("#accirdionLeft").offset().top;
	var navHeight = windowsHeight-navTop-1;
	$("#accirdionLeft").panel('resize',{height:navHeight});
	var divheight = navHeight-_leftMenuHeight-4;
	$(".left-menu-list-one-div").css("max-height","");
	$(".left-menu-list-one-div").css("max-height",divheight+"px");
}
window.onresize = function() {
	resizeSpeed();
}
/**********************/



window.onload=function(){
	//定时器每秒调用一次fnDate()
	setInterval(function(){
	fnDate();
	},1000);
}
//js 获取当前时间
function fnDate(){
	var oDiv=document.getElementById("mainTimeShow");
	var oSpan=document.getElementById("mainTimeSpan");
	var nowDate=new Date();
	var year=nowDate.getFullYear();//当前年份
	var month=nowDate.getMonth();//当前月份
	var data=nowDate.getDate();//天
	var hours=nowDate.getHours();//小时
	var minute=nowDate.getMinutes();//分
	var second=nowDate.getSeconds();//秒
	var weekdayArray = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var weekday=weekdayArray[nowDate.getDay()];//星期几
	var time="当前时间："+year+"-"+fnW((month+1))+"-"+fnW(data)+" "+fnW(hours)+":"+fnW(minute)+":"+fnW(second)+" "+weekday	;
	sessionStorage.time=year+"-"+fnW((month+1))+"-"+fnW(data)+" "+fnW(hours)+":"+fnW(minute)+":"+fnW(second);
	oDiv.innerHTML=time;
	var timeSpan="";
	if(fnW(hours)>5&&fnW(hours)<12){
		timeSpan="上午";
	}
	if(fnW(hours)>11&&fnW(hours)<15){
		timeSpan="中午";
	}
	if(fnW(hours)>14&&fnW(hours)<19	){
		timeSpan="下午";
	}
	if((fnW(hours)>18&&fnW(hours)<24) || (fnW(hours)>-18&&fnW(hours)<6) ){
		timeSpan="晚上";
	}
	oSpan.innerHTML=timeSpan;
}
//补位 当某个字段不是两位数时补0
function fnW(str){
	var num;
	str>9?num=str:num="0"+str;
	return num;
} 
//查询是否有待办事务/未领取维修
function countEventRepairInConsole(){
	$.post("../countEventRepairInConsole.action", {
		userId:_loginUserId
	},function(data){
		if(!data||data==""||data<0){
			$("#mainEventRadius").hide();
			$("#mainRepairRadius").hide();
			$("#mainTaskRadius").hide();
		}
		if(data[0].countNum1==0){
			$("#mainEventRadius").hide();
		}else{
			$("#mainEventHeader").attr("title","你有\n"+data[0].countNum1+"件审批待处理");
		}
		if(data[0].countNum2==0){
			$("#mainRepairRadius").hide();
		}else{
			$("#mainRepairHeader").attr("title","你有\n"+data[0].countNum2+"件维保待处理");
		}
		if(data[0].countNum3==0){
			$("#mainTaskRadius").hide();
		}else{
			$("#mainTaskHeader").attr("title","你有\n"+data[0].countNum3+"件任务待处理");
		}
	});
}

//快捷菜单搜索
function speedSearchInput(){
	var searchValue = $("#speedSearchInput").val();
	var speedDiv = $(".speedDivCss");
	if(searchValue==''){
		$(".speedDivCss").each(function(){
			$(this).slideDown(300);
		});
	}else{
		$(".speedDivCss").each(function(){
			var thisTitle = $(this).attr("title");
			if(speedSearchCheck(searchValue,thisTitle)){
				$(this).slideUp(400);
			}else{
				$(this).slideDown(300);
			}
		});
	}
}
//快捷菜单搜索匹配
function speedSearchCheck(v,t){
	var checkFlag = 0;
	var daxiePinYing = makePy(t)[0];
	var xiaoxiePinYing = makePy(t)[0].toLowerCase();

	if(t.indexOf(v)>-1){
		checkFlag++;
	}
	if(daxiePinYing.indexOf(v)>-1){
		checkFlag++;
	}
	if(xiaoxiePinYing.indexOf(v)>-1){
		checkFlag++;
	}
	
	if(checkFlag>0){
		return false;
	}else{
		return true;
	}
}
//应用程序打印、浏览器打印
function doPrintInExe(printArray,t){
    // alert(printArray);
    console.log("print==="+printArray);
	var myWindow = window.open();
	if (myWindow == null) {
		$.messager.alert('提示', '打印失败，原因：浏览器阻止了弹出式窗口，请设置浏览器为允许弹出式窗口', 'warning');
		return;
	}
	if(t==0){//凭证
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>凭证</title><style>			table td {				border: 1px solid black;				overflow: hidden;				white-space: nowrap;				text-overflow: clip;				padding: 1px 0;				height: 31px;			}						table {				border: 1px solid #888;				table-layout: fixed;				width: 770px;				font-size: 13px;				margin: 10px			}						.body {				width: 790px;				height: 450px			}						#title {				font-size: 26px;				text-align: center;				margin: 20px 10px 0 10px;				font-weight: bold			}						#header {				font-size: 16px;				text-align: center;				margin: 10px;				font-weight: bold			}						#footer {				margin: 5px 20px 0 20px			}						#footer div {				float: left;				width: 20%;				font-weight: bold			}		</style>		<meta charset=\"utf-8\">		<script type=\"text/javascript\" src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>		<script>			body2 = {				body: ["+printArray+"]			}		</script>	</head>	<body>		<center>			<div v-for=\"item in html.body\" id=\"body\">				<div class=\"body\" style=\"\">					<div id=\"title\" style=\"\">{{item.type}}凭证</div>					<div id=\"header\" style=\"\">						<div> <span id=\"year\">{{item.year}}</span>年 <span id=\"month\">{{item.month}}</span>月 <span id=\"date\">{{item.date}}</span>日 </div>						<div style=\"float:right\"> <span id=\"year_month\">{{item.year_month}}</span> 字 第 <span id=\"date_uid\">{{item.date_uid}}</span> 号 </div>					</div>					<table align=\"center\" border=\"0\" cellspacing=\"0\" style=\"\">						<tbody>							<tr align=\"center\">								<td width=\"8%\" style=\"font-size:16px;font-weight:bold\">票据号</td>								<td width=\"5%\" style=\"font-size:16px;font-weight:bold\">账户</td>								<td width=\"20%\" style=\"font-size:16px;font-weight:bold\">关联科目</td>								<td width=\"9%\" style=\"font-size:16px;font-weight:bold\">归属科目</td>								<td width=\"10%\" style=\"font-size:16px;font-weight:bold\">总账科目</td>								<td width=\"31%\" style=\"font-size:16px;font-weight:bold\">摘要</td>								<td width=\"8%\" style=\"font-size:16px;font-weight:bold\">金额</td>							</tr>							<tr v-for=\"item1 in item.journal_arr\" align=\"center\">								<td>{{item1.piaojuhao}}</td>								<td>{{item1.zhanghu}}</td>								<td>{{item1.guanliankemu}}</td>								<td>{{item1.guishukemu}}</td>								<td>{{item1.zongzhangkemu}}</td>								<td>{{item1.zhaiyao}}</td>								<td>{{item1.jine==0 ? \"-\" : item1.jine}}</td>							</tr>							<tr align=\"center\">								<td colspan=\"5\" style=\"font-size:16px;font-weight:bold\">合计</td>								<td colspan=\"2\" >{{item.sum}}</td>							</tr>							<tr align=\"center\">								<td style=\"font-size:16px;font-weight:bold\">备注</td>								<td colspan=\"6\"></td>							</tr>						</tbody>					</table>					<div style=\"float:right;margin:-5px 30px 0 0;font-size:12px\">附单据 ( &nbsp;&nbsp; ) 张</div>					<div style=\"clear:both\"></div>					<div id=\"footer\" style=\"\">						<div style=\"margin-left:20px\">复核人：<span id=\"jizhangren\"></span></div>						<div style=\"margin-left:40px\">会计：<span id=\"shenheren\"></span></div>						<div style=\"margin-left:40px\">出纳：<span id=\"fuheren\"></span></div>						<div style=\"margin-left:40px\">经手人：<span id=\"fuheren\"></span></div>					</div>				</div>			</div>			<script></script>		</center>	</body>	<script>		var vm;		vm = new Vue({			el: \"body\",			data: {				html: {}			}		});		vm.html = body2;		Vue.nextTick(print);		function print() {			document.execCommand(\"print\")		}	</script></html>')");
	}else if(t==1){//业主应付款申请单
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>业主应付款申请单</title><style>			table td {				border:1px solid #888;				overflow: hidden;  				white-space: nowrap;  				text-overflow: clip;  				padding:1px 0;			}			table{				border:1px solid #888;				table-layout:fixed;				width:770px;				font-size:12px; margin:10px			}			#body {				border:1px solid black; width:790px; height:450px			}			#title {				font-size:26px; text-align:center; margin:10px; font-weight:bold			}			#header {				font-size:16px; text-align:center; margin:10px; font-weight:bold			}			#footer {				margin:20px 20px			}			#footer div {				float:left; width: 20%; font-weight:bold			}		</style>		<script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>	</head>	<body>	<center>	<div id=\"body\" style=\"\">			<div id=\"title\" style=\"\">付款申请单</div>			<div id=\"header\" style=\"\">				<div>					<span id=\"year\">{{body.year}}</span>年					<span id=\"month\">{{body.month}}</span>月					<span id=\"date\">{{body.date}}</span>日				</div>				<div style=\"float:right\">									</div>			</div>			<table align=\"center\" border=\"0\" cellspacing=\"0\" style=\"\">				<tr align=\"center\">					<td width=\"20%\" style=\"font-size:16px;font-weight:bold\">关联房屋</td>					<td width=\"10%\" style=\"font-size:16px;font-weight:bold\">付款日</td>					<td width=\"19%\" style=\"font-size:16px;font-weight:bold\">账目周期</td>					<td width=\"8%\" style=\"font-size:16px;font-weight:bold\">收款人</td>					<td width=\"20%\" style=\"font-size:16px;font-weight:bold\">收款账号</td>					<td width=\"13%\" style=\"font-size:16px;font-weight:bold\">收款银行</td>					<td width=\"10%\" style=\"font-size:16px;font-weight:bold\">付款金额</td>				</tr>				<tr v-for=\"item in body.journal_arr\" align=\"center\">					<td>{{item.fangwu}}</td>					<td>{{item.fukuanri}}</td>					<td>{{item.zhouqi}}</td>					<td>{{item.shoukuanren}}</td>					<td>{{item.zhanghao}}</td>					<td>{{item.yinhang}}</td>					<td>{{item.money}}</td>				</tr>								<tr align=\"center\">					<td colspan=\"5\" style=\"font-size:16px;font-weight:bold\">合计</td>					<td colspan=\"2\" style=\"font-size:16px;font-weight:bold\">￥{{body.sum}}元</td>				</tr>			</table>						<div id=\"footer\" style=\"\">				<div style=\"margin-left:60px\">审核人：<span id=\"jizhangren\">{{body.jizhangren}}</span></div>				<div style=\"margin-left:100px\">复核人：<span id=\"shenheren\">{{body.shenheren}}</span></div>				<div style=\"margin-left:120px\">付款确认人：<span id=\"fuheren\">{{body.fuheren}}</span></div>			</div>		</div>		<script>			var body2="+printArray+"		</script>		<script>			var vm;			vm = new Vue({			  el: \"#body\",			  data: {				body:{									}			  }			});			vm.body = body2;	Vue.nextTick(print);		function print() {			document.execCommand(\"print\")		}		</script>	</center></body></html>')");
	}else if(t==2){//租客每期收支收据
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>租客每期收支收据</title><style>			table td {				border: 1px solid #888;				border-left: none;				border-top: none;				white-space: nowrap;				padding: 2px;				font-size: 13px;			}						table {				/*border: 1px solid #888;*/				table-layout: fixed;				border-left: 1px solid #888;				width: 768px;				font-size: 13px;				margin: 0 10px;			}						#body {				border: 1px solid black;				width: 790px;				height: 450px			}						#title {				font-size: 22px;				text-align: center;				font-weight: bold			}						#header {				font-size: 16px;				text-align: center;				margin: 10px;				font-weight: bold			}						#footer {				margin: 20px 20px			}						#footer div {				float: left;				width: 20%;				font-weight: bold			}		</style>		<script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>	</head>	<body>		<center>			<div id=\"body\" style=\"\">				<div id=\"title\" style=\"\">{{body.gongsimingcheng}}收款收据</div>				<div id=\"header\" style=\"\">					<div style=\"float:left;margin-left:42% ;\"><span id=\"year\">{{body.year}}</span>年<span id=\"month\">{{body.month}}</span>月<span id=\"date\">{{body.date}}</span>日</div>					<div style=\"float:right;font-size:13px;margin-right:3% ;font-weight:bold\">编号：<span id=\"piaojubianhao\">{{body.piaojubianhao}}</span></div>				</div>				<table align=\"center\" cellspacing=\"0\" style=\"margin-top:5px;border-top: 1px solid #888;\">					<tr align=\"center\">						<td>楼盘名称</td>						<td>姓名</td>						<td>收款方式</td>					</tr>					<tr align=\"center\">						<td>{{body.wuyedizhi}}</td>						<td>{{body.name}}</td>						<td>{{body.shoukuanfangshi}}</td>					</tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\" v-if=\"body.energy_arr\">					<tr align=\"center\">						<td>能源项目</td>						<td>本期读数</td>						<td>上期读数</td>						<td>实用量</td>						<td>金额</td>						<td>备注</td>					</tr>					<tr v-for=\"item in body.energy_arr\" align=\"center\">						<td>{{item.shoufeixiangmu}}</td>						<td>{{item.benqidushu}}</td>						<td>{{item.shangqidushu}}</td>						<td>{{item.shiyongliang}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\">					<tr v-for=\"item in body.journal_arr\" align=\"center\">						<td>{{item.feiyong}}</td>						<td>{{item.jine}}</td>						<td>{{item.beizhu}}</td>					</tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\">					<tr align=\"center\">						<td>本期应收金额：{{body.hejijine}}</td>												<td><b>本期实收金额：{{body.shishoujine}}</b></td>					<td>本期<span v-if=\"body.benqiqianjie >= 0\">欠结金额：{{body.benqiqianjie}}</span><span v-else>结余金额：{{-body.benqiqianjie}}</span></td></tr>				</table>				<table align=\"center\" cellspacing=\"0\" style=\"border-top: none\" v-if=\"body.beizhu\">					<tr>						<td><span style=\"padding-left: 20px;\">备注：</span>{{body.beizhu}}</td>					</tr>				</table>				<div id=\"footer\" style=\"margin: 3px 20px\">					<div style=\"margin-left:30px\">记账人：<span id=\"jizhangren\">{{body.jizhangren}}</span></div>					<div style=\"margin-left:80px\">收款人：<span id=\"shenheren\">{{body.shoukuanren}}</span></div>					<div style=\"margin-left:80px\">复核人：<span id=\"fuheren\">{{body.fuheren}}</span></div>				</div>			</div>			<script>				var body2 = "+printArray+";			</script>			<script>				var vm;				vm = new Vue({					el: \"#body\",					data: {						body: {}					}				});				vm.body = body2;				Vue.nextTick(print);				function print() {					document.execCommand(\"print\")				}			</script>		</center>	</body></html>')");
	}else if(t==3){//租客退房出账申请单
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>退房出账申请单</title><style>        	table td {            	border: 1px solid #888;            border-top:none;            white-space: nowrap;            padding: 1px 0 0 0;			font-size: 12px;        }                table {                        table-layout: fixed;            width: 770px;            font-size: 12px;            margin: 0 10px        }                #body {            border: 1px solid black;            width: 790px;            height: 450px        }                #title {            font-size: 18px;            text-align: center;            font-weight: bold        }                #header {            font-size: 16px;            text-align: center;            margin: 10px;            font-weight: bold        }                #footer {            margin: 20px 20px        }                #footer div {            float: left;            width: 20%;            font-weight: bold        }</style><script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script></head><body><div id=\"body\" style=\"\"><div id=\"title\" style=\"\">    {{body.yezhuzuke}}退房出账审批单</div><div style=\"text-align:right;font-size: 14px;margin:0 20px 0 0;\">    退房编号：{{body.tuifangbianhao}}</div><table align=\"center\" cellspacing=\"0\" style=\"margin-top:2px;border-top: 1px solid #888;\"><tbody><tr align=\"center\"><td>房屋地址</td><td>姓名</td><td>经办人</td></tr><tr align=\"center\"><td>{{body.wuyedizhi}}</td><td>{{body.name}}</td><td>{{body.jingbanren}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>退房性质</td><td>退房手续</td><td>退房时间</td></tr><tr align=\"center\"><td>{{body.tuifangxingzhi}}</td><td>{{body.tuifangshouxu}}</td><td>{{body.tuifangshijian}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>合约开始日</td><td>合约结束日</td><td>退款时间</td></tr><tr align=\"center\"><td>{{body.qizuri}}</td><td>{{body.jiesuri}}</td><td>{{body.tuikuanshijian}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>应缴费用</td><td>应退费用</td></tr><tr align=\"center\"><td style=\"white-space: normal;\">{{body.yingjiaofeiyong}}</td><td style=\"white-space: normal;\">{{body.yingtuifeiyong}}</td></tr> 	</tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td style=\"width:33%\">{{body.yezhuzuke}}结算账户</td><td style=\"width:66%\">{{body.yinhangmingcheng}} - {{body.shoukuanren}} - {{body.zhanghuhaoma}}</td></tr><tr align=\"center\"><td style=\"width:33%\">{{body.shijijiesuan}}</td><td style=\"width:66%;font-weight: bold\">{{body.shijiyingtuikuan}}(大写 :{{body.shijiyingtuikuandaxie}})</td></tr> 	</tbody></table><div style=\"margin: 3px 20px\"><span style=\"font-size: 14px\">退房处理人：</span><span style=\"font-size: 14px; margin-left: 100px\">审核人：</span><span style=\"font-size: 14px; margin-left: 100px\">复核人：</span><span style=\"font-size: 14px; margin-left: 100px\">同意出账人：</span></div></div><script>		var body2="+printArray+"	</script><script>		var vm;				vm = new Vue({		  el: \"#body\",		  data: {			body:{							}		  }		});		vm.body = body2;		Vue.nextTick(print);		function print() { document.execCommand(\"print\") }</script></body></html>')");
	}else if(t==4){//业主退房出账申请单
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>退房出账申请单</title><style>        	table td {            	border: 1px solid #888;            border-top:none;            white-space: nowrap;            padding: 1px 0 0 0;			font-size: 12px;        }                table {                        table-layout: fixed;            width: 770px;            font-size: 12px;            margin: 0 10px        }                #body {            border: 1px solid black;            width: 790px;            height: 450px        }                #title {            font-size: 18px;            text-align: center;            font-weight: bold        }                #header {            font-size: 16px;            text-align: center;            margin: 10px;            font-weight: bold        }                #footer {            margin: 20px 20px        }                #footer div {            float: left;            width: 20%;            font-weight: bold        }</style><script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script></head><body><div id=\"body\" style=\"\"><div id=\"title\" style=\"\">    {{body.yezhuzuke}}退房出账审批单</div><div style=\"text-align:right;font-size: 14px;margin:0 20px 0 0;\">    退房编号：{{body.tuifangbianhao}}</div><table align=\"center\" cellspacing=\"0\" style=\"margin-top:2px;border-top: 1px solid #888;\"><tbody><tr align=\"center\"><td>房屋地址</td><td>姓名</td><td>经办人</td></tr><tr align=\"center\"><td>{{body.wuyedizhi}}</td><td>{{body.name}}</td><td>{{body.jingbanren}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>退房性质</td><td>退房手续</td><td>退房时间</td></tr><tr align=\"center\"><td>{{body.tuifangxingzhi}}</td><td>{{body.tuifangshouxu}}</td><td>{{body.tuifangshijian}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>合约开始日</td><td>合约结束日</td><td>退款时间</td></tr><tr align=\"center\"><td>{{body.qizuri}}</td><td>{{body.jiesuri}}</td><td>{{body.tuikuanshijian}}</td></tr></tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td>应缴费用</td><td>应退费用</td></tr><tr align=\"center\"><td style=\"white-space: normal;\">{{body.yingjiaofeiyong}}</td><td style=\"white-space: normal;\">{{body.yingtuifeiyong}}</td></tr> 	</tbody></table><table align=\"center\" cellspacing=\"0\" style=\"border-top: none\"><tbody><tr align=\"center\"><td style=\"width:33%\">{{body.yezhuzuke}}结算账户</td><td style=\"width:66%\">{{body.yinhangmingcheng}} - {{body.shoukuanren}} - {{body.zhanghuhaoma}}</td></tr><tr align=\"center\"><td style=\"width:33%\">{{body.shijijiesuan}}</td><td style=\"width:66%;font-weight: bold\">{{body.shijiyingtuikuan}}(大写 :{{body.shijiyingtuikuandaxie}})</td></tr> 	</tbody></table><div style=\"margin: 3px 20px\"><span style=\"font-size: 14px\">退房处理人：</span><span style=\"font-size: 14px; margin-left: 100px\">审核人：</span><span style=\"font-size: 14px; margin-left: 100px\">复核人：</span><span style=\"font-size: 14px; margin-left: 100px\">同意出账人：</span></div></div><script>		var body2="+printArray+"	</script><script>		var vm;				vm = new Vue({		  el: \"#body\",		  data: {			body:{							}		  }		});		vm.body = body2;		Vue.nextTick(print);		function print() { document.execCommand(\"print\") }</script></body></html>')");
	}else if(t==5){//租客转租协议
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>转租协议</title></head><style>		span{			text-decoration: underline;		}			</style>	<script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>	<BODY>		<div id=\"body\" style=\"margin:auto;width: 595px;height: 842px;padding: 0 40px 0 40px;\">			<center>				<div style=\"width: 100%;font-size: 26px;font-family: simsun;font-weight:bold;margin-top:60px;\">					转租协议书</div>			</center>			<div id=\"\" style=\"margin-top:10px;width: 100%;font-size: 16px;font-family: simsun;line-height:34px\">&nbsp;&nbsp;甲方<span>&nbsp;{{body.renterName}}&nbsp;</span>（身份证：<span>&nbsp;{{body.idcard}}&nbsp;</span> ）承租乙方《{{body.companyName}}》之物业<span>&nbsp;{{body.houseAddress}}&nbsp;</span>，合同有效期为：<span> {{body.beginYear}} </span>年<span> {{body.beginMonth}} </span>月<span> {{body.beginDay}} </span>日— <span> {{body.endYear}} </span>年<span> {{body.endMonth}} </span>月 <span> {{body.endDay}} </span>日，合同编号：<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>；现因甲方自身原因，需在合同期内将本物业的承租权转给第三方。<br />&nbsp;&nbsp;经双方协商达成以下共识：<div style=\"margin-left: 28px;width: 100%;\">1.甲方于<span>&nbsp;&nbsp;&nbsp;</span>年<span>&nbsp;&nbsp;</span>月<span>&nbsp;&nbsp;</span>日前搬离本物业，以便第三方随时入住；如第三方已向乙方签署合同或缴纳定金，本日期不得变更；</div><div style=\"margin-left: 28px;width: 100%;\">2.在第三方承租之前租金由甲方承担，《物业出租合同》（编号：<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>）双方继续履行相关合同条例；</div><div style=\"margin-left: 28px;width: 100%;\">3.在进行第三方招租时所产生的费用（中介费、空置期、免租期）由甲方承担。</div><div style=\"margin-left: 28px;width: 100%;\">4.乙方统一并落实、安排第三方的招租工作，如第三方成交租金低于现合同租金，在甲方合同有效期内由甲方一次性补足差额。</div><div style=\"margin-left: 28px;width: 100%;\">5.在成功进行第三方招租后，甲方需向乙方支付租赁保证金的50%作为服务费；甲方在结清相关费用后，根据《退房规定》退还甲方租赁保证金。</div><div style=\"margin-left: 28px;width: 100%;\">6.第三方的合同期限、价格等由乙方进行具体安排，甲方不进行任何干涉。</div><div style=\"margin-left: 28px;width: 100%;\">7.在甲方所签署的《物业出租合同》（编号：<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>）转让承租权之前，义务配合乙方进行招租工作，为乙方提供招租便利。如因甲方原因，导致乙方无法开展招租实质性工作，相关损失费用将与乙方无关！</div><div style=\"margin-left: 28px;width: 100%;\">以上条款均由双方确认并认可，共计 7 项；</div><div style=\"margin-left: 70px;font-weight:bold;\">签名（甲方）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签名（乙方）： </div><div style=\"margin-left: 70px;font-weight:bold;\">代理人：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp; 月&nbsp; 日</div><div style=\"margin-left: 70px;font-weight:bold;\">年&nbsp; 月&nbsp; 日</div></div>		</div>	<script>		var body2="+printArray+"	</script><script>		var vm;				vm = new Vue({		  el: \"#body\",		  data: {			body:{							}		  }		});		vm.body = body2;		Vue.nextTick(print);		function print() { document.execCommand(\"print\") } </script></body></html>')");
	}else if(t==6){//未租房二维码打印
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>打印二维码</title> 		 	</head> 	<body> 		<div id=\"app\" style=\"text-align: center;\"> 			<div v-for=\"item in data\"> 				<div> 					<div class=\"qrcode\" data-url=\"{{item.url}}\"></div> 				</div> 			</div> 		</div> 		<script src=\"http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js\"></script> 		<script src=\"http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js\"></script> 		<script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script> 		<script> 			var app = new Vue({ 				el: \"#app\", 				data: {  					data:"+printArray+", 				},  			}); 			Vue.nextTick(print); 			 			function print(){ 				$(\".qrcode\").each(function() { 					$(this).qrcode({ 						width: 80, 						height: 80, 						text: $(this).attr(\"data-url\") 					}); 				}); 				document.execCommand(\"print\") 			} 		</script> 	</body> </html> ')");
	}else if(t==7){//资产二维码
		myWindow.eval("document.write('<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>打印资产标识卡</title>		<script src=\"http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js\"></script>		<script src=\"http://pic-static.fangzhizun.com/jquery-qrcode/1.0.0/jquery.qrcode.min.js\"></script>		<script src=\"http://pic-static.fangzhizun.com/js/vue.min.1.0.js\"></script>	</head>	<style>		body{				 padding:0px;				 margin: 0px;		}		div{			font-family: \"黑体\";		}		.outside {			width: 240px;			height: 120px;		}				.title {			width: 80px;			font-size: 16px;			line-height: 16px;			float: left;		}				.nums {			width: 120px;			font-size: 15px;			line-height: 15px;			float: left;			margin-left:5px ;		}				.qrcode {			font-size: 0px;			width: 80px;			height: 80px;			float: left;			margin:3px 0 0 2px;		}				.xiangxi {			width: 146px;			float: left;			margin:3px 0 0 2px;		}				.name1 {			width: 36px;			line-height: 12px;			font-size: 12px;			float: left;			display: block;			word-break: break-all;			word-wrap: break-word;		}				.name2 {			width: 110px;			font-size: 12px;			line-height: 12px;			float: left;			text-align: left;			display: block;			word-break: break-all;			word-wrap: break-word;		}	</style>	<script>		body2 = {				body: "+printArray+"			}	</script>	<body>		<center>			<div v-for=\"item in html.body\" id=\"body\">				<div class=\"outside\">					<div class=\"title\">资产标识卡</div>					<div class=\"nums\">NO.{{item.nums}}</div>					<div style=\"clear: both;\"></div>					<div class=\"qrcode\">{{item.qrcode}}</div>					<div class=\"xiangxi\">						<div class=\"name1\">名称：</div> <div class=\"name2\">{{item.name}}</div>						<div style=\"clear: both;\"></div><div class=\"name1\">品牌：</div> <div class=\"name2\">{{item.pinpai}}</div><div style=\"clear: both;\"></div>						<div class=\"name1\">型号：</div> <div class=\"name2\">{{item.xinghao}}</div><div style=\"clear: both;\"></div>						<div class=\"name1\">地址：</div> <div class=\"name2\">{{item.dizhi}}</div><div style=\"clear: both;\"></div>						<div class=\"name1\">状态：</div> <div class=\"name2\">{{item.zhuangtai}}</div>					</div>				</div>			</div>		</center>	</body>	<script>		var vm;		vm = new Vue({			el: \"body\",			data: {				html: {}			}		});		vm.html = body2;		Vue.nextTick(print);		function print() {			$(\".qrcode\").each(function(){				$(this).qrcode({					width:80,					height:80,					text:$(this).html()				});			});			document.execCommand(\"print\")		}	</script></html>')");
	}else if(t==8){//审批单-涉及金额
		myWindow.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>审批单打印涉及金额</title><style>    table td {		border: 1px solid #888;		border-top: none;		white-space: nowrap;		padding: 2px;		font-size: 13px;	}	table {		table-layout: fixed;		width: 770px;		font-size: 12px;		margin: 0 10px	}	#body {		border: 1px solid black;		width: 790px;		height: 450px	}	#title {		font-size: 18px;		text-align: center;		font-weight: bold	}	#header {		font-size: 16px;		text-align: center;		margin: 10px;		font-weight: bold	}	#footer {		margin: 20px 20px	}	#footer div {		float: left;		width: 20%;		font-weight: bold	}</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body><div id="body">   	<div>	<div id="title">	    {{body.gongsi}}</br>	    {{body.shenpileixing}}审批单	</div>   	<div style="float: left;margin-left: 1%;">			归属地址：{{body.guishudizhi}}	</div> 	<div style="float: right;margin-right: 1%;">	     	审批编号:{{body.shenpibianhao}}	</div>   	</div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="16%">申请人</td><td width="32%">{{body.shenqingren}}</td><td width="16%">申请时间</td><td width="36%">{{body.shengqingshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none;table-layout:fixed;"><tbody><tr align="center"><td width="16%" height="50px">申请内容</td><td width="84%"><div style="white-space:normal;word-break:break-all;word-wrap:break-word;">{{body.shenqingneirong}}</div></td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td width="16%" >涉及金额</td><td width="84%">￥ : {{body.shejijine}} 元 (大写 : {{body.daxieshejijine}})</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td width="16%">收款账户</td><td width="32%">{{body.yinhangmingcheng}}</td><td width="16%">{{body.yinhanghuming}}</td><td width="36%">{{body.yinhangzhanghao}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none"><tbody><tr align="center"><td width="16%">所属支行</td><td width="32%">{{body.yinhangzhihang}}</td><td width="16%">账号描述</td><td width="36%">{{body.yinhangbeizhu}}</td></tr></tbody></table><table align="center" cellspacing="0" style="margin-top: 1%;border-top: 1px solid #888;"><tbody><tr align="center"><td width="16%">审批节点</td><td width="18%">审批人</td><td width="46%">审批意见</td><td width="20%">审批时间</td></tr><tr v-for="item in body.shenpi" align="center"><td width="16%">{{item.shenpijibie}}</td><td width="18%">{{item.shenpiren}}</td><td width="46%">{{item.shenpiyijian}}</td><td width="20%">{{item.shenpishijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="margin-top: 1%;border-top: 1px solid #888;"><tbody><tr align="center"><td width="16%">操作人</td><td width="18%">{{body.caozuoren}}</td><td width="14%">付款金额</td><td width="16%">{{body.fukuanjine}}</td><td width="16%">财务流水号</td><td width="20%">{{body.caiwuliushuihao}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none;"><tbody><tr align="center"><td width="16%">付款时间</td><td width="18%">{{body.fukuanshijian}}</td><td width="14%">付款账户</td><td width="52%">{{body.fukuanzhanghu}}</td></tr></tbody></table></div><script>	var body2='+printArray+'</script><script>    var vm;	vm = new Vue({		el: "#body",		data: {			body: {}		}	});	vm.body = body2;  Vue.nextTick(print);		function print() {			document.execCommand("print")		}		</script></body></html>');
	}else if(t==9){//审批单-不涉及金额
		myWindow.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>审批单打印不涉及金额</title><style>    table td {		border: 1px solid #888;		border-top: none;		white-space: nowrap;		padding: 2px;		font-size: 13px;	}	table {		table-layout: fixed;		width: 770px;		font-size: 12px;		margin: 0 10px	}	#body {		border: 1px solid black;		width: 790px;		height: 450px	}	#title {		font-size: 18px;		text-align: center;		font-weight: bold	}	#header {		font-size: 16px;		text-align: center;		margin: 10px;		font-weight: bold	}	#footer {		margin: 20px 20px	}	#footer div {		float: left;		width: 20%;		font-weight: bold	}</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body><div id="body">   	<div>	<div id="title">	    {{body.gongsi}}</br>	    {{body.shenpileixing}}审批单	</div>   	<div style="float: left;margin-left: 1%;">     	归属地址：{{body.guishudizhi}}	</div> 	<div style="float: right;margin-right: 1%;">	     	审批编号:{{body.shenpibianhao}}	</div>   	</div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="20%">申请人</td><td width="30%">{{body.shenqingren}}</td><td width="20%">申请时间</td><td width="30%">{{body.shengqingshijian}}</td></tr></tbody></table><table align="center" cellspacing="0" style="border-top: none;"><tbody><tr align="center"><td width="20%" height="50px">申请内容</td><td width="80%" ><div style="white-space:normal;word-break:break-all;word-wrap:break-word;">{{body.shenqingneirong}}</div></td></tr></tbody></table><table align="center" cellspacing="0" style="margin-top: 1%;border-top: 1px solid #888;"><tbody><tr align="center"><td width="20%">审批节点</td><td width="20%">审批人</td><td width="40%">审批意见</td><td width="20%">审批时间</td></tr><tr v-for="item in body.shenpi" align="center"><td width="20%">{{item.shenpijibie}}</td><td width="20%">{{item.shenpiren}}</td><td width="40%">{{item.shenpiyijian}}</td><td width="20%">{{item.shenpishijian}}</td></tr></tbody></table></div><script>	var body2='+printArray+'</script><script>    var vm;	vm = new Vue({		el: "#body",		data: {			body: {}		}	});	vm.body = body2;  Vue.nextTick(print);		function print() {			document.execCommand("print")		}		</script></body></html>');
	}else if(t==10){//未租下定
		myWindow.document.write('<!DOCTYPE html> <html>  <head> <meta charset="UTF-8"> <title>租客下定</title> <style> table td { border: 1px solid #888; border-left: none; border-top: none; white-space: nowrap; padding: 2px; font-size: 13px; text-align: center; }  table { /*border: 1px solid #888;*/ table-layout: fixed; border-left: 1px solid #888; width: 768px; border-bottom: none; border-right: none; font-size: 16px; margin: 0 10px; }  #body { border: 1px solid black; width: 790px; height: 450px }  #title { font-size: 22px; text-align: center; font-weight: bold }  #header { font-size: 14px; text-align: center; margin: 10px; font-weight: bold } </style> <script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script> </head>  <body> <center> <div id="body"> <div style="text-align: center"> <div id="title" style="">{{body.gongsimingcheng}}定金收据</div> </br> </div> <div id="header" style=""> <div style="float:left;margin-left:42% ;"><span id="year">{{body.year}}</span> 年 <span id="month">{{body.month}}</span> 月 <span id="date">{{body.date}}</span> 日 </div> <div style="float:right;margin-right:1%;font-size: 12px;">票据编号：{{body.depositBillNumber}}<span id="piaojubianhao"></span></div> </div> <table border="1" style="" cellspacing="0"> <tr> <td>地址</td> <td colspan="3">{{body.address}}</td> <td>收款方式</td> <td>{{body.depositPayType}}</td> </tr> <tr> <td>客户姓名</td> <td>{{body.depositRenterName}}</td> <td>联系电话</td> <td colspan="3">{{body.depositRenterPhone}}</td> </tr> <tr> <td>经手人</td> <td>{{body.depositFollowShowUserInfo}}</td> <td>定金有效时间</td> <td>{{body.contractBegin}}</td> <td>结束时间</td> <td>{{body.depositDateEnd}}</td> </tr> <tr> <td>下定类型</td> <td>{{body.depositType}}</td> <td>合同开始</td> <td>{{body.depositDateEnd}}</td> <td>合同结束</td> <td>{{body.contractEnd}}</td> </tr> <tr> <td>定金(元)</td> <td>{{body.depositGet}}</td> <td>实收金额(元)</td> <td colspan="3">{{body.depositGet}}</td> </tr> <tr> <td>双方约定 </td> <td colspan="5" style="white-space: normal;word-break:break-all;text-align: left"> 客户 {{body.depositRenterName}} 需于 {{body.depositDateEnd}} 前，由 {{body.depositRenterName}} 本人携带身份证原件，在工作时间与我司签署 {{body.address}} 我司提供的《房屋租赁合同》，该合同条款双方已共同认可，并约定 <span v-if="body.rent!=undefined && body.rent!=\'\' && body.rent!=0">租金：{{body.rent}}元/月</span> <span v-if="body.serverFee!=undefined && body.serverFee!=\'\' && body.serverFee!=0">、服务费:{{body.serverFee}}元/月</span> <span v-if="body.propertyFee!=undefined && body.propertyFee!=\'\' && body.propertyFee!=0">、物管费：{{body.propertyFee}}元/月</span> <span v-if="body.netFee!=undefined && body.netFee!=\'\' && body.netFee!=0">、网络费：{{body.netFee}}元/月</span> <span v-if="body.tvFee!=undefined && body.tvFee!=\'\' && body.tvFee!=0">、电视费:{{body.tvFee}}元/月</span> <span v-if="body.housingDeposit!=undefined && body.housingDeposit!=\'\' && body.housingDeposit!=0">、房屋押金：{{body.housingDeposit}}元/月</span> <span v-if="body.netFee!=doorcardDeposit && body.doorcardDeposit!=\'\' && body.doorcardDeposit!=0">、门卡押金：{{body.doorcardDeposit}}元/月</span> <span v-if="body.hydropowerDeposit!=undefined && body.hydropowerDeposit!=\'\' && body.hydropowerDeposit!=0">、水电押金：{{body.hydropowerDeposit}}元/月</span> <span v-if="body.otherDeposit!=undefined && body.otherDeposit!=\'\' && body.otherDeposit!=0">、其它押金：{{body.otherDeposit}}元/月</span> ；如客户 {{body.depositRenterName}} 逾期未与我司签署合同，本定金收据自动失效，我司不退还本定金。 </td> </tr> </table> </div> </center> <script> var body2 = ' + printArray + ' </script> <script> var vm; vm = new Vue({ el: "#body", data: { body: {} } }); vm.body = body2; console.log(vm.body);  function print() { document.execCommand("print") } </script> </body>  </html>');
	}else if(t==11){//销售单-自取
		myWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>销售开单票据</title><style> table td {	border: 1px solid #888;	border-top: none;	white-space: nowrap;	padding: 2px;	font-size: 13px;}	table {	table-layout: fixed;	width: 770px;	font-size: 12px;	margin: 0 10px	}	#body {border: 1px solid black;	width: 790px;	height: 450px	}	#title {	font-size: 18px;	text-align: center;	font-weight: bold	}	#header {	font-size: 16px;	text-align: center;	margin: 10px;	font-weight: bold	}	#footer {	margin: 20px 20px	}	#footer div {float: left;	width: 20%;	font-weight: bold	}	</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head><body><div id="body"><div><div id="title" style="margin: 10px 0 0 0;"> {{body.gongsi}}<hr style="width: 20%;" />销 售 单 </div><div style="float: left;margin-left: 1%;"> 客户名称：{{body.kehumingcheng}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：{{body.riqi}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">订&nbsp;&nbsp;单&nbsp;号：{{body.dingdanhao}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">联系号码：{{body.lianxihaoma}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">运输方式：{{body.yunshufangshi}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">付款方式：{{body.fukuanfangshi}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">定金比率：{{body.dingjinbilu}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">预付定金：{{body.yufudingjin}} </div></div> </div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="14%">商品编码</td><td width="30%">商品名称</td><td width="14%">原价</td><td width="14%">现价</td><td width="14%">数量</td><td width="14%">小计</td></tr><tr v-for="item in body.goods" align="center"><td width="14%">{{item.shangpinbianma}}</td><td width="30%">{{item.shangpinmingcheng}}</td><td width="14%">{{item.yuanjia}}</td><td width="14%">{{item.xianjia}}</td><td width="14%">{{item.shuliang}}</td><td width="14%">{{item.xiaoji}}</td></tr><tr align="center"><td rowspan="2">备注</td><td rowspan="2" colspan="2">{{body.beizhu}}</td><td rowspan="2">总金额</td><td rowspan="2" colspan="2">{{body.zongjine}}</td></tr></tbody></table><div style="float: left;margin-left: 1%;"> 业务人员：{{body.yewurenyuan}} </div></div><script>	var body2 = '+printArray+'	</script>	<script>	var vm;	vm = new Vue({	el: "#body",	data: {	body: {}	}	});	vm.body = body2; Vue.nextTick(print);function print() {	document.execCommand("print")	}	</script></body></html>');
	}else if(t==12){//销售单-快递
		myWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>销售开单票据</title><style> table td {	border: 1px solid #888;	border-top: none;	white-space: nowrap;	padding: 2px;	font-size: 13px;}	table {	table-layout: fixed;	width: 770px;	font-size: 12px;	margin: 0 10px	}	#body {border: 1px solid black;	width: 790px;	height: 450px	}	#title {	font-size: 18px;	text-align: center;	font-weight: bold	}	#header {	font-size: 16px;	text-align: center;	margin: 10px;	font-weight: bold	}	#footer {	margin: 20px 20px	}	#footer div {float: left;	width: 20%;	font-weight: bold	}	</style><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script>	</head><body><div id="body"><div><div id="title" style="margin: 10px 0 0 0;"> {{body.gongsi}}<hr style="width: 20%;" />销 售 单 </div><div style="float: left;margin-left: 1%;"> 客户名称：{{body.kehumingcheng}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：{{body.riqi}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">订&nbsp;&nbsp;单&nbsp;号：{{body.dingdanhao}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">联系号码：{{body.lianxihaoma}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">运输方式：{{body.yunshufangshi}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">付款方式：{{body.fukuanfangshi}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">定金比率：{{body.dingjinbilu}} </div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">预付定金：{{body.yufudingjin}} </div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">收货地址：{{body.shouhuodizhi}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">发货日期：{{body.fahuoriqi}}</div></div> </div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="14%">商品编码</td><td width="30%">商品名称</td><td width="14%">原价</td><td width="14%">现价</td><td width="14%">数量</td><td width="14%">小计</td></tr><tr v-for="item in body.goods" align="center"><td width="14%">{{item.shangpinbianma}}</td><td width="30%">{{item.shangpinmingcheng}}</td><td width="14%">{{item.yuanjia}}</td><td width="14%">{{item.xianjia}}</td><td width="14%">{{item.shuliang}}</td><td width="14%">{{item.xiaoji}}</td></tr><tr align="center"><td rowspan="2">备注</td><td rowspan="2" colspan="2">{{body.beizhu}}</td><td rowspan="2">总金额</td><td rowspan="2" colspan="2">{{body.zongjine}}</td></tr></tbody></table><div style="float: left;margin-left: 1%;"> 业务人员：{{body.yewurenyuan}} </div></div><script>	var body2 = '+printArray+'	</script>	<script>	var vm;	vm = new Vue({	el: "#body",	data: {	body: {}	}	});	vm.body = body2; Vue.nextTick(print);function print() {	document.execCommand("print")	}	</script></body></html>');
	}else if(t==13){//线上订单
		myWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>线上订单票据</title><script src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script><style>table td {border: 1px solid #888;border-top: none;white-space: nowrap;padding: 2px;font-size: 13px;}table {table-layout: fixed;width: 770px;font-size: 12px;margin: 0 10px}#body {border: 1px solid black;width: 790px;height: 450px}#title {font-size: 18px;text-align: center;font-weight: bold}</style></head><body><div id="body"><div><div id="title" style="margin: 10px 0 0 0;"> {{body.gongsi}}<hr style="width: 20%;" />线上订单 </div><div style="float: left;margin-left: 1%;"> 客户名称：{{body.kehumingcheng}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">订单类型：{{body.dingdanleixing}}</div></div><div style="clear: both;"></div>	<div style="float: left;margin-left: 1%;">订&nbsp;&nbsp;单&nbsp;&nbsp;号：{{body.dingdanhao}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">联系号码：{{body.lianxihaoma}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">下单时间：{{body.xiadanshijian}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">支付方式：{{body.zhifufangshi}}</div></div><div style="clear: both;"></div><div style="float: left;margin-left: 1%;">收货地址：{{body.shouhuodizhi}}</div><div style="float: right;margin-right: 1%;width: 25%;"><div style="float: left;">实付金额：{{body.shifujine}}</div></div></div><table align="center" cellspacing="0" style="margin-top:10px;border-top: 1px solid #888;"><tbody><tr align="center"><td width="25%">商品名称</td><td width="15%">原价</td><td width="15%">现价</td><td width="15%">数量</td><td width="15%">优惠标签</td><td width="15%">热销标签</td></tr><tr v-for="item in body.goods" align="center"><td width="25%">{{item.shangpinmingcheng}}</td><td width="15%">{{item.yuanjia}}</td><td width="15%">{{item.xianjia}}</td><td width="15%">{{item.shuliang}}</td><td width="15%">{{item.youhuibiaoqian}}</td><td width="15%">{{item.rexiaobiaoqian}}</td></tr><tr align="center"><td rowspan="2">减免原因</td><td rowspan="2" colspan="3">{{body.jianmianyuanyin}}</td><td>商品减免</td><td>{{body.shangpinjianmian}}</td></tr><tr align="center"> <td>配送费用</td><td>{{body.peisongfeiyong}}</td></tr><tr align="center"><td>备注</td><td colspan="3">{{body.beizhu}}</td><td rowspan="2">总金额</td><td rowspan="2">{{body.zongjine}}</td></tr><tr align="center"><td>接单人员</td><td colspan="3">{{body.jiedanrenyuan}}</td></tr></tbody></table></div><script>	var body2 = '+printArray+'</script><script> var vm;	vm = new Vue({	el: "#body",	data: {	body: {}	}	});	vm.body = body2; Vue.nextTick(print);	function print() {	document.execCommand("print")	}	</script></body></html>');
	}else if(t==14){//零售-线上订单
		myWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>tab}h1 {font-size: 16px;text-align: center}h2 {font-size: 14px;text-align: center}#body {font-size: 13px;margin-left: 10px;padding: 0px;}#body .other_fee {border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body style="background-color:#fff;width:48mm;"><div id="body" style="width:48mm;"><div class="other_fee"><div class="title"><h1>{{body.gongsi}}</h1><h2>在线支付订单</h2><hr size=2 style="border-style:dashed ;width:100%"><table><tbody><tr><td style="font-size: 26px;">备注：{{body.note}}</td></tr><tr><td>下单时间：{{body.time}}</td></tr><tr><td>单号：{{body.saleNo}}</td></tr><tr><td>客人：{{body.customer}}</td></tr><tr><td>电话：{{body.phone}}</td></tr><tr><td>收货地址：{{body.adderss}}</td></tr></tbody></table></div></div><div class="other_fee"><div class="paymentVoucher"><br /><table style="width: 100%;"><tbody><tr align="center" style="font-weight: 800;"><td>商品</td><td>数量</td><td>售价</td></tr><tr v-for="item in body.goods" align="center">	<td width="25%">{{item.commodity}}</td><td width="15%">{{item.num}}</td><td width="15%">{{item.price}}</td></tr></tbody></table></div></div><div>商品总额：{{body.totalSpending}}</div><div><hr size=2 style="width:100%"><div class="guestInstructions" style="text-align: center;"><h4>其它</h4></div><div>配送费用：{{body.shippingFee}}</div><div>商品减免：{{body.reduceFee}}</div><div>减免原因：{{body.reduceReason}}</div><div>实收金额：{{body.actualSpending}}</div><div><hr size=2 style="border-style:dashed ;width:100%"><h2>请妥善保管好购物凭证</h2><h2>多谢惠顾</h2></div></div></div><script>var body2 = '+printArray+';</script><script>var vm;	vm = new Vue({	el: "#body",	data: {body: {}	}});	vm.body = body2;Vue.nextTick(print);	function print() {	document.execCommand("print")	}	</script></body></html>');
	}else if(t==15){//零售-现场销售
		myWindow.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>table {width: 48mm;table-layout: fixed;} table td {	border-top: none;word-wrap: break-word;}	h1 {	font-size: 16px;	text-align: center	} h2 {	font-size: 14px;	text-align: center}	#body {font-size: 13px;margin-left: 10px;padding: 0px;}#body .other_fee {	border-bottom: 1px solid #DADADA;}</style><script type="text/javascript" src="http://pic-static.fangzhizun.com/js/vue.min.1.0.js"></script></head><body style="background-color:#fff;width:48mm;"><div id="body" style="width:48mm;"><div class="other_fee"><div class="title"><h1>{{body.gongsi}}</h1><h2>现场支付订单</h2></div></div><div class="other_fee"><div class="paymentVoucher"><br /><table style="width: 100%;"><tbody>	<tr align="center" style="font-weight: 800;"><td>商品</td><td>数量</td><td>售价</td></tr><tr v-for="item in body.goods" align="center"><td width="25%">{{item.commodity}}</td><td width="15%">{{item.num}}</td><td width="15%">{{item.price}}</td></tr></tbody></table></div></div><br /><div>数量：{{body.num}}</div><div>商品总额：{{body.totalSpending}}</div><div>单号：{{body.saleNo}}</div><div style="text-align: right;font-weight: 800;">{{body.time}}</div><div><hr size=2 style="width:100%"><div>实收金额：{{body.actualSpending}}</div>	<div>找零：{{body.giveChange}}</div>	<div><hr size=2 style="border-style:dashed ;width:100%"><h2>请妥善保管好购物凭证</h2><h2>多谢惠顾</h2></div></div></div><script>var body2 = '+printArray+';	</script>	<script>	var vm;vm = new Vue({	el: "#body",	data: {	body: {}	}});	vm.body = body2;Vue.nextTick(print);	function print() {	document.execCommand("print")}</script></body></html>');
	}
}

//导航菜单权限判断 高级菜单
function checkMenuNew(loginPurview){
	loginPurview = JSON.parse(loginPurview);
	var deleteOneArray = [];  //待删除的一级目录
	var deleteTwoArray = [];  //待删除的二级目录
	var oneMenusArray = _menus1.menus;
	for(var i = 0; i < oneMenusArray.length; i++){//大版块
		var oneFlag= oneMenusArray[i].purviewNum;
		if(loginPurview[oneFlag] == undefined || loginPurview[oneFlag].length == 0){
			deleteOneArray.push(i);
		}else{
			var twoMenusArray = oneMenusArray[i].menus;
			for(var j = 0 ; j < twoMenusArray.length; j++){//小版块
				if(twoMenusArray[j].purviewNum.indexOf("#")>0){//二级目录
					//如果二级目录下的三级目录都没权限，则删除二级目录
					//twoFlag = ["L?14", "L?13", "L?15", "L?6", "L?7", "L?10"];
					var twoFlag= twoMenusArray[j].purviewNum.split("#");
					var threeFlag = 0;
					for (var k in twoFlag) {
						var a = twoFlag[k].split("?");
						if (loginPurview[a[0]] == undefined 
							|| loginPurview[a[0]].length == 0 
							|| loginPurview[a[0]][a[1]] == undefined 
							|| loginPurview[a[0]][a[1]]["a"] == 0) {
							threeFlag++;
						}
					}
					if(threeFlag == twoFlag.length){
						deleteTwoArray.push(i+","+j);
					}
				}else{
					var twoFlag= twoMenusArray[j].purviewNum.split("?");//A?1
					if (loginPurview[twoFlag[0]] == undefined 
						|| loginPurview[twoFlag[0]].length == 0 
						|| loginPurview[twoFlag[0]][twoFlag[1]] == undefined 
						|| loginPurview[twoFlag[0]][twoFlag[1]]["a"] == 0) {
						deleteTwoArray.push(i+","+j);
					}
				}
			}
		}
	}
	var deleteFlag = 0 ;
	var oneMenusFlag = '' ;
	for(var i in deleteTwoArray){
		var oneMenus = deleteTwoArray[i].split(',')[0];
		var twoMenus = deleteTwoArray[i].split(',')[1];
		if(oneMenusFlag!=oneMenus){
			oneMenusFlag = oneMenus;
			deleteFlag = 0;
		}
		_menus1.menus[oneMenus].menus.splice(parseInt(twoMenus-deleteFlag),1);
		deleteFlag++;
	}
	deleteFlag = 0 ;
	for(var i in deleteOneArray){
		_menus1.menus.splice(parseInt(deleteOneArray[i]-deleteFlag),1);
		deleteFlag++;
	}
}
//导航菜单权限判断 快捷菜单
function checkMenuSpeed(loginPurview){
	var loginPurviewLeft = $("#loginPurviewLeft").val();
	if(loginPurviewLeft=='' || loginPurviewLeft=="null"){
		return;
	}
	_speedMenus = {
		menus : JSON.parse(loginPurviewLeft)
	};
	$("#loginPurviewLeft").val('');
	loginPurview = JSON.parse(loginPurview);
	var menusArray = _speedMenus.menus;
	var deleteArray = [];
	for(var i = 0; i < menusArray.length; i++){
		var flag = menusArray[i].purviewNum.split("?");
		if (loginPurview[flag[0]] != undefined && (loginPurview[flag[0]].length == 0 || loginPurview[flag[0]][flag[1]]["a"] == 0)) {
			deleteArray.push(i);
		}
	}
	var deleteFlag = 0 ;
	for(var i in deleteArray){
		_speedMenus.menus.splice(parseInt(deleteArray[i]-deleteFlag),1);
		deleteFlag++;
	}
}


function alertAgainLogin(){
	$.messager.show({
		title:'连接不到服务器',
		msg:'请重新登录一下',
		timeout:9000,
		showType:'slide'
	});
}