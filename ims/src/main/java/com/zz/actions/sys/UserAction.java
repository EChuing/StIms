package com.zz.actions.sys;

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
import com.zz.other.Syslog;
import com.zz.po.sys.SysHouseDictExpand;
import com.zz.po.sys.SysUser;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.sys.HouseDictService;
import com.zz.service.sys.UserService;
import com.zz.util.MySqlSessionFactory;
import org.apache.ibatis.session.SqlSession;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.json.JSONUtil;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserAction extends BaseAction implements ModelDriven<SysUserExpand> {

    private SysUserExpand sysUserExpand;
    private UserService userService;
    private HouseDictService houseDictService;



    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    public void setHouseDictService(HouseDictService houseDictService) {
        this.houseDictService = houseDictService;
    }

    @Override
    public SysUserExpand getModel() {
        if (sysUserExpand == null) {
            sysUserExpand = new SysUserExpand();
        }
        return sysUserExpand;
    }

    //查询用户是否冻结
    public String checkSuFrozenUser(){
        try {
            HttpSession session = ServletActionContext.getRequest().getSession();
            SysUserExpand su = (SysUserExpand) session.getAttribute("userinfo");
            SysUserExpand users = userService.selectById(su);
            Integer sufrozen = users.getSuFrozen();
            String strJson =JSON.toJSONString(sufrozen, SerializerFeature.WriteMapNullValue);
            if (users!=null){
                printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", strJson));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查到数据", null));;
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //修改User表中suFrozen 0：冻结 1：不冻结
    //参数 每次修改-1   每次保存+1
    public String updateSuFollowupValueUser(){
        try {
            //配置Strust 调用server修改User Frozen 返回int修改结果
            HttpSession session = ServletActionContext.getRequest().getSession();
            SysUserExpand su = (SysUserExpand) session.getAttribute("userinfo");
            su=userService.selectById(su);
            su.setSuFollowupValue(su.getSuFollowupValue()+sysUserExpand.getSuFollowupValue());
            //如果减到0则设置suFrozen冻结0
            if(su.getSuFollowupValue()==0){
                su.setSuFrozen(0);
            }
            if(su.getSuFollowupValue()>0){
                su.setSuFrozen(1);
            }
            //判断返回int类型是否成功 1成功 0失败
            Integer ss =userService.updateByPrimaryKeySelective(su);
            // 返回json
            if(ss!=0){
                printlnOfJson(CommonMethodClass.jsonData(1, "修改成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));;
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //修改用户冻结状态
    public String updateSubFrozenTrueOrFalse(){
        try {

//            SysUserExpand users = userService.selectById(sysUserExpand);
//            users.setSuFrozen(sysUserExpand.getSuFrozen());
//            Integer ss = userService.updateByPrimaryKeySelective(users);

            if(sysUserExpand.getSuFrozen()==1) {
                sysUserExpand.setSufollow(sysUserExpand.getRegistrantName() + " 解除了冻结;");
            }

            Integer ss = userService.updateByPrimaryKeySelective(sysUserExpand);

            if (ss>0){
                printlnOfJson(CommonMethodClass.jsonData(1, "修改成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));;
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }


    

    //登录认证userLogin
    public String userLogin() {

        System.out.println("登录验证");
        HttpSession session = ServletActionContext.getRequest().getSession();
        String company = (String) session.getAttribute("company");
//        Syslog.writeLog(company,"C:/imsError(" + DateUtil.getCurDate() + ").txt");

        try {
            if (sysUserExpand.getSuName() == null || sysUserExpand.getSuName().equals("")
                    && sysUserExpand.getSuPassword() == null || sysUserExpand.getSuPassword().equals("")) {
                printlnOfJson(CommonMethodClass.jsonData(-25, "账号、密码不能为空", null));
                return null;
            }
            SysUserExpand userInfo = userService.userLogin(sysUserExpand);
            if (userInfo == null) {
                printlnOfJson(CommonMethodClass.jsonData(-26, "账号或密码错误，请重新输入", null));
                return null;
            }
            int suMd5CheckType = userInfo.getSuMd5CheckType();
            if (suMd5CheckType > 0) {
                String suMd5Check = userInfo.getSuMd5Check();
                String acode = sysUserExpand.getAcode();//电脑
                String bcode = sysUserExpand.getBcode();//路由
                String ccode = sysUserExpand.getCcode();//电脑+路由
                if (suMd5CheckType == 1) {
                    if (!suMd5Check.equals(acode)) { //请在指定网络登录系统!
                        printlnOfJson(CommonMethodClass.jsonData(-11, "请在指定网络登录系统!", null));
                        return null;
                    }
                }
                if (suMd5CheckType == 2) {
                    System.out.println(bcode + "是多少：" + suMd5Check);
                    if (!suMd5Check.equals(bcode)) { // 请在指定计算机登录系统!
                        printlnOfJson(CommonMethodClass.jsonData(-12, "请在指定计算机登录系统!", null));
                        return null;
                    }
                }
                if (suMd5CheckType == 3) {
                    if (!suMd5Check.equals(ccode)) { //请在指定网络内的特定计算机登录系统!
                        printlnOfJson(CommonMethodClass.jsonData(-12, "请在指定计算机登录系统!", null));
                        return null;
                    }
                }
            }


            //冻结限制登录
            Integer sufrozen = userInfo.getSuFrozen();
            String strJson = JSON.toJSONString(sufrozen, SerializerFeature.WriteNullListAsEmpty);
            if (sufrozen == 0) {//为1：不冻结
                System.out.println("sufrozen 权限值为： "+sufrozen);
                printlnOfJson(CommonMethodClass.jsonData(-20, "该用户被冻结", null));
                return null;
            }


            String suState = userInfo.getSuState();
            if (suState.equals("正常")) {
                session.setAttribute("userinfo", userInfo);
                //查询城区
                String companyRentCity = (String) session.getAttribute("companyRentCity");
                SysHouseDictExpand sysHouseDictExpand = new SysHouseDictExpand();
                sysHouseDictExpand.setHdCity(companyRentCity);
                List<String> list = houseDictService.selectForAddress(sysHouseDictExpand);
                if (list.size() > 0) {
                    String json = JSONUtil.serialize(list);
                    session.setAttribute("companyRentDistrict", json);
                }
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));

            } else if (suState.equals("离职")) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "该账号已经离职", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "该账号异常", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "登录失败，请刷新页面重试", null));
        }
        return null;
    }



    //用户修改密码
    public String doUpdateUserSelf() {
        try {
            if (sysUserExpand.getOldPassword() == null || sysUserExpand.getOldPassword() == ""
                    || sysUserExpand.getNewPassword() == null || sysUserExpand.getNewPassword() == ""
                    || sysUserExpand.getCheckNewPassword() == null || sysUserExpand.getCheckNewPassword() == "") {//对传入的三个密码判空
                printlnOfJson(CommonMethodClass.jsonData(-1, "密码不能为空", null));
            }
            Integer userId = CommonMethodClass.getSessionUserInfo().getUserId();//从session获取userId
            SysUserExpand queryUser = new SysUserExpand();
            queryUser.setUserId(userId);
            List<SysUserExpand> queryUserInfo = userService.selectByPrimaryKey(queryUser);//查询对应userInfo
            if (queryUserInfo.size() > 0) {
                if (sysUserExpand.getOldPassword().equals(queryUserInfo.get(0).getSuPassword())) {//对比查询出来的密码和传入的旧密码
                    if (sysUserExpand.getNewPassword().equals(sysUserExpand.getCheckNewPassword())) {//对比新密码和确认密码
                        SysUserExpand updateUser = new SysUserExpand();
                        updateUser.setUserId(userId);
                        updateUser.setSuPassword(sysUserExpand.getCheckNewPassword());
                        int result = userService.updateByPrimaryKeySelective(updateUser);
                        if (result == 1) {
                            printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                        } else {
                            printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                        }
                    } else {
                        printlnOfJson(CommonMethodClass.jsonData(-24, "两次密码不一致", null));
                    }
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-23, "原密码错误", null));
                }
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "不存在此用户", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }

        return null;
    }

    //修改用户折扣授权申请密码
    public String doUpdateDiscountAuthPassword() {

        String jsonStr = sysUserExpand.getSuDiscountAuthPassword();
        Map<String, String> map = JSON.parseObject(jsonStr, Map.class);
        String authPassword = map.get("authPassword");
        String cardPassword = map.get("cardPassword");

        if (authPassword != null && authPassword != "") {
            try {

                Integer userId = CommonMethodClass.getSessionUserInfo().getUserId();//从session获取userId
                SysUserExpand queryUser = new SysUserExpand();
                queryUser.setUserId(userId);
                List<SysUserExpand> queryUserInfo = userService.selectByPrimaryKey(queryUser);//查询对应userInfo
                if (queryUserInfo.size() > 0) {
                    String password = queryUserInfo.get(0).getSuDiscountAuthPassword();
                    Map<String, String> map1 = JSON.parseObject(password, Map.class);
                    String oldAuthPassword = map1.get("authPassword");
                    String cardPassword1 = map1.get("cardPassword");
                    if (authPassword.equals(oldAuthPassword)) {//对比查询出来的密码和传入的旧密码
                        if (sysUserExpand.getNewDiscountAuthPassword().equals(sysUserExpand.getCheckDiscountAuthPassword())) {//对比新密码和确认密码
                            SysUserExpand updateUser = new SysUserExpand();
                            updateUser.setUserId(userId);
                            HashMap<String, String> h1 = new HashMap<>();
                            h1.put("cardPassword", cardPassword1);
                            h1.put("authPassword", sysUserExpand.getNewDiscountAuthPassword());
                            String s1 = JSON.toJSONString(h1);
                            System.out.println("11111111111111111111" + s1);
                            updateUser.setSuDiscountAuthPassword(s1);
                            int result = userService.updateByPrimaryKeySelective(updateUser);
                            if (result == 1) {
                                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                            } else {
                                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                            }
                        } else {
                            printlnOfJson(CommonMethodClass.jsonData(-24, "两次密码不一致", null));
                        }
                    } else {
                        printlnOfJson(CommonMethodClass.jsonData(-23, "原密码错误", null));
                    }
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-1, "不存在此用户", null));
                }
            } catch (Exception e) {
                e.printStackTrace();
                Syslog.writeErr(e);
                printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            }

        } else if (cardPassword != null && authPassword != "") {
            try {
                Integer userId = CommonMethodClass.getSessionUserInfo().getUserId();//从session获取userId
                SysUserExpand queryUser = new SysUserExpand();
                queryUser.setUserId(userId);
                List<SysUserExpand> queryUserInfo = userService.selectByPrimaryKey(queryUser);//查询对应userInfo
                if (queryUserInfo.size() > 0) {
                    String password = queryUserInfo.get(0).getSuDiscountAuthPassword();
                    Map<String, String> map2 = JSON.parseObject(password, Map.class);
                    String oldCardPassword = map2.get("cardPassword");
                    String authPassword2 = map2.get("authPassword");
                    if (cardPassword.equals(oldCardPassword)) {//对比查询出来的密码和传入的旧密码
                        if (sysUserExpand.getNewDiscountAuthPassword().equals(sysUserExpand.getCheckDiscountAuthPassword())) {//对比新密码和确认密码
                            SysUserExpand updateUser = new SysUserExpand();
                            updateUser.setUserId(userId);
                            HashMap<String, String> h2 = new HashMap<>();
                            h2.put("authPassword", authPassword2);
                            h2.put("cardPassword", sysUserExpand.getNewDiscountAuthPassword());
                            String s2 = JSON.toJSONString(h2);
                            System.out.println(s2);
                            updateUser.setSuDiscountAuthPassword(s2);
                            updateUser.setSuDiscountAuthPassword(updateUser.getCheckDiscountAuthPassword());
                            int result = userService.updateByPrimaryKeySelective(updateUser);
                            if (result == 1) {
                                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                            } else {
                                printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                            }
                        } else {
                            printlnOfJson(CommonMethodClass.jsonData(-24, "两次密码不一致", null));
                        }
                    } else {
                        printlnOfJson(CommonMethodClass.jsonData(-23, "原密码错误", null));
                    }
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-1, "不存在此用户", null));
                }
            } catch (Exception e) {
                e.printStackTrace();
                Syslog.writeErr(e);
                printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            }

        } else {
            printlnOfJson(CommonMethodClass.jsonData(-1, "密码不能为空", null));
        }


        return null;
    }


    /*查询用户是否冻结*/
    public String loginSuFrozen(){
        try {
            HttpSession session = ServletActionContext.getRequest().getSession();
            SysUserExpand su = (SysUserExpand) session.getAttribute("userinfo");
            SysUserExpand users = userService.selectById(su);

            Integer sufrozen = users.getSuFrozen();//获取用户权限值
            String strJson = JSON.toJSONString(sufrozen, SerializerFeature.WriteNullListAsEmpty);

            if (sufrozen == 1) {//为1：不冻结
                if (users != null) {
                    printlnOfJson(CommonMethodClass.jsonData(1, "成功", strJson));

                }else if(sufrozen == 0){
                    printlnOfJson(CommonMethodClass.jsonData(-1, "该用户被冻结", null));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "登录失败，请刷新页面重试", null));
        }
        return null;

    }



    //普通离职
    public String employeeQuit() {
        try {
            SysUserExpand sue = new SysUserExpand();
            sue.setUserId(sysUserExpand.getUserId());
            List<SysUserExpand> username = userService.nameNumber(sysUserExpand);
            if (!"离职".equals(username.get(0).getSuState())) {
                if (sysUserExpand.getUserId() != null && !sysUserExpand.getUserId().equals("")) {
                    sue.setUserId(sysUserExpand.getUserId());
                    sue.setSuState("离职");
                    sue.setSuPassword("facaikaihua888");
                    int result = userService.updateByPrimaryKeySelective(sue);
                    if (result == 0) {
                        printlnOfJson(CommonMethodClass.jsonData(-1, "修改失败", null));
                    } else {
                        printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
                    }
                } else {
                    printlnOfJson(CommonMethodClass.jsonData(-25, "用户不能为空", null));
                }
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "已经离职", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
	//更新学生信息
	public void updateStudentInformation(){
        try {
            System.out.println(sysUserExpand);
        int temp = userService.updateStudentInformation(sysUserExpand);
            if(temp == -1) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "更新失败", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    //换班级
    public void studentTransfer(){
        try {
            int temp = userService.updateStudentTransfer(sysUserExpand);
            System.out.println("========"+temp);
            if(temp == -1){
                //用户部门区域不能为空
                printlnOfJson(CommonMethodClass.jsonData(-1, "用户部门区域不能为空", null));
            }else if(temp == -2){
                //查询失败！或没有
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败！或没有", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }
    //公司人员，转移部门
    public void personnelTransfer() {
        try {
            int temp = userService.updatePersonnelTransfer(sysUserExpand);
            if (temp == -1) {
                //用户部门区域不能为空
                printlnOfJson(CommonMethodClass.jsonData(-1, "用户部门区域不能为空", null));
            } else if (temp == -2) {
                //查询失败！或没有
                printlnOfJson(CommonMethodClass.jsonData(-1, "查询失败！或没有", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    //查询有折扣权限的全部用户
    public void selectAllDiscountAuth() {

        try {
            List<SysUserExpand> userList = userService.selectAllDiscountAuth(sysUserExpand);
            String strJson = JSON.toJSONString(userList, SerializerFeature.WriteMapNullValue);
            if (userList.size() > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "查询成功", strJson));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查到数据", null));
                ;
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }


    //查询部门所属用户可公开被查看的个人信息
    public String queryUserByDepartmentID() {
        try {
            List<SysUserExpand> username = userService.nameNumber(sysUserExpand);
            if (username.size() != 0) {
                String json = JSONUtil.serialize(username);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到用户信息", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //部门查询
    public String queryAllDepar() {
        try {
            List<SysUserExpand> depar = userService.queryAllDepar();
            if (depar.size() != 0) {
                String json = JSONUtil.serialize(depar);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //退出登录
    public void userLogout() {
        System.out.println("退出登录");
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();

        HttpSession session = request.getSession();
        String company = "";
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("company")) {
                company = cookie.getValue();
            }
        }

//		String company = (String) session.getAttribute("company");
        session.invalidate();
        try {
            response.sendRedirect(request.getContextPath() + "/" + company);//
        } catch (IOException e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        }
    }

    // 查询用户，给出条件则为条件查询
    public String queryUserById() {
        //用户管理 - 查询     D00b01
        int auth1 = Authority.authorize("D00b01");
        if (auth1 == 0) {
            printlnOfJson(CommonMethodClass.jsonData(-3, "无查看用户权限", null));
            return null;
        }
        try {
            List<SysUserExpand> user = userService.selectByPrimaryKey(sysUserExpand);
            if (user.size() != 0) {
                String json = JSONUtil.serialize(user);

                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "未查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
		return null;
	}
    // 增加学生
    public String insertStudent() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()){
            List<SysUserExpand> user = userService.selectStudent(sysUserExpand);
            System.out.println("我要看输出"+user.size());
            if(user.size() > 0){
                printlnOfJson(CommonMethodClass.jsonData(-3, "该学生已存在", null));
                return null;
            }
            int result = userService.insertStudent(sysUserExpand);
            System.out.println(result);
            if(result==0){
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            }else if(result==1){
                List<SysUser> list = new ArrayList<>();
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else if(result==-2) {
                printlnOfJson(CommonMethodClass.jsonData(-4, "用户数量已达上限", null));
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统错误", null));
        }
        return null;
    }

    // 增加用户
    public String insertUser() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            List<SysUserExpand> user = userService.selectUsername(sysUserExpand);
            if (user.size() > 0) {
                printlnOfJson(CommonMethodClass.jsonData(-3, "用户账户已存在", null));
                return null;
            }
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            sysUserExpand.setMaxUserNum(dataSource.getMaxUserNum());
            int result = userService.insertSelective(sysUserExpand);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "新增失败", null));
            } else if (result == 1) {
                int id = sysUserExpand.getUserId();
                List<SysUser> list = new ArrayList<>();
                SysUser su = new SysUser();
                su.setUserId(id);
                list.add(su);
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            } else if (result == -2) {
                printlnOfJson(CommonMethodClass.jsonData(-4, "用户数量已达上限", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统错误", null));
        }
        return null;
    }

    //用户工资设置
    public String salarySetting() {
        try {
            int result = userService.updateByPrimaryKeySelective(sysUserExpand);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "用户工资设置失败", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }

    //修改用户资料
    public String updateUser() {
        try (SqlSession session = MySqlSessionFactory.newSqlSessionFactory().openSession()) {
            //查询用户名是否存在
            List<SysUserExpand> user = userService.selectUsername(sysUserExpand);
            System.out.println(sysUserExpand);
            for (SysUserExpand item : user) {
                System.out.println(item.getUserId() + "==item==Expand==" + sysUserExpand.getUserId() + " !flag=" + (!(item.getUserId().toString()).equals(sysUserExpand.getUserId().toString())));
                System.out.println();
                if (!item.getUserId().toString().equals(sysUserExpand.getUserId().toString())) {
                    System.out.println("aaa1");
                    printlnOfJson(CommonMethodClass.jsonData(-3, "用户名已存在", null));
                    return null;
                }
            }
            String company = (String) ActionContext.getContext().getSession().get("company");
            MyDataSourceMapper mapper = session.getMapper(MyDataSourceMapper.class);
            MyDataSource dataSource = mapper.getDataSource(company);
            sysUserExpand.setMaxUserNum(dataSource.getMaxUserNum());
            //执行修改用户
            System.out.println("App:  " + sysUserExpand.getSuAppAuth());
            int result = userService.updateByPrimaryKeySelectiveOne(sysUserExpand);
            if (result == 0) {
                printlnOfJson(CommonMethodClass.jsonData(-1, "修改用户资料失败", null));
            } else if (result == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else if (result == -4) {
                printlnOfJson(CommonMethodClass.jsonData(-4, "用户数量已达上限", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }


    //冻结
    public String updateUserFollowupValue() {
        try {
            HttpSession session = ServletActionContext.getRequest().getSession();
            SysUserExpand su = (SysUserExpand) session.getAttribute("userinfo");
            //拿到id 然後重新查找user 在進行update
            su = userService.selectById(su);
            // {suFollowupValue : 123 }
            su.setSuFollowupValue(sysUserExpand.getSuFollowupValue());
            Integer result = userService.updateByPrimaryKeySelective(su);
            if (result > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));

            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }

        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "服务器异常", null));
        }

        return null;
    }





    //用户离职，相关的业务转移
    public String employeeTurnover() {
        try {
            int result = userService.dataTransfer(sysUserExpand);

            if (result == 1) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            e.printStackTrace();
            Syslog.writeErr(e);
        }
        return null;
    }


    //查询用户权限
    public String selectSuPermissionsId() {
        try {
            SysUserExpand result = userService.selectById(sysUserExpand);
            Integer aa =  result.getSuPermissionsId();
            String strJson = JSON.toJSONString(aa, SerializerFeature.WriteNullListAsEmpty);
            if (result != null) {
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", strJson));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
            }
        } catch (Exception e) {
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
            e.printStackTrace();
            Syslog.writeErr(e);
        }
        return null;
    }






    //查询用户名是否存在
    public void getUsername() {
        try {
            List<SysUserExpand> user = userService.selectUsername(sysUserExpand);
            if (user.size() > 0) {
                printlnOfJson(CommonMethodClass.jsonData(1, "用户名已存在", null));
            } else {
                printlnOfJson(CommonMethodClass.jsonData(-1, "用户名不存在", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
    }

    /**
     * 删除图片
     */
    public void deleteUserPic() {
        try {
            List<SysUserExpand> list = userService.selectByPrimaryKey(sysUserExpand);
            if (list.size() == 0) {
                printlnMsg("-1");
                return;
            }
            String oldPath = list.get(0).getSuImgPath();
            String delPath = sysUserExpand.getSuImgPath();
            String newPath = UploadUtil.getNewPath(oldPath, delPath);
            sysUserExpand.setSuImgPath(newPath);
            sysUserExpand.setSuImgNum(UploadUtil.getImageNum(newPath));
            int result = userService.updateByPrimaryKeySelective(sysUserExpand);
            if (result > 0) {
                printlnMsg("1");
            } else {
                printlnMsg("-1");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
        }
    }
}
            /**
             *
             * 查询未关联用户
             *//*
    public String selectUserPicDig(){
    	try {
			List<SysUserExpand> suList = userService.selectUserPicDig(sysUserExpand);
			if(suList.size()>=0){
				String json = JSONUtil.serialize(suList);
				printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
			}else {
				printlnOfJson(CommonMethodClass.jsonData(-1, "失败", null));
			}
    	} catch (Exception e) {
    		 printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常 或 数据参数有误 ！", null));
		}
    	return null;
    }*/






