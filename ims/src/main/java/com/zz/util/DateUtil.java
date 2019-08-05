package com.zz.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    /**
     * 获取系统当前日期时间，精确到秒（年 月 日 时 分 秒）
     * @return 
     */
    public static String getCurDateTime(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        return sdf.format(new Date()); 
    }
    
    public static String getAddDateTime(int day){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        Calendar date = Calendar.getInstance();
        date.add(Calendar.DATE, day);
        return sdf.format(date.getTime()); 
    }
    
    public static String getAddHourTime(int hour){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        Calendar date = Calendar.getInstance();
        date.add(Calendar.HOUR, hour);
        return sdf.format(date.getTime()); 
    }
    
    public static String getCurDate(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
        return sdf.format(new Date()); 
    }
    
    public static String getCurTime(){
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");  
        return sdf.format(new Date()); 
    }
}
