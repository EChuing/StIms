package com.zz.service.info;

import java.util.List;

import com.zz.po.info.InfoLandFreeBill;

public interface InfoLandFreeBillService {
	//倒序查全部免租期账单
    List<InfoLandFreeBill> selectAll(InfoLandFreeBill record);
}
