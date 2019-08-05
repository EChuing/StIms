package com.zz.datasource;

import com.opensymphony.xwork2.ActionContext;
import com.zz.other.Syslog;
import com.zz.util.MySqlSessionFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CheckoutDataSource {
	public void checkout(){
		HttpServletRequest request = (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
		String company = (String) request.getSession().getAttribute("company");
		System.out.println(company);
		if(company == null){
			company = request.getParameter("co");
		}
		if(company == null){
			int id = Integer.parseInt((String)request.getSession().getAttribute("coId"));
			try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
				MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
				MyDataSource dataSource = mapper.getComparyId(id);
				if(dataSource != null){
					company = dataSource.getName();
				}
			} catch (IOException e) {
				e.printStackTrace();
				Syslog.writeErr(e);
			}
		}
		DataSourceContextHolder.setDbType(company);
		System.out.println("当前数据库："+company);
	}
}
