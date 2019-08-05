package com.zz.service.info;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoHouseMapper;
import com.zz.mapper.journal.JournalFinancialMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.po.info.InfoHouse;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalFinancialExpand;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;

public class HouseServiceImpl implements HouseService {
	private InfoHouse4storeMapper infoHouse4storeMapper;
	private InfoHouseMapper infoHouseMapper;
	private JournalFinancialMapper journalFinancialMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	
//	public void setJournalHousingFollowMapper(JournalHousingFollowMapper journalHousingFollowMapper) {
//		this.journalHousingFollowMapper = journalHousingFollowMapper;
//	}
//
	public void setInfoHouseMapper(InfoHouseMapper infoHouseMapper) {
		this.infoHouseMapper = infoHouseMapper;
	}

	public void setJournalFinancialMapper(
			JournalFinancialMapper journalFinancialMapper) {
		this.journalFinancialMapper = journalFinancialMapper;
	}

	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer houseCoding) throws Exception {
		return infoHouseMapper.deleteByPrimaryKey(houseCoding);
	}
	@Override
	public int addOffice(InfoHouseExpand office) throws Exception {
		//房源资料添加到数据库
		int result = infoHouseMapper.insertSelective(office);
		if(result == 0){
			throw new Exception("公区添加失败");
		}
		//房源资料添加到未租
		InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		//补充未租房的信息
		hs.setHsHouseId(office.getHouseCoding());
		hs.setHsAddCity(office.getAddCity());
		hs.setHsUserId(office.getUserId());
		hs.setHsStorefront(office.getStorefront());
		hs.setHsDepartment(office.getDepartment());
		hs.setHsAddCommunity(office.getKeyAdministrator());
		hs.setHsState(office.getHouseState());
		
		result = infoHouse4storeMapper.insertSelective(hs);
		if(result == 0){
			throw new Exception("公区添加失败");
		}
		return 1;
	}

	@Override
	public int updateOffice(InfoHouseExpand office) throws Exception {
		//修改办公区，添加数据到房源资料表
		int update = infoHouseMapper.updateByPrimaryKeySelective(office);
		if(update == 0){
			throw new Exception("公区修改失败");
		}
		//房源资料添加到未租
		InfoHouse4storeExpand updatehs = new InfoHouse4storeExpand();
		//补充未租房信息
		updatehs.setHsHouseId(office.getHouseCoding());
		updatehs.setHsAddCity(office.getAddCity());
		updatehs.setHsUserId(office.getUserId());
		updatehs.setHsStorefront(office.getStorefront());
		updatehs.setHsDepartment(office.getDepartment());
		updatehs.setHsAddCommunity(office.getKeyAdministrator());
		updatehs.setHsState(office.getHouseEntrust4sell());
		//修改办公区，添加数据到未租表
		update = infoHouse4storeMapper.updateOffice(updatehs);
		if(update == 0){
			throw new Exception("公区修改失败");
		}
		return update;
	}
	
	@Override
	public List<InfoHouseExpand> selectByPrimaryKey(Integer houseCoding) {
		return infoHouseMapper.selectByPrimaryKey(houseCoding);
	}

	@Override
	public String selectOfMaxNumber() throws Exception {
		return infoHouseMapper.selectOfMaxNumber();
	}

	@Override
	public int updateHouse(InfoHouseExpand record) throws Exception {
		InfoHouseExpand infe = new InfoHouseExpand();
		infe.setHouseId(record.getHouseId());
		infe.setHouseCoding(record.getHouseCoding());
		List<InfoHouseExpand> list = infoHouseMapper.selectByPrimaryKey(record.getHouseCoding());
		infe.setKeyAdministrator(record.getKeyAdministrator());
		infe.setKeyNumber(record.getKeyNumber());
		infe.setAddDoorplateno(record.getAddDoorplateno());
		infe.setHouseEntrust4rent(record.getHouseEntrust4rent());
		infe.setHouseEntrust4sell(record.getHouseEntrust4sell());
		if (list.isEmpty()) {
			System.out.println("123:"+list.size());
			return 0;
		}

		Map<String, String> map = new HashMap<String, String>();
		map.put("keyAdministrator", "供应商名称");
		map.put("keyNumbe", "联系人");
		map.put("houseEntrust4rent", "联系电话");
		map.put("houseEntrust4sell", "状态");
		map.put("addDoorplateno", "备注描述");
		StringBuffer followUp = new StringBuffer();
		Field[] newNotRent = infe.getClass().getSuperclass().getDeclaredFields();
		for (Field field : newNotRent) {
			field.setAccessible(true);
			if (map.containsKey(field.getName()) && field.get(infe) != null
					&& !field.get(infe).equals(field.get(list.get(0)))
					&& !(field.get(infe).equals("") && field.get(list.get(0)) == null)) {
				Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
				followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(infe) + ";");
			}
		}
		int result = updateByPrimaryKeySelective(record);
		if (result == 0) {
			throw new Exception("更新供应商失败");
		}

		//写跟进
		SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
		System.out.println("userInfo = " + userInfo);
		JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
		jhf.setJhfHouseId(record.getHouseId());
		jhf.setJhfUserId(userInfo.getUserId());
		jhf.setJhfDepartment(userInfo.getSuDepartmentId());
		jhf.setJhfStorefront(userInfo.getSuStoreId());
		jhf.setJhfPaymentWay("系统跟进");
		jhf.setJhfFollowResult("跟进成功");
		jhf.setJhfFollowRemark("修改供应商："+followUp.toString());
		if(jhf!=null) {
			journalHousingFollowMapper.insertSelective(jhf);
		}
		return 1;
	}

	@Override
	public int updateByPrimaryKeySelective(InfoHouseExpand record) throws Exception {
		return infoHouseMapper.updateByPrimaryKeySelective(record);

	}

	@Override
	public List<String> selectForAddress(InfoHouseExpand conditions)
			throws Exception {
		return infoHouseMapper.selectForAddress(conditions);
	}

	@Override
	public int insertList(List<InfoHouseExpand> recordList) throws Exception {
		return infoHouseMapper.insertList(recordList);
	}

	@Override
	public List<InfoHouseExpand> virtualProperty(InfoHouseExpand conditions)
			throws Exception {
		return infoHouseMapper.virtualProperty(conditions);
	}

	@Override
	public List<InfoHouseExpand> selectData(InfoHouseExpand conditions)
			throws Exception {
		return infoHouseMapper.selectData(conditions);
	}

	@Override
	public List<InfoHouseExpand> getemployee(InfoHouseExpand conditions)
			throws Exception {
		return infoHouseMapper.getemployee(conditions);
	}

	@Override
	public int updateVirBalance(InfoHouseExpand record) throws Exception {
		return infoHouseMapper.updateVirBalance(record);
	}

	@Override
	public int statisticsAllAccountBalance(InfoHouseExpand record) throws Exception {
		InfoHouseExpand info = new InfoHouseExpand();
		List<InfoHouseExpand> list = null;
		if(record.getAddCity() != null && !"".equals(record.getAddCity())){
			info.setAddCity(record.getAddCity());
			list = infoHouseMapper.virtualRoomVendorQuery(info);
		}else{
			info.setVirtualType("0");
			list = infoHouseMapper.virtualProperty(info);
		}
		for(InfoHouseExpand item : list){
			// 盘源id
			int hId = item.getHouseCoding();
			// 初始金额
			double initialAmount = item.getHouseSellingPrice();
			// 校准金额
			double calibrationAmount = item.getUnitPriceRent();
			// 查询财务收支汇总
			JournalFinancialExpand journalFinancialExpand = new JournalFinancialExpand();
			journalFinancialExpand.setJfHouseId(hId);
			Double num = 0.00;
			Double amount = 0.00;
			List<JournalFinancial> flist = journalFinancialMapper.theBalanceOfByHouseId(journalFinancialExpand);
			if (flist.size() > 0) {
				for (int j = 0; j < flist.size(); ++j) {
					String nature = flist.get(j).getJfNatureOfThe();
					if (nature.equals("收入")) {
						amount = amount + flist.get(j).getJfSumMoney();
					} else if (nature.equals("支出")) {
						amount = amount - flist.get(j).getJfSumMoney();
					}
				}
				num = initialAmount + amount + calibrationAmount;
			} else {
				num = initialAmount + calibrationAmount;
			}
			BigDecimal bg = new BigDecimal(num);  
            double f1 = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
            InfoHouseExpand house = new InfoHouseExpand();
            house.setHouseCoding(item.getHouseCoding());
            house.setUnitPriceSell(f1);
			int i = infoHouseMapper.updateByPrimaryKeySelective(house);
			if (i == 0) {
				throw new Exception("统计项目余额失败！");
			}
		}
		return 1;
	}
	//供应商查询
	@Override
	public List<InfoHouseExpand> virtualRoomVendorQuery(InfoHouseExpand conditions) throws Exception {
		return infoHouseMapper.virtualRoomVendorQuery(conditions);
	}

	//查项目
    @Override
    public List<InfoHouseExpand> getProject(InfoHouseExpand record) throws Exception {
        return infoHouseMapper.getProject(record);
    }

    //公司成本统计
    @Override
    public List<JournalFinancialExpand> getCompanyCost(InfoHouseExpand record) throws Exception {
        List<InfoHouseExpand> list = getProject(record);
        int[] hpIds = new int[list.size()];
        for (int i = 0; i < hpIds.length; i++) {
            hpIds[i] = list.get(i).getHouseCoding();
        }
        Map<String, Object> map  = new HashMap<String, Object>();
        map.put("startTime", record.getStartTime());
        map.put("endTime", record.getEndTime());
        map.put("hpIds", list);
        List<JournalFinancialExpand> list2 = journalFinancialMapper.getCompanyCost(map);
        for (JournalFinancialExpand jf : list2) {
            jf.setHpIds(hpIds);
        }
        return list2;
    }

    @Override
    public List<InfoHouseExpand> queryHousePaper(InfoHouseExpand conditions)
            throws Exception {
        return infoHouseMapper.queryHousePaper(conditions);
    }

    @Override
    public List<InfoHouseExpand> queryHousePaperCommon(
            InfoHouseExpand conditions) throws Exception {
        return infoHouseMapper.queryHousePaperCommon(conditions);
    }

	@Override
	public int insertSelective(InfoHouseExpand record) throws Exception {
		return infoHouseMapper.insertSelective(record);
	}
	
	@Override   
	//查询办公区
    public List<InfoHouseExpand> queryOffice(InfoHouseExpand office) throws Exception{
		return infoHouseMapper.queryOffice(office);
	}
}
