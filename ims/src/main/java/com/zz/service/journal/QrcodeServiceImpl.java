package com.zz.service.journal;

import com.zz.mapper.journal.JournalQrcodeMapper;
import com.zz.po.journal.JournalQrcode;

public class QrcodeServiceImpl implements QrcodeService{
	
	private JournalQrcodeMapper journalQrcodeMapper;

	public void setJournalQrcodeMapper(JournalQrcodeMapper journalQrcodeMapper) {
		this.journalQrcodeMapper = journalQrcodeMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return journalQrcodeMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelective(JournalQrcode record) {
		// TODO Auto-generated method stub
		return journalQrcodeMapper.insertSelective(record);
	}

	@Override
	public JournalQrcode selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return journalQrcodeMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalQrcode record) {
		// TODO Auto-generated method stub
		return journalQrcodeMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public JournalQrcode selectByQr(String qr) {
		// TODO Auto-generated method stub
		return journalQrcodeMapper.selectByQr(qr);
	}

	@Override
	public int updateUrlByQr(JournalQrcode record) {
		// TODO Auto-generated method stub
		return journalQrcodeMapper.updateUrlByQr(record);
	}

}
