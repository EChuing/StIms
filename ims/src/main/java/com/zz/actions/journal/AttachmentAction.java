package com.zz.actions.journal;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.po.journal.JournalAttachment;
import com.zz.service.journal.AttachmentService;

public class AttachmentAction extends BaseAction implements ModelDriven<JournalAttachment> {
	private JournalAttachment journalAttachment;
	private AttachmentService attachmentService;

	@Override
	public JournalAttachment getModel() {
		if(journalAttachment == null){
			journalAttachment = new JournalAttachment();
		}
		return journalAttachment;
	}

	public void setAttachmentService(AttachmentService attachmentService) {
		this.attachmentService = attachmentService;
	}

	public void getAttachment(){
		try {
			JournalAttachment attachment =null;
			System.out.println("get attType"+ journalAttachment.getAttType());
			if(journalAttachment.getAttType() == null){
				attachment= attachmentService.selectByAtt(journalAttachment.getAtt());
			}else{
				if(journalAttachment.getAttType()==1){
					attachment= attachmentService.selectByAtt(journalAttachment.getAtt());
				}
				if(journalAttachment.getAttType()==2){
					attachment = attachmentService.selectByAtt2(journalAttachment.getAtt2());
				}
			}
			if(attachment != null){
				String json = JSONUtil.serialize(attachment);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
			    printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
	}
	
	public void insertAttachment(){
		try {
			System.out.println("inseret attType"+ journalAttachment.getAttType());
			int result = attachmentService.insert(journalAttachment);
			if(result > 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
	}
	
	public void updateAttachment(){
		try {
			int result =0;
			System.out.println("update attType"+ journalAttachment.getAttType());
			if(journalAttachment.getAttType()==1){
				result=attachmentService.updateByAtt(journalAttachment);
			}
			if(journalAttachment.getAttType()==2){
				result=attachmentService.updateByAtt2(journalAttachment);
			}
			if(result > 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
	}
	
	public void deleteAttachment(){
		try {
			int result =0;
			System.out.println("delete attType"+ journalAttachment.getAttType());
			if(journalAttachment.getAttType()==1){
				result=attachmentService.deleteByAtt(journalAttachment.getAtt());
			}

			if(journalAttachment.getAttType()==2){
				result=attachmentService.deleteByAtt2(journalAttachment.getAtt2());
			}
			if(result > 0){
			    printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
			    printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
	}
	
	public void deleteAttachmentAndFile(){
		try {
			int result = 0;
			System.out.println("deleteFile attType"+ journalAttachment.getAttType());
			if(journalAttachment.getAttType()==1){
				result =attachmentService.deleteRecordAndFile(journalAttachment.getAtt());
			}
			if(journalAttachment.getAttType()==2){}{
				result =attachmentService.deleteRecordAndFile2(journalAttachment.getAtt2());
			}
			if(result > 0){
			    printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
			    printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
	}
	
    /**
     * 删除图片
     */
    public void deleteAttachmentPic(){
        try {
            JournalAttachment attachment =null;
            System.out.println("deletePic attType"+ journalAttachment.getAttType());
            if(journalAttachment.getAttType()==1){
            	attachment= attachmentService.selectByAtt(journalAttachment.getAtt());
            }
            if(journalAttachment.getAttType()==2){
            	attachment= attachmentService.selectByAtt2(journalAttachment.getAtt2());
            }
            if(attachment == null){
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
            }
            String oldPath = attachment.getPath();
            String delPath = journalAttachment.getPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            journalAttachment.setPath(newPath);
            journalAttachment.setNum(UploadUtil.getImageNum(newPath));
            int result =0;
            if(journalAttachment.getAtt()!=null){
            	result =attachmentService.updateByAtt(journalAttachment);
            }
            if(journalAttachment.getAtt2()!=null){
            	result=attachmentService.updateByAtt2(journalAttachment);;
            }
            if (result > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }
    
    public void updateBkType(){
        try {
            int result = attachmentService.updateBkType(journalAttachment);
            if (result > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }
    
}
