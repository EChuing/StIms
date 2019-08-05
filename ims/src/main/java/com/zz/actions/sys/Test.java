package com.zz.actions.sys;

import com.zz.other.Syslog;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
	public static void main(String[] args) {
		String[] str = {"applicationContext-mybatis.xml","applicationContext-beans.xml"};
		 ClassPathXmlApplicationContext ca = new ClassPathXmlApplicationContext(str );
		
		 try {
			 
			 
			
		} catch (Exception e) {
			e.printStackTrace();
			 Syslog.writeErr(e);
		}finally{
			ca.close();
		}
	}
}

