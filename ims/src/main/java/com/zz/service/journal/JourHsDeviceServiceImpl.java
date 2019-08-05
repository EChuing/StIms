package com.zz.service.journal;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ActionContext;
import com.zz.deviceevents.CodeStorage;
import com.zz.deviceevents.CodeStorageMapper;
import com.zz.mapper.journal.JourHsDeviceMapper;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;
import com.zz.util.MySqlSessionFactory;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

public class JourHsDeviceServiceImpl implements JourHsDeviceService {
	private JourHsDeviceMapper jourHsDeviceMapper;

	public void setJourHsDeviceMapper(JourHsDeviceMapper jourHsDeviceMapper) {
		this.jourHsDeviceMapper = jourHsDeviceMapper;
	}

	@Override
	public int insertList(List<JourHsDevice> recordList) throws Exception {
		return jourHsDeviceMapper.insertList(recordList);
	}

	@Override
	public List<JourHsDevice> selectThisHouseDeviceID(Integer jhdHsId) throws Exception {
		return jourHsDeviceMapper.selectThisHouseDeviceID(jhdHsId);
	}

	@Override
	public int selectThisDeviceIDHouse(Integer jhdDeviceId) throws Exception {
		return jourHsDeviceMapper.selectThisDeviceIDHouse(jhdDeviceId);
	}

	@Override
	public List<JourDevice> queryDeviceByHs(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		return jourHsDeviceMapper.queryDeviceByHs(infoHouse4storeExpand);
	}

	@Override
	public List<JourDevice> queryOfficeAreaDevice(JourDevice office) throws Exception {
		return jourHsDeviceMapper.queryOfficeAreaDevice(office);
	}

	@Override
	public Result<List<JourHsDevice>> queryAllDevice(JourHsDevice jourHsDevice) throws Exception{
		System.out.println("前端传过来的数据==="+jourHsDevice);
		List<Integer> list = JSON.parseArray(jourHsDevice.getJsonArray(),Integer.class);
		jourHsDevice.setDevIdArray(list);
		List<JourHsDevice> result = jourHsDeviceMapper.queryAllDevice(jourHsDevice);
		System.out.println(result);
		return new Result<List<JourHsDevice>>(1,"成功",result);
	}
	@Override
	public JourDevice queryThisDeviceHouse(JourHsDevice jourHsDevice) throws Exception {
		return jourHsDeviceMapper.queryThisDeviceHouse(jourHsDevice);
	}

	@Override
	public int insertHsDevice(JourHsDevice jourHsDevice) throws Exception {
		return jourHsDeviceMapper.insertHsDevice(jourHsDevice);
	}

	@Override
	public int delHsDevice(JourHsDevice jourHsDevice) throws Exception {
		return jourHsDeviceMapper.delHsDevice(jourHsDevice);
	}
	@Override
	public List<JourDevice> seleceGuidByHsId(JourHsDevice jourHsDevice) throws Exception {
		return jourHsDeviceMapper.seleceGuidByHsId(jourHsDevice);
	}

	@Override
	public int updateHsDevice(JourHsDevice jourHsDevice) throws Exception {
		return jourHsDeviceMapper.updateHsDevice(jourHsDevice);
	}
}
