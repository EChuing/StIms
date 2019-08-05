package com.zz.service.push;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.mapper.push.PushBkRentUnitMapper;
import com.zz.mapper.push.PushBkUnitMapper;
import com.zz.po.journal.JournalAttachment;
import com.zz.po.push.PushBkRentUnit;
import com.zz.po.push.PushBkUnit;

public class PushBkRentUnitServiceImpl implements PushBkRentUnitService{
	private PushBkRentUnitMapper pushBkRentUnitMapper;
	private PushBkUnitMapper pushBkUnitMapper;
	private PushBkApiService pushBkApiService;
	private JournalAttachmentMapper journalAttachmentMapper;
	public void setJournalAttachmentMapper(JournalAttachmentMapper journalAttachmentMapper) {
        this.journalAttachmentMapper = journalAttachmentMapper;
    }

    public void setPushBkRentUnitMapper(PushBkRentUnitMapper pushBkRentUnitMapper) {
		this.pushBkRentUnitMapper = pushBkRentUnitMapper;
	}

	public void setPushBkUnitMapper(PushBkUnitMapper pushBkUnitMapper) {
        this.pushBkUnitMapper = pushBkUnitMapper;
    }

    public void setPushBkApiService(PushBkApiService pushBkApiService) {
        this.pushBkApiService = pushBkApiService;
    }

	@Override
	public int insertSelective(PushBkRentUnit record) throws Exception {
		
		return pushBkRentUnitMapper.insertSelective(record);
	}

	@Override
	public PushBkRentUnit selectByPrimaryKey(Integer pbruId) throws Exception {
		
		return pushBkRentUnitMapper.selectByPrimaryKey(pbruId);
	}

	@Override
	public int updateByPrimaryKeySelective(PushBkRentUnit record) throws Exception {
		
		return pushBkRentUnitMapper.updateByPrimaryKeySelective(record);
	}

    @Override
    public String publishBkRentUnit(PushBkRentUnit record) throws Exception { 
        Map mapTypes = null;
        if(record.getPbruDetail()!=null && !"".equals(record.getPbruDetail())){
            mapTypes = JSON.parseObject(record.getPbruDetail());
        }
        Map map = pushBkApiService.getAccessToken();
        if (map != null) {
            String appKey = (String) map.get("appKey");
            map.remove("appKey");
            if(mapTypes != null){
                map.putAll(mapTypes);
            }
            map.put("signCode", pushBkApiService.sign(map, appKey));
            String result = pushBkApiService.post(map, "publishRentUnit");
            JSONObject resultObj = JSON.parseObject(result);
            int errorCode = (int) resultObj.get("errorCode");
            String msg = resultObj.getString("msg");
            if (errorCode == 200000) {
                JSONObject data = resultObj.getJSONObject("data");
                //贝壳出租单元编号
                String rentUnitCode = data.getString("rentUnitCode");
                String thirdRentUnitCode = data.getString("thirdRentUnitCode");
                record.setPbruUnitId(rentUnitCode);//贝壳出租单元id
                //元单位表添加记录
                PushBkUnit pushBkUnit = new PushBkUnit();
                pushBkUnit.setPbuHsId(Integer.valueOf(thirdRentUnitCode));
                pushBkUnit.setPbuHouseType("分散式");
                pushBkUnitMapper.insertSelective(pushBkUnit);
                //出租单元表添加记录
                record.setPbruPbuId(pushBkUnit.getPbuId());//元单位id
                record.setPbruHouseId((String) map.get("houseCode"));//贝壳房源id
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
                record.setPbruImgPath(path);
                record.setPbruImgNum(num);
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
    public String editBkRentUnit(PushBkRentUnit record) throws Exception {
        Map mapTypes = null;
        if(record.getPbruDetail()!=null && !"".equals(record.getPbruDetail())){
            mapTypes = JSON.parseObject(record.getPbruDetail());
        }
        Map map = pushBkApiService.getAccessToken();
        if (map != null) {
            String appKey = (String) map.get("appKey");
            map.remove("appKey");
            if(mapTypes != null){
                map.putAll(mapTypes);
            }
            map.put("signCode", pushBkApiService.sign(map, appKey));
            String result = pushBkApiService.post(map, "editRentUnit");
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
    
    @Override
    public String editBkRentUnitPayment(PushBkRentUnit record) throws Exception {
        Map mapTypes = null;
        if(record.getPbruDetail()!=null && !"".equals(record.getPbruDetail())){
            mapTypes = JSON.parseObject(record.getPbruDetail());
        }
        Map map = pushBkApiService.getAccessToken();
        if (map != null) {
            String appKey = (String) map.get("appKey");
            map.remove("appKey");
            if(mapTypes != null){
                map.putAll(mapTypes);
            }
            map.put("signCode", pushBkApiService.sign(map, appKey));
            String result = pushBkApiService.post(map, "editPayment");
            JSONObject resultObj = JSON.parseObject(result);
            int errorCode = (int) resultObj.get("errorCode");
            String msg = resultObj.getString("msg");
            if (errorCode == 200000) {
                record.setPbruDetail(null);
                updateByPrimaryKeySelective(record);
                return "success";
            } else {
                return msg;
            }
        } else {
            return "获取授权码失败";
        }
    }

    @Override
    public List<PushBkRentUnit> queryBkRentUnit(PushBkRentUnit record) throws Exception {
        return pushBkRentUnitMapper.queryBkRentUnit(record);
    }

}
