package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.service.info.RenewalLandlordService;
/**
 * 
 * @author Administrator
 * 续约记录C层
 *
 */
public class RenewalLandlordAction extends BaseAction implements ModelDriven<InfoRenewalLandlordExpand>{
	private InfoRenewalLandlordExpand infoRenewalLandlordExpand;
	private RenewalLandlordService renewalLandlordService;
    
    public void setRenewalLandlordService(RenewalLandlordService renewalLandlordService) {
        this.renewalLandlordService = renewalLandlordService;
    }
    
    @Override
    public InfoRenewalLandlordExpand getModel() {
        if( infoRenewalLandlordExpand==null){
            infoRenewalLandlordExpand = new InfoRenewalLandlordExpand();
        }
        return infoRenewalLandlordExpand;
    }
	
	//预生成账单
	public void noRentedBillInformation(){
		try {
			List<InfoContractInstallment> jciList = CommonMethodClass.landContractInstallment(infoRenewalLandlordExpand);
			if(jciList.size() != 0){
				String json = JSONUtil.serialize(jciList);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "预生成账单失败!", null));
			}
		} catch (Exception e) {
            e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "预生成账单失败!", null));
		}
	}
	
	//已租双击中查询房东合约
	public String renewalLandlordInRentDb(){
	    try {
            if((infoRenewalLandlordExpand.getJrlHouse4storeId()==null || "".equals(infoRenewalLandlordExpand.getJrlHouse4storeId()))
            && (infoRenewalLandlordExpand.getJrlId()==null || "".equals(infoRenewalLandlordExpand.getJrlId()))){
                printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            }else{
                List<InfoRenewalLandlordExpand> renewal = renewalLandlordService.selectAll(infoRenewalLandlordExpand);
                if(renewal.size()!=0){
                    String json = JSONUtil.serialize(renewal);
                    
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	//查询所有-数据和统计分开(合约管理查看)
	public String selectRenewalLandlord(){
	    try {
            List<InfoRenewalLandlordExpand> renewal = renewalLandlordService.selectAllRenewalLandlord(infoRenewalLandlordExpand);
            if(renewal.size()!=0){
                String json = JSONUtil.serialize(renewal);
                
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
	 * 房东新签合约统计
	 * @return
	 */
	public String queryLandlordContractNum(){
		try {
			int renewal = renewalLandlordService.querySignedNum(infoRenewalLandlordExpand);
			if(renewal >= 0){
				String json = JSONUtil.serialize(renewal);
				
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "统计失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	/**
	 * 查询所有，或条件查询(未租房查看)
	 * @return
	 */
	public String queryAllRenewalLandlord(){
	    try {
            List<InfoRenewalLandlordExpand> renewal = renewalLandlordService.selectAll(infoRenewalLandlordExpand);
            if(renewal.size()!=0){
                String json = JSONUtil.serialize(renewal);
                
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
	 * 业主即将到期合同
	 * @return
	 */
	public String queryExpiredLandlordCont(){
	    //退房办理 - 业主退房 A03b02
        int auth1 = Authority.authorize("A03b02");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看业主退房权限", null));
            return null;
        }
	    try {
            List<InfoRenewalLandlordExpand> list = renewalLandlordService.adSelect(infoRenewalLandlordExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	/**
	 * 业主续签
	 * 新增业主合同并生成分期账单，返回值为新增的业主合同id
	 * @return
	 */
	public String insertRenewalLandlord(){
		System.out.println("infoRenewalLandlordExpand："+infoRenewalLandlordExpand);
		try {
			String jrlId = renewalLandlordService.insertRenewalLandlord(infoRenewalLandlordExpand);
			if(jrlId != null && !jrlId.equals("")){
				InfoRenewalLandlordExpand irle = new InfoRenewalLandlordExpand();
				irle.setJrlId(Integer.parseInt(jrlId));
				String json = JSONUtil.serialize(irle);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "业主续签失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	/**
	 * 更新房东合约并更新分期账单
	 */
	public void updateRenewalLandlord(){
	    try {//result = "1";
            String result = renewalLandlordService.updateRenewalLandlord(infoRenewalLandlordExpand);
            if ("1".equals(result)) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 更新分期账单失败", null));
        }
	}

	/**
	 * 删除图片
	 */
	public void deleteLandContPic() {
		try {
			List<InfoRenewalLandlordExpand> landCont = renewalLandlordService.selectAll(infoRenewalLandlordExpand);
			if (landCont.size() == 0) {
				printlnMsg("-1");
				return;
			}
			String oldPath = landCont.get(0).getJrlImgPath();
            String delPath = infoRenewalLandlordExpand.getJrlImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
			infoRenewalLandlordExpand.setJrlImgPath(newPath);
			infoRenewalLandlordExpand.setJrlImgNum(UploadUtil.getImageNum(newPath));
			int result = renewalLandlordService.updateByPrimaryKeySelective(infoRenewalLandlordExpand);
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
	 * 废除合约
	 */
	public void abrogateLandlordContract() {
	    try {
            int result = renewalLandlordService.abrogateLandlordContract(infoRenewalLandlordExpand);
            if (result > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "废除失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
}

