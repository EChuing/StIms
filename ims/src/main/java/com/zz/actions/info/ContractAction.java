package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.service.info.ContractService;


/* * 合约表**/

public class ContractAction extends BaseAction implements ModelDriven<InfoRenewalRenterExpand>{
	private InfoRenewalRenterExpand infoRenewalRenterExpand;
	@Autowired
	private ContractService contractService;
    
	@Override
    public InfoRenewalRenterExpand getModel() {
        if( infoRenewalRenterExpand==null){
            infoRenewalRenterExpand = new InfoRenewalRenterExpand();
        }
        return infoRenewalRenterExpand;
    }
	//查询所有合约信息,有条件则条件查询 1为纸质合同 2为电子签约
    public String queryTenant() {
		try {
			//System.out.println(infoRenewalRenterExpand.getJrrTypeOfContract());
			List<InfoRenewalRenterExpand> list = contractService.selectTenant(infoRenewalRenterExpand);
			String json = JSON.toJSONString(list);
			System.out.println(json);
			if (list.size() != 0) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

  //查询所有业主合约信息
    public String queryOwner() {
		try {
			//System.out.println(infoRenewalRenterExpand.getJrrTypeOfContract());
			Integer jrlId = infoRenewalRenterExpand.getJrlId();
			InfoRenewalLandlord infoRenewalLandlord =new InfoRenewalLandlord();
			infoRenewalLandlord.setJrlId(jrlId);
			infoRenewalLandlord.setStartNum(infoRenewalRenterExpand.getStartNum());
			infoRenewalLandlord.setEndNum(infoRenewalRenterExpand.getEndNum());
			infoRenewalLandlord.setTheSortTerm(infoRenewalRenterExpand.getTheSortTerm());
			infoRenewalLandlord.setTheSortContrary(infoRenewalRenterExpand.getTheSortContrary());
			List<InfoRenewalLandlord> list = contractService.selectOwner(infoRenewalLandlord);
			JSONArray json = (JSONArray) JSON.toJSON(list);
			if (list.size() != 0) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}
}
