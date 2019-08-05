package com.zz.service.journal;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.journal.JournalDailyCardNumberMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.po.journal.JournalDailyCardNumber;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;

public class DailyCardNumberServiceImpl implements DailyCardNumberService {
	private JournalDailyCardNumberMapper journalDailyCardNumberMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;

	public void setJournalHousingFollowMapper(JournalHousingFollowMapper journalHousingFollowMapper) {
		this.journalHousingFollowMapper = journalHousingFollowMapper;
	}
	public void setJournalDailyCardNumberMapper(
			JournalDailyCardNumberMapper journalDailyCardNumberMapper) {
		this.journalDailyCardNumberMapper = journalDailyCardNumberMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer jdcnId) throws Exception {
		// TODO Auto-generated method stub
		return journalDailyCardNumberMapper.deleteByPrimaryKey(jdcnId);
	}

	@Override
	public int insertSelective(JournalDailyCardNumber record) throws Exception {
		//添加能源卡号跟进
		int result=journalDailyCardNumberMapper.insertSelective(record);
		if(result == 1){
			SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
			JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
			jhf.setJhfHouseId(record.getJhfHouseId());
			jhf.setJhfHouse4rentId(record.getJhfHouse4rentId());
			jhf.setJhfHouse4storeId(record.getJdcnHouse4storeId());
			jhf.setJhfUserId(userInfo.getUserId());
			jhf.setJhfStorefront(userInfo.getSuStoreId());
			jhf.setJhfDepartment(userInfo.getSuDepartmentId());
			jhf.setJhfPaymentWay("系统跟进");
			jhf.setJhfFollowResult("修改成功");
			jhf.setJhfFollowRemark("新增能源卡类型："+record.getJdcnCardName()+"，用户编号："+record.getJdcnCardNumber());
			int result1 = journalHousingFollowMapper.insertSelective(jhf);
			return result;
		}
			return 1;
}
		
	
	

	@Override
	public List<JournalDailyCardNumber> selectByPrimaryKey(JournalDailyCardNumber record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalDailyCardNumberMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalDailyCardNumber record)
			throws Exception {
		// TODO Auto-generated method stub
		int result = journalDailyCardNumberMapper.updateByPrimaryKeySelective(record);
		//添加修改跟进
		if(result == 1){
			JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
			jhf.setJhfHouseId(record.getJhfHouseId());
			jhf.setJhfHouse4rentId(record.getJhfHouse4rentId());
			jhf.setJhfHouse4storeId(record.getJdcnHouse4storeId());
			jhf.setJhfUserId(record.getJhfUserId());
			jhf.setJhfStorefront(record.getJhfStorefront());
			jhf.setJhfDepartment(record.getJhfDepartment());
			jhf.setJhfPaymentWay("系统跟进");
			jhf.setJhfFollowResult("修改成功");
			jhf.setJhfFollowRemark(record.getFollowUpContent());
			int result1 = journalHousingFollowMapper.insertSelective(jhf);
			System.out.println("跟进是否添加成功   "+result1);
		}
		return result;
	}

}
