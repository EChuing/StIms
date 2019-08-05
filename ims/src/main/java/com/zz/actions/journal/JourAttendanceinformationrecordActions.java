package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourAttendanceinformationrecord;
import com.zz.service.journal.JourAttendanceinformationrecordService;

public class JourAttendanceinformationrecordActions extends BaseAction implements ModelDriven<JourAttendanceinformationrecord>{
	
	private JourAttendanceinformationrecord jourAttendanceinformationrecord;
	
	@Override
	public JourAttendanceinformationrecord getModel() {
		if(jourAttendanceinformationrecord==null){
			jourAttendanceinformationrecord = new JourAttendanceinformationrecord();
		}
		return jourAttendanceinformationrecord;
	}
	
	private JourAttendanceinformationrecordService jourAttendanceinformationrecordService;
	public void setJourAttendanceinformationrecordService(
			JourAttendanceinformationrecordService jourAttendanceinformationrecordService) {
		this.jourAttendanceinformationrecordService = jourAttendanceinformationrecordService;
	}
	
	public String insertJourAttendanceInformationRecord(){
		
		try {
			int num = jourAttendanceinformationrecordService.insertJourAttendanceInformationRecord(jourAttendanceinformationrecord);
			if(num == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "插入成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "插入失败", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		return null;
	}
}