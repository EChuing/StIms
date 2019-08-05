package com.zz.service.journal;


import com.zz.mapper.info.InfoHouse4storeMapper;
import com.zz.mapper.journal.JourDeviceMapper;
import com.zz.mapper.journal.JourHsDeviceMapper;
import com.zz.mapper.journal.JourHsOfficeMapper;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourHsOfficeExpand;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/*import org.apache.jasper.tagplugins.jstl.core.ForEach;*/

public class JourHsOfficeServiceImpl implements JourHsOfficeService {
	@Autowired
	private JourHsOfficeMapper jourHsOfficeMapper;
	@Autowired
	private InfoHouse4storeMapper infoHouse4storeMapper;
	@Autowired
	private JourDeviceMapper jourDeviceMapper;
	@Autowired
	private JourHsDeviceMapper jourHsDeviceMapper;
	

	@Override
	public int updateList(List<JourHsOfficeExpand> recordList) throws Exception {
		//全部删除数据
		if(recordList.get(0).getJhoHsId()==0){
			List<Integer> relatedHs= jourHsOfficeMapper.selectHssByJhoOfficeId(recordList.get(0).getJhoOfficeId());
			if(relatedHs.size()==0 ){
				return 1;
			}else{
				return jourHsOfficeMapper.removeOfficeAssociateByOfficeId(recordList.get(0).getJhoOfficeId());
			}
		}
		
		//计算删除和插入的数据
		List<JourHsOfficeExpand> jhoList= jourHsOfficeMapper.selectJourHsOfficeExpandByOfficeId(recordList.get(0).getJhoOfficeId());
		List<JourHsOfficeExpand>retainJhos=new ArrayList<JourHsOfficeExpand>();
		//删除数据
		for (int i = 0; i < recordList.size(); i++) {
			for(int j=0; j < jhoList.size(); j++){
				if(recordList.get(i).getJhoHsId().equals(jhoList.get(j).getJhoHsId())&&
					recordList.get(i).getJhoDeviceId().equals(jhoList.get(j).getJhoDeviceId()) ){
					retainJhos.add(jhoList.remove(j));
					if(jhoList.size()>0){
						j--;
					}
				}
			}
		}
		//插入数据
		for (int i = 0; i < retainJhos.size(); i++) {
			for(int j=0; j < recordList.size(); j++){
				if(retainJhos.get(i).getJhoHsId().equals(recordList.get(j).getJhoHsId())&&
					retainJhos.get(i).getJhoDeviceId().equals(recordList.get(j).getJhoDeviceId()) ){
					recordList.remove(j);
					if(recordList.size()>0){
						j--;
					}
				}
			}
		}
		int removeFlag=0;
		int insertFlag=0;
		if (jhoList.size()>0) {
			removeFlag=jourHsOfficeMapper.removeOfficeAssociateByIds(jhoList);
		}
		if(recordList.size()>0){
			insertFlag=jourHsOfficeMapper.insertOfficeAssociateHsList(recordList);
		}
		if(removeFlag>=0&&insertFlag>=0){
			return 1;
		}else{
			return -1;
		}
	}
	

	@Override
	public List<Integer> selectHssByJhoOfficeId(Integer jhoOfficeId) throws Exception {
		return jourHsOfficeMapper.selectHssByJhoOfficeId(jhoOfficeId);
	}

	@Override
	public List<InfoHouse4storeExpand> selectRelatedInfoHouse4storeExpand(JourHsOfficeExpand jourHsOfficeExpand)
			throws Exception {
		List<Integer> hsIdsList= selectHssByJhoOfficeId(jourHsOfficeExpand.getJhoOfficeId());
		if (hsIdsList.size()==0) {
			return null;
		}
		List<InfoHouse4storeExpand>realtedList=new ArrayList<InfoHouse4storeExpand>();
		for (Integer hsId : hsIdsList) {
			List<InfoHouse4storeExpand> hsList=infoHouse4storeMapper.selectByPrimaryKey(hsId);
			if(hsList.size()>0){
				for (InfoHouse4storeExpand infoHouse4storeExpand : hsList) {
					realtedList.add(infoHouse4storeExpand);
				}
			}
		}
		return realtedList;
	}
	
	@Override
	public List<InfoHouse4storeExpand> AllInfoHouse4storeExpand(JourHsOfficeExpand jourHsOfficeExpand)
			throws Exception {
		InfoHouse4storeExpand ihfse=new InfoHouse4storeExpand();
		ihfse.setHsPrimitiveMother(0);
		ihfse.setHsState("正常");
		ihfse.setHsAddCommunity(jourHsOfficeExpand.getCommunity());
		ihfse.setHsAddBuilding(jourHsOfficeExpand.getBuilding());
		ihfse.setHsAddDoorplateno(jourHsOfficeExpand.getDoorplateno());
//		ihfse.setHsLeaseState("所有未租");
//		ihfse.setStartNum(jourHsOfficeExpand.getStartNum());
//		ihfse.setEndNum(jourHsOfficeExpand.getEndNum());
//		ihfse.setStartNum("0");
		List<InfoHouse4storeExpand>hsList= infoHouse4storeMapper.selectHsHouse(ihfse);
		for (int i = 0; i < hsList.size(); i++) {
			if(hsList.get(i).getHsAddCity()=="办公区"){
				hsList.remove(i);
				i--;
			}
		}
		List<Integer> relatedHs= jourHsOfficeMapper.selectHssByJhoOfficeId(jourHsOfficeExpand.getJhoOfficeId());
		System.out.println("========-----="+relatedHs.size());
		int removeSize=relatedHs.size();
		if (relatedHs.size() != 0) {
			for(int i=0;i<hsList.size();i++){
				if (relatedHs.contains(hsList.get(i).getHsId())) {
					hsList.remove(i);
					i--;
				}
			}
		}
	return hsList;
	}

	@Override
	public List<Integer> selectDevicesByJhoOfficeId(JourHsOfficeExpand jourHsOfficeExpand) throws Exception {
		return  selectDeviceIds(1,jourHsOfficeExpand);
	}

	@Override
	public List<JourDevice> selectRelatedDeviceExpand(JourHsOfficeExpand jourHsOfficeExpand)
			throws Exception {
		System.out.println(jourHsOfficeExpand.getJhoOfficeId()+"       54665656565");
		List<Integer> relatedIds =jourHsOfficeMapper.selectDevIdsByJhoOfficeId(jourHsOfficeExpand.getJhoOfficeId());
		if(relatedIds.size()==0){
			return null;
		}else{
			System.out.println("ids="+relatedIds);
			 List<JourDevice> devs=	jourDeviceMapper.selectDeviceByIds(relatedIds); 
			 System.out.println("dev-=========="+devs);
			return  devs;
		}
	}

	@Override
	public List<JourDevice> AllDeviceExpand(JourHsOfficeExpand jourHsOfficeExpand) throws Exception {
		 List<Integer> unRelatedDevIds= jourHsDeviceMapper.selectDeviceIdsByHsId(jourHsOfficeExpand.getJhoOfficeId());
		 if(unRelatedDevIds.size()==0){
			 return null;
		 }else{
			 return jourDeviceMapper.selectDeviceByIds(unRelatedDevIds);
		 }
	}

	@Override
	public List<Integer> selectDevIdByHsId(Integer hsId) throws Exception {
		List<Integer> devIds= jourHsOfficeMapper.selectDevIdByHsId(hsId);
		System.out.println("related======"+devIds);
		return devIds;
	}

	//获取设备id
	public List<Integer>selectDeviceIds(int type,JourHsOfficeExpand jourHsOfficeExpand) throws Exception{
		if(type==0){	//关联设备ID 公区
			return jourHsOfficeMapper.selectDevIdsByJhoOfficeId(jourHsOfficeExpand.getJhoOfficeId());
		}else{	//未关联设备ID
			List<Integer> devIds= jourHsDeviceMapper.selectDeviceIdsByHsId(jourHsOfficeExpand.getJhoOfficeId());
			List<Integer>relatedDevIds= jourHsOfficeMapper.selectDevIdsByJhoOfficeId(jourHsOfficeExpand.getJhoOfficeId());
			if(relatedDevIds.size()==0){
				return devIds;
			} 
			for (int i = 0; i < relatedDevIds.size(); i++) {
				if(devIds.contains(relatedDevIds.get(i))){
					devIds.remove(relatedDevIds.get(i));
					i--;
				}
			}
			return devIds;
		}
	}


	
}
