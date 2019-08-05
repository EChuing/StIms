package com.zz.service.info;

import com.opensymphony.xwork2.ActionContext;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.po.info.InfoPopulation;
import com.zz.po.journal.JournalElectronicContractExpansion;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.util.DateUtil;
import com.zz.util.EncryptData;
import com.zz.util.HttpRequest;
import com.zz.util.ZqsignManage;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PopulationServiceImpl implements PopulationService {
	private InfoPopulationMapper infoPopulationMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	String private_key = ZqsignManage.Key.PRIVATE_KEY;
	String zqid = ZqsignManage.Zqid.ZQID;
	EncryptData ed = new EncryptData();
	
	public void setInfoPopulationMapper(InfoPopulationMapper infoPopulationMapper) {
		this.infoPopulationMapper = infoPopulationMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer popId) throws Exception {
		return infoPopulationMapper.deleteByPrimaryKey(popId);
	}

	@Override
	public int insertSelective(InfoPopulation record) throws Exception {
		return infoPopulationMapper.insertSelective(record);
	}

	@Override
	public List<InfoPopulation> selectByPrimaryKey(InfoPopulation record)
			throws Exception {
		return infoPopulationMapper.selectByPrimaryKey(record);
	}

	/**
	 * 修改客户信息，同时写一条跟进
	 */
	@Override
	public int updateByPrimaryKeySelective(InfoPopulation record) throws Exception {
	    InfoPopulation infoPopulation = new InfoPopulation();
	    infoPopulation.setPopId(record.getPopId());
        List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(infoPopulation);
        if (list.isEmpty()) {
            return 0;
        }
        Map<String, String> map = new HashMap<String, String>();
        map.put("popName", "姓名");
        map.put("popTelephone", "电话");
        map.put("popIdcardType", "证件类型");
        map.put("popIdcard", "证件号码");
        map.put("popSex", "性别");
        map.put("popNation", "民族");
        map.put("popMarriageState", "婚姻状况");
        map.put("popIdcardAddress", "户籍地址");
        map.put("popOccupation", "职业");
        map.put("popBirth", "生日");
        map.put("popDegreeEducation", "文化程度");
        map.put("popInnerCreditLevel", "内部信用");
        map.put("popOuterCreditLevel", "外部信用");
        map.put("popNameRemark", "备注");
        map.put("popFromArea", "来自地区");
        map.put("popPresentAddress", "现住地址");
        map.put("popResidenceType", "处所类型");
        map.put("popUnitService", "服务处所");
        map.put("popResidenceCause", "居住事由");
        map.put("popCheckinTime", "入住时间");
        map.put("popRelation", "与承租人关系");
        map.put("popNameRemark", "姓名备注");
        map.put("popPassword","密码");
        StringBuffer followUp = new StringBuffer();
        followUp.append("修改客户信息，");
        Field[] newPop = record.getClass().getDeclaredFields();
        System.out.println("--"+newPop);
        for (Field field : newPop) {
            field.setAccessible(true);
            if (map.containsKey(field.getName())
                && field.get(record) != null
                && !field.get(record).equals(field.get(list.get(0)))
                && !(field.get(record).equals("") && field.get(list.get(0)) == null)
            ) {
                System.out.println("field="+field.getName());
                System.out.println("old="+field.get(list.get(0)));
                System.out.println("new="+field.get(record));
                Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
                followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(record) + ";");
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getPopModifyTheRecord() != null ? list.get(0).getPopModifyTheRecord() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "系统跟进");
        obj.accumulate("registrantName", record.getRegistrantName());
        obj.accumulate("text", followUp.toString());
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        record.setPopModifyTheRecord(jsonArray.toString());
        
        InfoPopulation oldIP = list.get(0);
        String userCode = oldIP.getUserCode();
        //当userCode存在 修改了身份证，手机号码，姓名就得去更新数字签名
        if(oldIP.getUserCode() != null && !"".equals(oldIP.getUserCode())){
            userCode = updateUserCode(record,oldIP);
        }
        
        record.setUserCode(userCode);
        
        int result = infoPopulationMapper.updateByPrimaryKeySelective(record);
        return result;
	}

	/**
	 * 修改客户信息，同时写一条跟进
	 */
	@Override
	public int updateByPrimaryKeySelective2(InfoPopulation record) throws Exception {
	    InfoPopulation infoPopulation = new InfoPopulation();
	    infoPopulation.setPopId(record.getPopId());
        List<InfoPopulation> list = infoPopulationMapper.newModifiedJudgmentQuery(infoPopulation);
        if (list.isEmpty()) {
            return 0;
        }
        Map<String, String> map = new HashMap<String, String>();
        map.put("popName", "姓名");
        map.put("popTelephone", "电话");
        map.put("popIdcardType", "证件类型");
        map.put("popIdcard", "证件号码");
        map.put("popSex", "性别");
        map.put("popNation", "民族");
        map.put("popMarriageState", "婚姻状况");
        map.put("popIdcardAddress", "户籍地址");
        map.put("popOccupation", "职业");
        map.put("popBirth", "生日");
        map.put("popDegreeEducation", "文化程度");
        map.put("popInnerCreditLevel", "内部信用");
        map.put("popOuterCreditLevel", "外部信用");
        map.put("popNameRemark", "备注");
        map.put("popFromArea", "来自地区");
        map.put("popPresentAddress", "现住地址");
        map.put("popResidenceType", "处所类型");
        map.put("popUnitService", "服务处所");
        map.put("popResidenceCause", "居住事由");
        map.put("popCheckinTime", "入住时间");
        map.put("popRelation", "与承租人关系");
        map.put("popNameRemark", "姓名备注");
        map.put("popPassword","密码");
//        map.put("popIdcardJson","身份证信息");
        StringBuffer followUp = new StringBuffer();
        if("租客".equals(record.getType())) {
        	followUp.append("修改租客信息：");
        }
        else if("业主".equals(record.getType())){
        	followUp.append("修改业主信息：");
        }
        Field[] newPop = record.getClass().getDeclaredFields();
        for (Field field : newPop) {
            field.setAccessible(true);
            if (map.containsKey(field.getName())
                && field.get(record) != null
                && !field.get(record).equals(field.get(list.get(0)))
                && !(field.get(record).equals("") && field.get(list.get(0)) == null)
            ) {
                System.out.println("field="+field.getName());
                System.out.println("old="+field.get(list.get(0)));
                System.out.println("new="+field.get(record));
                Object old = field.get(list.get(0)) != null ? field.get(list.get(0)) : "";
                followUp.append(map.get(field.getName()) + "：" + old.toString() + " → " + field.get(record) + ";");
            }
        }
        JSONArray jsonArray = JSONArray.fromObject(list.get(0).getPopModifyTheRecord() != null ? list.get(0).getPopModifyTheRecord() : "[]");
        JSONObject obj = new JSONObject();
        obj.accumulate("type", "系统跟进");
        obj.accumulate("registrantName", record.getRegistrantName());
        obj.accumulate("text", followUp.toString());
        obj.accumulate("time", DateUtil.getCurDateTime());
        jsonArray.add(obj);
        record.setPopModifyTheRecord(jsonArray.toString());
        
        
        
        InfoPopulation oldIP = list.get(0);
        String userCode = oldIP.getUserCode();
        //当userCode存在 修改了身份证，手机号码，姓名就得去更新数字签名
        if(oldIP.getUserCode() != null && !"".equals(oldIP.getUserCode())){
            userCode = updateUserCode(record,oldIP);
        }
        record.setUserCode(userCode);
        
        SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
        JournalHousingFollowExpand jnl = new JournalHousingFollowExpand();
        jnl.setJhfHouse4storeId(record.getHsId());
        jnl.setJhfHouse4rentId(record.getHrId());
        jnl.setJhfHouseId(record.getHsHouseId());
        jnl.setJhfUserId(userInfo.getUserId());
        jnl.setJhfDepartment(userInfo.getSuDepartmentId());
        jnl.setJhfStorefront(userInfo.getSuStoreId());
        jnl.setJhfPaymentWay("系统跟进");
        jnl.setJhfFollowResult("跟进成功");
        jnl.setJhfFollowRemark(followUp.toString());
        journalHousingFollowMapper.insertSelective(jnl);
        int result = infoPopulationMapper.updateByPrimaryKeySelective(record);
        return result;
	}
	
	public static void main(String[] args) {
		JournalElectronicContractExpansion jece = new JournalElectronicContractExpansion();
		if(jece.getAddBuilding() == null){
			System.out.println("是为null");
		}
		
		if("".equals(jece.getAddBuilding())){
			System.out.println("是为空字符串");
		}
		
	}
	
	/**
	 * 更新人口表电子合同的数字签名
	 * @return
	 * @throws Exception 
	 */
	private String updateUserCode(InfoPopulation newIP,InfoPopulation oldIP) throws Exception{
		//身份证如果修改了 就直接重新申请注册数字签名 
		if(!newIP.getPopIdcard().equals(oldIP.getPopIdcard())){
			String userCode = CommonMethodClass.toMD5(newIP.getPopIdcard(),32);
			JournalElectronicContractExpansion jece = new JournalElectronicContractExpansion();
			jece.setEctUserCode(userCode);
			jece.setEctIdCard(newIP.getPopIdcard());
			jece.setEctName(newIP.getPopName());
			jece.setEctTelphone(newIP.getPopTelephone());
			regPerson(jece);
			return userCode;
		//只修改了电话和姓名 那就更新数字签名
		}else if(!newIP.getPopTelephone().equals(oldIP.getPopTelephone()) || !newIP.getPopName().equals(oldIP.getPopName())){
			String userCode = oldIP.getUserCode();
			JournalElectronicContractExpansion jece = new JournalElectronicContractExpansion();
			jece.setEctUserCode(userCode);
			jece.setEctIdCard(newIP.getPopIdcard());
			jece.setEctName(newIP.getPopName());
			jece.setEctTelphone(newIP.getPopTelephone());
			updatePerson(jece);
		}
		return oldIP.getUserCode();
	}
	
	/*
	 * 注册个人签名
	 * 成功返回1 错误则抛出错误
	 * */
	private int regPerson(JournalElectronicContractExpansion jece) throws Exception{
		String request_url = ZqsignManage.Url.REQUEST_URL + "personRegNV";

		Map<String,String> map = new HashMap<String,String>();

		map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
	    map.put("user_code", jece.getEctUserCode());//用户唯一标示，该值不能重复
	    map.put("name", jece.getEctName());//平台方用户姓名
	    map.put("id_card_no", jece.getEctIdCard());//身份证号
	    map.put("mobile", jece.getEctTelphone());//联系电话（手机号码）

	    String sign_val = ed.encrptData(map,private_key);

		map.put("sign_val", sign_val); //请求参数的签名值
		System.out.println("个人签名注册:"+map);
		String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
		System.out.println("注册个人签名请求结果：" + response_str);//输出服务器响应结果
		JSONObject obj = JSONObject.fromObject(response_str);
		String code = obj.getString("code");
		String msg = obj.getString("msg");
		if("0".equals(code)){
			return 1;
		}else{
			throw new Exception(msg);
		}
	}
	/**
	 * 更新租客的数字签名
	 * @param jece
	 * @throws Exception
	 */
	private void updatePerson(JournalElectronicContractExpansion jece) throws Exception{
		String request_url = ZqsignManage.Url.REQUEST_URL + "personUpdateNV";

		Map<String,String> map = new HashMap<String,String>();

		map.put("zqid", zqid);//商户的zqid,该值需要与private_key对应
	    map.put("user_code", jece.getEctUserCode());//用户唯一标示，只能更新数据库中存在的user_code
	    map.put("name", jece.getEctName());//平台方用户姓名
	    map.put("id_card_no", jece.getEctIdCard());//身份证号
	    map.put("mobile", jece.getEctTelphone());//联系电话（手机号码）

	    String sign_val = ed.encrptData(map,private_key);

		map.put("sign_val", sign_val); //请求参数的签名值
		String response_str = HttpRequest.sendPost(request_url, map);//向服务端发送请求，并接收请求结果
		System.out.println("更新签名请求结果：" + response_str);//输出服务器响应结果
		JSONObject obj = JSONObject.fromObject(response_str);
		String code = obj.getString("code");
		String msg = obj.getString("msg");
		if("0".equals(code)){
		}else{
			throw new Exception(msg);
		}
	}

	@Override
	public List<InfoPopulation> getPopUserId(InfoPopulation record)
			throws Exception {
		return infoPopulationMapper.getPopUserId(record);
	}

	@Override
	public List<InfoPopulation> selectIdcardKey(InfoPopulation record) throws Exception {
		return infoPopulationMapper.selectIdcardKey(record);
	}

	/**
	 * 查询人头下所有的房屋
	 * 
	 * 用人头id查业主id、租客id、住户id
	 * 用业主id查未租房
	 * 用租客id查已租房
	 * 用住户id查已租房
	 * 数据合并
	 */
    @Override
    public List<InfoPopulation> selectPopulationHouse(InfoPopulation record) throws Exception {
        List<InfoPopulation> populationHouse = new ArrayList<InfoPopulation>();
        List<InfoPopulation> landlordHouse = infoPopulationMapper.getLandlordHouse(record);
        List<InfoPopulation> renterHouse = infoPopulationMapper.getRenterHouse(record);
        List<InfoPopulation> livingMenHouse = infoPopulationMapper.getLivingMenHouse(record);
        if (!landlordHouse.isEmpty()) {
            for (InfoPopulation item : landlordHouse) {
                if (item.getContStatus() != null && !item.getContStatus().equals("")){
                    switch (item.getContStatus()) {
                        case "正常": item.setContStatus("托管中");break;
                        case "退房完成": item.setContStatus("已解除托管");break;
                        default: item.setContStatus("托管退房中");
                    }
                }
                item.setPopHouseRelation("业主");
                populationHouse.add(item);
            }
        }
        if (!renterHouse.isEmpty()) {
            for (InfoPopulation item : renterHouse) {
                if (item.getContStatus() != null && !item.getContStatus().equals("")){
                    switch (item.getContStatus()) {
                        case "正常": item.setContStatus("在租");break;
                        case "退房完成": item.setContStatus("退租");break;
                        default: item.setContStatus("退房中");
                    }
                }
                item.setPopHouseRelation("承租人");
                populationHouse.add(item);
            }
        }
        if (!livingMenHouse.isEmpty()) {
            for (InfoPopulation item : livingMenHouse) {
                if (item.getContStatus() != null && !item.getContStatus().equals("")){
                    switch (item.getContStatus()) {
                        case "在住": item.setContStatus("在住");break;
                        case "搬离": item.setContStatus("曾住");break;
                    }
                }
                item.setPopHouseRelation("住户");
                populationHouse.add(item);
            }
        }
        return populationHouse;
    }
    
    /**
     * 查询房屋下所有的人头
     * 
     * 用未租房ID，查业主ID、未租房状态
     * 用未租房ID，查已租ID
     * 用已租房ID，查租客ID、已租房状态、住户ID、住户状态
     * 数据合并
     */
    @Override            
    public List<InfoPopulation> selectHousePopulation(InfoPopulation record) throws Exception {
        List<InfoPopulation> housePopulation = new ArrayList<InfoPopulation>();
        List<InfoPopulation> houseLandlord = infoPopulationMapper.getHouseLandlord(record);
        List<InfoPopulation> houseRenter = infoPopulationMapper.getHouseRenter(record);
        List<InfoPopulation> houseLivingMen = infoPopulationMapper.getHouseLivingMen(record);
        if (!houseLandlord.isEmpty()) {
            for (InfoPopulation item : houseLandlord) {
                if (item.getContStatus() != null && !item.getContStatus().equals("")){
                    switch (item.getContStatus()) {
                        case "正常": item.setContStatus("托管中");break;
                        case "退房完成": item.setContStatus("已解除托管");break;
                        default: item.setContStatus("托管退房中");
                    }
                }
                item.setPopRelation("业主");
                housePopulation.add(item);
            }
        }
        if (!houseRenter.isEmpty()) {
            for (InfoPopulation item : houseRenter) {
                if (item.getContStatus() != null && !item.getContStatus().equals("")){
                    switch (item.getContStatus()) {
                        case "正常": item.setContStatus("在租");break;
                        case "退房完成": item.setContStatus("退租");break;
                        default: item.setContStatus("退房中");
                    }
                }
                item.setPopRelation("-");
                housePopulation.add(item);
            }
        }
        if (!houseLivingMen.isEmpty()) {
            for (InfoPopulation item : houseLivingMen) {
                if (item.getContStatus() != null && !item.getContStatus().equals("")){
                    switch (item.getContStatus()) {
                        case "在住": item.setContStatus("在住");break;
                        case "搬离": item.setContStatus("曾住");break;
                    }
                }
                housePopulation.add(item);
            }
        }
        return housePopulation;
    }

	@Override
	public List<InfoPopulation> listHousePopulatinByHrId(InfoPopulation record) throws Exception {
		List<InfoPopulation> housePopulation = new ArrayList<InfoPopulation>();
		List<InfoPopulation> houseLandlord  = infoPopulationMapper.getRentHouseLandlord(record);
        List<InfoPopulation> houseRenter    = infoPopulationMapper.getRentHouseRenter(record);
        List<InfoPopulation> houseLivingMen = infoPopulationMapper.getRentHouseLivingMen(record);
        
        if (!houseLandlord.isEmpty()) {
            for (InfoPopulation item : houseLandlord) {
                if (item.getContStatus() != null && !"".equals(item.getContStatus())){
                    switch (item.getContStatus()) {
                        case "正常": item.setContStatus("托管中");break;
                        case "退房完成": item.setContStatus("已解除托管");break;
                        default: item.setContStatus("托管退房中");
                    }
                }
                item.setPopRelation("业主");
                housePopulation.add(item);
            }
        }
        if (!houseRenter.isEmpty()) {
            for (InfoPopulation item : houseRenter) {
                if (item.getContStatus() != null && !"".equals(item.getContStatus())){
                    switch (item.getContStatus()) {
                        case "正常": item.setContStatus("在租");break;
                        case "退房完成": item.setContStatus("退租");break;
                        default: item.setContStatus("退房中");
                    }
                }
                item.setPopRelation("租客");
                housePopulation.add(item);
            }
        }
        if (!houseLivingMen.isEmpty()) {
            for (InfoPopulation item : houseLivingMen) {
                if (item.getContStatus() != null && !"".equals(item.getContStatus())){
                    switch (item.getContStatus()) {
                        case "在住": item.setContStatus("在住");break;
                        case "搬离": item.setContStatus("曾住");break;
                    }
                }
                item.setPopRelation("住户");
                housePopulation.add(item);
            }
        }
        return housePopulation;
	}


    public InfoPopulation selectPopulationAllUsers() throws Exception {
        return infoPopulationMapper.selectPopulationAllUsers();
    }

    @Override
    public List<InfoPopulation> getHousePopulation(InfoPopulation record) throws Exception {
        List<InfoPopulation> housePopulation = new ArrayList<InfoPopulation>();
        List<InfoPopulation> houseLandlord = infoPopulationMapper.getHouseLandlord(record);
        List<InfoPopulation> houseRenter = infoPopulationMapper.getHouseRenter(record);
        List<InfoPopulation> household = infoPopulationMapper.getHousehold(record);

        if (!houseLandlord.isEmpty()) {
            for (InfoPopulation item : houseLandlord) {
                item.setPopRelation("业主");
                housePopulation.add(item);
            }
        }
        if (!houseRenter.isEmpty()) {
            for (InfoPopulation item : houseRenter) {
                item.setPopRelation("租客");
                housePopulation.add(item);
            }
        }
        if (!household.isEmpty()) {
            for (InfoPopulation item : household) {
                item.setPopRelation("住户");
                housePopulation.add(item);
            }
        }
        return housePopulation;
    }
}
