package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JournalStaffSalaries;
import com.zz.service.journal.StaffSalariesService;

public class StaffSalariesAction extends BaseAction implements ModelDriven<JournalStaffSalaries>{
    private JournalStaffSalaries journalStaffSalaries;
    private StaffSalariesService staffSalariesService;
	public void setJournalStaffSalaries(JournalStaffSalaries journalStaffSalaries) {
		this.journalStaffSalaries = journalStaffSalaries;
	}
	public void setStaffSalariesService(StaffSalariesService staffSalariesService) {
		this.staffSalariesService = staffSalariesService;
	}
    @Override
    public JournalStaffSalaries getModel() {
        if(journalStaffSalaries == null){
            journalStaffSalaries = new JournalStaffSalaries();
        }
        return journalStaffSalaries;
    }
	
	//查询
	public String selectStaffSalaries(){
	    try {
            List<JournalStaffSalaries> list = staffSalariesService.selectByPrimaryKey(journalStaffSalaries);
            if(list.size() != 0 ){
                String json = JSONUtil.serialize(list);
                
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}

	//新增
	public String insertStaffSalaries(){
		try {
			int result = staffSalariesService.insertSelective(journalStaffSalaries);
			if(result != 0 ){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//修改
	public String updateStaffSalaries(){
		try {
			int result = staffSalariesService.updateByPrimaryKeySelective(journalStaffSalaries);
			if(result != 0 ){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//删除
	public String deleteStaffSalaries(){
		try {
			int result = staffSalariesService.deleteByPrimaryKey(journalStaffSalaries.getSsaId());
			if(result != 0 ){
				printlnMsg("1");
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {}
		return null;
	}
	
}
