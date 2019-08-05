package com.zz.actions.info;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.other.Syslog;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.service.info.ContractInstallmentService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;

import java.util.ArrayList;
import java.util.List;

public class ContractInstallmentAction extends BaseAction implements ModelDriven<InfoContractInstallmentExpand>{
	private InfoContractInstallmentExpand InfoContractInstallmentExpand;
	private ContractInstallmentService contractInstallmentService;
	
	//临时账单增加
	public void insertSelective(){
		try{
			int result =contractInstallmentService.insertSelective(InfoContractInstallmentExpand);
			if(result >0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				 printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
			}
		}catch(Exception e){
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查询当期的租金、物管费、服务费
	public void queryTheCurrentDataInformation(){
		List<InfoContractInstallmentExpand> cie;
		try {
			cie = contractInstallmentService.queryTheCurrentDataInformation(InfoContractInstallmentExpand);
			if(cie.size() != 0){
				String json = JSONUtil.serialize(cie);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
			e.printStackTrace();
			Syslog.writeErr(e);
		}
	}
	
	//查询新签租客合约信息
	public void queryNewTenantContractInformation(){
		List<InfoContractInstallmentExpand> cie = contractInstallmentService.queryNewTenantContractInformation(InfoContractInstallmentExpand);
		if(cie.size() != 0){
			String json = null;
			try {
				json = JSONUtil.serialize(cie);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} catch (JSONException e) {
				printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
				e.printStackTrace();Syslog.writeErr(e);
			}
		}else{
			printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
		}
	}
	
	//综合修改 修改账单
	public void updatePaymentInUpdateAll(){
	    try {
            int result = contractInstallmentService.updatePaymentInUpdateAll(InfoContractInstallmentExpand);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	//综合修改双击查看账单
	public void queryPaymentInUpdateAll(){
	    try {
            List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectAll(InfoContractInstallmentExpand);
            if(ContractInstallmentList.size() != 0){
                String json = JSONUtil.serialize(ContractInstallmentList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	//房东应付款账单修改
	public void updateIfPrint(){
		try {
			String jsonArray =InfoContractInstallmentExpand.getJciAudit();
			List<InfoContractInstallmentExpand> list = new ArrayList<InfoContractInstallmentExpand>();
			JSONArray ja = JSONArray.fromObject(jsonArray);
			for(Object obj : ja){
				JSONObject jsonObj = (JSONObject) obj;
				InfoContractInstallmentExpand sat = (InfoContractInstallmentExpand) JSONObject.toBean(jsonObj, InfoContractInstallmentExpand.class);
				list.add(sat);
			} 
			System.out.println(list.toString());
			int result =contractInstallmentService.updateIfPrintYes(list);
			if(result >0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				 printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
			}
		} catch (Exception e) {
		    e.printStackTrace();Syslog.writeErr(e);
		    printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	//已租双击查看应收
	public void payableFromRenterInRentDb(){
	    try {
            List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectAll(InfoContractInstallmentExpand);
            if(ContractInstallmentList.size() != 0){
                String json = JSONUtil.serialize(ContractInstallmentList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	//已租双击查看应支
	public void payableToLandlordInRentDb() {
	    List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectPayableToLandlord(InfoContractInstallmentExpand);
        try {
            if(ContractInstallmentList.size() != 0){
                String json = JSONUtil.serialize(ContractInstallmentList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (JSONException e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	//查询所有-数据和统计分开
	public String selectContractInstallment(){
		//printlnMsg("-1");无权限返回-1
		try {
            List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectAllContract(InfoContractInstallmentExpand);
            String json = JSONUtil.serialize(ContractInstallmentList);
            printlnOfJson(json);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
		return null;
	}
	//租客应收款发送短信时更新租客分期账单的短信通知时间和短信内容
	public void sendMessageAndUpdate(){
		try {
			InfoContractInstallmentExpand ic = new InfoContractInstallmentExpand();
			ic.setJciId(InfoContractInstallmentExpand.getJciId());
			ic.setJciMessageNote(InfoContractInstallmentExpand.getJciMessageNote());
			ic.setJciOverdueDays(InfoContractInstallmentExpand.getJciOverdueDays());
			String jciMessageTime = InfoContractInstallmentExpand.getJciMessageTime();
			if("".equals(jciMessageTime) || jciMessageTime == null){
				ic.setJciMessageTime(CommonMethodClass.getCurrentDate());
			}else{
				ic.setJciMessageTime(null);
			}
			int result = contractInstallmentService.updateByPrimaryKeySelective(ic); 
			if(result==0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
		    e.printStackTrace();Syslog.writeErr(e);
		    printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查询房东银行账号与类型
	public void landlordCard(){
		try {
			List<InfoContractInstallmentExpand> list = contractInstallmentService.landlordCard(InfoContractInstallmentExpand);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
			}
		} catch (Exception e) {
		    e.printStackTrace();Syslog.writeErr(e);
		    printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查找ALL
	public void queryAllContractInstallment(){
	    try {
            List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectAll(InfoContractInstallmentExpand);
            if(ContractInstallmentList.size() != 0){
                String json = JSONUtil.serialize(ContractInstallmentList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	
	//更新记录
	public void updateContractInstallment(){
	    try {
		    System.out.println(InfoContractInstallmentExpand.getJciBillJson());
            int result = contractInstallmentService.updateByPrimaryKeySelective(InfoContractInstallmentExpand);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	
	//根据ID删除
	public String deleteContractInstallment(){
		try {
			int result = contractInstallmentService.deleteByPrimaryKey(InfoContractInstallmentExpand);
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
	
	//修改合约时查询最后一条已付、已支账单的结束周期
	public void selectEndPeriods(){
		try {
			String endPeriods = contractInstallmentService.selectEndPeriods(InfoContractInstallmentExpand);
			if(endPeriods != null){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	/**
	 * 查询业主账单
	 */
	public void selectPayableToLandlord() {
	    //业主账单 - 查询     B02b01
        int auth1 = Authority.authorize("B02b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看业主账单权限", null));
            return;
        }
	    List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectPayableToLandlord(InfoContractInstallmentExpand);
        try {
        	if(ContractInstallmentList.size() != 0){
	            String json = JSONUtil.serialize(ContractInstallmentList);
	            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
        	}else{
        		printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
        	}
        } catch (JSONException e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
    
    /**
     * 查询业主账单
     */
    public void queryLandlordBillCommon() {
        List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectPayableToLandlord(InfoContractInstallmentExpand);
        try {
            if(ContractInstallmentList.size() != 0){
                String json = JSONUtil.serialize(ContractInstallmentList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (JSONException e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
	
	/**
     * 删除图片
     */
    public void deleteInstallmentPic() {
        try {
            List<InfoContractInstallmentExpand> installment = contractInstallmentService.selectByPrimaryKey(InfoContractInstallmentExpand.getJciId());
            if (installment.size() == 0) {
                printlnMsg("-1");
                return;
            }
            String oldPath = installment.get(0).getJciImgPath();
            String delPath = InfoContractInstallmentExpand.getJciImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            InfoContractInstallmentExpand.setJciImgPath(newPath);
            InfoContractInstallmentExpand.setJciImgNum(UploadUtil.getImageNum(newPath));
            int result = contractInstallmentService.updateByPrimaryKeySelective(InfoContractInstallmentExpand);
            if (result > 0) {
                printlnMsg("1");
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }
    
    //根据ID查找
    public String queryInstallmentById(){
        try {
            List<InfoContractInstallmentExpand> installment = contractInstallmentService.selectByPrimaryKey(InfoContractInstallmentExpand.getJciId());
            if(installment.size() != 0){
                String  json = JSONUtil.serialize(installment);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
    
  //生成租客收支时检查有无已存在的短信内容，没有则添加
  	public void querySendMessageAndUpdate(){
  		try {
  			List<InfoContractInstallmentExpand> ContractInstallmentList = contractInstallmentService.selectByPrimaryKey(InfoContractInstallmentExpand.getJciId());
            if(ContractInstallmentList.size() != 0){
                if(ContractInstallmentList.get(0).getJciMessageNote() == null || ContractInstallmentList.get(0).getJciMessageNote().equals("")){
          			int result = contractInstallmentService.updateByPrimaryKeySelective(InfoContractInstallmentExpand); 
          			if(result==0){
          				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
          			}else{
          				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
          			}
                }else{
      				printlnOfJson(CommonMethodClass.jsonData(1, "已存在短信内容", null));
      			}
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录", null));
            }
  		} catch (Exception e) {
  		    e.printStackTrace();Syslog.writeErr(e);
  		    printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
  		}
  	}

	public void setContractInstallmentService(
	        ContractInstallmentService contractInstallmentService) {
		this.contractInstallmentService = contractInstallmentService;
	}
	
	@Override
	public InfoContractInstallmentExpand getModel() {
		if( InfoContractInstallmentExpand==null){
			InfoContractInstallmentExpand = new InfoContractInstallmentExpand();
		}
		return InfoContractInstallmentExpand;
	}
}
