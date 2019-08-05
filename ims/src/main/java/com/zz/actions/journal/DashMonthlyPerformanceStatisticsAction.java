package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.journal.DashMonthlyPerformanceStatistics;
import com.zz.service.journal.MonthlyPerformanceStatisticsService;

import net.sf.json.JSONObject;

public class DashMonthlyPerformanceStatisticsAction extends BaseAction implements ModelDriven<DashMonthlyPerformanceStatistics>{
	private DashMonthlyPerformanceStatistics dashMonthlyPerformanceStatistics;
	private MonthlyPerformanceStatisticsService monthlyPerformanceStatisticsService;
	public void setMonthlyPerformanceStatisticsService(
			MonthlyPerformanceStatisticsService monthlyPerformanceStatisticsService) {
		this.monthlyPerformanceStatisticsService = monthlyPerformanceStatisticsService;
	}
	@Override
	public DashMonthlyPerformanceStatistics getModel() {
		if(dashMonthlyPerformanceStatistics == null){
			dashMonthlyPerformanceStatistics = new DashMonthlyPerformanceStatistics();
		}
		return dashMonthlyPerformanceStatistics;
	}
	
	/**
	 * 老板仪表盘-业绩统计
	 * @throws JSONException 
	 */
	public void performanceStatistics() throws JSONException{
	    List<DashMonthlyPerformanceStatistics> list = monthlyPerformanceStatisticsService.listPerformance(dashMonthlyPerformanceStatistics);
        Integer total;
        if (list.size() > 0) {
            total = list.get(0).getTotalNum();
        } else {
            total = 0;
        }
        JSONObject jsonObj = new JSONObject();
        jsonObj.accumulate("total", total);
        jsonObj.accumulate("rows", list);
        String json = jsonObj.toString();
        printlnOfJson(json);
	}
	
	/**
	 * 报表策略-用户考核表-业绩概况
	 */
	public void employeesSelectMonthlyPerformanceStatistics(){
	    try {
            List<DashMonthlyPerformanceStatistics>list = monthlyPerformanceStatisticsService.listPerformance(dashMonthlyPerformanceStatistics);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(json);
            }else{
                printMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printMsg("-1");
        }
	}
}
