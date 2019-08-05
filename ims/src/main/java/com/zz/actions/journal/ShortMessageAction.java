package com.zz.actions.journal;

import java.util.List;

import com.zz.other.Syslog;
import org.apache.struts2.json.JSONUtil;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;

import com.zz.mapper.journal.JournalShortMessageMapper;
import com.zz.mapper.sys.SysSystemSettingMapper;

import com.zz.po.commons.Result;

import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoRenterExpand;
import com.zz.po.journal.JournalShortMessage;
import com.zz.po.sys.SysSystemSetting;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.RenterService;
import com.zz.service.journal.ShortMessageService;
import com.zz.util.SessionUtil;

public class ShortMessageAction extends BaseAction implements ModelDriven<JournalShortMessage> {
	private JournalShortMessage journalShortMessage;
	private ShortMessageService shortMessageService;
	private HouseForRentService houseForRentService;
	private RenterService renterService;
	private JournalShortMessageMapper journalShortMessageMapper;
	private SysSystemSettingMapper sysSystemSettingMapper;

	public void setShortMessageService(ShortMessageService shortMessageService) {
		this.shortMessageService = shortMessageService;
	}

	public void setJournalShortMessage(JournalShortMessage journalShortMessage) {
		this.journalShortMessage = journalShortMessage;
	}

	public void setHouseForRentService(HouseForRentService houseForRentService) {
		this.houseForRentService = houseForRentService;
	}

	public void setRenterService(RenterService renterService) {
		this.renterService = renterService;
	}

	@Override
	public JournalShortMessage getModel() {
		if (journalShortMessage == null) {
			journalShortMessage = new JournalShortMessage();
		}
		return journalShortMessage;
	}

	// 群发短信，有需要再把注释打开
	public String sendShortToAll() {
		/*
		 * try{ String note =journalShortMessage.getSmNote();
		 * JournalShortMessage sm = new JournalShortMessage();
		 * InfoHouse4rentExpand ihe = new InfoHouse4rentExpand();
		 * ihe.setHrState("正常"); List<InfoHouse4rentExpand> hrList =
		 * houseForRentService.queryHouseRentCommon(ihe); int sFlag = 0; int
		 * eFlag = 0; for(int i=0;i<hrList.size();i++){
		 * 
		 * InfoRenterExpand re = new InfoRenterExpand();
		 * re.setRenterId(hrList.get(i).getHrRenterId()); List<InfoRenterExpand>
		 * rinfo = renterService.selectAll(re);
		 * 
		 * sm.setSmContent(note); sm.setMessageType(0);
		 * sm.setSmPopId(rinfo.get(0).getRenterPopulationId());
		 * sm.setSmrentId(hrList.get(i).getHrRenterId());
		 * sm.setSmRentId(hrList.get(i).getHrId());
		 * sm.setSmNotRentId(hrList.get(i).getHrHouse4storeId());
		 * System.out.println("发送"+(i+1)+"次"); int result =
		 * shortMessageService.integratedSmsSending(sm); if(result==1){ sFlag++;
		 * }else{ eFlag++; } } printlnOfJson(CommonMethodClass.jsonData(1,
		 * "发送完成！"+"成功："+sFlag+"; 失败："+eFlag, null)); }catch(Exception e) {
		 * e.printStackTrace();Syslog.writeErr(e); printlnOfJson(CommonMethodClass.jsonData(-2,
		 * "系统异常", null)); }
		 */
		return null;
	}

	// 查询短信-数据和统计分开
	public String selectShortMessageSplit() {
		// 短信记录 - 查询 F07b01
		int auth1 = Authority.authorize("F07b01");
		if (auth1 == 0) {
			printlnOfJson(CommonMethodClass.jsonData(-3, "无查看短信权限", null));
			return null;
		}
		try {
			List<JournalShortMessage> list = shortMessageService.selectAllShortMessage(journalShortMessage);
			String date = "";
			if (list.size() != 0) {
				if (!"0".equals(journalShortMessage.getSplitFlag())) {
					for (int i = 0; i < list.size(); i++) {
						date = list.get(i).getSmDataTime().substring(0, 19);
						list.get(i).setSmDataTime(date);
					}
				}
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

	// 综合短信发送
	public void integratedSmsSending() {
		try {
			int result = shortMessageService.integratedSmsSending(journalShortMessage);
			if (result == -3) {// 短信添加失败
				printlnOfJson(CommonMethodClass.jsonData(-1, "数据有误", null));
			} else if (result == -4) { // 短信类型不存在
				printlnOfJson(CommonMethodClass.jsonData(-1, "短信类型不存在", null));
			} else if (result == -1) { // 余额不足
				printlnOfJson(CommonMethodClass.jsonData(-8, "账户余额不足", null));
			} else if (result == -2) { // 推送失败
				printlnOfJson(CommonMethodClass.jsonData(-1, "推送失败", null));
			} else if (result == 1) { // 成功
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			} else {
				printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	
	//发送外部短信（新版本）
	public void sendOutsideMessage(){
	    try{
	    	Result<String> result = shortMessageService.sendOutsideMessage(journalShortMessage);
	    	printlnOfJson(CommonMethodClass.jsonData(result.getCode(), result.getMsg(), result.getBody()));
        }catch(Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
	}

	// 查询
	public String selectShortMessage() {
		try {
			
			List<JournalShortMessage> list = shortMessageService.selectByPrimaryKey(journalShortMessage);
			String date = "";
			if (list.size() != 0) {
				for (int i = 0; i < list.size(); i++) {
					date = list.get(i).getSmDataTime().substring(0, 19);
					list.get(i).setSmDataTime(date);
				}
				String json = JSONUtil.serialize(list);

				printlnOfJson(json);
			} else {
				printlnMsg("-1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnMsg("-1");
		}
		return null;
	}

	// 在已租未租里查询短信
	public String selectShortMessageInRent() {
		try {
			JournalShortMessage jsm = new JournalShortMessage();
			jsm.setSmNotRentId(journalShortMessage.getSmNotRentId());
			jsm.setSmType("发送");
			if (journalShortMessage.getTotalNum().equals("0")) {
				jsm.setSmLandId(journalShortMessage.getSmLandId());
			}
			List<JournalShortMessage> list = shortMessageService.selectByPrimaryKey(jsm);
			String date = "";
			if (list.size() != 0) {
				for (int i = 0; i < list.size(); i++) {
					date = list.get(i).getSmDataTime().substring(0, 19);
					list.get(i).setSmDataTime(date);
				}
				String json = JSONUtil.serialize(list);
				printlnOfJson(json);
			} else {
				printlnMsg("-1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnMsg("-1");
		}
		return null;
	}

	// 新增
	public String insrtShortMessage() {
		try {
			int result = shortMessageService.insertSelective(journalShortMessage);
			int smId = journalShortMessage.getSmId();
			if (result == 0) {
				printlnMsg("-1");
			} else {
				printlnMsg("" + smId);
			}
		} catch (Exception e) {
		}
		return null;
	}

	// 短信状态修改
	public String updateShortMessage() {
		try {
			JournalShortMessage jsm = new JournalShortMessage();
			jsm.setSmId(journalShortMessage.getSmId());
			jsm.setSmTreatmentStatus(journalShortMessage.getSmTreatmentStatus());
			int result = shortMessageService.updateByPrimaryKeySelective(jsm);
			if (result == 0) {
				printlnMsg("-1");
			} else {
				printlnMsg("1");
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnMsg("-1");
		}
		return null;
	}

}
