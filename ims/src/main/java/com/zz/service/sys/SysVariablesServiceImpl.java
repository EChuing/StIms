package com.zz.service.sys;

import java.util.List;

import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.po.sys.SysVariables;

public class SysVariablesServiceImpl implements SysVariablesService{
	private SysVariablesMapper sysVariablesMapper;
	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
		this.sysVariablesMapper = sysVariablesMapper;
	}
	@Override
	public List<SysVariables> selectByPrimaryKey(SysVariables record)
			throws Exception {
		return sysVariablesMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(SysVariables record)
			throws Exception {
		return sysVariablesMapper.updateByPrimaryKeySelective(record);
	}


	@Override
	public int recoveryFirst(SysVariables record) throws Exception {
		return sysVariablesMapper.recoveryFirst(record);
	}
	
	/**
	 * 检测票据编号开关
	 */
    @Override
    public boolean checkBillNum() throws Exception {
        SysVariables sysVariables = new SysVariables();
        sysVariables.setVariablesId(1);
        List<SysVariables> list = sysVariablesMapper.selectByPrimaryKey(sysVariables);
        if (!list.isEmpty()) {
            return list.get(0).getBillNum() == 1 ? true : false;
        }
        return false;
    }
    
}