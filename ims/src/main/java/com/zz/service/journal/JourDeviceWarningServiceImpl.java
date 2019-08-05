package com.zz.service.journal;

import com.alibaba.fastjson.JSONObject;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.mapper.journal.JourDeviceMapper;
import com.zz.mapper.journal.JourDeviceWarningMapper;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourDeviceWarning;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class JourDeviceWarningServiceImpl implements JourDeviceWarningService {
	private final static String POSTURL = "http://www.fangzhizun.com/device/api";
	@Autowired
	JourDeviceWarningMapper jourDeviceWarningMapper;
	@Autowired
	JourDeviceMapper jourDeviceMapper;


	@Override
	public List<JourDeviceWarning> selectToDayDetails(JourDeviceWarning jourDeviceWarning) throws Exception {
		return jourDeviceWarningMapper.selectToDayDetails(jourDeviceWarning);
	}

	@Override
	public int insertDeviceWarning(JourDeviceWarning jourDeviceWarning) throws Exception {
		return jourDeviceWarningMapper.insertDeviceWarning(jourDeviceWarning);
	}

	@Override
	public List<JourDevice> selectAlarmRecord(JourDevice jourDevice) throws Exception {
		return jourDeviceWarningMapper.selectAlarmRecord(jourDevice);
	}

	@Override
	public List<JourDevice> queryAlarmRecordCount(JourDevice jourDevice) throws Exception {
		return jourDeviceWarningMapper.queryAlarmRecordCount(jourDevice);
	}

	@Override
	public List<JourDevice> queryAlarmFrequency() throws Exception {
		return jourDeviceWarningMapper.queryAlarmFrequency();
	}

	@Override
	public List<JourDevice> selectDevice(JourDevice jourDevice) throws Exception {
		return jourDeviceWarningMapper.selectDevice(jourDevice);
	}

	@Override
	public int selectCountAlarmRecord(JourDeviceWarning jourDeviceWarning) throws Exception {
		return jourDeviceWarningMapper.selectCountAlarmRecord(jourDeviceWarning);
	}

	@Override
	public int updateByPrimaryKeySelective(JourDeviceWarning jourDeviceWarning) throws Exception {
		JourDeviceWarning jdw= jourDeviceWarningMapper.selectSingle(jourDeviceWarning.getId());
		if(jdw!=null&&!"".equals(jdw)){
			JourDevice jourDevice= jourDeviceMapper.selectSingle( jdw.getJdwDevId());
			if(jourDevice!=null&&!"".equals(jourDevice)){
				//控制设备
				int result= chooseController(jourDevice,jourDeviceWarning.getCoId());
				if(result==-1){
					return -1;
				}else if(result==-2) {
					return -2;
				}
			}
		}
		return jourDeviceWarningMapper.updateByPrimaryKeySelective(jourDeviceWarning);
	}

	//选择停止设备
	public int chooseController(JourDevice jourDevice,String coId) throws Exception {
		int result=0;
		if(jourDevice.getDevFirstType()==9&&jourDevice.getDevSecondType() ==9){
			result = updateSg(jourDevice.getDevAuthSecret(),coId);
			if(result==-1){return -1;}
			result=updateDevice(jourDevice);
			if(result==-1){return  -2;}
		}else if(jourDevice.getDevFirstType()==21&&jourDevice.getDevSecondType() ==21){
			result = updateSg(jourDevice.getDevAuthSecret(),coId);
			if (result == -1) {
				return -1;
			}
		}
		return 0;
	}

	//安防网关控制
	public int updateSg(String sn,String coId) throws Exception {
		JourDevice jourDevice=new JourDevice();
		jourDevice.setDevAuthId(sn);
		jourDevice.setSplitFlag("1");
		List<JourDevice> list= jourDeviceMapper.queryDevice(jourDevice);
		if(list.size()==0){
			return -1;
		}
		jourDevice=list.get(0);
		Map<String ,String> map=new HashMap<>();
		map.put("instruction","控制设备-安防网关");
        map.put("status","外出布防");
        map.put("coId",coId);
        map.put("brandId",jourDevice.getDevBrandId().toString());
        map.put("devId",jourDevice.getId().toString());
        for (String key: map.keySet()) {
            System.out.println("key = "+key+"  value = "+map.get(key));
        }
		String responseText = HttpRequestUtil.post(POSTURL, map);
		JSONObject job = JSONObject.parseObject(responseText);
		if(job.getInteger("code") != null) {
			if (job.getInteger("code") != 0) {
				return -1;
			}
		}
		return 0;
	}

	//设备控制
	public int updateDevice(JourDevice jourDevice) throws Exception {
		Map map= getPostMap(jourDevice);
		String responseText = HttpRequestUtil.post(POSTURL, map);
		JSONObject job = JSONObject.parseObject(responseText);
			if (job.getInteger("code") != 0) {
				return -1;
			}
		return 0;
	}

	//设备控制指令
	public Map getPostMap(JourDevice jourDevice){
		Map<String ,String> map=new HashMap<>();
		map.put("brandId","20");
		map.put("instruction","控制设备");
		map.put("status","8000");
		map.put("mac",jourDevice.getDevAuthSecret());
		map.put("sn",jourDevice.getDevAuthId());
		map.put("isNeedCache","false");
		return map;
	}

	@Override
	public List<JourDevice> equipmentCondition() throws Exception {
		return jourDeviceWarningMapper.equipmentCondition();
	}

	@Override
	public List<JourDevice> selectPolice(JourDevice jourDevice) throws Exception {
		return jourDeviceWarningMapper.selectPolice(jourDevice);
	}
}

