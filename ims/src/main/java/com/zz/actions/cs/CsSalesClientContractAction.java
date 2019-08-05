package com.zz.actions.cs;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.mapper.journal.JournalContractDatabaseMapper;
import com.zz.other.Syslog;
import com.zz.po.cs.CsOutsideCustomerExpansion;
import com.zz.po.cs.CsSalesClientContract;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.cs.CsSalesClientContractService;
import com.zz.service.journal.ShortMessageService;
import com.zz.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.util.List;

public class CsSalesClientContractAction extends BaseAction implements ModelDriven<CsSalesClientContract>{
	private CsSalesClientContract csSalesClientContract;
	@Resource
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	@Autowired
	private CsSalesClientContractService csSalesClientContractService;
	private CsOutsideCustomerExpansion csOutsideCustomerExpansion;
	private ShortMessageService shortMessageService;
	public void setShortMessageService(ShortMessageService shortMessageService) {
		this.shortMessageService = shortMessageService;
	}
	public void setCsOutsideCustomerExpansion(CsOutsideCustomerExpansion csOutsideCustomerExpansion) {
		this.csOutsideCustomerExpansion = csOutsideCustomerExpansion;
	}
	@Override
	public CsSalesClientContract getModel() {
		if(csSalesClientContract==null){
			csSalesClientContract = new CsSalesClientContract();
		}
		return csSalesClientContract;
	}
	public void insertCsSalesClientContract(){
		try {
			System.out.println("111111");

//			if("编号正确".equals(csSalesClientContract.getContractNumTips())){
				int result = csSalesClientContractService.insertCsSalesClientContract(csSalesClientContract);
				if(result > 0){
					SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
					String strNum = "";
					String prefix = "";
					//分离前缀与数字编号
					String detectionNum = csSalesClientContract.getCsContractNo();
					for (int i = 0; i < detectionNum.length();++i){
						if (Character.isDigit(detectionNum.charAt(i))){
							strNum += detectionNum.charAt(i);
							System.out.println("是数字： "+i+"------"+detectionNum.charAt(i));
						}else{
							prefix += detectionNum.charAt(i);
							System.out.println("不是： "+i+"------"+detectionNum.charAt(i));
						}
					}
					System.out.println("字母："+prefix+" 数字："+strNum);
					if(!prefix.equals("") && strNum.equals("")){

					}
					if(!prefix.equals("") && !strNum.equals("")){

					}else if(prefix.equals("") && !strNum.equals("")){

					}
					String curDateTime = DateUtil.getCurDateTime();
					JournalContractDatabase jcd = new JournalContractDatabase();
					jcd.setJcdContractNumber(strNum);
					jcd.setJcdContractPrefix(prefix);
					jcd.setJcdUseState("已使用");
					jcd.setJcdUsedType("销售");
					jcd.setJcdContractPerson(userInfo.getUserId());
					jcd.setJcdSigningTime(curDateTime);
					int listjcd = journalContractDatabaseMapper.updatePrefixNum(jcd);
					System.out.println(listjcd);
					printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
				}else{
					printlnOfJson(CommonMethodClass.jsonData(-1, "插入失败", null));
				}
//			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	public void queryCsSalesClientContract(){
		try {
			List<CsSalesClientContract> list = csSalesClientContractService.selectCsSalesClientContract(csSalesClientContract);
			if(list.size() != 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的客户", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}
	}
	public void queryCsSalesClientContract2(){
		try {
			CsSalesClientContract list = csSalesClientContractService.queryCsSalesClientContract2(csSalesClientContract);
			if(list.getCsContractId() != 0){
				String json = JSON.toJSONString(list,SerializerFeature.WriteMapNullValue);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的客户", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
		}	
	}
	/**
     * 删除图片
     */
	public void deleteCsSalesClientContract(){
		try {
			CsSalesClientContract list = csSalesClientContractService.queryCsSalesClientContract2(csSalesClientContract);
			if (list == null) {
                printlnMsg("-1");
                return;
            }
			 String oldPath = list.getCsImgPath();
	         String delPath = csSalesClientContract.getCsImgPath();
	         String newPath = UploadUtil.getNewPath(oldPath, delPath);
	         csSalesClientContract.setCsImgPath(newPath);
	         csSalesClientContract.setCsImgNum(UploadUtil.getImageNum(newPath));
	         int result = csSalesClientContractService.updateCsSalesClientContract2(csSalesClientContract);
	         if (result > 0) {
	                printlnMsg("1");
	            }else{
	                printlnMsg("-1");
	            }
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
}
