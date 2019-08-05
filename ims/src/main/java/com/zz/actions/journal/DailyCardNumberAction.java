package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.journal.JournalDailyCardNumber;
import com.zz.service.journal.DailyCardNumberService;

public class DailyCardNumberAction extends BaseAction implements ModelDriven<JournalDailyCardNumber>{
	private JournalDailyCardNumber journalDailyCardNumber;
	private DailyCardNumberService dailyCardNumberService;
	public void setJournalDailyCardNumber(
			JournalDailyCardNumber journalDailyCardNumber) {
		this.journalDailyCardNumber = journalDailyCardNumber;
	}
	public void setDailyCardNumberService(
			DailyCardNumberService dailyCardNumberService) {
		this.dailyCardNumberService = dailyCardNumberService;
	}
	@Override
	public JournalDailyCardNumber getModel() {
		if(journalDailyCardNumber == null){
			journalDailyCardNumber = new JournalDailyCardNumber();
		}
		return journalDailyCardNumber;
	}
	
	//查询
	public String selectDailyCardNumber(){
	    try {
            List<JournalDailyCardNumber> dcnList = dailyCardNumberService.selectByPrimaryKey(journalDailyCardNumber);
            if(dcnList.size() != 0){
                String json = JSONUtil.serialize(dcnList);
                printlnOfJson(json);
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	
	//新增
	public String insertDailyCardNumber(){
	    try {
            int serult = dailyCardNumberService.insertSelective(journalDailyCardNumber);
            if(serult != 0){
                printlnMsg("1");
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	
	//修改
	public String updateDailyCardNumber(){
	    try {
            int serult = dailyCardNumberService.updateByPrimaryKeySelective(journalDailyCardNumber);
            if(serult != 0){
                printlnMsg("1");
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            printlnMsg("-1");
            e.printStackTrace();Syslog.writeErr(e);
        }
		return null;
	}

}
