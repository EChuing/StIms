package com.zz.actions.info;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.other.Syslog;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.service.info.RenewalRenterService;
import org.apache.struts2.json.JSONUtil;

import java.util.List;
/**
 * 租客合同
 * @author Administrator
 *
 */
public class RenewalRenterAction extends BaseAction implements ModelDriven<InfoRenewalRenterExpand>{
	private InfoRenewalRenterExpand infoRenewalRenterExpand;
	private RenewalRenterService renewalRenterService;

    public void setRenewalRenterService(RenewalRenterService renewalRenterService) {
        this.renewalRenterService = renewalRenterService;
    }
    
    @Override
    public InfoRenewalRenterExpand getModel() {
        if( infoRenewalRenterExpand==null){
            infoRenewalRenterExpand = new InfoRenewalRenterExpand();
        }
        return infoRenewalRenterExpand;
    }
	
	//已租双击中查询租客合约
	public String renewalRenterInRentDb(){
	    try {
            if((infoRenewalRenterExpand.getJrrHouse4rentId()==null || "".equals(infoRenewalRenterExpand.getJrrHouse4rentId()))
                && 
                (infoRenewalRenterExpand.getJrrHouse4storeId()==null || "".equals(infoRenewalRenterExpand.getJrrHouse4storeId()))
                && 
                (infoRenewalRenterExpand.getJrrId()==null || "".equals(infoRenewalRenterExpand.getJrrId()))
            ){
                printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            }else{
                List<InfoRenewalRenterExpand> renewal = renewalRenterService.selectAll(infoRenewalRenterExpand);
                System.out.println("**********"+renewal);
                if(renewal.size() > 0){
                    String json = JSONUtil.serialize(renewal);
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	//查询所有-数据和统计分开(合约管理查看)
	public String selectRenewalRenter(){
	    try {
            List<InfoRenewalRenterExpand> renewal = renewalRenterService.selectAllRenewalRenter(infoRenewalRenterExpand);
            if(renewal.size()>=0){
                String json = JSONUtil.serialize(renewal);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	/**
	 * 租客新签合约统计
	 * @return
	 */
	public String selectNewest(){
		try {
			InfoRenewalRenterExpand irre = new InfoRenewalRenterExpand();
			irre.setJrrHouse4rentId(infoRenewalRenterExpand.getJrrHouse4rentId());
			irre.setJrrRenterId(infoRenewalRenterExpand.getJrrRenterId());
			irre.setJrrHouse4storeId(infoRenewalRenterExpand.getJrrHouse4storeId());
			if(infoRenewalRenterExpand.getJrrHouse4rentId()==null
			||infoRenewalRenterExpand.getJrrHouse4rentId().equals("")
			||infoRenewalRenterExpand.getJrrRenterId()==null
			||infoRenewalRenterExpand.getJrrRenterId().equals("")
			||infoRenewalRenterExpand.getJrrHouse4storeId()==null
			||infoRenewalRenterExpand.getJrrHouse4storeId().equals("")){
				printlnOfJson(CommonMethodClass.jsonData(-1, "房屋地址与租客不能为空", null));
				return null;
			}else{
				List<InfoRenewalRenterExpand> renewal = renewalRenterService.selectAll(irre);
				if(renewal.size() >= 0){
					String json = JSONUtil.serialize(renewal);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "统计失败", null));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	return null;
	}
	
	/**
	 * 租客新签合约统计
	 * @return
	 */
	public String queryRenterContractNum(){
		try {
			int renewal = renewalRenterService.querySignedNum(infoRenewalRenterExpand);
			if(renewal >= 0){
				String json = JSONUtil.serialize(renewal);
				
				printlnOfJson(json);
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {}

	return null;
	}
	
	//已租续签合约查询
	public void rentedRenewalInquiry(){
		try {
			List<InfoRenewalRenterExpand> renewal = renewalRenterService.selectAll(infoRenewalRenterExpand);
			if(renewal.size() > 0){
				String json = JSONUtil.serialize(renewal);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
		    e.printStackTrace();Syslog.writeErr(e);
		    printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	
	/**
	 * 查询所有 或 条件查询（ 已租房查看合约 ）
	 * @return
	 */
	public String queryAllRenewalRenter(){
	    try {
            List<InfoRenewalRenterExpand> renewal = renewalRenterService.selectAll(infoRenewalRenterExpand);
            if(renewal.size() > 0){
                String json = JSONUtil.serialize(renewal);
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
	 * 租客即将到期合同
	 * @return
	 */
	public void queryExpiredRenterCont(){
	    //退房办理 - 租客退房 A03b01
        int auth1 = Authority.authorize("A03b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看租客退房权限", null));
            return;
        }
	    try {
            List<InfoRenewalRenterExpand> renewal = renewalRenterService.adSelect(infoRenewalRenterExpand);
            if(renewal.size() > 0){
                String json = JSONUtil.serialize(renewal);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	}
	
	//预生成账单
	public void preGeneratingBill(){
		try {
			List<InfoContractInstallment> list = CommonMethodClass.rentContractInstallment(infoRenewalRenterExpand);
			if(list.size() > 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
			    printlnOfJson(CommonMethodClass.jsonData(-1, "账单生成失败", null));
			}
		} catch (Exception e) {
			printlnOfJson(CommonMethodClass.jsonData(-2, "账单生成失败", null));
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
		
	/**
	 * 增加记录
	 * @return
	 */
	public String insertRenewalRenter(){
		try {
			String jrrId = renewalRenterService.insertRenewalRenter(infoRenewalRenterExpand);
			if(jrrId != null && !jrrId.equals("")){
				InfoRenewalRenterExpand irle = new InfoRenewalRenterExpand();
				irle.setJrrId(Integer.parseInt(jrrId));
				String json = JSONUtil.serialize(irle);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	/**
	 * 续签租客合同
	 * @return
	 */
	public String renewRenterContract(){
	    try {
            int result = renewalRenterService.renewRenterContract(infoRenewalRenterExpand);
            if(result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "续签失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	/**
	 * 更新记录
	 * @return
	 */
	public void updateRenewalRenter(){
	    try {
            int result = renewalRenterService.updateRenewalRenter(infoRenewalRenterExpand);
            if(result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 更新失败", null));
        }
	}
	
    /**
     * 删除图片
     */
    public void deleteRentContPic() {
        try {
            List<InfoRenewalRenterExpand> rentCont = renewalRenterService.selectAll(infoRenewalRenterExpand);
            if (rentCont.size() == 0) {
                printlnMsg("-1");
                return;
            }
            String oldPath = rentCont.get(0).getJrrImgPath();
            String delPath = infoRenewalRenterExpand.getJrrImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            infoRenewalRenterExpand.setJrrImgPath(newPath);
            infoRenewalRenterExpand.setJrrImgNum(UploadUtil.getImageNum(newPath));
            int result = renewalRenterService.updateByPrimaryKeySelective(infoRenewalRenterExpand);
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
    public void abrogateRenterContract() {
        try {
            int result = renewalRenterService.abrogateRenterContract(infoRenewalRenterExpand);
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
