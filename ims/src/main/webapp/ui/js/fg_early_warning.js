
function early() {
    // 1.获得文本框的值
    var username = $("#Email1").val();
    var password = $("#Password1").val();
    var userLogin = {
        suName 		: username,
        suPassword 	: password
    };
    // alert(username);
    // 2.判断帐号密码为空
    // alter(username+"====="+password);
    if (username == "" || password == "") {
        //$("#error-msgs").addClass("red"); // 添加样式
        $("#error-msgs").html('<div id="error" style="color:red;margin: 0 0 0 -35%">账号密码不能为空</div>'); // 提示信息
        return false;
    } else {
        $("#logbutton").val("登录中···");
        console.log("555555555555")
        $.post("userLogin.action", userLogin , function(data) {
            console.log(data)
            if (data.code < 0) {
                //$("#error-msgs").addClass("red"); // 添加样式
                $("#error-msgs").html('<div id="error" style="color:red;margin: 0 0 0 -35%">'+data.msg+'</div>'); // 提示信息
                $("logbutton1").val("开始工作");
                return;
            }
            if (data.code > 0) {
                location.href = "ui/fg_management2.jsp";
            }
        }, "json");
        return true;
    }
}
function keyLogin() {
    if (event.keyCode == 13) // 回车键的键值为13
        document.getElementById("logbutton1").click(); // 调用登录按钮的登录事件
}

