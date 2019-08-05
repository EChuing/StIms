package com.zz.service.push;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zz.mapper.push.Push58RoomMapper;
import com.zz.mapper.push.Push58UnitMapper;
import com.zz.po.push.Push58Room;
import com.zz.po.push.Push58Unit;
import com.zz.rsa.Push58HouseApi;

public class Push58RoomServiceImpl implements Push58RoomService {
    private Push58RoomMapper push58RoomMapper;
    private Push58UnitMapper push58UnitMapper;

    public void setPush58RoomMapper(Push58RoomMapper push58RoomMapper) {
        this.push58RoomMapper = push58RoomMapper;
    }

    public void setPush58UnitMapper(Push58UnitMapper push58UnitMapper) {
        this.push58UnitMapper = push58UnitMapper;
    }

    @Override
    public int insertSelective(Push58Room record) throws Exception {
        return push58RoomMapper.insertSelective(record);
    }

    @Override
    public List<Push58Room> selectByPrimaryKey(Integer p5rId) throws Exception {
        return push58RoomMapper.selectByPrimaryKey(p5rId);
    }

    @Override
    public int updateByPrimaryKeySelective(Push58Room record) throws Exception {
        return push58RoomMapper.updateByPrimaryKeySelective(record);
    }

    /**
     * 添加房间
     * 1.调用58API获取房间id
     * 2.解析json
     * 3.元单位表添加记录
     * 4.房间表添加记录
     */
    @Override
    public String add58Room(Push58Room record) throws Exception {
        //1.调用58API获取房间id
        String result = Push58HouseApi.post(record.getP5rDetail(), 16);
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
        String p5rRoomId = (String) resultObj2.get("roomId");
        record.setP5rRoomId(p5rRoomId);
        //2.解析json
        JSONObject obj = JSON.parseObject(record.getP5rDetail());
        String outHouseId = (String) obj.get("outHouseId");
        //3.元单位表添加记录
        Push58Unit push58Unit = new Push58Unit();
        push58Unit.setP5uHsId(Integer.parseInt(outHouseId));
        push58Unit.setP5uHouseType("集中式");
        push58UnitMapper.insertSelective(push58Unit);
        //4.集中式房间表添加记录
        record.setP5rP5uId(push58Unit.getP5uId());
        push58RoomMapper.insertSelective(record);
        return "success";
    }

    @Override
    public List<Push58Room> query58Room(Push58Room record) throws Exception {
        return push58RoomMapper.query58Room(record);
    }

    /**
     * 修改房间
     * 1.调用58API修改房间
     * 2.更新数据库
     */
    @Override
    public String update58Room(Push58Room record) throws Exception {
        String result = Push58HouseApi.post(record.getP5rDetail(), 17);
        if ("error".equals(result)) {
            return "请求错误";
        }
        JSONObject resultObj = JSON.parseObject(result);
        String code = (String) resultObj.get("code");
        String msg = (String) resultObj.get("msg");
        if (!"0".equals(code)) {
            return msg;
        }
        push58RoomMapper.updateByPrimaryKeySelective(record);
        return "success";
    }

}
