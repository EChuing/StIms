package com.zz.service.journal;

import com.zz.mapper.journal.JourDeviceMapper;
import com.zz.po.journal.JourDevice;
import net.sf.json.JSONObject;

import java.util.List;

public class DeviceServiceImpl implements DeviceService{

	private JourDeviceMapper jourDeviceMapper;

	public void setJourDeviceMapper(JourDeviceMapper jourDeviceMapper){
		this.jourDeviceMapper =  jourDeviceMapper;
	}
	
	@Override
	public List<JourDevice> selectAllDevice(JourDevice conditions) throws Exception {
		return jourDeviceMapper.selectAllDevice(conditions);
	}

	@Override
	public List<JourDevice> selectThisHouseDevice(List list) throws Exception {
		return jourDeviceMapper.selectThisHouseDevice(list);
	}

	@Override
	public int insertDeviceList(List list) throws Exception {
		return jourDeviceMapper.insertDeviceList(list);
	}

	@Override
	public JourDevice selectSingle(Integer id) throws Exception {
		return jourDeviceMapper.selectSingle(id);
	}

	@Override
	public List<JourDevice> selectDeviceSN(JourDevice jourDevice) throws Exception {
		return jourDeviceMapper.selectDeviceSN(jourDevice);
	}

	@Override
	public List<JourDevice> selectDeviceHouseStore(JourDevice jourDevice) throws Exception {
		return jourDeviceMapper.selectDeviceHouseStore(jourDevice);
	}

	@Override
	public List<JourDevice> waterEarlyWarning() throws Exception {
		return jourDeviceMapper.waterEarlyWarning();
	}
	
	//查询设备信息
	public	List<JourDevice> selectDeviceStatus(int jhdHsId) throws Exception{
		return jourDeviceMapper.selectDeviceStatus(jhdHsId);
			
	}

	public	List<JourDevice> selectCommon(int jhdHsId) throws Exception{
		return jourDeviceMapper.selectCommon(jhdHsId);

	}

	@Override
	public List<JourDevice> queryDevice(JourDevice conditions) throws Exception {
		return jourDeviceMapper.queryDevice(conditions);
	}

	@Override
	public List<JourDevice> getAllDevice() throws Exception {
		return jourDeviceMapper.getAllDevice();
	}

	@Override
	public int updateById(JourDevice jourDevice) {
		return jourDeviceMapper.updateById(jourDevice);
	}
	//删除人脸设备
	@Override
	public int deleteDevice(JourDevice jourDevice) {
		return jourDeviceMapper.deleteDevice(jourDevice);
	}
	@Override
	public Integer getDevSecondType(JSONObject obj) {
		String type=obj.getString("type");
		String sn=obj.getString("sn");
		String status=obj.getString("status");
		if("25".equals(type)){//门锁
			if(status.startsWith("0005",0)){
				return 22;
			}else if (status.startsWith("0006",0)){
				return 23;
			}
		}else if("3".equals(type)){
			if(sn.startsWith("035253")){//开关
				return 1;
			}else if (sn.startsWith("035255")){
				return 19;
			}
		}else if("46".equals(type)){//电表
			if (status.startsWith("0001",0)){
				return 16;
			}else if(status.startsWith("0002",0)){
				return 15;
			}
		}else  if("10".equals(type)){//空调插座
			return 4;
		}else if("47".equals(type)){//水表
			return 14;
		}else if("44".equals(type)){//烟雾报警器
			return 9;
		}else if("22".equals(type)){//烟雾报警器
			return 9;
		}else if("35".equals(type)){//增强型带定时单路插座
			return 25;
		}else if("41".equals(type)){//情景面板
			return 17;
		}else if("193".equals(type)){//门内电子门牌触摸开关
			return 26;
		}else if("49".equals(type)){//云海实时在线门锁 type=49
			return 24;
		}else if("8".equals(type)){//伊丽莎白
			return 8;
		}else if("13".equals(type)){//伊丽莎白
			return 31;
		}
		return null;
	}

	@Override
	public List<JourDevice> selectDoorDevice(JourDevice conditions) throws Exception {
		return jourDeviceMapper.selectDoorDevice(conditions);
	}

	@Override
	public int insertDevice(JourDevice jourDevice) throws Exception {
		return jourDeviceMapper.insertDevice(jourDevice);
	}

	//用设备ID，查询设备与未租关系表是否存在数据
	@Override
	public List<JourDevice> selectDeviceIdData(JourDevice conditions) throws Exception {
		return jourDeviceMapper.selectDeviceIdData(conditions);
	}
	//用设备sn,查询设备ID
	@Override
	public List<JourDevice> selectDeviceSn(JourDevice jourDevice) throws Exception {
		return jourDeviceMapper.selectDeviceSn(jourDevice);
	}
}