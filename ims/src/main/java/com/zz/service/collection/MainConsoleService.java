package com.zz.service.collection;

import java.util.List;

import com.zz.po.collection.MainConsoleExpand;

public interface MainConsoleService {
    List<MainConsoleExpand> queryOneYearAchievement(MainConsoleExpand record) throws Exception;
    List<MainConsoleExpand> queryNoticeInConsole(MainConsoleExpand record) throws Exception;
    List<MainConsoleExpand> countHouseNumsInConsole(MainConsoleExpand record) throws Exception;
    List<MainConsoleExpand> countEventNumsInConsole(MainConsoleExpand record) throws Exception;
    List<MainConsoleExpand> countStoreNumsInConsole(MainConsoleExpand record) throws Exception;
    List<MainConsoleExpand> countGetRentInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countPayStoreInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countFinancialInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countRentRenewalInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countLandLordRenewalInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countRepirInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countRentCheckOutInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countStoreCheckOutInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countManageCheckOutInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countEventRepairInConsole(MainConsoleExpand record) throws Exception;
	List<MainConsoleExpand> countNewContractInConsole(MainConsoleExpand record) throws Exception;
    List<MainConsoleExpand> countContractDueExpired(MainConsoleExpand record) throws Exception;
}
