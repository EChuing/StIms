package com.zz.mapper.info;

import com.zz.po.info.InfoSandboxie;

public interface InfoSandboxieMapper {
    int deleteByPrimaryKey(Integer isId);

    int insert(InfoSandboxie record);

    int insertSelective(InfoSandboxie record);

    InfoSandboxie selectByPrimaryKey(Integer isId);

    int updateByPrimaryKeySelective(InfoSandboxie record);

    int updateByPrimaryKey(InfoSandboxie record);
}