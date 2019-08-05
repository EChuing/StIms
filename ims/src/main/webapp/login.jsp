<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE HTML>
<html>
<head>
<title><%=session.getAttribute("systemBrand") %> - 专业的<%=session.getAttribute("systemType") %></title>
	<link rel="shortcut icon" href="ui/images/titlelogo.ico" />
	<link href="css/login/style.css" rel="stylesheet" type="text/css" media="all"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript">
		var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
		document.write(unescape("%3Cspan id='cnzz_stat_icon_1261439013'%3E%3C/span%3E%3Cscript src='"
						+ cnzz_protocol
						+ "s95.cnzz.com/z_stat.php%3Fid%3D1261439013'  type='text/javascript'%3E%3C/script%3E"));
	</script>
	<style type="text/css">
      button {  
        background-color: #428bca;  
        border-color: #357ebd;  
        color: #fff;  
        -moz-border-radius: 10px;  
        -webkit-border-radius: 10px;  
        border-radius: 10px; /* future proofing */  
        -khtml-border-radius: 10px; /* for old Konqueror browsers */  
        text-align: center;  
        vertical-align: middle;  
        border: 1px solid transparent;  
        font-weight: 900;  
        font-size:1vw 
      }  
    </style>
</head>
<body onkeydown="keyLogin()" style="background-image: url(ui/img/bbb.png);width: 100%;height: 100%;" >
	<div class="login-form" style="width: 100%;height: 100%;text-align: center;">
		<div style="float: left;height: 35%;width: 30%;background:rgba(255,255,255,0.5);position: absolute;margin: 10% 0 0 18%;border-radius: 15px;">
			<div id="" style="text-align: center;">
				<div id="" style="width: 60%;height: 25%;margin: 10% 0 0 18%;">
					<img src="${loginLogo}" alt=""/>
				</div>
				<div style="width: 100%;height: 100%;margin: 2% 0 0 0;">
					<div style="color:#0071b8;font-size: 1.4vw;"><%=session.getAttribute("systemType") %></div>
				</div>
				<div id="" style="color: #000000;margin: 1% 0 0 0;font-size: 0.9vw;">
					技术支持：<%=session.getAttribute("systemBrand") %>
				</div>
			</div>
		</div>
		<div style="float: left;height: 35%;width: 30%;background:rgba(255,255,255,0.5);position: absolute;margin: 10% 0 0 50%;border-radius: 15px;">
			<div class="login-top" style="width: 100%;height: 100%;margin:7% 0 0 20%">
				<div class="login-ic" style="border-radius: 15px;background-color: #FFFFFF;width: 60%;height: 13%;">
					<i></i>
					<input id="userId" type="text" value="" placeholder="请输入账号"  />
					<div class="clear"> </div>
				</div>
				<div class="login-ic" style="border-radius: 15px;background-color: #FFFFFF;width: 60%;height: 13%;">
					<i class="icon"></i>
					<input id="userPassword"  type="password" placeholder="请输入密码" value="" />
					<div class="clear"></div>
				</div>
				<div  style="width: 40%;height: 20%;margin: 0 0 0 12%;">
					 <button id="logbutton" onclick="login()" style="width:100%;padding: 3%">开始工作</button>
				</div>
				<div id="error-msgs" style="text-align: center;">
					
				</div>
			</div>	
		</div>
	</div>
	<script src="http://pic-static.fangzhizun.com/jquery/2.1.4/jquery.min.js"></script>
	<script type="text/javascript" src="js/login.js"></script>
	<script type="text/javascript">
		$('#cnzz_stat_icon_1261439013').hide();
	</script>
</body>
</html>