package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourUserDevice;
import com.zz.po.sys.SysUserExpand;

public interface JourUserDeviceMapper {
	List<JourUserDevice> selectById(JourUserDevice recoId) throws Exception;
	List<Integer> selectHssByJhoOfficeId(Integer juoUserId) throws Exception;
	List<Integer> selectJouUserId(Integer juoUserId) throws Exception;
	List<JourUserDevice> selectAllUserDevice(Integer juoDeviceId) throws Exception;
	List<JourUserDevice> selectAllUserdevice(List<JourUserDevice> recordList) throws Exception;
	List<JourUserDevice> selectAllUser(Integer juoUserId) throws Exception;
	List<JourUserDevice> selectHssByJhoOfficeId2(JourUserDevice jourUserDevice) throws Exception;
	int removeOfficeAssociateByOfficeId(Integer recordList)throws Exception;
	int removeJouUserId(Integer recordList)throws Exception;
	List<JourUserDevice> selectJourHsOfficeExpandByOfficeId(Integer recoId) throws Exception;
	int removeOfficeAssociateByIds(List<JourUserDevice> recordList) throws Exception;
	int deleteJudId(List<JourUserDevice> recordList) throws Exception;
	int insertOfficeAssociateHsList(List<JourUserDevice> recordList) throws Exception;
	List<Integer> selectDeviceIdsByUserId(Integer recoId) throws Exception;
	List<SysUserExpand> selectUser(JourUserDevice jourUserDevice) throws Exception;
	List<JourDevice> selectDeivce(JourUserDevice jourUserDevice) throws Exception;
	List<JourDevice> selectDeivce2(JourUserDevice jourUserDevice) throws Exception;
	
}

