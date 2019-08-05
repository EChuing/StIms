package com.zz.actions.sys;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.po.sys.SysSuppliesExpand;
import com.zz.service.sys.SysSuppliesService;

public class SysSuppliesAction extends BaseAction implements ModelDriven<SysSuppliesExpand> {
    private SysSuppliesExpand sysSuppliesExpand;
    private SysSuppliesService sysSuppliesService;
    
    public void setSysSuppliesService(SysSuppliesService sysSuppliesService) {
        this.sysSuppliesService = sysSuppliesService;
    }

    @Override
    public SysSuppliesExpand getModel() {
        if (sysSuppliesExpand == null) {
            sysSuppliesExpand = new SysSuppliesExpand();
        }
        return sysSuppliesExpand;
    }
    
    /**
     * 查询耗材
     */
    public void querySupplies() {
        try {
            List<SysSuppliesExpand> list = sysSuppliesService.selectAll(sysSuppliesExpand);
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
    
    /**
     * 添加耗材
     */
    public void insertSupplies() {
        try {
            int results = sysSuppliesService.insertSelective(sysSuppliesExpand);
            if (results > 0) {
            	printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 修改耗材
     */
    public void updateSupplies() {
        try {
            int results = sysSuppliesService.updateById(sysSuppliesExpand);
            if (results > 0) {
            	printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 迁移耗材
     */
    public void moveSupplies() {
        try {
            int results = sysSuppliesService.moveById(sysSuppliesExpand);
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
     * 使用耗材
     */
    public void useSupplies() {
        try {
            int results = sysSuppliesService.useById(sysSuppliesExpand);
            if (results > 0) {
            	printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "使用失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常", null));
        }
    }
    
    /**
     * 维修使用耗材
     */
    public void repairUseSupplies() {
        try {
            int results = sysSuppliesService.repairUseById(sysSuppliesExpand);
            if (results > 0) {
            	printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "使用失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    
    /**
     * 删除图片
     */
    public void deleteSuppliesPic() {
        try {
            List<SysSuppliesExpand> supplies = sysSuppliesService.selectAll(sysSuppliesExpand);
            if (supplies.size() == 0) {
                printlnMsg("-1");
                return;
            }
            String oldPath = supplies.get(0).getSupImgPath();
            String delPath = sysSuppliesExpand.getSupImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            sysSuppliesExpand.setSupImgPath(newPath);
            sysSuppliesExpand.setSupImgNum(UploadUtil.getImageNum(newPath));
            int result = sysSuppliesService.updateById(sysSuppliesExpand);
            if (result > 0) {
                printlnMsg("1");
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }
    
    /**
     * 增减耗材数量
     */
    public void purchaseSupplies() {
        try {
            int results = sysSuppliesService.purchaseById(sysSuppliesExpand);
            if (results > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "操作成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "操作失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常", null));
        }
    }

}
