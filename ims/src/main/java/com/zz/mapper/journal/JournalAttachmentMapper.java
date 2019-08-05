package com.zz.mapper.journal;

import com.zz.po.journal.JournalAttachment;

public interface JournalAttachmentMapper {

    int insert(JournalAttachment record);

    int deleteByAtt(String att);

    JournalAttachment selectByAtt(String att);

    int updateByAtt(JournalAttachment record);
    
	int deleteByAtt2(String att2);

	JournalAttachment selectByAtt2(String att2);

	int updateByAtt2(JournalAttachment record);

	
}