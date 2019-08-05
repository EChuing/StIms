package com.zz.actions.commons;

import com.zz.po.sys.SysUserExpand;
import com.zz.util.DateUtil;

import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;



/**
 * 访问*.jsp、*.action时进来
 *
 */
public class LoginFilter extends HttpServlet implements Filter{

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) 
	        throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;
		HttpSession session = request.getSession();
		String url=request.getServletPath();
		String contextPath=request.getContextPath();
		String requestURI = request.getRequestURI();
		SysUserExpand user=(SysUserExpand)session.getAttribute("userinfo");  
		
		if(url.equals("/login.jsp")){
			session.invalidate();
		}
		if(url.equals("/fg_early_warning.jsp")){
			session.invalidate();
		}
		if( 
			!url.equals("/login.jsp")
			&&!url.equals("/fg_early_warning.jsp")
			&&!url.equals("/userLogin.action")
			&&!url.equals("/userLogout.action")
			&&!url.equals("/massage/publicCallback.action")
			&&!url.equals("/massage/callback.action")
			&&!url.equals("/massageRepairAndApproval/callback.action")
			&&!url.equals("/upload/callback.action")
			&&!url.equals("/upload/qrUpload.action")
            &&!url.equals("/pubupload/callback.action")
			&&!url.equals("/file/callback.action")
			&&!url.equals("/file/mobCallback.action")
			&&!url.equals("/file/qrUpload.action")
			&&!url.equals("/insertPay58.action")
			&&!url.equals("/insertClick58.action")
			&&!url.equals("/insertMogoHouse.action")
			&&!url.equals("/signShow.action")
			&&!url.equals("/signShowTwo.action")
			&&!url.equals("/syncCallBack.action")
			&&!url.equals("/syncCallBackTwo.action")
			&&!url.equals("/asynCallBack.action")
			&&!url.equals("/asynCallBackTwo.action")
			&&!url.equals("/selectLock.action")
			&&!url.equals("/checkLockPassword.action")
			&&!url.equals("/getOpenIdByCode.action")
			&&!url.equals("/selectTemporaryOrderByOrderId.action")
			&&!url.equals("/updateTemporaryOrderById.action")
		){	//除了以上请求地址，其他请求一律要求登录后才能访问
			if(user==null){//转入登陆页面
				System.out.println("没有登录，跳转登录页面");
				String company = (String) request.getSession().getAttribute("company");
				response.sendRedirect(contextPath+"/"+company);
				return;
			}else{
				System.out.println(DateUtil.getCurDateTime() + " 账号："+user.getSuName()+"（"+user.getSuStaffName()+"）访问了"+requestURI);
				chain.doFilter(req, resp);





			}
		}else{
			chain.doFilter(req, resp);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}

}
