package com.zz.actions.journal;
//用户考勤班次表

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JourShiftSchedule;
import com.zz.service.journal.JourShiftScheduleService;

import net.sf.json.JSONArray;

public class JourShiftScheduleActions extends BaseAction implements ModelDriven<JourShiftSchedule>{

	private JourShiftSchedule jourShiftSchedule;
	@Override
	public JourShiftSchedule getModel() {
		
		if (jourShiftSchedule==null){
			jourShiftSchedule = new JourShiftSchedule();
		}
		return jourShiftSchedule;
	}
	
	private JourShiftScheduleService jourShiftScheduleService;
	public void setJourShiftScheduleService(JourShiftScheduleService jourShiftScheduleService) {
		this.jourShiftScheduleService = jourShiftScheduleService;
	}
	//修改班次
	public String modifyTheShift(){
		try {
			//System.out.println("updateJson : "+updateJson);
			jourShiftSchedule.setJssId(1);
			//System.out.println(jourShiftSchedule.toString());
			int num = jourShiftScheduleService.updateByPrimaryKeySelective(jourShiftSchedule);
			if(num == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "修改成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}
			
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
			e.printStackTrace();
			Syslog.writeErr(e);
		}
		return null;
	}
	//查询班次
	public List<JourShiftSchedule> selectJourShiftSchedule(){
		try {
			List<JourShiftSchedule> list = jourShiftScheduleService.selectJourShiftSchedule(jourShiftSchedule);
			if(list.size() > 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
		} catch (Exception e) {
			 e.printStackTrace();Syslog.writeErr(e);
	         printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
}