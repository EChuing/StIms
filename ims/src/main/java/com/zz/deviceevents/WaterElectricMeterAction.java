package com.zz.deviceevents;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.zz.other.Syslog;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JourDevice;
import com.zz.service.journal.DeviceService;
import com.zz.util.MySqlSessionFactory;

import net.sf.json.JSONObject;

public class WaterElectricMeterAction extends BaseAction implements ModelDriven<JourDevice> {
	private JourDevice jourDevice;
	@Autowired
	private DeviceService deviceService;

	@Override
	public JourDevice getModel() {
		if (jourDevice == null) {
			jourDevice = new JourDevice();
		}
		return jourDevice;
	}

	/**
	 * 获取水电表和关联房屋的信息
	 * 
	 * @return
	 */
	public String queryWEDeviceHouseStore() {
		try {
			List<JourDevice> list = deviceService.selectDeviceHouseStore(jourDevice);
			JSONArray json = (JSONArray) JSON.toJSON(list);
			if (list.size() != 0) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的信息！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
		return null;
	}

	/**
	 * 查单个水或电表和房屋的信息
	 * 
	 * @return
	 * @throws IOException
	 */
	public String queryDeviceDetails(){
		SqlSession sqlSession = null;
		try {
			sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();
			WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
			Calendar c = Calendar.getInstance();
			c.add(Calendar.MONTH, -1); // 得到前一个月的1号
			String lastMonth = format.format(c.getTime()) + "-01";
			Calendar b = Calendar.getInstance();
			String Month = format.format(b.getTime()) + "-01"; // 得到当月的1号

			if (jourDevice.getDevId().equals("智能水表")) { // 智能水表
				WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
				waterMeterEvents.setWmDeviceSn(jourDevice.getDevAuthId());
				List<WaterMeterEvents> waterList = mapper.queryWaterMeterDetails(waterMeterEvents);
				if (waterList.size() != 0) {
					String Num = "";
					String time = "";
					for (int i = 0; i < waterList.size(); i++) {
						if (jourDevice.getDevDifference() != null && !jourDevice.getDevDifference().equals("0")) {
							Num = String.format("%.2f", Double.parseDouble(waterList.get(i).getWmNum())
									+ Double.parseDouble(jourDevice.getDevDifference()));
						} else {
							Num = waterList.get(i).getWmNum();
						}
						time = waterList.get(i).getWmTime();
					}
					String theMonthDosage = "";
					String lastMonthDosage = "";
					if (Num==null) {
						Num = "-";
						theMonthDosage = "-";
						lastMonthDosage = "-";
					} else {

						waterMeterEvents.setWmTime(Month);
						String waterLastNum = mapper.queryLastMonthWaterMeter(waterMeterEvents);
						if (waterLastNum == null) {
							waterLastNum = "0";
							theMonthDosage = String.format("%.2f",
									(Double.parseDouble(Num) - Double.parseDouble(waterLastNum)));
						} else {
							theMonthDosage = String.format("%.2f",
									(Double.parseDouble(Num) - Double.parseDouble(waterLastNum)));
						}

						waterMeterEvents.setWmTime(lastMonth);
						String waterLast2Num = mapper.queryLastMonthWaterMeter(waterMeterEvents);
						if (waterLast2Num == null) {
							waterLast2Num = "0";
							lastMonthDosage = String.format("%.2f",
									(Double.parseDouble(waterLastNum) - Double.parseDouble(waterLast2Num)));
						} else {
							lastMonthDosage = String.format("%.2f",
									(Double.parseDouble(waterLastNum) - Double.parseDouble(waterLast2Num)));
						}

					}
					JSONObject jsonlist = new JSONObject();
					jsonlist.accumulate("Num", Num);
					jsonlist.accumulate("theMonthDosage", theMonthDosage);
					jsonlist.accumulate("lastMonthDosage", lastMonthDosage);
					jsonlist.accumulate("time", time);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", jsonlist.toString()));
				} else {
					printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到该设备的读数信息 ！", null));
				}
			} else { // 智能电表
				ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
				electricMeterEvents.setEmDeviceSn(jourDevice.getDevAuthId());
				electricMeterEvents.setEmSubDeviceNumber(jourDevice.getJhdSubDeviceNumber());
				List<ElectricMeterEvents> electricList = mapper.queryElectricMeterDetails(electricMeterEvents);
				if (electricList.size() != 0) {
					String Num = "";
					String time = "";
					for (int i = 0; i < electricList.size(); i++) {
						if (jourDevice.getDevDifference() != null && !jourDevice.getDevDifference().equals("0")) {
							Num = String.format("%.2f", Double.parseDouble(electricList.get(i).getEmNum())
									+ Double.parseDouble(jourDevice.getDevDifference()));
						} else {
							Num = electricList.get(i).getEmNum();
						}
						time = electricList.get(i).getEmTime();
					}
					String theMonthDosage = "";
					String lastMonthDosage = "";
					if (Num==null) {
						Num = "-";
						theMonthDosage = "-";
						lastMonthDosage = "-";
					} else {
						electricMeterEvents.setEmTime(Month);
						String waterLastNum = mapper.queryLastMonthElectricMeter(electricMeterEvents);
						if (waterLastNum == null) {
							waterLastNum = "0";
							theMonthDosage = String.format("%.2f",
									(Double.parseDouble(Num) - Double.parseDouble(waterLastNum)));
						} else {
							theMonthDosage = String.format("%.2f",
									(Double.parseDouble(Num) - Double.parseDouble(waterLastNum)));
						}

						electricMeterEvents.setEmTime(lastMonth);
						String waterLast2Num = mapper.queryLastMonthElectricMeter(electricMeterEvents);
						if (waterLast2Num == null) {
							waterLast2Num = "0";
							lastMonthDosage = String.format("%.2f",
									(Double.parseDouble(waterLastNum) - Double.parseDouble(waterLast2Num)));
						} else {
							lastMonthDosage = String.format("%.2f",
									(Double.parseDouble(waterLastNum) - Double.parseDouble(waterLast2Num)));
						}

					}
					JSONObject jsonlist = new JSONObject();
					jsonlist.accumulate("Num", Num);
					jsonlist.accumulate("theMonthDosage", theMonthDosage);
					jsonlist.accumulate("lastMonthDosage", lastMonthDosage);
					jsonlist.accumulate("time", time);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", jsonlist.toString()));
				} else {
					printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到该设备的读数信息 ！", null));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		} finally {
			sqlSession.close();
		}
		return null;
	}

	/**
	 * 查近30天的每天用量
	 * 
	 * @return
	 * @throws IOException
	 */
	public String getDeviceChange(){
		SqlSession sqlSession = null;
		try {
			sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();
			WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
			if (jourDevice.getDevId().equals("智能水表")) {
				WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
				waterMeterEvents.setWmDeviceSn(jourDevice.getDevAuthId());

				JSONArray json = new JSONArray();
				String startNum = "";
				Double differenceNum;
				for (int i = 29; i >= 0; i--) {// 获取30天每天最后的读数
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Date date = new Date();
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(date);
					calendar.add(Calendar.DAY_OF_MONTH, -i);
					date = calendar.getTime();
					waterMeterEvents.setWmTime(sdf.format(date));
					String waterLastNum = mapper.queryLastMonthWaterMeter(waterMeterEvents);
					if (waterLastNum == null) {
						waterLastNum = "0.0";
					}

					if (i != 29) {
						differenceNum = Double.valueOf(String.format("%.2f",
								(Double.parseDouble(waterLastNum) - Double.parseDouble(startNum))));
						json.add(differenceNum);
					}
					startNum = waterLastNum;
				}
				List<WaterMeterEvents> waterList = mapper.queryWaterMeterDetails(waterMeterEvents);
				String Num = "";
				if (waterList.size() != 0) {
					for (int i = 0; i < waterList.size(); i++) {
						Num = waterList.get(i).getWmNum();
					}
				} else {
					Num = "0";
				}
				differenceNum = Double
						.valueOf(String.format("%.2f", (Double.parseDouble(Num) - Double.parseDouble(startNum))));
				json.add(differenceNum);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			} else {
				ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
				electricMeterEvents.setEmDeviceSn(jourDevice.getDevAuthId());
				electricMeterEvents.setEmSubDeviceNumber(jourDevice.getJhdSubDeviceNumber());
				JSONArray json = new JSONArray();
				String startNum = "";
				Double differenceNum;
				for (int i = 29; i >= 0; i--) {// 获取30天每天最后的读数
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					Date date = new Date();
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(date);
					calendar.add(Calendar.DAY_OF_MONTH, -i);
					date = calendar.getTime();
					electricMeterEvents.setEmTime(sdf.format(date));
					String electricLastNum = mapper.queryLastMonthElectricMeter(electricMeterEvents);
					if (electricLastNum == null) {
						electricLastNum = "0";
					}
					if (i != 29) {
						differenceNum = Double.valueOf(String.format("%.2f",
								(Double.parseDouble(electricLastNum) - Double.parseDouble(startNum))));
						json.add(differenceNum);
					}
					startNum = electricLastNum;
					System.out.println("读数：：：："+startNum);
				}
				List<ElectricMeterEvents> electricList = mapper.queryElectricMeterDetails(electricMeterEvents);
				String Num = "";
				if (electricList.size() != 0) {
					for (int i = 0; i < electricList.size(); i++) {
						Num = electricList.get(i).getEmNum();
					}
				} else {
					Num = "0";
				}
				differenceNum = Double
						.valueOf(String.format("%.2f", (Double.parseDouble(Num) - Double.parseDouble(startNum))));
				json.add(differenceNum);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			}

		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		} finally {
			sqlSession.close();
		}
		return null;
	}

	/**
	 * 查近24小时每小时的用量
	 * 
	 * @return
	 * @throws IOException
	 */
	public String getDeviceChangeHour(){
		SqlSession sqlSession = null;
		try {
			sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();
			WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
			if (jourDevice.getDevId().equals("智能水表")) {
				WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
				waterMeterEvents.setWmDeviceSn(jourDevice.getDevAuthId());

				JSONArray json = new JSONArray();
				String startNum = "";
				Double differenceNum;
				for (int i = 23; i >= 0; i--) {// 获取近24小时
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH");
					Date date = new Date();
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(date);
					calendar.add(Calendar.HOUR_OF_DAY, -i);
					date = calendar.getTime();
					waterMeterEvents.setWmTime(sdf.format(date));
					String waterLastNum = mapper.queryLastMonthWaterMeter(waterMeterEvents);
					if (waterLastNum == null) {
						waterLastNum = "0.0";
					}

					if (i != 23) {
						differenceNum = Double.valueOf(String.format("%.2f",
								(Double.parseDouble(waterLastNum) - Double.parseDouble(startNum))));
						json.add(differenceNum);
					}
					startNum = waterLastNum;
				}
				List<WaterMeterEvents> waterList = mapper.queryWaterMeterDetails(waterMeterEvents);
				String Num = "";
				if (waterList.size() != 0) {
					for (int i = 0; i < waterList.size(); i++) {
						Num = waterList.get(i).getWmNum();
					}
				} else {
					Num = "0";
				}
				differenceNum = Double
						.valueOf(String.format("%.2f", (Double.parseDouble(Num) - Double.parseDouble(startNum))));
				json.add(differenceNum);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			} else {
				ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
				electricMeterEvents.setEmDeviceSn(jourDevice.getDevAuthId());
				electricMeterEvents.setEmSubDeviceNumber(jourDevice.getJhdSubDeviceNumber());
				JSONArray json = new JSONArray();
				String startNum = "";
				Double differenceNum;
				for (int i = 23; i >= 0; i--) {// 获取近24小时
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH");
					Date date = new Date();
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(date);
					calendar.add(Calendar.HOUR_OF_DAY, -i);
					date = calendar.getTime();
					electricMeterEvents.setEmTime(sdf.format(date));
					String electricLastNum = mapper.queryLastMonthElectricMeter(electricMeterEvents);
					if (electricLastNum == null) {
						electricLastNum = "0";
					}
					if (i != 23) {
						differenceNum = Double.valueOf(String.format("%.2f",
								(Double.parseDouble(electricLastNum) - Double.parseDouble(startNum))));
						json.add(differenceNum);
					}
					startNum = electricLastNum;
				}
				List<ElectricMeterEvents> electricList = mapper.queryElectricMeterDetails(electricMeterEvents);
				String Num = "";
				if (electricList.size() != 0) {
					for (int i = 0; i < electricList.size(); i++) {
						Num = electricList.get(i).getEmNum();
					}
				} else {
					Num = "0";
				}
				differenceNum = Double
						.valueOf(String.format("%.2f", (Double.parseDouble(Num) - Double.parseDouble(startNum))));
				json.add(differenceNum);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			}

		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		} finally {
			sqlSession.close();
		}
		return null;
	}

	/**
	 * 获取近12个月每月的用量
	 * 
	 * @return
	 * @throws IOException
	 */
	public String getDeviceChangeMonth(){
		SqlSession sqlSession = null;
		try {
			sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession();
			WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
			if (jourDevice.getDevId().equals("智能水表")) {
				WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
				waterMeterEvents.setWmDeviceSn(jourDevice.getDevAuthId());

				JSONArray json = new JSONArray();
				String startNum = "";
				Double differenceNum;
				for (int i = 11; i >= 0; i--) {
					SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
					Calendar c = Calendar.getInstance();
					c.add(Calendar.MONTH, -i); // 得到前一个月的1号
					String Month = format.format(c.getTime()) + "-01";

					waterMeterEvents.setWmTime(Month);
					String waterLastNum = mapper.queryLastMonthWaterMeter(waterMeterEvents);
					if (waterLastNum == null) {
						waterLastNum = "0.0";
					}

					if (i != 11) {
						differenceNum = Double.valueOf(String.format("%.2f",
								(Double.parseDouble(waterLastNum) - Double.parseDouble(startNum))));
						json.add(differenceNum);
					}
					startNum = waterLastNum;
				}
				List<WaterMeterEvents> waterList = mapper.queryWaterMeterDetails(waterMeterEvents);
				String Num = "";
				if (waterList.size() != 0) {
					for (int i = 0; i < waterList.size(); i++) {
						Num = waterList.get(i).getWmNum();
					}
				} else {
					Num = "0";
				}
				differenceNum = Double
						.valueOf(String.format("%.2f", (Double.parseDouble(Num) - Double.parseDouble(startNum))));
				json.add(differenceNum);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			} else {
				ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
				electricMeterEvents.setEmDeviceSn(jourDevice.getDevAuthId());
				electricMeterEvents.setEmSubDeviceNumber(jourDevice.getJhdSubDeviceNumber());
				JSONArray json = new JSONArray();
				String startNum = "";
				Double differenceNum;
				for (int i = 11; i >= 0; i--) {
					SimpleDateFormat format = new SimpleDateFormat("yyyy-MM");
					Calendar c = Calendar.getInstance();
					c.add(Calendar.MONTH, -i); // 得到前一个月的1号
					String Month = format.format(c.getTime()) + "-01";

					electricMeterEvents.setEmTime(Month);
					String electricLastNum = mapper.queryLastMonthElectricMeter(electricMeterEvents);
					if (electricLastNum == null) {
						electricLastNum = "0";
					}
					if (i != 11) {
						differenceNum = Double.valueOf(String.format("%.2f",
								(Double.parseDouble(electricLastNum) - Double.parseDouble(startNum))));
						json.add(differenceNum);
					}
					startNum = electricLastNum;
				}
				List<ElectricMeterEvents> electricList = mapper.queryElectricMeterDetails(electricMeterEvents);
				String Num = "";
				if (electricList.size() != 0) {
					for (int i = 0; i < electricList.size(); i++) {
						Num = electricList.get(i).getEmNum();
					}
				} else {
					Num = "0";
				}
				differenceNum = Double
						.valueOf(String.format("%.2f", (Double.parseDouble(Num) - Double.parseDouble(startNum))));
				json.add(differenceNum);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json.toString()));
			}

		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		} finally {
			sqlSession.close();
		}
		return null;
	}
}
