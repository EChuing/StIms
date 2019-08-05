package com.zz.service.info;

import java.util.List;

import com.zz.mapper.info.InfoLandFreeBillMapper;
import com.zz.po.info.InfoLandFreeBill;

public class InfoLandFreeBillServiceImpl implements InfoLandFreeBillService {

	private InfoLandFreeBillMapper infoLandFreeBillMapper;
	public void setInfoLandFreeBillMapper(
			InfoLandFreeBillMapper infoLandFreeBillMapper) {
		this.infoLandFreeBillMapper = infoLandFreeBillMapper;
	}
	@Override
	public List<InfoLandFreeBill> selectAll(InfoLandFreeBill record) {
		return infoLandFreeBillMapper.selectAll(record);
	}

}
