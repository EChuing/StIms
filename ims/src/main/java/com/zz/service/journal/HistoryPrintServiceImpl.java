package com.zz.service.journal;

import java.util.List;

import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.zz.mapper.journal.JournalHistoryPrintMapper;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.journal.JournalHistoryPrintExpand;

public class HistoryPrintServiceImpl implements HistoryPrintService {
	private JournalHistoryPrintMapper journalHistoryPrintMapper;
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	
	public void setInfoContractInstallmentMapper(InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}
	public void setJournalHistoryPrintMapper(JournalHistoryPrintMapper journalHistoryPrintMapper) {
		this.journalHistoryPrintMapper = journalHistoryPrintMapper;
	}

	@Override
	public List<JournalHistoryPrintExpand> selectAll(
			JournalHistoryPrintExpand record) throws Exception {
		return journalHistoryPrintMapper.selectAll(record);
	}

	/**
	 * 添加历史打印
	 * 若有账单，更新打印票据的 id和超期天数
	 */
	@Override
	public int insertSelective(JournalHistoryPrintExpand record) throws Exception {
		Integer jciId = record.getJciId();
		System.out.println("数据:"+record.toString());
		int result = journalHistoryPrintMapper.insertSelective(record);
		if(jciId != null && !"".equals(jciId)){
			Integer jhpId = record.getJhpId();
			InfoContractInstallmentExpand icie = new InfoContractInstallmentExpand();
			icie.setJciId(jciId);
			icie.setJciJhpId(jhpId);
			icie.setJciOverdueDays(record.getJciOverdueDays());
			infoContractInstallmentMapper.updateByPrimaryKeySelective(icie);
		}
		System.out.println("result========="+result);
		return result;
	}

	@Override
	public List<JournalHistoryPrintExpand> selectAllPrint(JournalHistoryPrintExpand record) throws Exception {
		return journalHistoryPrintMapper.selectAllPrint(record);
	}
}
