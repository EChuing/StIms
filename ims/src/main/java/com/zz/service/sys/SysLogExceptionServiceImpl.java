package com.zz.service.sys;

import com.zz.mapper.sys.SysLogExceptionMapper;
import com.zz.po.sys.SysLogException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * @author wangchong
 * @date 2019-06-03 20:18
 */
public class SysLogExceptionServiceImpl implements SysLogExceptionService {

    private SysLogExceptionMapper sysLogExceptionMapper;

    public void setSysLogExceptionMapper(SysLogExceptionMapper sysLogExceptionMapper) {
        this.sysLogExceptionMapper = sysLogExceptionMapper;
    }

    @Override
    public int insertSelective(SysLogException record) throws Exception {
        return sysLogExceptionMapper.insertSelective(record);
    }

    @Override
    public SysLogException selectByPrimaryKey(Long sleId) throws Exception {
        return sysLogExceptionMapper.selectByPrimaryKey(sleId);
    }
}
