package com.zz.service.info;

import com.zz.po.info.InfoSandboxie;
import com.zz.mapper.info.InfoSandboxieMapper;

public class InfoSandboxieServiceImpl implements InfoSandboxieService {
	private InfoSandboxieMapper infoSandboxieMapper;
	public void setInfoSandboxieMapper(
			InfoSandboxieMapper infoSandboxieMapper) {
		this.infoSandboxieMapper = infoSandboxieMapper;
	}
	@Override
	public InfoSandboxie selectByPrimaryKey(Integer isId) {
		// TODO Auto-generated method stub
		return infoSandboxieMapper.selectByPrimaryKey(isId);
	}

}
