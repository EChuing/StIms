package com.zz.service.sys;

import java.util.List;


import com.zz.po.commons.Result;

import com.zz.po.journal.JourUserDevice;
import com.zz.po.sys.SysUserExpand;

public interface UserService {
	//公司人员，转移部门
	 int updatePersonnelTransfer(SysUserExpand record) throws Exception;
    //换班级
    int updateStudentTransfer(SysUserExpand record) throws Exception;
    //修改学生信息
    int updateStudentInformation(SysUserExpand record) throws Exception;
	
	//查询部门所属用户可公开被查看的个人信息
	List<SysUserExpand> nameNumber(SysUserExpand record) throws Exception;
	
	//部门查询
	List<SysUserExpand> queryAllDepar ()throws Exception;
		
	//用户删除
	int deleteByPrimaryKey(SysUserExpand record) throws Exception;
	
	//增加用户
    int insertSelective(SysUserExpand record) throws Exception;
    
    // 查询所有用户信息，给出条件则为条件查询
    List<SysUserExpand> selectByPrimaryKey(SysUserExpand record) throws Exception;
    
    //登录认证userLogin
    SysUserExpand userLogin(SysUserExpand user) throws Exception;
    
    //修改用户资料
    int updateByPrimaryKeySelective(SysUserExpand record) throws Exception;

    //用户离职，资料转移
    int dataTransfer(SysUserExpand record) throws Exception;
    
    //查询用户名是否存在
    List<SysUserExpand> selectUsername(SysUserExpand record) throws Exception;
    //更改用户状态
	int updateByPrimaryKeySelectiveOne(SysUserExpand record) throws Exception;

    //查询有折扣授权的全部用户
    List<SysUserExpand> selectAllDiscountAuth(SysUserExpand record)throws Exception;

	//查询未关联用户
	List<SysUserExpand> selectUserPicDig(JourUserDevice JourUserDevice)throws Exception;

    SysUserExpand selectById(SysUserExpand record) throws Exception;
    //查询学生是否存在
    List<SysUserExpand> selectStudent(SysUserExpand record) throws Exception;
    //插入学生数据

    int insertStudent(SysUserExpand record) throws Exception;

}
