var _loginUserName = $('#loginUserName', parent.parent.document).val();//登入用户姓名
var _loginUserId = $('#loginUserId', parent.parent.document).val();//登入用户id
var _loginPurview = $('#loginPurview', parent.document).val();//用户权限
var _loginStore = $('#loginStore', parent.parent.document).val();//区域
var _loginDepartment = $('#loginDepartment', parent.parent.document).val();//部门
var _loginCompany = $('#loginCompany', parent.parent.document).val();//
var _loginBrand = $('#loginBrand', parent.parent.document).val();//智能设备品牌
var _devFirstJson = $('#loginDevFirst', parent.parent.document).val();
var _devFirstJson2 = $('#loginDevSecond', parent.parent.document).val();
var _loginCoId = $('#loginCoId', parent.parent.document).val();//数据id
var _loginCompanyName = $('#loginCompanyName', parent.parent.document).val();//公司名
var _loginCompanyRentProvince = $('#loginCompanyRentProvince', parent.parent.document).val();//省份
var _loginCompanyRentCity = $('#loginCompanyRentCity', parent.parent.document).val();//城市
var _loginCompanyRentDistrict = $('#loginCompanyRentDistrict', parent.parent.document).val();//城区
_loginCompanyRentDistrict = JSON.parse(_loginCompanyRentDistrict != undefined ? _loginCompanyRentDistrict : '[]');
var _loginAuthoritySwitch = $('#loginAuthoritySwitch', parent.parent.document).val();//超级权限
var _loginType = $('#loginType', parent.parent.document).val();//
