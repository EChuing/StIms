package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourUserDevice;
import com.zz.po.sys.SysUserExpand;

public interface JourUserDeviceService {
	public int updateList(List<JourUserDevice> recordList) throws Exception;
	public int updateUnrelateddevices(List<JourUserDevice> recordList) throws Exception;
	List<JourDevice> allDeviceExpand(JourUserDevice jourUserDevice)throws Exception;
	List<SysUserExpand> selectUser(JourUserDevice jourUserDevice) throws Exception;
	List<JourDevice> selectDevice(JourUserDevice jourUserDevice) throws Exception;
}
