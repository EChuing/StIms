package com.zz.service.journal;

import java.util.List;

import com.zz.actions.commons.JavaSmsApi;
import com.zz.actions.commons.ShieldingWords;
import com.zz.mapper.journal.JournalShortMessageAdministrativeMapper;
import com.zz.other.Syslog;
import com.zz.po.journal.JournalShortMessageAdministrative;
import com.zz.po.sys.SysSystemSetting;
import com.zz.service.sys.SysSystemSettingService;
import com.zz.util.SessionUtil;

import net.sf.json.JSONObject;


public class ShortMessageAdministrativeServiceImpl implements ShortMessageAdministrativeService{
	private ShieldingWords sw = new ShieldingWords();
	private JournalShortMessageAdministrativeMapper journalShortMessageAdministrativeMapper;
	private SysSystemSettingService sysSystemSettingService;

	public void setSysSystemSettingService(
            SysSystemSettingService sysSystemSettingService) {
        this.sysSystemSettingService = sysSystemSettingService;
    }

    public void setJournalShortMessageAdministrativeMapper(
			JournalShortMessageAdministrativeMapper journalShortMessageAdministrativeMapper) {
		this.journalShortMessageAdministrativeMapper = journalShortMessageAdministrativeMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer smId) throws Exception {
		return journalShortMessageAdministrativeMapper.deleteByPrimaryKey(smId);
	}

	@Override
	public int insertSelective(JournalShortMessageAdministrative record)
			throws Exception {
		return journalShortMessageAdministrativeMapper.insertSelective(record);
	}

	@Override
	public List<JournalShortMessageAdministrative> selectByPrimaryKey(
			JournalShortMessageAdministrative record) throws Exception {
		return journalShortMessageAdministrativeMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(
			JournalShortMessageAdministrative record) throws Exception {
		return journalShortMessageAdministrativeMapper.updateByPrimaryKeySelective(record);
	}

	@Override
	public List<JournalShortMessageAdministrative> getUser(
			Integer Id) throws Exception {
		return journalShortMessageAdministrativeMapper.getUser(Id);
	}

	@Override
	public List<JournalShortMessageAdministrative> selectAllShortMessage(JournalShortMessageAdministrative record) throws Exception {
		return journalShortMessageAdministrativeMapper.selectAllShortMessage(record);
	}

    @Override
    public int goToDoorPsw(JournalShortMessageAdministrative journalShortMessageAdministrative)
            throws Exception {
        JournalShortMessageAdministrative jsm = new JournalShortMessageAdministrative();
        try {
            //新增一条短信记录，自动返回主键ID
            int smUserId = journalShortMessageAdministrative.getSmUserId();
            List<JournalShortMessageAdministrative> list = getUser(smUserId);
            String smUserContacts = list.get(0).getSmUserContacts();
            journalShortMessageAdministrative.setSmUserId(smUserId);
            journalShortMessageAdministrative.setSmUserContacts(smUserContacts);
            journalShortMessageAdministrative.setSmType("发送");
            journalShortMessageAdministrative.setSmContent("带客看房密码");
            insertSelective(journalShortMessageAdministrative);
            //发送短信
            String[] strnum = smsGoToDoorPsw(journalShortMessageAdministrative).split("###");
            System.out.println("带客看房门锁短信返回值："+ strnum[0]+" --- "+ strnum[1]+" --- "+strnum[2]);
            if(Integer.parseInt(strnum[0]) == 0){
                System.out.println("推送成功");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(Integer.parseInt(strnum[1]));//短信条数
                jsm.setSmContent(strnum[2]);//短信模板（废弃）
                jsm.setSmState("推送成功");
                int result = updateByPrimaryKeySelective(jsm);
                //修改短信余额
                SysSystemSetting sst = new SysSystemSetting();
                sst.setSsitId(1);
                sst.setSsitSmsAccountBalance(Double.parseDouble(strnum[3]));
                int result2 = sysSystemSettingService.updateByPrimaryKeySelective(sst);
//                printlnMsg("1");
            }else if(Integer.parseInt(strnum[0]) == 9999){
                System.out.println("推送失败");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(0);
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("余额不足");
                int result = updateByPrimaryKeySelective(jsm);
//                printlnMsg("-2");
            }else{
                System.out.println("推送失败");
                jsm.setSmId(journalShortMessageAdministrative.getSmId());
                jsm.setSmCount(0);
                jsm.setSmContent(strnum[2]);
                jsm.setSmState("推送失败");
                int result = updateByPrimaryKeySelective(jsm);
//                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        }
        return 0;
    }
    
    //带客看房门锁短信-发送
    private String smsGoToDoorPsw(JournalShortMessageAdministrative journalShortMessageAdministrative) throws Exception {
        String data = "";
        String company = "";
        String mobile = "";
        String houseAddress = "";
        String doorPsw = "";
        String uid = "";
        String coId = "";
        Double smsBalance = 0.0;
        // 获取公司名
        company = SessionUtil.getSession("company");
        coId = SessionUtil.getSession("coId");
        //获取短信key、单价、余额
        String keydate = smsInformation();
        try {
            mobile = journalShortMessageAdministrative.getSmUserContacts();
            houseAddress = journalShortMessageAdministrative.getAddCommunity();
            doorPsw = journalShortMessageAdministrative.getDoorPsw();
            uid = company+"_FD_"+journalShortMessageAdministrative.getSmId(); 
            data = mobile+"###"+houseAddress+"###"+doorPsw+"###"+uid+"###"+company
                    +"###"+journalShortMessageAdministrative.getSmId()+"###"+coId+keydate;
            //查找屏蔽词，替换
            data = sw.matchedMaskWord(data);
            //执行
            String smsDate = JavaSmsApi.goToDoorPsw(data);
            //获取发送后的返回值
            String[] sdata = smsDate.split("###");
            JSONObject jsStr = JSONObject.fromObject(sdata[0]);
            String strnum = jsStr.getString("code");
            String count = "0";
            
            String[] temp = keydate.split("###");
            smsBalance = Double.parseDouble(temp[3]);
            if(strnum.equals("0")){ 
                count = sdata[1];
                smsBalance = Double.parseDouble(sdata[3]);
                strnum +="###"+count+"###"+sdata[2]+"###"+smsBalance;
            }else{
                strnum = strnum+"###"+count+"###"+sdata[2]+"###"+smsBalance;
            }
            return strnum;
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
        return null;
    }
    
    //获取短信key、单价、余额
    private String smsInformation() throws Exception{
         SysSystemSetting sst = sysSystemSettingService.selectByPrimaryKey(1);
         String smsKey = sst.getSsitShortMessageInterface();
         String password = sst.getSsitPassword();
         Double smsPrice = sst.getSsitSmsUnitPrice();
         Double smsBalance = sst.getSsitSmsAccountBalance();
         String autograph = sst.getSsitIdentification();
         String temp = "###"+smsKey+"###"+smsPrice+"###"+smsBalance+"###"+autograph + "###" + password;
         System.out.println("获取短信key、单价、余额:"+smsKey+" ### "+smsPrice+" ### "+smsBalance+"###"+autograph+ "###" + password);
         return temp;
    }

}
