package com.zz.service.journal;

import java.text.SimpleDateFormat;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.journal.JournalWegReadingMapper;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.journal.JournalWegReading;
import com.zz.po.sys.SysUserExpand;

public class WegReadingServiceImpl implements WegReadingService {
	private JournalWegReadingMapper journalWegReadingMapper;
	private InfoHouse4storeMapper  infoHouse4storeMapper;
	private InfoHouse4rentMapper  infoHouse4rentMapper;
	private InfoContractInstallmentMapper infoContractInstallmentMapper;
	
	public void setInfoContractInstallmentMapper(InfoContractInstallmentMapper infoContractInstallmentMapper) {
		this.infoContractInstallmentMapper = infoContractInstallmentMapper;
	}
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	
	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}
	public void setInfoHouse4storeMapper(InfoHouse4storeMapper infoHouse4storeMapper) {
		this.infoHouse4storeMapper = infoHouse4storeMapper;
	}
	public void setJournalWegReadingMapper(
			JournalWegReadingMapper journalWegReadingMapper) {
		this.journalWegReadingMapper = journalWegReadingMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer wegrdId) throws Exception {
		return journalWegReadingMapper.deleteByPrimaryKey(wegrdId);
	}

	@Override
	public int insert(JournalWegReading record) throws Exception {
		return journalWegReadingMapper.insert(record);
	}

	@Override
	public List<JournalWegReading> selectByPrimaryKey(Integer wegrdId)
			throws Exception {
		return journalWegReadingMapper.selectByPrimaryKey(wegrdId);
	}

	@Override
	public List<JournalWegReading> selectWegReadingAll(JournalWegReading record)
			throws Exception {
		return journalWegReadingMapper.selectWegReadingAll(record);
	}

	@Override
	public int updateByPrimaryKey(JournalWegReading record) throws Exception {
		return journalWegReadingMapper.updateByPrimaryKey(record);
	}

	@Override
	public JournalWegReading selectLast(JournalWegReading conditions)
			throws Exception {
		return journalWegReadingMapper.selectLast(conditions);
	}

	@Override
	public int updateState(JournalWegReading record) throws Exception {
		return journalWegReadingMapper.updateState(record);
	}

	@Override
	public List<JournalWegReading> isReading(JournalWegReading conditions)
			throws Exception {
		return journalWegReadingMapper.isReading(conditions);
	}

	@Override
	public int addedMeterReading(JournalWegReading record, int temp) throws Exception {
		return addedReading(record, temp);
	}
	
	/**
	 * 已租房添加抄表处理
	 * temp 1:单条抄表 2.批量抄表
	 */
	private int addedReading(JournalWegReading journalWegReading, int temp) throws Exception{
		List<JournalWegReading> wegList = new ArrayList<>();
		int num = 1;

		//获取水电气的读数
		Double waterReading = journalWegReading.getWaterReading();
		Double electricReading = journalWegReading.getElectricReading();
		Double gasReading = journalWegReading.getGasReading();
		Double hotwaterReading = journalWegReading.getHotwaterReading();
		Double hotairReading = journalWegReading.getHotairReading();
		
		//添加抄表记录
		if(temp == 1){
			wegList.add(journalWegReading);
		}else if(temp == 2){
			if(waterReading != 0){
				JournalWegReading jwr = new JournalWegReading();
				jwr.setWegrdRenterId(journalWegReading.getWegrdRenterId());
				jwr.setWegrdHouse4rentId(journalWegReading.getWegrdHouse4rentId());
				jwr.setWegrdHouse4storeId(journalWegReading.getWegrdHouse4storeId());
				jwr.setWegrdUserId(journalWegReading.getWegrdUserId());
				jwr.setWegrdDoUserId(journalWegReading.getWegrdDoUserId());
				jwr.setWegrdDepartment(journalWegReading.getWegrdDepartment());
				jwr.setWegrdStorefront(journalWegReading.getWegrdStorefront());
				jwr.setWegrdMonth(journalWegReading.getWegrdMonth());
				jwr.setWegrdNature("正常抄表");
				jwr.setWegrdNums(journalWegReading.getWaterReading());
				jwr.setWegrdCostWays(null);
				jwr.setWegrdType("水表");
				wegList.add(jwr);
			}
			if(electricReading != 0){
				JournalWegReading jwr = new JournalWegReading();
				jwr.setWegrdRenterId(journalWegReading.getWegrdRenterId());
				jwr.setWegrdHouse4rentId(journalWegReading.getWegrdHouse4rentId());
				jwr.setWegrdHouse4storeId(journalWegReading.getWegrdHouse4storeId());
				jwr.setWegrdUserId(journalWegReading.getWegrdUserId());
				jwr.setWegrdDoUserId(journalWegReading.getWegrdDoUserId());
				jwr.setWegrdDepartment(journalWegReading.getWegrdDepartment());
				jwr.setWegrdStorefront(journalWegReading.getWegrdStorefront());
				jwr.setWegrdMonth(journalWegReading.getWegrdMonth());
				jwr.setWegrdNature("正常抄表");
				jwr.setWegrdNums(journalWegReading.getElectricReading());
				jwr.setWegrdCostWays(null);
				jwr.setWegrdType("电表");
				wegList.add(jwr);
			}
			if(gasReading != 0){
				JournalWegReading jwr = new JournalWegReading();
				jwr.setWegrdRenterId(journalWegReading.getWegrdRenterId());
				jwr.setWegrdHouse4rentId(journalWegReading.getWegrdHouse4rentId());
				jwr.setWegrdHouse4storeId(journalWegReading.getWegrdHouse4storeId());
				jwr.setWegrdUserId(journalWegReading.getWegrdUserId());
				jwr.setWegrdDoUserId(journalWegReading.getWegrdDoUserId());
				jwr.setWegrdDepartment(journalWegReading.getWegrdDepartment());
				jwr.setWegrdStorefront(journalWegReading.getWegrdStorefront());
				jwr.setWegrdMonth(journalWegReading.getWegrdMonth());
				jwr.setWegrdNature("正常抄表");
				jwr.setWegrdNums(journalWegReading.getGasReading());
				jwr.setWegrdCostWays(null);
				jwr.setWegrdType("燃气表");
				wegList.add(jwr);
			}
			
			if(hotwaterReading != 0){
				JournalWegReading jwr = new JournalWegReading();
				jwr.setWegrdRenterId(journalWegReading.getWegrdRenterId());
				jwr.setWegrdHouse4rentId(journalWegReading.getWegrdHouse4rentId());
				jwr.setWegrdHouse4storeId(journalWegReading.getWegrdHouse4storeId());
				jwr.setWegrdUserId(journalWegReading.getWegrdUserId());
				jwr.setWegrdDoUserId(journalWegReading.getWegrdDoUserId());
				jwr.setWegrdDepartment(journalWegReading.getWegrdDepartment());
				jwr.setWegrdStorefront(journalWegReading.getWegrdStorefront());
				jwr.setWegrdMonth(journalWegReading.getWegrdMonth());
				jwr.setWegrdNature("正常抄表");
				jwr.setWegrdNums(journalWegReading.getHotwaterReading());
				jwr.setWegrdCostWays(null);
				jwr.setWegrdType("热水");
				System.out.println("添加po类："+jwr.toString());
				wegList.add(jwr);
			}
			if(hotairReading != 0){
				JournalWegReading jwr = new JournalWegReading();
				jwr.setWegrdRenterId(journalWegReading.getWegrdRenterId());
				jwr.setWegrdHouse4rentId(journalWegReading.getWegrdHouse4rentId());
				jwr.setWegrdHouse4storeId(journalWegReading.getWegrdHouse4storeId());
				jwr.setWegrdUserId(journalWegReading.getWegrdUserId());
				jwr.setWegrdDoUserId(journalWegReading.getWegrdDoUserId());
				jwr.setWegrdDepartment(journalWegReading.getWegrdDepartment());
				jwr.setWegrdStorefront(journalWegReading.getWegrdStorefront());
				jwr.setWegrdMonth(journalWegReading.getWegrdMonth());
				jwr.setWegrdNature("正常抄表");
				jwr.setWegrdNums(journalWegReading.getHotairReading());
				jwr.setWegrdCostWays(null);
				jwr.setWegrdType("暖气");
				System.out.println("添加po类："+jwr.toString());
				wegList.add(jwr);
			}
			if(wegList.size() == 0){
				num = -1;
			}
		}
		//添加到水电气抄表记录表
		int result = journalWegReadingMapper.signingRentWegReading(wegList);
		if(result == 0){
			throw new Exception("添加抄表失败");
		}
		//未租房数据获取
		List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.selectByPrimaryKey(journalWegReading.getWegrdHouse4storeId());
		if(hsList.size() == 0){
			throw new Exception("查找不到未租房");
		}
		String meterReadingRecord = hsList.get(0).getHsMeterReadingRecord();

		//第一次json转换
		JSONObject json = JSONObject.fromObject(meterReadingRecord);
		String waterData = json.getString("water");
		String electritData = json.getString("electrit");
		String gasData = json.getString("gas");
		String hotwaterData=json.has("hotwater")?json.getString("hotwater"):"{}";
		String hotairData=json.has("hotair")?json.getString("hotair"):"{}";

		//第二次json转换
		JSONObject waterjson = JSONObject.fromObject(waterData);
		JSONObject electritjson = JSONObject.fromObject(electritData);
		JSONObject gasjson = JSONObject.fromObject(gasData);
		JSONObject hotwaterjson = JSONObject.fromObject(hotwaterData);
		JSONObject hotairjson = JSONObject.fromObject(hotairData);

		//第三次转为数组
		String waterThis = waterjson.getString("thisReading");
		String electritThis = electritjson.getString("thisReading");
		String gasThis = gasjson.getString("thisReading");
		String hotwaterThis =hotwaterjson.has("thisReading")? hotwaterjson.getString("thisReading"):"[]";
		String hotairThis = hotairjson.has("thisReading")? hotairjson.getString("thisReading"):"[]";
//		System.out.println("第三次的数组数据："+waterThis+"-----"+electritThis+"-----"+gasThis);

		JSONArray waterlist = JSONArray.fromObject(waterThis);
		JSONArray electritlist = JSONArray.fromObject(electritThis);
		JSONArray gaslist = JSONArray.fromObject(gasThis);
		JSONArray hotwaterlist = JSONArray.fromObject(hotwaterThis);
		JSONArray hotairlist = JSONArray.fromObject(hotairThis);
		
		if(temp == 1){
			if(journalWegReading.getWegrdType().equals("水表")){
				waterlist.add(journalWegReading.getWegrdNums());
			}else if(journalWegReading.getWegrdType().equals("电表")){
				electritlist.add(journalWegReading.getWegrdNums());
			}else if(journalWegReading.getWegrdType().equals("燃气表")){
				gaslist.add(journalWegReading.getWegrdNums());
			}
		}else if(temp == 2){
			if(waterReading != 0){
				waterlist.add(waterReading);
			}
			if(electricReading != 0){
				electritlist.add(electricReading);
			}
			if(gasReading != 0){
				gaslist.add(gasReading);
			}
			
			if(hotwaterReading != 0){
				hotwaterlist.add(hotwaterReading);
			}
			if(hotairReading != 0){
				hotairlist.add(hotairReading);
			}
		}
		//拼接字段
		String water = "{'lastReading':"+waterjson.getString("lastReading")+",'thisReading':"+waterlist+"}";
		String electrit = "{'lastReading':"+electritjson.getString("lastReading")+",'thisReading':"+electritlist+"}";
		String gas = "{'lastReading':"+gasjson.getString("lastReading")+",'thisReading':"+gaslist+"}";
		String hotwaterStr=hotwaterjson.has("lastReading")?hotwaterjson.getString("lastReading"):0+"";
		String hotairStr=hotairjson.has("lastReading")?hotairjson.getString("lastReading"):0+"";
		String hotwater="{'lastReading':"+hotwaterStr+",'thisReading':"+hotwaterlist+"}";
		String hotair="{'lastReading':"+hotairStr+",'thisReading':"+hotairlist+"}";
        String mrr = "{'water':"+water+",'electrit':"+electrit+",'gas':"+gas+",'hotwater':"+hotwater+",'hotair':"+hotair+"}";

        //只改未租表，不改已租表
        InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		hs.setHsId(journalWegReading.getWegrdHouse4storeId());
		hs.setHsMeterReadingRecord(mrr);
        int result1 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
		if(result1 == 0){
			throw new Exception("未租房修改失败");
		}

        /*//判断 如果已租房处于退房状态 就只改已租房的JSON抄表字段
        InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		hs.setHsId(journalWegReading.getWegrdHouse4storeId());
		hs.setHsMeterReadingRecord(mrr);
        //查询最后一个已租房
		InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
		hr.setHrHouse4storeId(journalWegReading.getWegrdHouse4storeId());
		List<InfoHouse4rentExpand> hrList = infoHouse4rentMapper.meterReadingHasBeenRented(hr);
		if(hrList.size() == 0 || "在租".equals(hrList.get(0).getHrLeaseState()) || "正办理退房".equals(hrList.get(0).getHrState())){
			int result1 = infoHouse4storeMapper.updateByPrimaryKeySelective(hs);
			if(result1 == 0){
				throw new Exception("未租房修改失败");
			}
		}else{
			hr.setHrMeterReadingRecord(mrr);
			hr.setHrHouse4storeId(null);
			hr.setHrId(hrList.get(0).getHrId());
			int result1 = infoHouse4rentMapper.updateByPrimaryKeySelective(hr);
			if(result1 == 0){
				throw new Exception("已租房修改失败");
			}
		}*/
		StringBuffer followUp = new StringBuffer();
		if(waterReading!=0) {
			followUp.append("水表："+journalWegReading.getWaterReading()+";");
		}
		if(electricReading!=0) {
			followUp.append("电表："+journalWegReading.getElectricReading()+";");
		}
		if(gasReading!=0) {
			followUp.append("燃气表："+journalWegReading.getGasReading()+";");
		}
		if(hotwaterReading!=0) {
			followUp.append("热水表："+journalWegReading.getHotwaterReading()+";");
		}
		if(hotairReading!=0) {
			followUp.append("暖气表："+journalWegReading.getHotairReading());
		}
		SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
		JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
		jhf.setJhfHouse4rentId(journalWegReading.getWegrdHouse4rentId());
		jhf.setJhfHouse4storeId(journalWegReading.getWegrdHouse4storeId());
		jhf.setJhfHouseId(journalWegReading.getWegrdHouseId());
		jhf.setJhfUserId(userInfo.getUserId());
		jhf.setJhfUserName(userInfo.getSuStaffName());
		jhf.setJhfStorefront(userInfo.getSuStoreId());
		jhf.setJhfDepartment(userInfo.getSuDepartmentId());
		jhf.setJhfPaymentWay("系统跟进");
		jhf.setJhfFollowResult("跟进成功");
		jhf.setJhfFollowRemark(journalWegReading.getWegrdMonth()+"  "+userInfo.getSuStaffName()+"抄表:"+followUp.toString());
		journalHousingFollowMapper.insertSelective(jhf);
		return num;
	}
	
	public static void main(String[] args) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Calendar lastMonth = Calendar.getInstance();
		String firstday, lastday;  
        // 获取前月的第一天  
		lastMonth = Calendar.getInstance();  
		lastMonth.add(Calendar.MONTH, 0);  
		lastMonth.set(Calendar.DAY_OF_MONTH, 1);  
        firstday = df.format(lastMonth.getTime());  
        // 获取前月的最后一天  
        lastMonth = Calendar.getInstance();  
        lastMonth.add(Calendar.MONTH, 1);  
        lastMonth.set(Calendar.DAY_OF_MONTH, 0);  
        lastday = df.format(lastMonth.getTime());
	}
	public List<JournalWegReading> conditionSelectWegReading(JournalWegReading conditions) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance(); 
        // 获取前月的第一天  
		cal = Calendar.getInstance();  
		cal.add(Calendar.MONTH, 0);  
		cal.set(Calendar.DAY_OF_MONTH, 1);  
		String firstday = df.format(cal.getTime());  
        // 获取前月的最后一天  
        cal = Calendar.getInstance();  
        cal.add(Calendar.MONTH, 1);  
        cal.set(Calendar.DAY_OF_MONTH, 0);  
        String lastday = df.format(cal.getTime());
        //用本月第一天到最后一天 查询合约分期账单表 拿到付款日
        InfoContractInstallmentExpand ici = new InfoContractInstallmentExpand();
        ici.setFirstday(firstday);
        ici.setLastday(lastday);
        ici.setJciType("租客租金");
        List<InfoContractInstallmentExpand> list = infoContractInstallmentMapper.selectFukuanri(ici);
        System.out.println("**************"+list.size());
        //根据付款日 条件查询本月已抄表
		List<JournalWegReading> jwreList = new ArrayList<>();
		JournalWegReading jwr = new JournalWegReading();
        for(int i=0;i<list.size();i++){
        	Calendar lastMonth = Calendar.getInstance();
        	String thisMonth = list.get(i).getJciFukuanri();
        	lastMonth.setTime(df.parse(thisMonth));
        	lastMonth.add(Calendar.MONTH, -1);
        	Integer jciHouse4storeId = list.get(i).getJciHouse4storeId();
        	System.out.println(jciHouse4storeId+"***********");
        	jwr.setWegrdHouse4storeId(jciHouse4storeId);
        	jwr.setConditionalType(conditions.getConditionalType());
        	jwr.setThisMonthFukuanri(thisMonth);
        	jwr.setLastMonthFukuanri(df.format(lastMonth.getTime()));
        	jwr.setSplitFlag("1");
        	System.out.println(thisMonth+"*******"+df.format(lastMonth.getTime()));
        	jwreList.addAll(journalWegReadingMapper.selectAllWegReading(jwr));
            System.out.println("*****"+jwreList);
        }
		return jwreList;
	}
	
	@Override
	public List<JournalWegReading> selectAllWegReading(JournalWegReading conditions) throws Exception {
		return journalWegReadingMapper.selectAllWegReading(conditions);
	}
    @Override
    public List<JournalWegReading> selectWegDate(JournalWegReading record) throws Exception {
        return journalWegReadingMapper.selectWegDate(record);
    }
	@Override
	public List<JourDevice> queryDevice(int id) {
		return journalWegReadingMapper.queryDevice(id);
	}
}
