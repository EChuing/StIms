package com.zz.service.info;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.json.JSONUtil;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoLandlordMapper;
import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.po.info.InfoLandlord;
import com.zz.po.info.InfoLandlordExpand;
import com.zz.po.info.InfoPopulation;

import net.sf.json.JSONObject;

public class LandlordServiceImpl implements LandlordService{
	private InfoLandlordMapper infoLandlordMapper;
	private InfoPopulationMapper infoPopulationMapper;
	public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
		this.infoPopulationMapper = infoPopulationMapper;
	}
	public void setInfoLandlordMapper(InfoLandlordMapper infoLandlordMapper) {
		this.infoLandlordMapper = infoLandlordMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		return infoLandlordMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelective(InfoLandlordExpand record) throws Exception {
		return infoLandlordMapper.insertSelective(record);
	}
	
	@Override
	public int updateByPrimaryKeySelective(InfoLandlordExpand record)
			throws Exception {
		return infoLandlordMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoLandlordExpand> selectByHouse4rentOfLandlordId(Integer landlordId)
			throws Exception {
		return infoLandlordMapper.selectByHouse4rentOfLandlordId(landlordId);
	}

	@Override
	public List<InfoLandlord> selectByPrimaryKey(Integer id) throws Exception {
		return infoLandlordMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<InfoLandlordExpand> selectAll(InfoLandlordExpand conditions) throws Exception {
		return infoLandlordMapper.selectAll(conditions);
	}

	@Override
	public String selectOfMaxNumber() throws Exception {
		return infoLandlordMapper.selectOfMaxNumber();
	}

	@Override
	public Integer isExist(Integer idcard) throws Exception {
		return infoLandlordMapper.isExist(idcard);
	}

	@Override
	public List<InfoLandlordExpand> landlordName(InfoLandlordExpand conditions)
			throws Exception {
		return infoLandlordMapper.landlordName(conditions);
	}

	@Override
	public List<InfoLandlordExpand> landlordGroupQuery(
			InfoLandlordExpand conditions) throws Exception {
		return infoLandlordMapper.landlordGroupQuery(conditions);
	}

	@Override
	public InfoLandlordExpand housingQuantity(InfoLandlordExpand conditions)
			throws Exception {
		return infoLandlordMapper.housingQuantity(conditions);
	}
	
	//在添加托管的时候增加房东记录
	@Override
	public int insertLandlordInAddStore(InfoLandlordExpand infoLandlordExpand) throws Exception {
		//接收传入的IC
		String ic = null;
		ic = infoLandlordExpand.getLaPopIdcard();
		int popID = 0;
		//查询人口表IC
		List<InfoPopulation> list = new ArrayList<>();
		InfoPopulation ip = new InfoPopulation();
		if(ic != null && !ic.equals("")){
			ip.setPopIdcard(ic);
			list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		}
		//判断是否存在此人
		if(list.size()==0){
			//用传入的IC去人头表查，没有相应的数据则新增一条人头数据，并返回插入的ID
			ip.setPopName(infoLandlordExpand.getLaPopName());
			ip.setPopIdcard(infoLandlordExpand.getLaPopIdcard());
			ip.setPopTelephone(infoLandlordExpand.getLaPopTelephone());;
			ip.setPopUser(infoLandlordExpand.getLaUserId());
			ip.setPopLandlord(1);
			ip.setPopPassword(infoLandlordExpand.getLaPopTelephone());
			int result = infoPopulationMapper.insertSelective(ip);
			popID = ip.getPopId();
			infoLandlordExpand.setLaPopulationId(popID);
			int result1 = infoLandlordMapper.insertSelective(infoLandlordExpand);
			int laId = infoLandlordExpand.getLandlordId();
			System.out.println("返回自増房东ID："+laId);
			if(result1==0){
				return -1;
			}else{
				return laId;
			}
		}else{
			//用传入的IC去人头表查，如果有则取出查询的ID
			popID = list.get(0).getPopId();
			InfoLandlordExpand la = new InfoLandlordExpand();
			la.setLaPopulationId(popID);
			List<InfoLandlordExpand> lalist = infoLandlordMapper.selectAll(la);
			if(lalist.size() == 0){
				infoLandlordExpand.setLaPopulationId(popID);
				int result = infoLandlordMapper.insertSelective(infoLandlordExpand);
				int laId = infoLandlordExpand.getLandlordId();
				System.out.println("返回自増房东ID："+laId);
				if(result==0){
					return -1;
				}else{
					return laId;
				}
			}else{
				int laId = lalist.get(0).getLandlordId();
				return laId;
			}
		}
	}
	
	//增加记录
	@Override
	public int insertLandlord(InfoLandlordExpand infoLandlordExpand) throws Exception {
		//接收传入的IC
		String ic = null;
		ic = infoLandlordExpand.getLaPopIdcard();
		int popID = 0;
		//查询人口表IC
		List<InfoPopulation> list = new ArrayList<>();
		InfoPopulation ip = new InfoPopulation();
		if(ic != null && !ic.equals("")){
			ip.setPopIdcard(ic);
			list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		}
		//判断是否存在此人
		if(list.size()==0){
			//用传入的IC去人头表查，没有相应的数据则新增一条人头数据，并返回插入的ID
			ip.setPopName(infoLandlordExpand.getLaPopName());
			ip.setPopIdcard(infoLandlordExpand.getLaPopIdcard());
			ip.setPopTelephone(infoLandlordExpand.getLaPopTelephone());;
			ip.setPopUser(infoLandlordExpand.getLaUserId());
			ip.setPopLandlord(1);
			ip.setPopPassword(infoLandlordExpand.getLaPopTelephone());
			int result = infoPopulationMapper.insertSelective(ip);
			popID = ip.getPopId();
			infoLandlordExpand.setLaPopulationId(popID);
			int result1 = infoLandlordMapper.insertSelective(infoLandlordExpand);
			int laId = infoLandlordExpand.getLandlordId();
			System.out.println("返回自増房东ID："+laId);
			if(result1==0){
				return -1;
			}else{
				List<InfoLandlordExpand> listIle = new ArrayList<>();
				InfoLandlordExpand ile = new InfoLandlordExpand();
				ile.setLandlordId(laId);
				listIle.add(ile);
				String json = JSONUtil.serialize(listIle);
				return laId;
			}
		}else{
			//用传入的IC去人头表查，如果有则取出查询的ID 
			popID = list.get(0).getPopId();
			InfoLandlordExpand la = new InfoLandlordExpand();
			la.setLaPopulationId(popID);
			List<InfoLandlordExpand> lalist = infoLandlordMapper.selectAll(la);
			if(lalist.size() == 0){
				infoLandlordExpand.setLaPopulationId(popID);
				int result = infoLandlordMapper.insertSelective(infoLandlordExpand);
				int laId = infoLandlordExpand.getLandlordId();
				System.out.println("返回自増房东ID："+laId);
				if(result==0){
					return -1;
				}else{
					return laId;
				}
			}else{
				int laId = lalist.get(0).getLandlordId();
				return laId;
			}
		}
	}
	
	//更新记录
	@Override
	public String updateLandlord(InfoLandlordExpand infoLandlordExpand) throws Exception {
		String ic = null;
		ic = infoLandlordExpand.getLaPopIdcard();
		Integer popid = 0;
		InfoPopulation ip = new InfoPopulation();
		System.out.println("*******************折都不走吗？？？？？？："+ic);
		if(ic != null && !ic.equals("")){
			ip.setPopIdcard(ic);
			List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
			System.out.println("*******************什么鬼："+list.size());
			ip.setPopName(infoLandlordExpand.getLaPopName());
			ip.setPopTelephone(infoLandlordExpand.getLaPopTelephone());
			ip.setPopModifyTheRecord(infoLandlordExpand.getPopModifyTheRecord());
			
			ip.setPopIdcardType(infoLandlordExpand.getPopIdcardType());
			ip.setPopNation(infoLandlordExpand.getPopNation());
			ip.setPopMarriageState(infoLandlordExpand.getPopMarriageState());
			ip.setPopFromArea(infoLandlordExpand.getPopFromArea());
			ip.setPopPresentAddress(infoLandlordExpand.getPopPresentAddress());
			ip.setPopBirth(infoLandlordExpand.getPopBirth());
			ip.setPopSex(infoLandlordExpand.getPopSex());
			ip.setPopDegreeEducation(infoLandlordExpand.getPopDegreeEducation());
			ip.setPopOccupation(infoLandlordExpand.getPopOccupation());
			ip.setPopResidenceType(infoLandlordExpand.getPopResidenceType());
			ip.setPopUnitService(infoLandlordExpand.getPopUnitService());
			ip.setPopCheckinTime(infoLandlordExpand.getPopCheckinTime());
			ip.setPopResidenceCause(infoLandlordExpand.getPopResidenceCause());
			ip.setPopRelation(infoLandlordExpand.getPopRelation());
			
			if(list.size() != 0){
				popid = list.get(0).getPopId();
				Integer laId = list.get(0).getPopId();
				System.out.println("*******************wsm ："+popid+" -- "+infoLandlordExpand.getLaPopulationId());
				if(laId.equals(infoLandlordExpand.getLaPopulationId())){
					infoLandlordExpand.setLaPopulationId(popid);
					ip.setPopId(popid);
				}else{
					JSONObject jsonObj = new JSONObject();
			        jsonObj.accumulate("name", list.get(0).getPopName());
			        jsonObj.accumulate("tel",  list.get(0).getPopTelephone());
			        jsonObj.accumulate("ID",  list.get(0).getPopIdcard());
			        String json = jsonObj.toString();
					return -21+"###"+json;
				}
			}else{
				ip.setPopId(infoLandlordExpand.getLaPopulationId());
			}
		}else{
			return -22+"";
		}
		int result1 = infoPopulationMapper.updateByPrimaryKeySelective(ip);
		if(result1 != 1){
			throw new Exception("修改失败");
		}
		if(infoLandlordExpand.getLaSecondContacts() != null || infoLandlordExpand.getLaSecondPhone() != null){
			int result = infoLandlordMapper.updateByPrimaryKeySelective(infoLandlordExpand);
			if(result != 1){
				throw new Exception("修改失败");
			}
		}
		return 1+"";
	}
	
	//查询房东信息以及房屋数量
	@Override
	public InfoLandlordExpand queryQuantityInformation(InfoLandlordExpand conditions) throws Exception {
		return infoLandlordMapper.queryQuantityInformation(conditions);
	}
}
