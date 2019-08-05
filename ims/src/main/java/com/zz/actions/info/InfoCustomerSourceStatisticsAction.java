package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoCustomerSourceStatistics;
import com.zz.service.info.InfoCustomerSourceStatisticsService;

public class InfoCustomerSourceStatisticsAction extends BaseAction implements ModelDriven<InfoCustomerSourceStatistics>{
	private InfoCustomerSourceStatistics infoCustomerSourceStatistics;
	private InfoCustomerSourceStatisticsService infoCustomerSourceStatisticsService;
	
	public void setInfoCustomerSourceStatisticsService(
			InfoCustomerSourceStatisticsService infoCustomerSourceStatisticsService) {
		this.infoCustomerSourceStatisticsService = infoCustomerSourceStatisticsService;
	}
	
	/**
	 * 客户来源统计
	 * @return
	 */
	public String getCustomerSourceStatistics() {
	    //客户来源 - 查询     F09b01
        int auth1 = Authority.authorize("F09b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看客户来源权限", null));
            return null;
        }
		try {
			List<InfoCustomerSourceStatistics> list = infoCustomerSourceStatisticsService.selectAll(infoCustomerSourceStatistics);
			if (list.size() != 0) {
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
	
	@Override
	public InfoCustomerSourceStatistics getModel() {
		if(infoCustomerSourceStatistics==null){
			infoCustomerSourceStatistics = new InfoCustomerSourceStatistics();
		}
		return infoCustomerSourceStatistics;
	}

}
