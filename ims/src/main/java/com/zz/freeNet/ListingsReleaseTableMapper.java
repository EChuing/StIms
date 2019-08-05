package com.zz.freeNet;

import java.util.List;
import com.zz.freeNet.ListingsReleaseTable;

public interface ListingsReleaseTableMapper {
    int deleteByPrimaryKey(Integer lrtId);

    int insert(ListingsReleaseTable record);

    int insertSelective(ListingsReleaseTable record);

    List<ListingsReleaseTable> selectByPrimaryKey(Integer lrtId);

    int updateByPrimaryKeySelective(ListingsReleaseTable record);

    int updateByPrimaryKey(ListingsReleaseTable record);
}