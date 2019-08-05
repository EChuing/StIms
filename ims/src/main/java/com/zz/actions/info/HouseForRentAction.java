package com.zz.actions.info;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.info.InfoHouse4rent;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.HouseForRentService;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * 已租房间
 * @author Administrator
 *
 */
public class HouseForRentAction extends BaseAction implements ModelDriven<InfoHouse4rentExpand>{
	private InfoHouse4rentExpand infoHouse4rentExpand;
	private HouseForRentService houseForRentService;
	
	
	public void setInfoHouse4rentExpand(InfoHouse4rentExpand infoHouse4rentExpand) {
		this.infoHouse4rentExpand = infoHouse4rentExpand;
	}
	
    public void setHouseForRentService(HouseForRentService houseForRentService) {
        this.houseForRentService = houseForRentService;
    }

    @Override
    public InfoHouse4rentExpand getModel() {
        if( infoHouse4rentExpand==null){
            infoHouse4rentExpand = new InfoHouse4rentExpand();
        }
        return infoHouse4rentExpand;
    }
    
    /**
     * 查询已租房间
     * @return
     */
    public String queryHouseRent(){
        //已租房间 - 查个人房 A02b01
        int auth1 = Authority.authorize("A02b01");
        //已租房间 - 查部门房 A02b02
        int auth2 = Authority.authorize("A02b02");
        //已租房间 - 查分店房 A02b03
        int auth3 = Authority.authorize("A02b03");
        //已租房间 - 查公司   A02b04
        int auth4 = Authority.authorize("A02b04");
        //已租房间 - 隐私查看 A02b05
        int auth5 = Authority.authorize("A02b05");
        //用户信息
        SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0 && auth3 == 0 && auth4 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看已租房间权限", null));
            return null;
        } else {
            if (auth4 == 1) {
                
            } else if (auth3 == 1) {
                infoHouse4rentExpand.setHrStorefront(storefront);
            } else if (auth2 == 1) {
                infoHouse4rentExpand.setHrDepartment(department);
            } else if (auth1 == 1) {
                infoHouse4rentExpand.setHrUserId(userid);
                infoHouse4rentExpand.setPersonal(1);
            }
        }
        try {
            List<InfoHouse4rentExpand> list = houseForRentService.queryHouseRent(infoHouse4rentExpand);
            if(list.size() != 0){
                if(auth5 == 0){
                    for(int i=0;i<list.size();++i){
                        list.get(i).setHrHousePrice(123456789.00);
                        list.get(i).setHrPaymentType("不可看");
                        list.get(i).setHrRegisterTime("不可看");
                        list.get(i).setHrHouseDeposit(123456789.00);
                        list.get(i).setHrTheTerm("不可看");
                        list.get(i).setHrBeginTime("不可看");
                    }
                }
                //查询有无绑定微信公众号
                for(int i=0;i<list.size();++i){
                    String wxOpenid=list.get(i).getWxOpenid();
                    if(("").equals(wxOpenid) || ("0").equals(wxOpenid)){
                        try {
                            InfoHouse4rentExpand infoHouse4rentExpand2 = new InfoHouse4rentExpand();
                            infoHouse4rentExpand2.setHrId(list.get(i).getHrId());
                            int num = houseForRentService.selectopenid(infoHouse4rentExpand2);
                            if(num > 0){
                                wxOpenid = "******";//随便填，只要不为0就行
                                list.get(i).setWxOpenid(wxOpenid);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();Syslog.writeErr(e);
                            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
                        }
                    }
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询出数据", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }


    /**
     * 条件查询已租房id
     * selectRentByTJ
     */
    public String selectRentByTJ(){
        try {
            InfoHouse4rentExpand infoRent = houseForRentService.selectRentByTJ(infoHouse4rentExpand);
            if(infoRent!=null){
                System.out.println(infoRent);
                String json = JSONUtil.serialize(infoRent.getHrId());
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }

    /**
     * 无权限通用查询已租房间
     * @return
     */
    public String queryHouseRentCommon(){
        try {
            List<InfoHouse4rentExpand> list = houseForRentService.queryHouseRentCommon(infoHouse4rentExpand);
            if(list.size() != 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }
    
    /**
     * 租客退房
     * @return
     */
    public String queryRenterCheckOut(){
        //退房办理 - 租客退房 A03b01
        int auth1 = Authority.authorize("A03b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看租客退房权限", null));
            return null;
        }
        try {
            List<InfoHouse4rentExpand> list = houseForRentService.queryRenterCheckOut(infoHouse4rentExpand);
            if(list.size() == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }else{
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
	
	//当已租房退房时修改读数
	public String updateWegWhenCheckout(){
		try {
			InfoHouse4rentExpand ir = new InfoHouse4rentExpand();
			ir.setHrId(infoHouse4rentExpand.getHrId());
			ir.setHrMeterReadingRecord(infoHouse4rentExpand.getHrMeterReadingRecord());
			int result = houseForRentService.updateByPrimaryKeySelective(ir);
			if(result==1){
				printlnOfJson(CommonMethodClass.jsonData(1, "更新退房抄表读数成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "更新退房抄表读数失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//设置房管员
	public String updateHouseManager(){
	    try {
            InfoHouse4rentExpand ir  = new InfoHouse4rentExpand();
            ir.setHrId(infoHouse4rentExpand.getHrId());
            ir.setHrHouse4storeId(infoHouse4rentExpand.getHrHouse4storeId());
            ir.setHrManagerUserId(infoHouse4rentExpand.getHrManagerUserId());
            ir.setHrStorefront(infoHouse4rentExpand.getHrStorefront());
            ir.setHrDepartment(infoHouse4rentExpand.getHrDepartment());
            int result1 = houseForRentService.updateHouse4renrManager(ir);
            int result2 = houseForRentService.updateHouse4storeManager(ir);
            if(result1 == 0 || result2 == 0 ){
                printlnOfJson(CommonMethodClass.jsonData(-1, "设置房管员失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//统计已租房源
	public void queryHouseRentNum(){
		try {
			int rent = houseForRentService.queryHouseRentNum(infoHouse4rentExpand);
			if(rent >= 0){
				String json = JSONUtil.serialize(rent);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "统计已租房源失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}

	//租客月度巡查查询-总金额查询
	public String getMonthTotalMoney(){
	    try {
            List<InfoHouse4rentExpand> hrList = houseForRentService.getMonthTotalMoney(infoHouse4rentExpand);
            if(hrList.size() == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "租客月度巡查查询失败", null));
            }else{
                Double allTotalMoney = 0.0;
                for(int a = 0;a<hrList.size();a++){//jciMessageNote
                    if(hrList.get(a).getJciMessageNote()!=null 
                            && !"".equals(hrList.get(a).getJciMessageNote())){
                        String messageJsonStr = hrList.get(a).getJciMessageNote().substring(0, hrList.get(a).getJciMessageNote().length());
                        JSONObject jsonData =JSONObject.fromObject(messageJsonStr);
                        String totalMoneyStr = jsonData.getJSONObject("msg").getString("total");
                        Double totalMoney = totalMoneyStr == null ? 0.0 :Double.parseDouble(totalMoneyStr);
                        allTotalMoney = allTotalMoney + totalMoney;
                    }else{
                        allTotalMoney = allTotalMoney + hrList.get(a).getJciMoney();
                    }
                }
                ArrayList<InfoHouse4rentExpand> list = new ArrayList<InfoHouse4rentExpand>();
                hrList.get(0).setJciMoney(allTotalMoney);
                list.add(hrList.get(0));
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	/**
	 * 查询租客账单
	 * @return
	 */
	public String queryRenterBill(){
	    //租客账单 - 查询     B03b01
        int auth1 = Authority.authorize("B03b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看租客账单权限", null));
            return null;
        }
	    try {
            List<InfoHouse4rentExpand> hrList = houseForRentService.tenantMonthlyInspection(infoHouse4rentExpand);
            if(hrList.size() == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到相关的租客月度账单", null));
            }else{
                String json = JSONUtil.serialize(hrList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//租客账单查询数量
	public String getRenterBillNum(){
	    try {
            List<InfoHouse4rentExpand> hrList = houseForRentService.getRenterBillNum();
            if(hrList.size() == 0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录", null));
            }else{
                String json = JSONUtil.serialize(hrList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	    return null;
	}
	
	//水电气计费结算查询
	public String selectMeterReadingScheme(){
		try {
			List<InfoHouse4rentExpand> list = houseForRentService.getMeterReadingScheme(infoHouse4rentExpand);
			System.out.println("水电气计费"+list);
			
			if(list.size() > 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "水电气计费结算查询失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//增减基数修改
	public String arithmetic(){
		try {
			int result = houseForRentService.arithmetic(infoHouse4rentExpand);
			if(result == 0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "增减基数修改失败", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//根据ID查找
	public String queryHouseForRentById(){
		try {
			List<InfoHouse4rent> listHouse = houseForRentService.selectByPrimaryKey(infoHouse4rentExpand.getHrId());
			if(listHouse.size() != 0){
				String json = JSONUtil.serialize(listHouse);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "查找失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//查询正在维保或者逾期房间 的条件查询
	public void selectRepairOrOverdueAll(){
		try {
			List<InfoHouse4rentExpand> listCustom = houseForRentService.selectRepairOrOverdueAll(infoHouse4rentExpand);
			if(listCustom.size() != 0){
				String json = JSONUtil.serialize(listCustom);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询出数据", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查询按钮数量
	public void selectButtonNumAll(){
		try {
		    List<InfoHouse4rentExpand> listCustom = houseForRentService.selectButtonNumAll();
			if(listCustom.size() > 0){
				String json = JSONUtil.serialize(listCustom);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询出数据", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//查找最大编号数
	public String queryOfMaxNumber(){
	    try {
            String result = houseForRentService.selectOfMaxNumber();
            if(result!=null){
                int i=Integer.valueOf(result)+1;
                StringBuffer sb=new StringBuffer();
                String num=String.valueOf(i);
                for (int j = 0; j < 6-num.length(); j++) {
                    sb.append("0");
                }
                if(num.length()<=6){
                    result=sb.toString()+num;
                    printlnMsg(result);
                }
            }else{
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }		
		return null;
	}
	
	// 查找地址
	public String queryHouseForRentAddress() {
		try {
			List<String> list = houseForRentService.selectForAddress(infoHouse4rentExpand);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				
				printlnOfJson(json);
			} else {
				printlnMsg("-1");
			}
		} catch (Exception e) {
		    e.printStackTrace();Syslog.writeErr(e);
		}
		return null;
	}
	
	/**
	 * 增加记录
	 * @return 
	 * 
	 */
	public String insertHouseForRent(){
	    try {
              System.out.println(infoHouse4rentExpand.getJciMessageNote());
              String[] res = houseForRentService.insertHouse4rentWed(infoHouse4rentExpand).split("###");
            if(res[0].equals("-1")){
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            }else if(res[0].equals("1")){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", res[1]));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
		return null;
	}
	
	//更新记录
	public String updateHouseForRent(){
	    try {
            int result = houseForRentService.updateByPrimaryKeySelective(infoHouse4rentExpand);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "更新记录失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }	
		return null;
	}
	
	//业绩受益人管理：查当前正在出租的房中还没添加业绩受益人的房
	public void queryNoAssistRent(){
		try {
			List<InfoHouse4rentExpand> houses = houseForRentService.selectNoAssist(infoHouse4rentExpand);
			String json = JSONUtil.serialize(houses);
			printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}
	
	//临时账单生成，查询已租房源数据
	public void queryRentingSourceData(){
		try {
			List<InfoHouse4rentExpand> houses = houseForRentService.queryRentingSourceData(infoHouse4rentExpand);
			if(houses.size() != 0){
				String json = JSONUtil.serialize(houses);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到相关数据!", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
	}
	/**
	 * 更换已租房租客
	 * @param
	 * @return
	 * @throws
	 */
	public void changeRenter(){
		try {
			int result = houseForRentService.changeRenter(infoHouse4rentExpand);
			if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "更换租客失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
	public String selecttenantAuthorization(){

        try {
            List<InfoHouse4rentExpand> infoHouse4rentExpands = houseForRentService.selecttenantAuthorization(infoHouse4rentExpand);
            if(infoHouse4rentExpands.size()>0){
                String json = JSONUtil.serialize(infoHouse4rentExpands);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到相关数据!", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "网络异常 或 数据参数有误 ！", null));
        }
        return null;
    }
}

