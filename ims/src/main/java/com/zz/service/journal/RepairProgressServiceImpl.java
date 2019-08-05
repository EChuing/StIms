package com.zz.service.journal;

import java.util.List;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.journal.JournalContractDatabaseMapper;
import com.zz.mapper.journal.JournalRepairProgressMapper;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.journal.JournalRepairProgress;
import com.zz.po.journal.JournalRepairProgressExpand;
import com.zz.po.sys.SysVariables;

public class RepairProgressServiceImpl implements RepairProgressService{
	
	private JournalRepairProgressMapper journalRepairProgressMapper;
	private SysVariablesMapper sysVariablesMapper;
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	
	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
        this.sysVariablesMapper = sysVariablesMapper;
    }

    public void setJournalContractDatabaseMapper(
            JournalContractDatabaseMapper journalContractDatabaseMapper) {
        this.journalContractDatabaseMapper = journalContractDatabaseMapper;
    }

    public void setJournalRepairProgressMapper(
			JournalRepairProgressMapper journalRepairProgressMapper) {
		this.journalRepairProgressMapper = journalRepairProgressMapper;
	}

	@Override
	public int insertSelective(JournalRepairProgressExpand record) throws Exception {
		int result = journalRepairProgressMapper.insertSelective(record);
		//修改确认书编号状态
        SysVariables sysVar = new SysVariables();
        sysVar.setVariablesId(1);
        List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
        if(!sysVarList.isEmpty()){
            sysVar = sysVarList.get(0);
        }
        if (sysVar.getComfirmNum() == 1) {
            if(record.getJcdId() != null && !record.getJcdId().equals("")){
                JournalContractDatabase jcd = new JournalContractDatabase();
                jcd.setJcdId(record.getJcdId());
                jcd.setJcdUseState("已签约");
                jcd.setJcdUsedType("维保");
                jcd.setJcdHouseAddress(record.getJcdHouseAddress());
                jcd.setJcdContractPerson(record.getProUserId());
                jcd.setJcdSigningTime(CommonMethodClass.getCurrentDate());
                int result1 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
                if(result1 == 0){
                    throw new Exception("修改合约编号状态失败！");
                }
            }
        }
		return result;
	}

	@Override
	public List<JournalRepairProgressExpand> selectAll(
			JournalRepairProgressExpand conditions) throws Exception {
		return journalRepairProgressMapper.selectAll(conditions);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalRepairProgressExpand record)
			throws Exception {
		return journalRepairProgressMapper.updateByPrimaryKeySelective(record);
	}

}
