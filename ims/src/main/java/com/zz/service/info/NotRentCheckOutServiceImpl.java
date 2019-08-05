package com.zz.service.info;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoHouseMapper;
import com.zz.mapper.info.InfoNotRentCheckOutMapper;
import com.zz.mapper.info.InfoRenewalLandlordMapper;
import com.zz.mapper.info.InfoTransactionAssistanceMapper;
import com.zz.mapper.journal.JournalRepairMapper;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.info.InfoNotRentCheckOut;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.po.info.InfoTransactionExpand;
import com.zz.po.journal.JournalFinancial;
import com.zz.po.journal.JournalRepairExpand;
import com.zz.po.journal.JournalShortMessageAdministrative;
import com.zz.service.journal.FinancialService;
import com.zz.service.sys.SendShortMessageService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class NotRentCheckOutServiceImpl implements NotRentCheckOutService {
	private InfoNotRentCheckOutMapper infoNotRentCheckOutMapper;
	private InfoHouseMapper infoHouseMapper;
	private InfoHouse4storeMapper infoHouse4storeMapper;
	private InfoRenewalLandlordMapper infoRenewalLandlordMapper;
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	private InfoTransactionAssistanceMapper itamMapper;
	private JournalRepairMapper journalRepairMapper;
	private FinancialService financialService;
	@Autowired
	private SendShortMessageService sendShortMessageService;
	
	public void setFinancialService(FinancialService financialService) {
        this.financialService = financialService;
    }

    public void setJournalRepairMapper(JournalRepairMapper journalRepairMapper) {
        this.journalRepairMapper = journalRepairMapper;
    }

    public void setItamMapper(InfoTransactionAssistanceMapper itamMapper) {
		this.itamMapper = itamMapper;
	}

	public void setInfoHouse4storeMapper(
			InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}
	
	public void setInfoHouseMapper(
			InfoHouseMapper infoHouseMapper) {
		this.infoHouseMapper = infoHouseMapper;
	}
	
	public void setInfoContractInstallmentMapper(
			InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}
	public void setInfoRenewalLandlordMapper(
			InfoRenewalLandlordMapper infoRenewalLandlordMapper) {
		this.infoRenewalLandlordMapper = infoRenewalLandlordMapper;
	}
	public void setInfoNotRentCheckOutMapper(
			InfoNotRentCheckOutMapper infoNotRentCheckOutMapper) {
		this.infoNotRentCheckOutMapper = infoNotRentCheckOutMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer nrcId) throws Exception {
		return infoNotRentCheckOutMapper.deleteByPrimaryKey(nrcId);
	}

	@Override
	public int insertSelective(InfoNotRentCheckOut record) throws Exception {
		return infoNotRentCheckOutMapper.insertSelective(record);
	}

	@Override
	public List<InfoNotRentCheckOut> selectByPrimaryKey(
			InfoNotRentCheckOut record) throws Exception {
		return infoNotRentCheckOutMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(InfoNotRentCheckOut infoNotRentCheckOut) throws Exception {
		return infoNotRentCheckOutMapper.updateByPrimaryKeySelective(infoNotRentCheckOut);
	}

    /**
     * 暂存、提交
     */
    @Override
    public int saveNotRentCheckOut(InfoNotRentCheckOut infoNotRentCheckOut) throws Exception {
        int result = 0;
        InfoNotRentCheckOut param = new InfoNotRentCheckOut();
        param.setNrcId(infoNotRentCheckOut.getNrcId());
        List<InfoNotRentCheckOut> list = infoNotRentCheckOutMapper.selectByPrimaryKey(param);
        if (list.isEmpty()) {
            throw new Exception("查询不到业主退房记录");
        }
        infoNotRentCheckOutMapper.updateByPrimaryKeySelective(infoNotRentCheckOut);
        //修改未租房状态
        InfoHouse4storeExpand is = new InfoHouse4storeExpand();
        if (infoNotRentCheckOut.getNrcCheckOutTheState() != null) {
            is.setHsId(infoNotRentCheckOut.getNrcStoreId());
            is.setHsState(infoNotRentCheckOut.getNrcCheckOutTheState());
            result = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
            if(result == 0){
                throw new Exception("未租退房修改失败");
            }
        }
        if ("退房待审核".equals(infoNotRentCheckOut.getNrcCheckOutTheState())){
        	System.out.println("------checkoutLA------");
            //添加维修
            String rcoRepairNote = infoNotRentCheckOut.getNrcRepairNote();
            JSONArray array = JSONArray.fromObject(rcoRepairNote);
            System.out.println("维修条数："+array.size());
            for (Object obj : array) {
                JSONObject jsonObj = (JSONObject) obj;
                JournalRepairExpand repair = (JournalRepairExpand) JSONObject.toBean(jsonObj, JournalRepairExpand.class);
                System.out.println("SendMsg:=="+repair.isSendMsg());
                List<JournalRepairExpand> list2 = journalRepairMapper.selectRepairByAnyCondition(repair);
                if (list2.isEmpty()) {
                    result = journalRepairMapper.insertSelective(repair);
                    if(result == 0){
                        throw new Exception("添加维修失败");
                    }
                    System.out.println("SendMsg:=="+repair.isSendMsg());
			        if(repair.isSendMsg()){
			        	System.out.println("-----------===TRUE==-----------------"+is.getPopTelephone());
			        	JournalShortMessageAdministrative journalShortMessageAdministrative=new JournalShortMessageAdministrative();
			     	    System.out.println("setSmUserId:=="+repair.getRepRepairPeopleId());
			        	journalShortMessageAdministrative.setSmUserId(repair.getRepRepairPeopleId());
			        	journalShortMessageAdministrative.setSmUserContacts(is.getPopTelephone());
			        	journalShortMessageAdministrative.setSmType("发送");
			        	String message=
			        			"您有一个新的"+repair.getRepTypeRp()+"需要处理："+repair.getRepEventRp()+"，类型："+repair.getRepResponsibility()+"，金额："+repair.getRepTollRp()+"。";
			        	Result<String>result5= sendShortMessageService.sendMessage(is.getPopTelephone(), message, journalShortMessageAdministrative, 1);
			        }
                }
            }
        }
        return 1;
    }

	/**
	 * 审核、复核、出账
	 */
	@Override
	public int noRentModification(InfoNotRentCheckOut infoNotRentCheckOut) throws Exception {
	    InfoNotRentCheckOut param = new InfoNotRentCheckOut();
        param.setNrcId(infoNotRentCheckOut.getNrcId());
        List<InfoNotRentCheckOut> list = infoNotRentCheckOutMapper.selectByPrimaryKey(param);
        if (list.isEmpty()) {
            throw new Exception("查询不到业主退房记录");
        }
        //操作记录
        if (list.get(0).getNrcOperationRecords() != null && !list.get(0).getNrcOperationRecords().equals("")) {
            infoNotRentCheckOut.setNrcOperationRecords(list.get(0).getNrcOperationRecords() + "," + infoNotRentCheckOut.getNrcOperationRecords());
        } else {
            infoNotRentCheckOut.setNrcOperationRecords(infoNotRentCheckOut.getNrcOperationRecords());
        }
        //修改退房状态及添加操作记录
        infoNotRentCheckOutMapper.updateByPrimaryKeySelective(infoNotRentCheckOut);
        //修改未租房状态
        if (infoNotRentCheckOut.getNrcCheckOutTheState() != null) {
            InfoHouse4storeExpand is = new InfoHouse4storeExpand();
            is.setHsId(infoNotRentCheckOut.getNrcStoreId());
            is.setHsState(infoNotRentCheckOut.getNrcCheckOutTheState());
            int result = infoHouse4storeMapper.updateByPrimaryKeySelective(is);
            if(result == 0){
                throw new Exception("未租退房修改失败");
            }
            //修改拆分房状态：查是否是被拆分房，是：查拆分房列表，遍历列表修改状态
            is = new InfoHouse4storeExpand();
            is.setHsPrimitiveMother(infoNotRentCheckOut.getNrcStoreId());
            List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.flatShareRealQuery(is);
            for (InfoHouse4storeExpand item: hsList) {
            	item.setHsState(infoNotRentCheckOut.getNrcCheckOutTheState());
            	result = infoHouse4storeMapper.updateByPrimaryKeySelective(item);
                if(result == 0){
                    throw new Exception("未租退房修改失败");
                }
            }
        }
        
        //出账
        int nrcLandlordId = infoNotRentCheckOut.getNrcLandlordId();
        int nrcStoreId = infoNotRentCheckOut.getNrcStoreId();
        String nrcCheckOutTheState = infoNotRentCheckOut.getNrcCheckOutTheState();
        if(nrcCheckOutTheState.equals("退房完成")){
            //盘源状态改为“未托管”
            InfoHouseExpand ih = new InfoHouseExpand();
            List<InfoHouse4storeExpand> ihsInfo = infoHouse4storeMapper.selectByPrimaryKey(nrcStoreId);
            System.out.println("ihsInfo.size()="+ihsInfo.size());
            ih.setHouseCoding(ihsInfo.get(0).getHsHouseId());
            ih.setHouseSignedState("未托管");
            int ihresult = infoHouseMapper.updateByPrimaryKeySelective(ih);

            //处理业主合约及分期账单
            InfoRenewalLandlordExpand param2 = new InfoRenewalLandlordExpand();
            InfoRenewalLandlordExpand landcont = new InfoRenewalLandlordExpand();
            param2.setJrlHouse4storeId(nrcStoreId);
            List<InfoRenewalLandlordExpand> jrlList = infoRenewalLandlordMapper.selectByPrimaryKey(param2);
            for(int i = 0; i<jrlList.size();++i){
                int jrlId = jrlList.get(i).getJrlId();
                //修改业主合约的状态为退房
                landcont.setJrlId(jrlId);
                landcont.setJrlRentalType("退房");
                int result = infoRenewalLandlordMapper.updateByPrimaryKeySelective(landcont);
                //修改分期账单状态，修改合约时查询待付的第一条，把剩余所有待付的状态都改了
                InfoContractInstallmentExpand ice = new InfoContractInstallmentExpand();
                ice.setJciLandContId(jrlId);
                ice.setJciState("待付");
                List<InfoContractInstallmentExpand> ccaList = infoContractInstallmentMapper.selectBeginPeriods(ice);
                if(ccaList.size() != 0){
                    String periods = ccaList.get(0).getJciBeginPeriods();
                    ice.setJciLandContId(jrlId);
                    ice.setByTheTime(periods);
                    ice.setJciNature("应支");
                    ice.setJciState(infoNotRentCheckOut.getNrcCheckOutNature());
                    int result2 = infoContractInstallmentMapper.checkoutthestate(ice);  
                    if(result2 == 0){
                        throw new Exception("修改分期账单失败");
                    }
                }
            }
            //修改业绩受益人状态
            InfoTransactionExpand assistModel = new InfoTransactionExpand();
            assistModel.setAssistHouse4rent(null);
            assistModel.setAssistHouse4store(ihsInfo.get(0).getHsHouseId());
            assistModel.setAssistState("失效");
            int result3 = itamMapper.performanceModificationInterface(assistModel);
            //生成收支
            List<JournalFinancial> list2 = new ArrayList<JournalFinancial>();
            String jsonArray = infoNotRentCheckOut.getJsonArray();
            if (!"[]".equals(jsonArray)) {
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
                    list2.add(jf);
                }
                financialService.insertList(list2, 0);
            }
        }
        return 1;
	}
	
	/**
	 * 撤销退房 修改盘源状态
	 */
	@Override
	public int updateHouseState(InfoNotRentCheckOut record) throws Exception {
		return infoNotRentCheckOutMapper.updateHouseState(record);
	}
	
	/**
	 * 撤销退房 修改未租房状态
	 */
	@Override
	public int updateHsState(InfoNotRentCheckOut record) throws Exception {
		return infoNotRentCheckOutMapper.updateHsState(record);
	}

	/**
                业主退房计算退补租金（多退少补，正数为补，负数为退）
                逻辑图：http://pic-static.fangzhizun.com/%E9%80%80%E6%88%BF%E7%A7%9F%E9%87%91%E8%AE%A1%E7%AE%97%E9%80%BB%E8%BE%91%E5%9B%BE.png
                办理退房时间是否超过合约结束日期
                超期：
                    1.计算超期租金：超期租金 = 超期天数 / 办理退房时间所在月的天数 * 月租金
                    2.计算合约期内待付账单总金额
                    
                不超期：
                                       判断办理退房时间所在那期有金额的账单是否待付
                                                    待付：一天的租金 = 当期（总）租金/（下一期有金额的账单的开始时间-最近一期有金额的账单的开始时间）
                                                                待付的天数 = 退房办理时间-最近一期有金额的账单的开始时间 + 1
                                                                合约期内应退 = 一天的租金 * 待付的天数
                                                                查询最近一期有金额的账单的开始时间之前的账单是否存在待付的账单，有的话也是要退的
                                                    已付：一天的租金 = 当期（总）租金/（后一期租金有金额开始时间-最近一期账单租金有金额开始时间）
                                                                应补的天数 = 后一期租金有金额开始时间-退房办理时间 - 1
                                                                合约期内应补 = 一天的租金 * 应补的天数
                                                                查询最近一期有金额的账单的开始时间之后的账单是否存在已付的账单，有的话也是要补的
    */
    @Override
    public InfoNotRentCheckOut selectLandlordCheckoutRent(
            InfoNotRentCheckOut infoNotRentCheckOut) throws Exception {
        Double money = 0.00;//最终退补租金
        int hsId = infoNotRentCheckOut.getNrcStoreId();
        String nrcActualCheckOutTime = infoNotRentCheckOut.getNrcActualCheckOutTime();//办理退房时间
        String jrlEndTime = infoNotRentCheckOut.getNrcJrlEndTime();//合约结束日期
        Double hsInPrice = infoNotRentCheckOut.getNrcHsInPrice();//月租金
        //查询当期业主合约的到期日期 
        InfoRenewalLandlordExpand infoRenewalLandlordExpand = new InfoRenewalLandlordExpand();
        infoRenewalLandlordExpand.setJrlHouse4storeId(hsId);
        InfoRenewalLandlordExpand landcont = infoRenewalLandlordMapper.queryCurJrlEndTime(infoRenewalLandlordExpand);
        if (landcont != null) {
            jrlEndTime = landcont.getJrlEndTime();
        }
        int chaoqitianshu = CommonMethodClass.countDay(jrlEndTime, nrcActualCheckOutTime);
        if (chaoqitianshu > 0) {//办理时间-合约结束>0   办理时间>合约结束   超期   欠业主钱
            //1.计算超期租金：超期租金 = 超期天数 / 办理退房时间所在月的天数 * 月租金
            int thisMonthDays = CommonMethodClass.getMonthDays(CommonMethodClass.getToday());
            Double chaoqizujin = (double)chaoqitianshu / thisMonthDays * hsInPrice;
            //2.计算合约期内待付账单总金额
            Double daishouzujin = 0.00;
            InfoContractInstallmentExpand ins = new InfoContractInstallmentExpand();
            ins.setJciHouse4storeId(hsId);
            ins.setJciType("房东租金");
            ins.setJciState("待付");
            List<InfoContractInstallmentExpand> ins2 = infoContractInstallmentMapper.countJciMoney(ins);
            if (ins2.size() > 0) {
                daishouzujin = ins2.get(0).getJciMoney();
            }
            System.out.println("chaoqitianshu:"+chaoqitianshu);
            System.out.println("thisMonthDays:"+thisMonthDays);
            System.out.println("chaoqizujin:"+chaoqizujin);
            System.out.println("daishouzujin:"+daishouzujin);
            money = chaoqizujin + daishouzujin;
            money = -money;//负数为退
        } else {//不超期
            //查询退房所在的那期有金额的账单
            InfoContractInstallmentExpand ins = new InfoContractInstallmentExpand();
            ins.setJciHouse4storeId(hsId);
            ins.setLessThan(1);
            ins.setByTheTime(nrcActualCheckOutTime);
            ins.setSort("1");
            ins.setLimitNum(1);
            ins.setJciType("房东租金");
            List<InfoContractInstallmentExpand> ins2 = infoContractInstallmentMapper.queryByTheTime(ins);
            if (ins2.isEmpty()) {
                throw new Exception("没有查询到退房所在的那期有金额的账单");
            }
            //最近一期有金额的账单的开始时间
            String thisBegin = ins2.get(0).getJciBeginPeriods();
            //下一期有金额的账单的开始时间
            String nextBegin = "";
            ins = new InfoContractInstallmentExpand();
            ins.setJciHouse4storeId(hsId);
            ins.setGreaterThan(2);
            ins.setByTheTime(thisBegin);
            ins.setSort("2");
            ins.setLimitNum(1);
            ins.setJciType("房东租金");
            List<InfoContractInstallmentExpand> ins3 = infoContractInstallmentMapper.queryByTheTime(ins);
            if (!ins3.isEmpty()) {
                nextBegin = ins3.get(0).getJciBeginPeriods();
            } else {
                nextBegin = CommonMethodClass.dateAddSub(thisBegin, 1);//没有下一期有金额的账单，月份+1
            }
            System.out.println("最近一期有金额的账单的开始时间:"+thisBegin);
            System.out.println("下一期有金额的账单的开始时间:"+nextBegin);
            
            if ("待付".equals(ins2.get(0).getJciState())) {//欠业主钱
                //一天的租金
                Double oneDayMoney = ins2.get(0).getJciMoney() / CommonMethodClass.countDay(thisBegin, nextBegin);
                //待付的天数
                int daishoutianshu = CommonMethodClass.countDay(thisBegin, nrcActualCheckOutTime) + 1;
                //合约期内未付
                money = oneDayMoney * daishoutianshu;//正数为退
                System.out.println("oneDayMoney:"+oneDayMoney);
                System.out.println("daishoutianshu:"+daishoutianshu);
                //查询最近一期有金额的账单的开始时间之前的账单是否存在待付的账单，有的话也是要退的
                ins = new InfoContractInstallmentExpand();
                ins.setJciHouse4storeId(hsId);
                ins.setJciState("待付");
                ins.setLessThan(2);
                ins.setByTheTime(thisBegin);
                ins.setJciType("房东租金");
                List<InfoContractInstallmentExpand> ins4 = infoContractInstallmentMapper.queryByTheTime(ins);
                for (InfoContractInstallmentExpand item : ins4) {
                    money += item.getJciMoney();
                    System.out.println("额外退款:"+item.getJciMoney());
                }
                money = -money;//负数为退
            } else {//已付
                //一天的租金
                Double oneDayMoney = ins2.get(0).getJciMoney() / CommonMethodClass.countDay(thisBegin, nextBegin);
                //应补的天数
                int yingtuitianshu = CommonMethodClass.countDay(nrcActualCheckOutTime, nextBegin) - 1;
                //合约期内应补
                money = oneDayMoney * yingtuitianshu;
                System.out.println("oneDayMoney:"+oneDayMoney);
                System.out.println("yingtuitianshu:"+yingtuitianshu);
                //查询最近一期有金额的账单的开始时间之后的账单是否存在已付的账单，有的话也是要补的
                ins = new InfoContractInstallmentExpand();
                ins.setJciHouse4storeId(hsId);
                ins.setJciState("已收");
                ins.setGreaterThan(2);
                ins.setByTheTime(thisBegin);
                ins.setJciType("房东租金");
                List<InfoContractInstallmentExpand> ins4 = infoContractInstallmentMapper.queryByTheTime(ins);
                for (InfoContractInstallmentExpand item : ins4) {
                    money += item.getJciMoney();
                    System.out.println("额外应补:"+item.getJciMoney());
                }
            }
        }
        //保留两位小数
        money = new BigDecimal(money).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
        System.out.println("money:"+money);
        infoNotRentCheckOut.setNrcRemainingRental(money);
        return infoNotRentCheckOut;
    }

    @Override
    public List<InfoNotRentCheckOut> queryHouseStoreNum() throws Exception {
        return infoNotRentCheckOutMapper.queryHouseStoreNum();
    }
}
