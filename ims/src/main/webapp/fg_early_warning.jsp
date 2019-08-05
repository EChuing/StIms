<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.zz.po.sys.SysUserExpand"%>
<%SysUserExpand user = (SysUserExpand) session.getAttribute("userinfo");%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>设备预警平台</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="ui/css/style2.css" type="text/css" rel="stylesheet">
    <style>
        body{color:#fff; font-family:"微软雅黑"; font-size:14px;}
        .wrap1{position:absolute; top:0; right:0; bottom:0; left:0; margin:auto }/*实现把整个屏幕居中撑开*/
        .main_content{background:url("ui/images/main_bg.png") repeat; margin-left:auto; margin-right:auto; text-align:left; float:none; border-radius:8px;}
        .form-group{position:relative;}
        .login_btn{display:block; background:#3872f6; color:#fff; font-size:15px; width:100%; line-height:50px; border-radius:3px; border:none; }
        .login_input{width:100%; border:1px solid #3872f6; border-radius:3px; line-height:40px; padding:2px 5px 2px 30px; background:none;}
        .icon_font{position:absolute; bottom:15px; left:10px; font-size:18px; color:#3872f6;}
        .font16{font-size:16px;}
        .mg-t20{margin-top:20px;}
        @media (min-width:200px){.pd-xs-20{padding:20px;}}
        @media (min-width:768px){.pd-sm-50{padding:50px;}}
        #grad {
            background: -webkit-linear-gradient(#4990c1, #52a3d2, #6186a3); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#4990c1, #52a3d2, #6186a3); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#4990c1, #52a3d2, #6186a3); /* Firefox 3.6 - 15 */
            background: linear-gradient(#4990c1, #52a3d2, #6186a3); /* 标准的语法 */
        }
    </style>

</head>

<body onkeydown="keyLogin()" style="background:url('ui/images/bg.jpg') no-repeat;">

<div class="container wrap1" style="height:450px;">
    <h2 class="mg-b20 text-center"><%=session.getAttribute("wxMerchantName")%>设备预警平台</h2>
    <div class="col-sm-8 col-md-5 center-auto pd-sm-50 pd-xs-20 main_content">
        <div class="form-group mg-t20">
            <i class="icon-user icon_font"></i>
            <input type="Text" class="login_input" id="Email1" placeholder="请输入用户名" />
        </div>
        <div class="form-group mg-t20">
            <i class="icon-lock icon_font"></i>
            <input type="password" class="login_input" id="Password1" placeholder="请输入密码" />
        </div>
        <button id="logbutton1" class="login_btn" onclick="early()">登录</button>
        <div id="error-msgs" style="text-align: center;"></div>
    </div><!--row end-->
    <h5 class="mg-b20 text-center">技术支持：<%=session.getAttribute("systemBrand")%></h5>
        <h6 class="mg-b20 text-center">V 1.0</h6>
</div><!--container end-->
<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="ui/js/fg_early_warning.js"></script>
</body>
</html>