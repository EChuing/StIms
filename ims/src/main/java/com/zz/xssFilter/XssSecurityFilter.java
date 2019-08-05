package com.zz.xssFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class XssSecurityFilter implements Filter {
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		String url = httpRequest.getServletPath();
		if("/updateGoods.action".equals(url)||"/insertSubject.action".equals(url)||"/updateSubject.action".equals(url)||"/insertNotice.action".equals(url)||"/updateNotice.action".equals(url)){
			chain.doFilter(request, response); 
		}else{
			 XssHttpRequestWrapper xssRequest = new XssHttpRequestWrapper(httpRequest);  
		     httpRequest = XssSecurityManager.wrapRequest(xssRequest);  
		     chain.doFilter(xssRequest, response); 
		}
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

}
