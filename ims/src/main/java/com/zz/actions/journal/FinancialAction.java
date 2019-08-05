package com.zz.actions.journal;

import java.util.ArrayList;
import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.json.JSONUtil;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoFinancialAccount;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalFinancialExpand;
import com.zz.service.info.FinancialAccountService;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.journal.ContractDatabaseService;
import com.zz.service.journal.FinancialService;
import com.zz.service.sys.SysVariablesService;

/**
 * 收支管理
 * @author Administrator
 *
 */
public class FinancialAction extends BaseAction implements ModelDriven<JournalFinancialExpand>{
	private JournalFinancialExpand journalFinancialExpand;
	private FinancialService financialService;
    private SysVariablesService sysVariablesService;
    private ContractDatabaseService contractDatabaseService;
    private FinancialAccountService financialAccountService;
    private HouseForRentService houseForRentService;
    private HouseForStoreService houseForStoreService;

    public void setFinancialService(FinancialService financialService) {
        this.financialService = financialService;
    }
    
    public void setSysVariablesService(SysVariablesService sysVariablesService) {
        this.sysVariablesService = sysVariablesService;
    }

    public void setContractDatabaseService(
            ContractDatabaseService contractDatabaseService) {
        this.contractDatabaseService = contractDatabaseService;
    }
    
    public void setFinancialAccountService(
            FinancialAccountService financialAccountService) {
        this.financialAccountService = financialAccountService;
    }
    
    public void setHouseForRentService(HouseForRentService houseForRentService) {
		this.houseForRentService = houseForRentService;
	}

	public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
		this.houseForStoreService = houseForStoreService;
	}

	@Override
    public JournalFinancialExpand getModel() {
        if( journalFinancialExpand==null){
            journalFinancialExpand = new JournalFinancialExpand();
        }
        return journalFinancialExpand;
    }
    
	/**
	 * 查账-数据和统计分开
	 * @return
	 */
	public String queryFinancial(){
	    //收支管理 - 查账     B00b01
        int auth1 = Authority.authorize("B00b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查账权限", null));
            return null;
        }
		try {
            List<JournalFinancialExpand> list = financialService.queryFinancial(journalFinancialExpand);
            if(list.size()!=0){
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
		return null;
	}
	
	/**
	 * 查询收支-数据和统计分开
	 * @return
	 */
    public String queryFinancialCommon(){
        try {
            List<JournalFinancialExpand> list = financialService.queryFinancialCommon(journalFinancialExpand);
            if(list.size()!=0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
    
    //已租双击中查询收支
    public String financialInRentDb(){
        try {
            if("".equals(journalFinancialExpand.getJfHouse4storeId()) || journalFinancialExpand.getJfHouse4storeId()==null){
                printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            }else{
                List<JournalFinancialExpand> FinancialList = financialService.selectInformationAll(journalFinancialExpand);
                if(FinancialList.size()!=0){
                    String json = JSONUtil.serialize(FinancialList);
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
	
	//查询用于打印的收支
	public String selectToDoPringt(){
		try {
			List<JournalFinancialExpand> list = financialService.selectToDoPringt(journalFinancialExpand);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "用于打印的收支", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无收支信息", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//凭证号未生成的收支查询
	public String documentQuery(){
		try {
			List<JournalFinancialExpand> list = financialService.documentQuery(journalFinancialExpand);
			if(list.size() != 0){
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "凭证号未生成的收支", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无收支信息", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//查询已生成凭证号的收支
	public String certificateDetails(){
		try {
			List<JournalFinancialExpand>list = financialService.certificateDetails(journalFinancialExpand);
			if(list.size() !=0){
				String json = JSONUtil.serialize(list);
				
				printlnOfJson(CommonMethodClass.jsonData(1, "已生成凭证号的收支", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无收支信息", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//生成凭证号
	public String documentNumber(){
		try {
			String voucher = financialService.documentNumber(journalFinancialExpand);
			if(voucher.equals("-2")){
				printlnOfJson(CommonMethodClass.jsonData(-1, "一次最多只能8条财务记录", null));//一次最多只能8条财务记录
			}else if(voucher == null || voucher.equals("")){
				printlnOfJson(CommonMethodClass.jsonData(-1, "数据有误，生成失败", null));//数据有误
			}else{
				printlnOfJson(CommonMethodClass.jsonData(1, "生成凭证号", voucher));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//项目的财务收支查询
	public String allvirtualPayments(){
		try {
			List<JournalFinancialExpand> list = financialService.allvirtualPayments(journalFinancialExpand);
			if(list.size()!=0){
				String json = JSONUtil.serialize(list);
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
	
	//项目冲帐
	public String virtualStrikeABalance(){
	    try {
            int result = financialService.financialCompensation(journalFinancialExpand);
            if(result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "项目冲帐失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//冲帐接口
	public String strikeBalanceInterface (){
	    try {
            int result = financialService.financialCompensation(journalFinancialExpand);
            if(result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "冲帐失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//根据房东ID查找
	public String queryFinancialByHouse4rentId(){
		try {
			List<JournalFinancialExpand> FinancialList = financialService.selectByHouse4rentId(journalFinancialExpand.getJfHouse4rentId());
			if(FinancialList.size()!=0){
				String json = JSONUtil.serialize(FinancialList);
				
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
	
	//查询所有的财务信息、冲账和被冲账与分页,给条件则为条件查询,不包含项目收支
	public String selectInformationAll(){
		try {
            List<JournalFinancialExpand> FinancialList = financialService.selectInformationAll(journalFinancialExpand);
            if(FinancialList.size()!=0){
                String json = JSONUtil.serialize(FinancialList);
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
	
	//查询所有的财务信息、冲账和被冲账与分页,给条件则为条件查询,包含项目收支
	public String allNormalAndVirtualPayments(){
	    try {
            List<JournalFinancialExpand> FinancialList = financialService.allNormalAndVirtualPayments(journalFinancialExpand);
            if(FinancialList.size() > 0){
                String json = JSONUtil.serialize(FinancialList);
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
	
	//1.录入外部买卖房财务信息 ；2.录入内部管理项目财务信息 ，房源编码绑定经理项目屋ID
	public String insertFinancial(){
	    try {
            int result = financialService.insertSelective(journalFinancialExpand);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }else{
                List<JournalFinancialExpand> list = new ArrayList<>();
                JournalFinancialExpand jff = new JournalFinancialExpand();
                jff.setJfId(result);
                list.add(jff);
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//项目数据录入
	public String virtualDataEntry(){
	    try {
            List<JournalFinancial> list = new ArrayList<JournalFinancial>();
    		String jsonArray = journalFinancialExpand.getJsonArray();
    		JSONArray ja =JSONArray.fromObject(jsonArray);
    		String strid = "";
    		for (Object a : ja) {
    			JSONObject jsonObj = (JSONObject)a;
    			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
    			if("".equals(jf.getJfStartCycle())){
    				jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
    			}
    			if("".equals(jf.getJfEndCycle())){
    				jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
    			}
    			list.add(jf);
    		}
    		list = setManagerUserId(list);
    		int results = financialService.insertList(list, 0);
			if(results >0){
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
	
	//多条数据一起录入
	public String insertFinancialAll(){
        List<JournalFinancial> list = new ArrayList<JournalFinancial>();
        //检测票据编号
	    try {
            if (sysVariablesService.checkBillNum()) {
                String result = detectionBillNum(journalFinancialExpand);
                if (!result.isEmpty()) {
                    printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
                    return null;
                }
            }
        } catch (Exception e1) {
            e1.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "票据编号检测异常", null));
            return null;
        }
	    //获取批量的数据
		String jsonArray = journalFinancialExpand.getJsonArray();
		System.out.println("==="+jsonArray);
		JSONArray ja =JSONArray.fromObject(jsonArray);
		String strid = "";
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
//			System.out.println(jf.getJfAccountingSpecies());
			if("".equals(jf.getJfStartCycle())){
				jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
			}
			if("".equals(jf.getJfEndCycle())){
				jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
			}
			list.add(jf);
		}
		list = setManagerUserId(list);
		try {
		    int results = financialService.insertList(list, 0);
			if(results >0){
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
	
	//维修事务收支生成
	public String balanceOfThings(){
		int results = 0;
		List<JournalFinancial> list = new ArrayList<JournalFinancial>();
		String jsonArray = journalFinancialExpand.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		String strid = "";
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
			InfoFinancialAccount infoFinancialAccount = new InfoFinancialAccount();
			infoFinancialAccount.setFaId(jf.getJfAccountId());
			try {
                List<InfoFinancialAccount> list2 = financialAccountService.selectByPrimaryKey(infoFinancialAccount);
                jf.setJfClosedWay(list2.get(0).getFaPaymentType());
            } catch (Exception e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
			list.add(jf);
		}
		list = setManagerUserId(list);
		try {
			results = financialService.insertList(list, 0);
			if(results >0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "维修事务收支生成失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//新签租客收支生成
	public String newSigningIncome(){
	    //票据编号检测
        try {
            if (sysVariablesService.checkBillNum()) {
                String result = detectionBillNum(journalFinancialExpand);
                if (!result.isEmpty()) {
                    printlnOfJson(CommonMethodClass.jsonData(-1, result, null));
                    return null;
                }
            }
        } catch (Exception e1) {
            e1.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "票据编号检测异常", null));
            return null;
        }
        int results = 0;
        List<JournalFinancial> list = new ArrayList<JournalFinancial>();
        String jsonArray = journalFinancialExpand.getJsonArray();
        JSONArray ja =JSONArray.fromObject(jsonArray);
        String strid = "";
        for (Object a : ja) {
            JSONObject jsonObj = (JSONObject)a;
            JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
            if("".equals(jf.getJfStartCycle())){
                jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
            }
            if("".equals(jf.getJfEndCycle())){
                jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
            }
            list.add(jf);
        }
        list = setManagerUserId(list);
        try {
            results = financialService.insertList(list, 1);
            if(results >0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "新签租客收支生成失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//租客每期租金收支生成
	public String rentEachPayment(){
	    try {
            int result = financialService.rentEachPayment(journalFinancialExpand);
            if(result == 1){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "租客每期租金收支生成失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//下定金和退定金生成收支
	public String insertFinancialDeposit(){
		int results = 0;
		List<JournalFinancial> list = new ArrayList<JournalFinancial>();
		String jsonArray = journalFinancialExpand.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		String strid = "";
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
			if("".equals(jf.getJfStartCycle())){
				jf.setJfStartCycle(CommonMethodClass.getCurrentDate());
			}
			if("".equals(jf.getJfEndCycle())){
				jf.setJfEndCycle(CommonMethodClass.getCurrentDate());
			}
			list.add(jf);
		}
		list = setManagerUserId(list);
		try {
			results = financialService.insertList(list , 0);
			if(results >0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "下定失败", null));
			}
			System.out.println("results:"+results);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//退房财务生成
	public String insertFinancialCheckOut(){
		List<JournalFinancial> list = new ArrayList<JournalFinancial>();
		String jsonArray = journalFinancialExpand.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		int iSize = ja.size();
		int num = 1;
		String strid = "";
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
			list.add(jf);
		}
		list = setManagerUserId(list);
		try {
		    int results = financialService.insertList(list, 0);
			if(results >0){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "退房失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	//项目收支复核
	public String virtualReview(){
	    try {
            int result = financialService.financialVirtualReview(journalFinancialExpand);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "复核失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//复核接口，修改
	public String updateFinancialReview(){
	    try {
            int result = financialService.financialAudit(journalFinancialExpand);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "复核失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
		
	//项目收支审核
	public String virtualAudit(){
	    try {
            int temp = 1;
            int result = financialService.updateByPrimaryKeySelective(journalFinancialExpand, temp);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "复核失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//审核的接口，根据财务ID修改,
	public String updateFinancial(){
	    try {
            int temp = 2;
            int result = financialService.updateByPrimaryKeySelective(journalFinancialExpand, temp);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "复核失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	/**
	 * 检测票据编号
	 * @param journalFinancialExpand
	 * @return
	 * @throws Exception
	 */
	private String detectionBillNum(JournalFinancialExpand journalFinancialExpand) throws Exception {
	    String result = "";
	    List<String> list = new ArrayList<String>();
	    String jsonArray = journalFinancialExpand.getJsonArray();
        JSONArray ja =JSONArray.fromObject(jsonArray);
        for (Object a : ja) {
            JSONObject jsonObj = (JSONObject)a;
            JournalFinancial jf = (JournalFinancial) JSONObject.toBean(jsonObj, JournalFinancial.class);
            System.out.println("----"+jf.getJfBigType()+"----"+jf.getJfAccountingSpecies()+"----");
            if("收入".equals(jf.getJfNatureOfThe()) 
            		&& !("欠结类".equals(jf.getJfBigType()) && "待付房东款".equals(jf.getJfAccountingSpecies()))
                    && !("欠结类".equals(jf.getJfBigType()) && "房东还欠结款".equals(jf.getJfAccountingSpecies()))
            		&& !("财务类".equals(jf.getJfBigType()) && "资金调配".equals(jf.getJfAccountingSpecies()))){
                list.add(jf.getJfTicketNumber());
                //查询编号再判断是否存在
                JournalContractDatabase journalContractDatabase = new JournalContractDatabase();
                journalContractDatabase.setDetectionContract(jf.getJfTicketNumber());
                int code = contractDatabaseService.contractNumberdetection(journalContractDatabase);
                switch (code) {
                    case -1: result += "票据编号为空。"; break;
                    case -2: result += "票据编号" + jf.getJfTicketNumber() + "未领取。"; break;
                    case -3: result += "票据编号" + jf.getJfTicketNumber() + "已使用。"; break;
                    case -4: result += "票据编号" + jf.getJfTicketNumber() + "已注销。"; break;
                    case -5: result += "票据编号" + jf.getJfTicketNumber() + "不存在。"; break;
                    case -6: result += "票据编号" + jf.getJfTicketNumber() + "检测错误。"; break;
                    case -7: result += "票据编号" + jf.getJfTicketNumber() + "重复。"; break;
                    default: break;
                }
            }
        }
        //判断是否重复
        String temp = "";
        for (int i = 0; i < list.size() - 1; i++) {
            temp = list.get(0);
            for (int j = i + 1; j < list.size(); j++){
                if (temp.equals(list.get(j))) {
                    result += "票据编号" + temp + "重复。";
                }
            }
        }
	    return result;
	}
	
	/**
	 * 给每条收支绑定房管员，有已租id的绑已租房管员，有未租id的绑未租房管员
	 * @param list
	 * @return
	 */
	private List<JournalFinancial> setManagerUserId(List<JournalFinancial> list){
		try {
			for (JournalFinancial item: list) {
				if (item.getJfHouse4rentId() != null) {
					InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
					hr.setHrId(item.getJfHouse4rentId());
					List<InfoHouse4rentExpand> hrList = houseForRentService.queryHouseRentCommon(hr);
					item.setJfManagerUserId(hrList.get(0).getHrManagerUserId());
				} else if (item.getJfHouse4storeId() != null) {
					InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
					hs.setHsId(item.getJfHouse4storeId());
					List<InfoHouse4storeExpand> hsList = houseForStoreService.queryHouseStoreCommon(hs);
					item.setJfManagerUserId(hsList.get(0).getHsManagerUserId());
				}
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
		return list;
	}
	
	//结清挂账
	public void clearCreditMoney(){
		try {
			Result<String> result = financialService.clearCreditMoney(journalFinancialExpand);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2,"系统异常", null));
		}
	}
	
	//批量结清挂账
	public void batchClearCredit(){
		try {
			Result<String> result = financialService.batchClearCredit(journalFinancialExpand);
			String resultStr = JSON.toJSONString(result,SerializerFeature.WriteMapNullValue);
			printlnOfJson(resultStr);
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2,"系统异常", null));
		}
	}
}
