package com.zz.service.push;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zz.mapper.push.Push58HouseMapper;
import com.zz.mapper.push.Push58UnitMapper;
import com.zz.po.push.Push58House;
import com.zz.po.push.Push58Unit;
import com.zz.rsa.Push58HouseApi;

public class Push58HouseServiceImpl implements Push58HouseService {
    private Push58HouseMapper push58HouseMapper;
    private Push58UnitMapper push58UnitMapper;

    public void setPush58HouseMapper(Push58HouseMapper push58HouseMapper) {
        this.push58HouseMapper = push58HouseMapper;
    }

    public void setPush58UnitMapper(Push58UnitMapper push58UnitMapper) {
        this.push58UnitMapper = push58UnitMapper;
    }

    @Override
    public int insertSelective(Push58House record) throws Exception {
        return push58HouseMapper.insertSelective(record);
    }

    @Override
    public List<Push58House> selectByPrimaryKey(Integer p5hId)
            throws Exception {
        return push58HouseMapper.selectByPrimaryKey(p5hId);
    }

    @Override
    public int updateByPrimaryKeySelective(Push58House record)
            throws Exception {
        return push58HouseMapper.updateByPrimaryKeySelective(record);
    }

    /**
     * 发布分散式房源
     * 1.调用58API获取房间id
     * 2.解析json
     * 3.元单位表添加记录
     * 4.分散式房间表添加记录
     */
    @Override
    public String push58House(Push58House record) throws Exception {
        //1.调用58API获取房间id
        String result = Push58HouseApi.post(record.getP5hDetail(), 1);
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
        Long p5hHouseId = (Long) resultObj2.get("houseId");
        record.setP5hHouseId(p5hHouseId);
        //2.解析json
        JSONObject obj = JSON.parseObject(record.getP5hDetail());
        String outHouseId = (String) obj.get("outHouseId");
        //3.元单位表添加记录
        Push58Unit push58Unit = new Push58Unit();
        push58Unit.setP5uHsId(Integer.parseInt(outHouseId));
        push58Unit.setP5uHouseType("分散式");
        push58UnitMapper.insertSelective(push58Unit);
        //4.分散式房间表添加记录
        record.setP5hP5uId(push58Unit.getP5uId());
        push58HouseMapper.insertSelective(record);
        return "success";
    }

    /**
     * 查询分散式房源
     */
    @Override
    public List<Push58House> query58House(Push58House record) throws Exception {
        return push58HouseMapper.query58House(record);
    }

    /**
     * 修改房源并重新发布
     * 1.调用58API修改并重新发布
     * 2.更新数据库
     */
    @Override
    public String update58House(Push58House record) throws Exception {
        String result = Push58HouseApi.post(record.getP5hDetail(), 4);
        if ("error".equals(result)) {
            return "请求错误";
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if (!"0".equals(code)) {
            return msg;
        }
        push58HouseMapper.updateByPrimaryKeySelective(record);
        return "success";
    }

}
