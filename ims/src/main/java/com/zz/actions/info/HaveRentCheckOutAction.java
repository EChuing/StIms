package com.zz.actions.info;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zz.other.Syslog;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.HttpRequestUtil;
import com.zz.actions.commons.UploadUtil;
import com.zz.deviceevents.ElectricMeterEvents;
import com.zz.deviceevents.WaterElectricMeterMapper;
import com.zz.deviceevents.WaterMeterEvents;
import com.zz.po.info.InfoContractInstallmentExpand;
import com.zz.po.info.InfoHaveRentCheckOut;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsDevice;
import com.zz.service.info.ContractInstallmentService;
import com.zz.service.info.HaveRentCheckOutService;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourHsDeviceService;
import com.zz.util.MySqlSessionFactory;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class HaveRentCheckOutAction extends BaseAction implements ModelDriven<InfoHaveRentCheckOut> {
	private HaveRentCheckOutService haveRentCheckOutService;
	private InfoHaveRentCheckOut infoHaveRentCheckOut;
	private ContractInstallmentService contractInstallmentService;
	@Autowired
	private JourHsDeviceService jourHsDeviceService;
	@Autowired
	private DeviceService jeviceService;

	public void setContractInstallmentService(ContractInstallmentService contractInstallmentService) {
		this.contractInstallmentService = contractInstallmentService;
	}

	public void setHaveRentCheckOutService(HaveRentCheckOutService haveRentCheckOutService) {
		this.haveRentCheckOutService = haveRentCheckOutService;
	}

	public void setInfoHaveRentCheckOut(InfoHaveRentCheckOut infoHaveRentCheckOut) {
		this.infoHaveRentCheckOut = infoHaveRentCheckOut;
	}

	@Override
	public InfoHaveRentCheckOut getModel() {
		if (infoHaveRentCheckOut == null) {
			infoHaveRentCheckOut = new InfoHaveRentCheckOut();
		}
		return infoHaveRentCheckOut;
	}

	// 查退房总数量
	public String queryHouseRentCheckoutNum() {
		try {
			List<InfoHaveRentCheckOut> list = haveRentCheckOutService.queryHouseRentNum();
			if (!list.isEmpty()) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "查退房总数量失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 恢复为正办理退房
	public String recoveryHaveRentCheckOut() {
		try {
			if (infoHaveRentCheckOut.getRcoId() == null || infoHaveRentCheckOut.getRcoId().equals("")
					|| infoHaveRentCheckOut.getHrId() == null || infoHaveRentCheckOut.getHrId().equals("")) {
				printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
				return null;
			}
			int result1 = haveRentCheckOutService.recoveryHaveRentCheckOut(infoHaveRentCheckOut);
			int result2 = haveRentCheckOutService.recoveryHaveRent(infoHaveRentCheckOut);
			if (result1 != 0 && result2 != 0) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "恢复为正办理退房失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 修改退房状态
	public String checkoutthestate() {
		int rentid = infoHaveRentCheckOut.getRcoRentId();
		String checkouttime = infoHaveRentCheckOut.getRcoCheckOutTime();
		InfoContractInstallmentExpand jci = new InfoContractInstallmentExpand();
		jci.setJciHouse4rentId(rentid);
		jci.setByTheTime(checkouttime);
		try {
			int result = contractInstallmentService.checkoutthestate(jci);
			if (result == 0) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改退房状态失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 租客退房查询
	public String basicData() {
		try {
			InfoHaveRentCheckOut iHRCK = haveRentCheckOutService.selectBasicData(infoHaveRentCheckOut);
			if (iHRCK != null) {
				List<InfoHaveRentCheckOut> list = new ArrayList<InfoHaveRentCheckOut>();
				list.add(iHRCK);
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "租客退房查询失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
		return null;
	}

	// 查询所有与条件查询
	public String selectInfoHaveRentCheckOut() {
		try {
			List<InfoHaveRentCheckOut> list = haveRentCheckOutService.selectByPrimaryKey(infoHaveRentCheckOut);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "查询所有与条件查询失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 新增
	public String insertInfoHaveRentCheckOut() {
		try {
			int result = haveRentCheckOutService.insertInfoHaveRentCheckOut(infoHaveRentCheckOut);
			if (result == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	// 申请退房、保存、提交修改
	public String updataInfoHaveRentCheckOut() {
		try {
			int result = haveRentCheckOutService.updataInfoHaveRentCheckOut(infoHaveRentCheckOut);
			if (result == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else if (result == -3) {
				printlnOfJson(CommonMethodClass.jsonData(-3, "短信发送失败,余额不足", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "申请退房 或 保存 或 提交修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
		}
		return null;
	}

	// 审核退房
	public String updateChecOutAudit() {
		try {
			int result = haveRentCheckOutService.updateChecOutAudit(infoHaveRentCheckOut);
			if (result == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "审核退房修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	// 复核退房/出账完成
	public String updateReviewCheckOut() {
		try {
			int result = haveRentCheckOutService.checkOutHandling(infoHaveRentCheckOut);
			if (result == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "复核退房失败 ！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	// 删除
	public String deleteInfoHaveRentCheckOut() {
		try {
			if (infoHaveRentCheckOut.getHrId() != null && infoHaveRentCheckOut.getHsId() != null
					&& !infoHaveRentCheckOut.getHrId().equals("") && !infoHaveRentCheckOut.getHsId().equals("")) {
				int result = haveRentCheckOutService.deleteByPrimaryKey(infoHaveRentCheckOut);
				if (result == 0) {
					printlnOfJson(CommonMethodClass.jsonData(1, "删除失败 ", null));
				} else {
					int result1 = haveRentCheckOutService.updateHrState(infoHaveRentCheckOut);
					int result2 = haveRentCheckOutService.updateHsState(infoHaveRentCheckOut);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
				}
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "已租房源不能为空 ！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
		}
		return null;
	}

	/**
	 * 删除图片
	 */
	public void deleteRenterCheckoutPic() {
		try {
			List<InfoHaveRentCheckOut> checkout = haveRentCheckOutService.selectByPrimaryKey(infoHaveRentCheckOut);
			if (checkout.size() == 0) {
				printlnMsg("-1");
				return;
			}
			String oldPath = checkout.get(0).getRcoImgPath();
			String delPath = infoHaveRentCheckOut.getRcoImgPath();
			String newPath = UploadUtil.getNewPath(oldPath, delPath);
			infoHaveRentCheckOut.setRcoImgPath(newPath);
			infoHaveRentCheckOut.setRcoImgNum(UploadUtil.getImageNum(newPath));
			int result = haveRentCheckOutService.updateByPrimaryKeySelective(infoHaveRentCheckOut);
			if (result > 0) {
				printlnMsg("1");
			} else {
				printlnMsg("-1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}

	/**
	 * 获取读数
	 */
	public void queryWegNum() {
		try (SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession()) {
			List<JourDevice> jourDevice = jeviceService.selectDeviceStatus(infoHaveRentCheckOut.getHsId());
			if(jourDevice.size() != 0){
				String water = "";
				String electric = "";
				// String gas="";
				JSONObject json = new JSONObject();
				boolean state = true;// 用于判断有没有符合的水电表设备

				for (int i = 0; i < jourDevice.size(); i++) {
					if(jourDevice.get(i).getDevFirstType() != null && jourDevice.get(i).getDevSecondType() != null){
						if (jourDevice.get(i).getDevBrandId() == 20 && jourDevice.get(i).getDevFirstType()==15 && jourDevice.get(i).getDevSecondType()==15) {// 云海的电表
							WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
							ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
							electricMeterEvents.setEmDeviceSn(jourDevice.get(i).getDevAuthId());
							List<ElectricMeterEvents> electricNum = mapper.queryElectricMeterDetails(electricMeterEvents);
							if (electricNum.size() != 0) {
								for (int j = 0; j < electricNum.size(); j++) {
									if (jourDevice.get(i).getDevDifference() != null
											&& !jourDevice.get(i).getDevDifference().equals("0")) {
										electric = String.format("%.2f", Double.parseDouble(electricNum.get(j).getEmNum())
												+ Double.parseDouble(jourDevice.get(i).getDevDifference()));
									} else {
										electric = electricNum.get(j).getEmNum();
									}
								}
								json.put("ElectricityBase", electric);
							}
							state = false;
						}else if(jourDevice.get(i).getDevBrandId() == 20 && jourDevice.get(i).getDevFirstType()==16 && jourDevice.get(i).getDevSecondType()==16){//悠悠电箱
							WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
							ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
							electricMeterEvents.setEmDeviceSn(jourDevice.get(i).getDevAuthId());
							electricMeterEvents.setEmSubDeviceNumber(jourDevice.get(i).getDevRoad());
							List<ElectricMeterEvents> electricNum = mapper.queryElectricMeterDetails(electricMeterEvents);
							if (electricNum.size() != 0) {
								for (int j = 0; j < electricNum.size(); j++) {
									if (jourDevice.get(i).getDevDifference() != null
											&& !jourDevice.get(i).getDevDifference().equals("0")) {
										electric = String.format("%.2f", Double.parseDouble(electricNum.get(j).getEmNum())
												+ Double.parseDouble(jourDevice.get(i).getDevDifference()));
									} else {
										electric = electricNum.get(j).getEmNum();
									}
								}
								json.put("ElectricityBase", electric);
							}
							state = false;
						}else if (jourDevice.get(i).getDevBrandId() == 23 && jourDevice.get(i).getDevFirstType()==16 && jourDevice.get(i).getDevSecondType()==16) {//曼顿电箱
                            Map<String, String> map = new HashMap<String, String>();
                            map.put("projectCode",jourDevice.get(i).getDevId());
                            map.put("mac",jourDevice.get(i).getDevSn());
                            String responseText = HttpRequestUtil.post("http://www.fangzhizun.com/device/mandun/MDRequestElectricBoxStatus", map);
                            JSONObject jsonObject = JSONObject.fromObject(responseText);
                            JSONArray jsonArray = JSONArray.fromObject(jsonObject.get("body"));
                            for (int j = 0; j < jsonArray.size(); j++) {
                                if (jsonArray.getJSONObject(j).getInt("addr") == jourDevice.get(i).getDevRoad()){
                                    electric = String.valueOf(jsonArray.getJSONObject(j).getDouble("power"));
                                }
                            }
                            json.put("ElectricityBase", electric);
                            state = false;
                        }else if (jourDevice.get(i).getDevBrandId() == 20 && jourDevice.get(i).getDevFirstType()==14 && jourDevice.get(i).getDevSecondType()==14) {// 云海的水表
							WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
							WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
							waterMeterEvents.setWmDeviceSn(jourDevice.get(i).getDevAuthId());
							List<WaterMeterEvents> waterNum = mapper.queryWaterMeterDetails(waterMeterEvents);
							System.out.println(waterNum);
							if (waterNum.size() != 0) {
								for (int j = 0; j < waterNum.size(); j++) {
									if (jourDevice.get(i).getDevDifference() != null
											&& !jourDevice.get(i).getDevDifference().equals("0")) {
										water = String.format("%.2f", Double.parseDouble(waterNum.get(j).getWmNum())
												+ Double.parseDouble(jourDevice.get(i).getDevDifference()));
									} else {
										water = waterNum.get(j).getWmNum();
									}
								}
								json.put("WaterBase", water);
							}
							// sqlSession.close();
							state = false;
						} else if (jourDevice.get(i).getDevBrandId() == 21 && (jourDevice.get(i).getDevFirstType()==14 && jourDevice.get(i).getDevSecondType()==14) || (jourDevice.get(i).getDevFirstType()==15 && jourDevice.get(i).getDevSecondType()==15)) {
							System.out.println("进来");
							Map<String, String> map = new HashMap<String, String>();
							map.put("meterNo", jourDevice.get(i).getDevSn().trim());
							String responseText = HttpRequestUtil
									.post("http://www.fangzhizun.com/device/joy/ReadoutServlet", map);
							JSONObject jsonObject = JSONObject.fromObject(responseText);
							JSONArray jsonArray = JSONArray.fromObject(jsonObject.get("body"));
							JSONObject jsonData = jsonArray.getJSONObject(0);
							if(jourDevice.get(i).getDevFirstType()==14 && jourDevice.get(i).getDevSecondType()==14){
								water = jsonData.get("this_read").toString();
								json.put("WaterBase", water);
							}else if(jourDevice.get(i).getDevFirstType()==15 && jourDevice.get(i).getDevSecondType()==15){
								electric = jsonData.get("this_read").toString();
								json.put("ElectricityBase", electric);
							}
							state = false;
						} else if (jourDevice.get(i).getDevBrandId() == 12 && jourDevice.get(i).getDevFirstType()==15 && jourDevice.get(i).getDevSecondType()==15) {// 电易电表
							Map<String, String> map = new HashMap<String, String>();
							map.put("devId", "");
							map.put("devAuthSecret", jourDevice.get(i).getDevAuthSecret());
							map.put("code", jourDevice.get(i).getDevSpare2());
							map.put("app_key", jourDevice.get(i).getDevAuthId());
							map.put("devUsername", jourDevice.get(i).getDevUsername());
							map.put("instruction", "查询电表详情");
							map.put("brandId", jourDevice.get(i).getDevBrandId().toString());
							map.put("devAuthId", jourDevice.get(i).getDevAuthId());
							map.put("secret", jourDevice.get(i).getDevAuthSecret());
							map.put("devPassword", jourDevice.get(i).getDevPassword());
							String responseText = HttpRequestUtil.post("http://www.fangzhizun.com/device/api", map);
							JSONObject jsonObject = JSONObject.fromObject(responseText);
							JSONObject jsonBody = JSONObject.fromObject(jsonObject.get("body"));
							JSONObject jsonData = JSONObject.fromObject(jsonBody.get("data"));
							electric = jsonData.get("currentNumber").toString();
							state = false;
							json.put("ElectricityBase", electric);
						} else if (jourDevice.get(i).getDevBrandId() == 13 && jourDevice.get(i).getDevFirstType()==14 && jourDevice.get(i).getDevSecondType()==14) {// 电易水表
							Map<String, String> map = new HashMap<String, String>();
							map.put("devId", "");
							map.put("devAuthSecret", jourDevice.get(i).getDevAuthSecret());
							map.put("code", jourDevice.get(i).getDevSpare2());
							map.put("app_key", jourDevice.get(i).getDevAuthId());
							map.put("devUsername", jourDevice.get(i).getDevUsername());
							map.put("instruction", "查询水表详情");
							map.put("brandId", jourDevice.get(i).getDevBrandId().toString());
							map.put("devAuthId", jourDevice.get(i).getDevAuthId());
							map.put("secret", jourDevice.get(i).getDevAuthSecret());
							map.put("devPassword", jourDevice.get(i).getDevPassword());
							String responseText = HttpRequestUtil.post("http://www.fangzhizun.com/device/api", map);
							JSONObject jsonObject = JSONObject.fromObject(responseText);
							JSONObject jsonBody = JSONObject.fromObject(jsonObject.get("body"));
							JSONObject jsonData = JSONObject.fromObject(jsonBody.get("data"));
							water = jsonData.get("currentNumber").toString();
							state = false;
							json.put("WaterBase", water);
						}
					}
				}
				json.put("hsId",infoHaveRentCheckOut.getHsId());
				if (state) {
					printlnOfJson(CommonMethodClass.jsonData(-1, "该房没有智能水电表设备！", null));
				} else {
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
				}
				System.out.println("设备读数：：" + json);
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "该房没有任何智能设备！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
}
