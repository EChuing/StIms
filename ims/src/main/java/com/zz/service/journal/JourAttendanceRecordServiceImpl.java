package com.zz.service.journal;

import com.zz.mapper.journal.JourAttendanceRecordMapper;
import com.zz.mapper.journal.JourShiftScheduleMapper;
import com.zz.po.journal.JourAttendanceRecord;
import com.zz.util.DateUtil;

import java.util.List;

//用户考勤记录表
public class JourAttendanceRecordServiceImpl implements JourAttendanceRecordService {

    private JourAttendanceRecordMapper jourAttendanceRecordMapper;

    public JourAttendanceRecordMapper getJourAttendanceRecordMapper() {
        return jourAttendanceRecordMapper;
    }

    public void setJourAttendanceRecordMapper(JourAttendanceRecordMapper jourAttendanceRecordMapper) {
        this.jourAttendanceRecordMapper = jourAttendanceRecordMapper;
    }

    private JourShiftScheduleMapper jourShiftScheduleMapper;

    public JourShiftScheduleMapper getJourShiftScheduleMapper() {
        return jourShiftScheduleMapper;
    }

    public void setJourShiftScheduleMapper(JourShiftScheduleMapper jourShiftScheduleMapper) {
        this.jourShiftScheduleMapper = jourShiftScheduleMapper;
    }

    //上班打卡
    @Override
    public int insertSelective(JourAttendanceRecord record) throws Exception {

        String time = DateUtil.getCurDateTime();

        if (record.getJar() == 1) {

            record.setJarWork1(time);

        } else if (record.getJar() == 10) {

            record.setJarOffwork1(time);

        } else if (record.getJar() == 2) {

            record.setJarWork2(time);

        } else if (record.getJar() == 20) {

            record.setJarOffwork2(time);

        } else if (record.getJar() == 3) {

            record.setJarWork3(time);

        } else if (record.getJar() == 30) {

            record.setJarOffwork3(time);

        } else if (record.getJar() == 4) {

            record.setJarWork4(time);

        } else if (record.getJar() == 40) {

            record.setJarOffwork4(time);
        }

        return jourAttendanceRecordMapper.insertSelective(record);
    }

    @Override
    public List<JourAttendanceRecord> selectJourAttendanceRecord(JourAttendanceRecord record) throws Exception {
        List<JourAttendanceRecord> jourAttendanceRecordList = jourAttendanceRecordMapper.selectJourAttendanceRecord(record);
        return jourAttendanceRecordList;
    }

    //上下班更新
    @Override
    public int updateByPrimaryKeySelective(JourAttendanceRecord record) throws Exception {
        return jourAttendanceRecordMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int addAttendanceNote(JourAttendanceRecord record) throws Exception {
        return jourAttendanceRecordMapper.addAttendanceNote(record);
    }

}
