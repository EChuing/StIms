package com.zz.actions.journal;

import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.mapper.journal.JourFaceRecognitionInformationMapper;
import com.zz.po.journal.JourFaceRecognitionInformation;
import com.zz.po.sys.SysUserExpand;
import com.zz.service.journal.JourFaceRecognitionInformationService;
import org.apache.struts2.json.JSONUtil;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class JourFaceRecognitionInformationAction extends BaseAction implements ModelDriven<JourFaceRecognitionInformation> {
    private JourFaceRecognitionInformation jourFaceRecognitionInformation;
    @Resource
    private JourFaceRecognitionInformationMapper jourFaceRecognitionInformationMapper;
    @Resource
    private JourFaceRecognitionInformationService jourFaceRecognitionInformationService;
    @Override
    public JourFaceRecognitionInformation getModel() {
        if(jourFaceRecognitionInformation == null){
            jourFaceRecognitionInformation = new JourFaceRecognitionInformation();
        }
        return jourFaceRecognitionInformation;
    }
    public String selectJourFaceRecognitionInformation(){
        try {
            List<JourFaceRecognitionInformation> list = jourFaceRecognitionInformationService.selectJourFaceRecognitionInformation(jourFaceRecognitionInformation);
            if(list.size() > 0){
                String json = JSONUtil.serialize(list);
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", json));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "没有查询到符合条件的记录！", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常", null));
        }
        return null;
    }
    public String selectUsersIdInformation(){
        return null;
    }
    public String insertJourFaceInformation(){
        try {
            long l = System.currentTimeMillis();
            Date date1 = new Date(l);
            SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String format = formatter1.format(date1);
            SysUserExpand sessionUserInfo = CommonMethodClass.getSessionUserInfo();
            System.out.println();
            jourFaceRecognitionInformation.setJftiPasernType("用户");
            jourFaceRecognitionInformation.setJfriShowTime(format);
            jourFaceRecognitionInformation.setJftiType(1);
            jourFaceRecognitionInformation.setJftiRecMode("5");
            jourFaceRecognitionInformation.setJftiPhotoUrl("");
            jourFaceRecognitionInformation.setJftiPersonName(sessionUserInfo.getSuStaffName());
            int i = jourFaceRecognitionInformationMapper.insertJourFaceRecognitionInformation(jourFaceRecognitionInformation);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }


}
