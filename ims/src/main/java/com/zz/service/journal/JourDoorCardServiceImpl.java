package com.zz.service.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.actions.commons.JavaSmsApi;
import com.zz.actions.commons.ShieldingWords;
import com.zz.datasource.MyDataSource;
import com.zz.datasource.MyDataSourceMapper;
import com.zz.mapper.info.InfoContractInstallmentMapper;
import com.zz.mapper.info.InfoFacePersonMapper;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.info.InfoPopulationMapper;
import com.zz.mapper.journal.JourDeviceMapper;
import com.zz.mapper.journal.JourDoorCardMapper;
import com.zz.mapper.journal.JourHsDeviceMapper;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.mapper.sys.SysVariablesMapper;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.info.InfoFacePerson;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoPopulation;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourDoorCard;
import com.zz.po.journal.JourHsDevice;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.sys.SysSystemSetting;
import com.zz.service.sys.SysSystemSettingService;
import com.zz.util.DateUtil;
import com.zz.util.MySqlSessionFactory;
import com.zz.util.SessionUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

public class JourDoorCardServiceImpl implements JourDoorCardService {

    //	private final static String POSTURL = "http://127.0.0.1:8080/device/api";
    private final static String POSTURL = "http://www.fangzhizun.com/device/api";
    private final static String YUNHAIPOSTURL = "http://www.fangzhizun.com/device/Interface/ControlDevice";
    //添加人员
//	private final static String  = "http://www.fangzhizun.com/device/wo/PersonController";
//	private final static String  = "http://127.0.0.1:8080/device/wo/PersonController";
    //删除人员
//	private final static String DELETEPOSTEMAN = "http://www.fangzhizun.com/device/wo/DeletePerson";
//	private final static String DELETEPOSTEMAN = "http://127.0.0.1:8080/device/wo/DeletePerson";
    //修改人员信息
//	private final static String UPDATEPOSTEMAN = "http://www.fangzhizun.com/device/wo/UpdatePerson";
//	private final static String UPDATEPOSTEMAN = "http://127.0.0.1:8080/device/wo/UpdatePerson";
    //删除卡片权限
//	private final static String UPDATEPERSONINFORMATION = "http://www.fangzhizun.com/device/wo/UpdatePersonInformation";
//	private final static String UPDATEPERSONINFORMATION = "http://127.0.0.1:8080/device/wo/UpdatePersonInformation";
    //删除照片权限
//	private final static String UPDATEPHOTOINFORMATION = "http://www.fangzhizun.com/device/wo/UpdatePhotoInformation";
//	private final static String UPDATEPHOTOINFORMATION = "http://127.0.0.1:8080/device/wo/UpdatePhotoInformation";

    ShieldingWords sw = new ShieldingWords();
    private JourDoorCardMapper jourDoorCardMapper;
    @Resource
    private SysVariablesMapper sysVariablesMapper;
    @Resource
    private InfoHouse4storeMapper infoHouse4storeMapper;
    @Resource
    private InfoContractInstallmentMapper infoContractInstallmentMapper;
    @Resource
    private JourDeviceMapper jourDeviceMapper;
    @Resource
    private SysSystemSettingService sysSystemSettingService;
    @Resource
    private DeviceService deviceService;
    @Resource
    private JourHsDeviceMapper jourHsDeviceMapper;
    @Resource
    private JournalAttachmentMapper journalAttachmentMapper;
    @Resource
    private InfoPopulationMapper infoPopulationMapper;
    @Resource
    private InfoFacePersonMapper infoFacePersonMapper;

    public void setJourDoorCardMapper(JourDoorCardMapper jourDoorCardMapper) {
        this.jourDoorCardMapper = jourDoorCardMapper;
    }
	/*public String insertDoorCards (JourDevice jourDevice) throws Exception{
		List<JourDevice> list = JSONObject.parseArray(jourDevice.getDoorCardJson(), JourDevice.class);
		list.add(1);
		
		JSONArray ary = new JSONArray();
		for(Integer i : list){
			if(dianyi){
				*****
			}
			if(yunhai){
				JSONObject obj = new JSONObject();
				obj.put("a",i);
				ary.add(obj);
			}
		}
		System.out.println(ary);
	}*/

    /**
     * 批量发卡（系统所有设备，跟勾选无关）
     *
     * @param jourDoorCard
     * @return
     * @throws Exception
     */
    @Override
    public String pushingCard(JourDoorCard jourDoorCard) throws Exception {
        List<JourDevice> list = jourDeviceMapper.selectAllDevice(new JourDevice());

        HttpSession session = ServletActionContext.getRequest().getSession();
        String coId = (String) session.getAttribute("coId");

        List<JourDoorCard> jdcList = new ArrayList<>();
        if (list.size() > 0) {
            for (JourDevice jc1 : list) {
                //没绑房的设备不发卡
                List<JourHsDevice> listJdcHsId = jourHsDeviceMapper.selectThisHsIdByDeviceId(jc1.getId());
                if (listJdcHsId.isEmpty()) {
                    continue;
                }
                JSONArray ary = new JSONArray();
                if (jc1.getDevBrandId() == 10 && jc1.getDevFirstType() == 3) {//电易
                    String startTime = DateUtil.getCurDateTime();
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("brandId", "10");
                    map.put("instruction", "发卡");
                    map.put("appKey", jc1.getDevAuthId());
                    map.put("secret", jc1.getDevAuthSecret());
                    map.put("mobile", jc1.getDevUsername());
                    map.put("password", jc1.getDevPassword());
                    map.put("cardNo", jourDoorCard.getJdcCardId());
                    map.put("startTime", startTime);
                    map.put("endTime", jourDoorCard.getJdcDeadlineTime());
                    map.put("code", jc1.getDevSpare2());
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("code") != 1) {
                        throw new Exception("发卡失败");
                    }
                } else if (jc1.getDevBrandId() == 20 && jc1.getDevFirstType() == 3
                        && (jc1.getDevSecondType() == 22 || jc1.getDevSecondType() == 24)) {//新云海
                    JSONObject obj = new JSONObject();
                    obj.put("brandId", jc1.getDevBrandId() + "");
                    obj.put("sn", jc1.getDevAuthId());
                    obj.put("isNeedCache", "true");
                    obj.put("mac", jc1.getDevAuthSecret());
                    obj.put("status", "A5" + jourDoorCard.getJdcCardId());
                    if (jc1.getDevSecondType() == 22) {
                        obj.put("devSecondType", "22");
                    }
                    ary.add(obj);
                    String str = JSON.toJSONString(ary);
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("controlsJson", str);
                    String responseText = HttpRequestUtil.post(YUNHAIPOSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("code") != 0) {
                        throw new Exception(job.getString("msg"));
                    }
                } else if (jc1.getDevBrandId() == 20 && jc1.getDevFirstType() == 3 && jc1.getDevSecondType() == 23) {//云海键盘锁
                    System.out.println("3  23  20  25 智能门锁");
                    JSONObject obj = new JSONObject();
                    obj.put("brandId", jc1.getDevBrandId() + "");
                    obj.put("sn", jc1.getDevAuthId());
                    obj.put("isNeedCache", "true");
                    obj.put("mac", jc1.getDevAuthSecret());
                    obj.put("status", "A50000" + jourDoorCard.getJdcCardId());
                    obj.put("devSecondType", "23");
                    ary.add(obj);

                    String str = JSON.toJSONString(ary);
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("controlsJson", str);
                    String responseText = HttpRequestUtil.post(YUNHAIPOSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("code") != 0) {
                        throw new Exception(job.getString("msg"));
                    }
                }
                if (jc1.getDevFirstType() == 3) {
                    JourDoorCard jdc = new JourDoorCard();
                    jdc.setJdcHsId(listJdcHsId.get(0).getJhdHsId());
                    jdc.setJdcRegisteredTime(jourDoorCard.getJdcRegisteredTime());
                    jdc.setJdcPublishTime(jourDoorCard.getJdcPublishTime());
                    jdc.setJdcCardId(jourDoorCard.getJdcCardId());
                    jdc.setJdcCardNum(jourDoorCard.getJdcCardNum());
                    jdc.setJdcDeadlineTime(jourDoorCard.getJdcDeadlineTime());
                    jdc.setJdcState(jourDoorCard.getJdcState());
                    jdc.setJdcOperatingRecording(jourDoorCard.getJdcOperatingRecording());
                    jdc.setJdcDeviceId(jc1.getId());
                    jdc.setJdcPassword(jc1.getDevPassword());
                    jdcList.add(jdc);
                }
            }
            Map<String, Object> insertMap = new HashMap<>();
            insertMap.put("doorCardList", jdcList);
            jourDoorCardMapper.insertList(insertMap);
            return "1";
        }
        return "-1";
    }


    @Override
    public String insertDoorCard(JourDoorCard jourDoorCard) throws Exception {
        List<JourDoorCard> list = JSONObject.parseArray(jourDoorCard.getDoorCardJson(), JourDoorCard.class);
        System.out.println("jdcPassword:::::" + list.get(0).getJdcPassword());
        if (list.get(0).getJdcPassword() == null) {
            for (JourDoorCard jdc1 : list) {
                System.out.println("===============================" + jdc1.getPersonType());
                Integer id = jdc1.getJdcDeviceId();
                JourDevice jourDevice = deviceService.selectSingle(id);
                //添加人员授权入口
                if (jourDevice.getDevBrandId() == 22) {
                    InfoPopulation infoPopulation = new InfoPopulation();
                    InfoFacePerson infoFacePerson = null;
                    //租客模块使用的
                    if (null != jdc1.getPopId()) {
                        infoPopulation.setPopId(jdc1.getPopId());
                        int popId = jdc1.getPopId();
                        infoFacePerson = infoFacePersonMapper.selectByPrimaryKey(popId);
                        //List<InfoPopulation> infoPopulations = infoPopulationMapper.selectByPrimaryKey(infoPopulation);
                    }
                    System.out.println("++++++++++++++++" + jdc1.getJdcUserId());
                    //用户管理模块使用的
                    if (null != jdc1.getJdcUserId()) {
                        int userId = jdc1.getJdcUserId();
                        infoFacePerson = infoFacePersonMapper.selectByPrimaryTag(userId);
                        System.out.println("dsfsdf+" + infoFacePerson);
                    }
                    String att = jdc1.getAtt();
                    String url = "";
                    if (att.length() > 0) {
                        JournalAttachment journalAttachment = journalAttachmentMapper.selectByAtt(att);
                        String path = journalAttachment.getPath();
                        url = "[" + path + "]";
                    }
                    if (null == infoFacePerson) {
                        if ("".equals(url) && jdc1.getImg().length() < 0) {
                            return "照片不能为空！";
                        } else {
                            System.out.println("添加人员授权");
                            String startTime = DateUtil.getCurDateTime();
                            Map<String, String> map = new HashMap<String, String>();
                            map.put("name", jdc1.getPopName());
                            map.put("cardNo", jdc1.getJdcCardNum());
                            map.put("tag", ((null == jdc1.getJdcUserId()) ? "" : jdc1.getJdcUserId().toString()));
                            map.put("coId", jdc1.getCoid());
                            map.put("url", url);
                            map.put("phone", "");
                            map.put("popId", ((null == jdc1.getPopId()) ? "" : jdc1.getPopId().toString()));
                            map.put("base64", jdc1.getImg());
                            map.put("personType", jdc1.getPersonType());
                            map.put("brandId", jourDevice.getDevBrandId().toString());
                            map.put("instruction", "添加人员");
                            map.put("deviceKey", jourDevice.getDevSn());
                            System.out.println("map:" + map);
                            String responseText = HttpRequestUtil.post(POSTURL, map);

                            System.out.println(responseText);
                            if (responseText == null && "".equals(responseText)) {
                                return "添加失败！";
                            } else {
                                JSONObject job = JSONObject.parseObject(responseText);
                                System.out.println("0000000000000:" + job);
                                if (job.getInteger("result") != 1) {
                                    return job.getString("msg");
                                } else {
                                    if (url.length() > 0) {
                                        try {
                                            journalAttachmentMapper.deleteByAtt(att);
                                        } catch (Exception e) {

                                        }
                                    }
                                }
                            }

                        }
                    } else {
                        if ("".equals(url) && jdc1.getImg().length() <= 0 && jdc1.getJdcCardNum().length() <= 0) {
                            return "没有更改信息！";
                        } else {
                            System.out.println("跟新信息");
                            Map<String, String> map = new HashMap<String, String>();
                            map.put("guid", infoFacePerson.getIfpGuid());
                            map.put("url", url);
                            map.put("coId", jdc1.getCoid());
                            map.put("cardNo", jdc1.getJdcCardNum());
                            map.put("base64", jdc1.getImg());
                            map.put("brandId", jourDevice.getDevBrandId().toString());
                            map.put("instruction", "修改人员");
                            String responseText = null;
                            try {
                                responseText = HttpRequestUtil.post(POSTURL, map);
                            } catch (Exception e) {
                                return "设备不在线！";
                            }
                            System.out.println(responseText);
                            if (responseText == null) {
                                return "跟新失败！";
                            } else {
                                System.out.println(responseText);
                                JSONObject job = JSONObject.parseObject(responseText);
                                if (job.getInteger("result") != 1) {
                                    return job.getString("msg");
                                } else {
                                    int i = jourDoorCardMapper.updateDoorCard1(jdc1);
                                    if (url.length() > 0) {
                                        try {
                                            journalAttachmentMapper.deleteByAtt(att);
                                        } catch (Exception e) {

                                        }
                                    }

                                }
                            }
                        }

                    }


                }
                if (jourDevice.getDevBrandId() == 10) {
                    String startTime = DateUtil.getCurDateTime();
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("brandId", "10");
                    map.put("instruction", "发卡");
                    map.put("appKey", jourDevice.getDevAuthId());
                    map.put("secret", jourDevice.getDevAuthSecret());
                    map.put("mobile", jourDevice.getDevUsername());
                    map.put("password", jourDevice.getDevPassword());
                    map.put("cardNo", jdc1.getJdcCardId());
                    map.put("startTime", startTime);
                    map.put("endTime", jdc1.getJdcDeadlineTime());
                    map.put("code", jourDevice.getDevSpare2());
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("code") != 1) {
                        throw new Exception("发卡失败");
                    }
                }

                if (jourDevice.getDevBrandId() == 17) {
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("instruction", "控制设备1");
                    map.put("brandId", jourDevice.getDevBrandId() + "");
                    map.put("devUsername", jourDevice.getDevUsername());
                    map.put("devPassword", jourDevice.getDevPassword());
                    map.put("devId", jourDevice.getId() + "");
                    map.put("devAuthId", jourDevice.getDevAuthId());
                    map.put("type", jourDevice.getDevAuthSecret());
                    map.put("state", "A5" + jdc1.getJdcCardId());
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("code") != 1) {
                        throw new Exception("发卡失败");
                    }
                }

                if (jourDevice.getDevBrandId() == 20 && jourDevice.getDevFirstType() == 3
                        && (jourDevice.getDevSecondType() == 22 || jourDevice.getDevSecondType() == 23 || jourDevice.getDevSecondType() == 24 || jourDevice.getDevSecondType() == 40)) {
                    Map<String, String> map = new HashMap<String, String>();
                    HttpSession session = ServletActionContext.getRequest().getSession();
                    String coId = (String) session.getAttribute("coId");
                    map.put("coId", coId);
                    map.put("brandId", jourDevice.getDevBrandId() + "");
//                    map.put("sn", jourDevice.getDevAuthId());
                    map.put("devId", jourDevice.getId() + "");
                    map.put("doorCardId", jdc1.getJdcCardId());
                    map.put("status", "注册IC卡");
                    map.put("instruction", "控制设备-门锁");
//                    if (jourDevice.getDevSecondType() == 40){
//                        map.put("isNeedCache", "false");
//                    }else {
//                        map.put("isNeedCache", "true");
//                    }
//                    map.put("mac", jourDevice.getDevAuthSecret());
                    for (String key : map.keySet()) {
                        System.out.println("key=" + key + " value=" + map.get(key));
                    }
                    System.out.println("map =============== " + map);
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if(job.getInteger("code") != 0){
                        return "-1";
                    }
                }

            }
        }
        for (JourDoorCard jdc1 : list) {
            Integer id = jdc1.getJdcDeviceId();
            JourDevice jourDevice = null;
            if (id == null) {
                List<Integer> idsByHsId = jourHsDeviceMapper.selectDeviceIdsByHsId(jdc1.getJdcHsId());
                jourDevice = deviceService.selectSingle(idsByHsId.get(0));
            } else {
                jourDevice = deviceService.selectSingle(id);
            }

            if (jourDevice.getDevBrandId() == 22) {

                InfoFacePerson infoFacePerson = null;
                if (null != jdc1.getPopId()) {
                    System.out.println();
                    int popId = jdc1.getPopId();
                    infoFacePerson = infoFacePersonMapper.selectByPrimaryKey(popId);
                    System.out.println(jdc1.getPopId());
                }
                System.out.println("++++++++++++++++" + jdc1.getUserId());
                if (null != jdc1.getJdcUserId()) {
                    int userId = jdc1.getJdcUserId();
                    System.out.println(userId);
                    infoFacePerson = infoFacePersonMapper.selectByPrimaryTag(userId);
                }

                System.out.println("我要看輸出" + infoFacePerson);
                if (null == infoFacePerson) {
                    Map<String, Object> map = new HashMap<>();
                    list.get(0).setJdcEquipmentType("面部识别");
                    map.put("doorCardList", list);

                    if (list.get(0).getJdcPassword() != null) {
                        JourDoorCard jourDoorCard1 = list.get(0);
                        sendLockPassword(jourDoorCard1);
                    }

                    jourDoorCardMapper.insertList(map);
                    list.get(0).setJdcEquipmentType("卡片");
                    map.put("doorCardList", list);
                    if (list.get(0).getJdcPassword() != null) {
                        JourDoorCard jourDoorCard1 = list.get(0);
                        sendLockPassword(jourDoorCard1);
                    }
                    jourDoorCardMapper.insertList(map);

                } else {
                    Map<String, Object> map = new HashMap<>();
                    map.put("doorCardList", list);
                    if (list.get(0).getJdcPassword() != null) {
                        JourDoorCard jourDoorCard1 = list.get(0);
                        sendLockPassword(jourDoorCard1);
                    }
                }
            } else {
                Map<String, Object> map = new HashMap<>();
                map.put("doorCardList", jdc1);
                if (list.get(0).getJdcPassword() != null) {
                    JourDoorCard jourDoorCard1 = list.get(0);
                    sendLockPassword(jourDoorCard1);
                }
                jourDoorCardMapper.insertSelective(jdc1);

            }
        }

		/*Map<String, Object> map = new HashMap<>();
		map.put("doorCardList", list);
		if(list.get(0).getJdcPassword() != null){
			JourDoorCard jourDoorCard1 = list.get(0);
			sendLockPassword(jourDoorCard1);
		}
		System.out.println("****"+map);
		jourDoorCardMapper.insertList(map);
		JourDoorCard jdc = new JourDoorCard();
		jdc = list.get(0);
		creatBill(jdc);*/
        JourDoorCard jdc = new JourDoorCard();
        jdc = list.get(0);
        creatBill(jdc);
        return "1";

    }


    /**
     * 发送门锁密码
     *
     * @throws Exception
     */
    private String sendLockPassword(JourDoorCard jourDoorCard) throws Exception {
        String data = "";
        String company = "";
        String mobile = "";
        String houseAddress = "";
        String coId = "";
        Double smsBalance = 0.0;
        String lockPassword = jourDoorCard.getJdcPassword();
        // 获取公司名
        company = SessionUtil.getSession("company");
        coId = SessionUtil.getSession("coId");
        //获取短信key、单价、余额
        String keydate = smsInformation();

        // 获取姓名，手机号码
        try {
            mobile = jourDoorCard.getSendPhone();
            houseAddress = jourDoorCard.getHouseAddress();


            data = mobile + "###" + lockPassword + "###" + houseAddress + "###" + company + "###" + coId + keydate;
            System.out.println("impl " + data);
            //查找屏蔽词，替换
            data = sw.matchedMaskWord(data);

            //执行
            System.out.println("data:" + data);
            String smsDate = JavaSmsApi.sendLockPassword(data);
            //获取发送后的返回值
            String[] sdata = smsDate.split("###");
            JSONObject jsStr = JSONObject.parseObject(sdata[0]);
            String strnum = jsStr.getString("code");
            String count = "0";

            String[] temp = keydate.split("###");
            smsBalance = Double.parseDouble(temp[3]);
            if (strnum.equals("0")) {
                count = sdata[1];
                smsBalance = Double.parseDouble(sdata[3]);
                strnum += "###" + count + "###" + sdata[2] + "###" + smsBalance;
                System.out.println(sdata[1] + "---- " + count);
            } else {
                strnum = strnum + "###" + count + "###" + sdata[2] + "###" + smsBalance;
            }
            System.out.println("--我要查的东西-" + strnum);
            return strnum;
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        }
        return null;
    }

    //获取短信key、单价、余额
    private String smsInformation() throws Exception {
        SysSystemSetting sst = sysSystemSettingService.selectByPrimaryKey(1);
        String smsKey = sst.getSsitShortMessageInterface();
        String password = sst.getSsitPassword();
        Double smsPrice = sst.getSsitSmsUnitPrice();
        Double smsBalance = sst.getSsitSmsAccountBalance();
        String autograph = sst.getSsitIdentification();
        String temp = "###" + smsKey + "###" + smsPrice + "###" + smsBalance + "###" + autograph + "###" + password;
        System.out.println("获取短信key、单价、余额:" + smsKey + " ### " + smsPrice + " ### " + smsBalance + "###" + autograph + "###" + password);
        return temp;
    }

    /**
     * 生成临时账单
     *
     * @throws Exception
     */
    private void creatBill(JourDoorCard jourDoorCard) throws Exception {
        Double houseDeposit = 0.0;
        if (jourDoorCard.getDoorCardFeeDeposit() != null && jourDoorCard.getDoorCardFeeDeposit() > 0) {
            houseDeposit += jourDoorCard.getDoorCardFeeDeposit();
        }

        if (jourDoorCard.getDoorCardFeeDeposit() != null && jourDoorCard.getDoorCardMaterialFee() > 0) {
            houseDeposit += jourDoorCard.getDoorCardMaterialFee();
        }

        if (houseDeposit > 0) {
            String time1 = getTime();
            InfoContractInstallment infoContractInstallment = new InfoContractInstallment();

            infoContractInstallment.setJciRegisterPeople(jourDoorCard.getRegisterPeopleId());
            infoContractInstallment.setJciHouse4rentId(jourDoorCard.getJdcHrId());
            infoContractInstallment.setJciHouse4storeId(jourDoorCard.getJdcHsId());
            infoContractInstallment.setJciDepartment(jourDoorCard.getDepartmentId());
            infoContractInstallment.setJciStorefront(jourDoorCard.getStorefrontId());
            infoContractInstallment.setJciLandlordId(jourDoorCard.getLandlordId());
            infoContractInstallment.setJciRenterId(jourDoorCard.getRenterId());
            infoContractInstallment.setJciFukuanri(time1);
            infoContractInstallment.setJciBeginPeriods(time1);
            infoContractInstallment.setJciEndPeriods(time1);
            infoContractInstallment.setJciNature("应收");
            infoContractInstallment.setJciType("租客租金");
            infoContractInstallment.setJciMoney(houseDeposit);
            infoContractInstallment.setJciState("待收");
            infoContractInstallment.setJciLabelType(1);
            String billJson = getBillJosn(infoContractInstallment, jourDoorCard);
            infoContractInstallment.setJciBillJson(billJson);
            System.out.println(infoContractInstallment);
            infoContractInstallmentMapper.insertSelective(infoContractInstallment);
        }
    }

    /**
     * 获取当前时间 年月日格式
     *
     * @return
     */
    private String getTime() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(date);
        return time;
    }

    /**
     * 生成临时账单json串
     *
     * @return
     */
    private String getBillJosn(InfoContractInstallment ici, JourDoorCard jourDoorCard) {
        JSONObject jobj = new JSONObject();
        JSONArray array = new JSONArray();
        jobj.put("jciRegisterPeople", ici.getJciRegisterPeople());
        jobj.put("jciHouse4rentId", ici.getJciHouse4rentId());
        jobj.put("jciHouse4storeId", ici.getJciHouse4storeId());
        jobj.put("jciDepartment", ici.getJciDepartment());
        jobj.put("jciStorefront", ici.getJciStorefront());
        jobj.put("jciLandlordId", ici.getJciLandlordId());
        jobj.put("jciRenterId", ici.getJciRenterId());
        jobj.put("jciFukuanri", ici.getJciFukuanri());
        jobj.put("jciNature", "应收");
        jobj.put("jciType", "租客租金");

        //门卡押金
        if (jourDoorCard.getDoorCardFeeDeposit() != null && jourDoorCard.getDoorCardFeeDeposit() != 0) {
            jobj.put("jciMoney", jourDoorCard.getDoorCardFeeDeposit());
            jobj.put("jciRemark", "");
            jobj.put("jciLabelType", "1");
            jobj.put("nature", "收入");
            jobj.put("classification", "押金类");
            jobj.put("species", "门卡押金");
            jobj.put("random", (int) ((Math.random() * 9 + 1) * 10000000));
            array.add(jobj);
        }

        JSONObject jobj1 = (JSONObject) jobj.clone();
        if (jourDoorCard.getDoorCardMaterialFee() != null && jourDoorCard.getDoorCardMaterialFee() != 0) {
            //门卡押金
            jobj1.put("jciMoney", jourDoorCard.getDoorCardMaterialFee());
            jobj1.put("jciRemark", "");
            jobj1.put("jciLabelType", "1");
            jobj1.put("nature", "收入");
            jobj1.put("classification", "主营类");
            jobj1.put("species", "门卡工本费");
            jobj1.put("random", (int) ((Math.random() * 9 + 1) * 10000000));
            array.add(jobj1);
        }

        return array.toString();
    }

    @Override
    public List<JourDoorCard> listDoorCard(JourDoorCard jourDoorCard) throws Exception {
        return jourDoorCardMapper.selectByPrimaryKey(jourDoorCard);
    }

    @Override
    public String updateDoorCard(JourDoorCard jourDoorCard) throws Exception {
        System.out.println("进来了，且数据为 " + jourDoorCard);
        int result = jourDoorCardMapper.updateDoorCard(jourDoorCard);
        Integer popId = jourDoorCard.getPopId();
        Integer id = jourDoorCard.getJdcDeviceId();
		/*JourDevice jd = new JourDevice();
		jd.setDevId(devId+"");
		System.out.println("jd:"+jd.toString());*/
        //System.out.println("id:"+id);
        JourDevice jourDevice = deviceService.selectSingle(id);
        System.out.println("设备信息    " + jourDevice);
        if (jourDevice == null) {
            return "该记录缺少数据，删除过的锁无法再操作";
        }
        //type 3  为续期 续期不执行注销卡操作
        if (jourDevice.getDevBrandId() == 17 && jourDoorCard.getType() != 3) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("instruction", "控制设备1");
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("devUsername", jourDevice.getDevUsername());
            map.put("devPassword", jourDevice.getDevPassword());
            map.put("devId", jourDevice.getId() + "");
            map.put("devAuthId", jourDevice.getDevAuthId());
            map.put("type", jourDevice.getDevAuthSecret());
            map.put("state", "A6" + jourDoorCard.getJdcCardId());
            System.out.println(map);
            String responseText = HttpRequestUtil.post(POSTURL, map);
            JSONObject job = JSONObject.parseObject(responseText);
            if (job.getInteger("code") != 1) {
                throw new Exception("注销失败");
            }
            return result + "";
        } else if (jourDevice.getDevBrandId() == 10 && jourDoorCard.getType() != 3) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("instruction", "删卡");
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("devUsername", jourDevice.getDevUsername());
            map.put("devPassword", jourDevice.getDevPassword());
            map.put("appKey", jourDevice.getDevAuthId());
            map.put("secret", jourDevice.getDevAuthSecret());
            map.put("cardNo", jourDoorCard.getJdcCardId());
            map.put("code", jourDevice.getDevSpare2());
            String responseText = HttpRequestUtil.post(POSTURL, map);
            JSONObject job = JSONObject.parseObject(responseText);
            if (job.getInteger("code") != 0) {
                JSONObject bodyJson = JSONObject.parseObject(job.getString("body"));
                if (bodyJson.get("msg").equals("该门卡不存在")) {
                    return "该门卡不存在";
                } else {
                    throw new Exception("注销失败");
                }
            }
        } else if (jourDevice.getDevBrandId() == 20 && jourDevice.getDevFirstType() == 3
                && (jourDevice.getDevSecondType() == 22 || jourDevice.getDevSecondType() == 23 || jourDevice.getDevSecondType() == 24 || jourDevice.getDevSecondType() == 40)) {
            Map<String, String> map = new HashMap<String, String>();
            HttpSession session = ServletActionContext.getRequest().getSession();
            String coId = (String) session.getAttribute("coId");
            map.put("coId", coId);
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("sn", jourDevice.getDevAuthId());
            map.put("devId",jourDevice.getId()+"");
            //密码锁注销控制
            if(jourDoorCard.getJdcPassword()!=null&&!jourDoorCard.getJdcPassword().equals("")
					&&(jourDoorCard.getJdcCardId()==null||jourDoorCard.getJdcCardId().equals(""))){
				map.put("status", "注销所有用户密码");
				map.put("devAuthId", jourDevice.getDevAuthId());
				map.put("devAuthSecret", jourDevice.getDevAuthSecret());
			}else{
				map.put("doorCardId",jourDoorCard.getJdcCardId());
				map.put("status", "注销IC卡");
			}
            map.put("instruction", "控制设备-门锁");
            if (jourDevice.getDevSecondType() == 40){
                map.put("isNeedCache", "false");
            }else {
                map.put("isNeedCache", "true");
            }
            map.put("mac", jourDevice.getDevAuthSecret());
            for (String key : map.keySet()) {
                System.out.println("key=" + key + " value=" + map.get(key));
            }
            String responseText = HttpRequestUtil.post(POSTURL, map);
            JSONObject job = JSONObject.parseObject(responseText);
            String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
            String dir = "D:/Journal/fzz-sql";
            Syslog.writeLog(responseText, path, dir);
            if (job.getInteger("code") != 0) {
                JSONArray bodyJson = JSONArray.parseArray(job.getString("body"));
                if (bodyJson == null || bodyJson.isEmpty()) {
                    throw new Exception(job.getString("msg"));
                } else if ("该门卡不存在".equals(bodyJson.getJSONObject(0).get("msg"))) {
                    return "该门卡不存在";
                } else {
                    throw new Exception(job.getString("msg"));
                }
            }
        } else if (jourDevice.getDevBrandId() == 20
                && jourDevice.getDevFirstType() == 3 && jourDevice.getDevSecondType() == 23) {
            System.out.println("==== 20 25 3 23 A60000 新云海智能门锁操作 ====");
            Map<String, String> map = new HashMap<String, String>();
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("instruction", "控制设备");
            map.put("sn", jourDevice.getDevAuthId());
            map.put("isNeedCache", "true");
            map.put("mac", jourDevice.getDevAuthSecret());
            map.put("status", "A60000" + jourDoorCard.getJdcCardId());
            map.put("devSecondType", "23");
            String responseText = HttpRequestUtil.post(POSTURL, map);
            JSONObject job = JSONObject.parseObject(responseText);
            String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
            String dir = "D:/Journal/fzz-sql";
            Syslog.writeLog(responseText, path, dir);
            if (job.getInteger("code") != 0) {
                JSONArray bodyJson = JSONArray.parseArray(job.getString("body"));
                if (bodyJson == null || bodyJson.isEmpty()) {
                    throw new Exception(job.getString("msg"));
                } else if ("该门卡不存在".equals(bodyJson.getJSONObject(0).get("msg"))) {
                    return "该门卡不存在";
                } else {
                    throw new Exception(job.getString("msg"));
                }
            }
        } else if (jourDevice.getDevBrandId() == 22) {
            System.out.println("System.out.println(popId);");
            System.out.println(popId);

            InfoFacePerson infoFacePeople = null;
            try {
                infoFacePeople = infoFacePersonMapper.selectByPrimaryKey(popId);
            } catch (Exception e) {
                e.printStackTrace();
            }
            System.out.println(infoFacePeople);
            if (null == infoFacePeople) {
                return "-1";
            } else {
                if ("卡片".equals(jourDoorCard.getJdcEquipmentType())) {
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("guid", infoFacePeople.getIfpGuid());
                    map.put("brandId", jourDevice.getDevBrandId().toString());
                    map.put("instruction", "删除卡片");
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("result") != 1) {
                        return "-2";
                    }
                } else {
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("guid", infoFacePeople.getIfpGuid());
                    map.put("brandId", jourDevice.getDevBrandId().toString());
                    map.put("instruction", "删除图片");
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("result") != 1) {
                        return "-2";
                    }
                }
				/*System.out.println(infoFacePeople.getIfpGuid());
				Map<String, String> map = new HashMap<String, String>();
				map.put("guid",infoFacePeople.getIfpGuid());
				String responseText = HttpRequestUtil.post(DELETEPOSTEMAN, map);
				JSONObject job = JSONObject.parseObject(responseText);
				if(job.getInteger("result") != 1){
					throw new Exception("注销失败");
				}else{
					infoFacePersonMapper.deleteByPrimaryKey(popId);
				}*/
            }

        } else {
            return "-1";
        }
        return "1";
    }

    @Override
    public String deleteDoorCard(JourDoorCard jourDoorCard) throws Exception {
        System.out.println("进来了");
        jourDoorCard.getJdcUserId();
        List<JourDoorCard> jourDoorCards = jourDoorCardMapper.selectByPrimaryUserId(jourDoorCard);
        int result = jourDoorCards.size();
        System.out.println(result);
        if (result == 0) {
            System.out.println("return ===========");
            return "1";
        }
        for (JourDoorCard jdc : jourDoorCards) {
            Integer userId = jdc.getJdcUserId();
            Integer id = jdc.getJdcDeviceId();
            JourDevice jourDevice = deviceService.selectSingle(id);
            System.out.println("设备信息    " + jourDevice);
            if (jourDevice == null) {
                return "该记录缺少数据，删除过的锁无法再操作";
            }
            //type 3  为续期 续期不执行注销卡操作
            if (jourDevice.getDevBrandId() == 17 && jourDoorCard.getType() != 3) {
                Map<String, String> map = new HashMap<String, String>();
                map.put("instruction", "控制设备1");
                map.put("brandId", jourDevice.getDevBrandId() + "");
                map.put("devUsername", jourDevice.getDevUsername());
                map.put("devPassword", jourDevice.getDevPassword());
                map.put("devId", jourDevice.getId() + "");
                map.put("devAuthId", jourDevice.getDevAuthId());
                map.put("type", jourDevice.getDevAuthSecret());
                map.put("state", "A6" + jourDoorCard.getJdcCardId());
                System.out.println(map);
                String responseText = HttpRequestUtil.post(POSTURL, map);
                JSONObject job = JSONObject.parseObject(responseText);
                if (job.getInteger("code") != 1) {
                    throw new Exception("注销失败");
                }
                return result + "";
            } else if (jourDevice.getDevBrandId() == 10 && jourDoorCard.getType() != 3) {
                Map<String, String> map = new HashMap<String, String>();
                map.put("instruction", "删卡");
                map.put("brandId", jourDevice.getDevBrandId() + "");
                map.put("devUsername", jourDevice.getDevUsername());
                map.put("devPassword", jourDevice.getDevPassword());
                map.put("appKey", jourDevice.getDevAuthId());
                map.put("secret", jourDevice.getDevAuthSecret());
                map.put("cardNo", jourDoorCard.getJdcCardId());
                map.put("code", jourDevice.getDevSpare2());
                String responseText = HttpRequestUtil.post(POSTURL, map);
                JSONObject job = JSONObject.parseObject(responseText);
                if (job.getInteger("code") != 0) {
                    JSONObject bodyJson = JSONObject.parseObject(job.getString("body"));
                    if (bodyJson.get("msg").equals("该门卡不存在")) {
                        return "该门卡不存在";
                    } else {
                        throw new Exception("注销失败");
                    }
                }
            } else if (jourDevice.getDevBrandId() == 20 && jourDevice.getDevFirstType() == 3
                    && (jourDevice.getDevSecondType() == 22 || jourDevice.getDevSecondType() == 23 || jourDevice.getDevSecondType() == 24 || jourDevice.getDevSecondType() == 40)) {
                Map<String, String> map = new HashMap<String, String>();
                HttpSession session = ServletActionContext.getRequest().getSession();
                String coId = (String) session.getAttribute("coId");
                map.put("coId", coId);
                map.put("brandId", jourDevice.getDevBrandId() + "");
                map.put("sn", jourDevice.getDevAuthId());
                map.put("devId", jourDevice.getId() + "");
                map.put("doorCardId", jourDoorCard.getJdcCardId());
                map.put("status", "注销IC卡");
                map.put("instruction", "控制设备-门锁");
                if (jourDevice.getDevSecondType() == 40){
                    map.put("isNeedCache", "false");
                }else {
                    map.put("isNeedCache", "true");
                }
                map.put("mac", jourDevice.getDevAuthSecret());
                for (String key : map.keySet()) {
                    System.out.println("key=" + key + " value=" + map.get(key));
                }
                String responseText = HttpRequestUtil.post(POSTURL, map);
                JSONObject job = JSONObject.parseObject(responseText);
                String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
                String dir = "D:/Journal/fzz-sql";
                Syslog.writeLog(responseText, path, dir);
                if (job.getInteger("code") != 0) {
                    JSONArray bodyJson = JSONArray.parseArray(job.getString("body"));
                    if (bodyJson == null || bodyJson.isEmpty()) {
                        throw new Exception(job.getString("msg"));
                    } else if ("该门卡不存在".equals(bodyJson.getJSONObject(0).get("msg"))) {
                        return "该门卡不存在";
                    } else {
                        throw new Exception(job.getString("msg"));
                    }
                }
            } else if (jourDevice.getDevBrandId() == 20
                    && jourDevice.getDevFirstType() == 3 && jourDevice.getDevSecondType() == 23) {
                System.out.println("==== 20 25 3 23 A60000 新云海智能门锁操作 ====");
                Map<String, String> map = new HashMap<String, String>();
                map.put("brandId", jourDevice.getDevBrandId() + "");
                map.put("instruction", "控制设备");
                map.put("sn", jourDevice.getDevAuthId());
                map.put("isNeedCache", "true");
                map.put("mac", jourDevice.getDevAuthSecret());
                map.put("status", "A60000" + jourDoorCard.getJdcCardId());
                map.put("devSecondType", "23");
                String responseText = HttpRequestUtil.post(POSTURL, map);
                JSONObject job = JSONObject.parseObject(responseText);
                String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
                String dir = "D:/Journal/fzz-sql";
                Syslog.writeLog(responseText, path, dir);
                if (job.getInteger("code") != 0) {
                    JSONArray bodyJson = JSONArray.parseArray(job.getString("body"));
                    if (bodyJson == null || bodyJson.isEmpty()) {
                        throw new Exception(job.getString("msg"));
                    } else if ("该门卡不存在".equals(bodyJson.getJSONObject(0).get("msg"))) {
                        return "该门卡不存在";
                    } else {
                        throw new Exception(job.getString("msg"));
                    }
                }
            } else if (jourDevice.getDevBrandId() == 22) {

                InfoFacePerson infoFacePeople = null;
                try {
                    infoFacePeople = infoFacePersonMapper.selectByPrimaryTag(userId);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                System.out.println(infoFacePeople);
                if (null == infoFacePeople) {
                    return "1";
                } else {
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("guid", infoFacePeople.getIfpGuid());
                    map.put("brandId", jourDevice.getDevBrandId() + "");
                    map.put("instruction", "删除人员");
                    String responseText = HttpRequestUtil.post(POSTURL, map);
                    JSONObject job = JSONObject.parseObject(responseText);
                    if (job.getInteger("result") != 1) {
                        return "-2";
                    } else {
                        infoFacePersonMapper.deleteByPrimaryKey(infoFacePeople.getIfpId());
                    }
                }

            } else {
                return "-1";
            }
        }
        return "1";
    }

    @Override
    public String inputLockPassword(JourDoorCard jourDoorCard) throws Exception {
//		jourDoorCard.setCo("hz");
//		jourDoorCard.setJdcHsId(707);
        InfoHouse4storeExpand record = new InfoHouse4storeExpand();
        record.setHsId(jourDoorCard.getHsId());
        List<InfoHouse4storeExpand> hsList = infoHouse4storeMapper.queryHouseStoreCommon(record);

        List<JourHsDevice> list = jourHsDeviceMapper.selectThisHouseDeviceID(jourDoorCard.getHsId());

        List<Integer> idList = new ArrayList<>();
        for (JourHsDevice jhd : list) {
            idList.add(jhd.getJhdDeviceId());
        }
        List<JourDevice> list2 = jourDeviceMapper.selectThisHouseDevice(idList);
        System.out.println("1111111111111111111111111");
        System.out.println(list2.toString());
        String address = hsList.get(0).getHsAddCommunity() + hsList.get(0).getHsAddBuilding() + hsList.get(0).getHsAddDoorplateno();
        JSONArray ary = new JSONArray();
        for (JourDevice a : list2) {
            System.out.println("2222222222222222222");
            System.out.println(a.getDevBrandId());
            System.out.println("类型 " + a.toString());
            if (a.getDevBrandId() == 17 || a.getDevBrandId() == 10) {
                System.out.println("444444444444444444444");
                JSONObject obj = new JSONObject();
                String b = address + " " + a.getDevNickname();
                obj.put("id", a.getId());
                obj.put("address", b);
                ary.add(obj);
            } else if (a.getDevBrandId() == 20 && ("25").equals(a.getDevId())) {
                System.out.println("5555555555555555555");
                JSONObject obj = new JSONObject();
                String b = address + " " + a.getDevNickname();
                obj.put("id", a.getId());
                obj.put("address", b);
                ary.add(obj);
            } else if (a.getDevBrandId() == 20 && ("3").equals(a.getDevFirstType())) {
                JSONObject obj = new JSONObject();
                String b = address + " " + a.getDevNickname();
                obj.put("id", a.getId());
                obj.put("address", b);
                ary.add(obj);
            } else if (a.getDevBrandId() == 22 && a.getDevSecondType() == 33) {
                System.out.println("3333333333333333333333333");
                JSONObject obj = new JSONObject();
                String b = address + " " + a.getDevNickname();
                obj.put("id", a.getId());
                obj.put("address", b);
                ary.add(obj);
            }
        }
        String result = ary.toJSONString();
        return result;
    }

    private void docheckLockPassword(JourDoorCard jourDoorCard) throws Exception {
        Integer coId = null;
        if (!"".equals(jourDoorCard.getCo()) && jourDoorCard.getCo() != null) {
            //转库查警情记录
            SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory().openSession();
            MyDataSourceMapper mapper = sqlSession.getMapper(MyDataSourceMapper.class);
            MyDataSource resu = mapper.getDataSource(jourDoorCard.getCo());
            coId = resu.getId();
            sqlSession.close();
        } else {
            HttpSession session = ServletActionContext.getRequest().getSession();
            coId = Integer.parseInt((String) session.getAttribute("coId"));
//			coId =Integer.parseInt(SessionUtil.getSession("coId"));
        }

        List<JourDoorCard> list = jourDoorCardMapper.checkLockPassword(jourDoorCard);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        JSONArray ary = null;
        Integer id = list.get(0).getJdcDeviceId();
        JourDevice jourDevice = deviceService.selectSingle(id); //查询单个设备
        //获取密码表操作记录
        if (jourDevice.getDevBrandId() == 22 && jourDevice.getDevFirstType() == 24 && jourDevice.getDevSecondType() == 33) {
        } else {

            if (list.get(0).getJdcOperatingRecording() != null) {
                JSONObject obj = new JSONObject();
                obj.put("text", "打开门锁");
                obj.put("time", df.format(new Date()));
                obj.put("type", "系统跟进");
                obj.put("registrantName", "");
                System.out.println(list.get(0).getJdcOperatingRecording());
                ary = JSONObject.parseArray(list.get(0).getJdcOperatingRecording());
                ary.add(obj);
            }
        }


        if (jourDevice.getDevBrandId() == 10) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("instruction", "远程开锁2");
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("devAuthId", jourDevice.getDevAuthId());
            map.put("devAuthSecret", jourDevice.getDevAuthSecret());
            map.put("devSpare2", jourDevice.getDevSpare2());
            String responseText = HttpRequestUtil.post(POSTURL, map);
            net.sf.json.JSONObject jsonObj = new net.sf.json.JSONObject();
            jsonObj = net.sf.json.JSONObject.fromObject(responseText);
            System.out.println("jsonObj: " + jsonObj);
            if (jsonObj.getInt("code") == 1) {

            } else {
                throw new Exception("开门失败");
            }
        }

        if (jourDevice.getDevBrandId() == 17) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("instruction", "控制设备1");
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("devUsername", jourDevice.getDevUsername());
            map.put("devPassword", jourDevice.getDevPassword());
            map.put("devId", jourDevice.getId() + "");
            map.put("devAuthId", jourDevice.getDevAuthId());
            map.put("type", jourDevice.getDevAuthSecret());
            map.put("state", "A100");
            System.out.println(map);
            String responseText = HttpRequestUtil.post(POSTURL, map);
            JSONObject job = JSONObject.parseObject(responseText);
            if (job.getInteger("code") != 0) {
                throw new Exception("开门失败");
            }
        }

        if (jourDevice.getDevBrandId() == 20 && jourDevice.getDevFirstType() == 3
                && (jourDevice.getDevSecondType() == 22 || jourDevice.getDevSecondType() == 23 || jourDevice.getDevSecondType() == 24 || jourDevice.getDevSecondType() == 40)) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("coId", String.valueOf(coId));
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("sn", jourDevice.getDevAuthId());
            map.put("devId", jourDevice.getId() + "");
            map.put("status", "开锁");
            map.put("instruction", "控制设备-门锁");
            map.put("isNeedCache", "false");
            System.out.println("dslkfjsdlfksdjklfsdlfsd:" + map);
            String responseText = HttpRequestUtil.post(POSTURL, map);
            System.out.println("sdgfsdgksdlg;dsd" + responseText);
            JSONObject job = JSONObject.parseObject(responseText);
            System.out.println("00000000000" + job);
            if (job.getInteger("code") != 0) {
                throw new Exception("开门失败");
            }
        }
        if (jourDevice.getDevBrandId() == 22 && jourDevice.getDevFirstType() == 24 && jourDevice.getDevSecondType() == 33) {
            Map<String, String> map = new HashMap<String, String>();
            map.put("coId", String.valueOf(coId));
            map.put("brandId", jourDevice.getDevBrandId() + "");
            map.put("sn", jourDevice.getDevAuthId());
            map.put("devId", jourDevice.getId() + "");
            map.put("status", "开锁");
            map.put("instruction", "远程开锁");
            map.put("isNeedCache", "false");
            map.put("deviceKey", jourDevice.getDevSn());
            System.out.println("dslkfjsdlfksdjklfsdlfsd:" + map);
            String responseText = HttpRequestUtil.post(POSTURL, map);
            System.out.println("sdgfsdgksdlg;dsd" + responseText);
            JSONObject job = JSONObject.parseObject(responseText);
            System.out.println("00000000000" + job);
            if (job.getInteger("code") != 0) {
                throw new Exception("开门失败");
            }
        }
//		if(jourDevice.getDevBrandId()==20
//				&&jourDevice.getDevFirstType()==3&&jourDevice.getDevSecondType()==23){
//			System.out.println("==== 20 25 3 A1000000 新云海智能门锁操作 ====");
//			Map<String, String> map = new HashMap<String, String>();
//			map.put("brandId", jourDevice.getDevBrandId()+"");
//			map.put("instruction", "控制设备");
//			map.put("sn", jourDevice.getDevAuthId());
//			map.put("isNeedCache", "false");
//			map.put("mac", jourDevice.getDevAuthSecret());
//			map.put("status", "A1000000");
//			String responseText = HttpRequestUtil.post(POSTURL, map);
//			JSONObject job = JSONObject.parseObject(responseText);
//			if(job.getInteger("code") != 0){
//				throw new Exception("开门失败");
//			}
//		}

        JourDoorCard jourDoorCard1 = new JourDoorCard();
        jourDoorCard1.setId(list.get(0).getId());
        jourDoorCard1.setJdcState("已使用");
        jourDoorCard1.setJdcUnlockingTimes(jourDoorCard.getJdcUnlockingTimes());
        if (ary != null)
            jourDoorCard1.setJdcOperatingRecording(ary.toString());

        jourDoorCardMapper.updateDoorCard(jourDoorCard1);

    }

    @Override
    public Result<String> checkLockPassword(JourDoorCard jourDoorCard) throws Exception {

        List<JourDoorCard> list = jourDoorCardMapper.checkLockPassword(jourDoorCard);
        if (list.size() > 0) {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            String today = df.format(new Date());
            String jdcDeadlineTime = list.get(0).getJdcDeadlineTime();        //有效时间
            Integer jdcMaxUnlockingTimes = list.get(0).getJdcMaxUnlockingTimes();    //有效次数
            if (list.get(0).getJdcPassword().equals(jourDoorCard.getJdcPassword())) {
                if (jdcDeadlineTime != null) {
                    Date nowTime = df.parse(today);
                    Date deadlineTime = df.parse(jdcDeadlineTime);
                    if (nowTime.getTime() < deadlineTime.getTime()) {
                        docheckLockPassword(jourDoorCard);

                    } else {
                        list.get(0).setJdcState("过期");
                        jourDoorCardMapper.updateDoorCard(list.get(0));
                        return new Result<String>(-4, "密码使用超过有效期限", null);

                    }
                }
                if (list.get(0).getJdcMaxUnlockingTimes() != null) {
                    Integer jdcUnlockingTimes = list.get(0).getJdcUnlockingTimes();
                    if (jdcMaxUnlockingTimes > jdcUnlockingTimes) {
                        jdcUnlockingTimes++;
                        jourDoorCard.setJdcUnlockingTimes(jdcUnlockingTimes);
                        docheckLockPassword(jourDoorCard);
                    } else {
                        return new Result<String>(-4, "密码使用超过有效次数", null);
                    }
                }
                return new Result<String>(1, "成功", null);
            } else {
                if (list.get(0).getJdcFrequency() > 5) {

                    JSONObject obj = new JSONObject();
                    obj.put("text", "尝试开锁次数超过5次，原密码失效");
                    obj.put("time", df.format(new Date()));
                    obj.put("type", "系统跟进");
                    obj.put("registrantName", "");
                    System.out.println(list.get(0).getJdcOperatingRecording());
                    JSONArray ary = JSONObject.parseArray(list.get(0).getJdcOperatingRecording());
                    ary.add(obj);

                    JourDoorCard jourDoorCard1 = new JourDoorCard();
                    jourDoorCard1.setId(list.get(0).getId());
                    jourDoorCard1.setJdcState("错误超限");
                    jourDoorCard1.setJdcOperatingRecording(ary.toString());
                    jourDoorCardMapper.updateDoorCard(jourDoorCard1);
                    return new Result<String>(-3, "错误次数过多，原密码失效", null);
                } else {
                    JourDoorCard jourDoorCard1 = new JourDoorCard();
                    jourDoorCard1.setId(list.get(0).getId());
                    jourDoorCard1.setJdcFrequency(list.get(0).getJdcFrequency() + 1);
                    jourDoorCard1.setJdcErrorTime(df.format(new Date()));
                    jourDoorCardMapper.updateDoorCard(jourDoorCard1);
                    return new Result<String>(-1, "密码错误", null);
                }
            }
        } else {
            return new Result<String>(-2, "没有授权无法开锁", null);
        }
    }

    /*单条数据增加*/
    @Override
    public int insertOneDoorCard(JourDoorCard jourDoorCard) throws Exception {

        return jourDoorCardMapper.insertSelective(jourDoorCard);
    }

	public Integer insertJustDoorCard(JourDoorCard jourDoorCard){
		try {
			List<JourDoorCard> jdcList = new ArrayList<>();
			jdcList.add(jourDoorCard);
			Map<String, Object> insertMap = new HashMap<>();
			insertMap.put("doorCardList", jdcList);
			return jourDoorCardMapper.insertList(insertMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;
	}

    @Override
    public String insertFacePower(JourDoorCard jourDoorCard) throws Exception {
        List<JourDoorCard> list = JSONObject.parseArray(jourDoorCard.getDoorCardJson(), JourDoorCard.class);
        if(list.get(0).getJdcPassword() == null){
            for(JourDoorCard jdc1 : list){
                Integer id = jdc1.getJdcDeviceId();
                JourDevice jourDevice = deviceService.selectSingle(id);
                //添加人员授权入口
                if(jourDevice.getDevBrandId()==22){
                    InfoPopulation infoPopulation = new InfoPopulation();
                    InfoFacePerson infoFacePerson = null;
                    //租客模块使用的
                    if(null !=jdc1.getPopId()){
                        infoPopulation.setPopId(jdc1.getPopId());
                        int popId = jdc1.getPopId();
                        //查询人员信息表是否有记录
                        infoFacePerson = infoFacePersonMapper.selectByPrimaryKey(popId);
                    }
                    //用户管理模块使用的
                    if(null != jdc1.getJdcUserId()){
                        int userId = jdc1.getJdcUserId();
                        //查询人员信息表是否有记录
                        infoFacePerson = infoFacePersonMapper.selectByPrimaryTag(userId);
                        System.out.println("dsfsdf+"+infoFacePerson);
                    }
                    String att = jdc1.getAtt();
                    String url ="";
                    //判断是否存在上传照片
                    if(att.length()>0){
                        JournalAttachment journalAttachment = journalAttachmentMapper.selectByAtt(att);
                        String path = journalAttachment.getPath();
                        url ="["+path+"]";
                    }
                    //是否存在脸授权
                    if(null == infoFacePerson ){
                        //判断是否有照片
                        if("".equals(url) && jdc1.getImg().length()<0){
                            return "照片不能为空！";
                        }else{
                            System.out.println("进入人员授权");
                            String startTime = DateUtil.getCurDateTime();
                            Map<String, String> map = new HashMap<String, String>();
                            map.put("name",jdc1.getPopName());
                            map.put("cardNo",jdc1.getJdcCardNum());
                            map.put("tag",((null == jdc1.getJdcUserId())? "":jdc1.getJdcUserId().toString()));
                            map.put("coId",jdc1.getCoid());
                            map.put("url",url);
                            map.put("phone","");
                            map.put("popId",((null == jdc1.getPopId())? "":jdc1.getPopId().toString()));
                            map.put("base64",jdc1.getImg());
                            map.put("personType", jdc1.getPersonType());
                            map.put("brandId",jourDevice.getDevBrandId().toString());
                            map.put("instruction","添加人员");
                            map.put("deviceKey",jourDevice.getDevSn());
                            System.out.println("map:"+map);
                            String responseText = HttpRequestUtil.post(POSTURL, map);
                            if(responseText == null && "".equals(responseText)){
                                return "添加失败！";
                            }else{
                                JSONObject job = JSONObject.parseObject(responseText);
                                if(job.getInteger("result") != 1){
                                    return job.getString("msg");
                                }else{
                                    if(url.length()>0){
                                        journalAttachmentMapper.deleteByAtt(att);
                                    }
                                    return "1";
                                }
                            }

                        }
                    }else{
                        if("".equals(url) && jdc1.getImg().length()<=0 && jdc1.getJdcCardNum().length()<=0){
                            return "没有更改内容！";
                        }else{
                            System.out.println("跟新人脸授权信息");
                            Map<String, String> map = new HashMap<String, String>();
                            map.put("guid",infoFacePerson.getIfpGuid());
                            map.put("url",url);
                            map.put("coId",jdc1.getCoid());
                            map.put("cardNo",jdc1.getJdcCardNum());
                            map.put("base64",jdc1.getImg());
                            map.put("brandId",jourDevice.getDevBrandId().toString());
                            map.put("instruction","修改人员");
                            String responseText = null;
                            try {
                                responseText = HttpRequestUtil.post(POSTURL, map);
                            } catch (Exception e) {
                                return "设备不在线！";
                            }
                            if(responseText == null){
                                return "跟新失败！";
                            }else {
                                JSONObject job = JSONObject.parseObject(responseText);
                                if(job.getInteger("result") != 1){
                                    return job.getString("msg");
                                }else{
                                    int i = jourDoorCardMapper.updateDoorCard1(jdc1);
                                    if(i>0){
                                        if(url.length()>0){
                                            journalAttachmentMapper.deleteByAtt(att);
                                        }
                                        return "1";
                                    }

                                }
                            }
                        }

                    }
                }
            }
        }
        return "1";
    }

	@Override
	public String deletePower(JourDoorCard jourDoorCard) throws Exception {
		InfoFacePerson infoFacePeople = null;
		try {
			infoFacePeople = infoFacePersonMapper.selectByPrimaryKey(jourDoorCard.getPopId());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(null==infoFacePeople){
			return "-1";
		}else{
			Map<String, String> map = new HashMap<String, String>();
			map.put("guid",infoFacePeople.getIfpGuid());
			map.put("brandId", jourDoorCard.getBrandId()+"");
			map.put("instruction", "删除人员");
			String responseText = HttpRequestUtil.post(POSTURL, map);
			JSONObject job = JSONObject.parseObject(responseText);
			if(job.getInteger("result") != 1){
				return "-2";
			}else{
				infoFacePersonMapper.deleteByPrimaryKey(infoFacePeople.getIfpId());
			}
		}


		return "1";
	}
}
