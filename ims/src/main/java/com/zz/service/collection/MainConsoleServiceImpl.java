package com.zz.service.collection;

import java.util.List;

import com.zz.mapper.collection.MainConsoleMapper;
import com.zz.po.collection.MainConsoleExpand;

public class MainConsoleServiceImpl implements MainConsoleService {
	
	private MainConsoleMapper mainConsoleMapper;
	
	public void setMainConsoleMapper(MainConsoleMapper mainConsoleMapper) {
		this.mainConsoleMapper = mainConsoleMapper;
	}


	@Override
	public List<MainConsoleExpand> queryOneYearAchievement(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.queryOneYearAchievement(record);
	}


	@Override
	public List<MainConsoleExpand> queryNoticeInConsole(MainConsoleExpand record)
			throws Exception {
		return mainConsoleMapper.queryNoticeInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countHouseNumsInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countHouseNumsInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countEventNumsInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countEventNumsInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countStoreNumsInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countStoreNumsInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countGetRentInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countGetRentInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countPayStoreInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countPayStoreInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countFinancialInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countFinancialInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countRentRenewalInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countRentRenewalInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countLandLordRenewalInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countLandLordRenewalInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countRepirInConsole(MainConsoleExpand record)
			throws Exception {
		return mainConsoleMapper.countRepirInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countRentCheckOutInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countRentCheckOutInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countStoreCheckOutInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countStoreCheckOutInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countManageCheckOutInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countManageCheckOutInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countEventRepairInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countEventRepairInConsole(record);
	}


	@Override
	public List<MainConsoleExpand> countNewContractInConsole(
			MainConsoleExpand record) throws Exception {
		return mainConsoleMapper.countNewContractInConsole(record);
	}


    @Override
    public List<MainConsoleExpand> countContractDueExpired(
            MainConsoleExpand record) throws Exception {
        return mainConsoleMapper.countContractDueExpired(record);
    }
}
