package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JourWxPayment;
import com.zz.service.journal.WxPaymentService;

public class WxPaymentAction extends BaseAction implements ModelDriven<JourWxPayment>{
	private JourWxPayment jourWxPayment;
	private WxPaymentService wxPaymentService;

    public void setWxPaymentService(WxPaymentService wxPaymentService) {
        this.wxPaymentService = wxPaymentService;
    }
    
    @Override
    public JourWxPayment getModel() {
        if(jourWxPayment == null){
            jourWxPayment = new JourWxPayment();
        }
        return jourWxPayment;
    }
    
	/**
	 * 查询微信账单-数据和统计分开
	 * @return
	 */
	public String selectWxPayment(){
	    //租客账单 - 查询微信账单     B03b02
        int auth1 = Authority.authorize("B03b02");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看微信账单权限", null));
            return null;
        }
		try {
			List<JourWxPayment> list = wxPaymentService.selectAllWxPayment(jourWxPayment);
			if(list.size()!=0){
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
