package com.zz.actions.journal;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.opensymphony.xwork2.ModelDriven;
import com.zz.actions.commons.BaseAction;
import com.zz.actions.commons.CommonMethodClass;
import com.zz.other.Syslog;
import com.zz.po.commons.Result;
import com.zz.po.journal.JourShiftRecord;
import com.zz.service.journal.JourShiftRecordService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class JourShiftRecordAction extends BaseAction implements ModelDriven<JourShiftRecord> {

    private JourShiftRecord jourShiftRecord;

    @Autowired
    private JourShiftRecordService jourShiftRecordService;

    public void setJourShiftRecordService(JourShiftRecordService jourShiftRecordService) {
        this.jourShiftRecordService = jourShiftRecordService;
    }

    @Override
    public JourShiftRecord getModel() {

        if (jourShiftRecord == null) {
            jourShiftRecord = new JourShiftRecord();
        }
        return jourShiftRecord;
    }

    //查出所有的交接班记录
    public String getShiftRecordInfo() {

        try {
            Result<List<JourShiftRecord>> result = jourShiftRecordService.getShiftRecordInfo(jourShiftRecord);
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);

        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, e.getMessage(), null));
        }

        return null;
    }

    //插入交接班数据
    public void insertShiftRecord(){

        System.out.println(jourShiftRecord.getJsrTime());
        try {
            int result = jourShiftRecordService.insertSelective(jourShiftRecord);
            if(result > 0){
                printlnOfJson(CommonMethodClass.jsonData(1, "成功", null));
            }else{
                printlnOfJson(CommonMethodClass.jsonData(-1, "添加失败", null));
            }
        } catch (Exception e) {
            e.printStackTrace();
            Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }

    }

    //根据传入的条件查询交班记录
    public String selectShiftRecord() {

        try {
            Result<List<JourShiftRecord>> result = jourShiftRecordService.selectShiftRecord(jourShiftRecord);
            String resultStr = JSON.toJSONString(result, SerializerFeature.WriteMapNullValue);
            printlnOfJson(resultStr);
        } catch (Exception e) {
            e.printStackTrace();Syslog.writeErr(e);
            printlnOfJson(CommonMethodClass.jsonData(-2, "系统异常！", null));
        }

        return null;
    }






}
