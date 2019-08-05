package com.zz.service.journal;

import java.util.List;

import com.zz.po.journal.DashNoticeExpand;
import com.zz.po.sys.SysAssetsExpand;

public interface NoticeService {

	List<DashNoticeExpand> queryNoticeAll(DashNoticeExpand record) throws Exception;
	
	//添加公告
    int insertNotice(DashNoticeExpand record)throws Exception;
    
    //修改公告
    int updateNotice(DashNoticeExpand record)throws Exception;
    
  //根据Id,删除公告
   int deleteNotice(DashNoticeExpand dnId)throws Exception;

}
