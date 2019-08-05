package com.zz.actions.journal;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.DashLandFreeEarnings;
import com.zz.service.journal.DashLandFreeEarningsService;

public class DashLandFreeEarningsAction extends BaseAction implements ModelDriven<DashLandFreeEarnings>{
	private DashLandFreeEarnings dashLandFreeEarnings;
	private DashLandFreeEarningsService dashLandFreeEarningsService;
	public void DashLandFreeEarnings(
			DashLandFreeEarnings dashLandFreeEarnings) {
		this.dashLandFreeEarnings = dashLandFreeEarnings;
	}
	public void setDashLandFreeEarningsService(
			DashLandFreeEarningsService dashLandFreeEarningsService) {
		this.dashLandFreeEarningsService = dashLandFreeEarningsService;
	}
	
	public void getLandFreeEarnings(){
	    //免租收益 - 查询     F05b01
        int auth1 = Authority.authorize("F05b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看免租收益权限", null));
            return;
        }
		try {
			DashLandFreeEarnings dlfe = dashLandFreeEarningsService.selectByPrimaryKey(1);
			if(dlfe != null){
				String json = JSONUtil.serialize(dlfe);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
			    printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
		    e.printStackTrace();
			Syslog.writeErr(e);
		    printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
	}
	
	@Override
	public DashLandFreeEarnings getModel() {
		if(dashLandFreeEarnings == null){
			dashLandFreeEarnings = new DashLandFreeEarnings();
		}
		return dashLandFreeEarnings;
	}

}
