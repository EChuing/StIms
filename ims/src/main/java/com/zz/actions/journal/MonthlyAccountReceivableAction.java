package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JournalMonthlyAccountReceivable;
import com.zz.service.journal.MonthlyAccountReceivableService;

public class MonthlyAccountReceivableAction extends BaseAction implements ModelDriven<JournalMonthlyAccountReceivable> {
	private JournalMonthlyAccountReceivable journalMonthlyAccountReceivable;
	private MonthlyAccountReceivableService monthlyAccountReceivableService;

	public void setMonthlyAccountReceivableService(
			MonthlyAccountReceivableService monthlyAccountReceivableService) {
		this.monthlyAccountReceivableService = monthlyAccountReceivableService;
	}

	@Override
	public JournalMonthlyAccountReceivable getModel() {
		if(journalMonthlyAccountReceivable == null){
			journalMonthlyAccountReceivable = new JournalMonthlyAccountReceivable();
		}
		return journalMonthlyAccountReceivable;
	}
	
	public String selectMonthlyAccountReceivable(){
		try {
			List<JournalMonthlyAccountReceivable> list = monthlyAccountReceivableService.selectByHrId(journalMonthlyAccountReceivable);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	public String updateMonthlyAccountReceivable(){
		try {
			int result = monthlyAccountReceivableService.updateByPrimaryKeySelective(journalMonthlyAccountReceivable);
			if(result != 0){
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
	
	//新增财务收支与历史能源账单、更新未租房能源字段
	public String newInsertFinancialEnergyBill(){
		try {
			int result = monthlyAccountReceivableService.insertFinancialEnergyBill(journalMonthlyAccountReceivable);
			if(result == 1){
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
	
}
