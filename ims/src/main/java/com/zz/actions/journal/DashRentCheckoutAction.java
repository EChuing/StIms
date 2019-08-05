package com.zz.actions.journal;

import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.DashRentCheckout;
import com.zz.service.journal.DashRentCheckoutService;

public class DashRentCheckoutAction extends BaseAction implements ModelDriven<DashRentCheckout>{
    
    private DashRentCheckout dashRentCheckout;
    private DashRentCheckoutService dashRentCheckoutService;
    
    public void setDashRentCheckoutService(
            DashRentCheckoutService dashRentCheckoutService) {
        this.dashRentCheckoutService = dashRentCheckoutService;
    }

    @Override
    public DashRentCheckout getModel() {
        if(dashRentCheckout == null){
            dashRentCheckout = new DashRentCheckout();
        }
        return dashRentCheckout;
    }
    
    /**
     * 到期分布
     * @throws JSONException
     */
    public void getDashRentCheckout() throws JSONException{
        //到期分布 - 查询     F10b01
        int auth1 = Authority.authorize("F10b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看到期分布权限", null));
            return;
        }
        DashRentCheckout dash = dashRentCheckoutService.select();
        if(dash != null){
            String json = JSONUtil.serialize(dash);
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
        }else{
            printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
        }
    }

}
