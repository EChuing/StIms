package com.zz.actions.push;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.push.PushBkHouseStatus;
import com.zz.service.push.PushBkHouseStatusService;

public class PushBkHouseStatusAction extends BaseAction implements ModelDriven<PushBkHouseStatus>{

	private PushBkHouseStatus pushBkHouseStatus;
	private PushBkHouseStatusService pushBkHouseStatusService;
	
	public void setPushBkHouseStatusService(PushBkHouseStatusService pushBkHouseStatusService){
		this.pushBkHouseStatusService = pushBkHouseStatusService;
	}
	
	@Override
	public PushBkHouseStatus getModel() {
		if(pushBkHouseStatus == null){
			pushBkHouseStatus = new PushBkHouseStatus();
		}
		return pushBkHouseStatus;
	}
	
	public List<PushBkHouseStatus> selectBkHouseStatus(){
		try {
			List<PushBkHouseStatus> list = pushBkHouseStatusService.queryBkHouseStatus(pushBkHouseStatus);
			 if(list.size() > 0){
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
	
	
	
	
	
	
	
	
	
}
