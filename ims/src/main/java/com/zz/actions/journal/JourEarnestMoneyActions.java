package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.journal.JourEarnestMoney;
import com.zz.po.journal.JourEarnestMoneyExpand;
import com.zz.service.journal.JourEarnestMoneyService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class JourEarnestMoneyActions extends BaseAction implements ModelDriven<JourEarnestMoneyExpand> {
	private JourEarnestMoneyExpand jourEarnestMoneyExpand;
	@Autowired
	private JourEarnestMoneyService jourEarnestMoneyService;
    
	@Override
    public JourEarnestMoneyExpand getModel() {
        if( jourEarnestMoneyExpand==null){
			jourEarnestMoneyExpand = new JourEarnestMoneyExpand();
        }
        return jourEarnestMoneyExpand;
    }

	public String insertJourEarnestMoney(){
		int result= 0;
		try {
			System.out.println("jourEarnestMoneyExpand="+jourEarnestMoneyExpand);
			result = jourEarnestMoneyService.insertRecord(jourEarnestMoneyExpand);
			if(result>0){
				printlnOfJson(CommonMethodClass.jsonData(1, "添加下定成功！", null));
			}else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加下定失败！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统错误！", null));
		}
		return "";
	}

	public void selectJourEarnestmoneyList(){
		try {
			List<JourEarnestMoneyExpand> list= jourEarnestMoneyService.selectJourEarnestMoneyExpandList(jourEarnestMoneyExpand);
			if (list.size()>=0){
				String json= JSONUtil.serialize(list);
				System.out.println(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "添加下定成功！", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加下定失败！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统错误！", null));
		}
	}


	public void updateDepositState(){
		try {
			int result= jourEarnestMoneyService.updateDepositState(jourEarnestMoneyExpand.getJemHsId(),jourEarnestMoneyExpand.getType());
			if (result<0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加下定失败！", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "添加下定成功！",null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统错误！", null));
		}
	}

	public void queryDeposit(){
		try {
			List<JourEarnestMoneyExpand> list= jourEarnestMoneyService.queryDeposit(jourEarnestMoneyExpand);
			if (list.size()<0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加下定失败！", null));
			}else{
				String json= JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "添加下定成功！",json));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统错误！", null));
		}
	}
}
