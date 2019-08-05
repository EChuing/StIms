package com.zz.actions.info;

import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONObject;

import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoLandlordExpand;
import com.zz.service.info.LandlordService;

/**
 * 业主信息
 * @author Administrator
 *
 */
public class LandlordAction extends BaseAction implements ModelDriven<InfoLandlordExpand>{
	private InfoLandlordExpand infoLandlordExpand;
	private LandlordService landlordService;
    
    public void setLandlordService(LandlordService landlordService) {
        this.landlordService = landlordService;
    }
    @Override
    public InfoLandlordExpand getModel() {
        if( infoLandlordExpand==null){
            infoLandlordExpand = new InfoLandlordExpand();
        }
        return infoLandlordExpand;
    }
	
	//查询房东信息以及房屋数量
	public void queryQuantityInformation(){
		try {
			InfoLandlordExpand ila = landlordService.queryQuantityInformation(infoLandlordExpand);
			if(ila != null){
				ila.setHousingNumber(ila.getTotalNum());
				JSONObject resultJson = JSONObject.fromObject(ila);
				String json = resultJson.toString();
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
			e.printStackTrace();
            Syslog.writeErr(e);
		}
	}
	
	//专用查询业主姓名与联系方式
	public String selectlandlordName(){
		try {
			List<InfoLandlordExpand> list = landlordService.landlordName(infoLandlordExpand);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
		return null;
	}
	
	//房东分组查询
	public void landlordGroupingQuery(){
	    try {
            InfoLandlordExpand la = new InfoLandlordExpand();
            List<InfoLandlordExpand> list = landlordService.landlordGroupQuery(infoLandlordExpand);
            if(list.size() != 0){
                //房东的房屋数
                for(int i=0;i<list.size();++i){
                    Integer laId = list.get(i).getLandlordId();
                    la.setLandlordId(laId);
                    InfoLandlordExpand lan = landlordService.housingQuantity(la);
                    Integer number = Integer.parseInt(lan.getHousingNumber());
                    list.get(i).setHousingNumber(""+number);
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
	}
	
	//明细-查找全部
	public String queryAllLandlord(){
	    try {
            List<InfoLandlordExpand> list = landlordService.selectAll(infoLandlordExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//根据-已租-房源-查找业主信息
	public String queryByHouse4rentOfLandlordId(){
	    try {
            List<InfoLandlordExpand> landlordList = landlordService.selectByHouse4rentOfLandlordId(infoLandlordExpand.getLandlordId());
            if(landlordList.size() != 0){
                String json = JSONUtil.serialize(landlordList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//根据-未租-房源-查询业主信息
	public String queryHouseStoreOfLandlord(){
	    try {
            List<InfoLandlordExpand> landlordList = landlordService.selectByHouse4rentOfLandlordId(infoLandlordExpand.getLandlordId());
            if(landlordList.size() != 0){
                String json = JSONUtil.serialize(landlordList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//根据-盘源-查询业主信息
	public String queryHouseOfLandlord(){
	    try {
            List<InfoLandlordExpand> landlordList = landlordService.selectByHouse4rentOfLandlordId(infoLandlordExpand.getLandlordId());
            if(landlordList.size()!=0){
                String json = JSONUtil.serialize(landlordList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//增加记录
	public String insertLandlord(){
	    try {
            int laId = landlordService.insertLandlord(infoLandlordExpand);
            if(laId == -1){
                printlnOfJson(CommonMethodClass.jsonData(-1, "增加失败", null));
            }else{
                List<InfoLandlordExpand> listIle = new ArrayList<>();
                InfoLandlordExpand ile = new InfoLandlordExpand();
                ile.setLandlordId(laId);
                listIle.add(ile);
                String json = JSONUtil.serialize(listIle);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	// 在添加托管的时候增加房东记录
	public String insertLandlordInAddStore(){
	    try {
            int laId = landlordService.insertLandlordInAddStore(infoLandlordExpand);
            if(laId == -1){
                printlnOfJson(CommonMethodClass.jsonData(-1, "增加失败", null));
            }else{
                List<InfoLandlordExpand> listIle = new ArrayList<>();
                InfoLandlordExpand ile = new InfoLandlordExpand();
                ile.setLandlordId(laId);
                listIle.add(ile);
                String json = JSONUtil.serialize(listIle);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
		
	/**
	 * 更新记录
	 * @return
	 */
	public String updateLandlord(){
	    try {
            String[] result = landlordService.updateLandlord(infoLandlordExpand).split("###");
            if(Integer.parseInt(result[0]) == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else if(Integer.parseInt(result[0]) == -21){
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已经存在", result[1]));
            }else if(Integer.parseInt(result[0]) == -22){
                printlnOfJson(CommonMethodClass.jsonData(-22, "身份证不能为空", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
            }   
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
}
