package com.zz.util;

public class UUIDUtil {
	
	public static  String createUUID(){
		String uuid = java.util.UUID.randomUUID().toString().replace("-", "");;
		return uuid;
	}
	
}
