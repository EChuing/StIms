package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.journal.DashNoticeMapper;
import com.zz.po.journal.DashNoticeExpand;

public class NoticeServiceImpl implements NoticeService{

	private DashNoticeMapper dashNoticeMapper;
	
	public void setDashNoticeMapper(DashNoticeMapper dashNoticeMapper) {
		this.dashNoticeMapper = dashNoticeMapper;
	}

	@Override
	public List<DashNoticeExpand> queryNoticeAll(DashNoticeExpand record)
			throws Exception {
		// TODO Auto-generated method stub
		return dashNoticeMapper.queryNoticeAll(record);
	}

	@Override
	public int insertNotice(DashNoticeExpand record) throws Exception {
		// TODO Auto-generated method stub
		return dashNoticeMapper.insertNotice(record);
	}

	@Override
	public int updateNotice(DashNoticeExpand record) throws Exception {
		// TODO Auto-generated method stub
		return dashNoticeMapper.updatesNotice(record);
	}

	@Override
	public int deleteNotice(DashNoticeExpand dnId) throws Exception {
		// TODO Auto-generated method stub
		return dashNoticeMapper.deleteNotice(dnId);
	}

}
