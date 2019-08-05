package com.zz.service.journal;

import java.util.List;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.journal.JournalHousingFollow;
import com.zz.po.journal.JournalHousingFollowExpand;

public class HousingFollowServiceImpl implements HousingFollowService{
	
	private JournalHousingFollowMapper journalHousingFollowMapper;
	private JournalAttachmentMapper journalAttachmentMapper;
	private InfoHouse4rentMapper infoHouse4rentMapper;
	
	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
        this.infoHouse4rentMapper = infoHouse4rentMapper;
    }

    public void setJournalAttachmentMapper(JournalAttachmentMapper journalAttachmentMapper) {
		this.journalAttachmentMapper = journalAttachmentMapper;
	}

	public void setJournalHousingFollowMapper(JournalHousingFollowMapper journalHousingFollowMapper) {
		this.journalHousingFollowMapper = journalHousingFollowMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		return journalHousingFollowMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelective(JournalHousingFollowExpand record) throws Exception {
		String att = record.getAtt();
		String path = null;
		String num = null;
		if(att != null){
			JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
			if(attachment != null){
				path = attachment.getPath();
				num = attachment.getNum();
				int result = journalAttachmentMapper.deleteByAtt(att);
				if(result == 0){
					throw new Exception("从附件表删除记录失败");
				}
			}
		}
		record.setJhfImgPath(path);
		record.setJhfImgNum(num);
		//修改已租房最新跟进时间
		if (record.getJhfHouse4rentId() != null) {
		    InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
		    hr.setHrId(record.getJhfHouse4rentId());
		    hr.setHrFollowTime(CommonMethodClass.getCurrentDate());
		    infoHouse4rentMapper.updateByPrimaryKeySelective(hr);
		}
		return journalHousingFollowMapper.insertSelective(record);
	}

	@Override
	public List<JournalHousingFollowExpand> selectByPrimaryKey(Integer id) throws Exception {
		return journalHousingFollowMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalHousingFollow record)
			throws Exception {
		return journalHousingFollowMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<JournalHousingFollowExpand> selectByHouse4rentId(Integer houseId)
			throws Exception {
		return journalHousingFollowMapper.selectByHouse4rentId(houseId);
	}

	@Override
	public List<JournalHousingFollowExpand> selectAll(JournalHousingFollowExpand conditions) throws Exception {
		System.out.println(conditions.toString());
		System.out.println("hsId======1======"+conditions.getJhfHouse4storeId());
		return journalHousingFollowMapper.selectAll(conditions);
	}

	@Override
	public int updateByHouse4rentId(JournalHousingFollow record)
			throws Exception {
		return journalHousingFollowMapper.updateByHouse4rentId(record);
	}

	@Override
	public List<JournalHousingFollowExpand> selectAllHouseFollow(JournalHousingFollow record) throws Exception {
		return journalHousingFollowMapper.selectAllHouseFollow(record);
	}
	
	
}
