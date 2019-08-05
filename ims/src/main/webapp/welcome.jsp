<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page isELIgnored="false"%>
<!DOCTYPE HTML>
<html>
<head>
	<link rel="shortcut icon" href="ui/images/titlelogo.ico" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body style="background-color: #eeeeee"  >
	<div style="width: 100%;height: 100%;text-align: center; background-color: #eeeeee ;margin:5% 0 0 0;">
		<img alt="" src="ui/images/welcome.png" width="25%" height="25%"  >
		<div style="color:#0071b8;font-size: 1.4vw; font-weight: bold;  text-align: center;">欢迎使用<%=session.getAttribute("systemType") %></div>
		<div style="color:#0071b8;font-size: 1.4vw; font-weight: bold;  text-align: center;"><%=session.getAttribute("companyName") %></div>
		<%--<div style="color:#0071b8;font-size: 1.4vw; font-weight: bold;">技术服务：0755-25609945</div>--%>
	</div>
</body>
</html>
