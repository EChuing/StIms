package com.zz.service.journal;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.zz.actions.commons.UploadUtil;
import com.zz.mapper.journal.JournalAttachmentMapper;
import com.zz.po.journal.JournalAttachment;

public class AttachmentServiceImpl implements AttachmentService {

	private JournalAttachmentMapper journalAttachmentMapper;

	public void setJournalAttachmentMapper(
			JournalAttachmentMapper journalAttachmentMapper) {
		this.journalAttachmentMapper = journalAttachmentMapper;
	}

	@Override
	public int deleteByAtt(String att) {
		return journalAttachmentMapper.deleteByAtt(att);
	}
	@Override
	public int deleteByAtt2(String att2) {
		return journalAttachmentMapper.deleteByAtt2(att2);
	}

	@Override
	public int insert(JournalAttachment record) {
		return journalAttachmentMapper.insert(record);
	}

	@Override
	public JournalAttachment selectByAtt(String att) {
		return journalAttachmentMapper.selectByAtt(att);
	}
	@Override
	public JournalAttachment selectByAtt2(String att2) {
		return journalAttachmentMapper.selectByAtt2(att2);
	}

	@Override
	public int updateByAtt(JournalAttachment record) {
		return journalAttachmentMapper.updateByAtt(record);
	}
	
	@Override
	public int updateByAtt2(JournalAttachment record) {
		return journalAttachmentMapper.updateByAtt2(record);
	}

	@Override
	public int deleteRecordAndFile(String att) {
		JournalAttachment attachment = journalAttachmentMapper.selectByAtt(att);
		if(attachment != null){
			String path = attachment.getPath();
			if(path != null){
				JSONArray jsonArray = JSONArray.fromObject("["+path+"]");
				for(Object obj:jsonArray){
					JSONObject jsonObject = JSONObject.fromObject(obj.toString());
					String url = (String)jsonObject.get("path");//url=http://pic-public.fangzhizun.com/201609261474875087178093895.jpg
					UploadUtil.delete(url.substring(33,url.length()));
				}
			}
		}
		return journalAttachmentMapper.deleteByAtt(att);
	}
	@Override
	public int deleteRecordAndFile2(String att2) {
		JournalAttachment attachment = journalAttachmentMapper.selectByAtt2(att2);
		if(attachment != null){
			String path = attachment.getPath();
			if(path != null){
				JSONArray jsonArray = JSONArray.fromObject("["+path+"]");
				for(Object obj:jsonArray){
					JSONObject jsonObject = JSONObject.fromObject(obj.toString());
					String url = (String)jsonObject.get("path");//url=http://pic-public.fangzhizun.com/201609261474875087178093895.jpg
					UploadUtil.delete(url.substring(33,url.length()));
				}
			}
		}
		return journalAttachmentMapper.deleteByAtt2(att2);
	}

    @Override
    public int updateBkType(JournalAttachment record) {
        JournalAttachment att = journalAttachmentMapper.selectByAtt(record.getAtt());
        String path = att.getPath();
        String bk= record.getBk();
        JSONArray jsonArray = JSONArray.fromObject("["+path+"]");
        JSONArray jsonArray2 = JSONArray.fromObject(bk);
        JSONArray jsonArray3 = new JSONArray();
        for(Object obj:jsonArray){
            JSONObject jsonObject = JSONObject.fromObject(obj.toString());
            String url = (String) jsonObject.get("path");
            for(Object obj2:jsonArray2){
                JSONObject jsonObject2 = JSONObject.fromObject(obj2.toString());
                String url2 = (String) jsonObject2.get("path");
                if (url.equals(url2)) {
                    jsonObject.put("type", jsonObject2.get("type"));
                    jsonObject.put("cover", jsonObject2.get("cover"));
                }
            }
            jsonArray3.add(jsonObject);
        }
        String newPath = jsonArray3.toString();
        newPath = newPath.substring(1, newPath.length() - 1);
        att.setPath(newPath);
        return journalAttachmentMapper.updateByAtt(att);
    }
	
}
