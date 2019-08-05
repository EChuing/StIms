package com.zz.service.stat;

import java.util.List;

import com.zz.mapper.stat.StatFinancialEcologyMapper;
import com.zz.po.stat.StatFinancialEcology;

public class StatFinancialEcologyServiceImpl implements StatFinancialEcologyService{
    
    private StatFinancialEcologyMapper statFinancialEcologyMapper;
    
    public void setStatFinancialEcologyMapper(
            StatFinancialEcologyMapper statFinancialEcologyMapper) {
        this.statFinancialEcologyMapper = statFinancialEcologyMapper;
    }

    @Override
    public List<StatFinancialEcology> selectAll(StatFinancialEcology record) throws Exception {
        return statFinancialEcologyMapper.selectAll(record);
    }

    @Override
    public List<StatFinancialEcology> selectFeByDate(StatFinancialEcology record) throws Exception {
        return statFinancialEcologyMapper.selectFeByDate(record);
    }

    @Override
    public StatFinancialEcology selectTotalFeByDate(StatFinancialEcology record)
            throws Exception {
        return statFinancialEcologyMapper.selectTotalFeByDate(record);
    }

}
