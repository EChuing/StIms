/** *配置文件** */

//用户参数
var _allUserInfo = [];
var _userInfoData = [];
var _devFirstJson = [];
var _devFirstJson2 = [];
//设备品牌参数
var _brandJson = [];
var _brandSelect = [];
//设备菜单
var _deviceMenuJson=[];
var _devTypeMenuJson=[];
//可自定义的变量
var _contractNums = 0;
var _billNum = 0;
var _comfirmNum = 0;
var _doorplateno = 0;
var _wxpayAccount = 0;
var _shortRentAccount = 0;
var _shopAccount = 0;
var _shopCashAccount = 0;
var _newFinancial =[];
var _bankType =[];
var _taskType  = [];
var _userType  = [];
var _outsideCustomerSource  = [];
var _outsideCustomerType  = [];
var _outsideCustomerScale  = [];
var _outsideCustomerContactsPost  = [];
var _intendedSource =[];
var _eventApprovalType =[];
var _acountType =[];
var _assetsType = [];
var _chargePercentage = "";
var _chargeReminder = "";
var _suppliesType = "";
var _lateFeeRate = "";
var _chargingPlan = "";
var _timeOnAndOff = 2;
var _timeScope = "";	
var _wxgzhImgPath = "";
var _CompanyTelPhone="";


//归属类型
var _ownerShipType = [];
//客户类型
var _customerType=[];
//票据类型
var _billType=[];
//资产所属
var _saType = [];
//责任归属
var _repResponsibility = [];
//日常分类
var _dailyClassification=[];
//业主标记
var _NoOwner=0;
//获取加载此JS的页面名
var a = location.href;
var b = a.split("/");
var c = b.slice(b.length-1, b.length).toString(String).split(".");
d = c.slice(0, 1)[0];
//去掉JSON字符串头尾的双引号（public.js里也有，写这里是为了防止public还没加载完，调用getRealJsonStr函数会报错）
String.prototype.getRealJsonStr = function(){
	return this.substring(1,this.length-1)
};
//当加载的页面是主页面的时候从数据库里获取变量
if(d=="fg_main"){
	// //查询设备菜单
	// $.post("../queryDeviceMenu.action", {
	// }, function(data) {
	// 	data = data.body;
	// 	for (var i in data) {
	// 	if (i == 0) {
	// 		_deviceMenuJson.push({
	// 			idftName: data[i].idftName,
	// 			idftId: data[i].idftId,
	// 			idstName: [{
	// 				idstName: data[i].idstName,
	// 				idstId: data[i].idstId,
	// 			}],
	// 		});
	// 	} else {
	// 		var typeFlag = -1;
	// 		for (var j in _deviceMenuJson) {
	// 			if (_deviceMenuJson[j].idftName == data[i].idftName) {
	// 				typeFlag = j;
	// 				break;
	// 			}
	// 		}
	// 		if (typeFlag != -1) {
	// 			_deviceMenuJson[typeFlag].idstName.push({
	// 				idstName: data[i].idstName,
	// 				idstId: data[i].idstId,
	// 			});
	// 		}
	// 		else{
	// 			_deviceMenuJson.push({
	// 				idftName: data[i].idftName,
	// 				idftId: data[i].idftId,
	// 				idstName: [{
	// 					idstName: data[i].idstName,
	// 					idstId: data[i].idstId,
	// 				}],
	// 			});
	// 		}
	// 	}
	// }
	// });

	//一二级设备类型菜单
	$.post("../queryDevTypeMenu.action", {
	}, function(data) {
		data = data.body;
		for (var i in data) {
			if (i == 0) {
				// console.log("0 "+data[i].dftId+" "+data[i].dftName+" "+data[i].dstName+" "+data[i].dstId);
				_devTypeMenuJson.push({
					dftName: data[i].dftName,
					dftId: data[i].dftId,
					dstName: [{
						dstName: data[i].dstName,
						dstId: data[i].dstId,
					}],
				});
			} else {
				// console.log("1 "+data[i].dftId+" "+data[i].dftName+" "+data[i].dstName+" "+data[i].dstId);
				var typeFlag = -1;
				for (var j in _devTypeMenuJson) {
					if (_devTypeMenuJson[j].dftName == data[i].dftName) {
						typeFlag = j;
						break;
					}
				}
				if (typeFlag != -1) {
					// console.log("2 "+data[i].dftId+" "+data[i].dftName+" "+data[i].dstName+" "+data[i].dstId);
					_devTypeMenuJson[typeFlag].dstName.push({
						dstName: data[i].dstName,
						dstId: data[i].dstId,
					});
				}
				else{
					// console.log("3 "+data[i].dftId+" "+data[i].dftName+" "+data[i].dstName+" "+data[i].dstId);
					_devTypeMenuJson.push({
						dftName: data[i].dftName,
						dftId: data[i].dftId,
						dstName: [{
							dstName: data[i].dstName,
							dstId: data[i].dstId,
						}],
					});
				}
			}
		}
		// console.log(_devTypeMenuJson);
	});
	
	$.post("../queryUserByDepartmentID.action", {
	}, function(data) {
		data = data.body;
		for(var i in data){
			_userInfoData.push({
				suStoreId		: data[i].suStoreId,
				suDepartmentId	: data[i].suDepartmentId,
				userId			: data[i].userId,
				storefrontName	: data[i].storefrontName,
				departmentName	: data[i].departmentName,
				suStaffName		: data[i].suStaffName,
			});
			if(i==0){
				_allUserInfo.push({
					storeName:data[i].storefrontName,
					storeId:data[i].suStoreId,
					storeDep:[{
						depName:data[i].departmentName,
						depId:data[i].suDepartmentId,
						depUser:[{
							userName:data[i].suStaffName,
							userId:data[i].userId,
						}],
					}],
				});
			}else{
				var storeFlag = -1;
				var depFlag = -1;
				for(var j in _allUserInfo){
					if(_allUserInfo[j].storeId==data[i].suStoreId){
						storeFlag=j;
						break;
					}
				}
				if(storeFlag!=-1){
					for(var j in _allUserInfo[storeFlag].storeDep){
						if(_allUserInfo[storeFlag].storeDep[j].depId==data[i].suDepartmentId){
							depFlag=j;
							break;
						}
					}
					if(depFlag!=-1){
						_allUserInfo[storeFlag].storeDep[depFlag].depUser.push({
								userName:data[i].suStaffName,
								userId:data[i].userId,
						});
					}else{
						_allUserInfo[storeFlag].storeDep.push({
							depName:data[i].departmentName,
							depId:data[i].suDepartmentId,
							depUser:[{
								userName:data[i].suStaffName,
								userId:data[i].userId,
							}],
						});
					}
				}else{
					_allUserInfo.push({
						storeName:data[i].storefrontName,
						storeId:data[i].suStoreId,
						storeDep:[{
							depName:data[i].departmentName,
							depId:data[i].suDepartmentId,
							depUser:[{
								userName:data[i].suStaffName,
								userId:data[i].userId,
							}],
						}],
					});
				}
			}
		}
	});
	$.post("../selectSysVariables.action", {
		variablesId:1
	}, function(data) {
		if (data.code < 0) {
			$.messager.alert('通知', '操作失败！原因：' + data.msg, 'error');
			return;
		}
		data = data.body;
		for(var i in data[0]){
			if(i=='contractNums'){
				_contractNums = data[0][i];
			}else if(i=='billNum'){
				_billNum = data[0][i];
			}else if(i=='comfirmNum'){
				_comfirmNum = data[0][i];
			}else if(i=='doorplateno'){
				_doorplateno = data[0][i];
			}else if(i=='wxpayAccount'){ 
				_wxpayAccount = data[0][i];
			}else if(i=='wxgzhImgPath'){
				_wxgzhImgPath = data[0][i];
				console.log(_wxgzhImgPath)
			}else if(i=='shortRentAccount'){ 
				_shortRentAccount = data[0][i];
			}else if(i=='shopAccount'){ 
				_shopAccount = data[0][i];
			}else if(i=='shopCashAccount'){ 
				_shopCashAccount = data[0][i];
			}else if(i=='newFinancial'){
				_newFinancial = eval('(' + data[0][i].getRealJsonStr() + ')');
			}else if(i=='bankType'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_bankType = [];
				for(var j in variableJson){
					_bankType.push(variableJson[j].variable)
				}
			}else if(i=='intendedSource'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_intendedSource = [];
				for(var j in variableJson){
					_intendedSource.push(variableJson[j].variable)
				}
			}else if(i=='taskType'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_taskType = [];
				for(var j in variableJson){
					_taskType.push(variableJson[j].variable)
				}
			}else if(i=='userType'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_userType = [];
				for(var j in variableJson){
					_userType.push(variableJson[j].variable)
				}
			}else if(i=='outsideCustomerSource'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_outsideCustomerSource = [];
				for(var j in variableJson){
					_outsideCustomerSource.push(variableJson[j].variable);
				}
			}else if(i=='outsideCustomerType'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_outsideCustomerType = [];
				for(var j in variableJson){
					_outsideCustomerType.push(variableJson[j].variable);
				}
			}else if(i=='outsideCustomerScale'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_outsideCustomerScale = [];
				for(var j in variableJson){
					_outsideCustomerScale.push(variableJson[j].variable);
				}
			}else if(i=='outsideCustomerContactsPost'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				_outsideCustomerContactsPost = [];
				for(var j in variableJson){
					_outsideCustomerContactsPost.push(variableJson[j].variable);
				}
			} else if(i=='eventApprovalType'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				console.log(variableJson);
				_eventApprovalType = [];
				for(var j in variableJson){
					_eventApprovalType.push(variableJson[j].variable)
				}
			} else if(i=='acountType'){
				var variableJson = eval('(' + data[0][i].getRealJsonStr() + ')');
				console.log(variableJson);
				_acountType = [];
				for(var j in variableJson){
					_acountType.push(variableJson[j].variable)
				}
			}else if(i=='assetsType'){
				_assetsType = eval('(' + data[0][i].getRealJsonStr() + ')');
			}else if (i == 'chargePercentage') {
				_chargePercentage = data[0][i];
			}else if (i == 'chargeReminder') {
				_chargeReminder = data[0][i];
			}else if(i=='suppliesType'){
				_suppliesType = eval('(' + data[0][i].getRealJsonStr() + ')');
			}else if (i == 'lateFeeRate') {
				_lateFeeRate = data[0][i];
			}else if (i == 'chargingPlan') {
				_chargingPlan = eval('(' + data[0][i].getRealJsonStr() + ')');
				
			}else if(i == 'timeOnAndOff'){
				_timeOnAndOff = data[0][i];
			}else if(i == 'timeScope'){
				_timeScope = eval('(' + data[0][i].getRealJsonStr() + ')');
			}
		}
	});
  	//归属类型
	_ownerShipType = [ "租客", "业主", "意向人", "其他类", "非成本项目"];
  	//客户类型
    _customerType=['租客','住户','业主'];
  	//票据类型
    _billType=['租客每期收支','租客转租协议','租客退房出账','业主退房出账','租客退房审批','业主退房审批','业主应付款申请单','租客临时账单收支'];
    //资产所属
    _saType = [ '公司', '业主', '租赁'];
 	// 责任归属
    _repResponsibility = ["客户付费", "业主付费", "公司保修"];
    //日常分类
    _dailyClassification=['全部','房屋','日常','项目','供应商','库房','公区'];
    //无业主标记
    _NoOwner=0;
}else{
	//基础数据
	_loginUserName = parent._loginUserName;//登入用户姓名
	_loginUserId = parent._loginUserId;//登入用户id
	_loginPurview = parent._loginPurview;//用户权限
	_loginStore = parent._loginStore;//区域
	_loginDepartment = parent._loginDepartment;//部门
	_loginCompany = parent._loginCompany;//公司英文缩写
	_loginBrand = parent._loginBrand;//智能设备品牌
	_loginDeviceMenu=parent._loginDeviceMenu;//设备菜单+
	_loginDevTypeMenu=parent._loginDevTypeMenu;//设备一二级类型菜单+
	_loginCoId = parent._loginCoId;//数据id
	_loginCompanyName = parent._loginCompanyName;//公司名
	_loginCompanyRentProvince = parent._loginCompanyRentProvince;//省份
	_loginCompanyRentCity = parent._loginCompanyRentCity;//城市
	_loginCompanyRentDistrict = parent._loginCompanyRentDistrict;//城区
	_loginAuthoritySwitch = parent._loginAuthoritySwitch;//超级权限
	_loginType = parent._loginType;//用户类型
	_loginAntUserId = parent._loginAntUserId;//蚂蚁定义用户标识
    //变量数据
	_billType=parent._billType;
	_saType=parent._saType;
    _ownerShipType=parent._ownerShipType;
    _customerType=parent._customerType;
    _repResponsibility=parent._repResponsibility;
    _dailyClassification=parent._dailyClassification;
	_contractNums = parent._contractNums;
	 _NoOwner=parent._NoOwner;
	_billNum = parent._billNum;
	_comfirmNum = parent._comfirmNum;
	_doorplateno = parent._doorplateno;
	_wxpayAccount = parent._wxpayAccount;
	_shopAccount = parent._shopAccount;
	_shopCashAccount = parent._shopCashAccount;
	_shortRentAccount = parent._shortRentAccount;
	_newFinancial = parent._newFinancial;
	_bankType = parent._bankType;
	_taskType = parent._taskType;
	_userType = parent._userType;
	_outsideCustomerSource = parent._outsideCustomerSource;
	_outsideCustomerType = parent._outsideCustomerType;
	_outsideCustomerScale = parent._outsideCustomerScale;
	_outsideCustomerContactsPost = parent._outsideCustomerContactsPost;
	_intendedSource = parent._intendedSource;
	_eventApprovalType = parent._eventApprovalType;
	_acountType = parent._acountType;
	_assetsType = parent._assetsType;
	_chargePercentage = parent._chargePercentage;
	_chargeReminder = parent._chargeReminder;
	_allUserInfo = parent._allUserInfo;
	_userInfoData = parent._userInfoData;
	_suppliesType = parent._suppliesType;
	_brandJson = parent._brandJson;
	_brandSelect = parent._brandSelect;
	_deviceMenuJson=parent._deviceMenuJson;
	_devTypeMenuJson=parent._devTypeMenuJson;
	_lateFeeRate = parent._lateFeeRate;
	_chargingPlan = parent._chargingPlan;
	_wxgzhImgPath = parent._wxgzhImgPath;
	_timeOnAndOff = parent._timeOnAndOff;
	_timeScope = parent._timeScope;
	_devFirstJson=parent._devFirstJson;
	_devFirstJson2=parent._devFirstJson2;
}

//公告存储
var _mainNotic = [];
/*----------跳转暂存区相关----------*/
//暂存区JSON--用于输入框、下拉框等
var _skipToChildJson = [];
//暂存区JSON--用于方法
var _skipFunction = [];
if(d!="fg_main"){
	_skipToChildJson = parent._skipToChildJson;
}
if(d!="fg_main"){
	_skipFunction = parent._skipFunction;
}

//事务处理人
var _handlerIf = 0;
//事务发布人
var _publisher = 0;

/*
 * 不可自定义的静态变量
 * 
 * 
 * */
/*----------验证中文 数字 字母----------*/
// 字母
var _letterCheck = /[_a-zA-Z]/;
/*----------属性 类别配置----------*/
//押付
var _chargesPaid = [ "面议" , "押一付一" , "押一付二" , "押一付三" , "押二付一" , "押二付二" , "押三付一"];
// 房型
var _houseType = [ "精装房", "房中房", "毛坯房" ];
// 户型
var _sectionType = [ "复式", "1房0厅1卫", "1房1厅1卫", "2房1厅1卫","2房2厅1卫", "3房1厅1卫", "3房1厅2卫","3房2厅1卫",
		"4房1厅1卫", "4房1厅2卫", "5房1厅1卫", "5房1厅2卫" ];
// 默认隐藏的列
var _hrHideCols = [ "hrHouseDeposit", "hrSectionType", "hrHouseSquare",
		"hrHouseDirection", "hrHouseOwner", "hrRegisterTime", "hrLandlordId",
		"hrHouse4storeId", "hrUserId", "renterCoding", "wxOpenidIf" ];
//未租房默认隐藏的列
var _hsHideCols=["hsVacancyDay2","hsGuidePrice"];
// 租赁状态
var _hrLeaseState = [ "未租", "已租", "业主到期", "租客到期", "已定" ];
// 付租方式
var _hrPaymentType = [ "月付", "季付", "年付", "半年付"];
//var _hrPaymentType = [ "月付", "季付", "年付", "半年付", "全额付" ];

// 合同性质
var _contractType = [ "新签合同", "溢价合同", "续签合同", "换房合同", "原价续签", "降价续签", "原价合同" ];
// 朝向
var _direction = [ "东", "南", "西", "北", "东南", "西南", "东北", "西北", "东西", "南北" ];
// 是否判断
var _yesOrNo = [ "是", "否" ];
// 区域
var _theStore = [ "总部", "田贝分部" ];
// 入住性质
var _checkinCype = [ "住家", "办公", "茶馆", "库房", "写字楼" ];
// 退房手续状态
var _proceduresState = ["正常","未办手续"];
// 用途
var _househrState = [ "住宅", "写字楼", "商铺", "厂房", "商住", "仓库", "车位" ];
// 楼盘周边配套设施
var _facilityType = [ "教育", "商城", "医院" ];
// 租赁状态
var _leaseState = [ "空置未租","正在转租","到期不续","毁约待租", "已租" ];
// 房屋当前状态
var _state = [ "出租", "出售" ];
// 房东到期
var _dueTo = [ "未到期", "已到期" ];
// 欠费人员身份
var _ownerType = [ "房东", "租客" ];
// 欠费类型
var _arrearageType = [ "租客欠公司", "公司欠房东" ];
// 装修状态
var _decorStatus = [ "装修中", "完成" ];
// 装修进展
var _decorProcess = [ "勘察", "装修", "完工", "检查" ];
// 装修类型
var _decorType = [ "精装", "简装", "豪装" ];
// 文件类型
var _fileType = [ "电子文件", "实体文件" ];
// 收支方式或缴费途经
var _payType = [ "现钞", "转账", "刷卡", "支票"];
// 有无欠款
var _haveOrNotArrears = [ "有", "无" ];
// 房屋配置
var _furnitureConfig = [ "空房", "部分", "全齐" , "毛坯"];
// 租客类型
var _renterType = [ "求租", "求购", "已租", "已购", "暂缓", "无效" ];
// 客户期望时间
var _repHopeTime = [ "尽快", "今天", "明天", "后天", "本周末", "电话联系" ];

// 维修任务状态
var _repState = [ "未领取", "跟进中", "事件完成", "回访完成" ];
// 维修结算情况
var _billingInfo = [ "无结算", "现金结算", "签单月结" ];
// 维修回访结果
var _retResult = [ "回访完成", "未完成" ];
// 维修回访服务态度
var _retAttitude = [ "态度很好", "态度一般", "态度很差" ];
// 维修进展状态
var _proType = [ "未完成", "已完成" ];
// 维修类型
var _repairType = [ "客户维修", "空置维修" ];
// 事件类型
var _eventType = [ "租务维修", "空置维修", "退房维修", "微信报修", "保洁服务", "空置保洁", "设备维保", "公区维保", "装修维保"];
// 房源状态
var _saveHouseState = [ "传闻", "可租", "可售", "租售", "已租", "已售", "自住", "无效" ];
// 来源
var _houseSources = [ "上网", "网络", "朋友", "其它" ];
// 产权
var _houseProperty = [ "红本在手", "抵押贷款", "小产权", "未领证" ];
// 项目
var _virtualHouse = [ "内部项目", "外部项目", "非成本项目", "项目" ];

// 楼栋参数
var _buildingVal = {
	"num" : [ "1", "2", "3", "4", "5", "6", "7", "8", "9",
			"10", "11", "12", "13", "14", "15", "16", "17", "18",
			"19", "20", "81", "82", "83", "84", "85", "86", "87",
			"88", "89", "90", "91", "92", "93", "94", "95", "96",
			"97", "98", "99", "100" ],
	"letter" : [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
			"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
			"Z" ],
	"groupOne" : [ "1A", "1B", "1C", "1D", "2A", "2B", "2C", "2D", "3A", "3B",
			"3C", "3D", "4A", "4B", "4C", "4D" ],
	"groupTwo" : [ "A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2",
			"C3", "C4", "D1", "D2", "D3", "D4" ]
};
// 财务状态
var _auditState = [ "未审核", "已审核", "已复核", "审核不通过", "复核不通过", "被冲账", "无效" ];
// 冲账状态
var _strikeAbalanceStatus = [ "正常", "冲账", "被冲账" ];
// 收支归属类型
var _theOwnershipType = [ "租客", "业主", "意向人", "其他类", "非成本项目"];
// 项目收支归属类型
var _virtualTheOwnershipType = [ "内部项目", "外部项目", "非成本项目" ];
// 门牌号组成类型
var _doorplatenoType = [ "无用", "一位数字", "两位数字", "三位数字", "字母" ];
//门牌号组成类型
var _followWay = [ "普通联系", "400客服外呼", "400客服来电", "短信", "现场洽谈"];

var _doorplatenoTypeRegular = [ '', '[0-9]{1}', '[0-9]{2}', '[0-9]{3}', '[A-Z]{1}' ];
// 联动配置
// 部门与用户联动维护
var _depadepartment = [];
var _deptStaff = [];
// 地区联动维护
var _city = [];
var _district = [];
var _zone = [];
var _street = [];
var _community = [];
// 页码数组
var _pageNum = [ "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1",
		"1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1",
		"1", "1", "1", "1", "1", "1", "1", "1" ];
//index数组
var _indexNum = [ "0", "0","0","0","0","0","0","0","0","0","0","0","0","0"];
// 账户统计index
var _accountSumIndex = 0;
// 项目index
var _virtualIndex = 0;
// 收支联动
var _financial = {
	"get" : [ "押金类-房屋押金", "押金类-水电押金", "押金类-门卡押金", "押金类-车卡押金", "押金类-业主退房押金","押金类-定金", "押金类-装修押金", "押金类-信箱钥匙押金", "押金类-其他押金",
	        "能源类-水费", "能源类-电费","能源类-燃气费", "能源类-网络费", "能源类-电视", "能源类-物业管理费", "能源类-余款结算", 
	        "主营类-租金", "主营类-门卡工本费", "主营类-佣金服务费", "主营类-车位租金", "主营类-车位管理费", "主营类-代缴租赁管理费", "主营类-租赁管理服务费",
			"内部-材料费", "内部-人工费", "保洁费", "装修预收款", "换锁", "退房-材料费", 
			"违约类-违约金","违约类-滞纳金", "违约类-代缴手续费", "违约类-转租费用", 
			"其他类-代缴费用", "其他类-转账", 
			"财务类-税费", "财务类-废品折扣", "财务类-POS手续费", "财务类-财务费用", "财务类-资金调配",
			"债务类-借入款",
			"债权类-应收贷款", "债权类-应收利息款",
			"税费类-税费" 
			],
	"pay" : [ "押金类-房屋押金", "押金类-水电押金", "押金类-门卡押金", "押金类-车卡押金", "押金类-租户退房押金","押金类-定金", "押金类-装修押金", "押金类-代购款",
	        "能源类-水费", "能源类-电费", "能源类-燃气费", "能源类-网络费", "能源类-电视", "能源类-物业管理费", "能源类-余款结算", 
	        "主营类-租金", "主营类-佣金服务费", "主营类-车位租金", "主营类-车位管理费", 
	        "材料费", "人工费", "保洁费", "装修预收款", "换锁", 
	        "薪酬福利类-工资", "薪酬福利类-提成", "薪酬福利类-奖金","薪酬福利类-生活费", "薪酬福利类-社保", 
	        "其他类-代缴费用", "其他类-转账", "其他类-公关费","其他类-广告费", 
	        "违约类-违约金", "违约类-滞纳金", 
	        "办公成本类-办公室租金", "办公成本类-水费","办公成本类-电费", "办公成本类-气费", "办公成本类-桶装水", "办公成本类-办公费用", "办公成本类-电话费用","办公成本类-报销款", 
	        "设备采购类-家私款", "设备采购类-电器款", 
	        "财务类-记账费用", "财务类-税费","财务类-POS运营费", "财务类-财务费用", "财务类-资金调配", 
	        "债务类-应还款", "债务类-应还利息款",
			"债权类-贷出款", 
			"税费类-税费" ,
			"分红类-股东分红"
			],
	"other" : [ "租客欠结", "租客补结" ]
};

// 账户类型和账号联动
var _paymentNums = {
	'XJ' : [ "001", "002", "003" ],
	'ZZ' : [ "004", "005", "006" ],
	'POS' : [ "007", "008", "009" ],
	'WX' : [ "010", "011", "012" ],
	'ZFB' : [ "013", "014", "015" ]
};
// 账户类型
//var _acountType = [ '现金', '转账', 'POS', '微信', '支付宝', '债权', '负债' ,'其他' ];
//var _acountType = [ '现金A类', '现金B类', '现金备用', '债权', '负债' ];
// 账户状态
var _acountState = [ '正常', '注销', '异常' ];
// 资产使用情况
var _saUse = [ '未使用', '使用中', '已报废' ];
// 资产类型
var _saClassify = [ '家私电器', '办公用品' ];
// 资产状态
var _saStatus = [ '正常', '损坏', '丢失', '注销' ];
// 耗材类型
var _supType = [ '维修', '办公', '其他' ];
// 抄表类型
var _wegType = [ '水表', '电表', '燃气表' ];
// 抄表记录状态
var _wegState = [ '记录', '已算' ];
// 使用状态
var _wegUseState = [ '正常', '异常' ];
// 抄表性质
var _wegNature = [ '正常抄表', '交房抄表' ];
// 退房性质
var _renterCheckoutNature = [ '到期不续','租客转租', '租客毁约', '公司毁约' ];
var _landlordCheckoutNature = [ '正常退房', '房东毁约', '公司毁约' ];
// 分店状态
var _storeState = [ '正常', '注销' ];
// 部门状态
var _departmentState = [ '正常', '注销' ];
// 用户状态
var _userState = [ '正常', '注销', '离职' ];
// 公告类型
var _noticeType = [ "公司", "业务部", "财务部", "行政部", "租客", "业主"];
//
var _itemType = ['带客看房','退房','巡房','收款','维修','用餐','其他'];
//短信发送状态
var _smStatus = ['发送成功','发送失败','推送成功','推送失败'];
//短信类别
var _smType = ['发送','接收'];



// 左侧菜单栏 高级菜单
var _menus1 = {
		"menus" : [{
				"purviewNum" : "A",
				"icon" : "icon-yewuguanli",
				"menuname" : "租赁管理",
				"type" : "0",
				"menus" : [
					{
						"purviewNum" : "A?0",
						"menuname" : "房源资料",
						"icon" : "icon-panyuanguanli",
						"type" : "0",
						"url" : "fg_dataHouse.jsp"
					},{
						"purviewNum" : "A?1",
						"menuname" : "未租房间",
						"icon" : "icon-weizuguanli",
						"type" : "0",
						"url" : "fg_trusteeship.jsp"
					},{
						"purviewNum" : "A?2",
						"menuname" : "已租房间",
						"icon" : "icon-yizuguanli",
						"type" : "0",
						"url" : "fg_sourceInfo.jsp"
					},
					{
						"purviewNum" : "A?3",
						"menuname" : "退房办理",
						"icon" : "icon-tuifangguanli",
						"type" : "0",
						"url" : "fg_checkOut.jsp"
					},{
						"purviewNum" : "A?4",
						"menuname" : "外出登记",
						"icon" : "icon-waichudengji",
						"type" : "0",
						"url" : "fg_goout.jsp"
					},{
						"purviewNum" : "A?9",
						"menuname" : "合同管理",
						"icon" : "icon-hetongguanli",
						"type" : "0",
						"url" : "fg_contract.jsp"
					},{
						"purviewNum" : "A?10",
						"menuname" : "定金管理",
						"icon" : "icon-hetongguanli",
						"type" : "0",
						"url" : "fg_deposit.jsp"
					},{
						"purviewNum" : "A?5#A?6",
						"menuname" : "客户管理",
						"icon" : "icon-yuangongyonghuguanli",
						"type" : "1",
						"url" : ""
					},{
						"purviewNum" : "A?5",
						"menuname" : "意向客户",
						"icon" : "icon-zukeyixiangrenguanli",
						"type" : "2",
						"url" : "fg_intended.jsp"
					},{
						"purviewNum" : "A?6",
						"menuname" : "客户信息",
						"icon" : "icon-renkouguanli",
						"type" : "2",
						"url" : "fg_population.jsp"
					},
				]
			}, 
			{
				"purviewNum" : "K",
				"icon" : "icon-xinlingsou",
				"type" : "0",
				"menuname" : "客房管理",
				"menus" : [
					{
						"purviewNum" : "K?0",
						"menuname" : "营业房态",
						"icon" : "icon-yingyefangtai",
						"type" : "0",
						"url" : "fg_shortRent.jsp"
					},
					{
						"purviewNum" : "K?4",
						"menuname" : "房态图",
						"icon" : "icon-yingyefangtai",
						"type" : "0",
						"url" : "fg_shortRentDiagram.jsp"
					},
					{
						"purviewNum" : "K?1",
						"menuname" : "订单查询",
						"icon" : "icon-dingdanchaxun",
						"type" : "0",
						"url" : "fg_shortRentOrder.jsp"
					},					
					{
						"purviewNum" : "K?2",
						"menuname" : "客账查询",
						"icon" : "icon-kezhangchaxun",
						"type" : "0",
						"url" : "fg_shotRentBudget.jsp"
					},
					{
						"purviewNum" : "K?8",
						"menuname" : "挂账管理",
						"icon" : "icon-kezhangchaxun",
						"type" : "0",
						"url" : "fg_shortRentOnCredit.jsp"
					},
					{
						"purviewNum" : "K?3",
						"menuname" : "会员管理",
						"icon" : "icon-kerenguanli",
						"type" : "0",
						"url" : "fg_shortRentCustomer.jsp"
					},			
					{
						"purviewNum" : "K?5",
						"menuname" : "房间管理",
						"icon" : "icon-fangjianguanli",
						"type" : "0",
						"url" : "fg_shortRentHouse.jsp"
					},
					{
						"purviewNum" : "K?6",
						"menuname" : "交班交接",
						"icon" : "icon-jiaobanjiaojie",
						"type" : "0",
						"url" : "fg_shortRentShiftDuty.jsp"
					},
					{
						"purviewNum" : "K?7",
						"menuname" : "渠道管理",
						"icon" : "icon-qudaoguanli",
						"type" : "0",
						"url" : "fg_shortRentChannel.jsp"
					},

				]
			},
			{
				"purviewNum" : "T",
				"icon" : "icon-xinlingsou",
				"type" : "0",
				"menuname" : "民宿管理",
				"menus" : [
					{
						"purviewNum" : "T?0",
						"menuname" : "民宿房态",
						"icon" : "icon-yingyefangtai",
						"type" : "0",
						"url" : "fg_guestHouse.jsp"
					},
					{
						"purviewNum" : "T?4",
						"menuname" : "民宿房态图",
						"icon" : "icon-yingyefangtai",
						"type" : "0",
						"url" : "fg_guestHouseDiagram.jsp"
					},
					{
						"purviewNum" : "T?1",
						"menuname" : "民宿订单",
						"icon" : "icon-dingdanchaxun",
						"type" : "0",
						"url" : "fg_guestHouseOrder.jsp"
					},
					{
						"purviewNum" : "T?2",
						"menuname" : "民宿客账",
						"icon" : "icon-kezhangchaxun",
						"type" : "0",
						"url" : "fg_guestHouseBudget.jsp"
					},
					/*{
						"purviewNum" : "T?8",
						"menuname" : "民宿挂账",
						"icon" : "icon-kezhangchaxun",
						"type" : "0",
						"url" : "fg_guestHouseOnCredit.jsp"
					},*/
					{
						"purviewNum" : "T?3",
						"menuname" : "民宿会员",
						"icon" : "icon-kerenguanli",
						"type" : "0",
						"url" : "fg_guestHouseCustomer.jsp"
					},
					{
						"purviewNum" : "T?5",
						"menuname" : "民宿房间",
						"icon" : "icon-fangjianguanli",
						"type" : "0",
						"url" : "fg_guestHouseHouse.jsp"
					},
					/*{
						"purviewNum" : "T?7",
						"menuname" : "民宿渠道",
						"icon" : "icon-qudaoguanli",
						"type" : "0",
						"url" : "fg_guestHouseChannel.jsp"
					},
					{
						"purviewNum" : "T?4",
						"menuname" : "民宿酒店",
						"icon" : "icon-jiudianshezhi",
						"type" : "0",
						"url" : "fg_guestHouseSetUp.jsp"
					}*/
				]
			},
			{
				"purviewNum" : "R",
				"icon" : "icon-xinlingsou",
				"type" : "0",
				"menuname" : "客栈管理",
				"menus" : [
					{
						"purviewNum" : "R?0",
						"menuname" : "客栈房态",
						"icon" : "icon-yingyefangtai",
						"type" : "0",
						"url" : "fg_homestay.jsp"
					},					
					{
						"purviewNum" : "R?1",
						"menuname" : "客栈订单",
						"icon" : "icon-dingdanchaxun",
						"type" : "0",
						"url" : "fg_homestayOrder.jsp"
					},					
					{
						"purviewNum" : "R?2",
						"menuname" : "客栈客账",
						"icon" : "icon-kezhangchaxun",
						"type" : "0",
						"url" : "fg_homestayBudget.jsp"
					},					
					{
						"purviewNum" : "R?3",
						"menuname" : "客栈会员",
						"icon" : "icon-kerenguanli",
						"type" : "0",
						"url" : "fg_homestayCustomer.jsp"
					},			
					{
						"purviewNum" : "R?5",
						"menuname" : "客栈房间",
						"icon" : "icon-fangjianguanli",
						"type" : "0",
						"url" : "fg_homestayHouse.jsp"
					},
					{
						"purviewNum" : "R?6",
						"menuname" : "客栈交班",
						"icon" : "icon-jiaobanjiaojie",
						"type" : "0",
						"url" : "fg_homestayShiftDuty.jsp"
					},

					{
						"purviewNum" : "R?4",
						"menuname" : "客栈设置",
						"icon" : "icon-jiudianshezhi",
						"type" : "0",
						"url" : "fg_homestaySetUp.jsp"
					}

				]
			},
			{
				"purviewNum" : "I",
				"icon" : "icon-xinlingsou",
				"type" : "0",
				"menuname" : "零售管理",
				"menus" : [
				{
					"purviewNum" : "I?1",
					"menuname" : "销售管理",
					"icon" : "icon-xiaoshou",
					"type" : "0",
					"url" : "fg_shopOrder.jsp"
				},
				{
					"purviewNum" : "I?0",
					"menuname" : "库存管理",
					"icon" : "icon-cangku",
					"type" : "0",
					"url" : "fg_shopGoodsManagement.jsp"
				},
				{
					"purviewNum" : "I?2",
					"menuname" : "商店设置",
					"icon" : "icon-cangku",
					"type" : "0",
					"url" : "fg_shopStoreSetup.jsp"
				},
				{
					"purviewNum" : "I?3",
					"menuname" : "优惠方案",
					"icon" : "icon-cangku",
					"type" : "0",
					"url" : "fg_shopConcessionScheme.jsp"
				},{
					"purviewNum" : "I?3",
					"menuname" : "客户管理",
					"icon" : "icon-renkouguanli",
					"type" : "0",
					"url" : "fg_customerManagement2.jsp"
				},
				]
			},
			{
				"purviewNum" : "Q",
				"icon" : "icon-xiaoshouguanli",
				"type" : "0",
				"menuname" : "销售管理",
				"menus" : [
				{
					"purviewNum" : "Q?0",
					"menuname" : "客户管理",
					"icon" : "icon-renkouguanli",
					"type" : "0",
					"url" : "fg_customerManagement.jsp"
				},
				{
					"purviewNum" : "Q?1",
					"menuname" : "线上订单",
					"icon" : "icon-xiaoshou",
					"type" : "0",
					"url" : "fg_salesOrder.jsp"
				},
				{
					"purviewNum" : "Q?2",
					"menuname" : "销售开单",
					"icon" : "icon-xiaoshou",
					"type" : "0",
					"url" : "fg_orderNotes.jsp"
				},
				{
					"purviewNum" : "Q?3",
					"menuname" : "销售记录",
					"icon" : "icon-xiaoshou",
					"type" : "0",
					"url" : "fg_saleRecord.jsp"
				},
				{
					"purviewNum" : "Q?4",
					"menuname" : "客户关怀",
					"icon" : "icon-care",
					"type" : "0",
					"url" : "fg_customerCare.jsp"
				},
				{
					"purviewNum" : "Q?5",
					"menuname" : "库存管理",
					"icon" : "icon-cangku",
					"type" : "0",
					"url" : "fg_saleGoodsManagement.jsp"
				}
				]
			},
			{
				"purviewNum" : "J",
				"icon" : "icon-shebeiguanli",
				"type" : "0",
				"menuname" : "智能设备",
				"menus" : [
					{
						"purviewNum" : "J?0",
						"menuname" : "设备预警",
						"icon" : "icon-shebeiguanli",
						"type" : "0",
						"url" : "fg_management2.jsp"
					},
					{
						"purviewNum" : "J?1",
						"menuname" : "设备列表",
						"icon" : "icon-shebeiguanli",
						"type" : "0",
						"url" : "fg_intelligence.jsp"
					},
					{
						"purviewNum" : "J?2",
						"menuname" : "能源信息",
						"icon" : "icon-shebeiguanli",
						"type" : "0",
						"url" : "fg_energyInformation.jsp"
					},
					{
						"purviewNum" : "J?3",
						"menuname" : "集控设置",
						"icon" : "icon-shebeiguanli",
						"type" : "0",
						"url" : "fg_centralizedControlSettings.jsp"
					},
					{
						"purviewNum" : "J?4",
						"menuname" : "公区集控",
						"icon" : "icon-haocaiguanli",
						"type" : "0",
						"url" : "fg_officeAreaDeviceControl.jsp"
					},
					{
						"purviewNum" : "J?5",
						"menuname" : "公寓集控",
						"icon" : "icon-weizuguanli",
						"type" : "0",
						"url" : "fg_apartmentDeviceControl.jsp"
					},
					{
						"purviewNum" : "J?6",
						"menuname" : "酒店集控",
						"icon" : "icon-hotel",
						"type" : "0",
						"url" : "fg_hotelDeviceControl.jsp"
					},{
						"purviewNum" : "J?7",
						"menuname" : "设备集控",
						"icon" : "icon-kezhangchaxun",
						"type" : "0",
						"url" : "shool_officeAreaDeviceControl.jsp"
					},
					{
						"purviewNum" : "J?8",
						"menuname" : "定时集控",
						"icon" : "icon-kezhangchaxun",
						"type" : "0",
						"url" : "school_timingCentralizedControl.jsp"
					},{
							"purviewNum" : "J?9",
							"menuname" : "房间列表",
							"icon" : "icon-fangwuzidian",
							"type" : "0",
							"url" : "fg_houseRoomList.jsp"
					}
				]
			},
			{
				"purviewNum" : "B",
				"icon" : "icon-caiwuguanli",
				"type" : "0",
				"menuname" : "财务管理",
				"menus" : [
					{
						"purviewNum" : "B?0",
						"menuname" : "收支管理",
						"icon" : "icon-shouzhiluru",
						"type" : "0",
						"url" : "fg_financial.jsp"
					}, {
						"purviewNum" : "B?2",
						"menuname" : "业主账单",
						"icon" : "icon-fangdongyingfukuan",
						"type" : "0",
						"url" : "fg_payableToLandlord.jsp"
					}, {
						"purviewNum" : "B?3",
						"menuname" : "租客账单",
						"icon" : "icon-zukeyingshoukuan",
						"type" : "0",
						"url" : "fg_monthlyBills.jsp"
					}, {
						"purviewNum" : "B?4",
						"menuname" : "历史打印",
						"icon" : "icon-lishipiaojudayin",
						"type" : "0",
						"url" : "fg_historyPrint.jsp"
					},
					{
						"purviewNum" : "B?5",
						"menuname" : "合同票据",
						"icon" : "icon-heyuebianhaoguanli",
						"type" : "0",
						"url" : "fg_contractNum.jsp"
					},
					{
						"purviewNum" : "B?6",
						"menuname" : "综合修改",
						"icon" : "icon-zonghexiugai",
						"type" : "0",
						"url" : "fg_comprehensiveModification.jsp"
					},
					{
						"purviewNum" : "F?0#F?1#F?2#F?3#F?4#F?5#F?6",
						"menuname" : "报表管理",
						"icon" : "icon-baobiaocelue",
						"type" : "1",
						"url" : ""
					},
					{
						"purviewNum" : "F?0",
						"menuname" : "绩效统计",
						"icon" : "icon-yuangongkaohebiao",
						"type" : "2",
						"url" : "fg_achievementData.jsp"
					},
					{
						"purviewNum" : "F?1",
						"menuname" : "房屋生态",
						"icon" : "icon-fangyuancaiwushengtaitongji",
						"type" : "2",
						"url" : "fg_houseFinancialEcology.jsp"
					},
					{
						"purviewNum" : "F?2",
						"menuname" : "企业盈亏",
						"icon" : "icon-caiwukuaizhao",
						"type" : "2",
						"url" : "fg_financialDailyData.jsp"
					},
					{
						"purviewNum" : "F?3",
						"menuname" : "公司成本",
						"icon" : "icon-gongsichengbentongji",
						"type" : "2",
						"url" : "fg_companyCost.jsp"
					},
					{
						"purviewNum" : "F?4",
						"menuname" : "租价分布",
						"icon" : "icon-fangyuanzujintongji",
						"type" : "2",
						"url" : "fg_housePriceStatistics.jsp"
					},
					{
						"purviewNum" : "F?5",
						"menuname" : "免租收益",
						"icon" : "icon-mianzuqishouyiyuce",
						"type" : "2",
						"url" : "fg_landFreeEarnings.jsp"
					},
					{
						"purviewNum" : "F?6",
						"menuname" : "空置状况",
						"icon" : "icon-kongzhichengbentongji",
						"type" : "2",
						"url" : "fg_vacantCost.jsp"
					},
				]
			},
			{
				"purviewNum" : "C",
				"icon" : "icon-xingzhengguanli",
				"type" : "0",
				"menuname" : "行政管理",
				"menus" : [
					{
						"purviewNum" : "C?0",
						"menuname" : "资产",
						"icon" : "icon-zichanguanli",
						"type" : "0",
						"url" : "fg_asset.jsp"
					},  {
						"purviewNum" : "C?1",
						"menuname" : "维保",
						"icon" : "icon-weixiuguanli",
						"type" : "0",
						"url" : "fg_repair.jsp"
					}, {
						"purviewNum" : "C?2",
						"menuname" : "审批",
						"icon" : "icon-shiwushenpi",
						"type" : "0",
						"url" : "fg_eventApproval.jsp"
					}, {
						"purviewNum" : "C?3",
						"menuname" : "任务",
						"icon" : "icon-xiangmushiwu",
						"type" : "0",
						"url" : "fg_task.jsp"
					}, 
					{
						"purviewNum" : "C?4",
						"menuname" : "项目",
						"icon" : "icon-xiangmuguanli",
						"type" : "0",
						"url" : "fg_virtual.jsp"
					},
					{
						"purviewNum" : "C?5",
						"menuname" : "抄表",
						"icon" : "icon-chaobiaoguanli",
						"type" : "0",
						"url" : "fg_meter.jsp"
					}, 
					
					{
						"purviewNum" : "C?6",
						"menuname" : "公告",
						"icon" : "icon-tongzhigonggao",
						"type" : "0",
						"url" : "fg_notice.jsp"
					},
                    {
                        "purviewNum" : "C?11",
                        "menuname" : "专题",
                        "icon" : "icon-kezhangchaxun",
                        "type" : "0",
                        "url" : "fg_subject.jsp"
                    },
					{
						"purviewNum" : "C?7#C?8#C?9#C?10",
						"menuname" : "其他管理",
						"icon" : "icon-qitaguanli",
						"type" : "1",
						"url" : ""
					},
					{
						"purviewNum" : "C?7",
						"menuname" : "文件",
						"icon" : "icon-wenjianguiguanli",
						"type" : "2",
						"url" : "fg_file.jsp"
					},
					{
						"purviewNum" : "C?8",
						"menuname" : "库房",
						"icon" : "icon-haocaiguanli",
						"type" : "2",
						"url" : "fg_warehouseManagement.jsp"
					}, {
						"purviewNum" : "C?9",
						"menuname" : "商家",
						"icon" : "icon-gongyingshangguanli",
						"type" : "2",
						"url" : "fg_projectSupplier.jsp"
					},
					{
						"purviewNum" : "C?10",
						"menuname" : "公区",
						"icon" : "icon-haocaiguanli",
						"type" : "2",
						"url" : "fg_officeAreaManagement.jsp"
					},
					{
						"purviewNum" : "F?7#F?8#F?9#F?10#F?11",
						"menuname" : "报表管理",
						"icon" : "icon-baobiaocelue",
						"type" : "1",
						"url" : ""
					},
					{
						"purviewNum" : "F?7",
						"menuname" : "短信记录",
						"icon" : "icon-duanxinguanli",
						"type" : "2",
						"url" : "fg_shortMessage.jsp"
					},
					{
						"purviewNum" : "F?8",
						"menuname" : "受益归属",
						"icon" : "icon-yejifenchengguanli",
						"type" : "2",
						"url" : "fg_assistance.jsp"
					},
					{
						"purviewNum" : "F?9",
						"menuname" : "客户来源",
						"icon" : "icon-kehulaiyuantongji",
						"type" : "2",
						"url" : "fg_customerSourceStatistics.jsp"
					},
					{
						"purviewNum" : "F?10",
						"menuname" : "到期分布",
						"icon" : "icon-zuketuifangcaoyuce",
						"type" : "2",
						"url" : "fg_rentCheckout.jsp"
					},
					{
						"purviewNum" : "F?11",
						"menuname" : "数据日历",
						"icon" : "icon-laobandarili",
						"type" : "2",
						"url" : "fg_bossCalendar.jsp"
					}
				]
			},
			{
				"purviewNum" : "D",
				"icon" : "icon-renshiguanli",
				"menuname" : "人事管理",
				"menus" : [{
						"purviewNum" : "D?0",
						"menuname" : "用户管理",
						"icon" : "icon-yuangongyonghuguanli",
						"type" : "0",
						"url" : "fg_user.jsp"
					},
					{
					"purviewNum" : "D?5",
					"menuname" : "学生管理",
					"icon" : "icon-yuangongyonghuguanli",
					"type" : "0",
					"url" : "school_student.jsp"
					},
					{
						"purviewNum" : "D?2",
						"menuname" : "权限管理",
						"icon" : "icon-yuangongquanxianguanli",
						"type" : "0",
						"url" : "fg_purview.jsp"
					},
					{
						"purviewNum" : "D?3",
						"menuname" : "考勤管理",
						"icon" : "icon-p_lishibaobiao",
						"type" : "0",
						"url" : "fg_attendanceReport.jsp"
					},

					{
						"purviewNum" : "D?4",
						"menuname" : "教师管理",
						"icon" : "icon-yuangongyonghuguanli",
						"type" : "0",
						"url" : "school_teacher.jsp"
					}
				]
			},
			{
				"purviewNum" : "H",
				"icon" : "icon-fabu",
				"type" : "0",
				"menuname" : "发布管理",
				"menus" : [{
						"purviewNum" : "H?0#H?1",
						"menuname" : "58房源发布",
						"icon" : "icon-58logo",
						"type" : "1",
						"url" : ""
					}, {
						"purviewNum" : "H?0",
						"menuname" : "58分散式发布",
						"icon" : "icon-58logo",
						"type" : "2",
						"url" : "fg_58PushHouse.jsp"
					}, {
						"purviewNum" : "H?1",
						"menuname" : "58集中式发布",
						"icon" : "icon-58logo",
						"type" : "2",
						"url" : "fg_58PushRoom.jsp"
					}, {
						"purviewNum" : "H?2#H?3",
						"menuname" : "贝壳房源发布",
						"icon" : "icon-beike",
						"type" : "1",
						"url" : ""
					}, {
						"purviewNum" : "H?2",
						"menuname" : "贝壳分散式发布",
						"icon" : "icon-beike",
						"type" : "2",
						"url" : "fg_beikePushHouse.jsp"
					}, {
						"purviewNum" : "H?3",
						"menuname" : "贝壳集中式发布",
						"icon" : "icon-beike",
						"type" : "2",
						"url" : "fg_beikePushRoom.jsp"
					}, {
						"purviewNum" : "H?5",
						"menuname" : "精品房源发布",
						"icon" : "icon-jingpin",
						"type" : "0",
						"url" : "fg_realPushHouse.jsp"
					}, {
						"purviewNum" : "H?6",
						"menuname" : "至尊寓发布",
						"icon" : "icon-huangguan",
						"type" : "0",
						"url" : "fg_zzyPushHouse.jsp"
					}, {
						"purviewNum" : "H?7",
						"menuname" : "网络门店",
						"icon" : "icon-wxgzh",
						"type" : "0",
						"url" : "fg_wxgzhPushHouse.jsp"
					}, {
						"purviewNum" : "H?4",
						"menuname" : "京东租房",
						"icon" : "icon-jingdong",
						"type" : "0",
						"url" : "fg_beikePushHouse.jsp"
					}
				]
			}, 
			{
				"purviewNum" : "E",
				"icon" : "icon-xitongshezhi",
				"type" : "0",
				"menuname" : "系统设置",
				"menus" : [{
						"purviewNum" : "E?0",
						"menuname" : "房屋字典",
						"icon" : "icon-fangwuzidian",
						"type" : "0",
						"url" : "fg_houseDic.jsp"//fg_houseDic
					}, {
						"purviewNum" : "E?1",
						"menuname" : "计费方案",
						"icon" : "icon-jifeifangan",
						"type" : "0",
						"url" : "fg_planTable.jsp"
					},  {
						"purviewNum" : "E?3",
						"menuname" : "个人设置",
						"icon" : "icon-gerenshezhi",
						"type" : "0",
						"url" : "fg_personalSettings.jsp"
					},  {
						"purviewNum" : "E?2",
						"menuname" : "初始设置",
						"icon" : "icon-bianliangshezhi",
						"type" : "0",
						"url" : "fg_variable.jsp"
					},
				]
			},
			{
				"purviewNum" : "S",
				"icon" : "icon-xinlingsou",
				"type" : "0",
				"menuname" : "校园管理",
				"menus" : [
					{
						"purviewNum" : "S?0",
						"menuname" : "教室管理",
						"icon" : "icon-yingyefangtai",
						"type" : "0",
						"url" : "school_classroom.jsp"
					},
					{
						"purviewNum" : "S?1",
						"menuname" : "办公室管理",
						"icon" : "icon-dingdanchaxun",
						"type" : "0",
						"url" : "school_office.jsp"
					},
					{
						"purviewNum" : "S?2",
						"menuname" : "公区管理",
						"icon" : "icon-haocaiguanli",
						"type" : "0",
						"url" : "shool_commonAreaManagement.jsp"
					}
				]
			}

		]
	};
//左侧菜单栏 快捷菜单
var _speedMenus = [];
var _speedMenusAll = [{
	"purviewNum" : "A?0",
	"tabname" : "房源资料",
	"menuname" : "房源资料",
	"icon" : "icon-panyuanguanli",
	"url" : "fg_dataHouse.jsp",
	"imgurl" : "icon-panyuanguanli"
}, {
	"purviewNum" : "A?1",
	"tabname" : "未租房间",
	"menuname" : "未租房间",
	"icon" : "icon-weizuguanli",
	"url" : "fg_trusteeship.jsp",
	"imgurl" : "icon-weizuguanli"
}, {
	"purviewNum" : "A?2",
	"tabname" : "已租房间",
	"menuname" : "已租房间",
	"icon" : "icon-yizuguanli",
	"url" : "fg_sourceInfo.jsp",
	"imgurl" : "icon-yizuguanli"
}, {
	"purviewNum" : "A?3",
	"tabname" : "退房办理",
	"menuname" : "退房办理",
	"icon" : "icon-tuifangguanli",
	"url" : "fg_checkOut.jsp",
	"imgurl" : "icon-tuifangguanli"
}, {
	"purviewNum" : "A?4",
	"tabname" : "外出登记",
	"menuname" : "外出登记",
	"icon" : "icon-waichudengji",
	"url" : "fg_goout.jsp",
	"imgurl" : "icon-waichudengji"
}, {
	"purviewNum" : "A?5",
	"tabname" : "意向客户",
	"menuname" : "意向客户",
	"icon" : "icon-zukeyixiangrenguanli",
	"url" : "fg_intended.jsp",
	"imgurl" : "icon-zukeyixiangrenguanli"
}, {
	"purviewNum" : "A?6",
	"tabname" : "客户信息",
	"menuname" : "客户信息",
	"icon" : "icon-renkouguanli",
	"url" : "fg_population.jsp",
	"imgurl" : "icon-renkouguanli"
}, {
	"purviewNum" : "A?9",
	"tabname" : "合同管理",
	"menuname" : "合同管理",
	"icon" : "icon-hetongguanli",
	"url" : "fg_contract.jsp",
	"imgurl" : "icon-hetongguanli"
},{
	"purviewNum" : "A?10",
	"tabname" : "定金管理",
	"menuname" : "定金管理",
	"icon" : "icon-hetongguanli",
	"url" : "fg_deposit.jsp",
	"imgurl" : "icon-hetongguanli"
},{
	"purviewNum" : "K?0",
	"tabname" : "营业房态",
	"menuname" : "营业房态",
	"icon" : "icon-yingyefangtai",
	"url" : "fg_shortRent.jsp",
	"imgurl" : "icon-yingyefangtai"
},{
	"purviewNum" : "K?4",
	"tabname" : "房态图",
	"menuname" : "房态图",
	"icon" : "icon-yingyefangtai",
	"url" : "fg_shortRentDiagram.jsp",
	"imgurl" : "icon-yingyefangtai"
},{
	"purviewNum" : "K?1",
	"tabname" : "订单查询",
	"menuname" : "订单查询",
	"icon" : "icon-dingdanchaxun",
	"url" : "fg_shortRentOrder.jsp",
	"imgurl" : "icon-dingdanchaxun"
}, {
	"purviewNum" : "K?2",
	"tabname" : "客账查询",
	"menuname" : "客账查询",
	"icon" : "icon-kezhangchaxun",
	"url" : "fg_shotRentBudget.jsp",
	"imgurl" : "icon-kezhangchaxun"
},{
	"purviewNum" : "K?8",
	"tabname" : "挂账管理",
	"menuname" : "挂账管理",
	"icon" : "icon-kezhangchaxun",
	"url" : "fg_shotRentBudget.jsp",
	"imgurl" : "icon-kezhangchaxun"
},{
	"purviewNum" : "K?3",
	"tabname" : "会员管理",
	"menuname" : "会员管理",
	"icon" : "icon-kerenguanli",
	"url" : "fg_shortRentCustomer.jsp",
	"imgurl" : "icon-kerenguanli"
},{
	"purviewNum" : "K?5",
	"tabname" : "房间管理",
	"menuname" : "房间管理",
	"icon" : "icon-fangjianguanli",
	"url" : "fg_shortRentHouse.jsp",
	"imgurl" : "icon-fangjianguanli"
},{
	"purviewNum" : "K?6",
	"tabname" : "交班交接",
	"menuname" : "交班交接",
	"icon" : "icon-jiaobanjiaojie",
	"url" : "fg_shortRentShiftDuty.jsp",
	"imgurl" : "icon-jiaobanjiaojie"
},{
	"purviewNum" : "K?7",
	"tabname" : "渠道管理",
	"menuname" : "渠道管理",
	"icon" : "icon-qudaoguanli",
	"url" : "fg_shortRentChannel.jsp",
	"imgurl" : "icon-qudaoguanli"
		
},{
	"purviewNum" : "T?0",
	"tabname" : "民宿房态",
	"menuname" : "民宿房态",
	"icon" : "icon-yingyefangtai",
	"url" : "fg_guestHouse.jsp",
	"imgurl" : "icon-yingyefangtai"
},{
	"purviewNum" : "T?1",
	"tabname" : "民宿订单",
	"menuname" : "民宿订单",
	"icon" : "icon-dingdanchaxun",
	"url" : "fg_guestHouseOrder.jsp",
	"imgurl" : "icon-dingdanchaxun"
}, /*{
	"purviewNum" : "T?2",
	"tabname" : "民宿客账",
	"menuname" : "民宿客账",
	"icon" : "icon-kezhangchaxun",
	"url" : "fg_guestHouseBudget.jsp",
	"imgurl" : "icon-kezhangchaxun"
},*/{
	"purviewNum" : "T?8",
	"tabname" : "民宿挂账",
	"menuname" : "民宿挂账",
	"icon" : "icon-kezhangchaxun",
	"url" : "fg_guestHouseBudget.jsp",
	"imgurl" : "icon-kezhangchaxun"
},{
	"purviewNum" : "T?3",
	"tabname" : "民宿会员",
	"menuname" : "民宿会员",
	"icon" : "icon-kerenguanli",
	"url" : "fg_guestHouseCustomer.jsp",
	"imgurl" : "icon-kerenguanli"
},{
	"purviewNum" : "T?5",
	"tabname" : "民宿房间",
	"menuname" : "民宿房间",
	"icon" : "icon-fangjianguanli",
	"url" : "fg_guestHouseHouse.jsp",
	"imgurl" : "icon-fangjianguanli"
},{
	"purviewNum" : "T?6",
	"tabname" : "民宿交班",
	"menuname" : "民宿交班",
	"icon" : "icon-jiaobanjiaojie",
	"url" : "fg_guestHouseShiftDuty.jsp",
	"imgurl" : "icon-jiaobanjiaojie"
},{
	"purviewNum" : "R?0",
	"tabname" : "客栈房态",
	"menuname" : "客栈房态",
	"icon" : "icon-yingyefangtai",
	"url" : "fg_homestay.jsp",
	"imgurl" : "icon-yingyefangtai"
},{
	"purviewNum" : "R?1",
	"tabname" : "客栈订单",
	"menuname" : "客栈订单",
	"icon" : "icon-dingdanchaxun",
	"url" : "fg_homestayOrder.jsp",
	"imgurl" : "icon-dingdanchaxun"
}, {
	"purviewNum" : "R?2",
	"tabname" : "客栈客账",
	"menuname" : "客栈客账",
	"icon" : "icon-kezhangchaxun",
	"url" : "fg_homestayBudget.jsp",
	"imgurl" : "icon-kezhangchaxun"
},{
	"purviewNum" : "R?3",
	"tabname" : "客栈会员",
	"menuname" : "客栈会员",
	"icon" : "icon-kerenguanli",
	"url" : "fg_homestayCustomer.jsp",
	"imgurl" : "icon-kerenguanli"
},{
	"purviewNum" : "R?5",
	"tabname" : "客栈房间",
	"menuname" : "客栈房间",
	"icon" : "icon-fangjianguanli",
	"url" : "fg_homestayHouse.jsp",
	"imgurl" : "icon-fangjianguanli"
},{
	"purviewNum" : "R?6",
	"tabname" : "客栈交班",
	"menuname" : "客栈交班",
	"icon" : "icon-jiaobanjiaojie",
	"url" : "fg_homestayShiftDuty.jsp",
	"imgurl" : "icon-jiaobanjiaojie"
},{
	"purviewNum" : "R?4",
	"tabname" : "客栈设置",
	"menuname" : "客栈设置",
	"icon" : "icon-jiudianshezhi",
	"url" : "fg_homestaySetUp.jsp",
	"imgurl" : "icon-jiudianshezhi"
},{
	"purviewNum" : "B?0",
	"tabname" : "收支管理",
	"menuname" : "收支管理",
	"icon" : "icon-shouzhiluru",
	"url" : "fg_financial.jsp",
	"imgurl" : "icon-shouzhiluru"
}, {
	"purviewNum" : "B?1",
	"tabname" : "收款账户",
	"menuname" : "收款账户",
	"icon" : "icon-shouzhizhanghuguanli",
	"url" : "fg_accountSummary.jsp",
	"imgurl" : "icon-shouzhizhanghuguanli"
}, {
	"purviewNum" : "B?2",
	"tabname" : "业主账单",
	"menuname" : "业主账单",
	"icon" : "icon-fangdongyingfukuan",
	"url" : "fg_payableToLandlord.jsp",
	"imgurl" : "icon-fangdongyingfukuan"
}, {
	"purviewNum" : "B?3",
	"tabname" : "租客账单",
	"menuname" : "租客账单",
	"icon" : "icon-zukeyingshoukuan",
	"url" : "fg_monthlyBills.jsp",
	"imgurl" : "icon-zukeyingshoukuan"
}, {
	"purviewNum" : "B?4",
	"tabname" : "历史打印",
	"menuname" : "历史打印",
	"icon" : "icon-lishipiaojudayin",
	"url" : "fg_historyPrint.jsp",
	"imgurl" : "icon-lishipiaojudayin"
}, {
	"purviewNum" : "B?5",
	"tabname" : "合同票据",
	"menuname" : "合同票据",
	"icon" : "icon-heyuebianhaoguanli",
	"url" : "fg_contractNum.jsp",
	"imgurl" : "icon-heyuebianhaoguanli"
}, {
	"purviewNum" : "B?6",
	"tabname" : "综合修改",
	"menuname" : "综合修改",
	"icon" : "icon-zonghexiugai",
	"url" : "fg_comprehensiveModification.jsp",
	"imgurl" : "icon-zonghexiugai"
}, {
	"purviewNum" : "C?0",
	"tabname" : "资产",
	"menuname" : "资产",
	"icon" : "icon-zichanguanli",
	"url" : "fg_asset.jsp",
	"imgurl" : "icon-zichanguanli"
}, {
	"purviewNum" : "C?1",
	"tabname" : "维保",
	"menuname" : "维保",
	"icon" : "icon-weixiuguanli",
	"url" : "fg_repair.jsp",
	"imgurl" : "icon-weixiuguanli"
}, {
	"purviewNum" : "C?2",
	"tabname" : "审批",
	"menuname" : "审批",
	"icon" : "icon-shiwushenpi",
	"url" : "fg_eventApproval.jsp",
	"imgurl" : "icon-shiwushenpi"
}, {
	"purviewNum" : "C?3",
	"tabname" : "任务",
	"menuname" : "任务",
	"icon" : "icon-xiangmushiwu",
	"url" : "fg_task.jsp",
	"imgurl" : "icon-xiangmushiwu"
}, {
	"purviewNum" : "C?4",
	"tabname" : "项目",
	"menuname" : "项目",
	"icon" : "icon-xiangmuguanli",
	"url" : "fg_virtual.jsp",
	"imgurl" : "icon-xiangmuguanli"
}, {
	"purviewNum" : "C?5",
	"tabname" : "抄表",
	"menuname" : "抄表",
	"icon" : "icon-chaobiaoguanli",
	"url" : "fg_meter.jsp",
	"imgurl" : "icon-chaobiaoguanli"
}, {
	"purviewNum" : "C?6",
	"tabname" : "公告",
	"menuname" : "公告",
	"icon" : "icon-tongzhigonggao",
	"url" : "fg_notice.jsp",
	"imgurl" : "icon-tongzhigonggao"
},{
	"purviewNum" : "C?7",
	"tabname" : "专题",
	"menuname" : "专题",
	"icon" : "icon-yingyefangtai",
	"url" : "fg_subject.jsp",
	"imgurl" : "icon-yingyefangtai"
},{
	"purviewNum" : "C?8",
	"tabname" : "文件",
	"menuname" : "文件",
	"icon" : "icon-wenjianguiguanli",
	"url" : "fg_file.jsp",
	"imgurl" : "icon-wenjianguiguanli"
}, {
	"purviewNum" : "C?9",
	"tabname" : "库房",
	"menuname" : "库房",
	"icon" : "icon-haocaiguanli",
	"url" : "fg_supplies.jsp",
	"imgurl" : "icon-haocaiguanli"
}, {
	"purviewNum" : "C?10",
	"tabname" : "商家",
	"menuname" : "商家",
	"icon" : "icon-gongyingshangguanli",
	"url" : "fg_projectSupplier.jsp",
	"imgurl" : "icon-haocaiguanli"
}, {
	"purviewNum" : "C?11",
	"tabname" : "公区",
	"menuname" : "公区",
	"icon" : "icon-haocaiguanli",
	"url" : "fg_officeAreaManagement.jsp",
	"imgurl" : "icon-haocaiguanli"
}, {
	"purviewNum" : "D?0",
	"tabname" : "用户管理",
	"menuname" : "用户管理",
	"icon" : "icon-yuangongyonghuguanli",
	"url" : "fg_user.jsp",
	"imgurl" : "icon-yuangongyonghuguanli"
},{
		"purviewNum" : "D?5",
		"tabname" : "学生管理",
		"menuname" : "学生管理",
		"icon" : "icon-p_xueshengkaoqin",
		"url" : "school_student.jsp",
		"imgurl" : "icon-p_yuangongyonghuguanli"
	},{
	"purviewNum" : "D?2",
	"tabname" : "权限管理",
	"menuname" : "权限管理",
	"icon" : "icon-yuangongquanxianguanli",
	"url" : "fg_purview.jsp",
	"imgurl" : "icon-yuangongquanxianguanli"
}, {
	"purviewNum" : "D?3",
	"tabname" : "考勤管理",
	"menuname" : "考勤管理",
	"icon" : "icon-p_lishibaobiao",
	"url" : "fg_attendanceReport.jsp",
	"imgurl" : "icon-p_lishibaobiao"
},{
	"purviewNum" : "D?4",
	"tabname" : "教师管理",
	"menuname" : "教师管理",
	"icon" : "icon-p_jiaoshiguanli",
	"url" : "school_teacher.jsp",
	"imgurl" : "icon-p_yuangongyonghuguanli"
},{
	"purviewNum" : "E?0",
	"tabname" : "房屋字典",
	"menuname" : "房屋字典",
	"icon" : "icon-fangwuzidian",
	"url" : "fg_houseDic.jsp",
	"imgurl" : "icon-fangwuzidian"
}, {
	"purviewNum" : "E?1",
	"tabname" : "计费方案",
	"menuname" : "计费方案",
	"icon" : "icon-jifeifangan",
	"url" : "fg_planTable.jsp",
	"imgurl" : "icon-jifeifangan"
}, {
	"purviewNum" : "E?2",
	"tabname" : "初始设置",
	"menuname" : "初始设置",
	"icon" : "icon-bianliangshezhi",
	"url" : "fg_variable.jsp",
	"imgurl" : "icon-bianliangshezhi"
}, {
	"purviewNum" : "E?3",
	"tabname" : "个人设置",
	"menuname" : "个人设置",
	"icon" : "icon-gerenshezhi",
	"url" : "fg_personalSettings.jsp",
	"imgurl" : "icon-gerenshezhi"
}, {
	"purviewNum" : "F?0",
	"tabname" : "绩效统计",
	"menuname" : "绩效统计",
	"icon" : "icon-yuangongkaohebiao",
	"url" : "fg_achievementData.jsp",
	"imgurl" : "icon-yuangongkaohebiao"
}, {
	"purviewNum" : "F?1",
	"tabname" : "房屋生态",
	"menuname" : "房屋生态",
	"icon" : "icon-fangyuancaiwushengtaitongji",
	"url" : "fg_houseFinancialEcology.jsp",
	"imgurl" : "icon-fangyuancaiwushengtaitongji"
}, {
	"purviewNum" : "F?2",
	"tabname" : "企业盈亏",
	"menuname" : "企业盈亏",
	"icon" : "icon-caiwukuaizhao",
	"url" : "fg_financialDailyData.jsp",
	"imgurl" : "icon-caiwukuaizhao"
}, {
	"purviewNum" : "F?3",
	"tabname" : "公司成本",
	"menuname" : "公司成本",
	"icon" : "icon-gongsichengbentongji",
	"url" : "fg_companyCost.jsp",
	"imgurl" : "icon-gongsichengbentongji"
}, {
	"purviewNum" : "F?4",
	"tabname" : "租价分布",
	"menuname" : "租金统计",
	"icon" : "icon-fangyuanzujintongji",
	"url" : "fg_housePriceStatistics.jsp",
	"imgurl" : "icon-fangyuanzujintongji"
}, {
	"purviewNum" : "F?5",
	"tabname" : "免租收益",
	"menuname" : "免租收益",
	"icon" : "icon-mianzuqishouyiyuce",
	"url" : "fg_landFreeEarnings.jsp",
	"imgurl" : "icon-mianzuqishouyiyuce"
}, {
	"purviewNum" : "F?6",
	"tabname" : "空置状况",
	"menuname" : "空置状况",
	"icon" : "icon-kongzhichengbentongji",
	"url" : "fg_vacantCost.jsp",
	"imgurl" : "icon-kongzhichengbentongji"
}, {
	"purviewNum" : "F?7",
	"tabname" : "短信记录",
	"menuname" : "短信记录",
	"icon" : "icon-duanxinguanli",
	"url" : "fg_shortMessage.jsp",
	"imgurl" : "icon-duanxinguanli"
}, {
	"purviewNum" : "F?8",
	"tabname" : "受益归属",
	"menuname" : "受益归属",
	"icon" : "icon-yejifenchengguanli",
	"url" : "fg_assistance.jsp",
	"imgurl" : "icon-yejifenchengguanli"
}, {
	"purviewNum" : "F?9",
	"tabname" : "客户来源",
	"menuname" : "客户来源",
	"icon" : "icon-kehulaiyuantongji",
	"url" : "fg_customerSourceStatistics.jsp",
	"imgurl" : "icon-kehulaiyuantongji"
}, {
	"purviewNum" : "F?10",
	"tabname" : "到期分布",
	"menuname" : "到期分布",
	"icon" : "icon-zuketuifangcaoyuce",
	"url" : "fg_rentCheckout.jsp",
	"imgurl" : "icon-zuketuifangcaoyuce"
}, {
	"purviewNum" : "F?11",
	"tabname" : "数据日历",
	"menuname" : "数据日历",
	"icon" : "icon-laobandarili",
	"url" : "fg_bossCalendar.jsp",
	"imgurl" : "icon-laobandarili"
}, {
	"purviewNum" : "H?0",
	"tabname" : "58分散式发布",
	"menuname" : "58分散式",
	"icon" : "icon-58logo",
	"url" : "fg_58PushHouse.jsp",
	"imgurl" : "icon-58logo"
}, {
	"purviewNum" : "H?1",
	"tabname" : "58集中式发布",
	"menuname" : "58集中式",
	"icon" : "icon-58logo",
	"url" : "fg_58PushRoom.jsp",
	"imgurl" : "icon-58logo"
}, {
	"purviewNum" : "H?2",
	"tabname" : "贝壳分散式发布",
	"menuname" : "贝壳分散式",
	"icon" : "icon-beike",
	"url" : "fg_beikePushHouse.jsp",
	"imgurl" : "icon-beike"
}, {
	"purviewNum" : "H?3",
	"tabname" : "贝壳集中式发布",
	"menuname" : "贝壳集中式",
	"icon" : "icon-beike",
	"url" : "fg_beikePushRoom.jsp",
	"imgurl" : "icon-beike"
}, {
	"purviewNum" : "H?4",
	"tabname" : "京东租房",
	"menuname" : "京东租房",
	"icon" : "icon-jingdong",
	"url" : "fg_beikePushHouse.jsp",
	"imgurl" : "icon-jingdong"
}, {
	"purviewNum" : "H?5",
	"tabname" : "精品房源发布",
	"menuname" : "精品房源",
	"icon" : "icon-jingpin",
	"url" : "fg_realPushHouse.jsp",
	"imgurl" : "icon-jingpin"
}, {
	"purviewNum" : "H?6",
	"tabname" : "至尊寓发布",
	"menuname" : "至尊寓发布",
	"icon" : "icon-huangguan",
	"url" : "fg_zzyPushHouse.jsp",
	"imgurl" : "icon-huangguan"
}, {
	"purviewNum" : "H?7",
	"tabname" : "网络门店",
	"menuname" : "网络门店",
	"icon" : "icon-wxgzh",
	"url" : "fg_wxgzhPushHouse.jsp",
	"imgurl" : "icon-wxgzh"
},
{
	"purviewNum" : "I?0",
	"tabname" : "库存管理",
	"menuname" : "库存管理",
	"icon" : "icon-cangku",
	"url" : "fg_shopGoodsManagement.jsp",
	"imgurl" : "icon-cangku"
},
{
	"purviewNum" : "I?1",
	"tabname" : "销售管理",
	"menuname" : "销售管理",
	"icon" : "icon-xiaoshou",
	"url" : "fg_shopOrder.jsp",
	"imgurl" : "icon-xiaoshou"
},
{
	"purviewNum" : "J?0",
	"tabname" : "设备预警",
	"menuname" : "设备预警",
	"icon" : "icon-shebeiguanli",
	"url" : "fg_management2.jsp",
	"imgurl" : "icon-shebeiguanli"
},
{
	"purviewNum" : "J?1",
	"tabname" : "智能设备",
	"menuname" : "智能设备",
	"icon" : "icon-shebeiguanli",
	"url" : "fg_intelligence.jsp",
	"imgurl" : "icon-shebeiguanli"
},
{
	"purviewNum" : "J?2",
	"tabname" : "能源信息",
	"menuname" : "能源信息",
	"icon" : "icon-shebeiguanli",
	"url" : "fg_energyInformation.jsp",
	"imgurl" : "icon-shebeiguanli"
},
{
	"purviewNum" : "J?3",
	"tabname" : "集控设置",
	"menuname" : "集控设置",
	"icon" : "icon-shebeiguanli",
	"url" : "fg_centralizedControlSettings.jsp",
	"imgurl" : "icon-shebeiguanli"
},
{
	"purviewNum" : "J?4",
	"tabname" : "公区集控",
	"menuname" : "公区集控",
	"icon" : "icon-haocaiguanli",
	"url" : "fg_officeAreaDeviceControl.jsp",
	"imgurl" : "icon-haocaiguanli"
},
{
	"purviewNum" : "J?5",
	"tabname" : "公寓集控",
	"menuname" : "公寓集控",
	"icon" : "icon-weizuguanli",
	"url" : "fg_apartmentDeviceControl.jsp",
	"imgurl" : "icon-weizuguanli"
},
{
	"purviewNum" : "J?9",
	"tabname" : "房屋列表",
	"menuname" : "房屋列表",
	"icon" : "icon-fangwuzidian",
	"url" : "fg_houseRoomList.jsp",
	"imgurl" : "icon-fangwuzidian"
},
{
	"purviewNum" : "J?6",
	"tabname" : "酒店集控",
	"menuname" : "酒店集控",
	"icon" : "icon-hotel",
	"url" : "fg_hotelDeviceControl.jsp",
	"imgurl" : "icon-hotel"
},
{
	"purviewNum" : "Q?0",
	"tabname" : "客户管理",
	"menuname" : "客户管理",
	"icon" : "icon-renkouguanli",
	"url" : "fg_customerManagement.jsp",
	"imgurl" : "icon-renkouguanli"
},
{
	"purviewNum" : "Q?4",
	"tabname" : "客户关怀",
	"menuname" : "客户关怀",
	"icon" : "icon-care",
	"url" : "fg_customerCare.jsp",
	"imgurl" : "icon-care"
},
{
	"purviewNum" : "Q?5",
	"tabname" : "库存管理",
	"menuname" : "库存管理",
	"icon" : "icon-care",
	"url" : "fg_saleGoodsManagement.jsp",
	"imgurl" : "icon-care"
},
{
	"purviewNum" : "Q?1",
	"tabname" : "线上订单",
	"menuname" : "线上订单",
	"icon" : "icon-xiaoshou",
	"url" : "fg_salesOrder.jsp",
	"imgurl" : "icon-xiaoshou"
},
{
	"purviewNum" : "Q?2",
	"tabname" : "销售开单",
	"menuname" : "销售开单",
	"icon" : "icon-xiaoshou",
	"url" : "fg_orderNotes.jsp",
	"imgurl" : "icon-xiaoshou"
},
{
	"purviewNum" : "Q?3",
	"tabname" : "销售记录",
	"menuname" : "销售记录",
	"icon" : "icon-xiaoshou",
	"url" : "fg_saleRecord.jsp",
	"imgurl" : "icon-xiaoshou"
},
{
	"purviewNum" : "S?0",
	"tabname" : "教室管理",
	"menuname" : "教室管理",
	"icon" : "icon-yingyefangtai",
	"url" : "school_classroom.jsp",
	"imgurl" : "icon-yingyefangtai"
},
{
	"purviewNum" : "S?1",
	"tabname" : "办公室管理",
	"menuname" : "办公室管理",
	"icon" : "icon-dingdanchaxun",
	"url" : "school_office.jsp",
	"imgurl" : "icon-dingdanchaxun"
},
{
	"purviewNum" : "S?2",
	"tabname" : "公区管理",
	"menuname" : "公区管理",
	"icon" : "icon-haocaiguanli",
	"url" : "shool_commonAreaManagement.jsp",
	"imgurl" : "icon-haocaiguanli"
},
];


//正则表达式

//数字或者小数允许为负
var _isIntOrDouble = /^-?\d+(\.\d+)?$/;

//纯数字
var _isInt = /^\d+$/;

//匹配用户名
var _regex1 = /^\w{2,16}$/;

//匹配密码
var _regex2 = /^([A-Z]|[a-z]|[0-9]|[\`\-\=\[\]\;\,\.\/\~\!\@\#\$\%\^\&\*\(\)\_\+\{\}\:\"\'\|\\\<\>\?]){3,16}$/;

/*
^[1-9]\d*$　 　 //匹配正整数
^-[1-9]\d*$ 　 //匹配负整数
^-?[1-9]\d*$　　 //匹配整数
^[1-9]\d*|0$　 //匹配非负整数（正整数 + 0）
^-[1-9]\d*|0$　　 //匹配非正整数（负整数 + 0）
^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$　　 //匹配正浮点数
^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$　 //匹配负浮点数
^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$　 //匹配浮点数
^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$　　 //匹配非负浮点数（正浮点数 + 0）
^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$　　//匹配非正浮点数（负浮点数 + 0）
评注：处理大量数据时有用，具体应用时注意修正
匹配特定字符串：
^[A-Za-z]+$　　//匹配由26个英文字母组成的字符串
^[A-Z]+$　　//匹配由26个英文字母的大写组成的字符串
^[a-z]+$　　//匹配由26个英文字母的小写组成的字符串
^[A-Za-z0-9]+$　　//匹配由数字和26个英文字母组成的字符串
^\w+$　　//匹配由数字、26个英文字母或者下划线组成的字符串
*/