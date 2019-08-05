package com.zz.actions.info;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.zz.other.Syslog;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.JSONUtil;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.freeNet.ListingsReleaseTable;
import com.zz.freeNet.ListingsReleaseTableMapper;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.info.InfoHouseRelease;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.info.HouseReleaseService;
import com.zz.util.MySqlSessionFactory;

/**
 * 房源发布表
 * @author Administrator
 *
 */
public class HouseReleaseAction extends BaseAction implements ModelDriven<InfoHouseRelease>{
	private InfoHouseRelease infoHouseRelease;
	private HouseReleaseService houseReleaseService;
	private HouseForStoreService houseForStoreService;
	public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
		this.houseForStoreService = houseForStoreService;
	}
	public void setHouseReleaseService(HouseReleaseService houseReleaseService) {
		this.houseReleaseService = houseReleaseService;
	}
	@Override
	public InfoHouseRelease getModel() {
		if(infoHouseRelease == null){
			infoHouseRelease = new InfoHouseRelease();
		}
		return infoHouseRelease;
	}
	
	/**
	 * 查询
	 */
	public void selectHouseRelease(){
		try {
			List<InfoHouseRelease> hreList = houseReleaseService.selectByPrimaryKey(infoHouseRelease);
			if(hreList.size() == 0){
				printlnOfJson(CommonMethodClass.jsonData(-1, "暂无招租房源信息", null));
			}else{
				String json = JSONUtil.serialize(hreList);
				
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
	}
	
	/**
	 * 修改
	 */
	public void updateHouseRelease(){
		try {
			int resilt = houseReleaseService.updateByPrimaryKeySelective(infoHouseRelease);
			if(resilt == 1){
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
			}else{
				printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
		}
	}
	
	/**
	 * 手动注销修改
	 * 撤销ims房源发布表的房屋,同时同步591MY免佣网
	 * 未租房状态 —> ims发布房源表撤销 —> 591MY免佣网发布表撤销
	 */
	public void manualCancellation(){
		Integer hsId = null;
		Integer hreId = null;
		String lrtCompanyEnglish = null;
		
		//修改未租房发布状态
		hsId = infoHouseRelease.getHreHouse4storeId();
		InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
		infoHouse4storeExpand.setHsId(hsId);
		infoHouse4storeExpand.setHsReleaseStatus("未发布");
		try {
			int result = houseForStoreService.updateByPrimaryKeySelective(infoHouse4storeExpand);
			if(result == 1){
				//ims发布房源表撤销
				hreId = infoHouseRelease.getHreId();
				int result1 = houseReleaseService.deleteByPrimaryKey(hreId);
				if(result1 == 1){
					
				}else{
					infoHouse4storeExpand.setHsReleaseStatus("已发布");
					houseForStoreService.updateByPrimaryKeySelective(infoHouse4storeExpand);
					printlnMsg("-3"); //ims发布房源表撤销失败
				}	
			}else{
				printlnMsg("-1"); //修改未租房发布状态失败
			}		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();Syslog.writeErr(e);
			printlnMsg("-2");
		}
		
		
	}
	
	/**
	 * 新增（需要传入所有数据）
	 */
	public void insert(){
		try {
			int resilt = houseReleaseService.insert(infoHouseRelease);
			if(resilt == 1){
				printlnMsg("1");
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			printlnMsg("-2");
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
	
	/**
	 * 新增
	 * 未租房发布到591MY 免佣网
	 */
	public void insertSelective(){
		int resilt = 0;
		try {
			resilt = houseReleaseService.insertSelective(infoHouseRelease);
			if(resilt > 0){
				//新增免佣网数据
				infoHouseRelease.setHreId(resilt);
				int lrtId = insert591MY(infoHouseRelease);
				if(lrtId > 0){
					//修改未租房发布状态
					InfoHouse4storeExpand infoHouse4storeExpand = new InfoHouse4storeExpand();
					infoHouse4storeExpand.setHsId(infoHouseRelease.getHreHouse4storeId());
					infoHouse4storeExpand.setHsReleaseStatus("已发布");
					infoHouse4storeExpand.setHsReleasePicture(infoHouseRelease.getHreDetailedImg());
					int result1 = houseForStoreService.updateByPrimaryKeySelective(infoHouse4storeExpand);
					if(result1 == 1){
						printlnMsg("1");
					}else{
						dataRollback(lrtId);
						houseReleaseService.deleteByPrimaryKey(resilt);
						printlnMsg("-4"); //未租房状态修改失败
					}
				}else{
					houseReleaseService.deleteByPrimaryKey(resilt);
					printlnMsg("-3"); //591MY添加失败
				}
			}else{
				printlnMsg("-1"); //ims未租房源发布表添加失败
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();Syslog.writeErr(e);
			printlnMsg("-2"); //异常数据错误
		}
	}
	
	/**
	 * 删除
	 */
	public void deleteHouseRelease(){
		try {
			int resilt = houseReleaseService.deleteByPrimaryKey(infoHouseRelease.getHreId());
			if(resilt == 1){
				printlnMsg("1");
			}else{
				printlnMsg("-1");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			printlnMsg("-2");
			e.printStackTrace();Syslog.writeErr(e);
		}
	}
	
	/**
	 * 	处理591MY免佣网的新增
	 * @throws IOException 
	 */
	private int insert591MY(InfoHouseRelease infoHouseRelease) throws IOException{
		HttpServletRequest request = (HttpServletRequest) ActionContext
				.getContext().get(ServletActionContext.HTTP_REQUEST);
        //获取公司名
        String companyName = (String) request.getSession().getAttribute("companyName");
        String company = (String) request.getSession().getAttribute("company");
		
		//设置参数
		ListingsReleaseTable lrt = new ListingsReleaseTable();
		lrt.setLrtHreId(""+infoHouseRelease.getHreId());
		lrt.setLrtCompanyEnglish(company);
		lrt.setLrtHouseBelong(companyName);
		lrt.setLrtContacts(infoHouseRelease.getUserName());
		lrt.setLrtContactsPhone(infoHouseRelease.getHreContactsPhone());
		lrt.setLrtHouseTitle(infoHouseRelease.getHreHouseTitle());
		lrt.setLrtHouseSubtitle(infoHouseRelease.getHreHouseSubtitle());
		lrt.setLrtHouseOwner(infoHouseRelease.getHreHouseOwner());
		lrt.setLrtHouseType(infoHouseRelease.getHreHouseType());
		lrt.setLrtSectionType(infoHouseRelease.getHreSectionType());
		lrt.setLrtHouseDirection(infoHouseRelease.getHreHouseDirection());
		lrt.setLrtHouseDecoration(infoHouseRelease.getHreHouseDecoration());
		lrt.setLrtHouseInFloors(infoHouseRelease.getHreHouseInFloors());
		lrt.setLrtHouseSquare(infoHouseRelease.getHreHouseSquare());
		lrt.setLrtHousePrice(infoHouseRelease.getHreHousePrice());
		lrt.setLrtFurnitureConfig(infoHouseRelease.getHreFurnitureConfig());
		lrt.setLrtAddCity(infoHouseRelease.getHreAddCity());
		lrt.setLrtAddDistrict(infoHouseRelease.getHreAddDistrict());
		lrt.setLrtAddZone(infoHouseRelease.getHreAddZone());
		lrt.setLrtAddStreet(infoHouseRelease.getHreAddStreet());
		lrt.setLrtAddCommunity(infoHouseRelease.getHreAddCommunity());
		lrt.setLrtAddBuilding(infoHouseRelease.getHreAddBuilding());
		lrt.setLrtAddDoorplateno(infoHouseRelease.getHreAddDoorplateno());
		lrt.setLrtDetailedAddress(infoHouseRelease.getDetailedAddress());
		lrt.setLrtHouseImg(infoHouseRelease.getHreHouseImg());
		lrt.setLrtDetailedImg(infoHouseRelease.getHreDetailedImg());
		lrt.setLrtHouseLabel(infoHouseRelease.getHreHouseLabel());
		lrt.setLrtAuthenticateState(infoHouseRelease.getHreAuthenticateState());
		lrt.setLrtAuthenticateWays(infoHouseRelease.getHreAuthenticateWays());
		lrt.setLrtCheckInfo(infoHouseRelease.getHreCheckInfo());
		lrt.setLrtReleaseTime(infoHouseRelease.getHreReleaseTime());
		lrt.setLrtRemake(infoHouseRelease.getHreRemake());
		
		SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession();
		ListingsReleaseTableMapper mapper = session.getMapper(ListingsReleaseTableMapper.class);
		try {	
			int result = mapper.insertSelective(lrt);
			Integer lrtId = lrt.getLrtId();
			session.commit();
			if(result == 1){
				return lrtId;
			}else{
				return -1;
			}
		} catch (Exception e) {
			e.printStackTrace();Syslog.writeErr(e);
			session.rollback();
			return -2;
		}finally {
			session.close();
		}
	}
	
	/**
	 * 591MY免佣网发布表撤销
	 * @param num
	 * @param companyEnglish
	 * @return
	 * @throws IOException 
	 */
	private int housingRevocation(Integer num, String companyEnglish) throws IOException{
		return 0;
	}
	
	/**
	 * 591MY免佣网房源发布表回滚操作
	 * @param num
	 * @return
	 * @throws IOException
	 */
	private int dataRollback( Integer num) throws IOException{
		SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession();
		ListingsReleaseTableMapper mapper = session.getMapper(ListingsReleaseTableMapper.class);
		try{
			int result = mapper.deleteByPrimaryKey(num);
			session.commit();
			if(result == 1){
				return 1;
			}else{
				return -1;
			}
		}catch (Exception e){
			e.printStackTrace();Syslog.writeErr(e);
			session.rollback();
			return -2;
		}finally {
			session.close();
		}
	}
}
