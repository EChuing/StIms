package com.zz.rsa;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.zz.other.Syslog;
import org.apache.http.client.ClientProtocolException;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.zz.actions.commons.HttpRequestUtil;

public class TestMain {
	private static Logger logger = LoggerFactory.getLogger(TestMain.class);

	public static String privateKey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJIIkG76p8gLwucLnDaC9Th7KPyuDMvM0okbjolnOGl9VRr4R5JJJZqngukd2PAZizF3/aTp7ko6zdc3Zo5ZPBRiSJos01w3t54RAP/wuQBBw8oyWvUs4y6V+lK0w5iIMdcVp2cd2WT7Xs2XPFCfq8j55urshXwvRE0KM3JL4PZXAgMBAAECgYBnmcfN0+mAFEf7XdM/IP0TStyzFk9hrjeWqYQfmqj8vbvI3Gb6MwaIh1pqQ5CKFbUYLUY23vb8lmc9zcHmLwxdXwmBaEk7ad2My/zTGVm+5wB5KjM5y+OjzZutF2LGDDHL14+Z6qr8FtbiqM5ycrw7chZk2SumSkTtiVOjKkr+8QJBAMsB9cIUgmf0lPSIT1Eo4CTKmXdQ6jib0RkbwOV0mgaIrzl+l6xKozAo93lnFPV0HEG4WicpZo3kR6GRwUM8p3sCQQC4J0nEEp9A+QN8jgO4XmdyJ++lHKGgrW1+GwtpUIcph/yhNt1fXE5aqReyGxONVCxWeMV6Q9Pgi5NJxN9q28fVAkAduLS9bHlHNQTV5FsQe9aNLGhZkqwoC5AKiAiuz2p5iGt3FHSqUecgdu78hD4KTayRZqc0UphkL8bY/dj4uhmfAkAZdHzS2Iwg7AraVbsX6hy8f961YQ7Kag6fhtd9+D6mtABsvGu/OcAu8f6vhOSf/YmfblRFwUhxWnnCka8cU0L9AkEAgOgpVkg6mz99CkKzcGXGzRutzijnTptsNvyGoH3PZXcm5sfoAA5cE20SSGpfD2BB9Jshgfifqa1oSMAih6CqCw==";
	public static String publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSCJBu+qfIC8LnC5w2gvU4eyj8rgzLzNKJG46JZzhpfVUa+EeSSSWap4LpHdjwGYsxd/2k6e5KOs3XN2aOWTwUYkiaLNNcN7eeEQD/8LkAQcPKMlr1LOMulfpStMOYiDHXFadnHdlk+17NlzxQn6vI+ebq7IV8L0RNCjNyS+D2VwIDAQAB";
	
	public static String api_house_add = "http://developer.gongyu.58v5.cn/house/api_house_add";
	public static String api_house_info_get = "http://developer.gongyu.58v5.cn/house/api_house_info_get";
	public static String api_house_status_modify = "http://developer.gongyu.58v5.cn/house/api_house_status_modify";
	public static String api_house_del = "http://developer.gongyu.58v5.cn/house/api_house_del";
    public static String api_house_modify = "http://developer.gongyu.58v5.cn/house/api_house_modify";
    public static String api_order_info_get = "http://developer.gongyu.58v5.cn/order/api_order_info_get";//6.   预约信息获取接口
    public static String api_get_biz_info = "http://developer.gongyu.58v5.cn/biz/api_get_biz_info";//7.   商业信息获取接口
    public static String api_get_biz_statistics = "http://developer.gongyu.58v5.cn/biz/api_get_biz_statistics";//8.    数据统计获取接口
    public static String api_biz_call_list = "http://developer.gongyu.58v5.cn/biz/api_biz_call_list";//9. 电话列表获取接口
    
    public static String api_apartment_add = "http://developer.gongyu.58v5.cn/apartment/api_apartment_add";
    public static String api_apartment_update = "http://developer.gongyu.58v5.cn/apartment/api_apartment_update";
    public static String api_layout_add = "http://developer.gongyu.58v5.cn/apartment/api_layout_add";
    public static String api_layout_update = "http://developer.gongyu.58v5.cn/apartment/api_layout_update";
    public static String api_apartmentroom_add = "http://developer.gongyu.58v5.cn/apartment/api_apartmentroom_add";
    public static String api_apartmentroom_update = "http://developer.gongyu.58v5.cn/apartment/api_apartmentroom_update";
    
    
    public static String api_upload_attachment = "http://developer.gongyu.58v5.cn/util/api_upload_attachment";

	
	//新增房源接口
	public void testAddHouse() {
		for (int i = 0; i < 1; i++) {
			TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
			dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
			dataMap.put("outHouseId", System.currentTimeMillis() + ""); // 合作公寓系统的房屋id
			dataMap.put("rentType", "1");// 出租方式，枚举值 1.整套出租 2.单间出租 例如：1
			dataMap.put("bedRoomNum", "2");// 房屋户型-室 例如（2室）：2
			dataMap.put("livingRoomNum", "1");// 房屋户型-厅例如（1室）：1
			dataMap.put("toiletNum", "1");// 房屋户型-卫 例如（1卫）：1
			dataMap.put("rentRoomArea", "90");// 对于单间出租的，为出租间面积。对于整租的为房屋总面积.单位（㎡），最多支持两位小数。例如：110
			dataMap.put("bedRoomType", "31");// 出租屋类型，枚举值。31.主卧。32.次卧。例如（主卧）：31 出租方式为单间出租时（rentType=2）必须填写
			dataMap.put("faceToType","60");//朝向，枚举值。60:东61:南62:西63:北64:东南65:西南66:东北67:西北68:东西69:南北例如（朝南）：61
			dataMap.put("totalFloor", "15");// 楼层总数 例如（18层高的楼房）：18
			dataMap.put("houseFloor", "8");// 房间所在楼层 例如（房屋在5楼）：5
			dataMap.put("featureTag", "10,11,12,13");// 房间标签，枚举值，可多选，以逗号分隔10.离地铁近11.阳台12.独立卫生间13.厨房例如（离地铁近，有阳台）：11,12
			dataMap.put("detailPoint", "71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86");// 房屋配置，枚举值，可多选，以逗号分隔71:床;72:衣柜;73:书桌74:空调;75:暖气76:电视机77:燃气;78:微波炉79:电磁炉80:热水器;81:洗衣机;82:冰箱83:WIFI;84:沙发;85:橱柜86:油烟机例如（床，沙发）：71,84
			dataMap.put("servicePoint", "91,92,93,94,95,96,97");// 公寓配套服务，枚举值，可多选，以逗号分隔;91:健身房;92:公寓超市;93:智能门锁;94:ATM机;95:代收快递;96:专属客服;97:房间清洁
			dataMap.put("monthRent", "2500");// 月租金，以元为单位;例如（2100元/月）：2100
			dataMap.put("rentStartDate", "2016-01-01");// 起租时间，格式yyyy-MM-dd;例如：2015-12-31
			dataMap.put("shortRent", "1");// 是否支持短租，枚举值;0:不支持;1:支持s;例如(支持短租)：1
			dataMap.put("cityName", "武汉");// 房屋所在城市，城市名（没有“市”字） 例如：上海
			dataMap.put("countyName", "沌口开发区");// 房屋所在区县，上海区县详见附录1-区县;例如：浦东
			dataMap.put("areaName", "后官湖大道");// 房屋所在商圈，上海商圈详见附录1-商圈 例如：高行
			dataMap.put("districtName", "海滨城花园");// 房屋所在小区名称s 例如：新高苑
			dataMap.put("street", "海滨城路2号");// 房屋所在小区详细地址 例如：浦东高宝路229弄
			dataMap.put("address", "1号楼3单元208室");// 出租房屋门牌地址 例如：1号楼3单元208室
			dataMap.put("houseDesc", "71:床;72:衣柜;73:书桌74:空调;75:暖气76:电视机77:燃气;78:微波炉79:电磁炉80:热水器;81:洗衣机;82:冰箱83:WIFI;84:沙发;85:橱柜86:油烟机例如（床，沙发）：71,84");// 房间描述（500字以内）
			dataMap.put("xCoord", "116.506584");// 房间位置标注-经度 例如：116.506584
			dataMap.put("yCoord", "39.973175");// 房间位置标注-纬度 例如：39.973175
			dataMap.put("agentPhone", "13466666666");// 房管员手机号 例如：13466666666
			dataMap.put("agentName", "张三");// 房管员姓名 例如：张三
			Map<String, String> paymentMode = new HashMap<String, String>();
			paymentMode.put("149", "1850");
			dataMap.put("paymentMode", paymentMode);// 支付方式 149:押一付三 150:押一付一 151:押一付二 152:押二付二 153:半年付 154:年付 161:押二付一 162:押二付三 传参格式：付款方式:金额 {"149":"1850","150":"1900","153": "1820","154": "1790"}
			dataMap.put("rentRequire", "163,164");// 入驻要求 163:不可带小孩 164:不可养宠物 165:只租女生 166:只租男生 167:无特殊要求 传参格式：枚举值，逗号隔开 163,164 注：只租男生和只租女生互斥
			dataMap.put("hasLift", "1");// 电梯：1 无电梯 2 有电梯
			List<Map> list = new ArrayList<Map>();
			Map<String, String> pic1 = new HashMap<String, String>();
			pic1.put("detailNum", "1");
			pic1.put("picDesc", "客厅1");
			pic1.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
			list.add(pic1);
            Map<String, String> pic2 = new HashMap<String, String>();
            pic2.put("detailNum", "1");
            pic2.put("picDesc", "客厅1");
            pic2.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic2);
            Map<String, String> pic3 = new HashMap<String, String>();
            pic3.put("detailNum", "1");
            pic3.put("picDesc", "客厅1");
            pic3.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic3);
            Map<String, String> pic4 = new HashMap<String, String>();
            pic4.put("detailNum", "1");
            pic4.put("picDesc", "客厅1");
            pic4.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic4);
            Map<String, String> pic5 = new HashMap<String, String>();
            pic5.put("detailNum", "1");
            pic5.put("picDesc", "客厅1");
            pic5.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic5);
			dataMap.put("picUrlList", list);

			logger.info("info=" + JSON.toJSONString(dataMap));
			String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
			logger.info("en=" + en);
			String de = ThirdRSACoder.decrypt(en, publicKey);
			logger.info("de=" + de);
			Map<String, String> map = new HashMap<String, String>();
			map.put("data", en);
			try {
			    String url = api_house_add;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
				Object result = JSON.parse(resultStr);
				logger.info("http post result=" + result);
			} catch (ClientProtocolException e) {
				e.printStackTrace();
                Syslog.writeErr(e);
			} catch (IOException e) {
				e.printStackTrace();Syslog.writeErr(e);
			}
		}
	}

	
	//房源信息获取接口（查询房源状态）
    public void testGetHouse() {
        for (int i = 0; i < 1; i++) {
            List<String> list = new ArrayList<String>();
            // list.add("201809300000024");
            // list.add("201809300000025");
            list.add("201809300000026");
            String[] houseId = new String[list.size()];
            list.toArray(houseId);
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("houseId", houseId);

            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_house_info_get;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }

        }
    }

    
	//房源状态修改接口（上架、下架）
	public void testUpdateHouseStatus() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("houseId", "201809300000026");// 房源id
            dataMap.put("status", "4000");// 房屋修改状态，枚举值 3000:上线 4000:下线 5000:已出租 例如（房屋已经出租）：5000
            // dataMap.put("memo", "");// 操作说明
            
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_house_status_modify;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }

        }
    }

    
    //房源删除接口
    public void testDeleteHouseStatus() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("houseId", "201809300000026");// 房源id
            dataMap.put("memo", "123456789123456789");// 操作说明删除房源的说明信息  长度小于10
            
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_house_del;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }

        }
    }
    
    
    //修改房源接口（修改后直接转为已发布状态）
    public void testUpdateHouse() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("outHouseId", System.currentTimeMillis() + ""); // 合作公寓系统的房屋id
            dataMap.put("rentType", "2");// 出租方式，枚举值 1.整套出租 2.单间出租 例如：1
            dataMap.put("bedRoomNum", "2");// 房屋户型-室 例如（2室）：2
            dataMap.put("livingRoomNum", "1");// 房屋户型-厅例如（1室）：1
            dataMap.put("toiletNum", "1");// 房屋户型-卫 例如（1卫）：1
            dataMap.put("rentRoomArea", "90");// 对于单间出租的，为出租间面积。对于整租的为房屋总面积.单位（㎡），最多支持两位小数。例如：110
            // dataMap.put("bedRoomType", "31");//
            // 出租屋类型，枚举值。31.主卧。32.次卧。例如（主卧）：31 出租方式为单间出租时（rentType=2）必须填写
            // dataMap.put("faceToType","60");//朝向，枚举值。60:东61:南62:西63:北64:东南65:西南66:东北67:西北68:东西69:南北例如（朝南）：61
            dataMap.put("totalFloor", "15");// 楼层总数 例如（18层高的楼房）：18
            dataMap.put("houseFloor", "8");// 房间所在楼层 例如（房屋在5楼）：5
            dataMap.put("featureTag", "10,11,12,13");// 房间标签，枚举值，可多选，以逗号分隔10.离地铁近11.阳台12.独立卫生间13.厨房例如（离地铁近，有阳台）：11,12
            dataMap.put("detailPoint", "71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86");// 房屋配置，枚举值，可多选，以逗号分隔71:床;72:衣柜;73:书桌74:空调;75:暖气76:电视机77:燃气;78:微波炉79:电磁炉80:热水器;81:洗衣机;82:冰箱83:WIFI;84:沙发;85:橱柜86:油烟机例如（床，沙发）：71,84
            dataMap.put("servicePoint", "91,92,93,94,95,96,97");// 公寓配套服务，枚举值，可多选，以逗号分隔;91:健身房;92:公寓超市;93:智能门锁;94:ATM机;95:代收快递;96:专属客服;97:房间清洁
            dataMap.put("monthRent", "2500");// 月租金，以元为单位;例如（2100元/月）：2100
            dataMap.put("rentStartDate", "2016-01-01");// 起租时间，格式yyyy-MM-dd;例如：2015-12-31
            dataMap.put("shortRent", "1");// 是否支持短租，枚举值;0:不支持;1:支持s;例如(支持短租)：1
            dataMap.put("cityName", "武汉");// 房屋所在城市，城市名（没有“市”字） 例如：上海
            dataMap.put("countyName", "沌口开发区");// 房屋所在区县，上海区县详见附录1-区县;例如：浦东
            dataMap.put("areaName", "后官湖大道");// 房屋所在商圈，上海商圈详见附录1-商圈 例如：高行
            dataMap.put("districtName", "海滨城花园");// 房屋所在小区名称s 例如：新高苑
            dataMap.put("street", "海滨城路2号");// 房屋所在小区详细地址 例如：浦东高宝路229弄
            dataMap.put("address", "1号楼3单元208室");// 出租房屋门牌地址 例如：1号楼3单元208室
            dataMap.put("houseDesc", "71:床;72:衣柜;73:书桌74:空调;75:暖气76:电视机77:燃气;78:微波炉79:电磁炉80:热水器;81:洗衣机;82:冰箱83:WIFI;84:沙发;85:橱柜86:油烟机例如（床，沙发）：71,84");// 房间描述（500字以内）
            dataMap.put("xCoord", "116.506584");// 房间位置标注-经度 例如：116.506584
            dataMap.put("yCoord", "39.973175");// 房间位置标注-纬度 例如：39.973175
            dataMap.put("agentPhone", "13466666666");// 房管员手机号 例如：13466666666
            dataMap.put("agentName", "张三");// 房管员姓名 例如：张三
            dataMap.put("paymentMode", "{\"149\":\"1850\",\"150\":\"1900\",\"153\": \"1820\",\"154\": \"1790\"}");// 
            // 支付方式 149:押一付三 150:押一付一 151:押一付二 152:押二付二 153:半年付 154:年付 161:押二付一 162:押二付三 传参格式：付款方式:金额 {"149":"1850","150":"1900","153": "1820","154": "1790"}
            // dataMap.put("rentRequire", "163,164");// 入驻要求 163:不可带小孩 164:不可养宠物 165:只租女生 166:只租男生 167:无特殊要求 传参格式：枚举值，逗号隔开 163,164 注：只租男生和只租女生互斥
            // dataMap.put("hasLift", "1");// 电梯：1 无电梯 2 有电梯
            List<Map> list = new ArrayList<Map>();
            Map<String, String> pic1 = new HashMap<String, String>();
            pic1.put("detailNum", "1");
            pic1.put("picDesc", "客厅1");
            pic1.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic1);
            Map<String, String> pic2 = new HashMap<String, String>();
            pic2.put("detailNum", "1");
            pic2.put("picDesc", "客厅1");
            pic2.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic2);
            Map<String, String> pic3 = new HashMap<String, String>();
            pic3.put("detailNum", "1");
            pic3.put("picDesc", "客厅1");
            pic3.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic3);
            Map<String, String> pic4 = new HashMap<String, String>();
            pic4.put("detailNum", "1");
            pic4.put("picDesc", "客厅1");
            pic4.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic4);
            Map<String, String> pic5 = new HashMap<String, String>();
            pic5.put("detailNum", "1");
            pic5.put("picDesc", "客厅1");
            pic5.put("picUrl", "http://pic.58.com/manage.yuefu.58.com/n_v1bkujjd2aw5xfmf3qzyeq_cdebc1e04c8f0db9.jpg");
            list.add(pic5);
            dataMap.put("picUrlList", list);

            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_house_modify;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    
    //预约信息获取接口
    public void testGetHouseOrderInfo() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("limit", "100");// 分页的每页预约记录个数
            // dataMap.put("memo", "");// 操作说明
            
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_order_info_get;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }

        }
    }
    
    //
    public void testGetHouseBizInfo() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_get_biz_info;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }

        }
    }
    
    //数据统计获取接口
    public void testGetHouseBizStatistics() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_get_biz_statistics;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }

        }
    }
    
    
    //电话列表获取接口
    public void testGetHouseBizCallList() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_biz_call_list;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }

        }
    }
    
    //新增门店接口
    public void testAddApartment() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("outApartmentId", System.currentTimeMillis() + ""); // 合作公寓系统的门店id
            dataMap.put("apartmentName", "至尊寓2");// 合作公寓系统的门店名称（7位以内汉字、字母、数字）
            dataMap.put("apartmentPhone", "4000616414");// 合作公寓系统的门店电话（格式正确）
            dataMap.put("cityName", "武汉");// 房屋所在城市，城市名（没有“市”字）例如：上海
            dataMap.put("cityCode", "158");// 房屋所在城市 58code  见58小区API接口文档
            dataMap.put("countyName", "沌口开发区");// 房屋所在区县，见58小区API接口文档 例如：浦东
            dataMap.put("countyCode", "15330");// 房屋所在区县 58code 见58小区API接口文档
            dataMap.put("areaName","后官湖大道");// 房屋所在商圈，见58小区API接口文档 例如：高行
            dataMap.put("areaCode", "24784");// 房屋所在商圈 58code，见58小区API接口文档
            dataMap.put("street", "海滨城路2号");// 房屋所在小区详细地址（字数≤30） 例如：浦东高宝路229弄
            dataMap.put("xCoord", "114.2750921");// 房间位置标注-经度 例如：114.2750921
            dataMap.put("yCoord", "30.5492073");// 房间位置标注-纬度 例如：30.5492073
            dataMap.put("totalFloor", "30");// 集中式公寓总的占用楼层数量（0-30之间的整数）
            dataMap.put("roomNum", "100");// 每一层的房间数量（0-300之间的整数）
            dataMap.put("servicePoint", "141,142,143,144,145,146,147,148");// 公共服务 例：141,142,143,144,145,146,147,148
            dataMap.put("unrent", "\t\t\t\t\t*********************************************描述50-500字符*********************************************\n\t\t\t\t");// 退租说明（50-500字以内）
            dataMap.put("sublet", "\t\t\t\t\t*********************************************描述50-500字符*********************************************\n\t\t\t\t");// 转租说明（50-500字以内）
            dataMap.put("rentRequire", "163,164");// 入驻要求163,164
            dataMap.put("hasLift", "1");//电梯：1 有电梯 2 无电梯 
            // 合作公寓系统的门店图片url列表（JSON数组串）[{"detailNum":"1","picDesc":"客厅","attachmentId":"234234234234234"},{"detailNum":"2","picDesc":"卧室","attachmentId":"234234234234234"}]
            List<Map> list = new ArrayList<Map>();
            Map<String, String> pic1 = new HashMap<String, String>();
            pic1.put("detailNum", "");
            pic1.put("picDesc", "客厅");
            pic1.put("attachmentId", "kpv092v126ig|kpv0931138s0");
            list.add(pic1);
            Map<String, String> pic2 = new HashMap<String, String>();
            pic2.put("detailNum", "");
            pic2.put("picDesc", "阳台");
            pic2.put("attachmentId", "kpv0959h4fm3|kpv095aqj4lm");
            list.add(pic2);
            Map<String, String> pic3 = new HashMap<String, String>();
            pic3.put("detailNum", "");
            pic3.put("picDesc", "其他");
            pic3.put("attachmentId", "kpv09763jqe0|kpv0977d1447");
            list.add(pic3);
            dataMap.put("picUrlList", list);

            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_apartment_add;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    

    
    //门店修改接口
    public void testUpdateApartment() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("apartmentId", "kppl3ltl7j7t"); // 58的门店id
            dataMap.put("apartmentName", "至尊寓");// 合作公寓系统的门店名称（7位以内汉字、字母、数字）
            dataMap.put("apartmentPhone", "4000616414");// 合作公寓系统的门店电话（格式正确）
            dataMap.put("cityName", "武汉");// 房屋所在城市，城市名（没有“市”字）例如：上海
            dataMap.put("cityCode", "158");// 房屋所在城市 58code  见58小区API接口文档
            dataMap.put("countyName", "沌口开发区");// 房屋所在区县，见58小区API接口文档 例如：浦东
            dataMap.put("countyCode", "15330");// 房屋所在区县 58code 见58小区API接口文档
            dataMap.put("areaName","后官湖大道");// 房屋所在商圈，见58小区API接口文档 例如：高行
            dataMap.put("areaCode", "24784");// 房屋所在商圈 58code，见58小区API接口文档
            dataMap.put("street", "海滨城路2号");// 房屋所在小区详细地址（字数≤30） 例如：浦东高宝路229弄
            dataMap.put("xCoord", "114.2750921");// 房间位置标注-经度 例如：114.2750921
            dataMap.put("yCoord", "30.5492073");// 房间位置标注-纬度 例如：30.5492073
            dataMap.put("totalFloor", "30");// 集中式公寓总的占用楼层数量（0-30之间的整数）
            dataMap.put("roomNum", "100");// 每一层的房间数量（0-300之间的整数）
            dataMap.put("servicePoint", "141,142,143,144,145,146,147,148");// 公共服务 例：141,142,143,144,145,146,147,148
            dataMap.put("unrent", "\t\t\t\t\t*********************************************描述50-500字符*********************************************\n\t\t\t\t");// 退租说明（50-500字以内）
            dataMap.put("sublet", "\t\t\t\t\t*********************************************描述50-500字符*********************************************\n\t\t\t\t");// 转租说明（50-500字以内）
            dataMap.put("rentRequire", "163,164");// 入驻要求163,164
            dataMap.put("hasLift", "2");//电梯：1 有电梯 2 无电梯 
            // 合作公寓系统的门店图片url列表（JSON数组串）[{"detailNum":"1","picDesc":"客厅","attachmentId":"234234234234234"},{"detailNum":"2","picDesc":"卧室","attachmentId":"234234234234234"}]
            List<Map> list = new ArrayList<Map>();
            Map<String, String> pic1 = new HashMap<String, String>();
            pic1.put("detailNum", "");
            pic1.put("picDesc", "客厅");
            pic1.put("attachmentId", "kppfw36rlvh2|kppfw38pb0cg");
            list.add(pic1);
            Map<String, String> pic2 = new HashMap<String, String>();
            pic2.put("detailNum", "");
            pic2.put("picDesc", "阳台");
            pic2.put("attachmentId", "kppgqqk594lr|kppgqqlenudh");
            list.add(pic2);
            Map<String, String> pic3 = new HashMap<String, String>();
            pic3.put("detailNum", "");
            pic3.put("picDesc", "其他");
            pic3.put("attachmentId", "kpph1ltv7sqq|kpph1lvlr93o");
            list.add(pic3);
            dataMap.put("picUrlList", list);

            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_apartment_update;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    
    
    //发布房型接口（发布完成后进入审核）
    public void testAddLayout() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("apartmentId", "kppl3ltl7j7t");// 门店发布后生成的门店编号 例如 QcZcQEEkyQ
            dataMap.put("outHouseId", System.currentTimeMillis() + "");// 合作公寓系统的房型id
            dataMap.put("styleName", "木槿20");// 房型名称（不超过7个字）  例如，木槿
            dataMap.put("monthRent", "2100");// 最低月租金，以元为单位（不低于400） 例如（2100元/月）：2100
            dataMap.put("maxMonthRent", "2100");// 最高月租金，以元为单位 >=monthRent（不高于50000） 例如（2100元/月）：2100
            dataMap.put("rentPayType", "149");// 付款方式
            dataMap.put("bedRoomNum", "2");// 房屋户型-室 例如（2室）：2
            dataMap.put("livingRoomNum", "1");// 房屋户型-厅 例如（1室）：1  可以为0
            dataMap.put("toiletNum", "1");// 房屋户型-卫 例如（1卫）：1  可以为0
            dataMap.put("rentRoomArea", "110");// 对于单间出租的，为出租间面积 对于整租的为房屋总面积 单位（㎡）不支持小数 例如：110
            dataMap.put("faceToType", "61");// 朝向，枚举值。
            dataMap.put("featureTag", "155,156");// 特色，枚举值
            dataMap.put("detailPoint", "71,84");// 房屋配置，枚举值
            dataMap.put("houseDesc", "\t\t\t\t\t*********************************************描述50-500字符*********************************************\n\t\t\t\t");// 房间描述（50-500字以内）
            dataMap.put("agentPhone", "13466666666");// 房管员手机号 例如：13466666666
            dataMap.put("agentName", "张三");// 房管员姓名 例如：张三
            List<Map> list = new ArrayList<Map>();//照片数量：最少5张、最多24张
            Map<String, String> pic1 = new HashMap<String, String>();
            pic1.put("detailNum", "");
            pic1.put("picDesc", "客厅");
            pic1.put("attachmentId", "kppul4nc5jfp|kppul4ow7d0n");
            list.add(pic1);
            Map<String, String> pic2 = new HashMap<String, String>();
            pic2.put("detailNum", "");
            pic2.put("picDesc", "阳台");
            pic2.put("attachmentId", "kppuno3kgp0d|kppuno5ekp2b");
            list.add(pic2);
            Map<String, String> pic3 = new HashMap<String, String>();
            pic3.put("detailNum", "");
            pic3.put("picDesc", "其他");
            pic3.put("attachmentId", "kppuq18l552o|kppuq18l5vdj");
            list.add(pic3);
            Map<String, String> pic4 = new HashMap<String, String>();
            pic4.put("detailNum", "");
            pic4.put("picDesc", "其他");
            pic4.put("attachmentId", "kppus684sf13|kppus69ou4qt");
            list.add(pic4);
            Map<String, String> pic5 = new HashMap<String, String>();
            pic5.put("detailNum", "");
            pic5.put("picDesc", "其他");
            pic5.put("attachmentId", "kpputo4tafir|kpputo5e0no6");
            list.add(pic5);
            dataMap.put("picUrlList", list);
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_layout_add;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    
    
    //修改房型接口（修改完成后进入审核，正在审核的房型不可修改）
    public void testUpdateLayout() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("apartmentId", "kppl3ltl7j7t"); // 门店发布后生成的门店编号 例如 QcZcQEEkyQ
            dataMap.put("houseId", "201810110000004");// 58房型id
            dataMap.put("styleName", "木槿20");// 房型名称（不超过7个字）  例如，木槿
            dataMap.put("monthRent", "2100");// 最低月租金，以元为单位（不低于400） 例如（2100元/月）：2100
            dataMap.put("maxMonthRent", "2200");// 最高月租金，以元为单位 >=monthRent（不高于50000） 例如（2100元/月）：2100
            dataMap.put("rentPayType", "149");// 付款方式
            dataMap.put("bedRoomNum", "2");// 房屋户型-室 例如（2室）：2
            dataMap.put("livingRoomNum", "1");// 房屋户型-厅 例如（1室）：1  可以为0
            dataMap.put("toiletNum", "1");// 房屋户型-卫 例如（1卫）：1  可以为0
            dataMap.put("rentRoomArea", "110");// 对于单间出租的，为出租间面积 对于整租的为房屋总面积 单位（㎡）不支持小数 例如：110
            dataMap.put("faceToType", "61");// 朝向，枚举值。
            dataMap.put("featureTag", "155,156");// 特色，枚举值
            dataMap.put("detailPoint", "71,84");// 房屋配置，枚举值
            dataMap.put("houseDesc", "\t\t\t\t\t*********************************************描述50-500字符*********************************************\n\t\t\t\t");// 房间描述（50-500字以内）
            dataMap.put("agentPhone", "13466666666");// 房管员手机号 例如：13466666666
            dataMap.put("agentName", "张三");// 房管员姓名 例如：张三
            List<Map> list = new ArrayList<Map>();//照片数量：最少5张、最多24张
            Map<String, String> pic1 = new HashMap<String, String>();
            pic1.put("detailNum", "");
            pic1.put("picDesc", "客厅");
            pic1.put("attachmentId", "kppul4nc5jfp|kppul4ow7d0n");
            list.add(pic1);
            Map<String, String> pic2 = new HashMap<String, String>();
            pic2.put("detailNum", "");
            pic2.put("picDesc", "阳台");
            pic2.put("attachmentId", "kppuno3kgp0d|kppuno5ekp2b");
            list.add(pic2);
            Map<String, String> pic3 = new HashMap<String, String>();
            pic3.put("detailNum", "");
            pic3.put("picDesc", "其他");
            pic3.put("attachmentId", "kppuq18l552o|kppuq18l5vdj");
            list.add(pic3);
            Map<String, String> pic4 = new HashMap<String, String>();
            pic4.put("detailNum", "");
            pic4.put("picDesc", "其他");
            pic4.put("attachmentId", "kppus684sf13|kppus69ou4qt");
            list.add(pic4);
            Map<String, String> pic5 = new HashMap<String, String>();
            pic5.put("detailNum", "");
            pic5.put("picDesc", "其他");
            pic5.put("attachmentId", "kpputo4tafir|kpputo5e0no6");
            list.add(pic5);
            dataMap.put("picUrlList", list);
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_layout_update;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    
    
    //房间添加接口（添加房间并绑定到现有的房型上）
    public void testAddApartmentroom() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("apartmentId", "kppl3ltl7j7t"); // 门店发布后生成的门店编号 例如 QcZcQEEkyQ
            dataMap.put("houseId", "201810110000004");// 房型发布后生成的房型编号 例如 201512310000004
            dataMap.put("floorNum", "2");// 房间所在楼层（小于门店总楼层数）
            dataMap.put("roomNum", "205");// 房间号（不可重复）
            dataMap.put("roomStatus", "3000");// 房间状态  3000 可出租 5000 已出租
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_apartmentroom_add;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    
    
    //房间修改接口（审核中房型不可将下属房间从 待出租状态修改至已出租状态）
    public void testUpdateApartmentroom() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("apartmentId", "kppl3ltl7j7t"); // 门店发布后生成的门店编号 例如 QcZcQEEkyQ
            dataMap.put("roomId", "12w4");// 58房间Id
            dataMap.put("floorNum", "2");// 房间所在楼层（小于门店总楼层数）
            dataMap.put("roomNum", "206");// 房间号（不可重复）
            dataMap.put("roomStatus", "3000");// 房间状态  3000 可出租 5000 已出租
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_apartmentroom_update;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    
    
    //上传图片接口（单张上传）
    public void testUploadAttachment() {
        for (int i = 0; i < 1; i++) {
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", "58app");// 58分配给合作公寓的接入ID
            dataMap.put("url", "http://pic-gongkai.fangzhizun.com/FrUg8FOtjnUyX46boutdWkWjO6kF5785.jpg"); // 图片url
            dataMap.put("optType", "5");// 图片类型 1.房型图片 5.门店图片
            logger.info("info=" + JSON.toJSONString(dataMap));
            String en = ThirdRSACoder.encrypt(JSON.toJSONString(dataMap), privateKey);
            logger.info("en=" + en);
            String de = ThirdRSACoder.decrypt(en, publicKey);
            logger.info("de=" + de);
            Map<String, String> map = new HashMap<String, String>();
            map.put("data", en);
            try {
                String url = api_upload_attachment;
                String resultStr = ThirdHttpUtil.postResponse(url, map);
                Object result = JSON.parse(resultStr);
                logger.info("http post result=" + result);
            } catch (ClientProtocolException e) {
                e.printStackTrace();Syslog.writeErr(e);
            } catch (IOException e) {
                e.printStackTrace();Syslog.writeErr(e);
            }
        }
    }
    
    //58字典查询
    public void testCity() {
        String url = "http://dict.58.com/api/local/getLocalList/?pid=606&uid=test&token=595b8bd43587307f89ce194169bb4542&token_time=2015072915011";
        String result = HttpRequestUtil.get(url);
        System.out.println(result);
    }
}
