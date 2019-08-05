package com.zz.service.journal;

import com.zz.po.journal.JournalAttachment;

public interface AttachmentService {
	int deleteByAtt(String att);
	int deleteByAtt2(String att2);
	
	int deleteRecordAndFile(String att);
	int deleteRecordAndFile2(String att2);

    int insert(JournalAttachment record);

    JournalAttachment selectByAtt(String att);
    JournalAttachment selectByAtt2(String att2);

    int updateByAtt(JournalAttachment record);
    int updateByAtt2(JournalAttachment record);
    
    int updateBkType(JournalAttachment record);
}
