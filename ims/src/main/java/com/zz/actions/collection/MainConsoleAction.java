package com.zz.actions.collection;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.po.collection.MainConsoleExpand;
import com.zz.service.collection.MainConsoleService;


public class MainConsoleAction extends BaseAction implements ModelDriven<MainConsoleExpand> {
                                                                                                                                                                                                                                                                                                                                                                                                        
	private MainConsoleService mainConsoleService;
	private MainConsoleExpand mainConsoleExpand;

	public void setMainConsoleService(MainConsoleService mainConsoleService) {
		this.mainConsoleService = mainConsoleService;
	}
	
	// 查询新签租客/业主合约数
	public void countNewContractInConsole(){
		try {
			List<MainConsoleExpand> meList = mainConsoleService.countNewContractInConsole(mainConsoleExpand);
			if(meList.size() > 0){
				String json = JSONUtil.serialize(meList);
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
	
    // 查询即将到期合约数
    public void countContractDueExpired(){
        try {
            List<MainConsoleExpand> meList = mainConsoleService.countContractDueExpired(mainConsoleExpand);
            if(meList.size() > 0){
                String json = JSONUtil.serialize(meList);
                printlnOfJson(json);
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-2");
        }
    }
	
	//查询是否有待办事务/未领取维修
	public void countEventRepairInConsole(){
		try {
			List<MainConsoleExpand> meList = mainConsoleService.countEventRepairInConsole(mainConsoleExpand);
			if(meList.size() > 0){
				String json = JSONUtil.serialize(meList);
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-2");
        }
	}
	//查询30天业绩
	public void queryOneYearAchievement(){
		try {
			List<MainConsoleExpand> meList = mainConsoleService.queryOneYearAchievement(mainConsoleExpand);
			if(meList.size() > 0){
				String json = JSONUtil.serialize(meList);
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-2");
        }
	}
	//业务任务版获取数值
	public void countNumsInEmpConsole(){
		try {
			List<MainConsoleExpand> meList = mainConsoleService.countHouseNumsInConsole(mainConsoleExpand);//盘源数值
			meList.addAll(mainConsoleService.countStoreNumsInConsole(mainConsoleExpand));//出房数值
			meList.addAll(mainConsoleService.countManageCheckOutInConsole(mainConsoleExpand));//管房数值
			meList.addAll(mainConsoleService.countEventNumsInConsole(mainConsoleExpand));//事务数值
			if(meList.size() > 0){
				String json = JSONUtil.serialize(meList);
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-2");
        }
	}
	
	//综合任务版获取数值
	public void countNumsInAdminConsole(){
		try {
			List<MainConsoleExpand> meList = mainConsoleService.countGetRentInConsole(mainConsoleExpand);//收租数值
			meList.addAll(mainConsoleService.countPayStoreInConsole(mainConsoleExpand));//付租数值
			meList.addAll(mainConsoleService.countFinancialInConsole(mainConsoleExpand));//收支记录数值
			meList.addAll(mainConsoleService.countRentRenewalInConsole(mainConsoleExpand));//租客到期数值
			meList.addAll(mainConsoleService.countLandLordRenewalInConsole(mainConsoleExpand));//业主到期数值
			meList.addAll(mainConsoleService.countRepirInConsole(mainConsoleExpand));//维修数值
			meList.addAll(mainConsoleService.countEventNumsInConsole(mainConsoleExpand));//事务数值
			meList.addAll(mainConsoleService.countRentCheckOutInConsole(mainConsoleExpand));//租客退房数值
			meList.addAll(mainConsoleService.countStoreCheckOutInConsole(mainConsoleExpand));//业主退房数值
			if(meList.size() > 0){
				String json = JSONUtil.serialize(meList);
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-2");
        }
	}
	
	public void queryNoticeInConsole(){
		try {
			List<MainConsoleExpand> meList = mainConsoleService.queryNoticeInConsole(mainConsoleExpand);
			if(meList.size() > 0){
				String json = JSONUtil.serialize(meList);
				System.out.println(json);
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-2");
        }
	}
	
	/**
	 * 查询发起/待办事务数量
	 */
	public void countEventNumsInConsole(){
	    try {
            List<MainConsoleExpand> meList = mainConsoleService.countEventNumsInConsole(mainConsoleExpand);
            if(meList.size() > 0){
                String json = JSONUtil.serialize(meList);
                printlnOfJson(json);
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-2");
        }
	}
	
	@Override
	public MainConsoleExpand getModel() {
		if(mainConsoleExpand==null){
			mainConsoleExpand = new MainConsoleExpand();
		}
		return mainConsoleExpand;
	}

}
