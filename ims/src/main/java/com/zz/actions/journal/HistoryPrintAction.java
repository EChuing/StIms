package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JournalHistoryPrintExpand;
import com.zz.service.journal.HistoryPrintService;

public class HistoryPrintAction extends BaseAction implements ModelDriven<JournalHistoryPrintExpand> {
	private HistoryPrintService historyPrintService;
	private JournalHistoryPrintExpand journalHistoryPrintExpand;
    
    public void setHistoryPrintService(HistoryPrintService historyPrintService) {
        this.historyPrintService = historyPrintService;
    }
    
    @Override
    public JournalHistoryPrintExpand getModel() {
        if(journalHistoryPrintExpand==null){
            journalHistoryPrintExpand = new JournalHistoryPrintExpand();
        }
        return journalHistoryPrintExpand;
    }
	
	/**
	 * 查询历史打印票据
	 * @return
	 */
	public String selectHistoryPrint(){
	    //历史打印 - 查询     B04b01
        int auth1 = Authority.authorize("B04b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看历史打印票据权限", null));
            return null;
        }
		try {
			List<JournalHistoryPrintExpand> list = historyPrintService.selectAllPrint(journalHistoryPrintExpand);

			System.out.println(list);

			if(list.size()!=0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
			    printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}
    
    /**
     * 查询历史打印票据
     * @return
     */
    public String selectHistoryPrintCommon(){
        try {
            List<JournalHistoryPrintExpand> list = historyPrintService.selectAllPrint(journalHistoryPrintExpand);
            if(list.size()!=0){
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
	
	public String insertHistoryPrint(){
		System.out.println(journalHistoryPrintExpand.toString());
		try {
			int result = historyPrintService.insertSelective(journalHistoryPrintExpand);
			if(result==1){
				printlnMsg("1");
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	}

}
