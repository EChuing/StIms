package com.zz.mapper.sys;

import java.util.List;

import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoTransactionExpand;
import com.zz.po.journal.JourUserDevice;
import com.zz.po.sys.SysUserExpand;

public interface SysUserMapper {
	//查询部门所属用户公共可看信息
	List<SysUserExpand> nameNumber(SysUserExpand record) throws Exception;
    
	//部门查询
	List<SysUserExpand> queryAllDepar ()throws Exception;
	
	//用户删除
    int deleteByPrimaryKey(SysUserExpand id) throws Exception;
    
    //增加用户
    int insertSelective(SysUserExpand record) throws Exception;
    
    //查询所有用户信息，给出条件则为条件查询
    List<SysUserExpand> selectByPrimaryKey(SysUserExpand id) throws Exception;
    //用户权限判断查询
    String permissionToQuery(SysUserExpand userid);
    
    //登录认证userLogin
    SysUserExpand userLogin(SysUserExpand user) throws Exception;
    
    //修改用户资料
    int updateByPrimaryKeySelective(SysUserExpand record) throws Exception;

    //查询用户名是否存在
    List<SysUserExpand> selectUsername(SysUserExpand record) throws Exception;

	List<SysUserExpand> selectByPrimaryKey(InfoHouse4rentExpand infoRent) throws Exception;

	//查询有折扣授权的全部用户
	List<SysUserExpand> selectAllDiscountAuth(SysUserExpand record)throws Exception;

	//查询所用用户和部门
	List<SysUserExpand> selectAll(JourUserDevice jourUserDevice) throws Exception;

    SysUserExpand selectById(SysUserExpand record) throws Exception;
    //查询学生是否存在
    List<SysUserExpand> selectStudent(SysUserExpand record) throws Exception;
    //增加学生
    int insertStudent(SysUserExpand record) throws Exception;
    //换班级修改学生资料
    int updateStudent(SysUserExpand record) throws Exception;
    //修改学生信息
    int updateStudentInformation(SysUserExpand record) throws Exception;

}