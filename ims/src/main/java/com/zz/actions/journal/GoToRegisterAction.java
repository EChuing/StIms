package com.zz.actions.journal;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoIntendedPerson;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourDoorCard;
import com.zz.po.journal.JournalGoToRegister;
import com.zz.po.journal.JournalShortMessage;
import com.zz.po.journal.JournalShortMessageAdministrative;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.info.IntendedPersonService;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.GoToRegisterService;
import com.zz.service.journal.JourDoorCardService;
import com.zz.service.journal.ShortMessageAdministrativeService;
import com.zz.service.journal.ShortMessageService;
import com.zz.service.sys.UserService;
import com.zz.util.DateUtil;

import net.sf.json.JSONObject;


public class GoToRegisterAction extends BaseAction implements ModelDriven<JournalGoToRegister>{
    private final static String POSTURL = "http://www.fangzhizun.com/device/api";
	private JournalGoToRegister journalGoToRegister;
	private GoToRegisterService goToRegisterService;
	private UserService userService;
	private IntendedPersonService intendedPersonService;
	private HouseForStoreService houseForStoreService;
	private DeviceService deviceService;
	private ShortMessageService shortMessageService;
	private ShortMessageAdministrativeService shortMessageAdministrativeService;
	private JourDoorCardService jourDoorCardService;
	
	public void setJourDoorCardService(JourDoorCardService jourDoorCardService) {
		this.jourDoorCardService = jourDoorCardService;
	}
	public void setShortMessageAdministrativeService(
            ShortMessageAdministrativeService shortMessageAdministrativeService) {
        this.shortMessageAdministrativeService = shortMessageAdministrativeService;
    }
    public void setShortMessageService(ShortMessageService shortMessageService){
    	this.shortMessageService = shortMessageService;
    }
    public void setDeviceService(DeviceService deviceService) {
        this.deviceService = deviceService;
    }
    public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
        this.houseForStoreService = houseForStoreService;
    }
    public void setIntendedPersonService(IntendedPersonService intendedPersonService) {
		this.intendedPersonService = intendedPersonService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	public void setJournalGoToRegister(JournalGoToRegister journalGoToRegister) {
		this.journalGoToRegister = journalGoToRegister;
	}
	public void setGoToRegisterService(GoToRegisterService goToRegisterService) {
		this.goToRegisterService = goToRegisterService;
	}
	@Override
	public JournalGoToRegister getModel() {
		if(journalGoToRegister == null){
			journalGoToRegister = new JournalGoToRegister();
		}
		return journalGoToRegister;
	}
    
    /**
     * 查询外出登记
     * @return
     */
    public String selectGoToRegister(){
        //外出登记 - 查个人   A04b01
        int auth1 = Authority.authorize("A04b01");
        //外出登记 - 查部门   A04b02
        int auth2 = Authority.authorize("A04b02");
        //外出登记 - 查分店   A04b03
        int auth3 = Authority.authorize("A04b03");
        //外出登记 - 查公司   A04b04
        int auth4 = Authority.authorize("A04b04");
        //用户信息
        SysUserExpand userInfo = (SysUserExpand)ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0 && auth3 == 0 && auth4 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看外出登记权限", null));
            return null;
        } else {
            if (auth4 == 1) {
                
            } else if (auth3 == 1) {
                journalGoToRegister.setGotoStorefrontId(storefront);
            } else if (auth2 == 1) {
                journalGoToRegister.setGotoDepartmentId(department);
            } else if (auth1 == 1) {
                journalGoToRegister.setGotoUserId(userid);
            }
        }
        try {
            List<JournalGoToRegister> list = goToRegisterService.selectByPrimaryKey(journalGoToRegister);
            if(list.size() != 0) {
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
	
	//意向人中查询外出记录
	public void selectRoomWindow(){
		try {
			String[] ipGotoJosn = journalGoToRegister.getIpGotoJosn().split("#");
			if(journalGoToRegister.getIpGotoJosn() != null && !"".equals(journalGoToRegister.getIpGotoJosn())){
				int num = ipGotoJosn.length;
				List<JournalGoToRegister> jgtr = new ArrayList<JournalGoToRegister>();
				for(int i=0;i<num;++i){
					JournalGoToRegister jr = new JournalGoToRegister();
					jr.setGotoId(Integer.valueOf(ipGotoJosn[i]));
					List<JournalGoToRegister> list = goToRegisterService.selectByPrimaryKey(jr);
					if(list.size() != 0){
						jgtr.add(list.get(0));
					}
				}
				if(jgtr.size() != 0) {
					String json = JSONUtil.serialize(jgtr);
					
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
				}
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//回来签到
	public String comeBackSignIn(){
	    try {
	        //用户信息
	        SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
	        journalGoToRegister.setGotoUserId(userInfo.getUserId());
	        List<JournalGoToRegister> list = goToRegisterService.queryWorkOutsideByUserId(journalGoToRegister);
	        if (list.size() > 0) {
	            if(list.get(0).getGotoComeBackTime() == null){
	                int result = goToRegisterService.comeBackSignIn(journalGoToRegister);
	                if (result == 1) {
	                    printlnOfJson(CommonMethodClass.jsonData(1, "签到成功", null));
	                } else {
	                    printlnOfJson(CommonMethodClass.jsonData(-1, "签到失败", null));
	                }
	            }else{
	                printlnOfJson(CommonMethodClass.jsonData(-1, "已回签，请勿重复操作", null));
	            }
	        } else {
	            printlnOfJson(CommonMethodClass.jsonData(-1, "无外出记录，无需回签", null));
	        }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
	    return null;
	}
	
	//修改
	public String updateGoToRegister(){
		try {
	        //用户信息
	        SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
		    journalGoToRegister.setGotoUserId(userInfo.getUserId());
			List<JournalGoToRegister> list = goToRegisterService.queryWorkOutsideByUserId(journalGoToRegister);
			if (list.size() > 0) {
			    if(list.get(0).getGotoComeBackTime() == null){
	                journalGoToRegister.setGotoComeBackTime(DateUtil.getCurDateTime());
	                int result = goToRegisterService.updateByPrimaryKeySelective(journalGoToRegister);
	                if(result > 0){
	                    //外出回来修改状态
	                    SysUserExpand se = new SysUserExpand();
	                    se.setUserId(list.get(0).getGotoUserId());
	                    se.setSuWhetherGoOut("否");
	                    int number = userService.updateByPrimaryKeySelective(se);
	                    if(number == 1){
	                        printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
	                    }else{
	                        printlnOfJson(CommonMethodClass.jsonData(-1, "回签失败", null));
	                    }
	                }else{
	                    printlnOfJson(CommonMethodClass.jsonData(-1, "回签失败", null));
	                }
	            }else{
	                printlnOfJson(CommonMethodClass.jsonData(-1, "已回签，请勿重复操作", null));
	            }
			} else {
			    printlnOfJson(CommonMethodClass.jsonData(-1, "无外出记录，无需回签", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}
	
	
	
	/*
	 * 意向人自助看房操作接口
	 * 1.生成只能门锁密码，将密码发送给门锁
	 * 2.将密码用短信发送给看房人
	 * 3.补上跟进
	 */
	public void selfServiceRoom(){
		Integer gotoUserId = journalGoToRegister.getGotoUserId();
		Integer gotoStoreId = journalGoToRegister.getGotoStoreId();
		Integer gotoDepartmentId = journalGoToRegister.getGotoDepartmentId();
		Integer gotoStorefrontId = journalGoToRegister.getGotoStorefrontId();
		Integer ipId = journalGoToRegister.getIpId();
		String ipTel = journalGoToRegister.getIpTel();
		String ipName = journalGoToRegister.getIpName();
		String houseAddress = journalGoToRegister.getHouseAddress();
		
		Map<String,String> messqgeMap = new HashMap<>(); 
		messqgeMap.put("ipTel", ipTel);
		messqgeMap.put("ipName", ipName);
		messqgeMap.put("houseAddress", houseAddress);
		
		boolean flag = false;
		
		String messageStr = "";
		
		String ipGotoJosn = "";//外出记录表id，#号分隔
		try {
			//先处理门锁
			List<InfoHouse4storeExpand> storeList = houseForStoreService.selectByPrimaryKey(gotoStoreId);
			String hsDeviceJson = storeList.get(0).getHsDeviceJson();
			if(hsDeviceJson != null){
				String[] idArray = hsDeviceJson.split(",");
				List idList = Arrays.asList(idArray);
				List<JourDevice> devList = deviceService.selectThisHouseDevice(idList);
				for(JourDevice dev : devList){
                	//密码随机八位数生成
                	//随机数处理后作为密码，密码保存问题？
                	//int passwordstr = (int) (Math.random()*100000000);
                	//String password= passwordstr+"";
                	System.out.println("DevId"+dev.getDevId());
                	if(dev.getDevBrandId()==10){
                		
                		flag = true;
                		
                		int devId = dev.getId();
                		Map<String, String> map = new HashMap<String, String>(); 
                		map.put("brandId","10");
                		map.put("instruction","单临密码");
                		map.put("appKey", dev.getDevAuthId());
                		map.put("secret", dev.getDevAuthSecret());
                		map.put("pwdType","0");
                		map.put("startTime",DateUtil.getCurDateTime());
                		map.put("endTime", DateUtil.getAddDateTime(1));
                		map.put("code", dev.getDevSpare2());
                		//System.out.println("map: "+map);
                		String responseText = HttpRequestUtil.post(POSTURL, map);
                        JSONObject jsonObj = new JSONObject();
                        
                    	jsonObj = JSONObject.fromObject(responseText);
                    	System.out.println("jsonObj: "+jsonObj);
                    	
                        if (jsonObj.getInt("code") ==1) {
                            String password = (String) jsonObj.get("body");
                            messageStr += dev.getDevNickname() + "的密码为" + password +",";
                            
//                            JournalShortMessage js = new JournalShortMessage();
//                            js.setHouseAddress(houseAddress);
//                            js.setPopName(ipName);
//                            js.setPopTelephone(ipTel);
//                            js.setPassword(password);
//                            js.setMessageType(16);
//                            System.out.println("js: "+js.toString());
//                            shortMessageService.integratedSmsSending(js);
                           
                        	JourDoorCard jourDoorCard = new JourDoorCard();
                        	jourDoorCard.setJdcIpId(ipId);
                        	jourDoorCard.setJdcDeviceId(devId);
                        	jourDoorCard.setJdcPassword(password);
                        	jourDoorCard.setJdcHsId(gotoStoreId);
                        	jourDoorCard.setJdcState("未使用");
                        	
                        	//System.out.println("jourDoorCard: "+jourDoorCard.toString());
                        	int numb = jourDoorCardService.insertOneDoorCard(jourDoorCard);
                        	if(numb==1){
                        		JournalGoToRegister jGTRegister=new JournalGoToRegister();
                        		jGTRegister.setGotoStoreId(gotoStoreId);
                        		jGTRegister.setGotoItemType("带客看房");
                        		jGTRegister.setGotoAddressType("未租房");
                        		jGTRegister.setGotoNote("租客自助看房");
                        		jGTRegister.setGotoPassword(password);
                        		System.out.println("jGTRegister: "+jGTRegister.toString());
                        		
                        		int result2= goToRegisterService.insertSelective(jGTRegister);
                        		System.out.println("GotoId:"+jGTRegister.getGotoId());
                        		if(result2 != 0){
            						ipGotoJosn = jGTRegister.getGotoId()+"";
            						journalGoToRegister.setGotoId(null);
            					}else{
            						printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            						return;	
            					}
                        		
                        		InfoIntendedPerson  iidp = new InfoIntendedPerson();
                    			iidp.setIpId(ipId);
                    			//System.out.println(journalGoToRegister.getIpId());
                    			List<InfoIntendedPerson> ipList = intendedPersonService.selectByPrimaryKey(iidp);
                    			String gotoJosn = ipList.get(0).getIpGotoJosn();
                    			
                    			//System.out.println("gotoJosn:"+gotoJosn);
                    			
                    			if(gotoJosn != null && !"".equals(gotoJosn)){
                    				iidp.setIpGotoJosn(gotoJosn+"#"+ipGotoJosn);
                    			}else{
                    				iidp.setIpGotoJosn(ipGotoJosn);
                    			}
                    			
                    			//System.out.println("iidp: "+iidp.toString());
                    			intendedPersonService.updateByPrimaryKeySelective(iidp);
                    			
                        	}else{
                        		printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
                        	}
                            
                        }
                        
                	}else if(dev.getDevBrandId()==17){
                		
                		flag = true;
                		
                		String password = getCard();
                		messageStr += dev.getDevNickname() + "的密码为" + password +",";
                		
//                        JournalShortMessage js = new JournalShortMessage();
//                        js.setHouseAddress(houseAddress);
//                        js.setPopName(ipName);
//                        js.setPopTelephone(ipTel);
//                        js.setPassword(password);
//                        js.setMessageType(16);
//                        int result = shortMessageService.integratedSmsSending(js);
                        
                    	JourDoorCard jourDoorCard = new JourDoorCard();
                    	jourDoorCard.setJdcIpId(ipId);
                    	jourDoorCard.setJdcDeviceId(dev.getId());
                    	jourDoorCard.setJdcPassword(password);
                    	jourDoorCard.setJdcHsId(gotoStoreId);
                    	jourDoorCard.setJdcState("未使用");
                    	
                    	jourDoorCardService.insertOneDoorCard(jourDoorCard);
                    	
                		JournalGoToRegister jGTRegister=new JournalGoToRegister();
                		jGTRegister.setGotoStoreId(gotoStoreId);
                		jGTRegister.setGotoItemType("带客看房");
                		jGTRegister.setGotoAddressType("未租房");
                		jGTRegister.setGotoNote("租客自助看房");
                		jGTRegister.setGotoPassword(password);
                		System.out.println("jGTRegister: "+jGTRegister.toString());
                		
                		int result2= goToRegisterService.insertSelective(jGTRegister);
                		System.out.println("GotoId:"+jGTRegister.getGotoId());
                		if(result2 != 0){
    						ipGotoJosn = jGTRegister.getGotoId()+"";
    						journalGoToRegister.setGotoId(null);
    					}else{
    						printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
    						return;	
    					}
                		
                		InfoIntendedPerson  iidp = new InfoIntendedPerson();
            			iidp.setIpId(ipId);
            			//System.out.println(journalGoToRegister.getIpId());
            			List<InfoIntendedPerson> ipList = intendedPersonService.selectByPrimaryKey(iidp);
            			String gotoJosn = ipList.get(0).getIpGotoJosn();
            			
            			//System.out.println("gotoJosn:"+gotoJosn);
            			
            			if(gotoJosn != null && !"".equals(gotoJosn)){
            				iidp.setIpGotoJosn(gotoJosn+"#"+ipGotoJosn);
            			}else{
            				iidp.setIpGotoJosn(ipGotoJosn);
            			}
            			
            			//System.out.println("iidp: "+iidp.toString());
            			intendedPersonService.updateByPrimaryKeySelective(iidp);
                	}
				}
				if(flag){
					messqgeMap.put("password", messageStr);
					sendMessage(messqgeMap);
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-9, "该房间暂无门锁设备！", null));
				}
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-10, "该房间暂无门锁设备！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
	
	private void sendMessage(Map<String,String> map) throws Exception{
        JournalShortMessage js = new JournalShortMessage();
        js.setHouseAddress(map.get("houseAddress"));
        js.setPopName(map.get("ipName"));
        js.setPopTelephone(map.get("ipTel"));
        js.setPassword(map.get("password"));
        js.setMessageType(16);
        
        shortMessageService.sendOutsideMessage(js);
	}
	
	//意向人添加外出记录
	public void insertaddroomWindow(){
		Integer gotoUserId = journalGoToRegister.getGotoUserId();
		Integer goto1GetUserId = journalGoToRegister.getGoto1GetUserId();
		Integer goto2GetUserId = journalGoToRegister.getGoto2GetUserId();
		String strNum = "";
		String strNum1 = "";
		String ipGotoJosn = "";//外出记录表id，#号分隔
		try {
			//判断是否外出
		    SysUserExpand se = new SysUserExpand();
			if(gotoUserId != null && !"".equals(gotoUserId)){
				se.setUserId(gotoUserId);
				List<SysUserExpand> list = userService.selectByPrimaryKey(se);
				String whetherGoOut = list.get(0).getSuWhetherGoOut();
				if(whetherGoOut==null || !whetherGoOut.equals("是")){
					journalGoToRegister.setGotoUserId(gotoUserId);
					//获取门锁临时密码
					//选房-查门锁设备-查品牌-带参数-发送
					List<InfoHouse4storeExpand> storeList = houseForStoreService.selectByPrimaryKey(journalGoToRegister.getGotoStoreId());
					String hsDeviceJson = storeList.get(0).getHsDeviceJson();
					if(hsDeviceJson != null){
					    String[] idArray = hsDeviceJson.split(",");
	                    List idList = Arrays.asList(idArray);
	                    List<JourDevice> devList = deviceService.selectThisHouseDevice(idList);
	                    for(JourDevice dev : devList){
	                    	/*现有电易门锁新规则（3.0）
	                    	 * 
	                    	 *密码随机八位数生成（2.0）
	                    	 *随机数处理后作为密码，密码保存问题？
	                    	 *int passwordstr = (int) (Math.random()*100000000);
	                    	 *System.out.println("passwordstr:"+passwordstr);
	                    	 *System.out.println("DevId"+dev.getDevId());
	                    	 */
	                    	if(dev.getDevBrandId()==10){
	                    		//System.out.println("passwordstr2:"+passwordstr);
	                    		Map<String, String> map = new HashMap<String, String>(); 
	                    		map.put("brandId","10");
	                    		map.put("instruction","单临密码");
	                    		map.put("appKey", dev.getDevAuthId());
	                    		map.put("secret", dev.getDevAuthSecret());
	                    		map.put("pwdType","0");
	                    		map.put("startTime",DateUtil.getCurDateTime());
	                    		map.put("endTime", DateUtil.getAddDateTime(1));
	                    		map.put("code", dev.getDevSpare2());
	                    		String responseText = HttpRequestUtil.post(POSTURL, map);
		                        JSONObject jsonObj = new JSONObject();
		                        try {
		                        	jsonObj = JSONObject.fromObject(responseText);
	                                if (jsonObj.getInt("code") == 1) {
	                                	String password = (String) jsonObj.get("body");
	                                    journalGoToRegister.setGotoPassword(password);
	                                    JournalShortMessageAdministrative sm = new JournalShortMessageAdministrative();
	                                    sm.setSmUserId(journalGoToRegister.getGotoUserId());
	                                    sm.setAddCommunity(journalGoToRegister.getAddCommunity());
	                                    sm.setDoorPsw(password);
	                                    shortMessageAdministrativeService.goToDoorPsw(sm);
	                                }
		                        } catch (Exception e) {
	                                e.printStackTrace();Syslog.writeErr(e);
	                            }
	                    	}
	                    	
	                        /*原电易门锁规则（1.0）
	                         * if(dev.getDevBrandId()==10){//电易门锁
	                            Map<String, String> map = new HashMap<String, String>(); 
	                            map.put("devId",dev.getDevId());
	                            map.put("brandId",dev.getDevBrandId().toString());
	                            map.put("devUsername",dev.getDevUsername());
	                            map.put("devPassword",dev.getDevPassword());
	                            map.put("devAuthId",dev.getDevAuthId());
	                            map.put("devAuthSecret",dev.getDevAuthSecret());
	                            map.put("instruction","访客密码");
	                            map.put("cardType","21");
	                            map.put("startDate",DateUtil.getCurDateTime());
	                            map.put("endDate",DateUtil.getAddDateTime(1));
	                            String responseText = HttpRequestUtil.post(POSTURL, map);
	                            JSONObject jsonObj = new JSONObject();
	                            try {
	                                jsonObj = JSONObject.fromObject(responseText);
	                                if (jsonObj.getInt("code") == 1) {
	                                    JSONObject jsonObj2 = (JSONObject) jsonObj.get("body");
	                                    String password = jsonObj2.getString("data");
	                                    journalGoToRegister.setGotoPassword(password);
	                                    JournalShortMessageAdministrative sm = new JournalShortMessageAdministrative();
	                                    sm.setSmUserId(journalGoToRegister.getGotoUserId());
	                                    sm.setAddCommunity(journalGoToRegister.getAddCommunity());
	                                    sm.setDoorPsw(password);
	                                    shortMessageAdministrativeService.goToDoorPsw(sm);
	                                }
	                            } catch (Exception e) {
	                                e.printStackTrace();Syslog.writeErr(e);
	                            }
	                        }*/
	                        
	                    }
					}
					if(journalGoToRegister.getGotoPassword()==null){
					    journalGoToRegister.setGotoPassword("暂无智能门锁");
					}
					
					//这是外出登记的
					int result= goToRegisterService.insertSelective(journalGoToRegister);
					if(result != 0){
						//修改用户的外出状态为 ‘是’
						ipGotoJosn = journalGoToRegister.getGotoId()+"";
						journalGoToRegister.setGotoId(null);
						se.setSuWhetherGoOut("是");
						//这里是用户外出状态
						int number = userService.updateByPrimaryKeySelective(se);
					}else{
						strNum1 = list.get(0).getSuStaffName()+"外出记录新增失败,";
						printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
						return;	
					}
				}else{
					strNum = list.get(0).getSuStaffName()+" 已经外出,";
					printlnOfJson(CommonMethodClass.jsonData(-1, strNum, null));
					return;
				}
			}
			if(goto1GetUserId != null && !"".equals(goto1GetUserId)){
				se.setUserId(goto1GetUserId);
				List<SysUserExpand> list = userService.selectByPrimaryKey(se);
				String whetherGoOut = list.get(0).getSuWhetherGoOut();
				String str = "";
				if(whetherGoOut==null || !whetherGoOut.equals("是")){
					journalGoToRegister.setGotoUserId(goto1GetUserId);
					int result= goToRegisterService.insertSelective(journalGoToRegister);
					if(result != 0){
						//修改用户的外出状态为 ‘是’
						journalGoToRegister.setGotoId(null);
						se.setSuWhetherGoOut("是");
						int number = userService.updateByPrimaryKeySelective(se);
					}else{
						strNum1 += list.get(0).getSuStaffName()+"外出记录新增失败,";
					}
				}else{
					strNum += list.get(0).getSuStaffName()+" 已经外出,";
				}
			}
			if(goto2GetUserId != null && !"".equals(goto2GetUserId)){
				se.setUserId(goto2GetUserId);
				List<SysUserExpand> list = userService.selectByPrimaryKey(se);
				String whetherGoOut = list.get(0).getSuWhetherGoOut();
				String str = "";
				if(whetherGoOut==null || !whetherGoOut.equals("是")){
					journalGoToRegister.setGotoUserId(goto2GetUserId);
					int result= goToRegisterService.insertSelective(journalGoToRegister);
					if(result != 0){
						//修改用户的外出状态为 ‘是’
						journalGoToRegister.setGotoId(null);
						se.setSuWhetherGoOut("是");
						int number = userService.updateByPrimaryKeySelective(se);
					}else{
						strNum1 += list.get(0).getSuStaffName()+"外出记录新增失败,";
					}
				}else{
					strNum += list.get(0).getSuStaffName()+" 已经外出,";
				}
			}
			InfoIntendedPerson  iidp = new InfoIntendedPerson();
			iidp.setIpId(journalGoToRegister.getIpId());
			List<InfoIntendedPerson> ipList = intendedPersonService.selectByPrimaryKey(iidp);
			String gotoJosn = ipList.get(0).getIpGotoJosn();
			if(gotoJosn != null && !"".equals(gotoJosn)){
				iidp.setIpGotoJosn(gotoJosn+"#"+ipGotoJosn);
			}else{
				iidp.setIpGotoJosn(ipGotoJosn);
			}
			intendedPersonService.updateByPrimaryKeySelective(iidp);
			printlnOfJson(CommonMethodClass.jsonData(1, strNum+strNum1, null));		
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//新增
	public String insertGoToRegister(){
	    try {
            //判断是否外出
            SysUserExpand se = new SysUserExpand();
            se.setUserId(journalGoToRegister.getGotoUserId());
            List<SysUserExpand> list = userService.selectByPrimaryKey(se);
            String whetherGoOut = list.get(0).getSuWhetherGoOut();
            if(whetherGoOut==null || !whetherGoOut.equals("是")){
                int result= goToRegisterService.insertSelective(journalGoToRegister);
                if(result != 0){
                    //修改用户的外出状态为 ‘是’
                    se.setSuWhetherGoOut("是");
                    int number = userService.updateByPrimaryKeySelective(se);
                    if(number == 1){
                        printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                    }else{
                        printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                    }
                }else{
                    printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
                }
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "登记失败，您还有外出未签回", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	
	//生成随机数
   public static String getCard(){
       Random rand=new Random();//生成随机数
        String cardNnumer="";
        for(int a=0;a<8;a++){
        cardNnumer+=rand.nextInt(10);//生成6位数字
        }
       return cardNnumer;


  }
	
}
