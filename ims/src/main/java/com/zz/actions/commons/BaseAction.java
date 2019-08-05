package com.zz.actions.commons;

import java.io.IOException;
import java.io.PrintWriter;

import com.zz.other.Syslog;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class BaseAction extends ActionSupport{
	//响应Json格式的数据
	public void printlnOfJson(String message) {
		try {
			ServletActionContext.getResponse().setContentType("text/json; charset=utf-8"); 
			PrintWriter out = ServletActionContext.getResponse().getWriter();
			out.print(message);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
			Syslog.writeErr(e);
		}
	}
	//响应普通格式的数据
	public void printlnMsg(String message) {
		try {
		    ServletActionContext.getResponse().setContentType("text/html; charset=utf-8");
			PrintWriter out = ServletActionContext.getResponse().getWriter();
			out.print(message);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
	//响应普通格式的数据(不换行)
	public void printMsg(String message) {
		try {
            ServletActionContext.getResponse().setContentType("text/html; charset=utf-8");
			PrintWriter out = ServletActionContext.getResponse().getWriter();
			out.print(message);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
	//响应数组格式的数据
	public void printlnArray(int[] message) {
		try {
            ServletActionContext.getResponse().setContentType("text/html; charset=utf-8");
			PrintWriter out = ServletActionContext.getResponse().getWriter();
			out.print(message);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
}