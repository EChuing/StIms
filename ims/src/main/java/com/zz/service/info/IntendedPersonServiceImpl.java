package com.zz.service.info;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.mapper.info.InfoIntendedPersonMapper;
import com.zz.po.info.InfoIntendedPerson;
import com.zz.util.DateUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class IntendedPersonServiceImpl implements IntendedPersonService {
	private InfoIntendedPersonMapper infoIntendedPersonMapper;
	public void setInfoIntendedPersonMapper(
			InfoIntendedPersonMapper infoIntendedPersonMapper) {
		this.infoIntendedPersonMapper = infoIntendedPersonMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer ipId) throws Exception{
		return infoIntendedPersonMapper.deleteByPrimaryKey(ipId);
	}

	@Override
	public int insertSelective(InfoIntendedPerson record) throws Exception{
		return infoIntendedPersonMapper.insertSelective(record);
	}

	@Override
	public List<InfoIntendedPerson> selectByPrimaryKey(InfoIntendedPerson record) throws Exception{
		return infoIntendedPersonMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoIntendedPerson record)throws Exception {
		return infoIntendedPersonMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoIntendedPerson> getipUserId(InfoIntendedPerson record)
			throws Exception {
		return infoIntendedPersonMapper.getipUserId(record);
	}

	@Override
	public int intendedBatchUpdate(List<InfoIntendedPerson> iplist)
			throws Exception {
		return infoIntendedPersonMapper.intendedBatchUpdate(iplist);
	}

	@Override
	public List<InfoIntendedPerson> dataImportQuery(Integer ipPopulationId) throws Exception {
		return infoIntendedPersonMapper.dataImportQuery(ipPopulationId);
	}

	/**
     * 修改，同时写一条跟进
     */
    @Override
    public int updateById(InfoIntendedPerson record) throws Exception {
        InfoIntendedPerson person = new InfoIntendedPerson();
        person.setIpId(record.getIpId());
        List<InfoIntendedPerson> list = selectByPrimaryKey(person);
        if (list.isEmpty()) {
            return 0;
        }
        Map<String, String> map = new HashMap<String, String>();
        map.put("ipName", "姓名");
        map.put("ipTel", "电话");
        map.put("ipFrom", "来源");
        map.put("ipInNature", "入住性质");
        map.put("ipDoorModel", "需求户型");
        map.put("ipArea", "需求面积");
        map.put("ipLocation", "需求位置");
        map.put("ipExpectDate", "期望入住日期");
        map.put("ipDecorateConfiguration", "装修需求");
        map.put("ipOther", "其它需求");
        map.put("ipState", "状态");
        map.put("ipFurnitureConfig", "家电需求");
        map.put("ipFloorDemand", "楼层需求");
        map.put("ipPriceRange", "价格范围");
        StringBuffer followUp = new StringBuffer();
        followUp.append("修改意向人，");
        Field[] newIntended = record.getClass().getDeclaredFields();
        for (Field field : newIntended) {
            field.setAccessible(true);
            if (map.containsKey(field.getName())
                && field.get(record) != null
                && !field.get(record).equals(field.get(list.get(0)))
                && !(field.get(record).equals("") && field.get(list.get(0)) == null)
            ) {
                Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
                followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(record) + ";");
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getIpNote() != null ? "["+list.get(0).getIpNote()+"]" : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("name", record.getRegistrantName());
        obj.accumulate("note", followUp.toString());
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        record.setIpNote(jsonArray.toString().substring(1, jsonArray.toString().length()-1));
        record.setIpNoteDate(DateUtil.getCurDate());
        int result = infoIntendedPersonMapper.updateByPrimaryKeySelective(record);
        return result;
    }
}
