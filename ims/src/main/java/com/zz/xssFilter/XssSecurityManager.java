package com.zz.xssFilter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

public class XssSecurityManager {
	
	// 危险的javascript:关键字j av a script  
    private final static Pattern[] DANGEROUS_TOKENS = new Pattern[] {
            Pattern.compile("^j\\s*a\\s*v\\s*a\\s*s\\s*c\\s*r\\s*i\\s*p\\s*t\\s*:", Pattern.CASE_INSENSITIVE) };
  
    // javascript:替换字符串（全角中文字符）  
    private final static String[] DANGEROUS_TOKEN_REPLACEMENTS = new String[] { "ＪＡＶＡＳＣＲＩＰＴ：" };
  
    // 非法的字符集  
    private static final char[] INVALID_CHARS = new char[] { '<', '>', '\\', '%', ';'};
  
    // 统一替换可能造成XSS漏洞的字符为全角中文字符  
    private static final char[] VALID_CHARS = new char[] { '＜', '＞', '\\', '％', '；'};
  
    // 开启xss过滤功能开关  
    public static boolean enable=false;
  
    // url-patternMap(符合条件的url-param进行xss过滤）<String ArrayList>
    public static Map urlPatternMap = new HashMap();
      
    private static HashSet excludeUris=new HashSet();
  
    private XssSecurityManager() {
        // 不可被实例化  
    }
      
    public static HttpServletRequest wrapRequest(HttpServletRequest httpRequest){  
        if(httpRequest instanceof XssHttpRequestWrapper){  
            //include/forword指令会重新进入此Filter  
            XssHttpRequestWrapper temp=(XssHttpRequestWrapper)httpRequest;
            //include指令会增加参数，这里需要清理掉缓存
            temp.refiltParams();
            return temp;
        }else{
            return httpRequest;
        }
    }
      
    public static List getFiltParamNames(String url){
        //获取需要xss过滤的参数
        url = url.toLowerCase();
        List paramNameList = (ArrayList) urlPatternMap.get(url);
        if(paramNameList==null || paramNameList.size()==0){
            return null;
        }  
        return paramNameList;
    }  
      
    public static void filtRequestParams(Map params,String servletPath){  
        //long t1=System.currentTimeMillis();  
        //得到需要过滤的参数名列表，如果列表是空的，则表示过滤所有参数  
        List filtParamNames=XssSecurityManager.getFiltParamNames(servletPath);  
        filtRequestParams(params, filtParamNames);  
    }  
      
    public static void filtRequestParams(Map params,List filtParamNames){  
        // 获取当前参数集  
        Set parameterNames = params.keySet();  
        Iterator it = parameterNames.iterator();  
        //得到需要过滤的参数名列表，如果列表是空的，则表示过滤所有参数  
        while (it.hasNext()) {
            String paramName = (String) it.next();  
            if(filtParamNames==null || filtParamNames.contains(paramName) ){  
                String[] values = (String[])params.get(paramName);  
                proceedXss(values);
            }  
        }  
    }  
    
    /** 
     * 对参数进行防止xss漏洞处理 
     *  
     * @param value
     * @return 
     */  
    private static void proceedXss(String[] values) {  
        for (int i = 0; i < values.length; ++i) {  
            String value = values[i];  
            if (!isNullStr(value)) {  
                values[i] = replaceSpecialChars(values[i]);
            }  
        }  
    }  
  
    /** 
     * 替换非法字符以及危险关键字 
     *  
     * @param str 
     * @return 
     */  
    private static String replaceSpecialChars(String str) {
    	//str = sqlValidate(str);
        for (int j = 0; j < INVALID_CHARS.length; ++j) {  
            if (str.indexOf(INVALID_CHARS[j]) >= 0) {  
                str = str.replace(INVALID_CHARS[j], VALID_CHARS[j]);  
            }  
        }
        str=str.trim();
        for (int i = 0; i < DANGEROUS_TOKENS.length; ++i) {  
            str = DANGEROUS_TOKENS[i].matcher(str).replaceAll(  
                    DANGEROUS_TOKEN_REPLACEMENTS[i]);  
        }  
        return str;
    }  
  
    /** 
     * 判断是否为空串，建议放到某个工具类中 
     *  
     * @param value 
     * @return 
     */  
    private static boolean isNullStr(String value) {  
        return value == null || value.trim().length()==0;  
    }
    
    //效验
    protected static String sqlValidate(String str) {
        str = str.toLowerCase();//统一转为小写
        String badStr = "execute|insert|select|delete|update|*|%|master|truncate|" +
                "char|declare|sitename|net user|xp_cmdshell|;|+|exec|create|drop|" +
                "table|from|grant|group_concat|column_name|database|model|msdb|tempdb|backup|alter|"+
                "information_schema.columns|table_schema|union|where|order|intersect|except|group|show databases" +
                "chr|mid|--|+|like|//|/";//过滤掉的sql关键字，可以手动添加
        
        String[] badStrs = badStr.split("\\|");
        for (int i = 0; i < badStrs.length; i++) {
            if (str.indexOf(badStrs[i]) >= 0) {
                str = str.replace(badStrs[i], ToSBC(badStrs[i]));
            }
        }
        return str;
    }
    
    //半角转换为全角
    public static String ToSBC(String input) {
        char c[] = input.toCharArray();
        for (int i = 0; i < c.length; i++) {
          if (c[i] == ' ') {
            c[i] = '\u3000';
          } else if (c[i] < '\177') {
            c[i] = (char) (c[i] + 65248);
          }
        }
        return new String(c);
    }
      
//    public static void main(String args[]) throws Exception{  
//        Map datas=new HashMap();  
//        String paramName="test";  
//        datas.put(paramName,new String[]{ "Javascript:<script>alert('yes');</script>"});  
//        filtRequestParams(datas,"/test/sample.do");  
//        System.out.println(((String[])datas.get(paramName))[0]);  
//    	String str = "asdasdsadasfdff";
//    	int num = str.indexOf("a");
//    	String str1 = str.replace("a", "%");
//    	System.out.println(num+"--------"+str1);
//    	
//        System.out.println(ToSBC(str));
//        
//    }
}
