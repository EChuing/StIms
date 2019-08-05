package com.zz.actions.commons;

import com.opensymphony.xwork2.ActionContext;
import com.zz.other.Syslog;
import com.zz.po.sys.SysUserExpand;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 权限判断
 * @author Administrator
 *
 */
public class Authority {
    
    /**
     * 查找权限，1代表有权限，0代表无权限
     * @param authority
     * @return
     */
    public static int authorize(String authority){//A00b01
        try{
            SysUserExpand userInfo = (SysUserExpand) ActionContext.getContext().getSession().get("userinfo");
            String spNewPurview = userInfo.getSpNewPurview();
            JSONObject purview = JSONObject.fromObject(spNewPurview);
            String a = authority.substring(0, 1);//大版块 A
            int b = Integer.parseInt(authority.substring(1, 3));//小版块 00
            String c = authority.substring(3, 4);//权限类型（b：数据权限，c：操作权限） b
            int d = Integer.parseInt(authority.substring(4, 6));//具体权限 01
            JSONArray bigSection = (JSONArray) purview.get(a);//大版块权限
            JSONObject smallSection = (JSONObject) bigSection.get(b);//小版块权限
            String authString = (String) smallSection.get(c);//数据权限集合/操作权限集合
            return Integer.parseInt(authString.substring(d, d+1));
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            return 0;
        }
    }

}
