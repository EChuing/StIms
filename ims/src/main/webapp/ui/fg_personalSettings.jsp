<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<% SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo"); %>
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
	<meta charset="utf-8">
	<title>个人设置</title>
	<link href="http://pic-static.fangzhizun.com/easyui/themes/default/easyui.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/easyui/themes/icon.css" rel="stylesheet">
	<link href="http://pic-static.fangzhizun.com/css/mytips.css" rel="stylesheet">
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/jquery.easyui.min.js"></script>
	<script src="http://pic-static.fangzhizun.com/js/mytips.js"></script>
	<script src="js/config.js"></script>
</head>

<body>

	<div id="" style="padding:6px; text-align: center;">
		<fieldset>
			<legend>
				个人密码设置
			</legend>
		<span style="color:red;height:20px">6到21位,特殊字符支持 . ! ? + - _</span>
		<br><br>
		<div style="margin:10px 0 0 24px;color:black;">
			原密码：<input id="oldPasswordInput" onfocus="this.type='password'" autocomplete="off" style="width:150px">
		</div>
		<div style="margin:10px 0 0 24px;color:black;">
			新密码：<input id="newPasswordInput"  onfocus="this.type='password'" autocomplete="off" style="width:150px">
		</div>
		<div style="margin:10px 0 0 12px;color:black;">
			确认密码：<input id="checkNewPasswordInput"  onfocus="this.type='password'" autocomplete="off" style="width:150px">
		</div>
		<br>
		<center>
			<span id="updateUserSelfTips" style="color:red;height:25px;margin:0 0  12px 0;"></span>
			<br><br>
			<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateUserSelf()">保存</a>
			<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateUserBySelf').dialog('close')">取消</a>
		</center>

		</fieldset>
	</div>

	<div id="userAuthPasswordSetting" style="padding:0px; text-align: center;width: 100%;height: 100%">
		<fieldset style="height: 240px;">
			<legend>
				折扣密码设置
			</legend>

			<br><br>
			<div style="float: left;margin: 10px 0 0 20%;width: 20%">
				<div style="margin:10px 0 0 24px;color:black;">
					折扣密码：<input id="oldDiscountPasswordInput" onfocus="this.type='password'" autocomplete="off" style="width:150px">
				</div>
				<div style="margin:10px 0 0 12px;color:black;">
					折扣新密码：<input id="newDiscountPasswordInput"  onfocus="this.type='password'" autocomplete="off" style="width:150px">
				</div>
				<div style="margin:10px 0 0 25px;color:black;">
					确认密码：<input id="checkDiscountPasswordInput"  onfocus="this.type='password'" autocomplete="off" style="width:150px">
				</div>
			</div>

			<div style="position: absolute;border-left:2px solid #aaaaaa;height: 26%;margin: -2% 0 0 55%"></div>

			<div style="float: left;margin: 10px 0 0 25%;width: 20%">
				<div style="margin:10px 0 0 24px;color:black;">
					原折扣卡：<input id="oldCardPasswordInput" onfocus="this.type='password'" autocomplete="off" style="width:150px">
				</div>
				<div style="margin:10px 0 0 24px;color:black;">
					新折扣卡：<input id="newCardPasswordInput"  onfocus="this.type='password'" autocomplete="off" style="width:150px">
				</div>
				<div style="margin:10px 0 0 12px;color:black;">
					确认折扣卡：<input id="checkCardPasswordInput"  onfocus="this.type='password'" autocomplete="off" style="width:150px">
				</div>
			</div>
			<div style="clear: both"></div>
			<center style="position: absolute;margin: 2% 0 0 28%">
				<span id="updateUserDisAuthPasswordTips" style="color:red;height:25px;margin:0 0  12px 0;"></span>
				<br><br>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateUserDisAuthPassword()">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateUserBySelf').dialog('close')">取消</a>
			</center>

			<center style="position: absolute; margin: 2% 0 0 72%">
				<span id="updateUserCardAuthPasswordTips" style="color:red;height:25px;margin:0 0  12px 0;"></span>
				<br><br>
				<a class="easyui-linkbutton" iconcls="icon-save" onclick="doUpdateUserCardAuthPassword()">保存</a>
				<a class="easyui-linkbutton" iconcls="icon-cancel" onclick="$('#updateUserBySelf').dialog('close')">取消</a>
			</center>

		</fieldset>
	</div>
	<script>
		function doUpdateUserSelf(){
			var oldPassword = $('#oldPasswordInput').val();
			var newPassword = $('#newPasswordInput').val();
			var checkNewPassword = $('#checkNewPasswordInput').val();
			
			//var passwordRegExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
			var passwordRegExp=/^[0-9A-Za-z.!?+-_]{6,21}$/;
			if(oldPassword=="" || newPassword=="" || checkNewPassword==""){
		        $("#updateUserSelfTips").text("密码不能为空");
		        return;
		    }
		    if(newPassword !=  checkNewPassword){
		    	$("#updateUserSelfTips").text("新密码两次输入不一致");
		        return;
		    }
		    if(!passwordRegExp.test(newPassword) || !passwordRegExp.test(checkNewPassword)){
		    	$("#updateUserSelfTips").text("新密码格式错误");
		        return;
		    }
		    $("#updateUserSelfTips").text("");
		    $.post("../doUpdateUserSelf.action", {
		    	oldPassword 		: oldPassword,
		    	newPassword 		: newPassword,
		    	checkNewPassword 	: checkNewPassword,
			}, function(data) {
				if (data.code < 0) {
					$("#updateUserSelfTips").text(data.msg);
					return;
				}
				if(data.code==1){
					data = data.body;
					myTips("修改成功","success");
					$('#updateUserBySelf').dialog('close');
				}
			});
		}

       function doUpdateUserDisAuthPassword(){

           var oldPassword = $('#oldDiscountPasswordInput').val();
           var newPassword = $('#newDiscountPasswordInput').val();
           var checkNewPassword = $('#checkDiscountPasswordInput').val();
           var json ={
               authPassword:oldPassword
           };
           json =JSON.stringify(json);
           //var passwordRegExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
           var passwordRegExp=/^[0-9A-Za-z.!?+-_]{6,21}$/;
           if(oldPassword=="" || newPassword=="" || checkNewPassword==""){
               $("#updateUserDisAuthPasswordTips").text("密码不能为空");
               return;
           }
           if(newPassword !=  checkNewPassword){
               $("#updateUserDisAuthPasswordTips").text("新密码两次输入不一致");
               return;
           }
           if(!passwordRegExp.test(newPassword) || !passwordRegExp.test(checkNewPassword)){
               $("#updateUserDisAuthPasswordTips").text("新密码格式错误");
               return;
           }

           $("#updateUserSelfTips").text("");
           $.post("../doUpdateDiscountAuthPassword.action", {
               suDiscountAuthPassword		: json,
               newDiscountAuthPassword	: newPassword,
               checkDiscountAuthPassword 	: checkNewPassword,
           }, function(data) {
               if (data.code < 0) {
                   $("#updateUserSelfTips").text(data.msg);
                   return;
               }
               if(data.code==1){
                   data = data.body;
                   myTips("修改成功","success");
                   $('#updateUserDisAuthPasswordTips').dialog('close');
               }
           });
		}

        function doUpdateUserCardAuthPassword(){

            var oldPassword = $('#oldCardPasswordInput').val();
            var newPassword = $('#newCardPasswordInput').val();
            var checkNewPassword = $('#checkCardPasswordInput').val();
			var json ={
				cardPassword:oldPassword
			};
            json =JSON.stringify(json);
            //var passwordRegExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
            var passwordRegExp=/^[0-9A-Za-z.!?+-_]{6,21}$/;
            if(oldPassword=="" || newPassword=="" || checkNewPassword==""){
                $("#updateUserCardAuthPasswordTips").text("密码不能为空");
                return;
            }
            if(newPassword !=  checkNewPassword){
                $("#updateUserCardAuthPasswordTips").text("新密码两次输入不一致");
                return;
            }
            if(!passwordRegExp.test(newPassword) || !passwordRegExp.test(checkNewPassword)){
                $("#updateUserCardAuthPasswordTips").text("新密码格式错误");
                return;
            }

            $("#updateUserSelfTips").text("");
            $.post("../doUpdateDiscountAuthPassword.action", {
                suDiscountAuthPassword		: json,
                newDiscountAuthPassword		: newPassword,
                checkDiscountAuthPassword 	: checkNewPassword,
            }, function(data) {
                if (data.code < 0) {
                    $("#updateUserSelfTips").text(data.msg);
                    return;
                }
                if(data.code==1){
                    data = data.body;
                    myTips("修改成功","success");
                    $('#updateUserCardAuthPasswordTips').dialog('close');
                }
            });


        }





	</script>
</body>
</html>