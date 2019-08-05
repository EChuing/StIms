package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import com.zz.po.sys.SysVariables;
import com.zz.service.sys.SysVariablesService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.po.journal.JournalWegReading;
import com.zz.service.journal.WegReadingService;

public class WegReadingAction extends BaseAction implements ModelDriven<JournalWegReading> {
	private JournalWegReading journalWegReading;
	private WegReadingService wegReadingService;

	public void setJournalWegReading(JournalWegReading journalWegReading) {
		this.journalWegReading = journalWegReading;
	}

	public void setWegReadingService(WegReadingService wegReadingService) {
		this.wegReadingService = wegReadingService;
	}

	@Override
	public JournalWegReading getModel() {
		if (journalWegReading == null) {
			journalWegReading = new JournalWegReading();
		}
		return journalWegReading;
	}

	// 根据抄表读数查抄表日期
	public String selectWegDate() {
		try {
			List<JournalWegReading> list = wegReadingService.selectWegDate(journalWegReading);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 条件查询抄表-本月已抄表、本月未抄表、智能仪表
	public String conditionSelectWegReading() {
		try {
			List<JournalWegReading> list = wegReadingService.conditionSelectWegReading(journalWegReading);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 查询抄表-数据和统计分开
	public String selectAllWegReading() {
		// 抄表 - 查询 C05b01
		int auth1 = Authority.authorize("C05b01");
		if (auth1 == 0) {
			printlnOfJson(CommonMethodClass.jsonData(-3, "无查看抄表权限", null));
			return null;
		}
		try {
			String str = journalWegReading.getArrStr().replaceAll("[\\{\\}\\[\\]]", "");
			String[] array = str.split(",");
			int[] ints = new int[array.length];
			for(int i=0; i<array.length; i++)
			{
				ints[i] = Integer.parseInt(array[i]);
			}
			journalWegReading.setArr(ints);
			List<JournalWegReading> list = wegReadingService.selectAllWegReading(journalWegReading);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 查询抄表-数据和统计分开
	public String queryLivingfeeRecordsCommon() {
		try {
			List<JournalWegReading> list = wegReadingService.selectAllWegReading(journalWegReading);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 抄表批量添加抄表
	public String insertWegReadingBatch() {
		try {
			String wegJson = journalWegReading.getWegJson();
			JSONArray wegJsonArray = JSONArray.fromObject(wegJson);
			int result = 0;
			for (Object a : wegJsonArray) {
				JSONObject wegJsonObj = (JSONObject) a;
				JournalWegReading jr = (JournalWegReading) JSONObject.toBean(wegJsonObj, JournalWegReading.class);
				System.out.println(jr.getWaterReading());
				System.out.println(jr.getElectricReading());
				System.out.println(jr.getGasReading());
				System.out.println(jr.getHotwaterReading());
				System.out.println(jr.getHotairReading());
				if (jr.getWaterReading() != 0 || jr.getElectricReading() != 0 || jr.getGasReading() != 0
						|| jr.getHotwaterReading() != 0 || jr.getHotairReading() != 0) {
					int temp = 2;
					result += wegReadingService.addedMeterReading(jr, temp);
				}
			}
			if (result == 0) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "批量添加抄表失败", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 新增一条记录(过期的接口，优先使用批量抄表)
	public String insertWegReading() {
		try {
			int temp = 1;
			int result = wegReadingService.addedMeterReading(journalWegReading, temp);
			if (result == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加抄表失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 已租房添加抄表
	public String insertWegReadingInRent() {
		try {
			int temp = 2;
			int result = wegReadingService.addedMeterReading(journalWegReading, temp);
			if (result == 1) {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "添加抄表失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 根据ID查询
	public String selectWegrdId() {
		try {
			List<JournalWegReading> list = wegReadingService.selectByPrimaryKey(journalWegReading.getWegrdId());
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无消息", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 查询所有，给条件则为条件查询
	public String selectWegReadingAll() {
		try {
			List<JournalWegReading> list = wegReadingService.selectWegReadingAll(journalWegReading);
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无消息", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	// 修改
	public String updateWegReading() {
		try {
			int result = wegReadingService.updateByPrimaryKey(journalWegReading);
			if (result == 0) {
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无消息", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}

	/*// 查询所有，给条件则为条件查询
	public String queryDevice() {
		try {
			List<JourDevice> list = wegReadingService.queryDevice(journalWegReading.getHsId());
			if (list.size() != 0) {
				String json = JSONUtil.serialize(list);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无消息", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
		return null;
	}*/

}
