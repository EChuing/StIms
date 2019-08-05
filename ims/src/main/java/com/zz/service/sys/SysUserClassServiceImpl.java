package com.zz.service.sys;

import com.alibaba.fastjson.JSON;
import com.zz.mapper.sys.SysSystemSettingMapper;
import com.zz.mapper.sys.SysUserClassMapper;
import com.zz.po.commons.Result;
import com.zz.po.sys.SysUserClass;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public class SysUserClassServiceImpl implements SysUserClassService{
    @Autowired
    private SysUserClassMapper sysUserClassMapper;

    @Override
    public List<SysUserClass> queryClassRoom(SysUserClass sysUserClass) throws Exception {
        return sysUserClassMapper.queryClassRoom(sysUserClass);
    }

    @Override
    public int deleteByPrimaryKey(SysUserClass sysUserClass) throws Exception {
        List<SysUserClass> list = JSON.parseArray(sysUserClass.getJsonArray(),SysUserClass.class);
        return sysUserClassMapper.deleteByPrimaryKey(list);
    }

    @Override
    public Result<String> insertUserClass(SysUserClass sysUserClass) throws Exception {
        List<SysUserClass> list = JSON.parseArray(sysUserClass.getJsonArray(),SysUserClass.class);
        int result = sysUserClassMapper.insertUserClass(list);

        if(result > 0){
            return new Result<>(1,"添加成功",null);
        }else{
            return new Result<>(1,"添加失败",null);
        }
    }

    @Override
    public int updateBySucUserId(SysUserClass sysUserClass) throws Exception {
        return sysUserClassMapper.updateBySucUserId(sysUserClass);
    }

    //查询教师所管的班级的所有学生
    @Override
    public List<SysUserClass> queryAllStudent(SysUserClass sysUserClass)
            throws Exception {
        return sysUserClassMapper.queryAllStudent(sysUserClass);
    }
}
