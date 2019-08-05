package com.zz.actions.info;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
	
	public static void main(String[] args) {
		String arg1 = "7382.6";
		String arg2 = "7500";
		
		double r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length();
		} catch (Exception e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length();
		} catch (Exception e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		System.out.println(m +" -- "+ n);
		
		double asd = Double.parseDouble(arg1);
		double ase = Double.parseDouble(arg2);
		
		double a = ((asd * m - ase * m) / m);
		System.out.println(a);
		
	}

}
