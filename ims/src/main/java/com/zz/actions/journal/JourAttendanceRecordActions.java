package com.zz.actions.journal;
//用户考勤记录表

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JourAttendanceRecord;
import com.zz.service.journal.JourAttendanceRecordService;
import com.zz.util.DateUtil;

import net.sf.json.JSON;
import net.sf.json.JSONObject;


public class JourAttendanceRecordActions extends BaseAction implements ModelDriven<JourAttendanceRecord>{
	
	private JourAttendanceRecord jourAttendanceRecord;
	
	@Override
	public JourAttendanceRecord getModel() {
		
		if(jourAttendanceRecord==null){
			jourAttendanceRecord = new JourAttendanceRecord();
		}
		return jourAttendanceRecord;
	}
	private JourAttendanceRecordService jourAttendanceRecordService;
	public void setJourAttendanceRecordService(JourAttendanceRecordService jourAttendanceRecordService) {
		this.jourAttendanceRecordService = jourAttendanceRecordService;
	}
	
	//增加考勤
	public String increaseAttendance(){
		try {
			int num = jourAttendanceRecordService.insertSelective(jourAttendanceRecord);
			if(num == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "打卡成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "打卡失败", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
			e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	} 
	//更新考勤（后续打卡）
	public String updateAttendance(){
		try {
			String time = DateUtil.getCurDateTime();
			if(jourAttendanceRecord.getJar()!=null){
				if(jourAttendanceRecord.getJar()==1){
					jourAttendanceRecord.setJarWork1(time);
				}else if(jourAttendanceRecord.getJar()==10){
					jourAttendanceRecord.setJarOffwork1(time);
				}else if(jourAttendanceRecord.getJar()==2){
					jourAttendanceRecord.setJarWork2(time);
				}else if(jourAttendanceRecord.getJar()==20){
					jourAttendanceRecord.setJarOffwork2(time);
				}else if(jourAttendanceRecord.getJar()==3){
					jourAttendanceRecord.setJarWork3(time);
				}else if(jourAttendanceRecord.getJar()==30){
					jourAttendanceRecord.setJarOffwork3(time);
				}else if(jourAttendanceRecord.getJar()==4){
					jourAttendanceRecord.setJarWork4(time);
				}else if(jourAttendanceRecord.getJar()==40){
					jourAttendanceRecord.setJarOffwork4(time);
				}
			}
			int num = jourAttendanceRecordService.updateByPrimaryKeySelective(jourAttendanceRecord);
			if(num == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "打卡成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "打卡失败", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		return null;
	}
	
	//查询考勤（所有）
	public String checkAttendance(){
		try {
			System.out.println("有没有这个参数究竟是什么情况 ："+jourAttendanceRecord.getJarUserId()+"-------");
			List<JourAttendanceRecord> list = jourAttendanceRecordService.selectJourAttendanceRecord(jourAttendanceRecord);
			if(list.size() > 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else if(list.size()==0){
            	 printlnOfJson(CommonMethodClass.jsonData(0, "当天没有符合条件的记录！", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
			
		} catch (Exception e) {
			  e.printStackTrace();Syslog.writeErr(e);
	          printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
	//查询系统时间
	public String obtainTime(){
		try {
			String curDateTime = DateUtil.getCurDateTime();
			String curDate = DateUtil.getCurDate();
			String curtime = DateUtil.getCurTime();
			JSONObject json1 = new JSONObject();
			json1.accumulate("curDateTime", curDateTime);
			json1.accumulate("curDate", curDate);
			json1.accumulate("curtime", curtime);
			String json=json1.toString();
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
		} catch (Exception e) {
			 printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
		}
		return null;
	}
	//添加考勤备注
	public String addAttendanceNote(){
		try {
			int num = jourAttendanceRecordService.addAttendanceNote(jourAttendanceRecord);
			if(num == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "备注成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "备注失败", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
			e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	}
}
