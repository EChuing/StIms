package com.zz.mapper.info;

import java.util.List;

import com.zz.po.info.InfoLandFreeBill;

public interface InfoLandFreeBillMapper {
    //倒序查全部免租期账单
    List<InfoLandFreeBill> selectAll(InfoLandFreeBill record);
}