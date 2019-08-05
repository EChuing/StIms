package com.zz.actions.journal;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.journal.DashFinancialStatistics;
import com.zz.service.journal.DashFinancialStatisticsService;

public class DashFinancialStatisticsAction extends BaseAction implements ModelDriven<DashFinancialStatistics>{
    private DashFinancialStatistics dashFinancialStatistics;
    private DashFinancialStatisticsService dashFinancialStatisticsService;
	public void setDashFinancialStatisticsService(
			DashFinancialStatisticsService dashFinancialStatisticsService) {
		this.dashFinancialStatisticsService = dashFinancialStatisticsService;
	}
	@Override
	public DashFinancialStatistics getModel() {
		if(dashFinancialStatistics == null){
			dashFinancialStatistics = new DashFinancialStatistics();
		}
		return dashFinancialStatistics;
	}
	
	/**
	 * 查询（老板工作台：财务统计）
	 */
	public void selectDashFinancialStatistics(){
	    try {
            DashFinancialStatistics dfs = dashFinancialStatisticsService.selectByPrimaryKey(1);
            if(dfs != null){
                String json = JSONUtil.serialize(dfs);
                printlnOfJson(json);
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnMsg("-2");
        }
	}
	
}
