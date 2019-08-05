package com.zz.actions.info;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.Authority;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.datasource.MyDataSource;
import com.zz.datasource.MyDataSourceMapper;
import com.zz.deviceevents.ElectricMeterEvents;
import com.zz.deviceevents.WaterElectricMeterMapper;
import com.zz.deviceevents.WaterMeterEvents;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.info.InfoHouse4rentExpand;
import com.zz.po.info.InfoHouse4storeExpand;
import com.zz.po.journal.JourDevice;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.info.HouseForRentService;
import com.zz.service.info.HouseForStoreService;
import com.zz.service.journal.DeviceService;
import com.zz.service.journal.JourEarnestMoneyService;
import com.zz.service.journal.JourHsDeviceService;
import com.zz.util.DateUtil;
import com.zz.util.MySqlSessionFactory;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.json.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * 未租房间
 *
 * @author Administrator
 */

public class HouseForStoreAction extends BaseAction implements ModelDriven<InfoHouse4storeExpand> {
    private InfoHouse4storeExpand infoHouse4storeExpand;
    private HouseForStoreService houseForStoreService;
    private HouseForRentService houseForRentService;
    @Autowired
    private JourHsDeviceService jourHsDeviceService;
    @Autowired
    private JourEarnestMoneyService jourEarnestMoneyService;
    @Autowired
    private DeviceService deviceService;


    public void setHouseForStoreService(HouseForStoreService houseForStoreService) {
        this.houseForStoreService = houseForStoreService;
    }

    public void setHouseForRentService(HouseForRentService houseForRentService) {
        this.houseForRentService = houseForRentService;
    }

    @Override
    public InfoHouse4storeExpand getModel() {
        if (infoHouse4storeExpand == null) {
            infoHouse4storeExpand = new InfoHouse4storeExpand();
        }
        return infoHouse4storeExpand;
    }

    // 自动发送
    public String autoSendMsg() {
        String str = "1";
        try {
            String[] saIdStr = infoHouse4storeExpand.getJsonArray().split(",");
            int hsId = 0;
            int flag = saIdStr.length;
            InfoHouse4storeExpand ihse = new InfoHouse4storeExpand();
            for (int i = 0; i < saIdStr.length; i++) {
                hsId = Integer.parseInt(saIdStr[i]);
                ihse.setHsAutoSendMsg(str);
                ihse.setHsId(hsId);
                int updateByPrimaryKeySelective = houseForStoreService.updateByPrimaryKeySelective(ihse);
            }
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常", null));
        }
        return null;
    }

    // 手动发送
    public String manualSendMsg() {
        String str = "2";
        try {
            String[] saIdStr = infoHouse4storeExpand.getJsonArray().split(",");
            int hsId = 0;
            int flag = saIdStr.length;
            InfoHouse4storeExpand ihse = new InfoHouse4storeExpand();
            for (int i = 0; i < saIdStr.length; i++) {
                hsId = Integer.parseInt(saIdStr[i]);
                ihse.setHsAutoSendMsg(str);
                ihse.setHsId(hsId);
                int updateByPrimaryKeySelective = houseForStoreService.updateByPrimaryKeySelective(ihse);
            }
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-1, "系统异常", null));
        }
        return null;
    }
	
	/*public static void main(String[] args) {
		List<InfoHouse4storeExpand> list=null;
		System.out.println(list.size()+"***");
	}*/

    //查短租状态
    public String queryHouseStoreState() {
        try {
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHsHouse(infoHouse4storeExpand);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }

        return null;
    }

    /**
     * 查询未租房间
     *
     * @return
     */
    public String queryHouseStore() {
        // 未租房间 - 查个人房 A01b01
        int auth1 = Authority.authorize("A01b01");
        // 未租房间 - 查部门房 A01b02
        int auth2 = Authority.authorize("A01b02");
        // 未租房间 - 查分店房 A01b03
        int auth3 = Authority.authorize("A01b03");
        // 未租房间 - 查公司 A01b04
        int auth4 = Authority.authorize("A01b04");
        // 未租房间 - 隐私查看 A01b05
        int auth5 = Authority.authorize("A01b05");
        // 用户信息
        SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
        int userid = userInfo.getUserId();
        int department = userInfo.getSuDepartmentId();
        int storefront = userInfo.getSuStoreId();
        if (auth1 == 0 && auth2 == 0 && auth3 == 0 && auth4 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看未租房间权限", null));
            return null;
        } else {
            if (auth4 == 1) {

            } else if (auth3 == 1) {
                infoHouse4storeExpand.setHsStorefront(storefront);
            } else if (auth2 == 1) {
                infoHouse4storeExpand.setHsDepartment(department);
            } else if (auth1 == 1) {
                infoHouse4storeExpand.setHsUserId(userid);
                infoHouse4storeExpand.setPersonal(1);
            }
        }

        try {
            List<InfoHouse4storeExpand> list = houseForStoreService.queryHouseStore(infoHouse4storeExpand);
            if (list.size() != 0) {
                if (auth5 == 0) {
                    for (int i = 0; i < list.size(); ++i) {
                        list.get(i).setHsPaymentType("不可看");
                        list.get(i).setHsRegisterTime("不可看");
                        list.get(i).setHsHouseDeposit(123456789.00);
                        list.get(i).setHsTheTerm("不可看");
                        list.get(i).setHsBeginTime("不可看");
                        list.get(i).setHsEndTime("不可看");
                        list.get(i).setHsRentHoliday(123456789);
                        list.get(i).setHsHousePrice(123456789.00);
                    }
                }
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }

    /**
     * 无权限通用查询未租房间
     *
     * @return
     */
    public String queryHouseStoreCommon() {
        try {
            List<InfoHouse4storeExpand> list = houseForStoreService.queryHouseStoreCommon(infoHouse4storeExpand);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 ！", null));
        }
        return null;
    }

    // 根据ID查找
    public String queryHouseForStoreById() {
        try {
            List<InfoHouse4storeExpand> list = houseForStoreService.selectByPrimaryKey(infoHouse4storeExpand.getHsId());
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }
    // 处理过期未租已定
    public String dealExpiredOrders() {
        try {
            Integer num = houseForStoreService.dealExpiredOrders();
            if (num != 0) {
                String json = JSONUtil.serialize(num);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "暂无失效下定", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 抄表查询未租房
    public String huosestoreWeg() {
        try {
            List<InfoHouse4storeExpand> listhouse = houseForStoreService.huosestoreWeg(infoHouse4storeExpand);
            if (listhouse.size() != 0) {
                String json = JSONUtil.serialize(listhouse);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        return null;
    }
    // 远程抄表查询未租房
    public String remoteMeterReading() {
        try {
            List<InfoHouse4storeExpand> listhouse = houseForStoreService.remoteMeterReading(infoHouse4storeExpand);
            if (listhouse.size() != 0) {
                String json = JSONUtil.serialize(listhouse);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        return null;
    }

    // 合租房还原未租房
    public void reductionOfRent() {
        try {
            int result = houseForStoreService.reductionOfRent(infoHouse4storeExpand);
            if (result == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else if (result == 2) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "还存在合租房", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "合租房还原未租房失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }

    // 集散房还原未租房
    public void centralizedReduction() {
        try {
            int result = houseForStoreService.centralizedReduction(infoHouse4storeExpand);
            if (result == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "集散房还原未租房失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
    }

    // 未租房查询数量
    public String getInfoHouse4storeNum() {
        try {
            List<InfoHouse4storeExpand> hsList = houseForStoreService.getInfoHouse4storeNum(infoHouse4storeExpand);
            if (hsList.size() != 0) {
                String json = JSONUtil.serialize(hsList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 根据母房id查询子房
    public void flatShareRealQuery() {
        try {
            List<InfoHouse4storeExpand> hsList = houseForStoreService.flatShareRealQuery(infoHouse4storeExpand);
            if (hsList.size() != 0) {
                String json = JSONUtil.serialize(hsList);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "暂无子房信息", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }

    // 集散房拆分，累加集散房
    public String centralizedSplitRent() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            //判断集散房拆分是否会超过最大房间数
            String splitJson = infoHouse4storeExpand.getSplitJson();
            JSONArray ja = JSONArray.fromObject(splitJson);
            //查出母房当前所有的子房
            InfoHouse4storeExpand info1 = new InfoHouse4storeExpand();
            info1.setHsPrimitiveMother(infoHouse4storeExpand.getHsId());
            info1.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list1 = houseForStoreService.selectHouse(info1);
            //查公寓房间数(hsNotRentSplit值为0且房间状态不为退房完成的房间)
            InfoHouse4storeExpand info = new InfoHouse4storeExpand();
            info.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHouse(info);
            int reslut = 0;
//            System.out.println("公寓房间数：" + list.size());
//            System.out.println("当前子房数：" + list1.size());
//            System.out.println("本次子房数：" + ja.size());//ja中不包括母房
//            System.out.println("最大房间数：" + dataSource.getMaxHsNum());
            StringBuffer text = new StringBuffer();
            text.append("公司：");
            text.append(company);
            text.append("    公寓房间数");
            text.append(list.size());
            text.append("    当前子房数");
            text.append(list1.size());
            text.append("    本次子房数：");
            text.append(ja.size());
            text.append("    最大房间数：");
            text.append(dataSource.getMaxHsNum());
            String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
            String dir = "D:/Journal/fzz-sql";
            Syslog.writeLog(text.toString(), path, dir);
            //如果HsNotRentSplit值不为2，则list.size()-1
            if (infoHouse4storeExpand.getHsNotRentSplit() == 2) {//本来就是母房
                if (ja.size() - list1.size() + list.size() <= dataSource.getMaxHsNum()) {
                    reslut = houseForStoreService.splitRentHouse(infoHouse4storeExpand, 2);
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                    return null;
                }
            } else {//本来是整租房，第一次拆分
                if (ja.size() - list1.size() + list.size() - 1 <= dataSource.getMaxHsNum()) {
                    reslut = houseForStoreService.splitRentHouse(infoHouse4storeExpand, 2);
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                    return null;
                }
            }
            if (reslut == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "拆分失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 合租房拆分，累加合租房
    public String splitRent() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession();) {
            //判断合租房拆分是否会超过最大房间数
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            String splitJson = infoHouse4storeExpand.getSplitJson();
            JSONArray ja = JSONArray.fromObject(splitJson);
            //查公寓房间数(hsNotRentSplit值为0且房间状态不为退房完成的房间)
            InfoHouse4storeExpand info = new InfoHouse4storeExpand();
            info.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHouse(info);
            int result = 0;
//            System.out.println("公寓房间数：" + list.size());
//            System.out.println("新增子房数：" + ja.size());
//            System.out.println("最大房间数：" + dataSource.getMaxHsNum());
            StringBuffer text = new StringBuffer();
            text.append("公司：");
            text.append(company);
            text.append("    公寓房间数");
            text.append(list.size());
            text.append("    新增子房数：");
            text.append(ja.size());
            text.append("    最大房间数：");
            text.append(dataSource.getMaxHsNum());
            String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
            String dir = "D:/Journal/fzz-sql";
            Syslog.writeLog(text.toString(), path, dir);
            //如果HsNotRentSplit值不为1，则list.size()-1
            if (infoHouse4storeExpand.getHsNotRentSplit() == 1) {//本来就是母房
                if (ja.size() + list.size() <= dataSource.getMaxHsNum()) {
                    result = houseForStoreService.splitRentHouse(infoHouse4storeExpand, 1);
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                    return null;
                }
            } else {//本来是整租房，第一次拆分
                if (ja.size() + list.size() - 1 <= dataSource.getMaxHsNum()) {
                    result = houseForStoreService.splitRentHouse(infoHouse4storeExpand, 1);
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                    return null;
                }
            }
            if (result == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "拆分失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 合租房子房修改
    public void flatShareRealChange() {
        try {
            int result = houseForStoreService.flatShareRealChange(infoHouse4storeExpand, 1);
            if (result == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "合租房子房修改失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }

    // 统计未租房源
    public String queryHouseStoreNum() {
        try {
            int store = houseForStoreService.queryHouseStoreNum(infoHouse4storeExpand);
            if (store >= 0) {
                String json = JSONUtil.serialize(store);

                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "统计未租房源失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    /**
     * 业主退房查询
     *
     * @return
     */
    public String queryLandlordCheckOut() {
        // 退房办理 - 业主退房 A03b02
        int auth1 = Authority.authorize("A03b02");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看业主退房权限", null));
            return null;
        }
        try {
            List<InfoHouse4storeExpand> list = houseForStoreService.queryLandlordCheckOut(infoHouse4storeExpand);
            if (list.size() != 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 增加定金记录修改接口
    public String upDepositInterface() {
        try {
            int result = houseForStoreService.updateByPrimaryKeySelective(infoHouse4storeExpand);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "定金记录修改失败", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 设置房管员接口
    public String updateManagerUser() {
        try {
            InfoHouse4storeExpand store = new InfoHouse4storeExpand();
            store.setHsId(infoHouse4storeExpand.getHsId());
            store.setHsManagerUserId(infoHouse4storeExpand.getHsManagerUserId());
            store.setHsStorefront(infoHouse4storeExpand.getHsStorefront());
            store.setHsDepartment(infoHouse4storeExpand.getHsDepartment());
            int result = houseForStoreService.updateByPrimaryKeySelective(store);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "设置房管员失败", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 清除定金
    public String clearDeposit() {
        InfoHouse4storeExpand hs = new InfoHouse4storeExpand();
        hs.setHsId(infoHouse4storeExpand.getHsId());
        hs.setHsDownDeposit("否");
        hs.setHsDepositAmount(0.00);
        hs.setHsIntentionalId(null);
        hs.setHsSalesmanId(null);
        hs.setHsStartDate(null);
        hs.setHsEndDate(null);
        hs.setHsDespositAccount(null);
        hs.setHsPopId(null);
        try {
            int resuslt2=0;
            int result = houseForStoreService.clearDeposit(hs);
            if(infoHouse4storeExpand.getSplitFlag()!=null){
                 resuslt2 = jourEarnestMoneyService.updateDepositState(infoHouse4storeExpand.getHsId(),infoHouse4storeExpand.getSplitFlag());
            }else {
                resuslt2 = jourEarnestMoneyService.updateDepositState(infoHouse4storeExpand.getHsId(),1);
            }
            if (resuslt2 <=0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "取消定金失败", null));
            }
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "清除定金失败", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 修改欠结款（底层接口，UI层不可调用）
    public String modifyTheBase() {
        try {
            int result = houseForStoreService.modifyTheBase(infoHouse4storeExpand);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 未租查询维保的
    public String selectMaintenance() {
        try {
            List<InfoHouse4storeExpand> listhouse = houseForStoreService.queryMaintenance(infoHouse4storeExpand);
            if (listhouse.size() != 0) {
                String json = JSONUtil.serialize(listhouse);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 日常账号管理查询未租房
    public String getAllHouseForStoreInCard() {
        try {
            List<InfoHouse4storeExpand> list = houseForStoreService.getAllHouseForStoreInCard(infoHouse4storeExpand);
            if (list.size() > 0) {
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 添加集中房
    public String insertSplitHouseForStore() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            infoHouse4storeExpand.setMaxHsNum(dataSource.getMaxHsNum());
            String splitJson = infoHouse4storeExpand.getSplitJson();
            JSONArray ja = JSONArray.fromObject(splitJson);
            InfoHouse4storeExpand infoHouseStore = new InfoHouse4storeExpand();
            infoHouseStore.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHouse(infoHouseStore);
            String[] res = null;
            //有资料房
            if (infoHouse4storeExpand.getAddHsHouseType() == 1) {
                if ((list.size() + ja.size()) <= dataSource.getMaxHsNum()) {
                    res = houseForStoreService.insertSplitHouseForStore(infoHouse4storeExpand).split("###");
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已达到最大数量", null));
                    return "-7";
                }
            } else {//无资料房
                if ((list.size() + ja.size()) <= dataSource.getMaxHsNum()) {
                    res = houseForStoreService.insertSplitHouseForStore(infoHouse4storeExpand).split("###");
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已达到最大数量", null));
                    return "-7";
                }
            }
            if (res[0].equals("1")) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else if (res[0].equals("-1")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-4")) {
                printlnOfJson(CommonMethodClass.jsonData(-4, "无楼盘字典", null));
            } else if (res[0].equals("-5")) {
                printlnOfJson(CommonMethodClass.jsonData(-5, "盘源已存在", null));
            } else if (res[0].equals("-6")) {
                printlnOfJson(CommonMethodClass.jsonData(-6, "未租房已经存在", null));
            } else if (res[0].equals("-21")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-22")) {
                printlnOfJson(CommonMethodClass.jsonData(-22, "身份证不能为空", null));
            } else if (res[0].equals("-7")) {
                printlnOfJson(CommonMethodClass.jsonData(-7, "房间已达到最大数量", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 添加未租，分有资料房添加和无资料房添加
    public String insertHouseForStore() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            String[] res = null;
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            String splitJson = infoHouse4storeExpand.getJsonArray();
            JSONArray ja = JSONArray.fromObject(splitJson);
            InfoHouse4storeExpand infoHouseStore = new InfoHouse4storeExpand();
            infoHouseStore.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHouse(infoHouseStore);
//            System.out.println("公寓房间数：" + list.size());
//            System.out.println("本次子房数：" + ja.size());//ja中不包括母房
//            System.out.println("最大房间数：" + dataSource.getMaxHsNum());
//            System.out.println("公司：" + company);
            StringBuffer text = new StringBuffer();
            text.append("公司：");
            text.append(company);
            text.append("    公寓房间数");
            text.append(list.size());
            text.append("    本次子房数：");
            text.append(ja.size());
            text.append("    最大房间数：");
            text.append(dataSource.getMaxHsNum());
//            String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
//            String dir = "D:/Journal/fzz-sql";
//            Syslog.writeLog(text.toString(), path, dir);
            if (infoHouse4storeExpand.getAddHsHouseType() == 1) {
                // 有资料房
                if ((list.size() + ja.size()) <= dataSource.getMaxHsNum()) {
                    res = houseForStoreService.notRentAComprehensiveNew(infoHouse4storeExpand).split("###");
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                    return null;
                }
            } else {
                // 无资料房
                if ((list.size() + ja.size()) <= dataSource.getMaxHsNum()) {
                    res = houseForStoreService.insertNoRoomAdditions(infoHouse4storeExpand).split("###");
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                    return null;
                }
            }
            if (res[0].equals("1")) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", res[1]));
            } else if (res[0].equals("-1")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-4")) {
                printlnOfJson(CommonMethodClass.jsonData(-4, "无楼盘字典", null));
            } else if (res[0].equals("-5")) {
                printlnOfJson(CommonMethodClass.jsonData(-5, "盘源已存在", null));
            } else if (res[0].equals("-6")) {
                printlnOfJson(CommonMethodClass.jsonData(-6, "未租房已经存在", null));
            } else if (res[0].equals("-21")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-22")) {
                printlnOfJson(CommonMethodClass.jsonData(-22, "身份证不能为空", null));
            } else if (res[0].equals("-7")) {
                printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    // 未租房源发布设置
    public void publishListingsSet() {
        try {
            int result = houseForStoreService.updateByPrimaryKeySelective(infoHouse4storeExpand);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "发布失败", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "发布成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统内部错误", null));
        }
    }

    // 更新记录
    public String updateHouseForStore() {
        try {
            int result = houseForStoreService.updateByPrimaryKeySelective(infoHouse4storeExpand);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
        }
        return null;
    }

    // 业绩受益人管理：查当前正在托管的房中还没添加业绩受益人的房
    public String queryNoAssistStore() {
        try {
            List<InfoHouse4storeExpand> houses = houseForStoreService.selectNoAssist(infoHouse4storeExpand);
            if (houses.size() != 0) {
                String json = JSONUtil.serialize(houses);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "暂无没添加协助人的房", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 根据ID删除
    public String deleteHouseForStoreById() {
        try {
            int result = houseForStoreService.deleteByPrimaryKey(infoHouse4storeExpand.getHsId());
            if (result == 0) {
                printlnMsg("-1");
            } else {
                printlnMsg("1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    // 根据ID删除合租房
    public String deleteFlatShareHouseForStoreById() {
        try {
            int checkFlag = 0;
            int hsId = infoHouse4storeExpand.getHsId();
            InfoHouse4rentExpand ihr = new InfoHouse4rentExpand();
            ihr.setHrHouse4storeId(hsId);
            // 查旗下已租房
            List<InfoHouse4rentExpand> listRent = houseForRentService.queryHouseRentCommon(ihr);
            for (InfoHouse4rentExpand item : listRent) {
                if ("退房完成".equals(item.getHrState())) {

                } else {
                    checkFlag++;
                }
            }
            if (checkFlag > 0) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "合租房已出租，且未完全退房，不能删除", null));
                return null;
            }
            List<InfoHouse4storeExpand> list = houseForStoreService.selectByPrimaryKey(hsId);
            if (list.get(0).getHsPrimitiveMother() == null || list.get(0).getHsLeaseState().equals("已租")) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "不存在合租房 或 合租房为已租状态", null));
                return null;
            }
            int result1 = houseForStoreService.deleteByPrimaryKey(hsId);
            if (result1 == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "删除合租房", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    /**
     * 删除图片
     */
    public void deleteHsPic() {
        try {
            List<InfoHouse4storeExpand> list = houseForStoreService.selectByPrimaryKey(infoHouse4storeExpand.getHsId());
            if (list.size() == 0) {
                printlnMsg("-1");
                return;
            }
            String oldPath = list.get(0).getHsOtherImg();
            String delPath = infoHouse4storeExpand.getHsOtherImg();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            infoHouse4storeExpand.setHsOtherImg(newPath);
            int result = houseForStoreService.updateByPrimaryKeySelective(infoHouse4storeExpand);
            if (result > 0) {
                printlnMsg("1");
            } else {
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }

    // 房管员、默认联系人的姓名联系方式
    public void publishAContact() {
        try {
            InfoHouse4storeExpand inhs = houseForStoreService.publishAContact(infoHouse4storeExpand);
            if (inhs != null) {
                String json = JSONUtil.serialize(inhs);
                printlnOfJson(json);
            } else {
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
        }
    }

    // 设置集中房

    /**
     * 1.查询未租房极限值
     * 2.统计当前系统中已存在的未租房数量
     * 3.统计本次修改的未租房数量
     * 4.判断母房之前是整租房还是被拆分房
     * 整租房：已存在的未租房数量-1
     * 被拆分房：统计原先子房数量
     * 5.已存在的未租房数量 + 本次修改的未租房数量 -原先子房数量 <= 未租房极限值
     *
     * @return
     */

    public String updateCentralizedApartment() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            //判断房间数量达到最大时不许添加
            String splitJson = infoHouse4storeExpand.getSplitJson();
            JSONArray ja = JSONArray.fromObject(splitJson);
            int hsPrimitiveMother = 0;
            int hsNotRentSplit = 0;
            //遍历拿到母房的hsNotRentSplit和母房ID
            for (int i = 0; i < ja.size(); i++) {
                String ob = ja.get(i).toString();
                JSONObject jsonObject = JSONObject.fromObject(ob);
                if (jsonObject.get("hsNotRentSplit") != "" && jsonObject.get("hsNotRentSplit") != null) {
                    hsNotRentSplit = jsonObject.getInt("hsNotRentSplit");
                    hsPrimitiveMother = jsonObject.getInt("hsId");
                }
            }
            //查当前的子房数量
            InfoHouse4storeExpand info1 = new InfoHouse4storeExpand();
            info1.setHsPrimitiveMother(hsPrimitiveMother);
            info1.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list1 = houseForStoreService.selectHouse(info1);
            //查当前公寓房间数量
            InfoHouse4storeExpand info = new InfoHouse4storeExpand();
            info.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHouse(info);
            int result = 0;
//            System.out.println("公寓房间数：" + list.size());
//            System.out.println("当前子房数：" + list1.size());
//            System.out.println("本次子房数：" + (ja.size() - 1));//ja中包含母房
//            System.out.println("最大房间数：" + dataSource.getMaxHsNum());
//            System.out.println(hsNotRentSplit);
            StringBuffer text = new StringBuffer();
            text.append("公司：");
            text.append(company);
            text.append("    公寓房间数");
            text.append(list.size());
            text.append("    当前子房数");
            text.append(list1.size());
            text.append("    本次子房数：");
            text.append((ja.size() - 1));
            text.append("    最大房间数：");
            text.append(dataSource.getMaxHsNum());
            String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
            String dir = "D:/Journal/fzz-sql";
            Syslog.writeLog(text.toString(), path, dir);
            if (ja.size() - 1 - list1.size() + list.size() <= dataSource.getMaxHsNum()) {
                if (hsNotRentSplit == 2) {//整租房第一次拆分
                    result = houseForStoreService.updateCentralizedApartment(infoHouse4storeExpand);
                } else {//原先已经拆过的
                    result = houseForStoreService.updateCentralizedApartment(infoHouse4storeExpand);
                }
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                return null;
            }
            if (result > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }
        return null;
    }

    public String insertBatchHouseForStore() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            infoHouse4storeExpand.setMaxHsNum(dataSource.getMaxHsNum());
            System.out.println(infoHouse4storeExpand.toString());
            String splitJson = infoHouse4storeExpand.getSplitJson();
            JSONArray ja = JSONArray.fromObject(splitJson);
            InfoHouse4storeExpand infoHouseStore = new InfoHouse4storeExpand();
            infoHouseStore.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHouse(infoHouseStore);
            String[] res = null;

            if ((list.size() + ja.size()) <= dataSource.getMaxHsNum()) {
                res = houseForStoreService.insertBatchHouseForStore(infoHouse4storeExpand).split("###");
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-7, "房间已达到最大数量", null));
                return "-7";
            }
            if (res[0].equals("1")) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else if (res[0].equals("-1")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-4")) {
                printlnOfJson(CommonMethodClass.jsonData(-4, "添加楼盘字典失败", null));
            } else if (res[0].equals("-5")) {
                printlnOfJson(CommonMethodClass.jsonData(-5, "盘源已存在", null));
            } else if (res[0].equals("-6")) {
                printlnOfJson(CommonMethodClass.jsonData(-6, "未租房已经存在", null));
            } else if (res[0].equals("-21")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-22")) {
                printlnOfJson(CommonMethodClass.jsonData(-22, "身份证不能为空", null));
            } else if (res[0].equals("-7")) {
                printlnOfJson(CommonMethodClass.jsonData(-7, "房间已达到最大数量", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
        return null;
    }

    public void queryEnergyReadings() {
        try (SqlSession sqlSession = MySqlSessionFactory.newSqlSessionFactory2().openSession()) {
            List<JourDevice> devList = jourHsDeviceService.queryDeviceByHs(infoHouse4storeExpand);
            String devSn = "";
            Integer brandId = null;
            List<WaterMeterEvents> waterList = null;
            List<ElectricMeterEvents> electricList = null;
            if (devList.size() != 0) {
                WaterElectricMeterMapper mapper = sqlSession.getMapper(WaterElectricMeterMapper.class);
                if (devList.get(0).getDevId().equals("47") && devList.get(0).getDevBrandId() == 20) {
                    WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
                    waterMeterEvents.setWmDeviceSn(devList.get(0).getDevAuthId());
                    waterMeterEvents.setWmBrandId(devList.get(0).getDevBrandId());
                    waterMeterEvents.setStartTime(infoHouse4storeExpand.getStartTime());
                    waterMeterEvents.setEndTime(infoHouse4storeExpand.getEndTime());
                    waterList = mapper.selectWaterMeterNum(waterMeterEvents);
                } else if (devList.get(0).getDevId().equals("46") && devList.get(0).getDevBrandId() == 20) {
                    ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
                    electricMeterEvents.setEmDeviceSn(devList.get(0).getDevAuthId());
                    electricMeterEvents.setEmBrandId(devList.get(0).getDevBrandId());
                    electricMeterEvents.setStartTime(infoHouse4storeExpand.getStartTime());
                    electricMeterEvents.setEndTime(infoHouse4storeExpand.getEndTime());
                    electricList = mapper.selectElectricMeterNum(electricMeterEvents);
                } else if (devList.get(0).getDevBrandId() == 13) {
                    WaterMeterEvents waterMeterEvents = new WaterMeterEvents();
                    waterMeterEvents.setWmDeviceSn(devList.get(0).getDevSpare2());
                    waterMeterEvents.setWmBrandId(devList.get(0).getDevBrandId());
                    waterMeterEvents.setStartTime(infoHouse4storeExpand.getStartTime());
                    waterMeterEvents.setEndTime(infoHouse4storeExpand.getEndTime());
                    waterList = mapper.selectWaterMeterNum(waterMeterEvents);
                } else if (devList.get(0).getDevBrandId() == 12) {
                    ElectricMeterEvents electricMeterEvents = new ElectricMeterEvents();
                    electricMeterEvents.setEmDeviceSn(devList.get(0).getDevAuthId());
                    electricMeterEvents.setEmBrandId(devList.get(0).getDevBrandId());
                    electricMeterEvents.setStartTime(infoHouse4storeExpand.getStartTime());
                    electricMeterEvents.setEndTime(infoHouse4storeExpand.getEndTime());
                    electricList = mapper.selectElectricMeterNum(electricMeterEvents);
                }
                if (electricList != null && electricList.size() != 0) {
                    String json = JSONUtil.serialize(electricList);
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
                } else if (waterList != null && waterList.size() != 0) {
                    String json = JSONUtil.serialize(waterList);
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的数据！", null));
                }
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有该设备！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }

    public void updateBatchHouseForStore(){
        try {
            List<InfoHouse4storeExpand> jsonArray = JSONArray.fromObject(infoHouse4storeExpand.getJsonArray());
            int result = houseForStoreService.updateBatchHouseForStore(jsonArray);
            if (result > 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }
    //查询在住客房
    public void selectHotel(){
        try {
            List<InfoHouse4storeExpand> jsonArray = JSONArray.fromObject(infoHouse4storeExpand.getJsonArray());
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHotel(jsonArray);
            String json = JSONUtil.serialize(list.size());
            printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }

    public void oneToManyAddTrusteeship(){
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            String[] res = null;
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            String splitJson = infoHouse4storeExpand.getSplitJson();
            JSONArray ja = JSONArray.fromObject(splitJson);
            InfoHouse4storeExpand infoHouseStore = new InfoHouse4storeExpand();
            infoHouseStore.setHsNotRentSplit(0);
            List<InfoHouse4storeExpand> list = houseForStoreService.selectHouse(infoHouseStore);
//            System.out.println("公寓房间数：" + list.size());
//            System.out.println("本次子房数：" + ja.size());//ja中不包括母房
//            System.out.println("最大房间数：" + dataSource.getMaxHsNum());
//            System.out.println("公司：" + company);
            StringBuffer text = new StringBuffer();
            text.append("公司：");
            text.append(company);
            text.append("    公寓房间数");
            text.append(list.size());
            text.append("    本次子房数：");
            text.append(ja.size());
            text.append("    最大房间数：");
            text.append(dataSource.getMaxHsNum());
            String path = "D:/Journal/fzz-sql/fzz-sql(" + DateUtil.getCurDate() + ").txt";
            String dir = "D:/Journal/fzz-sql";
//            Syslog.writeLog(text.toString(), path, dir);
                // 添加一约多房
                if ((list.size() + ja.size()) <= dataSource.getMaxHsNum()) {
                    res = houseForStoreService.oneToManyAddTrusteeship(infoHouse4storeExpand).split("###");
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
                }
            if (res[0].equals("1")) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", res[1]));
            } else if (res[0].equals("-1")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-4")) {
                printlnOfJson(CommonMethodClass.jsonData(-4, "无楼盘字典", null));
            } else if (res[0].equals("-5")) {
                printlnOfJson(CommonMethodClass.jsonData(-5, "盘源已存在", null));
            } else if (res[0].equals("-6")) {
                printlnOfJson(CommonMethodClass.jsonData(-6, "未租房已经存在", null));
            } else if (res[0].equals("-21")) {
                printlnOfJson(CommonMethodClass.jsonData(-21, "身份证已存在，本次填写姓名与原姓名不一致！", res[1]));
            } else if (res[0].equals("-22")) {
                printlnOfJson(CommonMethodClass.jsonData(-22, "身份证不能为空", null));
            } else if (res[0].equals("-7")) {
                printlnOfJson(CommonMethodClass.jsonData(-7, "房间已到达最大数量", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }
    }

    public void batchAddHouseRoom(){
        try {
            Result<String> result = houseForStoreService.batchAddHouseRoom(infoHouse4storeExpand);
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    //子房ID查询子房成本价格
    public void hsQueryHousr4store(){
        try {
            List<InfoHouse4storeExpand> result = houseForStoreService.selectStoreData(infoHouse4storeExpand);
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
            System.out.println("11111111"+resultStr);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
}
