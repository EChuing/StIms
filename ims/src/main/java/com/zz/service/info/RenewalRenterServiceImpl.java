package com.zz.service.info;

import com.opensymphony.xwork2.ActionContext;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoRenewalRenterMapper;
import com.zz.mapper.journal.JournalContractDatabaseMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.po.info.*;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.po.sys.SysVariables;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RenewalRenterServiceImpl implements RenewalRenterService{
	private InfoRenewalRenterMapper infoRenewalRenterMapper;
	private ContractInstallmentService contractInstallmentService;
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	private InfoHouse4rentMapper infoHouse4rentMapper;
    private InfoHouse4storeMapper infoHouse4storeMapper;
    private SysVariablesMapper sysVariablesMapper;
    private JournalHousingFollowMapper journalHousingFollowMapper;
    
	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
        this.sysVariablesMapper = sysVariablesMapper;
    }
    public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
        this.infoHouse4storeMapper = infoHouse4storeMapper;
    }
    public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}
	public void setJournalContractDatabaseMapper(
			JournalContractDatabaseMapper journalContractDatabaseMapper) {
		this.journalContractDatabaseMapper = journalContractDatabaseMapper;
	}
	public void setInfoRenewalRenterMapper(
			InfoRenewalRenterMapper infoRenewalRenterMapper) {
		this.infoRenewalRenterMapper = infoRenewalRenterMapper;
	}
	public void setContractInstallmentService(
			ContractInstallmentService contractInstallmentService) {
		this.contractInstallmentService = contractInstallmentService;
	}

	public void setJournalHousingFollowMapper(
            JournalHousingFollowMapper journalHousingFollowMapper) {
        this.journalHousingFollowMapper = journalHousingFollowMapper;
    }
    @Override
	public List<InfoRenewalRenterExpand> selectAll(
			InfoRenewalRenterExpand conditions) throws Exception {
		return infoRenewalRenterMapper.selectrenterAll(conditions);
	}

	@Override
	public int deleteByPrimaryKey(Integer jrlId) throws Exception {
		return infoRenewalRenterMapper.deleteByPrimaryKey(jrlId);
	}

	@Override
	public int insertSelective(InfoRenewalRenter record) throws Exception {
		return infoRenewalRenterMapper.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoRenewalRenterExpand record)
			throws Exception {
		return infoRenewalRenterMapper.updateByPrimaryKeySelective(record);
	}
	
	/**
	 * 租客新签
	 */
	@Override
	public String insertRenewalRenter(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception {
	    //添加合同
		int result = insertSelective(infoRenewalRenterExpand);
		int id = infoRenewalRenterExpand.getJrrId();
		if(result==0){
			throw new Exception("新增0条合约");
		}
		//添加账单
		List<InfoContractInstallment> list = CommonMethodClass.rentContractInstallment(infoRenewalRenterExpand);
		if(list.size() == 0){
			throw new Exception("生成0条新分期账单！");
		}
		int result2 = contractInstallmentService.insertList(list);
		if(result2 == 0){
			throw new Exception("数据库新增0条新账单！");
		}
        //修改合约编号状态
		SysVariables sysVar = new SysVariables();
		sysVar.setVariablesId(1);
		List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
		if(!sysVarList.isEmpty()){
		    sysVar = sysVarList.get(0);
		}
		if (sysVar.getContractNums() == 1) {
	        if(infoRenewalRenterExpand.getJcdId() != null && !infoRenewalRenterExpand.getJcdId().equals("")){
	            JournalContractDatabase jcd = new JournalContractDatabase();
	            jcd.setJcdId(infoRenewalRenterExpand.getJcdId());
	            jcd.setJcdUseState("已签约");
	            jcd.setJcdUsedType("出房");
	            jcd.setJcdHouseAddress(infoRenewalRenterExpand.getJcdHouseAddress());
	            jcd.setJcdContractPerson(infoRenewalRenterExpand.getAdminUser());
	            jcd.setJcdSigningTime(infoRenewalRenterExpand.getJrrSignedTime());
	            int result1 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
	            if(result1 == 0){
	                throw new Exception("修改合约编号状态失败！");
	            }
	        }
		}
        //更新已租表租赁到期时间
        Integer hrId = infoRenewalRenterExpand.getJrrHouse4rentId();
        InfoRenewalRenterExpand endCont = infoRenewalRenterMapper.selectEndTime(hrId);
        if(endCont == null){
            throw new Exception("查询合约失败！");
        }
        String endTime = endCont.getJrrEndTime();
        InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
        infoHouse4rentExpand.setHrId(hrId);
        infoHouse4rentExpand.setHrEndTime(endTime);
        int result3 = infoHouse4rentMapper.updateByPrimaryKeySelective(infoHouse4rentExpand);
        if(result3 == 0){
            throw new Exception("更新已租表租赁到期时间失败");
        }
        //更新未租表最新成交价
        InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
        infoHouse4storeExpand.setHsId(infoRenewalRenterExpand.getJrrHouse4storeId());
        infoHouse4storeExpand.setHsTransactionPrice(infoRenewalRenterExpand.getJrrMoney());
        int result4 = infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
        if(result4 == 0){
            throw new Exception("更新未租表最新成交价失败");
        }
		return ""+id;
	}
	
	/**
	 * 租客续签
	 */
	@Override
	public int renewRenterContract(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception {	
	    //添加合同
		int result = insertSelective(infoRenewalRenterExpand);
		if(result == 0){
			throw new Exception("新增0条续签合约");
		}
		//添加账单
		List<InfoContractInstallment> list = CommonMethodClass.rentContractInstallment(infoRenewalRenterExpand);
		if(list.size() == 0){
			throw new Exception("生成0条新分期账单！");
		}
		for(int i=0;i<list.size();i++){
			list.get(i).setJciType("租客租金");
		}
		int result2 = contractInstallmentService.insertList(list);
		if(result2 == 0){
			throw new Exception("数据库新增0条新账单！");
		}
        //修改合约编号状态
        SysVariables sysVar = new SysVariables();
        sysVar.setVariablesId(1);
        List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
        if(!sysVarList.isEmpty()){
            sysVar = sysVarList.get(0);
        }
        if (sysVar.getContractNums() == 1) {
            if(infoRenewalRenterExpand.getJcdId() != null && !infoRenewalRenterExpand.getJcdId().equals("")){
                JournalContractDatabase jcd = new JournalContractDatabase();
                jcd.setJcdId(infoRenewalRenterExpand.getJcdId());
                jcd.setJcdUseState("已签约");
                jcd.setJcdUsedType("出房");
                jcd.setJcdHouseAddress(infoRenewalRenterExpand.getJcdHouseAddress());
                jcd.setJcdContractPerson(infoRenewalRenterExpand.getAdminUser());
                jcd.setJcdSigningTime(infoRenewalRenterExpand.getJrrSignedTime());
                journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
            }
        }
		//更新已租表最新签约时间、租赁到期时间、房屋押金、租金
        Integer hrId = infoRenewalRenterExpand.getJrrHouse4rentId();
        InfoRenewalRenterExpand endCont = infoRenewalRenterMapper.selectEndTime(hrId);
        if(endCont == null){
            throw new Exception("查询合约失败！");
        }
        String beginTime = infoRenewalRenterExpand.getJrrBeginTime();
        String endTime = endCont.getJrrEndTime();
        Double hrHouseDeposit = infoRenewalRenterExpand.getHrHouseDeposit();
        InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
        infoHouse4rentExpand.setHrId(hrId);
        infoHouse4rentExpand.setHrSignTime(beginTime);
        infoHouse4rentExpand.setHrEndTime(endTime);
        infoHouse4rentExpand.setHrHouseDeposit(hrHouseDeposit);
        infoHouse4rentExpand.setHrHousePrice(infoRenewalRenterExpand.getJrrMoney());
        infoHouse4rentMapper.updateByPrimaryKeySelective(infoHouse4rentExpand);
        //更新未租表最新成交价
        InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
        infoHouse4storeExpand.setHsId(infoRenewalRenterExpand.getJrrHouse4storeId());
        infoHouse4storeExpand.setHsTransactionPrice(infoRenewalRenterExpand.getJrrMoney());
        infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
        //写跟进
        JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
        jhf.setJhfHouse4storeId(infoRenewalRenterExpand.getJrrHouse4storeId());
        jhf.setJhfHouse4rentId(infoRenewalRenterExpand.getJrrHouse4rentId());
        jhf.setJhfUserId(infoRenewalRenterExpand.getJrrUserId());
        jhf.setJhfDepartment(infoRenewalRenterExpand.getJrrDepartment());
        jhf.setJhfStorefront(infoRenewalRenterExpand.getJrrStorefront());
        jhf.setJhfFollowRemark("续签合同");
        jhf.setJhfPaymentWay("系统跟进");
        jhf.setJhfFollowResult("签约成功");
        journalHousingFollowMapper.insertSelective(jhf);
		return 1;
	}
	
	/**
	 * 更新合约
	 */
	@Override
	public int updateRenewalRenter(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception {
		//修改租客合约
		System.out.println(infoRenewalRenterExpand);
		InfoRenewalRenterExpand infoRene=new InfoRenewalRenterExpand();
		infoRene.setJrrId(infoRenewalRenterExpand.getJrrId());
		List<InfoRenewalRenterExpand> list1= infoRenewalRenterMapper.selectrenterAll(infoRene);
		
		infoRene.setJrrMoney(infoRenewalRenterExpand.getJrrMoney());
		infoRene.setJrrTheTerm(infoRenewalRenterExpand.getJrrTheTerm());
		infoRene.setJrrEndTime(infoRenewalRenterExpand.getJrrEndTime());
		infoRene.setJrrSignedTime(infoRenewalRenterExpand.getJrrSignedTime());
		infoRene.setJrrManageCost(infoRenewalRenterExpand.getJrrManageCost());
		infoRene.setJrrServerCost(infoRenewalRenterExpand.getJrrServerCost());
		infoRene.setJrrPaymentMethod(infoRenewalRenterExpand.getJrrPaymentMethod());
		infoRene.setJrrManagePayment(infoRenewalRenterExpand.getJrrManagePayment());
		infoRene.setJrrServerPayment(infoRenewalRenterExpand.getJrrServerPayment());
		if (list1.isEmpty()) {
			return 0;
		 }
		Map<String, String> map = new HashMap<String, String>();
	    map.put("jrrMoney", "租金");
	    map.put("jrrTheTerm", "合同期限");
	    map.put("jrrEndTime", "到期时间");
	    map.put("jrrPaymentMethod", "租金缴费方式");
	    map.put("jrrSignedTime", "签约时间");
	    map.put("jrrManageCost", "物管费");
	    map.put("jrrManagePayment", "物管缴费方式");
	    map.put("jrrServerCost", "服务费");
	    map.put("jrrServerPayment", "服务缴费方式");
	    StringBuffer followUp = new StringBuffer();
	    Field[] newNotRent = infoRene.getClass().getSuperclass().getDeclaredFields();
	    for (Field field : newNotRent) {
			field.setAccessible(true);
			if (map.containsKey(field.getName()) && field.get(infoRene) != null
				&& !field.get(infoRene).equals(field.get(list1.get(0)))
				&& !(field.get(infoRene).equals("") && field.get(list1.get(0)) == null)) {
				Object old = field.get(list1.get(0)) != null ? field.get(list1.get(0)) : "";
                followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(infoRene) + ";");
			}
	    }
		//修改合约
		int result = infoRenewalRenterMapper.updateByPrimaryKeySelective(infoRenewalRenterExpand);
		if (result == 0) {
			throw new Exception("更新0条合约");
		}
		Integer flag = infoRenewalRenterExpand.getUpdateFlag();
		if(flag == null || flag == 0){
			return 1;
		}
		List<InfoContractInstallment> list = CommonMethodClass.rentContractInstallment(infoRenewalRenterExpand);
		System.out.println(list);
		// 从旧账单中恢复数据
		InfoContractInstallmentExpand param = new InfoContractInstallmentExpand();
		param.setContractType("renter");
		param.setJciRentContId(infoRenewalRenterExpand.getJrrId());
		List<InfoContractInstallmentExpand> old1 = contractInstallmentService.selectAll(param);
		for (InfoContractInstallment item : list) {
		    for (InfoContractInstallmentExpand item2 : old1) {
		        if (item.getJciPeriods() == item2.getJciPeriods()) {
		        	if(item.getJciPeriods() == 1) {
		        		Double total = 0.0;
					JSONArray jsonArray = JSONArray.fromObject(item2.getJciBillJson());
					jsonArray.getJSONObject(0).put("jciMoney",item.getJciMoney());
					item.setJciBillJson(jsonArray.toString());
					item.setJciMessageNote(item2.getJciMessageNote());
					if(null != item2.getJciMessageNote()&& !"".equals(item2.getJciMessageNote())){
						JSONObject jsonObject = JSONObject.fromObject(item2.getJciMessageNote());
						for(int i = 0;i < jsonArray.size();i++){
							if("支出".equals(jsonArray.getJSONObject(i).get("nature"))) {
								total = total - Double.parseDouble(jsonArray.getJSONObject(i).get("jciMoney").toString());
							}else{
								total = total + Double.parseDouble(jsonArray.getJSONObject(i).get("jciMoney").toString());
							}
						}
						jsonObject.getJSONObject("sys").put("total",total);
						jsonObject.getJSONObject("msg").put("total",total);
						jsonObject.getJSONObject("sys").put("rent",item.getJciMoney());
						jsonObject.getJSONObject("msg").put("rent",item.getJciMoney());
						item.setJciMessageNote(jsonObject.toString());
					}
				}
		            item.setJciState(item2.getJciState());
		            item.setJciRemark(item2.getJciRemark());
		            item.setJciMessageTime(item2.getJciMessageTime());
		            item.setJciPaymentVoucher(item2.getJciPaymentVoucher());
		            item.setJciRead(item2.getJciRead());
		            item.setJciAudit(item2.getJciAudit());
		            item.setJciIfPrint(item2.getJciIfPrint());
		            item.setJciSpecialNumber(item2.getJciSpecialNumber());
		            item.setJciImgPath(item2.getJciImgPath());
		            item.setJciType("租客租金");
                    item.setJciImgNum(item2.getJciImgNum());
                    item.setJciLabelType(item2.getJciLabelType());
		        }
		    }
		}
		if(list.isEmpty()){
			throw new Exception("生成0条新分期账单！");
		}
		InfoContractInstallmentExpand condition = new InfoContractInstallmentExpand();
		condition.setJciRentContId(infoRenewalRenterExpand.getJrrId());
		int result1 = contractInstallmentService.deleteByPrimaryKey(condition);
		int result2 = contractInstallmentService.insertList(list);
		if(result2 == 0){
			throw new Exception("更新0条新账单！");
		}
		//更新已租表租赁到期时间
        Integer hrId = infoRenewalRenterExpand.getJrrHouse4rentId();    
		InfoRenewalRenterExpand endCont = infoRenewalRenterMapper.selectEndTime(hrId);
		if(endCont == null){
			throw new Exception("查询合约失败！");
		}
		String endTime = endCont.getJrrEndTime();
		InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
		infoHouse4rentExpand.setHrId(hrId);
		infoHouse4rentExpand.setHrEndTime(endTime);
		int result3 = infoHouse4rentMapper.updateByPrimaryKeySelective(infoHouse4rentExpand);
		if(result3 == 0){
			throw new Exception("更新已租表租赁到期时间失败");
		}
		//更新未租表最新成交价
        InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
        infoHouse4storeExpand.setHsId(infoRenewalRenterExpand.getJrrHouse4storeId());
        infoHouse4storeExpand.setHsTransactionPrice(infoRenewalRenterExpand.getJrrMoney());
        int result4 = infoHouse4storeMapper.updateByPrimaryKeySelective(infoHouse4storeExpand);
        if(result4 == 0){
            throw new Exception("更新未租表最新成交价失败");
        }
        //写跟进
       
        SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
        JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
        jhf.setJhfHouse4storeId(infoRenewalRenterExpand.getJrrHouse4storeId());
        jhf.setJhfHouse4rentId(infoRenewalRenterExpand.getJrrHouse4rentId());
        jhf.setJhfHouseId(infoRenewalRenterExpand.getHsHouseId());
        jhf.setJhfUserId(userInfo.getUserId());
        jhf.setJhfDepartment(userInfo.getSuDepartmentId());
        jhf.setJhfStorefront(userInfo.getSuStoreId());
        jhf.setJhfPaymentWay("系统跟进");
        jhf.setJhfFollowResult("跟进成功");
        jhf.setJhfFollowRemark("修改租客合约："+followUp.toString());
        journalHousingFollowMapper.insertSelective(jhf);
		return 1;
	
	    
	    }
	@Override
	public List<InfoRenewalRenterExpand> adSelect(
			InfoRenewalRenterExpand conditions) throws Exception {
		return infoRenewalRenterMapper.adSelect(conditions);
	}

	@Override
	public int querySignedNum(InfoRenewalRenterExpand conditions)
			throws Exception {
		return infoRenewalRenterMapper.querySignedNum(conditions);
	}
	@Override
	public List<InfoRenewalRenterExpand> selectAllRenewalRenter(InfoRenewalRenterExpand conditions) throws Exception {
		return infoRenewalRenterMapper.selectAllRenewalRenter(conditions);
	}
	/**
	 * 作废合约
	 */
    @Override
    public int abrogateRenterContract(InfoRenewalRenterExpand infoRenewalRenterExpand) throws Exception {
        //更新合约状态
        infoRenewalRenterExpand.setJrrRentalType("作废");
        int result1 = infoRenewalRenterMapper.updateByPrimaryKeySelective(infoRenewalRenterExpand);
        if (result1 == 0) {
            throw new Exception("更新合约状态失败");
        }
        //删除分期账单
        InfoContractInstallmentExpand condition = new InfoContractInstallmentExpand();
        condition.setJciRentContId(infoRenewalRenterExpand.getJrrId());
        int result2 = contractInstallmentService.deleteByPrimaryKey(condition);
		/*
		 * if (result2 == 0) { throw new Exception("删除分期账单失败"); }
		 */
        //更新已租表的租赁到期时间
        Integer hrId = infoRenewalRenterExpand.getJrrHouse4rentId();
        InfoRenewalRenterExpand endCont = infoRenewalRenterMapper.selectEndTime(hrId);
        if(endCont != null){
            String tempTime = endCont.getJrrEndTime();
            InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
            infoHouse4rentExpand.setHrId(hrId);
            infoHouse4rentExpand.setHrEndTime(tempTime);
            int result3 = infoHouse4rentMapper.updateByPrimaryKeySelective(infoHouse4rentExpand);
            if(result3 == 0){
                throw new Exception("更新已租表租赁到期时间失败");
            }
        }
        InfoRenewalRenterExpand renterExpand = infoRenewalRenterMapper.selectByPrimaryKey(infoRenewalRenterExpand.getJrrId());
      //写跟进
        SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
        JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
        jhf.setJhfHouse4storeId(renterExpand.getJrrHouse4storeId());
        jhf.setJhfHouse4rentId(renterExpand.getJrrHouse4rentId());
        jhf.setJhfHouseId(renterExpand.getHsHouseId());
        jhf.setJhfUserId(userInfo.getUserId());
        jhf.setJhfDepartment(userInfo.getSuDepartmentId());
        jhf.setJhfStorefront(userInfo.getSuStoreId());
        jhf.setJhfPaymentWay("系统跟进");
        jhf.setJhfFollowResult("跟进成功");
        jhf.setJhfFollowRemark("修改租客合约：合约"+renterExpand.getJrrRentalType());
        journalHousingFollowMapper.insertSelective(jhf);
        return 1;
    }
   
}
