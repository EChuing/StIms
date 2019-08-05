package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.info.InfoPopulation;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.po.info.InfoTransactionExpand;
import com.zz.po.integrated.InfoNotRenting;
import com.zz.service.info.InfoTransactionAssistanceService;
import com.zz.service.info.NotRentingService;
import com.zz.service.info.PopulationService;
import com.zz.service.info.RenewalLandlordService;
import com.zz.service.info.RenewalRenterService;

public class NotRentingAction extends BaseAction implements ModelDriven<InfoNotRenting>{
	private NotRentingService notRentingService;
	private InfoNotRenting infoNotRenting;
	private RenewalRenterService renewalRenterService;
	private RenewalLandlordService renewalLandlordService;
	private InfoTransactionAssistanceService itaa;
	private PopulationService populationService;
	public void setPopulationService(PopulationService populationService) {
		this.populationService = populationService;
	}
	public void setItaa(InfoTransactionAssistanceService itaa) {
		this.itaa = itaa;
	}
	public void setRenewalRenterService(RenewalRenterService renewalRenterService) {
		this.renewalRenterService = renewalRenterService;
	}
	public void setRenewalLandlordService(
			RenewalLandlordService renewalLandlordService) {
		this.renewalLandlordService = renewalLandlordService;
	}
	public void setNotRentingService(NotRentingService notRentingService) {
		this.notRentingService = notRentingService;
	}
	public void setInfoNotRenting(InfoNotRenting infoNotRenting) {
		this.infoNotRenting = infoNotRenting;
	}
	@Override
	public InfoNotRenting getModel() {
		if(infoNotRenting == null){
			infoNotRenting = new InfoNotRenting();
		}
		return infoNotRenting;
	}
	//综合修改查询
	public String selectNotRenting(){ 
	    //综合修改 - 查询        B06b01
        int auth1 = Authority.authorize("B06b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看综合修改权限", null));
            return null;
        }
	    try {
            List<InfoNotRenting> list = notRentingService.integratedQuery(infoNotRenting);
           System.out.println("1111"+list);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常", null));
        }
		return null;
	}
	
	//综合修改
	public String updateNotRenting(){
		int result1 = 0, result2 = 0, result3 = 0, result4 = 0, result5 = 0, result6 = 0, result7 = 0;
		System.out.println("sdf11111s:"+infoNotRenting.getHrId()+"\n"+infoNotRenting.getHsId()+"\n"+infoNotRenting.getLaId()+"\n"+infoNotRenting.getLaId()
				+"\n"+infoNotRenting.getRenterId()+"\n"+infoNotRenting.getPopId()+"\n"+infoNotRenting.getJrlId()+"\n"+infoNotRenting.getJrrId());
		//修改已租
		try{
		if(infoNotRenting.getHrId() != null && !infoNotRenting.getHrId().equals("")){
			result1 = notRentingService.updateRentHoues(infoNotRenting);
			System.out.println(result1+"******************************");
			if(result1 != 0){
				System.out.println("修改已租成功："+result1);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				System.out.println("修改已租失败："+-1);
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改已租失败", null));
			}
		}
		//修改未租
		if(infoNotRenting.getHsId() != null && !infoNotRenting.getHsId().equals("")){
			result2 = notRentingService.infoNotRenting2(infoNotRenting);
			if(result2 != 0){
				System.out.println("修改未租成功："+result2);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				System.out.println("修改未租失败："+-2);
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改未租失败", null));
			}
		}
		//修改房东
		if(infoNotRenting.getLaId() != null && !infoNotRenting.getLaId().equals("")){
			result3 = notRentingService.updateLand(infoNotRenting);
			if(result3 != 0){
				System.out.println("修改房东成功："+result3);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				System.out.println("修改房东失败："+-3);
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改房东失败", null));
			}
		}
		//修改租客
		if(infoNotRenting.getRenterId() != null && !infoNotRenting.getRenterId().equals("")){
			result4 = notRentingService.updataRenter(infoNotRenting);
			if(result4 != 0){
				System.out.println("修改租客成功："+result4);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				System.out.println("修改修改租客失败："+-4);
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改租客失败", null));
			}
		}
		
		//业主租客
		if(infoNotRenting.getPopId() != null && !infoNotRenting.getPopId().equals("")){
			InfoPopulation ip = new InfoPopulation();
			ip.setPopIdcard(infoNotRenting.getPopIdcard());
			List<InfoPopulation> list = populationService.selectByPrimaryKey(ip);
			System.out.println("是不是这里1"+list.size());
			if(list.size() == 0){
				result5 = notRentingService.updatePop(infoNotRenting);
				if(result5 != 0){
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "修改客户信息失败", null));
				}
			}else{
				Integer popid = list.get(0).getPopId();
				System.out.println(popid+"是不是这里1"+infoNotRenting.getPopId());
				if(popid.equals(infoNotRenting.getPopId())){
					result5 = notRentingService.updatePop(infoNotRenting);
					if(result5 != 0){
						printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
					}else{
						printlnOfJson(CommonMethodClass.jsonData(-1, "修改客户信息失败", null));
					}
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "修改客户信息失败", null));
				}
			}
		}
		//房东合约
		if(infoNotRenting.getJrlId() != null && !infoNotRenting.getJrlId().equals("")){			
				InfoRenewalLandlordExpand infoRenewalLandlordExpand = new InfoRenewalLandlordExpand();
				JSONArray ja =JSONArray.fromObject(infoNotRenting);
				for(Object a : ja){
					JSONObject jsonObj = (JSONObject)a;
					infoRenewalLandlordExpand = (InfoRenewalLandlordExpand) JSONObject.toBean(jsonObj, InfoRenewalLandlordExpand.class);
				}
				String str = renewalLandlordService.updateRenewalLandlord(infoRenewalLandlordExpand);
				if(str.equals("1")){
					System.out.println("修改房东合约成功："+str);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "修改房东合约失败", null));
				}
			   }
		
		//租客合约
		if(infoNotRenting.getJrrId() != null && !infoNotRenting.getJrrId().equals("")){
				InfoRenewalRenterExpand infoRenewalRenterExpand = new InfoRenewalRenterExpand();
				JSONArray ja =JSONArray.fromObject(infoNotRenting);
				for(Object a : ja){
					JSONObject jsonObj = (JSONObject)a;
					infoRenewalRenterExpand = (InfoRenewalRenterExpand) JSONObject.toBean(jsonObj, InfoRenewalRenterExpand.class);
				}
				int str = renewalRenterService.updateRenewalRenter(infoRenewalRenterExpand);
				if(str == 1){
					System.out.println("修改租客合约成功："+str);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "修改租客合约失败", null));
				}
			  }
		
		//交易业绩受益人
		if(infoNotRenting.getJsonArray() != null && !infoNotRenting.getTotalPage().equals("")){
			InfoTransactionExpand infoTransactionAssistance = new InfoTransactionExpand();
			JSONArray ja =JSONArray.fromObject(infoNotRenting);
			for(Object a : ja){
				JSONObject jsonObj = (JSONObject)a;
				infoTransactionAssistance = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
			}
			String str = itaa.updateAssistance(infoTransactionAssistance);
			if(str.equals("1")){
				System.out.println("修改交易业绩受益人成功："+str);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改交易协助人失败", null));
			}
		}else{
			System.out.println("修改交易业绩受益人失败："+-8);
			printlnOfJson(CommonMethodClass.jsonData(-1, "修改交易协助人失败", null));
		}
		}catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
		return null;
	}
	
	//水电气读数修改
	public void upWaterElectricalModification(){
		try {
			int result = notRentingService.upWaterElectricalModification(infoNotRenting);
			if(result == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "水电气读数修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
