package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.mapper.info.InfoResidentTableMapper;
import com.zz.po.info.InfoPopulation;
import com.zz.po.info.InfoResidentTable;
import com.zz.util.DateUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class ResidentTableServiceImpl implements ResidentTableService {
	private InfoResidentTableMapper infoResidentTableMapper;
	private InfoPopulationMapper infoPopulationMapper;
	private PopulationService populationService;

	public void setInfoResidentTableMapper(InfoResidentTableMapper infoResidentTableMapper) {
		this.infoResidentTableMapper = infoResidentTableMapper;
	}
	
    public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
        this.infoPopulationMapper = infoPopulationMapper;
    }

	public void setPopulationService(PopulationService populationService) {
        this.populationService = populationService;
    }
    @Override
	public int deleteByPrimaryKey(Integer rtId) throws Exception {
		return infoResidentTableMapper.deleteByPrimaryKey(rtId);
	}

	@Override
	public int insertSelective(InfoResidentTable record) throws Exception {
		return infoResidentTableMapper.insertSelective(record);
	}

	@Override
	public List<InfoResidentTable> selectByPrimaryKey(InfoResidentTable record)
			throws Exception {
		return infoResidentTableMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoResidentTable record)
			throws Exception {
		return infoResidentTableMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoResidentTable> selectRtplid(InfoResidentTable record)
			throws Exception {
		return infoResidentTableMapper.selectRtplid(record);
	}
	
	//新增住户
	@Override
	public String insertResidentTable(InfoResidentTable infoResidentTable) throws Exception {
		String ic = infoResidentTable.getPopIdcard();
		if(ic.equals("") || ic == null){
			return -22+"";
		}
		int temp = infoResidentTable.getRtUrId();
		int popID = 0;
		//查询人口表IC
		InfoPopulation ip = new InfoPopulation();
		ip.setPopIdcard(ic);
		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		//判断是否存在此人
		if(list.size()==0){
			//用传入的IC去人头表查，没有相应的数据则新增一条人头数据，并返回插入的ID
			ip.setPopName(infoResidentTable.getPopName());
			ip.setPopTelephone(infoResidentTable.getPopTelephone());
			ip.setPopPassword(infoResidentTable.getPopTelephone());
			ip.setPopIdcardType(infoResidentTable.getPopIdcardType());
			ip.setPopIdcard(infoResidentTable.getPopIdcard());
			ip.setPopSex(infoResidentTable.getPopSex());
			ip.setPopNation(infoResidentTable.getPopNation());
			ip.setPopMarriageState(infoResidentTable.getPopMarriageState());
			ip.setPopIdcardAddress(infoResidentTable.getPopIdcardAddress());
			ip.setPopOccupation(infoResidentTable.getPopOccupation());
			ip.setPopBirth(infoResidentTable.getPopBirth());
			ip.setPopDegreeEducation(infoResidentTable.getPopDegreeEducation());
            ip.setPopNameRemark(infoResidentTable.getPopNameRemark());
			ip.setPopUser(infoResidentTable.getRtUrId());
			ip.setPopResident(1);
			ip.setPopInnerCreditLevel(80);
			ip.setPopOuterCreditLevel(80);
			ip.setPopIdcardJson(infoResidentTable.getPopIdcardJson());
			int result = infoPopulationMapper.insertSelective(ip);
			if(result == 0){
				throw new Exception("人口新增失败");
			}
			popID = ip.getPopId();
			infoResidentTable.setRtPlId(popID);
			int result1 = infoResidentTableMapper.insertSelective(infoResidentTable);
			if(result1 == 0){
				throw new Exception("新增失败");
			}
		}else{
			//用传入的IC去人头表查，如果有则取出查询的ID
			Integer popid = list.get(0).getPopId();
			String name = list.get(0).getPopName();
			if(name.equals(infoResidentTable.getPopName())){
				InfoResidentTable rt = new InfoResidentTable();
				rt.setRtPlId(popid);
				List<InfoResidentTable> rtlist = infoResidentTableMapper.selectRtplid(rt);
				if(rtlist.size() == 0){
					infoResidentTable.setRtPlId(popid);
					int result1 = infoResidentTableMapper.insertSelective(infoResidentTable);
					if(result1 == 0){
						throw new Exception("新增失败");
					}
					//增加住户标识
					InfoPopulation ip1 = new InfoPopulation();
					ip1.setPopId(popid);
					ip1.setPopResident(1);
					ip1.setPopName(infoResidentTable.getPopName());
		            ip1.setPopTelephone(infoResidentTable.getPopTelephone());
		            ip1.setPopIdcardType(infoResidentTable.getPopIdcardType());
		            ip1.setPopIdcard(infoResidentTable.getPopIdcard());
		            ip1.setPopSex(infoResidentTable.getPopSex());
		            ip1.setPopNation(infoResidentTable.getPopNation());
		            ip1.setPopMarriageState(infoResidentTable.getPopMarriageState());
		            ip1.setPopIdcardAddress(infoResidentTable.getPopIdcardAddress());
		            ip1.setPopOccupation(infoResidentTable.getPopOccupation());
		            ip1.setPopBirth(infoResidentTable.getPopBirth());
		            ip1.setPopDegreeEducation(infoResidentTable.getPopDegreeEducation());
		            ip1.setPopNameRemark(infoResidentTable.getPopNameRemark());
		            ip1.setRegistrantName(infoResidentTable.getRegistrantName());
		            ip1.setPopIdcardJson(infoResidentTable.getPopIdcardJson());
					int result = populationService.updateByPrimaryKeySelective(ip1);
					if(result == 0){
						throw new Exception("增加住户标识失败");
					}
				}else{
					return -4+"";
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
	public String updateResidentTable(InfoResidentTable infoResidentTable) throws Exception {
		InfoPopulation ip = new InfoPopulation();
		ip.setPopName(infoResidentTable.getPopName());
		ip.setPopTelephone(infoResidentTable.getPopTelephone());
		ip.setPopId(infoResidentTable.getRtPlId());
		ip.setPopIdcard(infoResidentTable.getPopIdcard());
		ip.setPopModifyTheRecord(infoResidentTable.getPopModifyTheRecord());
		
		ip.setPopIdcardType(infoResidentTable.getPopIdcardType());
		ip.setPopNation(infoResidentTable.getPopNation());
		ip.setPopMarriageState(infoResidentTable.getPopMarriageState());
		ip.setPopFromArea(infoResidentTable.getPopFromArea());
		ip.setPopPresentAddress(infoResidentTable.getPopPresentAddress());
		ip.setPopBirth(infoResidentTable.getPopBirth());
		ip.setPopSex(infoResidentTable.getPopSex());
		ip.setPopDegreeEducation(infoResidentTable.getPopDegreeEducation());
		ip.setPopOccupation(infoResidentTable.getPopOccupation());
		ip.setPopResidenceType(infoResidentTable.getPopResidenceType());
		ip.setPopUnitService(infoResidentTable.getPopUnitService());
		ip.setPopCheckinTime(infoResidentTable.getPopCheckinTime());
		ip.setPopResidenceCause(infoResidentTable.getPopResidenceCause());
		ip.setPopRelation(infoResidentTable.getPopRelation());
		
		//查询人口表IC
		InfoPopulation ipop = new InfoPopulation();
		ipop.setPopIdcard(infoResidentTable.getPopIdcard());
		List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ipop);
		if(list.size() == 0){
			int result1 = infoPopulationMapper.updateByPrimaryKeySelective(ip);
			if(result1 == 0){
				throw new Exception("人口修改失败");
			}
			int result = infoResidentTableMapper.updateByPrimaryKeySelective(infoResidentTable);
			if(result == 0){
				throw new Exception("修改失败");
			}
		}else{
			Integer popid = list.get(0).getPopId();
			if(popid.equals(infoResidentTable.getRtPlId())){
				int result1 = infoPopulationMapper.updateByPrimaryKeySelective(ip);
				if(result1 == 0){
					throw new Exception("人口修改失败");
				}
				int result = infoResidentTableMapper.updateByPrimaryKeySelective(infoResidentTable);
				if(result == 0){
					throw new Exception("修改失败");
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
    public int updateResident(InfoResidentTable infoResidentTable) throws Exception {
        infoResidentTableMapper.updateByPrimaryKeySelective(infoResidentTable);
        //人口表写跟进
        InfoPopulation ipop = new InfoPopulation();
        ipop.setPopId(infoResidentTable.getRtPlId());
        List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(ipop);
        if(list.size()>0){
            String follow = list.get(0).getPopModifyTheRecord();
            JSONArray jsonArray = JSONArray.fromObject(list.get(0).getPopModifyTheRecord() != null ? list.get(0).getPopModifyTheRecord() : "[]");
            JSONObject obj = new JSONObject();
            obj.accumulate("type", "系统跟进");
            obj.accumulate("registrantName",infoResidentTable.getRegistrantName());
            obj.accumulate("text", infoResidentTable.getPopModifyTheRecord());
            obj.accumulate("time", DateUtil.getCurDateTime());
            jsonArray.add(obj);
            list.get(0).setPopModifyTheRecord(jsonArray.toString());
            infoPopulationMapper.updateByPrimaryKeySelective(list.get(0));
        }
        return 1;
    }

}
