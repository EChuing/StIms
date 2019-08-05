package com.zz.service.journal;

import com.zz.po.journal.JournalQrcode;

public interface QrcodeService {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(JournalQrcode record);

    JournalQrcode selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(JournalQrcode record);

    JournalQrcode selectByQr(String qr);
    
    int updateUrlByQr(JournalQrcode record);
}
