package com.zz.service.journal;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.journal.JournalRepairMapper;
import com.zz.po.commons.Result;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.journal.JournalRepairExpand;
import com.zz.po.sys.SysUserExpand;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class RepairServiceImpl implements RepairService{
	
	private JournalRepairMapper journalRepairMapper;
	private JournalAttachmentMapper journalAttachmentMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;

	public void setJournalAttachmentMapper(JournalAttachmentMapper journalAttachmentMapper) {
		this.journalAttachmentMapper = journalAttachmentMapper;
	}

	public void setJournalRepairMapper(JournalRepairMapper journalRepairMapper) {
		this.journalRepairMapper = journalRepairMapper;
	}

	@Override
	public int insertSelective(JournalRepairExpand record) throws Exception {
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
		record.setRepImgPath(path);
		record.setRepImgNum(num);
		if(record.getRepGrade()=="" || record.getRepGrade()==null){
			record.setRepGrade("3");
		}
		int results= journalRepairMapper.insertSelective(record);
		if(results==1) {
			if("维保".equals(record.getType())) {
				SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
				JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
				jhf.setJhfHouseId(record.getRepHouseId());
				jhf.setJhfHouse4rentId(record.getRepHouse4rentId());
				jhf.setJhfHouse4storeId(record.getRepHouse4storeId());
				jhf.setJhfUserId(userInfo.getUserId());
				jhf.setJhfUserName(userInfo.getSuStaffName());
				jhf.setJhfStorefront(userInfo.getSuStoreId());
				jhf.setJhfDepartment(userInfo.getSuDepartmentId());
				jhf.setJhfPaymentWay("系统跟进");
				jhf.setJhfFollowResult("跟进成功");
				
//				jhf.setJhfFollowRemark("新增维保："+"维保类型："+record.getRepTypeRp()+",费用归属："+record.getRepResponsibility()
//				+",客户姓名："+record.getRepContacts()+",客户电话："+record.getRepContactsPhone()+",负责人："+userInfo.getSuStaffName()
//				+",期望时间："+record.getRepHopeTime()+",维保描述："+record.getRepEventRp());
				
				jhf.setJhfFollowRemark("新增维保：【"+"维保类型："+record.getRepTypeRp()+"；费用归属："+record.getRepResponsibility()
				+"；客户姓名："+record.getRepContacts()+"；客户电话："+record.getRepContactsPhone()+"；负责人："+userInfo.getSuStaffName()
				+"；期望时间："+record.getRepHopeTime()+"；维保描述："+record.getRepEventRp()+"】");
				
				int result1 = journalHousingFollowMapper.insertSelective(jhf);
				return 1;
			}else if("任务".equals(record.getType())){
				SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
				JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
				jhf.setJhfHouseId(record.getRepHouseId());
				jhf.setJhfHouse4rentId(record.getRepHouse4rentId());
				jhf.setJhfHouse4storeId(record.getRepHouse4storeId());
				jhf.setJhfUserId(userInfo.getUserId());
				jhf.setJhfUserName(userInfo.getSuStaffName());
				jhf.setJhfStorefront(userInfo.getSuStoreId());
				jhf.setJhfDepartment(userInfo.getSuDepartmentId());
				jhf.setJhfPaymentWay("系统跟进");
				jhf.setJhfFollowResult("跟进成功");
				
				/*
				 * jhf.setJhfFollowRemark("新增任务:任务类型:"+record.getRepTypeRp()+",责任归属:"+record.
				 * getRepResponsibility()
				 * +",负责人："+userInfo.getSuStaffName()+",期望时间："+record.getRepHopeTime()+",任务描述："+
				 * record.getRepEventRp());
				 */
				jhf.setJhfFollowRemark("新增任务：【任务类型："+record.getRepTypeRp()+"；责任归属："+record.getRepResponsibility()
				+",负责人："+userInfo.getSuStaffName()+"；期望时间："+record.getRepHopeTime()+"；任务描述："+record.getRepEventRp()+"】");
				System.out.println(record.getRepHopeTime()+"**********");
				int result1 = journalHousingFollowMapper.insertSelective(jhf);
				return 1;
			}
		}
		return -1;
	}

	@Override
	public List<JournalRepairExpand> selectByPrimaryKey(Integer id) throws Exception {
		return journalRepairMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalRepairExpand record)
			throws Exception {
		return journalRepairMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<JournalRepairExpand> selectAllTask(
			JournalRepairExpand conditions) throws Exception {
		return journalRepairMapper.selectAllTask(conditions);
	}

	@Override
	public List<JournalRepairExpand> selectAllRepair(JournalRepairExpand conditions) throws Exception {
		return journalRepairMapper.selectAllRepair(conditions);
	}

    @Override
    public List<JournalRepairExpand> selectRepairByAnyCondition(JournalRepairExpand conditions)
            throws Exception {
        return journalRepairMapper.selectRepairByAnyCondition(conditions);
    }
    
    //批量添加维保(从保洁、维修、装修处添加)
	@Override
	public Result<String> insertListRepair(JournalRepairExpand record) throws Exception {
		List<JournalRepairExpand> repairList = JSON.parseArray(record.getAddRepairs(),JournalRepairExpand.class);
		for (JournalRepairExpand journalRepairExpand : repairList) {
			if(journalRepairExpand.getRepNumber()==""||journalRepairExpand.getRepNumber()==null){
				SimpleDateFormat ft = new SimpleDateFormat ("YYMMdd"); 
				String randomNumber=String.valueOf((int)(Math.random()*1000000));
				String repNumber=ft.format(new Date())+randomNumber;
				journalRepairExpand.setRepNumber(repNumber);
			}
		}
		int result = journalRepairMapper.insertListRepair(repairList);
		if(result > 0){
			return new Result<String>(1,"设置成功",null);
        }else{
        	return new Result<String>(-1,"设置失败",null);
        }
	}


}
