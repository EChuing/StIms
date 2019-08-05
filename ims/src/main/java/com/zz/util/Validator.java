package com.zz.util;

import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.apache.commons.lang.StringUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Validator {
    
    public static void main(String[] args){
        // 前台传入的数据，json格式
        String a = "{'num': '21', 'money': '55.6', 'note': '123456'}";
        // 后台验证规则，json格式
        String b = "{'num': [{'rule': 'required'}, {'rule': 'integer'}], 'money': [{'rule': 'required'}, {'rule': 'decimal'}], 'note': [{'rule': 'required'}, {'rule': 'minAndMax', 'params': [5, 6]}]}";
        // 规则验证失败时的文字说明
        String c = "{'num.required': 'num必填', 'num.integer': 'num格式错误', 'money.required': 'money必填', 'money.decimal': 'money格式错误', 'note.required': 'note必填', 'note.minAndMax': 'note长度不在范围内'}";

        JSONObject data = JSONObject.fromObject(a);
        JSONObject rules = JSONObject.fromObject(b);
        JSONObject messages = JSONObject.fromObject(c);
        
        JSONObject result  = validate(data, rules, messages);
        System.out.println(result.toString());
    } 
    
    /**
     * 验证
     * @param data 数据
     * @param rules 规则
     * @param messages 规则说明
     * @return json 验证结果及说明
     */
    public static JSONObject validate(JSONObject data, JSONObject rules , JSONObject messages) {
        JSONObject retObj = new JSONObject();
        String retMessages  = "";
        //如果为空直接返回
        if (data == null || rules == null || messages == null) {
            retObj.put("passes", false);
            return retObj;
        }
        boolean success = false;
        boolean passes = true;
        Validator validator = new Validator();
        String key, value, message;
        Method method;
        // 遍历规则中各字段
        Iterator it = rules.keys();
        while (it.hasNext()) {
            try{
                //当前的key
                key = (String)it.next();
                //当前的值
                value = (String) data.get(key);
                //遍历每个字段中各个规则
                JSONArray arr = rules.getJSONArray(key);
                for (Object o : arr) {
                    JSONObject jsonObject = JSONObject.fromObject(o);
                    String methodName = (String) jsonObject.get("rule");
                    // 规则中有参、无参分开处理
                    if (jsonObject.get("params") != null) {
                        JSONArray params = JSONArray.fromObject(jsonObject.get("params"));
                        method = validator.getClass().getMethod(methodName, String.class, JSONArray.class);
                        success =(Boolean) method.invoke(validator, value, params);
                    } else {
                        method = validator.getClass().getMethod(methodName, String.class);
                        success =(Boolean) method.invoke(validator, value);
                    }
                    if(!success){
                        //获得当前key对应验证失败对应的消息,如果未配置错误信息，不添加错误信息
                        if(messages.has(key + "." + methodName)){
                            message =messages.getString(key + "." + methodName );    
                            retMessages += StringUtils.isBlank(retMessages)? message:";" + message;
                        }
                        passes = false;
                        break;//一条数据当有规则不通过时，不再验证余下规则，直接验证下一条数据
                    }
                }
            }catch(Exception ex){
                ex.printStackTrace();
                retObj.put("passes", false);
                retObj.put("messages", "系统异常");
                return retObj;
            }            
        }
        retObj.put("passes", passes);
        retObj.put("messages", retMessages);
        return retObj;
    }    
    
        
    /**
     * 必须填写
     * @param value
     * @return
     */
    public static boolean required(String value) {
        if(value == null || "".equals(value.trim())){
            return false;
        }
        return true;
    }
    
    /**
     * 整数
     * @param value
     * @return
     */
    public static boolean integer(String value) {
        return match("^-?[1-9]\\d*|0$", value);
    }
    
    /**
     * 整数或小数
     * @param value
     * @return
     */
    public static boolean decimal(String value) {
        return match("^-?([1-9]\\d*\\.?\\d*|0\\.\\d*[1-9]\\d*|0?\\.0+|0)$", value);
    }
    
    /**
     * 手机号码
     * @param value
     * @return
     */
    public static boolean mobile_phone(String value){
        return match("^1(3\\d|4(7)|5(0|1|2|3|5|6|7|8|9)|7(0|3|6|7|8)|8\\d)\\d{8}$", value);
    }    
    
    /**
    * @param regex 正则表达式字符串
    * @param str 要匹配的字符串
    * @return 如果str 符合 regex的正则表达式格式,返回true, 否则返回 false;
    */
    public static boolean match(String regex, String str) {
        Pattern pattern = Pattern.compile(regex);
        if (str != null) {
            Matcher matcher = pattern.matcher(str);
            return matcher.matches();
        } else {
            return false;
        }
    }
    
    /**
     * 字符串长度最大限制
     * @param value
     * @param params
     * @return
     */
    public static boolean max(String value, JSONArray params) {
        String param = (String) params.get(0);
        int max = Integer.parseInt(param);
        return value.length() <= max ? true : false;
    }
    
    /**
     * 字符串长度范围限制
     * @param value
     * @param params
     * @return
     */
    public static boolean minAndMax(String value, JSONArray params){
        int min = (int) params.get(0);
        int max = (int) params.get(1);
        return value.length() >= min && value.length() <= max ? true : false;
    }
    
}
