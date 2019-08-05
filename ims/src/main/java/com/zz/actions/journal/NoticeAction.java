package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.PubUploadUtil;
import com.zz.other.Syslog;
import com.zz.po.journal.DashNoticeExpand;
import com.zz.service.journal.NoticeService;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;

import java.util.List;

public class NoticeAction extends BaseAction implements ModelDriven<DashNoticeExpand>{
	private DashNoticeExpand dashNoticeExpand;
	private NoticeService noticeService;
	
	public void setDashNoticeExpand(DashNoticeExpand dashNoticeExpand) {
		this.dashNoticeExpand = dashNoticeExpand;
	}

	public void setNoticeService(NoticeService noticeService) {
		this.noticeService = noticeService;
	}
	
    @Override
    public DashNoticeExpand getModel() {
        if( dashNoticeExpand==null){
            dashNoticeExpand = new DashNoticeExpand();
        }
        return dashNoticeExpand;
    }
	
	//老板仪表盘显示公告
	public String bossNoticeQueryAll(){
	    try {
            List<DashNoticeExpand> list = noticeService.queryNoticeAll(dashNoticeExpand);
            String date = "";
            if(list.size() != 0) {
                for(int i=0;i<list.size();i++){
                    date = list.get(i).getDnTime().substring(0,19);
                    list.get(i).setDnTime(date);
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(json);
            } else {
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	//业务仪表盘显示公告
	public String employeesNoticeQueryAll(){
	    try {
            List<DashNoticeExpand> list = noticeService.queryNoticeAll(dashNoticeExpand);
            String date = "";
            if(list.size() != 0) {
                for(int i=0;i<list.size();i++){
                    date = list.get(i).getDnTime().substring(0,19);
                    list.get(i).setDnTime(date);
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(json);
            } else {
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	//财务仪表盘显示公告
	public String financialNoticeQueryAll(){
	    try {
            List<DashNoticeExpand> list = noticeService.queryNoticeAll(dashNoticeExpand);
            String date = "";
            if(list.size() != 0) {
                for(int i=0;i<list.size();i++){
                    date = list.get(i).getDnTime().substring(0,19);
                    list.get(i).setDnTime(date);
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(json);
            } else {
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	//行政仪表盘显示公告
	public String administrativeNoticeQueryAll(){
	    try {
            List<DashNoticeExpand> list = noticeService.queryNoticeAll(dashNoticeExpand);
            String date = "";
            if(list.size() != 0) {
                for(int i=0;i<list.size();i++){
                    date = list.get(i).getDnTime().substring(0,19);
                    list.get(i).setDnTime(date);
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(json);
            } else {
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	//查询公告，给出条件则为条件查询
	public void noticeQueryAll()throws Exception {
        int auth1 = Authority.authorize("C06b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看公告权限", null));
        }
        try {
            List<DashNoticeExpand> list = noticeService.queryNoticeAll(dashNoticeExpand);
            Integer total;
            if (list.size() > 0) {
                total = Integer.valueOf(list.get(0).getTotalNum());
                System.out.println("total====="+list.get(0).getTotalNum());
            } else {
                total = 0;
            }
            JSONObject jsonObj = new JSONObject();
            jsonObj.accumulate("total", total);
            jsonObj.accumulate("rows", list);
            String json = jsonObj.toString();
            printlnOfJson(json);
        }catch(Exception e){
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }

	//增加公告
	public String insertNotice(){
		try {
			int result = noticeService.insertNotice(dashNoticeExpand);
			int id = dashNoticeExpand.getDnUserId();
			if(result==0){
				printlnMsg("-1");
			}else{
				printlnMsg(""+id);
			}
		} catch (Exception e) {}
	return null;
	}
	//老板仪表盘增加公告
	public String BossInsertNotice(){
	    try {
            int result = noticeService.insertNotice(dashNoticeExpand);
            int id = dashNoticeExpand.getDnUserId();
            if(result==0){
                printlnMsg("-1");
            }else{
                printlnMsg(""+id);
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
	    return null;
	}
	//修改公告
	public String updateNotice(){
		try {
			int result = noticeService.updateNotice(dashNoticeExpand);
			if(result==0){
				printlnMsg("-1");
			}else{
				printlnMsg("1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	}
	//老板仪表盘修改、更新公告
	public String bossUpdateNotice(){
	    try {
            int result = noticeService.updateNotice(dashNoticeExpand);
            if(result==0){
                printlnMsg("-1");
            }else{
                printlnMsg("1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	//删除公告
	public String deleteNotice(){
		try {
			int result = noticeService.deleteNotice(dashNoticeExpand);
			if(result==0){
				printlnMsg("-1");
			}else{
				printlnMsg("1");
			}
		} catch (Exception e) {}
		return null;
	}
	//删除公告图片
    public String deleteNoticePic(){
        try {
            List<DashNoticeExpand> list=noticeService.queryNoticeAll(dashNoticeExpand);
            String oldPath=list.get(0).getFileImgPath();
            String delPath=dashNoticeExpand.getFileImgPath();
            String newPath = PubUploadUtil.getNewPath2(oldPath, delPath);
            dashNoticeExpand.setFileImgPath(newPath);
            dashNoticeExpand.setFileImgNum(PubUploadUtil.getImageNum2(newPath));
            int result=0;
            result = noticeService.updateNotice(dashNoticeExpand);
            if(result>0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
