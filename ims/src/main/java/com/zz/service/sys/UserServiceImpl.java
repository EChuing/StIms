package com.zz.service.sys;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.lang.reflect.Field;
import javax.servlet.http.HttpServletRequest;

import com.zz.po.sys.SysUserClass;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;


import com.opensymphony.xwork2.ActionContext;
import com.zz.datasource.DataSourceContextHolder;
import com.zz.datasource.MyDataSource;
import com.zz.datasource.MyDataSourceMapper;
import com.zz.mapper.info.InfoRenewalLandlordMapper;
import com.zz.mapper.info.InfoRenewalRenterMapper;
import com.zz.mapper.journal.JourUserDeviceMapper;
import com.zz.mapper.journal.JournalFinancialMapper;
import com.zz.mapper.journal.JournalGoToRegisterMapper;
import com.zz.mapper.journal.JournalRepairMapper;
import com.zz.mapper.sys.SysUserMapper;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoHouseExpand;
import com.zz.po.info.InfoIntendedPerson;
import com.zz.po.info.InfoLandlordIntentionPerson;
import com.zz.po.info.InfoPopulation;
import com.zz.po.info.InfoRenewalLandlordExpand;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.po.info.InfoTransactionExpand;
import com.zz.po.journal.JourUserDevice;
import com.zz.po.journal.JournalFinancialExpand;
import com.zz.po.journal.JournalGoToRegister;
import com.zz.po.journal.JournalRepairExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.info.HouseService;
import com.zz.service.info.InfoTransactionAssistanceService;
import com.zz.service.info.IntendedPersonService;
import com.zz.service.info.LandlordIntentionPersonService;
import com.zz.service.info.PopulationService;
import com.zz.util.DateUtil;
import com.zz.util.MySqlSessionFactory;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class UserServiceImpl implements UserService {
	private SysUserExpand sysUserExpand;
	private SysUserMapper sysUserMapper;
	@Autowired
	private JourUserDeviceMapper jourUserDeviceMapper;
	public void setSysUserMapper(SysUserMapper sysUserMapper) throws Exception{
		this.sysUserMapper = sysUserMapper;
	}
	private InfoTransactionAssistanceService itaa;
	private HouseService houseService;
	private HouseForStoreService houseForStoreService;
	private HouseForRentService houseForRentService;
	private IntendedPersonService intendedPersonService;
	private LandlordIntentionPersonService landlordIntentionPersonService;
	private PopulationService populationService;
	@Autowired
	private SysUserClassService sysUserClassService;
	private InfoRenewalRenterMapper infoRenewalRenterMapper;
	private InfoRenewalLandlordMapper infoRenewalLandlordMapper;
	private JournalFinancialMapper journalFinancialMapper;
	private JournalRepairMapper journalRepairMapper;
	private JournalGoToRegisterMapper journalGoToRegisterMapper;
	
	public void setJournalGoToRegisterMapper(
			JournalGoToRegisterMapper journalGoToRegisterMapper) {
		this.journalGoToRegisterMapper = journalGoToRegisterMapper;
	}
	public void setJournalRepairMapper(JournalRepairMapper journalRepairMapper) {
		this.journalRepairMapper = journalRepairMapper;
	}
	public void setJournalFinancialMapper(
			JournalFinancialMapper journalFinancialMapper) {
		this.journalFinancialMapper = journalFinancialMapper;
	}
	public void setInfoRenewalLandlordMapper(
			InfoRenewalLandlordMapper infoRenewalLandlordMapper) {
		this.infoRenewalLandlordMapper = infoRenewalLandlordMapper;
	}
	public void setInfoRenewalRenterMapper(
			InfoRenewalRenterMapper infoRenewalRenterMapper) {
		this.infoRenewalRenterMapper = infoRenewalRenterMapper;
	}
	public void setItaa(InfoTransactionAssistanceService itaa) {
		this.itaa = itaa;
	}
	public void setHouseService(HouseService houseService) {
		this.houseService = houseService;
	}
	public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
		this.houseForStoreService = houseForStoreService;
	}
	public void setHouseForRentService(HouseForRentService houseForRentService) {
		this.houseForRentService = houseForRentService;
	}
	public void setIntendedPersonService(IntendedPersonService intendedPersonService) {
		this.intendedPersonService = intendedPersonService;
	}
	public void setLandlordIntentionPersonService(
			LandlordIntentionPersonService landlordIntentionPersonService) {
		this.landlordIntentionPersonService = landlordIntentionPersonService;
	}
	public void setPopulationService(PopulationService populationService) {
		this.populationService = populationService;
	}

	@Override
	public int deleteByPrimaryKey(SysUserExpand record) throws Exception{
		return sysUserMapper.deleteByPrimaryKey(record);
	}

	@Override
	public int insertSelective(SysUserExpand record) throws Exception{
		SysUserExpand sysUser=new SysUserExpand();
		sysUser.setSuState("正常");
		List<SysUserExpand> list=sysUserMapper.selectByPrimaryKey(sysUser);
		if(list.size()<record.getMaxUserNum()) {
			return sysUserMapper.insertSelective(record);
		}else {
			return -2;
		}
		
	}
	@Override
	public int insertStudent(SysUserExpand record) throws Exception{
			return sysUserMapper.insertStudent(record);

	}
	@Override
	//执行修改
	public int updateByPrimaryKeySelective(SysUserExpand record) throws Exception{
		SysUserExpand sysUserExpand = new SysUserExpand();
		sysUserExpand.setUserId(record.getUserId());
        String sufo="";
		if(record.getSufollow()!=""&&record.getSufollow() !=null){
			sufo = record.getSufollow();
        }
		SysUserExpand old = sysUserMapper.selectById(sysUserExpand);
		Map<String, String> map = new HashMap<String, String>();
        map.put("currentAddress", "居住地址");
        map.put("servicememotextnull", "备注信息");
        map.put("remark", "备注");
        map.put("nativeplace", "籍贯");
        map.put("marriage", "婚姻状况");
        map.put("linkman", "紧急联系人");
        map.put("linkmanphone", "紧急联系人号码");
        map.put("linkmanrelation ", "紧急联系人关系");
		map.put("suState", "状态");
		map.put("suStaffName", "姓名");
		map.put("suContact", "电话");
		map.put("suIdcard", "身份证");
		map.put("suChooseRoomLimit", "每日洗盘上限");
		map.put("suMd5CheckType", "安全级别");
		StringBuffer followUp = new StringBuffer();

		followUp.append("修改个人信息，");
		Field[] newUser = record.getClass().getSuperclass().getDeclaredFields();
		for (Field field : newUser) {
			field.setAccessible(true);
			if (map.containsKey(field.getName())
					&& field.get(record) != null
					&& !field.get(record).equals(field.get(old))
					&& !(field.get(record).equals("")
					&& field.get(old) == null)) {
				Object ojl = field.get(old) != null ? field.get(old) : "";
				followUp.append(map.get(field.getName()) + ":" + ojl.toString() + "→" + field.get(record) + ";");
			}
		}
        JSONArray jsonArray = JSONArray.fromObject(old.getSufollow()!=null&&!"".equals(old.getSufollow()) ? old.getSufollow():"[]");
		JSONObject object = new JSONObject();
		object.accumulate("type", "用户跟进");
		object.accumulate("registrantName", record.getRegistrantName());//跟进人
        if(sufo != "" && sufo !=null ){
            object.accumulate("text", sufo);//跟进数据
        }
        else{
            object.accumulate("text", followUp.toString());//跟进数据
        }
		object.accumulate("time", DateUtil.getCurDateTime());//跟进时间
		jsonArray.add(object);
		record.setSufollow(jsonArray.toString());
		return sysUserMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public int updateByPrimaryKeySelectiveOne(SysUserExpand record) throws Exception{
		return updateByPrimaryKeySelective(record);
	}

	@Override
	public List<SysUserExpand> selectAllDiscountAuth(SysUserExpand record) throws Exception {


		return sysUserMapper.selectAllDiscountAuth(record);
	}

	@Override
	public SysUserExpand userLogin(SysUserExpand user)
			throws Exception {
		return sysUserMapper.userLogin(user);
	}

	@Override
	public List<SysUserExpand> selectByPrimaryKey(SysUserExpand record) throws Exception {
		return sysUserMapper.selectByPrimaryKey(record);
	}

	@Override
	public List<SysUserExpand> queryAllDepar() throws Exception {
		return sysUserMapper.queryAllDepar();
	}

	@Override
	public List<SysUserExpand> nameNumber(SysUserExpand record) throws Exception {
		return sysUserMapper.nameNumber(record);
	}

	@Override
	public int dataTransfer(SysUserExpand record) throws Exception {
		int num = transfer(record);
		return num;
	}
	
	private int transfer(SysUserExpand record) throws Exception{
		SysUserExpand sue = new SysUserExpand();
		sysUserExpand = record;
		System.out.println("~~~~~~~~~~~~~~:"+sysUserExpand.getStaffOne()+" ------ "+sysUserExpand.getStaffTwo());
		//查询两个用户的姓名
		//转移人
		sue.setUserId(sysUserExpand.getStaffOne());
		List<SysUserExpand> onelist = sysUserMapper.nameNumber(sue);
		String oneName = onelist.get(0).getSuStaffName();
		int oneUserId = sysUserExpand.getStaffOne();
		//被转人
		sue.setUserId(sysUserExpand.getStaffTwo());
		List<SysUserExpand> twolist = sysUserMapper.nameNumber(sue);
		int twoUserId = sysUserExpand.getStaffTwo();
		String twoName = twolist.get(0).getSuStaffName();
		int department = twolist.get(0).getSuDepartmentId();
		int storefront = twolist.get(0).getSuStoreId();
		System.out.println("-------- "+ oneName +" -- "+oneUserId+"\n"+twoName+" - "+department+" - "+storefront);
		//状态改离职
		SysUserExpand siser = new SysUserExpand();
		siser.setUserId(sysUserExpand.getStaffOne());
		siser.setSuState("离职");
		siser.setSuName(sysUserExpand.getSuName());
		siser.setSuPassword("facaikaihua888");
		int result1 = sysUserMapper.updateByPrimaryKeySelective(siser);
		if(result1 == 0){
			throw new  Exception("离职修改失败！");
		}

		//转移教室权限
		SysUserClass suc = new SysUserClass();
		suc.setSucUserId(sysUserExpand.getStaffOne());
		System.out.println(suc);
		List<SysUserClass> sucList = sysUserClassService.queryAllStudent(suc);
		if(sucList.size() != 0){
			suc.setUserId(sysUserExpand.getStaffTwo());
			int result = sysUserClassService.updateBySucUserId(suc);
			if(result == 0){
				throw new  Exception("班级转接失败！");
			}
		}

		//转移交易协助表
		InfoTransactionExpand infoTransactionExpand = new InfoTransactionExpand();
		infoTransactionExpand.setAssistUserId(oneUserId);
		List<InfoTransactionExpand> italist = itaa.selectAll(infoTransactionExpand);
		if(italist.size() != 0){
			for(int i = 0;i<italist.size();++i){
				int itaaId = italist.get(i).getAssistId();
				infoTransactionExpand.setAssistId(itaaId);
				infoTransactionExpand.setAssistUserId(twoUserId);
				int result = itaa.updateByPrimaryKeySelective(infoTransactionExpand);
				if(result == 0){
					throw new  Exception("交易协助表修改失败！");
				}
			}
		}
		
		//转移盘源
		InfoHouseExpand infoHouseExpand = new InfoHouseExpand();
		InfoHouseExpand ihe = new InfoHouseExpand();
		infoHouseExpand.setUserId(oneUserId);
		List<InfoHouseExpand> houseList = houseService.getemployee(infoHouseExpand);
		if(houseList.size() != 0){
			for(int i = 0;i<houseList.size();++i){
				int hdId = houseList.get(i).getHouseCoding();
				Integer people4rent = houseList.get(i).getHousePeople4rent();
				Integer people4sell = houseList.get(i).getHousePeople4sell();
				if(people4rent == oneUserId){
					ihe.setHouseCoding(hdId);
					ihe.setHousePeople4rent(twoUserId);
				}else if(people4sell == oneUserId){
					ihe.setHouseCoding(hdId);
					ihe.setHousePeople4sell(twoUserId);
				}
				int result = houseService.updateByPrimaryKeySelective(ihe);
				if(result == 0){
					throw new  Exception("盘源修改失败！");
				}
			}
		}
		
		//转移未租房
		InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
		infoHouse4storeExpand.setHsUserId(oneUserId);
		infoHouse4storeExpand.setHsManagerUserId(oneUserId);
		List<InfoHouse4storeExpand> storeList = houseForStoreService.getStoreUserId(infoHouse4storeExpand);
		if(storeList.size() != 0){
			for(int i=0;i<storeList.size();++i){
				InfoHouse4storeExpand hsList= new InfoHouse4storeExpand();
				int hsId = storeList.get(i).getHsId();
				Integer userId = storeList.get(i).getHsUserId();
				Integer hsManagerUserId = storeList.get(i).getHsManagerUserId();
				if(hsManagerUserId!=null){
					if(oneUserId==hsManagerUserId){
						hsList.setHsId(hsId);
						hsList.setHsManagerUserId(twoUserId);
						hsList.setHsDepartment(department);
						hsList.setHsStorefront(storefront);
					}
				}
				if(userId !=null) {
					if (userId == oneUserId) {
						hsList.setHsId(hsId);
						hsList.setHsUserId(twoUserId);
					}
				}
				int result = houseForStoreService.updateByPrimaryKeySelective(hsList);
				if(result == 0){
					throw new  Exception("未租房修改失败！");
				}
			}
		}
		
		//转移已租房
		InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
		infoHouse4rentExpand.setHrUserId(oneUserId);
		infoHouse4rentExpand.setHrManagerUserId(oneUserId);
		List<InfoHouse4rentExpand> rentList = houseForRentService.getrentiuserId(infoHouse4rentExpand);
		if(rentList.size() != 0){
			for(int i=0; i<rentList.size();++i){
				InfoHouse4rentExpand hre = new InfoHouse4rentExpand();
				int hrId = rentList.get(i).getHrId();
				Integer userId = rentList.get(i).getHrUserId();
				Integer hrManagerUserId = rentList.get(i).getHrManagerUserId();
				if(hrManagerUserId !=null) {
					if (hrManagerUserId == oneUserId) {
						hre.setHrId(hrId);
						hre.setHrManagerUserId(twoUserId);
						hre.setHrDepartment(department);
						hre.setHrStorefront(storefront);
					}
				}
				if(userId !=null) {
					if (userId == oneUserId) {
						hre.setHrId(hrId);
						hre.setHrUserId(twoUserId);
					}
				}
				int result = houseForRentService.updateByPrimaryKeySelective(hre);
				if(result == 0){
					throw new  Exception("已租房修改失败！");
				}
			}
		}
		
		//转移意向人
		InfoIntendedPerson infoIntendedPerson = new InfoIntendedPerson();//租客
		infoIntendedPerson.setIpUserId(oneUserId);
		List<InfoIntendedPerson> rentIp = intendedPersonService.getipUserId(infoIntendedPerson);
		if(rentIp.size() != 0){
			for(int i=0;i<rentIp.size();++i){
				int ipId = rentIp.get(i).getIpId();
				infoIntendedPerson.setIpId(ipId);
				infoIntendedPerson.setIpUserId(twoUserId);
				infoIntendedPerson.setIpDepartmentId(department);
				infoIntendedPerson.setIpStorefrontId(storefront);
				int result = intendedPersonService.updateByPrimaryKeySelective(infoIntendedPerson);
				if(result == 0){
					throw new  Exception("租客意向人修改失败！");
				}
			}
		}
		InfoLandlordIntentionPerson infoLandlordIntentionPerson = new InfoLandlordIntentionPerson();//房东
		infoLandlordIntentionPerson.setLipRegistrar(oneUserId);
		List<InfoLandlordIntentionPerson> lipList = landlordIntentionPersonService.getpersonUserId(infoLandlordIntentionPerson);
		if(lipList.size() != 0){
			for(int i=0;i<lipList.size();++i){
				int lipId = lipList.get(i).getLipId();
				infoLandlordIntentionPerson.setLipId(lipId);
				infoLandlordIntentionPerson.setLipRegistrar(twoUserId);
				int result = landlordIntentionPersonService.updateByPrimaryKeySelective(infoLandlordIntentionPerson);
				if(result == 0){
					throw new  Exception("房东意向人修改失败！");
				}
			}
		}
		
		//转移人口表
		InfoPopulation infoPopulation = new InfoPopulation();
		infoPopulation.setPopUser(oneUserId);
		List<InfoPopulation> popList = populationService.getPopUserId(infoPopulation);
		if(popList.size() != 0){
			for(int i=0;i<popList.size();++i){
				int popId = popList.get(i).getPopId();
				infoPopulation.setPopId(popId);
				infoPopulation.setPopUser(twoUserId);
				int result = populationService.updateByPrimaryKeySelective(infoPopulation);
				if(result == 0){
					throw new  Exception("人口表修改失败！");
				}
			}
		}

		return 1;
	}
	
	@Override
	public int updatePersonnelTransfer(SysUserExpand record) throws Exception {
		return upPersonnelTransfer(record);
	}
	@Override
	public int updateStudentTransfer(SysUserExpand record) throws Exception {
		return sysUserMapper.updateStudent(record);
	}
	@Override
	public int updateStudentInformation(SysUserExpand record) throws Exception {
		return sysUserMapper.updateStudentInformation(record);
	}

	//处理公司人员换部门  //personnelTransfer.action
	private int upPersonnelTransfer(SysUserExpand sysUserExpand) throws Exception{
		Integer OneDepartment = null;
		Integer TwoDepartment = null;
		Integer OneStore = null;
		Integer TwoStore = null;
		int number = 0;
		OneDepartment = sysUserExpand.getOneDepartment();
		TwoDepartment = sysUserExpand.getTwoDepartment();
		OneStore = sysUserExpand.getOneStore();
		TwoStore = sysUserExpand.getTwoStore();
		if(OneDepartment == null || TwoDepartment == null || OneStore == null || TwoStore == null){
			//不能为空
			System.out.println("区域部门不能为空："+ 00);
			return -1;
		}

		//用户部门修改
		SysUserExpand sysUser = new SysUserExpand();
		sysUser.setSuDepartmentId(TwoDepartment);
		sysUser.setSuStoreId(TwoStore);
		sysUser.setUserId(sysUserExpand.getUserId());
		int result7 = sysUserMapper.updateByPrimaryKeySelective(sysUser);
		if(result7 == 0){
			throw new  Exception("部门修改失败！");
		}
		
		//转移未租房
		InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
		infoHouse4storeExpand.setHsUserId(sysUserExpand.getUserId());
		infoHouse4storeExpand.setHsManagerUserId(sysUserExpand.getUserId());
		List<InfoHouse4storeExpand> storeList = houseForStoreService.getStoreUserId(infoHouse4storeExpand);
		if(storeList.size() != 0){
			for(int i=0;i<storeList.size();++i){
				InfoHouse4storeExpand hsList= new InfoHouse4storeExpand();
				int hsId = storeList.get(i).getHsId();
				Integer hsManagerUserId = storeList.get(i).getHsManagerUserId();
				if(hsManagerUserId == sysUserExpand.getUserId()){
					hsList.setHsId(hsId);
					hsList.setHsDepartment(TwoDepartment);
					hsList.setHsStorefront(TwoStore);
				}
				int result = houseForStoreService.updateByPrimaryKeySelective(hsList);
				if(result == 0){
					throw new  Exception("未租房修改失败！");
				}
			}
			++number;
		}
		
		//转移已租房
		InfoHouse4rentExpand infoHouse4rentExpand = new InfoHouse4rentExpand();
		infoHouse4rentExpand.setHrUserId(sysUserExpand.getUserId());
		infoHouse4rentExpand.setHrManagerUserId(sysUserExpand.getUserId());
		List<InfoHouse4rentExpand> rentList = houseForRentService.getrentiuserId(infoHouse4rentExpand);
		if(rentList.size() != 0){
			for(int i=0; i<rentList.size();++i){
				InfoHouse4rentExpand hre = new InfoHouse4rentExpand();
				int hrId = rentList.get(i).getHrId();
				Integer hrManagerUserId = rentList.get(i).getHrManagerUserId();
				if(hrManagerUserId == sysUserExpand.getUserId()){
					hre.setHrId(hrId);
					hre.setHrDepartment(TwoDepartment);
					hre.setHrStorefront(TwoStore);
				}
				int result = houseForRentService.updateByPrimaryKeySelective(hre);
				if(result == 0){
					throw new  Exception("已租房修改失败！");
				}
			}
			++number;
		}
		
		//转移交易协助表
		InfoTransactionExpand infoTransactionExpand = new InfoTransactionExpand();
		infoTransactionExpand.setAssistRegisterPeople(sysUserExpand.getUserId());
		List<InfoTransactionExpand> italist = itaa.selectAll(infoTransactionExpand);
		if(italist.size() != 0){
			for(int i = 0;i<italist.size();++i){
				int itaaId = italist.get(i).getAssistId();
				infoTransactionExpand.setAssistId(itaaId);
				infoTransactionExpand.setAssistDepartment(TwoDepartment);
				infoTransactionExpand.setAssistStorefront(TwoStore);
				int result = itaa.updateByPrimaryKeySelective(infoTransactionExpand);
				if(result == 0){
					throw new  Exception("交易协助表修改失败！");
				}
			}
			++number;
		}
		
		//租客意向人部门转移查询
		InfoIntendedPerson infoIntendedPerson = new InfoIntendedPerson();
		infoIntendedPerson.setIpUserId(sysUserExpand.getUserId());
		List<InfoIntendedPerson> ipList = intendedPersonService.getipUserId(infoIntendedPerson);
		if(ipList.size() != 0){
			System.out.println("租客意向人："+ 11);
			//租客意向人部门修改
			List<InfoIntendedPerson> list = new ArrayList<>();
			for(int i = 0 ; i < ipList.size() ; ++i){
				InfoIntendedPerson ip = new InfoIntendedPerson();
				ip.setIpDepartmentId(TwoDepartment);
				ip.setIpStorefrontId(TwoStore);
				ip.setIpId(ipList.get(i).getIpId());
				list.add(ip);
			}
			int result = intendedPersonService.intendedBatchUpdate(list);
			if(result == 0){
				throw new  Exception("意向人修改失败！");
			}
			++number;
		}
		
		//租客合约查询
		InfoRenewalRenterExpand rre = new InfoRenewalRenterExpand();
		rre.setJrrUserId(sysUserExpand.getUserId());
		List<InfoRenewalRenterExpand> rreList = infoRenewalRenterMapper.allContractDepartment(rre);
		if(rreList.size() != 0){
			//租客合约查询失败！或没有
			System.out.println("租客合约查询："+ 22);
			//租客合约修改部门
			InfoRenewalRenterExpand re = new InfoRenewalRenterExpand();
			for(int i = 0 ; i<rreList.size();++i){
				re.setJrrDepartment(TwoDepartment);
				re.setJrrStorefront(TwoStore);
				re.setJrrId(rreList.get(i).getJrrId());
				int result1 = infoRenewalRenterMapper.updateByPrimaryKeySelective(re);
				if(result1 == 0){
					throw new  Exception("意向人修改失败！");
				}
			}
			++number;
		}
		
		//房东合约查询
		InfoRenewalLandlordExpand irl = new InfoRenewalLandlordExpand();
		irl.setJrlUserId(sysUserExpand.getUserId());
		List<InfoRenewalLandlordExpand> jrlList = infoRenewalLandlordMapper.alljrlContractDepartment(irl);
		if(jrlList.size() != 0){
			//房东合约查询失败！或没有
			System.out.println("房东合约查询："+ 33);
			//房东合约修改部门
			InfoRenewalLandlordExpand jrl = new InfoRenewalLandlordExpand();
			for(int i = 0 ; i<jrlList.size();++i){
				jrl.setJrlDepartment(TwoDepartment);
				jrl.setJrlStorefront(TwoStore);
				jrl.setJrlId(jrlList.get(i).getJrlId());
				int result2 = infoRenewalLandlordMapper.updateByPrimaryKeySelective(jrl);
				if(result2 == 0){
					throw new  Exception("意向人修改失败！");
				}
			}
			++number;
		}
		
		//查询财务收支
		/*JournalFinancialExpand jfe = new JournalFinancialExpand();
		jfe.setJfChargePeople(sysUserExpand.getUserId());
		List<JournalFinancialExpand> jfList = journalFinancialMapper.strikeBalanceInterface(jfe);
		if(jfList.size() == 0){
			//查询财务收支！或没有
			System.out.println("查询财务收支："+ 44);
			//财务收支修改部门
			JournalFinancialExpand jf = new JournalFinancialExpand();
			for(int i = 0 ; i<jfList.size();++i){
				jf.setDepartment(TwoDepartment);
				jf.setStorefront(TwoStore);
				jf.setJfId(jfList.get(i).getJfId());
				int result3 = journalFinancialMapper.updateByPrimaryKeySelective(jf);
				if(result3 == 0){
					throw new  Exception("财务收支修改部门失败！");
				}
			}
			++number;
		}*/
		
		//事务维修部门查询
		JournalRepairExpand rep = new JournalRepairExpand();
		rep.setRepUserId(sysUserExpand.getUserId());
		
		List<JournalRepairExpand> repList = journalRepairMapper.selectRepairByAnyCondition(rep);
		if(repList.size() == 0){
			//事务维修部门查询失败！或没有
			System.out.println("事务维修部门查询："+ 55);
			//维修事务部门修改
			JournalRepairExpand jre = new JournalRepairExpand();
			for(int i = 0; i<repList.size();++i){
				jre.setRepDepartment(TwoDepartment);
				jre.setRepStorefront(TwoStore);
				jre.setRepId(repList.get(i).getRepId());
				int result4 = journalRepairMapper.updateByPrimaryKeySelective(jre);
				if(result4 == 0){
					throw new  Exception("维修事务部门修改失败！");
				}
			}
			++number;
		}
		
		//外出登记部门查询
		JournalGoToRegister jgtr = new JournalGoToRegister();
		jgtr.setGotoUserId(sysUserExpand.getUserId());
		List<JournalGoToRegister> gotoList = journalGoToRegisterMapper.queryWorkOutsideByUserId(jgtr);
		if(gotoList.size() == 0){
			//外出登记部门查询失败！或没有
			System.out.println("外出登记部门查询："+ 66);
			//外出登记部门修改
			JournalGoToRegister jgoto = new JournalGoToRegister();
			for(int i = 0; i<gotoList.size();++i){
				jgoto.setGotoDepartmentId(TwoDepartment);
				jgoto.setGotoStorefrontId(TwoStore);
				jgoto.setGotoId(gotoList.get(i).getGotoId());
				int result5 = journalGoToRegisterMapper.updateByPrimaryKeySelective(jgoto);
				if(result5 == 0){
					throw new  Exception("外出登记部门修改失败！");
				}
			}
			++number;
		}
		
		System.out.println("------------------------- 修改结束！！");
		return 1;
	}
	
	@Override
	public List<SysUserExpand> selectUsername(SysUserExpand record) throws Exception {
		return sysUserMapper.selectUsername(record);
	}
	@Override
	public List<SysUserExpand> selectStudent(SysUserExpand record) throws Exception {
		return sysUserMapper.selectUsername(record);
	}
	@Override
	public List<SysUserExpand> selectUserPicDig(JourUserDevice jourUserDevice) throws Exception {
		List<SysUserExpand> userList = sysUserMapper.selectAll(jourUserDevice);
		List<JourUserDevice> relatedUs = jourUserDeviceMapper.selectHssByJhoOfficeId2(jourUserDevice);
		System.out.println("00000:::"+relatedUs);
		int removeSize=relatedUs.size();
		if (relatedUs.size() != 0) {
			for(int i=0;i<userList.size();i++){
				if (relatedUs.contains(userList.get(i).getUserId())) {
					userList.remove(i);
					i--;
				}
			}
		}
		return userList;
	}

	@Override
	public SysUserExpand selectById(SysUserExpand record) throws Exception {
		return sysUserMapper.selectById(record);
	}

}
