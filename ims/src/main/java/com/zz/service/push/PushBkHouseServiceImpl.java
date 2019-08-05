package com.zz.service.push;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.mapper.push.PushBkHouseMapper;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.push.PushBkHouse;

public class PushBkHouseServiceImpl implements PushBkHouseService{
	private PushBkHouseMapper pushBkHouseMapper;
	private PushBkApiService pushBkApiService;
	private JournalAttachmentMapper journalAttachmentMapper;
	public void setPushBkHouseMapper(PushBkHouseMapper pushBkHouseMapper) {
		this.pushBkHouseMapper = pushBkHouseMapper;
	}

	public void setPushBkApiService(PushBkApiService pushBkApiService) {
        this.pushBkApiService = pushBkApiService;
    }

    public void setJournalAttachmentMapper(JournalAttachmentMapper journalAttachmentMapper) {
        this.journalAttachmentMapper = journalAttachmentMapper;
    }

    @Override
	public List<PushBkHouse> queryBkHouse(PushBkHouse record) throws Exception {
		
		return pushBkHouseMapper.queryBkHouse(record);
	}

	@Override
	public int insertSelective(PushBkHouse record) throws Exception {
		
		return pushBkHouseMapper.insertSelective(record);
	}

	@Override
	public PushBkHouse selectByPrimaryKey(Integer pbhId) throws Exception {
		
		return pushBkHouseMapper.selectByPrimaryKey(pbhId);
	}

	@Override
	public int updateByPrimaryKeySelective(PushBkHouse record) throws Exception {
		
		return pushBkHouseMapper.updateByPrimaryKeySelective(record);
	}

    @Override
    public String publishBkHouse(PushBkHouse record) throws Exception {
        Map mapTypes = null;
        if(record.getPbhDetail()!=null && !"".equals(record.getPbhDetail())){
            mapTypes = JSON.parseObject(record.getPbhDetail());
        }
        Map map = pushBkApiService.getAccessToken();
        if (map != null) {
            String appKey = (String) map.get("appKey");
            map.remove("appKey");
            if(mapTypes != null){
                map.putAll(mapTypes);
            }
            map.put("signCode", pushBkApiService.sign(map, appKey));
            String result = pushBkApiService.post(map, "publishHouse");
            JSONObject resultObj = JSON.parseObject(result);
            int errorCode = (int) resultObj.get("errorCode");
            String msg = resultObj.getString("msg");
            if (errorCode == 200000) {
                JSONObject data = resultObj.getJSONObject("data");
                String houseCode = data.getString("houseCode");
                record.setPbhHouseId(houseCode);
                String att = record.getAtt();
                String path = null;
                String num = null;
                if(att != null){
                    JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
                    if(attachment != null){
                        path = attachment.getPath();
                        num = attachment.getNum();
                        int result2 = journalAttachmentMapper.deleteByAtt(att);
                        if(result2 == 0){
                            throw new Exception("从附件表删除记录失败");
                        }
                    }
                }
                record.setPbhImgPath(path);
                record.setPbhImgNum(num);
                insertSelective(record);
                return "success";
            } else {
                return msg;
            }
        } else {
            return "获取授权码失败";
        }
    }

    @Override
    public String editBkHouse(PushBkHouse record) throws Exception {
        Map mapTypes = null;
        if(record.getPbhDetail()!=null && !"".equals(record.getPbhDetail())){
            mapTypes = JSON.parseObject(record.getPbhDetail());
        }
        Map map = pushBkApiService.getAccessToken();
        if (map != null) {
            String appKey = (String) map.get("appKey");
            map.remove("appKey");
            if(mapTypes != null){
                map.putAll(mapTypes);
            }
            map.put("signCode", pushBkApiService.sign(map, appKey));
            String result = pushBkApiService.post(map, "editHouse");
            JSONObject resultObj = JSON.parseObject(result);
            int errorCode = (int) resultObj.get("errorCode");
            String msg = resultObj.getString("msg");
            if (errorCode == 200000) {
                updateByPrimaryKeySelective(record);
                return "success";
            } else {
                return msg;
            }
        } else {
            return "获取授权码失败";
        }
    }

}
