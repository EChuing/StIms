package com.zz.service.info;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoTransactionAssistanceMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.sys.SysUserMapper;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoTransactionAssistance;
import com.zz.po.info.InfoTransactionExpand;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.util.DateUtil;

import freemarker.core.ReturnInstruction.Return;

public class InfoTransactionAssistanceImpl implements InfoTransactionAssistanceService {
	@Autowired
	private InfoTransactionAssistanceMapper itamMapper;
	private InfoHouse4storeMapper infoHouse4storeMapper;
	private InfoHouse4rentMapper infoHouse4rentMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	@Autowired
	private SysUserMapper sysUserMapper;
	public void setItamMapper(InfoTransactionAssistanceMapper itamMapper) {
		this.itamMapper = itamMapper;
	}

	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}

	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}

	@Override
	public int insertSelective(InfoTransactionAssistance record)
			throws Exception {
		// TODO Auto-generated method stub
		return itamMapper.insertSelective(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoTransactionAssistance record)
			throws Exception {
		// TODO Auto-generated method stub
		return itamMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoTransactionExpand> selectAll(
			InfoTransactionExpand conditions) throws Exception {
		// TODO Auto-generated method stub
		return itamMapper.selectAll(conditions);
	}

	/**
	 * 批量新增，同时修改已租、未租中的业绩受益人字段，此字段可作为查询已租房、未租房的条件使用
	 */
	@Override
	public int insertTAList(List<InfoTransactionAssistance> recordList)
			throws Exception {
		// TODO Auto-generated method stub
		int result = itamMapper.insertTAList(recordList);
		int result2 = 0;
		int result3 = 0;
		if(recordList.size()!=0){
			String assistType = recordList.get(0).getAssistType();
			Integer hsId = recordList.get(0).getAssistHouse4store();
			Integer hrId = recordList.get(0).getAssistHouse4rent();
			StringBuffer sb = new StringBuffer();
			for(InfoTransactionAssistance item : recordList){
				sb.append(item.getAssistUserId()+",");
			}
			if(assistType.equals("存房")){
				InfoHouse4storeExpand record = new InfoHouse4storeExpand();
				record.setHsId(hsId);
				record.setHsAssist(sb.toString());
				result2 = infoHouse4storeMapper.updateByPrimaryKeySelective(record);
			}else if(assistType.equals("出房")){
				InfoHouse4rentExpand record = new InfoHouse4rentExpand();
				record.setHrId(hrId);
				record.setHrHouse4storeId(hsId);
				record.setHrAssist(sb.toString());
				result3 = infoHouse4rentMapper.updateByPrimaryKeySelective(record);
			}
		}
		if(result == 0 || (result2 ==0 && result3 == 0)){
			return 0;
		}else{
			return 1;
		}
	}

	/**
	 * 删除
	 */
	@Override
	public int deleteAssist(InfoTransactionAssistance record) 
			throws Exception {
		// TODO Auto-generated method stub
		return itamMapper.deleteAssist(record);
	}

	/**
	 * 先删除再新增
	 */
	@Override
	public String updateAssistance(InfoTransactionExpand conditions)
			throws Exception {
		List<InfoTransactionAssistance> newAssist = new ArrayList<InfoTransactionAssistance>();
		
		String jsonArray = conditions.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
			newAssist.add(jf);
		}
		InfoTransactionAssistance oldAssist = null;
		if(newAssist.size()>0){
			oldAssist = newAssist.get(0);
		}
		
		InfoTransactionExpand infoTran=new InfoTransactionExpand();
		infoTran.setAssistHouse4store(oldAssist.getAssistHouse4store());
		infoTran.setAssistType(oldAssist.getAssistType());
		List<InfoTransactionExpand> list=itamMapper.selectAll(infoTran);
		int deleteResult = deleteAssist(oldAssist);
		if(deleteResult == 0){
			throw new Exception("删除0条业绩受益人");
		}else{
			int results = insertTAList(newAssist);
			if(results > 0){
				StringBuffer followUp = new StringBuffer();
				followUp.append("综合修改，修改业绩人受益信息：");
				for(int i=0;i<list.size();i++) {
                String name1=list.get(i).getAssistPeople();
                Double bonus=list.get(i).getAssistBonus();
			    followUp.append(name1+":分成比例"+bonus+";");
			}
				followUp.append(" → ");
				for(int i1=0;i1<newAssist.size();i1++) {
						int infoHouse4storeId=newAssist.get(i1).getAssistHouse4store();
						SysUserExpand sysUser=new SysUserExpand();
					    sysUser.setUserId(newAssist.get(i1).getAssistUserId());
					    List<SysUserExpand> list1=sysUserMapper.selectByPrimaryKey(sysUser);
				    for(int i2=0;i2<list1.size();i2++) {
						   String name=list1.get(i2).getSuStaffName();
					       followUp.append(name+"：分成比例"+newAssist.get(i1).getAssistBonus()+";");
					       System.out.println(followUp.toString());
				  }
			}
               SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
               JournalHousingFollowExpand follow = new JournalHousingFollowExpand();
               for(int i1=0;i1<newAssist.size();i1++) {
					 int infoHouse4eId=newAssist.get(i1).getAssistHouse4store();
					 follow.setJhfHouse4storeId(infoHouse4eId);
			}
                     follow.setJhfHouse4rentId(oldAssist.getAssistHouse4rent());
                     follow.setJhfFollowRemark(followUp.toString());
	                 follow.setJhfFollowResult("跟进成功");
	                 follow.setJhfFollowTime(DateUtil.getCurDateTime());
	                 follow.setJhfFollowBelong("其他");
	                 follow.setJhfRemind("否");
	                 follow.setJhfUserId(userInfo.getUserId());
	                 follow.setJhfDepartment(userInfo.getSuDepartmentId());
	                 follow.setJhfPaymentWay("系统跟进");
	                 follow.setJhfStorefront(userInfo.getSuStoreId());
	     			 int result = journalHousingFollowMapper.insertSelective(follow);
	     			 return "result";
	         }else{
		           return "新增0条业绩受益人";
					}	
				
	   }	 
	}	
}
			
		
	
	
	
	
