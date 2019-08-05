package com.zz.actions.journal;

import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JournalRepairProgress;
import com.zz.po.journal.JournalRepairProgressExpand;
import com.zz.service.journal.RepairProgressService;

/**
 * 维保进展
 * @author Administrator
 * 
 */
public class RepairProgressAction extends BaseAction implements ModelDriven<JournalRepairProgressExpand>{
	private JournalRepairProgressExpand journalRepairProgressExpand;
	private RepairProgressService repairProgressService;

    public void setRepairProgressService(RepairProgressService repairProgressService) {
        this.repairProgressService = repairProgressService;
    }

    @Override
    public JournalRepairProgressExpand getModel() {
        if( journalRepairProgressExpand==null){
            journalRepairProgressExpand = new JournalRepairProgressExpand();
        }
        return journalRepairProgressExpand;
    }
    
	//ALL
	public String queryAllRepairProgress(){
		try {
			List<JournalRepairProgressExpand> RepairProgress = repairProgressService.selectAll(journalRepairProgressExpand);
			if(RepairProgress.size()!=0){
				String json = JSONUtil.serialize(RepairProgress);
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
	
	//增加记录跟进
	public String insertRepairProgress(){
	    try {
            int result = repairProgressService.insertSelective(journalRepairProgressExpand);
            int id = journalRepairProgressExpand.getProId();
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "增加跟进失败", null));
            }else{
                List<JournalRepairProgress> list = new ArrayList<>();
                JournalRepairProgress jrp = new JournalRepairProgress();
                jrp.setProId(id);
                list.add(jrp);
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
	public String updateRepairProgress(){
		try {
			int result = repairProgressService.updateByPrimaryKeySelective(journalRepairProgressExpand);
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "更新记录失败", null));
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
