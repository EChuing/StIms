package com.zz.service.push;

import java.util.List;
import java.util.TreeMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zz.mapper.push.Push58LayoutMapper;
import com.zz.po.push.Push58Layout;
import com.zz.rsa.Push58HouseApi;

public class Push58LayoutServiceImpl implements Push58LayoutService {
    private Push58LayoutMapper push58LayoutMapper;

    public void setPush58LayoutMapper(Push58LayoutMapper push58LayoutMapper) {
        this.push58LayoutMapper = push58LayoutMapper;
    }

    @Override
    public int insertSelective(Push58Layout record) throws Exception {
        return push58LayoutMapper.insertSelective(record);
    }

    @Override
    public List<Push58Layout> selectByPrimaryKey(Integer p5lId)
            throws Exception {
        return push58LayoutMapper.selectByPrimaryKey(p5lId);
    }

    @Override
    public int updateByPrimaryKeySelective(Push58Layout record)
            throws Exception {
        return push58LayoutMapper.updateByPrimaryKeySelective(record);
    }

    /**
     * 添加房型
     * 1.调用58API上传图片
     * 2.调用58API获取房型id
     * 3.房型表添加记录
     */
    @Override
    public String add58Layout(Push58Layout record) throws Exception {
        //1.调用58API上传图片
        JSONObject p5lDetail = JSON.parseObject(record.getP5lDetail());
        JSONArray picUrlList = (JSONArray) p5lDetail.get("picUrlList");
        JSONArray picUrlList2 = new JSONArray();
        for (Object obj : picUrlList) {
            JSONObject item = (JSONObject) obj;
            String url = (String) item.get("attachmentId");
            TreeMap<String, Object> dataMap = new TreeMap<String, Object>();
            dataMap.put("appId", p5lDetail.get("appId"));// 58分配给合作公寓的接入ID
            dataMap.put("url", url); // 图片url
            dataMap.put("optType", "1");// 图片类型 1.房型图片 5.门店图片
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
        p5lDetail.put("picUrlList", picUrlList2);
        //2.调用58API获取房型id
        String result = Push58HouseApi.post(JSON.toJSONString(p5lDetail), 13);
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
        Long houseId = (Long) resultObj2.get("houseId");
        record.setP5lLayoutId(houseId.toString());
        //3.房型表添加记录
        push58LayoutMapper.insertSelective(record);
        return "success";
    }

    @Override
    public List<Push58Layout> query58Layout(Push58Layout record)
            throws Exception {
        return push58LayoutMapper.query58Layout(record);
    }

    /**
     * 修改房型
     * 1.调用58API修改房型
     * 2.更新数据库
     */
    @Override
    public String update58Layout(Push58Layout record) throws Exception {
        String result = Push58HouseApi.post(record.getP5lDetail(), 14);
        if ("error".equals(result)) {
            return "请求错误";
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if (!"0".equals(code)) {
            return msg;
        }
        push58LayoutMapper.updateByPrimaryKeySelective(record);
        return "success";
    }

}
