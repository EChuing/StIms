package com.zz.mapper.journal;

import java.util.List;

import com.zz.po.journal.DashNoticeExpand;
import com.zz.po.sys.SysAssetsExpand;


public interface DashNoticeMapper {
	
	//查询所有公告信息，给出条件则为条件查询
	List<DashNoticeExpand> queryNoticeAll(DashNoticeExpand record) throws Exception;
	
	//添加公告
    int insertNotice(DashNoticeExpand record)throws Exception;
    
    // 修改公告
    int updatesNotice(DashNoticeExpand record)throws Exception;
    
    // 根据公告id,删除公告
    int deleteNotice(DashNoticeExpand dnId)throws Exception;
    
    

}
