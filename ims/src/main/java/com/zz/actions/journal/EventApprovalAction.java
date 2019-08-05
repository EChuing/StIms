package com.zz.actions.journal;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.po.journal.JournalEventApproval;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.journal.EventApprovalService;

public class EventApprovalAction extends BaseAction implements ModelDriven<JournalEventApproval>{
	private JournalEventApproval journalEventApproval;
	private EventApprovalService eventApprovalService;
	public void setJournalEventApproval(JournalEventApproval journalEventApproval) {
		this.journalEventApproval = journalEventApproval;
	}
	public void setEventApprovalService(EventApprovalService eventApprovalService) {
		this.eventApprovalService = eventApprovalService;
	}
	@Override
	public JournalEventApproval getModel() {
		if(journalEventApproval == null){
			journalEventApproval = new JournalEventApproval();
		}
		return journalEventApproval;
	}
	//已租双击查看事务
	public String eventApprovalInRentDb(){
	    try {
            List<JournalEventApproval> list = eventApprovalService.selectAll(journalEventApproval);
            getCurrentDateSecond();
            String date = "";
            if(list.size() != 0){
                for(int i=0;i<list.size();i++){
                    date = list.get(i).getEaReleaseTime().substring(0,19);
                    list.get(i).setEaReleaseTime(date);
                    if(list.get(i).getEaEventState().equals("处理中")){
                        list.get(i).setEaUseTime(getCurrentDateSecond());
                    }
                }
                String json = JSONUtil.serialize(list);
                
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{      
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	/**
	 * 查询审批-数据和统计分开
	 * @return
	 */
	public String selectEvent(){
		//审批 - 查个人房     C02b01
        int auth1 = Authority.authorize("C02b01");
        //审批 - 查部门房     C02b02
        int auth2 = Authority.authorize("C02b02");
        //审批 - 查分店房     C02b03
        int auth3 = Authority.authorize("C02b03");
        //审批 - 查公司       C02b04
        int auth4 = Authority.authorize("C02b04");
        //用户信息
        SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0 && auth3 == 0 && auth4 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看审批权限", null));
            return null;
        } else {
            if (auth4 == 1) {
                
            } else if (auth3 == 1) {
                if(journalEventApproval.getHandlerStoreId() != null && journalEventApproval.getHandlerStoreId() != storefront){
                    printlnOfJson(CommonMethodClass.jsonData(-3, "无权限，仅可查看本人所属区域", null));
                    return null;
                }
                journalEventApproval.setHandlerStoreId(storefront);
            } else if (auth2 == 1) {
                if(journalEventApproval.getHandlerDetId() != null && journalEventApproval.getHandlerDetId() != department){
                    printlnOfJson(CommonMethodClass.jsonData(-3, "无权限，仅可查看本人所属部门", null));
                    return null;
                }
                journalEventApproval.setHandlerDetId(department);
            } else if (auth1 == 1) {
                journalEventApproval.setUserId(userid);
            }
        }
        try {
            List<JournalEventApproval> list = eventApprovalService.selectAllEvent(journalEventApproval);
            getCurrentDateSecond();
            String date = "";
            if(list.size() != 0){
                for(int i=0;i<list.size();i++){
                    if(list.get(i).getEaReleaseTime()!=null && list.get(i).getEaReleaseTime() !=""){
                        date = list.get(i).getEaReleaseTime().substring(0,19);
                        list.get(i).setEaReleaseTime(date);
                    }
                    if("处理中".equals(list.get(i).getEaEventState())){
                        list.get(i).setEaUseTime(getCurrentDateSecond());
                    }
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{      
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//查询所有
	public String selectEventApproval(){
	    try {
            List<JournalEventApproval> list = eventApprovalService.selectAll(journalEventApproval);
            getCurrentDateSecond();
            String date = "";
            if(list.size() != 0){
                for(int i=0;i<list.size();i++){
                    date = list.get(i).getEaReleaseTime().substring(0,19);
                    list.get(i).setEaReleaseTime(date);
                    if(list.get(i).getEaEventState().equals("处理中")){
                        list.get(i).setEaUseTime(getCurrentDateSecond());
                    }
                }
                String json = JSONUtil.serialize(list);
                
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{      
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//根据id查询
	public String selectEventApprovalById(){
		try {
			List<JournalEventApproval> list = eventApprovalService.selectById(journalEventApproval.getEaId());
			if(list.size() > 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
		
	//新增
	public String insertEventApproval(){
	    try {
            int result = eventApprovalService.insertSelective(journalEventApproval);
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//修改
	public String updateEventApproval(){
	    try {
            int result = eventApprovalService.updateByPrimaryKeySelective(journalEventApproval);
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//处理事务
	public String handleEvent(){
	    try {
            if("已完成".equals(journalEventApproval.getEaEventState())){
                journalEventApproval.setEaUseTime(getCurrentDateSecond());;
            }
            int result = eventApprovalService.handleEvent(journalEventApproval);
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "处理事务失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//删除
	public String deleteEventApproval(){
		try {
			int result = eventApprovalService.deleteByPrimaryKey(journalEventApproval.getEaId());
			if(result != 0){
				printlnMsg("1");
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {}
		return null;
	}
	
    /**
     * 删除图片
     */
    public void deleteEventApprovalPic(){
        try {
            List<JournalEventApproval> list = eventApprovalService.selectById(journalEventApproval.getEaId());
            if(list.size() == 0){
                printlnMsg("-1");
            }
            String oldPath = list.get(0).getEaImgPath();
            String delPath = journalEventApproval.getEaImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            journalEventApproval.setEaImgPath(newPath);
            journalEventApproval.setEaImgNum(UploadUtil.getImageNum(newPath));
            int result = eventApprovalService.updateByPrimaryKeySelective(journalEventApproval);
            if (result > 0) {
                printlnMsg("1");
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }
    
	//	获取当前时间
	private String getCurrentDateSecond() {
		Date d = new Date();  
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        String dateNowStr = sdf.format(d); 
		return dateNowStr;
	}
}
