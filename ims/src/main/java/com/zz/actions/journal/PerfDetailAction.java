package com.zz.actions.journal;

import java.util.List;

import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.journal.JournalPerfDetail;
import com.zz.service.journal.PerfDetailService;

public class PerfDetailAction extends BaseAction implements ModelDriven<JournalPerfDetail>{
	private JournalPerfDetail journalPerfDetail;
	private PerfDetailService perfDetailService;
	public void JournalPerfDetail(
			JournalPerfDetail journalPerfDetail) {
		this.journalPerfDetail = journalPerfDetail;
	}
	public void setPerfDetailService(
			PerfDetailService perfDetailService) {
		this.perfDetailService = perfDetailService;
	}
	
	public String getPerfDetail(){
		try {
			List<JournalPerfDetail> list = perfDetailService.selectByJP(journalPerfDetail);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {}
		return null;
	}
	
	@Override
	public JournalPerfDetail getModel() {
		// TODO Auto-generated method stub
		if(journalPerfDetail == null){
			journalPerfDetail = new JournalPerfDetail();
		}
		return journalPerfDetail;
	}

}
