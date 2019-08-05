package com.zz.mapper.journal;

import org.apache.ibatis.annotations.Param;

import com.zz.po.journal.DashHousePrice;

public interface DashHousePriceMapper {

    DashHousePrice selectByPrimaryKey(@Param("dhpId") Integer dhpId);
    
}