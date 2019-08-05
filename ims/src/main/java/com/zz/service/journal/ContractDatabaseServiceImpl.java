package com.zz.service.journal;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import qiniu.happydns.Record;

import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.journal.JournalContractDatabaseMapper;
import com.zz.po.journal.JournalContractDatabase;
import com.zz.po.journal.JournalFinancial;

public class ContractDatabaseServiceImpl implements ContractDatabaseService {
	private JournalContractDatabaseMapper journalContractDatabaseMapper;
	public void setJournalContractDatabaseMapper(
			JournalContractDatabaseMapper journalContractDatabaseMapper){
		this.journalContractDatabaseMapper = journalContractDatabaseMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer jcdId) throws Exception {
		// TODO Auto-generated method stub
		return journalContractDatabaseMapper.deleteByPrimaryKey(jcdId);
	}

	@Override
	public String insertSelective(JournalContractDatabase record) throws Exception {
		// TODO Auto-generated method stub
		return insertContract(record);
	}

	@Override
	public List<JournalContractDatabase> selectByPrimaryKey(JournalContractDatabase record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalContractDatabaseMapper.selectByPrimaryKey(record);
	}

	@Override
	public int updateByPrimaryKeySelective(JournalContractDatabase record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalContractDatabaseMapper.updateByPrimaryKeySelective(record);
	}
	
	//新增处理--合约编号批量增加
	private String insertContract(JournalContractDatabase journalContractDatabase) throws Exception{
		String temp = "";
		//取出所需字段
		String jcdContractPrefix = "";
		String jcdContractNumber = "";
		Integer jcdBornAdult = null;
		String jcdUsedType = null;
		List<JournalContractDatabase> cdList = new ArrayList<>();
		List<JournalContractDatabase> redList = new ArrayList<>();
		//获取数组json数据；转化为JournalContractDatabase类
		String jsonArray = journalContractDatabase.getJsonArray();
		JSONArray jcdArray =JSONArray.fromObject(jsonArray);
		for (Object a : jcdArray) {
			JSONObject jsonObj = (JSONObject)a;
			JournalContractDatabase jcd = (JournalContractDatabase) JSONObject.toBean(jsonObj, JournalContractDatabase.class);
			cdList.add(jcd);
		}
		if(cdList.size() <= 1000){
			for(int i = 0 ; i < cdList.size(); ++i){
				jcdContractPrefix = cdList.get(i).getJcdContractPrefix();
				jcdContractNumber = cdList.get(i).getJcdContractNumber();
				jcdBornAdult = cdList.get(i).getJcdBornAdult();
				jcdUsedType = cdList.get(i).getJcdUsedType();
//				System.out.println(jcdContractPrefix+"---"+jcdContractNumber+"---"+jcdBornAdult+"---"+jcdUsedType);
				//查询编号是否已经存在
				JournalContractDatabase jcdnum = new JournalContractDatabase();
				jcdnum.setJcdContractPrefix(jcdContractPrefix);
				jcdnum.setJcdContractNumber(jcdContractNumber);
				jcdnum.setJcdBornAdult(jcdBornAdult);
				jcdnum.setJcdUsedType(jcdUsedType);
				if(!jcdContractPrefix.equals("") && !jcdContractNumber.equals("") && jcdContractPrefix != null && jcdContractNumber != null){
					jcdnum.setNumtype("1");
				}else if((jcdContractPrefix.equals("") || jcdContractPrefix == null) && !jcdContractNumber.equals("") && jcdContractNumber != null){
					jcdnum.setNumtype("2");
				}
				List<JournalContractDatabase> listjcd = journalContractDatabaseMapper.selectPrefixNum(jcdnum);
				if(listjcd.size() != 0){//已经存在
					if(i != cdList.size()-1){//不是最后一个
						temp += jcdContractPrefix+jcdContractNumber+"##";
					}else{//这是最后一个，最后一个不需要加‘##’
						temp += jcdContractPrefix+jcdContractNumber;
					}
				}else{
					redList.add(jcdnum);
				}
			}
		}else{
			System.out.println("执行到大于1000条");
			return  "-1";
		}
		if(redList.size()!=0){
			//添加合约编号
			int result = journalContractDatabaseMapper.batchGenerationContractNumber(redList);
			if(result == 0 ){
				throw new Exception("添加合约编号失败");
			}
		}
		if("".equals(temp)){
			return "1";
		}else{
			return temp;
		}
	}
	
	//领取合约编号
	@Override
	public String updataReceiveAContract(JournalContractDatabase record)
			throws Exception {
		// TODO Auto-generated method stub
		return ReceiveAContract(record);
	}
	
	//合约编号领取处理
	private String ReceiveAContract(JournalContractDatabase journalContractDatabase) throws Exception{
		int num = 0;
		String number = "";
		//编号不能为空
		if(journalContractDatabase.getPrefixStartNum() == null && journalContractDatabase.getPrefixStartNum().equals("") 
				&& journalContractDatabase.getPrefixEndNum() == null && journalContractDatabase.getPrefixEndNum().equals("")){
			return "-2";
		}
		//传入的开始结束编号
		String start = journalContractDatabase.getPrefixStartNum();
		String end = journalContractDatabase.getPrefixEndNum();
		System.out.println(start+"-----"+end);
		String strNum = "";
		String prefix = "";
		String strNum1 = "";
		String prefix1 = "";
		//分离前缀与数字编号
		 for (int i = 0; i < start.length();++i){ 
			  if (Character.isDigit(start.charAt(i))){
				  strNum += start.charAt(i);
				  System.out.println("start是数字： "+i+"------"+start.charAt(i));
			 }else{
				 prefix += start.charAt(i);
				 System.out.println("start不是： "+i+"------"+start.charAt(i));
			 }
		 }
		 for (int i = 0; i < end.length();++i){ 
			  if (Character.isDigit(start.charAt(i))){
				  strNum1 += end.charAt(i);
				  System.out.println("end是数字： "+i+"------"+end.charAt(i));
			 }else{
				 prefix1 += end.charAt(i);
				 System.out.println("end不是： "+i+"------"+end.charAt(i));
			 }
		 }
		
		String startNumber = strNum;
		String endNumber = strNum1;
		System.out.println("这里有什么啊："+startNumber +"-----"+endNumber);
		if(!prefix1.equals(prefix) || startNumber.length() != endNumber.length()){
			return "-4";
		}
		//查询编号是否存在、是否已经使用
		//需要生成编号的个数
		List<JournalContractDatabase> List = new ArrayList<>();
		int poor = Integer.parseInt(endNumber) -  Integer.parseInt(startNumber);
		System.out.println("这是几啊："+poor);
		for(int i = 0; i <= poor; ++i){
			JournalContractDatabase record = new JournalContractDatabase();
			int temp = Integer.parseInt(startNumber);
			temp = temp+i;
			String strtemp = ""+temp;
			//补零
			int poor1 = startNumber.length() - strtemp.length();
			String tempNumber = strtemp;
			for(int k=0;k<poor1;++k){
				tempNumber = "0"+tempNumber;
			}
			record.setStartEndNumber(tempNumber);
			record.setJcdContractPrefix(prefix1);
            record.setJcdUseState("未使用");
			List.add(record);
			if(i==99){
				System.out.println(List.get(99));
			}
		}
		
		int poor2 = Integer.parseInt(endNumber) -Integer.parseInt(startNumber);
		List<JournalContractDatabase> joinList = journalContractDatabaseMapper.selectcontractDatabase(List);
		System.out.println("我要测试的东西还在吗："+ joinList.size()+" ------ "+poor2);
		if(joinList.size() == poor2+1){
			for(int i = 0 ; i<joinList.size();++i){
				String type =  joinList.get(i).getJcdUseState();
				if(!type.equals("未使用")){
					num++;
					number +=  joinList.get(i).getJcdContractPrefix()+joinList.get(i).getJcdContractNumber()+", ";
				}
			}
			if(num > 0){
				//存在已经领取、已签约、注销的
				return number;
			}
		}else{
			//不存在或有缺失
			return "-3";
		}
		List<JournalContractDatabase> jcdList = new ArrayList<>();
		for(int i=0; i<joinList.size();++i){
			int jcdId = joinList.get(i).getJcdId();
			JournalContractDatabase jcd = new JournalContractDatabase();
			jcd.setJcdUseState("已领取");
			jcd.setJcdCollectionTime(CommonMethodClass.getCurrentDateSecond());
			jcd.setJcdRecipient(journalContractDatabase.getJcdRecipient());
			jcd.setJcdReceiveDepartment(journalContractDatabase.getJcdReceiveDepartment());
			jcd.setJcdReceiveStore(journalContractDatabase.getJcdReceiveStore());	
			jcd.setJcdId(jcdId);
			jcdList.add(jcd);
			System.out.println("打印我要的id---："+jcdId);
		}
		System.out.println("我要测试："+jcdList.size()+"\n"+jcdList.get(0).toString());
		int result = journalContractDatabaseMapper.batchUpdateContract(jcdList);
		System.out.println("我要测试fan回的值呢："+result);
		if(result == 0){
			return "-1";
		}
		return "1";
	}

	@Override
	public List<JournalContractDatabase> selectPrefixNum(
			JournalContractDatabase record) throws Exception {
		// TODO Auto-generated method stub
		return journalContractDatabaseMapper.selectPrefixNum(record);
	}
	
	//数据导入合约编号新增
	@Override
	public int contractDatabaseInsert(JournalContractDatabase record)
			throws Exception {
		// TODO Auto-generated method stub
		return journalContractDatabaseMapper.insertSelective(record);
	}

	@Override
	public int contractNumberdetection(JournalContractDatabase journalContractDatabase) throws Exception {
		JournalContractDatabase jcd = new JournalContractDatabase();
		String strNum = "";
		String prefix = "";
		//分离前缀与数字编号
		 String detectionNum = journalContractDatabase.getDetectionContract();
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
			return -1;
		}
		if(!prefix.equals("") && !strNum.equals("")){
			jcd.setNumtype("1");
		}else if(prefix.equals("") && !strNum.equals("")){
			jcd.setNumtype("2");
		}
		jcd.setJcdContractNumber(strNum);
		jcd.setJcdContractPrefix(prefix);
		
		List<JournalContractDatabase> list = journalContractDatabaseMapper.selectPrefixNum(jcd);
		if(list.size() != 0){
			String jcdUseState = list.get(0).getJcdUseState();
			if(jcdUseState.equals("已领取")){
				System.out.println("编号:"+""+list.get(0).getJcdId());
				return list.get(0).getJcdId();
			}else if(jcdUseState.equals("未使用")){
				return -2;
			}else if(jcdUseState.equals("已签约")||jcdUseState.equals("已使用")){
				return -3;
			}else if(jcdUseState.equals("注销")){
				return -4;
			}else{
				return -6;
			}
		}else{
			return -5;
		}		
	}
	
	//根据票据编号查编号id
	@Override
	public int getJcdId(String billNum) throws Exception{
	    JournalContractDatabase jcd = new JournalContractDatabase();
        String strNum = "";//数字
        String prefix = "";//字母
        //分离前缀与数字编号
        for (int i = 0; i < billNum.length();++i){ 
              if (Character.isDigit(billNum.charAt(i))){
                  strNum += billNum.charAt(i);
             }else{
                 prefix += billNum.charAt(i);
             }
        }
        if(!prefix.equals("") && strNum.equals("")){
            return -1;
        }
        if(!prefix.equals("") && !strNum.equals("")){
            jcd.setNumtype("1");
        }else if(prefix.equals("") && !strNum.equals("")){
            jcd.setNumtype("2");
        }
        jcd.setJcdContractNumber(strNum);
        jcd.setJcdContractPrefix(prefix);
        List<JournalContractDatabase> list = journalContractDatabaseMapper.selectPrefixNum(jcd);
        if(list.size() != 0){
            return list.get(0).getJcdId();
        }else{
            return -2;
        }   
	}
}
