$(function() {
	setTimeout("location.reload()",600000);
});

function login() {
	// 1.获得文本框的值
	var username = $("#userId").val();
	var password = $("#userPassword").val();
	var acode = $("#a_code").text();
	var bcode = $("#b_code").text();
	var ccode = $("#c_code").text();
	var userLogin = {
			suName 		: username,
			suPassword 	: password
	};
	if(acode!='' && bcode!='' && bcode!=''){
		userLogin = {
				suName 		: username,
				suPassword 	: password,
				acode		: acode,
				bcode		: bcode,
				ccode		: ccode,
		};
	}
	// alert(username);
	// 2.判断帐号密码为空
	// alter(username+"====="+password);
	if (username == "" || password == "") {
		//$("#error-msgs").addClass("red"); // 添加样式
		$("#error-msgs").html('<div id="error" style="color:red;margin: 0 0 0 -35%">账号密码不能为空</div>'); // 提示信息
		return false;
	} else {
		$("#logbutton").val("登录中···");
		$.post("userLogin.action", userLogin , function(data) {
			if (data.code < 0) {
				//$("#error-msgs").addClass("red"); // 添加样式
				$("#error-msgs").html('<div id="error" style="color:red;margin: 0 0 0 -35%">'+data.msg+'</div>'); // 提示信息
				$("#logbutton").val("开始工作");
				return;
			}
			if (data.code > 0) {
				location.href = "ui/fg_main.jsp";
			}
		}, "json");
		return true;
	}
}
function keyLogin() {
	if (event.keyCode == 13) // 回车键的键值为13
		document.getElementById("logbutton").click(); // 调用登录按钮的登录事件
}
function forget() {
	alert('修改密码请联系公司管理员！');
}
