package com.zz.actions.sys;

import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.po.sys.SysAssetsExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.sys.SysAssetsService;
import com.zz.util.DateUtil;

public class AssetsAction extends BaseAction implements ModelDriven<SysAssetsExpand>{
	private SysAssetsExpand sysAssetsExpand;
    private SysAssetsService sysAssetsService;

	
	public void setSysAssetsService(SysAssetsService sysAssetsService) {
		this.sysAssetsService = sysAssetsService;
	}

    @Override
    public SysAssetsExpand getModel() {
        if(sysAssetsExpand==null){
            sysAssetsExpand = new SysAssetsExpand();
        }
        return sysAssetsExpand;
    }
    /**
     * 查询所有资产信息，给出条件则为条件查询
     */
    public void assetsInRentDb() {
        try {
            List<SysAssetsExpand> list = sysAssetsService.selectAll(sysAssetsExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    public String printAssetFollow(){
    	try {
	    	String[] saIdStr = sysAssetsExpand.getJsonArray().split(",");
	    	int saId = 0;
	    	int flag = saIdStr.length;
	    	SysAssetsExpand sae = new SysAssetsExpand();
	    	for(int i=0;i<saIdStr.length;i++){
	    		saId=Integer.parseInt(saIdStr[i]);
	    		sae.setSaId(saId);
				List<SysAssetsExpand> list = sysAssetsService.selectAll(sae);
				JSONArray jsonArray = JSONArray.fromObject(list.get(0).getSaFollowUp() != null ? list.get(0).getSaFollowUp() : "[]");
		        JSONObject obj = new JSONObject();
	            obj.accumulate("type", "系统跟进");
	            obj.accumulate("registrantName", CommonMethodClass.getSessionUserInfo().getSuStaffName());
	            obj.accumulate("agentName", CommonMethodClass.getSessionUserInfo().getSuStaffName());
	            obj.accumulate("text", "打印资产标识卡");
	            obj.accumulate("time", DateUtil.getCurDateTime());
	            jsonArray.add(obj);
	            sae.setSaFollowUp(jsonArray.toString());
	            int result = sysAssetsService.followById(sae);
	            flag-= result==1 ? 1:0;
	    	}
	    	if(flag==0){
	    		printlnMsg("1");
	    	}else{
	    		printlnMsg("-1");
	    	}
	    	
    	} catch (Exception e) {
    		printlnMsg("-2");
			e.printStackTrace();Syslog.writeErr(e);
		}
    	return null;
    }
    
    /**
     * 查询资产，给出条件则为条件查询 
     */
    public void queryAssets() {
        //资产 - 分店查询     C00b01
        int auth1 = Authority.authorize("C00b01");
        //资产 - 公司查询     C00b02
        int auth2 = Authority.authorize("C00b02");
        //用户信息
        SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看资产权限", null));
        } else {
            if (auth2 == 1) {
                
            } else if (auth1 == 1) {
                sysAssetsExpand.setStorefront(storefront);
            }
        }
        try {
            List<SysAssetsExpand> list = sysAssetsService.selectAll(sysAssetsExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 
     * 
     * 查询资产，给出条件则为条件查询 
     */
    public void queryAssetsCommon() {
        try {
            List<SysAssetsExpand> list = sysAssetsService.selectAll(sysAssetsExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 添加资产
     */
    public void insertAssets() {
        try{
            int result = sysAssetsService.insertAssets(sysAssetsExpand);
            if(result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加资产失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常", null));
        }
    }
    
    /**
     * 修改资产
     */
    public void updateAssets() {
        try {
            int results = sysAssetsService.updateById(sysAssetsExpand);
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改资产失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 迁移资产
     */
    public void moveAssets() {
        try {
            int results = sysAssetsService.moveById(sysAssetsExpand);
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "迁移失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 维修迁移资产
     */
    public void repairMoveAssets() {
        try {
            int results = sysAssetsService.repairMoveById(sysAssetsExpand);
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "迁移失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 删除图片
     */
    public void deleteAssetsPic() {
        try {
            List<SysAssetsExpand> assets = sysAssetsService.selectAll(sysAssetsExpand);
            if (assets.size() == 0) {
                printlnMsg("-1");
                return;
            }
            String oldPath = assets.get(0).getSaPhotos();
            String delPath = sysAssetsExpand.getSaPhotos();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            sysAssetsExpand.setSaPhotos(newPath);
            sysAssetsExpand.setSaPhotosNum(UploadUtil.getImageNum(newPath));
            int result = sysAssetsService.updateById(sysAssetsExpand);
            if (result > 0) {
                printlnMsg("1");
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }
}
