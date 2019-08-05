package com.zz.actions.journal;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.DashHousePrice;
import com.zz.service.journal.DashHousePriceService;

public class DashHousePriceAction  extends BaseAction implements ModelDriven<DashHousePrice>{
	private DashHousePrice dashHousePrice;
	private DashHousePriceService dashHousePriceService;
	public void DashHousePrice(
			DashHousePrice dashHousePrice) {
		this.dashHousePrice = dashHousePrice;
	}
	public void setDashHousePriceService(
			DashHousePriceService dashHousePriceService) {
		this.dashHousePriceService = dashHousePriceService;
	}
	@Override
	public DashHousePrice getModel() {
		if(dashHousePrice == null){
			dashHousePrice = new DashHousePrice();
		}
		return dashHousePrice;
	}
    
	/**
	 * 查询房源租金分布统计
	 */
    public void getHousePrice(){
        //租价分布 - 查询     F04b01
        int auth1 = Authority.authorize("F04b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看租价分布权限", null));
            return;
        }
        try {
            DashHousePrice dhs = dashHousePriceService.selectByPrimaryKey(1);
            if(dhs != null){
                String json = JSONUtil.serialize(dhs);
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

}
