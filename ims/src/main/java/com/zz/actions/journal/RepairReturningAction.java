package com.zz.actions.journal;


import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JournalRepairReturning;
import com.zz.po.journal.JournalRepairReturningExpand;
import com.zz.service.journal.RepairReturningService;

/**
 * 维保回访
 * @author Administrator
 *
 */
public class RepairReturningAction extends BaseAction implements ModelDriven<JournalRepairReturningExpand>{
	private JournalRepairReturningExpand journalRepairReturningExpand;
	private RepairReturningService repairReturningService;

    public void setRepairReturningService(RepairReturningService repairReturningService) {
        this.repairReturningService = repairReturningService;
    }

    @Override
    public JournalRepairReturningExpand getModel() {
        if( journalRepairReturningExpand==null){
            journalRepairReturningExpand = new JournalRepairReturningExpand();
        }
        return journalRepairReturningExpand;
    }
	
	//ALL
	public String queryAllRepairReturning(){
		try {
			List<JournalRepairReturningExpand> RepairReturning = repairReturningService.selectAll(journalRepairReturningExpand);
			if(RepairReturning.size()!=0){
				String json = JSONUtil.serialize(RepairReturning);
				
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
	//增加记录回访
	public String insertRepairReturning(){
	    try {
            int result = repairReturningService.insertSelective(journalRepairReturningExpand);
            int id = journalRepairReturningExpand.getRetId();
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "增加失败", null));
            }else{
                List<JournalRepairReturning> list = new ArrayList<>();
                JournalRepairReturning jrr = new JournalRepairReturning();
                jrr.setRetId(id);
                list.add(jrr);
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	//更新记录
	public String updateRepairReturning(){
		try {
			int result = repairReturningService.updateByPrimaryKeySelective(journalRepairReturningExpand);
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
}
