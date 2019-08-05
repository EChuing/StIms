package com.zz.other;

import com.zz.po.sys.SysLogException;
import com.zz.service.sys.SysLogExceptionService;
import com.zz.util.DateUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;


public class Syslog {

	private static SysLogExceptionService sysLogExceptionService;

	public void setSysLogExceptionService(SysLogExceptionService sysLogExceptionService) {
		Syslog.sysLogExceptionService = sysLogExceptionService;
	}

	/**
	 * 写日志文件
	 * @param str 日志内容
	 * @param path 日志文件路径
	 * @throws IOException
	 */
	public static void writeLog(String str, String path){
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date();
			File file = new File(path);
			if (!file.exists()) {
				file.createNewFile();
			}
			FileOutputStream out = new FileOutputStream(file, true);
			StringBuffer sb = new StringBuffer();
			sb.append(sdf.format(date));
			sb.append("\t");
			sb.append(str);
			sb.append("\r\n");
			out.write(sb.toString().getBytes("utf-8"));
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 写日志文件
	 * @param str 日志内容
	 * @param path 日志文件路径
	 * @param directory 目录
	 * @throws IOException
	 */
	public static void writeLog(String str, String path, String directory) throws IOException{
		//创建目录
		File dir = new File(directory);
		dir.mkdirs();
		//创建文件
		File file = new File(path);
		if(!file.exists()){
			file.createNewFile();
		}
		//写日志
		FileOutputStream out = new FileOutputStream(file, true);
		StringBuffer sb = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		sb.append(sdf.format(date));
		sb.append("\t");
		sb.append(str);
		sb.append("\r\n");
		out.write(sb.toString().getBytes("utf-8"));
		out.close();
	}

	public static void writeErr(Exception e){
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		e.printStackTrace(new PrintStream(baos));
		String exception = baos.toString();
		String path = "D:/Journal/imsError(" + DateUtil.getCurDate() + ").txt";
		writeLog(exception, path);
		insertErr(exception);
	}

	/**
	 * 插入系统异常日志表
	 * @param exception
	 */
	private static void insertErr(String exception){
		//后续有特殊符号可以继续添加
		exception = exception.replace("$", "");
		exception = exception.replace("\"", "");
		exception = exception.replace("\'", "");
		SysLogException sysLogException = new SysLogException();
		sysLogException.setSleServer("ims");
		sysLogException.setSleContent(exception);
		try {
			sysLogExceptionService.insertSelective(sysLogException);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
