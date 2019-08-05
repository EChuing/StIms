package com.zz.util;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

public class SessionUtil {

    /**
     * 获取session的值
     * @param attribute
     * @return
     */
    public static String getSession(String attribute){
        HttpServletRequest request = ServletActionContext.getRequest();
        return (String) request.getSession().getAttribute(attribute);
    }
    
}
