package com.zz.service.journal;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.JavaSmsApi;
import com.zz.actions.commons.ShieldingWords;
import com.zz.mapper.info.InfoHouse4rentMapper;
import com.zz.mapper.journal.JournalShortMessageMapper;
import com.zz.mapper.sys.SysSystemSettingMapper;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.journal.JournalShortMessage;
import com.zz.po.sys.SysSystemSetting;
import com.zz.service.sys.SendShortMessageService;
import com.zz.util.SessionUtil;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ShortMessageServiceImpl implements ShortMessageService {
	ShieldingWords sw = new ShieldingWords();
	private JournalShortMessageMapper journalShortMessageMapper;
	private SysSystemSettingMapper sysSystemSettingMapper;
	private InfoHouse4rentMapper infoHouse4rentMapper;
	@Autowired
	private SendShortMessageService sendShortMessageService;

	public void setSysSystemSettingMapper(SysSystemSettingMapper sysSystemSettingMapper) {
		this.sysSystemSettingMapper = sysSystemSettingMapper;
	}

	public void setInfoHouse4rentMapper(InfoHouse4rentMapper infoHouse4rentMapper) {
		this.infoHouse4rentMapper = infoHouse4rentMapper;
	}

	public void setJournalShortMessageMapper(JournalShortMessageMapper journalShortMessageMapper) {
		this.journalShortMessageMapper = journalShortMessageMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer smId) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.deleteByPrimaryKey(smId);
	}

	@Override
	public int insertSelective(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.insertSelective(record);
	}

	@Override
	public List<JournalShortMessage> selectByPrimaryKey(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public JournalShortMessage getPopName(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.getPopName(record);
	}

	@Override
	public JournalShortMessage getNotrentAddress(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.getNotrentAddress(record);
	}

	@Override
	public JournalShortMessage getrentAddress(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.getrentAddress(record);
	}

	@Override
	public List<JournalShortMessage> getDatePeriods(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.getDatePeriods(record);
	}

	@Override
	public List<JournalShortMessage> renewalLandlord(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.renewalLandlord(record);
	}

	@Override
	public List<JournalShortMessage> rentRenewal(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.rentRenewal(record);
	}

	@Override
	public JournalShortMessage getDepositTime(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.getDepositTime(record);
	}

	@Override
	public List<JournalShortMessage> selectBatchSend(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.selectBatchSend(record);
	}

	@Override
	public int insertList(List<JournalShortMessage> srelist) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.insertList(srelist);
	}

	@Override
	public JournalShortMessage getPopulationId(String tel) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.getPopulationId(tel);
	}

	@Override
	public JournalShortMessage getLandInfo(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.getLandInfo(record);
	}

	@Override
	public JournalShortMessage populationNumber(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.populationNumber(record);
	}

	@Override
	public List<JournalShortMessage> selectAllShortMessage(JournalShortMessage record) throws Exception {
		// TODO Auto-generated method stub
		return journalShortMessageMapper.selectAllShortMessage(record);
	}

	@Override
	public Result<String> sendOutsideMessage(JournalShortMessage journalShortMessage) throws Exception {
		int type = journalShortMessage.getMessageType();
		JournalShortMessage jsm = new JournalShortMessage();
		JournalShortMessage sm = null;
		// 查询手机号
		String mobile = "";
		if (type == 10) {// 意向人定金
			journalShortMessage.setSmIpId(journalShortMessage.getSmPopId());
			journalShortMessage.setSmPopId(null);
			sm = journalShortMessageMapper.getIntendedRenter(journalShortMessage);
			mobile = sm.getPopTelephone();
		} else if (type == 16) {
			mobile = journalShortMessage.getPopTelephone();
		} else if(type == 17){
			mobile = journalShortMessage.getPopTelephone();
		}else if(type == 20){
			mobile = journalShortMessage.getPopTelephone();
		}else {
			sm = journalShortMessageMapper.populationNumber(journalShortMessage);
			System.out.println(sm);
			mobile = sm.getPopTelephone();
		}
		journalShortMessage.setSmId(null);
		journalShortMessage.setSmReceiveNumber(mobile);
		journalShortMessage.setSmType("发送");
		System.out.println("准备短信++++");
		String message = createOutsideMsg(journalShortMessage);
		System.out.println("短信内容" + message);
		journalShortMessage.setSmNote(message);
		Result<String> result = sendShortMessageService.sendMessage(mobile, message, journalShortMessage, 2);
		return result;
	}

	public String createOutsideMsg(JournalShortMessage journalShortMessage) throws Exception {
		String message = "初始";
		int type = journalShortMessage.getMessageType();
		if (type == 0) { // 自定义发送(已校验)
			System.out.println("0");
			return createSendMsgBySet(journalShortMessage);
		} else if (type == 1) { // 合同到期提醒(已校验)
			return createExpirationOfContract(journalShortMessage);
		} else if (type == 2) { // 合同续签提醒短信(已校验)
			return createContractRenewal(journalShortMessage);
		} else if (type == 3) { // 合同到期不做出租(已校验)
			return createDoNotRent(journalShortMessage);
		} else if (type == 4) { // 续约确认短信(已校验)
			return createRenewConfirm(journalShortMessage);
		} else if (type == 5) { // 合同过期续签提醒(已校验)
			return createContractExpirationReminder(journalShortMessage);
		} else if (type == 6) { // 提醒类短信(公众号关注短信)(已校验)
			return createSendReminderSms(journalShortMessage);
		} else if (type == 7) { // 房屋租金短信发送(已校验)
			return createPayRentSms(journalShortMessage);
		} else if (type == 8) { // 未结清款项提醒(已校验)
			return createUncleared(journalShortMessage);
		} else if (type == 9) { // 欠款提醒(已校验)
			return createArrearsReminder(journalShortMessage);
		} else if (type == 10) { // 定金失效(已校验)
			return createDepositFailure(journalShortMessage);
		} else if (type == 11) { // 房东账单短信提醒(已校验)
			return createPayableToLandlord(journalShortMessage);
		} else if (type == 12) { // 房东免租期账单短信提醒(已校验)
			return createLandlordFreePeriod(journalShortMessage);
		} else if (type == 13) { // 租客优惠劵到账短信提醒(已校验)
			return createSendMsgToRenter0(journalShortMessage);
		} else if (type == 14) { // 租客每期收支结算短信提醒(已校验)
			return createSendMsgToRenter1(journalShortMessage);
		} else if (type == 15) { // 租客续签合同地址发送(已校验)
			return createSendContractSms(journalShortMessage);
		} else if (type == 16) { // 自助看房短信发送(已校验)
			return createRoomMessage(journalShortMessage);
		} else if(type==17){
			return createSalesContract(journalShortMessage);
		} else if(type==18){//设置密码锁短信提醒
			return createRoomLockMessage(journalShortMessage);
		}else if(type==19){//未租房出租
			return createSendLease(journalShortMessage);
		}else{
			
		}
		return message;
	}

	// 自定义重发
	public String createSendMsgBySet(JournalShortMessage journalShortMessage) {
		String note = journalShortMessage.getSmContent();
		String message = note;
		return message;
	}

	// 合同到期提醒
	public String createExpirationOfContract(JournalShortMessage journalShortMessage) throws Exception {
		String company = SessionUtil.getSession("company");
		String add = null;
		String date = null;
		String uid = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		List<JournalShortMessage> datatime = null;
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.renewalLandlord(journalShortMessage);
			date = datatime.get(0).getJrlEndTime();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {

			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.rentRenewal(journalShortMessage);
			date = datatime.get(0).getJrrEndTime();
		}
		String tel = journalShortMessage.getServiceTelephone();
		String message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，本期合同将于" + date + "到期，续租详情请尽快联系客服，电话" + tel + "，谢谢配合！";
		return message;

	}

	// 合同续签提醒短信
	public String createContractRenewal(JournalShortMessage journalShortMessage) throws Exception {
		String company = SessionUtil.getSession("company");
		String add = null;
		String uid = null;
		String date = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		List<JournalShortMessage> datatime = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.renewalLandlord(journalShortMessage);
			date = datatime.get(0).getJrlEndTime();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {

			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.rentRenewal(journalShortMessage);
			date = datatime.get(0).getJrrEndTime();
		}

		String companyadd = journalShortMessage.getCompanyAddress();
		String tel = journalShortMessage.getServiceTelephone();
		String message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，本期合同即将到期，请尽快办理续签手续，我司办公地址：" + companyadd + "，客服：" + tel
				+ "，感谢支持！";
		return message;
	}

	// 合同到期不做出租
	public String createDoNotRent(JournalShortMessage journalShortMessage) throws Exception {
		List<JournalShortMessage> datatime = null;
		String company = SessionUtil.getSession("company");
		String add = null;
		String uid = null;
		String date = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.renewalLandlord(journalShortMessage);
			date = datatime.get(0).getJrlEndTime();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {

			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.rentRenewal(journalShortMessage);
			date = datatime.get(0).getJrrEndTime();
		}
		String message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，合同将于" + date + "期满，期满后我们公司暂不作出租安排，请您准时搬离并做退房手续！";
		return message;
	}

	// 续约确认短信
	public String createRenewConfirm(JournalShortMessage journalShortMessage) throws Exception {

		List<JournalShortMessage> datatime = null;
		String company = SessionUtil.getSession("company");
		String add = null;
		String uid = null;
		String date = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.renewalLandlord(journalShortMessage);
			date = datatime.get(0).getJrlEndTime();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {

			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.rentRenewal(journalShortMessage);
			date = datatime.get(0).getJrrEndTime();
		}

		Double money = journalShortMessage.getSmMoney();
		String message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，本期合同将于" + date + "到期，续签租金" + money
				+ "，如确认以上续租信息，请务必回复“是”。谢谢！";
		;
		return message;
	}

	// 合同过期续签提醒
	public String createContractExpirationReminder(JournalShortMessage journalShortMessage) throws Exception {
		String message = null;
		String company = SessionUtil.getSession("company");
		String add = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		String date = null;
		String uid = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		List<JournalShortMessage> datatime = null;
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址

			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);

			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.renewalLandlord(journalShortMessage);
			date = datatime.get(0).getJrlEndTime();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {

			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);

			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.rentRenewal(journalShortMessage);
			date = datatime.get(0).getJrrEndTime();
		}
		String companyadd = journalShortMessage.getCompanyAddress();
		String tel = journalShortMessage.getServiceTelephone();
		message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，本期合同已结束，请尽快办理续签手续，地址：" + companyadd + "，客服：" + tel + "，感谢支持！";

		return message;
	}

	// 提醒类短信发送
	public String createSendReminderSms(JournalShortMessage journalShortMessage) throws Exception {
		String str = smsInformation();
		String str1[] = str.split("###");
		String wechatPublicNumber = str1[6];
		String message = "尊敬的客户，您可通过搜索微信公众号：" + wechatPublicNumber + "或扫描租赁合同头部二维码，"
				+ "添加我司公众号后点击底部“用户中心”即可操作：微信缴费、费用查询、自助报修等！首次登陆需输入身份证、手机号码进行验证。";
		return message;
	}

	// 房屋租金短信发送
	public String createPayRentSms(JournalShortMessage journalShortMessage) throws Exception {
		String message = null;
		String company = SessionUtil.getSession("company");
		String add = null;
		String date = null;
		String uid = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		String flag = null;
		Double money = journalShortMessage.getSmMoney();
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		String[] strtime = CommonMethodClass.getCurrentMonthTime().split("###");
		String startTime = strtime[0];
		String endTime = strtime[1];
		journalShortMessage.setStartTime(startTime);
		journalShortMessage.setEndTime(endTime);
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			journalShortMessage.setJciNature("应支");
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取时间
			List<JournalShortMessage> datatime = journalShortMessageMapper.getDatePeriods(journalShortMessage);
			date = datatime.get(0).getJciBeginPeriods();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {
			uid = company + "_ZK_" + journalShortMessage.getSmId();
			journalShortMessage.setJciNature("应收");
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			flag = journalShortMessage.getFlag();
			// 获取时间
			if (flag == null) {
				// 已租房间，租客催款
				List<JournalShortMessage> datatime = journalShortMessageMapper.getDatePeriods(journalShortMessage);
				date = datatime.get(0).getJciBeginPeriods();
			} else {
				// 租客应收款
				date = journalShortMessage.getJciFukuanri();
			}
		}
		Integer variableParameter = journalShortMessage.getVariableParameter();// 判断是否是临时账单短信
		if (variableParameter == null) {
			variableParameter = 0;
		}
		String note = journalShortMessage.getSmNote();
		if (note == null || note.equals("")) {
			note = "房屋租金";
		}
		if (variableParameter == 1) {
			message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，本次临时账单费用为" + money + "（包含：" + note + "）" + "，付款日为" + date
					+ "，请您按时缴纳，超时将产生相关费用，感谢支持。";
		} else {
			message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，本期总费用为" + money + "（包含：" + note + "）" + "，交租日为" + date
					+ "，请您按时缴纳，超时将产生相关费用，感谢支持。";
		}
		return message;
	}

	// 未结清款项提醒
	public String createUncleared(JournalShortMessage journalShortMessage) throws Exception {
		String company = SessionUtil.getSession("company");
		String add = null;
		String community = null;
		String date = null;
		String building = null;
		String doorplateno = null;
		String uid = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		List<JournalShortMessage> datatime = null;
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.renewalLandlord(journalShortMessage);
			date = datatime.get(0).getJrlEndTime();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {

			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.rentRenewal(journalShortMessage);
			date = datatime.get(0).getJrrEndTime();
		}
		Double money = journalShortMessage.getSmMoney();
		String note = journalShortMessage.getSmNote();
		if (note == null || note.equals("")) {
			note = "房屋租金";
		}
		String message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "，本期费用有" + money + "尚未结清（包含：" + note + "），请及时缴纳，感谢支持。";
		return message;
	}

	// 欠款提醒
	public String createArrearsReminder(JournalShortMessage journalShortMessage) throws Exception {
		String company = SessionUtil.getSession("company");
		String add = null;
		String date = journalShortMessage.getDeadline();
		String uid = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		JournalShortMessage datatime = new JournalShortMessage();
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {
			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			add = community + building + doorplateno;

		}

		String message = "尊敬的 " + name + " 客户，您好！您租赁的" + add + "欠费已久，请在" + date + "前交清相关费用，超过将按合同条款进行收房处理！谢谢配合。";
		return message;
	}

	// 定金失效
	public String createDepositFailure(JournalShortMessage journalShortMessage) throws Exception {
		String company = SessionUtil.getSession("company");
		String add = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String name = sm.getPopName();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();

		smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);

		if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
			community = smNotRentAdd.getAddCommunity();
		}
		if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
			building = smNotRentAdd.getAddBuilding();
		}
		if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
			doorplateno = smNotRentAdd.getAddDoorplateno();
		}
		add = community + building + doorplateno;
		// 定金截止时间
		JournalShortMessage jsm = journalShortMessageMapper.getDepositTime(journalShortMessage);
		String date = jsm.getHsEndDate();
		String message = "尊敬的 " + name + " 客户，您好！您租赁的 " + add + " 物业，定金有效期到" + date + "。";
		return message;
	}

	// 房东账单短信提醒
	public String createPayableToLandlord(JournalShortMessage journalShortMessage) throws Exception {
		String add = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		Double money = journalShortMessage.getSmMoney();
		String bankName = journalShortMessage.getHsBankType();
		String bankNum = journalShortMessage.getHsBankNum();
		bankNum = "尾数" + bankNum.substring(bankNum.length() - 4);
		String name = journalShortMessage.getHsBankName();

		journalShortMessage.setSmlandId(journalShortMessage.getSmLandId());
		JournalShortMessage payableToLandlord = new JournalShortMessage();
		payableToLandlord = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
		if (payableToLandlord.getAddCommunity() != null && !payableToLandlord.getAddCommunity().equals("0")) {
			community = payableToLandlord.getAddCommunity();
		}
		if (payableToLandlord.getAddBuilding() != null && !payableToLandlord.getAddBuilding().equals("0")) {
			building = payableToLandlord.getAddBuilding();
		}
		if (payableToLandlord.getAddDoorplateno() != null && !payableToLandlord.getAddDoorplateno().equals("0")) {
			doorplateno = payableToLandlord.getAddDoorplateno();
		}
		add = community + building + doorplateno;

		String message = "尊敬的业主您好！您：" + add + "，本月租金" + money + "，已提交到您" + bankName + "账户" + bankNum + "，收款人" + name
				+ "，请注意查收！";
		return message;
	}

	// 房东免租期账单短信提醒
	public String createLandlordFreePeriod(JournalShortMessage journalShortMessage) throws Exception {
		String add = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		JournalShortMessage payableToLandlord = new JournalShortMessage();
		payableToLandlord = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
		if (payableToLandlord.getAddCommunity() != null && !payableToLandlord.getAddCommunity().equals("0")) {
			community = payableToLandlord.getAddCommunity();
		}
		if (payableToLandlord.getAddBuilding() != null && !payableToLandlord.getAddBuilding().equals("0")) {
			building = payableToLandlord.getAddBuilding();
		}
		if (payableToLandlord.getAddDoorplateno() != null && !payableToLandlord.getAddDoorplateno().equals("0")) {
			doorplateno = payableToLandlord.getAddDoorplateno();
		}
		add = community + building + doorplateno;
		String message = "尊敬的业主您好！您：" + add + "，本月为免租期。感谢您对我们的大力支持。";

		return message;
	}

	// 租客优惠劵到账短信提醒
	public String createSendMsgToRenter0(JournalShortMessage journalShortMessage) throws Exception {
		String community = null;
		String building = null;
		String doorplateno = null;
		String address = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String userName = sm.getPopName();
		Double money = journalShortMessage.getSmMoney();

		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
		if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
			community = smNotRentAdd.getAddCommunity();
		}
		if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
			building = smNotRentAdd.getAddBuilding();
		}
		if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
			doorplateno = smNotRentAdd.getAddDoorplateno();
		}
		address = community+building+doorplateno;
		String message = "尊敬的  " + userName + " 租户，您好！您的推荐补贴 " + money + " 元已入账至 " + address + " 账单余额，感谢您的信任与支持！";

		return message;
	}

	// 租客每期收支结算短信提醒
	public String createSendMsgToRenter1(JournalShortMessage journalShortMessage) throws Exception {
		String community = null;
		String building = null;
		String doorplateno = null;
		String address = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String userName = sm.getPopName();
		Double money = journalShortMessage.getSmMoney();

		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
		if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
			community = smNotRentAdd.getAddCommunity();
		}
		if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
			building = smNotRentAdd.getAddBuilding();
		}
		if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
			doorplateno = smNotRentAdd.getAddDoorplateno();
		}
		address = community + building + doorplateno;
		String message = "尊敬的  " + userName + " 租户，您好！您的租房 " + address + " 本期实收 " + money + " 元已到账，感谢您的信任与支持！";
		return message;
	}
	//未租房添加出租
	public String createSendLease(JournalShortMessage journalShortMessage) throws Exception {
		String url = journalShortMessage.getUrl();
		String userName = journalShortMessage.getPopName();
		String address = journalShortMessage.getCompanyAddress();
		String message = "尊敬的 " + userName + "客户，您好！我们已接到您" + address + "的新签申请，请点击链接在线签署:" + url;
		System.out.println("是否成功创建信息++++ShortMessageServiceImpl.createSendContractSms()"+message);
		return message;
	}
	// 租客续签合同地址发送
	public String createSendContractSms(JournalShortMessage journalShortMessage) throws Exception {
		String url = journalShortMessage.getUrl();
		String userName = journalShortMessage.getPopName();
		String address = journalShortMessage.getCompanyAddress();
		String message = "尊敬的 " + userName + "客户，您好！我们已接到您" + address + "的续租申请，请点击链接在线签署:" + url;
		System.out.println("是否成功创建信息++++ShortMessageServiceImpl.createSendContractSms()"+message);
		return message;
	}
	//销售合同签名续签
	public String createSalesContract(JournalShortMessage journalShortMessage) throws Exception{
		String url = journalShortMessage.getUrl();
		String userName = journalShortMessage.getPopName();
		String message = "尊敬的 " + userName + "客户，您好！我们已接到您" + "申请，请点击链接在线签署:" + url;
		System.out.println("是否成功创建信息++++ShortMessageServiceImpl.createSendContractSms()"+message);
		return message;
	}

	//设置密码锁新增密码短信提醒
	public String createRoomLockMessage(JournalShortMessage journalShortMessage) throws Exception{
		String community = null;
		String building = null;
		String doorplateno = null;
		String address = null;
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		String userName = sm.getPopName();
		Integer unlockingTimes = journalShortMessage.getUnlockingTimes();
		String deadLine = journalShortMessage.getDeadline();
		String msg ="";
		if(unlockingTimes!=null&&!unlockingTimes.equals("")){
			msg=" ,有效次数为："+unlockingTimes;
		}
		if(deadLine!=null&&!deadLine.equals("")){
			msg=" ,有效期限至："+deadLine;
		}

		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
		if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
			community = smNotRentAdd.getAddCommunity();
		}
		if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
			building = smNotRentAdd.getAddBuilding();
		}
		if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
			doorplateno = smNotRentAdd.getAddDoorplateno();
		}
		address = community + building + doorplateno;

		String roomPassword = journalShortMessage.getPassword();
		String message = "尊敬的 " + userName + "客户，您好！您的租房"+address+",我们已接到您新增密码的申请，新增密码为:" + roomPassword +msg+"，祝您生活愉快。";
		System.out.println("是否成功创建信息++++ShortMessageServiceImpl.createRoomLockMessage()"+message);
		return message;
	}

	// 自助看房短信发送
	public String createRoomMessage(JournalShortMessage journalShortMessage) throws Exception {
		String houseAddress = null;
		String community = null;
		String building = null;
		String doorplateno = null;
		String roomPassword = journalShortMessage.getPassword();
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
		if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
			community = smNotRentAdd.getAddCommunity();
		}
		if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
			building = smNotRentAdd.getAddBuilding();
		}
		if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
			doorplateno = smNotRentAdd.getAddDoorplateno();
		}
		houseAddress = community + building + doorplateno;
		String message = houseAddress + "本次看房:" + roomPassword + ".祝您看房愉快。";

		return message;
	}

	// 综合短信发送
	@Override
	public int integratedSmsSending(JournalShortMessage journalShortMessage) throws Exception {
		int type = journalShortMessage.getMessageType();

		System.out.println("type:" + type);
		JournalShortMessage jsm = new JournalShortMessage();
		JournalShortMessage sm = null;

		String mobile = "";
		if (type == 10) {// 意向人定金
			journalShortMessage.setSmIpId(journalShortMessage.getSmPopId());
			journalShortMessage.setSmPopId(null);
			sm = journalShortMessageMapper.getIntendedRenter(journalShortMessage);
			mobile = sm.getPopTelephone();
		} else if (type == 16) {
			mobile = journalShortMessage.getPopTelephone();
		} else {
			sm = journalShortMessageMapper.populationNumber(journalShortMessage);
			mobile = sm.getPopTelephone();
		}

		// 判断是哪种短信类型
		String typeContent = "";
		if (type == 0) {// 群发
			typeContent = journalShortMessage.getSmContent();
		} else if (type == 1) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房 宝龙家园2座102，本期合同将于2012-02-12到期，续租详情请尽快联系客服，电话400-000-800，谢谢配合！";
		} else if (type == 2) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房宝龙家园2座102，本期合同即将到期，" + "请尽快办理续签手续，我司办公地址：蓝山北路26号，客服：400-000-800，感谢支持！";
		} else if (type == 3) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房 宝龙家园2座102，合同将于2012-02-12期满，期满后我们公司暂不作出租安排，请您准时搬离并做退房手续!";
		} else if (type == 4) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房宝龙家园2座102，本期合同将于2012-02-12到期，zu续签租金3000元" + "，如确认以上续租信息，请务必回复“是”。谢谢！";
		} else if (type == 5) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房宝龙家园2座102，本期合同已经过了期，请尽快办理续签手续，我司办公地址：上南街郁花园25号，客服：400-000-800，感谢支持！";
		} else if (type == 6) {
			typeContent = "【房至尊】尊敬的客户，您可通过搜索微信公众号：hz22315424或扫描租赁合同头部二维码，添加我司公众号后点击底部“用户中心”"
					+ "即可操作：费用查询、自助报修等！首次登陆需输入身份证、手机号码进行验证。";
		} else if (type == 7) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房宝龙嘉园2座102，本期租金等费用为3000元（备注：房屋租金）"
					+ "，交租日为2016-03-25，请您按时交租，过了期将产生滞纳金，感谢支持。";
		} else if (type == 8) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房宝龙家园2座102，本期费用有1200元尚未结清（备注：房屋租金），请及时缴纳，感谢支持。";
		} else if (type == 9) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好。您的租房宝龙家园2座102欠费已久，请在2012-03-25前交清相关费用，过了期将按合同条款进行收房处理！谢谢配合。";
		} else if (type == 10) {
			typeContent = "【房至尊】尊敬的 小明 客户，您好！您租赁的 宝龙街26号 物业，定金有效期到2016-02-02。";
		} else if (type == 11) {
			typeContent = "【房至尊】尊敬的业主你好。你的物业宝蓝街25号沁园小区3栋502，本月租金3500.00，已发到你的工商银行账户尾数1142，收款人张小军。";
		} else if (type == 12) {
			typeContent = "【房至尊】尊敬的业主你好。你的物业建设路25号锦绣小区6栋1202，本月为免租期。感谢您使用我司房屋托管服务。";
		} else if (type == 13) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好！您的推荐补贴 1000.00 元已入账至 宝龙嘉园2座102 账单余额，感谢您的信任与支持！";
		} else if (type == 14) {
			typeContent = "【房至尊】尊敬的 小明 租户，您好！您的租房 宝龙嘉园2座102 本期费用已结清，感谢您的信任与支持！";
		} else if (type == 15) {

		} else if (type == 16) {
			typeContent = "【房至尊】尊敬的 小明 客户，您好！您申请的看房宝龙家园2座102，本次看房密码为11223344！";
		} else {
			return -4;
		}
		// 新增一条短信
		journalShortMessage.setSmId(null);
		journalShortMessage.setSmReceiveNumber(mobile);
		journalShortMessage.setSmType("发送");
		journalShortMessage.setSmContent(typeContent);
		int result1 = journalShortMessageMapper.insertSelective(journalShortMessage);
		if (result1 == 0) {
			return -3;// 短信添加失败
		}
		int smId = journalShortMessage.getSmId();
		journalShortMessage.setSmId(smId);
		String[] strnum = null;
		int typeContract = 0;
		// 执行发送接口
		if (type == 0) {
			typeContract = 0;
			journalShortMessage.setPopTelephone(mobile);
			strnum = sendMsgBySet(journalShortMessage).split("###");
		} else if (type == 1) { // 合同到期提醒
			typeContract = 1;
			strnum = smsContractStop(journalShortMessage, typeContract).split("###");
		} else if (type == 2) { // 合同续签提醒短信
			typeContract = 2;
			strnum = smsContractStop(journalShortMessage, typeContract).split("###");
		} else if (type == 3) { // 合同到期不做出租
			typeContract = 3;
			strnum = smsContractStop(journalShortMessage, typeContract).split("###");
		} else if (type == 4) { // 续约确认短信
			typeContract = 4;
			strnum = smsContractStop(journalShortMessage, typeContract).split("###");
		} else if (type == 5) { // 合同过期续签提醒
			typeContract = 5;
			strnum = smsContractStop(journalShortMessage, typeContract).split("###");
		} else if (type == 6) { // 提醒类短信(公众号关注短信)
			strnum = sendReminderSMS(journalShortMessage).split("###");
		} else if (type == 7) { // 房屋租金短信发送
			strnum = SmsApi(journalShortMessage).split("###");
		} else if (type == 8) { // 未结清款项提醒
			typeContract = 1;
			strnum = smsUnpaidExpenses(journalShortMessage, typeContract).split("###");
		} else if (type == 9) {// 欠款提醒
			typeContract = 2;
			strnum = smsUnpaidExpenses(journalShortMessage, typeContract).split("###");
		} else if (type == 10) { // 定金失效
			strnum = smsDepositFailure(journalShortMessage).split("###");
		} else if (type == 11) { // 房东账单短信提醒
			strnum = smsPayableToLandlord(journalShortMessage).split("###");
		} else if (type == 12) { // 房东免租期账单短信提醒
			strnum = smsLandlordFreePeriod(journalShortMessage).split("###");
		} else if (type == 13) { // 租客优惠劵到账短信提醒
			strnum = sendMsgToRenter(journalShortMessage, 0).split("###");
		} else if (type == 14) { // 租客每期收支结算短信提醒
			strnum = sendMsgToRenter(journalShortMessage, 1).split("###");
		} else if (type == 15) { // 租客续签合同地址发送
			strnum = sendContractSMS(journalShortMessage).split("###");
		} else if (type == 16) { // 自助看房短信发送
			strnum = roomTextMessage(journalShortMessage).split("###");
		} else {
			return -4;
		}
		if (Integer.parseInt(strnum[0]) == 0) {
			System.out.println("推送成功");
			jsm.setSmId(journalShortMessage.getSmId());
			jsm.setSmCount(Integer.parseInt(strnum[1]));
			jsm.setSmNote(strnum[2]);
			jsm.setSmState("推送成功");
			int result = journalShortMessageMapper.updateByPrimaryKeySelective(jsm);

			if (type != 15) {
				// 已租房插入短信提醒时间
				InfoHouse4rentExpand hr = new InfoHouse4rentExpand();
				hr.setHrId(journalShortMessage.getSmRentId());
				hr.setHrSmsNotificationTime(CommonMethodClass.getCurrentDate());
				int result2 = infoHouse4rentMapper.updateByPrimaryKeySelective(hr);
			}

			SysSystemSetting sst = new SysSystemSetting();
			sst.setSsitId(1);
			sst.setSsitSmsAccountBalance(Double.parseDouble(strnum[3]));
			int result3 = sysSystemSettingMapper.updateByPrimaryKeySelective(sst);
			return 1;
		} else if (Integer.parseInt(strnum[0]) == 9999) {
			System.out.println("推送失败");
			jsm.setSmId(journalShortMessage.getSmId());
			jsm.setSmCount(0);
			jsm.setSmNote(strnum[2]);
			jsm.setSmState("余额不足");
			int result = journalShortMessageMapper.updateByPrimaryKeySelective(jsm);
			return -1;
		} else {
			System.out.println("推送失败");
			jsm.setSmId(journalShortMessage.getSmId());
			jsm.setSmCount(0);
			jsm.setSmNote(strnum[2]);
			jsm.setSmState("推送失败");
			int result = journalShortMessageMapper.updateByPrimaryKeySelective(jsm);
			return -2;
		}
	}

	// 合同续签url短信发送
	private String sendContractSMS(JournalShortMessage journalShortMessage) throws Exception {
		String company = "";
		String coId = "";
		String mobile = "";
		String data = "";
		Double smsBalance = 0.0;

		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		// 获取短信key、单价、余额
		String keydate = smsInformation();
		// 获取合同签署url
		String url = journalShortMessage.getUrl();
		// 获取手机号码
		mobile = journalShortMessage.getPopTelephone();
		// 获取租客姓名
		String name = journalShortMessage.getPopName();
		// 获取租客物业地址
		String address = journalShortMessage.getCompanyAddress();

		data = mobile + "###" + url + "###" + name + "###" + company + "###" + journalShortMessage.getSmId() + "###"
				+ coId + keydate + "###" + address;
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);

		// 执行发送
		String smsDate = JavaSmsApi.sendContractSms(data);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 提醒类短信发送
	private String sendReminderSMS(JournalShortMessage journalShortMessage) throws Exception {
		String company = "";
		String coId = "";
		String mobile = "";
		String uid = "";
		String data = "";
		Double smsBalance = 0.0;

		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		// 获取短信key、单价、余额
		String keydate = smsInformation();

		// 获取手机号码
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		mobile = sm.getPopTelephone();
		uid = company + "_FD_" + journalShortMessage.getSmId();

		data = mobile + "###" + uid + "###" + company + "###" + journalShortMessage.getSmId() + "###" + coId + keydate;
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);

		// 执行发送
		String smsDate = JavaSmsApi.sendReminderSms(data);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 租客优惠券以及每期收支结算短信发送
	private String sendMsgToRenter(JournalShortMessage journalShortMessage, int msgType) throws Exception {

		String data = "";
		String company = "";
		String name = "";
		String mobile = "";
		String houseAddress = "";
		String uid = "";
		String time = "";
		String serviceTelephone = "";
		String community = "";
		String building = "";
		String doorplateno = "";
		String companyAddress = "";
		Double money = 0.00;
		String coId = "";
		Double smsBalance = 0.0;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		System.out.println("获取公司名：" + company);

		// 获取短信key、单价、余额
		String keydate = smsInformation();
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");

		// 获取姓名，手机号码
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		name = sm.getPopName();
		mobile = sm.getPopTelephone();

		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		List<JournalShortMessage> datatime = null;
		// 房屋的地址
		uid = company + "_ZK_" + journalShortMessage.getSmId();
		// 房屋的地址
		smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
		if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
			community = smNotRentAdd.getAddCommunity();
		}
		if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
			building = smNotRentAdd.getAddBuilding();
		}
		if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
			doorplateno = smNotRentAdd.getAddDoorplateno();
		}
		houseAddress = community + building + doorplateno;
		money = journalShortMessage.getSmMoney();
		data = name + "###" + mobile + "###" + houseAddress + "###" + uid + "###" + money + "###" + company + "###"
				+ journalShortMessage.getSmId() + "###" + coId + keydate;

		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);

		// 执行发送
		String smsDate = JavaSmsApi.sendMsgToRenter(data, msgType);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 合同短信处理
	private String smsContractStop(JournalShortMessage journalShortMessage, int num) throws Exception {
		String data = "";
		String company = "";
		String name = "";
		String mobile = "";
		String houseAddress = "";
		String uid = "";
		String time = "";
		String serviceTelephone = "";
		String community = "";
		String building = "";
		String doorplateno = "";
		String companyAddress = "";
		Double money = 0.00;
		String coId = "";
		Double smsBalance = 0.0;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		System.out.println("获取公司名：" + company);

		// 获取短信key、单价、余额
		String keydate = smsInformation();

		// 获取姓名，手机号码
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		name = sm.getPopName();
		mobile = sm.getPopTelephone();
		// 判断房东或是租客
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		List<JournalShortMessage> datatime = null;
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			houseAddress = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.renewalLandlord(journalShortMessage);
			time = datatime.get(0).getJrlEndTime();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {

			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			houseAddress = community + building + doorplateno;
			// 获取合同到期时间
			datatime = journalShortMessageMapper.rentRenewal(journalShortMessage);
			time = datatime.get(0).getJrrEndTime();
		}
		// 客服电话
		serviceTelephone = journalShortMessage.getServiceTelephone();
		// 公司地址
		companyAddress = journalShortMessage.getCompanyAddress();
		// 金额
		money = journalShortMessage.getSmMoney();
		data = name + "###" + mobile + "###" + houseAddress + "###" + uid + "###" + time + "###" + serviceTelephone
				+ "###" + companyAddress + "###" + money + "###" + company + "###" + journalShortMessage.getSmId()
				+ "###" + coId + keydate;
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);

		System.out.println("我要的数据：" + data);
		// 执行发送
		String smsDate = null;
		if (num == 1) {
			// 合同到期提醒
			smsDate = JavaSmsApi.expirationOfContract(data);
		} else if (num == 2) {
			// 合同续签提醒短信
			smsDate = JavaSmsApi.contractRenewal(data);
		} else if (num == 3) {
			// 合同到期不做出租
			smsDate = JavaSmsApi.doNotRent(data);
		} else if (num == 4) {
			// 续约确认短信
			smsDate = JavaSmsApi.renewConfirm(data);
		} else if (num == 5) {
			// 合同过期续签提醒
			smsDate = JavaSmsApi.contractExpirationReminder(data);
		}
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 房屋租金短信信息处理
	public String SmsApi(JournalShortMessage journalShortMessage) throws Exception {
		JavaSmsApi jsa = new JavaSmsApi();
		String community = "";
		String building = "";
		String doorplateno = "";
		String company = "";
		String data = "";
		String name = "";
		String mobile = "";
		Double money = 0.00;
		String houseAddress = "";
		String uid = "";
		String time = "";
		String coId = "";
		Double smsBalance = 0.0;
		String flag = null;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		// 获取短信key、单价、余额
		String keydate = smsInformation();
		// 获取姓名，手机号码
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		name = sm.getPopName();
		mobile = sm.getPopTelephone();
		// 获取金额
		money = journalShortMessage.getSmMoney();
		//
		String[] strtime = CommonMethodClass.getCurrentMonthTime().split("###");
		String startTime = strtime[0];
		String endTime = strtime[1];
		journalShortMessage.setStartTime(startTime);
		journalShortMessage.setEndTime(endTime);
		// 判断房东或是租客
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			journalShortMessage.setJciNature("应支");
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			houseAddress = community + building + doorplateno;
			// 获取时间
			List<JournalShortMessage> datatime = journalShortMessageMapper.getDatePeriods(journalShortMessage);
			time = datatime.get(0).getJciBeginPeriods();
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {
			uid = company + "_ZK_" + journalShortMessage.getSmId();
			journalShortMessage.setJciNature("应收");
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			houseAddress = community + building + doorplateno;
			flag = journalShortMessage.getFlag();
			// 获取时间
			if (flag == null) {
				// 已租房间，租客催款
				List<JournalShortMessage> datatime = journalShortMessageMapper.getDatePeriods(journalShortMessage);
				time = datatime.get(0).getJciBeginPeriods();
			} else {
				// 租客应收款
				time = journalShortMessage.getJciFukuanri();
			}
		}
		Integer variableParameter = journalShortMessage.getVariableParameter();// 判断是否是临时账单短信
		String note = journalShortMessage.getSmNote();
		if (note == null || note.equals("")) {
			note = "房屋租金";
		}
		data = name + "###" + mobile + "###" + money + "###" + houseAddress + "###" + uid + "###" + note + "###" + time
				+ "###" + company + "###" + journalShortMessage.getSmId() + "###" + coId + keydate + "###"
				+ variableParameter;
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);
		;
		// 执行发送
		String smsDate = JavaSmsApi.payRentSms(data);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 欠缴费用短信
	private String smsUnpaidExpenses(JournalShortMessage journalShortMessage, int num) throws Exception {
		String data = "";
		String company = "";
		String name = "";
		String mobile = "";
		String houseAddress = "";
		String uid = "";
		String time = "";
		String community = "";
		String building = "";
		String doorplateno = "";
		Double money = 0.00;
		String note = "";
		String coId = "";
		Double smsBalance = 0.0;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");

		// 获取短信key、单价、余额
		String keydate = smsInformation();

		// 获取姓名，手机号码
		JournalShortMessage sm;
		sm = journalShortMessageMapper.getPopName(journalShortMessage);
		name = sm.getPopName();
		mobile = sm.getPopTelephone();

		// 判断房东或是租客
		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		JournalShortMessage datatime = new JournalShortMessage();
		if (journalShortMessage.getSmlandId() != null && !journalShortMessage.getSmlandId().equals("")) {
			uid = company + "_FD_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			houseAddress = community + building + doorplateno;
		} else if (journalShortMessage.getSmrentId() != null && !journalShortMessage.getSmrentId().equals("")) {
			uid = company + "_ZK_" + journalShortMessage.getSmId();
			// 房屋的地址
			smNotRentAdd = journalShortMessageMapper.getrentAddress(journalShortMessage);
			if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
				community = smNotRentAdd.getAddCommunity();
			}
			if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
				building = smNotRentAdd.getAddBuilding();
			}
			if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
				doorplateno = smNotRentAdd.getAddDoorplateno();
			}
			houseAddress = community + building + doorplateno;
		}
		// 欠缴金额
		money = journalShortMessage.getSmMoney();
		// 备注
		note = journalShortMessage.getSmNote();
		// 截止时间
		time = journalShortMessage.getDeadline();

		data = name + "###" + mobile + "###" + houseAddress + "###" + uid + "###" + money + "###" + note + "###" + time
				+ "###" + company + "###" + journalShortMessage.getSmId() + "###" + coId + keydate;
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);

		String smsDate = null;
		if (num == 1) {
			// 未结清款项提醒
			smsDate = JavaSmsApi.uncleared(data);
		} else if (num == 2) {
			// 欠款提醒
			smsDate = JavaSmsApi.arrearsReminder(data);
		}
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 定金失效
	private String smsDepositFailure(JournalShortMessage journalShortMessage) throws Exception {
		String data = "";
		String company = "";
		String name = "";
		String mobile = "";
		String houseAddress = "";
		String uid = "";
		String time = "";
		String community = "";
		String building = "";
		String doorplateno = "";
		Double money = 0.00;
		String note = "";
		String coId = "";
		Double smsBalance = 0.0;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");

		// 获取短信key、单价、余额
		String keydate = smsInformation();

		// 获取姓名，手机号码
		JournalShortMessage sm = journalShortMessageMapper.getIntendedRenter(journalShortMessage);
		name = sm.getPopName();
		mobile = sm.getPopTelephone();

		JournalShortMessage smNotRentAdd = new JournalShortMessage();
		// 业务id
		uid = company + "_FD_" + journalShortMessage.getSmId();
		// 房屋的地址
		smNotRentAdd = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
		if (smNotRentAdd.getAddCommunity() != null && !smNotRentAdd.getAddCommunity().equals("0")) {
			community = smNotRentAdd.getAddCommunity();
		}
		if (smNotRentAdd.getAddBuilding() != null && !smNotRentAdd.getAddBuilding().equals("0")) {
			building = smNotRentAdd.getAddBuilding();
		}
		if (smNotRentAdd.getAddDoorplateno() != null && !smNotRentAdd.getAddDoorplateno().equals("0")) {
			doorplateno = smNotRentAdd.getAddDoorplateno();
		}
		houseAddress = community + building + doorplateno;

		// 定金截止时间
		JournalShortMessage datatime = new JournalShortMessage();
		datatime = journalShortMessageMapper.getDepositTime(journalShortMessage);
		time = datatime.getHsEndDate();

		data = name + "###" + mobile + "###" + houseAddress + "###" + uid + "###" + time + "###" + company + "###"
				+ journalShortMessage.getSmId() + "###" + coId + keydate;
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);
		// 执行
		String smsDate = JavaSmsApi.depositFailure(data);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 房东账单短信提醒
	private String smsPayableToLandlord(JournalShortMessage journalShortMessage) throws Exception {
		journalShortMessage.setSmlandId(journalShortMessage.getSmLandId());
		String mobile = "";
		String community = "";
		String building = "";
		String doorplateno = "";
		String houseAddress = "";
		Double money = 0.00;
		String bankName = "";
		String bankNum = "";
		String name = "";
		String uid = "";
		String company = "";
		String coId = "";
		String data = "";
		Double smsBalance = 0.0;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		JournalShortMessage payableToLandlord = new JournalShortMessage();
		// 获取短信key、单价、余额
		String keydate = smsInformation();
		// 获取手机号码
		JournalShortMessage sm = journalShortMessageMapper.getLandInfo(journalShortMessage);
		mobile = sm.getPopTelephone();
		// 银行名称，银行账号，转款姓名
		bankName = journalShortMessage.getHsBankType();
		bankNum = journalShortMessage.getHsBankNum();
		bankNum = "尾数" + bankNum.substring(bankNum.length() - 4);
		name = journalShortMessage.getHsBankName();
		// 获取金额
		money = journalShortMessage.getSmMoney();
		uid = company + "_FD_" + journalShortMessage.getSmId();
		// 房屋的地址
		payableToLandlord = journalShortMessageMapper.getNotrentAddress(journalShortMessage);
		if (payableToLandlord.getAddCommunity() != null && !payableToLandlord.getAddCommunity().equals("0")) {
			community = payableToLandlord.getAddCommunity();
		}
		if (payableToLandlord.getAddBuilding() != null && !payableToLandlord.getAddBuilding().equals("0")) {
			building = payableToLandlord.getAddBuilding();
		}
		if (payableToLandlord.getAddDoorplateno() != null && !payableToLandlord.getAddDoorplateno().equals("0")) {
			doorplateno = payableToLandlord.getAddDoorplateno();
		}
		houseAddress = community + building + doorplateno;
		data = mobile + "###" + houseAddress + "###" + money + "###" + bankName + "###" + bankNum + "###" + name + "###"
				+ uid + "###" + company + "###" + journalShortMessage.getSmId() + "###" + coId + keydate;
		System.out.println("我要的数据：" + data);
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);
		// 执行发送
		String smsDate = JavaSmsApi.payableToLandlord(data);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 房东免租期账单短信提醒
	private String smsLandlordFreePeriod(JournalShortMessage journalShortMessage) throws Exception {
		journalShortMessage.setSmlandId(journalShortMessage.getSmLandId());
		String mobile = "";
		String houseAddress = "";
		String uid = "";
		String company = "";
		String coId = "";
		String data = "";
		Double smsBalance = 0.0;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		JournalShortMessage payableToLandlord = new JournalShortMessage();
		// 获取短信key、单价、余额
		String keydate = smsInformation();
		// 获取手机号码
		JournalShortMessage sm = journalShortMessageMapper.getPopName(journalShortMessage);
		mobile = sm.getPopTelephone();
		uid = company + "_FD_" + journalShortMessage.getSmId();
		houseAddress = journalShortMessage.getAddCommunity();
		data = mobile + "###" + houseAddress + "###" + uid + "###" + company + "###" + journalShortMessage.getSmId()
				+ "###" + coId + keydate;
		System.out.println("我要的数据：" + data);
		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);
		// 执行发送
		String smsDate = JavaSmsApi.landlordFreePeriod(data);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
	}

	// 自定义群发短信
	private String sendMsgBySet(JournalShortMessage journalShortMessage) throws Exception {

		String data = "";
		String company = "";
		String mobile = "";
		String uid = "";
		String time = "";
		String serviceTelephone = "";
		String community = "";
		String building = "";
		String doorplateno = "";
		String companyAddress = "";
		String coId = "";
		Double smsBalance = 0.0;
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");

		// 获取短信key、单价、余额
		String keydate = smsInformation();
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");

		// 获取姓名，手机号码
		mobile = journalShortMessage.getPopTelephone();

		uid = company + "_ZK_" + journalShortMessage.getSmId();

		data = journalShortMessage.getSmContent() + "###" + mobile + "###" + uid + "###" + company + "###"
				+ journalShortMessage.getSmId() + "###" + coId + keydate;

		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);

		// 执行发送
		String smsDate = JavaSmsApi.sendMsgBySet(data);
		// 获取发送后的返回值
		String[] sdata = smsDate.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
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
		// System.out.println("--我要查的东西-" + strnum);
		return strnum;
	}

	// 自助看房短信
	private String roomTextMessage(JournalShortMessage journalShortMessage) throws Exception {

		System.out.println("进来了 ！");
		String coId = "";
		Double Balance = 0.0;
		String mobile = "";
		String houseAddress = "";
		String name = "";
		String company = "";
		String password = "";
		// 获取短信key、单价、余额
		String keydate = smsInformation();
		// 获取公司名
		company = SessionUtil.getSession("company");
		coId = SessionUtil.getSession("coId");
		name = journalShortMessage.getPopName();
		mobile = journalShortMessage.getPopTelephone();
		password = journalShortMessage.getPassword();
		houseAddress = journalShortMessage.getHouseAddress();
		System.out.println("smId:" + journalShortMessage.getSmId());

		String data = company + "###" + name + "###" + mobile + "###" + houseAddress + "###" + password + "###"
				+ journalShortMessage.getSmId() + "###" + coId + keydate;

		// 查找屏蔽词，替换
		data = sw.matchedMaskWord(data);
		// 发送短信
		String returnData = JavaSmsApi.roomMessage(data);
		System.out.println("data:" + data);

		// 获取发送后的返回值
		String[] sdata = returnData.split("###");
		JSONObject jsStr = JSONObject.fromObject(sdata[0]);
		String strnum = jsStr.getString("code");
		String count = "0";

		String[] temp = keydate.split("###");
		Balance = Double.parseDouble(temp[3]);
		if (strnum.equals("0")) {
			count = sdata[1];
			Balance = Double.parseDouble(sdata[3]);
			strnum += "###" + count + "###" + sdata[2] + "###" + Balance;
			System.out.println(sdata[1] + "---- " + count);
		} else {
			strnum = strnum + "###" + count + "###" + sdata[2] + "###" + Balance;
		}
		System.out.println("这是自助看房的地方strnum：" + strnum);
		return strnum;

	}

	/**
	 * 获取短信key( 用户序列号、密码 )、单价、余额
	 * 
	 * @return
	 * @throws Exception
	 */
	private String smsInformation() throws Exception {
		SysSystemSetting sst = sysSystemSettingMapper.selectByPrimaryKey(1);
		String smsKey = sst.getSsitShortMessageInterface();
		String password = sst.getSsitPassword();
		Double smsPrice = sst.getSsitSmsUnitPrice();
		Double smsBalance = sst.getSsitSmsAccountBalance();
		String autograph = sst.getSsitIdentification();
		String wechatPublicNumber = sst.getSsitWechatPublicNumber();
		String temp = "###" + smsKey + "###" + smsPrice + "###" + smsBalance + "###" + autograph + "###" + password
				+ "###" + wechatPublicNumber;
		// System.out.println("获取短信key、单价、余额:"+smsKey+" ### "+smsPrice+" ###
		// "+smsBalance+"###"+autograph+"###"+password+"###"+wechatPublicNumber);
		return temp;
	}
}
