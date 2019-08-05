package com.zz.service.info;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.util.DateUtil;
import com.zz.po.info.InfoContractInstallment;

public class ContractInstallmentServiceImpl implements ContractInstallmentService{
	
	private InfoContractInstallmentMapper InfoContractInstallmentMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;

	public void setInfoContractInstallmentMapper(
			InfoContractInstallmentMapper InfoContractInstallmentMapper) {
		this.InfoContractInstallmentMapper = InfoContractInstallmentMapper;
	}

	@Override
	public int deleteByPrimaryKey(InfoContractInstallment record)
			throws Exception {
		return InfoContractInstallmentMapper.deleteByPrimaryKey(record);
	}

	@Override
	public int insertSelective(InfoContractInstallment record)
			throws Exception {
		System.out.println("+++++++++++++++++==="+record.getJciMessageNote());
		int result=InfoContractInstallmentMapper.insertSelective(record);
		if(result>0){
			SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
			StringBuffer followUp = new StringBuffer();
			followUp.append("租客账单，临时账单：【");
			followUp.append(" 类型:"+record.getJciType());
			followUp.append(" 金额:"+record.getJciMoney());
			followUp.append(" 状态:"+record.getJciState());
			followUp.append(" 登记时间:"+DateUtil.getCurDateTime());
			followUp.append(" 】");
			JournalHousingFollowExpand nalHousingFollow = new JournalHousingFollowExpand();
			nalHousingFollow.setJhfHouse4storeId(record.getJciHouse4storeId());
			nalHousingFollow.setJhfFollowRemark(followUp.toString());
			nalHousingFollow.setJhfFollowResult("跟进成功");
			nalHousingFollow.setJhfFollowTime(DateUtil.getCurDateTime());
			nalHousingFollow.setJhfFollowBelong("其他");
			nalHousingFollow.setJhfRemind("否");
			nalHousingFollow.setJhfUserId(userInfo.getUserId());
			nalHousingFollow.setJhfDepartment(userInfo.getSuDepartmentId());
			nalHousingFollow.setJhfPaymentWay("系统跟进");
			nalHousingFollow.setJhfStorefront(userInfo.getSuStoreId());
			nalHousingFollow.setJhfHouseId(record.getHsHouseId());
			result=journalHousingFollowMapper.insertSelective(nalHousingFollow);
			return result;
		}
		return result;
	}

	@Override
	public int insertList(List<InfoContractInstallment> recordList)
			throws Exception {
		return InfoContractInstallmentMapper.insertList(recordList);
	}

	@Override
	public List<InfoContractInstallmentExpand> selectAll(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.selectAll(conditions);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoContractInstallment record)throws Exception {
		return InfoContractInstallmentMapper.updateByPrimaryKeySelective(record);
	}
	
	//综合修改专用
	@Override
	public int updatePaymentInUpdateAll(InfoContractInstallment record)
			throws Exception {
		//修改租客、业主订单--跟进
		InfoContractInstallmentExpand infoContract=new InfoContractInstallmentExpand();
		infoContract.setJciId(record.getJciId());
		List<InfoContractInstallmentExpand> list=InfoContractInstallmentMapper.selectByPrimaryKey(infoContract);

	    if (list.isEmpty()) {
			return 0;
		}
        String type=list.get(0).getJciType();
	    infoContract.setJciMoney(record.getJciMoney());
	    infoContract.setJciState(record.getJciState());
	    infoContract.setJciManageCost(record.getJciManageCost());
	    infoContract.setJciServerCost(record.getJciServerCost());

		Map<String, String> map = new HashMap<String, String>();
		map.put("jciMoney", "租金");
	    map.put("jciState", "状态");
	    map.put("jciManageCost", "物管费");
	    map.put("jciServerCost", "租赁服务费");
		StringBuffer followUp = new StringBuffer();
	    Field[] newNotRent = infoContract.getClass().getSuperclass().getDeclaredFields();
	    SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
		JournalHousingFollowExpand nalHousingFollow = new JournalHousingFollowExpand();
		int storeId=list.get(0).getJciHouse4storeId();
	    if("房东租金".equals(type)) {
	        followUp.append("综合修改，修改业主账单信息：");
	    }
	    if("租客租金".equals(type)) {
	    	followUp.append("综合修改，修改租客账单信息：");
	    	int rentId=list.get(0).getJciHouse4rentId();
	    	nalHousingFollow.setJhfHouse4rentId(rentId);
	    }
		for (Field field : newNotRent) {
			field.setAccessible(true);
			if (map.containsKey(field.getName()) && field.get(infoContract) != null
				&& !field.get(infoContract).equals(field.get(list.get(0)))
				&& !(field.get(infoContract).equals("") && field.get(list.get(0)) == null)) {
				Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
                followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(infoContract) + ";");
			}
		}
                    
		nalHousingFollow.setJhfHouse4storeId(storeId);
		nalHousingFollow.setJhfFollowRemark(followUp.toString());
		nalHousingFollow.setJhfFollowResult("跟进成功");
		nalHousingFollow.setJhfFollowTime(DateUtil.getCurDateTime());
		nalHousingFollow.setJhfFollowBelong("其他");
		nalHousingFollow.setJhfRemind("否");
		nalHousingFollow.setJhfUserId(userInfo.getUserId());
		nalHousingFollow.setJhfDepartment(userInfo.getSuDepartmentId());
		nalHousingFollow.setJhfPaymentWay("系统跟进");
		nalHousingFollow.setJhfStorefront(userInfo.getSuStoreId());
		nalHousingFollow.setJhfHouseId(record.getHsHouseId());
		journalHousingFollowMapper.insertSelective(nalHousingFollow);

		int result = InfoContractInstallmentMapper.updateByPrimaryKeySelective(record);

		return result;
					 
	}

	@Override
	public List<InfoContractInstallmentExpand> selectcontractInstallment(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.selectcontractInstallment(conditions);
	}

	@Override
	public List<InfoContractInstallmentExpand> accountsPayable(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.accountsPayable(conditions);
	}

	@Override
	public List<InfoContractInstallmentExpand> paysTheRent(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.paysTheRent(conditions);
	}

	@Override
	public int checkoutthestate(InfoContractInstallment record)
			throws Exception {
		return InfoContractInstallmentMapper.checkoutthestate(record);
	}

	@Override
	public List<InfoContractInstallmentExpand> selectByPrimaryKey(Integer id)
			throws Exception {
		return InfoContractInstallmentMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<InfoContractInstallmentExpand> financialSelectRenter(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.financialSelectRenter(conditions);
	}

	@Override
	public List<InfoContractInstallmentExpand> financialSelectLanlord(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.financialSelectLanlord(conditions);
	}

	@Override
	public List<InfoContractInstallmentExpand> landlordCard(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.landlordCard(conditions);
	}

	@Override
	public String selectEndPeriods(InfoContractInstallmentExpand conditions)
			throws Exception {
		return InfoContractInstallmentMapper.selectEndPeriods(conditions);
	}

	@Override
	public List<InfoContractInstallmentExpand> selectBeginPeriods(
			InfoContractInstallmentExpand conditions) throws Exception {
		return InfoContractInstallmentMapper.selectBeginPeriods(conditions);
	}

    @Override
    public List<InfoContractInstallmentExpand> selectPayableToLandlord(
            InfoContractInstallmentExpand conditions) {
        return InfoContractInstallmentMapper.selectPayableToLandlord(conditions);
    }

	@Override
	public Integer billCount(InfoContractInstallmentExpand conditions) {
		// TODO Auto-generated method stub
		return InfoContractInstallmentMapper.billCount(conditions);
	}
	
	@Override
	public List<InfoContractInstallmentExpand> selectAllContract(InfoContractInstallmentExpand conditions)
			throws Exception {
		// TODO Auto-generated method stub
		 return InfoContractInstallmentMapper.selectAllContract(conditions);
	}
	@Override
	public int updateIfPrintYes(List<InfoContractInstallmentExpand> list)
			throws Exception {
		return InfoContractInstallmentMapper.updateIfPrintYes(list);
	}
	public int updateIfPrintNo(List list)
			throws Exception {
		return InfoContractInstallmentMapper.updateIfPrintNo(list);
	}
	
	//查询新签租客合约信息
	@Override
	public List<InfoContractInstallmentExpand> queryNewTenantContractInformation(
			InfoContractInstallmentExpand conditions) {
		// TODO Auto-generated method stub
		return InfoContractInstallmentMapper.queryNewTenantContractInformation(conditions);
	}

	@Override
	public List<InfoContractInstallmentExpand> queryTheCurrentDataInformation(InfoContractInstallmentExpand conditions)
			throws Exception {
		// TODO Auto-generated method stub
		return InfoContractInstallmentMapper.queryTheCurrentDataInformation(conditions);
	}
}
