package com.zz.service.journal;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ActionContext;
import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.journal.JourSetupHouseNexusMapper;
import com.zz.mapper.journal.JourShortRentContractMapper;
import com.zz.mapper.journal.JournalHousingFollowMapper;
import com.zz.mapper.sys.SysHouseDictMapper;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourSetupHouseNexus;
import com.zz.po.journal.JourShortRentContract;
import com.zz.po.journal.JournalHousingFollowExpand;
import com.zz.po.journal.JournalRepairExpand;
import com.zz.po.sys.SysHouseDictExpand;
import com.zz.po.sys.SysUserExpand;
import com.zz.util.DateUtil;


public class JourShortRentHouseServiceImpl implements JourShortRentHouseService{
	@Autowired
	private InfoHouse4storeMapper infoHouse4storeMapper;
	@Autowired
	private JournalHousingFollowMapper journalHousingFollowMapper;
	@Autowired
	private JourShortRentContractMapper jourShortRentContractMapper;
	@Autowired
	private JourSetupHouseNexusMapper jourSetupHouseNexusMapper;
	@Autowired
	private SysHouseDictMapper sysHouseDictMapper;
	@Autowired
	private RepairService repairService;

	//添加短租房
	@Override
	public int insertShortRent(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		//匹配楼盘字典，获取id
		SysHouseDictExpand syshd = new SysHouseDictExpand();
		syshd.setHdProvince(infoHouse4storeExpand.getHsAddProvince());
//		syshd.setHdPinyin(infoHouse4storeExpand.getHdPinyin());
		syshd.setHdCity(infoHouse4storeExpand.getHsAddCity());
		syshd.setHdDistrict(infoHouse4storeExpand.getHsAddDistrict());
		syshd.setHdCommunity(infoHouse4storeExpand.getHsAddCommunity());
		List<SysHouseDictExpand> hdList = sysHouseDictMapper.selectAll(syshd);
		
        //通过判断“小区名”、“楼栋号”、“门牌号”。如果已存在，前台需提醒“已存在”。后台不允许重复录入
		InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
		hs.setHsAddCommunity(infoHouse4storeExpand.getHsAddCommunity());
		hs.setHsAddBuilding(infoHouse4storeExpand.getHsAddBuilding());
		hs.setHsAddDoorplateno(infoHouse4storeExpand.getHsAddDoorplateno());
        //用“小区名”、“楼栋号”、“门牌号”去查询是否已存在此房源。
        List<InfoHouse4storeExpand> addlist = infoHouse4storeMapper.queryHouseStore(hs);
        
        System.out.println("11111111111111111111"+(addlist.size() == 0));
        System.out.println("12222222222222222222"+(hdList.size() == 0));
    	if(addlist.size() == 0){
    		if(hdList.size() == 0){
    			int hdResult = sysHouseDictMapper.insertSelective(syshd);
    			System.out.println("楼盘字典=============="+syshd);
    			if(hdResult == 1){
    				Integer hdId = syshd.getHdId();
    				
    				JourSetupHouseNexus jshn = new JourSetupHouseNexus();
    				jshn.setJshnShdId(hdId);
    				jshn.setJshnJsrsuId(infoHouse4storeExpand.getJsrsuId());
    				jourSetupHouseNexusMapper.insertSelective(jshn);
    			}else{
    				throw new Exception("添加楼盘字典失败!!!!");
    			}
    		}
    		
    		int result = infoHouse4storeMapper.insertSelective(infoHouse4storeExpand);
    		if(result == 0){
    			throw new Exception("短租房添加失败");
    		}
    		
    		//将资料添加进跟进表
    		JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
    		StringBuffer follow = new StringBuffer();
    		//从用户表获取跟进人姓名
    		SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
    		follow.append(userInfo.getSuStaffName()+", "+DateUtil.getCurDateTime()+"添加短租房");
    		//补充未租房的信息
    		jhf.setJhfHouse4storeId(infoHouse4storeExpand.getHsId());
    		jhf.setJhfUserId(infoHouse4storeExpand.getHsUserId());
    		jhf.setJhfDepartment(infoHouse4storeExpand.getHsDepartment());
    		jhf.setJhfStorefront(infoHouse4storeExpand.getHsStorefront());
    		jhf.setJhfFollowTime(DateUtil.getCurDateTime());
    		jhf.setJhfFollowRemark(follow.toString());
    		jhf.setJhfPaymentWay("系统跟进");
    		jhf.setJhfFollowResult("新增成功");
    		jhf.setJhfFollowBelong("其他");
    		jhf.setJhfRemind("否");
    		
    		int jhfResult = journalHousingFollowMapper.insertSelective(jhf);
    		if(jhfResult == 0){
    			throw new Exception("添加跟进失败");
    		}
        }else{
        	return -1;
        }
    	return 1;
	}
	
	//批量添加短租房
	@Override
	public Result<String> insertHouseList(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		List<InfoHouse4storeExpand> shortRentList = JSON.parseArray(infoHouse4storeExpand.getJsonArray(),InfoHouse4storeExpand.class);
		
		for(int i=0;i<shortRentList.size();i++){
			//通过判断“小区名”、“楼栋号”、“门牌号”。如果已存在，前台需提醒“已存在”。后台不允许重复录入
			InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
			hs.setHsAddCommunity(shortRentList.get(i).getHsAddCommunity());
			hs.setHsAddBuilding(shortRentList.get(i).getHsAddBuilding());
			hs.setHsAddDoorplateno(shortRentList.get(i).getHsAddDoorplateno());
			String address = shortRentList.get(i).getHsAddCommunity()+" "+shortRentList.get(i).getHsAddBuilding()+" "+shortRentList.get(i).getHsAddDoorplateno();
	        //用“小区名”、“楼栋号”、“门牌号”去查询是否已存在此房源。
	        List<InfoHouse4storeExpand> addlist = infoHouse4storeMapper.queryHouseStore(hs);
	        if(addlist.size() > 0){
	        	System.out.println("111111                     "+address);
	        	return new Result<String>(-2,"添加失败，"+address+"已存在",null);
//	        	result = infoHouse4storeMapper.insertShortRentList(shortRentList);
			}
		}
		int result = infoHouse4storeMapper.insertShortRentList(shortRentList);
		if(result > 0){
			return new Result<String>(1,"添加成功",null);
		}else{
			return new Result<String>(-1,"添加失败",null);
		}
	}
	
	//取消短租房
	@Override
	public String updateshortRent(InfoHouse4storeExpand record)throws Exception {
		JourShortRentContract jsrc = new JourShortRentContract();
		SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		jsrc.setJsrcHsId(record.getHsId());
		//查询短租表
		List<JourShortRentContract> list = jourShortRentContractMapper.selectJourShortRentContract(jsrc);
		Date nowTime=new Date();
		if(list.size() > 0){
			boolean flag = true;
			for(int i=0;i<list.size();i++){
				String endTime = list.get(i).getJsrcEndTime();
				String JsrcState = list.get(i).getJsrcState();
				Date jscrendTime = time.parse(endTime);
				//判断短租房状态     保留或已住或预定或退定中时 不允许取消短租
				if(JsrcState.equals("保留") || JsrcState.equals("已住") || JsrcState.equals("预定") || JsrcState.equals("退定中")){
					if(record.getHsMicronetIdentification() != 2){
						if(jscrendTime.getTime() > nowTime.getTime()){
							flag = false;
						}
					}else{
						String result = "微信公众号还在上架";
						return result;
					}
				}
			}
			if(flag){
				int result = infoHouse4storeMapper.updateByPrimaryKeySelective(record);
				System.out.println(123 +"  " + result); 
				return "1";
			}else{
				return "该房间还存在订单";
			}
		}else{
			int result = infoHouse4storeMapper.updateByPrimaryKeySelective(record);
			System.out.println(456 +"  " + result); 
			return "1";
		}
	} 
	
	//设置脏房
	@Override
	public Result<String> updateDirtyRoomList(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		System.out.println("===========222222222==========="+infoHouse4storeExpand);
		List<InfoHouse4storeExpand> dirtyRoomList = JSON.parseArray(infoHouse4storeExpand.getJsonArray(),InfoHouse4storeExpand.class);
		int result = infoHouse4storeMapper.updateDirtyRoomList(dirtyRoomList);
		//批量插入跟进
		if(infoHouse4storeExpand.getFollowArray() != "" && infoHouse4storeExpand.getFollowArray() != null){
			List<JournalHousingFollowExpand> followList = JSON.parseArray(infoHouse4storeExpand.getFollowArray(),JournalHousingFollowExpand.class);
			System.out.println(followList);
			journalHousingFollowMapper.insertFollowList(followList);
		}
		if(result > 0){
			if(infoHouse4storeExpand.getJsrcHsIdList()!=null){
				JournalRepairExpand jhl = new JournalRepairExpand();
				List<Integer> list = new ArrayList<>();
				list = infoHouse4storeExpand.getJsrcHsIdList();
				int repairType =infoHouse4storeMapper.selectRepairByHsIdList(list);
				if(repairType < 0){
				if(infoHouse4storeExpand.getAddRepairs()!=""&&infoHouse4storeExpand.getAddRepairs()!=null){
					JournalRepairExpand jr = new JournalRepairExpand();
					jr.setAddRepairs(infoHouse4storeExpand.getAddRepairs());
					repairService.insertListRepair(jr);
				}
				}
			}
			
			
			return new Result<String>(1,"成功",null);
		}else{
			return new Result<String>(-1,"失败",null);
		}
	}

	@Override
	public Result<List<InfoHouse4storeExpand>> selectShortRentHouse(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		List<InfoHouse4storeExpand> result = infoHouse4storeMapper.selectShortRentHouse(infoHouse4storeExpand);
		if(result.isEmpty()){
			return new Result<>(-1,"没有房间信息",null);
		}else{
			return new Result<>(1,"成功",result);
		}
	}

	@Override
	public Result<String> batchAddition(InfoHouse4storeExpand infoHouse4storeExpand) throws Exception {
		Integer hdId = null; // 楼盘字典id
		Integer hsId = null; //未租房Id
		List<InfoHouse4storeExpand> shortRentList = JSON.parseArray(infoHouse4storeExpand.getJsonArray(),InfoHouse4storeExpand.class);
		if(shortRentList.size() > 0){
			for(InfoHouse4storeExpand hs : shortRentList){
				//匹配楼盘字典，获取id
				SysHouseDictExpand syshd = new SysHouseDictExpand();
				syshd.setHdProvince(hs.getHsAddProvince());
				syshd.setHdPinyin(hs.getHdPinyin());
				syshd.setHdCity(hs.getHsAddCity());
				syshd.setHdDistrict(hs.getHsAddDistrict());
				syshd.setHdCommunity(hs.getHsAddCommunity());
				List<SysHouseDictExpand> hdList = sysHouseDictMapper.selectAll(syshd);
				System.out.println("88888888888888888888:::"+hdList);
				if(hdList.size() == 0){
					System.out.println("999999999999999999999999");
					int hdResult = sysHouseDictMapper.insertSelective(syshd);
					System.out.println("楼盘字典=============="+syshd);
					if(hdResult == 1){
						hdId = syshd.getHdId();
						
						JourSetupHouseNexus jshn = new JourSetupHouseNexus();
						jshn.setJshnShdId(hdId);
						jshn.setJshnJsrsuId(infoHouse4storeExpand.getJsrsuId());
						jourSetupHouseNexusMapper.insertSelective(jshn);
					}else{
						throw new Exception("添加楼盘字典失败!!!!");
					}
				}else{
					hdId = hdList.get(0).getHdId();
				}
				System.out.println(hdId);
				//判断此房是否在，未租中已经存在。
				InfoHouse4storeExpand hs1 = new InfoHouse4storeExpand();
				hs1.setHsAddCity(hs.getHsAddCity());
				hs1.setHsAddDistrict(hs.getHsAddDistrict());
				hs1.setHsAddCommunity(hs.getHsAddCommunity());
				hs1.setHsAddBuilding(hs.getHsAddBuilding());
				hs1.setHsAddDoorplateno(hs.getHsAddDoorplateno());
				String address = hs.getHsAddCommunity()+" "+hs.getHsAddBuilding()+" "+hs.getHsAddDoorplateno();
				//查询是否已经存在
				List<InfoHouse4storeExpand> hs1List = infoHouse4storeMapper.queryHouseStoreCommon(hs1);
				if(hs1List.size() != 0){
					//已经存在相同的未租房
					return new Result<String>(-2,"添加失败，"+address+"已存在",null);
				}
				
				/** 添加未租房*/
				 
				//设置数据
				InfoHouse4storeExpand infohs = hs;
				infohs.setHsHouseDictId(hdId);
				infohs.setHsLeaseState("短租房");
				int result1 = infoHouse4storeMapper.insertSelective(infohs);
				if(result1 == 0){
					throw new Exception("添加未租房失败!!!!");
				}
				hsId = infohs.getHsId();
				
				//将资料添加进跟进表
	    		JournalHousingFollowExpand jhf = new JournalHousingFollowExpand();
	    		StringBuffer follow = new StringBuffer();
	    		//从用户表获取跟进人姓名
	    		SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
	    		follow.append(userInfo.getSuStaffName()+", "+DateUtil.getCurDateTime()+"添加短租房");
	    		//补充未租房的信息
	    		jhf.setJhfHouse4storeId(hsId);
	    		jhf.setJhfUserId(hs.getHsUserId());
	    		jhf.setJhfDepartment(hs.getHsDepartment());
	    		jhf.setJhfStorefront(hs.getHsStorefront());
	    		jhf.setJhfFollowTime(DateUtil.getCurDateTime());
	    		jhf.setJhfFollowRemark(follow.toString());
	    		jhf.setJhfPaymentWay("系统跟进");
	    		jhf.setJhfFollowResult("新增成功");
	    		jhf.setJhfFollowBelong("其他");
	    		jhf.setJhfRemind("否");
	    		
	    		int jhfResult = journalHousingFollowMapper.insertSelective(jhf);
	    		if(jhfResult == 0){
	    			throw new Exception("添加跟进失败");
	    		}
				
			}
		}
		return new Result<String>(1,"添加成功",null);
	}

	
}
