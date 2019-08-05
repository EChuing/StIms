package com.zz.service.info;

import java.text.SimpleDateFormat;
import java.util.*;

import com.zz.mapper.journal.*;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.info.*;
import com.zz.po.journal.*;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.alibaba.fastjson.JSON;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoHouseMapper;
import com.zz.mapper.info.InfoLandlordIntentionPersonMapper;
import com.zz.mapper.info.InfoLandlordMapper;
import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.mapper.info.InfoRenewalLandlordMapper;
import com.zz.mapper.info.InfoTransactionAssistanceMapper;
import com.zz.mapper.sys.SysHouseDictMapper;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.po.sys.SysAssetsExpand;
import com.zz.po.sys.SysHouseDictExpand;
import com.zz.po.sys.SysVariables;
import com.zz.service.sys.HouseDictService;
import com.zz.service.sys.SysAssetsService;

public class HouseForStoreServiceImpl implements HouseForStoreService{
	private InfoHouse4storeMapper infoHouse4storeMapper;	
	private InfoLandlordMapper infoLandlordMapper;
	private InfoPopulationMapper infoPopulationMapper;
	@Autowired
	private JourShortRentContractMapper jourShortRentContractMapper;
	private InfoRenewalLandlordMapper infoRenewalLandlordMapper;
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	private InfoHouseMapper infoHouseMapper;
	private InfoTransactionAssistanceMapper itamMapper;
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	private InfoLandlordIntentionPersonMapper infoLandlordIntentionPersonMapper;
	private SysHouseDictMapper sysHouseDictMapper;
	private SysAssetsService sysAssetsService;
	private JournalAttachmentMapper journalAttachmentMapper;
	private JournalHousingFollowMapper journalHousingFollowMapper;
	private SysVariablesMapper sysVariablesMapper;
	private InfoHouse4rentMapper infoHouse4rentMapper;
	@Autowired
	private JourSetupHouseNexusMapper jourSetupHsNexusMapper;
	@Autowired
	private JourShortRentSetUpMapper jourShortRentSetUpMapper;
	@Autowired
	private HouseDictService houseDictService;

	@Autowired
	private JourEarnestMoneyMapper jourEarnestMoneyMapper;

	public InfoHouse4rentMapper getInfoHouse4rentMapper() {
		return infoHouse4rentMapper;
	}
	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}
	public void setSysVariablesMapper(SysVariablesMapper sysVariablesMapper) {
        this.sysVariablesMapper = sysVariablesMapper;
    }
    public void setJournalHousingFollowMapper(JournalHousingFollowMapper journalHousingFollowMapper) {
		this.journalHousingFollowMapper = journalHousingFollowMapper;
	}
	public void setJournalAttachmentMapper(
            JournalAttachmentMapper journalAttachmentMapper) {
        this.journalAttachmentMapper = journalAttachmentMapper;
    }
    public void setSysAssetsService(SysAssetsService sysAssetsService) {
        this.sysAssetsService = sysAssetsService;
    }
	public void setSysHouseDictMapper(SysHouseDictMapper sysHouseDictMapper) {
		this.sysHouseDictMapper = sysHouseDictMapper;
	}
	public void setInfoLandlordIntentionPersonMapper(
			InfoLandlordIntentionPersonMapper infoLandlordIntentionPersonMapper) {
		this.infoLandlordIntentionPersonMapper = infoLandlordIntentionPersonMapper;
	}	
	public InfoContractInstallmentMapper getInfoContractInstallmentMapper() {
		return infoContractInstallmentMapper;
	}
	public void setJournalContractDatabaseMapper(
			JournalContractDatabaseMapper journalContractDatabaseMapper) {
		this.journalContractDatabaseMapper = journalContractDatabaseMapper;
	}
	public void setItamMapper(InfoTransactionAssistanceMapper itamMapper) {
		this.itamMapper = itamMapper;
	}
	public void setInfoHouseMapper(InfoHouseMapper infoHouseMapper) {
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
	public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
		this.infoPopulationMapper = infoPopulationMapper;
	}
	public void setInfoLandlordMapper(InfoLandlordMapper infoLandlordMapper) {
		this.infoLandlordMapper = infoLandlordMapper;
	}
	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}
	public void setJourShortRentContractMapper(JourShortRentContractMapper jourShortRentContractMapper) {
		this.jourShortRentContractMapper = jourShortRentContractMapper;
	}
	@Override
	public int deleteByPrimaryKey(Integer id) throws Exception {
		return infoHouse4storeMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insertSelective(InfoHouse4storeExpand record) throws Exception {
		return infoHouse4storeMapper.insertSelective(record);
	}
	
	@Override
	public int updateByPrimaryKeySelective(InfoHouse4storeExpand record)
			throws Exception {
		return infoHouse4storeMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<InfoHouse4storeExpand> selectByPrimaryKey(Integer id) throws Exception {
		return infoHouse4storeMapper.selectByPrimaryKey(id);
	}

	@Override
	public String selectOfMaxNumber() throws Exception {
		return infoHouse4storeMapper.selectOfMaxNumber();
	}

	@Override
	public int modifyTheBase(InfoHouse4storeExpand record) throws Exception {
		return infoHouse4storeMapper.modifyTheBase(record);
	}
	
	@Override
	public List<InfoHouse4storeExpand> huosestoreWeg(
			InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.huosestoreWeg(conditions);
	}

	@Override
	public List<InfoHouse4storeExpand> remoteMeterReading(InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.remoteMeterReading(conditions);
	}

	@Override
	public List<InfoHouse4storeExpand> selectStoreData(
			InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.selectStoreData(conditions);
	}

	@Override
	public int clearDeposit(InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.clearDeposit(conditions);
	}

	@Override
	public List<InfoHouse4storeExpand> selectNoAssist(
			InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.selectNoAssist(conditions);
	}

	@Override
	public List<InfoHouse4storeExpand> getStoreUserId(
			InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.getStoreUserId(conditions);
	}

	@Override
	public List<InfoHouse4storeExpand> selectModifiedHosting(
			InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.selectModifiedHosting(conditions);
	}

	@Override
	public List<InfoHouse4storeExpand> getAllHouseForStoreInCard(
			InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.getAllHouseForStoreInCard(conditions);
	}

	@Override
	public List<InfoHouse4storeExpand> queryLandlordCheckOut(
			InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.queryLandlordCheckOut(conditions);
	}

	@Override
	public int queryHouseStoreNum(InfoHouse4storeExpand conditions)
			throws Exception {
		return infoHouse4storeMapper.queryHouseStoreNum(conditions);
	}
	
	//有资料房添加未租
	@Override
	public String notRentAComprehensiveNew(InfoHouse4storeExpand conditions)
			throws Exception {
		return insertNotRentAComprehensiveNew(conditions);
	}
		
		//return insertNotRentAComprehensiveNew(conditions);
	
	//未租房综合新增
	private String insertNotRentAComprehensiveNew(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception{		
		/*
		 * 添加业主
		 */
		Integer landlordId = null; //房东id
		Integer popID = null; //人口id
		Integer jrlId = null; //合约id
		//接收传入的IC
		String ic = null;
		ic = infoHouse4storeExpand.getLaPopIdcard();
		//查询人口表IC
		List<InfoPopulation> list = null;
		InfoPopulation ip = new InfoPopulation();
		if(ic != null && !ic.equals("")){
			ip.setPopIdcard(ic);
			list = infoPopulationMapper.newModifiedJudgmentQuery(ip);
		}
		System.out.println("************************** 有还是没有啊"+list.size());
		//判断是否存在此人
		if(list.size()==0){
			System.out.println("************************** 走的"+111);
			//用传入的IC去人头表查，没有相应的数据则新增一条人头数据，并返回插入的ID
			ip.setPopName(infoHouse4storeExpand.getLaPopName());
			ip.setPopIdcard(infoHouse4storeExpand.getLaPopIdcard());
			ip.setPopTelephone(infoHouse4storeExpand.getLaPopTelephone());
			ip.setPopUser(infoHouse4storeExpand.getLaUserId());
			ip.setPopNameRemark(infoHouse4storeExpand.getPopNameRemark());
			ip.setPopLandlord(1);
			ip.setPopPassword(infoHouse4storeExpand.getLaPopTelephone());
			ip.setPopIdcardJson(infoHouse4storeExpand.getPopIdcardJson());
			ip.setPopInnerCreditLevel(80);
			ip.setPopOuterCreditLevel(80);
			int result1 = infoPopulationMapper.insertSelective(ip);
			popID = ip.getPopId();
			System.out.println("想要的人口id："+popID);
			//房东表新增
			InfoLandlordExpand infoLandlordExpand = new InfoLandlordExpand();
			infoLandlordExpand.setLaPopulationId(popID);
			infoLandlordExpand.setLaUserId(infoHouse4storeExpand.getLaUserId());
			infoLandlordExpand.setLaDepartment(infoHouse4storeExpand.getLaDepartment());
			infoLandlordExpand.setLaStorefront(infoHouse4storeExpand.getLaStorefront());
			infoLandlordExpand.setLandlordOtherContact(infoHouse4storeExpand.getLandlordOtherContact());
			infoLandlordExpand.setLaSecondContacts(infoHouse4storeExpand.getLaSecondContacts());
			infoLandlordExpand.setLaSecondPhone(infoHouse4storeExpand.getLaSecondPhone());
			infoLandlordExpand.setLaOtherContact(infoHouse4storeExpand.getLaOtherContact());
			int result2 = infoLandlordMapper.insertSelective(infoLandlordExpand);
			int laId = infoLandlordExpand.getLandlordId();
			System.out.println("返回自増房东ID："+laId);
			if(result1==0){
				throw new Exception("房东新增失败--------------------  11111 ");
			}else{
				landlordId = laId;
			}
		}else{
			System.out.println("************************** 走的"+2222);
			//用传入的IC去人头表查，如果有则取出查询的ID
			popID = list.get(0).getPopId();
			String name = list.get(0).getPopName();
			System.out.println("************************** 要用到的值是什么:"+popID+" -- "+name+" -!- "+infoHouse4storeExpand.getLaPopName());
			if(name.equals(infoHouse4storeExpand.getLaPopName())){
				InfoLandlordExpand la = new InfoLandlordExpand();
				la.setLaPopulationId(popID);
				System.out.println("***************** 查到参数："+la.getLaPopulationId());
				List<InfoLandlordExpand> lalist = infoLandlordMapper.selectAll(la);
				System.out.println("************** cha dao le ma ?:"+lalist.size());
				if(lalist.size() == 0){
					InfoLandlordExpand infoLandlordExpand = new InfoLandlordExpand();
					infoLandlordExpand.setLaPopulationId(popID);
					infoLandlordExpand.setLaUserId(infoHouse4storeExpand.getLaUserId());
					infoLandlordExpand.setLaDepartment(infoHouse4storeExpand.getLaDepartment());
					infoLandlordExpand.setLaStorefront(infoHouse4storeExpand.getLaStorefront());
					infoLandlordExpand.setLandlordOtherContact(infoHouse4storeExpand.getLandlordOtherContact());
					infoLandlordExpand.setLaSecondContacts(infoHouse4storeExpand.getLaSecondContacts());
					infoLandlordExpand.setLaSecondPhone(infoHouse4storeExpand.getLaSecondPhone());
					infoLandlordExpand.setLaOtherContact(infoHouse4storeExpand.getLaOtherContact());
					int result3 = infoLandlordMapper.insertSelective(infoLandlordExpand);
					int laId = infoLandlordExpand.getLandlordId();
					System.out.println("*********返回自増房东ID："+laId);
					if(result3==0){
						throw new Exception("房东新增失败-------------------- 22222 ");
					}else{
						landlordId = laId;
					}
					//修改人口表房东标识
					InfoPopulation ip2 = new InfoPopulation();
					ip2.setPopId(popID);
					ip2.setPopLandlord(1);
					int result4 = infoPopulationMapper.updateByPrimaryKeySelective(ip2);
					if(result4==0){
                        throw new Exception("修改人口表房东标识出错");
                    }
				}else{
					int laId = lalist.get(0).getLandlordId();
					landlordId = laId;
				}
			}else{
				JSONObject jsonObj = new JSONObject();
		        jsonObj.accumulate("name", list.get(0).getPopName());
		        jsonObj.accumulate("tel", list.get(0).getPopTelephone());
		        jsonObj.accumulate("ID", list.get(0).getPopIdcard());
		        String json = jsonObj.toString();
				return "-1###"+json;
			}
		}
		
		/*
		 * 添加未租房
		 */
		String hsTransactionPrice = infoHouse4storeExpand.getJrlPriceLadder().split(",")[0];
		infoHouse4storeExpand.setHsTransactionPrice(Double.valueOf(hsTransactionPrice));// 最新成交价
        infoHouse4storeExpand.setHsInPrice(Double.valueOf(hsTransactionPrice));// 当期成本价
		int result = infoHouse4storeMapper.insertSelective(infoHouse4storeExpand);
		if(result == 0){
			throw new Exception("未租房新增失败---------------");
		}
		int hsId = infoHouse4storeExpand.getHsId();
		
		/*
		 * 修改业主ID进未租房
		 */
		InfoHouse4storeExpand ihf = new InfoHouse4storeExpand();
		ihf.setHsId(hsId);
		ihf.setHsLandlordId(landlordId);
		int result4 = infoHouse4storeMapper.updateByPrimaryKeySelective(ihf);
		if(result4 == 0){
			throw new Exception("修改业主ID进未租房失败--------------------");
		}
		
		/*
		 * 开始添加合约
		 */
		String att = infoHouse4storeExpand.getAtt();
        String path = null;
        String num = null;
        if(att != null){
            JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
            if(attachment != null){
                path = attachment.getPath();
                num = attachment.getNum();
                int result6 = journalAttachmentMapper.deleteByAtt(att);
                if(result6 == 0){
                    throw new Exception("从附件表删除记录失败");
                }
            }
        }
		//添加合约属性
		InfoRenewalLandlordExpand rle = new InfoRenewalLandlordExpand();
		rle.setJrlHouse4storeId(hsId);
		rle.setJrlLandlordId(landlordId);
		rle.setJrlSignedTime(infoHouse4storeExpand.getJrlSignedTime());
		rle.setJrlBeginTime(infoHouse4storeExpand.getJrlBeginTime());
		rle.setJrlEndTime(infoHouse4storeExpand.getJrlEndTime());
		rle.setJrlUserId(infoHouse4storeExpand.getJrlUserId());
		rle.setJrlDepartment(infoHouse4storeExpand.getJrlDepartment());
		rle.setJrlStorefront(infoHouse4storeExpand.getJrlStorefront());
		rle.setJrlContractType(infoHouse4storeExpand.getJrlContractType());
		rle.setJrlTheTerm(infoHouse4storeExpand.getJrlTheTerm());
		rle.setJrlInAdvancePay(infoHouse4storeExpand.getJrlInAdvancePay());
		rle.setJrlRentFreeDays(infoHouse4storeExpand.getJrlRentFreeDays());
		rle.setJrlPaymentMethod(infoHouse4storeExpand.getJrlPaymentMethod());
		rle.setJrlRentFreeSegment(infoHouse4storeExpand.getJrlRentFreeSegment());
		rle.setJrlPriceLadder(infoHouse4storeExpand.getJrlPriceLadder());
		rle.setJrlRenewalCoding(infoHouse4storeExpand.getJcdIdjosn());
		rle.setJrlFreeDaysDecoration(infoHouse4storeExpand.getJrlFreeDaysDecoration());
		rle.setJrlFreeDaysHeader(infoHouse4storeExpand.getJrlFreeDaysHeader());
		rle.setAdminUser(infoHouse4storeExpand.getAdminUser());
		rle.setJrlImgPath(path);
		rle.setJrlImgNum(num);
		//验证免租期
		if(!validateFreePeriod(rle)){
			throw new Exception("验证免租期失败--------------------");
		}
		//新增房东合约记录
		int result5 = infoRenewalLandlordMapper.insertSelective(rle);
		if(result5 == 0){
			throw new Exception("新增房东合约记录失败--------------------");
		}
		jrlId = rle.getJrlId();
		//新增分期账单
		List<InfoContractInstallment> ici = new ArrayList<InfoContractInstallment>();
		String notRentingJson = infoHouse4storeExpand.getNotRentingJson();
		JSONArray nrJson =JSONArray.fromObject(notRentingJson);
		for (Object a : nrJson) {
			JSONObject jsonObj = (JSONObject)a;
			InfoContractInstallment jf = (InfoContractInstallment) JSONObject.toBean(jsonObj, InfoContractInstallment.class);
			jf.setJciHouse4storeId(hsId);
			jf.setJciLandlordId(landlordId);
			jf.setJciLandContId(jrlId);
			jf.setJciMessageTime(null);
			JSONObject obj = new JSONObject();
            obj.accumulate("auditStatus", "未审核");
            jf.setJciAudit(obj.toString());
			ici.add(jf);
		}
		int result6 = infoContractInstallmentMapper.insertList(ici);
		if(result6 == 0){
			throw new Exception("新增分期账单失败--------------------");
		}
		
		/*
		 * 修改盘源状态为已签约
		 */
		Integer houseId = infoHouse4storeExpand.getHsHouseId();
		InfoHouseExpand ih = new InfoHouseExpand();
		ih.setHouseCoding(houseId);
		ih.setHouseSignedState("已托管");
		int result7 = infoHouseMapper.updateByPrimaryKeySelective(ih);
		if(result7 == 0){
			throw new Exception("修改盘源状态为已签约失败--------------------");
		}
		
		//修改合约编号的状态
		SysVariables sysVar = new SysVariables();
		sysVar.setVariablesId(1);
		List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
		if(!sysVarList.isEmpty()){
		    sysVar = sysVarList.get(0);
		}
		if (sysVar.getContractNums() == 1) {
		    String jcdIdjosn = infoHouse4storeExpand.getJcdIdjosn();
	        if(jcdIdjosn != null && !jcdIdjosn.equals("")){
	            JSONArray js =JSONArray.fromObject(jcdIdjosn);
	            for (Object a : js) {
	                JSONObject jsonObj = (JSONObject)a;
	                InfoHouse4storeExpand hs = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
	                JournalContractDatabase jcd = new JournalContractDatabase();
	                jcd.setJcdId(hs.getJcdId());
	                jcd.setJcdUseState("已签约");
	                jcd.setJcdUsedType("托管");
	                jcd.setJcdHouseAddress(hs.getJcdHouseAddress());
	                jcd.setJcdContractPerson(hs.getAdminUser());
	                jcd.setJcdSigningTime(infoHouse4storeExpand.getJrlBeginTime());
	                int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
	                if(result3 == 0){
	                    throw new Exception("修改合约编号状态失败------------------------------");
	                }
	            }
	        }
		}
		
		/*
		 * 添加业绩受益人
		 */
		List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
		String jsonArray = infoHouse4storeExpand.getJsonArray();
		//InfoTransactionExpand poitam = new InfoTransactionExpand();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
			jf.setAssistHouse4store(hsId);
			recordList.add(jf);
		}
		int result8 = itamMapper.insertTAList(recordList);
		if(result8 == 0){
			throw new Exception("添加业绩受益人失败--------------------");
		}
		
		//添加资产
		List<SysAssetsExpand> assetList = new ArrayList<SysAssetsExpand>();
        SysAssetsExpand sysAssetsExpand = new SysAssetsExpand();
        JSONArray ja2 = JSONArray.fromObject(infoHouse4storeExpand.getAddAsset());
        if (ja2.size() > 0) {
            for (Object obj : ja2) {
                JSONObject jsonObj = (JSONObject) obj;
                SysAssetsExpand sat = (SysAssetsExpand) JSONObject.toBean(jsonObj, SysAssetsExpand.class);
                sat.setSaHouseStoreId(hsId);
                sat.setSaHouseId(infoHouse4storeExpand.getHsHouseId());
                assetList.add(sat);
            }
            String assetJson = JSONUtil.serialize(assetList);
            sysAssetsExpand.setJsonArray(assetJson);
            sysAssetsService.insertAssets(sysAssetsExpand);
        }
        
        //写跟进
        JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
        jhf.setJhfHouseId(infoHouse4storeExpand.getHsHouseId());
        jhf.setJhfHouse4storeId(hsId);
        jhf.setJhfUserId(infoHouse4storeExpand.getLaUserId());
        jhf.setJhfDepartment(infoHouse4storeExpand.getLaDepartment());
        jhf.setJhfStorefront(infoHouse4storeExpand.getLaStorefront());
        jhf.setJhfFollowTime(CommonMethodClass.getCurrentDateSecond());
        jhf.setJhfFollowRemark(CommonMethodClass.getCurrentDateSecond()+",录入托管房！");
        jhf.setJhfPaymentWay("系统跟进");
        jhf.setJhfFollowResult("签约成功");
        journalHousingFollowMapper.insertSelective(jhf);
		
		JSONObject jsonObj = new JSONObject();
        jsonObj.accumulate("hsId", hsId);
        String str = jsonObj.toString();
		return "1###"+str;
	}
	
	/**
	 * 免租期时段验证
	 */
	private boolean validateFreePeriod(InfoRenewalLandlordExpand infoRenewalLandlordExpand){
		try{
			System.out.println(infoRenewalLandlordExpand.getJrlRentFreeSegment());
			String[] rentFreeSegment = infoRenewalLandlordExpand.getJrlRentFreeSegment().split(",");//免租期
			System.out.println("rentFreeSegment.length:"+rentFreeSegment.length);
			//判断免租期段是否有值
			if(rentFreeSegment.length==0){
				System.out.println("免租期验证："+"没有免租期");
				return false;
			}
			for(int i=0;i<rentFreeSegment.length;i++){
				String[] one = rentFreeSegment[i].split("#");
				//判断传来的时间字符串格式是否正确
				for(int j = 0;j<one.length;j++){
					System.out.println("one[j]:"+one[j]);
					if(!CommonMethodClass.juDate(one[j])){
						System.out.println("免租期验证："+"免租期格式不正确");
						return false;
					}
				}
				/*
				（因需求改了，允许每年免租期总天数不一样，故不再验证）
				//判断时间字符串是否符合实际
				int before = 0;
				int after = 0;
				if(!one[0].equals(one[1])){
					//获取天数差
					before = CommonMethodClass.getDayDiff(one[0],one[1])+1;
				}
				if(!one[2].equals(one[3])){
					//获取天数差
					after = CommonMethodClass.getDayDiff(one[2],one[3])+1;
				}
				//两个时间段（开始~结束）的差（%）以12是否等与0，等于0则为一整年，不等于0则用 flag 标记
				int flag = 0;//整年标记
				int[] rs = CommonMethodClass.getYearMonthDay(infoRenewalLandlordExpand.getJrlBeginTime(),infoRenewalLandlordExpand.getJrlEndTime());
		        if (rs[1] > 0 || rs[2] > 0) {
		            flag = 1;
		        }
				//判断免租期天数是否正确
				for(int k=0;i<rentFreeSegment.length;++i){
					//非最后一年免租期天数判断
					if(i<rentFreeSegment.length-1){
						if((before+after) != infoRenewalLandlordExpand.getJrlRentFreeDays()){
							System.out.println("免租期验证："+"天数错误，年前加年尾不等于总免租天数");
							return false;
						}
					}
					//最后一年，整年的判断，非整年的不判断
					if(i==rentFreeSegment.length-1 && flag == 0){
						if((before+after) != infoRenewalLandlordExpand.getJrlRentFreeDays()){
							System.out.println("免租期验证："+"天数错误，年前加年尾不等于总免租天数");
							return false;
						}
					}
				}
				*/
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			return false;
		}
	}
	
    /**
     * 添加集中房
     * 1.添加未租
     * 2.添加集中房
     * 3.
     */
    @Override
    public String insertSplitHouseForStore(InfoHouse4storeExpand conditions) throws Exception {
        String res;
        String[] res2;
        String splitJson = conditions.getSplitJson();
		JSONArray ja =JSONArray.fromObject(splitJson);
        if (conditions.getAddHsHouseType() == 1) {//有资料房
            //添加未租房
        	res = insertNotRentAComprehensiveNew(conditions);
        	
        }else {
            //无资料房添加未租
    		res = insertNoRoomAdditions(conditions);
       	}
        res2 = res.split("###");//code值###hsId code==1:有hsId code==-1:添加未租房失败
        //补充hsId
        if(res2[0].equals("1")){
            String jsonStr = res2[1];
            JSONObject jsonObj = new JSONObject();
            jsonObj = JSONObject.fromObject(jsonStr);
            conditions.setHsId(jsonObj.getInt("hsId"));
        }else{
            return res;
        }
        //补充hsLandlordId
        List<InfoHouse4storeExpand> list1 = infoHouse4storeMapper.selectByPrimaryKey(conditions.getHsId());
        conditions.setHsLandlordId(list1.get(0).getHsLandlordId());
        int result = splitRentHouse(conditions, 2);
        return result + "";
    }

	/**
	 * 添加合租房/集中房
	 * 没被拆的未租房拆分为合租房，已被拆的未租房新增合租房
     * houseType=1 合租房
     * houseType=2 集中房
	 * 
	 * conditions:包含未租表所有字段信息
	 */
	@Override
	public int splitRentHouse(InfoHouse4storeExpand conditions, int houseType) throws Exception {
		//取出所需的字段
		Integer hsId = conditions.getHsId();
		String splitJson = conditions.getSplitJson();
		
		//修改拆分标识
        InfoHouse4storeExpand spliths = new InfoHouse4storeExpand();
		if(houseType ==  1){
			spliths.setHsId(hsId);
			spliths.setHsNotRentSplit(1);
		}else if(houseType ==  2){
            spliths.setHsId(hsId);
            spliths.setHsNotRentSplit(2);
        }
		infoHouse4storeMapper.updateByPrimaryKeySelective(spliths);
		
		//清除不需要的字段
		conditions.setHsId(null);
		conditions.setHsHouseDeposit(null);
		conditions.setHsDecorationHoliday(null);
		conditions.setHsBase(null);
		conditions.setHsRelationsCost(null);
		conditions.setHsManagedCost(null);
		if(houseType == 2 && conditions.getHsMeterReadingRecord()!=null){
			conditions.setHsMeterReadingRecord(conditions.getHsMeterReadingRecord().substring(1,conditions.getHsMeterReadingRecord().length()-1));
		}

		JSONObject joHs = JSONObject.fromObject(conditions);
		InfoHouse4storeExpand joIhe =  (InfoHouse4storeExpand) JSONObject.toBean(joHs, InfoHouse4storeExpand.class);
		
		//拆分的合租房/集中房信息
		JSONArray ja =JSONArray.fromObject(splitJson);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoHouse4storeExpand hs = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
			joIhe.setHsPrimitiveMother(hsId);
			joIhe.setHsSplitIdentifier(hs.getHsSplitIdentifier());
			if(houseType==1){//合租房
			    joIhe.setHsAddDoorplateno(conditions.getHsAddDoorplateno()+"-"+hs.getHsSplitIdentifier());
			}else if(houseType==2){//集中房
                joIhe.setHsAddCommunity(hs.getHsAddCommunity());
                joIhe.setHsAddBuilding(hs.getHsAddBuilding());
                joIhe.setHsAddDoorplateno(hs.getHsSplitIdentifier());
                //用母房的省市区片区街道楼盘名称去房屋字典查有没有，得到字典id
                String community=hs.getHsAddCommunity();
                String province=conditions.getHsAddProvince();
                String city=conditions.getHsAddCity();
                String district=conditions.getHsAddDistrict();
                String zone=conditions.getHsAddZone();
                String road=conditions.getHsAddStreet();
                SysHouseDictExpand dict = new SysHouseDictExpand();
                dict.setHdProvince(province);
                dict.setHdCity(city);
                dict.setHdDistrict(district);
                dict.setHdZone(zone);
                dict.setHdCommunity(community);
                dict.setHdRoad(road);
              
           //setDictId
                List<SysHouseDictExpand> list =houseDictService.selectAddDict(dict);
                
                if(list.size() >0) {
                	Integer dictId=list.get(0).getHdId();
                	joIhe.setHsHouseDictId(dictId);
                }
                else {
                	SysHouseDictExpand dict1 = new SysHouseDictExpand();
                	dict1.setHdCommunity(community);
                	dict1.setHdProvince(province);
                	dict1.setHdCity(city);
                	dict1.setHdDistrict(district);
                	dict1.setHdZone(zone);
                	dict1.setHdRoad(road);
                	int li=  houseDictService.insertSelective(dict1);
                	joIhe.setHsHouseDictId(dict1.getHdId());
                }
                
            }
			System.out.println(joIhe.getHsHouseOwner());
			joIhe.setHsHouseNote(hs.getHsHouseNote());
			joIhe.setHsHouseSquare(hs.getHsHouseSquare());
			joIhe.setHsSectionType(hs.getHsSectionType());
			joIhe.setHsHouseOwner(hs.getHsHouseOwner());
			joIhe.setHsVacancyDay(hs.getHsVacancyDay());
			joIhe.setHsGuidePrice(hs.getHsGuidePrice());
			joIhe.setHsPriceLadder(hs.getHsPriceLadder());
			joIhe.setHsHouseDirection(hs.getHsHouseDirection());
			joIhe.setHsWaterVolFirst(hs.getHsWaterVolFirst());
			joIhe.setHsElectritVolFirst(hs.getHsElectritVolFirst());
			joIhe.setHsGasVolFirst(hs.getHsGasVolFirst());
			
			joIhe.setHsHotWaterVolFirst(hs.getHsHotWaterVolFirst());
			joIhe.setHsHotAirVolFirst(hs.getHsHotAirVolFirst());
			
			
			joIhe.setHsNotRentSplit(null);
			joIhe.setHsRegisterTime(CommonMethodClass.getCurrentDateSecond());
			joIhe.setHsInPrice(0.00);
			joIhe.setHsUserId(conditions.getLaUserId());
			int result1 = infoHouse4storeMapper.insertSelective(joIhe);
			if(result1 != 1){
				throw new Exception("合租房/集中房添加失败");
			}
			Integer joIheHsId = joIhe.getHsId();
			JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
			jhf.setJhfHouseId(conditions.getHsHouseId());
			jhf.setJhfHouse4storeId(joIheHsId);
			jhf.setJhfUserId(conditions.getLaUserId());
			jhf.setJhfDepartment(conditions.getLaDepartment());
			jhf.setJhfStorefront(conditions.getLaStorefront());
			jhf.setJhfFollowTime(CommonMethodClass.getCurrentDateSecond());
			if(houseType==1){
			    jhf.setJhfFollowRemark("生成合租房");
			}else if (houseType==2) {
			    jhf.setJhfFollowRemark("生成集中房");
			}
			jhf.setJhfPaymentWay("系统跟进");
			jhf.setJhfFollowResult("跟进成功");
			journalHousingFollowMapper.insertSelective(jhf);
		}
		return 1;
	}
	
	//设置合租房/集散房
	@Override
	public int flatShareRealChange(InfoHouse4storeExpand conditions, int houseType) throws Exception {
		//取出json
		String splitJson = conditions.getSplitJson();
		JSONArray ja =JSONArray.fromObject(splitJson);
		for (Object a : ja) {
		    //改未租
			JSONObject jsonObj = (JSONObject)a;
			InfoHouse4storeExpand hs = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
			if(houseType==1){//合租房
				hs.setHsAddDoorplateno(conditions.getHsAddDoorplateno()+"-"+hs.getHsSplitIdentifier());
			}else if(houseType==2){//集中房
				hs.setHsAddDoorplateno(hs.getHsSplitIdentifier());
				infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
            }
			//改已租
			InfoHouse4rentExpand ihe = new InfoHouse4rentExpand();
			ihe.setHrHouse4storeId(hs.getHsId());
			ihe.setHrSplitIdentifier(hs.getHsSplitIdentifier());
			if(houseType==1){//合租房
				ihe.setHrAddDoorplateno(conditions.getHsAddDoorplateno()+"-"+hs.getHsSplitIdentifier());
			}else if(houseType==2){//集中房
				ihe.setHrAddDoorplateno(hs.getHsSplitIdentifier());
            }
			infoHouse4rentMapper.updateSplitIdentifier(ihe);
		}
		return 1;
	}
	
	//设置合租房/集散房只改一条数据，不需要从json解析
	public int flatShareRealChange2(InfoHouse4storeExpand hs, int houseType) throws Exception {
	    //改未租
		if(houseType==1){//合租房
			hs.setHsAddDoorplateno(hs.getHsAddDoorplateno()+"-"+hs.getHsSplitIdentifier());
		}else if(houseType==2){//集中房
			hs.setHsAddDoorplateno(hs.getHsSplitIdentifier());
        }
		infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
		//改已租
		InfoHouse4rentExpand ihe = new InfoHouse4rentExpand();
		ihe.setHrHouse4storeId(hs.getHsId());
		ihe.setHrSplitIdentifier(hs.getHsSplitIdentifier());
		if(houseType==1){//合租房
			ihe.setHrAddDoorplateno(hs.getHsAddDoorplateno()+"-"+hs.getHsSplitIdentifier());
		}else if(houseType==2){//集中房
			ihe.setHrAddDoorplateno(hs.getHsSplitIdentifier());
        }
		infoHouse4rentMapper.updateSplitIdentifier(ihe);
		return 1;
	}
	
	//根据母房id查询子房
	@Override
	public List<InfoHouse4storeExpand> flatShareRealQuery(
			InfoHouse4storeExpand conditions) throws Exception {
		//获取未租房id
		Integer hsId = conditions.getHsId();
		InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		hs.setHsPrimitiveMother(hsId);
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.flatShareRealQuery(hs);
		return hsList;
	}
	
	//合租房还原未租房
	@Override
	public int reductionOfRent(InfoHouse4storeExpand conditions) throws Exception {
		//获取未租房id
		int num = 1;
		Integer hsId = conditions.getHsId();
		InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		hs.setHsPrimitiveMother(hsId);
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.flatShareRealQuery(hs);
		if(hsList.size() != 0){
			num = 2;
			System.out.println("还存在合租房");
		}else{
			hs.setHsId(hsId);
			hs.setHsNotRentSplit(0);
			hs.setHsPrimitiveMother(null);
			int result = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
			if(result == 0){
				throw new Exception("合租房还原未租房失败");
			}
		}
		return num;
	}
	
	//集散房还原未租房
	@Override
	public int centralizedReduction(InfoHouse4storeExpand conditions) throws Exception {
		Integer hsId = conditions.getHsId();
		InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		hs.setHsPrimitiveMother(hsId);
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.flatShareRealQuery(hs);
		int result = 0;
		for (InfoHouse4storeExpand item : hsList) {
			result = deleteCentralizedApartment(item);
			if (result != 1) {
				throw new Exception("删除集中房失败");
			}
		}
		hs.setHsId(hsId);
		hs.setHsNotRentSplit(0);
		hs.setHsPrimitiveMother(null);
		result = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
		if(result == 0){
			throw new Exception("集散房还原未租房失败");
		}
		return 1;
	}
	
	//无资料房添加未租
	@Override
	public String insertNoRoomAdditions(InfoHouse4storeExpand conditions) throws Exception {
		Integer popId = null; //人口id
		Integer laId = null ; //业主id
		Integer lipId = null; // 房东意向人id
		Integer hsId = null; //未租房Id
		Integer hdId = null; // 楼盘字典id
		Integer ihId = null; //盘源id
		Integer jrlId = null; // 合约id
		
		Integer userId = conditions.getHsUserId(); //登记人
		Integer adminUserId = conditions.getHsAdminUserId(); // 管家，主单人
		Integer storefront = conditions.getHsStorefront(); // 区域
		Integer department = conditions.getHsDepartment(); // 部门
		String city = conditions.getHsAddCity(); //市
		String district = conditions.getHsAddDistrict();// 城区
		String zone = conditions.getHsAddZone(); // 街区
		String community = conditions.getHsAddCommunity(); //小区
		
		//获取传入的业主姓名、身份证、联系方式
		String laPopName = conditions.getLaPopName(); // 业主姓名
		String laPopIdcard = conditions.getLaPopIdcard(); // 身份证
		String laPopTelephone = conditions.getLaPopTelephone(); // 联系方式
		
		//判断有无身份证
		if(laPopIdcard == null || laPopIdcard.equals("")){
			return "-22";
		}
		
		//匹配楼盘字典，获取id
		SysHouseDictExpand syshd = new SysHouseDictExpand();
		syshd.setHdCity(city);
		syshd.setHdDistrict(district);
		syshd.setHdZone(zone);
		syshd.setHdCommunity(community);
		List<SysHouseDictExpand> hdList = sysHouseDictMapper.selectAll(syshd);
		if(hdList.size() == 0){
			return "-4";
		}
		hdId = hdList.get(0).getHdId();
		
		//判断此房是否在，盘源已经存在。
		InfoHouseExpand he1 = new InfoHouseExpand();
		he1.setAddCity(city);
		he1.setAddDistrict(district);
		he1.setAddZone(zone);
		he1.setAddCommunity(community);
		he1.setAddBuilding(conditions.getHsAddBuilding());
		he1.setAddDoorplateno(conditions.getHsAddDoorplateno());
		//查询是否已经存在
		List<InfoHouseExpand> heList = infoHouseMapper.queryHousePaperCommon(he1);
		if(heList.size() != 0){
			//已经存在相同的盘源
			return "-5";
		}
		
		//判断此房是否在，未租中已经存在。
		InfoHouse4storeExpand hs1 = new InfoHouse4storeExpand();
		hs1.setHsAddCity(city);
		hs1.setHsAddDistrict(district);
		hs1.setHsAddZone(zone);
		hs1.setHsAddCommunity(community);
		hs1.setHsAddBuilding(conditions.getHsAddBuilding());
		hs1.setHsAddDoorplateno(conditions.getHsAddDoorplateno());
		//查询是否已经存在
		List<InfoHouse4storeExpand> hs1List = infoHouse4storeMapper.queryHouseStoreCommon(hs1);
		if(hs1List.size() != 0){
			//已经存在相同的未租房
			return "-6";
		}
		
		/*
		 * 添加人口表
		 */
		//设置数据
		InfoPopulation pop = new InfoPopulation();
		pop.setPopIdcard(laPopIdcard);
		//根据身份证查询人口表有无此人，无则新增，有则取出id
		List<InfoPopulation> popList = infoPopulationMapper.newModifiedJudgmentQuery(pop);
		if(popList.size() == 0){
			System.out.println("走这里1");
			pop.setPopName(laPopName);
			pop.setPopTelephone(laPopTelephone);
			pop.setPopUser(userId);
			pop.setPopNameRemark(conditions.getPopNameRemark());
			pop.setPopLandlord(1);
			pop.setPopPassword(laPopTelephone);
			//执行添加
			int result = infoPopulationMapper.insertSelective(pop);
			if(result != 1){
				throw new Exception("添加人口表失败!!!!");
			}
			//获取返回的人口id
			popId = pop.getPopId();
		}else{
			System.out.println("走这里2");
			String name = popList.get(0).getPopName();
			if(name.equals(laPopName)){
				popId = popList.get(0).getPopId();
			}else{
				JSONObject jsonObj = new JSONObject();
		        jsonObj.accumulate("name", popList.get(0).getPopName());
		        jsonObj.accumulate("tel",  popList.get(0).getPopTelephone());
		        jsonObj.accumulate("ID",  popList.get(0).getPopIdcard());
		        String json = jsonObj.toString();
				return "-21###"+json;
			}	
		}
		/*
		 * 添加房东意向人
		 */
		//设置数据
		InfoLandlordIntentionPerson lip = new InfoLandlordIntentionPerson();
		lip.setLipLandlordName(laPopName);
		lip.setLipLandlordPhone(laPopTelephone);
		//查询是否存在，不存在则新增
		List<InfoLandlordIntentionPerson> liplist = infoLandlordIntentionPersonMapper.selectByPrimaryKey(lip);
		if(liplist.size() == 0){
			lip.setLipRegistrar(userId);
			//执行添加
			int result1 = infoLandlordIntentionPersonMapper.insertSelective(lip);
			if(result1 != 1){
				throw new Exception("添加房东意向人失败!!!!");
			}
			lipId = lip.getLipId();
		}else{
			lipId = liplist.get(0).getLipId();
		}
		
		/*
		 * 添加房东
		 */
		//设置数据
		InfoLandlordExpand la = new InfoLandlordExpand();
		la.setLaPopulationId(popId);
		//根据人口id查询，无则新增，有则取出id
		List<InfoLandlordExpand> laList = infoLandlordMapper.landlordName(la);
		if(laList.size() == 0){
			la.setLaUserId(userId);
			la.setLaStorefront(storefront);
			la.setLaDepartment(department);
			//执行添加
			int reslut = infoLandlordMapper.insertSelective(la);
			if(reslut == 0){
				throw new Exception("添加房东失败!!!!");
			}
			//获取返回的业主id
			laId = la.getLandlordId();
            //修改人口表房东标识
            InfoPopulation ip2 = new InfoPopulation();
            ip2.setPopId(popId);
            ip2.setPopLandlord(1);
            int result4 = infoPopulationMapper.updateByPrimaryKeySelective(ip2);
            if(result4==0){
                throw new Exception("修改人口表房东标识出错");
            }
		}else{
			laId = laList.get(0).getLandlordId();
		}
		
		/*
		 * 添加盘源房
		 */
		//设置数据
		InfoHouseExpand he = new InfoHouseExpand();
		System.out.println(he.getHsHouseOwner());
		he.setUserId(userId);
		he.setLandlordId(laId);
		he.setHouseDictId(hdId);
		he.setStorefront(storefront);
		he.setDepartment(department);
		he.setHousePeople4rent(adminUserId);
		he.setHouseLipId(lipId);
		he.setSectionType(conditions.getHsSectionType());
		he.setHouseDirection(conditions.getHsHouseDirection());
		he.setStoreSquare(conditions.getHsHouseSquare());
		he.setHouseOwner(conditions.getHsHouseOwner());
		he.setAddCity(city);
		he.setAddDistrict(district);
		he.setAddZone(zone);
		he.setAddStreet(hdList.get(0).getHdRoad());
		he.setAddCommunity(community);
		he.setAddBuilding(conditions.getHsAddBuilding());
		he.setAddDoorplateno(conditions.getHsAddDoorplateno());
		he.setStateOwned("私盘");
		he.setHouseState("可租");
		he.setHouseSignedState("已托管");
		he.setHouseEntrust4rent("是");
		//执行添加
		int result = infoHouseMapper.insertSelective(he);
		if(result == 0){
			throw new Exception("添加盘源房失败!!!!");
		}
		ihId = he.getHouseCoding();
		
		/*
		 * 添加未租房
		 */
		//设置数据
		InfoHouse4storeExpand hs = conditions;
		hs.setHsLandlordId(laId);
		hs.setHsHouseId(ihId);
		String hsTransactionPrice = hs.getJrlPriceLadder().split(",")[0];
		hs.setHsTransactionPrice(Double.valueOf(hsTransactionPrice));// 最新成交价
		hs.setHsInPrice(Double.valueOf(hsTransactionPrice));// 当期成本价
		System.out.println(hs.toString());
		int result1 = infoHouse4storeMapper.insertSelective(hs);
		if(result1 == 0){
			throw new Exception("添加未租房失败!!!!");
		}
		hsId = hs.getHsId();
		
		/*
		 * 添加合约
		 */
		String att = conditions.getAtt();
        String path = null;
        String num = null;
        if(att != null){
            JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
            if(attachment != null){
                path = attachment.getPath();
                num = attachment.getNum();
                int result6 = journalAttachmentMapper.deleteByAtt(att);
                if(result6 == 0){
                    throw new Exception("从附件表删除记录失败");
                }
            }
        }
		InfoRenewalLandlordExpand jrl = new InfoRenewalLandlordExpand();
		jrl.setJrlHouse4storeId(hsId);
		jrl.setJrlLandlordId(laId);
		jrl.setJrlSignedTime(hs.getJrlSignedTime());
		jrl.setJrlBeginTime(hs.getJrlBeginTime());
		jrl.setJrlEndTime(hs.getJrlEndTime());
		jrl.setJrlUserId(hs.getJrlUserId());
		jrl.setJrlDepartment(hs.getJrlDepartment());
		jrl.setJrlStorefront(hs.getJrlStorefront());
		jrl.setJrlContractType(hs.getJrlContractType());
		jrl.setJrlTheTerm(hs.getJrlTheTerm());
		jrl.setJrlInAdvancePay(hs.getJrlInAdvancePay());
		jrl.setJrlRentFreeDays(hs.getJrlRentFreeDays());
		jrl.setJrlPaymentMethod(hs.getJrlPaymentMethod());
		jrl.setJrlRentFreeSegment(hs.getJrlRentFreeSegment());
        jrl.setJrlFreeDaysDecoration(hs.getJrlFreeDaysDecoration());
        jrl.setJrlFreeDaysHeader(hs.getJrlFreeDaysHeader());
		jrl.setJrlPriceLadder(hs.getJrlPriceLadder());
		jrl.setJrlRenewalCoding(hs.getJcdIdjosn());
		jrl.setAdminUser(hs.getAdminUser());
		jrl.setJrlImgPath(path);
		jrl.setJrlImgNum(num);
		System.out.println(jrl);
		//验证免租期
		if(!validateFreePeriod(jrl)){
			throw new Exception("验证免租期失败--------------------");
		}
		//新增房东合约记录
		int result5 = infoRenewalLandlordMapper.insertSelective(jrl);
		if(result5 == 0){
			throw new Exception("新增房东合约记录失败--------------------");
		}
		jrlId = jrl.getJrlId();
		jrl.setJrlId(jrlId);
		
		/*
		 * 添加分期账单
		 */
		//新增分期账单
		List<InfoContractInstallment> ici = new ArrayList<InfoContractInstallment>();
		String notRentingJson = conditions.getNotRentingJson();
		JSONArray nrJson =JSONArray.fromObject(notRentingJson);
		for (Object a : nrJson) {
			JSONObject jsonObj = (JSONObject)a;
			InfoContractInstallment jf = (InfoContractInstallment) JSONObject.toBean(jsonObj, InfoContractInstallment.class);
			jf.setJciHouse4storeId(hsId);
			jf.setJciLandlordId(laId);
			jf.setJciLandContId(jrlId);
			jf.setJciMessageTime(null);
			JSONObject obj = new JSONObject();
            obj.accumulate("auditStatus", "未审核");
            jf.setJciAudit(obj.toString());
			ici.add(jf);
		}
		int result6 = infoContractInstallmentMapper.insertList(ici);
		if(result6 == 0){
			throw new Exception("新增分期账单失败--------------------");
		}
		
		//修改合约编号的状态
		SysVariables sysVar = new SysVariables();
		sysVar.setVariablesId(1);
		List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
		if(!sysVarList.isEmpty()){
		    sysVar = sysVarList.get(0);
		}
		if (sysVar.getContractNums() == 1) {
		    String jcdIdjosn = conditions.getJcdIdjosn();
	        if(jcdIdjosn != null && !jcdIdjosn.equals("")){
	            JSONArray js =JSONArray.fromObject(jcdIdjosn);
	            for (Object a : js) {
	                JSONObject jsonObj = (JSONObject)a;
	                InfoHouse4storeExpand hslist = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
	                JournalContractDatabase jcd = new JournalContractDatabase();
	                jcd.setJcdId(hslist.getJcdId());
	                jcd.setJcdUseState("已签约");
	                jcd.setJcdUsedType("存房");
	                jcd.setJcdHouseAddress(hslist.getJcdHouseAddress());
	                jcd.setJcdContractPerson(hslist.getAdminUser());
	                jcd.setJcdSigningTime(conditions.getJrlBeginTime());
	                int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
	                if(result3 == 0){
	                    throw new Exception("修改合约编号状态失败------------------------------");
	                }
	            }
	        }
		}
		
		/*
		 * 添加业绩受益人
		 */
		List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
		String jsonArray = conditions.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
			jf.setAssistHouse4store(hsId);
			recordList.add(jf);
		}
		int result7 = itamMapper.insertTAList(recordList);
		if(result7 == 0){
			throw new Exception("添加业绩受益人失败--------------------");
		}
		
		//添加资产
        List<SysAssetsExpand> assetList = new ArrayList<SysAssetsExpand>();
        SysAssetsExpand sysAssetsExpand = new SysAssetsExpand();
        JSONArray ja2 = JSONArray.fromObject(conditions.getAddAsset());
        if (ja2.size() > 0) {
            for (Object obj : ja2) {
                JSONObject jsonObj = (JSONObject) obj;
                SysAssetsExpand sat = (SysAssetsExpand) JSONObject.toBean(jsonObj, SysAssetsExpand.class);
                sat.setSaHouseStoreId(hsId);
                sat.setSaHouseId(ihId);
                assetList.add(sat);
            }
            String assetJson = JSONUtil.serialize(assetList);
            sysAssetsExpand.setJsonArray(assetJson);
            sysAssetsService.insertAssets(sysAssetsExpand);
        }
        
        //写跟进
        JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
        jhf.setJhfHouseId(conditions.getHsHouseId());
        jhf.setJhfHouse4storeId(hsId);
        jhf.setJhfUserId(conditions.getLaUserId());
        jhf.setJhfDepartment(conditions.getLaDepartment());
        jhf.setJhfStorefront(conditions.getLaStorefront());
        jhf.setJhfFollowTime(CommonMethodClass.getCurrentDateSecond());
        jhf.setJhfFollowRemark(CommonMethodClass.getCurrentDateSecond()+",录入托管房！");
        jhf.setJhfPaymentWay("系统跟进");
        jhf.setJhfFollowResult("签约成功");
        journalHousingFollowMapper.insertSelective(jhf);
        
		JSONObject jsonObj = new JSONObject();
        jsonObj.accumulate("ihId", ihId);
        jsonObj.accumulate("hsId", hsId);
        String json1 = jsonObj.toString();
		return "1###"+json1;
	}
    @Override
    public int countVacantHouse(String state) {
        return infoHouse4storeMapper.countVacantHouse(state);
    }
    
    //房管员、默认联系人的姓名联系方式
	@Override
	public InfoHouse4storeExpand publishAContact(InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.publishAContact(conditions);
	}
    @Override
    public List<InfoHouse4storeExpand> getInfoHouse4storeNum(
            InfoHouse4storeExpand conditions) throws Exception {
        return infoHouse4storeMapper.getInfoHouse4storeNum(conditions);
    }
    //未租查询维保的
	@Override
	public List<InfoHouse4storeExpand> queryMaintenance(InfoHouse4storeExpand conditions) throws Exception {
		return infoHouse4storeMapper.queryMaintenance(conditions);
	}
    @Override
    public List<InfoHouse4storeExpand> queryHouseStore(
            InfoHouse4storeExpand conditions) throws Exception {
        return infoHouse4storeMapper.queryHouseStore(conditions);
    }
    @Override
    public List<InfoHouse4storeExpand> queryHouseStoreCommon(
            InfoHouse4storeExpand conditions) throws Exception {
        return infoHouse4storeMapper.queryHouseStoreCommon(conditions);
    }
    
    /**
     * 设置集中房，涉及新增、修改、删除
     */
	@Override
	public int updateCentralizedApartment(InfoHouse4storeExpand conditions) throws Exception {
		String splitJson = conditions.getSplitJson();
		JSONArray ja =JSONArray.fromObject(splitJson);
		
		List<InfoHouse4storeExpand> list1 = new ArrayList<InfoHouse4storeExpand>();//已经存在的
		List<InfoHouse4storeExpand> list2 = new ArrayList<InfoHouse4storeExpand>();//本次新增的
		List<InfoHouse4storeExpand> list3 = new ArrayList<InfoHouse4storeExpand>();//原先所有的子房
		List<InfoHouse4storeExpand> list4 = new ArrayList<InfoHouse4storeExpand>();//待删除的，根据list1和list3可以算出
		List<InfoHouse4storeExpand> list5 = new ArrayList<InfoHouse4storeExpand>();//已经存在的
		
		Integer hsId = null;
		InfoHouse4storeExpand motherHouse = new InfoHouse4storeExpand();
		
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoHouse4storeExpand hs = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
			if(hs.getHsNotRentSplit() != null && hs.getHsNotRentSplit() == 2){//原先所有的子房
				hsId = hs.getHsId();
				motherHouse = hs;
				list3 = flatShareRealQuery(hs);
			}else if(hs.getHsId() != null){//已经存在的
				list1.add(hs);
			}else{//本次新增的
				list2.add(hs);
			}
		}
		System.out.println(list1+"+++++++++++++++++++++++++++++++");
		list4 = getDiff(list3, list1);//待删除的
		int result = 0;
		//1.删除
		for (InfoHouse4storeExpand item : list4) {
			result = deleteCentralizedApartment(item);
			if (result != 1) {
				throw new Exception("设置集中房删除失败");
			}
		}
		//2.新增
		JSONArray ja2 = JSONArray.fromObject(list2);
		System.out.println(ja2+"--------------");
		motherHouse.setSplitJson(ja2.toString());
		result = splitRentHouse(motherHouse, 2);
		if (result != 1) {
			throw new Exception("设置集中房新增失败");
		}
		//3.修改
		for (InfoHouse4storeExpand item : list1) {
			InfoHouse4storeExpand update = new InfoHouse4storeExpand();
			System.out.println(update.getHsHouseOwner());
			update.setHsId(item.getHsId());
			update.setHsAddCommunity(item.getHsAddCommunity());
			update.setHsAddBuilding(item.getHsAddBuilding());
			update.setHsSplitIdentifier(item.getHsSplitIdentifier());
			update.setHsSectionType(item.getHsSectionType());
			update.setHsHouseDirection(item.getHsHouseDirection());
			update.setHsHouseSquare(item.getHsHouseSquare());
			update.setHsHouseOwner(item.getHsHouseOwner());
			update.setHsGuidePrice(item.getHsGuidePrice());
			update.setHsWaterVolFirst(item.getHsWaterVolFirst());
			update.setHsElectritVolFirst(item.getHsElectritVolFirst());
			update.setHsGasVolFirst(item.getHsGasVolFirst());
			
			update.setHsHotWaterVolFirst(item.getHsHotWaterVolFirst());
			update.setHsHotAirVolFirst(item.getHsHotAirVolFirst());
			
			//设置集散房到字典
			String community=update.getHsAddCommunity();
            String province=motherHouse.getHsAddProvince();
            String city=motherHouse.getHsAddCity();
            String district=motherHouse.getHsAddDistrict();
            String zone=motherHouse.getHsAddZone();
            String road=motherHouse.getHsAddStreet();

            SysHouseDictExpand housedict = new SysHouseDictExpand();
            housedict.setHdProvince(province);
            housedict.setHdCity(city);
            housedict.setHdDistrict(district);
            housedict.setHdZone(zone);
            housedict.setHdCommunity(community);
            housedict.setHdRoad(road);
            
            List<SysHouseDictExpand> list =houseDictService.selectAddDict(housedict);
            if(list.size() >0) {
            	Integer dictId1=list.get(0).getHdId();
            	update.setHsHouseDictId(dictId1);
            }
            else {
            	SysHouseDictExpand dict1 = new SysHouseDictExpand();
            	dict1.setHdCommunity(community);
            	dict1.setHdProvince(province);
            	dict1.setHdCity(city);
            	dict1.setHdDistrict(district);
            	dict1.setHdZone(zone);
            	dict1.setHdRoad(road);
            	int li=  houseDictService.insertSelective(dict1);
            	update.setHsHouseDictId(dict1.getHdId());
            }
			
			result = flatShareRealChange2(update, 2);
			if (result != 1) {
				throw new Exception("设置集散房修改失败");
			}
		}
		return 1;
	}
	
	//计算待删除的子房
	public List<InfoHouse4storeExpand> getDiff(List<InfoHouse4storeExpand> list1, List<InfoHouse4storeExpand> list2) {           
        Map<Integer,Integer> map = new HashMap<Integer,Integer>();
        List<InfoHouse4storeExpand> diff = new ArrayList<InfoHouse4storeExpand>();
        List<InfoHouse4storeExpand> maxList = list1;
        List<InfoHouse4storeExpand> minList = list2;
        if(list2.size()>list1.size()){
            maxList = list2;
            minList = list1;
        }
        
        for (InfoHouse4storeExpand item : maxList) {
           map.put(item.getHsId(), 1);                    
        }
        
        for (InfoHouse4storeExpand item : minList) {
            Integer cc = map.get(item.getHsId());                    
            if(cc!=null){
                map.put(item.getHsId(), ++cc);
                continue;                    
            }           
            map.put(item.getHsId(), 1);                    
        }
        
        for(Map.Entry<Integer, Integer> entry : map.entrySet()){   
     	   for (InfoHouse4storeExpand item : list1) {
     		   if(entry.getValue()==1 && entry.getKey()==item.getHsId()){                    
                    diff.add(item);                    
                }   
     	   }
        }                               
        return diff;                    
    }
	
	public int deleteCentralizedApartment(InfoHouse4storeExpand hs) throws Exception {
		InfoHouse4rentExpand ihr = new InfoHouse4rentExpand();
		ihr.setHrHouse4storeId(hs.getHsId());
		//查旗下已租房
		List<InfoHouse4rentExpand> listRent = infoHouse4rentMapper.queryHouseRentCommon(ihr);
		int checkFlag = 0;
		for(InfoHouse4rentExpand item2 : listRent){
			if("退房完成".equals(item2.getHrState())){
				
			}else{
				checkFlag++;
			}
		}
		if(checkFlag>0){
			throw new Exception("集散房已出租，且未完全退房，不能删除");
		}
		List<InfoHouse4storeExpand> list = selectByPrimaryKey(hs.getHsId());
		if(list.get(0).getHsPrimitiveMother()==null||list.get(0).getHsLeaseState().equals("已租")){
			throw new Exception("不存在合租房 或 合租房为已租状态");
		}
		int result1 = deleteByPrimaryKey(hs.getHsId());
		if(result1==0){
			throw new Exception("删除合租房");
		}
		return 1;
	}
	@Override
	public List<InfoHouse4storeExpand> selectHsHouse(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		//拿未租Id进去查询房子
		List<InfoHouse4storeExpand> list=infoHouse4storeMapper.selectHsHouse(infoHouse4storeExpand);
		for(int i=0;i<list.size();i++){
			List<Integer> hsId=new ArrayList<>();
			JourShortRentContract jour = new JourShortRentContract();
			jour.setJsrcHsId(list.get(i).getHsId());
			List<JourShortRentContract> list1=jourShortRentContractMapper.selectJourShortRentContract(jour);
			ArrayList<JourShortRentContract> strArray = new ArrayList<> ();
			System.out.println(list1);
		    if(list1.size()>0){
		    	list.get(i).setJsrcState(list1.get(0).getJsrcState());
		    	}
		   }
		return list;
	}

	@Override
	public List<InfoHouse4storeExpand> selectHouse(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		return infoHouse4storeMapper.selectHouse(infoHouse4storeExpand);
	}

	@Override
	public int updateBatchHouseForStore(List<InfoHouse4storeExpand> jsonArray) throws Exception {
		return infoHouse4storeMapper.updateDirtyRoomList(jsonArray);
	}

	@Override
	public List<InfoHouse4storeExpand> selectHotel(List<InfoHouse4storeExpand> list) throws Exception {
		return infoHouse4storeMapper.selectHotel(list);
	}

	@Override
	public String insertBatchHouseForStore(InfoHouse4storeExpand conditions) throws Exception {
		Integer popId = null; //人口id
		Integer laId = null ; //业主id
		Integer lipId = null; // 房东意向人id
		Integer hsId = null; //未租房Id
		Integer hdId = null; // 楼盘字典id
		Integer ihId = null; //盘源id
		Integer jrlId = null; // 合约id
		
		Integer userId = conditions.getHsUserId(); //登记人
		Integer storefront = conditions.getHsStorefront(); // 区域
		Integer department = conditions.getHsDepartment(); // 部门
		String city = conditions.getHsAddCity(); //市
		String district = conditions.getHsAddDistrict();// 城区
		String community = conditions.getHsAddCommunity(); //小区
		String zone = conditions.getHsAddZone(); //片区

		List<InfoHouse4storeExpand> hsList = JSON.parseArray(conditions.getSplitJson(), InfoHouse4storeExpand.class);
		
		//获取传入的业主姓名、身份证、联系方式
		String laPopName = conditions.getLaPopName(); // 业主姓名
		String laPopIdcard = conditions.getLaPopIdcard(); // 身份证
		String laPopTelephone = conditions.getLaPopTelephone(); // 联系方式
		System.out.println("有业主模式:::"+conditions.getNoOwner());
		System.out.println("有业主模式:::"+laPopName);
		System.out.println("有业主模式:::"+laPopTelephone);
		System.out.println("有业主模式:::"+userId);
		if(conditions.getNoOwner() == 0){//有业主模式
			//判断有无身份证
			if(laPopIdcard == null || laPopIdcard.equals("")){
				return "-22";
			}

			/** 添加人口表*/

			//设置数据
			InfoPopulation pop = new InfoPopulation();
			pop.setPopIdcard(laPopIdcard);
			//根据身份证查询人口表有无此人，无则新增，有则取出id
			List<InfoPopulation> popList = infoPopulationMapper.newModifiedJudgmentQuery(pop);
			if(popList.size() == 0){
				System.out.println("走这里1");
				pop.setPopName(laPopName);
				pop.setPopTelephone(laPopTelephone);
				pop.setPopUser(userId);
				//pop.setPopNameRemark(conditions.getPopNameRemark());//姓名备注
				pop.setPopLandlord(1);
				pop.setPopPassword(laPopTelephone);
				pop.setPopIdcardAddress(conditions.getPopIdcardAddress());
				pop.setPopBirth(conditions.getPopBirth());
				pop.setPopSex(conditions.getPopSex());
				pop.setPopNation(conditions.getPopNation());
				pop.setPopImgPath(conditions.getPopImgPath());
				//执行添加
				int result = infoPopulationMapper.insertSelective(pop);
				if(result != 1){
					throw new Exception("添加人口表失败!!!!");
				}
				//获取返回的人口id
				popId = pop.getPopId();
			}else{
				System.out.println("走这里2");
				String name = popList.get(0).getPopName();
				if(name.equals(laPopName)){
					popId = popList.get(0).getPopId();
				}else{
					JSONObject jsonObj = new JSONObject();
					jsonObj.accumulate("name", popList.get(0).getPopName());
					jsonObj.accumulate("tel",  popList.get(0).getPopTelephone());
					jsonObj.accumulate("ID",  popList.get(0).getPopIdcard());
					String json = jsonObj.toString();
					return "-21###"+json;
				}
			}

			/**添加房东意向人*/

			//设置数据
			InfoLandlordIntentionPerson lip = new InfoLandlordIntentionPerson();
			lip.setLipLandlordName(laPopName);
			lip.setLipLandlordPhone(laPopTelephone);
			//查询是否存在，不存在则新增
			List<InfoLandlordIntentionPerson> liplist = infoLandlordIntentionPersonMapper.selectByPrimaryKey(lip);
			if(liplist.size() == 0){
				lip.setLipRegistrar(userId);
				//执行添加
				int result1 = infoLandlordIntentionPersonMapper.insertSelective(lip);
				if(result1 != 1){
					throw new Exception("添加房东意向人失败!!!!");
				}
				lipId = lip.getLipId();
			}else{
				lipId = liplist.get(0).getLipId();
			}


			/** 添加房东*/

			//设置数据
			InfoLandlordExpand la = new InfoLandlordExpand();
			la.setLaPopulationId(popId);
			//根据人口id查询，无则新增，有则取出id
			List<InfoLandlordExpand> laList = infoLandlordMapper.landlordName(la);
			if(laList.size() == 0){
				la.setLaUserId(userId);
				la.setLaStorefront(storefront);
				la.setLaDepartment(department);
				//执行添加
				int reslut = infoLandlordMapper.insertSelective(la);
				if(reslut == 0){
					throw new Exception("添加房东失败!!!!");
				}
				//获取返回的业主id
				laId = la.getLandlordId();
				//修改人口表房东标识
				InfoPopulation ip2 = new InfoPopulation();
				ip2.setPopId(popId);
				ip2.setPopLandlord(1);
				int result4 = infoPopulationMapper.updateByPrimaryKeySelective(ip2);
				if(result4==0){
					throw new Exception("修改人口表房东标识出错");
				}
			}else{
				laId = laList.get(0).getLandlordId();
			}
		}

		/*生成账单*/
		InfoRenewalLandlord infoRenewalLandlord = new InfoRenewalLandlord();
		infoRenewalLandlord.setJrlSignedTime(conditions.getJrlSignedTime());
		infoRenewalLandlord.setJrlBeginTime(conditions.getJrlBeginTime());
		infoRenewalLandlord.setJrlEndTime(conditions.getJrlEndTime());
		infoRenewalLandlord.setJrlUserId(conditions.getJrlUserId());
		infoRenewalLandlord.setJrlDepartment(conditions.getJrlDepartment());
		infoRenewalLandlord.setJrlStorefront(conditions.getJrlStorefront());
		infoRenewalLandlord.setJrlContractType(conditions.getJrlContractType());
		infoRenewalLandlord.setJrlTheTerm(conditions.getJrlTheTerm());
		infoRenewalLandlord.setJrlInAdvancePay(conditions.getJrlInAdvancePay());
		infoRenewalLandlord.setJrlPaymentMethod(conditions.getJrlPaymentMethod());
		infoRenewalLandlord.setJrlRentFreeSegment(conditions.getJrlRentFreeSegment());
		infoRenewalLandlord.setJrlPriceLadder(conditions.getJrlPriceLadder());
		List<InfoContractInstallment> jciList = CommonMethodClass.landContractInstallment(infoRenewalLandlord);

		if(hsList.size() > 0){
			for(InfoHouse4storeExpand hs : hsList){
				//匹配楼盘字典，获取id
				SysHouseDictExpand syshd = new SysHouseDictExpand();
				syshd.setHdProvince(conditions.getHsAddProvince());
				syshd.setHdPinyin(hs.getHdPinyin());
				syshd.setHdCity(city);
				syshd.setHdDistrict(district);
				syshd.setHdCommunity(hs.getHsAddCommunity());
				List<SysHouseDictExpand> hdList = sysHouseDictMapper.selectAll(syshd);
				if(hdList.size() == 0){
					int hdResult = sysHouseDictMapper.insertSelective(syshd);
					if(hdResult == 1){
						hdId = syshd.getHdId();
					}else{
						throw new Exception("添加楼盘字典失败!!!!");
					}
				}else{
					hdId = hdList.get(0).getHdId();
				}
				
				//判断此房是否在，未租中已经存在。
				InfoHouse4storeExpand hs1 = new InfoHouse4storeExpand();
				hs1.setHsAddCity(city);
				hs1.setHsAddDistrict(district);
				hs1.setHsAddCommunity(hs.getHsAddCommunity());
				hs1.setHsAddBuilding(hs.getHsAddBuilding());
				hs1.setHsAddDoorplateno(hs.getHsAddDoorplateno());
				//查询是否已经存在
				List<InfoHouse4storeExpand> hs1List = infoHouse4storeMapper.queryHouseStoreCommon(hs1);
				if(hs1List.size() != 0){
					//已经存在相同的未租房
					return "-6";
				}
				
				/** 添加未租房*/
				 
				//设置数据
				InfoHouse4storeExpand infohs = conditions;
				System.out.println(infohs.getHsHouseOwner());
				infohs.setHsAddCommunity(hs.getHsAddCommunity());
				infohs.setHsAddBuilding(hs.getHsAddBuilding());
				infohs.setHsAddDoorplateno(hs.getHsAddDoorplateno());
				infohs.setHsSectionType(hs.getHsSectionType());
				infohs.setHsHouseDirection(hs.getHsHouseDirection());
				infohs.setHsHouseSquare(hs.getHsHouseSquare());
				infohs.setHsHouseOwner(hs.getHsHouseOwner());
				infohs.setHsGuidePrice(hs.getHsGuidePrice());
				infohs.setHsLandlordId(laId);
				infohs.setHsHouseDictId(hdId);
				infohs.setHsAddZone(zone);
				//hs.setHsHouseId(ihId);
				System.out.println("9999:::"+hs.getJrlPriceLadder());
				String hsTransactionPrice = hs.getJrlPriceLadder().split(",")[0];
				System.out.println("价格：：：："+hsTransactionPrice);
				infohs.setHsTransactionPrice(Double.valueOf(hsTransactionPrice));// 最新成交价
				infohs.setHsInPrice(Double.valueOf(hsTransactionPrice));// 当期成本价
				System.out.println(infohs.toString());
				int result1 = infoHouse4storeMapper.insertSelective(infohs);
				if(result1 == 0){
					throw new Exception("添加未租房失败!!!!");
				}
				hsId = infohs.getHsId();
				
				/** 添加合约*/
				 
				String att = conditions.getAtt();
		        String path = null;
		        String num = null;
		        if(att != null){
		            JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
		            if(attachment != null){
		                path = attachment.getPath();
		                num = attachment.getNum();
		                int result6 = journalAttachmentMapper.deleteByAtt(att);
		                if(result6 == 0){
		                    throw new Exception("从附件表删除记录失败");
		                }
		            }
		        }
				InfoRenewalLandlordExpand jrl = new InfoRenewalLandlordExpand();
				jrl.setJrlHouse4storeId(hsId);
				jrl.setJrlLandlordId(laId);
				jrl.setJrlRenewalCoding(conditions.getJrlRenewalCoding());
				jrl.setJrlSignedTime(conditions.getJrlSignedTime());
				jrl.setJrlBeginTime(conditions.getJrlBeginTime());
				jrl.setJrlEndTime(conditions.getJrlEndTime());
				jrl.setJrlUserId(conditions.getJrlUserId());
				jrl.setJrlDepartment(conditions.getJrlDepartment());
				jrl.setJrlStorefront(conditions.getJrlStorefront());
				jrl.setJrlContractType(conditions.getJrlContractType());
				jrl.setJrlTheTerm(conditions.getJrlTheTerm());
				jrl.setJrlInAdvancePay(conditions.getJrlInAdvancePay());
				jrl.setJrlRentFreeDays(conditions.getJrlRentFreeDays());
				jrl.setJrlPaymentMethod(conditions.getJrlPaymentMethod());
				jrl.setJrlRentFreeSegment(conditions.getJrlRentFreeSegment());
		        jrl.setJrlFreeDaysDecoration(conditions.getJrlFreeDaysDecoration());
		        jrl.setJrlFreeDaysHeader(conditions.getJrlFreeDaysHeader());
				jrl.setJrlPriceLadder(hs.getJrlPriceLadder());
				//jrl.setJrlRenewalCoding(conditions.getJcdIdjosn());
				jrl.setJrlImgPath(path);
				jrl.setJrlImgNum(num);
				//验证免租期
				if(!validateFreePeriod(jrl)){
					throw new Exception("验证免租期失败--------------------");
				}
				//新增房东合约记录
				int result5 = infoRenewalLandlordMapper.insertSelective(jrl);
				if(result5 == 0){
					throw new Exception("新增房东合约记录失败--------------------");
				}
				jrlId = jrl.getJrlId();
				jrl.setJrlId(jrlId);
				
				/** 添加分期账单*/

				if(conditions.getNoOwner() == 0){

					System.out.println("添加账单.。。。。。");
					//新增分期账单
					List<InfoContractInstallment> ici = new ArrayList<InfoContractInstallment>();
					//String notRentingJson = hs.getNotRentingJson();
					//JSONArray nrJson =JSONArray.fromObject(notRentingJson);
					for (InfoContractInstallment a : jciList) {
						//JSONObject jsonObj = (JSONObject)a;
						//InfoContractInstallment jf = (InfoContractInstallment) JSONObject.toBean(jsonObj, InfoContractInstallment.class);
						a.setJciHouse4storeId(hsId);
						a.setJciLandlordId(laId);
						a.setJciLandContId(jrlId);
						a.setJciMessageTime(null);
						JSONObject obj = new JSONObject();
						obj.accumulate("auditStatus", "未审核");
						a.setJciAudit(obj.toString());
						ici.add(a);
					}
					int result6 = infoContractInstallmentMapper.insertList(ici);
					System.out.println("添加账单.。。。。。结果：：：："+result6);
					if(result6 == 0){
						throw new Exception("新增分期账单失败--------------------");
					}
				}

				//修改合约编号的状态
				SysVariables sysVar = new SysVariables();
				sysVar.setVariablesId(1);
				List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
				if(!sysVarList.isEmpty()){
				    sysVar = sysVarList.get(0);
				}
				if (sysVar.getContractNums() == 1) {
				    String jcdIdjosn = conditions.getJcdIdjosn();
			        if(jcdIdjosn != null && !jcdIdjosn.equals("")){
			            JSONArray js =JSONArray.fromObject(jcdIdjosn);
			            for (Object a : js) {
			                JSONObject jsonObj = (JSONObject)a;
			                InfoHouse4storeExpand hslist = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
			                JournalContractDatabase jcd = new JournalContractDatabase();
			                jcd.setJcdId(hslist.getJcdId());
			                jcd.setJcdUseState("已签约");
			                jcd.setJcdUsedType("存房");
			                jcd.setJcdHouseAddress(hslist.getJcdHouseAddress());
			                jcd.setJcdContractPerson(hslist.getAdminUser());
			                jcd.setJcdSigningTime(conditions.getJrlBeginTime());
			                int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
			                if(result3 == 0){
			                    throw new Exception("修改合约编号状态失败------------------------------");
			                }
			            }
			        }
				}
				//写跟进
		        JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
		        jhf.setJhfHouseId(conditions.getHsHouseId());
		        jhf.setJhfHouse4storeId(hsId);
		        jhf.setJhfUserId(conditions.getLaUserId());
		        jhf.setJhfDepartment(conditions.getLaDepartment());
		        jhf.setJhfStorefront(conditions.getLaStorefront());
		        jhf.setJhfFollowTime(CommonMethodClass.getCurrentDateSecond());
		        jhf.setJhfFollowRemark(CommonMethodClass.getCurrentDateSecond()+",录入托管房！");
		        jhf.setJhfPaymentWay("系统跟进");
		        jhf.setJhfFollowResult("签约成功");
		        int result4 = journalHousingFollowMapper.insertSelective(jhf);
		        if(result4 == 0){
                    throw new Exception("写跟进失败------------------------------");
                }
			}
		}
		return "1###";
		
		
		
		
		 /* 添加盘源房
		 
		//设置数据
		InfoHouseExpand he = new InfoHouseExpand();
		he.setUserId(userId);
		he.setLandlordId(laId);
		he.setHouseDictId(hdId);
		he.setStorefront(storefront);
		he.setDepartment(department);
		//he.setHousePeople4rent(adminUserId);
		he.setHouseLipId(lipId);
		he.setSectionType(conditions.getHsSectionType());
		he.setHouseDirection(conditions.getHsHouseDirection());
		he.setStoreSquare(conditions.getHsHouseSquare());
		he.setHouseOwner(conditions.getHsHouseOwner());
		he.setAddCity(city);
		he.setAddDistrict(district);
		he.setAddStreet(hdList.get(0).getHdRoad());
		he.setAddCommunity(community);
		he.setAddBuilding(conditions.getHsAddBuilding());
		he.setAddDoorplateno(conditions.getHsAddDoorplateno());
		he.setStateOwned("私盘");
		he.setHouseState("可租");
		he.setHouseSignedState("已托管");
		he.setHouseEntrust4rent("是");
		//执行添加
		int result = infoHouseMapper.insertSelective(he);
		if(result == 0){
			throw new Exception("添加盘源房失败!!!!");
		}
		ihId = he.getHouseCoding();*/
		
		
		
	}


	@Override
	public String oneToManyAddTrusteeship(InfoHouse4storeExpand conditions) throws Exception {
		Integer popId = null; //人口id
		Integer laId = null ; //业主id
		Integer lipId = null; // 房东意向人id
		Integer hsId = null; //未租房Id
		Integer hdId = null; // 楼盘字典id
		Integer ihId = null; //盘源id
		Integer jrlId = null; // 合约id

		Integer userId = conditions.getHsUserId(); //登记人
		Integer adminUserId = conditions.getHsAdminUserId(); // 管家，主单人
		Integer storefront = conditions.getHsStorefront(); // 区域
		Integer department = conditions.getHsDepartment(); // 部门
		String city = conditions.getHsAddCity(); //市
		String district = conditions.getHsAddDistrict();// 城区
		String zone = conditions.getHsAddZone(); // 街区
		String community = conditions.getHsAddCommunity(); //小区

		//获取传入的业主姓名、身份证、联系方式
		String laPopName = conditions.getLaPopName(); // 业主姓名
		String laPopIdcard = conditions.getLaPopIdcard(); // 身份证
		String laPopTelephone = conditions.getLaPopTelephone(); // 联系方式

		String splitJson = conditions.getSplitJson();

		//判断有无身份证
		if(laPopIdcard == null || laPopIdcard.equals("")){
			return "-22";
		}

		/*
		 * 添加人口表
		 */
		//设置数据
		InfoPopulation pop = new InfoPopulation();
		pop.setPopIdcard(laPopIdcard);
		//根据身份证查询人口表有无此人，无则新增，有则取出id
		List<InfoPopulation> popList = infoPopulationMapper.newModifiedJudgmentQuery(pop);
		if(popList.size() == 0){
			System.out.println("走这里1");
			pop.setPopName(laPopName);
			pop.setPopTelephone(laPopTelephone);
			pop.setPopUser(userId);
			pop.setPopNameRemark(conditions.getPopNameRemark());
			pop.setPopLandlord(1);
			pop.setPopPassword(laPopTelephone);
			pop.setPopIdcardJson(conditions.getPopIdcardJson());
			pop.setPopInnerCreditLevel(80);
			pop.setPopOuterCreditLevel(80);
			//执行添加
			int result = infoPopulationMapper.insertSelective(pop);
			if(result != 1){
				throw new Exception("添加人口表失败!!!!");
			}
			//获取返回的人口id
			popId = pop.getPopId();
		}else{
			System.out.println("走这里2");
			String name = popList.get(0).getPopName();
			if(name.equals(laPopName)){
				popId = popList.get(0).getPopId();
			}else{
				JSONObject jsonObj = new JSONObject();
				jsonObj.accumulate("name", popList.get(0).getPopName());
				jsonObj.accumulate("tel",  popList.get(0).getPopTelephone());
				jsonObj.accumulate("ID",  popList.get(0).getPopIdcard());
				String json = jsonObj.toString();
				return "-21###"+json;
			}
		}
		/*
		 * 添加房东意向人
		 */
		//设置数据
		InfoLandlordIntentionPerson lip = new InfoLandlordIntentionPerson();
		lip.setLipLandlordName(laPopName);
		lip.setLipLandlordPhone(laPopTelephone);
		//查询是否存在，不存在则新增
		List<InfoLandlordIntentionPerson> liplist = infoLandlordIntentionPersonMapper.selectByPrimaryKey(lip);
		if(liplist.size() == 0){
			lip.setLipRegistrar(userId);
			//执行添加
			int result1 = infoLandlordIntentionPersonMapper.insertSelective(lip);
			if(result1 != 1){
				throw new Exception("添加房东意向人失败!!!!");
			}
			lipId = lip.getLipId();
		}else{
			lipId = liplist.get(0).getLipId();
		}

		/*
		 * 添加房东
		 */
		//设置数据
		InfoLandlordExpand la = new InfoLandlordExpand();
		la.setLaPopulationId(popId);
		//根据人口id查询，无则新增，有则取出id
		List<InfoLandlordExpand> laList = infoLandlordMapper.landlordName(la);
		if(laList.size() == 0){
			la.setLaUserId(userId);
			la.setLaStorefront(storefront);
			la.setLaDepartment(department);
			//执行添加
			int reslut = infoLandlordMapper.insertSelective(la);
			if(reslut == 0){
				throw new Exception("添加房东失败!!!!");
			}
			//获取返回的业主id
			laId = la.getLandlordId();
			//修改人口表房东标识
			InfoPopulation ip2 = new InfoPopulation();
			ip2.setPopId(popId);
			ip2.setPopLandlord(1);
			int result4 = infoPopulationMapper.updateByPrimaryKeySelective(ip2);
			if(result4==0){
				throw new Exception("修改人口表房东标识出错");
			}
		}else{
			laId = laList.get(0).getLandlordId();
		}

		if(conditions.getAddHsHouseType() == 2){//无资料房
			//匹配楼盘字典，获取id
			SysHouseDictExpand syshd = new SysHouseDictExpand();
			syshd.setHdCity(city);
			syshd.setHdDistrict(district);
			syshd.setHdZone(zone);
			syshd.setHdCommunity(community);
			List<SysHouseDictExpand> hdList = sysHouseDictMapper.selectAll(syshd);
			if(hdList.size() == 0){
				return "-4";
			}
			hdId = hdList.get(0).getHdId();

			//判断此房是否在，盘源已经存在。
			InfoHouseExpand he1 = new InfoHouseExpand();
			he1.setAddCity(city);
			he1.setAddDistrict(district);
			he1.setAddZone(zone);
			he1.setAddCommunity(community);
			he1.setAddBuilding(conditions.getHsAddBuilding());
			he1.setAddDoorplateno(conditions.getHsAddDoorplateno());
			//查询是否已经存在
			List<InfoHouseExpand> heList = infoHouseMapper.queryHousePaperCommon(he1);
			if(heList.size() != 0){
				//已经存在相同的盘源
				return "-5";
			}

			/*
			 * 添加盘源房
			 */
			//设置数据
			InfoHouseExpand he = new InfoHouseExpand();
			System.out.println(he.getHsHouseOwner());
			he.setUserId(userId);
			he.setLandlordId(laId);
			he.setHouseDictId(hdId);
			he.setStorefront(storefront);
			he.setDepartment(department);
			he.setHousePeople4rent(adminUserId);
			he.setHouseLipId(lipId);
			he.setSectionType(conditions.getHsSectionType());
			he.setHouseDirection(conditions.getHsHouseDirection());
			he.setStoreSquare(conditions.getHsHouseSquare());
			he.setHouseOwner(conditions.getHsHouseOwner());
			he.setAddCity(city);
			he.setAddDistrict(district);
			he.setAddZone(zone);
			he.setAddStreet(hdList.get(0).getHdRoad());
			he.setAddCommunity(community);
			he.setAddBuilding(conditions.getHsAddBuilding());
			he.setAddDoorplateno(conditions.getHsAddDoorplateno());
			he.setStateOwned("私盘");
			he.setHouseState("可租");
			he.setHouseSignedState("已托管");
			he.setHouseEntrust4rent("是");
			//执行添加
			int result = infoHouseMapper.insertSelective(he);
			if(result == 0){
				throw new Exception("添加盘源房失败!!!!");
			}
			ihId = he.getHouseCoding();
		}else{
			/*
			 * 修改盘源状态为已签约
			 */
			Integer houseId = conditions.getHsHouseId();
			InfoHouseExpand ih = new InfoHouseExpand();
			ih.setHouseCoding(houseId);
			ih.setHouseSignedState("已托管");
			int result7 = infoHouseMapper.updateByPrimaryKeySelective(ih);
			if(result7 == 0){
				throw new Exception("修改盘源状态为已签约失败--------------------");
			}
		}

		//判断此房是否在，未租中已经存在。
		InfoHouse4storeExpand hs1 = new InfoHouse4storeExpand();
		hs1.setHsAddCity(city);
		hs1.setHsAddDistrict(district);
		hs1.setHsAddZone(zone);
		hs1.setHsAddCommunity(community);
		hs1.setHsAddBuilding(conditions.getHsAddBuilding());
		hs1.setHsAddDoorplateno(conditions.getHsAddDoorplateno());
		//查询是否已经存在
		List<InfoHouse4storeExpand> hs1List = infoHouse4storeMapper.queryHouseStoreCommon(hs1);
		if(hs1List.size() != 0){
			//已经存在相同的未租房
			return "-6";
		}

		/*
		 * 添加未租房
		 */
		//设置数据
		InfoHouse4storeExpand hs = conditions;
		hs.setHsLandlordId(laId);
		hs.setHsHouseId(ihId);
		String hsTransactionPrice = hs.getJrlPriceLadder().split(",")[0];
		hs.setHsTransactionPrice(Double.valueOf(hsTransactionPrice));// 最新成交价
		hs.setHsInPrice(Double.valueOf(hsTransactionPrice));// 当期成本价
		hs.setHsNotRentSplit(2);
		System.out.println(hs.toString());
		int result1 = infoHouse4storeMapper.insertSelective(hs);
		if(result1 == 0){
			throw new Exception("添加未租房失败!!!!");
		}
		hsId = hs.getHsId();

		/*
		 * 添加合约
		 */
		String att = conditions.getAtt();
		String path = null;
		String num = null;
		if(att != null){
			JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
			if(attachment != null){
				path = attachment.getPath();
				num = attachment.getNum();
				int result6 = journalAttachmentMapper.deleteByAtt(att);
				if(result6 == 0){
					throw new Exception("从附件表删除记录失败");
				}
			}
		}
		InfoRenewalLandlordExpand jrl = new InfoRenewalLandlordExpand();
		jrl.setJrlHouse4storeId(hsId);
		jrl.setJrlLandlordId(laId);
		jrl.setJrlSignedTime(hs.getJrlSignedTime());
		jrl.setJrlBeginTime(hs.getJrlBeginTime());
		jrl.setJrlEndTime(hs.getJrlEndTime());
		jrl.setJrlUserId(hs.getJrlUserId());
		jrl.setJrlDepartment(hs.getJrlDepartment());
		jrl.setJrlStorefront(hs.getJrlStorefront());
		jrl.setJrlContractType(hs.getJrlContractType());
		jrl.setJrlTheTerm(hs.getJrlTheTerm());
		jrl.setJrlInAdvancePay(hs.getJrlInAdvancePay());
		jrl.setJrlRentFreeDays(hs.getJrlRentFreeDays());
		jrl.setJrlPaymentMethod(hs.getJrlPaymentMethod());
		jrl.setJrlRentFreeSegment(hs.getJrlRentFreeSegment());
		jrl.setJrlFreeDaysDecoration(hs.getJrlFreeDaysDecoration());
		jrl.setJrlFreeDaysHeader(hs.getJrlFreeDaysHeader());
		jrl.setJrlPriceLadder(hs.getJrlPriceLadder());
		jrl.setJrlRenewalCoding(hs.getJcdIdjosn());
		jrl.setAdminUser(hs.getAdminUser());
		jrl.setJrlImgPath(path);
		jrl.setJrlImgNum(num);
		System.out.println(jrl);
		//验证免租期
		if(!validateFreePeriod(jrl)){
			throw new Exception("验证免租期失败--------------------");
		}
		//新增房东合约记录
		int result5 = infoRenewalLandlordMapper.insertSelective(jrl);
		if(result5 == 0){
			throw new Exception("新增房东合约记录失败--------------------");
		}
		jrlId = jrl.getJrlId();
		jrl.setJrlId(jrlId);

		/*
		 * 添加分期账单
		 */
		//新增分期账单
		List<InfoContractInstallment> ici = new ArrayList<InfoContractInstallment>();
		String notRentingJson = conditions.getNotRentingJson();
		JSONArray nrJson =JSONArray.fromObject(notRentingJson);
		for (Object a : nrJson) {
			JSONObject jsonObj = (JSONObject)a;
			InfoContractInstallment jf = (InfoContractInstallment) JSONObject.toBean(jsonObj, InfoContractInstallment.class);
			jf.setJciHouse4storeId(hsId);
			jf.setJciLandlordId(laId);
			jf.setJciLandContId(jrlId);
			jf.setJciMessageTime(null);
			JSONObject obj = new JSONObject();
			obj.accumulate("auditStatus", "未审核");
			jf.setJciAudit(obj.toString());
			ici.add(jf);
		}
		int result6 = infoContractInstallmentMapper.insertList(ici);
		if(result6 == 0){
			throw new Exception("新增分期账单失败--------------------");
		}

		//修改合约编号的状态
		SysVariables sysVar = new SysVariables();
		sysVar.setVariablesId(1);
		List<SysVariables> sysVarList = sysVariablesMapper.selectByPrimaryKey(sysVar);
		if(!sysVarList.isEmpty()){
			sysVar = sysVarList.get(0);
		}
		if (sysVar.getContractNums() == 1) {
			String jcdIdjosn = conditions.getJcdIdjosn();
			if(jcdIdjosn != null && !jcdIdjosn.equals("")){
				JSONArray js =JSONArray.fromObject(jcdIdjosn);
				for (Object a : js) {
					JSONObject jsonObj = (JSONObject)a;
					InfoHouse4storeExpand hslist = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
					JournalContractDatabase jcd = new JournalContractDatabase();
					jcd.setJcdId(hslist.getJcdId());
					jcd.setJcdUseState("已签约");
					jcd.setJcdUsedType("存房");
					jcd.setJcdHouseAddress(hslist.getJcdHouseAddress());
					jcd.setJcdContractPerson(hslist.getAdminUser());
					jcd.setJcdSigningTime(conditions.getJrlBeginTime());
					int result3 = journalContractDatabaseMapper.updateByPrimaryKeySelective(jcd);
					if(result3 == 0){
						throw new Exception("修改合约编号状态失败------------------------------");
					}
				}
			}
		}

		/*
		 * 添加业绩受益人
		 */
		/*List<InfoTransactionAssistance> recordList = new ArrayList<InfoTransactionAssistance>();
		String jsonArray = conditions.getJsonArray();
		JSONArray ja =JSONArray.fromObject(jsonArray);
		System.out.println(ja.get(0));
		if(ja.get(0) == null || ja.get(0).equals(null)){

		}else{
			for (Object a : ja) {
				JSONObject jsonObj = (JSONObject)a;
				InfoTransactionExpand jf = (InfoTransactionExpand) JSONObject.toBean(jsonObj, InfoTransactionExpand.class);
				jf.setAssistHouse4store(hsId);
				recordList.add(jf);
			}
			int result7 = itamMapper.insertTAList(recordList);
			if(result7 == 0){
				throw new Exception("添加业绩受益人失败--------------------");
			}
		}*/

		/*//添加资产
		List<SysAssetsExpand> assetList = new ArrayList<SysAssetsExpand>();
		SysAssetsExpand sysAssetsExpand = new SysAssetsExpand();
		JSONArray ja2 = JSONArray.fromObject(conditions.getAddAsset());
		if (ja2.size() > 0) {
			for (Object obj : ja2) {
				JSONObject jsonObj = (JSONObject) obj;
				SysAssetsExpand sat = (SysAssetsExpand) JSONObject.toBean(jsonObj, SysAssetsExpand.class);
				sat.setSaHouseStoreId(hsId);
				sat.setSaHouseId(ihId);
				assetList.add(sat);
			}
			String assetJson = JSONUtil.serialize(assetList);
			sysAssetsExpand.setJsonArray(assetJson);
			sysAssetsService.insertAssets(sysAssetsExpand);
		}*/

		//写跟进
		JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
		jhf.setJhfHouseId(conditions.getHsHouseId());
		jhf.setJhfHouse4storeId(hsId);
		jhf.setJhfUserId(conditions.getLaUserId());
		jhf.setJhfDepartment(conditions.getLaDepartment());
		jhf.setJhfStorefront(conditions.getLaStorefront());
		jhf.setJhfFollowTime(CommonMethodClass.getCurrentDateSecond());
		jhf.setJhfFollowRemark(CommonMethodClass.getCurrentDateSecond()+",录入托管房！");
		jhf.setJhfPaymentWay("系统跟进");
		jhf.setJhfFollowResult("签约成功");
		journalHousingFollowMapper.insertSelective(jhf);


		JSONObject joHs = JSONObject.fromObject(conditions);
		InfoHouse4storeExpand joIhe =  (InfoHouse4storeExpand) JSONObject.toBean(joHs, InfoHouse4storeExpand.class);
		//拆分的合租房/集中房信息
		JSONArray ja =JSONArray.fromObject(splitJson);
		for (Object a : ja) {
			JSONObject jsonObj = (JSONObject)a;
			InfoHouse4storeExpand subHs = (InfoHouse4storeExpand) JSONObject.toBean(jsonObj, InfoHouse4storeExpand.class);
			joIhe.setHsPrimitiveMother(hsId);//整租房没有母房id
			joIhe.setHsSplitIdentifier(null);
			joIhe.setHsAddCommunity(subHs.getHsAddCommunity());
			joIhe.setHsOvaryCostPrice(subHs.getHsOvaryCostPrice());
			joIhe.setHsAddBuilding(subHs.getHsAddBuilding());
			joIhe.setHsAddDoorplateno(subHs.getHsAddDoorplateno());
			//用母房的省市区片区街道楼盘名称去房屋字典查有没有，得到字典id
			String province=conditions.getHsAddProvince();
			String road=conditions.getHsAddStreet();
			SysHouseDictExpand dict = new SysHouseDictExpand();
			dict.setHdProvince(province);
			dict.setHdCity(city);
			dict.setHdDistrict(district);
			dict.setHdZone(zone);
			dict.setHdCommunity(subHs.getHsAddCommunity());
			dict.setHdRoad(road);

			//setDictId
			List<SysHouseDictExpand> list =houseDictService.selectAddDict(dict);

			if(list.size() >0) {
				Integer dictId=list.get(0).getHdId();
				joIhe.setHsHouseDictId(dictId);
			}
			else {
				int li=  houseDictService.insertSelective(dict);
				joIhe.setHsHouseDictId(dict.getHdId());
			}
			System.out.println(joIhe.getHsHouseOwner());
			joIhe.setHsHouseNote(null);
			joIhe.setHsHouseDirection(subHs.getHsHouseDirection());
			joIhe.setHsHouseSquare(subHs.getHsHouseSquare());
			joIhe.setHsSectionType(subHs.getHsSectionType());
			joIhe.setHsHouseOwner(subHs.getHsHouseOwner());
			joIhe.setHsVacancyDay(null);
			joIhe.setHsGuidePrice(subHs.getHsGuidePrice());
			joIhe.setHsPriceLadder(null);


			joIhe.setHsNotRentSplit(null);
			joIhe.setHsInPrice(subHs.getHsInPrice());
			joIhe.setHsUserId(conditions.getLaUserId());
			int result8 = infoHouse4storeMapper.insertSelective(joIhe);
			if(result8 != 1){
				throw new Exception("一约多房生成整租房失败");
			}
			Integer joIheHsId = joIhe.getHsId();
			JournalHousingFollowExpand jhf2 = new JournalHousingFollowExpand();
			jhf2.setJhfHouseId(conditions.getHsHouseId());
			jhf2.setJhfHouse4storeId(joIheHsId);
			jhf2.setJhfUserId(conditions.getLaUserId());
			jhf2.setJhfDepartment(conditions.getLaDepartment());
			jhf2.setJhfStorefront(conditions.getLaStorefront());
			jhf2.setJhfFollowTime(CommonMethodClass.getCurrentDateSecond());
			jhf.setJhfFollowRemark("一约多房生成整租房");
			jhf.setJhfPaymentWay("系统跟进");
			jhf.setJhfFollowResult("跟进成功");
			journalHousingFollowMapper.insertSelective(jhf);
		}

		JSONObject jsonObj = new JSONObject();
		jsonObj.accumulate("ihId", ihId);
		jsonObj.accumulate("hsId", hsId);
		String json1 = jsonObj.toString();
		return "1###"+json1;
	}

	@Override
	public Result<String> batchAddHouseRoom(InfoHouse4storeExpand conditions) throws Exception {
		List<InfoHouse4storeExpand> list = JSON.parseArray(conditions.getJsonArray(),InfoHouse4storeExpand.class);
		if(list.size()>0){
			List<InfoHouse4storeExpand> newList = new ArrayList<>();
			for(InfoHouse4storeExpand ihs : list){
				Integer hdId = null;
				//匹配楼盘字典，获取id
				SysHouseDictExpand syshd = new SysHouseDictExpand();
				syshd.setHdProvince(ihs.getHsAddProvince());
				syshd.setHdPinyin(ihs.getHdPinyin());
				syshd.setHdCity(ihs.getHsAddCity());
				syshd.setHdDistrict(ihs.getHsAddDistrict());
				syshd.setHdCommunity(ihs.getHsAddCommunity());
				List<SysHouseDictExpand> hdList = sysHouseDictMapper.selectAll(syshd);
				if(hdList.size() == 0){
					syshd.setHdZone(ihs.getHsAddZone());
					int hdResult = sysHouseDictMapper.insertSelective(syshd);
					hdId = syshd.getHdId();
				}else{
					hdId = hdList.get(0).getHdId();
				}

				ihs.setHsHouseDictId(hdId);
				//判断此房是否在，未租中已经存在。
				List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.queryHouseStoreCommon(ihs);
				if(hsList.size() <= 0){
					newList.add(ihs);
				}
			}

			int result = infoHouse4storeMapper.insertHouseRoomList(newList);
			if(result > 0){
				return new Result<>(1,"添加成功",null);
			}else{
				return new Result<>(-1,"添加失败",null);
			}
		}else{
			return new Result<>(-1,"添加失败",null);
		}
	}

	@Override
	public Integer dealExpiredOrders() {
		/*
		流程： 全部后端操作 返回修改个数
			1. 获取所有过期的已定房间
			2. 根据id 查询未租已定表 参数 id，有效
			3. 修改未租房为未定：否  更改未租已定：无效
		* */
		Integer result = 0;
		try {
			InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
			infoHouse4storeExpand.setHsDownDeposit("是");
			List<InfoHouse4storeExpand> infolist = infoHouse4storeMapper.queryHouseStore(infoHouse4storeExpand);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String formatDate =sdf.getDateInstance().format(new Date());
			Date startDate = sdf.parse(formatDate);//获取当前格式化系统时间 2019-8-2
			if(infolist!=null){
				for (InfoHouse4storeExpand ss : infolist) {
					if(ss.getHsEndDate()!=null&&ss.getHsEndDate()!=""){
						Date endDate = sdf.parse(ss.getHsEndDate());
						long betweenDate = (endDate.getTime() - startDate.getTime())/(60*60*24*1000);
						//代表下定过期了
						if(betweenDate<0){
							ss.setHsDownDeposit("否");
							infoHouse4storeMapper.updateByPrimaryKeySelective(ss);
							//jem_hs_id 有效
							JourEarnestMoneyExpand jourEa = new JourEarnestMoneyExpand();
							jourEa.setJemHsId(ss.getHsId());
							jourEa.setJemState("有效");
							List<JourEarnestMoneyExpand> ls = jourEarnestMoneyMapper.queryDeposit(jourEa);
							if(ls!=null){
								for (JourEarnestMoneyExpand je: ls ) {
									je.setJemState("无效");
									jourEarnestMoneyMapper.updateSateByHsId(je);
								}
							}
							result++;
						}
						//没有预约的 全部变为未定  将有效-->无效
					}else{
						ss.setHsDownDeposit("否");
						infoHouse4storeMapper.updateByPrimaryKeySelective(ss);
						//jem_hs_id 有效
						JourEarnestMoneyExpand jourEa = new JourEarnestMoneyExpand();
						jourEa.setJemHsId(ss.getHsId());
						jourEa.setJemState("有效");
						List<JourEarnestMoneyExpand> ls = jourEarnestMoneyMapper.queryDeposit(jourEa);
						if(ls!=null){
							for (JourEarnestMoneyExpand je: ls ) {
								je.setJemState("无效");
								jourEarnestMoneyMapper.updateSateByHsId(je);
							}
						}
						result++;
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}
