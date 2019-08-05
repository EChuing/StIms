package com.zz.service.journal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.mapper.journal.JournalEventApprovalMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.journal.JournalEventApproval;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;

public class EventApprovalServiceImpl implements EventApprovalService {
	private JournalEventApprovalMapper journalEventApprovalMapper;
	private JournalAttachmentMapper journalAttachmentMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	
	public void setJournalEventApprovalMapper(
			JournalEventApprovalMapper journalEventApprovalMapper) {
		this.journalEventApprovalMapper = journalEventApprovalMapper;
	}

	public void setJournalAttachmentMapper(
			JournalAttachmentMapper journalAttachmentMapper) {
		this.journalAttachmentMapper = journalAttachmentMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer eaId) throws Exception {
		return journalEventApprovalMapper.deleteByPrimaryKey(eaId);
	}

	@Override
	public int insertSelective(JournalEventApproval record) throws Exception {
		String att = record.getAtt();
		System.out.println("5555555555"+att);
		String path = null;
		String num = null;
		if(att != null && !att.equals("")){
			System.out.println("666666"+att);
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
		record.setEaImgPath(path);
		record.setEaImgNum(num);
		int result= journalEventApprovalMapper.insertSelective(record);
		if(result>0) {
			SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
			JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
			jhf.setJhfHouseId(record.getEaHouseId());
			jhf.setJhfHouse4rentId(record.getEaRentId());
			jhf.setJhfHouse4storeId(record.getEaStoreId());
			jhf.setJhfUserId(userInfo.getUserId());
			jhf.setJhfUserName(userInfo.getSuStaffName());
			jhf.setJhfStorefront(userInfo.getSuStoreId());
			jhf.setJhfDepartment(userInfo.getSuDepartmentId());
			jhf.setJhfPaymentWay("系统跟进");
			jhf.setJhfFollowResult("跟进成功");
			
			jhf.setJhfFollowRemark("新增审批："+"审批类型："+record.getEaEventType()+",审批人："+userInfo.getSuStaffName()
			+",审批内容："+record.getEaEventContent());
			
			int result1 = journalHousingFollowMapper.insertSelective(jhf);
			return result1;
		}else {
			return-1;
		}
	}

	@Override
	public List<JournalEventApproval> selectAll(JournalEventApproval record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalEventApprovalMapper.selectAll(record);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalEventApproval record) throws Exception {
        return journalEventApprovalMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<JournalEventApproval> selectById(Integer eaId) throws Exception {
		// TODO Auto-generated method stub
		return journalEventApprovalMapper.selectById(eaId);
	}
	
	/**
	 * 处理事务
	 * @param record
	 * @return
	 * @throws Exception
	 */
	@Override
	public int handleEvent(JournalEventApproval record) throws Exception{
		int result = 0;
		List<JournalEventApproval> list = journalEventApprovalMapper.selectById(record.getEaId());
		if(list.size() > 0){
		    JournalEventApproval ea = list.get(0);
			String eaHistoricalProcess = ea.getEaHistoricalProcess();
			String eaTreatmentOpinion = ea.getEaTreatmentOpinion();
			if(record.getEaHistoricalProcess() != null){
				if(eaHistoricalProcess == null){
					eaHistoricalProcess = record.getEaHistoricalProcess();
				}else{
					eaHistoricalProcess += "," + record.getEaHistoricalProcess();
				}
				record.setEaHistoricalProcess(eaHistoricalProcess);
			}
			if(record.getEaTreatmentOpinion() != null){
				if(eaTreatmentOpinion == null ){
					eaTreatmentOpinion = record.getEaTreatmentOpinion();
				}else{
					eaTreatmentOpinion += "," + record.getEaTreatmentOpinion();
				}
				record.setEaTreatmentOpinion(eaTreatmentOpinion);
			}
			
			
			result = journalEventApprovalMapper.updateByPrimaryKeySelective(record);
		}
		return result;
	}

	@Override
	public List<JournalEventApproval> selectAllEvent(JournalEventApproval record) throws Exception {
		// TODO Auto-generated method stub
		return journalEventApprovalMapper.selectAllEvent(record);
	}
}
