package com.zz.service.push;

import java.util.List;
import java.util.TreeMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zz.mapper.push.Push58ApartmentMapper;
import com.zz.po.push.Push58Apartment;
import com.zz.rsa.Push58HouseApi;

public class Push58ApartmentServiceImpl implements Push58ApartmentService {
    private Push58ApartmentMapper push58ApartmentMapper;

    public void setPush58ApartmentMapper(
            Push58ApartmentMapper push58ApartmentMapper) {
        this.push58ApartmentMapper = push58ApartmentMapper;
    }

    @Override
    public int insertSelective(Push58Apartment record) throws Exception {
        return push58ApartmentMapper.insertSelective(record);
    }

    @Override
    public List<Push58Apartment> selectByPrimaryKey(Integer p5aId)
            throws Exception {
        return push58ApartmentMapper.selectByPrimaryKey(p5aId);
    }

    @Override
    public int updateByPrimaryKeySelective(Push58Apartment record)
            throws Exception {
        return push58ApartmentMapper.updateByPrimaryKeySelective(record);
    }

    /**
     * 添加门店
     * 1.调用58API上传图片
     * 2.调用58API获取门店id
     * 3.门店表添加记录
     */
    @Override
    public String add58Apartment(Push58Apartment record) throws Exception {
        //1.调用58API上传图片
        JSONObject p5aDetail = JSON.parseObject(record.getP5aDetail());
        JSONArray picUrlList = (JSONArray) p5aDetail.get("picUrlList");
        JSONArray picUrlList2 = new JSONArray();
        for (Object obj : picUrlList) {
            JSONObject item = (JSONObject) obj;
            String url = (String) item.get("attachmentId");
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", p5aDetail.get("appId"));// 58分配给合作公寓的接入ID
            dataMap.put("url", url); // 图片url
            dataMap.put("optType", "5");// 图片类型 1.房型图片 5.门店图片
            String result2 = Push58HouseApi.post(JSON.toJSONString(dataMap), 19);
            System.out.println("result2:"+result2);
            if ("error".equals(result2)) {
                return "图片上传失败";
            }
            JSONObject resultObj = JSON.parseObject(result2);
            String code = (String) resultObj.get("code");
            String msg = (String) resultObj.get("msg");
            if (!"0".equals(code)) {
                return msg;
            }
            JSONObject resultObj3 = (JSONObject) resultObj.get("result");
            String attachmentId = (String) resultObj3.get("attachmentId");
            System.out.println("attachmentId="+attachmentId);
            item.put("attachmentId", attachmentId);
            picUrlList2.add(item);
        }
        p5aDetail.put("picUrlList", picUrlList2);
        //2.调用58API获取门店id
        String result = Push58HouseApi.post(JSON.toJSONString(p5aDetail), 10);
        if ("error".equals(result)) {
            return "请求错误";
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if (!"0".equals(code)) {
            return msg;
        }
        JSONObject resultObj2 = (JSONObject) resultObj.get("result");
        String p5aApartmentId = (String) resultObj2.get("apartmentId");
        record.setP5aApartmentId(p5aApartmentId);
        //3.门店表添加记录
        push58ApartmentMapper.insertSelective(record);
        return "success";
    }

    @Override
    public List<Push58Apartment> query58Apartment(Push58Apartment record) throws Exception {
        return push58ApartmentMapper.query58Apartment(record);
    }

    /**
     * 修改门店
     * 1.调用58API修改门店
     * 2.更新数据库
     */
    @Override
    public String update58Apartment(Push58Apartment record) throws Exception {
        String result = Push58HouseApi.post(record.getP5aDetail(), 11);
        if ("error".equals(result)) {
            return "请求错误";
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if (!"0".equals(code)) {
            return msg;
        }
        push58ApartmentMapper.updateByPrimaryKeySelective(record);
        return "success";
    }

}
