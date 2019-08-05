package com.zz.actions.info;

import java.util.List;

import com.zz.other.Syslog;
import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.actions.commons.UploadUtil;
import com.zz.po.info.InfoFile;
import com.zz.service.info.FileService;

public class FileAction extends BaseAction implements ModelDriven<InfoFile>{
	private InfoFile infoFile;
	private FileService fileService;
	
	public void setInfoFile(InfoFile infoFile) {
		this.infoFile = infoFile;
	}

	public void setFileService(FileService fileService) {
		this.fileService = fileService;
	}
	
	@Override
	public InfoFile getModel() {
		if(infoFile==null){
			infoFile = new InfoFile();
		}
		return infoFile;
	}
	
	/**
	 * 查询所有，给出条件根据条件查询
	 */
    public void queryFiles() {
        try {
            List<InfoFile> list = fileService.selectAll(infoFile);
            for (InfoFile item : list) {
                item.setFileDownloadPath(UploadUtil.getDownloadUrl(item.getFilePath()));
            }
            Integer total;
            if (list.size() > 0) {
                total = Integer.parseInt(list.get(0).getTotalNum());
            } else {
                total = 0;
            }
            JSONObject jsonObj = new JSONObject();
            jsonObj.accumulate("total", total);
            jsonObj.accumulate("rows", list);
            String json = jsonObj.toString();
            printlnOfJson(json);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
    }
    
    /**
     * 修改文件
     */
    public void updateFile(){
        try {
            int result = fileService.updateFile(infoFile);
            if(result > 0){
                printlnMsg("1");
            }else{
                printlnMsg("-2");
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnMsg("-1");
        }           
    }
    
    /**
     * 删除文件
     */
    public void deleteFile() {
        try {
            List<InfoFile> list = fileService.selectAll(infoFile);
            if (list.isEmpty()) {
                printlnMsg("-1");
                return;
            }
            int result = fileService.deleteFile(infoFile.getFileId());
            if (result > 0) {
                String url = list.get(0).getFilePath();
                int index = CommonMethodClass.getIndex(url, 3, "/");
                if(index > -1){
                    index++;
                    UploadUtil.delete(url.substring(index, url.length()));
                }
                
                printlnMsg("1");
            }else{
                printlnMsg("-2");
            }
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnMsg("-1");
        }
    }
}
