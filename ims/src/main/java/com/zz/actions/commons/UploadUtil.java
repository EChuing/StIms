package com.zz.actions.commons;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * 上传到私有空间，下载要凭证
 * @author Administrator
 *
 */
public class UploadUtil {
	//设置好账号的ACCESS_KEY和SECRET_KEY
    private static final String ACCESS_KEY = "UNsQR-VxUCoEzgbUIhmqw7vlwbZt06AtiEr6HPOj";
    private static final String SECRET_KEY = "oBvZsNPZmJnD32Edhvkm5J9pSR3xPb2CXu5mJM7I";

    //要上传的空间
    private static final String BUCKETNAME = "public";
    private static final String URL = "http://pic-public.fangzhizun.com";

    //密钥配置
    private static final Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);
    
    //指定上传的Zone的信息
    private static final Zone z = Zone.autoZone();
    private static final Configuration c = new Configuration(z);
    
    //服务器地址
    public static final String HOSTURL = "http://www.fangzhizun.com/ims";

//    public static final String HOSTURL = "http://www.fangzhizun.com/try";
	/**
	 * 获取带回调函数的上传凭证
	 * @return 上传凭证
	 */
    public static String getUpTokenCallback() {
        return auth.uploadToken(BUCKETNAME, null, 300, new StringMap()
                .put("callbackUrl", HOSTURL + "/upload/callback.action")
                .put("callbackBody", "filename=$(fname)&key=$(key)&mimeType=$(mimeType)&url=" + URL + "&jrlId=$(x:jrlId)&jrrId=$(x:jrrId)&co=$(x:co)&qr=$(x:qr)&att=$(x:att)&att2=$(x:att2)&eaId=$(x:eaId)&saId=$(x:saId)&handlerId=$(x:handlerId)&handlerName=$(x:handlerName)&rcoId=$(x:rcoId)&nrcId=$(x:nrcId)&repId=$(x:repId)&hsId=$(x:hsId)&supId=$(x:supId)&userName=$(x:userName)&userId=$(x:userId)&fileId=$(x:fileId)&fileTag=$(x:fileTag)&jciId=$(x:jciId)&userCoding=$(x:userCoding)&type=$(x:type)")
                .put("saveKey", "$(etag)"+ (int) ((Math.random()*9+1)*1000) + "$(ext)")
                .put("insertOnly", 1)
                );
    }
    
    /**
     * 删除文件
     * @param key 文件名
     */
    public static void delete(String key) {
    	BucketManager bucketManager = new BucketManager(auth, c);
    	try {
            //调用delete方法移动文件
            bucketManager.delete(BUCKETNAME, key);
        } catch (QiniuException e) {
            //捕获异常信息
            Response r = e.response;
            System.out.println(r.toString());
        }
    }
    
    /**
     * 下载凭证
     * @param baseUrl 文件路径
     * @return 带凭证的文件路径，有效期为5分钟
     */
    public static String getDownloadUrl(String baseUrl) {
    	return auth.privateDownloadUrl(baseUrl, 300);
    }
    
	/**
	 * 计算图片数量和文件数量
	 * @param path json数组，不带[]
	 * @return a/b 图片数量/文件数量
	 */
	public static String getImageNum(String path) {
		int imgNum = 0;
		int fileNum = 0;
		if(path != null){
			JSONArray jsonArray = JSONArray.fromObject("["+path+"]");
			for(Object obj:jsonArray){
				JSONObject jsonObject = JSONObject.fromObject(obj.toString());
				String url = (String)jsonObject.get("path");//url=http://pic-public.fangzhizun.com/201609261474875087178093895.jpg
				String[] strs = url.split("\\.");
				String ext = strs[strs.length-1];//ext=jpg
				if(ext.equalsIgnoreCase("gif") || ext.equalsIgnoreCase("jpg") || ext.equalsIgnoreCase("jpeg") || ext.equalsIgnoreCase("bmp") || ext.equalsIgnoreCase("png")){
					imgNum++;
				}else{
					fileNum++;
				}
			}
		}
		return imgNum + "/" + fileNum;
	}
	
	/**
     * 删除文件，并返回新路径
     * @param oldPath
     * @param delPath
     * @return newPath
     */
    public static String getNewPath(String oldPath, String delPath) {
        List<String> newPath = new ArrayList<String>();
        JSONArray oldPaths = JSONArray.fromObject("[" + oldPath + "]");
        String[] delPaths = delPath.split(",");
        for (Object obj : oldPaths) {
            newPath.add(obj.toString());
            JSONObject jsonObject = JSONObject.fromObject(obj.toString());
            String url = (String) jsonObject.get("path");//url=http://pic-public.fangzhizun.com/201609261474875087178093895.jpg
            for (String url2 : delPaths) {
                if(url.equals(url2)){
                    newPath.remove(newPath.size() - 1);
                    int index = CommonMethodClass.getIndex(url, 3, "/");
                    if(index > -1){
                        index++;
                        delete(url.substring(index, url.length()));
                    }
                }
            }
        }
        String s = newPath.toString();
        return s.substring(1, s.length() - 1);//去掉[]
    }

}