package com.zz.service.info;

import java.util.List;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.mapper.info.InfoRenterMapper;
import com.zz.po.info.InfoPopulation;
import com.zz.po.info.InfoRenter;
import com.zz.po.info.InfoRenterExpand;

import net.sf.json.JSONObject;

public class RenterServiceImpl implements RenterService{
	private InfoRenterMapper infoRenterMapper;
	private InfoPopulationMapper infoPopulationMapper;
	public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
		this.infoPopulationMapper = infoPopulationMapper;
	}

	public void setInfoRenterMapper(InfoRenterMapper infoRenterMapper) {
		this.infoRenterMapper = infoRenterMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelective(InfoRenterExpand record) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.insertSelective(record);
	}

	@Override
	public List<InfoRenterExpand> selectByHouse4rentId(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.selectByHouse4rentId(id);
	}

	@Override
	public List<InfoRenter> selectByPrimaryKey(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.selectByPrimaryKey(id);
	}

	@Override
	public List<InfoRenterExpand> selectAll(InfoRenterExpand conditions) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.selectAll(conditions);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoRenterExpand record)
			throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByHouse4rentId(InfoRenterExpand record) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.updateByHouse4rentId(record);
	}

	@Override
	public Integer isExist(String idcard) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.isExist(idcard);
	}

	@Override
	public List<InfoRenterExpand> selectHouseRentName(
			InfoRenterExpand conditions) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.selectHouseRentName(conditions);
	}

	@Override
	public int insertRenter(InfoRenterExpand infoRenterExpand) throws Exception {
		//接收传入的IC
		String ic = infoRenterExpand.getRenterPopIdcard();
		//判断身份证是否为空
		if(ic == null || ic.equals("")){
			return -3;
		}
		int popID = 0;
		//查询人口表IC
		InfoPopulation ip = new InfoPopulation();
		ip.setPopIdcard(ic);
		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		//判断是否存在此人
		if(list.size()==0){
			//用传入的IC去人头表查，没有相应的数据则新增一条人头数据，并返回插入的ID
			ip.setPopName(infoRenterExpand.getRenterPopName());
			ip.setPopIdcard(infoRenterExpand.getRenterPopIdcard());
			ip.setPopTelephone(infoRenterExpand.getRenterPopTelephone());
			ip.setPopUser(infoRenterExpand.getRenterUserId());
			ip.setPopRenter(1);
			ip.setPopPassword(infoRenterExpand.getRenterPopTelephone());
			//ip.setPopResident("1");
			int result = infoPopulationMapper.insertSelective(ip);
			popID = ip.getPopId();
			infoRenterExpand.setRenterPopulationId(popID);
			int result1 = infoRenterMapper.insertSelective(infoRenterExpand);
			int id = infoRenterExpand.getRenterId();
			if (result1 == 0) {
				throw new Exception("新增人口失败");
			} else {
				return id;
			}
		}else{
			//用传入的IC去人头表查，如果有则取出查询的ID
			popID = list.get(0).getPopId();
			InfoRenterExpand re = new InfoRenterExpand();
			re.setRenterPopulationId(popID);
			List<InfoRenterExpand> relist = infoRenterMapper.selectAll(re);
			if(relist.size() == 0){
				infoRenterExpand.setRenterPopulationId(popID);
				int result = infoRenterMapper.insertSelective(infoRenterExpand);
				int id = infoRenterExpand.getRenterId();
				if (result == 0) {
					throw new Exception("新增zuke失败");
				} else {
					return id;
				}
			}else{
				int id = relist.get(0).getRenterId();
				return id;
			}
		}
	}
	
	//根据主键更新记录
	@Override
	public String updateRenter(InfoRenterExpand infoRenterExpand) throws Exception {
		InfoPopulation pop = new InfoPopulation();
		pop.setPopId(infoRenterExpand.getRenterPopulationId());
		pop.setPopName(infoRenterExpand.getRenterPopName());
		pop.setPopIdcard(infoRenterExpand.getRenterPopIdcard());
		pop.setPopTelephone(infoRenterExpand.getRenterPopTelephone());
		pop.setPopModifyTheRecord(infoRenterExpand.getPopModifyTheRecord());
		
		pop.setPopIdcardType(infoRenterExpand.getPopIdcardType());
		pop.setPopNation(infoRenterExpand.getPopNation());
		pop.setPopMarriageState(infoRenterExpand.getPopMarriageState());
		pop.setPopFromArea(infoRenterExpand.getPopFromArea());
		pop.setPopPresentAddress(infoRenterExpand.getPopPresentAddress());
		pop.setPopBirth(infoRenterExpand.getPopBirth());
		pop.setPopSex(infoRenterExpand.getPopSex());
		pop.setPopDegreeEducation(infoRenterExpand.getPopDegreeEducation());
		pop.setPopOccupation(infoRenterExpand.getPopOccupation());
		pop.setPopResidenceType(infoRenterExpand.getPopResidenceType());
		pop.setPopUnitService(infoRenterExpand.getPopUnitService());
		pop.setPopCheckinTime(infoRenterExpand.getPopCheckinTime());
		pop.setPopResidenceCause(infoRenterExpand.getPopResidenceCause());
		pop.setPopRelation(infoRenterExpand.getPopRelation());
		
		Integer renterPopulationId = infoRenterExpand.getRenterPopulationId();
		//infoRenterExpand.setRenterPopulationId(null);
		String ID = infoRenterExpand.getRenterPopIdcard();
		//判断身份证是否为空
		if(ID == null || ID.equals("")){
			return -22+"";
		}	
		//查询人口表IC
		InfoPopulation ip = new InfoPopulation();
		ip.setPopIdcard(ID);
		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		if(list.size() == 0){
			//修改租客表
			if(infoRenterExpand.getRenterSecondContacts() != null && !infoRenterExpand.getRenterSecondContacts().equals("")){
				int result = infoRenterMapper.updateByPrimaryKeySelective(infoRenterExpand);
				if (result == 0) {
					throw new Exception("修改租客表失败");
				} 
			}
			int result = infoPopulationMapper.updateByPrimaryKeySelective(pop);
			if (result == 0) {
				throw new Exception("修改人口表失败");
			}
		}else{
			Integer popid =  list.get(0).getPopId();
			if(renterPopulationId.equals(popid)){
				//修改租客表
				if(infoRenterExpand.getRenterSecondContacts() != null && !infoRenterExpand.getRenterSecondContacts().equals("")){
					int result = infoRenterMapper.updateByPrimaryKeySelective(infoRenterExpand);
					if (result == 0) {
						throw new Exception("修改租客表失败");
					}
				}
				int result = infoPopulationMapper.updateByPrimaryKeySelective(pop);
				if (result == 0) {
					throw new Exception("修改人口表失败");
				}
			}else{
				JSONObject jsonObj = new JSONObject();
		        jsonObj.accumulate("name", list.get(0).getPopName());
		        jsonObj.accumulate("tel",  list.get(0).getPopTelephone());
		        jsonObj.accumulate("ID",  list.get(0).getPopIdcard());
		        String json = jsonObj.toString();
		        return -21+"###"+json;
			}
		}
		return 1+"";
	}

	@Override
	public List<InfoRenter> tenantDataImportQuery(Integer renterPopulationId) throws Exception {
		// TODO Auto-generated method stub
		return infoRenterMapper.tenantDataImportQuery(renterPopulationId);
	}
}
