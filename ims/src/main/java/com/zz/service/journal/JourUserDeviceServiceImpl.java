package com.zz.service.journal;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.junit.experimental.theories.FromDataPoints;

import com.zz.mapper.journal.JourDeviceMapper;
import com.zz.mapper.journal.JourUserDeviceMapper;
import com.zz.po.journal.JourDevice;
import com.zz.po.journal.JourUserDevice;
import com.zz.po.sys.SysUserExpand;

public class JourUserDeviceServiceImpl implements JourUserDeviceService {
	@Resource
	private JourUserDeviceMapper jourUserDeviceMapper;
	@Resource
	private JourDeviceMapper jourDeviceMapper;
	@Override
	public int updateList(List<JourUserDevice> recordList) throws Exception {
		//全部删除数据
		System.out.println(recordList);
		System.out.println("getJudUserId"+recordList.get(0).getJudUserId());
		System.out.println("getJudDeviceId"+recordList.get(0).getJudDeviceId());
		System.out.println("getJudJuId"+recordList.get(0).getJudId());
		
		if(recordList.get(0).getJudUserId()==0){
			System.out.println("4444");
			List<Integer> relatedHs= jourUserDeviceMapper.selectHssByJhoOfficeId(recordList.get(0).getJudDeviceId());
			System.out.println(relatedHs.size());
			if(relatedHs.size()==0){
				return 1;
			}else{
				return jourUserDeviceMapper.removeOfficeAssociateByOfficeId(recordList.get(0).getJudDeviceId());
			}
		}	
		//List<JourUserDevice> recordList2= jourUserDeviceMapper.selectAllUserDevice(recordList.get(0).getJudDeviceId());
		List<JourUserDevice> recordList3= new ArrayList<JourUserDevice>();
		for(int i=0;i<recordList.size();i++){
			List<JourUserDevice> selectAllUserDevice = jourUserDeviceMapper.selectAllUserDevice(recordList.get(i).getJudDeviceId());
			for(int j=0;j<selectAllUserDevice.size();j++){
				recordList3.add(selectAllUserDevice.get(j));
			}
		}
		/*System.out.println("recordList3"+recordList3);
		System.out.println("recordList2"+recordList2);
		for(int i=0;i<recordList.size();i++){
			for(int j=0; j < recordList2.size(); j++){
				if(recordList2.get(j).getJudId().equals(recordList.get(i).getJudId())){
					recordList2.remove(j);
					
				}
			}
		}*/
		//System.out.println("recordList2:"+recordList2);
		if(recordList3.size()>0){
			int deleteJudId = jourUserDeviceMapper.removeOfficeAssociateByIds(recordList3);
		}
		/*//计算删除和插入的数据
		List<JourUserDevice> list1=new ArrayList<JourUserDevice>();
		List<JourUserDevice> list2=new ArrayList<JourUserDevice>();
		for(int i=0;i<recordList.size();i++){
			if(recordList.get(i).getJudId()!=null){
				list1.add(recordList.get(i));
			}else if(recordList.get(i).getJudDeviceId()!=null && recordList.get(i).getJudUserId() !=null ){
				list2.add(recordList.get(i));
				}
		}
		System.out.println("list1"+list1);
		System.out.println("list2"+list2);*/
		//List<JourUserDevice> listId = jourUserDeviceMapper.selectJourHsOfficeExpandByOfficeId(recordList.get(0).getJudId());
		//System.out.println(listId);
		/*List<JourUserDevice>retainJhos=new ArrayList<JourUserDevice>();
		for (int i = 0; i < list2.size(); i++) {
			retainJhos.add(list2.get(i));
		}*/
		
		//System.out.println(listId.toString());
		//插入数据
		/*for (int i = 0; i < retainJhos.size(); i++) {
			for(int j=0; j < recordList.size(); j++){
				if(retainJhos.get(i).getJudId().equals(recordList.get(j).getJudId())&&
					retainJhos.get(i).getJudDeviceId().equals(recordList.get(j).getJudDeviceId()) ){
					recordList.remove(j);
					if(recordList.size()>0){
						j--;
					}
				}
			}
		}*/
		int removeFlag=0;
		int insertFlag=0;
		/*System.out.println("size"+list1.size());
		if (list1.size()>0) {
			removeFlag=jourUserDeviceMapper.removeOfficeAssociateByIds(list1);
		}*/
		//System.out.println("retainJhos.size"+retainJhos.size());
		if(recordList.size()>0){
			insertFlag=jourUserDeviceMapper.insertOfficeAssociateHsList(recordList);
		}
		/*//删除数据
		for (int i = 0; i < recordList.size(); i++) {
			for(int j=0; j < list1.size(); j++){
				if(recordList.get(i).getJudId().equals(list1.get(j).getJudId())&&
						recordList.get(i).getJudDeviceId().equals(list1.get(j).getJudDeviceId()) ){
					retainJhos.add(list1.remove(j));
					if(list1.size()>0){
						j--;
					}
				}
			}
		}*/
		//System.out.println("retainJhos"+retainJhos);
		if(insertFlag>=0){
			return 1;
		}else{
			return -1;
		}
	
	}
	@Override
	public List<JourDevice> allDeviceExpand(JourUserDevice jourUserDevice) throws Exception {
		return jourUserDeviceMapper.selectDeivce2(jourUserDevice);
//		return jourDeviceMapper.queryOfficeAreadevice();
	}
	@Override
	public List<SysUserExpand> selectUser(JourUserDevice jourUserDevice) throws Exception {
		List<SysUserExpand> relatedUs = jourUserDeviceMapper.selectUser(jourUserDevice);
		return relatedUs;
	}
	@Override
	public int updateUnrelateddevices(List<JourUserDevice> recordList) throws Exception {
		//全部删除数据
				System.out.println("getJudUserId"+recordList.get(0).getJudUserId());
				System.out.println("getJudDeviceId"+recordList.get(0).getJudDeviceId());
				System.out.println("getJudJuId"+recordList.get(0).getJudId());
				
				if(0==recordList.get(0).getJudDeviceId()){
					System.out.println("4444");
					List<Integer> relatedHs= jourUserDeviceMapper.selectJouUserId(recordList.get(0).getJudUserId());
					System.out.println(relatedHs.size());
					if(relatedHs.size()==0){
						return 1;
					}else{
						return jourUserDeviceMapper.removeJouUserId(recordList.get(0).getJudUserId());
					}
				}	
				List<JourUserDevice> recordList2= jourUserDeviceMapper.selectAllUser(recordList.get(0).getJudUserId());
				System.out.println("recordList2"+recordList2);
				for(int i=0;i<recordList.size();i++){
					for(int j=0; j < recordList2.size(); j++){
						if(recordList2.get(j).getJudId().equals(recordList.get(i).getJudId())){
							recordList2.remove(j);
							
						}
					}
				}
				System.out.println("recordList2:"+recordList2);
				if(recordList2.size()>0){
					int deleteJudId = jourUserDeviceMapper.removeOfficeAssociateByIds(recordList2);
				}
				//计算删除和插入的数据
				List<JourUserDevice> list1=new ArrayList<JourUserDevice>();
				List<JourUserDevice> list2=new ArrayList<JourUserDevice>();
				for(int i=0;i<recordList.size();i++){
					if(recordList.get(i).getJudId()!=null){
						list1.add(recordList.get(i));
					}else if(recordList.get(i).getJudDeviceId()!=null && recordList.get(i).getJudUserId() !=null ){
						list2.add(recordList.get(i));
						}
				}
				System.out.println("list1"+list1);
				System.out.println("list2"+list2);
				List<JourUserDevice>retainJhos=new ArrayList<JourUserDevice>();
				for (int i = 0; i < list2.size(); i++) {
					retainJhos.add(list2.get(i));
				}
				int removeFlag=0;
				int insertFlag=0;
				System.out.println("size"+list1.size());
				if (list1.size()>0) {
					removeFlag=jourUserDeviceMapper.removeOfficeAssociateByIds(list1);
				}
				System.out.println("retainJhos.size"+retainJhos.size());
				if(retainJhos.size()>0){
					insertFlag=jourUserDeviceMapper.insertOfficeAssociateHsList(recordList);
				}
				//删除数据
				for (int i = 0; i < recordList.size(); i++) {
					for(int j=0; j < list1.size(); j++){
						if(recordList.get(i).getJudId().equals(list1.get(j).getJudId())&&
								recordList.get(i).getJudDeviceId().equals(list1.get(j).getJudDeviceId()) ){
							retainJhos.add(list1.remove(j));
							if(list1.size()>0){
								j--;
							}
						}
					}
				}
				System.out.println("retainJhos"+retainJhos);
				if(removeFlag>=0&&insertFlag>=0){
					return 1;
				}else{
					return -1;
				}
	}
	@Override
	public List<JourDevice> selectDevice(JourUserDevice jourUserDevice) throws Exception {
		System.out.println("ourUser"+jourUserDevice);
		List<JourDevice> relatedUs = jourUserDeviceMapper.selectDeivce(jourUserDevice);

		return relatedUs;
	}
	
	}
