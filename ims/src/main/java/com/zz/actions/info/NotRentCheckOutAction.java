package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.po.info.InfoNotRentCheckOut;
import com.zz.service.info.NotRentCheckOutService;

public class NotRentCheckOutAction extends BaseAction implements ModelDriven<InfoNotRentCheckOut>{
	private NotRentCheckOutService notRentCheckOutService;
	private InfoNotRentCheckOut infoNotRentCheckOut;
	public void setInfoNotRentCheckOut(
			InfoNotRentCheckOut infoNotRentCheckOut) {
		this.infoNotRentCheckOut = infoNotRentCheckOut;
	}
	public void setNotRentCheckOutService(
			NotRentCheckOutService notRentCheckOutService) {
		this.notRentCheckOutService = notRentCheckOutService;
	}
	@Override
	public InfoNotRentCheckOut getModel() {
		if(infoNotRentCheckOut == null){
			infoNotRentCheckOut = new InfoNotRentCheckOut();
		}
		return infoNotRentCheckOut;
	}
	
	//查退房总数量
    public String queryHouseStoreCheckoutNum(){
        try {
            List<InfoNotRentCheckOut> list = notRentCheckOutService.queryHouseStoreNum();
            if(!list.isEmpty()){
                String  json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "查退房总数量失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
	
	//查询
	public String selectNotRentCheckOut(){
		try {
			List<InfoNotRentCheckOut> list = notRentCheckOutService.selectByPrimaryKey(infoNotRentCheckOut);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
		return null;
	}
	
	//新增
	public String insertNotRentCheckOut(){
		try {
			int result = notRentCheckOutService.insertSelective(infoNotRentCheckOut);
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
	
	//暂存、提交
	public String updateNotRentCheckOut(){
	    try {
            int result = notRentCheckOutService.saveNotRentCheckOut(infoNotRentCheckOut);
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
		return null;
	}
	
	//审核
	public String auditNotRentCheckOut(){
	    try {
            int result = notRentCheckOutService.noRentModification(infoNotRentCheckOut);
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "审核失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	//复核、出账
	public String reviewNotRentCheckOut(){
	    try {
            int result = notRentCheckOutService.noRentModification(infoNotRentCheckOut);
            if(result != 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "复核失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//撤销业主退房
	public String deleteNotRentCheckOut(){
		try {
			if(infoNotRentCheckOut.getHouseCoding()!=null && infoNotRentCheckOut.getHsId()!=null && !infoNotRentCheckOut.getHouseCoding().equals("") && !infoNotRentCheckOut.getHsId().equals("")){
				int result = notRentCheckOutService.deleteByPrimaryKey(infoNotRentCheckOut.getNrcId());
				System.out.println("cesgiL："+result);
				if(result==0){
					printlnOfJson(CommonMethodClass.jsonData(-1, "删除失败", null));
				}else{
					int result1 = notRentCheckOutService.updateHouseState(infoNotRentCheckOut);
					int result2 = notRentCheckOutService.updateHsState(infoNotRentCheckOut);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
				}
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	/**
     * 删除图片
     */
    public void deleteLandlordCheckoutPic(){
        try {
            List<InfoNotRentCheckOut> checkout = notRentCheckOutService.selectByPrimaryKey(infoNotRentCheckOut);
            if (checkout.size() == 0) {
                printlnMsg("-1");
                return;
            }
            String oldPath = checkout.get(0).getNrcImgPath();
            String delPath = infoNotRentCheckOut.getNrcImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            infoNotRentCheckOut.setNrcImgPath(newPath);
            infoNotRentCheckOut.setNrcImgNum(UploadUtil.getImageNum(newPath));
            int result = notRentCheckOutService.updateByPrimaryKeySelective(infoNotRentCheckOut);
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
     * 计算退房租金
     */
    public void selectLandlordCheckoutRent(){
        try {
            InfoNotRentCheckOut checkout = notRentCheckOutService.selectLandlordCheckoutRent(infoNotRentCheckOut);
            if(checkout != null){
                String  json = JSONUtil.serialize(checkout);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "租客退房查询失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }
}
