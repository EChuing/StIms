package com.zz.actions.commons;

import com.opensymphony.xwork2.ActionContext;
import com.zz.other.Syslog;
import com.zz.po.info.InfoContractInstallment;
import com.zz.po.info.InfoRenewalLandlord;
import com.zz.po.info.InfoRenewalRenterExpand;
import com.zz.po.sys.SysUserExpand;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.json.JSONException;
import org.apache.struts2.json.JSONUtil;

import java.math.BigDecimal;
import java.security.MessageDigest;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 此类为通用的普通方法的封装类 一类是 - ‘业务计算函数’ 一类是 - ‘时间获取以及时间计算、转换 等函数’
 *
 * @author Administrator
 */
public class CommonMethodClass {
    /**
     * MD5加密
     **/
    public static String toMD5(String plainText, Integer md5Type) {
        try {
            // 生成实现指定摘要算法的 MessageDigest 对象。
            MessageDigest md = MessageDigest.getInstance("MD5");
            // 使用指定的字节数组更新摘要。
            md.update(plainText.getBytes());
            // 通过执行诸如填充之类的最终操作完成哈希计算。
            byte b[] = md.digest();
            // 生成具体的md5密码到buf数组
            int i;
            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0) {
                    i += 256;
                }
                if (i < 16) {
                    buf.append("0");
                }
                buf.append(Integer.toHexString(i));
            }
            if (md5Type == 16) {
                return buf.toString().substring(8, 24);
            } else if (md5Type == 32) {
                return buf.toString();
            }

        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        }
        return null;
    }

    /**
     * 从session获取品牌信息
     **/
    public static String getSessionBrandInfo() {
        return (String) ActionContext.getContext().getSession().get("brandList");
    }

    /**
     * 从session获取登录的用户信息
     **/
    public static SysUserExpand getSessionUserInfo() {
        return (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
    }

    /**
     * 从session获取公司简称
     **/
    public static String getSessionCompany() {
        return (String) ActionContext.getContext().getSession().get("company");
    }

    /**
     * 从session获取公司名
     **/
    public static String getSessionCompanyName() {
        return (String) ActionContext.getContext().getSession().get("companyName");
    }

    /**
     * 从session获取公司管理城市
     **/
    public static String getSessionCompanyRentCity() {
        return (String) ActionContext.getContext().getSession().get("companyRentCity");
    }

    /**
     * 从session获取对应的字段
     **/
    public static String getSessionByKey(String key) {
        return (String) ActionContext.getContext().getSession().get(key);
    }

    /*********************************** 业务计算函数***************************************/
    /**
     * 业务处理后返回前台的值
     * json数据拼接
     *
     * @param code
     * @param msg
     * @param body
     * @return
     */
    public static String jsonData(int code, String msg, String body) {
        JSONObject jsonObj = new JSONObject();
        jsonObj.accumulate("code", code);//编号
        jsonObj.accumulate("msg", msg);//说明
        ArrayList list = new ArrayList();
        String bodyIf = null;
//		System.out.println(body);
        if (body != null) {
            bodyIf = body.substring(0, 1);
        }
        if (body != null && body != "[]" && ("{".equals(bodyIf) || "[".equals(bodyIf))) {
            if ("{".equals(bodyIf)) {
                body = "[" + body + "]";
            }
            JSONArray jsonData = JSONArray.fromObject(body);
            for (Object a : jsonData) {
                String bodyflag = null;
                try {
                    bodyflag = JSONUtil.serialize(a).substring(0, 1);
                } catch (JSONException e) {
                    e.printStackTrace();
                    Syslog.writeErr(e);
                }
                if ("{".equals(bodyflag)) {
                    JSONObject jsonObjBody = (JSONObject) a;
                    Iterator iterator = jsonObjBody.keys();
                    while (iterator.hasNext()) {
                        String key = (String) iterator.next();
                        String value = jsonObjBody.getString(key);
                        if (value == null || value == "null") {
                            jsonObjBody.put(key, "");
                        }
                    }
                    list.add(jsonObjBody);
                }
            }
            if (list.size() != 0) {
                try {
                    body = JSONUtil.serialize(list);
                } catch (JSONException e) {
                    e.printStackTrace();
                    Syslog.writeErr(e);
                }
            }
        }
        jsonObj.accumulate("body", body);//返回数据
        String json = jsonObj.toString();
        return json;
    }

    public static String count(Integer num, String str2) {
        JSONObject jsonObj = new JSONObject();
        jsonObj.accumulate("totalNum", num);
        jsonObj.accumulate("list", str2);
        String json = jsonObj.toString();
        return json;
    }

    /**
     * 计算免租期时段 拼接成，如：2015-01-01#2015-01-30#2015-12-17#2015-12-31,2016-01-01#2016-01-30#2016-12-17#2016-12-31
     * 导入才用到
     *
     * @param Sdate
     * @param Edate
     * @param csvData
     * @return (String) sum
     * @throws ParseException
     */
    public static String rentFreeTime(String Sdate, String Edate, String csvData) throws Exception {
        String begin = Sdate;// 合约开始
        String end = Edate;// 合约结束
        String aAaytime = csvData;// 年前、年后的免租天数 "45#0,30#15"
        String temp = Sdate;
        String sum = "";
        int countPlus = 0;

        String[] str1 = aAaytime.split(",");
        int aDayLength = str1.length;
        System.out.println("-------------------- " + str1.length);
        // 计算合约一共有几年几个月
        int[] rs = getYearMonthDay(begin, end);
        int year = rs[0];
        int month = rs[1] + ((rs[2] > 0) ? 1 : 0);
        System.out.println("相差的月数：" + year + "年-" + month + "月");

        // 计算年前免租期的开始日期和结束日期
        String startData = "";
        String endData = "";
        String startTime = "";
        String endTime = "";

        if (year != 0) {
            countPlus = year;
            for (int i = 0; i < year; ++i) {
                // 每一年的免租天数
                String[] str = str1[i].split("#");
                if (i == 0) {
                    startData = begin;
                } else {
                    startData = dayAddSub(temp, 1);
                }
                System.out.println("数组" + str.length);
                if (Integer.parseInt(str[0]) != 0) {
                    endData = dayAddSub(startData, Integer.parseInt(str[0]) - 1);
                } else {
                    endData = dayAddSub(startData, Integer.parseInt(str[0]));
                }
                endTime = getmonth(startData, 12);
                if (Integer.parseInt(str[1]) != 0) {
                    startTime = dayAddSub(endTime, 1 - Integer.parseInt(str[1]));
                } else {
                    startTime = dayAddSub(endTime, Integer.parseInt(str[1]));
                }
                temp = endTime;
                sum += startData + "#" + endData + "#" + startTime + "#" + endTime + ",";
                // System.out.println("免租期 年前 的开始日期："+startData+"  结束日期："+endData+"\n"+"免租期 年后 的开始日期："+startTime+"  结束日期："+endTime);
                System.out.println("免租时段" + sum);
            }
        }
        // return sum;
        // 不足一年的免租期
        String freeStartDate = "";
        String freeEndDate = "";
        String freeStartTime = "";
        String freeEndTime = "";
        int freePeriod = 0;
        int freePoor = 0;
        int sDay = 0;
        int eDay = 0;
        // 相差的天数
        int dayPoor = Integer.parseInt(end.split("-")[2]) - Integer.parseInt(begin.split("-")[2]) + 1;
        System.out.println("我要的差：" + dayPoor);
        if (month != 0) {
            countPlus += 1;
            System.out.println("最后整年的日期：" + temp);
            eDay = dayPoor;
            // 获取最后的年前开始日期
            if (year == 0) {
                System.out.println("走的111：");
                // 第最后的年前免租天数
                freePeriod = Integer.parseInt(str1[0].split("#")[0]);
                // 第最后的年后免租天数
                freePoor = Integer.parseInt(str1[0].split("#")[1]);
                freeStartDate = temp;
            } else {
                System.out.println("走的222：");
                // 第最后的年前免租天数
                freePeriod = Integer.parseInt(str1[str1.length - 1].split("#")[0]);
                // 第最后的年后免租天数
                freePoor = Integer.parseInt(str1[str1.length - 1].split("#")[1]);
                sDay = dayPoor;
                freeStartDate = dayAddSub(temp, 1);
            }
            System.out.println("这是什么日期：" + freeStartDate + "--年前免租天数--- :"
                    + freePeriod + "---年后免租天数----:" + freePoor + "\n" + sDay
                    + " --- " + eDay);
            if ((countPlus - aDayLength) > 0) {
                freePeriod = 0;
                freePoor = 0;
                System.out.println("都是零吗？？：" + freePeriod + " --- " + freePoor);
            }

            if (freePeriod != 0) {
                // 有免租期的年前结束日期
                freeEndDate = dayAddSub(freeStartDate, freePeriod);
            } else {
                // 没有免租期的年前结束日期
                freeEndDate = dayAddSub(freeStartDate, freePeriod);
            }

            // 第最后免租期的年后结束日期
            freeEndTime = getmonth(freeStartDate, month);
            freeEndTime = dayAddSub(freeEndTime, eDay);

            // 第最后免租期的年后开始日期
            if (freePoor != 0) {
                System.out.println("zhine---：" + freePoor);
                freeStartTime = dayAddSub(freeEndTime, 1 - freePoor);
                System.out.println("尼玛的--111---：" + freeStartTime);
            } else {
                freeStartTime = freeEndTime;
            }
            sum += freeStartDate + "#" + freeEndDate + "#" + freeStartTime + "#" + freeEndTime;
            System.out.println(sum);
        } else {
            freeStartDate = dayAddSub(temp, 1);
            freeEndDate = freeStartDate;
            freeEndTime = dayAddSub(freeStartDate, dayPoor - 1);
            freeStartTime = freeEndTime;
            sum += freeStartDate + "#" + freeEndDate + "#" + freeStartTime + "#" + freeEndTime;
            System.out.println(sum);
        }
        return sum;
    }

    /**
     * 处理房东合约分期账单表
     *
     * @param infoRenewal
     * @return
     * @throws Exception
     */
    public static List<InfoContractInstallment> landContractInstallment(InfoRenewalLandlord infoRenewal) throws Exception {
        List<InfoContractInstallment> list = new ArrayList<InfoContractInstallment>();
        String beginTime = infoRenewal.getJrlBeginTime();// 合约开始时间
        String endTime = infoRenewal.getJrlEndTime();// 合约结束时间
        String paymentMethod = infoRenewal.getJrlPaymentMethod();// 缴费方式
        String[] rentFreeSegment = infoRenewal.getJrlRentFreeSegment().split(",");// 免租期
        String[] rentFreeLast = infoRenewal.getJrlPriceLadder().split(",");// 价格阶梯
        String annualMethod = infoRenewal.getJrlAnnualMethod();//年度结算方式
        String effectiveBeginTime = "";
        String effectiveEndTime = "";
        System.out.println(annualMethod);
        int temporary = 0;
        int tiqiantianshu = 0;
        if (infoRenewal.getJrlInAdvancePay() != null) {
            tiqiantianshu = infoRenewal.getJrlInAdvancePay();
        }
        int years = 0;
        // 计算出合约中一共有多少个月
        int[] rs = getYearMonthDay(beginTime, endTime);
        years = rs[0];
        if (rs[1] > 0 || rs[2] > 0) {
            years++;
        }
        int periods = 1;// 期数
        int addmonth = 0;// 标记增长周期
        int paymentPeriods = 0;// 周期增长值
        int flag = 0;// 标记周期计算方式
        if ("月付".equals(paymentMethod)) {
            paymentPeriods = 1;
            flag = 1;
        } else if ("季付".equals(paymentMethod)) {
            paymentPeriods = 3;
            flag = 2;
        } else if ("半年付".equals(paymentMethod)) {
            paymentPeriods = 6;
            flag = 3;
        } else if ("年付".equals(paymentMethod)) {
            paymentPeriods = 12;
            flag = 4;
        }
        for (int i = 0; i < years; ++i) {// 循环周期年
            Double beseMoney = Double.parseDouble(rentFreeLast[i]);//该年的租金
            String[] timeArr = rentFreeSegment[i].split("#");//该年的免租段

                effectiveBeginTime = dateAddSub(timeArr[1], 0, 0, 0);// 每自然年正式起租日
                effectiveEndTime = dateAddSub(timeArr[2], 0, 0, 0);// 每自然年最后付租日
                // 当年前免租期开始与结束时间不等时，则获取过了免租天数的最后那一天的后一天日期时间为正式起组日。
                if (!timeArr[1].equals(timeArr[0])) {
                    effectiveBeginTime = dateAddSub(timeArr[1], 0, 0, 1);
                }
                // 当年后免租期开始与结束时间不等时，则获取过了免租天数的开始那一天的前一天日期时间为最后付租日。
                if (!timeArr[2].equals(timeArr[3])) {
                    effectiveEndTime = dateAddSub(timeArr[2], 0, 0, -1);
                }
            if("合约年度".equals(annualMethod)){
                if (i == 0) {
                    temporary = getDayDiff(timeArr[0], timeArr[1]) + 1;
                }
                effectiveBeginTime = dateAddSub(timeArr[0], 0, 0, temporary);
                effectiveEndTime = dateAddSub(timeArr[3], 0, 0, temporary);
                if(effectiveEndTime.compareTo(endTime) > 0){
                    effectiveEndTime = endTime;
                }
                if (i == years - 1) {
                    effectiveBeginTime = dateAddSub(timeArr[0], 0, 0, temporary);
                    effectiveEndTime = dateAddSub(timeArr[3], 0, 0, 0);
                    if(effectiveBeginTime.compareTo(endTime) > 0){
                        break;
                    }
                }
            }
//            else if("合约年度".equals(annualMethod){
//                effectiveBeginTime = dateAddSub(timeArr[1], 0, 0, 0);// 每自然年正式起租日
//                effectiveEndTime = dateAddSub(timeArr[2], 0, 0, 0);// 每自然年最后付租日
//                // 当年前免租期开始与结束时间不等时，则获取过了免租天数的最后那一天的后一天日期时间为正式起组日。
//                if (!timeArr[1].equals(timeArr[0])) {
//                    effectiveBeginTime = dateAddSub(timeArr[1], 0, 0, 1);
//                }
//                // 当年后免租期开始与结束时间不等时，则获取过了免租天数的开始那一天的前一天日期时间为最后付租日。
//                if (!timeArr[2].equals(timeArr[3])) {
//                    effectiveEndTime = dateAddSub(timeArr[2], 0, 0, -1);
//                }
//            }
            int[] cyclesAndDays = getCyclesAndDays(effectiveBeginTime, effectiveEndTime, flag);// 除去免租段后的整周期、剩余天数
            System.out.println(cyclesAndDays[0]);
            for (int j = 0; j < cyclesAndDays[0]; ++j) {// 根据月数生成账单
                InfoContractInstallment thisOne = new InfoContractInstallment();
                thisOne.setJciHouse4storeId(infoRenewal.getJrlHouse4storeId());
                thisOne.setJciDepartment(infoRenewal.getJrlDepartment());
                thisOne.setJciStorefront(infoRenewal.getJrlStorefront());
                thisOne.setJciLandlordId(infoRenewal.getJrlLandlordId());
                thisOne.setJciRegisterPeople(infoRenewal.getJrlUserId());
                thisOne.setJciLandContId(infoRenewal.getJrlId());
                thisOne.setJciNature("应支");
                thisOne.setJciState("待付");
                thisOne.setJciType("房东租金");
                thisOne.setJciPeriods(periods);
                thisOne.setJciBeginPeriods(dateAddSub(effectiveBeginTime, addmonth));
                thisOne.setJciEndPeriods(dateAddSub(effectiveBeginTime, addmonth + paymentPeriods, -1));
                thisOne.setJciFukuanri(countDate(thisOne.getJciBeginPeriods(), 0, 0, -tiqiantianshu));
                JSONObject obj = new JSONObject();
                obj.accumulate("auditStatus", "未审核");
                thisOne.setJciAudit(obj.toString());
                thisOne.setJciMoney(beseMoney * paymentPeriods);
                // 修改房东合约，重新生成的账单，把上个月之前的账单设为“已付”，今日以后的设为“待付”
                int dayDiff = getDayDiff(thisOne.getJciBeginPeriods(), getLastMonthOneDay());
                // System.out.println("本期开始周期" + thisOne.getJciBeginPeriods());
                // System.out.println("上个月1号的日期：" + getLastMonthOneDay());
                // System.out.println("上个月1号 - 本期开始 = " + dayDiff + "天");
                if (dayDiff > 0) {
                    thisOne.setJciState("已付");
                }
                list.add(thisOne);// 将生成的数据放入List
                addmonth += paymentPeriods;// 自然年周期自增
                periods++;// 周期数增长
            }
            if (cyclesAndDays[1] != 0) {// 根据不满一期剩余天数生成账单
                InfoContractInstallment thisOne = new InfoContractInstallment();
                thisOne.setJciHouse4storeId(infoRenewal.getJrlHouse4storeId());
                thisOne.setJciDepartment(infoRenewal.getJrlDepartment());
                thisOne.setJciStorefront(infoRenewal.getJrlStorefront());
                thisOne.setJciLandlordId(infoRenewal.getJrlLandlordId());
                thisOne.setJciRegisterPeople(infoRenewal.getJrlUserId());
                thisOne.setJciLandContId(infoRenewal.getJrlId());
                thisOne.setJciNature("应支");
                thisOne.setJciState("待付");
                thisOne.setJciType("房东租金");
                thisOne.setJciPeriods(periods);
                //                thisOne.setJciBeginPeriods(dateAddSub(effectiveBeginTime, addmonth));
                //                thisOne.setJciEndPeriods(effectiveEndTime);
                //                thisOne.setJciFukuanri(countDate(thisOne.getJciBeginPeriods(), 0, 0, -tiqiantianshu));
                thisOne.setJciBeginPeriods(dateAddSub(effectiveBeginTime, addmonth));
                thisOne.setJciEndPeriods(effectiveEndTime);
                thisOne.setJciFukuanri(countDate(thisOne.getJciBeginPeriods(), 0, 0, -tiqiantianshu));
                JSONObject obj = new JSONObject();
                obj.accumulate("auditStatus", "未审核");
                thisOne.setJciAudit(obj.toString());
                int maxDays = 0;
                if (flag == 1) {
                    // 月付
                    maxDays = getMonthDays(dateAddSub(effectiveBeginTime,
                            addmonth));
                } else {
                    // 季付、半年、一年
                    maxDays = getDayDiff(
                            dateAddSub(effectiveBeginTime, addmonth),
                            dateAddSub(effectiveBeginTime, addmonth
                                    + paymentPeriods));
                }
                // 不满一周期时，计算当前天数在所在周期内所占的比例
                double x = ((double) cyclesAndDays[1]) / ((double) (maxDays));
                //double vaule = new BigDecimal(x).setScale(2,BigDecimal.ROUND_HALF_UP).doubleValue();
                //System.out.println("不满一期剩余天数：" + cyclesAndDays[1] + "  该期总天数："
                //		+ maxDays + " 新的： "+vaule+" 就得 ： "+vaule);
                // 不满一期剩余天数的金额
                double jciMoney = new BigDecimal(beseMoney * x * paymentPeriods).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
                jciMoney = new BigDecimal(jciMoney).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
                thisOne.setJciMoney(jciMoney);
                // 修改房东合约，重新生成的账单，把上个月之前的账单设为“已付”，今日以后的设为“待付”
                int dayDiff = getDayDiff(thisOne.getJciBeginPeriods(),
                        getLastMonthOneDay());
                // System.out.println("本期开始周期" + thisOne.getJciBeginPeriods());
                // System.out.println("上个月1号的日期：" + getLastMonthOneDay());
                // System.out.println("上个月1号 - 本期开始 = " + dayDiff + "天");
                if (dayDiff > 0) {
                    thisOne.setJciState("已付");
                }
                list.add(thisOne);// 将生成的数据放入List
                addmonth += paymentPeriods;// 自然年周期自增
                periods++;// 周期数增长
            }
            addmonth = 0;
        }
        //设置默认值
        for (InfoContractInstallment item : list) {
            item.setJciRead("未阅");
            item.setJciManageCost(0.00);
            item.setJciServerCost(0.00);
            item.setJciIfPrint("否");
            item.setJciImgNum("0/0");
        }
        return list;
    }

    /**
     * 处理租客合约分期账单表 contBegin 合约开始日期 contEnd 合约结束日期 way 缴费方式
     * <p>
     * 1.计算出时间差：x年y月z日 2.生成n期单月的账单 list n=12*x+y+((z>0)?1:0)，每期账单金额都为0
     * 3.按缴费方式计算原先各期账单的金额 以季付为例，缴费周期为3个月 整周期：m = n/3 剩余天数: remainder if (n%3 >
     * 0) {//最后一期不是整周期 lastBegin 最后一期的开始日期：开始日期 + m*3月 lastEnd 最后一期的结束日期：合约结束日期
     * remainder 剩余天数： lastEnd - lastBegin + 1
     * <p>
     * total 完整最后一期的总天数：e - b + 1 b 完整最后一期的开始日期：开始日期 + m*3月 e 完整最后一期的结束日期：开始日期 +
     * (m+1)*3月 - 1天 }
     * <p>
     * 填充每期账单的金额 填充整周期 for (int i=0;i<m;i++) { list[i * 3].money = zujin * 3 }
     * 填充非整周期（最后一期） if (remainder > 0) { list[m * 3].money = zujin * 3 *
     * (remainder / total) }
     *
     * @param rentCont 租客合约
     * @return 分期账单list
     * @throws Exception
     * @author wangchong
     */
    public static List<InfoContractInstallment> rentContractInstallment(InfoRenewalRenterExpand rentCont) throws Exception {
        DecimalFormat dft = new DecimalFormat("#.00");
        List<InfoContractInstallment> list = new ArrayList<InfoContractInstallment>();
        String contBegin = rentCont.getJrrBeginTime();// 合约开始日期
        String contEnd = rentCont.getJrrEndTime(); // 合约结束日期
        String way = rentCont.getJrrPaymentMethod(); // 租金缴费方式
        String manageWay = rentCont.getJrrManagePayment(); // 物管费缴费方式
        String serverWay = rentCont.getJrrServerPayment(); // 租赁服务费缴费方式
        Integer advanceMode = rentCont.getAdvanceMode(); //提前交租方式
        Integer numberMode = rentCont.getNumberMode();//本月、次月

        int cycle = 1; // 缴费方式对应的缴费周期，初始为1个月
        double zujin = rentCont.getJrrMoney(); // 租金
        Double wuguanfei = rentCont.getJrrManageCost();// 物管费
        if (wuguanfei == null) {
            wuguanfei = 0.0;
        }
        Double fuwufei = rentCont.getJrrServerCost();// 租赁服务费
        if (fuwufei == null) {
            fuwufei = 0.0;
        }

        // 1.计算出时间差：x年y月z日
        int[] rs = getYearMonthDay(contBegin, contEnd);
        if (contBegin.equals(contEnd)) {
            rs[0] = 0;
            rs[1] = 0;
            rs[2] = 1;
        }
        // 2.生成n期单月的账单 list n=12*x+y+((z>0)?1:0)，每期账单金额都为0
        int n = 12 * rs[0] + rs[1] + ((rs[2] > 0) ? 1 : 0);
        if (advanceMode == 2) {//整月账单会多出一期
            n = n + 1;
        }
        for (int i = 0; i < n; i++) {
            InfoContractInstallment item = new InfoContractInstallment();
            item.setJciRegisterPeople(rentCont.getJrrUserId());
            item.setJciHouse4rentId(rentCont.getJrrHouse4rentId());
            item.setJciHouse4storeId(rentCont.getJrrHouse4storeId());
            item.setJciDepartment(rentCont.getJrrDepartment());
            item.setJciStorefront(rentCont.getJrrStorefront());
            item.setJciLandlordId(rentCont.getJrrLandlordId());
            item.setJciRenterId(rentCont.getJrrRenterId());
            item.setJciRentContId(rentCont.getJrrId());
            if (advanceMode == 1) {//自然月开始时间
                item.setJciBeginPeriods(countDate(contBegin, 0, i, 0));
            } else {//整月开始时间
                item.setJciBeginPeriods(wholeMonthBillingCycle(contBegin, i, 1, ""));
                if (!isBefore(item.getJciBeginPeriods(), contEnd)) {//周期开始时间大于合约结束时间，则结束循环
                    break;
                }
            }
            if (i == 0) {
                item.setJciFukuanri(contBegin);
            } else {
                item.setJciFukuanri(judgementOfCollectionDate(advanceMode, item.getJciBeginPeriods(), rentCont.getJrrInAdvancePay(), contEnd, numberMode));//收款日
                if (i == n - 1) {
                    if (numberMode == 2) {
                        String fukuanri = item.getJciFukuanri().split("-")[0] + "-" + item.getJciFukuanri().split("-")[1] + "-" + rentCont.getJrrInAdvancePay();
                        item.setJciFukuanri(getFormatDate(fukuanri));
                    }
                }
            }
            if (advanceMode == 1) {//自然月结束时间
                item.setJciEndPeriods(countDate(contBegin, 0, i + 1, -1));
            } else {//整月结束时间
                item.setJciEndPeriods(wholeMonthBillingCycle(contBegin, i, 2, contEnd));
            }
            if (i == n - 1) {
                item.setJciEndPeriods(contEnd);
            }
            item.setJciPeriods(i + 1);
            item.setJciNature("应收");
            if (item.getJciPeriods() == 1) {
                item.setJciType("签约账单");
            } else {
                item.setJciType("租客租金");
            }
            item.setJciMoney(0.00);
            item.setJciManageCost(0.00);
            item.setJciServerCost(0.00);
            item.setJciState("待收");
            item.setJciRead("未阅");
            list.add(item);
        }
        // 3.按租金缴费方式计算原先各期账单的金额
        if ("月付".equals(way)) {
            cycle = 1;
        } else if ("季付".equals(way)) {
            cycle = 3;
        } else if ("半年付".equals(way)) {
            cycle = 6;
        } else if ("年付".equals(way)) {
            cycle = 12;
        }
        if (cycle == 1) {
            if (advanceMode == 1) {//自然月
                int remainder = 0;
                int total = 0;
                if (rs[2] > 0) {// 最后一期不是整周期
                    String lastBegin = countDate(contBegin, 0, (n - 1) * cycle, 0);//最后一期的开始时间
                    String lastEnd = contEnd;//最后一期的结束时间
                    remainder = countDay(lastBegin, lastEnd) + 1;//不满一月的天数
                    String totalBegin = countDate(contBegin, 0, (n - 1) * cycle, 0);
                    String totalEnd = countDate(contBegin, 0, n * cycle, -1);
                    total = countDay(totalBegin, totalEnd) + 1;//当月的总天数
                }
                for (int i = 0; i < n; i++) {
                    list.get(i * cycle).setJciMoney(zujin * cycle);
                    if (i == 0) {
                        if(null != rentCont.getExceptRentAndRefund())
                            list.get(i * cycle).setJciMoney(zujin * cycle + rentCont.getExceptRentAndRefund());
                    }
                }
                if (remainder > 0) {
                    double money = Double.parseDouble(dft.format(zujin * cycle * ((double) remainder / (double) total)));
                    list.get((n - 1) * cycle).setJciMoney(money);
                }
            } else if (advanceMode == 2) {//整月
                String beginTime = "";
                String endTime = "";
                String totalBegin = "";
                String totalEnd = "";
                int sumDay = 0;
                int totalDay = 0;
                double money = 0.0;
                for (int k = 0; k < list.size(); ++k) {
                    beginTime = list.get(k).getJciBeginPeriods();//开始时间
                    endTime = list.get(k).getJciEndPeriods();//结束时间
                    sumDay = countDay(beginTime, endTime) + 1;//周期天数
                    totalBegin = getFirstDayDateOfMonth(beginTime);//所在月第一天
                    totalEnd = getLastDayOfMonth(beginTime);//所在月最后一天
                    totalDay = countDay(totalBegin, totalEnd) + 1;//周期所在月的总天数
                    if (k == 0) {
                        if(null != rentCont.getExceptRentAndRefund()) {
                            money = Double.parseDouble(dft.format(zujin * cycle * ((double) sumDay / (double) totalDay) + rentCont.getExceptRentAndRefund()));
                        }else{
                            money = Double.parseDouble(dft.format(zujin * cycle * ((double) sumDay / (double) totalDay)));
                        }
                        list.get(k).setJciMoney(money);
                    } else {
                        money = Double.parseDouble(dft.format(zujin * cycle * ((double) sumDay / (double) totalDay)));
                        list.get(k).setJciMoney(money);
                    }
                }
            }
        } else {
            if (advanceMode == 1) {//自然季，半年，整年
                int m = n / cycle;
                int remainder = 0;
                int total = 0;
                if (n % cycle > 0) {// 最后一期不是整周期
                    String lastBegin = countDate(contBegin, 0, m * cycle, 0);
                    String lastEnd = contEnd;
                    remainder = countDay(lastBegin, lastEnd) + 1;
                    String totalBegin = countDate(contBegin, 0, m * cycle, 0);
                    String totalEnd = countDate(contBegin, 0, (m + 1) * cycle, -1);
                    total = countDay(totalBegin, totalEnd) + 1;
                }
                for (int i = 0; i < m; i++) {
                    if (i == 0) {
                        if(null != rentCont.getExceptRentAndRefund()) {
                            list.get(i * cycle).setJciMoney(zujin * cycle + rentCont.getExceptRentAndRefund());
                        }else{
                            list.get(i * cycle).setJciMoney(zujin * cycle);
                        }
                    } else {
                        list.get(i * cycle).setJciMoney(zujin * cycle);
                    }
                }
                if (remainder > 0) {
                    double money = Double.parseDouble(dft.format(zujin * cycle * ((double) remainder / (double) total)));
                    list.get(m * cycle).setJciMoney(money);
                }
            } else if (advanceMode == 2) {//整季，半年，年
                String beginTime = "";
                String endTime = "";
                String totalBegin = "";
                String totalEnd = "";
                int sumDay = 0;
                int totalDay = 0;
                double money = 0.0;
                int quaternaryNumber = list.size() / cycle + (list.size() % cycle > 0 ? 1 : 0);//有多少季
                for (int k = 0; k < quaternaryNumber; ++k) {
                    beginTime = list.get(k * cycle).getJciBeginPeriods();//开始时间
                    if (k == (quaternaryNumber - 1)) {//结束时间
                        endTime = list.get(list.size() - 1).getJciEndPeriods();
                    } else {
                        endTime = list.get(k * cycle + cycle - 1).getJciEndPeriods();
                    }
                    sumDay = countDay(beginTime, endTime) + 1 ;//周期天数
                    System.out.println(sumDay);
                    totalBegin = getFirstDayDateOfMonth(beginTime);
                    if (k == (quaternaryNumber - 1)) {
                        String totalTime = monthOfMonthPlusAndMinus(beginTime, cycle - 1);
                        totalEnd = getLastDayOfMonth(totalTime);
                    } else {
                        totalEnd = getLastDayOfMonth(endTime);
                    }
                    totalDay = countDay(totalBegin, totalEnd) + 1;//周期所在的总天数
                    System.out.print(totalDay);
                    if (k == 0) {
                        if(null != rentCont.getExceptRentAndRefund()) {
                            money = Double.parseDouble(dft.format(zujin * cycle * ((double) sumDay / (double) totalDay) + rentCont.getExceptRentAndRefund()));
                        }else{
                            money = Double.parseDouble(dft.format(zujin * cycle * ((double) sumDay / (double) totalDay)));
                        }
                        list.get(k * cycle).setJciMoney(money);
                    } else {
                        money = Double.parseDouble(dft.format(zujin * cycle * ((double) sumDay / (double) totalDay)));
                        list.get(k * cycle).setJciMoney(money);
                    }
                }
            }
        }
        // 4.按物管费缴费方式计算原先各期账单的金额
        if ("月付".equals(manageWay)) {
            cycle = 1;
        } else if ("季付".equals(manageWay)) {
            cycle = 3;
        } else if ("半年付".equals(manageWay)) {
            cycle = 6;
        } else if ("年付".equals(manageWay)) {
            cycle = 12;
        }
        if (cycle == 1) {
            if (advanceMode == 1) {//自然月
                int remainder = 0;
                int total = 0;
                if (rs[2] > 0) {// 最后一期不是整周期
                    String lastBegin = countDate(contBegin, 0, (n - 1) * cycle, 0);
                    String lastEnd = contEnd;
                    remainder = countDay(lastBegin, lastEnd) + 1;
                    String totalBegin = countDate(contBegin, 0, (n - 1) * cycle, 0);
                    String totalEnd = countDate(contBegin, 0, n * cycle, -1);
                    total = countDay(totalBegin, totalEnd) + 1;
                }
                for (int i = 0; i < n; i++) {
                    list.get(i * cycle).setJciManageCost(wuguanfei * cycle);
                }
                if (remainder > 0) {
                    double money = Double.parseDouble(dft.format(wuguanfei * cycle * ((double) remainder / (double) total)));
                    list.get((n - 1) * cycle).setJciManageCost(money);
                }
            } else if (advanceMode == 2) {//整月
                String beginTime = "";
                String endTime = "";
                String totalBegin = "";
                String totalEnd = "";
                int sumDay = 0;
                int totalDay = 0;
                double money = 0.0;
                for (int k = 0; k < list.size(); ++k) {
                    beginTime = list.get(k).getJciBeginPeriods();//开始时间
                    endTime = list.get(k).getJciEndPeriods();//结束时间
                    sumDay = countDay(beginTime, endTime) + 1;//周期天数
                    totalBegin = getFirstDayDateOfMonth(beginTime);//周期第一天
                    totalEnd = getLastDayOfMonth(beginTime);//周期最后一天
                    totalDay = countDay(totalBegin, totalEnd) + 1;//周期所在月的总天数
                    money = Double.parseDouble(dft.format(wuguanfei * cycle * ((double) sumDay / (double) totalDay)));
                    list.get(k).setJciManageCost(money);
                }
            }
        } else {
            if (advanceMode == 1) {//自然季，半年，年
                int m = n / cycle;
                int remainder = 0;
                int total = 0;
                if (n % cycle > 0) {// 最后一期不是整周期
                    String lastBegin = countDate(contBegin, 0, m * cycle, 0);
                    String lastEnd = contEnd;
                    remainder = countDay(lastBegin, lastEnd) + 1;
                    String totalBegin = countDate(contBegin, 0, m * cycle, 0);
                    String totalEnd = countDate(contBegin, 0, (m + 1) * cycle, -1);
                    total = countDay(totalBegin, totalEnd) + 1;
                }
                for (int i = 0; i < m; i++) {
                    list.get(i * cycle).setJciManageCost(wuguanfei * cycle);
                }
                if (remainder > 0) {
                    double money = Double.parseDouble(dft.format(wuguanfei * cycle * ((double) remainder / (double) total)));
                    list.get(m * cycle).setJciManageCost(money);
                }
            } else if (advanceMode == 2) {//整季，半年，年
                String beginTime = "";
                String endTime = "";
                String totalBegin = "";
                String totalEnd = "";
                int sumDay = 0;
                int totalDay = 0;
                double money = 0.0;
                int quaternaryNumber = list.size() / cycle + (list.size() % cycle > 0 ? 1 : 0);//有多少季
                for (int k = 0; k < quaternaryNumber; ++k) {
                    beginTime = list.get(k * cycle).getJciBeginPeriods();//开始时间
                    if (k == (quaternaryNumber - 1)) {//结束时间
                        endTime = list.get(list.size() - 1).getJciEndPeriods();
                    } else {
                        endTime = list.get(k * cycle + cycle - 1).getJciEndPeriods();
                    }
                    sumDay = countDay(beginTime, endTime) + 1;//周期天数
                    totalBegin = getFirstDayDateOfMonth(beginTime);
                    if (k == (quaternaryNumber - 1)) {
                        String totalTime = monthOfMonthPlusAndMinus(beginTime, cycle - 1);
                        totalEnd = getLastDayOfMonth(totalTime);
                    } else {
                        totalEnd = getLastDayOfMonth(endTime);
                    }
                    totalDay = countDay(totalBegin, totalEnd) + 1;//周期所在的总天数
                    money = Double.parseDouble(dft.format(wuguanfei * cycle * ((double) sumDay / (double) totalDay)));
                    list.get(k * cycle).setJciManageCost(money);
                }
            }
        }
        // 5.按租赁服务费缴费方式计算原先各期账单的金额
        if ("月付".equals(serverWay)) {
            cycle = 1;
        } else if ("季付".equals(serverWay)) {
            cycle = 3;
        } else if ("半年付".equals(serverWay)) {
            cycle = 6;
        } else if ("年付".equals(serverWay)) {
            cycle = 12;
        }
        if (cycle == 1) {
            if (advanceMode == 1) {//自然月
                int remainder = 0;
                int total = 0;
                if (rs[2] > 0) {// 最后一期不是整周期
                    String lastBegin = countDate(contBegin, 0, (n - 1) * cycle, 0);
                    String lastEnd = contEnd;
                    remainder = countDay(lastBegin, lastEnd) + 1;
                    String totalBegin = countDate(contBegin, 0, (n - 1) * cycle, 0);
                    String totalEnd = countDate(contBegin, 0, n * cycle, -1);
                    total = countDay(totalBegin, totalEnd) + 1;
                }
                for (int i = 0; i < n; i++) {
                    list.get(i * cycle).setJciServerCost(fuwufei * cycle);
                }
                if (remainder > 0) {
                    double money = Double.parseDouble(dft.format(fuwufei * cycle * ((double) remainder / (double) total)));
                    list.get((n - 1) * cycle).setJciServerCost(money);
                }
            } else if (advanceMode == 2) {//整月
                String beginTime = "";
                String endTime = "";
                String totalBegin = "";
                String totalEnd = "";
                int sumDay = 0;
                int totalDay = 0;
                double money = 0.0;
                for (int k = 0; k < list.size(); ++k) {
                    beginTime = list.get(k).getJciBeginPeriods();//开始时间
                    endTime = list.get(k).getJciEndPeriods();//结束时间
                    sumDay = countDay(beginTime, endTime) + 1;//周期天数
                    totalBegin = getFirstDayDateOfMonth(beginTime);
                    totalEnd = getLastDayOfMonth(beginTime);
                    totalDay = countDay(totalBegin, totalEnd) + 1;//周期所在月的总天数
                    money = Double.parseDouble(dft.format(fuwufei * cycle * ((double) sumDay / (double) totalDay)));
                    list.get(k).setJciServerCost(money);
                }
            }
        } else {
            if (advanceMode == 1) {//自然季，半年，年
                int m = n / cycle;
                int remainder = 0;
                int total = 0;
                if (n % cycle > 0) {// 最后一期不是整周期
                    String lastBegin = countDate(contBegin, 0, m * cycle, 0);
                    String lastEnd = contEnd;
                    remainder = countDay(lastBegin, lastEnd) + 1;
                    String totalBegin = countDate(contBegin, 0, m * cycle, 0);
                    String totalEnd = countDate(contBegin, 0, (m + 1) * cycle, -1);
                    total = countDay(totalBegin, totalEnd) + 1;
                }
                for (int i = 0; i < m; i++) {
                    list.get(i * cycle).setJciServerCost(fuwufei * cycle);
                }
                if (remainder > 0) {
                    double money = Double.parseDouble(dft.format(fuwufei * cycle * ((double) remainder / (double) total)));
                    list.get(m * cycle).setJciServerCost(money);
                }
            } else if (advanceMode == 2) {//整季，半年，年
                String beginTime = "";
                String endTime = "";
                String totalBegin = "";
                String totalEnd = "";
                int sumDay = 0;
                int totalDay = 0;
                double money = 0.0;
                int quaternaryNumber = list.size() / cycle + (list.size() % cycle > 0 ? 1 : 0);//有多少季
                for (int k = 0; k < quaternaryNumber; ++k) {
                    beginTime = list.get(k * cycle).getJciBeginPeriods();//开始时间
                    if (k == (quaternaryNumber - 1)) {//结束时间
                        endTime = list.get(list.size() - 1).getJciEndPeriods();
                    } else {
                        endTime = list.get(k * cycle + cycle - 1).getJciEndPeriods();
                    }
                    sumDay = countDay(beginTime, endTime) + 1;//周期天数
                    totalBegin = getFirstDayDateOfMonth(beginTime);
                    if (k == (quaternaryNumber - 1)) {
                        String totalTime = monthOfMonthPlusAndMinus(beginTime, cycle - 1);
                        totalEnd = getLastDayOfMonth(totalTime);
                    } else {
                        totalEnd = getLastDayOfMonth(endTime);
                    }
                    totalDay = countDay(totalBegin, totalEnd) + 1;//周期所在的总天数
                    money = Double.parseDouble(dft.format(fuwufei * cycle * ((double) sumDay / (double) totalDay)));
                    list.get(k * cycle).setJciServerCost(money);
                }
            }
        }
        updateInstallmentState(list);
        //设置默认值
        /*for(InfoContractInstallment item : list){
            item.setJciRead("未阅");
            item.setJciManageCost(0.00);
            item.setJciServerCost(0.00);
            item.setJciIfPrint("否");
            item.setJciImgNum("0/0");
        }*/
        // updatePaymentVoucher(list, rentCont.getJrrPaymentVoucher());
        return list;
    }

    /**
     * 修改分期账单状态 房东分期账单：上个月之前的账单设为"已付"，之后的设为"待付" 租客分期账单：上上个月之前的账单设为"已收"，之后的设为"待收"
     *
     * @param list
     * @return
     * @throws Exception
     * @author wangchong
     */
    public static List<InfoContractInstallment> updateInstallmentState(
            List<InfoContractInstallment> list) throws Exception {
        for (InfoContractInstallment item : list) {
            if ("房东租金".equals(item.getJciType())) {
                int days = countDay(item.getJciBeginPeriods(),
                        getLastMonthOneDay());
                if (days > 0) {
                    item.setJciState("已付");
                }
            }
//            if ("租客租金".equals(item.getJciType())||"签约账单".equals(item.getJciType())) {
//                int days = countDay(item.getJciBeginPeriods(),
//                        getLastLastMonthOneDay());
//                if (days > 0) {
//                    item.setJciState("已收");
//                }
//            }
        }
        return list;
    }

    /**
     * 更新分期账单的付款凭证
     *
     * @param list
     * @param paymentVoucher
     * @return
     * @author wangchong
     */
    public static List<InfoContractInstallment> updatePaymentVoucher(
            List<InfoContractInstallment> list, String paymentVoucher) {
        System.out.println("\n\n更新分期账单的付款凭证\n\n");
        System.out.println(paymentVoucher);
        if (paymentVoucher == null || paymentVoucher.equals("")) {
            return list;
        }
        JSONArray paymentVouchers = JSONArray.fromObject("[" + paymentVoucher
                + "]");
        for (Object obj : paymentVouchers) {
            JSONObject jsonObject = JSONObject.fromObject(obj.toString());
            Integer contPeriod = (Integer) jsonObject.get("period");
            for (InfoContractInstallment item : list) {
                int insPeriod = item.getJciPeriods();
                if (contPeriod == insPeriod) {
                    if (item.getJciPaymentVoucher() == null) {
                        item.setJciPaymentVoucher(obj.toString());
                    } else {
                        item.setJciPaymentVoucher(item.getJciPaymentVoucher()
                                + "," + obj.toString());
                    }
                }
            }
        }
        return list;
    }

    /**
     * 根据两个日期获取合约整期数、剩余不满一期的天数
     *
     * @param startDate
     * @param endDate
     * @param flag
     * @return
     * @throws ParseException
     */
    public static int[] getCyclesAndDays(String startDate, String endDate, int flag) throws ParseException {
        int[] arr = new int[2];
        int monthday = 0;
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate1 = fmt.parse(startDate);
        Calendar starCal = Calendar.getInstance();
        starCal.setTime(startDate1);
        int sYear = starCal.get(Calendar.YEAR);
        int sMonth = starCal.get(Calendar.MONTH);
        int sDay = starCal.get(Calendar.DAY_OF_MONTH);
        Date endDate1 = fmt.parse(endDate);
        Calendar endCal = Calendar.getInstance();
        endCal.setTime(endDate1);
        int eYear = endCal.get(Calendar.YEAR);
        int eMonth = endCal.get(Calendar.MONTH);
        int eDay = endCal.get(Calendar.DAY_OF_MONTH);
        // 算出合约期内的总月数
        monthday = ((eYear - sYear) * 12 + (eMonth - sMonth));
        System.out.println("===================="+monthday);
        // 如果开始日期为一个月的第一天，结束日期是一个月的最后一天，则总月数加一（05.01~06.30）
        if (starCal.getActualMinimum(Calendar.DAY_OF_MONTH) == sDay
                && endCal.getActualMaximum(Calendar.DAY_OF_MONTH) == eDay) {
            monthday += 1;
        }
        // 账单
        if (flag == 1) {// 月付
            if (sDay < eDay) {
                arr[0] = monthday;
                // 给开始的日期进行月份的加减获取新的结束日期
                String newDate = dateAddSub(startDate, arr[0]);
                // 获取剩余的天数
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else if (sDay > eDay) {
                arr[0] = monthday - 1;
                String newDate = dateAddSub(startDate, arr[0]);
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else {
                arr[0] = monthday;
                arr[1] = 1;
            }
        } else if (flag == 2) {// 季付
            if (sDay <= eDay) {
                arr[0] = monthday / 3;
                String newDate = dateAddSub(startDate, arr[0] * 3);
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else if (sDay > eDay) {
                arr[0] = (monthday - 1) / 3;
                String newDate = dateAddSub(startDate, arr[0] * 3);
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else {
                System.out.println("________________"+monthday);
                arr[0] = monthday;
                arr[1] = 1;
            }
        } else if (flag == 3) {// 半年付
            if (sDay <= eDay) {
                arr[0] = monthday / 6;
                String newDate = dateAddSub(startDate, arr[0] * 6);
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else if (sDay > eDay) {
                arr[0] = (monthday - 1) / 6;
                String newDate = dateAddSub(startDate, arr[0] * 6);
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else {
                arr[0] = monthday;
                arr[1] = 1;
            }
        } else if (flag == 4) {// 年付
            if (sDay <= eDay) {
                arr[0] = monthday / 12;
                String newDate = dateAddSub(startDate, arr[0] * 12);
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else if (sDay > eDay) {
                arr[0] = (monthday - 1) / 12;
                String newDate = dateAddSub(startDate, arr[0] * 12);
                arr[1] = getDayDiff(newDate, endDate) + 1;
            } else {
                arr[0] = monthday;
                arr[1] = 1;
            }
        } else {
            arr[0] = 0;
            arr[1] = 0;
        }
        System.out.println("arr[0]:" + arr[0]);
        System.out.println("arr[1]:" + arr[1]);
        return arr;
    }

    // ********************************** 时间获取以及时间计算、转换 等函数
    // *******************************************************

    /**
     * 获取上上个月一号的日期
     *
     * @return "2018-01-01"
     */
    public static String getLastLastMonthOneDay() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -2);
        calendar.set(Calendar.DATE, 1);
        Date date = calendar.getTime();
        return sdf.format(date);
    }

    /**
     * 获取今天的日期
     *
     * @return "2018-01-01"
     */
    public static String getToday() {
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        return fmt.format(date);
    }

    /**
     * 获取两个日期的天数差值
     *
     * @param startDate
     * @param endDate
     * @return
     * @throws ParseException
     */
    public static int getDayDiff(String startDate, String endDate)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(startDate));
        long time1 = cal.getTimeInMillis();
        cal.setTime(sdf.parse(endDate));
        long time2 = cal.getTimeInMillis();
        long between_days = (time2 - time1) / (1000 * 3600 * 24);
        int days = Integer.parseInt(String.valueOf(between_days));
        return days;
    }

    /**
     * 对给定日期进行年份加减，返回新日期
     *
     * @param date
     * @param nums
     * @return
     * @throws ParseException
     */
    public static String yearAddSub(String date, int nums)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dt = sdf.parse(date);
        Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(dt);

        rightNow.add(Calendar.YEAR, nums);
        Date dt1 = rightNow.getTime();
        String reStr = sdf.format(dt1);

        return reStr;
    }

    /**
     * 对给定日期进行月份加减，返回新日期
     *
     * @param date
     * @param months
     * @return
     * @throws ParseException
     */
    public static String dateAddSub(String date, int months)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dt = sdf.parse(date);
        Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(dt);

        rightNow.add(Calendar.MONTH, months);
        Date dt1 = rightNow.getTime();
        String reStr = sdf.format(dt1);
        return reStr;
    }

    /**
     * 对给定日期进行月、日加减，返回新日期
     *
     * @param date
     * @param months
     * @param days
     * @return
     * @throws ParseException
     */
    public static String dateAddSub(String date, int months, int days)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dt = sdf.parse(date);
        Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(dt);

        rightNow.add(Calendar.MONTH, months);
        rightNow.add(Calendar.DAY_OF_MONTH, days);
        Date dt1 = rightNow.getTime();
        String reStr = sdf.format(dt1);
        return reStr;
    }

    /**
     * 对给定日期进行年、月、日加减，返回新日期
     *
     * @param date
     * @param years
     * @param months
     * @param days
     * @return
     * @throws ParseException
     */
    public static String dateAddSub(String date, int years, int months, int days)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dt = sdf.parse(date);
        Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(dt);
        rightNow.add(Calendar.YEAR, years);
        rightNow.add(Calendar.MONTH, months);
        rightNow.add(Calendar.DAY_OF_MONTH, days);
        Date dt1 = rightNow.getTime();
        String reStr = sdf.format(dt1);
        return reStr;
    }

    /**
     * 对给定日期进行天数加减，返回新日期
     *
     * @param date
     * @param nums
     * @return
     * @throws ParseException
     */
    public static String dayAddSub(String date, int nums) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dt = sdf.parse(date);
        Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(dt);

        rightNow.add(Calendar.DAY_OF_MONTH, nums);
        Date dt1 = rightNow.getTime();
        String reStr = sdf.format(dt1);

        return reStr;
    }

    /**
     * 判断时间字符串格式是否正确
     *
     * @param date
     * @return
     */
    public static boolean juDate(String date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date dt = sdf.parse(date);
        } catch (ParseException e) {
            return false;
        }
        return true;
    }

    /**
     * 计算date中月份的最大天数
     *
     * @param date
     * @return
     */
    public static int getMonthDays(String date) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
        calendar.set(Calendar.MONTH, Integer.parseInt(date.substring(5, 7)) - 1);
        int maxDay = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
        return maxDay;
    }

    /**
     * 获取上个月一号的日期
     *
     * @return
     */
    public static String getLastMonthOneDay() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -1);
        calendar.set(Calendar.DATE, 1);
        Date d = calendar.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String dateNowStr = sdf.format(d);
        return dateNowStr;
    }

    /**
     * 月份的加减
     *
     * @param startData
     * @param num
     * @return
     * @throws ParseException
     */
    public static String getmonth(String startData, int num)
            throws ParseException {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date dt = sd.parse(startData);
        Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(dt);
        rightNow.add(Calendar.MONTH, num);// 日期加12个月
        rightNow.add(Calendar.DAY_OF_YEAR, -1);
        Date dt1 = rightNow.getTime();
        String reStr = sd.format(dt1);
        // System.out.println(reStr);
        return reStr;
    }

    /**
     * 日期格式转换YYYY/MM/DD -> YYYY-MM-DD
     *
     * @param date
     * @return
     */
    public static String changeDateFormat(String date) {
        StringBuffer buff = new StringBuffer();
        String[] src = {};
        if (date.split("-").length == 3) {
            return date;
        } else if (date.split("_").length == 3) {
            src = date.split("_");
        } else if (date.split("/").length == 3) {
            src = date.split("/");
        } else {
            return "2050-01-01";
        }
        for (int i = 0; i < src.length; ++i) {
            if (i == 0) {
                if (src[i].length() != 4) {
                    return "2050-01-01";
                }
                buff.append(src[i] + "-");
            } else if (i == 1) {
                if (src[i].length() == 1) {
                    buff.append("0" + src[i] + "-");
                    continue;
                }
                buff.append(src[i] + "-");
            } else {
                if (src[i].length() == 1) {
                    buff.append("0" + src[i]);
                    continue;
                }
                buff.append(src[i]);
            }
        }
        return buff.toString();
    }

    /**
     * 两个日期之间有几年几月几日 实现逻辑：
     * 方法名 计算年月日(开始日期，结束日期){
     * y = 1
     * while((开始日期 + y年 - 1天) <= 结束日期 ) {
     * y++
     * }
     * y--
     * <p>
     * m = 1
     * while( (开始日期 + y年 + m月 - 1天) <= 结束日期 ){
     * m++
     * }
     * m--
     * <p>
     * d = 1
     * while( (开始日期 + y年 + m月 + d天 - 1天) <= 结束日期 ){
     * d++
     * }
     * d--
     * <p>
     * return y年m月d日
     * }
     *
     * @param beginDate "yyyy-MM-dd"
     * @param endDate   "yyyy-MM-dd"
     * @return [year, month, day]
     * @throws ParseException
     * @author wangchong
     */
    public static int[] getYearMonthDay(String beginDate, String endDate)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar begin = Calendar.getInstance();
        Calendar end = Calendar.getInstance();
        Calendar date = Calendar.getInstance();
        begin.setTime(sdf.parse(beginDate));
        end.setTime(sdf.parse(endDate));
        if (begin.compareTo(end) >= 0) {
            int[] result = {0, 0, 0};
            return result;
        }

        int y = 0;
        do {
            date.setTime(sdf.parse(beginDate));
            date.add(Calendar.YEAR, ++y);
            date.add(Calendar.DATE, -1);
        } while (date.compareTo(end) <= 0);
        y--;

        int m = 0;
        do {
            date.setTime(sdf.parse(beginDate));
            date.add(Calendar.YEAR, y);
            date.add(Calendar.MONTH, ++m);
            date.add(Calendar.DATE, -1);
        } while (date.compareTo(end) <= 0);
        m--;

        int d = 0;
        do {
            date.setTime(sdf.parse(beginDate));
            date.add(Calendar.YEAR, y);
            date.add(Calendar.MONTH, m);
            date.add(Calendar.DATE, ++d);
            date.add(Calendar.DATE, -1);
        } while (date.compareTo(end) <= 0);
        d--;

        int[] result = {y, m, d};
        System.out.println("两个日期之间有" + y + "年" + m + "月" + d + "日");
        return result;
    }


    /**
     * 获取当月的第一天和最后一天
     *
     * @return
     */
    public static String getCurrentMonthTime() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        // 当月的第一天
        c.set(Calendar.DAY_OF_MONTH, 1);// 设置为1号,当前日期既为本月第一天
        String first = df.format(c.getTime());
        // 当月的最后一天
        c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
        String last = df.format(c.getTime());
        return first + "###" + last;
    }

    /**
     * 获取系统当前日期时间，精确到秒（年 月 日 时 分 秒）
     *
     * @return dateNowStr
     */
    public static String getCurrentDateSecond() {
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateNowStr = sdf.format(d);
        return dateNowStr;
    }

    /**
     * 获取系统当前日期时间，精确到日（年 月 日）
     *
     * @return dateNowStr
     */
    public static String getCurrentDate() {
        Date d = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String dateNowStr = sdf.format(d);
        return dateNowStr;
    }

    /**
     * 对日期进行年、月、日加减，返回新的日期字符串
     *
     * @param date  "2018-01-01"
     * @param year
     * @param month
     * @param day
     * @return "2018-01-01"
     * @throws ParseException
     * @author wangchong
     */
    public static String countDate(String date, int year, int month, int day)
            throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(date));
        cal.add(Calendar.YEAR, year);
        cal.add(Calendar.MONTH, month);
        cal.add(Calendar.DATE, day);
        return sdf.format(cal.getTime());
    }

    /**
     * 计算两个日期间的天数
     *
     * @param begin "2018-01-01"
     * @param end   "2018-01-01"
     * @return 天数
     * @throws ParseException
     * @author wangchong
     */
    public static int countDay(String begin, String end) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(begin));
        long beginMillis = cal.getTimeInMillis();
        cal.setTime(sdf.parse(end));
        long endMillis = cal.getTimeInMillis();
        return (int) ((endMillis - beginMillis) / (1000 * 3600 * 24));
    }
    /**
     * 比较两个时间的大小
     *
     * @param begin
     * @param end
     * @return
     * @throws ParseException
     */
    public static boolean isBefore(String begin, String end) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date bt = sdf.parse(begin);
        Date et = sdf.parse(end);
        return bt.before(et);
    }

    /**
     * 已租收款日期判断及获取
     * 首先判断 自然月 整月
     * 收款日期，需要判断大小月，收款日在当月中有或是没有，又则取所填日期，没有则取当月的最后一天日期。
     *
     * @throws ParseException
     */
    public static String judgementOfCollectionDate(Integer type, String date, Integer day, String contEnd, Integer numberMode) throws ParseException {
        String strDate = "";
        String beginDate = "";
        //判断是否是自然月
        if (type == 1) {//自然月
            //首先判断是否跨月（如所填号为 1 号，开始周期为 8月2号 以后）
            Integer beginTime = Integer.parseInt(date.split("-")[2]);
            if (day >= beginTime) {//大于周期开始日
                beginDate = date;
            } else {//小于周期开始日，跨月（如周期8月2号开始，所填为1号，账单周期为08.02-09.01，收款日为 09.01）
                beginDate = monthOfMonthPlusAndMinus(date, 1);//跨月的时间
            }
            String januaryEndDate = getLastDayOfMonth(beginDate);//获取传入日期所在月的最后一天
            Integer endNumble = Integer.parseInt(januaryEndDate.split("-")[2]);
            if (day > endNumble) {//大于传入日期所在月的最后一天
                strDate = januaryEndDate;
            } else {//小于或等于传入日期所在月的最后一天
                strDate = januaryEndDate.split("-")[0] + "-" + januaryEndDate.split("-")[1] + "-" + day;
                if (!isBefore(strDate, contEnd)) {
                    strDate = date;
                    if (numberMode == 2) {
                        strDate = monthOfMonthPlusAndMinus(strDate, 1);
                    }
                }
            }
        } else {//整月,不存在跨月问题
            Integer beginTime = Integer.parseInt(date.split("-")[2]);
            if (day >= beginTime) {//大于周期开始日
                beginDate = date;
                String januaryEndDate = getLastDayOfMonth(beginDate);//获取传入日期所在月的最后一天
                Integer endNumble = Integer.parseInt(januaryEndDate.split("-")[2]);
                if (day > endNumble) {//大于传入日期所在月的最后一天
                    strDate = januaryEndDate;
                } else {//小于或等于传入日期所在月的最后一天
                    strDate = januaryEndDate.split("-")[0] + "-" + januaryEndDate.split("-")[1] + "-" + day;
                    if (!isBefore(strDate, contEnd)) {
                        strDate = date;
                    }
                }
            } else {//小于周期开始日 （如账单周期 08.20-08.31，所填为 19号则直接用账单周期开始时间）
                strDate = date;
            }
        }
        if (numberMode == 2) {
            strDate = monthOfMonthPlusAndMinus(strDate, -1);//提前收租
        }
        return getFormatDate(strDate);
    }

    /**
     * 整月账单一期的开始结束日期
     *
     * @param date
     * @param num
     * @param type
     * @return
     * @throws ParseException
     */
    public static String wholeMonthBillingCycle(String date, int num, int type, String contEnd) throws ParseException {
        String strDate = "";
        date = monthOfMonthPlusAndMinus(date, num);//月份加减
        if (type == 1) {//周期开始
            if (num == 0) {
                strDate = date;
            } else {
                strDate = getFirstDayDateOfMonth(date);
            }
        } else if (type == 2) {//周期结束
            strDate = getLastDayOfMonth(date);
            if (!isBefore(strDate, contEnd)) {
                strDate = contEnd;
            }
        }
        return strDate;
    }

    /**
     * 获取传入日期所在月的最后一天
     *
     * @param date
     * @return
     * @throws ParseException
     */
    public static String getLastDayOfMonth(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        final Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(date));
        final int last = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        cal.set(Calendar.DAY_OF_MONTH, last);
        return sdf.format(cal.getTime());
    }

    /**
     * 获取传入日期所在月的第一天
     *
     * @param date
     * @return
     * @throws ParseException
     */
    public static String getFirstDayDateOfMonth(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        final Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(date));
        final int last = cal.getActualMinimum(Calendar.DAY_OF_MONTH);
        cal.set(Calendar.DAY_OF_MONTH, last);
        return sdf.format(cal.getTime());
    }

    /**
     * 传入日期的月份加减
     *
     * @param date
     * @param num
     * @return
     * @throws ParseException
     */
    public static String monthOfMonthPlusAndMinus(String date, int num) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(date));
        cal.add(Calendar.MONTH, num);
        return sdf.format(cal.getTime());
    }

    /**
     * 格式化日期
     *
     * @param date
     * @return
     * @throws ParseException
     */
    public static String getFormatDate(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.setTime(sdf.parse(date));
        return sdf.format(cal.getTime());
    }

    /**
     * 获取某字符在字符串中第几次出现的位置
     *
     * @param string 字符串
     * @param i      第i次出现
     * @param str    子字符串
     * @return
     */
    public static int getIndex(String string, int i, String str) {
        //这里是获取"/"符号第三次出现的下标
//        Matcher slashMatcher = Pattern.compile("/").matcher(string);
        Matcher slashMatcher = Pattern.compile(str).matcher(string);
        int mIdx = 0;//匹配到的次数
        while (slashMatcher.find()) {
            mIdx++;
            //当"/"符号第三次出现的位置
            if (mIdx == i) {
                break;
            }
        }
        int index = -1;
        try {
            index = slashMatcher.start();
        } catch (Exception e) {

        }
        return index;
    }

    public static void main(String args[]) throws Exception {
//		System.out.println(isBefore("2018-02-12","2018-02-13"));
//		judgementOfCollectionDate(1, "2018-02-12", 10, "2018-02-11");
//		double f = 1254.326584;
//		DecimalFormat df = new DecimalFormat("#.00");
//		double money = Double.parseDouble(df.format(f * 2 * ((double) 12 / (double) 31)));
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		Calendar cal = Calendar.getInstance();
//		cal.setTime(sdf.parse("2018-08-1"));
//        System.out.println(sdf.format(cal.getTime()));  
        try {
            int[] s = getYearMonthDay("2018-08-01", "2018-08-01");
            System.out.println(s[0]);
            System.out.println(s[1]);
            System.out.println(s[2]);
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        }
    }
}
