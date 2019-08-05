package com.zz.service.journal;

import java.util.List;
import com.zz.po.journal.JournalGoToRegister;

public interface GoToRegisterService {
	//删除
    int deleteByPrimaryKey(Integer gotoId)throws Exception;
    
    //新增
    int insertSelective(JournalGoToRegister record)throws Exception;
    
    //查询
    List<JournalGoToRegister> selectByPrimaryKey(JournalGoToRegister record)throws Exception;
    
    //修改
    int updateByPrimaryKeySelective(JournalGoToRegister record)throws Exception;
    
    //外出登记查询
    List<JournalGoToRegister> queryWorkOutsideByUserId (JournalGoToRegister record)throws Exception;
    
    //回来签到
    int comeBackSignIn(JournalGoToRegister record)throws Exception;
}
