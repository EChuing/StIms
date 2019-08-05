package com.zz.mapper.journal;

import org.apache.ibatis.annotations.Param;

import com.zz.po.journal.DashLandFreeEarnings;

public interface DashLandFreeEarningsMapper {

    DashLandFreeEarnings selectByPrimaryKey(@Param("dlfeId") Integer dlfeId);

}